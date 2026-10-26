// Renders GET /api/data/summary. The maths lives in components/funnel.js.
const NS = 'http://www.w3.org/2000/svg';
const pct = (x) => (x === null || x === undefined ? 'n/a' : (x * 100).toFixed(1) + '%');

function el(tag, attrs = {}, text) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text !== undefined) e.textContent = text;
  return e;
}
function svg(tag, attrs = {}, text) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text !== undefined) e.textContent = text;
  return e;
}
function figure(title, synthetic) {
  const f = el('figure');
  const c = el('figcaption', {}, title);
  if (synthetic) c.append(el('span', { class: 'tag' }, 'Synthetic data'));
  f.append(c);
  return f;
}

// Shared frame: x per week, y scale 0..max. Returns helpers.
function frame(weeks, max, height, label, variant) {
  const W = 840, left = 44, right = 12, top = 12, bottom = 62;
  const s = svg('svg', { viewBox: `0 0 ${W} ${height}`, role: 'img', 'aria-label': label });
  const plotW = W - left - right, plotH = height - top - bottom;
  const step = plotW / weeks.length;
  const x = (i) => left + step * (i + 0.5);
  const y = (v) => top + plotH * (1 - v / max);
  for (let g = 0; g <= 4; g++) {
    const v = (max / 4) * g;
    s.append(svg('line', { class: 'axis', x1: left, x2: W - right, y1: y(v), y2: y(v) }));
    s.append(svg('text', { class: 'muted', x: left - 6, y: y(v) + 4, 'text-anchor': 'end' }, max <= 1 ? Math.round(v * 100) + '%' : String(Math.round(v))));
  }
  const first = weeks.findIndex((w) => w.period === 'after');
  const lx = left + step * first;
  s.append(svg('line', { class: 'launch', x1: lx, x2: lx, y1: top, y2: top + plotH }));
  s.append(svg('text', { x: lx + 4, y: top + 10 }, 'Launch: ' + variant));
  weeks.forEach((w, i) => {
    if (i % 4 === 0 || i === first) {
      s.append(svg('text', { class: 'muted', x: x(i), y: top + plotH + 14, 'text-anchor': 'middle' }, w.start.slice(5)));
    }
    s.append(svg('text', { class: 'muted', x: x(i), y: top + plotH + 28, 'text-anchor': 'middle', transform: `rotate(-90 ${x(i)} ${top + plotH + 28})`, 'font-size': 9 }, 'n=' + w.n));
  });
  return { s, x, y, step, left, right, W, top, plotH, first };
}

function countsChart(summary) {
  const f = figure('Weekly inquiries: started and submitted (n per week below each bar group)', summary.synthetic);
  const weeks = summary.weeks;
  const max = Math.max(4, Math.ceil(Math.max(...weeks.map((w) => w.started)) / 4) * 4);
  const fr = frame(weeks, max, 260, 'Weekly started and submitted inquiries, before and after launch', summary.variant);
  const bw = Math.max(2, fr.step / 2 - 1);
  weeks.forEach((w, i) => {
    for (const [k, off] of [['started', -bw], ['submitted', 0]]) {
      const h = fr.y(0) - fr.y(w[k]);
      const r = svg('rect', { class: w.period, x: fr.x(i) + off, y: fr.y(w[k]), width: bw, height: h, opacity: k === 'started' ? 0.45 : 1 });
      r.append(svg('title', {}, `${w.start}: ${k} ${w[k]} (n=${w.n} started)`));
      fr.s.append(r);
    }
  });
  f.append(fr.s, el('p', { class: 'note' }, 'Light bar: started. Dark bar: submitted. Grey: baseline form. Teal: ' + summary.variant + '. Week = seven days counted from the launch date.'));
  return f;
}

function rateChart(summary) {
  const f = figure('Weekly submit rate (started to sent), with baseline and kill line', summary.synthetic);
  const weeks = summary.weeks;
  const fr = frame(weeks, 1, 300, 'Weekly completion rate with kill line', summary.variant);
  const pts = weeks.map((w, i) => (w.completionRate === null ? null : [fr.x(i), fr.y(w.completionRate)]));
  // Draw one polyline per period so before and after never join across the launch marker.
  for (const period of ['before', 'after']) {
    const seg = weeks.map((w, i) => (w.period === period && pts[i] ? pts[i].join(',') : null)).filter(Boolean);
    if (seg.length) fr.s.append(svg('polyline', { class: 'rate', points: seg.join(' ') }));
  }
  weeks.forEach((w, i) => {
    if (!pts[i]) return;
    const c = svg('circle', { cx: pts[i][0], cy: pts[i][1], r: 3, class: w.period });
    c.append(svg('title', {}, `${w.start}: ${pct(w.completionRate)} (${w.submitted} of n=${w.n})`));
    fr.s.append(c);
  });
  const lvl = summary.before.rate, line = summary.kill.line;
  const bx = fr.left + fr.step * Math.max(0, fr.first - summary.baselineWeeks);
  fr.s.append(svg('line', { class: 'level', x1: bx, x2: fr.left + fr.step * fr.first, y1: fr.y(lvl), y2: fr.y(lvl) }));
  fr.s.append(svg('text', { class: 'muted', x: bx + 4, y: fr.y(lvl) - 4 }, `baseline ${pct(lvl)}`));
  fr.s.append(svg('line', { class: 'kill', x1: fr.left + fr.step * fr.first, x2: fr.W - fr.right, y1: fr.y(line), y2: fr.y(line) }));
  fr.s.append(svg('text', { x: fr.W - fr.right - 4, y: fr.y(line) + 14, 'text-anchor': 'end' }, `kill line ${pct(line)} (a quarter below the baseline)`));
  f.append(fr.s, el('p', { class: 'note' }, 'The card asks for two weeks in a row below the dashed line. Weekly n is small (see n below each week), so single weeks swing widely.'));
  return f;
}

function startChart(summary) {
  const f = figure('Weekly start rate (inquiry page visits that start the form), with baseline and success line', summary.synthetic);
  const weeks = summary.weeks;
  const fr = frame(weeks, 1, 300, 'Weekly start rate with success line', summary.variant);
  const pts = weeks.map((w, i) => (w.startRate === null ? null : [fr.x(i), fr.y(w.startRate)]));
  for (const period of ['before', 'after']) {
    const seg = weeks.map((w, i) => (w.period === period && pts[i] ? pts[i].join(',') : null)).filter(Boolean);
    if (seg.length) fr.s.append(svg('polyline', { class: 'rate', points: seg.join(' ') }));
  }
  weeks.forEach((w, i) => {
    if (!pts[i]) return;
    const c = svg('circle', { cx: pts[i][0], cy: pts[i][1], r: 3, class: w.period });
    c.append(svg('title', {}, `${w.start}: ${pct(w.startRate)} (${w.started} of ${w.views} visits)`));
    fr.s.append(c);
  });
  const lvl = summary.before.startRate, line = summary.successLine;
  const bx = fr.left + fr.step * Math.max(0, fr.first - summary.baselineWeeks);
  fr.s.append(svg('line', { class: 'level', x1: bx, x2: fr.left + fr.step * fr.first, y1: fr.y(lvl), y2: fr.y(lvl) }));
  fr.s.append(svg('text', { class: 'muted', x: bx + 4, y: fr.y(lvl) - 4 }, `baseline ${pct(lvl)}`));
  fr.s.append(svg('line', { class: 'level', x1: fr.left + fr.step * fr.first, x2: fr.W - fr.right, y1: fr.y(line), y2: fr.y(line) }));
  fr.s.append(svg('text', { x: fr.W - fr.right - 4, y: fr.y(line) - 6, 'text-anchor': 'end' }, `success line ${pct(line)}, over all eight weeks`));
  f.append(fr.s, el('p', { class: 'note' }, 'The success line is read over the eight weeks together, not week by week.'));
  return f;
}

function weeklyTable(summary) {
  const f = figure('Weekly funnel', summary.synthetic);
  const det = el('details', { open: '' });
  det.append(el('summary', {}, 'Show weekly numbers'));
  const wrap = el('div', { class: 'scroll' });
  const t = el('table');
  t.innerHTML = '<thead><tr><th>Week starting</th><th>Period</th><th class="num">Inquiry page visits</th><th class="num">Started (n)</th><th class="num">Start rate</th><th class="num">Sent</th><th class="num">Submit rate</th></tr></thead>';
  const tb = el('tbody');
  for (const w of summary.weeks) {
    const tr = el('tr');
    tr.innerHTML = `<td>${w.start}</td><td>${w.baseline ? 'before (baseline)' : w.period}</td><td class="num">${w.views}</td><td class="num">${w.started}</td><td class="num">${pct(w.startRate)}</td><td class="num">${w.submitted}</td><td class="num">${pct(w.completionRate)}</td>`;
    tb.append(tr);
  }
  t.append(tb);
  wrap.append(t);
  det.append(wrap);
  f.append(det);
  return f;
}

// The lines as written on discovery/test-cards/format-quiz.md.
const CARD = {
  success: 'Start rate of format-quiz over the eight weeks is at least 33%',
  usage: 'At least a quarter of inquiry page visits come through the quiz, and at least half of the visits that start the quiz reach question 4',
  proxy: 'Call rate: sent inquiries that get a scoping call',
  counter: 'Submit rate: started forms that are sent',
  kill: 'The weekly submit rate falls more than a quarter below the baseline, below 43.5%, in two weeks in a row',
};
const BASELINE_TEXT = 'eight weeks before launch';
const kOfN = (x) => `${x.k} of ${x.n}`;

function cardTable(s) {
  const f = figure('Test card ' + s.variant + ' against counts', s.synthetic);
  const u = s.usage, c = s.calls;
  const after = s.weeks.filter((w) => w.period === 'after');
  const below = s.kill.weeksBelow;
  const unsure = u.perStep.map((p) => `question ${p.step}: ${p.unsure} of ${p.n}`).join('; ');
  const rows = [
    ['Success line', CARD.success,
      `after ${s.after.started} of ${s.after.views} (${pct(s.after.startRate)}); baseline ${s.before.started} of ${s.before.views} (${pct(s.before.startRate)})`,
      `Sessions with inquiry_started divided by sessions with a page_view of the inquiry page. After: the ${after.length} weeks after launch. Baseline: the ${BASELINE_TEXT}.`],
    ['Usage hypothesis', CARD.usage,
      `${u.viaQuiz} of ${u.views} visits came through the quiz (${pct(u.viaQuizShare)}); ${u.finishedQuiz} of ${u.startedQuiz} quiz starts reached question 4 (${pct(u.finishShare)})`,
      `A visit came through the quiz when it has inquiry_step_completed step 1 and a page_view of the inquiry page. Quiz starts include visits that left the quiz on the formats page. "I don't know yet" per question: ${unsure}.`],
    ['Proxy metric', CARD.proxy,
      `after ${kOfN(c.after)}; baseline ${kOfN(c.before)}`,
      `Inquiries with scoping_call_booked, out of all sent inquiries. After: all ${s.variant} inquiries (${s.sent.quiz} through the quiz, ${s.sent.noQuiz} without). Before: baseline-form inquiries sent in the ${BASELINE_TEXT}.`],
    ['Counter metric', CARD.counter,
      `after ${s.after.submitted} of ${s.after.started} (${pct(s.after.rate)}); baseline ${s.before.submitted} of ${s.before.started} (${pct(s.before.rate)})`,
      `inquiry_submitted divided by inquiry_started: after is the ${after.length} weeks after launch, baseline is the ${BASELINE_TEXT}.`],
    ['Kill criterion', CARD.kill,
      `${below.length} of ${after.length} weeks after launch below the kill line${below.length ? ` (weeks ${below.join(', ')})` : ''}; longest run in a row: ${s.kill.longestRun}`,
      `Kill line = 0.75 times the baseline submit rate ${pct(s.before.rate)} = ${pct(s.kill.line)}. A week is below it when sent divided by started is lower. The card asks for ${s.kill.consecutive} such weeks in a row. Weekly started: ${Math.min(...after.map((w) => w.n))} to ${Math.max(...after.map((w) => w.n))}.`],
  ];
  const wrap = el('div', { class: 'scroll' });
  const t = el('table');
  t.innerHTML = '<thead><tr><th>Line</th><th>As written on the card</th><th>Count</th><th>Computation</th></tr></thead>';
  const tb = el('tbody');
  for (const r of rows) {
    const tr = el('tr');
    for (const v of r) tr.append(el('td', {}, v));
    tb.append(tr);
  }
  t.append(tb);
  wrap.append(t);
  f.append(wrap, el('p', { class: 'note' }, 'The page counts; it does not read the counts. Whether a line is met, and whether to keep, adjust or withdraw the variant, is read on the test card by the read-result skill and decided by a human. Bookings: ' +
    `${s.bookings.after.k} of ${s.bookings.after.n} after, ${s.bookings.before.k} of ${s.bookings.before.n} baseline (as of ${s.dataThrough}; later bookings are not in the data and cannot be attributed to the website change).`));
  return f;
}

async function main() {
  const lead = document.getElementById('lead');
  const root = document.getElementById('content');
  const res = await fetch('/api/data/summary');
  if (!res.ok) {
    lead.textContent = 'No generated data yet. Run npm run generate.';
    return;
  }
  const s = await res.json();
  if (!s.synthetic) document.getElementById('band').textContent = 'WARNING: data is not marked synthetic in scenario.json';
  lead.textContent = `Launch ${s.launchDate}: ${s.before.started} inquiries started in the baseline weeks, ${s.after.started} after launch (${s.after.weeks} weeks).`;
  root.append(el('p', { class: 'baseline' }, 'Baseline: the eight weeks before launch, as read on the test card. The start rate, the submit rate, the kill line and the scoping call comparison use only these weeks; the weekly charts and table show all 26 weeks before launch.'));
  root.append(cardTable(s), startChart(s), rateChart(s), countsChart(s), weeklyTable(s));
}
main();
