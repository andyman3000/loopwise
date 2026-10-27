import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { renderMarkdown, discoveryPage } from '../lib/discovery-view.js';

test('a nested list under "## Tree" is drawn as a tree, assumptions as notes', () => {
  const html = renderMarkdown('## Tree\n- Business goal: more days\n  - Branch A: new\n    - inquiries · measured: not measured yet\n    - Assumption: sponsors book more\n');
  assert.match(html, /class="tree"/);
  assert.match(html, /node level-0">Business goal: more days/);
  assert.match(html, /node assumption"><span class="tag">assumption<\/span> sponsors book more/);
  assert.match(html, /class="measured">measured: not measured yet/);
});

test('an ASCII tree in a code block under "## Tree" is drawn as a tree', () => {
  const html = renderMarkdown('## Tree\n```\nBusiness goal: g\n├── Branch A: a\n│   ├── d1    measured: no\n│        [assumption: x]\n└── Branch B: b\n```\n');
  assert.match(html, /class="tree"/);
  assert.match(html, /Branch A: a/);
  assert.match(html, /assumption<\/span> x/);
  assert.doesNotMatch(html, /<pre>/);
});

test('other sections render as plain HTML and escape markup', () => {
  const html = renderMarkdown('# T\n\n| a | b |\n|---|---|\n| `x` | **y** |\n\n- one\n- <script>\n');
  assert.match(html, /<h1>T<\/h1>/);
  assert.match(html, /<td><code>x<\/code><\/td><td><strong>y<\/strong><\/td>/);
  assert.match(html, /&lt;script&gt;/);
});

test('discoveryPage lists files, renders one, refuses paths outside discovery/', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-view-'));
  fs.mkdirSync(path.join(root, 'discovery', 'opportunities'), { recursive: true });
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'x.md'), '# X\n');
  fs.writeFileSync(path.join(root, 'secret.md'), '# secret\n');
  assert.equal(discoveryPage(root, '/'), null);
  assert.match(discoveryPage(root, '/discovery').html, /opportunities\/x\.md/);
  assert.match(discoveryPage(root, '/discovery/opportunities/x.md').html, /<h1>X<\/h1>/);
  assert.equal(discoveryPage(root, '/discovery/..%2Fsecret.md').status, 404);
  assert.equal(discoveryPage(root, '/discovery/opportunities/x.txt').status, 404);
});

test('discoveryPage lists the drawn pages: a link once the artefact exists, a note before', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-views-'));
  fs.mkdirSync(path.join(root, 'discovery'), { recursive: true });
  let html = discoveryPage(root, '/discovery').html;
  assert.doesNotMatch(html, /href="\/discovery\/(map|tree|kpi-tree\.html)"/);
  assert.match(html, /Fills once block 1 \(KPI tree\) has run/);
  assert.match(html, /Fills once block 2 \(opportunities\) has run/);
  assert.match(html, /Fills once block 3 \(opportunity decision\) has run/);
  assert.equal(discoveryPage(root, '/discovery/kpi-tree.html').status, 404);

  fs.mkdirSync(path.join(root, 'discovery', 'opportunities'));
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'x.md'), '# X\n');
  fs.writeFileSync(path.join(root, 'discovery', 'opportunity-comparison.md'), '# C\n');
  fs.writeFileSync(path.join(root, 'discovery', 'kpi-tree.html'), '<!doctype html><title>drawn</title>');
  html = discoveryPage(root, '/discovery').html;
  for (const href of ['/discovery/map', '/discovery/tree', '/discovery/kpi-tree.html']) assert.match(html, new RegExp(`href="${href}"`));
  assert.doesNotMatch(html, /Fills once/);
  const drawn = discoveryPage(root, '/discovery/kpi-tree.html');
  assert.equal(drawn.status, 200);
  assert.equal(drawn.html, '<!doctype html><title>drawn</title>');
});
