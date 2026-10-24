// Deterministic checks on the discovery artefacts, run with `npm run check`.
// 1. Every citation `file:line` (or "file, line N") points at an existing, non-empty line.
// 2. A quote directly before a citation appears on the cited line(s).
// 3. Event names come from the list in CLAUDE.md (column names of data/*.csv are allowed).
// 4. No em or en dashes.
// Exit code 1 if anything fails. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const EVENTS = ['page_view', 'inquiry_started', 'inquiry_step_completed', 'inquiry_submitted',
  'success_line_filled', 'scoping_call_booked', 'booking_confirmed', 'followup_answered'];
const EVENT_LIKE = /^(page|inquiry|success_line|scoping_call|booking|followup)_[a-z_]+$/;
const SCAN = ['discovery', 'product'];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const norm = (s) => s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
  .replace(/\*\*|`/g, '').replace(/\s+/g, ' ').trim();

function resolve(root, fromFile, ref, byName) {
  for (const c of [path.join(root, ref), path.join(root, 'sources', ref), path.join(path.dirname(fromFile), ref)]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  // A bare file name ("inquiry-06.md") resolves if exactly one file in sources/ or discovery/ has it.
  const hits = byName.get(path.basename(ref)) || [];
  return !ref.includes('/') && hits.length === 1 ? hits[0] : null;
}

function allFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) allFiles(p, out); else out.push(p);
  }
  return out;
}

// Finds citations in one line of text: `path.ext:12`, `path.ext:12-14`, `path.ext`, line 12, lines 12 to 14.
const CITE = /`?([\w][\w./-]*\.(?:md|csv|jsonl|json|html|js))`?(?::(\d+)(?:-(\d+))?|`?,? lines? (\d+)(?: (?:to|-) (\d+))?)/g;

export function check(root) {
  const errors = [];
  let citations = 0, quotes = 0;
  const cache = new Map();
  const linesOf = (f) => { if (!cache.has(f)) cache.set(f, fs.readFileSync(f, 'utf8').split('\n')); return cache.get(f); };
  // Column names of data/*.csv look like events (`success_line_text`) but are not.
  const columns = new Set(allFiles(path.join(root, 'data')).filter((f) => f.endsWith('.csv'))
    .flatMap((f) => fs.readFileSync(f, 'utf8').split('\n')[0].split(',').map((c) => c.trim())));
  const byName = new Map();
  for (const f of ['sources', 'discovery', 'product'].flatMap((d) => allFiles(path.join(root, d)))) {
    byName.set(path.basename(f), [...(byName.get(path.basename(f)) || []), f]);
  }

  for (const file of SCAN.flatMap((d) => walk(path.join(root, d)))) {
    const rel = path.relative(root, file);
    linesOf(file).forEach((text, i) => {
      const where = `${rel}:${i + 1}`;
      if (/[\u2013\u2014]/.test(text)) errors.push(`${where}: em or en dash`);
      for (const m of text.matchAll(/`([a-z_]+)`/g)) {
        if (EVENT_LIKE.test(m[1]) && !EVENTS.includes(m[1]) && !columns.has(m[1])) errors.push(`${where}: unknown event \`${m[1]}\``);
      }
      // Every citation with a line number: file exists, line exists and is not empty.
      const spans = [];
      let last = null;
      const refs = [...text.matchAll(CITE)].map((m) => ({ m, kind: 'full' }))
        .concat([...text.matchAll(/(?<![\w.])`?:(\d+)(?:-(\d+))?`?/g)].map((m) => ({ m, kind: 'short' })))
        .sort((x, y) => x.m.index - y.m.index);
      for (const { m, kind } of refs) {
        let target, from, to;
        if (kind === 'full') {
          from = Number(m[2] || m[4]);
          target = resolve(root, file, m[1], byName);
          last = target;
          if (!from) continue;
          to = Number(m[3] || m[5] || from);
          citations++;
          if (!target) { errors.push(`${where}: cites missing file ${m[1]}`); continue; }
        } else {
          if (!last) continue;
          target = last; from = Number(m[1]); to = Number(m[2] || from);
          citations++;
        }
        const lines = linesOf(target);
        const cited = lines.slice(from - 1, to).join(' ');
        if (to > lines.length || cited.trim() === '') { errors.push(`${where}: ${path.relative(root, target)}:${from} is empty or past the end`); continue; }
        spans.push({ index: m.index, end: m.index + m[0].length, label: `${path.relative(root, target)}:${from}${to !== from ? '-' + to : ''}`, text: cited });
      }
      // A quote directly followed by a parenthesis of citations must appear on one of the cited lines.
      for (const q of text.matchAll(/"([^"]{8,})"\s*,?\s*\(([^)]*)\)/g)) {
        const open = q.index + q[0].indexOf('(', q[1].length + 2);
        const close = q.index + q[0].length;
        const inside = spans.filter((s) => s.index > open && s.end <= close);
        if (!inside.length) continue;
        quotes++;
        const hay = norm(inside.map((s) => s.text).join(' '));
        const missing = q[1].split(/\.\.\.|\u2026|\[[^\]]*\]/).map(norm).filter((s) => s.length >= 4 && !hay.includes(s));
        if (missing.length) errors.push(`${where}: quote not on ${inside.map((s) => s.label).join(', ')}: "${missing[0].slice(0, 60)}"`);
      }
    });
  }
  return { errors, citations, quotes };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { errors, citations, quotes } = check(root);
  for (const e of errors) console.log(e);
  console.log(`check: ${citations} citations, ${quotes} quotes checked, ${errors.length} problems`);
  process.exit(errors.length ? 1 : 0);
}
