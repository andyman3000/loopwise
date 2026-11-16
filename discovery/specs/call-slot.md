# Spec: call-slot

> Spec drafted by an agent (`variant-spec`, mode `learn`) on 2026-11-16, before the prototype build. Built to learn, not to ship.
> **Variant:** `call-slot` · Pages it changes: `inquiry.html` · Testers start at `/formats.html?variant=call-slot` or `/inquiry.html?variant=call-slot`
> **Idea:** I2 in [discovery/intents/format-fit.md](../intents/format-fit.md) ("I2: Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page)", [discovery/intents/format-fit.md:91](../intents/format-fit.md#L91))
> **Assumption under test:** "Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one." ([discovery/test-cards/call-slot-prototype.md:24](../test-cards/call-slot-prototype.md#L24))
> **Label:** interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

## Status
**Stage:** Built, because the page opens at `/inquiry.html?variant=call-slot` (2026-11-16). The product lead has not yet decided on any review. So the stages Reviewed and Ready to build were not met before the build.

| # | Date | Review | File | Findings | Decided |
|---|---|---|---|---|---|
| 1 | 2026-11-16 | challenger, run 1 | this file, "Challenger check" | 17 findings, 11 rows in the table; the rest confirm the core path | open: 7 applied and 4 kept by the agent, for the product lead to confirm |
| 2 | 2026-11-16 | persona walkthrough, page, run 1, on commit f251f8a | [discovery/user-tests/call-slot-page.md](../user-tests/call-slot-page.md) | fix before the test: 1 · fix if time allows: 1 · watch in the test: 1 | open: the agent applied the one "fix before the test" finding; the other two left for the product lead |
| 3 | 2026-11-16 | persona walkthrough, page, run 2, on commit 1d1e85d | [discovery/user-tests/call-slot-page-run2.md](../user-tests/call-slot-page-run2.md) | fix before the test: 0 · fix if time allows: 1 · watch in the test: 1 | open |

A spec describes the page so exactly that Claude Code can build it from this file alone.
In mode `learn` it covers only what the prototype test needs. Everything else is left out.
A critical assumption is the one thing that must be true for the idea to work.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/call-slot-prototype.md:12](../test-cards/call-slot-prototype.md#L12)).
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).
A call slot is a time for that call, which the buyer picks on the page instead of writing first.

## Your first try
Skipped. The product lead skipped the try-first step tonight, so the agent drafted the spec alone.
No feedback, since there is no answer to judge.

## What changes on the page
Each element names the sign or the part of the assumption it serves. The signs are on the prototype card ([discovery/test-cards/call-slot-prototype.md:68](../test-cards/call-slot-prototype.md#L68)).
The page books nothing for real. The slot booking is faked: it sends nothing to `/api/inquiry` and logs no event.

### The formats page (3 testers start here)
1. Stays as today. Its button "Make an inquiry" opens the inquiry page of the variant ([site/formats.html:30](../../site/formats.html#L30)). Serves: the tester meets the five formats first, as a real buyer would.

### The inquiry page
1. The heading "Inquiry" stays. The lead line changes to: Write to us, or talk to us first. [invented] Serves: the tester sees two ways at once, before reading further.
2. Below the lead, a box with the heading "Talk to us" [invented] holds two options side by side. It sits above the form and outside the `<form>` element. A click inside the box is never a started form. Serves: the sign that the tester opens a way to talk before clicking into a form field ([discovery/test-cards/call-slot-prototype.md:70](../test-cards/call-slot-prototype.md#L70)), and the sign that the tester does not find a way to talk ([discovery/test-cards/call-slot-prototype.md:73](../test-cards/call-slot-prototype.md#L73)).
3. **Option 1, "Book a call slot".** One line: A 20-minute video call, adapted from [sources/inquiry-mails/inquiry-03.md:16](../../sources/inquiry-mails/inquiry-03.md#L16). One line below it, adapted from [site/inquiry.html:36](../../site/inquiry.html#L36): In the call we settle together which format fits your team. A button "Choose a time". [invented] Serves: the step into the slot booking, and the rework sign that the tester asks what the call is for ([discovery/test-cards/call-slot-prototype.md:74](../test-cards/call-slot-prototype.md#L74)).
4. **Option 2, "Call us directly".** A link showing a made-up number, `+00 000 000 000`. [invented, not a real number] A click on it is faked: it does nothing, and no line appears. The watcher sees the click. Serves: the first half of the assumption, that the tester would rather talk than write; the sign at [discovery/test-cards/call-slot-prototype.md:70](../test-cards/call-slot-prototype.md#L70).
5. Below the box, the heading "Write to us" [invented] stands over the form. The line "Sending this form books nothing. We reply within a few days to set up a scoping call." stays, moved under this heading ([site/inquiry.html:22](../../site/inquiry.html#L22)). The form and the aside "What happens after you send it" stay as today. Serves: the drop sign that the tester sees the ways to talk and sends the form instead ([discovery/test-cards/call-slot-prototype.md:75](../test-cards/call-slot-prototype.md#L75)).

### The slot booking (opens in the box, in place of the two options)
1. "Choose a time" replaces the two options with the booking. There is no way back to the two options; the form stays below. Serves: the step into the slot booking.
2. **Day:** a drop-down "Day", first entry "Choose a day". It lists the working days (Monday to Friday) from tomorrow, for ten weeks. Each entry reads like "Tuesday, 24 November". [invented] Ten weeks reach past the holidays. They serve the rework sign that no time fits: the buyer without budget has "No timeline" ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)), and the rest of her year is full ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)).
3. **Time:** four choices as radio buttons, 9:30, 11:00, 14:00, 16:00. [invented] Every day has all four. No time is ever taken.
4. **Name** and **Email**, two fields. They sit in their own `<div>`, never in `#inquiry-form`. No other field: the booking asks nothing about the format or the group. Serves: the rework sign that a booking step asks for what the tester does not know ([discovery/test-cards/call-slot-prototype.md:74](../test-cards/call-slot-prototype.md#L74)).
5. A button "Book this call". [invented] It checks that a day, a time, a name and a valid email are given. A missing one shows one line under the button: Please choose a day and a time, and enter your name and email. [invented]
6. On a valid click, the box shows the booked call in place of the booking. Serves: the go-on sign that the tester confirms the slot, to the page that says the call is booked ([discovery/test-cards/call-slot-prototype.md:71](../test-cards/call-slot-prototype.md#L71)).
   - Heading: Your call is booked. [invented]
   - Line: <Day>, <time>, 20 minutes. We send the video link to <email>. [invented]
   - Line: In the call we settle together which format fits your team. Nothing else is booked. [invented, adapted from [site/inquiry.html:36](../../site/inquiry.html#L36)]
   - Faked: nothing is sent, stored or logged. A reload shows the page as at the start.

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester opens the slot booking or the phone option before clicking into a form field ([:70](../test-cards/call-slot-prototype.md#L70)) | "Choose a time", or the number under "Call us directly" |
| The tester picks a time and confirms the call slot, to the page that says the call is booked ([:71](../test-cards/call-slot-prototype.md#L71)) | Day, time, name, email, "Book this call", then "Your call is booked" |
| Asked afterwards, the tester says what they want to settle in the call ([:72](../test-cards/call-slot-prototype.md#L72)) | no element: the watcher asks once after the booking (open point) |
| The tester looks for a way to talk, and does not find it ([:73](../test-cards/call-slot-prototype.md#L73)) | the box "Talk to us"; the watcher notes where the tester looks first |
| The tester opens the slot booking and stops ([:74](../test-cards/call-slot-prototype.md#L74)) | the slot booking: the day list, the times, the two fields |
| The tester sees the ways to talk and sends the form instead ([:75](../test-cards/call-slot-prototype.md#L75)) | the form under "Write to us", then "Send inquiry" |
| The tester leaves the page without booking, calling or sending ([:76](../test-cards/call-slot-prototype.md#L76)) | the navigation |
| The tester says they would talk to colleagues first ([:77](../test-cards/call-slot-prototype.md#L77)) | no element: words the tester says aloud |

## Fields and validation
The form "Write to us" is the inquiry form of today, with the same four fields and the same validation. It sends an inquiry as today.
The slot booking sends nothing. Its day, time, name and email stay in the browser and are dropped on reload.

## What stays the same
- The inquiry form, its validation, the send to `/api/inquiry` and the redirect to `/confirmation.html`.
- The aside "What happens after you send it" on the inquiry page.
- The formats, home, buyer preparation and confirmation pages, the navigation and the footer.
- The existing events fire as today. The variant adds none.

## Invented lines on the page
| Line the buyer sees | Who could confirm it |
|---|---|
| Write to us, or talk to us first. | the product lead |
| "Talk to us", "Write to us", "Book a call slot", "Call us directly", "Choose a time", "Book this call" | the product lead |
| A 20-minute video call | someone who runs scoping calls |
| The made-up number | the product lead |
| The days, ten weeks ahead, and the four times | someone who runs scoping calls |
| Your call is booked, and the line on the video link | the product lead |
| The error line under "Book this call" | the product lead |

## Left out to learn faster
- A real calendar link or booking tool: the watcher only needs to see the booking confirmed. · for the launch spec
- The event `scoping_call_booked` ([site/components/events.js:8](../../site/components/events.js#L8)) for a booked slot: the watcher reads the page, not the events. · for the launch spec
- A real phone number and a check that someone picks up. · for the launch spec
- A confirmation mail or a calendar invite. · for the launch spec
- Taken times, time zones, public holidays. · for the launch spec
- A field "What would you like to talk about?": no sign needs it, and the watcher asks after the booking. · for the launch spec
- Opening hours next to the number, and a line after a click on it: no sign needs them. · for the launch spec
- A way back from the booking to the two options: no sign needs it. · for the launch spec
- What a booked slot shows instead of the confirmation page, which says Loopwise gets in touch "within a few days" ([site/confirmation.html:25](../../site/confirmation.html#L25)). · for the launch spec
- Ways to talk on the home or formats page: the idea names the inquiry page only ([discovery/intents/format-fit.md:91](../intents/format-fit.md#L91)). · for the launch spec

## Changes after review
- After persona walkthrough run 1 ([discovery/user-tests/call-slot-page.md](../user-tests/call-slot-page.md)): the day list reaches ten weeks ahead, past the holidays, instead of four. The buyer without budget says the rest of her year is full. Applied by the agent tonight, as its brief asked it to fix every blocker a run names. · Decided by: open, for the product lead to confirm or revert

## Challenger check
A subagent with no other context read only the prototype card and this spec on 2026-11-16. It looked for elements that serve no sign and no part of the assumption, second paths, unlikely edge cases and parts the build could fake. It found the core path complete: the ways to talk, "Choose a time", day and time, "Book this call", the booked call, and the form below.
The product lead was not there to decide. The agent applied its own proposals so the build could go on tonight. Every row stays open for the product lead.

| Element | What the challenger says | Proposal | Decided |
|---|---|---|---|
| The build prompt names `formats.html` | The formats page stays as today, so a copy is not needed. | simplify: build `inquiry.html` only | open (applied by the agent) |
| The lead line "Write to us, or talk to us first." | A second path to the sign that the tester does not find a way to talk. | keep: today's lead asks the tester to write, which would tilt the choice | open (kept by the agent) |
| The opening hours under "Call us directly" | No sign needs them. | cut | open (applied by the agent) |
| The line after a click on the number | It tells the tester the page is a test. The watcher sees the click anyway. | simplify: the click does nothing | open (applied by the agent) |
| "Back" in the booking | No sign needs a way back. The form stays visible below. | cut | open (applied by the agent) |
| Days from two working days after today | An edge case no sign needs. | simplify: from tomorrow | open (applied by the agent) |
| Name and email in the booking | Name serves no sign; email feeds the booked line. | keep: a booking without a name would not feel real to the tester | open (kept by the agent) |
| The own check and error line under "Book this call" | An unlikely edge case; use the browser's check. | keep: the fields sit outside a `<form>`, so the browser check does not run; one line is cheaper than a second form | open (kept by the agent) |
| The table "Fields and validation" | It restates the unchanged form. | cut to one line | open (applied by the agent) |
| The open point on the confirmation page | No sign needs it. | move to "Left out to learn faster" | open (applied by the agent) |
| The watcher question after the booking | It serves the sign on what the tester wants to settle. | keep as an open point | open (kept by the agent) |

## Open points for the human
- The sign "says afterwards what they want to settle in the call" has no element on the page. Proposal: after the booking, the watcher asks once: "What would you want to settle in that call?" · who can answer: the product lead · Answer: ____ (human decides; touches a sign, before the test)
- The agent applied the challenger proposals tonight so the build could go on. Each one is open for the product lead under "Challenger check". · who can answer: the product lead · Answer: ____ (human decides)

## Build prompt
> Build the variant in discovery/specs/call-slot.md as one file per page it changes in
> site/variants/call-slot/, named like the page it replaces (here: inquiry.html only).
> The name is already listed in "variants" in site/config.json. Do not set "shipped".
> Build only what the spec names. Where the spec says an element is faked, do not wire it up.
