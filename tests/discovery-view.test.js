import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { renderMarkdown, discoveryPage } from '../lib/discovery-view.js';

test('a nested list under "## Tree" is drawn as a tree, assumptions as notes', () => {
  const html = renderMarkdown('## Tree\n- Business goal: more days\n  - Branch A: new\n    - inquiries · measured: not measured yet\n    - Assumption: buyers book more\n');
  assert.match(html, /class="tree"/);
  assert.match(html, /node level-0">Business goal: more days/);
  assert.match(html, /node assumption"><span class="tag">assumption<\/span> buyers book more/);
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

test('a heading that starts with an ID gets it as anchor, a repeated ID gets its section first', async () => {
  const { renderMarkdown } = await import('../lib/discovery-view.js');
  const html = renderMarkdown('## Candidates\n### C1: a need\n## Evidence\n### C1: a need\n### Plain heading\n');
  assert.match(html, /<h3 id="C1">C1: a need<\/h3>/);
  assert.match(html, /<h3 id="evidence-C1">C1: a need<\/h3>/);
  assert.match(html, /<h3>Plain heading<\/h3>/);
});

test('citation links in an artefact open the line view and other discovery pages from the rendered page', async () => {
  const { sourcePage } = await import('../lib/source-view.js');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-links-'));
  for (const [p, body] of Object.entries({
    'sources/inquiry-mails/m.md': 'a\nb\n',
    'product/glossary.md': 'g\n',
    'site/formats.html': '<h1>F</h1>\n',
    'discovery/opportunity-comparison.md': '# C\n',
    'discovery/intents/x.md': '# X\n\n| Idea | Driver |\n|---|---|\n| I1: a | start rate ([discovery/kpi-tree.md:21](../kpi-tree.md#L21)) |\n\n"b" ([sources/inquiry-mails/m.md:2](../../sources/inquiry-mails/m.md#L2)), [product/glossary.md:1](../../product/glossary.md#L1), [site/formats.html:1](../../site/formats.html#L1), [discovery/opportunity-comparison.md](../opportunity-comparison.md).\n',
  })) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  const pageUrl = 'http://localhost/discovery/intents/x.md';
  const html = discoveryPage(root, new URL(pageUrl).pathname).html;
  const hrefs = [...html.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].filter((m) => m[1].startsWith('.'));
  assert.deepEqual(hrefs.map((m) => m[2]), ['discovery/kpi-tree.md:21', 'sources/inquiry-mails/m.md:2', 'product/glossary.md:1', 'site/formats.html:1', 'discovery/opportunity-comparison.md']);
  const opened = hrefs.map((m) => new URL(m[1], pageUrl)).map((u) => u.pathname + u.hash);
  assert.deepEqual(opened, ['/discovery/kpi-tree.md#L21', '/sources/inquiry-mails/m.md#L2', '/product/glossary.md#L1', '/site/formats.html#L1', '/discovery/opportunity-comparison.md']);
  // Each target is served: the line views have the line's anchor, the discovery page renders.
  for (const [p, line] of [['/sources/inquiry-mails/m.md', 'L2'], ['/product/glossary.md', 'L1'], ['/site/formats.html', 'L1']]) {
    const r = sourcePage(root, p);
    assert.equal(r.status, 200, p);
    assert.match(r.html, new RegExp(`id="${line}"`));
  }
  assert.equal(discoveryPage(root, '/discovery/opportunity-comparison.md').status, 200);
  assert.equal(sourcePage(root, '/product/..%2Fsecret.md').status, 404);
});
