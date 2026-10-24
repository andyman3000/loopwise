// Read-only view of discovery/ for humans: /discovery lists the artefacts, /discovery/<file>.md
// renders one. A "## Tree" section (KPI tree) is drawn as a tree. No dependencies.
import fs from 'node:fs';
import path from 'node:path';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s) {
  const parts = s.split(/(`[^`]+`)/g);
  return parts.map((p) => {
    if (/^`[^`]+`$/.test(p)) return `<code>${esc(p.slice(1, -1))}</code>`;
    return esc(p)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => /^(https?:|\/|\.|#)/.test(u) || !u.includes(':') ? `<a href="${u}">${t}</a>` : t);
  }).join('');
}

// Nested list items as a tree: [{ text, children }]
function parseList(lines) {
  const root = { children: [] };
  const stack = [{ indent: -1, node: root }];
  for (const line of lines) {
    const m = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (!m) {
      const last = stack[stack.length - 1].node;
      if (last !== root && line.trim()) last.text += ' ' + line.trim();
      continue;
    }
    const indent = m[1].replace(/\t/g, '    ').length;
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    const node = { text: m[3], ordered: /\d/.test(m[2]), children: [] };
    stack[stack.length - 1].node.children.push(node);
    stack.push({ indent, node });
  }
  return root.children;
}

function renderList(items) {
  if (!items.length) return '';
  const tag = items[0].ordered ? 'ol' : 'ul';
  return `<${tag}>${items.map((i) => `<li>${inline(i.text)}${renderList(i.children)}</li>`).join('')}</${tag}>`;
}

// ASCII tree (├── └──) as written by earlier versions of the kpi-tree skill.
function parseAsciiTree(lines) {
  const root = { children: [] };
  const stack = [{ depth: -1, node: root }];
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) continue;
    const g = line.search(/[├└]──/);
    if (g === -1 && stack.length === 1) { const node = { text: line.trim(), children: [] }; root.children.push(node); stack.push({ depth: 0, node }); continue; }
    if (g === -1) {
      const t = line.replace(/[│]/g, '').trim();
      const cur = stack[stack.length - 1].node;
      if (/^\[assumption:/i.test(t)) {
        const parent = stack.length > 2 ? stack[stack.length - 2].node : cur;
        parent.children.push({ text: 'Assumption: ' + t.replace(/^\[assumption:\s*/i, '').replace(/\]\s*/, ' ').trim(), children: [] });
      } else cur.text += ' ' + t;
      continue;
    }
    const depth = Math.floor(g / 4) + 1;
    while (stack.length > 1 && stack[stack.length - 1].depth >= depth) stack.pop();
    const node = { text: line.slice(g + 3).trim().replace(/\s{2,}/, ' · '), children: [] };
    stack[stack.length - 1].node.children.push(node);
    stack.push({ depth, node });
  }
  return root.children;
}

function treeNode(n, level) {
  const assumption = /^assumption:/i.test(n.text);
  const [label, ...rest] = n.text.split(/\s·\s|\s+measured:\s*/);
  const measured = n.text.match(/measured:\s*(.*)$/i);
  const cls = assumption ? 'assumption' : `level-${Math.min(level, 2)}`;
  const body = assumption
    ? `<span class="tag">assumption</span> ${inline(n.text.replace(/^assumption:\s*/i, ''))}`
    : `${inline(label.replace(/^(Business goal|Branch [A-Z]):\s*/, (m) => `${m}`))}${measured ? `<span class="measured">${inline('measured: ' + measured[1])}</span>` : ''}`;
  const kids = n.children.filter((c) => !/^assumption:/i.test(c.text));
  const notes = n.children.filter((c) => /^assumption:/i.test(c.text));
  return `<li><div class="node ${cls}">${body}</div>${notes.length ? `<div class="notes">${notes.map((a) => treeNode(a, level + 1).replace(/^<li>|<\/li>$/g, '')).join('')}</div>` : ''}${kids.length ? `<ul>${kids.map((k) => treeNode(k, level + 1)).join('')}</ul>` : ''}</li>`;
}

function renderTree(nodes) {
  return `<div class="tree"><ul>${nodes.map((n) => treeNode(n, 0)).join('')}</ul></div>`;
}

export function renderMarkdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let i = 0;
  let section = '';
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const body = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
      i++;
      out.push(section === 'tree' && body.some((l) => /[├└]──/.test(l)) ? renderTree(parseAsciiTree(body)) : `<pre><code>${esc(body.join('\n'))}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { section = h[2].trim().toLowerCase(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^\s*>/.test(line)) {
      const body = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) body.push(lines[i++].replace(/^\s*>\s?/, ''));
      out.push(`<blockquote>${body.map(inline).join('<br>')}</blockquote>`);
      continue;
    }
    if (/^\s*\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const [head, , ...body] = rows;
      out.push(`<table><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const body = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s+\S/.test(lines[i]) && body.length))) body.push(lines[i++]);
      const items = parseList(body);
      out.push(section === 'tree' ? renderTree(items) : renderList(items));
      continue;
    }
    if (!line.trim()) { i++; continue; }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*>|\s*\||\s*([-*]|\d+\.)\s+)/.test(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

const CSS = `
main{max-width:72rem}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:.95rem}
th,td{border:1px solid var(--line);padding:.4rem .6rem;text-align:left;vertical-align:top}
blockquote{margin:1rem 0;padding:.5rem 1rem;border-left:4px solid var(--accent);background:var(--card);color:var(--muted)}
pre{background:var(--card);border:1px solid var(--line);padding:1rem;overflow-x:auto;font-size:.85rem}
code{font-size:.9em}
.files li{margin:.25rem 0}
.tree{overflow-x:auto;padding:1rem 0}
.tree ul{display:flex;justify-content:center;gap:1rem;padding:1.25rem 0 0;margin:0;position:relative;list-style:none}
.tree>ul{padding-top:0}
.tree li{display:flex;flex-direction:column;align-items:center;position:relative;flex:1 1 0;min-width:11rem}
.tree li li::before{content:"";position:absolute;top:-1.25rem;left:50%;border-left:2px solid var(--line);height:1.25rem}
.tree ul ul::before{content:"";position:absolute;top:0;left:12%;right:12%;border-top:2px solid var(--line)}
.tree ul ul:has(>li:only-child)::before{display:none}
.tree li li li{min-width:9rem}
.tree li li ul{flex-direction:column;align-items:stretch;gap:.5rem}
.tree li li ul::before{display:none}
.tree li li li::before{display:none}
.node{background:var(--card);border:2px solid var(--line);border-radius:8px;padding:.5rem .75rem;font-size:.9rem;text-align:center;width:100%}
.node.level-0{border-color:var(--accent);font-weight:700;font-size:1rem;max-width:28rem}
.node.level-1{border-color:var(--accent)}
.node.level-2{text-align:left}
.measured{display:block;color:var(--muted);font-size:.8rem;margin-top:.25rem}
.notes{display:flex;flex-direction:column;gap:.35rem;margin-top:.5rem;width:100%}
.node.assumption{border-style:dashed;text-align:left;font-size:.8rem;color:var(--muted);background:transparent}
.tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:var(--accent);font-weight:700}
`;

function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="/styles.css"><style>${CSS}</style></head><body><header class="site-header"><a class="brand" href="/discovery">Discovery</a><nav aria-label="Discovery"><a href="/discovery">All artefacts</a><a href="/">Website</a></nav></header><main>${body}</main></body></html>`;
}

function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return listFiles(p, base);
    return e.name.endsWith('.md') ? [path.relative(base, p).split(path.sep).join('/')] : [];
  }).sort();
}

// Returns { status, html } for a /discovery path, or null if the path is not ours.
export function discoveryPage(root, pathname) {
  if (pathname !== '/discovery' && !pathname.startsWith('/discovery/')) return null;
  const dir = path.join(root, 'discovery');
  const rel = decodeURIComponent(pathname.slice('/discovery'.length).replace(/^\//, ''));
  if (!rel) {
    const files = listFiles(dir);
    const body = files.length
      ? `<ul class="files">${files.map((f) => `<li><a href="/discovery/${f}">${esc(f)}</a></li>`).join('')}</ul>`
      : '<p>No artefacts yet. Run the first skill, then reload.</p>';
    return { status: 200, html: page('Discovery', `<h1>Discovery artefacts</h1><p class="lead">Read-only view of <code>discovery/</code>. Edit the Markdown files themselves.</p>${body}`) };
  }
  if (!rel.endsWith('.md') || rel.includes('\0')) return { status: 404, html: page('Not found', '<p>Not found.</p>') };
  const file = path.resolve(dir, rel);
  if (!file.startsWith(dir + path.sep) || !fs.existsSync(file)) return { status: 404, html: page('Not found', '<p>Not found.</p>') };
  const md = fs.readFileSync(file, 'utf8');
  return { status: 200, html: page(rel, `<p><a href="/discovery">All artefacts</a> · <code>discovery/${esc(rel)}</code></p>${renderMarkdown(md)}`) };
}
