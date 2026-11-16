# Spec: format-quiz

> Spec drafted by an agent (`variant-spec`, mode `learn`) on 2026-11-16, before the prototype build. Built to learn, not to ship. Cut down the same day to the learn mode of the skill, see "Changes after review".
> **Variant:** `format-quiz` · Pages it changes: `formats.html`, `inquiry.html` · Testers start at `/formats.html?variant=format-quiz` or `/inquiry.html?variant=format-quiz`
> **Idea:** I1 in [discovery/intents/format-fit.md](../intents/format-fit.md) ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", [discovery/intents/format-fit.md:82](../intents/format-fit.md#L82))
> **Assumption under test:** "Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form." ([discovery/test-cards/format-quiz-prototype.md:33](../test-cards/format-quiz-prototype.md#L33))
> **Label:** interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

## Status
**Stage:** Ready to build, because the product lead decided on every "fix before the test" finding of both walkthrough runs, and every open point that touches a sign is answered. The new assumption from run 2 does not block.

| # | Date | Review | File | Findings | Decided |
|---|---|---|---|---|---|
| 1 | 2026-11-16 | persona walkthrough, run 1, on the spec as committed in 72d2430 | [discovery/user-tests/format-quiz-spec.md](../user-tests/format-quiz-spec.md) | fix before the test: 4 · fix if time allows: 2 · watch in the test: 1 | all 7 applied; the choice on old habits cut again in review 2 |
| 2 | 2026-11-16 | challenger, run 1 | this file, "Challenger check" | 11 findings | 9 applied, 2 kept |
| 3 | 2026-11-16 | persona walkthrough, run 2, on this spec uncommitted | [discovery/user-tests/format-quiz-spec-run2.md](../user-tests/format-quiz-spec-run2.md) | fix before the test: 2 · fix if time allows: 2 · watch in the test: 1 | 2 applied (duration and audience lines in the copied text); 1 not applied: a new assumption, not this test's; 3 to 5 left for the launch spec or the test |
| 4 | 2026-11-16 | the product lead looked at the built page, in three rounds | [site/variants/format-quiz/inquiry.html](../../site/variants/format-quiz/inquiry.html) | round 1: a build fault, the form text reads like a data export · round 2: too much bold text, Q3 misleading, "Other formats" confusing, "Copy the result" not needed · round 3: no way into the quiz from the form | all applied; two signs on the prototype card sharpened |

A spec describes the page so exactly that Claude Code can build it from this file alone.
In mode `learn` it covers only what the prototype test needs. Everything else is left out.
A critical assumption is the one thing that must be true for the idea to work.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/format-quiz-prototype.md:12](../test-cards/format-quiz-prototype.md#L12)).
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).

## Your first try
"A quiz that asks about: Team size, current AI usage level with examples, maybe 5 questions (good number of questions and content to be found out in the user tests)"

Where the draft differs:
- The draft writes out five questions, so the tester has something to answer. The user tests then sharpen them.
- The draft adds the result, the step into the form and the rule from answers to format. Without them a tester cannot meet the second half of the assumption.
- The product lead then added: two ways into the quiz, one format as the result, the form filled with the format and all answers, a free field for team size, several answers per question, and groups split when they are too large. The second way in and the group split were cut later, see "Changes after review".

Feedback:
- Strong: "Team size" and "current AI usage level with examples" are questions a buyer can answer about a real group. The persona file says the group's level is mixed ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)).
- Strong: "to be found out in the user tests" keeps the questions open to change. That is right for a prototype.
- Weak: the answer covers only the first half of the assumption. It left out the result and the step into the form, where the trust in the named format shows.

## What changes on the page
Each element names the sign or the part of the assumption it serves. The signs are on the prototype card ([discovery/test-cards/format-quiz-prototype.md:67](../test-cards/format-quiz-prototype.md#L67)).

### The formats page (the tester starts here)
1. Above the five format tiles, a box reads: "Not sure which format fits your group? Answer four short questions." It has a button "Start the quiz". [invented] Serves: the tester who cannot tell which format fits finds the quiz.
2. The tiles, the line below them and the button "Make an inquiry" stay as today ([site/formats.html:22](../../site/formats.html#L22) to [site/formats.html:30](../../site/formats.html#L30)). Serves: the sign that the tester leaves or goes back to the formats.

### The quiz
1. "Start the quiz" on the formats page, and "Unsure? Take this quiz" on the inquiry page, open the same quiz in an overlay above the page. One question shows at a time, with "Next" and "Back".
2. Q2 and Q4 allow several ticks. Only Q4 has the choice "Not sure". Q3 allows one choice. "Next" works with no answer; an empty question counts as "Not sure" in the rule. Serves: the signs that the tester answers every question, or stops at one or skips it.
   For the watcher: a "Not sure" tick counts as an answer. "Next" with nothing ticked or typed counts as a skip.
3. A link "Close the quiz" stays visible at the top of the overlay. It closes the quiz. Serves: the sign that the tester leaves.

The four questions. Every line is invented, unless it says otherwise. Serve: the first half of the assumption, that buyers answer a few questions about their team.

| # | Question | Answer type | Choices |
|---|---|---|---|
| Q1 | How many people would take part? | number field, whole number of 1 or more; hint below: "If you do not know yet, leave it empty." | none |
| Q2 | Which of these working styles are in your group? Tick all that apply. | several ticks, each with one example in smaller text below it | Assisting: AI for small things, a draft, a summary. Example: asks a chat assistant to sum up a meeting · Conversational: working back and forth with one AI. Example: writes a user story together with a chat assistant · Delegating: handing over whole tasks with several steps. Example: gives an agent a research task and gets back a finished report · Orchestrating: several AI agents in parallel. Example: runs one agent per task at the same time and reviews their work · System-building: their own setups that turn an intent into finished work. Example: built a shared set of skills that turns an intent into a spec |
| Q3 | How does the group work together today? | one choice | As one team, on one product · People come from different teams or products |
| Q4 | What gets in the way for them today? Tick all that apply. | several ticks | One topic keeps coming up, and no one in the group knows it well · They are at very different levels with AI, and have no shared start · They know AI tools, but do not use them on real backlog work · One team wants to change how it works together · Single people want feedback on how they work day to day · Not sure |

The ladder in Q2 is adapted from a questionnaire of the product lead outside this repo. It holds no client data. The examples under each step are invented.

### The rule from answers to format
The rule is invented and marked so in the page code. It only has to name a format that plausibly fits the tester's group. The first step that names a format wins.

1. **Every Q4 tick other than "Not sure" stands for the same format:** that format.
   | Q4 choice | Format |
   |---|---|
   | One topic keeps coming up, and no one in the group knows it well | Half-day workshop |
   | They are at very different levels with AI, and have no shared start | Two-day training |
   | They know AI tools, but do not use them on real backlog work | Agentic Product Management lab |
   | One team wants to change how it works together | Multi-week team coaching |
   | Single people want feedback on how they work day to day | Shadowing |
   The five formats and their audiences come from the formats page ([site/formats.html:23](../../site/formats.html#L23) to [site/formats.html:27](../../site/formats.html#L27)).
   Multi-week team coaching needs "As one team, on one product" in Q3. The formats page names "one intact product team" ([site/formats.html:26](../../site/formats.html#L26)). Without that choice, go to step 2.
2. **Q4 ticks for several formats, only "Not sure", or step 1 sent the rule here:** Q2 decides.
   - Q2 has only "Delegating", "Orchestrating" or "System-building": Agentic Product Management lab.
   - Otherwise: Two-day training. The formats page names mixed roles for it ([site/formats.html:24](../../site/formats.html#L24)). This covers a group with a wide range of working styles, and a tester who answered nothing. The product lead confirms the reason: the spread of levels matters, and the training starts at the lowest level in the group (2026-11-16).

Q1 does not change the format. It goes into the form text for the scoping call.

### The result
Serves: the second half of the assumption, that the tester trusts the named format enough to start the form.
1. The quiz shows the result in the same overlay.
2. Heading: "A format that could fit: <format>". [invented]
3. One line on why, built from the tester's own answers. For example: "You said people from different teams or products, very different levels with AI." [invented pattern]
4. One line, adapted from [site/formats.html:21](../../site/formats.html#L21): The scoping call shapes the real format.
5. Cut after the build: the list "Other formats" below the result. See "Changes after review".
6. A button "Inquire now". [invented] Serves: the sign that the tester takes the step into the form.
7. Cut after the build: the button "Copy the result". See "Changes after review".

### The step into the form
1. On the formats page, "Inquire now" stores the result and the answers in the browser (`sessionStorage`, key `format-quiz`) and opens `/inquiry.html?variant=format-quiz`. On the inquiry page the button reads "Use this": it closes the overlay and fills the form at once. [invented]
2. The inquiry page reads the storage, fills the form and scrolls to it. It does not put the cursor into a field. A started form is counted when the visitor clicks into a field ([site/components/inquiry-form.js:41](../../site/components/inquiry-form.js#L41)). The tester must do that click. Serves: the sign that the tester clicks into a form field.
3. "What do you need?" is filled with text built from the tester's answers. It reads as the buyer would write it. [invented] Every "Not sure" tick is left out, and so is a line with no answer left. The first line always names the format. Serves: the signs that the tester keeps the named format, or deletes it.
   ```
   A format that could fit us: <format>.
   About <Q1> people would take part.
   They work as one team, on one product. / They come from different teams or products.
   In the group, people <Q2 ticks as phrases, joined with "and">.
   What gets in the way today:
   - <each Q4 tick, one per line>.
   ```
   The phrases for Q2: Assisting "use AI for small things", Conversational "work back and forth with one AI", Delegating "hand over whole tasks to agents", Orchestrating "run several agents in parallel", System-building "build their own setups that turn an intent into finished work". With Q1 = 1 the line reads "One person would take part."
4. The tester can change or delete every filled text. Sending works as today, and the page redirects to `/confirmation.html` as today.
5. On the inquiry page, a text button "Unsure? Take this quiz" stands next to the label "What do you need?". [invented] Clicking it does not put the cursor into the form, so it does not count as a started form. A new quiz result replaces the last quiz text in the field. Text the tester typed stays, and the quiz text goes below it. Serves: 364 of 740 inquiry page visits had no formats page view before them in the same session, in synthetic data ([data/events.jsonl](../../data/events.jsonl)). These visitors would never see the quiz on the formats page.

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester answers every quiz question for their own group ([:69](../test-cards/format-quiz-prototype.md#L69)) | each question, Q1 to Q4 |
| On the quiz result, the tester uses the step to the form and clicks into a form field ([:70](../test-cards/format-quiz-prototype.md#L70)) | the button "Inquire now" or "Use this", then any field of the form |
| The tester sends the form and keeps the named format in the first line ([:71](../test-cards/format-quiz-prototype.md#L71)) | the first line of "What do you need?", then "Send inquiry" |
| Asked afterwards, the tester says why the format fits ([:72](../test-cards/format-quiz-prototype.md#L72)) | no element: the watcher asks after the send (open point) |
| The tester stops at a question, or skips it ([:73](../test-cards/format-quiz-prototype.md#L73)) | each question; "Next" with no answer |
| On the quiz result, the tester looks around for what to do next ([:74](../test-cards/format-quiz-prototype.md#L74)) | the result, with "Inquire now" or "Use this", and "Back" |
| The tester deletes the named format in the first line, or puts another there ([:75](../test-cards/format-quiz-prototype.md#L75)) | the first line of "What do you need?" |
| The tester leaves the page, or goes back to the formats ([:76](../test-cards/format-quiz-prototype.md#L76)) | "Close the quiz", the navigation. Opening the quiz from the form is not leaving |
| The tester says "I'm guessing" ([:77](../test-cards/format-quiz-prototype.md#L77)) | no element: words the tester says aloud |

The tester can skip the quiz. Then the quiz signs cannot show, and the watcher notes that the tester skipped it.

## Fields and validation
| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|
| `name` | string | yes | as today |
| `company` | string | yes | as today |
| `email` | string | yes | a valid email, as today |
| `teamSize` | number | no | as today; the quiz does not fill it |
| `message` | string | yes | at least 10 characters, as today; filled from the quiz |

No new fields. The quiz answers reach the server only as text in `message`.

## What stays the same
- The five format tiles and their text, the inquiry form, its validation and the send to `/api/inquiry`.
- The site's existing events, which fire as today. The quiz adds none.
- Home, buyer preparation and confirmation pages, the navigation and the footer.

## Invented lines on the page
| Line the buyer sees | Who could confirm it |
|---|---|
| "Not sure which format fits your group? Answer four short questions." | the product lead |
| "Unsure? Take this quiz", the overlay heading "Which format could fit your group?", "Use this" | the product lead |
| Q1 to Q4, their choices, the hint under Q1 and the examples under Q2 | the product lead and someone who runs the training |
| The rule from answers to format | someone who runs the training |
| "A format that could fit: <format>" and the line on why | someone who runs the training |
| "Inquire now" | the product lead |
| The text in "What do you need?", written as the buyer would write it | the product lead |

## Left out to learn faster
- The quiz on the home page: the idea names it ([discovery/intents/format-fit.md:82](../intents/format-fit.md#L82)), the test does not need it. · for the launch spec
- Events for the quiz and the hidden fields `quizFormat` and `quizFrom`: the watcher reads the page, not the events. · for the launch spec
- Splitting a large group into several groups: it does not test trust in the named format. · for the launch spec
- A rule that picks which other formats to show: the four other formats by name give options to react to. · for the launch spec
- A working copy to the clipboard, with a fallback box: the test only needs to see the press. · for the launch spec
- A Q4 choice on a training that did not stick: only the buyer with budget backs it ([product/personas/buyer-with-budget.md:54](../../product/personas/buyer-with-budget.md#L54)), and the card recruits only buyers without budget ([discovery/test-cards/format-quiz-prototype.md:96](../test-cards/format-quiz-prototype.md#L96)). · for the launch spec
- The rule step "only half a day of time away means the Half-day workshop": the question on time away is cut too. · for the launch spec
- The result line "With your answers we can prepare a better call." and the link "Back to all formats": no sign needs them; the links under "Other formats" lead back to the tiles. · for the launch spec
- Q5, how much time the group can spend away from work: no sign and no rule step uses it. · for the launch spec
- The link "Change my answers": "Back" does the same job. · for the launch spec
- Filling "Team size (optional)" from Q1: Q1 is already in the form text, and no sign reads the field. · for the launch spec
- Fallbacks when the browser blocks storage or the clipboard: the test runs in a browser the watcher controls. · for the launch spec
- Links on the other formats: a click would look like the drop sign of going back to the formats. · for the launch spec
- The list "Other formats" below the result, and the button "Copy the result": cut after the build. · for the launch spec, if the test shows testers miss them
- Saving answers across visits, changes to the five formats, styling beyond the existing `styles.css`, a few rules for the quiz choices and the overlay.

## Changes after review
- After the persona walkthrough on the spec ([discovery/user-tests/format-quiz-spec.md](../user-tests/format-quiz-spec.md)): other formats beside the result, a way to take the result to colleagues, Q4 asks what gets in the way today, no "Not sure" lines in the form text, a wide range of working styles gets the two-day training, examples under the Q2 styles. A Q4 choice on old habits went in, then out again. · Decided by: Product lead (Loopwise), 2026-11-16
- Cut down to the learn mode of `variant-spec`: everything under "Left out to learn faster". The product lead asked whether the test needs all of it, and chose to build to learn. · Decided by: Product lead (Loopwise), 2026-11-16
- After the challenger run: the proposals in "Challenger check" applied as proposed. · Decided by: Product lead (Loopwise), 2026-11-16
- After persona walkthrough run 2 ([discovery/user-tests/format-quiz-spec-run2.md](../user-tests/format-quiz-spec-run2.md)): the copied text carries each format's duration and audience lines. · Decided by: Product lead (Loopwise), 2026-11-16
- Not applied from run 2: how to read a tester who copies the result and leaves. The product lead calls it a new assumption, not part of the one under test: [assumption: buyers without budget start an inquiry only after they talked it through with colleagues ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41))]. The watcher still notes whether "Copy the result" came first. · Decided by: Product lead (Loopwise), 2026-11-16
- After the product lead looked at the built page: the text in "What do you need?" read like a data export. The product lead would not send it like this. It now reads as the buyer would write it, and every "Not sure" tick is left out. This undoes the challenger decision to keep a "Not sure" tick next to other ticks. Two signs on the prototype card now name the format in the first line ([discovery/test-cards/format-quiz-prototype.md:71](../test-cards/format-quiz-prototype.md#L71), [discovery/test-cards/format-quiz-prototype.md:75](../test-cards/format-quiz-prototype.md#L75)). A tester who rewords the other lines does not show the drop sign. · Decided by: Product lead (Loopwise), 2026-11-16
- After the product lead looked at the built page a second time: the quiz choices are in normal weight, with more space and the example in muted text. Q3 is now "How does the group work together today?", with one choice and no "Not sure". The product lead found "same product" against "several teams" misleading, and "Not sure" made no sense there. The list "Other formats" is cut: the product lead found it confusing. It served the buyer without budget, who needs options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The test shows whether testers miss it. The button "Copy the result" is cut: the product lead sees no need for it. The watcher no longer notes whether a tester copied the result before leaving. · Decided by: Product lead (Loopwise), 2026-11-16
- Q2 has no "Not sure" any more: the product lead finds it does not fit a question on the working styles in the group. · Decided by: Product lead (Loopwise), 2026-11-16
- The quiz gets a second way in, from the inquiry page, and opens in an overlay on both pages. The product lead pointed out that the test start did not match how visitors arrive. 364 of 740 inquiry page visits had no formats page view before them in the same session ([data/events.jsonl](../../data/events.jsonl)). Some testers now start on the inquiry page; the prototype card proposes 2 of 5. Opening the quiz from the form does not count as the drop sign ([discovery/test-cards/format-quiz-prototype.md:76](../test-cards/format-quiz-prototype.md#L76)). · Decided by: Product lead (Loopwise), 2026-11-16

## Challenger check
A subagent with no other context read only the prototype card and this spec on 2026-11-16. It looked for elements that serve no sign and no part of the assumption, second paths, unlikely edge cases and parts the build could fake. It found the core path complete: quiz, result, "Inquire now", form filled, click into a field, send.

| Element | What the challenger says | Proposal | Decided |
|---|---|---|---|
| "Copy the result", faked | No sign is about sharing. A tester who pastes finds an empty clipboard. | simplify: a real copy, no fallback | applied |
| Links under "Other formats" | A click looks like the drop sign of going back to the formats. | simplify: names and audience lines, no links | applied |
| "Change my answers" | No sign needs it; "Back" does the same. | cut | applied |
| Q5, time away from work | No sign and no rule step uses it. | cut | applied |
| "Team size" filled from Q1 | Q1 is in the form text already; no sign reads the field. | cut | applied |
| Fallback when storage is blocked | The test runs in a browser the watcher controls. | cut | applied |
| Dropping a "Not sure" tick next to other ticks | A fine point the test does not need. | cut | applied |
| The coaching check on Q3 | An unlikely edge case. | keep: without it the quiz could name coaching for several teams, against [site/formats.html:26](../../site/formats.html#L26) | kept |
| "Back", "Close the quiz", "Make an inquiry" | Second paths to the same signs. | keep: cheap, and a skipped quiz is an outcome the watcher notes | kept |
| How a "Not sure" tick counts | No rule tells the watcher; sign 69 against sign 73 turns on it. | a tick counts as an answer, "Next" with nothing counts as a skip | applied |
| The question after the send | Without it the sign "says why the format fits" cannot show. | the watcher asks once: "Why did you keep (or change) the first line?" | applied |

Decided by: Product lead (Loopwise), 2026-11-16.

## Open points for the human
- The sign "says afterwards why the format fits" has no element on the page. Proposal: after the send, the watcher asks once: "Why did you keep (or change) the first line?" · who can answer: the product lead · Answer: yes, the watcher asks this question (Product lead (Loopwise), 2026-11-16)
- The rule is invented. Someone who runs the training should read it before the first test with people. · who can answer: the product lead · Answer: ____ (human decides; does not block the build)
- The ladder in Q2 has five steps, with one example each. A buyer who knows the group only from a distance may still not tell them apart. The first tests show it. · who can answer: the tests with people · Answer: ____ (human decides after the tests)

## Build prompt
> Build the variant in discovery/specs/format-quiz.md as one file per page it changes in
> site/variants/format-quiz/, named like the page it replaces (inquiry.html, formats.html),
> and add the name to "variants" in site/config.json. Do not set "shipped".
> Build only what the spec names. Where the spec says an element is faked, do not wire it up.
