# Prototype test card: format-quiz

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the test with people tests from outside.
> Assessment drafted by an agent on 2026-11-14, not a decision.
> Card owner: Product lead (Loopwise), 2026-11-15
> Intent: [discovery/intents/format-fit.md](../intents/format-fit.md) · Idea: I1 ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", [discovery/intents/format-fit.md:82](../intents/format-fit.md#L82))
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

A prototype test shows a rough page to a person and watches what they do.
It tests one critical assumption before anyone builds the real page.
A critical assumption is the one thing that must be true for an idea to work.
A sign is something the watcher can see or hear during the test.
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book ([product/glossary.md:20](../../product/glossary.md#L20)).
The inquiry is the form on the website where a buyer asks for a format ([product/glossary.md:32](../../product/glossary.md#L32)).

## Your first try
"We believe that offering a small quiz on the website will help potential buyers to reflect and then pinpoint a bit better where they currently stand with their teams' AI usage and where additional training might help getting them to the next level.
To verify that we will build a prototype and run it through a small user test with virtual buyer personas and real people and measure, how many people go through the quiz and then send out the form with a confident feeling.
We are right if at least 50% of the participants end up sending the form after taking the quiz."

Where the draft differs:
- The draft tests the assumption from the selection: buyers trust the format the quiz names enough to start the form.
- The draft turns "a confident feeling" into signs a watcher can see. The tester keeps the named format in the form and does not go back to the formats.
- The draft counts testers ("3 of 5") instead of a percentage.

Feedback:
- Strong: "send out the form" is a behaviour a watcher can see. "Go through the quiz" keeps the two steps apart.
- Weak: "offering a small quiz … will help" names the idea, not the assumption. "Where they stand with their teams' AI usage" is a different assumption from the selected one.
- Weak: a watcher cannot see "a confident feeling". "50%" of five testers is a percentage of a handful of people. A count of testers says the same thing more honestly.

## We believe that (the assumption we test)
"Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form." ([discovery/intents/format-fit.md:83](../intents/format-fit.md#L83))
Level in the intent: "partly supported" ([discovery/intents/format-fit.md:57](../intents/format-fit.md#L57))

## To verify that, we will
Show 5 people who lead product people and have not booked a Loopwise format the page `/formats.html?variant=format-quiz`. Each tester gets only the scenario below. The person who built the page watches for the signs.

### Testers
- **Who qualifies:** proposal. The tester leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)). The tester does not decide alone, and no budget is settled yet ([product/personas/buyer-without-budget.md:5](../../product/personas/buyer-without-budget.md#L5)). The tester has a real group in mind and has not booked a Loopwise format.
- **How many:** 5 buyers without budget · Set by: Product lead (Loopwise), 2026-11-14
- **Recruited by:** Product lead (Loopwise) · **By:** before 2026-11-17

### Test scenario (the tester sees only this)
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life.
- **Page:** `/formats.html?variant=format-quiz`, proposal. The spec names the start page.
- **Sources:** the buyer without budget leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)). Some teams work with agents every day, others are where they were a year ago ([product/personas/buyer-without-budget.md:22](../../product/personas/buyer-without-budget.md#L22)).
- **Does not count if:** the tester has no such group in mind.

The task does not say "send an inquiry". Otherwise a sent form would only show that the tester followed the task.

### For the spec: the step from the quiz result to the form
The quiz fills "What do you need?" in the form ([discovery/intents/format-fit.md:82](../intents/format-fit.md#L82)).
The quiz result therefore needs one visible step into the form, for example a button.
The spec plans that step, so the watcher can see whether the tester takes it.
The tester must also be able to leave the result without taking it.
The site counts a started form when the visitor clicks into a form field ([discovery/intents/format-fit.md:32](../intents/format-fit.md#L32)).

## And measure (the signs the watcher looks for)
An AI persona cannot show how a buyer reacts to a page its sources never saw.
The last column says what the persona file can do for each sign instead:
- **Behaviour in the file:** the file states the behaviour itself. A persona can show it.
- **A fact the page must fit:** the file states something about the buyer that the page could clash with. The persona walkthrough checks the spec against it.
- **Nothing in the file:** only the test with people can test this sign.

| Sign (what the watcher sees or hears) | Points to | What the persona file says |
|---|---|---|
| The tester answers every quiz question for their own group, without asking what a question means | go on | A fact the page must fit: the buyer "Does not know the format or how many pieces it has" ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)). A question that needs this knowledge will fail. |
| On the quiz result, the tester uses the step to the form and clicks into a form field, without going back to the formats | go on | Nothing in the file: only the test with people can test this. |
| The tester sends the form and keeps the format text in "What do you need?", or adds to it | go on | A fact the page must fit: the buyer needs "Options to react to; she can describe what hurts, not name a format" ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). A result with one format and no options may get deleted. |
| Asked afterwards, the tester says in their own words why the format fits their group | go on | Nothing in the file: the tester's own words come only from the test with people. |
| The tester stops at a question, asks "what do you mean?", or skips it | rework | A fact the page must fit: the buyer "Asks whether to mix the group or split it by level, and leaves it open" ([product/personas/buyer-without-budget.md:43](../../product/personas/buyer-without-budget.md#L43)). The buyer "Cannot name a success line for the group" ([product/personas/buyer-without-budget.md:44](../../product/personas/buyer-without-budget.md#L44)). A question about either will likely stop the tester. |
| On the quiz result, the tester looks around for what to do next, or asks where to go | rework | Nothing in the file: only the test with people can test this. |
| The tester deletes or overwrites the format text in the form | drop | A fact the page must fit: the same line on options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). |
| The tester leaves the page, or goes back to the formats, without starting the form | drop | Behaviour in the file, partly: "Keeps the formats page open for weeks, or closes it and comes back later" ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). The line describes today's formats page, without a quiz. |
| The tester says "I'm guessing" or "not sure this is us" | drop | A fact the page must fit: the buyer "Does not want to send the form with a guess in it" ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). The filled text must not read like a guess the tester made. |

## We are right if (go-on line)
At least 3 of 5 testers answer the quiz for their own group, take the step from the result into the form, and send it with the named format still in it.
Set by: Product lead (Loopwise), wording proposed by the agent · Set on: 2026-11-15

## We rework or drop the idea if (rework-or-drop line)
The line has two parts. A problem with the page means rework. A problem with trust in the named format means drop.
- **We rework the quiz if** 3 or more of 5 testers get stuck on a question, or cannot find the way from the result to the form.
- **We drop the idea if** 3 or more of 5 testers delete the format the quiz named, or reach the form and leave without sending it.
- If the five testers fit none of these lines, the result is mixed. The learning card then decides on another round.

Set by: Product lead (Loopwise), wording proposed by the agent · Set on: 2026-11-15

## What this test cannot show
- 5 testers: a pattern, not a rate.
- Whether buyers book in the end. A prototype test shows whether people understand and use the page. The launch card is the place to measure the start rate and later steps.
- Whether more visits start the form than today. Today 194 of 740 inquiry page visits start the form, in synthetic data ([discovery/intents/format-fit.md:34](../intents/format-fit.md#L34)). Five testers cannot show a change in that share.
- Whether the format the quiz names holds up in the scoping call. The format is settled there ([product/glossary.md:33](../../product/glossary.md#L33)).
- The buyer with budget. All five testers are buyers without budget.
- A tester who knows they are watched may send the form more readily than at their desk.
- The persona file states the behaviour for one sign, partly. For five signs it states a fact the page must fit. For three signs it states nothing.
