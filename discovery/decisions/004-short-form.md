# Decision 004: short-form, learning card

> Decision record and learning card. Each round below starts with its own label line.
> Written by the `learning-card` skill on 2026-11-16. The material behind the prototype is synthetic; the feedback free text is an anonymised composite. This file repeats that label.
> Rests on: [discovery/test-cards/short-form-prototype.md](../test-cards/short-form-prototype.md), [discovery/user-tests/short-form-page.md](../user-tests/short-form-page.md), [discovery/user-tests/short-form-page-run2.md](../user-tests/short-form-page-run2.md)
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

Against the lines: ____ (human decides). The product lead has not held the observations against the go-on line ([discovery/test-cards/short-form-prototype.md:71](../test-cards/short-form-prototype.md#L71)) or the rework-or-drop line ([discovery/test-cards/short-form-prototype.md:76](../test-cards/short-form-prototype.md#L76)) yet.

### We learned
From that we learned that ____ (human decides; the product lead's sentence).

### Therefore we will
____ (human decides)

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
