import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('npm run summary prints every line of the launch card with what counts as better', () => {
  const out = execFileSync('node', [path.join(ROOT, 'scripts', 'summary.js')], { encoding: 'utf8' });
  for (const part of ['SYNTHETIC DATA', 'questions about the team', 'Start rate', 'Adoption', 'Call rate', 'format settled', 'Submit rate', 'Kill line', 'Bookings']) {
    assert.ok(out.includes(part), part);
  }
  assert.match(out, /quiz weeks \d+ of \d+/);
});
