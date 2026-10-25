# Spec: format-quiz

> Spec drafted by an agent (`variant-spec`) on 2026-10-25, before the build.
> **Variant:** `format-quiz` · Pages it changes: `formats.html`, `inquiry.html` · Tester starts at `/formats.html?variant=format-quiz`
> **Idea:** I2 in `discovery/intents/format-question.md` ("I2, a small quiz next to the form", `discovery/intents/format-question.md:59`)
> **Assumption under test:** "A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person." (`discovery/test-cards/format-quiz-prototype.md:25`)
> **Label:** interviews are anonymised composites; mails, inbox and data are synthetic (`discovery/intents/format-question.md:5`). This spec repeats that label.

A spec is the hand-over to the build. It says what the page does, precisely enough to build it from this file alone.
A critical assumption is the one thing that must be true for an idea to work.
This spec covers only what the prototype test needs.

## Your first try
"a five page inline quiz on the format page, that then prefills the inquiry form" · Where the draft differs:
- The quiz sits inline on the formats page, as in the answer. The form stays on the inquiry page. The idea puts the quiz link "next to the form" (`discovery/intents/format-question.md:37`), so the link sits on both pages.
- The five pages are five questions, one per screen. The draft leaves out a question about how much time the team can give. That question would ask for the format again. The intent wants the sponsor to say what the team needs "without naming a format first" (`discovery/intents/format-question.md:16`).

## What changes on the page

Confirmed by the human on 2026-10-25 ("looks good"). Changed the same day after the persona walkthrough (`discovery/user-tests/format-quiz-spec.md`), at the human's request.

**Formats page** (`site/variants/format-quiz/formats.html`)
1. Below the lead line, a link reads: Unsure what to pick? Find out in a small quiz. The wording is the pair's own (`discovery/intents/format-question.md:37`). The format cards and the "Make an inquiry" button stay as today (`site/formats.html:22`, `site/formats.html:27`).
   Below the last format card, just above the "Make an inquiry" button, a line reads: Prefer to talk first? Every inquiry leads to a scoping call with us. The confirmation page already promises that call (`site/confirmation.html:24`). The line is text, not a link or a button. It sits away from the quiz link, so a tester who skips the quiz does not skip it because of this line.
2. A click on the quiz link opens the quiz in place, on the same page. The link hides while the quiz is open. The quiz has five screens, one question each. Each screen shows "Question n of 5".
3. Each screen has a Back button and a Next button. Back is hidden on the first screen. Next works without an answer, so a question can stay empty.
   Every screen also offers the answer "I don't know yet". Choosing it clears the other answers on that screen. Choosing another answer clears it.
4. The questions and their answer options:
   - **Q1, Who is in the team?** Tick boxes, several allowed:
     - Product managers · adapted from `sources/emails/inquiry-01.md:14`
     - Product owners · adapted from `sources/emails/inquiry-01.md:14`
     - UX people · adapted from `sources/emails/inquiry-01.md:14`
     - People moving over from project management and consulting · adapted from `sources/inbox/inbox-export.md:125`
     - Not decided yet, it could be several teams · adapted from `sources/interviews/sponsor-soft.md:53` and `sources/interviews/sponsor-soft.md:57`
   - **Q2, How many people are in the team?** One number field, whole numbers of 1 or more. Sponsors name team sizes in their mails (`sources/emails/inquiry-03.md:14`, `sources/emails/inquiry-01.md:14`). "I don't know yet" empties the number field.
   - **Q3, Where does the team stand with AI today?** Tick boxes, several allowed. Levels differ inside a group and between teams (`sources/interviews/sponsor-soft.md:45`).
     - Almost no hands-on AI experience · adapted from `sources/inbox/inbox-export.md:125`
     - Some already use chat tools, some don't · adapted from `sources/emails/inquiry-01.md:14`
     - Tools are rolled out, but the actual work hasn't changed · adapted from `sources/interviews/sponsor-hard.md:23`
     - From never written a prompt to building their own agents · adapted from `sources/interviews/sponsor-hard.md:45`
   - **Q4, What has the team tried before?** Tick boxes, several allowed. One team can have had a course for developers and an earlier training that changed nothing (`sources/interviews/sponsor-hard.md:23`, `sources/interviews/sponsor-hard.md:45`).
     - Nothing yet, this is the first training · invented. Ticking it clears the other ticks on this screen, as "I don't know yet" does.
     - Some went to an external course, mostly optional · adapted from `sources/interviews/sponsor-soft.md:21`
     - A training after which daily work stayed the same · adapted from `sources/emails/inquiry-04.md:14` and `sources/interviews/sponsor-hard.md:23`
     - Developers got training, product people did not · adapted from `sources/emails/inquiry-04.md:16` and `sources/interviews/sponsor-hard.md:45`
   - **Q5, What should be different after the training?** Tick boxes, several allowed:
     - People say where it helped them in their work · adapted from `sources/interviews/sponsor-soft.md:61`
     - Other teams ask to have a look · adapted from `sources/interviews/sponsor-soft.md:61`
     - One or two things people use straight after · adapted from `sources/interviews/sponsor-hard.md:17`
     - Something concretely different four weeks later, and a way to measure it · adapted from `sources/interviews/sponsor-hard.md:33`
5. The quiz names no format and no price. Prices stay off the website (`product/constraints.md:7`).
6. On the fifth screen, Next reads "Continue to the inquiry". A click saves the answers in the tab's session storage under the key `formatQuiz`. The answers never go into the URL. Then the page opens `/inquiry.html?variant=format-quiz`.

**Inquiry page** (`site/variants/format-quiz/inquiry.html`)
7. Next to the form, the same link reads: Unsure what to pick? Find out in a small quiz. It leads to `/formats.html?variant=format-quiz&quiz=open`. That address opens the formats page with the quiz already open. The server does not add `?variant=` to a link that already has a query (`server.js:122`), so the link carries it itself.
   Below the link, a line reads: After you send this, we book a scoping call with you. In the call we talk about the format and how you will know it worked. The confirmation page promises the call and the format talk (`site/confirmation.html:24`, `site/confirmation.html:25`). The academy wants sponsors to come to that call with a success line (`product/vision.md:39`). A success line is one sentence that says how the sponsor will know the format worked (`product/glossary.md:29`).
8. If `formatQuiz` exists in session storage, the page fills the form on load:
   - Team size gets the answer to Q2.
   - The message field gets one line per answered question, built only from the sponsor's ticks and entries. Example shape: "Team: product owners, UX people." Each line has a short invented label: Team, Size, Where the team stands with AI, Tried before, After the training we want. A question answered with "I don't know yet" adds its label and "I don't know yet". A question left empty adds no line.
   - Hidden fields inside the `<form>` get the raw answers (see "Fields and validation").
9. The sponsor can change every filled field. Name, company and email stay empty and required.
10. Sending works as today. The form posts to `/api/inquiry` and opens `/confirmation.html` (`site/components/inquiry-form.js:54`, `site/components/inquiry-form.js:63`). After a successful send, the page removes `formatQuiz` from session storage.
11. Without quiz answers, the inquiry page is today's page plus the link.

## Where the watcher sees each sign

| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester clicks the quiz link before writing in the form | The quiz link below the lead line on the formats page, and next to the form on the inquiry page. A tester can reach the form only through one of the two pages, so the link is in view on every path. |
| The tester answers every quiz question without asking the watcher what it means | The five quiz screens. The hidden field `quizAnswered` later shows how many questions had an answer. |
| The tester finishes the quiz and sends the inquiry | The "Continue to the inquiry" button on screen five, then the send button on the inquiry page. |
| The tester stops at a question, says "I don't know", or leaves it empty | Each quiz screen. Next works with no answer, so an empty question is possible on every screen. The "I don't know yet" answer on every screen, counted later in the hidden field `quizUnsure`. |
| The tester passes the link and writes straight into the form | The "Make an inquiry" button and the Inquiry link in the menu lead to the form without the quiz. The quiz link stays beside the form there. |
| The tester asks for a call or a person instead of the quiz | The line about the scoping call below the format cards, and the same kind of line next to the form. The page offers no call booking. The watcher hears the request. See "Open points for the human". |
| The tester says the quiz takes too long, or asks how many questions are left | The quiz screens. The "Question n of 5" line may stop testers asking how many are left. See "Open points for the human". |

## Fields and validation

| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|
| `name` | string | yes | not empty (`site/components/inquiry-form.js:10`) |
| `company` | string | yes | not empty (`site/components/inquiry-form.js:11`) |
| `email` | string | yes | a valid email address (`site/components/inquiry-form.js:13`) |
| `teamSize` | string of digits | no | whole number of 1 or more (`site/components/inquiry-form.js:20`). Filled from Q2. |
| `message` | string | yes | at least 10 characters (`site/components/inquiry-form.js:4`). Filled from the quiz answers, editable. |
| `quizRoles` | string, hidden | no | the ticked Q1 options joined with "; ". The page cuts it to 300 characters. |
| `quizStand` | string, hidden | no | the ticked Q3 options joined with "; ". The page cuts it to 300 characters. |
| `quizBefore` | string, hidden | no | the ticked Q4 options joined with "; ". The page cuts it to 300 characters. |
| `quizAfter` | string, hidden | no | the ticked Q5 options joined with "; ". The page cuts it to 300 characters. |
| `quizAnswered` | string of digits, hidden | no | 0 to 5, how many questions had an answer other than "I don't know yet". Empty when the sponsor did not take the quiz. |
| `quizUnsure` | string of digits, hidden | no | 0 to 5, how many questions got "I don't know yet". Empty when the sponsor did not take the quiz. |

"I don't know yet" goes into the hidden field of its question as that text. For Q2 it goes nowhere, and `teamSize` stays empty.

The server keeps extra fields as top-level strings, at most 20 keys, cut to 300 characters (`server.js:84`, `server.js:85`). This variant adds six. The hidden fields have no text input, so the page itself keeps them under 300 characters. The message field gets `maxlength` only if the build changes the core validation; today it has none (`site/inquiry.html:27`). Empty strings are not stored (`server.js:137`).

## Events to emit

The prototype test does not read these. They are there for a later launch.

| Event | When it fires | Props |
|---|---|---|
| `page_view` | formats page load | `{ page: 'formats' }` |
| `page_view` | inquiry page load, as today (`site/inquiry.html:36`) | `{ page: 'inquiry' }` |
| `inquiry_step_completed` | each click on Next in the quiz, screens 1 to 5. Not on Back. | `{ step: 1 to 5, answered: true or false, unsure: true or false }`, `unsure` true for "I don't know yet" |
| `inquiry_started` | first focus inside the form, as today (`site/components/inquiry-form.js:40`). Not on quiz start. | `{}` |
| `inquiry_submitted` | after the server accepts the inquiry, as today (`site/components/inquiry-form.js:61`) | `{ quiz: true or false }`, true when quiz answers filled the form |

The variant name comes from `?variant=` (`site/components/events.js:23`).

## What stays the same
- The format cards and their wording (`site/formats.html:22`).
- The form fields, their labels and the core validation (`site/inquiry.html:23`, `site/components/inquiry-form.js:7`).
- The send button, the error messages and the confirmation page.
- Home, sponsor preparation and the confirmation page stay the baseline pages.

## Critical assumptions it rests on
- "A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person." (`discovery/intents/format-question.md:60`) · partly supported (`discovery/intents/format-question.md:37`). One sender asks to be asked: "Then you can ask me the questions I apparently don't know to ask." (`sources/emails/inquiry-03.md:16`). The same sender proposes a call for it, not a page.
- [assumption: session storage keeps the answers from the formats page to the inquiry page in the same tab. A tester who opens the inquiry page in a new tab gets an empty form.]

## What we cannot see
- A sponsor who opens the quiz and leaves before the first Next. No event fires for the click on the link.
- Clicks on Back, and time spent on each question.
- Whether the sponsor changed the filled message before sending. The record holds only the sent text.
- Whether the sponsor read the format cards before or after the quiz.
- The baseline formats page logs no `page_view` (`site/formats.html` has no script). The variant does. A later count of formats page visits is then not the same on both sides.

## Invented lines on the page

| Line the sponsor sees | Who could confirm it |
|---|---|
| Unsure what to pick? Find out in a small quiz (the pair's wording, `discovery/intents/format-question.md:37`) | soft sponsors in the cross test |
| Question n of 5 | testers in the cross test |
| Q1 Who is in the team? | soft sponsors in the cross test |
| Q2 How many people are in the team? | soft sponsors in the cross test |
| Q3 Where does the team stand with AI today? | soft sponsors in the cross test |
| Q4 What has the team tried before? | soft sponsors in the cross test |
| Q5 What should be different after the training? | soft and hard sponsors in the cross test |
| Nothing yet, this is the first training | soft sponsors in the cross test |
| I don't know yet | soft and hard sponsors in the cross test |
| Not decided yet, it could be several teams | soft sponsors in the cross test |
| Prefer to talk first? Every inquiry leads to a scoping call with us. | hard sponsors in the cross test |
| After you send this, we book a scoping call with you. In the call we talk about the format and how you will know it worked. | hard sponsors in the cross test, and academy staff who run scoping calls |
| Back · Next · Continue to the inquiry | testers in the cross test |
| Message labels: Team, Size, Where the team stands with AI, Tried before, After the training we want | academy staff who read inquiries |

## Out of scope for the prototype
- A format suggestion after the quiz.
- The quiz on the home page or sponsor preparation page.
- A call booking instead of the form.
- Storing quiz answers on the server without a sent inquiry.
- Design polish beyond the existing styles in `site/styles.css`.

## Open points for the human
- **Touches a sign:** "Question n of 5" may stop testers asking how many questions are left. That is half of one rework sign. Keep the line, or drop it for the test? · who can answer: the pair · Answer: ____ (human decides; before the build)
- **Touches a sign:** the page offers no call or person. A tester who wants one can only say so. The hard sponsor "Wants to talk to someone who delivered it, or a comparable reference" (`product/personas/sponsor-hard.md:46`). Is hearing it enough for the watcher? · who can answer: the pair · Answer: Reference decision (replace with your own): add a line about the scoping call on both pages. No call booking and no reference on the page.
- The quiz has no "I don't know" option. A tester who does not know leaves the question empty or says so aloud. Add the option, or leave it out? · who can answer: the pair · Answer: Reference decision (replace with your own): add "I don't know yet" to every screen.
- **Touches a sign:** the line about the scoping call sits right below the quiz link. A tester may read it and go to the form without the quiz. Then the sign "passes the link" mixes two reasons. Keep the line there, or move it below the format cards? · who can answer: the pair · Answer: Reference decision (replace with your own): move it below the format cards.
- The variant logs `page_view` on the formats page; the baseline does not. Add it to the baseline before a launch? · who can answer: whoever owns the site · Answer: ____ (human decides)
- The confirmation page says only "We received your inquiry." (`site/confirmation.html:21`). The quiz promises nothing more, so no change is planned. · who can answer: the pair · Answer: ____ (human decides)

## Build prompt
> Build the variant in discovery/specs/format-quiz.md as one file per page it changes in
> site/variants/format-quiz/, named like the page it replaces (inquiry.html, formats.html),
> and add the name to "variants" in site/config.json. Do not set "shipped".
