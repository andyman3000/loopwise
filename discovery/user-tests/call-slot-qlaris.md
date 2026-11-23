# User test with Qlaris: call-slot

> **Pressure-tested, not validated.** Qlaris sends AI twins, not people. Only the test with people tests from outside.
> Scenario written by an agent on 2026-11-16, for the product lead. Not a decision.
> Prototype card: [discovery/test-cards/call-slot-prototype.md](../test-cards/call-slot-prototype.md)
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite ([discovery/test-cards/call-slot-prototype.md:7](../test-cards/call-slot-prototype.md#L7)). This file repeats that label.

Qlaris is a service that runs a user test with AI twins.
An AI twin is a software participant that visits the page and reports what it did and felt.
A sign is something the watcher can see or hear during the test.
The twins get the same scenario as the human testers on the card. The two results can then be set side by side.

## The assumption under test
The card states it in [discovery/test-cards/call-slot-prototype.md:23](../test-cards/call-slot-prototype.md#L23).
This run looks at whether the twin books a call slot or clicks the number, instead of sending the form.

## What every twin gets (task field in Qlaris)
The text is word for word from the card ([discovery/test-cards/call-slot-prototype.md:45](../test-cards/call-slot-prototype.md#L45), [discovery/test-cards/call-slot-prototype.md:46](../test-cards/call-slot-prototype.md#L46)):

```
You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
Find out whether Loopwise has something for that group. Then do what you would do next in real life.
```

The task does not name the step the card hopes for. Otherwise the twin would only follow the task.

## Runs
The card splits the testers 3 and 2 between two start pages ([discovery/test-cards/call-slot-prototype.md:47](../test-cards/call-slot-prototype.md#L47)).
Qlaris takes one start page per test, so this is two runs:

| Run | Start page (live) | Twins |
|---|---|---|
| A | `https://loopwise-v2.vercel.app/formats.html?variant=call-slot` | 3 |
| B | `https://loopwise-v2.vercel.app/inquiry.html?variant=call-slot` | 2 |

Settings for both runs:
- **Who:** 5 buyers in one group, with or without budget, as on the card. [open: the Qlaris persona or panel filter that fits. The session that runs the test picks it after a dry run and writes it here.]
- **Device:** desktop.
- **Artefact type:** mock. The page is a prototype. A sent form or a booked slot reaches no person.
- **Panel country:** DE. [assumption: the academy sells to companies in Germany]
- **Briefing:** "This is a prototype of a training provider's website. Act as you would on a real site."

## How the result is read
The signs and their meaning are on the card ([discovery/test-cards/call-slot-prototype.md:61](../test-cards/call-slot-prototype.md#L61)).
The go-on line is in [discovery/test-cards/call-slot-prototype.md:79](../test-cards/call-slot-prototype.md#L79). The rework-or-drop line is in [discovery/test-cards/call-slot-prototype.md:84](../test-cards/call-slot-prototype.md#L84).
For each twin, the session that runs the test notes which signs it showed, with the twin's own words from the Qlaris report.
It counts twins per line ("2 of 5"). It does not decide whether the idea goes on.

## What this test cannot show
- How people react. The twins are software, so the result is a third opinion beside the persona walkthrough and the test with people.
- Whether a twin had "a real group in mind". The card excludes testers without one ([discovery/test-cards/call-slot-prototype.md:45](../test-cards/call-slot-prototype.md#L45)).

## Result
[open: filled by the session that runs the test]
