# Decision 003: success-line-first, learning card

> Decision record and learning card. Each round below starts with its own label line.
> Written by the `learning-card` skill from what the pair said. The material behind the prototype is synthetic or an anonymised composite: interviews are anonymised composites; mails, inbox and data are synthetic.
> Rests on: `discovery/test-cards/success-line-first-prototype.md`, `discovery/user-tests/success-line-first-cross.md`, `discovery/user-tests/success-line-first-spec.md`

## Round 1, 2026-10-26

> **Synthetic cross test: no test with a person took place.** The watcher's notes were written for the reference run, to show what a failed test looks like (`discovery/user-tests/success-line-first-cross.md:4`). In your own run, this line reads "Tested with one person from another pair: a pattern, not a rate."
> Rests on: `discovery/test-cards/success-line-first-prototype.md`, `discovery/user-tests/success-line-first-cross.md`, `discovery/user-tests/success-line-first-spec.md`

### How it went (first try)
The tester sent the inquiry, but without a success line. The page asked for the one thing the tester wanted from us.

### We believed
"A sponsor who is shown example answers can say what should be different for the team after the training." (`discovery/test-cards/success-line-first-prototype.md:23`)

### We observed
- The question came too early for the tester: "Three months? I don't even know yet if we do this at all." (`discovery/user-tests/success-line-first-cross.md:7`)
- The tester could not use the example about an agreed measure: "We haven't agreed anything up front. That's why I'm asking you." (`discovery/user-tests/success-line-first-cross.md:8`)
- The tester asked the watcher: "Do I have to pick one of these?" (`discovery/user-tests/success-line-first-cross.md:9`)
- The tester picked an example, found it empty, "Sounds right, but anyone would say that.", and ticked "Don't know yet" instead (`discovery/user-tests/success-line-first-cross.md:10`, `discovery/user-tests/success-line-first-cross.md:11`).
- In the message field, the tester asked about the format: "Which of your formats fits a team of eight with very mixed levels?" (`discovery/user-tests/success-line-first-cross.md:12`)
- The tester sent the inquiry (`discovery/user-tests/success-line-first-cross.md:13`).
- Persona run on the spec: the hard sponsor ticks the box too. His file says he "Demands a measure but has none: no cost-benefit analysis, and asks the provider what to look at" (`product/personas/sponsor-hard.md:48`), as noted in the run: "Hard sponsor: asks the provider what to look at" (`discovery/user-tests/success-line-first-spec.md:58`).

| Sign (from the card) | Points to | Seen? |
|---|---|---|
| The tester picks an example and changes words in it to fit their team, or writes their own line | go on | not seen |
| The tester goes on to the contact form and sends the inquiry | go on | seen |
| The tester ticks "Don't know yet", or says they do not know what should be different | rework or drop | seen |
| The tester asks the watcher what the question means or what kind of answer is wanted | rework or drop | seen |
| The tester scrolls past the question to look for the form, or asks which format to choose | rework or drop | seen, in the message field |
| The tester asks for a call or a person instead | rework or drop | not seen |

Against the lines: broke. The tester sent the inquiry, but did not pick, change or write a line. The go-on line asked that "The tester picks an example and changes it, or writes their own line, without asking the watcher." (`discovery/test-cards/success-line-first-prototype.md:50`). The tester ticked "Don't know yet" and asked the watcher, which is the rework-or-drop line (`discovery/test-cards/success-line-first-prototype.md:53`).

### We learned
From that we learned that a sponsor cannot say what should be different before the scoping call, even with examples. The examples sounded right but said nothing about this team. The tester could describe the team as it is today, in the message field, without help.

### Therefore we will
Drop success-line-first. Go back to the quiz for a second round with a changed spec. Its first four questions ask about the team as it is today. Here the tester described the team today without help. In the quiz the tester answered some of these questions and stalled at the rest, because the page gave no sign that an open answer is fine. Its fifth question asks what should be different after the training, the same question that failed here. Take it out, and say on the quiz that what the sponsor does not know yet is worked out in the scoping call.

### Options considered
- Move on: not chosen. Nobody wrote a success line.
- Another round, changed spec: not chosen for this page. Fewer or better examples would still ask the sponsor for the outcome before the call.
- Another round, next idea: chosen. The quiz, I2, comes back with a changed spec ("next to the form, a link", `discovery/intents/format-question.md:37`), as round 2 of decision 002. The other ideas: I4 "a "Book a call" button in place of the form" (`discovery/intents/format-question.md:38`); I6, the message label asks "What do you see in your team today?" (`discovery/intents/format-question.md:39`).
- Kill: chosen for success-line-first itself.

### What we decided
Kill success-line-first. Go back to format-quiz, round 2, without the question about what should be different after the training.

### Why
Two tests failed on the same question: what should be different after the training. The quiz failed there at question 5, this page failed there at its first question. Questions about the team today got answers in both.

### Who
Reference decision (replace with your own)

### When
2026-10-26
