# Test card: call-slot

> **Preview. This card applies only after the test with real people has passed.**
> Decision 003 chose another round, not a launch. Its next step is a test with people: "the next step is a real user test" ([discovery/decisions/003-call-slot.md:131](../decisions/003-call-slot.md#L131)).
> The persona runs could not show the assumption: "This run neither shows nor refutes the critical assumption." ([discovery/decisions/003-call-slot.md:114](../decisions/003-call-slot.md#L114))
> Passed means the go-on line of the prototype card held: "At least 3 of 5 testers book a call slot on the page" ([discovery/test-cards/call-slot-prototype.md:80](../test-cards/call-slot-prototype.md#L80)).
> Until then, no line on this card is in force. The product lead asked for this preview on 2026-11-16.
> Assessment drafted by an agent on 2026-11-16, not a decision.
> Card owner: Product lead (Loopwise), the product lead's decision ("Yes, all five", 2026-11-16)
> Variant: [discovery/specs/call-slot.md](../specs/call-slot.md) · Intent: [discovery/intents/format-fit.md](../intents/format-fit.md) · Prototype test: [discovery/test-cards/call-slot-prototype.md](../test-cards/call-slot-prototype.md), learning card [discovery/decisions/003-call-slot.md](../decisions/003-call-slot.md)
> KPI branch: Branch A ("Branch A: more inquiries that end in a booking", [discovery/kpi-tree.md:18](../kpi-tree.md#L18)) · driver: call rate ("call rate: percentage of sent inquiries that get a scoping call", [discovery/kpi-tree.md:23](../kpi-tree.md#L23))
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.
> Data: 0 events in `data/events.jsonl` carry this variant (`grep -c '"variant":"call-slot"' data/events.jsonl`). No event in `data/` carries this variant, so this card cannot be read against the data in this repo.

A launch card says, before release, what must happen for the variant to count as working, and when to take it back.
A critical assumption is one thing that must be true for the variant to work.
A KPI branch is one way the business goal can grow. A driver is a step on that way the site can count.
A success line is the result, set before launch, at which the variant counts as working.
A proxy metric is a number we see soon that we expect to move with the goal we cannot see yet.
A counter metric is a number that must not get worse while the main number improves.
A kill criterion is the line at which we take the variant back.
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).
A call slot is a time for that call, which the buyer picks on the inquiry page instead of writing first.

## Your first try
The product lead, 2026-11-16, word for word: "We are right if, we improve the call rate by 15%"

Asked what 15% means, the product lead answered on 2026-11-16, in German as said:
„Ich weiß es nicht, das ist genau der Punkt. Statistisch relevant ist das alles eh nicht. Ich wäre mit 65 von 113 sehr zufrieden“
In English: "I don't know, that is exactly the point. None of this is statistically meaningful anyway. I would be very happy with 65 of 113."

Where the draft differs:
- The success line is the second answer as a share: at least 57.5% of sent inquiries get a scoping call. 65 of 113 is the reference count. The product lead confirmed this on 2026-11-16: "passt so" ("that fits").
- The draft adds a time frame of eight weeks, which the answers do not name. 113 sent inquiries took 26 weeks, so a share fits a shorter time frame than a count.
- The draft flags that a booked slot has no sent inquiry. The product lead decided that booked slots stay out of the share and are reported on their own.

Feedback:
- Strong: the first try names a driver from the KPI tree, the call rate, and a size, before launch.
- Weak: "15%" could mean 15 percent of today's rate or 15 points. On 55 of 113 (48.7%), that is 56.0% or 63.7%.
- Weak: it names no baseline and no time frame. A reader later cannot tell what "improve" is measured against.
- Can `data/` count it? Not today. No event carries `call-slot`, and the prototype's slot booking logs no event ([discovery/specs/call-slot.md:33](../specs/call-slot.md#L33)).
- The call rate counts calls per sent inquiry. A slot booking makes a call without a sent inquiry. So the rate can rise without any extra calls, or fall while calls grow.
- The second answer is stronger: "65 of 113" is a count, with the same base as today's 55 of 113.
- Against the usual swing: 65 of 113 is 57.5%. The unchanged page reached 62.5% in one of three eight-week blocks before launch (table below). So the line shows a direction, not an effect.

## The test card in four lines
- **We believe that** buyers who cannot tell which format fits would rather book a call slot themselves than write an inquiry.
- **To verify that, we will** release the variant to every inquiry page visitor for eight weeks.
- **And measure** scoping calls per sent inquiry, from `scoping_call_booked` and `inquiry_submitted`, and booked slots on their own.
- **We are right if** at least 57.5% of sent inquiries get a scoping call (today 55 of 113, 48.7%).

Under the four lines: **We take it back if** fewer inquiry page visits end in any contact than in every eight-week block before launch.

Each line repeats a field below in one sentence. If a field changes, this section changes with it.

## Before this card can apply
- The test with people has passed (see the top of this card). Not done: "Tested with people: 0." ([discovery/decisions/003-call-slot.md:81](../decisions/003-call-slot.md#L81))
- The page is built for release. Today the booking is faked and logs no event ([discovery/specs/call-slot.md:33](../specs/call-slot.md#L33)). The spec leaves these for the launch spec: a real calendar link ([discovery/specs/call-slot.md:105](../specs/call-slot.md#L105)), the event `scoping_call_booked` for a booked slot ([discovery/specs/call-slot.md:106](../specs/call-slot.md#L106)), a real number ([discovery/specs/call-slot.md:107](../specs/call-slot.md#L107)), and a confirmation mail ([discovery/specs/call-slot.md:108](../specs/call-slot.md#L108)).
- No launch spec `discovery/specs/call-slot-launch.md` exists yet. The release page must log `scoping_call_booked` with the variant `call-slot` when a buyer books a slot. Otherwise no line on this card can be counted.
- The invented lines on the page have a confirmer (assumption 3).

## What changes for whom
On the inquiry page, a buyer can book a 20-minute call slot or call a number, next to the form. A buyer who books a slot gets a scoping call without writing an inquiry.

## Critical assumptions
1. **Buyers who cannot tell which format fits would rather talk than write, and book a slot themselves**: partly supported
   - Reasoning: two buyers ask for a call first. No buyer in `sources/` books a slot alone, and no person has tried the page.
   - Sources: "Can I talk to someone before I fill in anything?" ([sources/inbox/inbox-export.md:149](../../sources/inbox/inbox-export.md#L149)); "maybe a 20 minute call would be easier." ([sources/inquiry-mails/inquiry-03.md:16](../../sources/inquiry-mails/inquiry-03.md#L16))
   - Prototype test: "This run neither shows nor refutes the critical assumption." ([discovery/decisions/003-call-slot.md:114](../decisions/003-call-slot.md#L114)) All five AI twins chose the slot booking, but every twin held a budget ([discovery/decisions/003-call-slot.md:115](../decisions/003-call-slot.md#L115), [discovery/decisions/003-call-slot.md:116](../decisions/003-call-slot.md#L116)).
   - Counter-evidence: the buyer with budget wants written answers first: "If you can answer these in writing, I am happy to follow up with a call." ([sources/inquiry-mails/inquiry-02.md:23](../../sources/inquiry-mails/inquiry-02.md#L23))
   - Gap: the test with people. The product lead recruits five buyers by 2026-11-24 ([discovery/test-cards/call-slot-prototype.md:40](../test-cards/call-slot-prototype.md#L40)).
2. **A call the buyer books on the page ends in a booking as often as a call set up after a sent inquiry**: unsupported
   - Reasoning: no source and no test reaches a call booked without writing first.
   - Sources: the buyer without budget does not decide alone: "I'll take this to two colleagues and talk it through with them." ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41))
   - Prototype test: not tested. The prototype test cannot show "Whether a booked slot turns into a held call, or a booking." ([discovery/test-cards/call-slot-prototype.md:94](../test-cards/call-slot-prototype.md#L94))
   - Counter-evidence: the buyer without budget has "No timeline" ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)). A slot booked without a date in mind may not be kept.
   - Gap: the people who run scoping calls can say whether booked slots were held. No event counts a held call.
3. **The invented lines on the page are true**: unsupported
   - Reasoning: the spec marks them invented. Nobody who runs scoping calls has confirmed them.
   - Sources: "A 20-minute video call" is to be confirmed by "someone who runs scoping calls" ([discovery/specs/call-slot.md:96](../specs/call-slot.md#L96)). So are the days and times ([discovery/specs/call-slot.md:98](../specs/call-slot.md#L98)) and "No preparation needed" ([discovery/specs/call-slot.md:100](../specs/call-slot.md#L100)).
   - Prototype test: not tested.
   - Counter-evidence: none found in `sources/`.
   - Gap: someone who runs scoping calls confirms each line before release.

## How much the unchanged page swings
Counted from `data/events.jsonl`, 26 weeks of synthetic data from 2026-02-18. A call counts in the block of its sent inquiry. The last block holds two weeks only.

| Block from | Calls of sent inquiries (call rate) | Calls of inquiry page visits | Sent inquiries of inquiry page visits |
|---|---|---|---|
| 2026-02-18, 4 weeks | 7 of 17 (41.2%) | 7 of 112 (6.3%) | 17 of 112 (15.2%) |
| 2026-03-18, 4 weeks | 10 of 18 (55.6%) | 10 of 111 (9.0%) | 18 of 111 (16.2%) |
| 2026-04-15, 4 weeks | 8 of 12 (66.7%) | 8 of 118 (6.8%) | 12 of 118 (10.2%) |
| 2026-05-13, 4 weeks | 12 of 20 (60.0%) | 12 of 110 (10.9%) | 20 of 110 (18.2%) |
| 2026-06-10, 4 weeks | 7 of 18 (38.9%) | 7 of 118 (5.9%) | 18 of 118 (15.3%) |
| 2026-07-08, 4 weeks | 9 of 22 (40.9%) | 9 of 119 (7.6%) | 22 of 119 (18.5%) |
| 2026-08-05, 2 weeks | 2 of 6 (33.3%) | 2 of 52 (3.8%) | 6 of 52 (11.5%) |
| 2026-02-18, 8 weeks | 17 of 35 (48.6%) | 17 of 223 (7.6%) | 35 of 223 (15.7%) |
| 2026-04-15, 8 weeks | 20 of 32 (62.5%) | 20 of 228 (8.8%) | 32 of 228 (14.0%) |
| 2026-06-10, 8 weeks | 16 of 40 (40.0%) | 16 of 237 (6.8%) | 40 of 237 (16.9%) |
| All 26 weeks | 55 of 113 (48.7%) | 55 of 740 (7.4%) | 113 of 740 (15.3%) |

The call rate of the unchanged page moved by 21.1 points between neighbouring four-week blocks (60.0% to 38.9%). Between eight-week blocks it moved by 22.5 points (62.5% to 40.0%).
The success line asks for 57.5% against 48.7%, a change of 8.8 points. That is smaller than the usual swing. So the call rate shows a direction, not an effect.
The unchanged page would have met the success line in 1 of 3 eight-week blocks (20 of 32, 62.5%).
The data opportunities file counts the same 55 of 113 ([discovery/opportunities/data.md:80](../opportunities/data.md#L80)). The agent recounted it on 2026-11-16: 55 sessions with `scoping_call_booked`, all of them with `inquiry_submitted`.

Command, run from the repo root:

```bash
node -e 'const fs=require("fs");const ev=fs.readFileSync("data/events.jsonl","utf8").trim().split("\n").map(JSON.parse);const iv={},su={},ca={};for(const e of ev){if(e.type==="page_view"&&e.props.page==="inquiry")iv[e.session]=e.ts;if(e.type==="inquiry_submitted")su[e.session]=1;if(e.type==="scoping_call_booked")ca[e.session]=1}const S=Date.parse("2026-02-18T00:00:00Z");for(const w of [4,8]){const b={};for(const k in iv){const i=Math.floor((Date.parse(iv[k])-S)/(w*7*864e5));b[i]=b[i]||[0,0,0];b[i][0]++;if(su[k])b[i][1]++;if(ca[k])b[i][2]++}console.log(w,"weeks: [visits, sent, calls]",JSON.stringify(b))}'
```

## Success line (set upfront, before launch)
At least 57.5% of sent inquiries get a scoping call, over the eight weeks after launch. 65 of 113 is the reference count. Today 55 of 113 do (48.7%), in 26 weeks.
- Source: the product lead, 2026-11-16, „Ich wäre mit 65 von 113 sehr zufrieden“ ("I would be very happy with 65 of 113"). Confirmed as a share the same day: "passt so" ("that fits").
- In eight weeks before launch, 32 to 40 inquiries were sent. One call more or less moves the share by about three points.
- Direction only: the change is smaller than the usual swing (table above).
- How a booked slot counts: it stays out of the share and is reported on its own, under "Usage hypothesis". A booked slot is a scoping call without a sent inquiry. Decided: the product lead's decision ("Yes, all five", 2026-11-16).
- Computed from: sessions with `scoping_call_booked` that also have `inquiry_submitted`, ÷ sessions with `inquiry_submitted`, both with the variant `call-slot`.
- Set by: Product lead (Loopwise), the product lead's decision ("Yes, all five", 2026-11-16) · Set on: 2026-11-16

## Usage hypothesis
Buyers use the slot booking: booked slots are at least a quarter of all scoping calls in the time frame (proposal). · Computed from: sessions with `scoping_call_booked` and no `inquiry_submitted`, ÷ sessions with `scoping_call_booked`, variant `call-slot`. Before launch this count is 0, because no slot booking exists.

## Proxy metric
Scoping calls of inquiry page visits, both routes together: a slot, or a sent inquiry that gets a call. Today 55 of 740 (7.4%). [assumption: a call booked on the page ends in a booking as often as a call after a sent inquiry; see assumption 2] · Computed from: sessions with `scoping_call_booked` ÷ sessions with a `page_view` of the inquiry page

## Start rate (the driver the intent names)
The intent asks that more inquiry page visits start the form ([discovery/intents/format-fit.md:30](../intents/format-fit.md#L30)), counted as the start rate ([discovery/intents/format-fit.md:32](../intents/format-fit.md#L32)).
Direction only, and read with the slot bookings. A buyer who books a slot never clicks into the form. So the start rate can fall while more buyers get a call.
Today 194 of 740 inquiry page visits start the form ([discovery/intents/format-fit.md:34](../intents/format-fit.md#L34)). In four-week blocks it ran from 19.5% to 30.3%. · Computed from: `inquiry_started` ÷ sessions with a `page_view` of the inquiry page

## Counter metric
Inquiry page visits that end in a contact: a sent inquiry or a booked slot. Must not get worse: a box of ways to talk could leave buyers with neither. · Computed from: sessions with `inquiry_submitted` or `scoping_call_booked`, ÷ sessions with a `page_view` of the inquiry page · Baseline: 113 of 740 (15.3%), 26 weeks, `data/events.jsonl`, synthetic. A phone call leaves no event, so a buyer who phones counts as no contact.

Second counter metric, reported without a threshold: the booking rate, `booking_confirmed` ÷ `scoping_call_booked`. Today 23 of 55 (41.8%) ([discovery/opportunities/data.md:95](../opportunities/data.md#L95)). Eight-week blocks: 7 of 17, 10 of 20, 6 of 16. One booking moves the rate by about six points.

## Kill criterion
In the first eight weeks after launch, fewer inquiry page visits end in a contact than in every eight-week block before launch: below 32 of 228 (14.0%). · Computed from: the counter metric above · The unchanged page met this in 0 of 3 eight-week blocks. In four-week blocks it fell below 14.0% once in 6 (12 of 118). · Set by: Product lead (Loopwise), the product lead's decision ("Yes, all five", 2026-11-16)

## Time frame
Eight weeks from launch, as long as the eight-week blocks in the swing table. Read the result one week after the eight weeks end: today a call follows a sent inquiry within 1 to 4 days (counted in `data/events.jsonl`). The kill criterion is read at the same time. · Set by: Product lead (Loopwise), the product lead's decision ("Yes, all five", 2026-11-16)

## What the measurement will and will not tell
- **A signal, not proof.** The product lead: „Statistisch relevant ist das alles eh nicht.“ ("None of this is statistically meaningful anyway.") In plain words: eight weeks bring a few dozen sent inquiries. The unchanged page swung by 22.5 points between eight-week blocks, without any change on the page.
- **No control group.** Every visitor sees the variant. The comparison is before launch against after launch. A season, a slow month or a change elsewhere looks the same as an effect of the page.
- **What it will tell:** whether buyers use the slot booking at all, and whether calls rise or fall in the same direction.
- Whether a booked slot is held. No event counts a held call.
- Phone calls. "no event counts a phone call" ([discovery/intents/format-fit.md:58](../intents/format-fit.md#L58)).
- Whether a booking comes from the variant. Bookings depend on the call, and the numbers are too small to attribute ([product/constraints.md:39](../../product/constraints.md#L39)).
- Buyers without budget. The persona runs held only buyers with budget: "The test shows nothing about buyers without budget." ([discovery/user-tests/call-slot-qlaris.md:145](../user-tests/call-slot-qlaris.md#L145)) The data carry no buyer type in the events.
- No event in `data/` carries this variant, so this card cannot be read against the data in this repo. Every number in `data/` is synthetic.

## Result

_Empty until after the time frame. A human decides keep, adjust or withdraw._
