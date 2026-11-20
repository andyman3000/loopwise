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

test('a citation into .claude/ keeps its leading dot', () => {
  const root = repo({
    '.claude/rules/r.md': source,
    'discovery/x.md': 'Rule ([.claude/rules/r.md:3](../.claude/rules/r.md#L3)) and `.claude/rules/r.md:4`.\n',
  });
  assert.deepEqual(check(root).errors, []);
  const bad = repo({ '.claude/rules/r.md': source, 'discovery/x.md': 'Rule `.claude/rules/r.md:99`.\n' });
  assert.match(check(bad).errors.join('\n'), /\.claude\/rules\/r\.md:99/);
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

test('a citation written as a Markdown link reads like the bare form, quotes included', () => {
  const root = repo({
    'sources/interviews/a.md': source,
    'site/formats.html': '<h1>Formats</h1>\n',
    'discovery/kpi-tree.md': '# Tree\n',
    'discovery/intents/x.md': [
      'Claim "no idea which format fits" ([sources/interviews/a.md:3](../../sources/interviews/a.md#L3), [sources/interviews/a.md:4](../../sources/interviews/a.md#L4)).',
      'After ([sources/interviews/a.md:3](../../sources/interviews/a.md#L3), "no idea which format fits").',
      'Range ([sources/interviews/a.md:3-4](../../sources/interviews/a.md#L3)) and ([sources/interviews/a.md:3-4](../../sources/interviews/a.md#L3-L4)).',
      'File only: [site/formats.html](../../site/formats.html), [discovery/kpi-tree.md](../kpi-tree.md#result).',
      'Not a citation: [the tree](/discovery/tree).',
    ].join('\n'),
  });
  const r = check(root);
  assert.deepEqual(r.errors, []);
  assert.equal(r.citations, 5);
  assert.equal(r.quotes, 2);
  assert.equal(r.links, 7);
});

test('a link whose target or line differs from its text fails, and a wrong quote still fails', () => {
  const root = repo({
    'sources/a.md': source,
    'sources/b.md': source,
    'discovery/intents/x.md': [
      'Wrong file ([sources/a.md:3](../../sources/b.md#L3)).',
      'Wrong line ([sources/a.md:3](../../sources/a.md#L4)).',
      'No line in link ([sources/a.md:3](../../sources/a.md)).',
      'Line on a file link ([sources/a.md](../../sources/a.md#L3)).',
      'Wrong folder depth ([sources/a.md:3](../sources/a.md#L3)).',
      'Absolute ([sources/a.md:3](/sources/a.md#L3)).',
      'Missing ([sources/nope.md](../../sources/nope.md)).',
      'Quote "a sentence that is not there" ([sources/a.md:3](../../sources/a.md#L3)).',
    ].join('\n'),
  });
  const { errors } = check(root);
  assert.equal(errors.length, 8, errors.join('\n'));
  assert.match(errors[0], /leads to sources\/b\.md, not sources\/a\.md/);
  assert.match(errors[1], /ends in #L4, expected #L3/);
  assert.match(errors[7], /quote not on sources\/a\.md:3/);
});
