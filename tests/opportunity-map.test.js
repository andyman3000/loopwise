import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseOpportunities, parseSelection, mapPage } from '../lib/opportunity-map.js';

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

function repo(md = OPP) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'loopwise-map-'));
  fs.mkdirSync(path.join(root, 'discovery', 'opportunities'), { recursive: true });
  fs.writeFileSync(path.join(root, 'discovery', 'opportunities', 'interviews.md'), md);
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

test('an empty selection reads as nothing chosen, a filled one as its ids', () => {
  assert.deepEqual(parseSelection(OPP), { ids: [] });
  assert.deepEqual(parseSelection(OPP.replace('____ (human decides)', 'O2, O1')), { ids: ['O2', 'O1'] });
});

test('the map shows a card per opportunity, branch names from the KPI tree, and leaves data.md out', () => {
  const html = mapPage(repo());
  assert.equal((html.match(/<article class="card/g) || []).length, 2);
  assert.match(html, /A: inquiries that end in a booking/);
  assert.match(html, /side link to A, driver booking rate/);
  assert.match(html, /Nothing is in the comparison yet/);
  assert.doesNotMatch(html, /data\.md|<form|\/api\//);
});

test('the map marks what the files put into the comparison', () => {
  const html = mapPage(repo(OPP.replace('____ (human decides)', 'O2')));
  assert.equal((html.match(/class="in"/g) || []).length, 1);
  assert.match(html, /1 marked "in comparison"/);
});
