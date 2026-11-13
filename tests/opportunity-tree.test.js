import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseComparison, parseIntent, treePage, funnelBars, thousands, namedDrivers } from '../lib/opportunity-tree.js';

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
- **From:** inquiry-mails O1
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
  assert.equal((html.match(/<article class="card/g) || []).length, 2);
  assert.equal((html.match(/class="node driver/g) || []).length, 4);
  assert.equal((html.match(/No candidate acts here/g) || []).length, 1, 'start rate is a gap, website visits is not');
  assert.match(html, /comparison favours/);
  assert.match(html, /<h3>Data behind the dashed link<\/h3>visits with a formats view/);
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
  assert.equal((html.match(/<article class="sol/g) || []).length, 3, 'C9 is not on the tree, so its ideas are left out');
  assert.equal((html.match(/data-parent="C2"/g) || []).length, 3);
  assert.match(html, /tested first: success-line-first/);
  assert.match(html, /href="\/discovery\/intents\/x.md"/);
  assert.doesNotMatch(treePage(repo(MD)), /<article class="sol/);
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
  assert.equal((html.match(/<article class="sol/g) || []).length, 5);
  assert.doesNotMatch(html, /Critical assumption:|not given/);
  assert.match(html, /class="tag you">the pair/);
});

test('an idea that moves two drivers shows a chip for each, and the page lights up every driver it names', () => {
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT.replace('| start rate |', '| start rate (`discovery/kpi-tree.md:21`) · submit rate (`discovery/kpi-tree.md:22`) |'));
  const html = treePage(root);
  const sol = html.match(/<article class="sol[^"]*"[^>]*data-driver="start rate[\s\S]*?<\/article>/)[0];
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

const FUNNEL = MD.replace(/^- website visits:[\s\S]*?(?=\n## Candidates)/m, `- website visits: 3766 visits, the top of the funnel (data.md D1) · Candidates: none
- reach rate: 3026 of 3766 visits never open the inquiry page (data.md D1) · Candidates: C2 (assumed)
  - Data: of visits that see the formats page, 376 of 2291 open the inquiry page (data.md D2)
- start rate: 546 of 740 inquiry page visits leave without starting the form (data.md D3) · Candidates: C2
- submit rate: 81 of 194 started forms are not sent (data.md D4) · Candidates: C1
`);

test('each bar shows how many of the people on a step go on, so every step can be read', () => {
  const p = parseComparison(FUNNEL);
  assert.deepEqual(funnelBars(p.drivers), [null, { go: 740, of: 3766, share: 19.6 }, { go: 194, of: 740, share: 26.2 }, { go: 113, of: 194, share: 58.2 }]);
  const html = treePage(repo(FUNNEL));
  const widths = [...html.matchAll(/class="bar"[^>]*><i style="width:([\d.]+)%"/g)].map((m) => Number(m[1]));
  assert.deepEqual(widths, [19.6, 26.2, 58.2], 'measured against the step itself, not the top of the funnel');
  assert.match(html, /<span class="big">740 <small>of 3,766 go on<\/small>/);
  assert.match(html, /<span class="big">3,766 <small>visits, the top of the funnel<\/small>/, 'the first step shows its count without the citation');
});

test('the counts under each step are labelled as counted data, with thousands separators', () => {
  const html = treePage(repo(FUNNEL));
  assert.match(html, /<b>Counted in the data:<\/b> 3,026 of 3,766 visits never open the inquiry page/);
  assert.match(html, /<b>Counted in the data:<\/b> 3,766 visits, the top of the funnel/);
  assert.match(html, /376 of 2,291 open/);
  assert.match(html, /title="3,026 of 3,766 lost at this step"/);
  assert.equal(thousands('on 2026-08-18, see a.md:1234 and D1234'), 'on 2026-08-18, see a.md:1234 and D1234');
  assert.deepEqual(parseComparison(FUNNEL.replace('3026 of 3766', '3,026 of 3,766')).drivers[1].lost, 3026);
});

test('an idea on the start rate links to the start rate only, never to the open rate it mentions', () => {
  const md = MD.replace(/^- website visits:[\s\S]*?(?=\n## Candidates)/m, `- website visits: 100 visits, the top of the funnel (data.md D1) · Candidates: none
- open rate: 80 of 100 visits never open the inquiry page (data.md D1) · Candidates: C2 (assumed)
- start rate: 5 of 20 leave without starting (data.md D3) · Candidates: C2
`);
  const p = parseComparison(md);
  assert.deepEqual(namedDrivers('start rate (`discovery/kpi-tree.md:21`), acts after the open rate', p.drivers), ['start rate']);
  assert.deepEqual(namedDrivers('Start rate · open rate (`discovery/kpi-tree.md:20`)', p.drivers), ['open rate', 'start rate']);
  assert.deepEqual(namedDrivers('form start rate', p.drivers), [], 'a name the tree does not have links to nothing');
  const root = repo(md);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT.replace('| start rate |', '| start rate (`discovery/kpi-tree.md:21`), acts after the open rate |'));
  const html = treePage(root);
  const sol = html.match(/<article class="sol[^"]*"[^>]*data-key="discovery\/intents\/x.md#I2"[^>]*>/)[0];
  assert.match(sol, /data-drivers="\[&quot;start rate&quot;\]"/);
  assert.match(html, /JSON\.parse\(s\.dataset\.drivers\)/, 'the page script lights up the steps the server matched');
});

test('the overview card shows evidence counts and the lever, the details come only on zoom', () => {
  const md = MD.replace('well supported: 2 source groups', 'well supported: 2 source groups, 5 sponsors, all in that situation now')
    .replace('- **Leverage:** partly supported: indirect', '- **Leverage:** partly supported: indirect')
    .replace('## Evidence\n### C1: Sponsor fears the fade\n- **Evidence strength:** long text', '## Evidence\n### C1: Sponsor fears the fade\n- **Evidence strength:** long text\n- **Gaps and uncertainty:** what the people above ask for');
  const p = parseComparison(md);
  assert.equal(p.candidates[0].evidence.counts, '5 sponsors · 2 source groups');
  assert.equal(p.candidates[0].leverage.level, 'partly supported');
  assert.equal(p.candidates[0].gap, 'what the people above ask for');
  assert.deepEqual(p.candidates[0].sources, [{ group: 'interviews', id: 'O3' }]);
  const html = treePage(repo(md));
  const card = html.match(/<article class="card[^"]*"[^>]*data-id="C1"[\s\S]*?<\/article>/)[0];
  const [summary, details] = card.split('<div class="more">');
  assert.match(summary, /<span class="pill well tip" data-tip="5 sponsors · 2 source groups">well supported<\/span>/, 'the counts show on hover');
  assert.match(summary, /<b>booking rate<\/b> <span class="pill partly tip" data-tip="3 of 5 lost here">partly supported<\/span>/);
  assert.match(summary, />Details<\/button>/);
  assert.doesNotMatch(summary, /Wins on|Strongest quote|8 weeks|lost here</, 'the overview shows the two labels only');
  assert.match(details, /<div class="part x"><h3>Read more/, 'links and reasoning are for the Details view only');
  assert.match(details, /Can we see a change in 8 weeks\? <span class="pill un">no<\/span>/);
  assert.match(details, /how often the event that would show the change is counted/);
  assert.match(details, /<h3>Open gap<\/h3>what the people above ask for/);
  assert.match(details, /href="\/sources\/interviews\/a.md#L3"/, 'the quote opens its source line');
});

test('a candidate links to its opportunity entries and to its full assessment', () => {
  const html = treePage(repo(MD.replace('- **From:** inquiry-mails O1', '- **From:** inquiry-mails O1 + inbox O3')));
  assert.match(html, /href="\/discovery\/opportunities\/inquiry-mails.md#O1"/);
  assert.match(html, /href="\/discovery\/opportunities\/inbox.md#O3"/);
  assert.match(html, /href="\/discovery\/opportunity-comparison.md#evidence-C2"/);
});

test('every step, candidate and idea is a place the keys and the hash can jump to', () => {
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT);
  const html = treePage(root);
  const views = [...html.matchAll(/<(?:div|article|section) [^>]*data-view="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(views, ['S1', 'S2', 'S3', 'S4', 'C1', 'C2', 'C2-I1', 'C2-I2', 'C2-I3', 'decision']);
  assert.match(html, /data-v="C1">C1<kbd>1<\/kbd>/);
  for (const k of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape']) assert.match(html, new RegExp(k), `the page script handles ${k}`);
  assert.match(html, /max-width: 48rem/, 'a narrow screen gets one scrolling page instead of the camera');
});
