import { validateInquiry, readFields, showErrors } from '../../components/inquiry-form.js';
import { logEvent } from '../../components/events.js';

export const VARIANT = 'success-line-first';
export const MAX_LENGTH = 300;

// Paraphrases of persona goals, not quotes from a person.
export const EXAMPLE_GROUPS = [
  {
    heading: 'If you want people to take it into their daily work',
    lines: [
      { id: 'soft-1', text: 'People in the team say: this helps me, here is where I used it.' },
      { id: 'soft-2', text: 'Other teams come over on their own and ask to have a look.' },
      { id: 'soft-3', text: 'The pilot team carries on by itself, so we can repeat it with more teams.' },
    ],
  },
  {
    heading: 'If you need to show the effect',
    lines: [
      { id: 'hard-1', text: 'The team uses one or two things productively straight after the format.' },
      { id: 'hard-2', text: 'People work differently in their own team, not only know more.' },
      { id: 'hard-3', text: 'We agreed up front what we will look at, and we check it again after four to six weeks.' },
    ],
  },
];

export const EXAMPLES = Object.fromEntries(EXAMPLE_GROUPS.flatMap((g) => g.lines).map((l) => [l.id, l.text]));

export const ERR_REQUIRED = 'Pick an example, write your own line, or tick "Don\'t know yet".';
export const ERR_LENGTH = 'Please keep it to one or two sentences (300 characters at most).';

// Pure. state: { text, unknown, example }. Returns { ok, error }.
export function validateSuccessLine({ text = '', unknown = false } = {}) {
  if (unknown) return { ok: true };
  const t = String(text).trim();
  if (!t) return { ok: false, error: ERR_REQUIRED };
  if (t.length > MAX_LENGTH) return { ok: false, error: ERR_LENGTH };
  return { ok: true };
}

// Pure. One of example | edited-example | own | dont-know.
export function classifyChoice({ text = '', unknown = false, example = '' } = {}) {
  if (unknown) return 'dont-know';
  if (!example || !EXAMPLES[example]) return 'own';
  return String(text).trim() === EXAMPLES[example] ? 'example' : 'edited-example';
}

// Pure. The three inquiry fields (plus the boolean flag the server already stores).
export function buildSuccessLineFields(state) {
  const choice = classifyChoice(state);
  const unknown = choice === 'dont-know';
  return {
    successLine: unknown ? '' : String(state.text ?? '').trim(),
    successLineChoice: choice,
    successLineExample: unknown ? '' : (state.example || ''),
    successLineUnknown: unknown,
  };
}

// Pure. Whole inquiry payload sent to /api/inquiry.
export function buildPayload(contactFields, state) {
  return { ...contactFields, ...buildSuccessLineFields(state), variant: VARIANT };
}

// Pure. Props for the events; never contains the success line text.
export function stepCompletedProps(state) {
  return { step: 'success_line', choice: classifyChoice(state) };
}
export function filledProps(state) {
  const choice = classifyChoice(state);
  if (choice === 'dont-know') return null;
  const example = state.example && EXAMPLES[state.example] ? state.example : null;
  return { choice, example, length: String(state.text ?? '').trim().length };
}
export function submittedProps(state) {
  const choice = classifyChoice(state);
  return { success_line: choice === 'dont-know' ? 'dont-know' : 'filled', choice };
}

export function summaryText(state) {
  const f = buildSuccessLineFields(state);
  return f.successLineChoice === 'dont-know' ? 'Success line: to work out in the call' : `Your success line: ${f.successLine}`;
}

// ---- browser wiring ----
export function init(doc = document) {
  const $ = (id) => doc.getElementById(id);
  const text = $('success-line');
  const unknownBox = $('success-unknown');
  const step1 = $('step-1');
  const step2 = $('step-2');
  const err = $('success-error');
  const form = $('inquiry-form');
  const formError = $('form-error');
  const buttons = [...doc.querySelectorAll('[data-example]')];
  const state = { example: '', filled: false };
  let started = false;
  const get = () => ({ text: text.value, unknown: unknownBox.checked, example: state.example });
  const start = () => {
    if (started) return;
    started = true;
    logEvent('inquiry_started', {}, VARIANT);
  };

  logEvent('page_view', { page: 'inquiry' }, VARIANT);

  for (const b of buttons) {
    b.addEventListener('click', () => {
      start();
      state.example = b.dataset.example;
      text.value = EXAMPLES[state.example];
      err.hidden = true;
    });
  }
  text.addEventListener('input', start);
  unknownBox.addEventListener('change', () => {
    start();
    text.disabled = unknownBox.checked;
    for (const b of buttons) b.disabled = unknownBox.checked;
    err.hidden = true;
  });
  form.addEventListener('focusin', start);

  $('continue').addEventListener('click', () => {
    const s = get();
    const v = validateSuccessLine(s);
    err.textContent = v.error || '';
    err.hidden = v.ok;
    if (!v.ok) return;
    const fp = filledProps(s);
    if (fp) logEvent('success_line_filled', fp, VARIANT);
    logEvent('inquiry_step_completed', stepCompletedProps(s), VARIANT);
    $('chosen-line').textContent = summaryText(s);
    step2.hidden = false;
    step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('change-line').addEventListener('click', (e) => {
    e.preventDefault();
    step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
    (unknownBox.checked ? unknownBox : text).focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const s = get();
    const fields = readFields(form);
    const result = validateInquiry(fields);
    showErrors(form, result.errors);
    formError.hidden = true;
    if (!result.ok) return;
    if (!validateSuccessLine(s).ok) {
      formError.textContent = 'Please go back and complete the success line first.';
      formError.hidden = false;
      return;
    }
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(fields, s)),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.redirect) {
        logEvent('inquiry_submitted', submittedProps(s), VARIANT);
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
