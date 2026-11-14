// Vercel entry point: hands every request to the same server the workshop runs locally.
// vercel.json rewrites each path to /api?__path=<path>; this restores the original URL.
process.env.LOOPWISE_DATA_DIR ||= '/tmp/loopwise-data'; // Vercel's filesystem is read-only except /tmp

const { createServer } = await import('../server.js');
const handle = createServer().listeners('request')[0];

export default function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const original = url.searchParams.get('__path');
  if (original !== null) {
    url.searchParams.delete('__path');
    req.url = '/' + original.replace(/^\/+/, '') + url.search;
  }
  return handle(req, res);
}
