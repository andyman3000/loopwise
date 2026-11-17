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
- **Who:** 5 buyers in one group, with or without budget, as on the card. Used: the Qlaris persona "Head of Product, Software-Mittelstand DACH" (persona id `7HcHmXVUwfGyCzX9z9JL`, panel country DE). It is the same persona as in the format-quiz run ([discovery/user-tests/format-quiz-qlaris.md:37](format-quiz-qlaris.md#L37)). The persona leads a team of 8 to 20 PMs, POs and business analysts. The persona decides on the training budget, "often together with L&D and with an eye on the CFO" (Qlaris persona text, translated from German). So every twin here is a buyer with budget ([product/personas/buyer-with-budget.md:5](../../product/personas/buyer-with-budget.md#L5)). The card accepts testers with budget ([discovery/test-cards/call-slot-prototype.md:38](../test-cards/call-slot-prototype.md#L38)). No twin is a buyer without budget. [assumption: the persona is closer to the card's testers than panel filters]
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
Run on 2026-11-16 by an agent session. Not a decision.
Quotes are from the Qlaris report, with test id, twin id and step. The twins wrote in German. The quotes are the English translation the Qlaris report gives.

### The live page
No twin met an error. The slot booking opened for all five twins.
Qlaris stops a twin before an action that sends data. So no twin pressed "Book this call". Each twin stopped at that button and said it would book in real life.
The page that says the call is booked therefore cannot be seen in this test.
The number under "Call us directly" is a link. No twin clicked it, so the Qlaris stop played no part there.

### Runs
| Run | Qlaris test id | Start page | Twins | Status | Price |
|---|---|---|---|---|---|
| A | `T72jXQpNMIA3cQAm4tFy` | formats page | 3 | all 3 stopped before "Book this call" | 15 units |
| B | `sFKMC9nw9E8WWktwlblX` | inquiry page | 2 | both stopped before "Book this call" | 10 units |

Qlaris charges 5 units per twin for each started block of 10 steps. Every twin took 8 to 10 steps, so each cost 5 units.
The five runs come from five different twins. No twin was drawn twice.

### Each twin
All five took the same last steps on the inquiry page.
They clicked "Choose a time" in the box "Book a call slot".
They picked Tuesday 17 November, the first day the calendar offers.
They picked a time (11:00 or 14:00), then typed name and email.
They stopped before "Book this call".
No twin clicked into a field of the inquiry form. No twin clicked the phone number.

**Run A, twin 1 (DE_25998), start on the formats page.**
- Steps: went to the buyer preparation page. Came to the inquiry page through "Start with an inquiry". Clicked "Choose a time" at once. Picked 17 November, 14:00. Typed name and email. Stopped before "Book this call".
- Where it stopped: at the confirm button, because of the Qlaris stop.
- Signs from the card: opens the slot booking before clicking into a form field (go on). Picks a time and reaches the confirm button (go on, without the booked page). Names what to settle in the call: which format fits its team (go on).
- Own words on the form: "A form I'd have to wait days for is too sluggish for me." (Qlaris report `T72jXQpNMIA3cQAm4tFy`, twin DE_25998, step 2)
- Own words on the booking: "Choosing an appointment without first seeing what I'm actually going to discuss was honestly a bit bold, but 20 minutes of video is manageable." (same report, step 7)

**Run A, twin 2 (DE_26593), start on the formats page.**
- Steps: scrolled the formats page. Went to the buyer preparation page and back to the formats. Came to the inquiry page through "Make an inquiry". Clicked "Choose a time". Picked 17 November, 11:00. Typed name and email. Stopped before "Book this call".
- Where it stopped: at the confirm button, because of the Qlaris stop.
- Signs from the card: opens the slot booking before clicking into a form field (go on). Picks a time and reaches the confirm button (go on, without the booked page). Names what to settle in the call: own backlog, data protection, a measurable figure (go on).
- Own words: "Before I release budget, I want to clarify in the conversation how that works with our own backlog, with data protection, and with a measurable figure." (Qlaris report `T72jXQpNMIA3cQAm4tFy`, twin DE_26593, step 4)
- Own words: "A form that doesn't book anything and only brings an answer in a few days is too sluggish for me." (same report, step 4)

**Run A, twin 3 (DE_26606), start on the formats page.**
- Steps: went to the buyer preparation page. Came to the inquiry page through "Start with an inquiry". Clicked "Choose a time". Picked 17 November, 11:00. Typed name and email. Stopped before "Book this call".
- Where it stopped: at the confirm button, because of the Qlaris stop.
- Signs from the card: opens the slot booking before clicking into a form field (go on). Picks a time and reaches the confirm button (go on, without the booked page). Names what to settle in the call: a metric, prices, work on its own backlog (go on).
- Own words: "The 20-minute video call is faster than waiting for a reply 'within a few days'." (Qlaris report `T72jXQpNMIA3cQAm4tFy`, twin DE_26606, step 2)
- Own words: "a 20-minute conversation beforehand is exactly right for me before I release budget for my product team." (same report, step 3)

**Run B, twin 1 (DE_26322), start on the inquiry page.**
- Steps: first clicked "Formats" in the top menu. Went on to the buyer preparation page. Came back to the inquiry page through "Start with an inquiry". Clicked "Choose a time". Picked 17 November, 14:00. Typed name and email. Stopped before "Book this call".
- Where it stopped: at the confirm button, because of the Qlaris stop.
- Signs from the card: left the inquiry page at step 0, before any way to talk or the form. It came back at step 3 and opened the slot booking before a form field (go on). Picks a time and reaches the confirm button (go on, without the booked page). Names what to settle in the call: data protection, a metric for the CFO, its own backlog (go on).
- Own words on leaving: "A call without substance is too early for me." (Qlaris report `sFKMC9nw9E8WWktwlblX`, twin DE_26322, step 0)
- Own words on coming back: "Filling out a form and then waiting days for a reply is too sluggish for me" (same report, step 3)

**Run B, twin 2 (DE_26697), start on the inquiry page.**
- Steps: first clicked "Formats" in the top menu. Came back to the inquiry page through "Make an inquiry". Clicked "Choose a time". Picked 17 November, 14:00. Typed name and email. Stopped before "Book this call".
- Where it stopped: at the confirm button, because of the Qlaris stop.
- Signs from the card: left the inquiry page at step 0, before any way to talk or the form. It came back at step 2 and opened the slot booking before a form field (go on). Picks a time and reaches the confirm button (go on, without the booked page). Names what to settle in the call: data protection, measurability, its own backlog (go on).
- Own words on leaving: "Booking a call without knowing the offers would be too early for me." (Qlaris report `sFKMC9nw9E8WWktwlblX`, twin DE_26697, step 0)
- Own words on the booking: "the path to the conversation is clear and uncomplicated, 20 minutes is a manageable effort." (same report, step 7)

### Count against the lines on the card
Go-on line ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)):
- Opened the slot booking and picked a day and a time: 5 of 5.
- Reached "Book this call" with day, time, name and email filled in: 5 of 5.
- Reached the page that says the call is booked: 0 of 5. Qlaris stopped every twin before "Book this call".
- Clicked the number to call: 0 of 5. No twin was stopped here by Qlaris. No twin tried.
- Sent the form: 0 of 5. No twin clicked into a form field.
- The whole line: 0 of 5. Without the last click on "Book this call": 5 of 5.

Rework line ([discovery/test-cards/call-slot-prototype.md:86](../test-cards/call-slot-prototype.md#L86)):
- Did not find the ways to talk: 0 of 5.
- Stopped inside the slot booking because no time fit, or asked what the call is for: 0 of 5. One twin said it booked without knowing what it would discuss, and went on (DE_25998, step 7).

Drop line ([discovery/test-cards/call-slot-prototype.md:87](../test-cards/call-slot-prototype.md#L87)):
- Saw the ways to talk and sent the form instead: 0 of 5.
- Left with neither a booked slot, a call nor a sent form: 5 of 5 booked no slot. All five stopped because of the Qlaris rule, and all five said they would book in real life. Whether this counts as leaving is for the product lead.

Other signs from the table ([discovery/test-cards/call-slot-prototype.md:68](../test-cards/call-slot-prototype.md#L68)):
- Opened the slot booking or the phone option before clicking into a form field: 5 of 5, all through the slot booking.
- Named in its own words what it wants to settle in the call: 5 of 5. Qlaris asks nothing afterwards, so these words come from the twins' notes during the steps.
- Said it would talk to colleagues first: 0 of 5.
- On the inquiry page, went to the formats before using any way to talk: 2 of 2 in run B.
- Asked for something the page does not answer: data protection (5 of 5), a measurable result for the CFO (5 of 5).

The card names one fact against this idea for the buyer with budget. That buyer "Wants written answers before setting up a call" ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). All five twins hold a budget. All five chose the call over the form. Two of them said they want the call before they release budget (DE_26593, step 4; DE_26606, step 3).

### Conclusion
[open: for the product lead]

### Gaps
- All five twins hold a budget. The test shows nothing about buyers without budget.
- No twin could press "Book this call". Only the test with people can show that step and the page after it.
- All five twins picked the first day on offer. The test cannot show whether a buyer with no date in mind finds a time ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)).
