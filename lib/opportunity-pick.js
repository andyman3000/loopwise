// /discovery/pick: every opportunity from discovery/opportunities/ as a card, with filters, and a
// tick for "Goes into comparison". Saving rewrites only the two selection lines of each file.
// data.md holds observations, not opportunities, so it is left out. No dependencies.
import fs from 'node:fs';
import path from 'node:path';

export const SOURCES = ['interviews', 'emails', 'feedback', 'inbox'];
const LEVELS = ['well supported', 'partly supported', 'unsupported'];

const field = (block, name) => (block.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.*)$`, 'mi')) || [])[1] || '';

export function parseOpportunities(md) {
  const parts = md.replace(/\r/g, '').split(/^### /m).slice(1);
  return parts.filter((p) => /^O\d+:/.test(p)).map((p) => {
    const body = p.split(/^## /m)[0];
    const [, id, title] = body.match(/^(O\d+):\s*(.*)$/m);
    const voices = field(body, 'Voices');
    const kpi = field(body, 'KPI branch');
    const assessment = field(body, 'Assessment');
    const level = LEVELS.find((l) => assessment.toLowerCase().startsWith(l)) || 'unsupported';
    const quote = (body.match(/^\s+- ("[^"]+")\s*\(([^)]*)\)/m) || []);
    const who = voices.split(/Second-hand/i)[0];
    const speakers = [];
    if (/sponsor/i.test(who)) speakers.push('sponsor');
    if (/participant/i.test(who)) speakers.push('participant');
    return {
      id,
      title: title.trim(),
      voices: Number((voices.match(/(\d+)\s+distinct/) || [])[1] || 0),
      speakers,
      secondHand: /Second-hand:\s*yes/i.test(voices),
      branch: (kpi.match(/Branch ([A-Z])/) || [])[1] || '',
      sideLink: /side link to Branch A/i.test(kpi),
      driver: ((kpi.match(/driver ([a-z ]+?)(?=[.\[,]|\s+\[|$)/i) || [])[1] || '').trim(),
      level,
      assessment: assessment.replace(new RegExp(`^${level}\\.?\\s*`, 'i'), ''),
      quote: quote[1] ? { text: quote[1], where: quote[2].split(',')[0] } : null,
    };
  });
}

// Current selection from "Goes into comparison: O1, O3". "____" means nothing chosen yet.
export function parseSelection(md) {
  const line = (md.match(/^Goes into comparison:\s*(.*)$/m) || [])[1] || '';
  const by = (md.match(/^Decided by:\s*(.*?)\s*·/m) || [])[1] || '';
  return { ids: line.includes('____') ? [] : line.match(/O\d+/g) || [], decidedBy: by.includes('____') ? '' : by };
}

export function writeSelection(md, ids, decidedBy, date) {
  const chosen = ids.length ? ids.join(', ') : 'none';
  if (!/^Goes into comparison:.*$/m.test(md) || !/^Decided by:.*$/m.test(md)) throw new Error('no selection lines');
  return md
    .replace(/^Goes into comparison:.*$/m, `Goes into comparison: ${chosen}`)
    .replace(/^Decided by:.*$/m, `Decided by: ${decidedBy} · Date: ${date}`);
}

// "Branch A: inquiries that end in a booking (product/strategy.md:12)" -> { A: 'inquiries that end in a booking' }
export function branchNames(root) {
  const file = path.join(root, 'discovery', 'kpi-tree.md');
  const md = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  return Object.fromEntries([...md.matchAll(/Branch ([A-Z]):\s*([^(\n]+)/g)].map((m) => [m[1], m[2].trim()]));
}

const fileOf = (root, source) => path.join(root, 'discovery', 'opportunities', `${source}.md`);

export function readAll(root) {
  return SOURCES.filter((s) => fs.existsSync(fileOf(root, s))).map((source) => {
    const md = fs.readFileSync(fileOf(root, source), 'utf8');
    return { source, items: parseOpportunities(md), ...parseSelection(md) };
  });
}

// body: { decidedBy: "name", selections: { interviews: ["O1"], ... } }. Every source on disk must be
// present, so a save never leaves one file half-decided. Returns { ok, errors } and writes nothing on error.
export function saveSelection(root, body, date = new Date().toISOString().slice(0, 10)) {
  const decidedBy = typeof body.decidedBy === 'string' ? body.decidedBy.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
  if (!decidedBy || decidedBy.includes('·')) return { ok: false, errors: { decidedBy: 'Name who decides.' } };
  const sel = body.selections && typeof body.selections === 'object' ? body.selections : {};
  const files = readAll(root);
  const out = [];
  for (const f of files) {
    const ids = sel[f.source];
    if (!Array.isArray(ids)) return { ok: false, errors: { [f.source]: 'Missing selection.' } };
    const known = new Set(f.items.map((i) => i.id));
    if (!ids.every((id) => known.has(id))) return { ok: false, errors: { [f.source]: 'Unknown opportunity.' } };
    const order = f.items.map((i) => i.id).filter((id) => ids.includes(id));
    const file = fileOf(root, f.source);
    out.push([file, writeSelection(fs.readFileSync(file, 'utf8'), order, decidedBy, date)]);
  }
  for (const [file, md] of out) fs.writeFileSync(file, md);
  return { ok: true, saved: files.map((f) => f.source) };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICONS = {
  interviews: '<path d="M4 5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-4-3h-3"/>',
  emails: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  feedback: '<path d="m12 3 2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"/>',
  inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/>',
};
const icon = (s) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[s]}</svg>`;

const CSS = `
:root{--bg:#faf8f4;--fg:#22262b;--muted:#5b636c;--accent:#2f5d62;--accent-fg:#fff;--line:#ddd8cf;--card:#fff;
--well:#2f7d4f;--partly:#c48a1a;--un:#b5452f;--chip:#efebe4}
@media (prefers-color-scheme:dark){:root{--bg:#1b1e21;--fg:#e8e6e1;--muted:#a3a8ad;--accent:#7fb3b8;--accent-fg:#10201f;
--line:#33383d;--card:#23272b;--well:#6cc08e;--partly:#e2b54f;--un:#ef8a74;--chip:#2c3135}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.45 system-ui,-apple-system,sans-serif}
header,main{max-width:76rem;margin:0 auto;padding:0 16px}
header{padding-top:1.5rem}
h1{margin:.2rem 0 .3rem;font-size:1.6rem}
.lead{color:var(--muted);margin:0 0 1rem;max-width:48rem}
a{color:var(--accent)}
.icon{width:1.15em;height:1.15em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;vertical-align:-.2em}
.map{display:grid;grid-template-columns:auto repeat(3,1fr);gap:4px;margin:1rem 0 1.25rem;font-size:.85rem}
.map .h{color:var(--muted);padding:.2rem .4rem}
.map .src{display:flex;gap:.4rem;align-items:center;padding:.3rem .4rem;text-transform:capitalize}
.map .cell{border-radius:6px;background:var(--chip);display:flex;gap:4px;align-items:center;flex-wrap:wrap;padding:.3rem .4rem;min-height:2rem}
.map .dot{width:1.4rem;height:1.4rem;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:.7rem;font-weight:600;cursor:pointer;border:2px solid transparent}
.map .dot.on{border-color:var(--fg)}
.dot.well{background:var(--well)}.dot.partly{background:var(--partly)}.dot.un{background:var(--un)}
.filters{display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;align-items:center;margin-bottom:1rem}
.group{display:flex;gap:.35rem;flex-wrap:wrap;align-items:center}
.group>span{font-size:.8rem;color:var(--muted);margin-right:.2rem}
.chip{border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:999px;padding:.25rem .7rem;font:inherit;font-size:.85rem;cursor:pointer}
.chip[data-group="source"]{text-transform:capitalize}
.chip[aria-pressed="true"]{background:var(--accent);color:var(--accent-fg);border-color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:.9rem;padding-bottom:7rem}
.card{position:relative;background:var(--card);border:1px solid var(--line);border-left:6px solid var(--lvl);border-radius:10px;padding:.8rem .9rem .9rem;cursor:pointer;display:flex;flex-direction:column;gap:.45rem}
.card.well{--lvl:var(--well)}.card.partly{--lvl:var(--partly)}.card.un{--lvl:var(--un)}
.card.on{outline:3px solid var(--accent);outline-offset:-1px}
.card[hidden]{display:none}
.top{display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--muted);text-transform:capitalize}
.top .id{font-weight:600}
.tick{width:1.5rem;height:1.5rem;border-radius:6px;border:2px solid var(--line);display:grid;place-items:center}
.card.on .tick{background:var(--accent);border-color:var(--accent);color:var(--accent-fg)}
.card.on .tick::after{content:"\\2713";font-weight:700}
.title{font-weight:600;line-height:1.3}
.meter{display:flex;gap:3px;align-items:center;font-size:.8rem;color:var(--muted)}
.meter i{width:1.4rem;height:.45rem;border-radius:3px;background:var(--chip)}
.meter i.f{background:var(--lvl)}
.meter b{color:var(--lvl);margin-left:.35rem;font-weight:600}
.voices{display:flex;gap:3px;align-items:center;font-size:.8rem;color:var(--muted)}
.voices .v{width:.7rem;height:.7rem;border-radius:50%;background:var(--accent)}
.voices .gap{margin-left:.35rem}
.badges{display:flex;gap:.3rem;flex-wrap:wrap}
.badge{font-size:.75rem;border-radius:4px;padding:.1rem .45rem;background:var(--chip)}
.badge.parked{border:1px dashed var(--muted);background:transparent}
blockquote{margin:0;font-size:.88rem;color:var(--muted);border-left:3px solid var(--line);padding-left:.6rem}
blockquote small{display:block;font-size:.75rem}
.note{font-size:.85rem}
.bar{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--line);box-shadow:0 -4px 16px rgba(0,0,0,.08)}
.bar div{max-width:76rem;margin:0 auto;padding:.75rem 16px;display:flex;gap:.75rem;align-items:center;flex-wrap:wrap}
.bar input{font:inherit;padding:.4rem .6rem;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--fg);min-width:14rem}
.bar button{font:inherit;padding:.45rem 1.1rem;border:0;border-radius:6px;background:var(--accent);color:var(--accent-fg);cursor:pointer}
.bar .count{font-weight:600}
.bar .msg{color:var(--muted);font-size:.9rem}
.empty{color:var(--muted)}
@media (max-width:40rem){.map{grid-template-columns:auto repeat(3,1fr);font-size:.75rem}.map .src span{display:none}}
`;

const CLIENT = `
const data = JSON.parse(document.getElementById('data').textContent);
const chosen = new Set(data.flatMap((f) => f.ids.map((id) => f.source + ':' + id)));
const filters = { source: new Set(), level: new Set(), speaker: new Set(), branch: new Set() };
const cards = [...document.querySelectorAll('.card')];
const dots = [...document.querySelectorAll('.map .dot')];
const count = document.querySelector('.count');
const msg = document.querySelector('.msg');
function render() {
  for (const c of cards) {
    const d = c.dataset;
    const show = (!filters.source.size || filters.source.has(d.source))
      && (!filters.level.size || filters.level.has(d.level))
      && (!filters.speaker.size || d.speakers.split(' ').some((s) => filters.speaker.has(s)))
      && (!filters.branch.size || filters.branch.has(d.branch));
    c.hidden = !show;
    c.classList.toggle('on', chosen.has(d.key));
    c.setAttribute('aria-checked', chosen.has(d.key));
  }
  for (const d of dots) d.classList.toggle('on', chosen.has(d.dataset.key));
  count.textContent = chosen.size + ' of ' + cards.length + ' into comparison';
  document.querySelector('.empty').hidden = cards.some((c) => !c.hidden);
}
function toggle(key) { chosen.has(key) ? chosen.delete(key) : chosen.add(key); msg.textContent = 'Not saved yet.'; render(); }
for (const c of cards) {
  c.addEventListener('click', (e) => { if (!e.target.closest('a')) toggle(c.dataset.key); });
  c.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(c.dataset.key); } });
}
for (const d of dots) d.addEventListener('click', () => toggle(d.dataset.key));
for (const b of document.querySelectorAll('.chip')) b.addEventListener('click', () => {
  const set = filters[b.dataset.group];
  set.has(b.dataset.value) ? set.delete(b.dataset.value) : set.add(b.dataset.value);
  b.setAttribute('aria-pressed', set.has(b.dataset.value));
  render();
});
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const decidedBy = e.target.decidedBy.value.trim();
  if (!decidedBy) { msg.textContent = 'Name who decides first.'; return; }
  const selections = Object.fromEntries(data.map((f) => [f.source, f.items.map((i) => i.id).filter((id) => chosen.has(f.source + ':' + id))]));
  const res = await fetch('/api/pick', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ decidedBy, selections }) });
  const out = await res.json().catch(() => ({}));
  msg.textContent = out.ok ? 'Saved to ' + out.saved.map((s) => 'discovery/opportunities/' + s + '.md').join(', ') + '.' : 'Not saved: ' + Object.values(out.errors || { x: 'error' }).join(' ');
});
render();
`;

const LV = { 'well supported': 'well', 'partly supported': 'partly', unsupported: 'un' };
const FILLED = { well: 3, partly: 2, un: 1 };

function card(source, o, names) {
  const lv = LV[o.level];
  const key = `${source}:${o.id}`;
  const name = names[o.branch] || '';
  const parked = /not this quarter/i.test(name);
  const branchLabel = o.branch ? `${o.branch}: ${name || 'branch ' + o.branch}` : 'no KPI branch';
  return `<article class="card ${lv}" tabindex="0" role="checkbox" aria-checked="false" data-key="${esc(key)}" data-source="${source}" data-level="${lv}" data-speakers="${o.speakers.join(' ')}" data-branch="${o.branch || 'none'}">
<div class="top"><span>${icon(source)} ${source} · <span class="id">${o.id}</span></span><span class="tick" aria-hidden="true"></span></div>
<div class="title">${esc(o.title)}</div>
<div class="meter" title="${esc(o.level)}">${[1, 2, 3].map((n) => `<i class="${n <= FILLED[lv] ? 'f' : ''}"></i>`).join('')}<b>${esc(o.level)}</b></div>
<div class="voices" title="distinct voices">${Array.from({ length: Math.min(o.voices, 8) }, () => '<span class="v"></span>').join('')}<span class="gap">${o.voices} ${o.voices === 1 ? 'voice' : 'voices'}${o.speakers.length ? ' · ' + o.speakers.join(', ') : ''}${o.secondHand ? ' · plus second-hand' : ''}</span></div>
<div class="badges"><span class="badge${parked ? ' parked' : ''}">${branchLabel}</span>${!parked && o.driver ? `<span class="badge">driver: ${esc(o.driver)}</span>` : ''}${parked && o.sideLink ? `<span class="badge">side link to A${o.driver ? ', driver ' + esc(o.driver) : ''}</span>` : ''}</div>
${o.quote ? `<blockquote>${esc(o.quote.text)}<small>${esc(o.quote.where)}</small></blockquote>` : ''}
<div class="note">${esc(o.assessment)}</div>
<a href="/discovery/opportunities/${source}.md" class="note">Read the full entry</a>
</article>`;
}

function evidenceMap(files) {
  const head = `<span></span>${['well supported', 'partly supported', 'unsupported'].map((l) => `<span class="h">${l}</span>`).join('')}`;
  const rows = files.map((f) => `<span class="src">${icon(f.source)}<span>${f.source}</span></span>${['well supported', 'partly supported', 'unsupported'].map((l) => `<span class="cell">${f.items.filter((o) => o.level === l).map((o) => `<span class="dot ${LV[l]}" data-key="${f.source}:${o.id}" title="${esc(o.id + ': ' + o.title)}">${o.id.slice(1)}</span>`).join('')}</span>`).join('')}`).join('');
  return `<div class="map" aria-label="Evidence map: opportunities by source and evidence level">${head}${rows}</div>`;
}

function chips(group, values, label) {
  return `<div class="group"><span>${label}</span>${values.map(([v, t]) => `<button type="button" class="chip" data-group="${group}" data-value="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`;
}

export function pickPage(root) {
  const files = readAll(root);
  const names = branchNames(root);
  const sorted = files.flatMap((f) => f.items.map((o) => ({ f, o })))
    .sort((a, b) => FILLED[LV[b.o.level]] - FILLED[LV[a.o.level]] || b.o.voices - a.o.voices);
  const decidedBy = files.map((f) => f.decidedBy).find(Boolean) || '';
  const json = JSON.stringify(files.map(({ source, items, ids }) => ({ source, ids, items: items.map((i) => ({ id: i.id })) }))).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pick opportunities</title><style>${CSS}</style></head><body>
<header><a href="/discovery">Discovery</a>
<h1>Pick what goes into the comparison</h1>
<p class="lead">Every opportunity the sources produced, strongest evidence first. Click a card to put it into the comparison. Saving writes your choice into the "Goes into comparison" line of each file under discovery/opportunities/.</p>
${evidenceMap(files)}
<div class="filters">
${chips('source', SOURCES.filter((s) => files.some((f) => f.source === s)).map((s) => [s, `${icon(s)} ${s}`]), 'Source')}
${chips('level', [['well', 'well supported'], ['partly', 'partly supported'], ['un', 'unsupported']], 'Evidence')}
${chips('speaker', [['sponsor', 'sponsor'], ['participant', 'participant']], 'Voice')}
${chips('branch', Object.entries(names).map(([k, v]) => [k, `${k}: ${esc(v)}`]), 'KPI branch')}
</div></header>
<main><div class="grid">${sorted.map(({ f, o }) => card(f.source, o, names)).join('')}</div><p class="empty" hidden>No opportunity matches these filters.</p></main>
<form class="bar"><div><span class="count"></span><label>Decided by <input name="decidedBy" value="${esc(decidedBy)}" placeholder="your name" autocomplete="name"></label><button>Save</button><span class="msg"></span></div></form>
<script type="application/json" id="data">${json}</script>
<script>${CLIENT}</script>
</body></html>`;
}
