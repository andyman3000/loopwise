import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseComparison, parseIntent, treePage, funnelBars, thousands, namedDrivers, readExperiment } from '../lib/opportunity-tree.js';

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
| I2: a format quiz | the team | start rate | | |
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
  assert.match(html, /class="tag you">the team/);
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
  assert.equal((html.match(/class="sol [^"]*picked"/g) || []).length, 2);
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
  const md = MD.replace('well supported: 2 source groups', 'well supported: 2 source groups, 5 buyers, all in that situation now')
    .replace('- **Leverage:** partly supported: indirect', '- **Leverage:** partly supported: indirect')
    .replace('## Evidence\n### C1: Sponsor fears the fade\n- **Evidence strength:** long text', '## Evidence\n### C1: Sponsor fears the fade\n- **Evidence strength:** long text\n- **Gaps and uncertainty:** what the people above ask for');
  const p = parseComparison(md);
  assert.equal(p.candidates[0].evidence.counts, '5 buyers · 2 source groups');
  assert.equal(p.candidates[0].leverage.level, 'partly supported');
  assert.equal(p.candidates[0].gap, 'what the people above ask for');
  assert.deepEqual(p.candidates[0].sources, [{ group: 'interviews', id: 'O3' }]);
  const html = treePage(repo(md));
  const card = html.match(/<article class="card[^"]*"[^>]*data-id="C1"[\s\S]*?<\/article>/)[0];
  const [summary, details] = card.split('<div class="more">');
  assert.match(summary, /<span class="pill well tip" data-tip="5 buyers · 2 source groups: interviews">well supported<\/span>/, 'the counts show on hover');
  assert.match(summary, /<b>booking rate<\/b> <span class="pill partly tip" data-tip="3 of 5 lost here">partly supported<\/span>/);
  assert.match(summary, />Details<\/button>/);
  assert.doesNotMatch(summary, /Wins on|Strongest quote|8 weeks|lost here</, 'the overview shows the two labels only');
  assert.match(details, /<div class="part x go">/, 'the link and the reasoning are for the Details view only');
  assert.match(details, /Can we see a change in 8 weeks\? <span class="pill un">no<\/span>/);
  assert.match(details, /how often the event that would show the change is counted/);
  assert.equal((details.match(/<a /g) || []).length, 1, 'the Details view has one link only');
  assert.match(details, /href="\/discovery\/opportunity-comparison.md#evidence-C1">All details of C1/);
  assert.match(details, /<h3>Open gap<\/h3>what the people above ask for/);
});

test('every step, candidate and idea is a place the keys and the hash can jump to', () => {
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT);
  const html = treePage(root);
  const views = [...html.matchAll(/<(?:div|article|section) [^>]*data-view="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(views, ['S1', 'S2', 'S3', 'S4', 'C1', 'C2', 'C2-I1', 'C2-I2', 'C2-I3', 'C2-I3-E1', 'decision']);
  assert.match(html, /data-v="C1">C1<kbd>1<\/kbd>/);
  for (const k of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape']) assert.match(html, new RegExp(k), `the page script handles ${k}`);
  assert.match(html, /max-width: 48rem/, 'a narrow screen gets one scrolling page instead of the camera');
});

test('the Details view names each source group the need comes from, with the people who say it there', () => {
  const root = repo(MD.replace('- **From:** interviews O3', '- **From:** interviews O3 + inbox O1')
    .replace('well supported: 2 source groups', 'well supported: 2 source groups, 5 buyers, each about their own situation'));
  fs.mkdirSync(path.join(root, 'discovery', 'opportunities'));
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'interviews.md'), `## Opportunities

### O3: "Everything was as before." (sponsor, after the training)
- **Evidence:**
  - "Everything was as before." (\`sources/interviews/a.md:3\`, Carla, sponsor)
- **Voices:** 2 distinct speakers: buyers. Second-hand: no.
- **Assessment:** partly supported. Two buyers.
`);
  const html = treePage(root);
  const card = html.match(/<article class="card[^"]*"[^>]*data-id="C1"[\s\S]*?<\/article>/)[0];
  assert.match(card, /data-tip="5 buyers · 2 source groups: interviews, support requests"/, 'the hover names the groups');
  assert.match(card, /<b class="line">5 voices from 2 sources back this up:<\/b><ol class="voices"><li><b>Interviews \(2\):<\/b> <q>Everything was as before\.<\/q><\/li><li><b>Support requests:<\/b><\/li><\/ol>/, 'one quote per source; a missing file still names its source');
  assert.match(card, /<span class="basis">Each about their own situation\.<\/span>/);
  assert.doesNotMatch(card, /sources\/interviews\/a.md/, 'no source paths in the Details view');
});

test('citations written as Markdown links parse like bare ones in intents, opportunities and the KPI tree', async () => {
  const { parseOpportunities } = await import('../lib/opportunity-map.js');
  const { drawPage } = await import('../scripts/draw-kpi-tree.js');
  const intent = parseIntent('# Intent: x\n\n> Opportunity: C1, "x", in [discovery/opportunity-comparison.md](../opportunity-comparison.md)\n\n## Solution ideas\n\n| Idea | From | Driver | Critical assumption | Level |\n|---|---|---|---|---|\n| I1: a guide | the pair | start rate ([discovery/kpi-tree.md:21](../kpi-tree.md#L21)) | | |\n');
  assert.equal(intent.candidate, 'C1');
  assert.deepEqual(namedDrivers(intent.ideas[0].driver, [{ name: 'start rate' }, { name: 'submit rate' }]), ['start rate']);
  const [o] = parseOpportunities('### O1: "I cannot choose."\n- **Evidence:**\n  - "Side by side." ([sources/inquiry-mails/m.md:16](../../sources/inquiry-mails/m.md#L16), S, buyer)\n');
  assert.equal(o.quote.where, 'sources/inquiry-mails/m.md:16');
  const html = drawPage('# KPI tree\n\n## Tree\n- Business goal: more bookings ([product/strategy.md:8](../product/strategy.md#L8))\n  - Branch A: inquiries ([product/strategy.md:12](../product/strategy.md#L12))\n    - start rate: share that starts · measured: no\n');
  assert.doesNotMatch(html, /strategy\.md/);
});

test('an idea is a small card on the overview: number, short title, tested first; the rest only on zoom', () => {
  const root = repo(MD);
  fs.mkdirSync(path.join(root, 'discovery', 'intents'));
  fs.writeFileSync(path.join(root, 'discovery', 'intents', 'x.md'), INTENT.replace('| I3: examples of success lines |', '| I3: Show examples of success lines. Each example names a team ([site/formats.html:21](../../site/formats.html#L21)) (formats page, inquiry page) |')
    .replace('| submit rate |', '| submit rate ([discovery/kpi-tree.md:22](../kpi-tree.md#L22)) |')
    + '\n## Ideas not picked\n- I4: A chat on every page (all pages) · the team\n- I5: Ask the team size first. Then the rest (inquiry page) · another domain\n');
  const html = treePage(root);
  const sol = html.match(/<article class="sol[^"]*"[^>]*data-view="C2-I3"[\s\S]*?<\/article>/)[0];
  const [summary, details] = sol.split('<div class="more">');
  assert.match(summary, /<span class="mech">Show examples of success lines<\/span>/, 'the first sentence is the title');
  assert.match(summary, /tested first: success-line-first/);
  assert.match(summary, />Details<\/button>/);
  assert.doesNotMatch(summary, /pill|chip|<a /, 'no level, no steps, no links on the overview card');
  assert.match(details, /<h3>The idea<\/h3>Show examples of success lines\. Each example names a team<span class="basis">Changes: formats page, inquiry page<\/span>/);
  assert.match(details, /<div class="part x"><h3>Steps it moves<\/h3><span class="acts"><span class="chip">submit rate<\/span>/);
  assert.equal((details.match(/<a /g) || []).length, 1, 'one link: the intent file');
  assert.doesNotMatch(sol, /\.md:\d+|\.html:\d+/, 'no file references anywhere in the card');
  assert.match(html, /data-view="C2-rest"[^>]*data-title="2 more ideas, not picked"/);
  assert.match(html, /<li><b>I5<\/b> Ask the team size first<\/li>/);
  const views = [...html.matchAll(/<article class="sol[^"]*"[^>]*data-view="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(views, ['C2-I1', 'C2-I2', 'C2-I3', 'C2-rest'], 'one row, in the order of the file, the ideas not picked last');
  assert.match(html, /data-v="ideas">Ideas<kbd>I<\/kbd>/);
});

function experimentRepo() {
  const root = repo(MD);
  const put = (rel, text) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), text); };
  put('discovery/intents/x.md', INTENT);
  put('discovery/test-cards/success-line-first-prototype.md', `# Prototype test card: success-line-first

> Card owner: Product lead (Loopwise), 2026-11-15

## We believe that (the assumption we test)
"Buyers can name a success line." ([discovery/intents/x.md:3](../intents/x.md#L3))
Level in the intent: "unsupported"

## To verify that, we will
Show 5 people the page.

## We are right if (go-on line)
At least 3 of 5 testers write a success line.
Set by: Product lead (Loopwise) · Set on: 2026-11-15

## We rework or drop the idea if (rework-or-drop line)
- **We drop the idea if** 3 or more of 5 testers leave the field empty.
`);
  put('discovery/user-tests/success-line-first-spec.md', `# Persona walkthrough: success-line-first, spec

> Run by an agent (\`persona-walkthrough\`) on 2026-11-16. Not a decision.

## Buyer without budget
x
## Buyer with budget
y
## Against the two lines
Unclear. Neither persona file shows the step.
`);
  put('discovery/user-tests/success-line-first-tester-1.md', '# Test with people: success-line-first, tester 1\n');
  put('discovery/user-tests/success-line-first-tester-2.md', '# Test with people: success-line-first, tester 2\n');
  return { root, put };
}

test('an experiment is read from the files of its variant: card, persona runs, people, learning card', () => {
  const { root, put } = experimentRepo();
  let e = readExperiment(root, 'success-line-first');
  assert.deepEqual([e.card.owner, e.card.date, e.planned, e.testers], ['Product lead (Loopwise)', '2026-11-15', 5, 2]);
  assert.deepEqual(e.personaRuns, [{ mode: 'spec', round: 1, run: 1, date: '2026-11-16', personas: 2, verdict: 'Unclear' }]);
  put('discovery/user-tests/success-line-first-spec-run2.md', '> Run by an agent on 2026-11-18.\n## Buyer without budget\n## Buyer with budget\n## Against the two lines\nHeld. Both personas write a line.\n');
  put('discovery/user-tests/success-line-first-page-2.md', '> Run by an agent on 2026-11-25.\n## Buyer without budget\n## Against the two lines\nBroke: she leaves.\n');
  put('discovery/user-tests/success-line-first-spec-notes.md', 'not a run');
  assert.deepEqual(readExperiment(root, 'success-line-first').personaRuns.map((r) => [r.mode, r.round, r.run, r.date, r.verdict]),
    [['spec', 1, 1, '2026-11-16', 'Unclear'], ['spec', 1, 2, '2026-11-18', 'Held'], ['page', 2, 1, '2026-11-25', 'Broke']], 'every run file counts, in order; other files do not');
  assert.equal(e.card.goOn, 'At least 3 of 5 testers write a success line.');
  assert.equal(e.card.drop, 'We drop the idea if 3 or more of 5 testers leave the field empty.');
  assert.equal(e.learning, null);
  put('discovery/decisions/002-success-line-first.md', `# Decision 002: success-line-first, learning card

## Round 1, 2026-11-17
### Therefore we will
Change the field label.
### What we decided
Another round, with the label changed
## Round 2, 2026-11-20
### Therefore we will
Build the real page.
### What we decided
____ (human decides)
`);
  e = readExperiment(root, 'success-line-first');
  assert.deepEqual([e.learning.rounds, e.learning.outcome, e.learning.text, e.learning.date], [2, '', 'Build the real page.', '2026-11-20'], 'the last round counts, and an empty decision stays open');
  put('discovery/decisions/002-success-line-first.md', '## Round 1, 2026-11-17\n### What we decided\nKill: buyers left the field empty\n');
  assert.equal(readExperiment(root, 'success-line-first').learning.outcome, 'drop');
  put('discovery/decisions/002-success-line-first.md', '## Round 1, 2026-11-17\n### What we decided\nMove on, as the team said\n');
  assert.equal(readExperiment(root, 'success-line-first').learning.outcome, 'go on');
});

test('the experiment sits in its own row under its idea: name, stage dots, where it stands, details on zoom', () => {
  const { root } = experimentRepo();
  const html = treePage(root);
  const card = html.match(/<article class="exp[^"]*"[^>]*>[\s\S]*?<\/article>/)[0];
  assert.match(card, /data-view="C2-I3-E1" data-parent="C2-I3"/, 'under the idea tested first');
  const [summary, details] = card.split('<div class="more">');
  assert.match(summary, /<span class="mech">success-line-first<\/span>/);
  assert.equal((summary.match(/<i class="f"/g) || []).length, 3, 'test card, personas and people are done');
  assert.match(summary, /spec checked in 1 persona run · 2 of 5 people tested/, 'persona runs and people are counted apart');
  assert.doesNotMatch(summary, /<a /);
  assert.match(details, /<b>Test card<\/b> Product lead \(Loopwise\), 2026-11-15/);
  assert.match(details, /<b>Personas<\/b> <ul class="runs"><li>spec, run 1: 2 personas, 2026-11-16, against the lines: unclear<\/li><\/ul>/);
  assert.match(details, /<h3>We go on if<\/h3>At least 3 of 5 testers write a success line\./);
  assert.equal((details.match(/<a /g) || []).length, 1, 'one link: the prototype test card');
  assert.match(html, /<div style="grid-column:3"><article class="exp/, 'in the column of idea I3');
  assert.match(html, /data-v="exps">Experiments<kbd>E<\/kbd>/);
  assert.doesNotMatch(treePage(repo(MD)), /class="exp/, 'no named variant, no experiment row');
});

test('several persona runs are counted as runs, never as more personas', () => {
  const { root, put } = experimentRepo();
  put('discovery/user-tests/success-line-first-spec-run2.md', '> Run by an agent on 2026-11-18.\n## Buyer without budget\n## Buyer with budget\n## Against the two lines\nHeld.\n');
  const card = treePage(root).match(/<article class="exp[^"]*"[^>]*>[\s\S]*?<\/article>/)[0];
  assert.match(card, /spec checked in 2 persona runs · 2 of 5 people tested/);
  assert.match(card, /<li>spec, run 2: 2 personas, 2026-11-18, against the lines: held<\/li>/);
});
