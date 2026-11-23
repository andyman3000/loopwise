# Persona walkthrough: call-slot, page

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`loopwise-persona-walkthrough`) on 2026-11-16. Not a decision.
> Prototype card: [discovery/test-cards/call-slot-prototype.md](../test-cards/call-slot-prototype.md) · Met: `http://localhost:3417/formats.html?variant=call-slot`, then `http://localhost:3417/inquiry.html?variant=call-slot`
> Browser tool: the built-in browser pane of the Claude desktop app. The agent opened each screen, read it and clicked as the persona would.
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:99](../../product/personas/buyer-without-budget.md#L99), [product/personas/buyer-with-budget.md:101](../../product/personas/buyer-with-budget.md#L101))

> Run: 2 of round 1 · Earlier run: [discovery/user-tests/call-slot-page.md](call-slot-page.md) · Met: commit 1d1e85d

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
- **Formats page.** Unchanged since run 1. She cannot tell which tile is her group ([product/personas/buyer-without-budget.md:92](../../product/personas/buyer-without-budget.md#L92)). She follows "Make an inquiry".
- **Inquiry page.** Unchanged since run 1. The call card says the call settles which format fits ([site/variants/call-slot/inquiry.html:45](../../site/variants/call-slot/inquiry.html#L45)). That fits a buyer who can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). Whether she picks the call over the form: [no source in the persona file: the persona cannot tell].
- **Slot booking.** She clicks "Choose a time". The day list now runs from Tuesday, 17 November to Monday, 25 January, 50 working days ([site/variants/call-slot/inquiry.html:124](../../site/variants/call-slot/inquiry.html#L124)). Her file says: "The rest of the year is full, nothing will happen before the holidays." ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)). She can now pick a day in January. The booking asks nothing about the format she does not know ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)). She does not stall on this screen.
- **Phone.** [no source in the persona file: the persona cannot tell] whether she would call.
- **After a booking.** The confirmation repeats that the call settles the format. Placeholder name "Test Buyer" and email "buyer@example.com", no source.
- She would still take the topic to two colleagues ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). She wants example agendas to show them ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)).

## Buyer with budget
- **Inquiry page.** Unchanged since run 1. He "Wants written answers before setting up a call. Writes three precise questions by mail" ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). He writes his questions into "What do you need?". He wants a comparable company to call first ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89)).
- **Slot booking.** He does not open it before he has written answers ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The longer day list changes nothing for him: his dates were settled almost in the first week ([product/personas/buyer-with-budget.md:85](../../product/personas/buyer-with-budget.md#L85)).
- **Phone.** [no source in the persona file: the persona cannot tell].

## Signs
The persona files hold facts about buyers, not behaviour on this page. So table 1 mostly reads "cannot tell". The findings come from table 2.

### Table 1: What would the persona do on the page?
| Sign (from the card) | Points to | Buyer without budget | Buyer with budget | Rests on |
|---|---|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | go on | cannot tell | not shown | with budget: wants written answers before setting up a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)); without budget: no source in the persona file |
| Picks a time and confirms the call slot, to the page that says the call is booked | go on | cannot tell | not shown | with budget: the same line; without budget: no line on booking, and no clash left on the day list |
| Says in their own words what they want to settle in the call | go on | cannot tell | cannot tell | own words come only from people |
| Looks for a way to talk, and does not find it | rework | cannot tell | cannot tell | no source in the persona file |
| Opens the slot booking and stops: no time fits, or asks what the call is for | rework | cannot tell | cannot tell | no behaviour on a booking step in either file |
| Sees the ways to talk and sends the form instead | drop | cannot tell | shown | with budget: writes three precise questions by mail before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The card was too strict for this persona. The card recruits no tester of this type |
| Leaves the page without booking, calling or sending | drop | cannot tell | cannot tell | without budget, partly: closes the formats page and comes back later ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)); the line is about today's formats page |
| Says they would talk to colleagues first, before they book a call | drop | shown | cannot tell | without budget: "I'll take this to two colleagues and talk it through with them." ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)); with budget: has to take it to the boss, with no word on when ([product/personas/buyer-with-budget.md:47](../../product/personas/buyer-with-budget.md#L47)) |

### Table 2: Does the page go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | no: the call card says the call settles the format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | no: the page keeps the form for his written questions ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Picks a time and confirms the call slot | no: the day list now reaches January, past the part of the year she calls full ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53)) | no: his dates were settled almost in the first week ([product/personas/buyer-with-budget.md:85](../../product/personas/buyer-with-budget.md#L85)) |
| Says what they want to settle in the call | the file says nothing | the file says nothing |
| Looks for a way to talk, and does not find it | the file says nothing | the file says nothing |
| Opens the slot booking and stops | no: the booking asks nothing about the format she does not know ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)), and a January day is on offer | no |
| Sees the ways to talk and sends the form instead | no: the form asks no format, so it holds no guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | no: he can write his questions in the form |
| Leaves the page without booking, calling or sending | the file says nothing about this page | the file says nothing |
| Says they would talk to colleagues first | no: the page cannot change how she decides | the file says nothing |

## Other stalls
- The buyer with budget wants a comparable company to call before a call with Loopwise ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89)). The page names none. The card recruits no tester of this type. Unchanged since run 1.

## Against the two lines
Unclear for the buyer without budget, who is the only tester type on the card.
Her file has no line on choosing between talking and writing.
Her stall at the day list from run 1 is gone. No step the go-on line counts clashes with her file now.
The buyer with budget still leans to the drop line: he writes before any call.

## What the personas cannot tell
- Whether either buyer would pick the call over the form. Neither file states a choice between talking and writing.
- Whether either buyer would phone the number.
- What a tester wants to settle in the call.
- Whether a tester finds the box "Talk to us".

## New assumptions (not blocking)
- [assumption: buyers without budget book a call only after they talked it through with colleagues] · rests on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41) · may blur the sign that the tester says they would talk to colleagues first · for the intent, not this spec
- [assumption: buyers without budget want something written, such as example agendas, to show their colleagues before a call] · rests on [product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86) · may blur the sign that the tester leaves without booking · for the intent, not this spec

## Compared with the last run
| Finding of the last run | Now | Rests on |
|---|---|---|
| The day list ends by 14 December, while the buyer without budget calls the rest of her year full | gone: the list runs to 25 January | "Slot booking" under "Buyer without budget" above |
| Add buyers with budget as testers, or note the counter-evidence stays untested | still there | "Inquiry page" under "Buyer with budget" above |
| Watch whether testers find the box "Talk to us" and click the number | still there | "What the personas cannot tell" above |

New findings: none.

| Criticality | Last run | This run |
|---|---|---|
| fix before the test | 1 | 0 |
| fix if time allows | 1 | 1 |
| watch in the test | 1 | 1 |

Fewer findings is not proof the page works. The personas only find less to press on.

## What the pair might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the team decides.
Setting `team`: the team picks every proposal it wants fixed before the test.

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | Add buyers with budget as testers, or note that the counter-evidence stays untested | prototype card, not a page | shown sign, buyer with budget only | fix if time allows | He writes before any call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The card recruits no tester of this type |
| 2 | Watch whether testers find the box "Talk to us" and whether they click the number | inquiry page | gap in the persona file | watch in the test | Neither file has a line on these steps. Only people can show them |
