// /sources/<file>: one file from sources/ as numbered lines, read-only, so a quote on the evidence
// map can open the line it comes from. /sources/interviews/x.md#L49 highlights line 49 and scrolls
// it into view (the :target rule below, no script). /product/<file> and /site/<file> show files from
// product/ and site/ the same way, so a citation link in a discovery page opens its line
// (site/formats.html:22 as /site/formats.html#L22; the live page stays at /formats.html).
// Only regular files inside these folders are served.
import fs from 'node:fs';
import path from 'node:path';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A citation written as a Markdown link, "[sources/x.md:49](../../sources/x.md#L49)", reads as its
// text "sources/x.md:49". The views that parse artefacts call this first, so both forms parse alike.
export const linkText = (s) => String(s).replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, '$1');

// "sources/interviews/x.md:49" or "sources/interviews/x.md:49-51" -> "/sources/interviews/x.md#L49".
// Anything else (no line, not in sources/) gets no link.
export function sourceHref(where) {
  const m = String(where || '').trim().match(/^sources\/([A-Za-z0-9._\/-]+):(\d+)(?:-\d+)?$/);
  if (!m || m[1].split('/').some((p) => p === '..' || p === '.' || p === '')) return null;
  return `/sources/${m[1]}#L${m[2]}`;
}

const CSS = `
:root{--bg:#faf8f4;--fg:#22262b;--muted:#5b636c;--accent:#2f5d62;--line:#ddd8cf;--card:#fff;--hit:#fdf0c4}
@media (prefers-color-scheme:dark){:root{--bg:#1b1e21;--fg:#e8e6e1;--muted:#a3a8ad;--accent:#7fb3b8;--line:#33383d;--card:#23272b;--hit:#4a3f1c}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.45 system-ui,-apple-system,sans-serif}
header,main{max-width:64rem;margin:0 auto;padding:0 16px}
header{padding-top:1.5rem}
h1{margin:.2rem 0 .3rem;font-size:1.2rem;overflow-wrap:anywhere}
a{color:var(--accent)}
.lead{color:var(--muted);margin:0 0 1rem}
.lines{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:.5rem 0;margin-bottom:3rem;font:.85rem/1.5 ui-monospace,SFMono-Regular,Menlo,monospace}
.line{display:grid;grid-template-columns:3.5rem 1fr;scroll-margin-top:40vh}
.line a{color:var(--muted);text-align:right;padding-right:.8rem;text-decoration:none;user-select:none}
.line span{white-space:pre-wrap;overflow-wrap:anywhere;padding-right:.8rem}
.line:target{background:var(--hit);outline:2px solid var(--accent);outline-offset:-2px}
.line:target a{color:var(--fg);font-weight:700}
`;

function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>${CSS}</style></head><body><header><a href="/discovery">Discovery</a> · <a href="/discovery/map">Opportunity map</a></header><main>${body}</main></body></html>`;
}

const notFound = () => ({ status: 404, html: page('Not found', '<p>Not found. Only files inside <code>sources/</code>, <code>product/</code> and <code>site/</code> are shown here.</p>') });

// Returns { status, html } for a /sources path, or null if the path is not ours.
export const LINE_VIEWS = ['sources', 'product', 'site'];

export function sourcePage(root, pathname) {
  const base = LINE_VIEWS.find((d) => pathname.startsWith(`/${d}/`));
  if (!base) return null;
  let rel;
  try {
    rel = decodeURIComponent(pathname.slice(base.length + 2));
  } catch {
    return notFound();
  }
  if (!rel || rel.includes('\0') || rel.includes('\\')) return notFound();
  const dir = path.join(root, base);
  const file = path.resolve(dir, rel);
  if (!file.startsWith(dir + path.sep)) return notFound();
  let real;
  try {
    // A symlink inside sources/ must not lead outside it either.
    real = fs.realpathSync(file);
    if (!real.startsWith(fs.realpathSync(dir) + path.sep) || !fs.statSync(real).isFile()) return notFound();
  } catch {
    return notFound();
  }
  const shown = `${base}/` + path.relative(dir, file).split(path.sep).join('/');
  const lines = fs.readFileSync(real, 'utf8').replace(/\r/g, '').replace(/\n$/, '').split('\n');
  const body = lines.map((l, i) => `<div class="line" id="L${i + 1}"><a href="#L${i + 1}">${i + 1}</a><span>${esc(l) || ' '}</span></div>`).join('\n');
  return { status: 200, html: page(shown, `<h1><code>${esc(shown)}</code></h1><p class="lead">Read-only view of a file. The line a quote comes from is highlighted.</p><div class="lines">${body}</div>`) };
}
