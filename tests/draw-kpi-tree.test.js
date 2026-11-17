import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawPage, readTree, readFormula } from '../scripts/draw-kpi-tree.js';

const MD = `# KPI tree

## Tree
- Business goal: more bookings (product/strategy.md:8)
  - Branch A: inquiries & calls (product/strategy.md:12)
    - start rate: started per view · measured: \`inquiry_started\` in data/events.jsonl
    - booking rate: bookings per call · measured: \`booking_confirmed\` in data/events.jsonl
  - Branch B: follow-up bookings, not this quarter (product/strategy.md:35)

## How branch A works
bookings = start rate × booking rate
`;

test('reads the tree list and the branch formula', () => {
  const { items, formulas } = readTree(MD);
  assert.equal(items.length, 1);
  assert.equal(items[0].children.length, 2);
  assert.equal(items[0].children[0].children.length, 2);
  assert.deepEqual(formulas, ['bookings = start rate × booking rate']);
});

test('draws the goal, the branches, the drivers as a × chain ending in the result, a dashed parked branch, escaped text', () => {
  const html = drawPage(MD);
  assert.match(html, /^<!doctype html>/);
  assert.equal((html.match(/class="node /g) || []).length, 6);
  assert.equal((html.match(/class="node driver"/g) || []).length, 2);
  assert.match(html, /class="node branch parked"/);
  assert.match(html, /not this quarter</);
  assert.match(html, /<h3>Measured<\/h3><code>inquiry_started<\/code>/, 'the events show when zoomed in');
  assert.match(html, /Step 1 · rate<\/span><span class="name">start rate</);
  assert.match(html, /<div class="more"><span class="what">started per view</, 'the definition shows only when zoomed in');
  assert.match(html, /inquiries &amp; calls/);
  assert.match(html, /class="name">start rate<\/span>[\s\S]*?<\/div><span class="op" aria-label="times">×<\/span><div class="node driver"/);
  assert.match(html, /aria-label="equals">=<\/span><div class="node result"><span class="kind">Result<\/span>bookings</);
  assert.match(html, /class="chain" data-branch="A" aria-label="bookings = start rate × booking rate"/);
  assert.doesNotMatch(html, /product\/strategy\.md/);
});

test('shows the first try and where the tree differs', () => {
  const html = drawPage(MD.replace('## Tree', '## Your first try\nwebsite, form, call\n\nWhere the tree differs:\n- No `scoping_call_booked` step.\n\n## Tree'));
  assert.match(html, /<b>Your first try<\/b><span>website, form, call</);
  assert.match(html, /No <code>scoping_call_booked<\/code> step\./);
});

test('same input, same page', () => {
  assert.equal(drawPage(MD), drawPage(MD));
});

test('refuses a file without a tree', () => {
  assert.throws(() => drawPage('# KPI tree\n\nNo tree here.\n'), /no "## Tree" list/);
});

test('reads the operator and result of a branch formula', () => {
  assert.deepEqual(readFormula('bookings = a × b'), { result: 'bookings', op: '×' });
  assert.deepEqual(readFormula('inquiries = web + referral'), { result: 'inquiries', op: '+' });
  assert.deepEqual(readFormula(undefined), { result: '', op: '' });
});

test('a driver that counts people entering the path is drawn as a count, not a rate', () => {
  const html = drawPage(MD.replace('start rate: started per view', 'visits: number of visits'));
  assert.match(html, /class="node driver count"[^>]*>\s*<span class="step">Step 1 · count</);
  assert.equal((html.match(/driver count/g) || []).length, 1);
});

test('every step and branch is a place the keys and the hash can jump to, and the overview starts at the top', () => {
  const html = drawPage(MD);
  const views = [...html.matchAll(/<(?:div|section) [^>]*data-view="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(views, ['A', 'B', 'S1', 'S2']);
  assert.match(html, /data-v="S1">1<\/button>/);
  assert.match(html, /<h3>How it works<\/h3>bookings = start rate × booking rate/, 'branch A shows its formula when zoomed in');
  for (const k of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape']) assert.match(html, new RegExp(k));
  assert.match(html, /fit\(\{ x: 0, y: 0[^)]*\}, 9, true\)/, 'the overview is top aligned');
  assert.match(html, /max-width: 48rem/, 'a narrow screen gets one scrolling page');
});
