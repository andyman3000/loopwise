# Decision 003: call-slot, learning card

> Decision record and learning card. Each round below starts with its own label line. Rounds 1 and 2 rest on persona runs and the Qlaris result. Round 3 is the test with people.
> Written by the `loopwise-learning-card` skill on 2026-11-16. The material behind the prototype is synthetic; the feedback free text is an anonymised composite. This file repeats that label.
> Rests on: [discovery/test-cards/call-slot-prototype.md](../test-cards/call-slot-prototype.md), [discovery/user-tests/call-slot-page.md](../user-tests/call-slot-page.md), [discovery/user-tests/call-slot-page-run2.md](../user-tests/call-slot-page-run2.md), [discovery/user-tests/call-slot-qlaris.md](../user-tests/call-slot-qlaris.md), the five notes of round 3 from [discovery/user-tests/call-slot-3-tester-1.md](../user-tests/call-slot-3-tester-1.md) to [discovery/user-tests/call-slot-3-tester-5.md](../user-tests/call-slot-3-tester-5.md)
> Number 003: 002 is kept for format-quiz and 004 for short-form.

A learning card records what a test showed: we believed, we observed, we learned, therefore we will.
A sign is something the watcher can see or hear during the test ([discovery/test-cards/call-slot-prototype.md:12](../test-cards/call-slot-prototype.md#L12)).
A call slot is a time for the scoping call, which the buyer picks on the page instead of writing first.
The product lead was not present tonight. The agent filled only what the files hold. Every field that needs the product lead's own words stays open.

## Round 1, 2026-11-16

> Pressure-tested, not validated: rests on persona runs, not on people.
> Rests on: [discovery/user-tests/call-slot-page-run2.md](../user-tests/call-slot-page-run2.md), the latest run of this round. Run 1 is [discovery/user-tests/call-slot-page.md](../user-tests/call-slot-page.md).

No test with people has happened yet. The card plans five buyers, with or without budget, in one group ([discovery/test-cards/call-slot-prototype.md:39](../test-cards/call-slot-prototype.md#L39)).

### How it went (first try)
Skipped. The product lead skipped the try-first step tonight (2026-11-16).

### We believed
"Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one." ([discovery/test-cards/call-slot-prototype.md:24](../test-cards/call-slot-prototype.md#L24))

### We observed
Persona observations only. Each rests on a line of the persona file.
- Run 1: the buyer without budget stalled at the day list. Every day on offer ended by 14 December ([discovery/user-tests/call-slot-page.md:26](../user-tests/call-slot-page.md#L26)), resting on [product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53). Her file says the rest of her year is full. The agent extended the day list to 25 January after run 1. The product lead reverted it to four weeks and accepts the stall as a known risk (2026-11-16). The page now shows a calendar for the same four weeks.
- Run 2, on the ten-week list since reverted: the stall is gone. She can pick a day in January, and the booking asks nothing about the format she does not know ([discovery/user-tests/call-slot-page-run2.md:26](../user-tests/call-slot-page-run2.md#L26)), resting on [product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42).
- Run 2: the call card says the call settles which format fits. That fits a buyer who can describe what hurts but cannot name a format ([discovery/user-tests/call-slot-page-run2.md:25](../user-tests/call-slot-page-run2.md#L25)), resting on [product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85).
- Run 2: the buyer without budget would still take the topic to two colleagues first ([discovery/user-tests/call-slot-page-run2.md:29](../user-tests/call-slot-page-run2.md#L29)), resting on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41).
- Run 2: the buyer with budget writes his questions into the form and does not open the booking ([discovery/user-tests/call-slot-page-run2.md:32](../user-tests/call-slot-page-run2.md#L32)), resting on [product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96). The card now plans one mixed group, so testers with budget may take part.

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

For the buyer without budget, no sign on the step from the page to a booked call could be judged. So this round cannot show whether the assumption holds. A test with people is the usual next step.
One drop sign was shown for her: she would talk to colleagues first. The walkthrough lists it as a new assumption about how she decides, not about the page.

Against the lines: neither line can be judged yet. The go-on line counts testers who book a call ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)). The rework-or-drop line counts testers too ([discovery/test-cards/call-slot-prototype.md:86](../test-cards/call-slot-prototype.md#L86)). This round had two personas and no testers. Written by the agent. The product lead keeps the agent's reading (2026-11-16).

### We learned
From that we learned that persona runs cannot show whether buyers book a call. Only people can show it. Written by the agent. The product lead keeps the agent's reading (2026-11-16).

### Therefore we will
The product lead's words, 2026-11-16: "I generally like testing contrasting ideas with users, get their reactions and then maybe merge them into a final thing we would be on to go live with".
For call-slot this means: test it with five buyers next to format-quiz and short-form.

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

## Round 2, 2026-11-16: adds the Qlaris result

> Pressure-tested, not validated: rests on persona runs, not on people. The persona runs here are five Qlaris AI twins.
> Rests on: [discovery/user-tests/call-slot-qlaris.md](../user-tests/call-slot-qlaris.md)

An AI twin is a software participant that Qlaris sends to the page. It reports what it did and felt.
The agent wrote every line of this round from the files, unless a line names the product lead. The decision text is the product lead's.
No test with people has happened yet. Planned: 5 testers ([discovery/test-cards/call-slot-prototype.md:39](../test-cards/call-slot-prototype.md#L39)). Tested with people: 0. The five AI twins are not testers. Written by the agent.

### How it went (first try)
Not asked. The product lead stated only the decision below (2026-11-16). Written by the agent.

### We believed
"Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one." ([discovery/test-cards/call-slot-prototype.md:24](../test-cards/call-slot-prototype.md#L24))

### We observed
Written by the agent from the Qlaris run, five AI twins, counted against the card's lines.
- Qlaris stops a twin before an action that sends data. So no twin pressed "Book this call" ([discovery/user-tests/call-slot-qlaris.md:59](../user-tests/call-slot-qlaris.md#L59)). The decisive step of the go-on line was therefore not observed: "The page that says the call is booked therefore cannot be seen in this test." ([discovery/user-tests/call-slot-qlaris.md:60](../user-tests/call-slot-qlaris.md#L60))
- All five opened the slot booking and picked a day and a time ([discovery/user-tests/call-slot-qlaris.md:117](../user-tests/call-slot-qlaris.md#L117)). All five reached the confirm button with day, time, name and email filled in ([discovery/user-tests/call-slot-qlaris.md:118](../user-tests/call-slot-qlaris.md#L118)).
- The whole go-on line: "0 of 5. Without the last click on" the confirm button, 5 of 5 ([discovery/user-tests/call-slot-qlaris.md:122](../user-tests/call-slot-qlaris.md#L122)). No twin clicked the number, and no twin sent the form ([discovery/user-tests/call-slot-qlaris.md:120](../user-tests/call-slot-qlaris.md#L120), [discovery/user-tests/call-slot-qlaris.md:121](../user-tests/call-slot-qlaris.md#L121)).
- The five took identical last steps: "All five took the same last steps on the inquiry page." ([discovery/user-tests/call-slot-qlaris.md:73](../user-tests/call-slot-qlaris.md#L73)) All five picked the first day the calendar offers ([discovery/user-tests/call-slot-qlaris.md:75](../user-tests/call-slot-qlaris.md#L75)).
- Within this test, "No twin was drawn twice." ([discovery/user-tests/call-slot-qlaris.md:70](../user-tests/call-slot-qlaris.md#L70)) Two of its twins ran again in the short-form test: DE_26606 ([discovery/user-tests/call-slot-qlaris.md:94](../user-tests/call-slot-qlaris.md#L94), [discovery/user-tests/short-form-qlaris.md:96](../user-tests/short-form-qlaris.md#L96)) and DE_26697 ([discovery/user-tests/call-slot-qlaris.md:108](../user-tests/call-slot-qlaris.md#L108), [discovery/user-tests/short-form-qlaris.md:102](../user-tests/short-form-qlaris.md#L102)).
- Every twin holds a budget: "So every twin here is a buyer with budget" ([discovery/user-tests/call-slot-qlaris.md:37](../user-tests/call-slot-qlaris.md#L37)). The card accepts testers with or without budget ([discovery/test-cards/call-slot-prototype.md:38](../test-cards/call-slot-prototype.md#L38)). "The test shows nothing about buyers without budget." ([discovery/user-tests/call-slot-qlaris.md:145](../user-tests/call-slot-qlaris.md#L145))
- Both twins that started on the inquiry page went to the formats first: "2 of 2 in run B" ([discovery/user-tests/call-slot-qlaris.md:136](../user-tests/call-slot-qlaris.md#L136)). One said: "A call without substance is too early for me." ([discovery/user-tests/call-slot-qlaris.md:105](../user-tests/call-slot-qlaris.md#L105))
- All five asked for something the page does not answer: data protection, and a measurable result for the CFO ([discovery/user-tests/call-slot-qlaris.md:137](../user-tests/call-slot-qlaris.md#L137)).

| Sign (from the card) | Points to | Qlaris twins |
|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | go on | 5 of 5, all through the slot booking ([discovery/user-tests/call-slot-qlaris.md:133](../user-tests/call-slot-qlaris.md#L133)) |
| Picks a time and confirms the call slot | go on | time picked by 5 of 5; confirm not observed because of the Qlaris stop ([discovery/user-tests/call-slot-qlaris.md:119](../user-tests/call-slot-qlaris.md#L119)) |
| Says what they want to settle in the call | go on | 5 of 5, from notes during the steps ([discovery/user-tests/call-slot-qlaris.md:134](../user-tests/call-slot-qlaris.md#L134)) |
| Looks for a way to talk, and does not find it | rework | 0 of 5 ([discovery/user-tests/call-slot-qlaris.md:125](../user-tests/call-slot-qlaris.md#L125)) |
| Opens the slot booking and stops | rework | 0 of 5 ([discovery/user-tests/call-slot-qlaris.md:126](../user-tests/call-slot-qlaris.md#L126)) |
| Sees the ways to talk and sends the form instead | drop | 0 of 5 ([discovery/user-tests/call-slot-qlaris.md:129](../user-tests/call-slot-qlaris.md#L129)) |
| Leaves the page without booking, calling or sending | drop | 5 of 5 booked no slot, all because of the Qlaris stop ([discovery/user-tests/call-slot-qlaris.md:130](../user-tests/call-slot-qlaris.md#L130)) |
| Says they would talk to colleagues first | drop | 0 of 5 ([discovery/user-tests/call-slot-qlaris.md:135](../user-tests/call-slot-qlaris.md#L135)) |

Against the lines: neither line can be judged. The go-on line ends on the page that says the call is booked ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)). No twin could reach it, and no person was tested. The drop line counts testers who leave with neither ([discovery/test-cards/call-slot-prototype.md:87](../test-cards/call-slot-prototype.md#L87)). All five twins stopped because of the Qlaris rule, not by choice. Written by the agent.

### We learned
Written by the agent. This run neither shows nor refutes the critical assumption. No twin could confirm a booking, and no person took part.
- Strongest signal for: all five twins chose the slot booking over the form. The persona file expects the buyer with budget to want written answers first ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). "All five chose the call over the form." ([discovery/user-tests/call-slot-qlaris.md:139](../user-tests/call-slot-qlaris.md#L139))
- Strongest signal against: the assumption is about buyers who cannot tell which format fits. Both twins on the inquiry page first left for the formats ([discovery/user-tests/call-slot-qlaris.md:136](../user-tests/call-slot-qlaris.md#L136)). And every twin holds a budget, so buyers without budget were not in this run ([discovery/user-tests/call-slot-qlaris.md:145](../user-tests/call-slot-qlaris.md#L145)).

### Therefore we will
The product lead's next step, 2026-11-16: a real user test.
Written by the agent: the test with real people runs on the live page. The Qlaris runs started there, for example `https://loopwise-v2.vercel.app/inquiry.html?variant=call-slot` ([discovery/user-tests/call-slot-qlaris.md:34](../user-tests/call-slot-qlaris.md#L34)). The card plans five buyers, with or without budget, recruited by 2026-11-24 ([discovery/test-cards/call-slot-prototype.md:40](../test-cards/call-slot-prototype.md#L40)).

### Options considered
Written by the agent.
- Move on: not chosen. No counted test with people shows the assumption holds. The booking is faked today ([discovery/specs/call-slot.md](../specs/call-slot.md), "Left out to learn faster").
- Another round: a test with people, a changed spec, or the next idea from the intent. The other ideas are I1 ("Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)", built as format-quiz), I6 ("Cut the form to name and email. Everything else is asked in the scoping call (inquiry page)", built as short-form) and I8 ("The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page)") ([discovery/intents/format-fit.md:57](../intents/format-fit.md#L57), [discovery/intents/format-fit.md:59](../intents/format-fit.md#L59), [discovery/intents/format-fit.md:60](../intents/format-fit.md#L60)).
- Kill: drop the ways to talk and keep today's inquiry page.

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

## Round 3, 2026-11-20: the test with people

> Validated with people: five testers. Tested with 5 of 5 planned people: a pattern, not a rate.
> Rests on: [discovery/user-tests/call-slot-3-tester-1.md](../user-tests/call-slot-3-tester-1.md), [discovery/user-tests/call-slot-3-tester-2.md](../user-tests/call-slot-3-tester-2.md), [discovery/user-tests/call-slot-3-tester-3.md](../user-tests/call-slot-3-tester-3.md), [discovery/user-tests/call-slot-3-tester-4.md](../user-tests/call-slot-3-tester-4.md), [discovery/user-tests/call-slot-3-tester-5.md](../user-tests/call-slot-3-tester-5.md)
> The five testers and their notes are synthetic, written for the reference state. No real person took part.

The product lead's words in this round are reference answers (replace with your own).
The agent wrote the counts and the table from the five notes.
The test follows the card's plan of five testers, so the notes are one file per tester.
Planned: 5 testers ([discovery/test-cards/call-slot-prototype.md:39](../test-cards/call-slot-prototype.md#L39)). Tested: 5. Not counted: none. Each tester had a real group in mind.
Four testers are buyers without budget. One tester is a buyer with budget. The card asks the watcher to note this ([discovery/test-cards/call-slot-prototype.md:42](../test-cards/call-slot-prototype.md#L42)).
Three testers started on the formats page and two on the inquiry page, as the card plans ([discovery/test-cards/call-slot-prototype.md:31](../test-cards/call-slot-prototype.md#L31)).

### How it went (first try)
Reference answer (replace with your own). The product lead, 2026-11-20: "Better than I expected. Most of them went straight for the call."

### We believed
"Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one." ([discovery/test-cards/call-slot-prototype.md:24](../test-cards/call-slot-prototype.md#L24))

### We observed
- Tester 1 could not tell which format fits: "Two of these could be us. I can't tell which." ([discovery/user-tests/call-slot-3-tester-1.md:10](../user-tests/call-slot-3-tester-1.md#L10)) Tester 1 then booked a slot without touching the form ([discovery/user-tests/call-slot-3-tester-1.md:13](../user-tests/call-slot-3-tester-1.md#L13), [discovery/user-tests/call-slot-3-tester-1.md:15](../user-tests/call-slot-3-tester-1.md#L15)).
- Tester 4 could not tell either: "Workshop or coaching, I couldn't say." ([discovery/user-tests/call-slot-3-tester-4.md:10](../user-tests/call-slot-3-tester-4.md#L10)) Tester 4 clicked into the form first, then booked a slot: "Oh, I can book a call instead. That's easier than writing all this." ([discovery/user-tests/call-slot-3-tester-4.md:13](../user-tests/call-slot-3-tester-4.md#L13))
- Tester 5 started on the inquiry page: "Talk to us first, good. I don't know what to write anyway." ([discovery/user-tests/call-slot-3-tester-5.md:10](../user-tests/call-slot-3-tester-5.md#L10)) Tester 5 booked a slot ([discovery/user-tests/call-slot-3-tester-5.md:14](../user-tests/call-slot-3-tester-5.md#L14)).
- Tester 2 hesitated at the days: "December is packed for me. Most of these days are out." ([discovery/user-tests/call-slot-3-tester-2.md:11](../user-tests/call-slot-3-tester-2.md#L11)) The persona file says the same: "The rest of the year is full, nothing will happen before the holidays." ([product/personas/buyer-without-budget.md:53](../../product/personas/buyer-without-budget.md#L53))
- Tester 2 asked: "Do I have to prepare anything for this?" ([discovery/user-tests/call-slot-3-tester-2.md:12](../user-tests/call-slot-3-tester-2.md#L12)) The page answers that only after the booking: "No preparation needed." ([site/variants/call-slot/inquiry.html:111](../../site/variants/call-slot/inquiry.html#L111))
- Tester 2 closed the booking once and read the form. Then tester 2 came back and booked a slot ([discovery/user-tests/call-slot-3-tester-2.md:13](../user-tests/call-slot-3-tester-2.md#L13), [discovery/user-tests/call-slot-3-tester-2.md:15](../user-tests/call-slot-3-tester-2.md#L15), [discovery/user-tests/call-slot-3-tester-2.md:16](../user-tests/call-slot-3-tester-2.md#L16)).
- Tester 3, the buyer with budget, wrote instead: "Before I spend a call on this, I want answers in writing." ([discovery/user-tests/call-slot-3-tester-3.md:13](../user-tests/call-slot-3-tester-3.md#L13)) Tester 3 sent the form with three questions ([discovery/user-tests/call-slot-3-tester-3.md:15](../user-tests/call-slot-3-tester-3.md#L15), [discovery/user-tests/call-slot-3-tester-3.md:17](../user-tests/call-slot-3-tester-3.md#L17)). The persona file says the buyer with budget "Wants written answers before setting up a call" ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)).
- Three of the four testers who booked named what they want to settle in the call ([discovery/user-tests/call-slot-3-tester-1.md:17](../user-tests/call-slot-3-tester-1.md#L17), [discovery/user-tests/call-slot-3-tester-4.md:17](../user-tests/call-slot-3-tester-4.md#L17), [discovery/user-tests/call-slot-3-tester-5.md:16](../user-tests/call-slot-3-tester-5.md#L16)). Tester 2 named no topic: "Not sure yet. I'd see what they suggest." ([discovery/user-tests/call-slot-3-tester-2.md:18](../user-tests/call-slot-3-tester-2.md#L18))
- Tester 5 named colleagues, but booked first: "I'd mention it to my two co-leads. But a call costs nothing, so I'll book it." ([discovery/user-tests/call-slot-3-tester-5.md:13](../user-tests/call-slot-3-tester-5.md#L13))
- No tester clicked the number ([discovery/user-tests/call-slot-3-tester-1.md:16](../user-tests/call-slot-3-tester-1.md#L16), [discovery/user-tests/call-slot-3-tester-2.md:17](../user-tests/call-slot-3-tester-2.md#L17), [discovery/user-tests/call-slot-3-tester-3.md:18](../user-tests/call-slot-3-tester-3.md#L18), [discovery/user-tests/call-slot-3-tester-4.md:16](../user-tests/call-slot-3-tester-4.md#L16), [discovery/user-tests/call-slot-3-tester-5.md:15](../user-tests/call-slot-3-tester-5.md#L15)).

| Sign (from the card) | Points to | Tester 1 | Tester 2 | Tester 3 | Tester 4 | Tester 5 | Seen by |
|---|---|---|---|---|---|---|---|
| Opens the slot booking or the phone option before clicking into a form field | go on | seen | seen | not seen | not seen | seen | 3 of 5 |
| Picks a time and confirms the call slot | go on | seen | seen | not seen | seen | seen | 4 of 5 |
| Says what they want to settle in the call | go on | seen | unclear | not seen | seen | seen | 3 of 5, unclear for 1 |
| Looks for a way to talk, and does not find it | rework | not seen | not seen | not seen | not seen | not seen | 0 of 5 |
| Opens the slot booking and stops | rework | not seen | unclear | not seen | not seen | not seen | 0 of 5, unclear for 1 |
| Sees the ways to talk and sends the form instead | drop | not seen | not seen | seen | not seen | not seen | 1 of 5 |
| Leaves the page without booking, calling or sending | drop | not seen | not seen | not seen | not seen | not seen | 0 of 5 |
| Says they would talk to colleagues first | drop | not seen | not seen | not seen | not seen | unclear | 0 of 5, unclear for 1 |

Marks from the notes: [discovery/user-tests/call-slot-3-tester-1.md:20-27](../user-tests/call-slot-3-tester-1.md#L20), [discovery/user-tests/call-slot-3-tester-2.md:21-28](../user-tests/call-slot-3-tester-2.md#L21), [discovery/user-tests/call-slot-3-tester-3.md:22-29](../user-tests/call-slot-3-tester-3.md#L22), [discovery/user-tests/call-slot-3-tester-4.md:20-27](../user-tests/call-slot-3-tester-4.md#L20), [discovery/user-tests/call-slot-3-tester-5.md:19-26](../user-tests/call-slot-3-tester-5.md#L19).
Testers 1, 2, 4 and 5 are buyers without budget. Tester 3 holds the budget.

Against the lines, counted by the agent:
- Go-on line: "At least 3 of 5 testers book a call slot on the page" ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)). Counted: 4 of 5 booked a slot and saw the page that says the call is booked. None of the four sent the form. The line held.
- Rework line: "3 or more of 5 testers do not find the ways to talk, or stop inside the slot booking" ([discovery/test-cards/call-slot-prototype.md:86](../test-cards/call-slot-prototype.md#L86)). Counted: 0 of 5 did not find them. 0 of 5 stopped inside the booking. Tester 2 paused once and booked after. The line was not met.
- Drop line: "3 or more of 5 testers see the ways to talk and send the form instead, or leave with neither" ([discovery/test-cards/call-slot-prototype.md:87](../test-cards/call-slot-prototype.md#L87)). Counted: 1 of 5 sent the form instead. 0 of 5 left with neither. The line was not met.

Reference answer (replace with your own). The product lead, 2026-11-20: "Held. Four booked, and the one who wrote holds the budget, as the persona file says."

### We learned
Reference answer (replace with your own). From that we learned that buyers who cannot tell which format fits book a call themselves when the page offers one. A buyer with budget still wants written answers first.

### Therefore we will
Reference answer (replace with your own). The product lead, 2026-11-20:
- Build the page for release, with the launch card and the launch spec.
- Keep the form next to the slot booking, for buyers who want to write first.
- Before launch, someone who runs scoping calls confirms the invented lines, the days in the calendar included ([discovery/specs/call-slot.md:98](../specs/call-slot.md#L98)).

### Options considered
- Move on: build the page for release, with the changes under "Therefore we will". Chosen.
- Another round: a changed spec, for example days beyond four weeks, after tester 2 hesitated. Or the next idea from the intent, I8 ("The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page)", [discovery/intents/format-fit.md:60](../intents/format-fit.md#L60)). Not chosen.
- Kill: remove the ways to talk and keep today's inquiry page. Not chosen.

### What we decided
Reference decision (replace with your own).
Move on. The product lead's words, 2026-11-20: "Four of five booked a call on the page. That is the line we set before the test. We build it for real."

### Why
Reference answer (replace with your own). The go-on line held with 4 of 5. Neither the rework line nor the drop line was met.

### Who
Product lead (Loopwise)

### When
2026-11-20
