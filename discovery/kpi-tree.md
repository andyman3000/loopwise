# KPI tree

> Assessment by an agent (`kpi-tree` skill), not a decision. Date: 2026-10-24.
> Reads: product/strategy.md, product/constraints.md, product/vision.md, CLAUDE.md, site/components/events.js, data/ (not present: only `.gitkeep`)
> Some quotes come from anonymised composite interviews (sources/interviews/sponsor-hard.md:3). No synthetic data is used yet: data/ is empty.

A KPI tree breaks one business goal into the numbers it depends on.
A KPI branch is one independent way the goal can grow.
A driver is a behaviour you can count that moves a branch.
A success line is one sentence that says how the sponsor will know the format worked.

## Your first try
"We need more people come to the website, then they need to boook a course, we must make sure, they really book and that they do not leave during the aquisition phase"

Where the draft differs:
- Your answer is one branch: new bookings, step by step. The draft keeps it as Branch A.
- You start one step earlier, at website visits. The strategy starts at inquiries. The draft adds visits as a driver, marked as an assumption.
- The draft adds Branch B, follow-up bookings. The strategy calls it the biggest lever (product/strategy.md:23).
- You named no number to watch. The draft names one per driver. None is measured yet.

## Business goal
"more booked in-house format days per quarter" (product/strategy.md:8, section Business goal)

The goal can be counted: booked format days per quarter.
No counted baseline exists yet (CLAUDE.md, section Key Metrics).

## Tree
- Business goal: more booked in-house format days per quarter
  - Branch A: new bookings
    - website visits · measured: not measured yet, would come from `page_view` in data/events.jsonl
    - inquiries started per month · measured: not measured yet, would come from `inquiry_started` in data/events.jsonl
    - inquiry completion rate (started to submitted) · measured: not measured yet, would come from `inquiry_started` and `inquiry_submitted` in data/events.jsonl
    - inquiry to booking conversion, through the scoping call · measured: not measured yet, would come from `scoping_call_booked` and `booking_confirmed` in data/events.jsonl or data/inquiries.csv
    - Assumption: more website visits lead to more inquiries started. The strategy does not name visits.
    - Assumption: sponsors who can name a success line book more often (product/strategy.md:16)
    - Assumption: each new booking adds format days. Days per booking are not counted anywhere.
  - Branch B: follow-up bookings
    - participants who bring their own task to the session · measured: not measured yet, would come from the expectations survey in sponsor preparation (site/sponsor-prep.html) or from the trainer
    - follow-up answered four weeks after the training · measured: not measured yet, would come from `followup_answered` in data/events.jsonl
    - follow-up booking within six months · measured: not measured yet, would come from `booking_confirmed` linked to an earlier booking of the same customer. No field holds that link yet.
    - Assumption: bringing their own task makes use in daily work more likely.
    - Assumption: an answered follow-up shows use in daily work, not only a responsive sponsor.
    - Assumption: reported use in daily work drives follow-up bookings (product/strategy.md:21)

## Branches
### Branch A: new bookings
- **Source:** "A sponsor inquires through the website, has a scoping call, books." (product/strategy.md:14)
- **Assessment:** partly supported
- **Reasoning:** The strategy names this lever and its drivers (product/strategy.md:14-16). A new booking adds format days by definition. But nothing counted links the website drivers to bookings. `data/` is empty. The strategy marks its own link for this branch as an assumption (product/strategy.md:16).
- **Counter-evidence:** The strategy says the first booking is "what fails today" (product/strategy.md:33). That points to Branch B more than to more inquiries. The constraints expect too few inquiries to attribute bookings to a website change (product/constraints.md:37-39). That volume is itself an assumption.
- **Gaps:** No count of visits, inquiries, conversions or bookings. These fill once `data/events.jsonl` and `data/inquiries.csv` exist (product/strategy.md:51). Days per booking are not counted. The person who runs scoping calls could say which formats get booked.

### Branch B: follow-up bookings
- **Source:** "A customer who has booked once books again: more days, more teams," (product/strategy.md:18)
- **Assessment:** partly supported
- **Reasoning:** The strategy calls this the biggest lever (product/strategy.md:23). Sponsors tie more bookings to proof of effect: "Show me it works. Then we talk about more teams." (sources/interviews/sponsor-hard.md:55). Nothing counted shows that follow-ups are the larger share of format days. The strategy marks that as an assumption (product/strategy.md:35-36).
- **Counter-evidence:** "Follow-up bookings take months to show; within one measurement window they are not visible." (product/constraints.md:42). The website cannot reach use in daily work. It "can ask about that in the follow-up; it cannot cause it" (product/constraints.md:58). So two of the three drivers sit mostly outside this repo.
- **Gaps:** No counted split of new and follow-up bookings. No field links a booking to an earlier one. No source yet for "brings own task". The academy's booking records could fill the split. They are not in this repo.

## Assumptions in this tree
| Assumption | Where in the tree | What would test it |
|---|---|---|
| More website visits lead to more inquiries started | Branch A, first driver | `page_view` against `inquiry_started` per month, once data/ exists |
| Sponsors who can name a success line book more often (product/strategy.md:16) | Branch A, link from drivers to bookings | `success_line_filled` against `booking_confirmed` per inquiry. Reported, not attributed. |
| Each new booking adds format days. Days per booking are not counted. | Branch A, link to the goal | A count of format days per booking from booking records |
| Bringing their own task makes use in daily work more likely | Branch B, first driver | Expectations survey answers against the four-week follow-up answers |
| An answered follow-up shows use in daily work, not only a responsive sponsor | Branch B, second driver | Read the follow-up answers, not only whether one came back |
| Reported use in daily work drives follow-up bookings (product/strategy.md:21) | Branch B, link from drivers to follow-up bookings | `followup_answered` content against later `booking_confirmed` of the same customer |
| Follow-up bookings are the largest share of potential format days (product/strategy.md:35-36) | Branch B against Branch A | A counted split of bookings into new and follow-up |

## Not measured yet
- Website visits: `page_view`, no export in data/ yet
- Inquiries started per month: `inquiry_started`, no export in data/ yet
- Inquiry completion rate: `inquiry_started` and `inquiry_submitted`, no export in data/ yet
- Inquiry to booking conversion: `scoping_call_booked` and `booking_confirmed`, no export in data/ yet
- Participants who bring their own task: no event. Would come from the expectations survey or the trainer.
- Follow-up answered after four weeks: `followup_answered`, no export in data/ yet
- Follow-up booking within six months: no field links a booking to an earlier booking of the same customer

## Branch to work on
Branch to work on: ____ (human decides)
Decided by: ____ · Date: ____ · Why: ____
