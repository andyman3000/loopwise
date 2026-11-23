// Variant format-quiz, built to learn: see discovery/specs/format-quiz.md. Synthetic material.
// The quiz in an overlay, shared by the formats page and the inquiry page of this variant.
// Every visible line is [invented]: the product lead has to confirm it.

const NOT_SURE = 'Not sure';

const MARKUP = `
  <div class="quiz-head">
    <strong>Which format could fit your group?</strong>
    <a href="#" data-quiz="close">Close the quiz</a>
  </div>
        <section data-step="0">
          <div class="field">
            <label for="q1">How many people would take part?</label>
            <input id="q1" type="number" min="1" step="1" inputmode="numeric" autofocus>
            <p><small>If you do not know yet, leave it empty.</small></p>
          </div>
        </section>

        <section data-step="1" hidden>
          <fieldset class="quiz-q">
            <legend>Which of these working styles are in your group? Tick all that apply.</legend>
            <label class="choice"><input type="checkbox" name="q2" value="Assisting"><span>Assisting: AI for small things, a draft, a summary.<small>Example: asks a chat assistant to sum up a meeting</small></span></label>
            <label class="choice"><input type="checkbox" name="q2" value="Conversational"><span>Conversational: working back and forth with one AI.<small>Example: writes a user story together with a chat assistant</small></span></label>
            <label class="choice"><input type="checkbox" name="q2" value="Delegating"><span>Delegating: handing over whole tasks with several steps.<small>Example: gives an agent a research task and gets back a finished report</small></span></label>
            <label class="choice"><input type="checkbox" name="q2" value="Orchestrating"><span>Orchestrating: several AI agents in parallel.<small>Example: runs one agent per task at the same time and reviews their work</small></span></label>
            <label class="choice"><input type="checkbox" name="q2" value="System-building"><span>System-building: their own setups that turn an intent into finished work.<small>Example: built a shared set of skills that turns an intent into a spec</small></span></label>
          </fieldset>
        </section>

        <section data-step="2" hidden>
          <fieldset class="quiz-q">
            <legend>How does the group work together today?</legend>
            <label class="choice"><input type="radio" name="q3" value="As one team, on one product"><span>As one team, on one product</span></label>
            <label class="choice"><input type="radio" name="q3" value="People come from different teams or products"><span>People come from different teams or products</span></label>
          </fieldset>
        </section>

        <section data-step="3" hidden>
          <fieldset class="quiz-q">
            <legend>What gets in the way for them today? Tick all that apply.</legend>
            <label class="choice"><input type="checkbox" name="q4" value="One topic keeps coming up, and no one in the group knows it well"><span>One topic keeps coming up, and no one in the group knows it well</span></label>
            <label class="choice"><input type="checkbox" name="q4" value="They are at very different levels with AI, and have no shared start"><span>They are at very different levels with AI, and have no shared start</span></label>
            <label class="choice"><input type="checkbox" name="q4" value="They know AI tools, but do not use them on real backlog work"><span>They know AI tools, but do not use them on real backlog work</span></label>
            <label class="choice"><input type="checkbox" name="q4" value="One team wants to change how it works together"><span>One team wants to change how it works together</span></label>
            <label class="choice"><input type="checkbox" name="q4" value="Single people want feedback on how they work day to day"><span>Single people want feedback on how they work day to day</span></label>
            <label class="choice"><input type="checkbox" name="q4" value="Not sure"><span>Not sure</span></label>
          </fieldset>
        </section>

        <section data-step="4" id="quiz-result" hidden>
          <h2 id="result-heading"></h2>
          <p id="result-why"></p>
          <p>The scoping call shapes the real format.</p>
          <p class="actions">
            <button class="button" type="button" id="quiz-inquire">Inquire now</button>
          </p>
        </section>

        <p class="actions">
          <button class="button secondary" type="button" id="quiz-back">Back</button>
          <button class="button" type="button" id="quiz-next">Next</button>
        </p>
`;

const STYLE = `
  [hidden]{display:none !important}
  dialog.quiz{width:min(40rem,calc(100vw - 32px));max-height:calc(100vh - 32px);border:1px solid var(--line);border-radius:var(--radius);
    background:var(--card);color:var(--fg);padding:var(--space-5) var(--space-6) var(--space-6);box-shadow:var(--shadow)}
  dialog.quiz::backdrop{background:rgba(23,32,42,.45)}
  .quiz-head{display:flex;justify-content:space-between;align-items:baseline;gap:var(--space-4);margin-bottom:var(--space-5)}
  .quiz-q{border:0;padding:0;margin:0}
  .quiz-q legend{font-weight:650;font-size:1.1rem;margin-bottom:var(--space-4);padding:0}
  .quiz .choice{display:flex;gap:.7rem;align-items:flex-start;font-weight:400;margin:0 0 var(--space-4);line-height:1.4}
  .quiz .choice input{margin-top:var(--space-1);flex:none}
  .quiz .choice small{display:block;color:var(--muted);font-size:.92rem;margin-top:.2rem}
  .quiz h2{margin-top:0}
`;

// [invented] The rule from answers to format. Someone who runs the training should read it.
const Q4_FORMAT = {
  'One topic keeps coming up, and no one in the group knows it well': 'Half-day workshop',
  'They are at very different levels with AI, and have no shared start': 'Two-day training',
  'They know AI tools, but do not use them on real backlog work': 'Agentic Product Management lab',
  'One team wants to change how it works together': 'Multi-week team coaching',
  'Single people want feedback on how they work day to day': 'Shadowing',
};
const ADVANCED = ['Delegating', 'Orchestrating', 'System-building'];
const ONE_TEAM = 'As one team, on one product';

export function pickFormat(a) {
  // Step 1: every Q4 tick other than "Not sure" stands for the same format.
  const named = [...new Set(a.q4.filter((t) => t !== NOT_SURE).map((t) => Q4_FORMAT[t]))];
  if (named.length === 1) {
    const f = named[0];
    if (f !== 'Multi-week team coaching' || a.q3.includes(ONE_TEAM)) return f;
  }
  // Step 2: Q2 decides. The training starts at the lowest level in the group.
  if (a.q2.length && a.q2.every((t) => ADVANCED.includes(t))) return 'Agentic Product Management lab';
  return 'Two-day training';
}

// [invented pattern] One line on why, built from the tester's own answers.
const Q3_SHORT = { [ONE_TEAM]: 'one team on one product', 'People come from different teams or products': 'people from different teams or products' };
const Q4_SHORT = {
  'One topic keeps coming up, and no one in the group knows it well': 'one topic no one in the group knows well',
  'They are at very different levels with AI, and have no shared start': 'very different levels with AI',
  'They know AI tools, but do not use them on real backlog work': 'AI tools not used on real backlog work',
  'One team wants to change how it works together': 'one team wants to change how it works together',
  'Single people want feedback on how they work day to day': 'single people want feedback on their work',
};
function whyLine(a) {
  const parts = [];
  if (a.q1) parts.push(`${a.q1} ${a.q1 === 1 ? 'person' : 'people'}`);
  parts.push(...a.q3.map((t) => Q3_SHORT[t]));
  if (a.q2.length) parts.push(`working styles: ${a.q2.map((t) => t.toLowerCase()).join(', ')}`);
  parts.push(...a.q4.filter((t) => t !== NOT_SURE).map((t) => Q4_SHORT[t]));
  return parts.length ? `You said ${parts.join(', ')}.` : 'You left the questions open, so this is the format for a mixed group.';
}

// [invented] The text for "What do you need?", written as the buyer would write it.
// "Not sure" ticks are left out. The first line names the format: the watcher reads whether the tester keeps it.
const STYLES = {
  Assisting: 'use AI for small things',
  Conversational: 'work back and forth with one AI',
  Delegating: 'hand over whole tasks to agents',
  Orchestrating: 'run several agents in parallel',
  'System-building': 'build their own setups that turn an intent into finished work',
};
const TEAMS = {
  [ONE_TEAM]: 'They work as one team, on one product.',
  'People come from different teams or products': 'They come from different teams or products.',
};
const and = (parts) => (parts.length < 2 ? parts.join('') : `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}`);

export function formText(result) {
  const a = result.answers || {};
  const ticks = (list) => (Array.isArray(list) ? list.filter((t) => t !== NOT_SURE) : []);
  const lines = [`A format that could fit us: ${result.format}.`];
  if (a.q1) lines.push(a.q1 === 1 ? 'One person would take part.' : `About ${a.q1} people would take part.`);
  lines.push(...ticks(a.q3).map((t) => TEAMS[t]).filter(Boolean));
  const styles = ticks(a.q2).map((t) => STYLES[t]).filter(Boolean);
  if (styles.length) lines.push(`In the group, people ${and(styles)}.`);
  const blocks = ticks(a.q4);
  if (blocks.length) lines.push('What gets in the way today:', ...blocks.map((t) => `- ${t}.`));
  return lines.join('\n');
}

// Builds the overlay once and returns open(). onInquire(result) runs on the result button.
export function initQuiz({ inquireLabel = 'Inquire now', onInquire }) {
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.append(style);
  const dialog = document.createElement('dialog');
  dialog.className = 'quiz';
  dialog.setAttribute('aria-label', 'Format quiz');
  dialog.innerHTML = MARKUP;
  document.body.append(dialog);

  const q = (sel) => dialog.querySelector(sel);
  const steps = [...dialog.querySelectorAll('[data-step]')];
  const back = q('#quiz-back');
  const next = q('#quiz-next');
  q('#quiz-inquire').textContent = inquireLabel;
  let step = 0;
  let result = null;

  function answers() {
    const ticks = (name) => [...dialog.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);
    const n = Number(q('#q1').value);
    return { q1: Number.isInteger(n) && n >= 1 ? n : null, q2: ticks('q2'), q3: ticks('q3'), q4: ticks('q4') };
  }
  function show(n) {
    step = n;
    steps.forEach((s, i) => { s.hidden = i !== n; });
    back.hidden = n === 0;
    next.hidden = n === steps.length - 1;
    if (n === steps.length - 1) {
      const a = answers();
      result = { format: pickFormat(a), why: whyLine(a), answers: a };
      q('#result-heading').textContent = `A format that could fit: ${result.format}`;
      q('#result-why').textContent = result.why;
    }
  }
  next.addEventListener('click', () => show(step + 1));
  back.addEventListener('click', () => show(step - 1));
  q('[data-quiz="close"]').addEventListener('click', (e) => { e.preventDefault(); dialog.close(); });
  q('#quiz-inquire').addEventListener('click', () => { dialog.close(); onInquire(result); });

  return function open() {
    show(0);
    dialog.showModal();
  };
}
