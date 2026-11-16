# Decision 003: call-slot, learning card

> Decision record and learning card. Each round below starts with its own label line.
> Written by the `learning-card` skill on 2026-11-16. The material behind the prototype is synthetic; the feedback free text is an anonymised composite. This file repeats that label.
> Rests on: [discovery/test-cards/call-slot-prototype.md](../test-cards/call-slot-prototype.md), [discovery/user-tests/call-slot-page.md](../user-tests/call-slot-page.md), [discovery/user-tests/call-slot-page-run2.md](../user-tests/call-slot-page-run2.md)
> Number 003: 002 is kept for format-quiz and 004 for short-form.

A learning card records what a test showed: we believed, we observed, we learned, therefore we will.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/call-slot-prototype.md:12](../test-cards/call-slot-prototype.md#L12)).
A call slot is a time for the scoping call, which the buyer picks on the page instead of writing first.
The product lead was not present tonight. The agent filled only what the files hold. Every field that needs the product lead's own words stays open.

## Round 1, 2026-11-16

> Pressure-tested, not validated: rests on persona runs, not on people.
> Rests on: [discovery/user-tests/call-slot-page-run2.md](../user-tests/call-slot-page-run2.md), the latest run of this round. Run 1 is [discovery/user-tests/call-slot-page.md](../user-tests/call-slot-page.md).

No test with people has happened yet. The card proposes five buyers without budget ([discovery/test-cards/call-slot-prototype.md:39](../test-cards/call-slot-prototype.md#L39)).

### How it went (first try)
Skipped. The product lead skipped the try-first step tonight (2026-11-16).

### We believed
"Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one." ([discovery/test-cards/call-slot-prototype.md:24](../test-cards/call-slot-prototype.md#L24))

### We observed
Persona observations only. Each rests on a line of the persona file.
- Run 1: the buyer without budget stalled at the day list. Every day on offer ended by 14 December ([discovery/user-tests/call-slot-page.md:26](../user-tests/call-slot-page.md#L26)), resting on [product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53). Her file says the rest of her year is full. The page was changed after run 1: the day list now reaches 25 January.
- Run 2: the stall is gone. She can pick a day in January, and the booking asks nothing about the format she does not know ([discovery/user-tests/call-slot-page-run2.md:26](../user-tests/call-slot-page-run2.md#L26)), resting on [product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42).
- Run 2: the call card says the call settles which format fits. That fits a buyer who can describe what hurts but cannot name a format ([discovery/user-tests/call-slot-page-run2.md:25](../user-tests/call-slot-page-run2.md#L25)), resting on [product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85).
- Run 2: the buyer without budget would still take the topic to two colleagues first ([discovery/user-tests/call-slot-page-run2.md:29](../user-tests/call-slot-page-run2.md#L29)), resting on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41).
- Run 2: the buyer with budget writes his questions into the form and does not open the booking ([discovery/user-tests/call-slot-page-run2.md:32](../user-tests/call-slot-page-run2.md#L32)), resting on [product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96). The card recruits no tester of that type.

| Sign (from the card) | Points to | Seen? |
|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | go on | unclear for the buyer without budget; not shown for the buyer with budget ([discovery/user-tests/call-slot-page-run2.md:42](../user-tests/call-slot-page-run2.md#L42)) |
| Picks a time and confirms the call slot | go on | unclear for the buyer without budget; not shown for the buyer with budget ([discovery/user-tests/call-slot-page-run2.md:43](../user-tests/call-slot-page-run2.md#L43)) |
| Says what they want to settle in the call | go on | unclear ([discovery/user-tests/call-slot-page-run2.md:44](../user-tests/call-slot-page-run2.md#L44)) |
| Looks for a way to talk, and does not find it | rework | unclear ([discovery/user-tests/call-slot-page-run2.md:45](../user-tests/call-slot-page-run2.md#L45)) |
| Opens the slot booking and stops | rework | unclear ([discovery/user-tests/call-slot-page-run2.md:46](../user-tests/call-slot-page-run2.md#L46)) |
| Sees the ways to talk and sends the form instead | drop | unclear for the buyer without budget; shown for the buyer with budget ([discovery/user-tests/call-slot-page-run2.md:47](../user-tests/call-slot-page-run2.md#L47)) |
| Leaves the page without booking, calling or sending | drop | unclear ([discovery/user-tests/call-slot-page-run2.md:48](../user-tests/call-slot-page-run2.md#L48)) |
| Says they would talk to colleagues first | drop | shown for the buyer without budget; unclear for the buyer with budget ([discovery/user-tests/call-slot-page-run2.md:49](../user-tests/call-slot-page-run2.md#L49)) |

For the buyer without budget, the only type the card recruits, no sign on the step from the page to a booked call could be judged. So this round cannot show whether the assumption holds. A test with people is the usual next step.
One drop sign was shown for her: she would talk to colleagues first. The walkthrough lists it as a new assumption about how she decides, not about the page.

Against the lines: ____ (human decides). The product lead has not held the observations against the go-on line ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)) or the rework-or-drop line ([discovery/test-cards/call-slot-prototype.md:85](../test-cards/call-slot-prototype.md#L85)) yet.

### We learned
From that we learned that ____ (human decides; the product lead's sentence).

### Therefore we will
____ (human decides)

### Options considered
- Move on: what changes before roll-out is open. The booking is faked today. A real booking needs a calendar link, a real number and the event `scoping_call_booked` ([discovery/specs/call-slot.md](../specs/call-slot.md), "Left out to learn faster"). Every invented line needs a confirmer first ([discovery/specs/call-slot.md](../specs/call-slot.md), "Invented lines on the page").
- Another round: a changed spec, or the next idea from the intent. The other ideas are I1 ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", built as format-quiz), I6 ("Cut the form to name and email. Everything else is asked in the scoping call (inquiry page)", built as short-form) and I8 ("The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page)") ([discovery/intents/format-fit.md:57](../intents/format-fit.md#L57), [discovery/intents/format-fit.md:59](../intents/format-fit.md#L59), [discovery/intents/format-fit.md:60](../intents/format-fit.md#L60)).
- Kill: drop the ways to talk and keep today's inquiry page.

### What we decided
____ (human decides)

### Why
____ (human decides)

### Who
____ (human decides)

### When
____ (human decides)
