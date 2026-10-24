// /discovery/tree: discovery/opportunity-comparison.md drawn as an opportunity tree. The business
// goal on top, the drivers of the active branch in funnel order, the candidates below, each linked
// to the drivers it acts on. Read-only: the Markdown file is the only input. No dependencies.
import fs from 'node:fs';
import path from 'node:path';

const LEVELS = ['well supported', 'partly supported', 'unsupported'];
const LV = { 'well supported': 'well', 'partly supported': 'partly', unsupported: 'un' };

const section = (md, name) => {
  const m = md.match(new RegExp(`^## ${name}[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, 'm'));
  return m ? m[1] : '';
};
const line = (text, prefix) => ((text.match(new RegExp(`^${prefix}:\\s*(.*)$`, 'm')) || [])[1] || '').trim();
const field = (block, name) => ((block.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.*)$`, 'm')) || [])[1] || '').trim();
const level = (s) => LEVELS.find((l) => s.toLowerCase().startsWith(l)) || '';
const rest = (s) => s.replace(/^(well supported|partly supported|unsupported):?\s*/i, '');

// "C2 (assumed), C3" -> [{ id: 'C2', assumed: true }, { id: 'C3', assumed: false }]
const links = (s) => [...s.matchAll(/(C\d+)(\s*\(assumed\))?/g)].map((m) => ({ id: m[1], assumed: !!m[2] }));

export function parseComparison(md) {
  md = md.replace(/\r/g, '');
  const decide = section(md, 'What you decide');
  const first = section(md, 'Your first try');
  const tree = section(md, 'Tree');
  const decision = section(md, 'Decision \\(human\\)');
  const favoured = line(decide, 'Appears favoured');
  const drivers = [...tree.matchAll(/^- ([^:\n]+):\s*(.*?)(?:\s*·\s*Candidates:\s*(.*))?$/gm)].map((m) => {
    const loss = m[2].trim();
    const count = loss.match(/^(\d+) of (\d+)/);
    return { name: m[1].trim(), loss, lost: count ? Number(count[1]) : null, of: count ? Number(count[2]) : null, candidates: links(m[3] || '') };
  });
  const candidates = section(md, 'Candidates').split(/^### /m).slice(1).map((b) => {
    const [, id, title] = b.match(/^(C\d+):\s*(.*)$/m) || [];
    const quote = field(b, 'Strongest quote').match(/^(".*")\s*\(([^)]*)\)\s*$/);
    const evidence = field(b, 'Evidence');
    const measurable = field(b, "Readable from today's data in 8 weeks");
    return {
      id, title: (title || '').trim(),
      from: field(b, 'From'),
      evidence: { level: level(evidence), text: rest(evidence) },
      leverage: rest(field(b, 'Leverage')),
      need: field(b, 'Need or solution'),
      measurable: { level: level(measurable), text: rest(measurable) },
      wins: field(b, 'Wins on'),
      loses: field(b, 'Loses on'),
      quote: quote ? { text: quote[1], where: quote[2] } : null,
      drivers: drivers.filter((d) => d.candidates.some((c) => c.id === id)).map((d) => ({ name: d.name, assumed: d.candidates.find((c) => c.id === id).assumed })),
    };
  }).filter((c) => c.id);
  const open = (s) => (!s || s.includes('____') ? '' : s);
  return {
    date: (md.match(/Date:\s*([\d-]+)/) || [])[1] || '',
    material: (md.match(/^> Material:\s*(.*)$/m) || [])[1] || '',
    question: line(decide, 'Question'),
    favoured: { id: (favoured.match(/^C\d+/) || [])[0] || '', text: favoured },
    notReadable: line(decide, "Not readable from today's data"),
    noCandidate: line(decide, 'No candidate'),
    firstTry: { text: first.split('\n').map((l) => l.trim()).find((l) => l && !/^(Matches|Where the draft differs):/.test(l)) || '', id: (line(first, 'Matches').match(/^C\d+/) || [])[0] || '' },
    outcome: line(tree, 'Outcome').replace(/\s*\([^)]*:\d+[^)]*\)$/, ''),
    branch: line(tree, 'Branch').replace(/\s*\([^)]*:\d+[^)]*\)$/, ''),
    drivers, candidates,
    chosen: open(line(decision, 'Chosen opportunity')),
    flip: open(line(decision, 'What would flip it')),
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const code = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');

const CSS = `
:root{--bg:#faf8f4;--fg:#22262b;--muted:#5b636c;--accent:#2f5d62;--accent-fg:#fff;--line:#c9c3b8;--card:#fff;
--well:#2f7d4f;--partly:#c48a1a;--un:#b5452f;--chip:#efebe4;--gap:#b5452f}
@media (prefers-color-scheme:dark){:root{--bg:#1b1e21;--fg:#e8e6e1;--muted:#a3a8ad;--accent:#7fb3b8;--accent-fg:#10201f;
--line:#4a5056;--card:#23272b;--well:#6cc08e;--partly:#e2b54f;--un:#ef8a74;--chip:#2c3135;--gap:#ef8a74}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.45 system-ui,-apple-system,sans-serif}
header,main{max-width:80rem;margin:0 auto;padding:0 16px}
header{padding-top:1.5rem}
h1{margin:.2rem 0 .3rem;font-size:1.6rem}
h2{font-size:1.05rem;margin:1.6rem 0 .6rem}
a{color:var(--accent)}
code{font-size:.85em;background:var(--chip);padding:0 .25em;border-radius:3px}
.lead{color:var(--muted);margin:0 0 1rem;max-width:52rem}
.decide{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:1rem 1.1rem;display:grid;gap:.5rem}
.decide .q{font-size:1.25rem;font-weight:650}
.decide .row{display:flex;gap:.5rem;align-items:baseline;font-size:.92rem}
.decide .row b{min-width:11rem;color:var(--muted);font-weight:600}
.decide .status{font-weight:650}
.decide .status.open{color:var(--gap)}
.tree{position:relative;margin:1.5rem 0 0;padding-bottom:1rem}
.tree svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.tree path{fill:none;stroke:var(--line);stroke-width:2}
.tree path.link{stroke:var(--muted);stroke-width:2}
.tree path.assumed{stroke-dasharray:6 5}
.tree path.dim{opacity:.12}
.tree path.hot{stroke:var(--accent);stroke-width:3}
.level{display:flex;justify-content:center;gap:1rem;position:relative}
.node{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.55rem .8rem;text-align:center}
.goal{background:var(--accent);color:var(--accent-fg);border-color:var(--accent);font-weight:650;max-width:30rem}
.branch{font-weight:600;max-width:30rem;margin-top:2.2rem}
.kind{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;opacity:.75;font-weight:600}
.drivers{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:.6rem;margin-top:2.6rem}
.driver{text-align:left;font-size:.85rem;display:flex;flex-direction:column;gap:.3rem}
.driver .name{font-weight:650}
.driver .step{color:var(--muted);font-size:.72rem;font-weight:600}
.driver .loss{color:var(--muted);font-size:.8rem;line-height:1.3}
.bar{height:.4rem;border-radius:3px;background:var(--chip);overflow:hidden}
.bar i{display:block;height:100%;background:var(--gap)}
.driver.gap{border:1.5px dashed var(--muted)}
.driver .nocand{color:var(--muted);font-size:.75rem;font-style:italic}
.driver.dim{opacity:.35}
.cands{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:.9rem;margin-top:4.5rem}
.card{background:var(--card);border:1px solid var(--line);border-top:6px solid var(--lvl);border-radius:10px;padding:.75rem .85rem .85rem;display:flex;flex-direction:column;gap:.45rem;cursor:pointer;text-align:left;font:inherit;color:inherit}
.card.well{--lvl:var(--well)}.card.partly{--lvl:var(--partly)}.card.un{--lvl:var(--un)}
.card.hot{outline:3px solid var(--accent);outline-offset:-1px}
.card.dim{opacity:.45}
.card.chosen{outline:3px solid var(--well)}
.card .top{display:flex;gap:.35rem;flex-wrap:wrap;align-items:center;font-size:.75rem}
.card .id{font-weight:700;font-size:.85rem;margin-right:.2rem}
.tag{border-radius:4px;padding:.05rem .45rem;font-weight:600}
.tag.fav{background:var(--accent);color:var(--accent-fg)}
.tag.you{border:1.5px solid var(--fg)}
.tag.pick{background:var(--well);color:#fff}
.card .title{font-weight:650;line-height:1.3}
.facts{display:grid;grid-template-columns:auto 1fr;gap:.25rem .6rem;font-size:.8rem;margin:0}
.facts dt{color:var(--muted)}
.facts dd{margin:0;display:flex;gap:.35rem;align-items:baseline;flex-wrap:wrap}
.pill{border-radius:999px;padding:0 .5rem;font-size:.75rem;font-weight:650;color:#fff;white-space:nowrap}
.pill.well{background:var(--well)}.pill.partly{background:var(--partly)}.pill.un{background:var(--un)}
.wl{font-size:.82rem;display:grid;gap:.2rem}
.wl span b{font-weight:650}
.acts{display:flex;gap:.3rem;flex-wrap:wrap}
.chip{font-size:.72rem;background:var(--chip);border-radius:4px;padding:.05rem .4rem}
.chip.assumed{background:transparent;border:1px dashed var(--muted)}
blockquote{margin:0;font-size:.82rem;color:var(--muted);border-left:3px solid var(--line);padding-left:.55rem}
blockquote small{display:block;font-size:.72rem}
.legend{display:flex;flex-wrap:wrap;gap:.4rem 1.2rem;font-size:.8rem;color:var(--muted);margin:1.2rem 0}
.legend span{display:inline-flex;gap:.35rem;align-items:center}
.sw{width:1.6rem;height:0;border-top:2px solid var(--muted)}
.sw.d{border-top-style:dashed}
.box{width:.9rem;height:.9rem;border-radius:3px}
.box.gapbox{border:1.5px dashed var(--muted)}
.more{font-size:.9rem;padding-bottom:3rem}
.empty{color:var(--muted)}
@media (max-width:48rem){
  .tree svg{display:none}
  .drivers{grid-template-columns:1fr 1fr;margin-top:1rem}
  .branch{margin-top:.8rem}
  .cands{margin-top:1.5rem}
  .decide .row{flex-direction:column;gap:0}
}
`;

// Lines are drawn after layout, so they follow the boxes at any width. Click a card to see only its links.
const CLIENT = `
const tree = document.querySelector('.tree');
const svg = tree.querySelector('svg');
const cards = [...tree.querySelectorAll('.card')];
const drivers = [...tree.querySelectorAll('.driver')];
let hot = null;
function pt(el, side) {
  const t = tree.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - t.left + r.width / 2, y: side === 'top' ? r.top - t.top : r.bottom - t.top };
}
function curve(a, b, cls, key) {
  const m = (a.y + b.y) / 2;
  return '<path class="' + cls + '" data-key="' + key + '" d="M' + a.x + ' ' + a.y + ' C' + a.x + ' ' + m + ' ' + b.x + ' ' + m + ' ' + b.x + ' ' + b.y + '"/>';
}
function draw() {
  const goal = tree.querySelector('.goal'), branch = tree.querySelector('.branch');
  let out = curve(pt(goal, 'bottom'), pt(branch, 'top'), '', '');
  for (const d of drivers) out += curve(pt(branch, 'bottom'), pt(d, 'top'), '', '');
  for (const c of cards) for (const l of JSON.parse(c.dataset.links)) {
    const d = drivers.find((x) => x.dataset.name === l.name);
    if (!d) continue;
    const dim = hot && hot !== c.dataset.id;
    out += curve(pt(d, 'bottom'), pt(c, 'top'), 'link' + (l.assumed ? ' assumed' : '') + (dim ? ' dim' : '') + (hot === c.dataset.id ? ' hot' : ''), c.dataset.id);
  }
  svg.innerHTML = out;
}
function focus(id) {
  hot = hot === id ? null : id;
  const names = hot ? JSON.parse(cards.find((c) => c.dataset.id === hot).dataset.links).map((l) => l.name) : null;
  for (const c of cards) { c.classList.toggle('hot', c.dataset.id === hot); c.classList.toggle('dim', !!hot && c.dataset.id !== hot); c.setAttribute('aria-pressed', c.dataset.id === hot); }
  for (const d of drivers) d.classList.toggle('dim', !!names && !names.includes(d.dataset.name));
  draw();
}
for (const c of cards) c.addEventListener('click', () => focus(c.dataset.id));
addEventListener('resize', draw);
new ResizeObserver(draw).observe(tree);
draw();
`;

function driverNode(d, i) {
  const gap = !d.candidates.length && d.lost !== null;
  const share = d.lost !== null && d.of ? Math.round((d.lost / d.of) * 100) : null;
  return `<div class="node driver${gap ? ' gap' : ''}" data-name="${esc(d.name)}">
<span class="step">Step ${i + 1}</span><span class="name">${esc(d.name)}</span>
${share !== null ? `<div class="bar" title="${d.lost} of ${d.of} lost"><i style="width:${share}%"></i></div>` : ''}
<span class="loss">${code(d.loss)}</span>
${gap ? '<span class="nocand">No candidate acts here</span>' : ''}
</div>`;
}

function candidateCard(c, p) {
  const ev = LV[c.evidence.level] || 'un';
  const ms = LV[c.measurable.level] || 'un';
  const tags = [
    p.favoured.id === c.id ? '<span class="tag fav">comparison favours</span>' : '',
    p.firstTry.id === c.id ? '<span class="tag you">your first try</span>' : '',
    p.chosen && p.chosen.startsWith(c.id) ? '<span class="tag pick">chosen</span>' : '',
  ].join('');
  const linksJson = esc(JSON.stringify(c.drivers));
  return `<button type="button" class="card ${ev}${p.chosen && p.chosen.startsWith(c.id) ? ' chosen' : ''}" data-id="${c.id}" data-links="${linksJson}" aria-pressed="false">
<span class="top"><span class="id">${c.id}</span>${tags}</span>
<span class="title">${esc(c.title)}</span>
<dl class="facts">
<dt>Evidence</dt><dd><span class="pill ${ev}">${esc(c.evidence.level || 'not given')}</span><span>${code(c.evidence.text)}</span></dd>
<dt>Today's data</dt><dd><span class="pill ${ms}">${ms === 'well' ? 'readable' : ms === 'partly' ? 'partly readable' : 'not readable'}</span><span>${code(c.measurable.text)}</span></dd>
<dt>Acts on</dt><dd class="acts">${c.drivers.map((d) => `<span class="chip${d.assumed ? ' assumed' : ''}">${esc(d.name)}${d.assumed ? ' (assumed)' : ''}</span>`).join('') || '<span class="chip">no driver given</span>'}</dd>
</dl>
<span class="wl"><span><b>Wins on:</b> ${code(c.wins)}</span><span><b>Loses on:</b> ${code(c.loses)}</span></span>
${c.quote ? `<blockquote>${esc(c.quote.text)}<small>${esc(c.quote.where)}</small></blockquote>` : ''}
</button>`;
}

export function treePage(root) {
  const file = path.join(root, 'discovery', 'opportunity-comparison.md');
  const shell = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Opportunity tree</title><style>${CSS}</style></head><body>
<header><a href="/discovery">Discovery</a> · <a href="/discovery/map">Opportunity map</a>
<h1>Opportunity tree</h1></header><main>${body}</main></body></html>`;
  if (!fs.existsSync(file)) {
    return shell('<p class="empty">No comparison yet. Run <code>/compare-opportunities</code> in Claude Code; it writes <code>discovery/opportunity-comparison.md</code>, and this page draws it.</p>');
  }
  const p = parseComparison(fs.readFileSync(file, 'utf8'));
  if (!p.candidates.length || !p.drivers.length) {
    return shell('<p class="empty">The comparison has no "Tree" or "Candidates" section this page can read. Open <a href="/discovery/opportunity-comparison.md">the file</a>, or run <code>/compare-opportunities</code> again.</p>');
  }
  return shell(`<p class="lead">How each candidate need links to the business goal. Drawn from <a href="/discovery/opportunity-comparison.md"><code>discovery/opportunity-comparison.md</code></a>, an assessment by an agent, not a decision${p.date ? `, data up to ${esc(p.date)}` : ''}. ${p.material ? `Material: ${code(p.material)}` : ''}</p>
<section class="decide" aria-label="What you decide">
<div class="q">${esc(p.question || 'Which need do we work on next?')}</div>
<div class="row"><b>Your decision</b><span class="status${p.chosen ? '' : ' open'}">${p.chosen ? esc(p.chosen) : 'Open. You fill "Chosen opportunity" in the file.'}</span></div>
${p.chosen && p.flip ? `<div class="row"><b>What would flip it</b><span>${esc(p.flip)}</span></div>` : ''}
${p.favoured.text ? `<div class="row"><b>The comparison favours</b><span>${code(p.favoured.text)}</span></div>` : ''}
${p.firstTry.text ? `<div class="row"><b>Your first try</b><span>${esc(p.firstTry.text)}</span></div>` : ''}
${p.notReadable ? `<div class="row"><b>Not readable from today's data</b><span>${code(p.notReadable)}</span></div>` : ''}
${p.noCandidate ? `<div class="row"><b>No candidate</b><span>${code(p.noCandidate)}</span></div>` : ''}
</section>
<div class="legend" aria-label="Legend">
<span><i class="sw"></i>an opportunity file names this step</span>
<span><i class="sw d"></i>only the comparison adds it, as an assumption</span>
<span><i class="box" style="background:var(--well)"></i>well supported</span>
<span><i class="box" style="background:var(--partly)"></i>partly supported</span>
<span><i class="box" style="background:var(--un)"></i>unsupported</span>
<span><i class="box gapbox"></i>loss with no candidate</span>
<span>Bar: share lost at that step. Click a card to see only its links.</span>
</div>
<div class="tree">
<svg aria-hidden="true"></svg>
<div class="level"><div class="node goal"><span class="kind">Business goal</span>${esc(p.outcome)}</div></div>
<div class="level"><div class="node branch"><span class="kind">KPI branch</span>${esc(p.branch)}</div></div>
<div class="drivers" style="--n:${p.drivers.length}">${p.drivers.map(driverNode).join('')}</div>
<div class="cands">${p.candidates.map((c) => candidateCard(c, p)).join('')}</div>
</div>
<p class="more">Every quote, the counter-evidence, the shortlist and the challenger are in <a href="/discovery/opportunity-comparison.md">the comparison file</a>. Read the challenger before you decide.</p>
<script>${CLIENT}</script>`);
}
