# Decision 002: format-quiz, learning card

> Decision record and learning card. Each round below starts with its own label line.
> Written by the `learning-card` skill from what the pair said. The material behind the prototype is synthetic or an anonymised composite: interviews are anonymised composites; mails, inbox and data are synthetic.
> Rests on: `discovery/test-cards/format-quiz-prototype.md`, `discovery/user-tests/format-quiz-cross.md`, `discovery/user-tests/format-quiz-spec.md`

## Round 1, 2026-08-18

> **Synthetic cross test: no test with a person took place.** The watcher's notes were written for the reference run, to show what a failed test looks like (`discovery/user-tests/format-quiz-cross.md:4`). In your own run, this line reads "Tested with one person from another pair: a pattern, not a rate."
> Rests on: `discovery/test-cards/format-quiz-prototype.md`, `discovery/user-tests/format-quiz-cross.md`, `discovery/user-tests/format-quiz-spec.md`

### How it went (first try)
Not well. The tester started the quiz gladly and gave up on it halfway.

### We believed
"A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person." (`discovery/test-cards/format-quiz-prototype.md:25`)

### We observed
- The tester chose the quiz on their own: "Sure, let's see what it says." (`discovery/user-tests/format-quiz-cross.md:8`)
- The tester could not say who is in the team: "It depends which team I mean. I haven't picked one yet." (`discovery/user-tests/format-quiz-cross.md:9`)
- The tester asked the watcher: "Can I pick more than one here?" (`discovery/user-tests/format-quiz-cross.md:10`)
- The tester ticked "I don't know yet" twice, and said: "These are exactly the questions I can't answer. That's why I'm here." (`discovery/user-tests/format-quiz-cross.md:13`)
- The tester asked for a person: "I'd rather talk to someone about this." (`discovery/user-tests/format-quiz-cross.md:14`)
- The tester did not send the inquiry (`discovery/user-tests/format-quiz-cross.md:16`).
- Persona run on the spec: the soft sponsor stalls at question 1, the same place: "She hesitates." (`discovery/user-tests/format-quiz-spec.md:28`), resting on "Sketched three slices (by role, by team, by project) and picked none, on purpose" (`product/personas/sponsor-soft.md:44`).

| Sign (from the card) | Points to | Seen? |
|---|---|---|
| The tester clicks the quiz link before writing in the form | go on | seen |
| The tester answers every quiz question without asking the watcher what it means | go on | not seen |
| The tester finishes the quiz and sends the inquiry | go on | not seen |
| The tester stops at a question, says "I don't know", or leaves it empty | rework or drop | seen |
| The tester passes the link and writes straight into the form | rework or drop | not seen |
| The tester asks for a call or a person instead of the quiz | rework or drop | seen |
| The tester says the quiz takes too long, or asks how many questions are left | rework or drop | not seen |

Against the lines: broke. The first half held: the tester chose the quiz. The second half broke: the tester could not answer its questions without a person, asked the watcher, and left the quiz before the end. That is the rework-or-drop line: "Or the tester stops at a question, asks the watcher, or leaves the quiz before the end." (`discovery/test-cards/format-quiz-prototype.md:55`)

### We learned
From that we learned that the quiz asks the sponsor the same questions the sponsor came to us with. An unsure sponsor wants to try the quiz, but cannot answer questions about a team they have not picked yet. A sponsor who does not know the answers wants something to react to, or a person to talk to.

### Therefore we will
Drop the quiz. Test the next idea from the intent, I12: the inquiry page opens with "What should be different for your team in three months?", with example answers to pick or change and a "don't know yet" box. The sponsor reacts to examples instead of answering questions, and the format is settled in the scoping call.

### Options considered
- Move on: not chosen. The go-on line asked that the tester "answers every question without help, and sends the inquiry" (`discovery/test-cards/format-quiz-prototype.md:52`). Neither happened.
- Another round, changed spec: not chosen. Allowing several answers would fix the question "Can I pick more than one here?", but not "These are exactly the questions I can't answer."
- Another round, next idea: chosen. I12 "the inquiry page opens with the question" about what should be different for the team (`discovery/intents/format-question.md:41`). The other ideas: I4, a "Book a call" button in place of the form (`discovery/intents/format-question.md:38`), which answers "I'd rather talk to someone about this." but drops the written inquiry; I6, the message label asks "What do you see in your team today?" (`discovery/intents/format-question.md:39`).
- Kill: chosen for the quiz itself.

### What we decided
Kill format-quiz. Next idea: I12, as variant `success-line-first`.

### Why
The tester wanted the quiz but could not answer it alone. Examples to react to ask less of a sponsor who does not know yet.

### Who
Reference decision (replace with your own)

### When
2026-08-18

## Round 2, 2026-08-18

> **Synthetic cross test: no test with a person took place.** The watcher's notes were written for the reference run, to show what a passed test looks like (`discovery/user-tests/format-quiz-cross-2.md:4`). In your own run, this line reads "Tested with one person from another pair: a pattern, not a rate."
> Rests on: `discovery/test-cards/format-quiz-prototype.md` (section "Round 2"), `discovery/user-tests/format-quiz-cross-2.md`

We came back to the quiz after success-line-first failed (`discovery/decisions/003-success-line-first.md`). The spec changed: four questions, the question about what should be different after the training is gone, and a line above the first question says open answers are worked out in the scoping call.

### How it went (first try)
Smooth. The tester went through the quiz in one go and sent the inquiry.

### We believed
"A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person." (`discovery/test-cards/format-quiz-prototype.md:25`)

### We observed
- The tester chose the quiz on their own (`discovery/user-tests/format-quiz-cross-2.md:7`).
- The line above the first question took the pressure off: "Good. Because I don't know half of this." (`discovery/user-tests/format-quiz-cross-2.md:8`)
- The tester answered what they knew, several answers where two fit (`discovery/user-tests/format-quiz-cross-2.md:9`, `discovery/user-tests/format-quiz-cross-2.md:11`).
- The tester ticked "I don't know yet" without stopping: "No idea what they did before I joined." (`discovery/user-tests/format-quiz-cross-2.md:12`)
- The filled message helped: "Oh, it wrote that for me." (`discovery/user-tests/format-quiz-cross-2.md:13`)
- The tester still added the format question: "Mainly I want to know which format fits." (`discovery/user-tests/format-quiz-cross-2.md:14`)
- The tester sent the inquiry (`discovery/user-tests/format-quiz-cross-2.md:15`).

| Sign (from the card, round 2) | Points to | Seen? |
|---|---|---|
| The tester clicks the quiz link before writing in the form | go on | seen |
| The tester goes through all four questions without asking the watcher, ticking "I don't know yet" where they do not know | go on | seen |
| The tester finishes the quiz and sends the inquiry | go on | seen |
| The tester stops the quiz before the end | rework or drop | not seen |
| The tester asks the watcher what a question means | rework or drop | not seen |
| The tester passes the link and writes straight into the form | rework or drop | not seen |
| The tester asks for a person instead of the quiz | rework or drop | not seen |

Against the lines: held. The go-on line asked that the tester "goes through all four questions without asking the watcher, and sends the inquiry" (`discovery/test-cards/format-quiz-prototype.md:81`). All three go-on signs were seen, no rework sign.

### We learned
From that we learned that an unsure sponsor answers questions about the team today, when the page says that not knowing is fine. The sponsor still wants the format question answered by a person, in the scoping call.

### Therefore we will
Move on with format-quiz. Before roll-out:
- Academy staff who run scoping calls confirm the invented line "Tick what you know. What you don't know yet, we work out with you in the scoping call." The spec lists it as invented, to be confirmed by "academy staff who run scoping calls" (`discovery/specs/format-quiz.md:131`).
- The baseline formats page logs a `page_view` too, so formats page visits count the same way with and without the quiz. The spec names this gap: "The baseline formats page logs no `page_view`" (`discovery/specs/format-quiz.md:123`).

### Options considered
- Move on: chosen, with the two changes above.
- Another round, changed spec: not chosen. No rework sign was seen.
- Another round, next idea: not chosen. I4 "a "Book a call" button in place of the form" (`discovery/intents/format-question.md:38`) stays open for later, because the tester still asked about the format.
- Kill: not chosen.

### What we decided
Move on with format-quiz, round 2 page, after the two changes before roll-out.

### Why
One tester went through all four questions without help and sent the inquiry. The line about open answers turned "I don't know" from a stop into an answer.

### Who
Reference decision (replace with your own)

### When
2026-08-18
