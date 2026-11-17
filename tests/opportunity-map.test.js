import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseOpportunities, parseSelection, mapPage, readTree, assignRows } from '../lib/opportunity-map.js';

const OPP = `# Opportunities: interviews

### O1: Buyers do not know which format fits
- **Evidence:**
  - "I have no idea." (sources/interviews/a.md:4, S, buyer)
- **Voices:** 1 distinct speaker: buyer. Second-hand: yes, she reports what participants said.
- **KPI branch:** Branch A: inquiries that end in a booking, driver submit rate. [assumption: x]
- **Assessment:** partly supported. One voice.

### O2: Participants lose it after a week
- **Voices:** 3 distinct speakers: participants. Second-hand: no.
- **KPI branch:** Branch B: follow-up bookings, not this quarter. Side link to Branch A, driver booking rate.
- **Assessment:** well supported. Three voices.

## Looks like an opportunity, but
### Not this one

## Goes into comparison
Goes into comparison: ____ (human decides)
Decided by: ____ · Date: ____
`;

const TREE = `## Tree
- Business goal: more booked workshops (x:8)
  - Branch A: inquiries that end in a booking (x:1)
    - start rate: percentage of inquiry page visits that start the form · measured: \`inquiry_started\`
    - submit rate: percentage of started forms that are sent · measured: \`inquiry_submitted\`
    - booking rate: percentage of scoping calls that end in a booking · measured: \`booking_confirmed\`
  - Branch B: follow-up bookings, not this quarter (x:2)

## How branch A works
`;

function repo(md = OPP) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-map-'));
  fs.mkdirSync(path.join(root, 'discovery', 'opportunities'), { recursive: true });
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'interviews.md'), md);
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'data.md'), '# Observations\n');
  fs.writeFileSync(path.join(root, 'discovery', 'kpi-tree.md'), TREE);
  return root;
}

test('opportunities are parsed with level, voices, speakers and branch', () => {
  const [o1, o2, more] = parseOpportunities(OPP);
  assert.equal(more, undefined);
  assert.deepEqual([o1.id, o1.level, o1.voices, o1.speakers, o1.branch, o1.driver, o1.secondHand], ['O1', 'partly supported', 1, ['buyer'], 'A', 'submit rate', true]);
  assert.deepEqual([o2.level, o2.speakers, o2.branch, o2.sideLink], ['well supported', ['participant'], 'B', true]);
  assert.equal(o1.quote.where, 'sources/interviews/a.md:4');
});

test('an empty selection reads as nothing chosen, a filled one as its ids', () => {
  assert.deepEqual(parseSelection(OPP), { ids: [] });
  assert.deepEqual(parseSelection(OPP.replace('____ (human decides)', 'O2, O1')), { ids: ['O2', 'O1'] });
});

test('the map shows a card per opportunity, branch names from the KPI tree, and leaves data.md out', () => {
  const html = mapPage(repo());
  assert.equal((html.match(/<article class="card/g) || []).length, 2);
  assert.match(html, /A: inquiries that end in a booking/);
  assert.match(html, /<span class="badge side">side link<\/span>/);
  assert.match(html, /Nothing is in the comparison yet/);
  assert.doesNotMatch(html, /data\.md|<form|\/api\//);
});

test('the map marks what the files put into the comparison', () => {
  const html = mapPage(repo(OPP.replace('____ (human decides)', 'O2')));
  assert.equal((html.match(/class="in"/g) || []).length, 1);
  assert.match(html, /1 marked "in comparison"/);
});

test('each quote on a card links to its source file and line', () => {
  const md = OPP.replace('  - "I have no idea." (sources/interviews/a.md:4, S, buyer)', '  - "I have no idea." (sources/interviews/a.md:4, S, buyer)\n  - "I sketched three ways." (sources/interviews/a.md:9, S, buyer)\n  - "Seen in a mail." (site/inquiry.html:27)');
  const [o1] = parseOpportunities(md);
  assert.deepEqual(o1.quotes.map((q) => q.where), ['sources/interviews/a.md:4', 'sources/interviews/a.md:9', 'site/inquiry.html:27']);
  const html = mapPage(repo(md));
  assert.match(html, /&quot;I have no idea\.&quot;<small><a href="\/sources\/interviews\/a\.md#L4">sources\/interviews\/a\.md:4<\/a><\/small>/);
  assert.match(html, /<summary>2 more quotes<\/summary>/);
  assert.match(html, /<a href="\/sources\/interviews\/a\.md#L9">/);
  assert.match(html, /<small>site\/inquiry\.html:27<\/small>/, 'a location outside sources/ stays plain text');
});

const ROWS = `### O1: Direct
- **KPI branch:** Branch A: inquiries that end in a booking, driver submit rate. [assumption: x]
- **Assessment:** partly supported.

### O2: Side link from B
- **KPI branch:** the need is met after the format. So it sits mainly on Branch B. Side link: Branch A, driver booking rate [assumption: y].
- **Assessment:** well supported.

### O3: Side link without a branch
- **KPI branch:** no branch in the tree for preparation. Side link to Branch A, driver booking rate [assumption: z].
- **Assessment:** unsupported.

### O4: B only
- **KPI branch:** Branch B: follow-up bookings, parked this quarter. No side link to Branch A. The tree names no driver.
- **Assessment:** unsupported.

### O5: Nothing
- **KPI branch:** no branch in the tree for preparation. No side link.
- **Assessment:** unsupported.

### O6: Unknown driver
- **KPI branch:** Branch A: inquiries that end in a booking, driver form length. [assumption: w]
- **Voices:** 1 distinct speaker: developer. Second-hand: no.
- **Assessment:** unsupported.

### O7: Negated driver
- **KPI branch:** no branch in the tree for the day itself. No side link. A new buyer does not see it. No driver of Branch A fits.
- **Assessment:** unsupported.
`;

test('the tree is read with its drivers in order and the first branch not parked as active', () => {
  const tree = readTree(repo());
  assert.deepEqual(tree.branches.map((b) => [b.id, b.drivers.map((d) => d.name)]), [['A', ['start rate', 'submit rate', 'booking rate']], ['B', []]]);
  assert.equal(tree.active.id, 'A');
  assert.equal(tree.active.drivers[0].sentence, 'percentage of inquiry page visits that start the form');
});

test('cards go to the row of their driver, by side link, to branch B, to no branch, or to the catch-all for an unknown driver', () => {
  const root = repo(ROWS);
  const entries = parseOpportunities(ROWS).map((o) => ({ source: 'interviews', o }));
  const { rows, unplaced } = assignRows(entries, readTree(root));
  const at = Object.fromEntries(rows.map((r) => [r.title, r.cards.map((c) => c.o.id + (c.side ? ' side' : ''))]));
  assert.deepEqual(at, {
    'start rate': [],
    'submit rate': ['O1'],
    'booking rate': ['O2 side', 'O3 side'],
    'Branch A, driver not in the tree': ['O6'],
    'Branch B: follow-up bookings, not this quarter': ['O4'],
    'No KPI branch': ['O5', 'O7'],
  });
  const o7 = parseOpportunities(ROWS)[6];
  assert.deepEqual([o7.branch, o7.driver, o7.sideLink], ['', '', false], '"No driver of Branch A fits" names no branch and no driver');
  assert.deepEqual(unplaced.map((u) => [u.o.id, u.why]), [['O6', 'driver "form length" is not in the tree']]);
  const [, o2, o3, o4] = parseOpportunities(ROWS);
  assert.deepEqual([o2.branch, o3.branch, o4.branch, o4.sideLink], ['B', '', 'B', false], '"No side link to Branch A" is no side link');
  assert.deepEqual(parseOpportunities(ROWS)[5].speakers, ['developer']);
});

test('rows follow the tree, empty steps still show, the Branch A catch-all only when used', () => {
  const html = mapPage(repo());
  const heads = [...html.matchAll(/<h2>(?:<span class="step">\d+<\/span>)?([^<]+)<span/g)].map((m) => m[1]);
  assert.deepEqual(heads, ['start rate', 'submit rate', 'booking rate', 'Branch B: follow-up bookings, not this quarter', 'No KPI branch']);
  assert.match(html, /percentage of inquiry page visits that start the form/);
  assert.equal((html.match(/No opportunity names this step\./g) || []).length, 1, 'start rate has no card');
  assert.match(html, /No opportunity sits here\./);
  assert.match(html, /Each row is one step of Branch A of the KPI tree/);
  assert.match(html, /data-value="developer"/);
  const booking = html.split('data-row="driver:booking rate"')[1].split('<section')[0];
  assert.match(booking, /class="card well side"/);
  assert.match(booking, /<span class="badge parked">B: follow-up bookings, not this quarter<\/span>/, 'a side-link card keeps its parked badge');
});

test('a first-person heading shows the statement on the card, with role and moment below it', () => {
  const md = OPP.replace('### O1: Buyers do not know which format fits', '### O1: "I don\'t know which format to ask for." (buyer, before booking)');
  const [o1] = parseOpportunities(md);
  assert.deepEqual([o1.id, o1.statement, o1.context], ['O1', "I don't know which format to ask for.", 'buyer, before booking']);
  assert.equal(o1.title, '"I don\'t know which format to ask for." (buyer, before booking)');
  const html = mapPage(repo(md));
  assert.match(html, /&ldquo;I don't know which format to ask for\.&rdquo;<span class="ctx">buyer, before booking<\/span>/);
  const [, o2] = parseOpportunities(md);
  assert.deepEqual([o2.statement, o2.context], ['Participants lose it after a week', '']);
});
