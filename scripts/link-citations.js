// Turns every bare citation in a Markdown file under discovery/ into a relative Markdown link,
// run with `npm run links [file ...]` (no file: every .md file in discovery/).
//   `sources/x.md:16`, sources/x.md:16, `x.md`, line 16  ->  [sources/x.md:16](../../sources/x.md#L16)
//   `sources/x.md:12-14`, x.md, lines 12 to 14            ->  [sources/x.md:12-14](../../sources/x.md#L12)
//   `:17` after a citation on the same line                ->  [sources/x.md:17](../../sources/x.md#L17)
//   `site/formats.html` (a file without a line)           ->  [site/formats.html](../../site/formats.html)
// The link text is the path from the repo root; the target is relative to the file's own folder.
// It reads citations with the patterns and file lookup of scripts/check-discovery.js, so both
// agree on what a citation is and which file it names. It leaves alone: existing links, text
// inside double quotes, code blocks, a path inside a longer code span (`node scripts/x.js`),
// and any path that does not resolve to one file. Running it twice changes nothing.
// No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CITE, LINK, LINK_TEXT, PATH, SHORT, nameIndex, resolve } from './check-discovery.js';

// A path with no line. Checked only where no citation with a line matched.
const BARE = new RegExp(`\`?(${PATH})\`?`, 'g');
// A character before a path that shows it is part of something longer (.claude/x.md, <v>-x.md).
const GLUED = /[\w./<>@-]/;

const spans = (re, s) => [...s.matchAll(re)].map((m) => ({ start: m.index, end: m.index + m[0].length, m }));
const inside = (a, list) => list.some((b) => a.start >= b.start && a.end <= b.end);
const overlaps = (a, b) => a.start < b.end && b.start < a.end;

function linkFor(root, file, target, from, to) {
  const rel = path.relative(root, target).split(path.sep).join('/');
  const href = encodeURI(path.relative(path.dirname(file), target).split(path.sep).join('/'));
  if (!from) return `[${rel}](${href})`;
  return `[${rel}:${from}${to && to !== from ? '-' + to : ''}](${href}#L${from})`;
}

// Converts one line. Returns the new line, how many citations it converted, and what it left.
function convertLine(root, file, line, byName) {
  const links = spans(LINK, line);
  const quotes = spans(/"[^"\n]*"/g, line);
  const code = spans(/`[^`\n]+`/g, line);
  const cands = [];
  for (const l of links) {
    const t = l.m[1].match(LINK_TEXT);
    cands.push({ ...l, kind: 'link', t });
  }
  for (const c of spans(CITE, line)) cands.push({ ...c, kind: 'full' });
  for (const c of spans(SHORT, line)) cands.push({ ...c, kind: 'short' });
  for (const c of spans(BARE, line)) cands.push({ ...c, kind: 'bare' });
  cands.sort((a, b) => a.start - b.start || b.end - a.end);

  const edits = [];
  const left = [];
  let last = null;
  let taken = [];
  for (const c of cands) {
    if (c.kind !== 'link' && inside(c, links)) continue;
    if (c.kind === 'bare' && taken.some((t) => overlaps(t, c))) continue;
    if (c.kind === 'short' && taken.some((t) => overlaps(t, c))) continue;
    if (c.kind === 'link') {
      // An existing citation link sets the file a following `:17` refers to, as in the checker.
      if (c.t && c.t[2]) last = resolve(root, file, c.t[1], byName);
      continue;
    }
    // A citation in backticks: the match may stop before the closing backtick.
    if (line[c.start] === '`' && line[c.end] === '`' && line[c.end - 1] !== '`') c.end++;
    let target, from, to;
    if (c.kind === 'short') {
      if (!last) continue;
      target = last; from = Number(c.m[1]); to = Number(c.m[2] || from);
    } else {
      if (c.start > 0 && GLUED.test(line[c.start - 1])) continue;
      target = resolve(root, file, c.m[1], byName);
      if (c.kind === 'full') {
        last = target;
        from = Number(c.m[2] || c.m[4]);
        to = Number(c.m[3] || c.m[5] || from);
      }
    }
    taken.push(c);
    const what = line.slice(c.start, c.end).replace(/`/g, '');
    if (!target) { left.push(`${what}: no single file of that name`); continue; }
    if (inside(c, quotes)) { left.push(`${what}: inside a quote`); continue; }
    if (code.some((s) => overlaps(s, c) && !(s.start >= c.start && s.end <= c.end))) { left.push(`${what}: inside a longer code span`); continue; }
    edits.push({ start: c.start, end: c.end, text: linkFor(root, file, target, from, to) });
  }
  let out = line;
  for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return { line: out, converted: edits.length, left };
}

// Converts one file's text. Code blocks between ``` fences stay as they are.
export function linkCitations(root, file, text, byName = nameIndex(root)) {
  let fenced = false, converted = 0;
  const left = [];
  const lines = text.split('\n').map((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return line; }
    if (fenced) return line;
    const r = convertLine(root, file, line, byName);
    converted += r.converted;
    left.push(...r.left.map((l) => `${path.relative(root, file)}:${i + 1}: ${l}`));
    return r.line;
  });
  return { text: lines.join('\n'), converted, left };
}

function mdFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) mdFiles(p, out); else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const files = args.length ? args.map((a) => path.resolve(a)) : mdFiles(path.join(root, 'discovery'));
  const byName = nameIndex(root);
  let total = 0;
  for (const file of files) {
    if (!path.relative(path.join(root, 'discovery'), file).match(/^[^.]/) || !file.endsWith('.md')) {
      console.log(`skipped ${file}: not a Markdown file under discovery/`);
      continue;
    }
    const r = linkCitations(root, file, fs.readFileSync(file, 'utf8'), byName);
    if (r.converted) fs.writeFileSync(file, r.text);
    for (const l of r.left) console.log(`left: ${l}`);
    console.log(`${path.relative(root, file)}: ${r.converted} citations linked`);
    total += r.converted;
  }
  console.log(`links: ${total} citations linked in ${files.length} files`);
}
