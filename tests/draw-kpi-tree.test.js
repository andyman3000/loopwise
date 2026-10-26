import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawPage, readTree } from '../scripts/draw-kpi-tree.js';

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

test('draws the goal, the branches, one step per driver, a dashed parked branch, the formula, escaped text', () => {
  const html = drawPage(MD);
  assert.match(html, /^<!doctype html>/);
  assert.equal((html.match(/class="node /g) || []).length, 5);
  assert.equal((html.match(/class="node driver"/g) || []).length, 2);
  assert.match(html, /class="node branch parked"/);
  assert.match(html, /not this quarter</);
  assert.match(html, /<b>Measured:<\/b> <code>inquiry_started<\/code>/);
  assert.match(html, /Step 1<\/span><span class="name">start rate</);
  assert.match(html, /class="what">started per view</);
  assert.match(html, /inquiries &amp; calls/);
  assert.match(html, /bookings = start rate × booking rate/);
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
