# Test card: format-quiz

> Assessment drafted by an agent on 2026-10-26, not a decision.
> Card owner: Reference decision (replace with your own)
> Variant: `discovery/specs/format-quiz.md` · Intent: `discovery/intents/format-question.md` · Prototype test: `discovery/test-cards/format-quiz-prototype.md`, learning card `discovery/decisions/002-format-quiz.md`
> KPI branch: inquiries that end in a booking ("Branch A: inquiries that end in a booking", `discovery/kpi-tree.md:18`)
> Material: interviews are anonymised composites; mails, inbox and data are synthetic. The prototype tests rest on synthetic cross tests. This card repeats that label.
> Data: 923 events in `data/events.jsonl` carry this variant (`grep -c '"variant":"format-quiz"' data/events.jsonl`). All of them are synthetic.

A launch card says, before release, what must happen for the variant to count as working, and when to take it back.
A proxy metric is a number we can see soon that we expect to move with the goal we cannot see yet.
A counter metric is a number that must not get worse while the main number improves.
A kill criterion is the line at which we take the variant back.

## Your first try
Skipped: drafted by Claude for the reference run. In your own run, this is your success line in one sentence. · Where the draft differs: no answer to compare.

## The card in five lines
- **We believe that** a sponsor who can take the quiz starts the inquiry form more often than a sponsor who meets today's form.
- **To test that, we will** run the quiz in every other week for eight weeks, and today's form in the weeks between.
- **And measure** the start rate, quiz weeks against off weeks: inquiry page visits that start the form.
- **We are right if** the start rate in the quiz weeks is at least 5 percentage points above the off weeks.
- **We take it back if** the submit rate falls more than a quarter below the baseline in two quiz weeks in a row.

Each line repeats a field below in one sentence. If a field changes, this section changes with it.

## What changes for whom
In a quiz week, an unsure sponsor can take a four-question quiz about the team on the formats page. The answers fill the inquiry form, which the sponsor completes and sends. In an off week, every sponsor meets today's formats page and form.

## How the test runs: alternating weeks
We have too few visitors to split them at random: about 30 inquiry page visits a week. So we split the weeks instead. The quiz runs in weeks 0, 2, 4 and 6 after launch, today's form in weeks 1, 3, 5 and 7. Each week starts on the launch weekday, a Wednesday. [assumption: someone sets `shipped` in `site/config.json` every Wednesday morning, to `format-quiz` or to null]

Why this way:
- The sponsor does not choose which side they are on. The week does.
- A season or a slow month falls on both sides, because the sides alternate.
- The eight weeks before launch are context only. They also set the kill line, because they hold the most weeks of today's form.

What it costs: four weeks per side, so each side has about 120 inquiry page visits and fewer than 50 started forms. A difference of a few points can still be chance.

## Critical assumptions
1. **A sponsor who can take the quiz starts the inquiry form more often than one who meets today's form**: unsupported
   - Reasoning: the prototype tests watched one tester per round go through the quiz. No test compared sponsors with and without the quiz.
   - Sources: the tester in round 2 saw the filled message and said: "Oh, it wrote that for me." (`discovery/user-tests/format-quiz-cross-2.md:13`)
   - Prototype test: "From that we learned that an unsure sponsor answers questions about the team today, when the page says that not knowing is fine." (`discovery/decisions/002-format-quiz.md:98`)
   - Counter-evidence: in round 1 the tester stopped the quiz and did not send (`discovery/user-tests/format-quiz-cross.md:16`).
   - Gap: the alternating weeks answer this for the start rate, within the limits of small numbers.
2. **An unsure sponsor goes through all four questions on a page, without a person**: partly supported
   - Reasoning: round 2 passed with one synthetic tester. Round 1 failed with one synthetic tester.
   - Sources: "Good. Because I don't know half of this." (`discovery/user-tests/format-quiz-cross-2.md:8`)
   - Prototype test: the round 2 go-on line held, "All three go-on signs were seen, no rework sign." (`discovery/decisions/002-format-quiz.md:95`)
   - Counter-evidence: "I'd rather talk to someone about this." (`discovery/user-tests/format-quiz-cross.md:14`)
   - Gap: one tester per round is a pattern, not a rate. The usage hypothesis below counts how many reach question 4.
3. **The scoping call works out what the sponsor does not know yet**: unsupported
   - Reasoning: the quiz promises it in an invented line. Nobody who runs scoping calls has confirmed it.
   - Sources: the spec lists the line as invented, to be confirmed by "academy staff who run scoping calls" (`discovery/specs/format-quiz.md:131`).
   - Prototype test: "Academy staff who run scoping calls confirm the invented line" is a change before roll-out (`discovery/decisions/002-format-quiz.md:102`). Open.
   - Counter-evidence: none found in `sources/`.
   - Gap: academy staff who run scoping calls. The call record below counts settled formats, not whether the promise was kept.

Changes before roll-out from the learning card: the staff confirmation above is open, not a page change. Baseline pages logging `page_view` is done.

## Success line (set upfront, before launch)
The start rate in the four quiz weeks together is at least 5 percentage points above the start rate in the four off weeks together (proposal). Context: 69 of 235 inquiry page visits started the form in the eight weeks before launch (29.4%). · Computed from: sessions with `inquiry_started` ÷ sessions with `page_view` of the inquiry page, per kind of week. A quiz week is a week in which the inquiry page events carry `format-quiz`. · Set on: 2026-08-18

## Usage hypothesis: adoption
In the quiz weeks, at least a quarter of inquiry page visits come through the quiz, and at least half of the visits that start the quiz reach question 4 (proposal). Also counted, without a threshold: how often each question gets "I don't know yet". · Computed from: sessions with `inquiry_step_completed` step 1 that also have a `page_view` of the inquiry page ÷ sessions with that `page_view`; sessions with step 4 ÷ sessions with step 1; `inquiry_step_completed` with `unsure: true` per step

## Proxy metric
Call rate: sent inquiries that get a scoping call, quiz weeks against off weeks. Context: 16 of 40 baseline inquiries sent in the eight weeks before launch got a call (`data/inquiries.csv`). [assumption: a sponsor who comes to the call with quiz answers books more often; the booking rate itself is too small to read in eight weeks] · Computed from: `scoping_call_booked` ÷ `inquiry_submitted`, per kind of week

## Call quality (second proxy)
From 2026-07-22, four weeks before launch, the person who runs a scoping call records two things for every call: how many of the four basics they still had to ask (who is in the team, how many people, where the team stands with AI, what the team tried before), and whether the format was settled in the call. The four basics are the four quiz questions.
- **Fewer basics:** in the quiz weeks, more calls need at most one basic than in the off weeks (proposal; no threshold, the calls are too few for one). This is where the quiz should save time.
- **Format settled:** reported for quiz weeks, off weeks and the four weeks before launch, no threshold. This is what the opportunity is about: the sponsor "does not know what to ask for, or which format fits" (`discovery/decisions/001-format-question.md:7`).
· Computed from: `call_basic_questions` (0 to 4) and `call_format_settled` in `data/inquiries.csv`, per kind of week. Not an event: the website cannot see the call.
· Limit: the person recording sees the quiz answers in the message before the call, and may ask less because of that. The record is a count of questions asked, not a judgement, to keep that effect small. Expect about ten calls per kind of week.

## Counter metric
Submit rate: started forms that are sent, quiz weeks against off weeks. A quiz that fills the form could bring starts that are not sent. · Computed from: `inquiry_submitted` ÷ `inquiry_started`, per kind of week · Baseline: 40 of 69 in the eight weeks before launch (58.0%)

## Kill criterion
The weekly submit rate falls more than a quarter below the baseline, below 43.5%, in two quiz weeks in a row (proposal). Off weeks do not count; two quiz weeks are in a row when no quiz week lies between them. · Computed from: `inquiry_submitted` ÷ `inquiry_started` per quiz week. Weekly starts in the baseline weeks were 4 to 12, so a single week swings widely: one baseline week had 1 of 4.

## Time frame
Eight weeks from launch on 2026-08-19: four quiz weeks, four off weeks (proposal).

## Described, not tested: quiz users against the rest
Inside the quiz weeks, inquiries that came through the quiz can be set against those that did not, by the `quiz` prop on `inquiry_submitted`. This is not a test. Sponsors chose the quiz themselves, so any difference mixes what the quiz does with who chooses it. The card shows the split as a description and no decision rests on it.

## What we cannot see
- Why a sponsor did not take the quiz. "No event fires for the click on the link." (`discovery/specs/format-quiz.md:119`)
- Whether a booking comes from the quiz. Bookings after the call depend on the call, not on the website.
- What the sponsor asks in the scoping call. The call record counts the basics the academy asked, not the sponsor's own questions.
- Every number in `data/` is synthetic. The result shows how a card is read, not how sponsors behave.

## Result

_Empty until after the time frame. `read-result` fills this section from the event log; a human decides keep, adjust or withdraw._
