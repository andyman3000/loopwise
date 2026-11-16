# Spec: format-quiz

> Spec drafted by an agent (`variant-spec`) on 2026-11-16, before the build.
> **Variant:** `format-quiz` · Pages it changes: `formats.html`, `inquiry.html` · Tester starts at `/formats.html?variant=format-quiz`
> **Idea:** I1 in [discovery/intents/format-fit.md](../intents/format-fit.md) ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", [discovery/intents/format-fit.md:82](../intents/format-fit.md#L82))
> **Assumption under test:** "Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form." ([discovery/test-cards/format-quiz-prototype.md:33](../test-cards/format-quiz-prototype.md#L33))
> **Label:** interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

A spec describes the page so exactly that Claude Code can build it from this file alone.
It covers only what the prototype test needs.
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).

## Your first try
"A quiz that asks about: Team size, current AI usage level with examples, maybe 5 questions (good number of questions and content to be found out in the user tests)"

Where the draft differs:
- The draft writes out five questions, so the tester has something to answer. The user tests then sharpen them.
- The draft adds the result, the step into the form and the rule from answers to format. Without them a tester cannot meet the second half of the assumption.
- The product lead then added: two ways into the quiz, one format as the result, the form filled with the format and all answers, a free field for team size, several answers per question, and groups split when they are too large.

Feedback:
- Strong: "Team size" and "current AI usage level with examples" are questions a buyer can answer about a real group. The persona file says the group's level is mixed ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)).
- Strong: "to be found out in the user tests" keeps the questions open to change. That is right for a prototype.
- Weak: the answer covers only the first half of the assumption. It left out the result and the step into the form, where the trust in the named format shows.

## What changes on the page

### Way in 1: the formats page (the tester starts here)
1. Above the five format tiles, a box reads: "Not sure which format fits your group? Answer five short questions." It has a button "Start the quiz". [invented]
2. The tiles, the line below them and the button "Make an inquiry" stay as today ([site/formats.html:22](../../site/formats.html#L22) to [site/formats.html:30](../../site/formats.html#L30)).
3. The tester can ignore the box and use the page as today.

### Way in 2: the inquiry page
1. Above the form, one line reads: "Not sure what to answer? Take this small quiz." It has a button "Start the quiz". [invented]
2. The form and the box "What happens after you send it" stay as today.

### The quiz (the same on both pages)
1. "Start the quiz" opens the quiz in place, on the same page. One question shows at a time, with "Next" and "Back".
2. Each question with choices allows several ticks. Each has the choice "Not sure".
3. "Next" works with no answer too. An empty question counts as "Not sure".
4. A link "Close the quiz" stays visible at every step. It closes the quiz and keeps the page as it was.

The five questions. Every line is invented, unless it says otherwise.

| # | Question | Answer type | Choices |
|---|---|---|---|
| Q1 | How many people would take part? | free number field, whole number of 1 or more | none |
| Q2 | Which of these working styles are in your group? Tick all that apply. | several ticks | Assisting: AI for small things, a draft, a summary · Conversational: working back and forth with one AI · Delegating: handing over whole tasks with several steps · Orchestrating: several AI agents in parallel · System-building: their own setups that turn an intent into finished work · Not sure |
| Q3 | Do they work on the same product, or come from several teams? | several ticks | The same product · Several teams · Not sure |
| Q4 | What should change for them? | several ticks | One topic in depth · A shared start with AI in product work · Work with AI agents on tasks from their own backlog · How one team works, over several weeks · Feedback for single people on how they work · Not sure |
| Q5 | How much time can the group spend away from work? | several ticks | Half a day · Two days · One session a week, for some weeks · A few days inside the team · Not sure |

The ladder in Q2 is adapted from a questionnaire of the product lead outside this repo. It holds no client data.
Q1 has a hint below the field: "If you do not know yet, leave it empty." [invented]

### The rule from answers to format
The rule runs in this order. The first step that names a format wins. The whole rule is invented and marked so on the page code.

1. **Q4 has exactly one tick other than "Not sure":** the format that Q4 choice stands for.
   | Q4 choice | Format |
   |---|---|
   | One topic in depth | Half-day workshop |
   | A shared start with AI in product work | Two-day training |
   | Work with AI agents on tasks from their own backlog | Agentic Product Management lab |
   | How one team works, over several weeks | Multi-week team coaching |
   | Feedback for single people on how they work | Shadowing |
   The five formats and their audiences come from the formats page ([site/formats.html:23](../../site/formats.html#L23) to [site/formats.html:27](../../site/formats.html#L27)).
2. **Limits that change step 1:**
   - Multi-week team coaching needs "The same product" in Q3. The formats page names "one intact product team" ([site/formats.html:26](../../site/formats.html#L26)). Without that tick, go to step 3.
   - If Q5 has only "Half a day", the result is the Half-day workshop, whatever step 1 said.
3. **Several ticks in Q4, only "Not sure", or step 2 sent the rule here:** Q2 decides.
   - Q2 has "Delegating", "Orchestrating" or "System-building": Agentic Product Management lab.
   - Otherwise: Two-day training. The formats page names mixed roles for it ([site/formats.html:24](../../site/formats.html#L24)).
4. **Group too large:** after steps 1 to 3, compare Q1 with the format's largest group.
   - Half-day workshop: up to 16 people ([site/formats.html:23](../../site/formats.html#L23)).
   - Two-day training: up to 20 people ([site/formats.html:24](../../site/formats.html#L24)).
   - If Q1 is larger, the result names the format "in <n> groups". `<n>` is Q1 divided by the largest group, rounded up.
   - The other three formats name no largest group, so no split.
5. **Every answer is empty or "Not sure":** Two-day training. The form text then says "The quiz could not settle it."

### The result
1. The quiz closes the questions and shows the result in the same place.
2. Heading: "A format that could fit: <format>". With a split: "<format>, in <n> groups". [invented]
3. One line on why, built from the tester's own answers. For example: "You said 14 people, several teams, a shared start with AI." [invented pattern]
4. One line, adapted from [site/formats.html:21](../../site/formats.html#L21): The scoping call shapes the real format.
5. One line: "With your answers we can prepare a better call." [invented]
6. A button "Inquire now". [invented]
7. Two links below it: "Back to all formats" and "Change my answers". [invented]

### The step into the form
- **From the formats page:** "Inquire now" stores the result and the answers in the browser (`sessionStorage`, key `format-quiz`). It then opens `/inquiry.html?variant=format-quiz`. If the browser blocks the storage, the form opens empty.
- **From the inquiry page:** "Inquire now" closes the result and scrolls to the form.
- **On both ways:** the page fills the form, then scrolls to it. It does not put the cursor into a field. A started form is counted when the visitor clicks into a field ([site/components/inquiry-form.js:41](../../site/components/inquiry-form.js#L41)). The tester must do that click.
- "What do you need?" is filled with text built from the tester's answers, one line each:
  ```
  Quiz result: <format>[, in <n> groups]
  People taking part: <Q1, or "not given">
  Working styles in the group: <Q2 ticks>
  Same product or several teams: <Q3 ticks>
  What should change: <Q4 ticks>
  Time away from work: <Q5 ticks>
  ```
  With step 5 of the rule, the first line reads "Quiz result: The quiz could not settle it. Two-day training".
- "Team size (optional)" is filled with Q1, if Q1 has a number.
- The tester can change or delete every filled text. Sending works as today.

### After the send
The page redirects to `/confirmation.html` as today. That page promises contact "Within a few days" ([site/confirmation.html:25](../../site/confirmation.html#L25)). The quiz promises a better call, not a faster one, so the two lines fit.

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester answers every quiz question for their own group ([:69](../test-cards/format-quiz-prototype.md#L69)) | each question, Q1 to Q5 |
| On the quiz result, the tester uses the step to the form and clicks into a form field ([:70](../test-cards/format-quiz-prototype.md#L70)) | the button "Inquire now", then any field of the form |
| The tester sends the form and keeps the format text ([:71](../test-cards/format-quiz-prototype.md#L71)) | the first line of "What do you need?", then "Send inquiry" |
| Asked afterwards, the tester says why the format fits ([:72](../test-cards/format-quiz-prototype.md#L72)) | no element: the watcher asks after the send (open point) |
| The tester stops at a question, or skips it ([:73](../test-cards/format-quiz-prototype.md#L73)) | each question; "Next" with no answer |
| On the quiz result, the tester looks around for what to do next ([:74](../test-cards/format-quiz-prototype.md#L74)) | the result block |
| The tester deletes or overwrites the format text ([:75](../test-cards/format-quiz-prototype.md#L75)) | the first line of "What do you need?" |
| The tester leaves the page, or goes back to the formats ([:76](../test-cards/format-quiz-prototype.md#L76)) | "Back to all formats", "Close the quiz", the navigation |
| The tester says "I'm guessing" ([:77](../test-cards/format-quiz-prototype.md#L77)) | no element: words the tester says aloud |

Every path reaches the result through Q1 to Q5. The tester can skip the quiz on both pages. Then the quiz signs cannot show, and the watcher notes that the tester skipped it.

## Fields and validation
| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|
| `name` | string | yes | as today |
| `company` | string | yes | as today |
| `email` | string | yes | a valid email, as today |
| `teamSize` | number | no | whole number of 1 or more, as today; filled from Q1 |
| `message` | string | yes | at least 10 characters, as today; filled from the quiz |
| `quizFormat` | string, hidden input inside the form | no | the format the quiz named, with "in <n> groups" if split; `maxlength="300"`; empty if the tester skipped the quiz |
| `quizFrom` | string, hidden input inside the form | no | `formats` or `inquiry`: where the tester took the quiz; `maxlength="300"` |

The quiz answers themselves are not sent as fields. They reach the server only as text in `message`.

## Events to emit
| Event | When it fires | Props |
|---|---|---|
| `page_view` | each page loads | `{ page: 'formats' }` or `{ page: 'inquiry' }`, variant `format-quiz` |
| `inquiry_step_completed` | the tester presses "Next" on a question | `{ step: 'quiz-1' … 'quiz-5', from: 'formats' \| 'inquiry', answered: true \| false }` |
| `inquiry_step_completed` | the result shows | `{ step: 'quiz-result', from, format }` |
| `inquiry_started` | the first click into a form field, as today | `{}` |
| `inquiry_submitted` | the send succeeds | `{ quizTaken: true \| false, quizFormat, formatKept: true \| false }`. `formatKept` is true if `message` still contains the format name. Passed as `submittedProps` ([site/components/inquiry-form.js:38](../../site/components/inquiry-form.js#L38)) |

The prototype test does not read these events. The watcher reads the page.

## What stays the same
- The five format tiles and their text.
- The inquiry form, its labels, its validation and the send to `/api/inquiry`.
- The box "What happens after you send it" on the inquiry page.
- The navigation and the footer. The server keeps `?variant=format-quiz` on links between pages.
- Home, buyer preparation and confirmation pages: the baseline.

## Critical assumptions it rests on
- "Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form." Level in the intent: "partly supported" ([discovery/intents/format-fit.md:57](../intents/format-fit.md#L57)).
- [assumption: the rule names a format that someone who runs the training would also propose. No source checks it.]

## What we cannot see
- Whether the tester read the result before pressing "Inquire now".
- Whether the tester changed the format text and then left without sending. No event fires on a change in a field.
- `formatKept` shows only whether the format name is still in the text, not whether the tester agreed with it.

## Invented lines on the page
| Line the buyer sees | Who could confirm it |
|---|---|
| "Not sure which format fits your group? Answer five short questions." | the product lead |
| "Not sure what to answer? Take this small quiz." | the product lead |
| Q1 to Q5 and all their choices | the product lead and someone who runs the training |
| The Q2 ladder, adapted from the product lead's own questionnaire | the product lead |
| "If you do not know yet, leave it empty." | the product lead |
| "A format that could fit: <format>", the line on why, "in <n> groups" | someone who runs the training |
| "With your answers we can prepare a better call." | the staff who run scoping calls |
| "The quiz could not settle it." | the product lead |
| The rule from answers to format | someone who runs the training |

## Out of scope for the prototype
- The quiz on the home page. The idea names it ([discovery/intents/format-fit.md:82](../intents/format-fit.md#L82)), the prototype test does not need it.
- Saving answers across visits.
- A second format in the result.
- Changes to the five formats or their text.
- Styling beyond the existing `styles.css`.

## Open points for the human
- The sign "says afterwards why the format fits" has no element on the page. Proposal: after the send, the watcher asks once: "Why did you keep (or change) the first line?" · who can answer: the product lead · Answer: ____ (human decides before the build)
- The rule is invented. Someone who runs the training should read it before the first test with people. · who can answer: the product lead · Answer: ____ (human decides; does not block the build)
- The ladder in Q2 has five steps. A buyer who knows the group only from a distance may not tell them apart. The first tests show it. · who can answer: the tests with people · Answer: ____ (human decides after the tests)

## Build prompt
> Build the variant in discovery/specs/format-quiz.md as one file per page it changes in
> site/variants/format-quiz/, named like the page it replaces (inquiry.html, formats.html),
> and add the name to "variants" in site/config.json. Do not set "shipped".
