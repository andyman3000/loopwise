# Persona walkthrough: call-slot, page

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`loopwise-persona-walkthrough`) on 2026-11-16. Not a decision.
> Prototype card: [discovery/test-cards/call-slot-prototype.md](../test-cards/call-slot-prototype.md) · Met: `http://localhost:3417/formats.html?variant=call-slot`, then `http://localhost:3417/inquiry.html?variant=call-slot`
> Browser tool: the built-in browser pane of the Claude desktop app. The agent opened each screen, read it and clicked as the persona would.
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:99](../../product/personas/buyer-without-budget.md#L99), [product/personas/buyer-with-budget.md:101](../../product/personas/buyer-with-budget.md#L101))

> Run: 1 of round 1 · Earlier run: none, first run · Met: commit f251f8a

A persona is a written profile of a buyer type, built from the same interviews and mails as the opportunity.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/call-slot-prototype.md:12](../test-cards/call-slot-prototype.md#L12)).
A call slot is a time for the scoping call, which the buyer picks on the page instead of writing first.

## Your first try
Skipped. The product lead skipped the try-first step tonight, so the agent ran the personas alone.
No feedback, since there is no answer to judge.

## Scenario the personas got
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life.

## Buyer without budget
- **Formats page.** She reads the five tiles. She cannot tell which one is her group ([product/personas/buyer-without-budget.md:92](../../product/personas/buyer-without-budget.md#L92)). Today she might close the page and come back later ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). In the run she follows "Make an inquiry", since the task asks for a next step.
- **Inquiry page.** The lead line reads: write to us, or talk to us first ([site/variants/call-slot/inquiry.html:37](../../site/variants/call-slot/inquiry.html#L37)). The box "Talk to us" stands above the form. The call card says the call settles which format fits ([site/variants/call-slot/inquiry.html:45](../../site/variants/call-slot/inquiry.html#L45)). That fits her need: she can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The form asks "What do you need?". She does not want to send it with a guess in it ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). Whether she picks the call over the form: [no source in the persona file: the persona cannot tell].
- **Slot booking.** She clicks "Choose a time". The booking asks for a day, a time, a name and an email, nothing about the format. She does not know the format ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)), so nothing here stops her. The day list ends on Monday, 14 December. Her file says: "The rest of the year is full, nothing will happen before the holidays." ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)). She also has no timeline ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)). Every day on offer falls in the part of the year she calls full. She stalls at the day list.
- **Phone.** [no source in the persona file: the persona cannot tell] whether she would call.
- **After a booking.** The confirmation repeats that the call settles the format. Placeholder name "Test Buyer" and email "buyer@example.com", no source.
- She would take the topic to two colleagues ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). She wants example agendas to show them ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)). The page offers a call, nothing written to pass on.

## Buyer with budget
- **Formats page.** He also finds the formats look the same on paper ([product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)). He is unsure of the format too ([product/personas/buyer-with-budget.md:62](../../product/personas/buyer-with-budget.md#L62)).
- **Inquiry page.** He sees "Talk to us" and "Write to us". His file says he "Wants written answers before setting up a call. Writes three precise questions by mail" ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). He skips the box and writes his questions into "What do you need?". He also wants a comparable company to call first ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89)). The page names no reference.
- **Slot booking.** He does not open it before he has written answers ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). Dates are no problem for him: his dates were settled almost in the first week ([product/personas/buyer-with-budget.md:85](../../product/personas/buyer-with-budget.md#L85)).
- **Phone.** [no source in the persona file: the persona cannot tell].
- He has to take it to the boss ([product/personas/buyer-with-budget.md:47](../../product/personas/buyer-with-budget.md#L47)).

## Signs
The persona files hold facts about buyers, not behaviour on this page. So table 1 mostly reads "cannot tell". The findings come from table 2.

### Table 1: What would the persona do on the page?
| Sign (from the card) | Points to | Buyer without budget | Buyer with budget | Rests on |
|---|---|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | go on | cannot tell | not shown | with budget: wants written answers before setting up a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)); without budget: no source in the persona file |
| Picks a time and confirms the call slot, to the page that says the call is booked | go on | cannot tell | not shown | with budget: the same line; without budget: she stalls at the day list, see table 2 |
| Says in their own words what they want to settle in the call | go on | cannot tell | cannot tell | own words come only from people |
| Looks for a way to talk, and does not find it | rework | cannot tell | cannot tell | no source in the persona file |
| Opens the slot booking and stops: no time fits, or asks what the call is for | rework | cannot tell | cannot tell | no behaviour on a booking step in either file; the clash is in table 2 |
| Sees the ways to talk and sends the form instead | drop | cannot tell | shown | with budget: writes three precise questions by mail before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The card was too strict for this persona. The card recruits no tester of this type |
| Leaves the page without booking, calling or sending | drop | cannot tell | cannot tell | without budget, partly: closes the formats page and comes back later ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)); the line is about today's formats page |
| Says they would talk to colleagues first, before they book a call | drop | shown | cannot tell | without budget: "I'll take this to two colleagues and talk it through with them." ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)); with budget: has to take it to the boss, with no word on when ([product/personas/buyer-with-budget.md:47](../../product/personas/buyer-with-budget.md#L47)) |

### Table 2: Does the page go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | no: the call card says the call settles the format, and she can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | no: the page keeps the form for his written questions ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Picks a time and confirms the call slot | yes: every day on offer ends by 14 December. Her file says "The rest of the year is full, nothing will happen before the holidays." ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)) | no: his dates were settled almost in the first week ([product/personas/buyer-with-budget.md:85](../../product/personas/buyer-with-budget.md#L85)) |
| Says what they want to settle in the call | the file says nothing | the file says nothing |
| Looks for a way to talk, and does not find it | the file says nothing | the file says nothing |
| Opens the slot booking and stops | yes, the same clash on the day list ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)). No clash on the fields: the booking asks nothing about the format she does not know ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)) | no |
| Sees the ways to talk and sends the form instead | no: the form asks "What do you need?" and no format, so it holds no guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | no: he can write his questions in the form |
| Leaves the page without booking, calling or sending | the file says nothing about this page | the file says nothing |
| Says they would talk to colleagues first | no: the page cannot change how she decides | the file says nothing |

## Other stalls
- The buyer with budget wants a comparable company to call before a call with Loopwise ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89)). The page names none. The card recruits no tester of this type.

## Against the two lines
Unclear for the buyer without budget, who is the only tester type on the card.
Her file has no line on choosing between talking and writing.
Her one stall on the page sits on the step the go-on line counts: picking a day.
That stall would point to the rework line, not to drop.
The buyer with budget leans to the drop line: he writes before any call.

## What the personas cannot tell
- Whether either buyer would pick the call over the form. Neither file states a choice between talking and writing.
- Whether either buyer would phone the number.
- What a tester wants to settle in the call.
- Whether a tester finds the box "Talk to us".

## New assumptions (not blocking)
- [assumption: buyers without budget book a call only after they talked it through with colleagues] · rests on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41) · may blur the sign that the tester says they would talk to colleagues first · for the intent, not this spec
- [assumption: buyers without budget want something written, such as example agendas, to show their colleagues before a call] · rests on [product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86) · may blur the sign that the tester leaves without booking · for the intent, not this spec

## Compared with the last run
First run, nothing to compare.

## What the pair might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the team decides.
Setting `team`: the team picks every proposal it wants fixed before the test.

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | Offer days into the new year in the day list, so a buyer whose year is full can pick a later date | inquiry page | clash with a fact in the persona file | fix before the test | The buyer without budget says the rest of the year is full ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)). Every day on offer ends by 14 December. The step is picking a time, which the go-on line counts ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)) |
| 2 | Add buyers with budget as testers, or note that the counter-evidence stays untested | prototype card, not a page | shown sign, buyer with budget only | fix if time allows | He writes before any call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The card recruits no tester of this type |
| 3 | Watch whether testers find the box "Talk to us" and whether they click the number | inquiry page | gap in the persona file | watch in the test | Neither file has a line on these steps. Only people can show them |
