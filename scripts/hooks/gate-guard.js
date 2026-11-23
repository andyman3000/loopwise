// The gate guard: a Claude Code hook that puts each check where the mistake would happen.
// .claude/settings.json runs it before (PreToolUse) and after (PostToolUse) the agent writes.
// It reads the hook JSON from stdin and prints one decision as JSON, or nothing.
//
// What it checks, and where:
//
//   Before a file write (Edit, Write, MultiEdit, NotebookEdit)
//   1. site/hardened/<variant>/...    a new price in the text: refused (legal gate, hard)
//   2. site/config.json               "shipped" changes: refused. "shipped" back to null (a roll-back):
//                                     asks the product lead. Only "variants" changes: allowed
//   3. site/styles.css                asks: the designer owns the design system
//   4. discovery/decisions/ file with waiver, launch or release in its name: asks the owner
//
//   Before a shell command (Bash)
//   5. writes to site/config.json                  refused: use npm run release
//   6. writes to site/hardened/ with a price in it  refused (legal gate, hard)
//   7. writes to a decision file as in 4           asks the owner
//   8. runs the release without --dry-run          asks the product lead (the go-live approval)
//
//   After a file write (Edit, Write, MultiEdit)
//   9. site/hardened/<variant>/...    design gate findings for that variant: sent back to the
//                                     agent to fix (design gate, soft)
//
// Build to learn (site/variants/) gets none of this. Any other case prints nothing, so the normal
// permission rules apply. On an internal error the guard prints nothing and exits 0: it never
// breaks a session. Root: $CLAUDE_PROJECT_DIR, else the repo two folders up. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.CLAUDE_PROJECT_DIR || path.join(HERE, '..', '..');

const FILE_TOOLS = ['Edit', 'Write', 'MultiEdit', 'NotebookEdit'];
const TEXT_EXT = new Set(['.html', '.htm', '.css', '.js', '.mjs', '.json', '.svg', '.txt', '.md', '.xml', '.webmanifest']);

// ---------------------------------------------------------------- the messages

function legalReason(match) {
  return `legal gate (hard, owner: legal): "${match}" is a price. Loopwise publishes no prices on its website (gates/policies/no-prices.md). No exception, not even from legal. The write did not happen. Remove the price; do not try another way.`;
}
const SHIPPED_REASON = 'site/config.json: only npm run release sets "shipped". It runs the gates again and asks the product lead. Nobody sets it by hand, the agent included.';
const ROLLBACK_REASON = 'site/config.json: "shipped" goes back to null, so the variant leaves the website. A roll-back is the product lead\'s decision. Only the product lead says yes.';
const STYLES_REASON = 'site/styles.css is the design system. The designer owns it. Say yes only if the designer approves this change.';
const DECISION_REASON = 'This is a decision file. Only the person who owns the decision says yes here: the designer for a design waiver, the product lead for a launch or a release.';
const RELEASE_REASON = 'Go-live approval, like approving a pull request for production. Only the product lead says yes. Everything else the system has checked.';
const DESIGN_TAIL = "design gate (soft, owner: designer). Fix it in the page with a token or a component from site/styles.css. The designer is not asked: the design system holds the designer's judgement. An exception (a waiver) or a change to the system is the designer's call, outside this run.";

// ---------------------------------------------------------------- paths

// The path from the repo root, with forward slashes. Null if the file lies outside the repo.
function repoPath(filePath, cwd) {
  if (!filePath) return null;
  const abs = path.resolve(cwd || ROOT, filePath);
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  if (!rel || rel.startsWith('../') || rel === '..' || path.isAbsolute(rel)) return null;
  return rel;
}

function hardenedVariant(rel) {
  const m = rel.match(/^site\/hardened\/([^/]+)\/.+/);
  return m ? m[1] : null;
}

function isDecisionFile(rel) {
  const m = rel.match(/^discovery\/decisions\/([^/]+)$/);
  return Boolean(m && /waiver|launch|release/i.test(m[1]));
}

// ---------------------------------------------------------------- file text before and after

function currentText(rel) {
  const file = path.join(ROOT, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function replaceText(text, oldString, newString, all) {
  if (!oldString) return text;
  return all ? text.split(oldString).join(newString) : text.replace(oldString, () => newString);
}

// The whole file text as it would be after the tool ran.
function textAfter(tool, input, before) {
  if (tool === 'Write') return input.content ?? '';
  if (tool === 'Edit') return replaceText(before, input.old_string, input.new_string ?? '', input.replace_all);
  if (tool === 'MultiEdit') {
    let text = before;
    for (const e of input.edits || []) text = replaceText(text, e.old_string, e.new_string ?? '', e.replace_all);
    return text;
  }
  if (tool === 'NotebookEdit') return input.new_source ?? '';
  return before;
}

// ---------------------------------------------------------------- decisions printed

// A refusal also goes to the pair as a message, so they see it when it happens.
function pre(decision, reason) {
  return { ...(decision === 'deny' ? { systemMessage: reason } : {}), hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: reason } };
}

// ---------------------------------------------------------------- rules 1 to 4: before a file write

// Rule 1: the first price in the new text that the current text does not hold already.
function newPrice(findPrices, before, after) {
  const old = new Set(findPrices(before).map((h) => h.match));
  const found = findPrices(after).find((h) => !old.has(h.match));
  return found ? found.match : null;
}

// Rule 2: compares "shipped" and "variants" before and after. Invalid JSON: no decision.
function configDecision(before, after) {
  let a, b;
  try { a = JSON.parse(before || '{}'); b = JSON.parse(after); } catch { return null; }
  if (JSON.stringify(a.shipped) !== JSON.stringify(b.shipped)) {
    return b.shipped === null && a.shipped ? pre('ask', ROLLBACK_REASON) : pre('deny', SHIPPED_REASON);
  }
  const { variants: va, shipped: sa, ...restA } = a;
  const { variants: vb, shipped: sb, ...restB } = b;
  const variantsChanged = JSON.stringify(va) !== JSON.stringify(vb);
  const otherChanged = JSON.stringify(restA) !== JSON.stringify(restB);
  if (variantsChanged && !otherChanged) return pre('allow', 'site/config.json: only the list of variants changes.');
  return null;
}

function beforeFileWrite(tool, input, cwd, gates) {
  const rel = repoPath(input.file_path || input.notebook_path, cwd);
  if (!rel) return null;
  if (hardenedVariant(rel)) {
    if (!TEXT_EXT.has(path.extname(rel).toLowerCase())) return null;
    const before = tool === 'NotebookEdit' ? '' : currentText(rel);
    const price = newPrice(gates.findPrices, before, textAfter(tool, input, before));
    return price ? pre('deny', legalReason(price)) : null;
  }
  if (rel === 'site/config.json') {
    const before = currentText(rel);
    return configDecision(before, textAfter(tool, input, before));
  }
  if (rel === 'site/styles.css') return pre('ask', STYLES_REASON);
  if (isDecisionFile(rel)) return pre('ask', DECISION_REASON);
  return null;
}

// ---------------------------------------------------------------- rules 5 to 8: before a command

// A command writes if it redirects output or uses a tool that changes files.
// "2>/dev/null" and "2>&1" are not writes, so they are taken out first. An arrow "=>" is no
// redirect. A script run with node -e or python counts only if its text writes a file.
const WRITES = [
  /(^|[^=-])>/,
  /(^|[\s;&|(])(tee|cp|mv|truncate)(\s|$)/,
  /(^|[\s;&|(])sed\s[^;&|]*-i/,
  /(^|[\s;&|(])perl\s[^;&|]*-i/,
];
const SCRIPT_RUN = /(^|[\s;&|(])(node\s[^;&|]*(-e|--eval)|python3?)(\s|$)/;
const SCRIPT_WRITES = /write(File|FileSync|Text)?\(|appendFile|open\([^)]*["'][wa+]|rename(Sync)?\(|copyFile/;

function withoutHarmlessRedirects(command) {
  return command.replace(/\d?>&\d/g, ' ').replace(/\d?>>?\s*\/dev\/null/g, ' ');
}

function writes(command) {
  const cmd = withoutHarmlessRedirects(command);
  return WRITES.some((re) => re.test(cmd)) || (SCRIPT_RUN.test(cmd) && SCRIPT_WRITES.test(cmd));
}

// The files a command writes to: after > or >>, the arguments of tee, the last argument of cp and mv.
function writeTargets(command) {
  const targets = [];
  for (const part of withoutHarmlessRedirects(command).split(/&&|\|\||[;|]/)) {
    for (const m of part.matchAll(/>>?\s*([^\s;&|<>]+)/g)) targets.push(m[1]);
    const words = part.replace(/>>?\s*[^\s;&|<>]+/g, ' ').trim().split(/\s+/).filter(Boolean);
    const args = words.slice(1).filter((w) => !w.startsWith('-'));
    if (words[0] === 'tee') targets.push(...args);
    if ((words[0] === 'cp' || words[0] === 'mv') && args.length) targets.push(args[args.length - 1]);
  }
  return targets.map((t) => t.replace(/^["']|["']$/g, ''));
}

function runsRelease(command) {
  return /\bnpm\s+run\s+release\b|\bnode\s+(\.\/)?scripts\/release\.js\b/.test(command) && !/--dry-run\b/.test(command);
}

function beforeCommand(command, cwd, gates) {
  if (!command) return null;
  if (command.includes('site/config.json') && writes(command)) return pre('deny', `${SHIPPED_REASON} Use npm run release.`);
  if (command.includes('site/hardened/') && writes(command)) {
    const price = gates.findPrices(command)[0];
    if (price) return pre('deny', legalReason(price.match));
  }
  if (writeTargets(command).some((t) => { const rel = repoPath(t, cwd); return rel && isDecisionFile(rel); })) {
    return pre('ask', DECISION_REASON);
  }
  if (runsRelease(command)) return pre('ask', RELEASE_REASON);
  return null;
}

// ---------------------------------------------------------------- rule 9: after a file write

function afterFileWrite(input, cwd, gates) {
  const rel = repoPath(input.file_path, cwd);
  const variant = rel && hardenedVariant(rel);
  if (!variant) return null;
  const design = gates.checkGates(ROOT).gates.design;
  // A finding the designer waived for this variant is not sent back.
  const findings = (design ? design.findings : []).filter((f) => f.variant === variant && !f.waived);
  if (!findings.length) return null;
  const lines = findings.map((f) => `${f.file}${f.line ? `:${f.line}` : ''}  ${f.rule}  "${f.match}"`);
  lines.push(DESIGN_TAIL);
  const text = lines.join('\n');
  return {
    decision: 'block',
    reason: text,
    hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: text },
    systemMessage: text,
  };
}

// ---------------------------------------------------------------- the hook

export async function decide(hook) {
  const gates = await import(pathToFileURL(path.join(HERE, '..', 'check-gates.js')).href);
  const tool = hook.tool_name;
  const input = hook.tool_input || {};
  if (hook.hook_event_name === 'PreToolUse') {
    if (FILE_TOOLS.includes(tool)) return beforeFileWrite(tool, input, hook.cwd, gates);
    if (tool === 'Bash') return beforeCommand(input.command, hook.cwd, gates);
  }
  if (hook.hook_event_name === 'PostToolUse' && ['Edit', 'Write', 'MultiEdit'].includes(tool)) {
    return afterFileWrite(input, hook.cwd, gates);
  }
  return null;
}

async function main() {
  try {
    const raw = fs.readFileSync(0, 'utf8');
    const result = await decide(JSON.parse(raw));
    if (result) process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch {
    // Never break a session: print nothing.
  }
  process.exit(0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
