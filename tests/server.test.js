import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../server.js';

let server;
let base;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('GET / returns the home page', async () => {
  const res = await fetch(`${base}/`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /Loopwise/);
});

test('GET /nope returns 404', async () => {
  const res = await fetch(`${base}/nope`);
  assert.equal(res.status, 404);
});

test('path traversal does not expose files outside site/', async () => {
  const res = await fetch(`${base}/../package.json`);
  const body = await res.text();
  assert.doesNotMatch(body, /"name": "loopwise"/);
  const encoded = await fetch(`${base}/%2e%2e/package.json`);
  assert.equal(encoded.status, 404);
  assert.doesNotMatch(await encoded.text(), /"name": "loopwise"/);
});
