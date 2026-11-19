import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from '../server.js';

const SITE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'site');
const VARIANTS = path.join(SITE, 'variants');
const HARDENED = path.join(SITE, 'hardened');
const MARK = 'TEST-VARIANT-MARKER';
const HMARK = 'TEST-HARDENED-MARKER';

let server, base, dir, cfg, dataDir;
const created = [];

before(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-route-'));
  dataDir = path.join(dir, 'data');
  cfg = path.join(dir, 'config.json');
  process.env.LOOPWISE_CONFIG = cfg;
  process.env.LOOPWISE_DATA_DIR = dataDir;
  // Temporary variant folders, removed in after().
  for (const name of ['zz-test-a', 'zz-test-b']) {
    const d = path.join(VARIANTS, name);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, 'inquiry.html'), `<!doctype html><title>${name}</title>${MARK}-${name}<a href="/formats.html">F</a><a href="/styles.css">S</a>`);
    created.push(d);
  }
  server = createServer();
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
});
after(async () => {
  await new Promise((r) => server.close(r));
  for (const d of created) fs.rmSync(d, { recursive: true, force: true });
  if (!fs.readdirSync(VARIANTS).length) fs.rmdirSync(VARIANTS);
  if (fs.existsSync(HARDENED) && !fs.readdirSync(HARDENED).length) fs.rmdirSync(HARDENED);
  fs.rmSync(dir, { recursive: true, force: true });
  delete process.env.LOOPWISE_CONFIG;
  delete process.env.LOOPWISE_DATA_DIR;
});

const setConfig = (c) => fs.writeFileSync(cfg, JSON.stringify(c));
const get = async (p) => {
  const r = await fetch(base + p);
  return { status: r.status, text: await r.text() };
};

test('shipped null: /inquiry serves the baseline form', async () => {
  setConfig({ shipped: null, variants: [] });
  const r = await get('/inquiry');
  assert.equal(r.status, 200);
  assert.match(r.text, /id="inquiry-form"/);
});

test('missing config file behaves like shipped null', async () => {
  fs.rmSync(cfg, { force: true });
  const r = await get('/inquiry');
  assert.equal(r.status, 200);
  assert.match(r.text, /id="inquiry-form"/);
});

test('shipped set and folder exists: /inquiry serves that variant', async () => {
  setConfig({ shipped: 'zz-test-a', variants: ['zz-test-a', 'zz-test-b'] });
  const r = await get('/inquiry');
  assert.equal(r.status, 200);
  assert.match(r.text, new RegExp(MARK + '-zz-test-a'));
});

test('shipped set but folder missing: /inquiry falls back to baseline', async () => {
  setConfig({ shipped: 'zz-missing', variants: ['zz-missing'] });
  const r = await get('/inquiry');
  assert.equal(r.status, 200);
  assert.match(r.text, /id="inquiry-form"/);
});

test('?variant=baseline always serves the baseline form, even when a variant is shipped', async () => {
  setConfig({ shipped: 'zz-test-a', variants: ['zz-test-a'] });
  const r = await get('/inquiry?variant=baseline');
  assert.equal(r.status, 200);
  assert.match(r.text, /id="inquiry-form"/);
  assert.doesNotMatch(r.text, new RegExp(MARK));
});

test('?variant=<name> serves a listed variant, shipped or not', async () => {
  setConfig({ shipped: 'zz-test-a', variants: ['zz-test-a', 'zz-test-b'] });
  const r = await get('/inquiry?variant=zz-test-b');
  assert.equal(r.status, 200);
  assert.match(r.text, new RegExp(MARK + '-zz-test-b'));
});

test('?variant=<name> is 404 when not in config.variants, even if the folder exists', async () => {
  setConfig({ shipped: null, variants: ['zz-test-a'] });
  assert.equal((await get('/inquiry?variant=zz-test-b')).status, 404);
});

test('?variant=<name> is 404 when listed but the folder is missing', async () => {
  setConfig({ shipped: null, variants: ['zz-missing'] });
  assert.equal((await get('/inquiry?variant=zz-missing')).status, 404);
});

test('?variant with path traversal is 404', async () => {
  setConfig({ shipped: null, variants: [] });
  assert.equal((await get('/inquiry?variant=../../server')).status, 404);
});

test('a variant replaces any page by holding a file of the same name', async () => {
  const f = path.join(VARIANTS, 'zz-test-b', 'formats.html');
  fs.writeFileSync(f, `<!doctype html>${MARK}-formats`);
  try {
    setConfig({ shipped: null, variants: ['zz-test-a', 'zz-test-b'] });
    assert.match((await get('/formats.html?variant=zz-test-b')).text, new RegExp(MARK + '-formats'));
    assert.match((await get('/formats?variant=zz-test-b')).text, new RegExp(MARK + '-formats'));
    assert.doesNotMatch((await get('/formats.html')).text, new RegExp(MARK), 'no variant asked for, none shipped');
    assert.doesNotMatch((await get('/formats.html?variant=zz-test-a')).text, new RegExp(MARK), 'zz-test-a holds no formats page');
    setConfig({ shipped: 'zz-test-b', variants: ['zz-test-b'] });
    assert.match((await get('/formats.html')).text, new RegExp(MARK + '-formats'), 'shipped variant replaces every page it holds');
    assert.match((await get('/inquiry.html')).text, new RegExp(MARK + '-zz-test-b'), '/inquiry.html is the same page as /inquiry');
  } finally { fs.rmSync(f); }
});

test('a page the variant does not hold is the baseline page, and its links keep the variant', async () => {
  setConfig({ shipped: null, variants: ['zz-test-a'] });
  const home = await get('/?variant=zz-test-a');
  assert.equal(home.status, 200);
  assert.match(home.text, /href="\/inquiry\.html\?variant=zz-test-a"/);
  const own = (await get('/inquiry?variant=zz-test-a')).text;
  assert.match(own, /href="\/formats\.html\?variant=zz-test-a"/);
  assert.match(own, /href="\/styles\.css"/, 'files that are not pages keep their link');
});

test('/compare, /dashboard and the test-card endpoint are not part of the start state', async () => {
  setConfig({ shipped: null, variants: [] });
  for (const p of ['/compare', '/dashboard']) assert.equal((await get(p)).status, 404, p);
  assert.notEqual((await get('/api/test-cards/x/assumptions')).status, 200);
});

test('site/config.json lists only built variants, and shipped is null or one of them', () => {
  const c = JSON.parse(fs.readFileSync(path.join(SITE, 'config.json'), 'utf8'));
  assert.ok(Array.isArray(c.variants));
  for (const v of c.variants) assert.ok(fs.readdirSync(path.join(SITE, 'variants', v)).some((f) => f.endsWith('.html')), `${v} holds no page`);
  assert.ok(c.shipped === null || c.variants.includes(c.shipped), 'shipped must be null or a listed variant');
});

test('/api/inquiry passes through extra scalar fields by rule and drops the rest', async () => {
  const extra = {};
  for (let i = 0; i < 25; i++) extra['k' + i] = 'v' + i;
  const res = await fetch(base + '/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Sam', company: 'Ex', email: 'sam@example.com', message: 'We need help with discovery.',
      variant: 'zz-test-a', anyField: '  Fewer handovers  ', count: 3, unsure: true,
      long: 'x'.repeat(400), nested: { a: 1 }, list: [1], empty: ' ', 'bad key': 'x', ts: 'forged',
    }),
  });
  assert.equal(res.status, 201);
  const row = JSON.parse(fs.readFileSync(path.join(dataDir, 'inquiries-live.jsonl'), 'utf8').trim().split('\n').pop());
  assert.equal(row.variant, 'zz-test-a');
  assert.equal(row.anyField, 'Fewer handovers');
  assert.equal(row.count, 3);
  assert.equal(row.unsure, true);
  assert.equal(row.long.length, 300);
  for (const k of ['nested', 'list', 'empty', 'bad key']) assert.equal(row[k], undefined);
  assert.notEqual(row.ts, 'forged');

  const res2 = await fetch(base + '/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Sam', company: 'Ex', email: 'sam@example.com', message: 'We need help with discovery.', ...extra }),
  });
  assert.equal(res2.status, 201);
  const row2 = JSON.parse(fs.readFileSync(path.join(dataDir, 'inquiries-live.jsonl'), 'utf8').trim().split('\n').pop());
  assert.equal(row2.variant, 'baseline');
  assert.equal(Object.keys(row2).filter((k) => /^k\d+$/.test(k)).length, 20);
});

// Hardened builds (build to earn) live in site/hardened/<name>/. Each test makes its own folders.
function hardenedBuild(name, files) {
  const d = path.join(HARDENED, name);
  fs.mkdirSync(d, { recursive: true });
  created.push(d);
  for (const [f, body] of Object.entries(files)) fs.writeFileSync(path.join(d, f), body);
  return d;
}

test('?variant=<name>&build=hardened serves the hardened page, and its links keep both params', async () => {
  hardenedBuild('zz-test-a', { 'inquiry.html': `<!doctype html>${HMARK}-zz-test-a<a href="/formats.html">F</a><a href="/styles.css">S</a>` });
  setConfig({ shipped: null, variants: ['zz-test-a'] });
  const r = await get('/inquiry?variant=zz-test-a&build=hardened');
  assert.equal(r.status, 200);
  assert.match(r.text, new RegExp(HMARK + '-zz-test-a'));
  assert.match(r.text, /href="\/formats\.html\?variant=zz-test-a&build=hardened"/);
  assert.match(r.text, /href="\/styles\.css"/, 'files that are not pages keep their link');
  assert.match((await get('/inquiry?variant=zz-test-a')).text, new RegExp(MARK + '-zz-test-a'), 'without build=hardened the prototype is served');
  const formats = await get('/formats.html?variant=zz-test-a&build=hardened');
  assert.equal(formats.status, 200, 'a page the hardened build does not hold is the baseline page');
  assert.doesNotMatch(formats.text, new RegExp(HMARK));
  assert.match(formats.text, /href="\/inquiry\.html\?variant=zz-test-a&build=hardened"/);
});

test('build=hardened is 404 when the variant has no hardened build or is not listed', async () => {
  setConfig({ shipped: null, variants: ['zz-test-a', 'zz-test-b'] });
  assert.equal((await get('/inquiry?variant=zz-test-b&build=hardened')).status, 404, 'no hardened folder');
  hardenedBuild('zz-test-b', { 'inquiry.html': `<!doctype html>${HMARK}-zz-test-b` });
  setConfig({ shipped: null, variants: ['zz-test-a'] });
  assert.equal((await get('/inquiry?variant=zz-test-b&build=hardened')).status, 404, 'not listed in config.variants');
  assert.equal((await get('/inquiry?variant=../../server&build=hardened')).status, 404);
});

test('a shipped variant is served from its hardened build if there is one, else from its prototype', async () => {
  hardenedBuild('zz-test-a', { 'inquiry.html': `<!doctype html>${HMARK}-zz-test-a` });
  setConfig({ shipped: 'zz-test-a', variants: ['zz-test-a', 'zz-test-b'] });
  assert.match((await get('/inquiry')).text, new RegExp(HMARK + '-zz-test-a'));
  assert.match((await get('/inquiry.html')).text, new RegExp(HMARK + '-zz-test-a'));
  assert.match((await get('/formats.html')).text, /<title>[^<]*<\/title>/, 'a page the hardened build does not hold is the baseline');
  assert.doesNotMatch((await get('/formats.html')).text, new RegExp(HMARK));
  assert.match((await get('/inquiry?variant=baseline')).text, /id="inquiry-form"/);
  fs.rmSync(path.join(HARDENED, 'zz-test-b'), { recursive: true, force: true });
  setConfig({ shipped: 'zz-test-b', variants: ['zz-test-a', 'zz-test-b'] });
  assert.match((await get('/inquiry')).text, new RegExp(MARK + '-zz-test-b'), 'no hardened folder: the prototype');
});
