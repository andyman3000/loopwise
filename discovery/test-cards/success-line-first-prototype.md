# Prototype test card: success-line-first

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the cross test with people tests from outside.
> Assessment drafted by an agent on 2026-08-18, not a decision.
> Card owner: ____ (human decides)
> Intent: `discovery/intents/format-question.md` · Idea: I12 ("the inquiry page opens with the question "What should be different for your team in three months?", with example answers for both kinds of sponsor and a "don't know yet" box.", `discovery/intents/format-question.md:41`)
> Material: interviews are anonymised composites; mails, inbox and data are synthetic (`discovery/intents/format-question.md:5`). This card repeats that label.

A prototype test shows one person a rough page and watches what they do.
A critical assumption is the one thing that must be true for an idea to work.
The person who built the page watches. The tester knows only the situation and the task.

## Your first try
"We believe that showing sponsors a question "What should be different for your team in three months?", with example answers will make them think about their desired outcome
To test that we will build a prototype with the fucntion
We are right if one human test sponsor picks this and states that this helped him get a better idea, what the outcome of the workshop should be and what he should ask now,"

Where the draft differs:
- The answer counts the tester saying the page helped. The pair dropped that sign after the first draft. The draft counts the line the tester writes or changes, and the sent inquiry.
- The answer also wants the tester to know what to ask next. The page asks for no question to the academy, so the watcher cannot see that.

## We believe that (the assumption we test)
"A sponsor who is shown example answers can say what should be different for the team after the training." (`discovery/intents/format-question.md:70`)
Level in the intent: "unsupported" (`discovery/intents/format-question.md:41`)

The learning card for format-quiz says: "A sponsor who does not know the answers wants something to react to, or a person to talk to." (`discovery/decisions/002-format-quiz.md:40`)
What this idea answers of it, in the pair's words: "This is something to react to"

## To test that, we will
Show one tester from another pair the page `/inquiry.html?variant=success-line-first`. The tester gets only the scenario below. The person who built the page watches for the signs.

### Test scenario (the tester sees only this)
- **Situation:** You help a product team in your company get better at using AI in their daily work. Think of a real team you know well that could use outside training for this. You are on the website of an academy that runs trainings inside companies.
- **Task:** Get in touch with the academy about a training for that team.
- **Page:** `/inquiry.html?variant=success-line-first`. The question opens the inquiry page (`discovery/intents/format-question.md:41`). [assumption: the test starts on the inquiry page; the spec names the start page and may change it]
- **Sources:** the soft sponsor "supports the move to AI for product and project roles, together with the team leads" (`product/personas/sponsor-soft.md:14`). The hard sponsor is "head of product" (`product/personas/sponsor-hard.md:14`). The academy runs trainings for "one team inside one company" (`product/glossary.md:21`).
- **Does not count if:** the tester has no such team.

### Signs the watcher looks for
| Sign (what the watcher sees or hears) | Points to | Can a persona show it? |
|---|---|---|
| The tester picks an example and changes words in it to fit their team, or writes their own line | go on | only the cross test with people can test this |
| The tester goes on to the contact form and sends the inquiry | go on | only the cross test with people can test this |
| The tester ticks "Don't know yet", or says they do not know what should be different | rework or drop | yes, the hard sponsor: "Demands a measure but has none: no cost-benefit analysis, and asks the provider what to look at" (`product/personas/sponsor-hard.md:48`) |
| The tester asks the watcher what the question means or what kind of answer is wanted | rework or drop | only the cross test with people can test this |
| The tester scrolls past the question to look for the form, or asks which format to choose | rework or drop | only the cross test with people can test this |
| The tester asks for a call or a person instead | rework or drop | only the cross test with people can test this. The hard sponsor "Wants to talk to someone who delivered it, or a comparable reference" (`product/personas/sponsor-hard.md:46`). That is a different behaviour. |

## We are right if (go-on line)
The tester picks an example and changes it, or writes their own line, without asking the watcher. Then the tester sends the inquiry. (proposal) · Set on: ____ (human decides)

## We rework or drop the idea if (rework-or-drop line)
The tester ticks "Don't know yet" or says they do not know. Or the tester asks the watcher what the question means, skips it to find the form or a format, or asks for a person. (proposal) · Set on: ____ (human decides)

## What this test cannot show
- One tester per pair: a pattern, not a rate.
- Whether the tester was unsure what should be different before the page. The scenario cannot put them in that state.
- Whether the line the tester writes is one the academy can check after the training, or use in the scoping call.
- Whether a sponsor who sends the inquiry later books a scoping call or a format.
- The example lines on the page come from the persona files. The page shows "People in the team say: this helps me, here is where I used it." (`site/variants/success-line-first/success-line-first.js:12`). The soft sponsor file says "this helps me, here's where I used it" (`product/personas/sponsor-soft.md:30`). A persona that picks such a line recognises its own file. That shows nothing about a sponsor from outside.
- The scenario fits both sponsors. The soft sponsor is an "influencer without budget authority" (`product/personas/sponsor-soft.md:5`). The hard sponsor "got a first step approved" (`product/personas/sponsor-hard.md:16`). Each persona keeps its own file in the persona runs.
- Five of the six signs have no line in a persona file. The persona runs can show stalls only, not these signs.
