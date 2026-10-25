# Prototype test card: format-quiz

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the cross test with people tests from outside.
> Assessment drafted by an agent on 2026-10-25, not a decision.
> Card owner: ____ (human decides)
> Intent: `discovery/intents/format-question.md` · Idea: I2 ("next to the form, a link "Unsure what to pick? Find out in a small quiz" opens a short quiz whose questions find out what the sponsor needs.", `discovery/intents/format-question.md:37`)
> Material: interviews are anonymised composites; mails, inbox and data are synthetic (`discovery/intents/format-question.md:5`). This card repeats that label.

A prototype test shows one person a rough page and watches what they do.
A critical assumption is the one thing that must be true for an idea to work.
The person who built the page watches. The tester knows only the situation and the task.

## Your first try
"We believe that sponsors who are unsure about a the format can gain more trust into our programm and that we can help them if they know better, what they need.
To test this, we will design a small wizard that makes them aware of their current situation.
We are sucesful, if testers of our prototype find the link, click it and go throguht the whole process, then send the form"

Where the draft differs:
- The answer names a solution, "a small wizard". It is kept word for word above.
- The answer counts finding the link, clicking it, finishing and sending. The draft adds signs for answering without a person.
- The draft adds signs for the quiz annoying the tester. The pair tests this idea first to find out "if this helps or if it annoys people" (`discovery/intents/format-question.md:61`).
- The belief about trust is not part of this assumption, so this test cannot check it.

## The assumption we test
"A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person." (`discovery/intents/format-question.md:60`)
Level in the intent: "partly supported" (`discovery/intents/format-question.md:37`)

No learning card for an earlier variant of this intent exists in `discovery/decisions/`.

## Test scenario (the tester sees only this)
- **Situation:** You help a product team in your company get better at using AI in their daily work. Think of a real team you know well that could use outside training for this. You are on the website of an academy that runs trainings inside companies.
- **Task:** Get in touch with the academy about a training for that team.
- **Page:** `/formats?variant=format-quiz`. The quiz link sits next to the form and "also sits on the formats page" (`discovery/intents/format-question.md:37`). [assumption: the test starts on the formats page; the spec names the start page and may change it]
- **Sources:** the soft sponsor "supports the move to AI for product and project roles, together with the team leads" (`product/personas/sponsor-soft.md:14`). The hard sponsor is "head of product" (`product/personas/sponsor-hard.md:14`). The academy runs trainings for "one team inside one company" (`product/glossary.md:21`).
- **Does not count if:** the tester has no such team.

## Signs the watcher looks for
| Sign (what the watcher sees or hears) | Points to | Can a persona show it? |
|---|---|---|
| The tester clicks the quiz link before writing in the form | go on | only the cross test with people can test this |
| The tester answers every quiz question without asking the watcher what it means | go on | only the cross test with people can test this |
| The tester finishes the quiz and sends the inquiry | go on | only the cross test with people can test this |
| The tester stops at a question, says "I don't know", or leaves it empty | rework or drop | yes: "Sketched three slices (by role, by team, by project) and picked none, on purpose" (`product/personas/sponsor-soft.md:44`) |
| The tester passes the link and writes straight into the form | rework or drop | only the cross test with people can test this |
| The tester asks for a call or a person instead of the quiz | rework or drop | only the cross test with people can test this. The hard sponsor "Wants to talk to someone who delivered it, or a comparable reference" (`product/personas/sponsor-hard.md:46`). That is a different behaviour. |
| The tester says the quiz takes too long, or asks how many questions are left | rework or drop | only the cross test with people can test this |

## Go-on line
The tester clicks the quiz link on their own, answers every question without help, and sends the inquiry. (proposal) · Set on: ____ (human decides)

## Rework-or-drop line
The tester passes the link. Or the tester stops at a question, asks the watcher, or leaves the quiz before the end. (proposal) · Set on: ____ (human decides)

## What this test cannot show
- One tester per pair: a pattern, not a rate.
- Whether the tester was unsure about the format. The scenario cannot put them in that state. A tester who already knows the format may pass the link for that reason.
- Whether a sponsor who finishes the quiz later books a scoping call or a format.
- Whether the sponsor trusts the academy more after the quiz.
- The scenario fits both sponsors. The soft sponsor is an "influencer without budget authority" (`product/personas/sponsor-soft.md:5`). The hard sponsor "got a first step approved" (`product/personas/sponsor-hard.md:16`). Each persona keeps its own file in the persona runs.
- Six of the seven signs have no line in a persona file. The persona runs can show stalls only, not these signs.
