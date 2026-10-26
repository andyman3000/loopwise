// Pure funnel maths. Works in Node and in the browser. No DOM, no I/O.
// Weeks are 7-day buckets anchored on the launch instant (UTC): week 0 starts at launch,
// week -1 is the seven days before it.
export const WEEK_MS = 7 * 86400000;
export const KILL_FACTOR = 0.75; // "more than a quarter below the baseline rate"
export const KILL_CONSECUTIVE = 2;
// The test card reads the baseline as the same eight weeks before the switch (weeks -8 to -1).
export const BASELINE_WEEKS = 8;

export function parseJsonl(text) {
  return text.split('\n').filter((l) => l.trim() !== '').map((l) => JSON.parse(l));
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

export function weekIndex(ts, launchMs) {
  return Math.floor((Date.parse(ts) - launchMs) / WEEK_MS);
}

export function rate(num, den) {
  return den > 0 ? num / den : null;
}

// events: [{ts, type, session, props}], counting unique sessions per week and type.
// views are inquiry page visits; started and submitted are form sessions.
// A week after launch is a quiz week when the inquiry page was served as the variant in it, else an off week.
export function weeklyFunnel(events, { launchMs, weeksBefore, weeksAfter, variant }) {
  const weeks = [];
  for (let w = -weeksBefore; w < weeksAfter; w++) {
    weeks.push({
      week: w,
      start: new Date(launchMs + w * WEEK_MS).toISOString().slice(0, 10),
      period: w < 0 ? 'before' : 'after',
      baseline: w < 0 && w >= -BASELINE_WEEKS,
      arm: null,
      views: 0,
      started: 0,
      submitted: 0,
      startRate: null,
      completionRate: null,
      n: 0,
    });
  }
  const seen = new Set();
  for (const e of events) {
    const isView = e.type === 'page_view' && e.props?.page === 'inquiry';
    if (!isView && e.type !== 'inquiry_started' && e.type !== 'inquiry_submitted') continue;
    const key = e.type + '|' + e.session;
    if (seen.has(key)) continue;
    seen.add(key);
    const w = weekIndex(e.ts, launchMs);
    const bucket = weeks[w + weeksBefore];
    if (!bucket) continue;
    if (isView) {
      bucket.views++;
      if (bucket.period === 'after' && e.variant === variant) bucket.arm = 'quiz';
    }
    else if (e.type === 'inquiry_started') bucket.started++;
    else bucket.submitted++;
  }
  for (const b of weeks) {
    if (b.period === 'after' && !b.arm) b.arm = 'off';
    b.n = b.started;
    b.startRate = rate(b.started, b.views);
    b.completionRate = rate(b.submitted, b.started);
  }
  return weeks;
}

// period 'before' (all weeks before launch), 'after', 'baseline' (the eight weeks before launch),
// 'quiz' or 'off' (the two kinds of week after launch).
export function periodTotals(weeks, period) {
  const pick = { baseline: (x) => x.baseline, quiz: (x) => x.arm === 'quiz', off: (x) => x.arm === 'off' }[period] || ((x) => x.period === period);
  const w = weeks.filter(pick);
  const views = w.reduce((s, x) => s + x.views, 0);
  const started = w.reduce((s, x) => s + x.started, 0);
  const submitted = w.reduce((s, x) => s + x.submitted, 0);
  return { views, started, submitted, startRate: rate(started, views), rate: rate(submitted, started), weeks: w.length };
}

export function killLine(beforeRate, factor = KILL_FACTOR) {
  return beforeRate === null ? null : beforeRate * factor;
}

// Kill criterion inputs: the weeks below the kill line and the longest run of them. Whether the run
// meets the criterion is read on the test card, not here.
// Weeks without a start have no rate and break a streak.
export function checkKill(weeks, beforeRate, { factor = KILL_FACTOR, consecutive = KILL_CONSECUTIVE } = {}) {
  const line = killLine(beforeRate, factor);
  // Only quiz weeks count; two quiz weeks are in a row when no other quiz week lies between them.
  const after = weeks.filter((w) => w.arm === 'quiz');
  const weeksBelow = [];
  let longestRun = 0;
  let streak = 0;
  let worst = null; // the pair of neighbouring weeks whose better week is lowest
  for (let i = 0; i < after.length; i++) {
    const w = after[i];
    const below = w.completionRate !== null && w.completionRate < line;
    if (below) weeksBelow.push(w.week);
    streak = below ? streak + 1 : 0;
    longestRun = Math.max(longestRun, streak);
    const prev = after[i - 1];
    if (prev && prev.completionRate !== null && w.completionRate !== null) {
      const best = Math.max(prev.completionRate, w.completionRate);
      if (worst === null || best < worst.bestOfPair) {
        worst = { weeks: [prev.week, w.week], rates: [prev.completionRate, w.completionRate], bestOfPair: best, line, belowLineInBoth: best < line };
      }
    }
  }
  return { line, consecutive, weeksBelow, longestRun, worstPair: worst };
}

// Rows submitted in [fromMs, toMs).
export function rowsBetween(rows, fromMs, toMs) {
  return rows.filter((r) => {
    const t = Date.parse(r.submitted_at);
    return t >= fromMs && t < toMs;
  });
}

export function scopingCallRate(rows, variant) {
  const mine = rows.filter((r) => r.variant === variant);
  const k = mine.filter((r) => r.scoping_call_booked === 'true').length;
  return { k, n: mine.length, rate: rate(k, mine.length) };
}

// Bookings and the booking rate as the KPI tree defines it: bookings divided by scoping calls.
export function bookingRate(rows, variant) {
  const mine = rows.filter((r) => r.variant === variant);
  const calls = mine.filter((r) => r.scoping_call_booked === 'true').length;
  const k = mine.filter((r) => r.booking_confirmed === 'true').length;
  return { k, calls, sent: mine.length, rate: rate(k, calls) };
}

// Usage of the quiz: inquiry page visits that came through it, how far visits get, and how often
// each question is answered with "I don't know yet".
export const QUIZ_STEPS = 4;
export function quizUsage(events, variant) {
  const mine = events.filter((e) => e.variant === variant);
  const sessions = (pred) => new Set(mine.filter(pred).map((e) => e.session));
  const views = sessions((e) => e.type === 'page_view' && e.props?.page === 'inquiry');
  const stepSessions = (n) => sessions((e) => e.type === 'inquiry_step_completed' && e.props?.step === n);
  const first = stepSessions(1);
  const last = stepSessions(QUIZ_STEPS);
  const viaQuiz = [...views].filter((s) => first.has(s)).length;
  const perStep = [];
  for (let n = 1; n <= QUIZ_STEPS; n++) {
    const ev = mine.filter((e) => e.type === 'inquiry_step_completed' && e.props?.step === n);
    perStep.push({ step: n, n: ev.length, unsure: ev.filter((e) => e.props.unsure).length, answered: ev.filter((e) => e.props.answered).length });
  }
  return {
    views: views.size,
    viaQuiz,
    viaQuizShare: rate(viaQuiz, views.size),
    startedQuiz: first.size,
    finishedQuiz: last.size,
    finishShare: rate(last.size, first.size),
    perStep,
  };
}

// Sent variant inquiries, split by whether they came through the quiz.
export function sentByQuiz(rows, variant) {
  const mine = rows.filter((r) => r.variant === variant);
  return { quiz: mine.filter((r) => r.quiz === 'true').length, noQuiz: mine.filter((r) => r.quiz !== 'true').length };
}

// What the person who ran each scoping call recorded: calls in which they asked at most one of the
// four questions about the team, and calls that settled the format. Only rows with a record count.
export function callQuality(rows) {
  const rec = rows.filter((r) => r.call_team_questions !== undefined && r.call_team_questions !== '');
  return {
    n: rec.length,
    fewTeamQuestions: rec.filter((r) => Number(r.call_team_questions) <= 1).length,
    formatSettled: rec.filter((r) => r.call_format_settled === 'true').length,
  };
}

// Reach from the formats page: of the visits that see the formats page, how many open the inquiry
// page. A visit belongs to the week of its first page view. Returned per kind of week, for the
// baseline weeks, and per four-week block before launch, to show how much it swings unchanged.
export function formatsReach(events, launchMs, weeks) {
  const visits = new Map();
  for (const e of events) {
    if (e.type !== 'page_view') continue;
    const v = visits.get(e.session) || { pages: new Set(), ms: Infinity };
    v.pages.add(e.props?.page);
    v.ms = Math.min(v.ms, Date.parse(e.ts));
    visits.set(e.session, v);
  }
  const byWeek = new Map(weeks.map((w) => [w.week, w]));
  const count = (pred) => {
    let n = 0, k = 0;
    for (const v of visits.values()) {
      if (!v.pages.has('formats')) continue;
      const w = Math.floor((v.ms - launchMs) / WEEK_MS);
      if (!pred(w, byWeek.get(w))) continue;
      n++;
      if (v.pages.has('inquiry')) k++;
    }
    return { k, n, rate: rate(k, n) };
  };
  const first = weeks[0]?.week ?? 0;
  const blocks = [];
  for (let b = first + ((-first) % 4); b < 0; b += 4) {
    blocks.push({ from: new Date(launchMs + b * WEEK_MS).toISOString().slice(0, 10), ...count((w) => w >= b && w < b + 4) });
  }
  return {
    quiz: count((w, wk) => wk?.arm === 'quiz'),
    off: count((w, wk) => wk?.arm === 'off'),
    before: count((w, wk) => Boolean(wk?.baseline)),
    blocks,
  };
}

// Everything the dashboard shows. scenario supplies launch date, window, shipped variant.
export function summarize(events, inquiries, scenario) {
  const launchMs = Date.parse(scenario.launchDate + 'T00:00:00Z');
  const variant = scenario.shippedVariant;
  const weeks = weeklyFunnel(events, { launchMs, weeksBefore: scenario.weeksBefore, weeksAfter: scenario.weeksAfter, variant });
  const before = periodTotals(weeks, 'baseline');
  const after = periodTotals(weeks, 'after');
  const quiz = periodTotals(weeks, 'quiz');
  const off = periodTotals(weeks, 'off');
  const kill = checkKill(weeks, before.rate);
  const reach = formatsReach(events, launchMs, weeks);
  const afterRows = rowsBetween(inquiries, launchMs, Infinity);
  const callsQuality = {
    quiz: callQuality(inquiries.filter((r) => r.variant === variant)),
    off: callQuality(afterRows.filter((r) => r.variant === scenario.baselineVariant)),
    before: callQuality(rowsBetween(inquiries, -Infinity, launchMs)),
    recordFrom: scenario.callRecord?.recordFrom ?? null,
  };
  const baselineRows = rowsBetween(inquiries, launchMs - BASELINE_WEEKS * WEEK_MS, launchMs);
  const calls = { before: scopingCallRate(baselineRows, scenario.baselineVariant), after: scopingCallRate(inquiries, variant), off: scopingCallRate(afterRows, scenario.baselineVariant) };
  const use = quizUsage(events, variant);
  const submittedAfter = inquiries.filter((r) => r.variant === variant).length;
  return {
    synthetic: scenario.synthetic === true,
    launchDate: scenario.launchDate,
    dataThrough: scenario.dataThrough,
    variant,
    baselineWeeks: BASELINE_WEEKS,
    weeks,
    before,
    after,
    quiz,
    off,
    kill,
    callsQuality,
    reach,
    sent: sentByQuiz(inquiries, variant),
    calls,
    bookings: { before: bookingRate(baselineRows, scenario.baselineVariant), after: bookingRate(inquiries, variant), off: bookingRate(afterRows, scenario.baselineVariant) },
    usage: use,
    submittedAfter,
  };
}
