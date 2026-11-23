// The release step, run with `npm run release -- <variant>`. A simulated deployment: nothing is
// deployed anywhere. The release is the `shipped` key in site/config.json, which the local server
// reads. The step sets it to <variant> only when every condition holds:
//   1. the variant is listed under `variants` in site/config.json
//   2. the variant has a hardened build in site/hardened/<variant>/
//   3. the legal gate (hard) passes for the variant
//   4. the design gate (soft) passes or is waived for the variant
//   5. the product lead approves the release, in one of two ways:
//      - `--approved-by <name>` names a person. The permission prompt on that command is the
//        approval, like approving a pull request for production. Only the product lead says yes.
//      - or a release decision exists in discovery/decisions/: a file whose name contains
//        `release`, with the lines Variant, Decision: release, Decided by (a person),
//        Role: product lead, Date (YYYY-MM-DD) and a reason.
// Otherwise it refuses and prints each missing condition with its owner role. The agent never
// approves a release: a person does.
//
// On a real release with --approved-by and no valid decision file, the script writes the record
// discovery/decisions/<next number>-release-<variant>.md with the six fields. Not on --dry-run,
// not when it refuses.
//
//   node scripts/release.js <variant>             release, or refuse
//   node scripts/release.js <variant> --approved-by=<name>   the product lead approves at the prompt
//   node scripts/release.js <variant> --approved-by=<name> --reason=<text>   with the reason recorded
//   node scripts/release.js <variant> --dry-run   only report, change nothing
//   node scripts/release.js <variant> --root=<dir>   another repo root (tests use temp folders)
// --approved-by and --reason also take the value as the next word: --approved-by "Noa Vale".
//
// Exit code 0 when released (or, with --dry-run, when it would release), 1 otherwise.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkGates } from './check-gates.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIELD = /^(variant|decision|decided by|role|date|reason)\s*:\s*(.*)$/i;
const NOT_A_PERSON = /\b(claude|agent|assistant|ai|bot)\b/i;

// Release decisions in discovery/decisions/: files whose name contains `release`.
export function readReleaseDecisions(root) {
  const dir = path.join(root, 'discovery', 'decisions');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((n) => /release/i.test(n) && n.endsWith('.md')).sort().map((n) => {
    const fields = {};
    const prose = [];
    for (const raw of fs.readFileSync(path.join(dir, n), 'utf8').split('\n')) {
      const line = raw.replace(/\*\*|`/g, '').replace(/^\s*(?:[-*>]\s+)*/, '').trim();
      const m = line.match(FIELD);
      if (m && !(m[1].toLowerCase() in fields)) fields[m[1].toLowerCase()] = m[2].trim();
      else if (line && !line.startsWith('#')) prose.push(line);
    }
    return {
      file: `discovery/decisions/${n}`,
      variant: fields.variant || '',
      decision: (fields.decision || '').toLowerCase(),
      decidedBy: fields['decided by'] || '',
      role: (fields.role || '').toLowerCase(),
      date: fields.date || '',
      reason: fields.reason || '',
    };
  });
}

// True when a name is a person: not empty, not a <placeholder>, not an agent.
export function isPerson(name) {
  const n = (name || '').trim();
  return Boolean(n) && !/^<.*>$/.test(n) && !NOT_A_PERSON.test(n);
}

// Why a release decision does not count, or null if it does.
export function decisionProblem(d) {
  if (d.decision !== 'release') return `it does not say "Decision: release" (it says "${d.decision || 'nothing'}")`;
  if (!isPerson(d.decidedBy)) return 'Decided by names no person; an agent never decides a release';
  if (d.role !== 'product lead') return `its role is "${d.role || 'missing'}", a release is decided by the product lead (Role: product lead)`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) return 'it has no date as YYYY-MM-DD';
  if (!d.reason || /^<.*>$/.test(d.reason)) return 'it gives no reason (Reason: ...)';
  return null;
}

function readConfig(file) {
  const text = fs.readFileSync(file, 'utf8');
  return { text, config: JSON.parse(text) };
}

// Checks every condition for releasing <variant>. Each condition: ok, what it is, owner role, detail lines.
// approvedBy: the name given with --approved-by, or undefined when the flag is not used.
export function checkRelease(root, variant, { approvedBy } = {}) {
  const conditions = [];
  const add = (ok, what, owner, details = []) => conditions.push({ ok, what, owner, details });
  const configFile = path.join(root, 'site', 'config.json');
  let config = { shipped: null, variants: [] };
  try {
    config = readConfig(configFile).config;
  } catch (e) {
    add(false, 'site/config.json can be read', 'product team', [String(e.message)]);
  }
  const variants = Array.isArray(config.variants) ? config.variants : [];
  add(variants.includes(variant), `${variant} is listed under "variants" in site/config.json`, 'product team');

  const hardened = path.join(root, 'site', 'hardened', variant);
  const pages = fs.existsSync(hardened) ? fs.readdirSync(hardened).filter((f) => f.endsWith('.html')) : [];
  add(pages.length > 0, `${variant} has a hardened build in site/hardened/${variant}/`, 'the pair that runs the factory',
    pages.length ? [] : [`Run the factory first: /loopwise-factory ${variant} run-1 in Claude Code.`]);

  let gates = null;
  try {
    gates = checkGates(root).gates;
  } catch (e) {
    add(false, 'the release gates can run', 'product team', [`gates: ${e.message}`]);
  }
  const gateLines = [];
  const gateLine = (g, status) => gateLines.push(`${g.name || `${g.id} gate`} (owner: ${g.owner}, ${g.kind}): ${status}`);
  const findingLines = (g) => g.findings.filter((f) => f.variant === variant).map((f) => `${f.file}${f.line ? `:${f.line}` : ''}  ${f.rule}  "${f.match}"`);
  if (gates?.validation) {
    const g = gates.validation;
    const status = g.variants[variant] || 'not scanned';
    gateLine(g, status);
    add(status === 'pass', `the ${g.id} gate passes for ${variant} (${g.kind}, now: ${status}): the product lead decided launch`, g.owner,
      [...findingLines(g), ...(status === 'fail' ? ['A hard gate takes no waiver: the product lead writes a launch decision, or the variant does not go into build to earn.'] : [])]);
  }
  if (gates?.legal) {
    const g = gates.legal;
    const status = g.variants[variant] || 'not scanned';
    gateLine(g, status);
    const ignored = g.waivers.filter((w) => w.variant === variant && !w.applied).map((w) => `waiver ${w.file} ignored: ${w.ignored}`);
    add(status === 'pass', `the ${g.id} gate passes for ${variant} (${g.kind}, now: ${status})`, g.owner,
      [...findingLines(g), ...ignored, ...(status === 'fail' ? ['A hard gate takes no waiver: the fix is in the page.'] : [])]);
  }
  if (gates?.design) {
    const g = gates.design;
    const status = g.variants[variant] || 'not scanned';
    const w = g.waivers.find((x) => x.variant === variant && x.applied);
    gateLine(g, w && status === 'waived' ? `waived by ${w.file}` : status);
    add(status === 'pass' || status === 'waived', `the ${g.id} gate passes or is waived for ${variant} (${g.kind}, now: ${status}${w ? `, waived by ${w.file}` : ''})`, g.owner,
      status === 'fail' ? [...findingLines(g), `Fix it, or the ${g.owner} writes a waiver in discovery/decisions/ (template: .claude/skills/loopwise-factory/waiver-template.md).`] : []);
  }

  const decisions = readReleaseDecisions(root).filter((d) => d.variant === variant);
  const valid = decisions.find((d) => !decisionProblem(d));
  const flagUsed = approvedBy !== undefined;
  const approver = flagUsed ? String(approvedBy).trim() : '';
  // The approval at the release prompt counts when no decision file counts yet.
  const approved = !valid && flagUsed && isPerson(approver);
  // A complete decision that says "hold" is a decision, not a missing step. A new approval at the
  // release prompt is a newer decision by the product lead and replaces it.
  const held = valid || approved ? null : decisions.find((d) => d.decision === 'hold' && !decisionProblem({ ...d, decision: 'release' }));
  const prompt = `npm run release -- ${variant} --approved-by <name>`;
  const what = valid ? `a release decision for ${variant} exists: ${valid.file} (decided by ${valid.decidedBy}, ${valid.date})`
    : approved ? `the product lead approved the release of ${variant} at the release prompt: ${approver}`
    : held ? `the product lead decided to hold ${variant}`
    : `the product lead approves the release: ${prompt}. The permission prompt on that command is the approval.`;
  add(Boolean(valid || approved), what, 'product lead',
    valid || approved ? [] : held ? [
      `${held.file}: the product lead decided to hold (${held.decidedBy}, ${held.date}). Reason: ${held.reason}`,
      'A hold is a decision, not a missing step. The release waits until the product lead approves again.',
    ] : [
      ...(flagUsed ? [`--approved-by "${approver}" names no person. An agent never approves a release.`] : []),
      ...decisions.map((d) => `${d.file} does not count: ${decisionProblem(d)}`),
    ]);

  if (held) conditions[conditions.length - 1].held = true;
  return {
    variant, ok: conditions.every((c) => c.ok), conditions, held: held ? held.file : null,
    shipped: typeof config.shipped === 'string' ? config.shipped : null,
    approvedBy: approved ? approver : null, gateLines,
  };
}

// The next decision number: the highest three-digit prefix in discovery/decisions/ plus one.
export function nextDecisionNumber(root) {
  const dir = path.join(root, 'discovery', 'decisions');
  const nums = fs.existsSync(dir) ? fs.readdirSync(dir).map((n) => n.match(/^(\d{3})/)).filter(Boolean).map((m) => Number(m[1])) : [];
  return String((nums.length ? Math.max(...nums) : 0) + 1).padStart(3, '0');
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Writes the release record for an approval at the release prompt. Returns its path from the root.
export function writeReleaseRecord(root, result, reason) {
  const nnn = nextDecisionNumber(root);
  const rel = `discovery/decisions/${nnn}-release-${result.variant}.md`;
  const oneLine = (reason || '').replace(/\s+/g, ' ').trim() || 'Approved at the release prompt.';
  const text = [
    `# Decision ${nnn}: release ${result.variant}`,
    '',
    '> Recorded by npm run release after the product lead approved at the release prompt.',
    '',
    `Variant: ${result.variant}`,
    'Decision: release',
    `Decided by: ${result.approvedBy}`,
    'Role: product lead',
    `Date: ${today()}`,
    `Reason: ${oneLine}`,
    '',
    '## What it rests on',
    ...result.gateLines.map((l) => `- ${l}`),
    '',
  ].join('\n');
  fs.mkdirSync(path.join(root, 'discovery', 'decisions'), { recursive: true });
  fs.writeFileSync(path.join(root, rel), text, { flag: 'wx' });
  return rel;
}

// Sets "shipped" in site/config.json and keeps the rest of the file as it is.
export function setShipped(root, variant) {
  const file = path.join(root, 'site', 'config.json');
  const { text, config } = readConfig(file);
  const value = JSON.stringify(variant);
  const re = /("shipped"\s*:\s*)(null|"(?:[^"\\]|\\.)*")/;
  const next = re.test(text) ? text.replace(re, `$1${value}`) : JSON.stringify({ ...config, shipped: variant }) + '\n';
  fs.writeFileSync(file, next);
}

export function formatRelease(result, { dryRun = false, released = false, record = null } = {}) {
  const lines = [`release: ${result.variant}${dryRun ? ' (dry run, nothing changes)' : ''}`];
  for (const c of result.conditions) {
    const label = c.ok ? 'ok     ' : c.held ? 'HOLD   ' : 'MISSING';
    lines.push(`${label}  ${c.what}  owner: ${c.owner}`);
    for (const d of c.details) lines.push(`           ${d}`);
  }
  if (!result.ok) {
    const missing = result.conditions.filter((c) => !c.ok);
    const owners = [...new Set(missing.map((c) => c.owner))];
    if (result.held && missing.length === 1) lines.push(`release: held by the product lead's decision in ${result.held}. site/config.json is unchanged.`);
    else lines.push(`release: refused. Waiting on: ${owners.join(', ')}. site/config.json is unchanged.`);
  } else if (dryRun) {
    lines.push(`release: every condition holds. Without --dry-run, "shipped" in site/config.json becomes "${result.variant}".`);
    if (result.approvedBy) lines.push('release: without --dry-run, the approval is also recorded in discovery/decisions/.');
  } else if (released) {
    if (record) lines.push(`release: the approval by ${result.approvedBy} is recorded in ${record}.`);
    lines.push(`release: "shipped" in site/config.json is now "${result.variant}"${result.shipped && result.shipped !== result.variant ? ` (was "${result.shipped}")` : ''}.`);
    lines.push(`release: nothing is deployed anywhere. On your local site, /inquiry.html serves the hardened ${result.variant}.`);
    lines.push('release: to take it back, set "shipped" to null in site/config.json. Claude Code asks the product lead first.');
    lines.push(`release: retro next. In Claude Code: /loopwise-factory ${result.variant} retro, or copy .claude/skills/loopwise-factory/retro-template.md to discovery/factory/${result.variant}-retro.md.`);
  } else {
    lines.push(`release: "shipped" is already "${result.variant}". Nothing changed.`);
  }
  return lines;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  // Flags with a value: --name=value, or --name value. A value given as the next word is not
  // taken as the variant.
  const values = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    const m = args[i].match(/^--(approved-by|reason|root)(?:=(.*))?$/s);
    if (m) {
      if (m[2] !== undefined) values[m[1]] = m[2];
      else if (i + 1 < args.length && !args[i + 1].startsWith('--')) values[m[1]] = args[++i];
      else values[m[1]] = '';
    } else if (!args[i].startsWith('--')) positional.push(args[i]);
  }
  const dryRun = args.includes('--dry-run');
  const root = path.resolve(values.root || path.join(HERE, '..'));
  const variant = positional[0];
  if (!variant || !/^[a-z0-9-]+$/.test(variant)) {
    console.error('release: name the variant, for example: npm run release -- call-slot --approved-by <name>   (add --dry-run to only report)');
    process.exit(1);
  }
  const result = checkRelease(root, variant, { approvedBy: values['approved-by'] });
  let released = false;
  let record = null;
  if (result.ok && !dryRun && result.shipped !== variant) {
    // The record comes first: if it cannot be written, nothing ships.
    if (result.approvedBy) record = writeReleaseRecord(root, result, values.reason);
    setShipped(root, variant);
    released = true;
  }
  for (const l of formatRelease(result, { dryRun, released, record })) console.log(l);
  process.exit(result.ok ? 0 : 1);
}
