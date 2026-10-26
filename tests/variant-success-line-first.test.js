import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createServer } from '../server.js';
import {
  EXAMPLES, MAX_LENGTH, ERR_REQUIRED, ERR_LENGTH, validateSuccessLine, classifyChoice,
  buildSuccessLineFields, buildPayload, stepCompletedProps, filledProps, submittedProps, summaryText,
} from '../site/variants/success-line-first/success-line-first.js';

let server, base, dir;
before(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-slf-'));
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

test('six example lines, ids soft-1 to hard-3', () => {
  assert.deepEqual(Object.keys(EXAMPLES), ['soft-1', 'soft-2', 'soft-3', 'hard-1', 'hard-2', 'hard-3']);
});

test('validateSuccessLine', () => {
  assert.deepEqual(validateSuccessLine({ text: '', unknown: false }), { ok: false, error: ERR_REQUIRED });
  assert.equal(validateSuccessLine({ text: '   ' }).ok, false);
  assert.equal(validateSuccessLine({ text: '', unknown: true }).ok, true);
  assert.equal(validateSuccessLine({ text: 'x'.repeat(MAX_LENGTH) }).ok, true);
  assert.deepEqual(validateSuccessLine({ text: 'x'.repeat(MAX_LENGTH + 1) }), { ok: false, error: ERR_LENGTH });
});

test('classifyChoice covers all four choices', () => {
  assert.equal(classifyChoice({ text: EXAMPLES['soft-1'], example: 'soft-1' }), 'example');
  assert.equal(classifyChoice({ text: EXAMPLES['soft-1'] + ' Plus more.', example: 'soft-1' }), 'edited-example');
  assert.equal(classifyChoice({ text: 'Our own line', example: '' }), 'own');
  assert.equal(classifyChoice({ text: EXAMPLES['hard-2'], unknown: true, example: 'hard-2' }), 'dont-know');
});

test('buildSuccessLineFields: dont-know sends no text and no example', () => {
  const f = buildSuccessLineFields({ text: 'kept but not sent', unknown: true, example: 'soft-2' });
  assert.deepEqual(f, { successLine: '', successLineChoice: 'dont-know', successLineExample: '', successLineUnknown: true });
});

test('buildSuccessLineFields: trims and keeps example id', () => {
  const f = buildSuccessLineFields({ text: `  ${EXAMPLES['hard-1']}  `, example: 'hard-1' });
  assert.equal(f.successLine, EXAMPLES['hard-1']);
  assert.equal(f.successLineChoice, 'example');
  assert.equal(f.successLineExample, 'hard-1');
});

test('buildPayload merges contact fields and sets the variant', () => {
  const p = buildPayload({ name: 'A' }, { text: 'Mine', example: '' });
  assert.equal(p.name, 'A');
  assert.equal(p.variant, 'success-line-first');
  assert.equal(p.successLineChoice, 'own');
});

test('event props never contain the success line text', () => {
  const s = { text: 'Secret words here', example: '' };
  assert.deepEqual(filledProps(s), { choice: 'own', example: null, length: 17 });
  assert.deepEqual(stepCompletedProps(s), { step: 'success_line', choice: 'own' });
  assert.deepEqual(submittedProps(s), { success_line: 'filled', choice: 'own' });
  for (const p of [filledProps(s), stepCompletedProps(s), submittedProps(s)]) assert.ok(!JSON.stringify(p).includes('Secret'));
});

test('dont-know: no success_line_filled props, submitted says dont-know', () => {
  const s = { text: '', unknown: true };
  assert.equal(filledProps(s), null);
  assert.deepEqual(stepCompletedProps(s), { step: 'success_line', choice: 'dont-know' });
  assert.deepEqual(submittedProps(s), { success_line: 'dont-know', choice: 'dont-know' });
  assert.equal(summaryText(s), 'Success line: to work out in the call');
  assert.equal(summaryText({ text: 'Hi' }), 'Your success line: Hi');
});

test('GET /inquiry?variant=success-line-first returns 200 with the marker', async () => {
  const res = await fetch(`${base}/inquiry?variant=success-line-first`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /data-variant="success-line-first"/);
});

test('payload reaches inquiries-live.jsonl', async () => {
  const payload = buildPayload(
    { name: 'Sam Example', company: 'Example Co', email: 'sam@example.com', message: 'We need help with discovery.' },
    { text: EXAMPLES['soft-3'], example: 'soft-3' },
  );
  const res = await fetch(`${base}/api/inquiry`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  assert.equal(res.status, 201);
  const rows = fs.readFileSync(path.join(dir, 'inquiries-live.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const r = rows[rows.length - 1];
  assert.equal(r.successLine, EXAMPLES['soft-3']);
  assert.equal(r.successLineChoice, 'example');
  assert.equal(r.successLineExample, 'soft-3');
  assert.equal(r.variant, 'success-line-first');
});
