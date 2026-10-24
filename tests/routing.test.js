import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from '../server.js';

const SITE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'site');
const VARIANTS = path.join(SITE, 'variants');
const MARK = 'TEST-VARIANT-MARKER';

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
    fs.writeFileSync(path.join(d, 'index.html'), `<!doctype html><title>${name}</title>${MARK}-${name}`);
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

test('/compare, /dashboard and the test-card endpoint are not part of the start state', async () => {
  setConfig({ shipped: null, variants: [] });
  for (const p of ['/compare', '/dashboard']) assert.equal((await get(p)).status, 404, p);
  assert.notEqual((await get('/api/test-cards/x/assumptions')).status, 200);
});

test('site/config.json at start is shipped null with no variants', () => {
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(SITE, 'config.json'), 'utf8')), { shipped: null, variants: [] });
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
