// Prints the numbers the dashboard shows, as plain lines, from the same code (site/components/funnel.js).
// Usage: npm run summary
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseJsonl, parseCsv, summarize } from '../site/components/funnel.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

export function summaryLines(s) {
  const pct = (x) => (x === null || x === undefined ? 'n/a' : (x * 100).toFixed(1) + '%');
  const kn = (k, n) => `${k} of ${n} (${pct(n ? k / n : null)})`;
  const cq = s.callsQuality;
  const u = s.usage;
  return [
    `${s.synthetic ? 'SYNTHETIC DATA. ' : ''}Variant ${s.variant}, launch ${s.launchDate}, data through ${s.dataThrough}.`,
    `Weeks: ${s.quiz.weeks} quiz weeks, ${s.off.weeks} off weeks. Context: the ${s.baselineWeeks} weeks before launch.`,
    '',
    'Calls with at most 1 of the 4 questions about the team asked (fewer questions is better):',
    `  quiz weeks ${kn(cq.quiz.fewTeamQuestions, cq.quiz.n)} · off weeks ${kn(cq.off.fewTeamQuestions, cq.off.n)} · before launch ${kn(cq.before.fewTeamQuestions, cq.before.n)}`,
    'Start rate, inquiry page visits that start the form (higher is better, a direction only):',
    `  quiz weeks ${kn(s.quiz.started, s.quiz.views)} · off weeks ${kn(s.off.started, s.off.views)} · before launch ${kn(s.before.started, s.before.views)}`,
    'Adoption in quiz weeks (higher is better):',
    `  visits through the quiz ${kn(u.viaQuiz, u.views)} · quiz starts reaching question 4 ${kn(u.finishedQuiz, u.startedQuiz)}`,
    `  "I don't know yet" per question: ${u.perStep.map((p) => `question ${p.step} ${p.unsure} of ${p.n}`).join(', ')}`,
    'Call rate, sent inquiries that get a scoping call (higher is better):',
    `  quiz weeks ${kn(s.calls.after.k, s.calls.after.n)} · off weeks ${kn(s.calls.off.k, s.calls.off.n)} · before launch ${kn(s.calls.before.k, s.calls.before.n)}`,
    'Calls with the format settled (higher is better):',
    `  quiz weeks ${kn(cq.quiz.formatSettled, cq.quiz.n)} · off weeks ${kn(cq.off.formatSettled, cq.off.n)} · before launch ${kn(cq.before.formatSettled, cq.before.n)}`,
    'Submit rate, started forms that are sent (should not get worse):',
    `  quiz weeks ${kn(s.quiz.submitted, s.quiz.started)} · off weeks ${kn(s.off.submitted, s.off.started)} · before launch ${kn(s.before.submitted, s.before.started)}`,
    `Kill line ${pct(s.kill.line)}: quiz weeks below it: ${s.kill.weeksBelow.length ? 'week ' + s.kill.weeksBelow.join(', week ') : 'none'}; longest run of quiz weeks in a row: ${s.kill.longestRun}`,
    'Bookings, the business goal (higher is better; not read on the card, see below):',
    `  bookings: quiz weeks ${s.bookings.after.k} in ${s.quiz.weeks} weeks · off weeks ${s.bookings.off.k} in ${s.off.weeks} weeks · before launch ${s.bookings.before.k} in ${s.baselineWeeks} weeks`,
    `  booking rate, bookings of scoping calls: quiz weeks ${kn(s.bookings.after.k, s.bookings.after.calls)} · off weeks ${kn(s.bookings.off.k, s.bookings.off.calls)} · before launch ${kn(s.bookings.before.k, s.bookings.before.calls)}`,
    `  A booking comes days to weeks after its call. Calls late in the window may still book after ${s.dataThrough}.`,
  ];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const config = JSON.parse(read('site/config.json'));
  const scenario = { ...JSON.parse(read('data/scenario.json')), shippedVariant: config.shipped };
  if (!scenario.weeksAfter || !config.shipped) {
    console.log('No launch data yet: site/config.json names no shipped variant, or data/ holds the baseline only.');
    process.exit(0);
  }
  const s = summarize(parseJsonl(read('data/events.jsonl')), parseCsv(read('data/inquiries.csv')), scenario);
  console.log(summaryLines(s).join('\n'));
}
