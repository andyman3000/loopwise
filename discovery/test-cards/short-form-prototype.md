# Prototype test card: short-form

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the test with people tests from outside.
> Assessment drafted by an agent on 2026-11-16, not a decision.
> Card owner: ____ (human decides)
> Intent: [discovery/intents/format-fit.md](../intents/format-fit.md) · Idea: I6 ("Cut the form to name and email. Everything else is asked in the scoping call (inquiry page)", [discovery/intents/format-fit.md:100](../intents/format-fit.md#L100))
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

A prototype test shows a rough page to a person and watches what they do.
It tests one critical assumption before anyone builds the real page.
A critical assumption is the one thing that must be true for an idea to work.
A sign is something the watcher can see or hear during the test.
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The inquiry is the form on the website where a buyer asks for a format ([product/glossary.md:32](../../product/glossary.md#L32)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).

## Your first try
Skipped. The product lead skipped the try-first step tonight (2026-11-16), so the agent went on with the draft.

## We believe that (the assumption we test)
"Buyers stop at the form because of what it asks them to write. With only name and email to give, they send it without knowing the format." ([discovery/intents/format-fit.md:101](../intents/format-fit.md#L101))
Level in the intent: "partly supported" ([discovery/intents/format-fit.md:59](../intents/format-fit.md#L59))

The intent names the counter-evidence too. The form asks no format today, only "What do you need?" ([site/inquiry.html:28](../../site/inquiry.html#L28)).
No learning card for an earlier variant of this intent exists in `discovery/decisions/`. So this card answers no earlier learning.

## To verify that, we will
Show 5 people who lead product people and have not booked a Loopwise format the variant. Proposal: 3 start on `/formats.html?variant=short-form`, 2 on `/inquiry.html?variant=short-form`. The formats page stays as today, and its links keep the variant. The split follows the format-quiz card. In 26 weeks of synthetic data, 364 of 740 inquiry page visits had no formats page view before them in the same session ([discovery/opportunities/data.md:43](../opportunities/data.md#L43)). Each tester gets only the scenario below. The person who built the page watches for the signs.

The scenario is the same as on the format-quiz card. The team can then hold the two variants side by side.

### Testers
- **Who qualifies:** proposal. The tester leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)). The tester does not decide alone, and no budget is settled yet ([product/personas/buyer-without-budget.md:5](../../product/personas/buyer-without-budget.md#L5)). The tester has a real group in mind and has not booked a Loopwise format.
- **How many:** 5 buyers without budget, proposal · Set by: ____ (human decides)
- **Recruited by:** ____ (human decides) · **By:** ____ (human decides)

### Test scenario (the tester sees only this)
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life.
- **Page:** `/formats.html?variant=short-form` for 3 testers, `/inquiry.html?variant=short-form` for 2, proposal.
- **Sources:** the buyer without budget leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)). Some teams work with agents every day, others are where they were a year ago ([product/personas/buyer-without-budget.md:22](../../product/personas/buyer-without-budget.md#L22)).
- **Does not count if:** the tester has no such group in mind.

The task does not say "send an inquiry". Otherwise a sent form would only show that the tester followed the task.

### For the spec: what the form asks
The idea cuts the form to name and email ([discovery/intents/format-fit.md:100](../intents/format-fit.md#L100)).
The watcher must see whether the tester looks for a place to write more.
So the page holds no free-text box, and no mail link to write instead.
The site counts a started form when the visitor clicks into a form field ([discovery/intents/format-fit.md:32](../intents/format-fit.md#L32)).

## And measure (the signs the watcher looks for)
An AI persona cannot show how a buyer reacts to a page its sources never saw.
The last column says what the persona file can do for each sign instead:
- **Behaviour in the file:** the file states the behaviour itself. A persona can show it.
- **A fact the page must fit:** the file states something about the buyer that the page could clash with. The persona walkthrough checks the page against it.
- **Nothing in the file:** only the test with people can test this sign.

| Sign (what the watcher sees or hears) | Points to | What the persona file says |
|---|---|---|
| On the inquiry page, the tester clicks into the name or email field without going back to the formats first | go on | Nothing in the file: only the test with people can test this. |
| The tester sends the form with name and email, and does not ask where to describe the group | go on | A fact the page must fit: the buyer "Does not want to send the form with a guess in it" ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). A form that asks for no guess fits this line. Any other question on the page may bring the guess back. |
| Asked afterwards, the tester says in their own words what happens next and what they still have to settle | go on | Nothing in the file: the tester's own words come only from the test with people. |
| The tester looks for a place to describe the group, or asks "where do I say what we need?" | rework | A fact the page must fit: the buyer "can describe what hurts, not name a format" ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). A form with no room for that may send her looking for one. |
| The tester stops at "Send", or asks whether sending commits them to something | rework | A fact the page must fit: the buyer does not decide alone: "I'll take this to two colleagues and talk it through with them." ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). A send that looks like a commitment may stop her. |
| The tester leaves the inquiry page without sending, or goes back to the formats to choose one first | drop | Behaviour in the file, partly: "Keeps the formats page open for weeks, or closes it and comes back later" ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). The line describes today's pages, with the longer form. |
| The tester says "I need to know the format first" or "I'd be guessing" | drop | A fact the page must fit: the same line on the guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). The page must not read as if the call needs a chosen format. |

## We are right if (go-on line)
Proposal: at least 3 of 5 testers reach the inquiry page and send the form with name and email. They do not ask where to describe the group, and do not go back to the formats to choose first.
Set by: ____ (human decides) · Set on: ____ (human decides)

## We rework or drop the idea if (rework-or-drop line)
The line has two parts. A problem with the page means rework. A problem with the assumption means drop.
- **We rework the page if**, proposal, 3 or more of 5 testers look for a place to describe their group, or stop at "Send" and ask what it commits them to.
- **We drop the idea if**, proposal, 3 or more of 5 testers leave without sending, or say they must know the format first.
- If the five testers fit none of these lines, the result is mixed. The learning card then decides on another round.

Set by: ____ (human decides) · Set on: ____ (human decides)

## What this test cannot show
- 5 testers: a pattern, not a rate.
- Whether buyers book in the end. A prototype test shows whether people understand and use the page. The launch card is the place to measure the start rate and later steps.
- Whether more visits start the form than today. Today 194 of 740 inquiry page visits start the form, in synthetic data ([discovery/intents/format-fit.md:34](../intents/format-fit.md#L34)). Five testers cannot show a change in that share.
- Whether the scoping call still works when Loopwise knows only a name and an email beforehand. The format is settled in that call ([product/glossary.md:33](../../product/glossary.md#L33)). The call rate lies after the sent inquiry ([discovery/kpi-tree.md:23](../kpi-tree.md#L23)).
- Where inside today's form people stop. The data has no event for it ([discovery/opportunities/data.md:75](../opportunities/data.md#L75)).
- The buyer with budget. All five testers are buyers without budget. This buyer writes three precise questions by mail before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). A form with no room to write may clash with that. Only a test with this buyer type can show it.
- A tester who knows they are watched may send the form more readily than at their desk.
- The persona file states the behaviour for one sign, partly. For four signs it states a fact the page must fit. For two signs it states nothing.
