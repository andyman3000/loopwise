import { test } from 'node:test';
import assert from 'node:assert/strict';
import { weeklyFunnel, periodTotals, checkKill, quizUsage, sentByQuiz, parseCsv } from '../site/components/funnel.js';

const LAUNCH = Date.parse('2026-08-19T00:00:00Z');
const at = (days) => new Date(LAUNCH + days * 86400000 + 3600000).toISOString();
const ev = (days, type, session, props = {}, variant = 'v') => ({ ts: at(days), type, session, variant, props });

test('weekly funnel counts inquiry page visits, starts and sends per week, once per session', () => {
  const events = [
    ev(-3, 'page_view', 'a', { page: 'inquiry' }), ev(-3, 'page_view', 'a', { page: 'inquiry' }),
    ev(-3, 'page_view', 'b', { page: 'formats' }),
    ev(-3, 'inquiry_started', 'a'), ev(-3, 'inquiry_submitted', 'a'),
    ev(2, 'page_view', 'c', { page: 'inquiry' }), ev(2, 'page_view', 'd', { page: 'inquiry' }), ev(2, 'inquiry_started', 'c'),
  ];
  const weeks = weeklyFunnel(events, { launchMs: LAUNCH, weeksBefore: 1, weeksAfter: 1 });
  assert.deepEqual(weeks.map((w) => [w.views, w.started, w.submitted]), [[1, 1, 1], [2, 1, 0]]);
  assert.equal(periodTotals(weeks, 'after').startRate, 0.5);
  assert.equal(periodTotals(weeks, 'baseline').rate, 1);
});

test('kill check counts weeks below a quarter under the baseline and the longest run', () => {
  const weeks = [0.2, 0.6, 0.2, 0.2].map((r, i) => ({ week: i, period: 'after', completionRate: r }));
  const k = checkKill(weeks, 0.6);
  assert.deepEqual(k.weeksBelow, [0, 2, 3]);
  assert.equal(k.longestRun, 2);
});

test('quiz usage: visits through the quiz, finish share, and "I don\'t know yet" per question', () => {
  const step = (s, n, unsure) => ev(1, 'inquiry_step_completed', s, { step: n, answered: !unsure, unsure });
  const events = [
    step('a', 1, false), step('a', 2, true), step('a', 3, false), step('a', 4, true), ev(1, 'page_view', 'a', { page: 'inquiry' }),
    step('b', 1, false),
    ev(1, 'page_view', 'c', { page: 'inquiry' }),
  ];
  const u = quizUsage(events, 'v');
  assert.equal(u.views, 2);
  assert.equal(u.viaQuiz, 1);
  assert.equal(u.startedQuiz, 2);
  assert.equal(u.finishedQuiz, 1);
  assert.deepEqual(u.perStep.map((p) => p.unsure), [0, 1, 0, 1]);
});

test('sent inquiries split by the quiz column', () => {
  const rows = parseCsv('id,variant,quiz\n1,v,true\n2,v,false\n3,baseline,\n');
  assert.deepEqual(sentByQuiz(rows, 'v'), { quiz: 1, noQuiz: 1 });
});
