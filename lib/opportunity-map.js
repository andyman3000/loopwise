// /discovery/map: every opportunity from discovery/opportunities/ as a card, in rows by the goal:
// one row per driver of the active branch of discovery/kpi-tree.md, then the parked branch, then
// "No KPI branch". With filters. Read-only: what is in "Goes into comparison" is shown, never written.
// data.md holds observations, not opportunities, so it is left out. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { sourceHref } from './source-view.js';

export const SOURCES = ['interviews', 'inquiry-mails', 'feedback', 'inbox'];
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
    // Every quote in the evidence list: '  - "text" (sources/x.md:49, S, sponsor)'.
    const quotes = [...body.matchAll(/^\s+- ("[^"]+")\s*\(([^)]*)\)/gm)].map((m) => ({ text: m[1], where: m[2].split(',')[0].trim() }));
    const who = voices.split(/Second-hand/i)[0];
    const speakers = [];
    if (/sponsor/i.test(who)) speakers.push('sponsor');
    if (/participant/i.test(who)) speakers.push('participant');
    if (/developer/i.test(who)) speakers.push('developer');
    // "Side link to Branch A" or "Side link: Branch A", but not "No side link to Branch A".
    // The branch is read from the text before the side link, so "no branch ... Side link to
    // Branch A" stays without a branch. The driver comes from the part that names the row.
    const side = kpi.match(/(?<!no )side link(?: to|:)\s*Branch A\b/i);
    // Negated clauses ("No driver of Branch A fits.", "No side link to Branch A.") name no branch
    // and no driver, so they are dropped before either is read.
    const main = (side ? kpi.slice(0, side.index) : kpi).replace(/\bno (?:driver|side link)\b[^.]*\.?/gi, '');
    const branch = (main.match(/Branch ([A-Z])/) || [])[1] || '';
    const driverText = side && branch !== 'A' ? kpi.slice(side.index) : main;
    return {
      id,
      title: title.trim(),
      voices: Number((voices.match(/(\d+)\s+distinct/) || [])[1] || 0),
      speakers,
      secondHand: /Second-hand:\s*yes/i.test(voices),
      branch,
      sideLink: Boolean(side),
      driver: ((driverText.match(/driver ([a-z ]+?)(?=[.\[,]|\s+\[|$)/i) || [])[1] || '').trim(),
      level,
      assessment: assessment.replace(new RegExp(`^${level}\\.?\\s*`, 'i'), ''),
      quote: quotes[0] || null,
      quotes,
    };
  });
}

// Current selection from "Goes into comparison: O1, O3". "____" means nothing chosen yet.
export function parseSelection(md) {
  const line = (md.match(/^Goes into comparison:\s*(.*)$/m) || [])[1] || '';
  return { ids: line.includes('____') ? [] : line.match(/O\d+/g) || [] };
}

// "Branch A: inquiries that end in a booking (product/strategy.md:12)" -> { A: 'inquiries that end in a booking' }
export function branchNames(root) {
  return Object.fromEntries(readTree(root).branches.map((b) => [b.id, b.name]));
}

// The tree's branches with their drivers, in file order:
// "  - Branch A: more inquiries ... (x:12)" then "    - reach rate: percentage of ... · measured: ...".
// The active branch is the first one not marked "not this quarter".
export function readTree(root) {
  const file = path.join(root, 'discovery', 'kpi-tree.md');
  const md = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r/g, '') : '';
  const branches = [];
  let cur = null;
  for (const line of md.split('\n')) {
    const b = line.match(/^(\s*)- Branch ([A-Z]):\s*([^(\n]+)/);
    if (b) { cur = { id: b[2], name: b[3].trim(), indent: b[1].length, drivers: [] }; branches.push(cur); continue; }
    if (!cur || !line.trim()) continue;
    const indent = line.match(/^\s*/)[0].length;
    const d = line.match(/^\s*- ([^:`]+):\s*(.*?)(?:\s+·\s+measured:.*)?$/);
    if (indent > cur.indent && d) cur.drivers.push({ name: d[1].trim(), sentence: d[2].trim() });
    else if (indent <= cur.indent) cur = null;
  }
  const active = branches.find((x) => !/not this quarter/i.test(x.name)) || null;
  return { branches, active };
}

// Rows of the map: one per driver of the active branch, a catch-all for that branch only when a card
// names a driver the tree does not have, one per parked branch, then "No KPI branch".
// A card is never guessed into a driver row: its driver must equal a tree driver's name exactly.
// entries: [{ source, o, inComparison }]. Returns rows in page order and the cards that matched no
// driver or branch of the tree.
export function assignRows(entries, tree) {
  const active = tree.active;
  const rows = [];
  const byKey = {};
  const add = (key, row) => { byKey[key] = { key, ...row, cards: [] }; rows.push(byKey[key]); };
  for (const d of active ? active.drivers : []) add(`driver:${d.name}`, { kind: 'driver', title: d.name, sentence: d.sentence });
  if (active) add(`catch:${active.id}`, { kind: 'catch', title: `Branch ${active.id}, driver not in the tree`, sentence: 'The file names this branch, but its driver matches no step above.', hideEmpty: true });
  for (const b of tree.branches.filter((x) => x !== active)) {
    add(`catch:${b.id}`, { kind: 'catch', title: `Branch ${b.id}: ${b.name.replace(/,?\s*not this quarter\s*$/i, '')}, not this quarter`, sentence: 'Needs that sit mainly on this branch, with no side link to a step above.' });
  }
  add('catch:none', { kind: 'catch', title: 'No KPI branch', sentence: 'Needs the file ties to no branch of the tree and to no step above.' });
  const parkedRow = (o) => (o.branch && o.branch !== active?.id && byKey[`catch:${o.branch}`]) || byKey['catch:none'];
  const unplaced = [];
  for (const e of entries) {
    const { o } = e;
    const driverRow = active && active.drivers.some((d) => d.name === o.driver) ? byKey[`driver:${o.driver}`] : null;
    if (active && o.branch === active.id) {
      if (driverRow) driverRow.cards.push({ ...e, side: false });
      else { byKey[`catch:${active.id}`].cards.push({ ...e, side: false }); unplaced.push({ ...e, why: o.driver ? `driver "${o.driver}" is not in the tree` : 'no driver named' }); }
    } else if (o.sideLink) {
      if (driverRow) driverRow.cards.push({ ...e, side: true });
      else { parkedRow(o).cards.push({ ...e, side: true }); unplaced.push({ ...e, why: o.driver ? `side-link driver "${o.driver}" is not in the tree` : 'side link without a driver' }); }
    } else {
      if (o.branch && o.branch !== active?.id && !byKey[`catch:${o.branch}`]) unplaced.push({ ...e, why: `branch ${o.branch} is not in the tree` });
      parkedRow(o).cards.push({ ...e, side: false });
    }
  }
  return { rows: rows.filter((r) => !(r.hideEmpty && !r.cards.length)), unplaced };
}

const fileOf = (root, source) => path.join(root, 'discovery', 'opportunities', `${source}.md`);

export function readAll(root) {
  return SOURCES.filter((s) => fs.existsSync(fileOf(root, s))).map((source) => {
    const md = fs.readFileSync(fileOf(root, source), 'utf8');
    return { source, items: parseOpportunities(md), ...parseSelection(md) };
  });
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICONS = {
  interviews: '<path d="M4 5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-4-3h-3"/>',
  'inquiry-mails': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  feedback: '<path d="m12 3 2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"/>',
  inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/>',
};
const icon = (s) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[s]}</svg>`;
// "inquiry-mails" reads as "inquiry mails" on the page.
const label = (s) => s.replace(/-/g, ' ');

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
.lead{color:var(--muted);margin:0 0 .6rem;max-width:48rem}
.lead.first{color:var(--fg)}
a{color:var(--accent)}
.icon{width:1.15em;height:1.15em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;vertical-align:-.2em}
.filters{display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;align-items:center;margin:1rem 0}
.group{display:flex;gap:.35rem;flex-wrap:wrap;align-items:center}
.group>span{font-size:.8rem;color:var(--muted);margin-right:.2rem}
.chip{border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:999px;padding:.25rem .7rem;font:inherit;font-size:.85rem;cursor:pointer}
.chip[data-group="source"]{text-transform:capitalize}
.chip[aria-pressed="true"]{background:var(--accent);color:var(--accent-fg);border-color:var(--accent)}
main{padding-bottom:3rem}
.row{border-top:1px solid var(--line);padding:.9rem 0 1.1rem}
.row h2{margin:0;font-size:1.1rem;display:flex;gap:.5rem;align-items:baseline;flex-wrap:wrap}
.row h2 .n{font-size:.8rem;font-weight:400;color:var(--muted)}
.row .step{font-size:.75rem;font-weight:600;color:var(--accent-fg);background:var(--accent);border-radius:4px;padding:.05rem .4rem}
.row.catch h2{color:var(--muted)}
.row .says{margin:.15rem 0 .6rem;color:var(--muted);font-size:.9rem}
.row .none{margin:0;color:var(--muted);font-size:.85rem;font-style:italic}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:.9rem}
.card{position:relative;background:var(--card);border:1px solid var(--line);border-left:6px solid var(--lvl);border-radius:10px;padding:.8rem .9rem .9rem;display:flex;flex-direction:column;gap:.45rem}
.card.well{--lvl:var(--well)}.card.partly{--lvl:var(--partly)}.card.un{--lvl:var(--un)}
.card.on{outline:3px solid var(--accent);outline-offset:-1px}
.card.side{border-style:dashed;border-left-style:solid}
.card[hidden]{display:none}
.top{display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--muted);text-transform:capitalize}
.top .id{font-weight:600}
.in{font-size:.75rem;font-weight:600;color:var(--accent-fg);background:var(--accent);border-radius:4px;padding:.1rem .45rem;text-transform:none}
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
.badge.side{font-weight:600;border:1px solid var(--fg);background:transparent}
blockquote{margin:0;font-size:.88rem;color:var(--muted);border-left:3px solid var(--line);padding-left:.6rem}
blockquote small{display:block;font-size:.75rem}
.more{font-size:.8rem;color:var(--muted)}
.more blockquote{margin-top:.4rem}
.more summary{cursor:pointer}
.note{font-size:.85rem}
.empty{color:var(--muted)}
`;

const CLIENT = `
const filters = { source: new Set(), level: new Set(), speaker: new Set(), branch: new Set() };
const cards = [...document.querySelectorAll('.card')];
function render() {
  for (const c of cards) {
    const d = c.dataset;
    c.hidden = !((!filters.source.size || filters.source.has(d.source))
      && (!filters.level.size || filters.level.has(d.level))
      && (!filters.speaker.size || d.speakers.split(' ').some((s) => filters.speaker.has(s)))
      && (!filters.branch.size || filters.branch.has(d.branch)));
  }
  for (const r of document.querySelectorAll('.row')) {
    const all = [...r.querySelectorAll('.card')];
    const msg = r.querySelector('.filtered');
    if (msg) msg.hidden = !all.length || all.some((c) => !c.hidden);
  }
  document.querySelector('.empty').hidden = cards.some((c) => !c.hidden);
}
for (const b of document.querySelectorAll('.chip')) b.addEventListener('click', () => {
  const set = filters[b.dataset.group];
  set.has(b.dataset.value) ? set.delete(b.dataset.value) : set.add(b.dataset.value);
  b.setAttribute('aria-pressed', set.has(b.dataset.value));
  render();
});
render();
`;

const LV = { 'well supported': 'well', 'partly supported': 'partly', unsupported: 'un' };
const FILLED = { well: 3, partly: 2, un: 1 };

// A quote links to its source file and line, so a reader can check it in context.
function quoteBlock(q) {
  const href = sourceHref(q.where);
  return `<blockquote>${esc(q.text)}<small>${href ? `<a href="${esc(href)}">${esc(q.where)}</a>` : esc(q.where)}</small></blockquote>`;
}

function card({ source, o, inComparison, side }, names) {
  const lv = LV[o.level];
  const key = `${source}:${o.id}`;
  const name = names[o.branch] || '';
  const parked = /not this quarter/i.test(name);
  const branchLabel = o.branch ? `${o.branch}: ${name || 'branch ' + o.branch}` : 'no KPI branch';
  return `<article class="card ${lv}${inComparison ? ' on' : ''}${side ? ' side' : ''}" data-key="${esc(key)}" data-source="${source}" data-level="${lv}" data-speakers="${o.speakers.join(' ')}" data-branch="${o.branch || 'none'}">
<div class="top"><span>${icon(source)} ${label(source)} · <span class="id">${o.id}</span></span>${inComparison ? '<span class="in">in comparison</span>' : ''}</div>
<div class="title">${esc(o.title)}</div>
<div class="meter" title="${esc(o.level)}">${[1, 2, 3].map((n) => `<i class="${n <= FILLED[lv] ? 'f' : ''}"></i>`).join('')}<b>${esc(o.level)}</b></div>
<div class="voices" title="distinct voices">${Array.from({ length: Math.min(o.voices, 8) }, () => '<span class="v"></span>').join('')}<span class="gap">${o.voices} ${o.voices === 1 ? 'voice' : 'voices'}${o.speakers.length ? ' · ' + o.speakers.join(', ') : ''}${o.secondHand ? ' · plus second-hand' : ''}</span></div>
<div class="badges">${side ? '<span class="badge side">side link</span>' : ''}<span class="badge${parked || !o.branch ? ' parked' : ''}">${esc(branchLabel)}</span></div>
${o.quote ? quoteBlock(o.quote) : ''}
${o.quotes.length > 1 ? `<details class="more"><summary>${o.quotes.length - 1} more ${o.quotes.length === 2 ? 'quote' : 'quotes'}</summary>${o.quotes.slice(1).map(quoteBlock).join('')}</details>` : ''}
<div class="note">${esc(o.assessment)}</div>
<a href="/discovery/opportunities/${source}.md" class="note">Read the full entry</a>
</article>`;
}

function rowBlock(row, names, step) {
  const sorted = [...row.cards].sort((a, b) => FILLED[LV[b.o.level]] - FILLED[LV[a.o.level]] || b.o.voices - a.o.voices);
  const n = sorted.length;
  const sides = sorted.filter((c) => c.side).length;
  const count = `${n} ${n === 1 ? 'card' : 'cards'}${sides ? `, ${sides} by side link` : ''}`;
  return `<section class="row ${row.kind}" data-row="${esc(row.key)}">
<h2>${step ? `<span class="step">${step}</span>` : ''}${esc(row.title)}<span class="n">${count}</span></h2>
<p class="says">${esc(row.sentence)}</p>
${n ? `<div class="grid">${sorted.map((c) => card(c, names)).join('')}</div><p class="none filtered" hidden>No card in this row matches the filters.</p>`
    : `<p class="none">${row.kind === 'driver' ? 'No opportunity names this step.' : 'No opportunity sits here.'}</p>`}
</section>`;
}

function chips(group, values, label) {
  return `<div class="group"><span>${label}</span>${values.map(([v, t]) => `<button type="button" class="chip" data-group="${group}" data-value="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`;
}

export function mapPage(root) {
  const files = readAll(root);
  const tree = readTree(root);
  const names = Object.fromEntries(tree.branches.map((b) => [b.id, b.name]));
  const entries = files.flatMap((f) => f.items.map((o) => ({ source: f.source, o, inComparison: f.ids.includes(o.id) })));
  const { rows } = assignRows(entries, tree);
  const chosen = files.reduce((n, f) => n + f.ids.length, 0);
  const activeName = tree.active ? `Branch ${tree.active.id} of the KPI tree` : 'the KPI tree';
  let step = 0;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Opportunity map</title><style>${CSS}</style></head><body>
<header><a href="/discovery">Discovery</a>
<h1>Opportunity map</h1>
<p class="lead first">Each row is one step of ${activeName}, from first visit to booking, holding the opportunities whose file names that step; needs on the parked branch or on no branch come last.</p>
<p class="lead">The colour shows how well a card is supported, the dots count distinct voices, a dashed card reaches its row only by a side link. ${chosen ? `${chosen} marked "in comparison", from the files.` : 'Nothing is in the comparison yet.'} Read-only: <code>/compare-opportunities</code> proposes a shortlist and asks you to confirm it.</p>
<div class="filters">
${chips('source', SOURCES.filter((s) => files.some((f) => f.source === s)).map((s) => [s, `${icon(s)} ${label(s)}`]), 'Source')}
${chips('level', [['well', 'well supported'], ['partly', 'partly supported'], ['un', 'unsupported']], 'Evidence')}
${chips('speaker', [['sponsor', 'sponsor'], ['participant', 'participant'], ['developer', 'developer']], 'Voice')}
${chips('branch', Object.entries(names).map(([k, v]) => [k, `${k}: ${esc(v)}`]), 'KPI branch')}
</div></header>
<main>${rows.map((r) => rowBlock(r, names, r.kind === 'driver' ? ++step : 0)).join('')}<p class="empty" hidden>No opportunity matches these filters.</p></main>
<script>${CLIENT}</script>
</body></html>`;
}
