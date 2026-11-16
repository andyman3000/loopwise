// Draws the discovery run step by step: for each step in scripts/walkthrough-steps.json it unpacks
// that commit into a temporary folder (git archive), renders the view with today's lib/ against
// that folder, and writes a static snapshot to walkthrough/step-NN.html. walkthrough/index.html
// holds one button per step; /discovery/walkthrough serves it. The temporary folders are removed
// in the same run, also when a step fails. Usage: npm run walkthrough
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { treePage } from '../lib/opportunity-tree.js';
import { mapPage } from '../lib/opportunity-map.js';
import { drawPage } from './draw-kpi-tree.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'walkthrough');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

const VIEWS = {
  kpi: (dir) => drawPage(fs.readFileSync(path.join(dir, 'discovery', 'kpi-tree.md'), 'utf8')),
  map: (dir) => mapPage(dir),
  tree: (dir) => treePage(dir),
};
// Pages that render but show only the "nothing to draw" text count as not rendered.
const EMPTY = /No comparison yet|has no "Tree" or "Candidates" section/;

function snapshot(step) {
  const sha = git('rev-parse', '--verify', `${step.commit}^{commit}`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-walkthrough-'));
  try {
    const tar = path.join(tmp, 'tree.tar');
    git('archive', '--format=tar', '-o', tar, sha);
    const dir = path.join(tmp, 'root');
    fs.mkdirSync(dir);
    execFileSync('tar', ['-xf', tar, '-C', dir]);
    const html = (VIEWS[step.view || 'tree'] || VIEWS.tree)(dir);
    if (EMPTY.test(html)) throw new Error('the page shows no tree for this commit');
    // The files this step wrote, so the header can name them even where the tree draws no mark.
    const wrote = git('diff-tree', '--root', '--no-commit-id', '--name-only', '-r', sha).split('\n')
      .filter((f) => (f.startsWith('discovery/') && !f.endsWith('.html')) || f.startsWith('site/variants/'));
    return { sha, html, wrote, date: git('show', '-s', '--format=%ad', '--date=format:%Y-%m-%d %H:%M', sha) };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// Inside a snapshot, PageUp/PageDown (what a presenter clicker sends) still switch steps; the arrow
// keys stay with the tree there once someone clicks into it.
const CLIENT = `
const frames=[...document.querySelectorAll('iframe')],btns=[...document.querySelectorAll('.steps button')];
const head=document.getElementById('now');let cur=0;
function show(i){cur=Math.max(0,Math.min(frames.length-1,i));
frames.forEach((f,k)=>f.classList.toggle('on',k===cur));btns.forEach((b,k)=>b.setAttribute('aria-current',k===cur?'step':'false'));
head.innerHTML=btns[cur].dataset.head;btns[cur].scrollIntoView({block:'nearest',inline:'nearest'});
try{history.replaceState(null,'','#'+(cur+1))}catch(e){}}
btns.forEach((b,k)=>b.addEventListener('click',()=>show(k)));
function key(e){if(e.key==='PageDown')return show(cur+1),e.preventDefault();if(e.key==='PageUp')return show(cur-1),e.preventDefault();
if(e.currentTarget!==window)return;if(e.key==='ArrowRight')show(cur+1),e.preventDefault();else if(e.key==='ArrowLeft')show(cur-1),e.preventDefault();
else if(e.key==='Home')show(0);else if(e.key==='End')show(frames.length-1);}
window.addEventListener('keydown',key);
frames.forEach((f)=>f.addEventListener('load',()=>{try{f.contentWindow.addEventListener('keydown',key)}catch(e){}}));
show((parseInt(location.hash.slice(1),10)||1)-1);`;

const CSS = `
:root{--bg:#faf8f4;--fg:#22262b;--muted:#5b636c;--accent:#2f5d62;--accent-fg:#fff;--line:#c9c3b8;--card:#fff;--chip:#efebe4}
@media (prefers-color-scheme:dark){:root{--bg:#1b1e21;--fg:#e8e6e1;--muted:#a3a8ad;--accent:#7fb3b8;--accent-fg:#10201f;--line:#4a5056;--card:#23272b;--chip:#2c3135}}
*{box-sizing:border-box}html,body{margin:0;height:100%}
body{background:var(--bg);color:var(--fg);font:18px/1.35 system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;overflow:hidden}
header{padding:10px 20px 8px;border-bottom:2px solid var(--line);background:var(--card)}
#now{display:flex;align-items:baseline;gap:6px 16px;flex-wrap:wrap;margin-bottom:8px}
#now .n{font-size:22px;font-weight:700;color:var(--muted)}
#now h1{font-size:30px;line-height:1.15;margin:0}
#now .meta{font-size:17px;color:var(--muted)}
#now .wrote{flex-basis:100%;font-size:16px;color:var(--muted)}
#now .wrote b{color:var(--fg);font-weight:600}
#now code{font-size:16px;background:var(--chip);padding:1px 6px;border-radius:4px}
.steps{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center}
.steps .grp{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.steps .var{font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);white-space:nowrap;margin-right:2px}
.steps button{font:inherit;font-size:17px;font-weight:600;background:var(--bg);color:var(--fg);border:2px solid var(--line);border-radius:10px;
padding:6px 10px;cursor:pointer;white-space:nowrap;display:flex;gap:8px;align-items:center}
.steps button b{font-size:15px;color:var(--muted)}
.steps button[aria-current=step]{background:var(--accent);color:var(--accent-fg);border-color:var(--accent)}
.steps button[aria-current=step] b{color:var(--accent-fg)}
.steps button:focus-visible{outline:3px solid var(--fg);outline-offset:2px}
main{flex:1;position:relative}
iframe{position:absolute;inset:0;width:100%;height:100%;border:0;visibility:hidden}
iframe.on{visibility:visible}
.help{font-size:14px;color:var(--muted);margin-top:6px}`;

function indexPage(steps) {
  // One row per group of consecutive steps: the shared run first, then one row per variant.
  const rows = [];
  steps.forEach((s, i) => {
    const group = s.group || s.variant || 'The run';
    if (!rows.length || rows[rows.length - 1].group !== group) rows.push({ group, buttons: [] });
    const head = `<span class="n">${i + 1} / ${steps.length}</span><h1>${esc((s.variant ? `${s.variant}: ` : '') + (s.title || s.label))}</h1>`
      + `<span class="meta">${s.skill ? `skill <code>${esc(s.skill)}</code> · ` : ''}commit <code>${esc(s.sha.slice(0, 7))}</code> · ${esc(s.date)}</span>`
      + `<span class="wrote">${s.wrote.length ? `Wrote ${s.wrote.map((f) => `<code>${esc(f)}</code>`).join(' ')}` : ''}`
      + `${s.same ? ` · <b>The tree looks as in step ${s.same}: it draws no mark for this file.</b>` : ''}</span>`;
    rows[rows.length - 1].buttons.push(`<button type="button" data-head="${esc(head)}"><b>${i + 1}</b>${esc(s.label)}</button>`);
  });
  const buttons = rows.map((r) => `<div class="grp"><span class="var">${esc(r.group)}</span>${r.buttons.join('')}</div>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Discovery walkthrough</title><style>${CSS}</style></head><body>
<header><div id="now" aria-live="polite"></div><nav class="steps" aria-label="Steps">${buttons}</nav>
<div class="help">← → or Page Up / Page Down: step · click into the tree to zoom, as on /discovery/tree</div></header>
<main>${steps.map((s, i) => `<iframe src="/discovery/walkthrough/${esc(s.file)}" title="Step ${i + 1}: ${esc(s.label)}"></iframe>`).join('')}</main>
<script>${CLIENT}</script></body></html>`;
}

const { steps } = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'walkthrough-steps.json'), 'utf8'));
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const done = [];
const failed = [];
steps.forEach((step, i) => {
  const file = `step-${String(i + 1).padStart(2, '0')}.html`;
  try {
    const { sha, html, date, wrote } = snapshot(step);
    fs.writeFileSync(path.join(OUT, file), html);
    const prev = done[done.length - 1];
    done.push({ ...step, sha, date, wrote, file, same: prev && prev.html === html ? done.length : 0, html });
    console.log(`${i + 1}. ${step.variant ? step.variant + ': ' : ''}${step.label} (${step.commit}) -> walkthrough/${file}`);
  } catch (e) {
    failed.push(`${i + 1}. ${step.label} (${step.commit}): ${e.message.split('\n')[0]}`);
  }
});
fs.writeFileSync(path.join(OUT, 'index.html'), indexPage(done));
console.log(`${done.length} of ${steps.length} steps drawn; open /discovery/walkthrough`);
if (failed.length) {
  console.error(`Not drawn:\n${failed.join('\n')}`);
  process.exitCode = 1;
}
