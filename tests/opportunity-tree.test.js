import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseComparison, treePage } from '../lib/opportunity-tree.js';

const MD = `# Opportunity comparison

> Assessment by an agent. Date: 2026-08-18.
> Material: synthetic.

## What you decide
Question: Which need do we work on for the next eight weeks?
Appears favoured: C2, because it has the most voices. A reading, not a choice.
Not readable from today's data: C1. Few bookings.
No candidate: start rate: 5 of 10 leave. Open research questions, not candidates.

## Your first try
"Fade fear" - trust gets them to the form
Matches: C1
Where the draft differs:
- It sits later.

## Tree
Outcome: more booked workshops (product/strategy.md:8)
Branch: Branch A: inquiries that end in a booking (product/strategy.md:12)
- website visits: 100 visits, the top of the funnel (data.md D1) · Candidates: none
- start rate: 5 of 10 leave without starting (data.md D3) · Candidates: C1 (needs research)
  - Research: a file says it could sit here (x.md:1)
- call rate: 4 of 8 get no call (data.md D5) · Candidates: C2 (assumed)
  - Data: visits with a formats view go on less often, 3 of 9 against 4 of 6 (data.md D2)
- booking rate: 3 of 5 calls end without a booking (data.md D6) · Candidates: C1, C2

## Candidates
### C1: Sponsor fears the fade
- **From:** interviews O3
- **Evidence:** well supported: 2 source groups
- **Leverage:** partly supported: indirect
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** unsupported: \`booking_confirmed\`, 3 events
- **Wins on:** first-hand
- **Loses on:** late
- **Strongest quote:** "Everything was as before." (sources/interviews/a.md:3)

### C2: Sponsor does not know what to ask for
- **From:** emails O1
- **Evidence:** partly supported: 1 group
- **Readable from today's data in 8 weeks:** partly supported: \`scoping_call_booked\`
- **Wins on:** reach
- **Loses on:** <unclear> driver

## Evidence
### C1: Sponsor fears the fade
- **Evidence strength:** long text

## Decision (human)

Chosen opportunity: ____ (human decides)
We would switch if: ____
`;

function repo(md) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-tree-'));
  fs.mkdirSync(path.join(root, 'discovery'), { recursive: true });
  if (md !== undefined) fs.writeFileSync(path.join(root, 'discovery', 'opportunity-comparison.md'), md);
  return root;
}

test('the comparison is parsed into goal, drivers in order, candidates and their links', () => {
  const p = parseComparison(MD);
  assert.equal(p.outcome, 'more booked workshops');
  assert.equal(p.branch, 'Branch A: inquiries that end in a booking');
  assert.deepEqual(p.drivers.map((d) => d.name), ['website visits', 'start rate', 'call rate', 'booking rate']);
  assert.deepEqual([p.drivers[0].lost, p.drivers[1].lost, p.drivers[1].of], [null, 5, 10]);
  assert.deepEqual(p.drivers.map((d) => d.data.length), [0, 0, 1, 0]);
  assert.match(p.drivers[2].data[0], /^visits with a formats view/);
  assert.deepEqual(p.candidates.map((c) => c.id), ['C1', 'C2']);
  assert.deepEqual(p.candidates[1].drivers, [{ name: 'call rate', kind: 'assumed' }, { name: 'booking rate', kind: 'named' }]);
  assert.deepEqual(p.candidates[0].drivers, [{ name: 'start rate', kind: 'research' }, { name: 'booking rate', kind: 'named' }]);
  assert.deepEqual(p.drivers[1].research, ['a file says it could sit here (x.md:1)']);
  assert.deepEqual([p.candidates[0].evidence.level, p.candidates[0].measurable.level], ['well supported', 'unsupported']);
  assert.equal(p.candidates[0].quote.where, 'sources/interviews/a.md:3');
  assert.deepEqual([p.favoured.id, p.firstTry.id, p.chosen, p.flip], ['C2', 'C1', '', '']);
  assert.equal(p.firstTry.text, '"Fade fear" - trust gets them to the form');
});

test('the page draws one card per candidate, marks the gap, the favourite and the first try', () => {
  const html = treePage(repo(MD));
  assert.equal((html.match(/<button type="button" class="card/g) || []).length, 2);
  assert.equal((html.match(/class="node driver/g) || []).length, 4);
  assert.equal((html.match(/No candidate with evidence yet/g) || []).length, 1, 'start rate is a gap with a possible candidate, website visits is not a gap');
  assert.match(html, /Needs research:<\/b> a file says/);
  assert.match(html, /start rate \(needs research\)/);
  assert.match(html, /comparison favours/);
  assert.match(html, /Data behind the dashed link:<\/b> visits with a formats view/);
  assert.match(html, /your first try/);
  assert.match(html, /Open\. You fill "Chosen opportunity"/);
  assert.match(html, /&lt;unclear&gt; driver/);
  assert.doesNotMatch(html, /<unclear>/);
});

test('a filled decision shows on the page and on the chosen card', () => {
  const html = treePage(repo(MD.replace('Chosen opportunity: ____ (human decides)', 'Chosen opportunity: C1, because it is lived')
    .replace('We would switch if: ____', 'We would switch if: a sponsor who never booked')));
  assert.match(html, /C1, because it is lived/);
  assert.match(html, /a sponsor who never booked/);
  assert.match(html, /<span class="tag pick">chosen<\/span>/);
});

test('without a comparison, or with the old table format, the page says what to do', () => {
  assert.match(treePage(repo()), /No comparison yet/);
  assert.match(treePage(repo('# Opportunity comparison\n\n## Comparison\n| a | b |\n')), /no "Tree" or "Candidates" section/);
});
