// /discovery/tree: discovery/opportunity-comparison.md drawn as an opportunity tree. The business
// goal on top, the drivers of the active branch in funnel order, the candidates below, each linked
// to the drivers it acts on. Read-only: the Markdown file is the only input. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { sourceHref } from './source-view.js';

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

// "3 source groups, 11 sponsors, each about ..." -> "11 sponsors · 3 source groups". Only counts the text states.
function counts(s) {
  const voices = (s.match(/\b(\d+) (sponsors?|participants?|developers?|voices?|senders?)\b/) || [])[0];
  const groups = (s.match(/\b(\d+) source groups?\b/) || [])[0];
  return [voices, groups].filter(Boolean).join(' · ');
}
// The "### C1: ..." block under "## Evidence": the full assessment, with gaps.
const evidenceBlock = (md, id) => (section(md, 'Evidence').split(/^### /m).find((b) => b.startsWith(id + ':')) || '');

export function parseComparison(md) {
  md = md.replace(/\r/g, '');
  const decide = section(md, 'What you decide');
  const first = section(md, 'Your first try');
  const tree = section(md, 'Tree');
  const decision = section(md, 'Decision \\(human\\)');
  const favoured = line(decide, 'Appears favoured');
  // A driver line, then optional indented "  - Data: ..." lines: the observation behind an assumed link.
  const drivers = [];
  for (const l of tree.split('\n')) {
    const m = l.match(/^- ([^:\n]+):\s*(.*?)(?:\s*·\s*Candidates:\s*(.*))?$/);
    const data = l.match(/^\s+- Data:\s*(.*)$/);
    if (m) {
      const loss = m[2].trim();
      const count = loss.match(/^([\d,]+) of ([\d,]+)/);
      const num = (v) => Number(v.replace(/,/g, ''));
      drivers.push({ name: m[1].trim(), loss, lost: count ? num(count[1]) : null, of: count ? num(count[2]) : null, candidates: links(m[3] || ''), data: [] });
    } else if (data && drivers.length) drivers[drivers.length - 1].data.push(data[1].trim());
  }
  const candidates = section(md, 'Candidates').split(/^### /m).slice(1).map((b) => {
    const [, id, title] = b.match(/^(C\d+):\s*(.*)$/m) || [];
    const quote = field(b, 'Strongest quote').match(/^(".*")\s*\(([^)]*)\)\s*$/);
    const evidence = field(b, 'Evidence');
    const measurable = field(b, "Readable from today's data in 8 weeks");
    const lev = field(b, 'Leverage');
    const from = field(b, 'From');
    return {
      id, title: (title || '').trim(),
      from,
      // "inquiry-mails O1 + inbox O1" -> the entries in discovery/opportunities/ this candidate comes from.
      sources: [...from.matchAll(/([a-z][a-z-]*)\s+(O\d+)/g)].map((m) => ({ group: m[1], id: m[2] })),
      evidence: { level: level(evidence), text: rest(evidence), counts: counts(evidence) },
      leverage: { level: level(lev), text: rest(lev) },
      gap: field(evidenceBlock(md, id), 'Gaps and uncertainty'),
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
    flip: open(line(decision, 'We would switch if')),
  };
}

// discovery/intents/<slug>.md: the candidate it hangs under, its solution ideas, and which one is tested first.
// The skill rewrites the file after every step, so the ideas appear before any assumption is filled in.
const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
export function parseIntent(md) {
  md = md.replace(/\r/g, '');
  const candidate = (md.match(/^> Opportunity:\s*(C\d+)/m) || [])[1] || '';
  const rows = section(md, 'Solution ideas').split('\n').filter((l) => l.trim().startsWith('|'));
  const head = rows.length ? cells(rows[0]).map((h) => h.toLowerCase()) : [];
  const col = (name) => head.findIndex((h) => h.startsWith(name));
  const ideas = rows.slice(2).map(cells).map((c) => {
    const [, id, mechanism] = (c[col('idea')] || '').match(/^(I\d+):\s*(.*)$/) || [];
    const lv = c[col('level')] || '';
    const get = (name) => (col(name) >= 0 ? c[col(name)] || '' : '');
    return { id: id || '', mechanism: (mechanism || '').trim(), from: get('from'), assumption: get('critical'), level: level(lv), driver: get('driver') };
  }).filter((i) => i.id);
  // Every round adds its own "Selection (human)"; each one marks the idea it tests.
  const selections = [...md.matchAll(/^## Selection \(human\)[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)].map((m) => m[1]);
  const pick = (selection, name) => { const v = (selection.match(new RegExp(`^- ${name}:\\s*(.*)$`, 'm')) || [])[1] || ''; return v.includes('____') ? '' : v.trim(); };
  const tested = selections.map((s) => ({ id: (pick(s, 'Idea it comes from').match(/I\d+/) || [])[0] || '', variant: pick(s, 'Variant name[^:]*') })).filter((t) => t.id);
  return { candidate, title: ((md.match(/^# Intent:\s*(.*)$/m) || [])[1] || '').trim(), ideas, tested, chosen: tested[0]?.id || '', variant: tested[0]?.variant || '' };
}

export function readIntents(root) {
  const dir = path.join(root, 'discovery', 'intents');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
    .map((f) => ({ file: `discovery/intents/${f}`, ...parseIntent(fs.readFileSync(path.join(dir, f), 'utf8')) }))
    .filter((i) => i.candidate && i.ideas.length);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const code = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
// Counts read as counts: 3026 -> 3,026. Dates, line numbers and IDs stay as they are.
export const thousands = (s) => String(s).replace(/(?<![\d.,:\-\/A-Za-z])\d{4,}(?![\d.,:\-\/])/g, (n) => Number(n).toLocaleString('en-US'));

// Also used by scripts/draw-kpi-tree.js, so the KPI tree in block 1 looks like this tree.
export const CSS = `
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
.driver{min-width:0;overflow-wrap:anywhere;text-align:left;font:inherit;font-size:.85rem;color:inherit;display:flex;flex-direction:column;gap:.3rem;cursor:pointer}
.driver.hot{outline:3px solid var(--accent);outline-offset:-1px}
.driver .name{font-weight:650}
.driver .step{color:var(--muted);font-size:.72rem;font-weight:600}
.driver .loss{color:var(--muted);font-size:.8rem;line-height:1.3}
.driver .loss b{font-weight:600}
.bar{display:block;height:.4rem;min-width:3px;border-radius:3px;background:var(--muted);overflow:hidden}
.bar i{display:block;height:100%;background:var(--gap)}
.driver.gap{border:1.5px dashed var(--muted)}
.driver .data{font-size:.75rem;line-height:1.3;border-left:2px dashed var(--muted);padding-left:.4rem}
.driver .data b{font-weight:600}
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
.sols{display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:.8rem;margin-top:3.5rem}
.sol{background:var(--card);border:1px dashed var(--accent);border-radius:10px;padding:.6rem .75rem;display:flex;flex-direction:column;gap:.35rem;cursor:pointer;text-align:left;font:inherit;color:inherit;font-size:.82rem}
.sol .mech{font-weight:650;font-size:.9rem;line-height:1.3}
.sol .ass{color:var(--muted);line-height:1.3}
.sol.picked{border:2px solid var(--well)}
.sol.hot{outline:3px solid var(--accent);outline-offset:-1px}
.sol.dim{opacity:.45}
.tree path.sol-link{stroke:var(--accent);stroke-width:1.5;stroke-dasharray:3 4}
.sw.s{border-top:2px dotted var(--accent)}
.more{font-size:.9rem;padding-bottom:3rem}
.empty{color:var(--muted)}
@media (max-width:48rem){
  .tree svg{display:none}
  .drivers{grid-template-columns:1fr 1fr;margin-top:1rem}
  .branch{margin-top:.8rem}
  .cands{margin-top:1.5rem}
  .sols{margin-top:1rem}
  .decide .row{flex-direction:column;gap:0}
}
`;


// The page is a map for a live demo. The overview shows the goal, the funnel and one card per
// candidate with only evidence and lever. A key or a click zooms the camera onto one step, one
// candidate or one idea, and only then its details appear (semantic zoom: the card shows more text
// the closer you are). On a narrow screen there is no camera: the page scrolls with all details open.
const PAGE_CSS = `
:root{--bg:#faf8f4;--fg:#22262b;--muted:#5b636c;--accent:#2f5d62;--accent-fg:#fff;--line:#c9c3b8;--card:#fff;
--well:#2f7d4f;--partly:#b07a10;--un:#b5452f;--chip:#efebe4;--lost:#f0d6d0}
@media (prefers-color-scheme:dark){:root{--bg:#1b1e21;--fg:#e8e6e1;--muted:#a3a8ad;--accent:#7fb3b8;--accent-fg:#10201f;
--line:#4a5056;--card:#23272b;--well:#6cc08e;--partly:#e2b54f;--un:#ef8a74;--chip:#2c3135;--lost:#4a2e2a}}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{background:var(--bg);color:var(--fg);font:16px/1.4 system-ui,-apple-system,sans-serif;overflow:hidden}
a{color:var(--accent)}
code{font-size:.88em;background:var(--chip);padding:0 .25em;border-radius:3px}
#stage{position:fixed;inset:0 0 3.5rem 0;overflow:hidden}
#world{position:absolute;left:0;top:0;width:1600px;padding:40px;transform-origin:0 0;transition:transform .6s cubic-bezier(.4,.1,.2,1)}
#world>svg{position:absolute;left:0;top:0;width:1600px;pointer-events:none;overflow:visible}
svg path{fill:none;stroke:var(--line);stroke-width:2}
svg path.link{stroke:var(--muted);stroke-width:2.5}
svg path.assumed{stroke-dasharray:8 6}
svg path.sol-link{stroke:var(--accent);stroke-width:2;stroke-dasharray:3 5}
svg path.hot{stroke:var(--accent);stroke-width:4}
svg path.dim{opacity:.15}
.w-head h1{font-size:30px;line-height:1.2;margin:0 0 6px}
.w-head p{margin:0 0 4px;color:var(--muted);font-size:15px}
.w-head .status{color:var(--fg);font-size:17px}
.w-head .status b.open{color:var(--un)}
.goalrow{display:flex;flex-direction:column;align-items:center;gap:26px;margin:22px 0 0}
.node{background:var(--card);border:2px solid var(--line);border-radius:10px;padding:10px 14px}
.goal{background:var(--accent);color:var(--accent-fg);border-color:var(--accent);font-size:22px;font-weight:650;text-align:center}
.branch{font-size:19px;font-weight:600;text-align:center}
.kind{display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.8;font-weight:600}
.drivers{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:16px;margin-top:44px;align-items:start}
.driver{cursor:zoom-in;display:flex;flex-direction:column;gap:4px;min-width:0;overflow-wrap:anywhere}
.driver .step{font-size:13px;color:var(--muted);font-weight:600}
.driver .name{font-size:20px;font-weight:650}
.driver .big{font-size:24px;font-weight:700}
.driver .big small{font-size:15px;font-weight:400;color:var(--muted)}
.driver .sum{font-size:15px;color:var(--muted)}
.bar{display:block;height:14px;border-radius:7px;background:var(--lost);overflow:hidden;margin:4px 0}
.bar i{display:block;height:100%;background:var(--accent)}
.driver.gap{border-style:dashed;border-color:var(--muted)}
.nocand{font-size:13px;font-style:italic;color:var(--muted)}
.cands,.sols{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:24px;align-items:start}
.cands{margin-top:110px}
.sols{margin-top:70px}
.col{display:flex;flex-direction:column;gap:14px;min-width:0}
.card{background:var(--card);border:2px solid var(--line);border-top:8px solid var(--lvl);border-radius:12px;padding:16px 18px;cursor:zoom-in;min-width:0}
.card.well{--lvl:var(--well)}.card.partly{--lvl:var(--partly)}.card.un{--lvl:var(--un)}
.card.chosen{outline:4px solid var(--well)}
.top{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:12px}
.id{font-weight:700;font-size:15px;color:var(--muted);margin-right:2px}
.tag{border-radius:4px;padding:1px 6px;font-weight:600}
.tag.fav{background:var(--accent);color:var(--accent-fg)}
.tag.you{border:1.5px solid var(--fg)}
.tag.pick{background:var(--well);color:#fff}
.card .title{font-size:22px;line-height:1.2;margin:6px 0 12px;font-weight:650}
.row{display:grid;grid-template-columns:82px 1fr;gap:8px;margin:8px 0;align-items:baseline}
.row .k{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:600}
.row .v{font-size:17px}
.pill{display:inline-block;border-radius:999px;padding:0 9px;font-size:13px;font-weight:650;color:#fff;white-space:nowrap;margin-right:4px}
.pill.well{background:var(--well)}.pill.partly{background:var(--partly)}.pill.un{background:var(--un)}
.hint{font-size:12px;color:var(--muted);margin-top:8px}
.sol{background:var(--card);border:2px dashed var(--accent);border-radius:10px;padding:10px 12px;cursor:zoom-in;display:flex;flex-direction:column;gap:6px}
.sol.picked{border:3px solid var(--well)}
.sol .mech{font-weight:650;font-size:17px;line-height:1.25}
.acts{display:flex;gap:4px;flex-wrap:wrap;align-items:center}
.chip{font-size:12px;background:var(--chip);border-radius:4px;padding:1px 6px}
.chip.assumed{background:transparent;border:1px dashed var(--muted)}
.more{display:none;border-top:1px solid var(--line);margin-top:10px;padding-top:6px;font-size:13px;line-height:1.4}
.more h3{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:9px 0 2px}
.more .pill{font-size:10px;padding:0 6px}
.more blockquote{margin:0;font-style:italic}
.more small,.more .src{font:10px ui-monospace,Menlo,monospace;color:var(--muted);font-style:normal}
.more .basis{color:var(--muted)}
.more ul{margin:2px 0;padding-left:14px}
.driver .more{font-size:11px}
.part{break-inside:avoid}
.card .more .x{display:none}
.tip{position:relative;cursor:help}
.tip:hover::after{content:attr(data-tip);position:absolute;left:0;top:calc(100% + 6px);z-index:5;width:max-content;max-width:300px;white-space:normal;background:var(--fg);color:var(--bg);font-size:14px;font-weight:500;line-height:1.35;border-radius:6px;padding:6px 9px}
.open-btn{font:inherit;font-size:13px;font-weight:600;color:var(--accent);background:transparent;border:1.5px solid var(--accent);border-radius:6px;padding:3px 10px;margin-top:10px;cursor:pointer}
.open-btn:hover{background:var(--accent);color:var(--accent-fg)}
/* the large view: one candidate over the whole screen, for reading from the back of the room */
#veil{position:fixed;inset:0;background:rgba(20,24,28,.45);display:none;z-index:9}
#detail{position:fixed;inset:24px 24px calc(3.5rem + 24px);background:var(--card);border:2px solid var(--accent);border-radius:16px;padding:24px 36px 32px;overflow:auto;display:none;z-index:10}
body.big #veil,body.big #detail{display:block}
#detail .dh{display:flex;gap:16px;align-items:flex-start;justify-content:space-between}
#detail .dh h2{font-size:1.45em;line-height:1.2;margin:.1em 0 .4em}
#detail .dh .id{font-size:.9em}
#detail .close{font:inherit;font-size:.7em;border:1px solid var(--line);background:var(--card);color:inherit;border-radius:8px;padding:6px 12px;cursor:pointer;white-space:nowrap}
#detail .more{display:block;columns:2;column-gap:2.6em;column-rule:1px solid var(--line);border:0;margin:0;padding:0;font-size:1em;line-height:1.5}
#detail .more .part{padding:0 0 .55em;margin:0 0 .65em;border-bottom:1px solid var(--line)}
#detail .more .part:last-child{border-bottom:0}
#detail .more h3{font-size:.8em;font-weight:700;text-transform:none;letter-spacing:0;color:var(--fg);margin:0 0 .2em;display:flex;gap:.4em;align-items:center}
#detail .more h3 .pill{font-size:.85em}
#detail .more .line{display:block;margin-top:.2em}
#detail .more .basis{font-size:.8em;margin-top:.3em}
#detail .more code{background:none;padding:0;font:inherit;font-weight:600}
#detail .more small{display:block;font:.6em ui-monospace,Menlo,monospace;color:var(--muted);margin-top:.2em}
#detail .more .chip{font-size:.62em}
#detail .more .acts{margin-top:.4em}
#detail .more ul{margin:.1em 0 0;padding-left:1.1em}
#detail .more li{margin:.1em 0}
#detail .open-btn{display:none}
.legend{display:flex;flex-wrap:wrap;gap:6px 22px;font-size:14px;color:var(--muted);margin-top:40px}
.legend span{display:inline-flex;gap:6px;align-items:center}
.sw{width:28px;height:0;border-top:2.5px solid var(--muted)}
.sw.d{border-top-style:dashed}.sw.s{border-top:2.5px dotted var(--accent)}
.box{width:14px;height:14px;border-radius:3px}
.box.gapbox{border:1.5px dashed var(--muted)}
.decide{margin-top:60px;background:var(--card);border:2px solid var(--line);border-radius:12px;padding:18px 20px;display:grid;gap:8px;cursor:zoom-in;max-width:1000px}
.decide .q{font-size:22px;font-weight:650}
.decide .row{grid-template-columns:200px 1fr;margin:0}
.decide .row b{color:var(--muted);font-weight:600;font-size:14px}
.decide .row span{font-size:15px}
.decide .open{color:var(--un);font-weight:650}
.decide p{margin:4px 0 0;font-size:14px;color:var(--muted)}
/* zoomed in: the focused element shows its details, the rest steps back */
.on .more,.decide .more{display:block}
.on .hint{display:none}
.on{cursor:default}
body.f-funnel .driver .more{display:block}
body.focus .card.dim,body.focus .sol.dim,body.focus .driver.dim{opacity:.3}
body.focus .driver.hit,body.focus .card.hit,body.focus .sol.hit{opacity:1;outline:3px solid var(--accent);outline-offset:-1px}
nav{position:fixed;left:0;right:0;bottom:0;height:3.5rem;display:flex;gap:6px;align-items:center;justify-content:center;background:var(--card);border-top:1px solid var(--line);font-size:14px;padding:0 12px;overflow-x:auto}
nav button{font:inherit;color:inherit;border:1px solid var(--line);background:var(--card);border-radius:8px;padding:5px 10px;cursor:pointer;white-space:nowrap}
nav button.on{background:var(--accent);color:var(--accent-fg);border-color:var(--accent)}
nav kbd{font:11px ui-monospace,Menlo,monospace;opacity:.65;margin-left:4px}
nav .sep{width:1px;height:24px;background:var(--line);margin:0 4px;flex:none}
nav .help{color:var(--muted);font-size:12px;white-space:nowrap}
.empty{max-width:48rem;margin:2rem auto;padding:0 16px}
/* phone or small window: no camera, one scrolling page with every detail open */
body.flat{overflow:auto}
body.flat #stage{position:static;overflow:visible}
body.flat #world{position:static;width:auto;padding:16px;transform:none!important}
body.flat #world>svg,body.flat nav,body.flat .hint{display:none}
body.flat .drivers{grid-template-columns:1fr 1fr;margin-top:20px}
body.flat .cands,body.flat .sols{grid-template-columns:1fr;margin-top:24px}
body.flat .more{display:block;font-size:14px}
body.flat .card .more .x{display:block}
body.flat #detail{inset:8px;padding:16px}
body.flat #detail .more{columns:1}
body.flat .more h3{font-size:12px}
body.flat .more small,body.flat .more .src,body.flat .more .pill{font-size:12px}
body.flat .goalrow{gap:12px}
body.flat .row{grid-template-columns:70px 1fr}
body.flat .decide .row{grid-template-columns:1fr}
`;

// Camera, keys and lines. Lines are drawn in map coordinates after layout, so they follow the boxes.
// Keys: 0 overview, F funnel, D decision, 1-9 a candidate, arrows to the next box on the same level
// (left, right) or the level above and below (up, down), Esc one level out. The hash keeps the place.
const CLIENT = `{
const stage = document.getElementById('stage'), world = document.getElementById('world'), svg = world.querySelector('svg');
const $$ = (s) => [...world.querySelectorAll(s)];
const goal = world.querySelector('.goal'), branch = world.querySelector('.branch');
const drivers = $$('.driver'), cards = $$('.card'), sols = $$('.sol'), decide = world.querySelector('.decide');
const byView = (v) => world.querySelector('[data-view="' + v + '"]');
const linksOf = (c) => JSON.parse(c.dataset.links);
// An idea lights up its opportunity card and every step its driver cell names, matched on the server.
const solDrivers = (s) => { const names = JSON.parse(s.dataset.drivers); return drivers.filter((d) => names.includes(d.dataset.name)); };
const idsOfCard = (c) => sols.filter((s) => s.dataset.parent === c.dataset.id);
let cur = 'overview';
const flat = () => matchMedia('(max-width: 48rem)').matches;
function pos(el) { let x = 0, y = 0, e = el; while (e && e !== world) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return { x, y, w: el.offsetWidth, h: el.offsetHeight }; }
function curve(a, b, cls) { const m = (a.y + b.y) / 2; return '<path class="' + cls + '" d="M' + a.x + ' ' + a.y + ' C' + a.x + ' ' + m + ' ' + b.x + ' ' + m + ' ' + b.x + ' ' + b.y + '"/>'; }
const bottomOf = (el) => { const p = pos(el); return { x: p.x + p.w / 2, y: p.y + p.h }; };
const topOf = (el) => { const p = pos(el); return { x: p.x + p.w / 2, y: p.y }; };
function draw() {
  const el = byView(cur), kind = el ? el.dataset.kind : '';
  let out = curve(bottomOf(goal), topOf(branch), '');
  for (const d of drivers) out += curve(bottomOf(branch), topOf(d), '');
  for (const c of cards) for (const l of linksOf(c)) {
    const d = drivers.find((x) => x.dataset.name === l.name);
    if (!d) continue;
    const on = (kind === 'card' && el === c) || (kind === 'step' && el === d) || (kind === 'sol' && el.dataset.parent === c.dataset.id && solDrivers(el).includes(d));
    const off = (kind === 'card' || kind === 'step' || kind === 'sol') && !on;
    out += curve(bottomOf(d), topOf(c), 'link' + (l.assumed ? ' assumed' : '') + (on ? ' hot' : '') + (off ? ' dim' : ''));
  }
  for (const s of sols) {
    const c = cards.find((x) => x.dataset.id === s.dataset.parent);
    if (!c) continue;
    const on = (kind === 'sol' && el === s) || (kind === 'card' && el === c);
    // An elbow down the left edge of the column, so the line to a lower idea does not cross the ideas above it.
    const cp = pos(c), sp = pos(s), x0 = cp.x + 28, y0 = cp.y + cp.h, xl = sp.x - 12, ys = sp.y + 20;
    out += '<path class="sol-link' + (on ? ' hot' : '') + (kind && kind !== 'decision' && !on ? ' dim' : '') + '" d="M' + x0 + ' ' + y0 + ' V' + (y0 + 30) + ' H' + xl + ' V' + ys + ' H' + sp.x + '"/>';
  }
  svg.setAttribute('height', world.offsetHeight);
  svg.innerHTML = out;
}
function fit(r, max) {
  const vw = stage.clientWidth, vh = stage.clientHeight, pad = 0.05;
  const s = Math.min(vw * (1 - pad) / r.w, vh * (1 - pad) / r.h, max || 9);
  world.style.transform = 'translate(' + ((vw - r.w * s) / 2 - r.x * s) + 'px,' + ((vh - r.h * s) / 2 - r.y * s) + 'px) scale(' + s + ')';
}
function overviewRect() {
  const last = world.querySelector('.legend');
  const p = pos(last);
  return { x: 0, y: 0, w: world.offsetWidth, h: p.y + p.h + 20 };
}
function related(el) {
  const kind = el.dataset.kind;
  if (kind === 'card') return [...drivers.filter((d) => linksOf(el).some((l) => l.name === d.dataset.name)), ...idsOfCard(el)];
  if (kind === 'step') return cards.filter((c) => linksOf(c).some((l) => l.name === el.dataset.name));
  if (kind === 'sol') return [...cards.filter((c) => c.dataset.id === el.dataset.parent), ...solDrivers(el)];
  return [];
}
function show(v, push) {
  const el = v === 'overview' || v === 'funnel' ? null : byView(v);
  if (v !== 'overview' && v !== 'funnel' && !el) v = 'overview';
  cur = v;
  const kind = el ? el.dataset.kind : '';
  const rel = el ? related(el) : [];
  document.body.classList.toggle('f-funnel', v === 'funnel');
  document.body.classList.toggle('focus', kind === 'card' || kind === 'step' || kind === 'sol');
  for (const x of [...drivers, ...cards, ...sols]) {
    x.classList.toggle('on', x === el);
    x.classList.toggle('hit', rel.includes(x));
    x.classList.toggle('dim', !!el && x !== el && !rel.includes(x));
  }
  for (const b of document.querySelectorAll('nav button')) b.classList.toggle('on', b.dataset.v === v || (kind === 'sol' && b.dataset.v === el.dataset.parent));
  draw();
  if (!flat()) {
    if (v === 'overview') fit(overviewRect());
    else if (v === 'funnel') fit(pos(world.querySelector('.drivers')));
    else {
      fit(pos(el), kind === 'decision' ? 2 : 3.2);
    }
  } else if (el && push) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  if (location.hash.slice(1) !== v) history.replaceState(null, '', v === 'overview' ? location.pathname : '#' + v);
}
const idx = (list, el) => list.indexOf(el);
const step = (list, el, d) => list[Math.max(0, Math.min(list.length - 1, idx(list, el) + d))];
function move(key) {
  const el = byView(cur), kind = el ? el.dataset.kind : cur;
  const side = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0;
  if (cur === 'overview') return show(key === 'ArrowUp' ? 'funnel' : key === 'ArrowLeft' ? cards[cards.length - 1].dataset.view : cards[0].dataset.view);
  if (cur === 'funnel') return show(key === 'ArrowUp' ? 'overview' : key === 'ArrowDown' ? cards[0].dataset.view : (side < 0 ? drivers[drivers.length - 1] : drivers[0]).dataset.view);
  if (kind === 'step') {
    if (side) return show(step(drivers, el, side).dataset.view);
    if (key === 'ArrowUp') return show('funnel');
    const c = related(el)[0] || cards[0]; return show(c.dataset.view);
  }
  if (kind === 'card') {
    if (side) return show(cards[(idx(cards, el) + side + cards.length) % cards.length].dataset.view);
    if (key === 'ArrowUp') { const d = drivers.find((x) => x.dataset.name === (linksOf(el).find((l) => !l.assumed) || linksOf(el)[0] || {}).name); return show(d ? d.dataset.view : 'funnel'); }
    const s = idsOfCard(el)[0]; if (s) show(s.dataset.view); return;
  }
  if (kind === 'sol') {
    if (side) return show(step(sols, el, side).dataset.view);
    if (key === 'ArrowUp') return show(el.dataset.parent);
  }
  if (kind === 'decision' && key === 'ArrowUp') show('overview');
}
// The large view copies the card's details into one panel over the whole screen. The map stays where it was.
const detail = document.getElementById('detail');
const isBig = () => document.body.classList.contains('big');
function openBig(id) {
  const c = cards.find((x) => x.dataset.id === id);
  if (!c) return;
  if (cur !== id) show(id);
  detail.innerHTML = '<div class="dh"><div><span class="id">' + id + '</span><h2>' + c.querySelector('.title').innerHTML + '</h2></div><button type="button" class="close">Close<kbd> Esc</kbd></button></div>' + c.querySelector('.more').outerHTML;
  document.body.classList.add('big');
  fitText();
  detail.scrollTop = 0;
  history.replaceState(null, '', '#' + id + '/large');
}
// The text grows until the panel is full: the largest font size at which nothing scrolls, at most BIG_MAX.
const BIG_MAX = 40, BIG_MIN = 14;
function fitText() {
  let lo = BIG_MIN, hi = BIG_MAX;
  const fits = (px) => { detail.style.fontSize = px + 'px'; return detail.scrollHeight <= detail.clientHeight + 1; };
  if (fits(hi)) return;
  for (let i = 0; i < 9; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid; }
  detail.style.fontSize = Math.floor(lo) + 'px';
}
function closeBig() { document.body.classList.remove('big'); history.replaceState(null, '', '#' + cur); }
detail.addEventListener('click', (e) => { if (e.target.closest('.close')) closeBig(); });
document.getElementById('veil').addEventListener('click', closeBig);
function back() {
  const el = byView(cur), kind = el ? el.dataset.kind : '';
  show(kind === 'sol' ? el.dataset.parent : kind === 'step' ? 'funnel' : 'overview');
}
addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || flat()) return;
  const k = e.key;
  if (isBig()) {
    if (k === 'Escape' || k === 'Enter') { e.preventDefault(); closeBig(); }
    else if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); const i = cards.findIndex((x) => x.dataset.id === cur); openBig(cards[(i + (k === 'ArrowRight' ? 1 : -1) + cards.length) % cards.length].dataset.id); }
    return;
  }
  if (k === 'Enter' && byView(cur) && byView(cur).dataset.kind === 'card') { e.preventDefault(); openBig(cur); return; }
  if (k === '0') show('overview');
  else if (k === 'Escape') back();
  else if (k === 'f' || k === 'F') show('funnel');
  else if ((k === 'd' || k === 'D') && decide) show('decision');
  else if (/^[1-9]$/.test(k) && cards[k - 1]) show(cards[k - 1].dataset.view);
  else if (k.startsWith('Arrow')) { e.preventDefault(); move(k); }
  else if (k === 'Enter' && document.activeElement && document.activeElement.dataset.view) show(document.activeElement.dataset.view);
  else return;
});
world.addEventListener('click', (e) => {
  const ob = e.target.closest('.open-btn');
  if (ob) { e.stopPropagation(); openBig(ob.dataset.open); return; }
  if (e.target.closest('a')) return;
  const t = e.target.closest('[data-view]');
  if (t) { if (t.dataset.view !== cur) show(t.dataset.view, true); }
  else if (!flat()) show('overview');
});
document.querySelector('nav').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(b.dataset.v, true); });
function go(hash) { const [v, large] = hash.split('/'); if (isBig()) document.body.classList.remove('big'); show(v || 'overview'); if (large === 'large') openBig(v); }
addEventListener('hashchange', () => go(location.hash.slice(1)));
function layout() { document.body.classList.toggle('flat', flat()); show(cur); if (isBig()) { fitText(); history.replaceState(null, '', '#' + cur + '/large'); } }
addEventListener('resize', layout);
new ResizeObserver(() => draw()).observe(world);
// Focus or find-in-page can scroll the stage behind the camera; keep it at the origin.
stage.addEventListener('scroll', () => { if (!flat()) { stage.scrollTop = 0; stage.scrollLeft = 0; } });
const startLarge = location.hash.endsWith('/large');
cur = location.hash.slice(1).split('/')[0] || 'overview';
layout();
if (startLarge) openBig(cur);
}`;

// Each bar is one step of the funnel: how many of the people who reach this step go on to the next.
// Measured against the top of the funnel, every bar after the second shrank to a sliver, so only two
// steps could be read. Read the count next to it to see the funnel narrow: 3,766, 740, 194, ...
export function funnelBars(drivers) {
  return drivers.map((d) => (d.lost !== null && d.of
    ? { go: d.of - d.lost, of: d.of, share: Math.round(((d.of - d.lost) / d.of) * 1000) / 10 }
    : null));
}

const fmt = (n) => n.toLocaleString('en-US');
const EIGHT = { well: 'yes', partly: 'partly', un: 'no' };

// "3766 visits, the top of the funnel (data.md:32)" -> a big "3,766" and the words, without the citation.
function summary(loss) {
  const t = thousands(loss.replace(/\s*\([^)]*\)\s*$/, ''));
  const m = t.match(/^([\d,]+)\s+(.*)$/);
  return m ? `<span class="big">${m[1]} <small>${code(m[2])}</small></span>` : `<span class="sum">${code(t)}</span>`;
}

function driverNode(d, i, bar) {
  const gap = !d.candidates.length && d.lost !== null;
  const here = d.candidates.map((c) => `${c.id}${c.assumed ? ' (assumed)' : ''}`).join(', ');
  return `<div class="node driver${gap ? ' gap' : ''}" tabindex="0" data-kind="step" data-view="S${i + 1}" data-name="${esc(d.name)}">
<span class="step">Step ${i + 1}</span><span class="name">${esc(d.name)}</span>
${bar
    ? `<span class="big">${fmt(bar.go)} <small>of ${fmt(bar.of)} go on</small></span><span class="bar" title="${fmt(d.lost)} of ${fmt(d.of)} lost at this step"><i style="width:${bar.share}%"></i></span>`
    : summary(d.loss)}
${gap ? '<span class="nocand">No candidate acts here</span>' : ''}
<div class="more">
<b>Counted in the data:</b> ${code(thousands(d.loss))}
${d.data.map((t) => `<h3>Data behind the dashed link</h3>${code(thousands(t))}`).join('')}
<h3>Candidates on this step</h3>${here ? esc(here) : 'none'}
</div>
</div>`;
}

function quoteBlock(q) {
  const href = sourceHref(q.where);
  return `<blockquote>${esc(q.text)}</blockquote><small>${href ? `<a href="${esc(href)}">${esc(q.where)}</a>` : esc(q.where)}</small>`;
}

// The lever on the overview: the step a source ties the need to (or the first assumed one), what is
// lost there, and how many more steps the candidate touches.
function lever(c, drivers) {
  const primary = c.drivers.find((d) => !d.assumed) || c.drivers[0];
  if (!primary) return { step: '', loss: '', note: 'no step given' };
  const d = drivers.find((x) => x.name === primary.name);
  const others = c.drivers.filter((x) => x !== primary);
  const assumed = others.filter((x) => x.assumed).length, named = others.length - assumed;
  const note = [
    primary.assumed ? 'this link is only assumed' : '',
    named ? `${named} more ${named === 1 ? 'step' : 'steps'} named` : '',
    assumed ? `${assumed} more ${assumed === 1 ? 'step' : 'steps'} only assumed` : '',
  ].filter(Boolean).join(', ');
  return { step: primary.name, loss: d && d.lost !== null ? `${fmt(d.lost)} of ${fmt(d.of)} lost here` : (d ? thousands(d.loss) : ''), note };
}

function candidateCard(c, p) {
  const ev = LV[c.evidence.level] || 'un';
  const lv = LV[c.leverage.level] || 'un';
  const ms = LV[c.measurable.level] || 'un';
  const chosen = p.chosen && p.chosen.startsWith(c.id);
  const tags = [
    p.favoured.id === c.id ? '<span class="tag fav">comparison favours</span>' : '',
    p.firstTry.id === c.id ? '<span class="tag you">your first try</span>' : '',
    chosen ? '<span class="tag pick">chosen</span>' : '',
  ].join('');
  const l = lever(c, p.drivers);
  const leverTip = [l.loss, l.note].filter(Boolean).join('. ');
  const reads = [
    ...c.sources.map((s) => `<li><a href="/discovery/opportunities/${esc(s.group)}.md#${esc(s.id)}">${esc(s.group)} ${esc(s.id)}</a>: the opportunity with all its quotes</li>`),
    `<li><a href="/discovery/opportunity-comparison.md#evidence-${esc(c.id)}">The full assessment of ${esc(c.id)}</a> in the comparison</li>`,
  ];
  // Overview: the two labels only, the counts behind them on hover. Zoomed in: the quote, wins, loses
  // and the 8-week answer. Parts marked "x" appear only in the Details view.
  return `<article class="card ${ev}${chosen ? ' chosen' : ''}" tabindex="0" data-kind="card" data-view="${c.id}" data-id="${c.id}" data-links="${esc(JSON.stringify(c.drivers))}">
<div class="top"><span class="id">${c.id}</span>${tags}</div>
<div class="title">${esc(c.title)}</div>
<div class="row"><span class="k">Evidence</span><span class="v"><span class="pill ${ev} tip" data-tip="${esc(c.evidence.counts || rest(c.evidence.text))}">${esc(c.evidence.level || 'no level given')}</span></span></div>
<div class="row"><span class="k">Lever</span><span class="v">${l.step ? `<b>${esc(l.step)}</b> ` : ''}<span class="pill ${lv} tip" data-tip="${esc(thousands(leverTip))}">${esc(c.leverage.level || 'no level given')}</span></span></div>
<button type="button" class="open-btn" data-open="${c.id}">Details</button>
<div class="more">
${c.quote ? `<div class="part"><h3>Strongest quote</h3>${quoteBlock(c.quote)}</div>` : ''}
<div class="part x"><h3>Evidence <span class="pill ${ev}">${esc(c.evidence.level || 'no level given')}</span></h3>${c.evidence.counts ? `<b class="line">${esc(c.evidence.counts)}</b>` : ''}<span class="line">${code(c.evidence.text)}</span></div>
<div class="part x"><h3>Lever <span class="pill ${lv}">${esc(c.leverage.level || 'no level given')}</span></h3>${l.step ? `<span class="line"><b>${esc(l.step)}</b>: ${code(l.loss)}</span>` : ''}${l.note ? `<span class="line">${esc(l.note)}</span>` : ''}<span class="line">${code(c.leverage.text || 'The comparison names no lever.')}</span>
<div class="acts">${c.drivers.map((d) => `<span class="chip${d.assumed ? ' assumed' : ''}">${esc(d.name)}${d.assumed ? ' (assumed)' : ''}</span>`).join('') || '<span class="chip">no driver given</span>'}</div>
<div class="basis">The count says where people stop, not how many this need would bring back.</div></div>
<div class="part"><h3>Wins on</h3>${code(c.wins)}</div>
<div class="part"><h3>Loses on</h3>${code(c.loses)}</div>
<div class="part"><h3>Can we see a change in 8 weeks? <span class="pill ${ms}">${EIGHT[ms]}</span></h3><div class="x"><span class="line">${code(c.measurable.text)}</span>
<div class="basis">The comparison judges this from how often the event that would show the change is counted in <code>data/</code>.</div></div></div>
${c.gap ? `<div class="part x"><h3>Open gap</h3>${code(c.gap)}</div>` : ''}
<div class="part x"><h3>Read more</h3><ul>${reads.join('')}</ul></div>
</div>
</article>`;
}

// The steps an idea's driver cell names, by exact name. The cell lists drivers separated by " · ",
// each a name with an optional citation or note: "start rate (`discovery/kpi-tree.md:21`)".
// Only the name counts. A substring match linked "start rate, acts after the open rate" to both steps.
const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
export function namedDrivers(cell, drivers) {
  const names = String(cell || '').split(/\s*·\s*/)
    .map((part) => norm(part.replace(/`[^`]*`/g, '').replace(/\([^)]*\)/g, '').split(/[:,;]/)[0]));
  return drivers.filter((d) => names.includes(norm(d.name))).map((d) => d.name);
}

function solutionCard(intent, i, drivers, view) {
  const lv = LV[i.level] || 'un';
  const round = (intent.tested || []).findIndex((t) => t.id === i.id);
  const picked = round >= 0;
  const variant = picked ? intent.tested[round].variant : '';
  return `<article class="sol${picked ? ' picked' : ''}" tabindex="0" data-kind="sol" data-view="${esc(view)}" data-key="${esc(intent.file + '#' + i.id)}" data-parent="${esc(intent.candidate)}" data-driver="${esc(i.driver)}" data-drivers="${esc(JSON.stringify(namedDrivers(i.driver, drivers)))}">
<div class="top"><span class="id">${esc(i.id)}</span>${i.from ? `<span class="tag${/pair/i.test(i.from) ? ' you' : ''}">${esc(i.from)}</span>` : ''}${picked ? `<span class="tag pick">${round === 0 ? 'tested first' : `tested in round ${round + 1}`}${variant ? `: ${esc(variant)}` : ''}</span>` : ''}</div>
<span class="mech">${esc(i.mechanism)}</span>
<span class="acts">${i.level ? `<span class="pill ${lv}">${esc(i.level)}</span>` : ''}${i.driver.split(/\s*·\s*/).filter(Boolean).map((d) => `<span class="chip">${code(d.replace(/\s*\([^)]*\)\s*$/, ''))}</span>`).join('')}</span>
<div class="more">
${i.assumption ? `<h3>Critical assumption</h3>${code(i.assumption)}` : ''}
${i.driver ? `<h3>Driver</h3>${code(i.driver)}` : ''}
<h3>Read more</h3><a href="/${esc(intent.file)}">${esc(intent.file)}</a>
</div>
</article>`;
}

export function treePage(root) {
  const file = path.join(root, 'discovery', 'opportunity-comparison.md');
  const plain = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Opportunity tree</title><style>${PAGE_CSS}</style></head><body style="overflow:auto"><div class="empty">
<p><a href="/discovery">Discovery</a> · <a href="/discovery/map">Opportunity map</a></p><h1>Opportunity tree</h1>${body}</div></body></html>`;
  if (!fs.existsSync(file)) {
    return plain('<p>No comparison yet. Run <code>/compare-opportunities</code> in Claude Code; it writes <code>discovery/opportunity-comparison.md</code>, and this page draws it.</p>');
  }
  const p = parseComparison(fs.readFileSync(file, 'utf8'));
  if (!p.candidates.length || !p.drivers.length) {
    return plain('<p>The comparison has no "Tree" or "Candidates" section this page can read. Open <a href="/discovery/opportunity-comparison.md">the file</a>, or run <code>/compare-opportunities</code> again.</p>');
  }
  const intents = readIntents(root).filter((i) => p.candidates.some((c) => c.id === i.candidate));
  const bars = funnelBars(p.drivers);
  const used = new Set();
  const viewOf = (it, i) => { let v = `${it.candidate}-${i.id}`; for (let k = 2; used.has(v); k++) v = `${it.candidate}-${i.id}-${k}`; used.add(v); return v; };
  const cols = p.candidates.map((c) => intents.filter((it) => it.candidate === c.id)
    .flatMap((it) => it.ideas.map((i) => solutionCard(it, i, p.drivers, viewOf(it, i)))).join(''));
  const n = p.candidates.length;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Opportunity tree</title><style>${PAGE_CSS}</style></head><body>
<div id="stage"><div id="world">
<svg aria-hidden="true"></svg>
<div class="w-head">
<h1>${esc(p.question || 'Which need do we work on next?')}</h1>
<p class="status">Your decision: ${p.chosen ? `<b>${esc(p.chosen)}</b>` : '<b class="open">Open. You fill "Chosen opportunity" in the file.</b>'}</p>
<p>Drawn from <a href="/discovery/opportunity-comparison.md"><code>discovery/opportunity-comparison.md</code></a>, an assessment by an agent, not a decision${p.date ? `, data up to ${esc(p.date)}` : ''}. ${p.material ? `Material: ${code(p.material)}` : ''}</p>
</div>
<div class="goalrow">
<div class="node goal"><span class="kind">Business goal</span>${esc(p.outcome)}</div>
<div class="node branch"><span class="kind">KPI branch</span>${esc(p.branch)}</div>
</div>
<div class="drivers" style="--n:${p.drivers.length}">${p.drivers.map((d, i) => driverNode(d, i, bars[i])).join('')}</div>
<div class="cands" style="--n:${n}">${p.candidates.map((c, i) => candidateCard(c, p)).join('')}</div>
${intents.length ? `<div class="sols" style="--n:${n}" aria-label="Solution ideas">${cols.map((c) => `<div class="col">${c}</div>`).join('')}</div>` : ''}
<div class="legend" aria-label="Legend">
<span><i class="sw"></i>an opportunity file names this step</span>
<span><i class="sw d"></i>only assumed</span>
<span><i class="box" style="background:var(--well)"></i>well supported</span>
<span><i class="box" style="background:var(--partly)"></i>partly supported</span>
<span><i class="box" style="background:var(--un)"></i>unsupported</span>
<span><i class="box gapbox"></i>loss with no candidate</span>
${intents.length ? '<span><i class="sw s"></i>solution idea, green border: tested first</span>' : ''}
<span>Bar: how many of the people on a step go on</span>
</div>
<section class="decide" tabindex="0" data-kind="decision" data-view="decision" aria-label="What you decide">
<div class="q">${esc(p.question || 'Which need do we work on next?')}</div>
<div class="row"><b>Your decision</b><span class="${p.chosen ? '' : 'open'}">${p.chosen ? esc(p.chosen) : 'Open. You fill "Chosen opportunity" in the file.'}</span></div>
${p.chosen && p.flip ? `<div class="row"><b>We would switch if</b><span>${esc(p.flip)}</span></div>` : ''}
${p.favoured.text ? `<div class="row"><b>The comparison favours</b><span>${code(p.favoured.text)}</span></div>` : ''}
${p.firstTry.text ? `<div class="row"><b>Your first try</b><span>${esc(p.firstTry.text)}</span></div>` : ''}
${p.notReadable ? `<div class="row"><b>Not readable from today's data</b><span>${code(p.notReadable)}</span></div>` : ''}
${p.noCandidate ? `<div class="row"><b>No candidate</b><span>${code(p.noCandidate)}</span></div>` : ''}
${intents.length ? `<p>Solution ideas come from ${intents.map((i) => `<a href="/${esc(i.file)}"><code>${esc(i.file)}</code></a>`).join(', ')}.</p>` : ''}
<p>Every quote, the counter-evidence, the shortlist and the challenger are in <a href="/discovery/opportunity-comparison.md">the comparison file</a>. Read the challenger before you decide.</p>
</section>
</div></div>
<div id="veil"></div><div id="detail" role="dialog" aria-label="Candidate details"></div>
<nav aria-label="Jump to">
<a href="/discovery">Discovery</a><a href="/discovery/map">Map</a><span class="sep"></span>
<button type="button" data-v="overview">Overview<kbd>0</kbd></button><button type="button" data-v="funnel">Funnel<kbd>F</kbd></button><span class="sep"></span>
${p.candidates.map((c, i) => `<button type="button" data-v="${c.id}">${c.id}${i < 9 ? `<kbd>${i + 1}</kbd>` : ''}</button>`).join('')}<span class="sep"></span>
<button type="button" data-v="decision">Decision<kbd>D</kbd></button><span class="sep"></span>
<span class="help">← → next · ↑ ↓ level · Enter details · Esc back</span>
</nav>
<script>${CLIENT}</script></body></html>`;
}
