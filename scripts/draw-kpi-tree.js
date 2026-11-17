// Draws discovery/kpi-tree.md as a page: discovery/kpi-tree.html. Same demo map as the opportunity
// tree at /discovery/tree: the business goal on top, the branches below, and under each active branch
// its drivers as one chain joined by the operator of the branch formula (× or +), ending in its
// result, so the picture is the formula. The overview shows names only; a key or a click zooms onto
// one step, and only then its definition and the events that measure it appear. No dependencies.
// Usage: node scripts/draw-kpi-tree.js [in.md] [out.html]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseList } from '../lib/discovery-view.js';
import { PAGE_CSS } from '../lib/opportunity-tree.js';
import { linkText } from '../lib/source-view.js';

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
  md = linkText(md);
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

// A count ("number of ...") is how many enter the path; every other driver is a rate of the step
// before. The two look different. The definition and the events show only when zoomed in.
function driverNode(d, i, branch) {
  const count = /^number of\b/i.test(d.title);
  return `<div class="node driver${count ? ' count' : ''}" tabindex="0" data-kind="step" data-view="S${i + 1}" data-branch="${branch}">
<span class="step">Step ${i + 1} · ${count ? 'count' : 'rate'}</span><span class="name">${esc(d.name || d.title)}</span>
<div class="more">${d.name ? `<span class="what">${esc(d.title)}</span>` : ''}${d.event ? `<h3>Measured</h3>${code(d.event)}` : ''}</div>
</div>`;
}

// "bookings = a × b × c" -> { result: 'bookings', op: '×' }. Without a formula: no operator, no result.
export function readFormula(f) {
  const m = (f || '').match(/^\s*(.+?)\s*=\s*(.+)$/);
  if (!m) return { result: '', op: '' };
  return { result: m[1], op: m[2].includes('+') && !m[2].includes('×') ? '+' : '×' };
}

function chain(b, formula) {
  const { result, op } = readFormula(formula);
  const parts = b.drivers.map((d, i) => driverNode(d, i, b.key));
  const joined = op ? parts.join(`<span class="op" aria-label="${op === '×' ? 'times' : 'plus'}">${op}</span>`) : parts.join('');
  const end = result ? `<span class="op" aria-label="equals">=</span><div class="node result"><span class="kind">Result</span>${esc(result)}</div>` : '';
  return `<div class="chain" data-branch="${b.key}"${formula ? ` aria-label="${esc(formula)}"` : ''}>${joined}${end}</div>`;
}

export function drawTree(md) {
  const { items, formulas } = readTree(md);
  if (!items.length) throw new Error('no "## Tree" list found');
  const goal = describe(items[0].text);
  const branches = items[0].children.map((b, i) => {
    const d = describe(b.text);
    return { ...d, key: d.letter || String(i + 1), drivers: b.children.map((c) => describe(c.text)) };
  });
  const active = branches.filter((b) => b.drivers.length);
  const branchNode = (b) => {
    const f = formulas[active.indexOf(b)];
    return `<div class="node branch${b.parked ? ' parked' : ''}" tabindex="0" data-kind="branch" data-view="${b.key}" data-key="${b.key}"><span class="kind">KPI branch${b.letter ? ' ' + b.letter : ''}${b.parked ? ' · not this quarter' : ''}</span>${esc(b.title)}${f ? `<div class="more"><h3>How it works</h3>${esc(f)}</div>` : ''}</div>`;
  };
  return `<svg aria-hidden="true"></svg>
<div class="goalrow">
<div class="node goal"><span class="kind">Business goal</span>${esc(goal.title)}</div>
<div class="branches">${branches.map(branchNode).join('')}</div>
</div>
${active.map((b, i) => chain(b, formulas[i])).join('\n')}`;
}

const EXTRA_CSS = `
.branches{display:flex;gap:40px;justify-content:center}
.branch{cursor:zoom-in;max-width:480px}
.branch.parked{border-style:dashed;color:var(--muted);font-weight:500}
svg path.parked{stroke-dasharray:8 6}
.chain{display:flex;align-items:stretch;gap:10px;margin-top:70px}
.chain .driver{flex:1 1 0;min-width:0}
.driver.count{border-width:3px;border-color:var(--muted)}
.driver .name{font-size:22px}
.driver .what{display:block;font-size:14px;line-height:1.35}
.chain .op{align-self:center;font-size:30px;font-weight:600;color:var(--muted)}
.chain .result{align-self:center;font-size:20px;font-weight:650;text-align:center}
body.f-chain .driver .more{display:block}
`;

// Camera and keys, the same as /discovery/tree: 0 overview, 1-9 a step, F the whole chain, T your
// first try, left and right to the next step, up to the branch, down to the first step, Esc back.
const CLIENT = `{
const stage = document.getElementById('stage'), world = document.getElementById('world'), svg = world.querySelector('svg');
const goal = world.querySelector('.goal');
const steps = [...world.querySelectorAll('.driver')], branches = [...world.querySelectorAll('.branch')];
const byView = (v) => world.querySelector('[data-view="' + v + '"]');
let cur = 'overview';
const flat = () => matchMedia('(max-width: 48rem)').matches;
function pos(el) { let x = 0, y = 0, e = el; while (e && e !== world) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return { x, y, w: el.offsetWidth, h: el.offsetHeight }; }
function curve(a, b, cls) { const m = (a.y + b.y) / 2; return '<path class="' + cls + '" d="M' + a.x + ' ' + a.y + ' C' + a.x + ' ' + m + ' ' + b.x + ' ' + m + ' ' + b.x + ' ' + b.y + '"/>'; }
const bottomOf = (el) => { const p = pos(el); return { x: p.x + p.w / 2, y: p.y + p.h }; };
const topOf = (el) => { const p = pos(el); return { x: p.x + p.w / 2, y: p.y }; };
function draw() {
  let out = '';
  for (const b of branches) out += curve(bottomOf(goal), topOf(b), b.classList.contains('parked') ? 'parked' : '');
  for (const c of world.querySelectorAll('.chain')) { const b = world.querySelector('.branch[data-key="' + c.dataset.branch + '"]'); if (b) out += curve(bottomOf(b), topOf(c), ''); }
  svg.setAttribute('height', world.offsetHeight);
  svg.innerHTML = out;
}
// The overview sits at the top of the screen; a zoomed box is centred.
function fit(r, max, top) {
  const vw = stage.clientWidth, vh = stage.clientHeight, pad = 0.05;
  const s = Math.min(vw * (1 - pad) / r.w, vh * (1 - pad) / r.h, max || 9);
  const y = top ? -r.y * s : (vh - r.h * s) / 2 - r.y * s;
  world.style.transform = 'translate(' + ((vw - r.w * s) / 2 - r.x * s) + 'px,' + y + 'px) scale(' + s + ')';
}
function show(v) {
  const el = v === 'overview' || v === 'chain' ? null : byView(v);
  if (v !== 'overview' && v !== 'chain' && !el) v = 'overview';
  cur = v;
  document.body.classList.toggle('f-chain', v === 'chain');
  document.body.classList.toggle('focus', !!el && el.dataset.kind === 'step');
  for (const x of [...steps, ...branches]) { x.classList.toggle('on', x === el); x.classList.toggle('dim', !!el && el.dataset.kind === 'step' && x !== el && x.dataset.kind === 'step'); }
  for (const b of document.querySelectorAll('nav button')) b.classList.toggle('on', b.dataset.v === v);
  draw();
  if (!flat()) {
    const legend = world.querySelector('.legend'), lp = pos(legend);
    if (v === 'overview') fit({ x: 0, y: 0, w: world.offsetWidth, h: lp.y + lp.h + 20 }, 9, true);
    else if (v === 'chain') fit(pos(world.querySelector('.chain')));
    else fit(pos(el), el.dataset.kind === 'step' ? 3.2 : 2);
  }
  if (location.hash.slice(1) !== v) history.replaceState(null, '', v === 'overview' ? location.pathname : '#' + v);
}
function move(k) {
  const el = byView(cur), kind = el ? el.dataset.kind : cur;
  const side = k === 'ArrowRight' ? 1 : k === 'ArrowLeft' ? -1 : 0;
  if (kind === 'step') {
    if (side) return show(steps[Math.max(0, Math.min(steps.length - 1, steps.indexOf(el) + side))].dataset.view);
    if (k === 'ArrowUp') return show(el.dataset.branch);
    return;
  }
  if (kind === 'branch') {
    if (side) return show(branches[(branches.indexOf(el) + side + branches.length) % branches.length].dataset.view);
    if (k === 'ArrowDown') { const s = steps.find((x) => x.dataset.branch === el.dataset.key); if (s) show(s.dataset.view); return; }
    if (k === 'ArrowUp') return show('overview');
  }
  if (cur === 'overview' || cur === 'chain' || kind === 'first') {
    if (k === 'ArrowUp') return show('overview');
    if (k === 'ArrowDown' || k === 'ArrowRight') return show(steps[0].dataset.view);
    if (k === 'ArrowLeft') return show(steps[steps.length - 1].dataset.view);
  }
}
function back() { const el = byView(cur); show(el && el.dataset.kind === 'step' ? 'chain' : 'overview'); }
addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || flat()) return;
  const k = e.key;
  if (k === '0') show('overview');
  else if (k === 'Escape') back();
  else if (k === 'f' || k === 'F') show('chain');
  else if ((k === 't' || k === 'T') && byView('first')) show('first');
  else if (/^[1-9]$/.test(k) && steps[k - 1]) show(steps[k - 1].dataset.view);
  else if (k.startsWith('Arrow')) { e.preventDefault(); move(k); }
});
world.addEventListener('click', (e) => {
  const t = e.target.closest('[data-view]');
  if (t) { if (t.dataset.view !== cur) show(t.dataset.view); }
  else if (!flat()) show('overview');
});
document.querySelector('nav').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(b.dataset.v); });
addEventListener('hashchange', () => show(location.hash.slice(1) || 'overview'));
function layout() { document.body.classList.toggle('flat', flat()); show(cur); }
new ResizeObserver(() => draw()).observe(world);
// Focus or find-in-page can scroll the stage behind the camera; keep it at the origin.
stage.addEventListener('scroll', () => { if (!flat()) { stage.scrollTop = 0; stage.scrollLeft = 0; } });
let lastSize = '';
new ResizeObserver(() => { const k = stage.clientWidth + 'x' + stage.clientHeight; if (k !== lastSize) { lastSize = k; layout(); } }).observe(stage);
cur = location.hash.slice(1) || 'overview';
layout();
}`;

// The drawing inside a standalone page that opens from the file system.
export function drawPage(md) {
  const goal = (md.match(/^#\s+(.*)$/m) || [, 'KPI tree'])[1];
  const { firstTry, items } = readTree(md);
  const tree = drawTree(md);
  const stepCount = items[0].children.reduce((n, b) => n + b.children.length, 0);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(goal)}</title>
<style>${PAGE_CSS}${EXTRA_CSS}</style>
</head>
<body>
<div id="stage"><div id="world">
<div class="w-head"><h1>${esc(goal)}</h1>
<p>Drawn from <code>discovery/kpi-tree.md</code> by <code>npm run tree</code>. Edit the Markdown, then draw again.</p></div>
${tree}
<div class="legend" aria-label="Legend"><span>Thick border: the first step counts who enters the path. Every later step is a rate of the step before it.</span><span><i class="sw d"></i>a branch the strategy parks this quarter</span></div>
${firstTry.text ? `<section class="decide" tabindex="0" data-kind="first" data-view="first" aria-label="Your first try">
<div class="row"><b>Your first try</b><span>${esc(firstTry.text)}</span></div>
${firstTry.differs.length ? `<div class="row"><b>Where the tree differs</b><span>${firstTry.differs.map(code).join('<br>')}</span></div>` : ''}
</section>` : ''}
</div></div>
<nav aria-label="Jump to">
<a href="/discovery">Discovery</a><span class="sep"></span>
<button type="button" data-v="overview">Overview<kbd>0</kbd></button><button type="button" data-v="chain">Steps<kbd>F</kbd></button><span class="sep"></span>
${Array.from({ length: Math.min(stepCount, 9) }, (_, i) => `<button type="button" data-v="S${i + 1}">${i + 1}</button>`).join('')}
${firstTry.text ? '<span class="sep"></span><button type="button" data-v="first">First try<kbd>T</kbd></button>' : ''}<span class="sep"></span>
<span class="help">← → next step · ↑ ↓ level · Esc back</span>
</nav>
<script>${CLIENT}</script>
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
