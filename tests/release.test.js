import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkRelease, readReleaseDecisions, decisionProblem, formatRelease, nextDecisionNumber } from '../scripts/release.js';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(REPO, 'scripts', 'release.js');

// A small design system; the design gate reads its tokens and classes at run time.
const STYLES = ':root{--accent:#1d6b57;--space-2:.5rem;--radius-sm:8px}\n.button{background:var(--accent)}\n.card{margin:0}\n';
const CONFIG = '{"shipped": null, "variants": ["call-slot", "short-form"]}\n';
const page = (body) => `<!doctype html>\n<html lang="en">\n<head><link rel="stylesheet" href="/styles.css"></head>\n<body>\n${body}\n</body>\n</html>\n`;
const CLEAN = page('<main class="card"><button class="button" type="button">Book this call</button></main>');
const DESIGN_BAD = page('<main class="card"><a class="cta" style="background:#e4572e">Book now</a></main>');
const PRICE = page('<main class="card"><p>From € 1,900 per team: book this week.</p><button class="button" type="button">Book</button></main>');

const fields = (f) => ['# Decision', '', ...Object.entries(f).map(([k, v]) => `${k}: ${v}`), ''].join('\n');
const RELEASE = fields({ Variant: 'call-slot', Decision: 'release', 'Decided by': 'Noa Example', Role: 'product lead', Date: '2026-11-19', Reason: 'Both gates are green and the launch card is set.' });
const DESIGN_WAIVER = fields({ Gate: 'design', Variant: 'call-slot', 'Owner role': 'designer', 'Decided by': 'Sam Example', Date: '2026-11-19', Reason: 'The button colour is tested; tokens follow next sprint.' });
const LEGAL_WAIVER = fields({ Gate: 'legal', Variant: 'call-slot', 'Owner role': 'legal', 'Decided by': 'Sam Example', Date: '2026-11-19', Reason: 'We want the price on the page.' });

function repo(files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-release-'));
  const all = {
    'gates/gates.json': fs.readFileSync(path.join(REPO, 'gates', 'gates.json'), 'utf8'),
    'site/styles.css': STYLES,
    'site/config.json': CONFIG,
    ...files,
  };
  // Every hardened variant here has a launch decision, so the validation gate passes and these
  // tests see only the gates they test. tests/validation-gate.test.js tests that gate.
  for (const v of new Set(Object.keys(files).map((p) => (p.match(/^site\/hardened\/([^/]+)\//) || [])[1]).filter(Boolean))) {
    all[`discovery/decisions/900-launch-${v}.md`] ??= `Variant: ${v}\nDecision: launch\nDecided by: Kim Example\nRole: product lead\nDate: 2026-11-20\nReason: The test with people passed.\n`;
  }
  for (const [p, body] of Object.entries(all)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  return root;
}

const run = (root, ...args) => spawnSync(process.execPath, [SCRIPT, ...args, `--root=${root}`], { encoding: 'utf8' });
const shipped = (root) => JSON.parse(fs.readFileSync(path.join(root, 'site', 'config.json'), 'utf8')).shipped;
const missing = (r) => r.conditions.filter((c) => !c.ok).map((c) => c.owner);

test('refuses without a release decision, names the product lead, and leaves the config alone', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN });
  const r = checkRelease(root, 'call-slot');
  assert.equal(r.ok, false);
  assert.deepEqual(missing(r), ['product lead']);
  const out = run(root, 'call-slot');
  assert.equal(out.status, 1);
  assert.match(out.stdout, /MISSING {2}the product lead approves the release: npm run release -- call-slot --approved-by <name>\. The permission prompt on that command is the approval\. {2}owner: product lead/);
  assert.match(out.stdout, /release: refused\. Waiting on: product lead\. site\/config\.json is unchanged\./);
  assert.equal(fs.readFileSync(path.join(root, 'site', 'config.json'), 'utf8'), CONFIG);
});

test('refuses on a failing legal gate, even with a legal waiver and a release decision', () => {
  const root = repo({
    'site/hardened/call-slot/inquiry.html': PRICE,
    'discovery/decisions/005-legal-waiver-call-slot.md': LEGAL_WAIVER,
    'discovery/decisions/006-release-call-slot.md': RELEASE,
  });
  const r = checkRelease(root, 'call-slot');
  assert.equal(r.ok, false);
  assert.deepEqual(missing(r), ['legal']);
  const out = run(root, 'call-slot');
  assert.equal(out.status, 1);
  assert.match(out.stdout, /MISSING {2}the legal gate passes for call-slot \(hard, now: fail\) {2}owner: legal/);
  assert.match(out.stdout, /site\/hardened\/call-slot\/inquiry\.html:5 {2}legal\/[a-z-]+ {2}"€ 1,900/);
  assert.match(out.stdout, /waiver discovery\/decisions\/005-legal-waiver-call-slot\.md ignored: legal is a hard gate/);
  assert.equal(shipped(root), null);
});

test('refuses on a failing design gate without a waiver and names the designer', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': DESIGN_BAD, 'discovery/decisions/006-release-call-slot.md': RELEASE });
  const r = checkRelease(root, 'call-slot');
  assert.deepEqual(missing(r), ['designer']);
  assert.equal(run(root, 'call-slot').status, 1);
  assert.equal(shipped(root), null);
});

test('accepts a waived design gate with a release decision and sets the shipped key', () => {
  const root = repo({
    'site/hardened/call-slot/inquiry.html': DESIGN_BAD,
    'discovery/decisions/005-design-waiver-call-slot.md': DESIGN_WAIVER,
    'discovery/decisions/006-release-call-slot.md': RELEASE,
  });
  const dry = run(root, 'call-slot', '--dry-run');
  assert.equal(dry.status, 0, dry.stdout);
  assert.match(dry.stdout, /ok +the design gate passes or is waived for call-slot \(soft, now: waived, waived by discovery\/decisions\/005-design-waiver-call-slot\.md\)/);
  assert.equal(shipped(root), null, '--dry-run changes nothing');
  const out = run(root, 'call-slot');
  assert.equal(out.status, 0, out.stdout);
  assert.match(out.stdout, /"shipped" in site\/config\.json is now "call-slot"/);
  assert.match(out.stdout, /nothing is deployed anywhere/);
  assert.equal(fs.readFileSync(path.join(root, 'site', 'config.json'), 'utf8'), '{"shipped": "call-slot", "variants": ["call-slot", "short-form"]}\n', 'the rest of the file stays as it was');
  const again = run(root, 'call-slot');
  assert.equal(again.status, 0);
  assert.match(again.stdout, /already "call-slot"\. Nothing changed\./);
});

test('refuses a variant with no hardened build or not listed in the config', () => {
  const root = repo({ 'discovery/decisions/006-release-call-slot.md': RELEASE });
  const r = checkRelease(root, 'call-slot');
  assert.ok(missing(r).includes('the pair that runs the factory'));
  const other = checkRelease(repo({ 'site/hardened/format-quiz/formats.html': CLEAN }), 'format-quiz');
  assert.ok(missing(other).includes('product team'), 'format-quiz is not listed in the fixture config');
});

test('a release decision counts only with Decision: release, a person, the product lead role, a date and a reason', () => {
  const base = { Variant: 'call-slot', Decision: 'release', 'Decided by': 'Noa Example', Role: 'product lead', Date: '2026-11-19', Reason: 'Gates green.' };
  const root = repo({
    'discovery/decisions/010-release-call-slot.md': fields({ ...base, Decision: 'hold' }),
    'discovery/decisions/011-release-call-slot.md': fields({ ...base, 'Decided by': 'Claude' }),
    'discovery/decisions/012-release-call-slot.md': fields({ ...base, 'Decided by': '<name of the person>' }),
    'discovery/decisions/013-release-call-slot.md': fields({ ...base, Role: 'designer' }),
    'discovery/decisions/014-release-call-slot.md': fields({ ...base, Date: 'today' }),
    'discovery/decisions/015-release-call-slot.md': fields({ ...base, Reason: '' }),
    'discovery/decisions/016-release-call-slot.md': `# Decision\n\n- **Variant:** call-slot\n- **Decision:** release\n- **Decided by:** Noa Example\n- **Role:** Product lead\n- **Date:** 2026-11-19\n- **Reason:** Gates green.\n`,
    'discovery/decisions/017-call-slot.md': fields(base),
  });
  const ds = readReleaseDecisions(root);
  assert.deepEqual(ds.map((d) => d.file.split('/').pop().slice(0, 3)), ['010', '011', '012', '013', '014', '015', '016'], 'only files with release in the name');
  const problems = ds.map(decisionProblem);
  for (const [i, re] of [[0, /Decision: release/], [1, /no person/], [2, /no person/], [3, /product lead/], [4, /YYYY-MM-DD/], [5, /no reason/]]) assert.match(problems[i], re);
  assert.equal(problems[6], null, 'Markdown bold and list dashes are fine');
});

test('a hold decision by the product lead is reported as a hold, not as a missing decision', () => {
  const HOLD = fields({ Variant: 'call-slot', Decision: 'hold', 'Decided by': 'Kim Example', Role: 'product lead', Date: '2026-11-20', Reason: 'No test with people yet.' });
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/005-release-call-slot.md': HOLD });
  const result = checkRelease(root, 'call-slot');
  assert.equal(result.ok, false);
  assert.equal(result.held, 'discovery/decisions/005-release-call-slot.md');
  const out = formatRelease(result).join('\n');
  assert.match(out, /held by the product lead's decision/);
  assert.match(out, /^HOLD +the product lead decided to hold call-slot/m);
  assert.doesNotMatch(out, /^MISSING/m);
  assert.doesNotMatch(out, /Copy \.claude\/skills\/loopwise-factory\/release-decision-template\.md/);
  assert.match(fs.readFileSync(path.join(root, 'site', 'config.json'), 'utf8'), /"shipped": null/);
});

const decisionFiles = (root) => fs.readdirSync(path.join(root, 'discovery', 'decisions')).sort();

test('--approved-by releases, writes the record with the next number and the six fields, and sets shipped', () => {
  for (const form of [['--approved-by=Noa Vale', '--reason=Gates green, launch decided.'], ['--approved-by', 'Noa Vale', '--reason', 'Gates green, launch decided.']]) {
    const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/004-short-form.md': '# Decision 004\n' });
    assert.equal(nextDecisionNumber(root), '901', 'the fixture launch decision is 900');
    const out = run(root, ...form, 'call-slot');
    assert.equal(out.status, 0, out.stdout + out.stderr);
    assert.equal(shipped(root), 'call-slot');
    assert.match(out.stdout, /ok +the product lead approved the release of call-slot at the release prompt: Noa Vale {2}owner: product lead/);
    assert.match(out.stdout, /release: the approval by Noa Vale is recorded in discovery\/decisions\/901-release-call-slot\.md\./);
    const text = fs.readFileSync(path.join(root, 'discovery', 'decisions', '901-release-call-slot.md'), 'utf8');
    assert.match(text, /^# Decision 901: release call-slot$/m);
    assert.match(text, /^> Recorded by npm run release after the product lead approved at the release prompt\.$/m);
    for (const re of [/^Variant: call-slot$/m, /^Decision: release$/m, /^Decided by: Noa Vale$/m, /^Role: product lead$/m, /^Date: \d{4}-\d{2}-\d{2}$/m, /^Reason: Gates green, launch decided\.$/m]) assert.match(text, re);
    assert.match(text, /## What it rests on\n- Validation gate \(owner: product lead, hard\): pass\n- Legal gate \(owner: legal, hard\): pass\n- Design gate \(owner: designer, soft\): pass\n/);
    const [d] = readReleaseDecisions(root);
    assert.equal(decisionProblem(d), null, 'the record counts as a release decision');
  }
});

test('--approved-by without --reason records the default reason, and numbering starts at 001 in an empty folder', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN });
  fs.rmSync(path.join(root, 'discovery', 'decisions', '900-launch-call-slot.md'));
  fs.writeFileSync(path.join(root, 'discovery', 'decisions', 'notes.md'), 'no number\n');
  assert.equal(nextDecisionNumber(root), '001');
  // Without a launch decision the validation gate fails, so add one with a number.
  fs.writeFileSync(path.join(root, 'discovery', 'decisions', '005-launch-call-slot.md'), 'Variant: call-slot\nDecision: launch\nDecided by: Kim Example\nRole: product lead\nDate: 2026-11-20\nReason: The test with people passed.\n');
  const out = run(root, 'call-slot', '--approved-by=Noa Vale');
  assert.equal(out.status, 0, out.stdout);
  const text = fs.readFileSync(path.join(root, 'discovery', 'decisions', '006-release-call-slot.md'), 'utf8');
  assert.match(text, /^Reason: Approved at the release prompt\.$/m);
});

test('--approved-by "Claude" or "agent" or a placeholder is refused and writes nothing', () => {
  for (const name of ['Claude', 'agent', '<name>', '']) {
    const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN });
    const before = decisionFiles(root);
    const out = run(root, 'call-slot', `--approved-by=${name}`);
    assert.equal(out.status, 1, name);
    assert.match(out.stdout, /names no person\. An agent never approves a release\./);
    assert.match(out.stdout, /release: refused\. Waiting on: product lead\./);
    assert.deepEqual(decisionFiles(root), before);
    assert.equal(shipped(root), null);
  }
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN });
  const out = run(root, 'call-slot', '--approved-by', 'Claude');
  assert.equal(out.status, 1, 'the space form is checked too');
  assert.match(out.stdout, /--approved-by "Claude" names no person/);
});

test('--dry-run with --approved-by reports a release and writes nothing', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN });
  const before = decisionFiles(root);
  const out = run(root, 'call-slot', '--dry-run', '--approved-by', 'Noa Vale');
  assert.equal(out.status, 0, out.stdout);
  assert.match(out.stdout, /every condition holds/);
  assert.deepEqual(decisionFiles(root), before);
  assert.equal(fs.readFileSync(path.join(root, 'site', 'config.json'), 'utf8'), CONFIG);
});

test('a refused release with --approved-by (failing legal gate) writes nothing', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': PRICE });
  const before = decisionFiles(root);
  const out = run(root, 'call-slot', '--approved-by=Noa Vale');
  assert.equal(out.status, 1);
  assert.match(out.stdout, /release: refused\. Waiting on: legal\./);
  assert.deepEqual(decisionFiles(root), before);
  assert.equal(shipped(root), null);
});

test('a valid decision file still releases without --approved-by and no record is written', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': CLEAN, 'discovery/decisions/006-release-call-slot.md': RELEASE });
  const before = decisionFiles(root);
  const out = run(root, 'call-slot', '--approved-by', 'Noa Vale');
  assert.equal(out.status, 0, out.stdout);
  assert.match(out.stdout, /a release decision for call-slot exists: discovery\/decisions\/006-release-call-slot\.md/);
  assert.doesNotMatch(out.stdout, /is recorded in/);
  assert.deepEqual(decisionFiles(root), before);
  assert.equal(shipped(root), 'call-slot');
});
