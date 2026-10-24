import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseOpportunities, parseSelection, saveSelection, pickPage } from '../lib/opportunity-pick.js';

const OPP = `# Opportunities: interviews

### O1: Sponsors do not know which format fits
- **Evidence:**
  - "I have no idea." (sources/interviews/a.md:4, S, sponsor)
- **Voices:** 1 distinct speaker: sponsor. Second-hand: yes, she reports what participants said.
- **KPI branch:** Branch A: inquiries that end in a booking, driver submit rate. [assumption: x]
- **Assessment:** partly supported. One voice.

### O2: Participants lose it after a week
- **Voices:** 3 distinct speakers: participants. Second-hand: no.
- **KPI branch:** Branch B: follow-up bookings, not this quarter. Side link to Branch A, driver booking rate.
- **Assessment:** well supported. Three voices.

## Looks like an opportunity, but
### Not this one

## Goes into comparison
Goes into comparison: ____ (human decides)
Decided by: ____ · Date: ____
`;

function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-pick-'));
  fs.mkdirSync(path.join(root, 'discovery', 'opportunities'), { recursive: true });
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'interviews.md'), OPP);
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'data.md'), '# Observations\n');
  fs.writeFileSync(path.join(root, 'discovery', 'kpi-tree.md'), '- Branch A: inquiries that end in a booking (x:1)\n- Branch B: follow-up bookings, not this quarter (x:2)\n');
  return root;
}

test('opportunities are parsed with level, voices, speakers and branch', () => {
  const [o1, o2, more] = parseOpportunities(OPP);
  assert.equal(more, undefined);
  assert.deepEqual([o1.id, o1.level, o1.voices, o1.speakers, o1.branch, o1.driver, o1.secondHand], ['O1', 'partly supported', 1, ['sponsor'], 'A', 'submit rate', true]);
  assert.deepEqual([o2.level, o2.speakers, o2.branch, o2.sideLink], ['well supported', ['participant'], 'B', true]);
  assert.equal(o1.quote.where, 'sources/interviews/a.md:4');
});

test('an empty selection reads as nothing chosen', () => {
  assert.deepEqual(parseSelection(OPP), { ids: [], decidedBy: '' });
});

test('saving writes only the two selection lines and leaves data.md alone', () => {
  const root = repo();
  const out = saveSelection(root, { decidedBy: 'Kim', selections: { interviews: ['O2', 'O1'] } }, '2026-10-26');
  assert.equal(out.ok, true);
  const md = fs.readFileSync(path.join(root, 'discovery', 'opportunities', 'interviews.md'), 'utf8');
  assert.equal(md, OPP.replace('Goes into comparison: ____ (human decides)', 'Goes into comparison: O1, O2').replace('Decided by: ____ · Date: ____', 'Decided by: Kim · Date: 2026-10-26'));
  assert.deepEqual(parseSelection(md), { ids: ['O1', 'O2'], decidedBy: 'Kim' });
  assert.equal(fs.readFileSync(path.join(root, 'discovery', 'opportunities', 'data.md'), 'utf8'), '# Observations\n');
});

test('nothing is written for an unknown id, a missing source or no name', () => {
  const root = repo();
  const file = path.join(root, 'discovery', 'opportunities', 'interviews.md');
  assert.equal(saveSelection(root, { decidedBy: 'Kim', selections: { interviews: ['O9'] } }).ok, false);
  assert.equal(saveSelection(root, { decidedBy: 'Kim', selections: {} }).ok, false);
  assert.equal(saveSelection(root, { decidedBy: ' ', selections: { interviews: [] } }).ok, false);
  assert.equal(fs.readFileSync(file, 'utf8'), OPP);
});

test('the page shows a card per opportunity with branch names from the KPI tree and escapes text', () => {
  const root = repo();
  fs.appendFileSync(path.join(root, 'discovery', 'opportunities', 'interviews.md'), '');
  const html = pickPage(root);
  assert.equal((html.match(/<article class="card/g) || []).length, 2);
  assert.match(html, /A: inquiries that end in a booking/);
  assert.match(html, /side link to A, driver booking rate/);
  assert.doesNotMatch(html, /data\.md/);
});
