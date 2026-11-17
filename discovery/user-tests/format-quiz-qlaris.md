# User test with Qlaris: format-quiz

> **Pressure-tested, not validated.** Qlaris sends AI twins, not people. Only the test with people tests from outside.
> Scenario written by an agent on 2026-11-16, for the product lead. Not a decision.
> Prototype card: [discovery/test-cards/format-quiz-prototype.md](../test-cards/format-quiz-prototype.md)
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite ([discovery/test-cards/format-quiz-prototype.md:7](../test-cards/format-quiz-prototype.md#L7)). This file repeats that label.

Qlaris is a service that runs a user test with AI twins.
An AI twin is a software participant that visits the page and reports what it did and felt.
A sign is something the watcher can see or hear during the test.
The twins get the same scenario as the human testers on the card. The two results can then be set side by side.

## The assumption under test
The card states it in [discovery/test-cards/format-quiz-prototype.md:32](../test-cards/format-quiz-prototype.md#L32).
This run looks at whether the twin answers the quiz for its group, takes the step from the result into the form, and sends it with the named format still in the first line.

## What every twin gets (task field in Qlaris)
The text is word for word from the card ([discovery/test-cards/format-quiz-prototype.md:45](../test-cards/format-quiz-prototype.md#L45), [discovery/test-cards/format-quiz-prototype.md:46](../test-cards/format-quiz-prototype.md#L46)):

```
You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today.
Find out whether Loopwise has something for that group. Then do what you would do next in real life.
```

The task does not name the step the card hopes for. Otherwise the twin would only follow the task.

## Runs
The card splits the testers 3 and 2 between two start pages ([discovery/test-cards/format-quiz-prototype.md:47](../test-cards/format-quiz-prototype.md#L47)).
Qlaris takes one start page per test, so this is two runs:

| Run | Start page (live) | Twins |
|---|---|---|
| A | `https://loopwise-v2.vercel.app/formats.html?variant=format-quiz` | 3 |
| B | `https://loopwise-v2.vercel.app/inquiry.html?variant=format-quiz` | 2 |

Settings for both runs:
- **Who:** 5 buyers without budget, as on the card. Used: the Qlaris persona "Head of Product, Software-Mittelstand DACH" (persona id `7HcHmXVUwfGyCzX9z9JL`, panel country DE). It was the only persona in the Qlaris workspace. The persona leads a team of 8 to 20 PMs, POs and business analysts. It differs from the buyer without budget on one point. The persona decides on the training budget, "often together with L&D and with an eye on the CFO" (Qlaris persona text, translated from German). The buyer without budget has no budget settled at first contact ([product/personas/buyer-without-budget.md:5](../../product/personas/buyer-without-budget.md#L5)). Panel filters would have kept age, income and education, but not the job. [assumption: the persona is closer to the card's testers than panel filters]
- **Device:** desktop.
- **Artefact type:** mock. The page is a prototype. A sent form or a booked slot reaches no person.
- **Panel country:** DE. [assumption: the academy sells to companies in Germany]
- **Briefing:** "This is a prototype of a training provider's website. Act as you would on a real site."

## How the result is read
The signs and their meaning are on the card ([discovery/test-cards/format-quiz-prototype.md:60](../test-cards/format-quiz-prototype.md#L60)).
The go-on line is in [discovery/test-cards/format-quiz-prototype.md:79](../test-cards/format-quiz-prototype.md#L79). The rework-or-drop line is in [discovery/test-cards/format-quiz-prototype.md:83](../test-cards/format-quiz-prototype.md#L83).
For each twin, the session that runs the test notes which signs it showed, with the twin's own words from the Qlaris report.
It counts twins per line ("2 of 5"). It does not decide whether the idea goes on.

## What this test cannot show
- How people react. The twins are software, so the result is a third opinion beside the persona walkthrough and the test with people.
- Whether a twin had "a real group in mind". The card excludes testers without one ([discovery/test-cards/format-quiz-prototype.md:45](../test-cards/format-quiz-prototype.md#L45)).

## Result
Run on 2026-11-16 by an agent session. Not a decision.
Quotes are from the Qlaris report, with test id, twin id and step. The twins wrote in German. The quotes are the English translation the Qlaris report gives.

### The live page
No twin met an error. The quiz opened for all five runs.
Qlaris stops a twin before an action that sends data. So no twin pressed "Send inquiry". Each twin stopped at that button and said it would send in real life.
The sign "the tester sends the form" therefore cannot be seen in this test.

### Runs
| Run | Qlaris test id | Start page | Twins | Status | Price |
|---|---|---|---|---|---|
| A | `gVZfezMf5pHfEWvWXiDs` | formats page | 3 | all 3 stopped before "Send inquiry" | 30 units |
| B | `idGZ5L3EstmdEhVHTBmk` | inquiry page | 2 | both stopped before "Send inquiry" | 20 units |

Qlaris charges 5 units per twin for each started block of 10 steps. Every twin took 12 to 17 steps, so each cost 10 units.
One twin (DE_26551) was drawn for both runs. The five runs therefore come from four different twins.
In run B that twin started as if it had not seen the site before.

### Each twin
All five answered the same four quiz questions the same way, with one difference in run B.
They entered 12 people and ticked "Assisting" and "Conversational".
They ticked "They know AI tools, but do not use them on real backlog work".
Every quiz result named the "Agentic Product Management lab".
After "Inquire now", the form opened with "What do you need?" filled in by the quiz.
Its first line reads "A format that could fit us: …" ([site/variants/format-quiz/quiz.js:139](../../site/variants/format-quiz/quiz.js#L139)). No twin changed that text.

**Run A, twin 1 (DE_24974), start on the formats page.**
- Steps: started the quiz at once. Answered all four questions without asking what one means. Picked "As one team, on one product". Clicked "Inquire now" on the result. Read the filled form and stopped before "Send inquiry". It did not click into a form field.
- Signs from the card: answers every question for its group (go on). Uses the step to the form, but does not click into a field (go on, in part). Says why the format fits (go on).
- Own words: "backlog work instead of toy examples, and the follow-up after two days appeals to me because it helps against things fizzling out" (Qlaris report `gVZfezMf5pHfEWvWXiDs`, twin DE_24974, step 10).
- Own words: "I'm not sending real data, though, because sending an inquiry is an action with consequences." (same report, step 11)

**Run A, twin 2 (DE_26551), start on the formats page.**
- Steps: the same path as twin 1, with the same answers. Stopped before "Send inquiry". It did not click into a form field.
- Signs from the card: answers every question (go on). Uses the step to the form, no click into a field (go on, in part). Says why the format fits (go on).
- Own words on the quiz: "The examples for each level are helpful, I don't have to guess what's meant." (Qlaris report `gVZfezMf5pHfEWvWXiDs`, twin DE_26551, step 3)
- Own words on the result: "I'm still missing details like data protection and the measure of success, but they probably sort that out in the scoping conversation." (same report, step 10)

**Run A, twin 3 (DE_26812), start on the formats page.**
- Steps: answered the quiz like twins 1 and 2. Clicked "Inquire now". On the form, it opened the buyer preparation page through a link. It came back with "Start with an inquiry". Then it typed name, company and email. It left "What do you need?" as the quiz filled it. Stopped before "Send inquiry".
- Signs from the card: answers every question (go on). Uses the step to the form and clicks into a field (go on). Says why the format fits (go on). It left the form once, to the buyer preparation page, not to the formats, and came back.
- Own words: "Good that my quiz result is already in the text field, that saves me retyping it." (Qlaris report `gVZfezMf5pHfEWvWXiDs`, twin DE_26812, step 11)
- Own words: "What I'm missing is something on data protection for AI tools, but I'll clarify that in the scoping call." (same report, step 12)

**Run B, twin 1 (DE_26179), start on the inquiry page.**
- Steps: first clicked "Formats" in the top menu, not the link "Unsure? Take this quiz". Started the quiz on the formats page. Picked "People come from different teams or products". Clicked "Inquire now". Read the filled form and stopped before "Send inquiry". It did not click into a form field.
- Signs from the card: goes to the formats without starting the form (drop), at step 0. It came back to the form through the quiz. Answers every question (go on). Uses the step to the form, no click into a field (go on, in part). Says why the format fits (go on).
- Own words on leaving the form: "A form without an offer is pointless to me as Head of Product." (Qlaris report `idGZ5L3EstmdEhVHTBmk`, twin DE_26179, step 0)
- Own words on the result: "The recommendation is understandable, because my answers are summarized." (same report, step 11)

**Run B, twin 2 (DE_26551, the same twin as run A, twin 2), start on the inquiry page.**
- Steps: first clicked "Formats" in the top menu. Started the quiz there and answered it like run A. Clicked "Inquire now". Read the filled form and stopped before "Send inquiry". It did not click into a form field.
- Signs from the card: goes to the formats without starting the form (drop), at step 0. It came back through the quiz. Answers every question (go on). Uses the step to the form, no click into a field (go on, in part). Says why the format fits (go on).
- Own words on the language: "The page, by the way, is completely in English, which is already a question mark for me as a German mid-sized company." (Qlaris report `idGZ5L3EstmdEhVHTBmk`, twin DE_26551, step 0)
- Own words on the result: "the card talks about PMs, my team also has POs and BAs, that I'd have to ask about." (same report, step 11)

### Count against the lines on the card
Go-on line ([discovery/test-cards/format-quiz-prototype.md:80](../test-cards/format-quiz-prototype.md#L80)):
- Answer the quiz for their own group: 5 of 5.
- Take the step from the result into the form ("Inquire now"): 5 of 5.
- Send the form with the named format still in it: 0 of 5. Qlaris stopped every twin before "Send inquiry".
- Up to the send button, 5 of 5 kept the named format line unchanged.
- The whole line: 0 of 5. Without the sending part: 5 of 5.

Rework line ([discovery/test-cards/format-quiz-prototype.md:85](../test-cards/format-quiz-prototype.md#L85)):
- Stuck on a quiz question: 0 of 5.
- Could not find the way from the result to the form: 0 of 5.

Drop line ([discovery/test-cards/format-quiz-prototype.md:86](../test-cards/format-quiz-prototype.md#L86)):
- Deleted or replaced the named format: 0 of 5.
- Reached the form and left without sending: 5 of 5 did not send. All five stopped because of the Qlaris rule, and all five said they would send in real life. Whether this counts as leaving is for the product lead.

Other signs from the table ([discovery/test-cards/format-quiz-prototype.md:69](../test-cards/format-quiz-prototype.md#L69)):
- Clicked into a form field after the result: 1 of 5.
- Said in its own words why the format fits its group: 5 of 5.
- Said "I'm guessing" or "not sure this is us": 0 of 5.
- On the inquiry page, went to the formats before using the form: 2 of 2 in run B.
- Asked for something the page does not answer: data protection (5 of 5), a way to measure success for the CFO (5 of 5).

### Conclusion
[open: for the product lead]

### Gaps
- The Qlaris persona decides on the budget. The card's testers have no budget settled.
- One twin ran twice. The count "of 5" covers five runs by four twins.
- No twin could send the form. Only the test with people can show that step.
- The Qlaris summary for both tests was still being written when this result was read. The per-twin steps were complete.
