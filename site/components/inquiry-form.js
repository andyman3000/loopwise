import { logEvent } from './events.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_MESSAGE_LENGTH = 10;

// Pure and shared: the browser and server/server.js both use it.
export function validateInquiry(fields = {}) {
  const errors = {};
  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  if (!str(fields.name)) errors.name = 'Please enter your name.';
  if (!str(fields.company)) errors.company = 'Please enter your company.';
  if (!str(fields.email)) errors.email = 'Please enter your email address.';
  else if (!EMAIL.test(str(fields.email))) errors.email = 'Please enter a valid email address.';
  if (str(fields.message).length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please tell us a little more (at least ${MIN_MESSAGE_LENGTH} characters).`;
  }
  const size = fields.teamSize;
  if (size !== undefined && size !== null && String(size).trim() !== '') {
    const n = Number(size);
    if (!Number.isInteger(n) || n < 1) errors.teamSize = 'Team size must be a whole number of 1 or more.';
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

export function readFields(form) {
  const data = new FormData(form);
  return Object.fromEntries([...data.entries()].map(([k, v]) => [k, String(v)]));
}

export function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[data-error-for]')) {
    const msg = errors[el.dataset.errorFor];
    el.textContent = msg || '';
    el.hidden = !msg;
  }
}

// submittedProps and onSubmitted let a variant add props to inquiry_submitted and clean up after a send.
export function initInquiryForm(form, { variant = 'baseline', submittedProps = () => ({}), onSubmitted } = {}) {
  let started = false;
  form.addEventListener('focusin', () => {
    if (started) return;
    started = true;
    logEvent('inquiry_started', {}, variant);
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = readFields(form);
    const result = validateInquiry(fields);
    showErrors(form, result.errors);
    const formError = form.querySelector('#form-error');
    formError.hidden = true;
    if (!result.ok) return;
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, variant }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.redirect) {
        logEvent('inquiry_submitted', submittedProps(), variant);
        if (onSubmitted) onSubmitted();
        // sendBeacon is queued by the browser and survives navigation
        window.location.href = json.redirect;
        return;
      }
      if (json.errors) showErrors(form, json.errors);
      else throw new Error('failed');
    } catch {
      formError.textContent = 'Something went wrong. Please try again.';
      formError.hidden = false;
    }
  });
}
