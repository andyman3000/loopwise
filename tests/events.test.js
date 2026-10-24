import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createServer } from '../server.js';
import { isEventType, logEvent, EVENT_TYPES } from '../site/components/events.js';

let server, base, dir;
before(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-events-'));
  process.env.LOOPWISE_DATA_DIR = dir;
  server = createServer();
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
});
after(async () => {
  await new Promise((r) => server.close(r));
  fs.rmSync(dir, { recursive: true, force: true });
  delete process.env.LOOPWISE_DATA_DIR;
});
const post = (body) => fetch(base + '/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const rows = () => fs.readFileSync(path.join(dir, 'events-live.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));

test('every known event type is accepted', async () => {
  for (const type of EVENT_TYPES) assert.equal((await post({ type })).status, 204, type);
  assert.equal(rows().length, EVENT_TYPES.length);
});
test('missing variant defaults to baseline, props default to {}', async () => {
  await post({ type: 'page_view' });
  const last = rows().at(-1);
  assert.equal(last.variant, 'baseline');
  assert.deepEqual(last.props, {});
});
test('unknown type returns 400 and stores nothing', async () => {
  const n = rows().length;
  assert.equal((await post({ type: 'banana' })).status, 400);
  assert.equal(rows().length, n);
});
test('isEventType', () => {
  assert.equal(isEventType('page_view'), true);
  assert.equal(isEventType('nope'), false);
});
test('logEvent throws on unknown type', () => assert.throws(() => logEvent('nope'), /Unknown event type/));
test('logEvent does not send without sendBeacon (Node)', () => assert.equal(logEvent('page_view'), false));
test('logEvent does not log from inside an iframe', () => {
  const sent = [];
  const g = globalThis;
  const had = Object.getOwnPropertyDescriptor(g, 'navigator');
  Object.defineProperty(g, 'navigator', { value: { sendBeacon: (...a) => (sent.push(a), true) }, configurable: true });
  g.window = { self: {}, top: {} };
  try {
    assert.equal(logEvent('page_view'), false);
    assert.equal(sent.length, 0);
    g.window = { self: g, top: g };
    g.window.self = g.window.top = g.window;
    assert.equal(logEvent('page_view'), true);
    assert.equal(sent.length, 1);
  } finally {
    delete g.window;
    if (had) Object.defineProperty(g, 'navigator', had); else delete g.navigator;
  }
});
