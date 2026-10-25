import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { check } from '../scripts/check-discovery.js';

function repo(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-check-'));
  for (const [p, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  return root;
}

const source = 'Header\n\nWe have no idea which format fits.\nSecond line about budget.\n';

test('valid citations, quotes and shorthand pass', () => {
  const root = repo({
    'sources/interviews/a.md': source,
    'discovery/x.md': 'Claim "no idea which format fits" (`sources/interviews/a.md:3`, `:4`). Bare: `a.md:4`. Event `inquiry_submitted`.\n',
  });
  const r = check(root);
  assert.deepEqual(r.errors, []);
  assert.equal(r.citations, 3);
  assert.equal(r.quotes, 1);
});

test('a quote on a later shorthand line is found', () => {
  const root = repo({ 'sources/a.md': source, 'discovery/x.md': '"about budget here" (`a.md:3`, `:4`)\n' });
  assert.equal(check(root).errors.length, 1);
  const ok = repo({ 'sources/a.md': source, 'discovery/x.md': '"line about budget" (`a.md:3`, `:4`)\n' });
  assert.deepEqual(check(ok).errors, []);
});

test('wrong line, empty line, missing file, wrong quote, unknown event and dash fail', () => {
  const root = repo({
    'sources/a.md': source,
    'discovery/x.md': [
      'One (`sources/a.md:99`).',
      'Two (`sources/a.md:2`).',
      'Three (`sources/nope.md:1`).',
      'Four "a sentence that is not there" (`sources/a.md:3`).',
      'Five `inquiry_abandoned`.',
      `Six ${String.fromCharCode(0x2014)} dash.`,
    ].join('\n'),
  });
  const { errors } = check(root);
  assert.equal(errors.length, 6, errors.join('\n'));
});

test('a quote after the citation is checked too', () => {
  const bad = repo({ 'sources/a.md': source, 'discovery/x.md': 'Claim (`sources/a.md:4`, "no idea which format fits").\n' });
  assert.equal(check(bad).errors.length, 1);
  const ok = repo({ 'sources/a.md': source, 'discovery/x.md': 'Claim (`sources/a.md:3`, "no idea which format fits").\n' });
  assert.deepEqual(check(ok).errors, []);
});
