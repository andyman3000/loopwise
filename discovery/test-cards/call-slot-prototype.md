# Prototype test card: call-slot

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the test with people tests from outside.
> Assessment drafted by an agent on 2026-11-16, not a decision.
> Card owner: ____ (human decides)
> Intent: [discovery/intents/format-fit.md](../intents/format-fit.md) · Idea: I2 ("I2: Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page)", [discovery/intents/format-fit.md:91](../intents/format-fit.md#L91))
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

A prototype test shows a rough page to a person and watches what they do.
It tests one critical assumption before anyone builds the real page.
A critical assumption is the one thing that must be true for an idea to work.
A sign is something the watcher can see or hear during the test.
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The inquiry is the form on the website where a buyer asks for a format ([product/glossary.md:32](../../product/glossary.md#L32)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).
A call slot here is a time for that call, which the buyer picks on the page instead of writing first.

## Your first try
Skipped. The product lead skipped the try-first step tonight, so the agent drafted the card alone.
No feedback, since there is no answer to judge.

## We believe that (the assumption we test)
"Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one." ([discovery/intents/format-fit.md:92](../intents/format-fit.md#L92))
Level in the intent: "partly supported" ([discovery/intents/format-fit.md:58](../intents/format-fit.md#L58))

No learning card exists yet for an earlier variant of this intent. So this card answers no earlier learning.

## To verify that, we will
Show 5 people who lead product people and have not booked a Loopwise format the variant.
Proposal: 3 start on `/formats.html?variant=call-slot`, 2 on `/inquiry.html?variant=call-slot`.
The variant changes only the inquiry page. The formats page stays as today, so a tester meets the five formats first.
In 26 weeks of synthetic data, 364 of 740 inquiry page visits had no formats page view before them in the same session ([data/events.jsonl](../../data/events.jsonl)).
That is why some testers start on the inquiry page.
Each tester gets only the scenario below. The person who built the page watches for the signs.

### Testers
- **Who qualifies:** proposal. The tester leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)). The tester does not decide alone, and no budget is settled yet ([product/personas/buyer-without-budget.md:5](../../product/personas/buyer-without-budget.md#L5)). The tester has a real group in mind and has not booked a Loopwise format.
- **How many:** 5 buyers without budget, proposal · Set by: ____ (human decides)
- **Recruited by:** ____ (human decides) · **By:** ____ (human decides)

The buyer with budget is left out of this proposal. That buyer wants written answers before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). Five testers of that type would test the counter-evidence. The product lead decides whether to add them.

### Test scenario (the tester sees only this)
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life.
- **Page:** `/formats.html?variant=call-slot` for 3 testers, `/inquiry.html?variant=call-slot` for 2, proposal.
- **Sources:** the buyer without budget leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)). Some teams work with agents every day, others are where they were a year ago ([product/personas/buyer-without-budget.md:22](../../product/personas/buyer-without-budget.md#L22)).
- **Does not count if:** the tester has no such group in mind.

The scenario is the same as on the format-quiz card. Results of the two variants can then be set side by side.
The task does not say "call us" or "book a call". Otherwise a booked slot would only show that the tester followed the task.

### For the spec: the ways to talk, and the step into a slot
The inquiry page shows the ways to talk next to the form, so the tester can choose between writing and talking.
Picking a slot needs one visible step, for example a button that opens a short list of times.
The spec plans that step, so the watcher can see whether the tester takes it.
The tester must be able to use the form instead, as today.
The site counts a started form when the visitor clicks into a form field ([discovery/intents/format-fit.md:32](../intents/format-fit.md#L32)).

## And measure (the signs the watcher looks for)
An AI persona cannot show how a buyer reacts to a page its sources never saw.
The last column says what the persona file can do for each sign instead:
- **Behaviour in the file:** the file states the behaviour itself. A persona can show it.
- **A fact the page must fit:** the file states something about the buyer that the page could clash with. The persona walkthrough checks the page against it.
- **Nothing in the file:** only the test with people can test this sign.

| Sign (what the watcher sees or hears) | Points to | What the persona file says |
|---|---|---|
| On the inquiry page, the tester opens the slot booking or the phone option before clicking into a form field | go on | A fact the page must fit: the buyer needs "Options to react to; she can describe what hurts, not name a format" ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). A call is a place to describe what hurts. Whether the tester opens it: only the test with people can test this. |
| The tester picks a time and confirms the call slot, to the page that says the call is booked | go on | A fact the page must fit: "No timeline: "No rush, though."" ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)). Times only in the next few days may not fit a buyer with no date. |
| Asked afterwards, the tester says in their own words what they want to settle in the call | go on | Nothing in the file: the tester's own words come only from the test with people. |
| The tester looks for a way to talk to someone, or asks how to reach a person, and does not find it | rework | Nothing in the file: only the test with people can test this. |
| The tester opens the slot booking and stops: no time fits, or they ask what the call is for or what they must prepare | rework | A fact the page must fit: the buyer "Does not know the format or how many pieces it has" ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)). A booking step that asks for the format will stop the tester. |
| The tester sees the ways to talk and sends the form instead | drop | A fact the page must fit, for the other buyer type: the buyer with budget "Wants written answers before setting up a call" ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). No tester of that type is proposed. |
| The tester leaves the page without booking a slot, calling or sending the form | drop | Behaviour in the file, partly: "Keeps the formats page open for weeks, or closes it and comes back later" ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). The line describes today's formats page, without ways to talk. |
| The tester says they would talk to colleagues first, before they book a call | drop | A fact the page must fit: "Does not decide alone" ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). This may stop a booking for reasons the page cannot change. |

## We are right if (go-on line)
Proposal: at least 3 of 5 testers book a call slot on the page, to the page that says the call is booked, and do not send the form.
Set by: ____ (human decides) · Set on: ____ (human decides)

## We rework or drop the idea if (rework-or-drop line)
The line has two parts. A problem with the page means rework. A preference for writing means drop.
- **We rework the page if**, proposal, 3 or more of 5 testers do not find the ways to talk, or stop inside the slot booking.
- **We drop the idea if**, proposal, 3 or more of 5 testers see the ways to talk and send the form instead, or leave with neither.
- If the five testers fit none of these lines, the result is mixed. The learning card then decides on another round.

Set by: ____ (human decides) · Set on: ____ (human decides)

## What this test cannot show
- 5 testers: a pattern, not a rate.
- Whether a booked slot turns into a held call, or a booking. A prototype test shows whether people understand and use the page. The launch card is the place to measure the call rate and later steps.
- Whether more inquiry page visits end in a scoping call than today. Five testers cannot show a change in that share.
- Whether the tester would really pick up the phone. A phone number on a test page reaches no one, so the test sees only the click or the words.
- Whether a tester who books a slot without writing anything gets a useful call. That is for the people who run scoping calls.
- The buyer with budget. All five proposed testers are buyers without budget. The counter-evidence from that buyer type stays untested ([discovery/intents/format-fit.md:58](../intents/format-fit.md#L58)).
- A tester who knows they are watched may book a slot more readily than at their desk.
- The persona file states the behaviour for one sign, partly. For five signs it states a fact the page must fit. For two signs it states nothing.
