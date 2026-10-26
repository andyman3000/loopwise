// Draws discovery/kpi-tree.md as a page: discovery/kpi-tree.html. Same look as the opportunity tree
// at /discovery/tree: the business goal on top, the branches below, the drivers of each branch in a
// row as steps, the branch formulas underneath. No dependencies.
// Usage: node scripts/draw-kpi-tree.js [in.md] [out.html]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseList } from '../lib/discovery-view.js';
import { CSS } from '../lib/opportunity-tree.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const code = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');

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
  const first = section(md, (h) => h === 'your first try');
  const split = first.findIndex((l) => /^where the tree differs/i.test(l.trim()));
  const firstTry = {
    text: (split < 0 ? first : first.slice(0, split)).map((l) => l.trim()).filter(Boolean).join(' '),
    differs: split < 0 ? [] : first.slice(split + 1).map((l) => l.replace(/^\s*[-*]\s+/, '').trim()).filter(Boolean),
  };
  return { items, formulas, firstTry };
}

// One list item -> what the box shows.
function describe(text) {
  const measured = (text.match(/measured:\s*(.*)$/i) || [])[1];
  let label = text.split(/\s·\s/)[0].replace(/\s*\((?:product|sources|data)\/[^)]*\)/g, '').trim();
  const parked = /not this quarter/i.test(label);
  label = label.replace(/,?\s*not this quarter/i, '').trim();
  const head = label.match(/^(Business goal|Branch ([A-Z])):\s*(.*)$/i);
  let name = '';
  let title = head ? head[3] : label;
  // A driver reads "<short name>: <plain sentence>": the sentence is what the box says.
  const colon = title.indexOf(': ');
  if (!head && colon > 0) { name = title.slice(0, colon); title = title.slice(colon + 2); }
  const event = measured ? measured.replace(/\s+in data\/\S+$/, '').trim() : '';
  return { letter: head && head[2] ? head[2].toUpperCase() : '', name, title, event, parked };
}

function driverNode(d, i, branch) {
  return `<div class="node driver" data-branch="${branch}">
<span class="step">Step ${i + 1}</span><span class="name">${esc(d.name || d.title)}</span>
${d.name ? `<span class="what">${esc(d.title)}</span>` : ''}
${d.event ? `<span class="measured"><b>Measured:</b> ${code(d.event)}</span>` : ''}
</div>`;
}

export function drawTree(md) {
  const { items, formulas } = readTree(md);
  if (!items.length) throw new Error('no "## Tree" list found');
  const goal = describe(items[0].text);
  const branches = items[0].children.map((b, i) => {
    const d = describe(b.text);
    return { ...d, key: d.letter || String(i + 1), drivers: b.children.map((c) => describe(c.text)) };
  });
  const branchNode = (b) => `<div class="node branch${b.parked ? ' parked' : ''}" data-key="${b.key}"><span class="kind">KPI branch${b.letter ? ' ' + b.letter : ''}${b.parked ? ' · not this quarter' : ''}</span>${esc(b.title)}</div>`;
  return `<div class="tree">
<svg aria-hidden="true"></svg>
<div class="level"><div class="node goal"><span class="kind">Business goal</span>${esc(goal.title)}</div></div>
<div class="level">${branches.map(branchNode).join('')}</div>
${branches.filter((b) => b.drivers.length).map((b) => `<div class="drivers" style="--n:${b.drivers.length}">${b.drivers.map((d, i) => driverNode(d, i, b.key)).join('')}</div>`).join('\n')}
</div>
${formulas.length ? `<section class="formula" aria-label="How the branches work">${formulas.map((f) => `<div><code>${esc(f)}</code></div>`).join('')}</section>` : ''}`;
}

const EXTRA_CSS = `
.driver{cursor:default}
.driver .what{line-height:1.3}
.driver .measured{color:var(--muted);font-size:.75rem;line-height:1.35}
.branch.parked{border-style:dashed;color:var(--muted);font-weight:500}
.tree path.parked{stroke-dasharray:6 5}
.formula{margin:2rem 0 1rem;display:grid;gap:.3rem}
.formula code{font-size:.9rem}
`;

// Lines are drawn after layout, so they follow the boxes at any width.
const CLIENT = `
const tree = document.querySelector('.tree');
const svg = tree.querySelector('svg');
function pt(el, side) {
  const t = tree.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - t.left + r.width / 2, y: side === 'top' ? r.top - t.top : r.bottom - t.top };
}
function curve(a, b, cls) {
  const m = (a.y + b.y) / 2;
  return '<path class="' + cls + '" d="M' + a.x + ' ' + a.y + ' C' + a.x + ' ' + m + ' ' + b.x + ' ' + m + ' ' + b.x + ' ' + b.y + '"/>';
}
function draw() {
  const goal = tree.querySelector('.goal');
  let out = '';
  for (const b of tree.querySelectorAll('.branch')) out += curve(pt(goal, 'bottom'), pt(b, 'top'), b.classList.contains('parked') ? 'parked' : '');
  for (const d of tree.querySelectorAll('.driver')) {
    const b = tree.querySelector('.branch[data-key="' + d.dataset.branch + '"]');
    if (b) out += curve(pt(b, 'bottom'), pt(d, 'top'), '');
  }
  svg.innerHTML = out;
}
addEventListener('resize', draw);
new ResizeObserver(draw).observe(tree);
draw();
`;

// The drawing inside a standalone page that opens from the file system.
export function drawPage(md) {
  const goal = (md.match(/^#\s+(.*)$/m) || [, 'KPI tree'])[1];
  const { firstTry } = readTree(md);
  const tree = drawTree(md);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(goal)}</title>
<style>${CSS}${EXTRA_CSS}</style>
</head>
<body>
<header><h1>${esc(goal)}</h1></header>
<main>
<p class="lead">Drawn from <code>discovery/kpi-tree.md</code> by <code>npm run tree</code>. Edit the Markdown, then draw again.</p>
${firstTry.text ? `<section class="decide" aria-label="Your first try">
<div class="row"><b>Your first try</b><span>${esc(firstTry.text)}</span></div>
${firstTry.differs.length ? `<div class="row"><b>Where the tree differs</b><span>${firstTry.differs.map(code).join('<br>')}</span></div>` : ''}
</section>` : ''}
<div class="legend" aria-label="Legend"><span>Each step is a count or a rate of the step before it.</span><span><i class="sw d"></i>a branch the strategy parks this quarter</span></div>
${tree}
<script>${CLIENT}</script>
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
