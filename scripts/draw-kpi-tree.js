// Draws discovery/kpi-tree.md as a page: discovery/kpi-tree.html. Goal on the left, branches in
// the middle, drivers on the right, the branch formulas underneath. No dependencies.
// Usage: node scripts/draw-kpi-tree.js [in.md] [out.html]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseList } from '../lib/discovery-view.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const COL_W = [220, 250, 330];
const GAP_X = 56;
const PAD = 24;
const ROW_GAP = 14;
const LINE_H = 17;
const CHAR_W = 7.4; // rough width of one character at 13px, for wrapping

function section(md, test) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let on = false;
  for (const line of lines) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) { on = test(h[1].trim().toLowerCase()); continue; }
    if (on) out.push(line);
  }
  return out;
}

export function readTree(md) {
  const items = parseList(section(md, (h) => h === 'tree').filter((l) => /^\s*[-*]\s+/.test(l) || /^\s+\S/.test(l)));
  const formulas = section(md, (h) => h.startsWith('how branch')).map((l) => l.trim()).filter((l) => l.includes('='));
  return { items, formulas };
}

// One list item -> what the box shows.
function describe(text, level) {
  const measured = (text.match(/measured:\s*(.*)$/i) || [])[1];
  let label = text.split(/\s·\s/)[0].replace(/\s*\((?:product|sources|data)\/[^)]*\)/g, '').trim();
  const parked = /not this quarter/i.test(label);
  label = label.replace(/,?\s*not this quarter/i, '').trim();
  let kind = ['business goal', 'branch', 'driver'][Math.min(level, 2)];
  const head = label.match(/^(Business goal|Branch [A-Z]):\s*(.*)$/i);
  if (head) { kind = head[1].toLowerCase(); label = head[2]; }
  let title = label;
  const colon = label.indexOf(': ');
  // A driver reads "<short name>: <plain sentence>": the sentence is what the box says.
  if (level >= 2 && colon > 0) { kind += ' · ' + label.slice(0, colon); title = label.slice(colon + 2); }
  const event = measured ? measured.replace(/`/g, '').replace(/\s+in data\/\S+$/, '').trim() : '';
  return { kind, title, event, parked };
}

function wrap(s, width) {
  if (!s) return [];
  const max = Math.max(8, Math.floor((width - 24) / CHAR_W));
  const lines = [];
  let cur = '';
  for (const w of s.split(/\s+/)) {
    if (cur && (cur + ' ' + w).length > max) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) lines.push(cur);
  return lines;
}

function layout(items) {
  const nodes = [];
  let y = PAD;
  const place = (item, level) => {
    const d = describe(item.text, level);
    const w = COL_W[Math.min(level, 2)];
    const titleLines = wrap(d.title, w);
    const eventLines = wrap(d.event && 'measured: ' + d.event, w);
    const h = 12 + 14 + titleLines.length * LINE_H + eventLines.length * 15 + 12;
    const x = PAD + COL_W.slice(0, Math.min(level, 2)).reduce((a, b) => a + b + GAP_X, 0);
    const node = { ...d, level, x, w, h, titleLines, eventLines, children: [] };
    nodes.push(node);
    if (!item.children.length) { node.y = y; y += h + ROW_GAP; return node; }
    node.children = item.children.map((c) => place(c, level + 1));
    const first = node.children[0];
    const last = node.children[node.children.length - 1];
    node.y = (first.y + first.h / 2 + last.y + last.h / 2) / 2 - h / 2;
    if (node.y < PAD) node.y = PAD;
    if (node.y + h + ROW_GAP > y) y = node.y + h + ROW_GAP;
    return node;
  };
  items.forEach((i) => place(i, 0));
  return { nodes, bottom: y };
}

export function drawTree(md) {
  const { items, formulas } = readTree(md);
  if (!items.length) throw new Error('no "## Tree" list found');
  const { nodes, bottom } = layout(items);
  const width = PAD * 2 + COL_W.reduce((a, b) => a + b, 0) + GAP_X * 2;
  const formulaY = bottom + 18;
  const height = Math.ceil(formulaY + formulas.length * 22 + (formulas.length ? 14 : 0) + PAD);

  const links = [];
  const boxes = [];
  for (const n of nodes) {
    for (const c of n.children) {
      const x1 = n.x + n.w, y1 = n.y + n.h / 2, x2 = c.x, y2 = c.y + c.h / 2, xm = x1 + GAP_X / 2;
      links.push(`<path class="link${c.parked ? ' parked' : ''}" d="M${x1} ${y1} H${xm} V${y2} H${x2}"/>`);
    }
    let ty = n.y + 12 + 11;
    const text = [`<text class="kind" x="${n.x + 12}" y="${ty}">${esc(n.kind.toUpperCase())}${n.parked ? ' · NOT THIS QUARTER' : ''}</text>`];
    ty += 6;
    for (const l of n.titleLines) { ty += LINE_H; text.push(`<text class="title" x="${n.x + 12}" y="${ty - 4}">${esc(l)}</text>`); }
    for (const l of n.eventLines) { ty += 15; text.push(`<text class="event" x="${n.x + 12}" y="${ty - 3}">${esc(l)}</text>`); }
    boxes.push(`<g class="node level-${Math.min(n.level, 2)}${n.parked ? ' parked' : ''}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6"/>${text.join('')}</g>`);
  }
  const formulaText = formulas.map((f, i) => `<text class="formula" x="${PAD}" y="${formulaY + 14 + i * 22}">${esc(f)}</text>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="KPI tree">
<title>KPI tree</title>
<style>
svg{--bg:#f7f8fa;--box:#ffffff;--line:#9aa5b4;--fg:#1d2733;--muted:#5d6b7c;--goal:#1f4e79;--branch:#2f6f8f;--event:#3d6b4f}
@media (prefers-color-scheme:dark){svg{--bg:#131820;--box:#1c2430;--line:#4f5d6e;--fg:#e6ebf1;--muted:#9aa7b6;--goal:#7fb2e0;--branch:#79c0d8;--event:#8fc9a3}}
.bg{fill:var(--bg)}
text{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;fill:var(--fg)}
.node rect{fill:var(--box);stroke:var(--line);stroke-width:1}
.level-0 rect{stroke:var(--goal);stroke-width:2}
.level-1 rect{stroke:var(--branch);stroke-width:1.5}
.parked rect{stroke-dasharray:5 4;stroke:var(--line)}
.parked text{fill:var(--muted)}
.kind{font-size:10px;letter-spacing:.08em;fill:var(--muted)}
.title{font-size:14px;font-weight:600}
.level-0 .title{fill:var(--goal)}
.event{font-size:11px;font-family:ui-monospace,Menlo,Consolas,monospace;fill:var(--event)}
.link{fill:none;stroke:var(--line);stroke-width:1.5}
.link.parked{stroke-dasharray:5 4}
.formula{font-size:13px;font-family:ui-monospace,Menlo,Consolas,monospace}
</style>
<rect class="bg" width="100%" height="100%"/>
${links.join('\n')}
${boxes.join('\n')}
${formulaText}
</svg>
`;
}

// The drawing inside a standalone page that opens from the file system.
export function drawPage(md) {
  const goal = (md.match(/^#\s+(.*)$/m) || [, 'KPI tree'])[1];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(goal)}</title>
<style>
:root{--page:#f7f8fa;--ink:#1d2733;--muted:#5d6b7c}
@media (prefers-color-scheme:dark){:root{--page:#131820;--ink:#e6ebf1;--muted:#9aa7b6;color-scheme:dark}}
body{margin:0;background:var(--page);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1000px;margin:0 auto;padding:24px 16px}
h1{font-size:1.5rem;margin:0 0 .25rem}
p{margin:0 0 1rem;color:var(--muted);font-size:.9rem}
.drawing{overflow-x:auto}
.drawing svg{display:block;max-width:none}
</style>
</head>
<body>
<main>
<h1>${esc(goal)}</h1>
<p>Drawn from <code>discovery/kpi-tree.md</code> by <code>npm run tree</code>. Edit the Markdown, then draw again.</p>
<div class="drawing">
${drawTree(md)}</div>
</main>
</body>
</html>
`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const input = path.resolve(process.argv[2] || path.join(ROOT, 'discovery', 'kpi-tree.md'));
  const output = path.resolve(process.argv[3] || input.replace(/\.md$/, '.html'));
  fs.writeFileSync(output, drawPage(fs.readFileSync(input, 'utf8')));
  console.log(`Wrote ${path.relative(ROOT, output)}`);
}
