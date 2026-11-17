# User test with Qlaris: short-form

> **Pressure-tested, not validated.** Qlaris sends AI twins, not people. Only the test with people tests from outside.
> Scenario written by an agent on 2026-11-16, for the product lead. Not a decision.
> Prototype card: [discovery/test-cards/short-form-prototype.md](../test-cards/short-form-prototype.md)
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite ([discovery/test-cards/short-form-prototype.md:7](../test-cards/short-form-prototype.md#L7)). This file repeats that label.

Qlaris is a service that runs a user test with AI twins.
An AI twin is a software participant that visits the page and reports what it did and felt.
A sign is something the watcher can see or hear during the test.
The twins get the same scenario as the human testers on the card. The two results can then be set side by side.

## The assumption under test
The card states it in [discovery/test-cards/short-form-prototype.md:21](../test-cards/short-form-prototype.md#L21).
This run looks at whether the twin sends the form with only name and email, without looking for a place to describe its group.

## What every twin gets (task field in Qlaris)
The text is word for word from the card ([discovery/test-cards/short-form-prototype.md:39](../test-cards/short-form-prototype.md#L39), [discovery/test-cards/short-form-prototype.md:40](../test-cards/short-form-prototype.md#L40)):

```
You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
Find out whether Loopwise has something for that group. Then do what you would do next in real life.
```

The task does not name the step the card hopes for. Otherwise the twin would only follow the task.

## Runs
The card splits the testers 3 and 2 between two start pages ([discovery/test-cards/short-form-prototype.md:41](../test-cards/short-form-prototype.md#L41)).
Qlaris takes one start page per test, so this is two runs:

| Run | Start page (live) | Twins |
|---|---|---|
| A | `https://loopwise-v2.vercel.app/formats.html?variant=short-form` | 3 |
| B | `https://loopwise-v2.vercel.app/inquiry.html?variant=short-form` | 2 |

Settings for both runs:
- **Who:** 5 buyers without budget, as on the card. Used: the Qlaris persona "Head of Product, Software-Mittelstand DACH" (persona id `7HcHmXVUwfGyCzX9z9JL`, panel country DE). It is the same persona as in the format-quiz run ([discovery/user-tests/format-quiz-qlaris.md:37](format-quiz-qlaris.md#L37)). The persona leads a team of 8 to 20 PMs, POs and business analysts. It differs from the buyer without budget on one point. The persona decides on the training budget, "often together with L&D and with an eye on the CFO" (Qlaris persona text, translated from German). The buyer without budget has no budget settled at first contact ([product/personas/buyer-without-budget.md:5](../../product/personas/buyer-without-budget.md#L5)). [assumption: the persona is closer to the card's testers than panel filters]
- **Device:** desktop.
- **Artefact type:** mock. The page is a prototype. A sent form or a booked slot reaches no person.
- **Panel country:** DE. [assumption: the academy sells to companies in Germany]
- **Briefing:** "This is a prototype of a training provider's website. Act as you would on a real site."

## How the result is read
The signs and their meaning are on the card ([discovery/test-cards/short-form-prototype.md:53](../test-cards/short-form-prototype.md#L53)).
The go-on line is in [discovery/test-cards/short-form-prototype.md:70](../test-cards/short-form-prototype.md#L70). The rework-or-drop line is in [discovery/test-cards/short-form-prototype.md:74](../test-cards/short-form-prototype.md#L74).
For each twin, the session that runs the test notes which signs it showed, with the twin's own words from the Qlaris report.
It counts twins per line ("2 of 5"). It does not decide whether the idea goes on.

## What this test cannot show
- How people react. The twins are software, so the result is a third opinion beside the persona walkthrough and the test with people.
- Whether a twin had "a real group in mind". The card excludes testers without one ([discovery/test-cards/short-form-prototype.md:39](../test-cards/short-form-prototype.md#L39)).

## Result
Run on 2026-11-16 by an agent session. Not a decision.
Quotes are from the Qlaris report, with test id, twin id and step. The twins wrote in German. The quotes are the English translation the Qlaris report gives.

### The live page
No twin met an error. The inquiry page showed only the name field, the email field and "Send inquiry" ([site/variants/short-form/inquiry.html:26](../../site/variants/short-form/inquiry.html#L26), [site/variants/short-form/inquiry.html:28](../../site/variants/short-form/inquiry.html#L28)).
Qlaris stops a twin before an action that sends data. So no twin pressed "Send inquiry". Each twin stopped at that button and said it would send in real life.
The sign "the tester sends the form" therefore cannot be seen in this test.

### Runs
| Run | Qlaris test id | Start page | Twins | Status | Price |
|---|---|---|---|---|---|
| A | `353iZXPUgaivK3vLzbPu` | formats page | 3 | all 3 stopped before "Send inquiry" | 15 units |
| B | `FonXow0bjpetSVNhdIUK` | inquiry page | 2 | both stopped before "Send inquiry" | 10 units |

Qlaris charges 5 units per twin for each started block of 10 steps. Every twin took 3 to 6 steps, so each cost 5 units.
The five runs come from five different twins. No twin was drawn twice in this test.
One twin (DE_24974) also ran in the format-quiz test, run A ([discovery/user-tests/format-quiz-qlaris.md:80](format-quiz-qlaris.md#L80)).

### The path all five took
Every twin opened the page "Buyer preparation" from the top menu before the form.
That page says its steps start after the booking. It links back with "Start with an inquiry" ([site/buyer-prep.html:22](../../site/buyer-prep.html#L22)).
All five twins came to the inquiry page through that link.
No twin went from the inquiry page back to the formats after it arrived there through that link.

**Run A, twin 1 (DE_24974), start on the formats page.**
- Steps: read the formats. Opened "Buyer preparation". Clicked "Start with an inquiry". Read the form and stopped before "Send inquiry". It did not click into the name or email field.
- Signs from the card: reaches the form without going back to the formats (go on, in part: no click into a field). Says it misses a place to describe the team, and accepts that (rework, in part). Says what happens next (go on).
- Own words on the form: "What I'm missing: I can't say anywhere here how big my team is or that it's about work on our own backlog; all of that is supposed to happen only in the call. That's okay" (Qlaris report `353iZXPUgaivK3vLzbPu`, twin DE_24974, step 2)
- Own words on the next step: "In real life I would now enter my name and email and submit the inquiry." (same report, step 2)

**Run A, twin 2 (DE_26162), start on the formats page.**
- Steps: the same path as twin 1. Stopped before "Send inquiry". It did not click into a field.
- Signs from the card: reaches the form without going back to the formats (go on, in part: no click into a field). Wishes it could give group size and goal, and accepts that (rework, in part). Says what happens next (go on).
- Own words: "the form is lean, only name and email, and it's clear that nothing gets booked. That takes away my fear of a commitment." (Qlaris report `353iZXPUgaivK3vLzbPu`, twin DE_26162, step 2)
- Own words: "I'll learn the rest in the Scoping Call, that's okay, although I'd wish I could provide group size and goal in advance." (same report, step 2)

**Run A, twin 3 (DE_27188), start on the formats page.**
- Steps: the same path as twins 1 and 2. Stopped before "Send inquiry". It did not click into a field.
- Signs from the card: reaches the form without going back to the formats (go on, in part: no click into a field). Misses a field to describe its team, and accepts that (rework, in part). Says what happens next (go on).
- Own words: "What I'm missing is a field where I can briefly describe my team, but in the scoping call I'm supposed to tell that myself." (Qlaris report `353iZXPUgaivK3vLzbPu`, twin DE_27188, step 2)
- Own words: "In real life I would now send the inquiry." (same report, step 2)

**Run B, twin 1 (DE_26606), start on the inquiry page.**
- Steps: first clicked "Formats" in the top menu, before any field. Read the formats. Opened "Buyer preparation". Came back with "Start with an inquiry". Stopped before "Send inquiry". It did not click into a field.
- Signs from the card: leaves the inquiry page for the formats without starting the form (drop), at step 0. It came back to the form. It named no missing place to describe the group. Says what happens next (go on).
- Own words on leaving the form: "On this page I only see a contact form, but not a word about what content is actually offered. As Head of Product, I don't send my data off blindly." (Qlaris report `FonXow0bjpetSVNhdIUK`, twin DE_26606, step 0)
- Own words on the form: "The line 'Sending this form books nothing' takes away my worry about committing." (same report, step 3). The line is on the page ([site/variants/short-form/inquiry.html:23](../../site/variants/short-form/inquiry.html#L23)).

**Run B, twin 2 (DE_26697), start on the inquiry page.**
- Steps: first clicked "Formats" in the top menu, before any field. Read the formats. Opened "Buyer preparation". Came back with "Start with an inquiry". Typed an invented name and an example email address. Stopped before "Send inquiry".
- Signs from the card: leaves the inquiry page for the formats without starting the form (drop), at step 0. Clicks into name and email after it came back (go on, in part). Misses a place to note its team size, and accepts that (rework, in part). Says what happens next (go on).
- Own words on leaving the form: "Before I leave my name and email here, I'd rather look at the 'Formats'." (Qlaris report `FonXow0bjpetSVNhdIUK`, twin DE_26697, step 0)
- Own words on the form: "Something is missing for me: I can't briefly note here that it's about a product team of around 12 people. But that gets clarified in the conversation anyway." (same report, step 3)

### Count against the lines on the card
Go-on line ([discovery/test-cards/short-form-prototype.md:71](../test-cards/short-form-prototype.md#L71)):
- Reach the inquiry page: 5 of 5.
- Send the form with name and email: 0 of 5. Qlaris stopped every twin before "Send inquiry".
- Up to the send button, 5 of 5 said they would send in real life.
- Do not go back to the formats to choose first: 3 of 5 (run A). Both twins in run B went to the formats at step 0.
- Do not ask where to describe the group: no twin asked this as a question, and no twin searched the page for such a place. 4 of 5 said they miss a place to describe their group (DE_24974, DE_26162, DE_27188, DE_26697). All four said the scoping call is the place for it.
- The whole line: 0 of 5, because of the Qlaris stop. Without the sending part: 3 of 5 if a remark about the missing place does not count as asking, 0 of 5 if it does. Which reading holds is for the product lead.

Rework line ([discovery/test-cards/short-form-prototype.md:76](../test-cards/short-form-prototype.md#L76)):
- Looked for a place to describe the group: 4 of 5 said they miss one, 0 of 5 searched for one. Whether the remark counts as looking is for the product lead.
- Stopped at "Send" and asked what it commits them to: 0 of 5 asked. 5 of 5 stopped at "Send" because of the Qlaris rule. Two twins said the line "books nothing" took away their worry (DE_26162, DE_26606).

Drop line ([discovery/test-cards/short-form-prototype.md:77](../test-cards/short-form-prototype.md#L77)):
- Left without sending: 5 of 5 did not send. All five stopped because of the Qlaris rule, and all five said they would send in real life. Whether this counts as leaving is for the product lead.
- Said they must know the format first: 0 of 5 said this. Both twins in run B left the form at step 0 to see what Loopwise offers. DE_26606 wanted to know "whether Loopwise has anything at all for my product team" (Qlaris report `FonXow0bjpetSVNhdIUK`, twin DE_26606, step 0).

Other signs from the table ([discovery/test-cards/short-form-prototype.md:62](../test-cards/short-form-prototype.md#L62)):
- On the inquiry page, clicked into name or email without going back to the formats first: 0 of 5. Run A twins did not click into a field. DE_26697 clicked in after its visit to the formats.
- Said in its own words what happens next: 5 of 5 named the scoping call.
- Named what it still has to settle: data protection (5 of 5), a measure of success for the CFO (5 of 5), before-and-after examples (5 of 5), prices (1 of 5, DE_26606).

### Conclusion
[open: for the product lead]

### Gaps
- The Qlaris persona decides on the budget. The card's testers have no budget settled.
- No twin could send the form. Only the test with people can show that step.
- Every twin read the page "Buyer preparation" before the form. Human testers may take a shorter path.
- Whether a twin had a real group in mind cannot be checked. Four twins described a group of about 12 people. DE_26606 described a team of 8 to 20.
