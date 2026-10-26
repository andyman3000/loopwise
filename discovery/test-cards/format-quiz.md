# Test card: format-quiz

> Assessment drafted by an agent on 2026-10-26, not a decision.
> Card owner: Reference decision (replace with your own)
> Variant: `discovery/specs/format-quiz.md` · Intent: `discovery/intents/format-question.md` · Prototype test: `discovery/test-cards/format-quiz-prototype.md`, learning card `discovery/decisions/002-format-quiz.md`
> KPI branch: inquiries that end in a booking ("Branch A: inquiries that end in a booking", `discovery/kpi-tree.md:18`)
> Material: interviews are anonymised composites; mails, inbox and data are synthetic. The prototype tests rest on synthetic cross tests. This card repeats that label.
> Data: 1510 events in `data/events.jsonl` carry this variant (`grep -c '"variant":"format-quiz"' data/events.jsonl`). All of them are synthetic.

A launch card says, before release, what must happen for the variant to count as working, and when to take it back.
A proxy metric is a number we can see soon that we expect to move with the goal we cannot see yet.
A counter metric is a number that must not get worse while the main number improves.
A kill criterion is the line at which we take the variant back.

## Your first try
Skipped: drafted by Claude for the reference run. In your own run, this is your success line in one sentence. · Where the draft differs: no answer to compare.

## The card in five lines
- **We believe that** a sponsor who takes the quiz starts the inquiry form more often than a sponsor who meets the empty form.
- **To test that, we will** release the quiz to every visitor of the formats and inquiry pages for eight weeks.
- **And measure** the start rate: inquiry page visits that start the form.
- **We are right if** the start rate over the eight weeks is at least 33%.
- **We take it back if** the submit rate falls more than a quarter below the baseline in two weeks in a row.

Each line repeats a field below in one sentence. If a field changes, this section changes with it.

## What changes for whom
An unsure sponsor can take a four-question quiz about the team on the formats page. The answers fill the inquiry form, which the sponsor completes and sends.

## Critical assumptions
1. **A sponsor who takes the quiz starts the inquiry form more often than one who does not**: unsupported
   - Reasoning: the prototype tests watched one tester per round go through the quiz. No test compared sponsors with and without the quiz.
   - Sources: the tester in round 2 saw the filled message and said: "Oh, it wrote that for me." (`discovery/user-tests/format-quiz-cross-2.md:13`)
   - Prototype test: "From that we learned that an unsure sponsor answers questions about the team today, when the page says that not knowing is fine." (`discovery/decisions/002-format-quiz.md:98`)
   - Counter-evidence: in round 1 the tester stopped the quiz and did not send (`discovery/user-tests/format-quiz-cross.md:16`).
   - Gap: whether more starts come from the quiz or from sponsors who would have started anyway. The launch data show who took the quiz, not why.
2. **An unsure sponsor goes through all four questions on a page, without a person**: partly supported
   - Reasoning: round 2 passed with one synthetic tester. Round 1 failed with one synthetic tester.
   - Sources: "Good. Because I don't know half of this." (`discovery/user-tests/format-quiz-cross-2.md:8`)
   - Prototype test: the round 2 go-on line held, "All three go-on signs were seen, no rework sign." (`discovery/decisions/002-format-quiz.md:95`)
   - Counter-evidence: "I'd rather talk to someone about this." (`discovery/user-tests/format-quiz-cross.md:14`)
   - Gap: one tester per round is a pattern, not a rate. The launch data count how many reach question 4.
3. **The scoping call works out what the sponsor does not know yet**: unsupported
   - Reasoning: the quiz promises it in an invented line. Nobody who runs scoping calls has confirmed it.
   - Sources: the spec lists the line as invented, to be confirmed by "academy staff who run scoping calls" (`discovery/specs/format-quiz.md:131`).
   - Prototype test: "Academy staff who run scoping calls confirm the invented line" is a change before roll-out (`discovery/decisions/002-format-quiz.md:102`). Open.
   - Counter-evidence: none found in `sources/`.
   - Gap: academy staff who run scoping calls.

Changes before roll-out from the learning card: the staff confirmation above is open, not a page change. Baseline pages logging `page_view` is done.

## Success line (set upfront, before launch)
Start rate of `format-quiz` over the eight weeks is at least 33% (proposal). Baseline: 69 of 235 inquiry page visits started the form in the eight weeks before launch (29.4%). · Computed from: sessions with `inquiry_started` ÷ sessions with `page_view` of the inquiry page, both `format-quiz` · Set on: 2026-08-18

## Usage hypothesis
At least a quarter of inquiry page visits come through the quiz, and at least half of the visits that start the quiz reach question 4 (proposal). · Computed from: sessions with `inquiry_step_completed` step 1 that also have a `page_view` of the inquiry page ÷ sessions with that `page_view`; sessions with step 4 ÷ sessions with step 1

## Proxy metric
Call rate: sent inquiries that get a scoping call. Baseline: 16 of 40 baseline inquiries sent in the eight weeks before launch got a call (`data/inquiries.csv`). [assumption: a sponsor who comes to the call with quiz answers books more often; the booking rate itself is too small to read in eight weeks] · Computed from: `scoping_call_booked` ÷ `inquiry_submitted`, both `format-quiz`

## Counter metric
Submit rate: started forms that are sent. A quiz that fills the form could bring starts that are not sent. · Computed from: `inquiry_submitted` ÷ `inquiry_started` · Baseline: 40 of 69 in the eight weeks before launch (58.0%)

## Kill criterion
The weekly submit rate falls more than a quarter below the baseline, below 43.5%, in two weeks in a row (proposal). · Computed from: `inquiry_submitted` ÷ `inquiry_started` per week. Weekly starts in the baseline weeks were 4 to 12, so a single week swings widely: one baseline week had 1 of 4.

## Time frame
Eight weeks from launch on 2026-08-19 (proposal).

## What we cannot see
- Why a sponsor did not take the quiz. No event fires for the click on the quiz link (`discovery/specs/format-quiz.md:119`).
- Whether a booking comes from the quiz. Bookings after the call depend on the call, not on the website.
- Whether "I don't know yet" answers help the scoping call. Nothing is logged about the call.
- Every number in `data/` is synthetic. The result shows how a card is read, not how sponsors behave.

## Result

_Empty until after the time frame. `read-result` fills this section from the event log; a human decides keep, adjust or withdraw._
