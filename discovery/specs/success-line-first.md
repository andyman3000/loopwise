# Spec: success-line-first

> Spec drafted by an agent (`variant-spec`) on 2026-08-18, before the build.
> **Variant:** `success-line-first` · Pages it changes: `inquiry.html` · Tester starts at `/inquiry.html?variant=success-line-first`
> **Idea:** I12 in `discovery/intents/format-question.md` ("I12, the inquiry page opens with what should be different for the team", `discovery/intents/format-question.md:69`)
> **Assumption under test:** "A sponsor who is shown example answers can say what should be different for the team after the training." (`discovery/test-cards/success-line-first-prototype.md:23`)
> **Label:** interviews are anonymised composites; mails, inbox and data are synthetic (`discovery/intents/format-question.md:5`). This spec repeats that label.

A spec is the hand-over to the build. It says what the page does, precisely enough to build it from this file alone.
A critical assumption is the one thing that must be true for an idea to work.
A success line is one sentence that says how the sponsor will know the format worked (`product/glossary.md:29`).
This spec covers only what the prototype test needs.

The page already exists. It was copied from an earlier build (`site/variants/success-line-first/inquiry.html`, `site/variants/success-line-first/success-line-first.js`). This spec describes that page as it is. Where this skill would want a different page, the change is listed under "Open points for the human", not made on the page.

## Your first try
"Showing three potential examples, which then prefill the form when clicked" · Where the draft differs:
- The examples do not fill the contact form. They fill a separate box for the success line. The message field "What do you need?" stays empty, and the sponsor writes it as a second text.
- The page shows six examples, not three. Three come from the soft sponsor and three from the hard sponsor. Idea I12 asks for "example answers for both kinds of sponsor" (`discovery/test-cards/success-line-first-prototype.md:6`).

## What changes on the page

Confirmed by the human on 2026-08-18 ("Yes, fine").

**Inquiry page** (`site/variants/success-line-first/inquiry.html`)
1. The page opens with the question: What should be different for your team in three months? The wording is the pair's, from idea I12 (`discovery/intents/format-question.md:41`). The contact form is hidden at this point (`site/variants/success-line-first/inquiry.html:56`).
2. Below the question, a note reads: Pick an example, change it, or write your own. One sentence is enough. (invented, `site/variants/success-line-first/inquiry.html:34`). Below the note is a text box labelled "In your words" (`site/variants/success-line-first/inquiry.html:36`).
3. Six example buttons sit in two groups:
   - Group heading: If you want people to take it into their daily work · invented
     - People in the team say: this helps me, here is where I used it. · adapted from `sources/interviews/sponsor-soft.md:61`
     - Other teams come over on their own and ask to have a look. · adapted from `sources/interviews/sponsor-soft.md:61`
     - The pilot team carries on by itself, so we can repeat it with more teams. · adapted from `sources/interviews/sponsor-soft.md:67`
   - Group heading: If you need to show the effect · adapted from `sources/interviews/sponsor-hard.md:13`
     - The team uses one or two things productively straight after the format. · adapted from `sources/interviews/sponsor-hard.md:17`
     - People work differently in their own team, not only know more. · adapted from `sources/interviews/sponsor-hard.md:33`
     - We agreed up front what we will look at, and we check it again after four to six weeks. · adapted from `sources/interviews/sponsor-hard.md:27` and `sources/interviews/sponsor-hard.md:29`
4. A click on an example copies its text into the "In your words" box (`site/variants/success-line-first/success-line-first.js:111`). The sponsor can then change the text. A click on another example replaces it.
5. A tick box reads: Don't know yet. Let's work it out in the call. (invented, `site/variants/success-line-first/inquiry.html:51`). Ticking it greys out the text box and the examples (`site/variants/success-line-first/success-line-first.js:118`). Unticking it makes them usable again.
6. Below the tick box, a note reads: We settle the format together in the scoping call. You do not need to choose one now. The first sentence is adapted from `site/confirmation.html:25`. The second is invented.
7. The Continue button checks the first step (`site/variants/success-line-first/success-line-first.js:33`). It passes if the tick box is ticked, or if the box holds text of 300 characters at most. With an empty box, the page shows: Pick an example, write your own line, or tick "Don't know yet". (invented). With a longer text, it shows: Please keep it to one or two sentences (300 characters at most). (invented)
8. After Continue, the contact form appears and the page scrolls to it. Above the form, a line shows "Your success line:" and the sponsor's line, or "Success line: to work out in the call" after a tick (`site/variants/success-line-first/success-line-first.js:82`). A Change link next to it scrolls back to the first step.
9. The form is today's form: name, company, email, team size and the message field "What do you need?" (`site/variants/success-line-first/inquiry.html:59` to `:63`, same as `site/inquiry.html:23` to `:27`). The message field starts empty. The page does not fill it from the success line.
10. Send checks the contact fields with the core validation (`site/components/inquiry-form.js:7`). It then checks the first step again. If both pass, the page posts the inquiry to `/api/inquiry` and opens `/confirmation.html`.
11. The page names no format and no price. Prices stay off the website (`product/constraints.md:7`).

The page sends an inquiry. It does not book a call, and it logs no `scoping_call_booked`.

## Where the watcher sees each sign

| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester picks an example and changes words in it to fit their team, or writes their own line | The example buttons and the "In your words" box. The field `successLineChoice` later shows `edited-example` or `own`. Every path passes this step: Continue needs a line or a tick. |
| The tester goes on to the contact form and sends the inquiry | The Continue button, then the send button. The form appears only after Continue, so every sent inquiry passes the first step. See the open point on the empty message field. |
| The tester ticks "Don't know yet", or says they do not know what should be different | The tick box below the examples. The field `successLineUnknown` later shows `true`. |
| The tester asks the watcher what the question means or what kind of answer is wanted | The question at the top. The watcher hears it. The note below the question already says what kind of answer is wanted. See "Open points for the human". |
| The tester scrolls past the question to look for the form, or asks which format to choose | The first step. The form is hidden until Continue, so a tester who scrolls down finds no form. The note "You do not need to choose one now" answers the format question before the tester asks it. See "Open points for the human". |
| The tester asks for a call or a person instead | The page offers no call booking. The tick box says "Let's work it out in the call". A tester who wants a person may tick it. Then this sign and the "Don't know yet" sign look the same. See "Open points for the human". |

## Fields and validation

| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|
| `name` | string | yes | not empty (`site/components/inquiry-form.js:10`) |
| `company` | string | yes | not empty (`site/components/inquiry-form.js:11`) |
| `email` | string | yes | a valid email address (`site/components/inquiry-form.js:13`) |
| `teamSize` | string of digits | no | whole number of 1 or more (`site/components/inquiry-form.js:20`) |
| `message` | string | yes | at least 10 characters (`site/components/inquiry-form.js:4`). Starts empty. The sponsor writes it. |
| `successLine` | string | yes, unless the tick box is ticked | 300 characters at most, checked by the page (`site/variants/success-line-first/success-line-first.js:37`). Empty after a tick. |
| `successLineChoice` | string | set by the page | one of `example`, `edited-example`, `own`, `dont-know` (`site/variants/success-line-first/success-line-first.js:42`) |
| `successLineExample` | string | set by the page | the ID of the last example clicked, such as `soft-1` or `hard-3`. Empty when the sponsor clicked none or ticked the box. |
| `successLineUnknown` | boolean | set by the page | `true` after a tick, else `false` |

The first-step fields sit outside the `<form>` element. The page script adds them to the request body itself (`site/variants/success-line-first/success-line-first.js:160`), so they reach the server.
The server keeps extra fields as top-level strings, numbers or booleans, at most 20 keys, strings cut to 300 characters (`server.js:84`, `server.js:85`). This variant adds four. Empty strings are not stored (`server.js:137`).
The "In your words" box has no `maxlength` attribute (`site/variants/success-line-first/inquiry.html:37`). The page blocks a longer line with an error instead. See "Open points for the human".

## Events to emit

The prototype test does not read these. They are there for a later launch.

| Event | When it fires | Props |
|---|---|---|
| `page_view` | page load (`site/variants/success-line-first/success-line-first.js:105`) | `{ page: 'inquiry' }` |
| `inquiry_started` | once, on the first of these: a click on an example, typing in the box, a change of the tick box, or focus inside the form (`site/variants/success-line-first/success-line-first.js:99`) | `{}` |
| `success_line_filled` | on Continue, when the first step passes with a line. Not after a tick. | `{ choice, example, length }`: `choice` as in `successLineChoice`, `example` the example ID or `null`, `length` the number of characters. Never the text. |
| `inquiry_step_completed` | on Continue, when the first step passes | `{ step: 'success_line', choice }` |
| `inquiry_submitted` | after the server accepts the inquiry (`site/variants/success-line-first/success-line-first.js:164`) | `{ success_line: 'filled' or 'dont-know', choice }` |

Every event carries the variant name `success-line-first`, set by the page (`site/variants/success-line-first/success-line-first.js:4`).

## What stays the same
- The contact fields, their labels and the core validation (`site/inquiry.html:23` to `:27`, `site/components/inquiry-form.js:7`).
- The send button, the error messages of the form and the confirmation page.
- Home, formats, sponsor preparation and the confirmation page stay the baseline pages.
- The test file `tests/variant-success-line-first.test.js` came with the page and stays as it is.

## Critical assumptions it rests on
- "A sponsor who is shown example answers can say what should be different for the team after the training." (`discovery/intents/format-question.md:70`) · unsupported (`discovery/intents/format-question.md:41`). The soft sponsor file says: "Whether this sponsor can write a success line when given examples. No source tests it." (`product/personas/sponsor-soft.md:68`)
- [assumption: a tester who has written the success line also writes a message of 10 characters or more, and does not stop at the second text field.]

## What we cannot see
- Clicks on several examples before the sponsor settles. The record keeps only the last one.
- Time spent on the first step, and use of the Change link after Continue.
- A visitor who reads the question and leaves without a click. Only `page_view` fires for that visit.
- Whether the sponsor read the formats page first. The baseline formats page logs no `page_view` (`site/formats.html` has no script).
- `inquiry_started` fires on the first click on an example. On the baseline page it fires on the first focus inside the form (`site/components/inquiry-form.js:41`). The share of visits that start the inquiry is then not counted the same way on both pages.

## Invented lines on the page

| Line the sponsor sees | Who could confirm it |
|---|---|
| What should be different for your team in three months? (the pair's wording, `discovery/intents/format-question.md:41`) | soft and hard sponsors in the cross test |
| Pick an example, change it, or write your own. One sentence is enough. | testers in the cross test |
| In your words | testers in the cross test |
| If you want people to take it into their daily work | soft sponsors in the cross test |
| Don't know yet. Let's work it out in the call. | soft and hard sponsors in the cross test |
| You do not need to choose one now. | soft sponsors in the cross test |
| Continue · Change | testers in the cross test |
| Pick an example, write your own line, or tick "Don't know yet". | testers in the cross test |
| Please keep it to one or two sentences (300 characters at most). | testers in the cross test |
| Your success line: · Success line: to work out in the call | soft and hard sponsors in the cross test |

## Out of scope for the prototype
- A format suggestion based on the success line.
- A call booking instead of the form.
- The question on the home page or the formats page.
- Showing the success line on the confirmation page.
- Design polish beyond the existing styles in `site/styles.css`.

## Open points for the human
- **Touches a sign:** the note "Pick an example, change it, or write your own" names what the go-on sign watches for. A tester who follows the note shows nothing of their own. Keep the note, drop it, or cut it to "One sentence is enough"? · who can answer: the pair · Answer: ____ (human decides; before the build)
- **Touches a sign:** the note "You do not need to choose one now" answers the question "which format should I choose?" before the tester can ask it. The rework sign then cannot show. Keep it, or drop it for the test? · who can answer: the pair · Answer: ____ (human decides; before the build)
- **Touches a sign:** the tick box says "Let's work it out in the call". A tester who wants a person may tick it. Then the watcher cannot tell "does not know" from "wants a call". Keep the wording, or cut it to "Don't know yet"? · who can answer: the pair · Answer: ____ (human decides; before the build)
- **Touches a sign:** after the success line, the sponsor must still write "What do you need?" with at least 10 characters. A tester who stops there breaks the sign "sends the inquiry" for a reason the test does not ask about. Fill the message field from the success line, so the sponsor can change it? Text built from the sponsor's own line counts as their answer. · who can answer: the pair · Answer: ____ (human decides; before the build)
- The "In your words" box has no `maxlength="300"`. Add it, so the sponsor cannot type past the limit? · who can answer: the pair · Answer: ____ (human decides)
- `inquiry_started` fires earlier than on the baseline page. Align it before a launch, or note the difference on the launch card? · who can answer: whoever writes the launch card · Answer: ____ (human decides)
- The confirmation page promises to get in touch "within a few days" to book a scoping call (`site/confirmation.html:24`). The tick box promises a call, which matches. No change is planned. · who can answer: the pair · Answer: ____ (human decides)

## Build prompt
> Build the variant in discovery/specs/success-line-first.md as one file per page it changes in
> site/variants/success-line-first/, named like the page it replaces (inquiry.html, formats.html),
> and add the name to "variants" in site/config.json. Do not set "shipped".
