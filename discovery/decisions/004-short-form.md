# Decision 004: short-form, learning card

> Decision record and learning card. Each round below starts with its own label line. Round 2 adds the Qlaris result.
> Written by the `loopwise-learning-card` skill on 2026-11-16. The material behind the prototype is synthetic; the feedback free text is an anonymised composite. This file repeats that label.
> Rests on: [discovery/test-cards/short-form-prototype.md](../test-cards/short-form-prototype.md), [discovery/user-tests/short-form-page.md](../user-tests/short-form-page.md), [discovery/user-tests/short-form-page-run2.md](../user-tests/short-form-page-run2.md), [discovery/user-tests/short-form-qlaris.md](../user-tests/short-form-qlaris.md)
> Number 004: 002 is kept for format-quiz and 003 for call-slot.

A learning card records what a test showed: we believed, we observed, we learned, therefore we will.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/short-form-prototype.md:12](../test-cards/short-form-prototype.md#L12)).
The product lead was not present tonight. The agent filled only what the files hold. Every field that needs the product lead's own words stays open.
The product lead chose to leave the open fields until after the test with people, recruited by 2026-11-24 ([discovery/test-cards/short-form-prototype.md:36](../test-cards/short-form-prototype.md#L36)). Product lead (Loopwise), 2026-11-16.

## Round 1, 2026-11-16

> Pressure-tested, not validated: rests on persona runs, not on people.
> Rests on: [discovery/user-tests/short-form-page-run2.md](../user-tests/short-form-page-run2.md), the latest run of this round. Run 1 is [discovery/user-tests/short-form-page.md](../user-tests/short-form-page.md).

No test with people has happened yet. The card plans five buyers without budget ([discovery/test-cards/short-form-prototype.md:35](../test-cards/short-form-prototype.md#L35)).

### How it went (first try)
Skipped. The product lead skipped the try-first step tonight (2026-11-16).

### We believed
"Buyers stop at the form because of what it asks them to write. With only name and email to give, they send it without knowing the format." ([discovery/test-cards/short-form-prototype.md:22](../test-cards/short-form-prototype.md#L22))

### We observed
Persona observations only. Each rests on a line of the persona file.
- Run 1: on the formats page, the buyer without budget got no hint of what the form asks. She keeps the formats page open, or closes it and comes back later ([discovery/user-tests/short-form-page.md:29](../user-tests/short-form-page.md#L29)), resting on [product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93). The page was changed after run 1.
- Run 2: with the hint on the formats page, the form asks her for no guess ([discovery/user-tests/short-form-page-run2.md:28](../user-tests/short-form-page-run2.md#L28)), resting on [product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94).
- Run 2: the lead line names the scoping call as the place for what gets in the way ([discovery/user-tests/short-form-page-run2.md:32](../user-tests/short-form-page-run2.md#L32)), resting on [product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85).
- Run 2: the buyer with budget finds no place for his written questions ([discovery/user-tests/short-form-page-run2.md:45](../user-tests/short-form-page-run2.md#L45)), resting on [product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96). The card recruits no tester of that type.

| Sign (from the card) | Points to | Seen? |
|---|---|---|
| Clicks into name or email without going back to the formats | go on | unclear: cannot tell for both personas ([discovery/user-tests/short-form-page-run2.md:55](../user-tests/short-form-page-run2.md#L55)) |
| Sends with name and email, does not ask where to describe the group | go on | unclear for the buyer without budget; not shown for the buyer with budget ([discovery/user-tests/short-form-page-run2.md:56](../user-tests/short-form-page-run2.md#L56)) |
| Says afterwards what happens next | go on | unclear ([discovery/user-tests/short-form-page-run2.md:57](../user-tests/short-form-page-run2.md#L57)) |
| Looks for a place to describe the group | rework | unclear for the buyer without budget; shown for the buyer with budget ([discovery/user-tests/short-form-page-run2.md:58](../user-tests/short-form-page-run2.md#L58)) |
| Stops at "Send", asks what it commits them to | rework | unclear ([discovery/user-tests/short-form-page-run2.md:59](../user-tests/short-form-page-run2.md#L59)) |
| Leaves without sending, or goes back to the formats | drop | unclear ([discovery/user-tests/short-form-page-run2.md:60](../user-tests/short-form-page-run2.md#L60)) |
| Says "I need to know the format first" | drop | unclear ([discovery/user-tests/short-form-page-run2.md:61](../user-tests/short-form-page-run2.md#L61)) |

For the buyer without budget, the only type the card recruits, no sign could be judged in this round. So this round cannot show whether the assumption holds. A test with people is the usual next step.

Against the lines: neither line can be judged yet. The go-on line counts testers who send the short form ([discovery/test-cards/short-form-prototype.md:71](../test-cards/short-form-prototype.md#L71)). The rework-or-drop line counts testers too ([discovery/test-cards/short-form-prototype.md:76](../test-cards/short-form-prototype.md#L76)). This round had two personas and no testers. Written by the agent. The product lead keeps the agent's reading (2026-11-16).

### We learned
From that we learned that persona runs cannot show whether buyers send a form without a format. Only people can show it. Written by the agent. The product lead keeps the agent's reading (2026-11-16).

### Therefore we will
The product lead's words, 2026-11-16: "I generally like testing contrasting ideas with users, get their reactions and then maybe merge them into a final thing we would be on to go live with".
For short-form this means: test it with five buyers next to format-quiz and call-slot.

### Options considered
- Move on: what changes before roll-out is open. The send is faked today; a real send needs a change to the server rule on company and message ([discovery/specs/short-form.md](../specs/short-form.md), "Left out to learn faster").
- Another round: a changed spec, or the next idea from the intent. The other ideas are I1 ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", built as format-quiz), I2 ("Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page)", built as call-slot) and I8 ("The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page)") ([discovery/intents/format-fit.md:57](../intents/format-fit.md#L57), [discovery/intents/format-fit.md:58](../intents/format-fit.md#L58), [discovery/intents/format-fit.md:60](../intents/format-fit.md#L60)).
- Kill: drop the short form and keep today's inquiry page.

### What we decided
____ (human decides)

### Why
____ (human decides)

### Who
____ (human decides)

### When
____ (human decides)

## Round 2, 2026-11-16: adds the Qlaris result

> Pressure-tested, not validated: rests on persona runs, not on people. The persona runs here are five Qlaris AI twins.
> Rests on: [discovery/user-tests/short-form-qlaris.md](../user-tests/short-form-qlaris.md)

An AI twin is a software participant that Qlaris sends to the page. It reports what it did and felt.
The agent wrote every line of this round from the files, unless a line names the product lead. The decision text is the product lead's.
No test with people has happened yet. Planned: 5 testers ([discovery/test-cards/short-form-prototype.md:35](../test-cards/short-form-prototype.md#L35)). Tested with people: 0. The five AI twins are not testers. Written by the agent.

### How it went (first try)
Not asked. The product lead stated only the decision below (2026-11-16). Written by the agent.

### We believed
"Buyers stop at the form because of what it asks them to write. With only name and email to give, they send it without knowing the format." ([discovery/test-cards/short-form-prototype.md:22](../test-cards/short-form-prototype.md#L22))

### We observed
Written by the agent from the Qlaris run, five AI twins, counted against the card's lines.
- Qlaris stops a twin before an action that sends data. So no twin pressed "Send inquiry" ([discovery/user-tests/short-form-qlaris.md:59](../user-tests/short-form-qlaris.md#L59)). The decisive step of the go-on line was therefore not observed ([discovery/user-tests/short-form-qlaris.md:111](../user-tests/short-form-qlaris.md#L111)).
- All five reached the inquiry page ([discovery/user-tests/short-form-qlaris.md:110](../user-tests/short-form-qlaris.md#L110)). "Up to the send button, 5 of 5 said they would send in real life." ([discovery/user-tests/short-form-qlaris.md:112](../user-tests/short-form-qlaris.md#L112))
- 4 of 5 miss a place to describe their group. No twin searched the page for one: "4 of 5 said they miss a place to describe their group" ([discovery/user-tests/short-form-qlaris.md:114](../user-tests/short-form-qlaris.md#L114)). All four said the scoping call is the place for it.
- Both twins that started on the inquiry page went to the formats first, at the start: "Both twins in run B went to the formats at step 0." ([discovery/user-tests/short-form-qlaris.md:113](../user-tests/short-form-qlaris.md#L113))
- The whole go-on line: 0 of 5 because of the Qlaris stop. Without the sending part, 3 of 5 or 0 of 5, depending on how the remark about the missing place is read ([discovery/user-tests/short-form-qlaris.md:115](../user-tests/short-form-qlaris.md#L115)).
- The five took the same path: "Every twin opened the page" for buyer preparation before the form ([discovery/user-tests/short-form-qlaris.md:73](../user-tests/short-form-qlaris.md#L73)). All five came to the inquiry page through its link ([discovery/user-tests/short-form-qlaris.md:75](../user-tests/short-form-qlaris.md#L75)).
- Within this test, no twin was drawn twice. One twin also ran in the format-quiz test: "One twin (DE_24974) also ran in the format-quiz test" ([discovery/user-tests/short-form-qlaris.md:70](../user-tests/short-form-qlaris.md#L70)). Two more also ran in the call-slot test: DE_26606 and DE_26697 ([discovery/user-tests/call-slot-qlaris.md:94](../user-tests/call-slot-qlaris.md#L94), [discovery/user-tests/call-slot-qlaris.md:108](../user-tests/call-slot-qlaris.md#L108)).
- The Qlaris persona holds a budget, the card's testers do not: "The Qlaris persona decides on the budget. The card's testers have no budget settled." ([discovery/user-tests/short-form-qlaris.md:134](../user-tests/short-form-qlaris.md#L134))
- All five named what they still have to settle: data protection, a measure of success for the CFO, and before-and-after examples ([discovery/user-tests/short-form-qlaris.md:128](../user-tests/short-form-qlaris.md#L128)).

| Sign (from the card) | Points to | Qlaris twins |
|---|---|---|
| Clicks into name or email without going back to the formats | go on | 0 of 5 ([discovery/user-tests/short-form-qlaris.md:126](../user-tests/short-form-qlaris.md#L126)) |
| Sends with name and email, does not ask where to describe the group | go on | not observed: Qlaris stopped every twin ([discovery/user-tests/short-form-qlaris.md:111](../user-tests/short-form-qlaris.md#L111)); 4 of 5 said they miss a place ([discovery/user-tests/short-form-qlaris.md:114](../user-tests/short-form-qlaris.md#L114)) |
| Says afterwards what happens next | go on | 5 of 5 named the scoping call ([discovery/user-tests/short-form-qlaris.md:127](../user-tests/short-form-qlaris.md#L127)) |
| Looks for a place to describe the group | rework | 4 of 5 said they miss one, 0 of 5 searched ([discovery/user-tests/short-form-qlaris.md:118](../user-tests/short-form-qlaris.md#L118)) |
| Stops at "Send", asks what it commits them to | rework | 0 of 5 asked; 5 of 5 stopped because of the Qlaris stop ([discovery/user-tests/short-form-qlaris.md:119](../user-tests/short-form-qlaris.md#L119)) |
| Leaves without sending, or goes back to the formats | drop | 5 of 5 did not send, all because of the Qlaris stop ([discovery/user-tests/short-form-qlaris.md:122](../user-tests/short-form-qlaris.md#L122)); 2 of 2 in run B went to the formats first ([discovery/user-tests/short-form-qlaris.md:113](../user-tests/short-form-qlaris.md#L113)) |
| Says "I need to know the format first" | drop | 0 of 5 said it ([discovery/user-tests/short-form-qlaris.md:123](../user-tests/short-form-qlaris.md#L123)) |

Against the lines: neither line can be judged. The go-on line needs a sent form ([discovery/test-cards/short-form-prototype.md:71](../test-cards/short-form-prototype.md#L71)). No twin could send, and no person was tested. The rework line counts testers who look for a place to describe their group ([discovery/test-cards/short-form-prototype.md:76](../test-cards/short-form-prototype.md#L76)). Four twins said they miss one, and none searched. Whether that counts as looking is open for the product lead. Written by the agent.

### We learned
Written by the agent. This run neither shows nor refutes the critical assumption. No twin could send, and no person took part.
- Strongest signal for: all five said they would send with name and email ([discovery/user-tests/short-form-qlaris.md:112](../user-tests/short-form-qlaris.md#L112)). None said they must know the format first ([discovery/user-tests/short-form-qlaris.md:123](../user-tests/short-form-qlaris.md#L123)). Two said the line that sending books nothing took away their worry ([discovery/user-tests/short-form-qlaris.md:119](../user-tests/short-form-qlaris.md#L119)).
- Strongest signal against: 4 of 5 miss a place to describe their group ([discovery/user-tests/short-form-qlaris.md:114](../user-tests/short-form-qlaris.md#L114)). That is the card's rework sign, if a remark counts as looking. Both twins on the inquiry page left it for the formats first ([discovery/user-tests/short-form-qlaris.md:113](../user-tests/short-form-qlaris.md#L113)).

### Therefore we will
The product lead's next step, 2026-11-16: a real user test.
Written by the agent: the test with real people runs on the live page. The Qlaris runs started there, for example `https://loopwise-v2.vercel.app/inquiry.html?variant=short-form` ([discovery/user-tests/short-form-qlaris.md:34](../user-tests/short-form-qlaris.md#L34)). The card plans five buyers without budget, recruited before 2026-11-24 ([discovery/test-cards/short-form-prototype.md:36](../test-cards/short-form-prototype.md#L36)).

### Options considered
Written by the agent.
- Move on: not chosen. No counted test with people shows the assumption holds. The send is faked today ([discovery/specs/short-form.md](../specs/short-form.md), "Left out to learn faster").
- Another round: a test with people, a changed spec, or the next idea from the intent. The other ideas are I1 ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", built as format-quiz), I2 ("Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page)", built as call-slot) and I8 ("The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page)") ([discovery/intents/format-fit.md:57](../intents/format-fit.md#L57), [discovery/intents/format-fit.md:58](../intents/format-fit.md#L58), [discovery/intents/format-fit.md:60](../intents/format-fit.md#L60)).
- Kill: drop the short form and keep today's inquiry page.

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
