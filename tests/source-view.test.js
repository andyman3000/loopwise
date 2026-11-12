import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { sourceHref, sourcePage } from '../lib/source-view.js';
import { createServer } from '../server.js';

let root, server, base;

before(async () => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-src-'));
  fs.mkdirSync(path.join(root, 'sources', 'interviews'), { recursive: true });
  fs.writeFileSync(path.join(root, 'sources', 'interviews', 'x.md'), Array.from({ length: 60 }, (_, i) => (i === 48 ? 'S: "I have no idea." <b>' : `line ${i + 1}`)).join('\n') + '\n');
  fs.writeFileSync(path.join(root, 'secret.md'), 'SECRET-OUTSIDE-SOURCES');
  fs.symlinkSync(path.join(root, 'secret.md'), path.join(root, 'sources', 'link.md'));
  process.env.LOOPWISE_ROOT = root;
  server = createServer();
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
});

after(async () => {
  await new Promise((r) => server.close(r));
  delete process.env.LOOPWISE_ROOT;
  fs.rmSync(root, { recursive: true, force: true });
});

test('a quote location becomes a link to the file with a line anchor', () => {
  assert.equal(sourceHref('sources/interviews/x.md:49'), '/sources/interviews/x.md#L49');
  assert.equal(sourceHref('sources/interviews/x.md:49-51'), '/sources/interviews/x.md#L49');
  assert.equal(sourceHref('sources/interviews/x.md'), null, 'no line, no link');
  assert.equal(sourceHref('site/inquiry.html:27'), null, 'only sources/ is served');
  assert.equal(sourceHref('sources/../package.json:1'), null);
});

test('the file is served as numbered lines, each with its own anchor, text escaped', async () => {
  const res = await fetch(`${base}/sources/interviews/x.md`);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.equal((html.match(/class="line" id="L\d+"/g) || []).length, 60);
  assert.match(html, /<div class="line" id="L49"><a href="#L49">49<\/a><span>S: &quot;I have no idea.&quot; &lt;b&gt;<\/span><\/div>/);
  assert.match(html, /\.line:target\{/, 'the anchored line is highlighted');
  assert.match(html, /scroll-margin-top/, 'and scrolled into view, not under the top edge');
  assert.doesNotMatch(html, /<form|<script/);
});

test('paths outside sources/ are refused', async () => {
  for (const p of ['/sources/%2e%2e/secret.md', '/sources/..%2fsecret.md', '/sources/interviews/%2e%2e%2f%2e%2e%2fsecret.md', '/sources/link.md', '/sources/%00x.md', '/sources/%E0%A4%A', '/sources/interviews', '/sources/nope.md']) {
    const res = await fetch(base + p);
    assert.equal(res.status, 404, p);
    assert.doesNotMatch(await res.text(), /SECRET-OUTSIDE-SOURCES/, p);
  }
  assert.equal(sourcePage(root, '/sources/../secret.md').status, 404);
  assert.equal(sourcePage(root, '/discovery/x.md'), null);
});

test('only GET and HEAD read a source', async () => {
  const res = await fetch(`${base}/sources/interviews/x.md`, { method: 'POST' });
  assert.equal(res.status, 405);
});
