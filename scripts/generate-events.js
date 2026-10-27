// Deterministic generator for the SYNTHETIC event log and inquiry export.
// Usage: node scripts/generate-events.js [--scenario file] [--out dir]
// Same scenario (same seed) -> byte-identical output. No Date.now(), no Math.random().
// A scenario without weeksAfter is a baseline export: weeks before launch only, cut at launch.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DAY = 86400000;

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const CSV_HEADER = 'id,submitted_at,variant,sponsor_type,team_size,quiz,quiz_answered,quiz_unsure,quiz_roles,quiz_stand,quiz_before,scoping_call_booked,booking_confirmed,call_team_questions,call_format_settled';
export const BASELINE_CSV_HEADER = 'id,submitted_at,variant,sponsor_type,team_size,scoping_call_booked,booking_confirmed';

function csvCell(v) {
  const s = String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function buildData(scenario) {
  const rnd = mulberry32(scenario.seed);
  const pick = (arr, r = rnd) => arr[Math.floor(r() * arr.length)];
  const weighted = (obj, r = rnd) => {
    const u = r();
    let acc = 0;
    const keys = Object.keys(obj);
    for (const k of keys) {
      acc += obj[k];
      if (u < acc) return k;
    }
    return keys[keys.length - 1];
  };
  const baselineOnly = !scenario.weeksAfter;
  const launch = Date.parse(scenario.launchDate + 'T00:00:00Z');
  const through = scenario.dataThrough ? Date.parse(scenario.dataThrough + 'T00:00:00Z') : Infinity;
  const qz = scenario.quiz;
  // The quiz after launch draws from its own stream, so the weeks before launch stay as the baseline.
  const qrnd = qz ? mulberry32(qz.seed) : null;
  // The ticked answers of sent inquiries draw from a third stream, so they never shift the counts.
  const arnd = qz ? mulberry32(qz.answerSeed) : null;
  // What the person who runs a scoping call records, from recordFrom on. Its own stream, so it never
  // shifts any other number.
  const cr = scenario.callRecord;
  const crnd = cr ? mulberry32(cr.seed) : null;
  const recordFrom = cr ? Date.parse(cr.recordFrom + 'T00:00:00Z') : Infinity;
  // Of the four questions about the team (who, how many, AI level, earlier training), the ones still
  // asked in the call. A question the quiz answered is rarely asked again; one left open or answered "I don't know
  // yet" is asked as often as without the quiz.
  const callRecord = (type, quiz) => {
    let asked = 0;
    for (let i = 0; i < 4; i++) {
      const p = quiz && quiz[i].answered ? cr.askIfAnswered : cr.askIfOpen[type];
      if (crnd() < p) asked++;
    }
    const settled = crnd() < cr.formatSettled[type] + (quiz ? cr.formatSettledQuizBoost : 0);
    return { asked, settled };
  };
  const events = [];
  const inquiries = [];
  let seq = 0;
  let sessionNo = 0;
  let inquiryNo = 0;

  // Browsing paths draw from their own stream, so the main stream is consumed exactly as without them.
  const br = scenario.browse;
  const brnd = br ? mulberry32(br.seed) : null;
  let browseSessionNo = br ? br.firstSessionNo - 1 : 0;

  const emit = (ms, type, variant, session, props) => {
    if (ms > through) return false;
    events.push({ ms, seq: seq++, type, variant, session, props });
    return true;
  };
  const randomTime = (weekStart, r = rnd) => {
    const day = Math.floor(r() * 7);
    const hour = 7 + Math.floor(r() * 12);
    return weekStart + day * DAY + hour * 3600000 + Math.floor(r() * 3600) * 1000;
  };
  const delay = (lo, hi, r = rnd) => Math.round(lo + r() * (hi - lo)) * 1000;

  // One run through the quiz: per question answered, "I don't know yet", or left empty.
  const QUIZ_STEPS = 4;
  const quizAnswers = (type) => {
    const out = [];
    for (let i = 0; i < QUIZ_STEPS; i++) {
      const unsure = qrnd() < qz.unsure[type][i];
      const answered = !unsure && qrnd() >= qz.emptyGivenNotUnsure;
      out.push({ step: i + 1, answered, unsure });
    }
    return out;
  };
  // What a sent inquiry ticked on questions 1, 3 and 4, as the inquiry page stores it.
  // One or two options per answered question, drawn by weight without repeats.
  const UNSURE = "I don't know yet";
  const ticked = (opts) => {
    const n = arnd() < qz.twoAnswers ? 2 : 1;
    const left = { ...opts };
    const out = [];
    while (out.length < n && Object.keys(left).length) {
      const total = Object.values(left).reduce((a, b) => a + b, 0);
      const k = weighted(Object.fromEntries(Object.entries(left).map(([o, w]) => [o, w / total])), arnd);
      out.push(k);
      delete left[k];
      if (qz.alone.includes(k)) break;
    }
    if (out.some((o) => qz.alone.includes(o))) return out.filter((o) => qz.alone.includes(o)).slice(0, 1);
    return out;
  };
  const quizTexts = (quiz, type) => {
    const at = (i, key) => (quiz[i].unsure ? UNSURE : quiz[i].answered ? ticked(qz.options[key][type]).join('; ') : '');
    return { roles: at(0, 'roles'), stand: at(2, 'stand'), before: at(3, 'before') };
  };

  // Quiz screens are passed one after the other, ending a little before `end`.
  const emitQuiz = (end, variant, session, answers) => {
    answers.forEach((a, i) => emit(end - (answers.length - i) * 30000, 'inquiry_step_completed', variant, session, { step: a.step, answered: a.answered, unsure: a.unsure }));
  };

  // One visit sees several pages. Every visit draws how many pages it sees from the same
  // distribution (pagesSeen); a visit that inquires then opens the inquiry page as its last page.
  // A share of visits (formatsShare, the same for every path length) sees the formats page. Seeing it
  // changes the chance to inquire by formatsReachFactor; nothing else does, not the path length,
  // not another page. rNo and rWith are the reach without and with formats:
  // formatsShare * rWith + (1 - formatsShare) * rNo = reachRate.
  const rNo = br ? br.reachRate / (1 - br.formatsShare * (1 - br.formatsReachFactor)) : 0;
  const rWith = br ? rNo * br.formatsReachFactor : 0;
  // Chance that a visit sees the formats page, for visits that inquire and visits that do not.
  const formatsGiven = (inquires) => inquires
    ? (br.formatsShare * rWith) / br.reachRate
    : (br.formatsShare * (1 - rWith)) / (1 - br.reachRate);
  const path = (inquires) => {
    const k = Number(weighted(br.pagesSeen, brnd));
    const withFormats = brnd() < formatsGiven(inquires);
    for (;;) {
      const pages = [];
      for (let i = 0; i < k; i++) {
        let p;
        do p = weighted(br.pages, brnd); while (p === pages[i - 1]);
        pages.push(p);
      }
      if (pages.includes('formats') === withFormats) return pages;
    }
  };
  const gap = () => delay(br.minutesBetween[0] * 60, br.minutesBetween[1] * 60, brnd);

  // From the inquiry page view on: start, send, scoping call, booking, follow-up.
  // d draws whether the form is started and sent, r draws everything else.
  const inquire = (s, t, variant, after, quizOn, type, quiz, d, r) => {
    const st = quizOn ? scenario.steps.after : scenario.steps.before;
    const startP = quizOn ? (quiz ? st.startGivenQuiz : st.startGivenNoQuiz) : st.startGivenView;
    if (d() >= startP) return;
    if (type === null) type = weighted(scenario.sponsorMix, r);
    t += delay(5, 40, r);
    emit(t, 'inquiry_started', variant, s, {});
    if (d() >= st.submitGivenStart) return;

    t += delay(60, 300, r);
    const props = quizOn ? { quiz: Boolean(quiz) } : {};
    emit(t, 'inquiry_submitted', variant, s, props);
    const id = 'inq-' + String(++inquiryNo).padStart(4, '0');
    const teamSize = pick(scenario.teamSizes, r);

    let called = false;
    let booked = false;
    let callMs = null;
    let bookMs = null;
    let callRec = null;
    const rate = (after ? scenario.scopingCallRate.after : scenario.scopingCallRate.before)[type];
    if (r() < rate) {
      const ct = t + delay(86400 + 3600, 3 * 86400 + 6 * 3600, r);
      called = emit(ct, 'scoping_call_booked', variant, s, {});
      if (called) callMs = ct;
      if (called && cr && ct >= recordFrom) callRec = callRecord(type, quiz);
      if (called && r() < scenario.bookingGivenCall[type]) {
        const bt = ct + delay(5 * 86400, 20 * 86400, r);
        booked = emit(bt, 'booking_confirmed', variant, s, {});
        if (booked) bookMs = bt;
        if (booked && r() < scenario.followup.answerRate) {
          const ft = bt + scenario.followup.delayDaysAfterBooking * DAY + delay(0, 3 * 86400, r);
          emit(ft, 'followup_answered', variant, s, { answer: weighted(scenario.followup.answers, r), weeks_after: 4 });
        }
      }
    }
    inquiries.push({
      ms: t, id, variant, type, teamSize,
      quiz: quizOn ? Boolean(quiz) : '',
      quizAnswered: quiz ? quiz.filter((a) => a.answered).length : '',
      quizUnsure: quiz ? quiz.filter((a) => a.unsure).length : '',
      texts: quiz ? quizTexts(quiz, type) : { roles: '', stand: '', before: '' },
      called, booked, callMs, bookMs, callRec,
    });
  };

  // In quiz weeks the shipped variant serves the formats page; home and sponsor preparation stay baseline.
  // The browsing paths and their gaps are drawn the same with or without the quiz, so the quiz is the
  // only thing that differs between a quiz week and an off week.
  const pageVariant = (p, quizOn) => (quizOn && p === 'formats' ? scenario.shippedVariant : scenario.baselineVariant);
  const browseWeek = (weekStart, inquiryVisits, quizOn) => {
    for (const v of inquiryVisits) {
      // A visit that took the quiz goes from the formats page through the quiz to the inquiry page.
      const pages = v.quiz ? v.pages.slice(0, v.pages.lastIndexOf('formats') + 1) : v.pages;
      let t = v.t;
      const times = pages.map((p, i) => (t -= v.gaps[i] + (i === 0 && v.quiz ? (QUIZ_STEPS + 1) * 30000 : 0))).reverse();
      pages.forEach((p, i) => emit(times[i], 'page_view', pageVariant(p, quizOn), v.s, { page: p }));
    }
    const others = Math.round((inquiryVisits.length * (1 - br.reachRate)) / br.reachRate * (1 + br.weeklyJitter * (2 * brnd() - 1)));
    for (let i = 0; i < others; i++) {
      const s = 's-' + String(++browseSessionNo).padStart(6, '0');
      let t = randomTime(weekStart, brnd);
      let gone = false;
      path(false).forEach((p, j) => {
        if (j > 0) t += gap();
        if (gone) return;
        emit(t, 'page_view', pageVariant(p, quizOn), s, { page: p });
        // A visit that would have left takes the quiz on the formats page. Some finish it and go on to
        // the inquiry page, the others leave during the quiz.
        if (quizOn && qz && p === 'formats' && qrnd() < qz.takeGivenFormats.leaving) {
          gone = true;
          const type = weighted(scenario.sponsorMix, qrnd);
          const quiz = quizAnswers(type);
          if (qrnd() < qz.finishGivenLeaving) {
            const ti = t + (QUIZ_STEPS + 1) * 30000;
            emitQuiz(ti, scenario.shippedVariant, s, quiz);
            emit(ti, 'page_view', scenario.shippedVariant, s, { page: 'inquiry' });
            inquire(s, ti, scenario.shippedVariant, true, true, type, quiz, qrnd, qrnd);
          } else {
            const stop = Number(weighted(qz.dropAtStep, qrnd));
            emitQuiz(t + (stop + 1) * 30000, scenario.shippedVariant, s, quiz.slice(0, stop));
          }
        }
      });
    }
  };

  const weeks = [];
  for (let w = -scenario.weeksBefore; w < (scenario.weeksAfter || 0); w++) weeks.push(w);

  for (const w of weeks) {
    const after = w >= 0;
    // With alternating weeks the shipped variant runs in even weeks after launch, the baseline in odd ones.
    const quizOn = after && (!scenario.alternateWeeks || w % 2 === 0);
    const variant = quizOn ? scenario.shippedVariant : scenario.baselineVariant;
    const weekStart = launch + w * 7 * DAY;
    const jitter = (m) => Math.max(1, Math.round(m * (1 + scenario.traffic.weeklyJitter * (2 * rnd() - 1))));

    // Pages other than the inquiry page. With browsing paths these one-page visits are replaced,
    // but their draws stay so the main stream does not shift.
    const others = jitter(scenario.traffic.otherPageViewsPerWeek);
    for (let i = 0; i < others; i++) {
      const s = 's-' + String(++sessionNo).padStart(6, '0');
      const t = randomTime(weekStart);
      const page = pick(['home', 'formats', 'sponsor-prep']);
      if (!br) emit(t, 'page_view', scenario.baselineVariant, s, { page });
    }

    const views = jitter(scenario.traffic.inquiryPageViewsPerWeek);
    const inquiryVisits = [];
    for (let i = 0; i < views; i++) {
      const s = 's-' + String(++sessionNo).padStart(6, '0');
      const t = randomTime(weekStart);
      // The pages before the inquiry page, drawn here so the quiz can depend on them.
      const pages = br ? path(true) : null;
      const gaps = pages ? pages.map(() => gap()) : null;
      let type = null;
      let quiz = null;
      if (after) {
        type = weighted(scenario.sponsorMix, qrnd);
        // A visit that was going to the inquiry page anyway may take the quiz on the way, if it sees the formats page.
        if (quizOn && (!pages || pages.includes('formats')) && qrnd() < qz.takeGivenFormats.inquiring) {
          quiz = quizAnswers(type);
          emitQuiz(t, variant, s, quiz);
        }
      }
      emit(t, 'page_view', variant, s, { page: 'inquiry' });
      inquiryVisits.push({ s, t, quiz, pages, gaps });
      if (after) inquire(s, t, variant, true, quizOn, type, quiz, qrnd, rnd);
      else inquire(s, t, variant, false, false, null, null, rnd, rnd);
    }
    if (br) browseWeek(weekStart, inquiryVisits, quizOn);
  }

  // A baseline export is taken on launch day: later events are not in it yet.
  const kept = baselineOnly ? events.filter((e) => e.ms < launch) : events;
  kept.sort((a, b) => a.ms - b.ms || a.seq - b.seq);
  const eventsText = kept
    .map((e) => JSON.stringify({ ts: new Date(e.ms).toISOString(), type: e.type, variant: e.variant, session: e.session, props: e.props }))
    .join('\n') + '\n';
  inquiries.sort((a, b) => a.ms - b.ms || a.id.localeCompare(b.id));
  const rows = baselineOnly
    ? inquiries.map((q) => [q.id, new Date(q.ms).toISOString(), q.variant, q.type, q.teamSize, q.called && q.callMs < launch, q.booked && q.bookMs < launch])
    : inquiries.map((q) => [q.id, new Date(q.ms).toISOString(), q.variant, q.type, q.teamSize, q.quiz, q.quizAnswered, q.quizUnsure, q.texts.roles, q.texts.stand, q.texts.before, q.called, q.booked, q.callRec ? q.callRec.asked : '', q.callRec ? q.callRec.settled : '']);
  const csvText = [baselineOnly ? BASELINE_CSV_HEADER : CSV_HEADER]
    .concat(rows.map((r) => r.map(csvCell).join(',')))
    .join('\n') + '\n';
  return { eventsText, csvText };
}

// The shipped variant has one source of truth: site/config.json. The scenario never names it.
// A baseline export has no shipped variant yet.
export function loadScenario(scenarioFile, configFile = path.join(ROOT, 'site', 'config.json')) {
  const scenario = JSON.parse(fs.readFileSync(scenarioFile, 'utf8'));
  if (!scenario.weeksAfter) return scenario;
  const shipped = JSON.parse(fs.readFileSync(configFile, 'utf8')).shipped;
  if (!shipped) throw new Error('site/config.json names no shipped variant');
  return { ...scenario, shippedVariant: shipped };
}

export function generateTo(scenarioFile, outDir) {
  const scenario = loadScenario(scenarioFile);
  if (scenario.synthetic !== true) throw new Error('scenario must carry "synthetic": true');
  const { eventsText, csvText } = buildData(scenario);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'events.jsonl'), eventsText);
  fs.writeFileSync(path.join(outDir, 'inquiries.csv'), csvText);
  return { events: eventsText.split('\n').length - 1, inquiries: csvText.split('\n').length - 2 };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const arg = (name, def) => (args.includes(name) ? args[args.indexOf(name) + 1] : def);
  const scenarioFile = path.resolve(arg('--scenario', path.join(ROOT, 'data', 'scenario.json')));
  const outDir = path.resolve(arg('--out', path.join(ROOT, 'data')));
  const r = generateTo(scenarioFile, outDir);
  console.log(`Wrote ${r.events} events and ${r.inquiries} inquiries to ${outDir}`);
}
