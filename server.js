import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateInquiry } from './site/components/inquiry-form.js';
import { isEventType } from './site/components/events.js';
import { discoveryPage } from './lib/discovery-view.js';
import { mapPage } from './lib/opportunity-map.js';
import { treePage } from './lib/opportunity-tree.js';
import { parseJsonl, parseCsv, summarize } from './site/components/funnel.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.join(ROOT, 'site');
const MAX_BODY = 100 * 1024;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

// Read at call time so tests can point it at a temp dir.
function dataDir() {
  return process.env.LOOPWISE_DATA_DIR || path.join(ROOT, 'data');
}

function appendLine(file, obj) {
  const dir = dataDir();
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(path.join(dir, file), JSON.stringify(obj) + '\n');
}

function resolvePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  if (decoded.includes('\0')) return null;
  if (decoded.endsWith('/')) decoded += 'index.html';
  const file = path.resolve(SITE, '.' + path.posix.normalize('/' + decoded));
  if (file !== SITE && !file.startsWith(SITE + path.sep)) return null;
  return file;
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('too large'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => {
      try {
        const v = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (v && typeof v === 'object' && !Array.isArray(v)) resolve(v);
        else reject(new Error('not an object'));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

// Fields the inquiry record sets itself; extra fields never overwrite them.
const CORE_KEYS = new Set(['ts', 'name', 'company', 'email', 'teamSize', 'message', 'variant']);
const MAX_EXTRA_KEYS = 20;
const MAX_EXTRA_LENGTH = 300;

// Read at call time so tests can point it at a temp file via LOOPWISE_CONFIG.
function readConfig() {
  const empty = { shipped: null, variants: [] };
  try {
    const c = JSON.parse(fs.readFileSync(process.env.LOOPWISE_CONFIG || path.join(SITE, 'config.json'), 'utf8'));
    return { shipped: typeof c.shipped === 'string' ? c.shipped : null, variants: Array.isArray(c.variants) ? c.variants : [] };
  } catch {
    return empty;
  }
}

// A page of the site by name: "/" is index, "/inquiry" and "/inquiry.html" are inquiry.
// Only names with a baseline file in site/ are pages; everything else is served as a static file.
function pageName(pathname) {
  const m = pathname.match(/^\/(?:([a-z0-9-]+?)(?:\.html)?)?$/);
  const name = m ? m[1] || 'index' : null;
  return name && fs.existsSync(path.join(SITE, name + '.html')) ? name : null;
}

// A variant is servable only if it is listed in config.variants and its folder exists.
// Only listed names reach the filesystem, so no path traversal is possible.
function variantDir(name) {
  if (typeof name !== 'string' || !readConfig().variants.includes(name)) return null;
  const dir = path.join(SITE, 'variants', name);
  return dir.startsWith(path.join(SITE, 'variants') + path.sep) && fs.existsSync(dir) ? dir : null;
}

// A variant replaces a page by holding a file of the same name: variants/<name>/formats.html.
// A page the variant does not hold is the baseline page.
function variantPage(dir, page) {
  const file = dir && path.join(dir, page + '.html');
  return file && fs.existsSync(file) ? file : null;
}

// Links between pages keep ?variant=<name>, so a visitor stays inside the variant.
function keepVariant(html, variant) {
  return html.replace(/href="(\/[a-z0-9-]*(?:\.html)?)"/g, (all, href) => (pageName(href) ? `href="${href}?variant=${encodeURIComponent(variant)}"` : all));
}

// Extra fields from a variant form are passed through by rule, not by name: any top-level key
// that is not a core field, whose name is a plain identifier and whose value is a non-empty string,
// a number or a boolean. At most 20 keys, strings cut to 300 characters. Objects and arrays are dropped.
function extraFields(body) {
  const out = {};
  const variant = typeof body.variant === 'string' ? body.variant.trim().slice(0, 50) : '';
  out.variant = /^[a-z0-9-]+$/.test(variant) ? variant : 'baseline';
  let count = 0;
  for (const [k, v] of Object.entries(body)) {
    if (count >= MAX_EXTRA_KEYS) break;
    if (CORE_KEYS.has(k) || !/^[A-Za-z][A-Za-z0-9_]{0,49}$/.test(k)) continue;
    if (typeof v === 'string' && v.trim() !== '') out[k] = v.trim().slice(0, MAX_EXTRA_LENGTH);
    else if ((typeof v === 'number' && Number.isFinite(v)) || typeof v === 'boolean') out[k] = v;
    else continue;
    count++;
  }
  return out;
}

const API = {
  '/api/inquiry': (body, res) => {
    const { ok, errors } = validateInquiry(body);
    if (!ok) return sendJson(res, 400, { ok: false, errors });
    const record = {
      ts: new Date().toISOString(),
      name: body.name.trim(),
      company: body.company.trim(),
      email: body.email.trim(),
      teamSize: body.teamSize === undefined || String(body.teamSize).trim() === '' ? null : Number(body.teamSize),
      message: body.message.trim(),
      ...extraFields(body),
    };
    appendLine('inquiries-live.jsonl', record);
    sendJson(res, 201, { ok: true, redirect: '/confirmation.html' });
  },
  '/api/events': (body, res) => {
    if (!isEventType(body.type)) return sendJson(res, 400, { ok: false, errors: { type: 'Unknown event type.' } });
    const props = body.props && typeof body.props === 'object' && !Array.isArray(body.props) ? body.props : {};
    appendLine('events-live.jsonl', {
      type: body.type,
      ts: typeof body.ts === 'string' ? body.ts : new Date().toISOString(),
      variant: typeof body.variant === 'string' ? body.variant : 'baseline',
      props,
    });
    res.writeHead(204);
    res.end();
  },
};

export function createServer() {
  return http.createServer(async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    const notFound = () => {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    };

    // The dashboard reads the generated data, counted against the variant site/config.json ships.
    if (pathname === '/api/data/summary') {
      if (req.method !== 'GET') {
        res.writeHead(405, { Allow: 'GET' });
        return res.end('Method not allowed');
      }
      try {
        const dir = dataDir();
        const scenario = { ...JSON.parse(fs.readFileSync(path.join(dir, 'scenario.json'), 'utf8')), shippedVariant: readConfig().shipped };
        if (!scenario.weeksAfter || !scenario.shippedVariant) throw new Error('no launch in the data');
        const events = parseJsonl(fs.readFileSync(path.join(dir, 'events.jsonl'), 'utf8'));
        const inquiries = parseCsv(fs.readFileSync(path.join(dir, 'inquiries.csv'), 'utf8'));
        return sendJson(res, 200, summarize(events, inquiries, scenario));
      } catch {
        return sendJson(res, 404, { ok: false, error: 'No launch data. Run npm run generate after a variant is shipped.' });
      }
    }

    if (pathname.startsWith('/api/')) {
      if (req.method !== 'POST') {
        res.writeHead(405, { Allow: 'POST' });
        return res.end('Method not allowed');
      }
      const handler = API[pathname];
      if (!handler) return notFound();
      let body;
      try {
        body = await readJson(req);
      } catch {
        return sendJson(res, 400, { ok: false, errors: { body: 'Invalid JSON body.' } });
      }
      return handler(body, res);
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      return res.end('Method not allowed');
    }
    if (pathname === '/discovery/map') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(req.method === 'HEAD' ? undefined : mapPage(process.env.LOOPWISE_ROOT || ROOT));
    }
    if (pathname === '/discovery/tree') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(req.method === 'HEAD' ? undefined : treePage(process.env.LOOPWISE_ROOT || ROOT));
    }
    const discovery = discoveryPage(process.env.LOOPWISE_ROOT || ROOT, pathname);
    if (discovery) {
      res.writeHead(discovery.status, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(req.method === 'HEAD' ? undefined : discovery.html);
    }
    let file;
    const page = pageName(pathname);
    if (pathname === '/dashboard') file = path.join(SITE, 'dashboard.html');
    else if (page) {
      const variant = new URL(req.url, 'http://localhost').searchParams.get('variant');
      const baseline = path.join(SITE, page + '.html');
      if (variant === null) file = variantPage(variantDir(readConfig().shipped), page) || baseline;
      else if (variant === 'baseline') file = baseline;
      else {
        const dir = variantDir(variant);
        if (!dir) return notFound();
        const html = keepVariant(fs.readFileSync(variantPage(dir, page) || baseline, 'utf8'), variant);
        res.writeHead(200, { 'Content-Type': TYPES['.html'], 'Content-Length': Buffer.byteLength(html) });
        return res.end(req.method === 'HEAD' ? undefined : html);
      }
    } else file = resolvePath(pathname);
    if (!file) return notFound();
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) return notFound();
      const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file).pipe(res);
    });
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`Loopwise running at http://localhost:${port}/`);
  });
}
