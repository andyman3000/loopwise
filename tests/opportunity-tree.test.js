import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseComparison, parseIntent, treePage } from '../lib/opportunity-tree.js';

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
- start rate: 5 of 10 leave without starting (data.md D3) · Candidates: none
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
  assert.deepEqual(p.candidates[1].drivers, [{ name: 'call rate', assumed: true }, { name: 'booking rate', assumed: false }]);
  assert.deepEqual([p.candidates[0].evidence.level, p.candidates[0].measurable.level], ['well supported', 'unsupported']);
  assert.equal(p.candidates[0].quote.where, 'sources/interviews/a.md:3');
  assert.deepEqual([p.favoured.id, p.firstTry.id, p.chosen, p.flip], ['C2', 'C1', '', '']);
  assert.equal(p.firstTry.text, '"Fade fear" - trust gets them to the form');
});

test('the page draws one card per candidate, marks the gap, the favourite and the first try', () => {
  const html = treePage(repo(MD));
  assert.equal((html.match(/<button type="button" class="card/g) || []).length, 2);
  assert.equal((html.match(/class="node driver/g) || []).length, 4);
  assert.equal((html.match(/No candidate acts here/g) || []).length, 1, 'start rate is a gap, website visits is not');
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

const INTENT = `# Intent: ask without knowing the format

> Assessment by an agent. Date: 2026-08-18.
> Opportunity: C2, sponsor does not know the format, in discovery/opportunity-comparison.md · Decision: discovery/decisions/001-x.md

## Solution ideas

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I1: a call request instead of the form | the pair | call rate (\`discovery/kpi-tree.md:25\`) | sponsors would rather talk | partly supported |
| I2: three questions about the team | another domain | start rate | sponsors can describe their team | unsupported |
| I3: examples of success lines | today's page, changed | submit rate | sponsors can name a success line | unsupported |

## Selection (human)

- Assumption we test first: sponsors can name a success line
- Why this one first: no source has it
- Idea it comes from: I3
- Variant name (lowercase with dashes): success-line-first
- Who: Reference decision (replace with your own) · When: 2026-08-18
`;

test('an intent gives its candidate, its ideas with source, level and driver, and the idea tested first', () => {
  const i = parseIntent(INTENT);
  assert.equal(i.candidate, 'C2');
  assert.deepEqual(i.ideas.map((x) => x.id), ['I1', 'I2', 'I3']);
  assert.deepEqual(i.ideas.map((x) => x.level), ['partly supported', 'unsupported', 'unsupported']);
  assert.equal(i.ideas[1].driver, 'start rate');
  assert.equal(i.ideas[0].from, 'the pair');
  assert.deepEqual([i.chosen, i.variant], ['I3', 'success-line-first']);
  assert.deepEqual([parseIntent(INTENT.replace('I3\n', '____ (human decides)\n')).chosen], ['']);
});

test('the tree draws the ideas under their opportunity and marks the one tested first', () => {
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT);
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'other.md'), INTENT.replace('Opportunity: C2', 'Opportunity: C9'));
  const html = treePage(root);
  assert.equal((html.match(/<button type="button" class="sol/g) || []).length, 3, 'C9 is not on the tree, so its ideas are left out');
  assert.equal((html.match(/data-parent="C2"/g) || []).length, 3);
  assert.match(html, /tested first: success-line-first/);
  assert.match(html, /href="\/discovery\/intents\/x.md"/);
  assert.doesNotMatch(treePage(repo(MD)), /class="sol/);
});

test('right after the first step, ideas without an assumption are drawn, with no level pill', () => {
  const early = `# Intent: x

> Opportunity: C2, sponsor does not know the format

## Solution ideas

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I1: a call request instead of the form | the pair | call rate | | |
| I2: a format quiz | the pair | start rate | | |
| I3: case stories | another domain | reach rate | | |
| I4: one question first | turned around | start rate | | |
| I5: a chat | today's page, changed | start rate | | |

## Selection (human)

- Idea it comes from: ____ (human decides)
`;
  const i = parseIntent(early);
  assert.equal(i.ideas.length, 5);
  assert.deepEqual([i.ideas[0].assumption, i.ideas[0].level, i.chosen], ['', '', '']);
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), early);
  const html = treePage(root);
  assert.equal((html.match(/<button type="button" class="sol/g) || []).length, 5);
  assert.doesNotMatch(html, /Critical assumption:|not given/);
  assert.match(html, /class="tag you">the pair/);
});

test('an idea that moves two drivers shows a chip for each, and the page lights up every driver it names', () => {
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT.replace('| start rate |', '| start rate (`discovery/kpi-tree.md:21`) · submit rate (`discovery/kpi-tree.md:22`) |'));
  const html = treePage(root);
  const sol = html.match(/<button type="button" class="sol[^"]*"[^>]*data-driver="start rate[\s\S]*?<\/button>/)[0];
  assert.equal((sol.match(/class="chip"/g) || []).length, 2);
  assert.match(sol, /<span class="chip">start rate<\/span><span class="chip">submit rate<\/span>/);
  assert.match(html, /drivers\.filter\(/, 'the page script lights up all named drivers, not the first');
});

test('every round marks its own idea, and an idea named in words only is not marked', () => {
  const two = INTENT + '\n## Selection (human)\n\n- Idea it comes from: I1, the second round\n- Variant name (lowercase with dashes): second-try\n';
  const i = parseIntent(two);
  assert.deepEqual(i.tested, [{ id: 'I3', variant: 'success-line-first' }, { id: 'I1', variant: 'second-try' }]);
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), two);
  const html = treePage(root);
  assert.equal((html.match(/class="sol picked"/g) || []).length, 2);
  assert.match(html, /tested first: success-line-first/);
  assert.match(html, /tested in round 2: second-try/);
  assert.deepEqual(parseIntent(INTENT.replace('- Idea it comes from: I3', '- Idea it comes from: the call button')).tested, []);
});
