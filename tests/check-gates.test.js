import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkGates, formatResult, findPrices } from '../scripts/check-gates.js';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(REPO, 'scripts', 'check-gates.js');

// A small design system. The gate reads tokens and classes from it at run time.
const STYLES = `/* fixture design system */
:root{--accent:#1d6b57;--card:#fff;--fg:#17202a;--space-2:.5rem;--space-3:.75rem;--radius:10px}
@media (prefers-color-scheme:dark){:root{--accent:#6cc2a6}}
.button{background:var(--accent);padding:.5rem 1rem}
.button.secondary{background:transparent}
.card{border:1px solid var(--accent)}
.field{margin:0 0 1rem}
`;

const page = (body) => `<!doctype html>\n<html lang="en">\n<head><link rel="stylesheet" href="/styles.css"></head>\n<body>\n${body}\n</body>\n</html>\n`;

function repo(files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-gates-'));
  const all = {
    'gates/gates.json': fs.readFileSync(path.join(REPO, 'gates', 'gates.json'), 'utf8'),
    'site/styles.css': STYLES,
    ...files,
  };
  // Every hardened variant here has a launch decision, so the validation gate passes and these
  // tests see only the gates they test. tests/validation-gate.test.js tests that gate.
  for (const v of new Set(Object.keys(files).map((p) => (p.match(/^site\/hardened\/([^/]+)\//) || [])[1]).filter(Boolean))) {
    all[`discovery/decisions/900-launch-${v}.md`] ??= `Variant: ${v}\nDecision: launch\nDecided by: Kim Example\nRole: product lead\nDate: 2026-11-20\nReason: The test with people passed.\n`;
  }
  for (const [p, body] of Object.entries(all)) {
    if (body === null) continue;
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  return root;
}

const waiver = (fields) => ['# Waiver', '', ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`), ''].join('\n');
const designWaiver = (variant, extra = {}) => waiver({
  Gate: 'design', Variant: variant, 'Owner role': 'designer', 'Decided by': 'Noa Example', Date: '2026-11-19',
  Reason: 'The calendar colours are tested with buyers; the designer adds tokens next sprint.', ...extra,
});
const rules = (gate) => gate.findings.map((f) => f.rule);

test('no hardened variant: both gates pass', () => {
  const r = checkGates(repo());
  assert.equal(r.ok, true);
  assert.equal(r.gates.design.status, 'pass');
  assert.equal(r.gates.legal.status, 'pass');
  assert.deepEqual(r.hardened, []);
});

test('gates.json names both gates with owner role, kind and rule file', () => {
  const config = JSON.parse(fs.readFileSync(path.join(REPO, 'gates', 'gates.json'), 'utf8'));
  const byId = Object.fromEntries(config.gates.map((g) => [g.id, g]));
  assert.equal(byId.design.owner, 'designer');
  assert.equal(byId.design.kind, 'soft');
  assert.equal(byId.legal.owner, 'legal');
  assert.equal(byId.legal.kind, 'hard');
  for (const g of config.gates) assert.ok(fs.existsSync(path.join(REPO, g.rule)), g.rule);
});

test('a planted colour fails the design gate with file, line, rule and owner', () => {
  const root = repo({ 'site/hardened/call-slot/inquiry.html': page('<p style="color:#e33">Pick a slot</p>') });
  const r = checkGates(root);
  assert.equal(r.ok, false);
  assert.equal(r.gates.design.status, 'fail');
  assert.equal(r.gates.legal.status, 'pass');
  const lines = formatResult(r);
  assert.ok(lines.includes('site/hardened/call-slot/inquiry.html:5  design/hard-coded-colour  "#e33"  owner: designer (soft, waiver possible)'), lines.join('\n'));
  assert.ok(lines.some((l) => l.startsWith('design gate (owner: designer, soft): fail')));
  assert.ok(lines.includes('legal gate (owner: legal, hard): pass'));
});

test('colours are found in CSS files, style blocks, colour attributes and scripts', () => {
  const root = repo({
    'site/hardened/v/index.html': page([
      '<style>',
      '  .slot{background:rgb(10, 20, 30)}',
      '  .slot-time{color:red}',
      '</style>',
      '<svg><path fill="#00ff00" stroke="currentColor"/></svg>',
      '<script>document.body.style.background = "tomato"; const pick = document.querySelector("#add");</script>',
    ].join('\n')),
    'site/hardened/v/slots.css': '.calendar{border-top:1px solid hsl(120 50% 50%)}\n.day{color:var(--fg)}\n',
    'site/hardened/v/slots.js': 'export const tint = "#abcdef";\nconst label = `<span style="color: navy">Free</span>`;\n',
  });
  const found = checkGates(root).gates.design.findings.map((f) => `${f.file.split('/').pop()}:${f.line} ${f.match}`);
  assert.deepEqual(found.sort(), [
    'index.html:10 tomato',
    'index.html:6 rgb(10, 20, 30)',
    'index.html:7 red',
    'index.html:9 #00ff00',
    'slots.css:1 hsl(120 50% 50%)',
    'slots.js:1 #abcdef',
    'slots.js:2 navy',
  ]);
});

test('hard-coded spacing fails; tokens, 0 and 1px borders pass; an unknown token fails', () => {
  const root = repo({
    'site/hardened/v/slots.css': [
      '.calendar{display:grid;gap:12px;padding:var(--space-3)}',
      '.day{margin:0;border:1px solid var(--accent);padding:1.5rem var(--space-2)}',
      '.talk{margin-top:2em;width:20rem}',
      '.slot{gap:var(--space-9)}',
      '.slot-time{padding:calc(var(--space-2) * 2)}',
    ].join('\n'),
  });
  const f = checkGates(root).gates.design.findings;
  assert.deepEqual(f.map((x) => `${x.line} ${x.rule} ${x.match}`), [
    '1 design/hard-coded-spacing gap: 12px',
    '2 design/hard-coded-spacing padding: 1.5rem',
    '3 design/hard-coded-spacing margin-top: 2em',
    '4 design/unknown-token gap: --space-9',
  ]);
});

test('buttons outside the design system are found, in HTML and in HTML strings in scripts', () => {
  const root = repo({
    'site/hardened/v/inquiry.html': page([
      '<button type="submit">Send</button>',
      '<button class="button" type="submit">Send</button>',
      '<a class="button secondary" href="/formats.html">Formats</a>',
      '<input type="submit" value="Send">',
      '<input type="text" name="name">',
      '<a class="cta-link" href="/inquiry.html">Ask</a>',
      '<a class="slot-link" href="#slot">10:00</a>',
    ].join('\n')),
    'site/hardened/v/slots.js': 'const html = `<button class="slot-pick">Pick</button>`;\n',
  });
  const f = checkGates(root).gates.design.findings;
  assert.deepEqual(f.map((x) => `${x.file.split('/').pop()}:${x.line} ${x.match}`), [
    'inquiry.html:5 <button> without class "button"',
    'inquiry.html:8 <input> without class "button"',
    'inquiry.html:10 <a class="cta-link"> without class "button"',
    'slots.js:1 <button class="slot-pick"> without class "button"',
  ]);
  assert.ok(f.every((x) => x.rule === 'design/component-outside-system'));
});

test('restyling a design system component or a native control fails; layout and page-local classes pass', () => {
  const root = repo({
    'site/hardened/v/slots.css': [
      '.calendar .card{background:var(--card);border-radius:var(--radius)}',
      'form button:hover{color:var(--fg)}',
      '.card{display:grid;gap:var(--space-3);width:100%}',
      '.slot{background:var(--card);padding:var(--space-2);color:var(--fg)}',
      '.card .slot-time{font-weight:600}',
      'input[type=radio]{width:auto;position:relative}',
    ].join('\n'),
    'site/hardened/v/index.html': page('<div class="card" style="box-shadow:none">x</div>'),
  });
  const f = checkGates(root).gates.design.findings;
  assert.deepEqual(f.map((x) => `${x.file.split('/').pop()}:${x.line} ${x.match}`), [
    'index.html:5 style on <div class="card">: box-shadow',
    'slots.css:1 .calendar .card: background, border-radius',
    'slots.css:2 form button:hover: color',
  ]);
});

test('tokens and classes come from site/styles.css at run time', () => {
  const css = '.tile{background:var(--card)}\n.tile-row{gap:var(--space-7)}\n';
  const before = checkGates(repo({ 'site/hardened/v/x.css': css })).gates.design.findings;
  assert.deepEqual(rules({ findings: before }), ['design/unknown-token']);
  const after = checkGates(repo({
    'site/styles.css': `${STYLES}:root{--space-7:2rem}\n.tile{border:1px solid var(--accent)}\n`,
    'site/hardened/v/x.css': css,
  })).gates.design.findings;
  assert.deepEqual(rules({ findings: after }), ['design/component-outside-system']);
});

test('a design waiver from the designer turns fail into waived, for its own variant only', () => {
  const files = {
    'site/hardened/call-slot/inquiry.html': page('<p style="color:#e33">Pick a slot</p>'),
    'discovery/decisions/004-design-waiver-call-slot.md': designWaiver('call-slot'),
  };
  const r = checkGates(repo(files));
  assert.equal(r.ok, true);
  assert.equal(r.gates.design.status, 'waived');
  assert.equal(r.gates.design.findings[0].waived, true);
  const lines = formatResult(r);
  assert.ok(lines.includes('site/hardened/call-slot/inquiry.html:5  design/hard-coded-colour  "#e33"  owner: designer (soft, waived by discovery/decisions/004-design-waiver-call-slot.md)'), lines.join('\n'));
  assert.ok(lines.some((l) => l.startsWith('design gate (owner: designer, soft): waived. call-slot: 1 finding, waived by')));

  const other = checkGates(repo({ ...files, 'site/hardened/other/inquiry.html': page('<p style="color:red">x</p>') }));
  assert.equal(other.gates.design.status, 'fail');
  assert.deepEqual(other.gates.design.variants, { 'call-slot': 'waived', other: 'fail' });
});

test('a waiver with the wrong owner role, no person or no date is ignored and reported', () => {
  for (const [extra, why] of [
    [{ 'Owner role': 'product lead' }, /owner role is "product lead"/],
    [{ 'Decided by': 'Claude' }, /names no person/],
    [{ 'Decided by': '<name>' }, /names no person/],
    [{ Date: 'today' }, /no date/],
  ]) {
    const r = checkGates(repo({
      'site/hardened/v/inquiry.html': page('<p style="color:#e33">x</p>'),
      'discovery/decisions/004-design-waiver-v.md': designWaiver('v', extra),
    }));
    assert.equal(r.gates.design.status, 'fail');
    assert.match(r.gates.design.waivers[0].ignored, why);
    assert.ok(formatResult(r).some((l) => l.startsWith('design gate: waiver discovery/decisions/004-design-waiver-v.md ignored')));
  }
});

test('a planted price fails the legal gate and a legal waiver is ignored', () => {
  const files = { 'site/hardened/call-slot/inquiry.html': page('<p>Half-day workshop: € 1,200 per participant.</p>') };
  const r = checkGates(repo(files));
  assert.equal(r.ok, false);
  assert.equal(r.gates.legal.status, 'fail');
  assert.ok(formatResult(r).includes('site/hardened/call-slot/inquiry.html:5  legal/per-unit-amount  "€ 1,200 per participant"  owner: legal (hard, no waiver)'));

  const waived = checkGates(repo({
    ...files,
    'discovery/decisions/005-legal-waiver-call-slot.md': waiver({
      Gate: 'legal', Variant: 'call-slot', 'Owner role': 'legal', 'Decided by': 'Noa Example', Date: '2026-11-19', Reason: 'Trial.',
    }),
  }));
  assert.equal(waived.ok, false);
  assert.equal(waived.gates.legal.status, 'fail');
  assert.equal(waived.gates.legal.findings[0].waived, false);
  const lines = formatResult(waived);
  assert.ok(lines.includes('legal gate: waiver discovery/decisions/005-legal-waiver-call-slot.md ignored: legal is a hard gate, no waiver possible'), lines.join('\n'));
  assert.ok(lines.some((l) => l.startsWith('legal gate (owner: legal, hard): fail') && l.includes('A hard gate takes no waiver')));
});

test('the legal gate finds prices in every form the policy names', () => {
  const cases = [
    ['€ 1,200 per participant', 'legal/per-unit-amount'],
    ['EUR 990 for the day', 'legal/currency-amount'],
    ['Price: $990', 'legal/currency-amount'],
    ['1.200 € net', 'legal/currency-amount'],
    ['CHF 800', 'legal/currency-amount'],
    ['about 450 euro', 'legal/currency-amount'],
    ['&euro;&nbsp;80 per person', 'legal/per-unit-amount'],
    ['990/day', 'legal/per-unit-amount'],
    ['1,500 per team', 'legal/per-unit-amount'],
    ['Half day from 1,200', 'legal/price-word-amount'],
    ['now only 990', 'legal/price-word-amount'],
    ['starting at 2.400', 'legal/price-word-amount'],
    ['It costs 900.', 'legal/price-word-amount'],
    ['£2k for a team', 'legal/currency-amount'],
  ];
  for (const [text, rule] of cases) {
    const found = findPrices(text);
    assert.equal(found.length, 1, `${text}: ${JSON.stringify(found)}`);
    assert.equal(found[0].rule, rule, text);
  }
});

test('dates, times, phone numbers, counts and percentages are not prices', () => {
  const clean = [
    'The format starts on 2026-08-19.',
    'Next date: 19.08.2026 or 19/08/2026, from 2027 on.',
    'From 9:00 to 17:00, lunch at 12.30.',
    'Call +49 30 1234 5678 or 0800 123 456.',
    'From 6 to 20 participants, up to 15 per team, 5 people per group.',
    'Follow-up after four weeks, 2 days per month.',
    'Only 30% of buyers know their format.',
    'Trusted by teams from 1,200 companies.',
    'We reply within 3 days. 120 participants per year.',
    "text.replace(/(a)(b)/, '$2$1'); const x = `${count} slots`;",
    '<svg viewBox="0 0 34 20" width="200"></svg>',
    'import { initInquiryForm } from "/components/inquiry-form.js";',
  ];
  for (const text of clean) assert.deepEqual(findPrices(text), [], text);
});

test('prototypes in site/variants/ are never scanned', () => {
  const r = checkGates(repo({
    'site/variants/call-slot/inquiry.html': page('<p style="color:#e33">from 1,200 per participant</p><button>Go</button>'),
  }));
  assert.equal(r.ok, true);
  assert.deepEqual(r.hardened, []);
  assert.equal(r.gates.design.findings.length + r.gates.legal.findings.length, 0);
});

test('the clean hardened variant passes both gates', () => {
  const r = checkGates(repo({
    'site/hardened/call-slot/inquiry.html': page([
      '<main class="card">',
      '  <p class="slot-time">Tuesday 2026-11-24, 10:00 to 10:30, for 2 to 3 people.</p>',
      '  <button class="button" type="submit">Book the call</button>',
      '  <a class="button secondary" href="/formats.html">See the formats</a>',
      '</main>',
    ].join('\n')),
    'site/hardened/call-slot/slots.css': '.slot-time{color:var(--accent);margin:0 0 var(--space-2)}\n.card{display:grid;gap:var(--space-3)}\n',
    'site/hardened/call-slot/slots.js': 'document.querySelector("#slot").classList.add("is-current");\n',
  }));
  assert.equal(r.ok, true, JSON.stringify(r.gates, null, 2));
  assert.equal(r.gates.design.status, 'pass');
  assert.equal(r.gates.legal.status, 'pass');
});

test('the command line: exit codes, --json, and --with-discovery reports both checks', () => {
  const run = (root, ...args) => spawnSync(process.execPath, [SCRIPT, ...args, root], { encoding: 'utf8' });
  const clean = repo();
  assert.equal(run(clean).status, 0);

  const bad = repo({ 'site/hardened/x/inquiry.html': page('<p>€ 1,200 per participant</p>') });
  const out = run(bad, '--json');
  assert.equal(out.status, 1);
  const json = JSON.parse(out.stdout);
  assert.equal(json.ok, false);
  assert.equal(json.gates.legal.status, 'fail');
  assert.deepEqual(Object.keys(json.gates.legal.findings[0]).slice(0, 5), ['variant', 'file', 'line', 'rule', 'match']);
  assert.equal(json.gates.legal.findings[0].owner, 'legal');

  const both = repo({
    'discovery/x.md': `A dash ${String.fromCharCode(0x2014)} here.\n`,
    'site/hardened/x/inquiry.html': page('<p style="color:#e33">x</p>'),
  });
  const r = run(both, '--with-discovery');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /discovery\/x\.md:1: em or en dash/);
  assert.match(r.stdout, /design gate \(owner: designer, soft\): fail/);
});
