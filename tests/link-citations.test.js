import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { check } from '../scripts/check-discovery.js';
import { linkCitations } from '../scripts/link-citations.js';

function repo(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-links-'));
  for (const [p, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  return root;
}

const source = 'Header\n\nWe have no idea which format fits.\nSecond line about budget.\n';
const base = {
  'sources/interviews/a.md': source,
  'site/formats.html': '<h1>Formats</h1>\n',
  'discovery/kpi-tree.md': '# Tree\n\nBranch A\n',
};

// Writes the file, converts it in place and returns the new text and the result.
function run(root, rel) {
  const file = path.join(root, rel);
  const r = linkCitations(root, file, fs.readFileSync(file, 'utf8'));
  fs.writeFileSync(file, r.text);
  return r;
}

test('every bare form becomes a link with the root path as text', () => {
  const root = repo({ ...base, 'discovery/intents/x.md': [
    'Claim (`sources/interviews/a.md:3`, `:4`).',
    'Plain sources/interviews/a.md:3 and short a.md:4.',
    'Range `sources/interviews/a.md:3-4`.',
    'Words `a.md`, line 3 and a.md, lines 3 to 4.',
    'Folder of sources: interviews/a.md:3.',
    'Files: `site/formats.html`, discovery/kpi-tree.md, kpi-tree.md.',
  ].join('\n') + '\n' });
  const r = run(root, 'discovery/intents/x.md');
  const a3 = '[sources/interviews/a.md:3](../../sources/interviews/a.md#L3)';
  const a4 = '[sources/interviews/a.md:4](../../sources/interviews/a.md#L4)';
  const a34 = '[sources/interviews/a.md:3-4](../../sources/interviews/a.md#L3)';
  const tree = '[discovery/kpi-tree.md](../kpi-tree.md)';
  assert.equal(r.text, [
    `Claim (${a3}, ${a4}).`,
    `Plain ${a3} and short ${a4}.`,
    `Range ${a34}.`,
    `Words ${a3} and ${a34}.`,
    `Folder of sources: ${a3}.`,
    `Files: [site/formats.html](../../site/formats.html), ${tree}, ${tree}.`,
  ].join('\n') + '\n');
  assert.equal(r.converted, 11);
  assert.deepEqual(r.left, []);
});

test('links, quotes, code blocks, longer code spans and unknown files stay as they are', () => {
  const body = [
    'Linked [sources/interviews/a.md:3](../../sources/interviews/a.md#L3), then `:4`.',
    'Quote "she read a.md:3 twice" stays.',
    'Command `node scripts/x.js` and `discovery/<variant>-prototype.md` stay.',
    'Unknown `sources/nope.md:3` and .claude/rules/writing.md stay.',
    '```',
    'sources/interviews/a.md:3',
    '```',
  ].join('\n') + '\n';
  const root = repo({ ...base, 'scripts/x.js': '', 'discovery/x.md': body });
  const r = run(root, 'discovery/x.md');
  assert.equal(r.text, body.replace('then `:4`', 'then [sources/interviews/a.md:4](../sources/interviews/a.md#L4)'));
  assert.equal(r.converted, 1);
  assert.equal(r.left.length, 3, r.left.join('\n'));
  assert.match(r.left[0], /inside a quote/);
  assert.match(r.left[1], /scripts\/x\.js: inside a longer code span/);
  assert.match(r.left[2], /nope\.md:3: no single file/);
});

test('a second run changes nothing', () => {
  const root = repo({ ...base, 'discovery/x.md': 'Claim (`a.md:3`, `:4`), see kpi-tree.md and a.md, lines 3 to 4.\n' });
  const first = run(root, 'discovery/x.md');
  assert.equal(first.converted, 4);
  const second = run(root, 'discovery/x.md');
  assert.equal(second.converted, 0);
  assert.equal(second.text, first.text);
});

test('the checker counts the same citations and quotes before and after', () => {
  const root = repo({ ...base, 'discovery/opportunities/x.md': [
    'Need "no idea which format fits" (`sources/interviews/a.md:3`, `:4`).',
    'After (`a.md:4`, "Second line about budget").',
    'Bracket [assumption: a buyer (`a.md:3`) books more.]',
    'Lines `a.md`, lines 3 to 4, from kpi-tree.md.',
  ].join('\n') + '\n' });
  const before = check(root);
  assert.deepEqual(before.errors, []);
  run(root, 'discovery/opportunities/x.md');
  const after = check(root);
  assert.deepEqual(after.errors, []);
  assert.equal(after.citations, before.citations);
  assert.equal(after.quotes, before.quotes);
  assert.equal(after.links, 6);
});
