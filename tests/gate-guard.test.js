import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(REPO, 'scripts', 'hooks', 'gate-guard.js');

const page = (body) => `<!doctype html>\n<html lang="en">\n<head><link rel="stylesheet" href="/styles.css"></head>\n<body>\n${body}\n</body>\n</html>\n`;

// A temp repo root with the real gates and design system, plus the given files.
function repo(files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-guard-'));
  const all = {
    'gates/gates.json': fs.readFileSync(path.join(REPO, 'gates', 'gates.json'), 'utf8'),
    'site/styles.css': fs.readFileSync(path.join(REPO, 'site', 'styles.css'), 'utf8'),
    'site/config.json': '{"shipped": null, "variants": ["call-slot"]}\n',
    ...files,
  };
  for (const [p, body] of Object.entries(all)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), body);
  }
  return root;
}

// Runs the guard with the hook JSON on stdin. Returns the parsed output (or null) and the exit code.
function guard(root, hook) {
  const input = typeof hook === 'string' ? hook : JSON.stringify({ cwd: root, ...hook });
  const r = spawnSync(process.execPath, [SCRIPT], { input, encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: root } });
  const out = r.stdout.trim();
  return { status: r.status, out: out ? JSON.parse(out) : null, raw: out };
}

const preWrite = (root, rel, content, tool = 'Write') => ({
  hook_event_name: 'PreToolUse', tool_name: tool, tool_input: { file_path: path.join(root, rel), content },
});
const preEdit = (root, rel, old_string, new_string, extra = {}) => ({
  hook_event_name: 'PreToolUse', tool_name: 'Edit', tool_input: { file_path: path.join(root, rel), old_string, new_string, ...extra },
});
const bash = (command) => ({ hook_event_name: 'PreToolUse', tool_name: 'Bash', tool_input: { command } });
const decision = (r) => r.out && r.out.hookSpecificOutput.permissionDecision;
const reason = (r) => r.out && r.out.hookSpecificOutput.permissionDecisionReason;

test('rule 1: a new price in a hardened page is refused by the legal gate', () => {
  const root = repo();
  const r = guard(root, preWrite(root, 'site/hardened/call-slot/inquiry.html', page('<p>From CHF 1,900 per team</p>')));
  assert.equal(r.status, 0);
  assert.equal(r.out.hookSpecificOutput.hookEventName, 'PreToolUse');
  assert.equal(decision(r), 'deny');
  assert.match(reason(r), /^legal gate \(hard, owner: legal\): "CHF 1,900 per team" is a price\./);
  assert.match(reason(r), /No exception, not even from legal\. The write did not happen\. Remove the price; do not try another way\.$/);
});

test('rule 1: an edit adds a price; a price the file holds already is not counted again', () => {
  const rel = 'site/hardened/call-slot/inquiry.html';
  const root = repo({ [rel]: page('<p>Pick a slot</p>') });
  assert.equal(decision(guard(root, preEdit(root, rel, 'Pick a slot', 'Only 900 CHF'))), 'deny');
  const old = repo({ [rel]: page('<p>Pick a slot. 900 CHF</p>') });
  assert.equal(guard(old, preEdit(old, rel, 'Pick a slot', 'Choose a slot')).out, null);
  const clean = repo();
  assert.equal(guard(clean, preWrite(clean, rel, page('<p>Pick a slot</p>'))).out, null);
});

test('rule 1: MultiEdit applies the edits in order', () => {
  const rel = 'site/hardened/call-slot/inquiry.html';
  const root = repo({ [rel]: page('<p>Pick a slot</p>') });
  const r = guard(root, { hook_event_name: 'PreToolUse', tool_name: 'MultiEdit', tool_input: {
    file_path: path.join(root, rel), edits: [{ old_string: 'Pick', new_string: 'Choose' }, { old_string: 'Choose a slot', new_string: 'Choose a slot, $ 450' }],
  } });
  assert.equal(decision(r), 'deny');
});

test('rule 2: setting "shipped" in site/config.json is refused, a new variant is allowed', () => {
  const root = repo();
  const shipped = guard(root, preWrite(root, 'site/config.json', '{"shipped": "call-slot", "variants": ["call-slot"]}'));
  assert.equal(decision(shipped), 'deny');
  assert.equal(reason(shipped), 'site/config.json: only npm run release sets "shipped". It runs the gates again and asks the product lead. Nobody sets it by hand, the agent included.');
  const variants = guard(root, preEdit(root, 'site/config.json', '["call-slot"]', '["call-slot", "short-form"]'));
  assert.equal(decision(variants), 'allow');
  assert.equal(guard(root, preWrite(root, 'site/config.json', '{"shipped": null,')).out, null);
  assert.equal(guard(root, preWrite(root, 'site/config.json', '{"shipped": null, "variants": ["call-slot"], "x": 1}')).out, null);
});

test('rule 2: "shipped" back to null is a roll-back and asks the product lead', () => {
  const root = repo({ 'site/config.json': '{"shipped": "call-slot", "variants": ["call-slot"]}\n' });
  const r = guard(root, preEdit(root, 'site/config.json', '"shipped": "call-slot"', '"shipped": null'));
  assert.equal(decision(r), 'ask');
  assert.match(reason(r), /A roll-back is the product lead's decision\. Only the product lead says yes\.$/);
  const other = guard(root, preEdit(root, 'site/config.json', '"shipped": "call-slot"', '"shipped": "short-form"'));
  assert.equal(decision(other), 'deny');
});

test('rule 3: a change to site/styles.css asks for the designer', () => {
  const root = repo();
  const r = guard(root, preEdit(root, 'site/styles.css', '--radius:10px', '--radius:12px'));
  assert.equal(decision(r), 'ask');
  assert.equal(reason(r), 'site/styles.css is the design system. The designer owns it. Say yes only if the designer approves this change.');
});

test('rule 4: a waiver, launch or release file asks its owner; another decision file does not', () => {
  const root = repo();
  for (const name of ['007-waiver-design-call-slot.md', '008-launch-call-slot.md', '009-release-call-slot.md']) {
    const r = guard(root, preWrite(root, `discovery/decisions/${name}`, 'Variant: call-slot\n'));
    assert.equal(decision(r), 'ask', name);
    assert.match(reason(r), /^This is a decision file\. Only the person who owns the decision says yes here/);
  }
  assert.equal(guard(root, preWrite(root, 'discovery/decisions/002-call-slot.md', 'We learned.\n')).out, null);
});

test('rule 5: a command that writes site/config.json is refused, a read is not', () => {
  const root = repo();
  for (const cmd of ['echo {} > site/config.json', "sed -i '' 's/null/\"x\"/' site/config.json", 'cp /tmp/c.json site/config.json',
    "node -e \"require('fs').writeFileSync('site/config.json','{}')\"", 'jq .shipped site/config.json | tee site/config.json']) {
    const r = guard(root, bash(cmd));
    assert.equal(decision(r), 'deny', cmd);
    assert.match(reason(r), /Nobody sets it by hand, the agent included\. Use npm run release\.$/);
  }
  for (const cmd of ['cat site/config.json', 'grep shipped site/config.json', 'head -5 site/config.json 2>/dev/null',
    'jq .shipped site/config.json', "node -e \"const c = JSON.parse(require('fs').readFileSync('site/config.json','utf8')); [1].map((x) => x); console.log(c.shipped)\"",
    "python3 -c \"import json; print(json.load(open('site/config.json'))['shipped'])\""]) {
    assert.equal(guard(root, bash(cmd)).out, null, cmd);
  }
});

test('rule 6: a command that writes a price into site/hardened/ is refused', () => {
  const root = repo();
  const r = guard(root, bash("echo '<p>From CHF 1,900 per team</p>' >> site/hardened/call-slot/inquiry.html"));
  assert.equal(decision(r), 'deny');
  assert.match(reason(r), /^legal gate \(hard, owner: legal\): "CHF 1,900 per team" is a price\./);
  assert.equal(guard(root, bash("echo '<p>Pick a slot</p>' >> site/hardened/call-slot/inquiry.html")).out, null);
  assert.equal(guard(root, bash('grep -n "CHF 1,900" site/hardened/call-slot/inquiry.html')).out, null);
});

test('rule 7: a command that writes a decision file asks its owner', () => {
  const root = repo();
  for (const cmd of ['cp template.md discovery/decisions/007-waiver-design-call-slot.md', 'echo x > discovery/decisions/008-launch-call-slot.md',
    'cat x | tee discovery/decisions/009-release-call-slot.md', 'mv draft.md discovery/decisions/010-release-call-slot.md']) {
    const r = guard(root, bash(cmd));
    assert.equal(decision(r), 'ask', cmd);
    assert.match(reason(r), /^This is a decision file\./);
  }
  assert.equal(guard(root, bash('cp discovery/decisions/005-launch-call-slot.md /tmp/x.md')).out, null);
  assert.equal(guard(root, bash('cat discovery/decisions/005-launch-call-slot.md')).out, null);
});

test('rule 8: the release asks the product lead, a dry run does not', () => {
  const root = repo();
  for (const cmd of ['npm run release -- call-slot --approved-by Kim', 'node scripts/release.js call-slot']) {
    const r = guard(root, bash(cmd));
    assert.equal(decision(r), 'ask', cmd);
    assert.equal(reason(r), 'Go-live approval, like approving a pull request for production. Only the product lead says yes. Everything else the system has checked.');
  }
  assert.equal(guard(root, bash('npm run release -- call-slot --dry-run')).out, null);
});

test('rule 9: after a write in site/hardened/, design findings go back to the agent', () => {
  const rel = 'site/hardened/call-slot/inquiry.html';
  const root = repo({ [rel]: page('<p style="color:#e33">Pick a slot</p>') });
  const r = guard(root, { hook_event_name: 'PostToolUse', tool_name: 'Write', tool_input: { file_path: path.join(root, rel), content: '' } });
  assert.equal(r.status, 0);
  assert.equal(r.out.decision, 'block');
  const lines = r.out.reason.split('\n');
  assert.equal(lines[0], 'site/hardened/call-slot/inquiry.html:5  design/hard-coded-colour  "#e33"');
  assert.match(lines[lines.length - 1], /^design gate \(soft, owner: designer\)\. Fix it in the page with a token or a component from site\/styles\.css\./);
  assert.equal(r.out.hookSpecificOutput.hookEventName, 'PostToolUse');
  assert.equal(r.out.hookSpecificOutput.additionalContext, r.out.reason);
  assert.equal(r.out.systemMessage, 'design gate (soft, owner: designer): 1 finding(s) in call-slot. The agent fixes them.');
});

test('rule 9: a clean hardened page prints nothing', () => {
  const rel = 'site/hardened/call-slot/inquiry.html';
  const root = repo({ [rel]: page('<p class="lead">Pick a slot</p>') });
  const r = guard(root, { hook_event_name: 'PostToolUse', tool_name: 'Edit', tool_input: { file_path: path.join(root, rel) } });
  assert.equal(r.out, null);
});

test('build to learn: a write in site/variants/ prints nothing, before and after', () => {
  const rel = 'site/variants/call-slot/inquiry.html';
  const root = repo({ [rel]: page('<p style="color:#e33">Pick a slot</p>') });
  assert.equal(guard(root, preWrite(root, rel, page('<p style="color:#e33">From CHF 1,900 per team</p>'))).out, null);
  assert.equal(guard(root, { hook_event_name: 'PostToolUse', tool_name: 'Write', tool_input: { file_path: path.join(root, rel) } }).out, null);
});

test('malformed stdin prints nothing and exits 0', () => {
  const root = repo();
  for (const input of ['', 'not json', '{"hook_event_name":"PreToolUse","tool_name":"Bash"}', '{"hook_event_name":"Stop"}']) {
    const r = guard(root, input);
    assert.equal(r.status, 0, input);
    assert.equal(r.raw, '', input);
  }
});
