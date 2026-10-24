import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry } from '../site/components/inquiry-form.js';

const valid = { name: 'Sam Example', company: 'Example Co', email: 'sam@example.com', message: 'We need help with discovery.' };

test('valid inquiry passes', () => {
  assert.deepEqual(validateInquiry(valid), { ok: true, errors: {} });
});
test('team size is optional', () => {
  assert.equal(validateInquiry({ ...valid, teamSize: '' }).ok, true);
  assert.equal(validateInquiry({ ...valid, teamSize: '12' }).ok, true);
});
test('invalid team size is rejected', () => {
  assert.ok(validateInquiry({ ...valid, teamSize: '0' }).errors.teamSize);
  assert.ok(validateInquiry({ ...valid, teamSize: 'many' }).errors.teamSize);
});
test('required fields', () => {
  const r = validateInquiry({});
  assert.equal(r.ok, false);
  for (const k of ['name', 'company', 'email', 'message']) assert.ok(r.errors[k], k);
});
test('whitespace only counts as empty', () => {
  assert.ok(validateInquiry({ ...valid, name: '   ' }).errors.name);
});
test('email must be valid', () => {
  for (const email of ['sam', 'sam@', 'a@b', 'a b@c.de']) assert.ok(validateInquiry({ ...valid, email }).errors.email, email);
});
test('message has a minimum length', () => {
  assert.ok(validateInquiry({ ...valid, message: 'short' }).errors.message);
});
test('non-string values do not throw', () => {
  assert.equal(validateInquiry({ name: 5, company: null, email: {}, message: [] }).ok, false);
});
