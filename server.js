import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateInquiry } from './site/components/inquiry-form.js';
import { isEventType } from './site/components/events.js';

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

// A variant is servable only if it is listed in config.variants and its folder has an index.html.
// Only listed names reach the filesystem, so no path traversal is possible.
function variantFile(name) {
  if (typeof name !== 'string' || !readConfig().variants.includes(name)) return null;
  const file = path.join(SITE, 'variants', name, 'index.html');
  return file.startsWith(path.join(SITE, 'variants') + path.sep) && fs.existsSync(file) ? file : null;
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
    let file;
    if (pathname === '/inquiry') {
      const variant = new URL(req.url, 'http://localhost').searchParams.get('variant');
      const baseline = path.join(SITE, 'inquiry.html');
      if (variant === null) file = (variantFile(readConfig().shipped) || baseline);
      else if (variant === 'baseline') file = baseline;
      else {
        file = variantFile(variant);
        if (!file) return notFound();
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
