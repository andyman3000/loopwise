// Deterministic generator for the SYNTHETIC event log and inquiry export.
// Usage: node scripts/generate-events.js [--scenario file] [--out dir]
// Same scenario (same seed) -> byte-identical output. No Date.now(), no Math.random().
// A scenario without weeksAfter is a baseline export: weeks before launch only, cut at launch.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DAY = 86400000;

// The example lines arrive with the success-line-first variant (block 4). The baseline needs none.
const EXAMPLES_FILE = path.join(ROOT, 'site', 'variants', 'success-line-first', 'success-line-first.js');
const { EXAMPLE_GROUPS } = fs.existsSync(EXAMPLES_FILE)
  ? await import(pathToFileURL(EXAMPLES_FILE).href)
  : { EXAMPLE_GROUPS: null };

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

export const CSV_HEADER = 'id,submitted_at,variant,sponsor_type,team_size,success_line_choice,success_line_text,scoping_call_booked,booking_confirmed';
export const BASELINE_CSV_HEADER = 'id,submitted_at,variant,sponsor_type,team_size,scoping_call_booked,booking_confirmed';

function csvCell(v) {
  const s = String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function buildData(scenario) {
  const rnd = mulberry32(scenario.seed);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
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
  const sl = scenario.successLine;
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

  const successLineFor = (type) => {
    if (!EXAMPLE_GROUPS) throw new Error('success-line-first variant missing: ' + EXAMPLES_FILE);
    if (rnd() < sl.dontKnow[type]) return { choice: 'dont-know', text: '', vague: false, example: null };
    if (rnd() < sl.vagueOwnGivenFilled[type]) return { choice: 'own', text: pick(sl.ownLines.vague), vague: true, example: null };
    const choice = weighted(sl.choiceGivenFilled[type]);
    if (choice === 'own') {
      const pool = rnd() < sl.ownGapGivenOwn[type] ? sl.ownLines.implementationGap : sl.ownLines.other;
      return { choice, text: pick(pool), vague: false, example: null };
    }
    const own = type === 'soft' ? EXAMPLE_GROUPS[0] : EXAMPLE_GROUPS[1];
    const other = type === 'soft' ? EXAMPLE_GROUPS[1] : EXAMPLE_GROUPS[0];
    const group = rnd() < sl.ownGroupAffinity ? own : other;
    const line = pick(group.lines);
    const text = choice === 'example' ? line.text : line.text + pick(sl.editSuffixes);
    return { choice, text, vague: false, example: line.id };
  };

  // One visit can see several pages. Earlier pages of an inquiry visit come a few minutes before it;
  // the other visits never reach the inquiry page. Their number follows from the reach rate.
  const browseWeek = (weekStart, inquiryVisits) => {
    const nextPage = (prev) => {
      let p;
      do p = weighted(br.pages, brnd); while (p === prev);
      return p;
    };
    for (const v of inquiryVisits) {
      if (brnd() >= br.earlierViewsShare) continue;
      const n = brnd() < br.twoEarlierViews ? 2 : 1;
      let t = v.t;
      let page = null;
      const before = [];
      for (let k = 0; k < n; k++) {
        t -= delay(br.minutesBetween[0] * 60, br.minutesBetween[1] * 60, brnd);
        page = nextPage(page);
        before.push([t, page]);
      }
      for (const [bt, bp] of before.reverse()) emit(bt, 'page_view', scenario.baselineVariant, v.s, { page: bp });
    }
    const others = Math.round((inquiryVisits.length * (1 - br.reachRate)) / br.reachRate * (1 + br.weeklyJitter * (2 * brnd() - 1)));
    for (let i = 0; i < others; i++) {
      const s = 's-' + String(++browseSessionNo).padStart(6, '0');
      const n = Number(weighted(br.viewsPerOtherVisit, brnd));
      let t = randomTime(weekStart, brnd);
      let page = null;
      for (let k = 0; k < n; k++) {
        if (k > 0) t += delay(br.minutesBetween[0] * 60, br.minutesBetween[1] * 60, brnd);
        page = nextPage(page);
        emit(t, 'page_view', scenario.baselineVariant, s, { page });
      }
    }
  };

  const weeks = [];
  for (let w = -scenario.weeksBefore; w < (scenario.weeksAfter || 0); w++) weeks.push(w);

  for (const w of weeks) {
    const after = w >= 0;
    const variant = after ? scenario.shippedVariant : scenario.baselineVariant;
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
    const st = after ? scenario.steps.after : scenario.steps.before;
    const inquiryVisits = [];
    for (let i = 0; i < views; i++) {
      const s = 's-' + String(++sessionNo).padStart(6, '0');
      let t = randomTime(weekStart);
      emit(t, 'page_view', variant, s, { page: 'inquiry' });
      inquiryVisits.push({ s, t });
      if (rnd() >= st.startGivenView) continue;
      const type = weighted(scenario.sponsorMix);
      t += delay(5, 40);
      emit(t, 'inquiry_started', variant, s, {});
      let line = null;
      if (after) {
        if (rnd() >= st.stepGivenStart) continue;
        line = successLineFor(type);
        t += delay(30, 120);
        if (line.choice !== 'dont-know') {
          emit(t, 'success_line_filled', variant, s, { choice: line.choice, example: line.example, length: line.text.length });
        }
        emit(t + 1000, 'inquiry_step_completed', variant, s, { step: 'success_line', choice: line.choice });
        t += 1000;
        if (rnd() >= st.submitGivenStep) continue;
      } else if (rnd() >= st.submitGivenStart) continue;

      t += delay(60, 300);
      const props = after ? { success_line: line.choice === 'dont-know' ? 'dont-know' : 'filled', choice: line.choice } : {};
      emit(t, 'inquiry_submitted', variant, s, props);
      const id = 'inq-' + String(++inquiryNo).padStart(4, '0');
      const teamSize = pick(scenario.teamSizes);

      let called = false;
      let booked = false;
      let callMs = null;
      let bookMs = null;
      const rate = (after ? scenario.scopingCallRate.after : scenario.scopingCallRate.before)[type];
      if (rnd() < rate) {
        const ct = t + delay(86400 + 3600, 3 * 86400 + 6 * 3600);
        called = emit(ct, 'scoping_call_booked', variant, s, {});
        if (called) callMs = ct;
        if (called && rnd() < scenario.bookingGivenCall[type]) {
          const bt = ct + delay(5 * 86400, 20 * 86400);
          booked = emit(bt, 'booking_confirmed', variant, s, {});
          if (booked) bookMs = bt;
          if (booked && rnd() < scenario.followup.answerRate) {
            const ft = bt + scenario.followup.delayDaysAfterBooking * DAY + delay(0, 3 * 86400);
            emit(ft, 'followup_answered', variant, s, { answer: weighted(scenario.followup.answers), weeks_after: 4 });
          }
        }
      }
      inquiries.push({
        ms: t, id, variant, type, teamSize,
        choice: after ? line.choice : '', text: after ? line.text : '',
        called, booked, callMs, bookMs,
      });
    }
    if (br) browseWeek(weekStart, inquiryVisits);
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
    : inquiries.map((q) => [q.id, new Date(q.ms).toISOString(), q.variant, q.type, q.teamSize, q.choice, q.text, q.called, q.booked]);
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
