// The release step, run with `npm run release -- <variant>`. A simulated deployment: nothing is
// deployed anywhere. The release is the `shipped` key in site/config.json, which the local server
// reads. The step sets it to <variant> only when every condition holds:
//   1. the variant is listed under `variants` in site/config.json
//   2. the variant has a hardened build in site/hardened/<variant>/
//   3. the legal gate (hard) passes for the variant
//   4. the design gate (soft) passes or is waived for the variant
//   5. a release decision exists in discovery/decisions/: a file whose name contains `release`,
//      with the lines Variant, Decision: release, Decided by (a person), Role: product lead,
//      Date (YYYY-MM-DD) and a reason
// Otherwise it refuses and prints each missing condition with its owner role. The agent never
// writes the release decision: a person does.
//
//   node scripts/release.js <variant>             release, or refuse
//   node scripts/release.js <variant> --dry-run   only report, change nothing
//   node scripts/release.js <variant> --root=<dir>   another repo root (tests use temp folders)
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

// Why a release decision does not count, or null if it does.
export function decisionProblem(d) {
  if (d.decision !== 'release') return `it does not say "Decision: release" (it says "${d.decision || 'nothing'}")`;
  if (!d.decidedBy || /^<.*>$/.test(d.decidedBy) || NOT_A_PERSON.test(d.decidedBy)) return 'Decided by names no person; an agent never decides a release';
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
export function checkRelease(root, variant) {
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
  const findingLines = (g) => g.findings.filter((f) => f.variant === variant).map((f) => `${f.file}${f.line ? `:${f.line}` : ''}  ${f.rule}  "${f.match}"`);
  if (gates?.validation) {
    const g = gates.validation;
    const status = g.variants[variant] || 'not scanned';
    add(status === 'pass', `the ${g.id} gate passes for ${variant} (${g.kind}, now: ${status}): the product lead decided launch`, g.owner,
      [...findingLines(g), ...(status === 'fail' ? ['A hard gate takes no waiver: the product lead writes a launch decision, or the variant does not go into build to earn.'] : [])]);
  }
  if (gates?.legal) {
    const g = gates.legal;
    const status = g.variants[variant] || 'not scanned';
    const ignored = g.waivers.filter((w) => w.variant === variant && !w.applied).map((w) => `waiver ${w.file} ignored: ${w.ignored}`);
    add(status === 'pass', `the ${g.id} gate passes for ${variant} (${g.kind}, now: ${status})`, g.owner,
      [...findingLines(g), ...ignored, ...(status === 'fail' ? ['A hard gate takes no waiver: the fix is in the page.'] : [])]);
  }
  if (gates?.design) {
    const g = gates.design;
    const status = g.variants[variant] || 'not scanned';
    const w = g.waivers.find((x) => x.variant === variant && x.applied);
    add(status === 'pass' || status === 'waived', `the ${g.id} gate passes or is waived for ${variant} (${g.kind}, now: ${status}${w ? `, waived by ${w.file}` : ''})`, g.owner,
      status === 'fail' ? [...findingLines(g), `Fix it, or the ${g.owner} writes a waiver in discovery/decisions/ (template: .claude/skills/loopwise-factory/waiver-template.md).`] : []);
  }

  const decisions = readReleaseDecisions(root).filter((d) => d.variant === variant);
  const valid = decisions.find((d) => !decisionProblem(d));
  // A complete decision that says "hold" is a decision, not a missing step.
  const held = valid ? null : decisions.find((d) => d.decision === 'hold' && !decisionProblem({ ...d, decision: 'release' }));
  add(Boolean(valid), valid ? `a release decision for ${variant} exists: ${valid.file} (decided by ${valid.decidedBy}, ${valid.date})` : `a release decision for ${variant} exists in discovery/decisions/`, 'product lead',
    valid ? [] : held ? [
      `${held.file}: the product lead decided to hold (${held.decidedBy}, ${held.date}). Reason: ${held.reason}`,
      'A hold is a decision, not a missing step. The release waits until the product lead writes a new decision.',
    ] : [
      ...decisions.map((d) => `${d.file} does not count: ${decisionProblem(d)}`),
      `Copy .claude/skills/loopwise-factory/release-decision-template.md to discovery/decisions/<next number>-release-${variant}.md and fill it in. A person writes it, not the agent.`,
    ]);

  return { variant, ok: conditions.every((c) => c.ok), conditions, held: held ? held.file : null, shipped: typeof config.shipped === 'string' ? config.shipped : null };
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

export function formatRelease(result, { dryRun = false, released = false } = {}) {
  const lines = [`release: ${result.variant}${dryRun ? ' (dry run, nothing changes)' : ''}`];
  for (const c of result.conditions) {
    lines.push(`${c.ok ? 'ok     ' : 'MISSING'}  ${c.what}  owner: ${c.owner}`);
    for (const d of c.details) lines.push(`           ${d}`);
  }
  if (!result.ok) {
    const missing = result.conditions.filter((c) => !c.ok);
    const owners = [...new Set(missing.map((c) => c.owner))];
    if (result.held && missing.length === 1) lines.push(`release: held by the product lead's decision in ${result.held}. site/config.json is unchanged.`);
    else lines.push(`release: refused. Waiting on: ${owners.join(', ')}. site/config.json is unchanged.`);
  } else if (dryRun) {
    lines.push(`release: every condition holds. Without --dry-run, "shipped" in site/config.json becomes "${result.variant}".`);
  } else if (released) {
    lines.push(`release: "shipped" in site/config.json is now "${result.variant}"${result.shipped && result.shipped !== result.variant ? ` (was "${result.shipped}")` : ''}.`);
    lines.push(`release: nothing is deployed anywhere. With npm start, http://localhost:3000/inquiry.html serves the hardened ${result.variant}.`);
    lines.push('release: to take it back, set "shipped" to null in site/config.json.');
    lines.push(`release: retro next. In Claude Code: /loopwise-factory ${result.variant} retro, or copy .claude/skills/loopwise-factory/retro-template.md to discovery/factory/${result.variant}-retro.md.`);
  } else {
    lines.push(`release: "shipped" is already "${result.variant}". Nothing changed.`);
  }
  return lines;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const rootArg = args.find((a) => a.startsWith('--root='));
  const root = path.resolve(rootArg ? rootArg.slice('--root='.length) : path.join(HERE, '..'));
  const variant = args.find((a) => !a.startsWith('--'));
  if (!variant || !/^[a-z0-9-]+$/.test(variant)) {
    console.error('release: name the variant, for example: npm run release -- call-slot   (add --dry-run to only report)');
    process.exit(1);
  }
  const result = checkRelease(root, variant);
  let released = false;
  if (result.ok && !dryRun && result.shipped !== variant) {
    setShipped(root, variant);
    released = true;
  }
  for (const l of formatRelease(result, { dryRun, released })) console.log(l);
  process.exit(result.ok ? 0 : 1);
}
