import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadScenario } from '../scripts/generate-events.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(ROOT, 'scripts', 'generate-events.js');
const scenarioFile = path.join(ROOT, 'data', 'scenario.json');
const scenario = loadScenario(scenarioFile);

function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-gen-'));
  execFileSync('node', [script, '--scenario', scenarioFile, '--out', dir], { stdio: 'pipe' });
  return dir;
}

test('same seed gives byte-identical files', () => {
  const a = run();
  const b = run();
  try {
    for (const f of ['events.jsonl', 'inquiries.csv']) {
      assert.ok(fs.readFileSync(path.join(a, f)).equals(fs.readFileSync(path.join(b, f))), f);
    }
  } finally {
    fs.rmSync(a, { recursive: true, force: true });
    fs.rmSync(b, { recursive: true, force: true });
  }
});

test('the committed data files are what the scenario generates', () => {
  const dir = run();
  try {
    for (const f of ['events.jsonl', 'inquiries.csv']) {
      assert.ok(fs.readFileSync(path.join(dir, f)).equals(fs.readFileSync(path.join(ROOT, 'data', f))), f);
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('scenario is flagged synthetic and the generator refuses one that is not', () => {
  assert.equal(scenario.synthetic, true);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-gen-'));
  try {
    const bad = path.join(dir, 's.json');
    fs.writeFileSync(bad, JSON.stringify({ ...scenario, synthetic: false }));
    assert.throws(() => execFileSync('node', [script, '--scenario', bad, '--out', dir], { stdio: 'pipe' }));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('a visit has several page views, the inquiry page at most once and last', () => {
  const events = fs.readFileSync(path.join(ROOT, 'data', 'events.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const views = new Map();
  for (const e of events.filter((x) => x.type === 'page_view')) views.set(e.session, (views.get(e.session) || []).concat(e.props.page));
  assert.ok([...views.values()].some((v) => v.length > 1), 'no visit with several page views');
  for (const [s, v] of views) {
    const inquiry = v.filter((p) => p === 'inquiry').length;
    assert.ok(inquiry <= 1, s + ' opens the inquiry page twice');
    if (inquiry) assert.equal(v[v.length - 1], 'inquiry', s);
  }
  for (const e of events.filter((x) => x.type !== 'page_view')) assert.ok(views.get(e.session)?.includes('inquiry'), e.session);
});
