import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkGates, formatResult, formatEntry } from '../scripts/check-gates.js';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(REPO, 'scripts', 'check-gates.js');
const CLEAN = '<!doctype html>\n<html lang="en">\n<head><link rel="stylesheet" href="/styles.css"></head>\n<body><main class="card"><button class="button" type="button">Book</button></main></body>\n</html>\n';
const fields = (f) => ['# Decision', '', ...Object.entries(f).map(([k, v]) => `${k}: ${v}`), ''].join('\n');
const LAUNCH = fields({ Variant: 'call-slot', Decision: 'launch', 'Decided by': 'Kim Example', Role: 'product lead', Date: '2026-11-20', Reason: 'Four of five testers booked a slot.' });

function repo(files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-validation-'));
  const all = {
    'gates/gates.json': fs.readFileSync(path.join(REPO, 'gates', 'gates.json'), 'utf8'),
    'site/styles.css': fs.readFileSync(path.join(REPO, 'site', 'styles.css'), 'utf8'),
    ...files,
  };
  for (const [p, body] of Object.entries(all)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  return root;
}

test('a hardened variant without a launch decision fails the validation gate, naming file, rule and owner', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN });
  const result = checkGates(root);
  assert.equal(result.gates.validation.status, 'fail');
  assert.equal(result.ok, false);
  const out = formatResult(result).join('\n');
  assert.match(out, /discovery\/decisions\/ {2}validation\/no-launch-decision {2}"no launch decision for call-slot" {2}owner: product lead \(hard, no waiver\)/);
  assert.match(out, /rule: gates\/policies\/launch-decision\.md/);
});

test('a valid launch decision by the product lead passes', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/005-launch-call-slot.md': LAUNCH });
  assert.equal(checkGates(root).gates.validation.status, 'pass');
});

test('a hold, an agent as decider, or a learning card alone does not count', () => {
  const hold = LAUNCH.replace('Decision: launch', 'Decision: hold');
  const agent = LAUNCH.replace('Kim Example', 'Claude');
  for (const body of [hold, agent]) {
    const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/005-launch-call-slot.md': body });
    const v = checkGates(root).gates.validation;
    assert.equal(v.status, 'fail');
    assert.equal(v.findings[0].rule, 'validation/launch-decision-incomplete');
  }
  const card = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/003-call-slot.md': '# Decision 003\n\nWhat we decided: move on.\n' });
  assert.equal(checkGates(card).gates.validation.status, 'fail');
});

test('a waiver for the validation gate is ignored: it is hard', () => {
  const waiver = fields({ Gate: 'validation', Variant: 'call-slot', 'Owner role': 'product lead', 'Decided by': 'Kim Example', Date: '2026-11-20', Reason: 'We trust it.' });
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/009-validation-waiver-call-slot.md': waiver });
  const v = checkGates(root).gates.validation;
  assert.equal(v.status, 'fail');
  assert.match(v.waivers[0].ignored, /hard gate/);
});

test('the entry check runs before anything is built and stops a variant without a launch decision', () => {
  const root = repo({ 'discovery/decisions/005-launch-call-slot.md': LAUNCH });
  assert.equal(formatEntry(root, 'call-slot').ok, true);
  const stopped = formatEntry(root, 'my-variant');
  assert.equal(stopped.ok, false);
  assert.match(stopped.lines.join('\n'), /no launch decision for my-variant.*owner: product lead[\s\S]*The factory does not start/);
  const cli = spawnSync(process.execPath, [SCRIPT, '--entry', 'my-variant', root], { encoding: 'utf8' });
  assert.equal(cli.status, 1);
  assert.equal(spawnSync(process.execPath, [SCRIPT, '--entry', 'call-slot', root], { encoding: 'utf8' }).status, 0);
});

test('without hardened variants the validation gate passes, so the start state stays green', () => {
  assert.equal(checkGates(repo()).gates.validation.status, 'pass');
});
