# Test card: format-quiz

> Assessment drafted by an agent on 2026-08-18, not a decision.
> Card owner: Reference decision (replace with your own)
> Variant: `discovery/specs/format-quiz.md` · Intent: `discovery/intents/format-question.md` · Prototype test: `discovery/test-cards/format-quiz-prototype.md`, learning card `discovery/decisions/002-format-quiz.md`
> KPI branch: inquiries that end in a booking ("Branch A: inquiries that end in a booking", `discovery/kpi-tree.md:18`)
> Material: interviews are anonymised composites; mails, inbox and data are synthetic. The prototype tests rest on synthetic cross tests. This card repeats that label.
> Data: on 2026-08-18, before launch, no event carries this variant. In this repo, `data/` already holds the eight weeks after launch: 950 events carry it (`grep -c '"variant":"format-quiz"' data/events.jsonl`). All of them are synthetic.

A launch card says, before release, what must happen for the variant to count as working, and when to take it back.
A proxy metric is a number we can see soon that we expect to move with the goal we cannot see yet.
A counter metric is a number that must not get worse while the main number improves.
A kill criterion is the line at which we take the variant back.

## Your first try
Skipped: drafted by Claude for the reference run. In your own run, this is your success line in one sentence. · Where the draft differs: no answer to compare.

## The card in five lines
- **We believe that** a sponsor who is unsure about the format goes on from the formats page to the inquiry when the quiz is there, has already told us about the team before the scoping call, and starts the form at least as often as today.
- **To test that, we will** run the quiz in every other week for eight weeks, and today's form in the weeks between.
- **And measure** the visits that see the formats page and open the inquiry page, how many of the four questions about the team we still have to ask in each scoping call, and the start rate, quiz weeks against off weeks.
- **We are right if** more formats page visits open the inquiry page in quiz weeks than in any four weeks before launch and in the off weeks, in at least half of the calls from quiz weeks we ask at most one of the four questions about the team, and the start rate in quiz weeks is not below the off weeks.
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

What it costs: four weeks per side, so each side has about 120 inquiry page visits and fewer than 50 started forms.

## How much the unchanged form swings
Before setting any line, we counted the start rate of today's form in blocks of four weeks, the length of one side of the test (`data/events.jsonl`, the 24 weeks before launch):

| Four weeks from | Started of inquiry page visits | Start rate |
|---|---|---|
| 2026-03-04 | 25 of 112 | 22.3% |
| 2026-04-01 | 34 of 118 | 28.8% |
| 2026-04-29 | 18 of 108 | 16.7% |
| 2026-05-27 | 33 of 115 | 28.7% |
| 2026-06-24 | 35 of 119 | 29.4% |
| 2026-07-22 | 34 of 116 | 29.3% |

Nothing changed on the form, and still two neighbouring blocks differ by 12 points (28.8% and 16.7%). A difference in start rate smaller than that can come from the usual swing alone. So the start rate can show a direction, not that the quiz works.

The intent names a second number: "Today 376 of 2291 visits that see the formats page open the inquiry page" (`discovery/intents/format-question.md:19`). The quiz sits on the formats page, so this is where it should act first. The same four-week blocks, for visits that see the formats page:

| Four weeks from | Open the inquiry page, of visits with the formats page | Share |
|---|---|---|
| 2026-03-04 | 55 of 329 | 16.7% |
| 2026-04-01 | 58 of 360 | 16.1% |
| 2026-04-29 | 57 of 337 | 16.9% |
| 2026-05-27 | 58 of 346 | 16.8% |
| 2026-06-24 | 58 of 384 | 15.1% |
| 2026-07-22 | 60 of 386 | 15.5% |

This share hardly swings: 15.1% to 16.9%. A clear rise above it would not be the usual swing. A visit counts in the week of its first page view.

The success line therefore rests on this share and on the scoping calls, where the quiz should make a larger difference than on the start rate.

Commands: the start rate blocks with `node -e 'const fs=require("fs");const ev=fs.readFileSync("data/events.jsonl","utf8").trim().split("\n").map(JSON.parse);const L=Date.parse("2026-08-19T00:00:00Z"),W=7*864e5,wk=e=>Math.floor((Date.parse(e.ts)-L)/W);const c=p=>new Set(ev.filter(p).map(e=>e.session)).size;for(let b=-24;b<0;b+=4){const i=e=>wk(e)>=b&&wk(e)<b+4;console.log(b,c(e=>i(e)&&e.type==="inquiry_started")+"/"+c(e=>i(e)&&e.type==="page_view"&&e.props.page==="inquiry"))}'`, the formats page blocks with `npm run summary` (line "four-week blocks before launch").

## Critical assumptions
1. **A sponsor on the formats page who is unsure which format fits goes on to the inquiry when the quiz is there**: partly supported
   - Reasoning: the data show the drop; why visits drop rests on the pair's word.
   - Sources: "Today 376 of 2291 visits that see the formats page open the inquiry page" (`discovery/intents/format-question.md:19`). The pair: "Yes. We know this happens from previous user tests" (`discovery/intents/format-question.md:29`).
   - Prototype test: in round 2 the tester went from the formats page through the quiz to the inquiry (`discovery/user-tests/format-quiz-cross-2.md:7`).
   - Counter-evidence: the user tests the pair names are not in `sources/` (`discovery/intents/format-question.md:29`).
   - Gap: the alternating weeks count the share; they cannot show why a visit leaves.
2. **A sponsor who can take the quiz starts the inquiry form more often than one who meets today's form**: unsupported
   - Reasoning: the prototype tests watched one tester per round go through the quiz. No test compared sponsors with and without the quiz.
   - Sources: the tester in round 2 saw the filled message and said: "Oh, it wrote that for me." (`discovery/user-tests/format-quiz-cross-2.md:13`)
   - Prototype test: "From that we learned that an unsure sponsor answers questions about the team today, when the page says that not knowing is fine." (`discovery/decisions/002-format-quiz.md:98`)
   - Counter-evidence: in round 1 the tester stopped the quiz and did not send (`discovery/user-tests/format-quiz-cross.md:16`).
   - Gap: the alternating weeks show a direction for the start rate. A difference inside the usual swing of 12 points cannot show more.
3. **An unsure sponsor goes through all four questions on a page, without a person**: partly supported
   - Reasoning: round 2 passed with one synthetic tester. Round 1 failed with one synthetic tester.
   - Sources: "Good. Because I don't know half of this." (`discovery/user-tests/format-quiz-cross-2.md:8`)
   - Prototype test: the round 2 go-on line held, "All three go-on signs were seen, no rework sign." (`discovery/decisions/002-format-quiz.md:95`)
   - Counter-evidence: "I'd rather talk to someone about this." (`discovery/user-tests/format-quiz-cross.md:14`)
   - Gap: one tester per round is a pattern, not a rate. The usage hypothesis below counts how many reach question 4.
4. **The scoping call works out what the sponsor does not know yet**: unsupported
   - Reasoning: the quiz promises it in an invented line. Nobody who runs scoping calls has confirmed it.
   - Sources: the spec lists the line as invented, to be confirmed by "academy staff who run scoping calls" (`discovery/specs/format-quiz.md:131`).
   - Prototype test: "Academy staff who run scoping calls confirm the invented line" is a change before roll-out (`discovery/decisions/002-format-quiz.md:102`). Open.
   - Counter-evidence: none found in `sources/`.
   - Gap: academy staff who run scoping calls. The call record below counts settled formats, not whether the promise was kept.

Changes before roll-out from the learning card: the staff confirmation above is open, not a page change. Baseline pages logging `page_view` is done.

## Success line (set upfront, before launch)
Three parts, all set before launch:
- More visits that see the formats page open the inquiry page in the quiz weeks together than in any four-week block before launch (highest: 16.9%) and than in the off weeks together (proposal).
- In at least half of the scoping calls from quiz weeks, we ask at most one of the four questions about the team (proposal). Before launch: in 0 of 9 recorded calls did we ask at most one (`data/inquiries.csv`, calls recorded from 2026-07-22).
- The start rate in the quiz weeks is not below the start rate in the off weeks (proposal; a direction only, see "How much the unchanged form swings"). Context: 69 of 235 inquiry page visits started the form in the eight weeks before launch (29.4%).

· Computed from: visits with a `page_view` of the formats page that also have a `page_view` of the inquiry page ÷ visits with a `page_view` of the formats page, a visit counted in the week of its first page view; `call_team_questions` in `data/inquiries.csv` for inquiries sent in quiz weeks; sessions with `inquiry_started` ÷ sessions with `page_view` of the inquiry page, per kind of week. A quiz week is a week in which the inquiry page events carry `format-quiz`. · Set on: 2026-08-18

## Usage hypothesis: adoption
In the quiz weeks, at least a quarter of inquiry page visits come through the quiz, and at least half of the visits that start the quiz reach question 4 (proposal). Also counted, without a threshold: how often each question gets "I don't know yet". · Computed from: sessions with `inquiry_step_completed` step 1 that also have a `page_view` of the inquiry page ÷ sessions with that `page_view`; sessions with step 4 ÷ sessions with step 1; `inquiry_step_completed` with `unsure: true` per step

## Proxy metric
Call rate: sent inquiries that get a scoping call, quiz weeks against off weeks. Context: 16 of 40 baseline inquiries sent in the eight weeks before launch got a call (`data/inquiries.csv`). [assumption: a sponsor who comes to the call with quiz answers books more often; the booking rate itself is too small to read in eight weeks] · Computed from: `scoping_call_booked` ÷ `inquiry_submitted`, per kind of week

## Call quality (second proxy)
From 2026-07-22, four weeks before launch, the person who runs a scoping call records two things for every call: how many of the four questions about the team they still had to ask, and whether the format was settled in the call. The four questions about the team are: who is in the team, how many people, where the team stands with AI, and what the team tried before. They are the four quiz questions.
- **Fewer questions about the team:** the success line above. Off weeks and the weeks before launch show what today's form gives. This is where the quiz should save time.
- **Format settled:** reported for quiz weeks, off weeks and the four weeks before launch, no threshold. This is what the opportunity is about: the sponsor "does not know what to ask for, or which format fits" (`discovery/decisions/001-format-question.md:7`).
· Computed from: `call_team_questions` (0 to 4) and `call_format_settled` in `data/inquiries.csv`, per kind of week. Not an event: the website cannot see the call.
· Limit: the person recording sees the quiz answers in the message before the call, and may ask less because of that. The record is a count of questions asked, not a judgement, to keep that effect small. Expect about ten calls per kind of week, so one call moves the share by about ten points.

## Counter metric
Submit rate: started forms that are sent, quiz weeks against off weeks. A quiz that fills the form could bring starts that are not sent. · Computed from: `inquiry_submitted` ÷ `inquiry_started`, per kind of week · Baseline: 40 of 69 in the eight weeks before launch (58.0%)

## Kill criterion
The weekly submit rate falls more than a quarter below the baseline, below 43.5%, in two quiz weeks in a row (proposal). Off weeks do not count; two quiz weeks are in a row when no quiz week lies between them. · Computed from: `inquiry_submitted` ÷ `inquiry_started` per quiz week. Weekly starts in the baseline weeks were 4 to 12, so a single week swings widely: one baseline week had 1 of 4. Today's form fell below 43.5% in 6 of the 26 weeks before launch, but never in two weeks two apart, which is how quiz weeks sit. The rule does not fire on the usual swing alone.

## Time frame
Eight weeks from launch on 2026-08-19: four quiz weeks, four off weeks (proposal).

## Described, not tested: quiz users against the rest
Inside the quiz weeks, inquiries that came through the quiz can be set against those that did not, by the `quiz` prop on `inquiry_submitted`. This is not a test. Sponsors chose the quiz themselves, so any difference mixes what the quiz does with who chooses it. The card shows the split as a description and no decision rests on it.

## What we cannot see
- Why a sponsor did not take the quiz. "No event fires for the click on the link." (`discovery/specs/format-quiz.md:119`)
- Whether a booking comes from the quiz. Bookings after the call depend on the call, not on the website.
- What the sponsor asks in the scoping call. The call record counts the questions about the team the academy asked, not the sponsor's own questions.
- Every number in `data/` is synthetic. The result shows how a card is read, not how sponsors behave.

## Result

_Empty until after the time frame. `read-result` fills this section from the event log; a human decides keep, adjust or withdraw._
