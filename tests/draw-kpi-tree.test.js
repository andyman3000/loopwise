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

test('draws one box per node, a dashed parked branch, events, the formula, escaped text', () => {
  const html = drawPage(MD);
  assert.match(html, /^<!doctype html>/);
  assert.equal((html.match(/<g class="node/g) || []).length, 5);
  assert.match(html, /class="node level-1 parked"/);
  assert.match(html, /NOT THIS QUARTER/);
  assert.match(html, /measured: inquiry_started</);
  assert.match(html, /inquiries &amp; calls/);
  assert.match(html, /bookings = start rate × booking rate/);
  assert.doesNotMatch(html, /product\/strategy\.md/);
});

test('same input, same page', () => {
  assert.equal(drawPage(MD), drawPage(MD));
});

test('refuses a file without a tree', () => {
  assert.throws(() => drawPage('# KPI tree\n\nNo tree here.\n'), /no "## Tree" list/);
});
