# Decision 002: format-quiz, learning card

> Decision record and learning card. Each round below starts with its own label line.
> Written by the `learning-card` skill on 2026-11-16. The material behind the prototype is synthetic; the feedback free text is an anonymised composite. This file repeats that label.
> Rests on: [discovery/test-cards/format-quiz-prototype.md](../test-cards/format-quiz-prototype.md), [discovery/user-tests/format-quiz-spec.md](../user-tests/format-quiz-spec.md), [discovery/user-tests/format-quiz-spec-run2.md](../user-tests/format-quiz-spec-run2.md), [discovery/user-tests/format-quiz-qlaris.md](../user-tests/format-quiz-qlaris.md)
> Number 002: 003 is call-slot and 004 is short-form.

A learning card records what a test showed: we believed, we observed, we learned, therefore we will.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/format-quiz-prototype.md:12](../test-cards/format-quiz-prototype.md#L12)).
An AI twin is a software participant that Qlaris sends to the page. It reports what it did and felt.
The agent wrote every line of this file from the files, unless a line names the product lead. The decision text is the product lead's.

## Round 1, 2026-11-16: the persona walkthrough of the spec, and the Qlaris result added

> Pressure-tested, not validated: rests on persona runs, not on people. The persona runs here are a walkthrough of the spec and five Qlaris AI twins.
> Rests on: [discovery/user-tests/format-quiz-spec-run2.md](../user-tests/format-quiz-spec-run2.md), the latest walkthrough run of this round (run 1 is [discovery/user-tests/format-quiz-spec.md](../user-tests/format-quiz-spec.md)), and [discovery/user-tests/format-quiz-qlaris.md](../user-tests/format-quiz-qlaris.md).

No test with people has happened yet. The card plans five buyers without budget ([discovery/test-cards/format-quiz-prototype.md:41](../test-cards/format-quiz-prototype.md#L41)).
Planned: 5 testers. Tested with people: 0. The five AI twins are not testers. Written by the agent.

### How it went (first try)
Not asked. The product lead stated only the decision below (2026-11-16). Written by the agent.

### We believed
"Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form." ([discovery/test-cards/format-quiz-prototype.md:33](../test-cards/format-quiz-prototype.md#L33))

### We observed
Written by the agent from the files. Persona observations first, each resting on a line of the persona file.
- Walkthrough: the buyer without budget sees the named format and four others. That fits "Options to react to" ([discovery/user-tests/format-quiz-spec-run2.md:44](../user-tests/format-quiz-spec-run2.md#L44)), resting on [product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85).
- Walkthrough: she copies the result "and leaves without" taking the step into the form ([discovery/user-tests/format-quiz-spec-run2.md:44](../user-tests/format-quiz-spec-run2.md#L44)). She decides with two colleagues first, resting on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41).
- Walkthrough: the buyer with budget finds no evidence on the result ([discovery/user-tests/format-quiz-spec-run2.md:61](../user-tests/format-quiz-spec-run2.md#L61)), resting on [product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95). The card recruits no tester of his type.

Then the Qlaris run, five AI twins, counted against the card's lines.
- Qlaris stops a twin before an action that sends data. So no twin pressed the send button ([discovery/user-tests/format-quiz-qlaris.md:59](../user-tests/format-quiz-qlaris.md#L59)). The decisive step of the go-on line was therefore not observed.
- All five answered the quiz for their group ([discovery/user-tests/format-quiz-qlaris.md:112](../user-tests/format-quiz-qlaris.md#L112)). All five did this too: "Take the step from the result into the form" ([discovery/user-tests/format-quiz-qlaris.md:113](../user-tests/format-quiz-qlaris.md#L113)).
- Sent the form with the named format still in it: "0 of 5. Qlaris stopped every twin" ([discovery/user-tests/format-quiz-qlaris.md:114](../user-tests/format-quiz-qlaris.md#L114)). Up to the send button, all five kept the format line unchanged ([discovery/user-tests/format-quiz-qlaris.md:115](../user-tests/format-quiz-qlaris.md#L115)).
- The answers were identical: "All five answered the same four quiz questions the same way" ([discovery/user-tests/format-quiz-qlaris.md:73](../user-tests/format-quiz-qlaris.md#L73)). Every result named the same format ([discovery/user-tests/format-quiz-qlaris.md:76](../user-tests/format-quiz-qlaris.md#L76)).
- One twin was drawn twice: "The five runs therefore come from four different twins." ([discovery/user-tests/format-quiz-qlaris.md:69](../user-tests/format-quiz-qlaris.md#L69))
- The Qlaris persona holds a budget, the card's testers do not: "The Qlaris persona decides on the budget. The card's testers have no budget settled." ([discovery/user-tests/format-quiz-qlaris.md:137](../user-tests/format-quiz-qlaris.md#L137))
- Both twins that started on the inquiry page went to the formats first: "2 of 2 in run B" ([discovery/user-tests/format-quiz-qlaris.md:130](../user-tests/format-quiz-qlaris.md#L130)). This is the card's drop sign. Both came back through the quiz.
- All five asked for something the page does not answer: data protection, and a way to measure success for the CFO ([discovery/user-tests/format-quiz-qlaris.md:131](../user-tests/format-quiz-qlaris.md#L131)).

| Sign (from the card) | Points to | Walkthrough, buyer without budget | Qlaris twins |
|---|---|---|---|
| Answers every quiz question for their own group, without asking what a question means | go on | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:69](../user-tests/format-quiz-spec-run2.md#L69)) | 5 of 5 ([discovery/user-tests/format-quiz-qlaris.md:112](../user-tests/format-quiz-qlaris.md#L112)) |
| On the result, uses the step to the form and clicks into a form field | go on | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:70](../user-tests/format-quiz-spec-run2.md#L70)) | step taken by 5 of 5, a field clicked by 1 of 5 ([discovery/user-tests/format-quiz-qlaris.md:127](../user-tests/format-quiz-qlaris.md#L127)) |
| Sends the form and keeps the named format | go on | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:71](../user-tests/format-quiz-spec-run2.md#L71)) | not observed: Qlaris stopped every twin ([discovery/user-tests/format-quiz-qlaris.md:114](../user-tests/format-quiz-qlaris.md#L114)) |
| Says why the format fits their group | go on | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:72](../user-tests/format-quiz-spec-run2.md#L72)) | 5 of 5 ([discovery/user-tests/format-quiz-qlaris.md:128](../user-tests/format-quiz-qlaris.md#L128)) |
| Stops at a question, or asks what it means | rework | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:73](../user-tests/format-quiz-spec-run2.md#L73)) | 0 of 5 ([discovery/user-tests/format-quiz-qlaris.md:119](../user-tests/format-quiz-qlaris.md#L119)) |
| On the result, looks around for what to do next | rework | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:74](../user-tests/format-quiz-spec-run2.md#L74)) | 0 of 5 ([discovery/user-tests/format-quiz-qlaris.md:120](../user-tests/format-quiz-qlaris.md#L120)) |
| Deletes the named format, or puts another there | drop | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:75](../user-tests/format-quiz-spec-run2.md#L75)) | 0 of 5 ([discovery/user-tests/format-quiz-qlaris.md:123](../user-tests/format-quiz-qlaris.md#L123)) |
| Leaves, or goes back to the formats, without starting the form | drop | shown ([discovery/user-tests/format-quiz-spec-run2.md:76](../user-tests/format-quiz-spec-run2.md#L76)) | 2 of 2 in run B at the start, then back through the quiz ([discovery/user-tests/format-quiz-qlaris.md:130](../user-tests/format-quiz-qlaris.md#L130)); 5 of 5 did not send because of the Qlaris stop ([discovery/user-tests/format-quiz-qlaris.md:124](../user-tests/format-quiz-qlaris.md#L124)) |
| Says "I'm guessing" or "not sure this is us" | drop | cannot tell ([discovery/user-tests/format-quiz-spec-run2.md:77](../user-tests/format-quiz-spec-run2.md#L77)) | 0 of 5 ([discovery/user-tests/format-quiz-qlaris.md:129](../user-tests/format-quiz-qlaris.md#L129)) |

Against the lines: neither line can be judged. The go-on line ends with a sent form ([discovery/test-cards/format-quiz-prototype.md:80](../test-cards/format-quiz-prototype.md#L80)). No twin could send, and no person was tested. The drop line counts testers who leave without sending ([discovery/test-cards/format-quiz-prototype.md:86](../test-cards/format-quiz-prototype.md#L86)). All five twins stopped because of the Qlaris rule, not by choice. Written by the agent.

### We learned
Written by the agent. These runs neither show nor refute the critical assumption. No run reached the sent form, and no person took part.
- Strongest signal for: all five twins took the quiz result into the form and kept the named format unchanged ([discovery/user-tests/format-quiz-qlaris.md:115](../user-tests/format-quiz-qlaris.md#L115)). None said it was guessing ([discovery/user-tests/format-quiz-qlaris.md:129](../user-tests/format-quiz-qlaris.md#L129)). The five gave identical answers, so this is close to one answer repeated.
- Strongest signal against: in the walkthrough, the buyer without budget copies the result and leaves to talk to colleagues ([discovery/user-tests/format-quiz-spec-run2.md:95](../user-tests/format-quiz-spec-run2.md#L95)). The twins decide on the budget themselves ([discovery/user-tests/format-quiz-qlaris.md:37](../user-tests/format-quiz-qlaris.md#L37)). So the Qlaris run cannot test the reason she left.

### Therefore we will
The product lead's next step, 2026-11-16: a real user test.
Written by the agent: the test with real people runs on the live page. The Qlaris runs started there, for example `https://loopwise-v2.vercel.app/formats.html?variant=format-quiz` ([discovery/user-tests/format-quiz-qlaris.md:33](../user-tests/format-quiz-qlaris.md#L33)). The card plans five buyers without budget ([discovery/test-cards/format-quiz-prototype.md:41](../test-cards/format-quiz-prototype.md#L41)).

### Options considered
Written by the agent.
- Move on: not chosen. No counted test with people shows the assumption holds.
- Another round: a test with people, a changed spec, or the next idea from the intent. The other ideas are I2 ("Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page)", built as call-slot), I6 ("Cut the form to name and email. Everything else is asked in the scoping call (inquiry page)", built as short-form) and I8 ("The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page)") ([discovery/intents/format-fit.md:58](../intents/format-fit.md#L58), [discovery/intents/format-fit.md:59](../intents/format-fit.md#L59), [discovery/intents/format-fit.md:60](../intents/format-fit.md#L60)).
- Kill: drop the quiz and keep today's formats and inquiry pages.

### What we decided
Another round. The product lead's words, 2026-11-16, in German as said:
„Kein echter Test mehr. Learning Cards für alle 3 mit dem Ergebnis und dem next step: echter User Test.“
In English: no further test now, a learning card for each of the three with its result, and the next step is a real user test.

### Why
The product lead's words above. The product lead gave no further reason. Written by the agent.

### Who
Product lead (Loopwise)

### When
2026-11-16
