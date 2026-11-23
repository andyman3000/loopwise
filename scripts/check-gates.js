// Release gates on hardened variants, run with `npm run check` (with --with-discovery).
// The gates and their owners are listed in gates/gates.json; each gate's rule is a file in
// gates/policies/. Only site/hardened/<variant>/ is scanned. Prototypes in site/variants/ are not:
// in build to learn the rule leads and no gate blocks.
//
//   node scripts/check-gates.js                    gates only, readable output
//   node scripts/check-gates.js --json             gates only, the result as JSON
//   node scripts/check-gates.js --with-discovery   the discovery check first, then the gates
//   node scripts/check-gates.js <root>             another repo root (tests use temp folders)
//
// Exit code 1 if a gate fails (or the discovery check fails). A soft gate passes as "waived" when
// its owner wrote a valid waiver in discovery/decisions/. A waiver for a hard gate is ignored and
// the output says so. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DESIGN_EXT = new Set(['.html', '.htm', '.css', '.js', '.mjs']);
const TEXT_EXT = new Set([...DESIGN_EXT, '.json', '.svg', '.txt', '.md', '.xml', '.webmanifest']);

// ---------------------------------------------------------------- small helpers

const blank = (s) => s.replace(/[^\n]/g, ' ');
const rel = (root, f) => path.relative(root, f).split(path.sep).join('/');

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return starts;
}

function lineAt(starts, index) {
  let lo = 0, hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= index) lo = mid; else hi = mid - 1;
  }
  return lo + 1;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

// ---------------------------------------------------------------- CSS reading

// Comments, string contents and url() contents become spaces. Lengths and newlines stay, so an
// index in the masked text is the same index in the original.
export function maskCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(["'])(?:\\.|(?!\1)[^\\\n])*\1/g, (m) => m[0] + blank(m.slice(1, -1)) + m[m.length - 1])
    .replace(/url\(([^)]*)\)/gi, (m, inner) => `url(${blank(inner)})`);
}

// Innermost rule blocks: selector, body and their indexes. A block inside @media is found as well;
// the @media prelude itself is never read as a selector.
function* cssRules(masked) {
  for (const m of masked.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
    const raw = m[1].split(';').pop();
    const lead = m[1].length - raw.length + (raw.length - raw.trimStart().length);
    yield { selector: raw.trim(), selectorIndex: m.index + lead, body: m[2], bodyIndex: m.index + m[1].length + 1 };
  }
}

function* declarations(body, offset) {
  let pos = 0;
  for (const part of body.split(';')) {
    const colon = part.indexOf(':');
    if (colon > 0) {
      const prop = part.slice(0, colon).trim().toLowerCase();
      if (/^[-\w]+$/.test(prop)) yield { prop, value: part.slice(colon + 1), valueIndex: offset + pos + colon + 1 };
    }
    pos += part.length + 1;
  }
}

// The design system: every custom property on :root and every class in a selector of site/styles.css.
export function readDesignSystem(root) {
  const file = path.join(root, 'site', 'styles.css');
  if (!fs.existsSync(file)) return { found: false, tokens: new Set(), classes: new Set() };
  const masked = maskCss(fs.readFileSync(file, 'utf8'));
  const tokens = new Set();
  const classes = new Set();
  for (const r of cssRules(masked)) {
    if (/:root\b/.test(r.selector)) for (const m of r.body.matchAll(/(--[\w-]+)\s*:/g)) tokens.add(m[1]);
    for (const m of r.selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) classes.add(m[1]);
  }
  return { found: true, tokens, classes };
}

// ---------------------------------------------------------------- design gate

const NAMED = new Set(('aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue '
  + 'blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan '
  + 'darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen '
  + 'darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey '
  + 'darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite '
  + 'forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink '
  + 'indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral '
  + 'lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen '
  + 'lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta '
  + 'maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue '
  + 'mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin '
  + 'navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen '
  + 'paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red '
  + 'rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue '
  + 'slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white '
  + 'whitesmoke yellow yellowgreen').split(' '));
// Properties whose words are names, not colours (a font, an animation, a grid area).
const NO_NAMED = /^(font|content|animation|transition|will-change|counter-|grid-|list-style-type|quotes|view-transition-name)/;
const SPACING = /^(margin|padding|gap|row-gap|column-gap|grid-gap|grid-row-gap|grid-column-gap|inset|scroll-margin|scroll-padding)(-|$)/;
const VISUAL = /^(background|border|font|box-shadow)(-|$)|^color$/;
const CONTROLS = new Set(['button', 'input', 'select', 'textarea']);
const COLOUR_ATTRS = ['fill', 'stroke', 'color', 'bgcolor', 'stop-color', 'flood-color', 'lighting-color'];
// The design system's button class (contract: `button`, optionally with `secondary`).
const BUTTON_CLASS = 'button';

function colours(value, prop, { named = true } = {}) {
  const out = [];
  for (const m of value.matchAll(/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])/gi)) out.push(m);
  for (const m of value.matchAll(/\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^)]*\)?/gi)) out.push(m);
  if (named && !(prop && NO_NAMED.test(prop))) {
    for (const m of value.matchAll(/(?<![\w-])[a-z]+(?![\w(-])/gi)) if (NAMED.has(m[0].toLowerCase())) out.push(m);
  }
  return out.sort((a, b) => a.index - b.index);
}

// Splits a selector list at top-level commas and returns the last compound of each selector:
// the element the rule styles.
function subjects(selector) {
  const parts = [];
  let depth = 0, cur = '';
  for (const ch of selector) {
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  return parts.map((p) => p.replace(/:(?:not|has)\([^()]*\)/gi, '').trim().split(/\s*[>+~]\s*|\s+/).filter(Boolean).pop() || '');
}

function targetsComponent(compound, ds) {
  const element = (compound.match(/^([a-zA-Z][\w-]*)/) || [])[1];
  if (element && CONTROLS.has(element.toLowerCase())) return true;
  return [...compound.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].some((m) => ds.classes.has(m[1]));
}

// Checks declarations (masked CSS) for colours, spacing and unknown tokens. With `restyle`, the
// declarations belong to a design system component or a native control: visual properties are
// collected and reported once, at restyle.index.
function scanDeclarations(body, offset, ctx, restyle = null) {
  const visual = [];
  for (const d of declarations(body, offset)) {
    for (const m of colours(d.value, d.prop)) ctx.add(d.valueIndex + m.index, 'design/hard-coded-colour', m[0]);
    if (SPACING.test(d.prop)) {
      for (const m of d.value.matchAll(/(?<![\w.-])-?(\d*\.?\d+)(px|rem|em)(?![\w-])/gi)) {
        if (Number(m[1]) !== 0) ctx.add(d.valueIndex + m.index, 'design/hard-coded-spacing', `${d.prop}: ${m[0]}`);
      }
      for (const m of d.value.matchAll(/var\(\s*(--[\w-]+)/g)) {
        if (!ctx.ds.tokens.has(m[1])) ctx.add(d.valueIndex + m.index, 'design/unknown-token', `${d.prop}: ${m[1]}`);
      }
    }
    if (restyle && VISUAL.test(d.prop) && !visual.includes(d.prop)) visual.push(d.prop);
  }
  if (visual.length) ctx.add(restyle.index, 'design/component-outside-system', `${restyle.label}: ${visual.join(', ')}`);
}

function scanCss(text, offset, ctx) {
  for (const r of cssRules(maskCss(text))) {
    const hit = r.selector && !r.selector.startsWith('@') && subjects(r.selector).some((s) => targetsComponent(s, ctx.ds));
    scanDeclarations(r.body, offset + r.bodyIndex, ctx, hit ? { index: offset + r.selectorIndex, label: r.selector.replace(/\s+/g, ' ') } : null);
  }
}

const TAG = /<([a-zA-Z][\w-]*)((?:\s+[^\s=/>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/g;
const ATTR = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

function scanTags(text, offset, ctx) {
  for (const t of text.matchAll(TAG)) {
    const name = t[1].toLowerCase();
    const base = offset + t.index + 1 + t[1].length;
    const attrs = {};
    for (const a of (t[2] || '').matchAll(ATTR)) {
      const value = a[2] ?? a[3] ?? a[4] ?? '';
      const eq = a[0].indexOf('=');
      const at = eq < 0 ? a.index : a.index + a[0].indexOf(value, eq);
      attrs[a[1].toLowerCase()] = { value, index: base + at };
    }
    const classes = (attrs.class?.value || '').split(/\s+/).filter(Boolean);
    const tagLabel = `<${name}${classes.length ? ` class="${classes.join(' ')}"` : ''}>`;
    if (attrs.style) {
      const component = CONTROLS.has(name) || classes.some((c) => ctx.ds.classes.has(c));
      scanDeclarations(maskCss(attrs.style.value), attrs.style.index, ctx,
        component ? { index: attrs.style.index, label: `style on ${tagLabel}` } : null);
    }
    for (const a of COLOUR_ATTRS) {
      if (attrs[a]) for (const m of colours(attrs[a].value, a)) ctx.add(attrs[a].index + m.index, 'design/hard-coded-colour', m[0]);
    }
    const type = (attrs.type?.value || '').toLowerCase();
    const buttonLike = name === 'button' || (name === 'input' && (type === 'submit' || type === 'button'))
      || (name === 'a' && classes.some((c) => /btn|button|cta/i.test(c)));
    if (buttonLike && !classes.includes(BUTTON_CLASS)) ctx.add(offset + t.index, 'design/component-outside-system', `${tagLabel} without class "${BUTTON_CLASS}"`);
  }
}

// String literals of a script, comments skipped. Good enough for page scripts; regex literals and
// nested template literals may be read loosely.
function jsStrings(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { const e = src.indexOf('\n', i); i = e < 0 ? src.length : e; continue; }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? src.length : e + 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < src.length && src[j] !== c) {
        if (src[j] === '\\') j++;
        else if (c !== '`' && src[j] === '\n') break;
        j++;
      }
      out.push({ start: i + 1, text: src.slice(i + 1, j) });
      i = j + 1;
      continue;
    }
    i++;
  }
  return out;
}

const SELECTOR_CALL = /(?:querySelector(?:All)?|getElementById|closest|matches)\(\s*$/;

function scanJs(src, offset, ctx) {
  for (const s of jsStrings(src)) {
    const selectorArg = SELECTOR_CALL.test(src.slice(Math.max(0, s.start - 40), s.start - 1));
    if (!selectorArg) for (const m of colours(s.text, null, { named: false })) ctx.add(offset + s.start + m.index, 'design/hard-coded-colour', m[0]);
    if (s.text.includes('<')) scanTags(s.text, offset + s.start, ctx);
  }
  const at = (m, value) => offset + m.index + m[0].length - 1 - value.length;
  for (const m of src.matchAll(/\.style\.([a-zA-Z]+)\s*=\s*(["'`])((?:\\.|(?!\2)[^\\])*)\2/g)) {
    const prop = m[1].replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    if (prop === 'css-text') scanDeclarations(maskCss(m[3]), at(m, m[3]), ctx);
    else scanDeclarations(`${prop}:${m[3]}`, at(m, m[3]) - prop.length - 1, ctx);
  }
  for (const m of src.matchAll(/\.style\.setProperty\(\s*(["'])([\w-]+)\1\s*,\s*(["'`])((?:\\.|(?!\3)[^\\])*)\3/g)) {
    scanDeclarations(`${m[2]}:${m[4]}`, at(m, m[4]) - m[2].length - 1, ctx);
  }
}

function scanHtml(text, ctx) {
  const jobs = [];
  let masked = text.replace(/<!--[\s\S]*?-->/g, blank);
  masked = masked.replace(/(<(style|script)\b[^>]*>)([\s\S]*?)(<\/\2\s*>)/gi, (m, open, kind, body, close, index) => {
    jobs.push({ kind: kind.toLowerCase(), body: text.slice(index + open.length, index + open.length + body.length), offset: index + open.length });
    return open + blank(body) + close;
  });
  scanTags(masked, 0, ctx);
  for (const j of jobs) (j.kind === 'style' ? scanCss : scanJs)(j.body, j.offset, ctx);
}

function designFindings(root, files, ds) {
  const out = [];
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!DESIGN_EXT.has(ext)) continue;
    const text = fs.readFileSync(f, 'utf8');
    const starts = lineStarts(text);
    const seen = new Set();
    const ctx = {
      ds,
      add(index, rule, match) {
        const line = lineAt(starts, index);
        const key = `${line}|${rule}|${match}`;
        if (seen.has(key)) return;
        seen.add(key);
        out.push({ file: rel(root, f), line, rule, match });
      },
    };
    if (ext === '.css') scanCss(text, 0, ctx);
    else if (ext === '.js' || ext === '.mjs') scanJs(text, 0, ctx);
    else scanHtml(text, ctx);
  }
  return out.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

// ---------------------------------------------------------------- legal gate

const CUR_BEFORE = '(?:[€$£]|\\b(?:EUR|USD|GBP|CHF|euros?|dollars?|francs?)(?![a-z]))';
const CUR_AFTER = '(?:[€$£]|(?:EUR|USD|GBP|CHF|euros?|dollars?|francs?)(?![a-z]))';
const NUM = "(?:\\d{1,3}(?:[.,'\\u00a0\\u202f]\\d{3})+(?:[.,]\\d{1,2})?|\\d+(?:[.,]\\d{1,2})?)(?:[.,]-)?(?:\\s?k\\b)?";
const UNIT = '(?:participant|person|head|day|seat|attendee|team|group|session|workshop|hour)s?\\b';
const PRICE_WORD = '(?:from|only|just|starting at|starts at|as low as|priced at|prices? (?:from|at|of|is)|price|costs?|fees? (?:of|is)|fees?|budget of|budget|pay)';
const PRICE_RULES = [
  ['legal/per-unit-amount', new RegExp(`(?:${CUR_BEFORE}\\s?)?(?<![\\w.,])(${NUM})(?:\\s?${CUR_AFTER})?\\s*(?:per\\s+|/\\s*)${UNIT}`, 'gi')],
  ['legal/currency-amount', new RegExp(`${CUR_BEFORE}\\s?(${NUM})|(?<![\\w.,])(${NUM})\\s?${CUR_AFTER}`, 'gi')],
  ['legal/price-word-amount', new RegExp(`\\b${PRICE_WORD}\\s*:?\\s*(?<![\\w.,])(${NUM})(?![\\d])`, 'gi')],
];
const CURRENCY = new RegExp(`${CUR_BEFORE}|${CUR_AFTER}`, 'i');
// What may follow a number after a price word and makes it a count, a time or a date.
const NOT_AN_AMOUNT = /^\s*(?:%|:\d|[-/.]\d|(?:people|persons?|participants?|attendees?|seats?|teams?|groups?|members?|employees?|staff|weeks?|days?|hours?|minutes?|mins?|months?|years?|sessions?|workshops?|formats?|steps?|modules?|companies|customers|buyers|inquiries|times|pages?|words?|characters?)\b)/i;

function amountLike(num) {
  if (/^0/.test(num)) return false;
  if (/\d[.,'  ]\d{3}(?!\d)/.test(num)) return true;
  return (num.match(/^\d+/) || [''])[0].length >= 3;
}

function decodeEntities(text) {
  return text.replace(/&(?:euro|#8364|#x20ac);/gi, '€').replace(/&(?:pound|#163|#xa3);/gi, '£')
    .replace(/&(?:dollar|#36|#x24);/gi, '$').replace(/&(?:nbsp|#160|#xa0);/gi, ' ');
}

export function findPrices(raw) {
  const text = decodeEntities(raw);
  const hits = [];
  for (const [rule, re] of PRICE_RULES) {
    for (const m of text.matchAll(re)) {
      const num = (m[1] || m[2] || '').trim();
      const end = m.index + m[0].length;
      if (rule === 'legal/per-unit-amount' && !CURRENCY.test(m[0]) && !amountLike(num)) continue;
      if (rule === 'legal/currency-amount' && m[0].startsWith('$') && /^["'`$}]/.test(text.slice(end))) continue;
      if (rule === 'legal/price-word-amount' && (!amountLike(num) || /^(19|20)\d\d$/.test(num) || NOT_AN_AMOUNT.test(text.slice(end)))) continue;
      if (hits.some((h) => m.index < h.end && end > h.index)) continue;
      hits.push({ index: m.index, end, rule, match: m[0].replace(/\s+/g, ' ').trim() });
    }
  }
  const starts = lineStarts(text);
  return hits.sort((a, b) => a.index - b.index).map((h) => ({ line: lineAt(starts, h.index), rule: h.rule, match: h.match }));
}

function legalFindings(root, files) {
  const out = [];
  for (const f of files) {
    if (!TEXT_EXT.has(path.extname(f).toLowerCase())) continue;
    for (const h of findPrices(fs.readFileSync(f, 'utf8'))) out.push({ file: rel(root, f), ...h });
  }
  return out;
}

// ---------------------------------------------------------------- validation (entry)

// A launch decision: a file in discovery/decisions/ whose name contains "launch", with the lines
// Variant, Decision: launch, Decided by (a person), Role: product lead, Date, Reason.
const LAUNCH_FIELD = /^(variant|decision|decided by|role|date|reason)\s*:\s*(.*)$/i;
const NOT_A_PERSON = /\b(claude|agent|assistant|ai|bot)\b/i;

export function readLaunchDecisions(root) {
  const dir = path.join(root, 'discovery', 'decisions');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((n) => /launch/i.test(n) && n.endsWith('.md')).sort().map((n) => {
    const fields = {};
    for (const raw of fs.readFileSync(path.join(dir, n), 'utf8').split('\n')) {
      const line = raw.replace(/\*\*|`/g, '').replace(/^\s*(?:[-*>]\s+)*/, '').trim();
      const m = line.match(LAUNCH_FIELD);
      if (m && !(m[1].toLowerCase() in fields)) fields[m[1].toLowerCase()] = m[2].trim();
    }
    return { file: `discovery/decisions/${n}`, variant: fields.variant || '', decision: (fields.decision || '').toLowerCase(),
      decidedBy: fields['decided by'] || '', role: (fields.role || '').toLowerCase(), date: fields.date || '', reason: fields.reason || '' };
  });
}

export function launchProblem(d) {
  if (d.decision !== 'launch') return `it does not say "Decision: launch" (it says "${d.decision || 'nothing'}")`;
  if (!d.decidedBy || /^<.*>$/.test(d.decidedBy) || NOT_A_PERSON.test(d.decidedBy)) return 'Decided by names no person; an agent never decides a launch';
  if (d.role !== 'product lead') return `its role is "${d.role || 'missing'}"; the product lead decides a launch (Role: product lead)`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) return 'it has no date as YYYY-MM-DD';
  if (!d.reason || /^<.*>$/.test(d.reason)) return 'it gives no reason (Reason: ...)';
  return null;
}

// Findings for one variant: none if a valid launch decision exists.
export function validationFindings(root, variant) {
  const mine = readLaunchDecisions(root).filter((d) => d.variant === variant);
  if (mine.some((d) => !launchProblem(d))) return [];
  if (!mine.length) return [{ file: 'discovery/decisions/', line: null, rule: 'validation/no-launch-decision', match: `no launch decision for ${variant}` }];
  return mine.map((d) => ({ file: d.file, line: null, rule: 'validation/launch-decision-incomplete', match: launchProblem(d) }));
}

const DETECTORS = {
  validation: (root, v) => validationFindings(root, v.name),
  design: (root, v, ds) => {
    const found = designFindings(root, v.files, ds);
    if (!ds.found) found.unshift({ file: 'site/styles.css', line: 1, rule: 'design/no-design-system', match: 'site/styles.css not found' });
    return found;
  },
  legal: (root, v) => legalFindings(root, v.files),
};

// ---------------------------------------------------------------- waivers

const FIELD = /^(gate|variant|owner role|decided by|date|reason)\s*:\s*(.*)$/i;

export function readWaivers(root) {
  const dir = path.join(root, 'discovery', 'decisions');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((n) => /waiver/i.test(n) && n.endsWith('.md')).sort().map((n) => {
    const fields = {};
    const prose = [];
    for (const raw of fs.readFileSync(path.join(dir, n), 'utf8').split('\n')) {
      const line = raw.replace(/\*\*|`/g, '').replace(/^\s*(?:[-*>]\s+)*/, '').trim();
      const m = line.match(FIELD);
      if (m && !(m[1].toLowerCase() in fields)) fields[m[1].toLowerCase()] = m[2].trim();
      else if (line && !line.startsWith('#')) prose.push(line);
    }
    return {
      file: `discovery/decisions/${n}`,
      gate: (fields.gate || '').toLowerCase(),
      variant: fields.variant || '',
      ownerRole: (fields['owner role'] || '').toLowerCase(),
      decidedBy: fields['decided by'] || '',
      date: fields.date || '',
      reason: fields.reason || prose.join(' '),
    };
  });
}

function waiverProblem(w, gate) {
  if (!w.variant) return 'it names no variant (Variant: <variant>)';
  if (w.ownerRole !== gate.owner) return `its owner role is "${w.ownerRole || 'missing'}", the ${gate.id} gate's owner role is ${gate.owner}`;
  if (!w.decidedBy || /^<.*>$/.test(w.decidedBy) || /\b(claude|agent|assistant|ai|bot)\b/i.test(w.decidedBy)) return 'Decided by names no person; an agent never decides at a gate';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(w.date)) return 'it has no date as YYYY-MM-DD';
  if (!w.reason) return 'it gives no reason';
  return null;
}

// ---------------------------------------------------------------- the check

export function checkGates(root) {
  const configFile = path.join(root, 'gates', 'gates.json');
  if (!fs.existsSync(configFile)) throw new Error('gates/gates.json not found');
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const scan = config.scan || 'site/hardened';
  const scanDir = path.join(root, scan);
  const notes = [];
  const variants = [];
  if (fs.existsSync(scanDir)) {
    for (const e of fs.readdirSync(scanDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.isDirectory()) variants.push({ name: e.name, files: walk(path.join(scanDir, e.name)) });
      else notes.push(`${scan}/${e.name} is not inside a variant folder and is not scanned`);
    }
  }
  const ds = readDesignSystem(root);
  const waivers = readWaivers(root);
  const gates = {};
  for (const g of config.gates) {
    const detect = DETECTORS[g.id];
    if (!detect) throw new Error(`gates/gates.json names gate "${g.id}", and scripts/check-gates.js has no check for it`);
    const applied = new Map();
    const waiverList = [];
    for (const w of waivers.filter((x) => x.gate === g.id)) {
      let problem = g.kind === 'hard' ? `${g.id} is a hard gate, no waiver possible` : waiverProblem(w, g);
      if (!problem && applied.has(w.variant)) problem = `${applied.get(w.variant).file} already waives ${w.variant}`;
      if (!problem && !variants.some((v) => v.name === w.variant)) notes.push(`${w.file} waives ${g.id} for "${w.variant}", which has no folder under ${scan}/`);
      if (!problem) applied.set(w.variant, w);
      waiverList.push({ file: w.file, variant: w.variant, decidedBy: w.decidedBy, date: w.date, applied: !problem, ...(problem ? { ignored: problem } : {}) });
    }
    const findings = [];
    const variantStatus = {};
    for (const v of variants) {
      const found = detect(root, v, ds);
      const waiver = g.kind === 'soft' ? applied.get(v.name) : undefined;
      variantStatus[v.name] = !found.length ? 'pass' : waiver ? 'waived' : 'fail';
      for (const f of found) findings.push({ variant: v.name, ...f, owner: g.owner, kind: g.kind, waived: Boolean(waiver), waiver: waiver ? waiver.file : null });
    }
    const statuses = Object.values(variantStatus);
    const status = statuses.includes('fail') ? 'fail' : statuses.includes('waived') ? 'waived' : 'pass';
    gates[g.id] = { id: g.id, name: g.name, owner: g.owner, kind: g.kind, rule: g.rule, status, variants: variantStatus, findings, waivers: waiverList };
  }
  for (const w of waivers) {
    if (!gates[w.gate]) notes.push(`${w.file} names gate "${w.gate || 'missing'}", which gates/gates.json does not list; ignored`);
  }
  if (variants.length && ds.found && !ds.classes.has(BUTTON_CLASS)) notes.push(`site/styles.css defines no .${BUTTON_CLASS} class; every button is reported`);
  const ok = Object.values(gates).every((g) => g.status !== 'fail');
  return { ok, scanned: scan, hardened: variants.map((v) => v.name), gates, notes };
}

// ---------------------------------------------------------------- output

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

export function formatResult(result) {
  const lines = [];
  lines.push(result.hardened.length
    ? `gates: scanning ${result.scanned}/ (${result.hardened.join(', ')}). Prototypes in site/variants/ are not scanned.`
    : `gates: no hardened variant under ${result.scanned}/, nothing to scan. Prototypes in site/variants/ are not scanned.`);
  for (const g of Object.values(result.gates)) {
    for (const f of g.findings) {
      const tail = g.kind === 'hard' ? 'hard, no waiver' : f.waived ? `soft, waived by ${f.waiver}` : 'soft, waiver possible';
      lines.push(`${f.file}${f.line ? `:${f.line}` : ''}  ${f.rule}  "${f.match}"  owner: ${f.owner} (${tail})`);
    }
    for (const w of g.waivers.filter((x) => !x.applied)) lines.push(`${g.id} gate: waiver ${w.file} ignored: ${w.ignored}`);
    const parts = Object.entries(g.variants).filter(([, s]) => s !== 'pass').map(([v, s]) => {
      const n = plural(g.findings.filter((f) => f.variant === v).length, 'finding');
      if (s === 'waived') {
        const w = g.waivers.find((x) => x.applied && x.variant === v);
        return `${v}: ${n}, waived by ${w.file} (decided by ${w.decidedBy}, ${w.date})`;
      }
      return `${v}: ${n}`;
    });
    let line = `${g.id} gate (owner: ${g.owner}, ${g.kind}): ${g.status}`;
    if (parts.length) line += `. ${parts.join('; ')}`;
    if (g.status === 'fail') {
      line += g.kind === 'soft'
        ? `. Fix it in the page. Outside the run, the ${g.owner} may waive it with a file in discovery/decisions/, or change the system in site/styles.css (rule: ${g.rule}).`
        : `. On the ${g.owner} table: fix it. A hard gate takes no waiver (rule: ${g.rule}).`;
    }
    lines.push(line);
  }
  for (const n of result.notes) lines.push(`gates: note: ${n}`);
  lines.push(`gates: ${result.ok ? 'pass' : 'fail'}`);
  return lines;
}

// The entry check for one variant, before the factory builds it.
export function formatEntry(root, variant) {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'gates', 'gates.json'), 'utf8'));
  const g = config.gates.find((x) => x.id === 'validation');
  if (!g) throw new Error('gates/gates.json lists no validation gate');
  const found = validationFindings(root, variant);
  const lines = [`gates: entry check for ${variant}, before build to earn.`];
  for (const f of found) lines.push(`${f.file}  ${f.rule}  "${f.match}"  owner: ${g.owner} (hard, no waiver)`);
  if (found.length) {
    lines.push(`validation gate (owner: ${g.owner}, ${g.kind}): fail. On the ${g.owner}'s table: a variant goes into build to earn only after the ${g.owner} decided launch in discovery/decisions/ (rule: ${g.rule}). The factory does not start.`);
  } else {
    const d = readLaunchDecisions(root).find((x) => x.variant === variant && !launchProblem(x));
    lines.push(`validation gate (owner: ${g.owner}, ${g.kind}): pass. ${variant}: ${d.file} (decided by ${d.decidedBy}, ${d.date})`);
  }
  return { ok: !found.length, lines };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const entryAt = args.indexOf('--entry');
  if (entryAt !== -1) {
    // Entry check before build to earn: does the variant have a launch decision?
    const variant = args[entryAt + 1];
    const root = path.resolve(args.find((a, i) => !a.startsWith('--') && i !== entryAt + 1) || path.join(HERE, '..'));
    if (!variant) { console.error('gates: --entry needs a variant name'); process.exit(1); }
    let lines, ok;
    try { ({ lines, ok } = formatEntry(root, variant)); } catch (e) { console.error(`gates: ${e.message}`); process.exit(1); }
    for (const l of lines) console.log(l);
    process.exit(ok ? 0 : 1);
  }
  const root = path.resolve(args.find((a) => !a.startsWith('--')) || path.join(HERE, '..'));
  let discoveryFailed = false;
  if (args.includes('--with-discovery') && !json) {
    const r = spawnSync(process.execPath, [path.join(HERE, 'check-discovery.js'), root], { stdio: 'inherit' });
    discoveryFailed = r.status !== 0;
  }
  let result;
  try {
    result = checkGates(root);
  } catch (e) {
    console.error(`gates: ${e.message}`);
    process.exit(1);
  }
  if (json) console.log(JSON.stringify(result, null, 2));
  else for (const l of formatResult(result)) console.log(l);
  process.exit(discoveryFailed || !result.ok ? 1 : 0);
}
