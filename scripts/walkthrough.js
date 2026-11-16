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
const frames=[...document.querySelectorAll('iframe')],dots=[...document.querySelectorAll('.dot')];
const head=document.getElementById('now'),prev=document.getElementById('prev'),next=document.getElementById('next');let cur=0;
function show(i){cur=Math.max(0,Math.min(frames.length-1,i));
frames.forEach((f,k)=>f.classList.toggle('on',k===cur));dots.forEach((b,k)=>{b.setAttribute('aria-current',k===cur?'step':'false');b.classList.toggle('past',k<cur)});
head.innerHTML=dots[cur].dataset.head;prev.disabled=cur===0;next.disabled=cur===frames.length-1;
try{history.replaceState(null,'','#'+(cur+1))}catch(e){}}
dots.forEach((b,k)=>b.addEventListener('click',()=>show(k)));
prev.addEventListener('click',()=>show(cur-1));next.addEventListener('click',()=>show(cur+1));
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
header{padding:10px 20px;border-bottom:2px solid var(--line);background:var(--card);display:flex;flex-direction:column;gap:10px}
.bar{display:flex;align-items:center;gap:14px;min-width:0}
.arrow{font:inherit;font-size:26px;line-height:1;width:48px;height:48px;flex:none;border-radius:50%;border:2px solid var(--accent);background:var(--card);color:var(--accent);cursor:pointer}
.arrow:hover:not(:disabled){background:var(--accent);color:var(--accent-fg)}
.arrow:disabled{opacity:.3;cursor:default}
#now{display:flex;flex-direction:column;min-width:0}
#now .top{display:flex;align-items:baseline;gap:12px;min-width:0}
#now .n{font-size:20px;font-weight:700;color:var(--muted);white-space:nowrap}
#now .grp{font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);white-space:nowrap}
#now h1{font-size:30px;line-height:1.15;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#now .sub{font-size:17px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.steps{display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center}
.steps .seg{display:flex;gap:4px;align-items:center}
.steps .seg span{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);white-space:nowrap;margin-right:4px}
.dot{font:inherit;font-size:13px;font-weight:700;width:30px;height:30px;border-radius:50%;border:2px solid var(--line);background:var(--bg);color:var(--muted);cursor:pointer;padding:0}
.dot.past{border-color:var(--accent);color:var(--accent)}
.dot[aria-current=step]{background:var(--accent);border-color:var(--accent);color:var(--accent-fg);transform:scale(1.15)}
.dot:focus-visible,.arrow:focus-visible{outline:3px solid var(--fg);outline-offset:2px}
main{flex:1;position:relative}
iframe{position:absolute;inset:0;width:100%;height:100%;border:0;visibility:hidden}
iframe.on{visibility:visible}`;

function indexPage(steps) {
  // The header shows one step at a time: back, forward, where we are, what this step did.
  // Below it one numbered dot per step, grouped: the shared run first, then one group per variant.
  const segs = [];
  steps.forEach((s, i) => {
    const group = s.group || s.variant || 'The run';
    if (!segs.length || segs[segs.length - 1].group !== group) segs.push({ group, dots: [] });
    const sub = [s.title && s.title !== s.label ? s.title : '', s.skill && s.skill !== 'human' ? `skill: ${s.skill}` : '', s.same ? 'no change on the tree' : ''].filter(Boolean).join(' · ');
    const head = `<div class="top"><span class="n">${i + 1} / ${steps.length}</span><span class="grp">${esc(group)}</span><h1>${esc(s.label)}</h1></div>`
      + (sub ? `<div class="sub">${esc(sub)}</div>` : '');
    segs[segs.length - 1].dots.push(`<button type="button" class="dot" data-head="${esc(head)}" title="${esc(`${i + 1}. ${s.label}`)}" aria-label="Step ${i + 1}: ${esc(s.label)}">${i + 1}</button>`);
  });
  const nav = segs.map((g) => `<div class="seg"><span>${esc(g.group)}</span>${g.dots.join('')}</div>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Discovery walkthrough</title><style>${CSS}</style></head><body>
<header><div class="bar"><button type="button" class="arrow" id="prev" aria-label="Previous step">‹</button><button type="button" class="arrow" id="next" aria-label="Next step">›</button><div id="now" aria-live="polite"></div></div>
<nav class="steps" aria-label="Steps">${nav}</nav></header>
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
