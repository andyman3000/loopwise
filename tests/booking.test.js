import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createServer } from '../server.js';

let server;
let base;
let dir;

before(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-booking-'));
  process.env.LOOPWISE_DATA_DIR = dir;
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  delete process.env.LOOPWISE_DATA_DIR;
  fs.rmSync(dir, { recursive: true, force: true });
});

const book = (body) => fetch(`${base}/api/booking`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});
const lines = (file) => fs.readFileSync(path.join(dir, file), 'utf8').trim().split('\n').map((l) => JSON.parse(l));

test('a booked slot is stored and logs scoping_call_booked without name or email', async () => {
  const res = await book({ day: '2026-12-01', time: '10:00', name: 'Noa Vale', email: 'noa@example.com', variant: 'call-slot' });
  assert.equal(res.status, 201);
  const [stored] = lines('bookings-live.jsonl');
  assert.equal(stored.day, '2026-12-01');
  assert.equal(stored.variant, 'call-slot');
  const events = lines('events-live.jsonl');
  assert.equal(events.length, 1);
  assert.equal(events[0].type, 'scoping_call_booked');
  assert.equal(events[0].variant, 'call-slot');
  assert.deepEqual(events[0].props, {});
  assert.doesNotMatch(JSON.stringify(events[0]), /Noa|noa@/);
});

test('the same slot cannot be booked twice', async () => {
  const res = await book({ day: '2026-12-01', time: '10:00', variant: 'call-slot' });
  assert.equal(res.status, 409);
  assert.equal(lines('events-live.jsonl').length, 1);
});

test('a booking without a valid day or time is refused and logs nothing', async () => {
  const res = await book({ day: 'tomorrow', time: '10' });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.errors.day && body.errors.time);
  assert.equal(lines('events-live.jsonl').length, 1);
});
