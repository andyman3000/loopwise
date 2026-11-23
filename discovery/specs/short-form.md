# Spec: short-form

> Spec drafted by an agent (`loopwise-variant-spec`, mode `learn`) on 2026-11-16, before the prototype build. Built to learn, not to ship.
> **Variant:** `short-form` · Pages it changes: `inquiry.html`, `formats.html` (since walkthrough run 1) · Testers start at `/formats.html?variant=short-form` or `/inquiry.html?variant=short-form`
> **Idea:** I6 in [discovery/intents/format-fit.md](../intents/format-fit.md) ("Cut the form to name and email. Everything else is asked in the scoping call (inquiry page)", [discovery/intents/format-fit.md:100](../intents/format-fit.md#L100))
> **Assumption under test:** "Buyers stop at the form because of what it asks them to write. With only name and email to give, they send it without knowing the format." ([discovery/test-cards/short-form-prototype.md:22](../test-cards/short-form-prototype.md#L22))
> **Label:** interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

## Status
**Stage:** Built, because the page opens at `/inquiry.html?variant=short-form` (checked 2026-11-16 on a local server). Every "fix before the test" finding is decided, and every open point that touches a sign is answered (product lead, 2026-11-16). Not "Tested with people": no person has tested the page, and the learning card rests on persona runs only.

| # | Date | Review | File | Findings | Decided |
|---|---|---|---|---|---|
| 1 | 2026-11-16 | challenger, run 1 | this file, "Challenger check" | 13 findings: 7 applied, 6 kept | all 13 confirmed by the product lead, 2026-11-16 |
| 2 | 2026-11-16 | persona walkthrough, page, run 1, on commit 1f6e80f | [discovery/user-tests/short-form-page.md](../user-tests/short-form-page.md) | fix before the test: 2 · fix if time allows: 1 · watch in the test: 1 | 1 and 2 applied, confirmed by the product lead; 3 moved to the launch spec; 4 for the test |
| 3 | 2026-11-16 | persona walkthrough, page, run 2, on commit 6da3b2a | [discovery/user-tests/short-form-page-run2.md](../user-tests/short-form-page-run2.md) | fix before the test: 0 · fix if time allows: 1 · watch in the test: 2 | 1 moved to the launch spec; 2 and 3 for the test, the watcher notes both (product lead, 2026-11-16) |

A spec describes the page so exactly that Claude Code can build it from this file alone.
In mode `learn` it covers only what the prototype test needs. Everything else is left out.
A critical assumption is the one thing that must be true for the idea to work.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/short-form-prototype.md:12](../test-cards/short-form-prototype.md#L12)).
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).

## Your first try
Skipped. The product lead skipped the try-first step tonight (2026-11-16), so the agent went on with the draft.

## What changes on the page
Each element names the sign or the part of the assumption it serves. The signs are on the prototype card ([discovery/test-cards/short-form-prototype.md:60](../test-cards/short-form-prototype.md#L60)).

### The formats page
One line stands above the button "Make an inquiry": The inquiry asks only for your name and email. [invented, added after walkthrough run 1] Serves: the testers who start here reach the inquiry page, which the go-on line counts ([discovery/test-cards/short-form-prototype.md:71](../test-cards/short-form-prototype.md#L71)). Everything else on the page stays as today. Its button "Make an inquiry" leads to the inquiry page ([site/formats.html:30](../../site/formats.html#L30)). The server keeps `?variant=short-form` on that link. Serves: the sign that the tester goes back to the formats to choose first.

### The inquiry page (the variant file)
1. The lead line under the heading reads: Leave your name and email. In the scoping call, you tell us about your group and what gets in the way. We work out the format together. [invented, changed after walkthrough run 1] Serves: the idea, that everything else is asked in the scoping call ([discovery/intents/format-fit.md:100](../intents/format-fit.md#L100)). Without it, a form with two fields reads as broken.
2. The line "Sending this form books nothing. We reply within a few days to set up a scoping call." stays as today ([site/inquiry.html:22](../../site/inquiry.html#L22)). Serves: the sign that the tester stops at "Send" and asks what it commits them to.
3. The form holds two fields, in this order: "Name" and "Email". The fields "Company" and "What do you need?" are gone. Serves: the assumption itself. It also lets the watcher see the sign that the tester looks for a place to describe the group.
4. The button "Send inquiry", as today ([site/inquiry.html:30](../../site/inquiry.html#L30)). Serves: the signs that the tester sends the form, or stops at "Send".
5. The box "What happens after you send it" stays as today, all five steps ([site/inquiry.html:32](../../site/inquiry.html#L32) to [site/inquiry.html:41](../../site/inquiry.html#L41)). Step 2 there says the format is settled in the scoping call. Serves: the sign that the tester asks whether sending commits them to something.

### What happens on send (faked)
1. The page checks both fields in the browser. An empty name shows "Please enter your name." An empty or wrong email shows "Please enter a valid email address." Both lines are the site's own ([site/components/inquiry-form.js:10](../../site/components/inquiry-form.js#L10), [site/components/inquiry-form.js:13](../../site/components/inquiry-form.js#L13)).
2. With both fields valid, the page opens `/confirmation.html?variant=short-form`, the confirmation page as today.
3. The send is faked: no request goes to `/api/inquiry`. The server would turn down an inquiry without company and message ([site/components/inquiry-form.js:7](../../site/components/inquiry-form.js#L7) to [site/components/inquiry-form.js:16](../../site/components/inquiry-form.js#L16)). The watcher only needs to see the press and the confirmation page. No inquiry is stored.

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester clicks into the name or email field without going back to the formats ([:62](../test-cards/short-form-prototype.md#L62)) | the fields "Name" and "Email" |
| The tester sends the form and does not ask where to describe the group ([:63](../test-cards/short-form-prototype.md#L63)) | "Send inquiry", then the confirmation page |
| Asked afterwards, the tester says what happens next ([:64](../test-cards/short-form-prototype.md#L64)) | no element: the watcher asks once after the send (open point) |
| The tester looks for a place to describe the group ([:65](../test-cards/short-form-prototype.md#L65)) | the form with two fields; the tester scrolls or asks aloud |
| The tester stops at "Send", or asks whether sending commits them ([:66](../test-cards/short-form-prototype.md#L66)) | "Send inquiry", the line on booking nothing, the box "What happens after you send it" |
| The tester leaves without sending, or goes back to the formats ([:67](../test-cards/short-form-prototype.md#L67)) | the navigation and the browser's back button |
| The tester says "I need to know the format first" ([:68](../test-cards/short-form-prototype.md#L68)) | no element: words the tester says aloud |

## Fields and validation
The page sends nothing to the server (see "What happens on send"). The fields below are checked in the browser only.

| Field (form name) | Type | Required | Allowed values or limit |
|---|---|---|---|
| `name` | string | yes | not empty |
| `email` | string | yes | a valid email, the site's own check ([site/components/inquiry-form.js:3](../../site/components/inquiry-form.js#L3)) |

## What stays the same
- The format tiles on the formats page, the confirmation page, home and buyer preparation, the navigation and the footer.
- The heading "Inquiry", the line on booking nothing, the button text and the box "What happens after you send it" on the inquiry page.
- The events `page_view` and `inquiry_started` fire as today. `inquiry_submitted` does not fire: the faked send stores no inquiry.

## Invented lines on the page
| Line the buyer sees | Who could confirm it |
|---|---|
| Leave your name and email. In the scoping call, you tell us about your group and what gets in the way. We work out the format together. | confirmed by the product lead (Loopwise), 2026-11-16 |
| The inquiry asks only for your name and email. (formats page) | confirmed by the product lead (Loopwise), 2026-11-16 |

## Left out to learn faster
- A real send to `/api/inquiry` with only name and email: the server rule needs company and message ([site/components/inquiry-form.js:11](../../site/components/inquiry-form.js#L11), [site/components/inquiry-form.js:14](../../site/components/inquiry-form.js#L14)). The change sits in `site/components/inquiry-form.js` and `server.js`. · for the launch spec
- The field "Company": the idea cuts it ([discovery/intents/format-fit.md:100](../intents/format-fit.md#L100)). Whether the scoping call needs it is a question for the staff who run the calls. · for the launch spec
- A mail link or a phone number to write instead: a second way to the same sign, and close to idea I2. · not for this variant
- The event `inquiry_submitted` for the faked send. · for the launch spec
- A place to ask questions in writing, or a reference to call: only the buyer with budget backs it ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)), and the card recruits no tester of that type. · for the launch spec, decided by the product lead (Loopwise), 2026-11-16

## Changes after review
- After the challenger run: the heading item, the repeated lines on what the form leaves out, `maxlength`, the reasoning around the fake, and the open points on the stored inquiry and the confirmation page are cut. · Decided by: Product lead (Loopwise), 2026-11-16, confirming what the agent applied

- After persona walkthrough run 1 ([discovery/user-tests/short-form-page.md](../user-tests/short-form-page.md)): proposals 1 and 2, the two marked "fix before the test", are applied. The formats page gets one line above "Make an inquiry". The lead line on the inquiry page now says the call is where the buyer describes the group and what gets in the way. Proposal 3 (a place for written questions, buyer with budget only) is not applied: the card recruits no buyer with budget, and a text box would undo the idea. · Decided by: Product lead (Loopwise), 2026-11-16, confirming both fixes. Proposal 3 goes to the launch spec

## Challenger check
A subagent with no other context read only the prototype card and this spec on 2026-11-16. It found the spec lean, with the core path complete: two fields, send, confirmation page. The agent applied its own proposals first; the product lead confirmed each one the same evening.

| Element | What the challenger says | Proposal | Decided |
|---|---|---|---|
| The heading "Inquiry" as its own item | Serves no sign; it is unchanged. | cut the item, keep the heading under "What stays the same" | applied |
| The lead line | Serves the assumption. It may answer the question "where do I say what we need?" before the tester asks it. | keep, and name the risk under "Open points" | applied |
| "No other field, no free-text box, no mail link" | Repeats the card and "Left out". | cut | applied |
| Checks on empty name and wrong email | No sign needs them; a tester who sends gives valid values. | keep: without the check, a tester who presses "Send" on an empty form lands on the confirmation page, and the watcher would misread the sign "sends the form with name and email" | kept |
| `maxlength="300"` | Serves nothing; the page sends nothing. | cut | applied |
| The reasoning around the faked send | Justification, not build text. | simplify to one sentence | applied |
| The faked send | The only way; the server turns down name and email alone. | keep | kept |
| The events line under "What stays the same" | No sign reads events. | keep: one line, so nobody reads the missing `inquiry_submitted` as a drop later | kept |
| "The formats page stays as today" twice | Repeated. | cut the first | applied |
| The table "Where the watcher sees each sign" | Duplicates the "Serves" notes. | keep: the skill asks for it as the check that every sign has a place | kept |
| Open point on the watcher's question after the send | Belongs to the test script. | keep as an open point; it touches a sign | kept |
| Open points on the stored inquiry and the confirmation page | One repeats the fake, one is a launch matter. | cut | applied |
| "Invented lines", "Status", "Your first try", "Left out" | Process sections. | keep: the skill asks for each | kept |

Decided by: Product lead (Loopwise), 2026-11-16. All 13 decisions confirmed.

## Open points for the human
- The sign "says afterwards what happens next" has no element on the page. Proposal: after the send, the watcher asks once: "What do you expect to happen now?" · who can answer: the product lead · Answer: yes, the watcher asks this question once, after the confirmation page (Product lead (Loopwise), 2026-11-16)
- The lead line says the buyer describes the group and what gets in the way in the scoping call. It may answer the question "where do I say what we need?" before a tester asks it. Then the rework sign on looking for a place to describe the group ([discovery/test-cards/short-form-prototype.md:65](../test-cards/short-form-prototype.md#L65)) shows less often. · who can answer: the product lead · Answer: accepted as a known risk. The line stays. The watcher notes whether a tester reads the lead line before the fields (Product lead (Loopwise), 2026-11-16)

## Build prompt
> Build the variant in discovery/specs/short-form.md as one file per page it changes in
> site/variants/short-form/, named like the page it replaces (inquiry.html),
> and keep the name in "variants" in site/config.json. Do not set "shipped".
> Build only what the spec names. Where the spec says an element is faked, do not wire it up.
