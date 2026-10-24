# KPI tree

> Assessment by an agent (`kpi-tree` skill), not a decision. Date: 2026-10-24.
> Reads: product/strategy.md, product/constraints.md (cited by the strategy), CLAUDE.md, data/ (not present: only `.gitkeep`)
> Event names below are the ones the site already defines (site/components/events.js:2-11). No export of them exists yet, so no driver has a counted value.

## Business goal
"more booked in-house format days per quarter" (product/strategy.md:8, section Business goal)

Countable: yes, booked format days per quarter. No counted baseline exists (CLAUDE.md, section Key Metrics: "[TODO: no counted baseline yet]").

## Tree
```
Business goal: more booked in-house format days per quarter
├── Branch A: new bookings
│   ├── inquiries started per month           measured: not measured yet, would come from `inquiry_started` in data/events.jsonl
│   ├── inquiry completion rate (started to submitted)
│   │                                          measured: not measured yet, would come from `inquiry_started` and `inquiry_submitted` in data/events.jsonl
│   ├── inquiry to scoping call conversion     measured: not measured yet, would come from `scoping_call_booked` in data/events.jsonl or data/inquiries.csv
│   └── scoping call to booking conversion     measured: not measured yet, would come from `booking_confirmed` in data/events.jsonl
│        [assumption: each new booking adds format days in proportion to its format; days per booking are not counted anywhere]
│        [assumption: sponsors who can name a success line book more often] (strategy, line 16)
└── Branch B: follow-up bookings
    ├── participants who bring their own task to the session
    │                                          measured: not measured yet, would come from the expectations survey in sponsor preparation (site/sponsor-prep.html) or the trainer, not from the website
    ├── follow-up answered four weeks after the training
    │                                          measured: not measured yet, would come from `followup_answered` in data/events.jsonl
    └── follow-up booking within six months    measured: not measured yet, would come from `booking_confirmed` linked to a customer with an earlier booking; no field for that link exists yet
         [assumption: a participant bringing their own task makes use in daily work more likely]
         [assumption: an answered follow-up is a sign of use in daily work, not only of a responsive sponsor]
         [assumption: reported use in daily work drives follow-up bookings] (strategy, line 21)
```

## Branches
### Branch A: new bookings
- **Source:** "A sponsor inquires through the website, has a scoping call, books." (product/strategy.md:14), with the drivers "inquiries started per month; inquiry completion rate (started to submitted); inquiry to" (product/strategy.md:15)
- **Assessment:** partly supported
- **Reasoning:** The strategy names this lever and its drivers explicitly (product/strategy.md:14-16), and a new booking adds format days by definition. The step from website drivers to bookings is not supported by anything counted: `data/` is empty, and the strategy's own causal link for this branch is marked as an assumption (product/strategy.md:16).
- **Counter-evidence:** The constraints say the inquiry volume is too small to attribute bookings to a website change, though that volume itself is an assumption (product/constraints.md:37-39). The strategy argues the first booking is "what fails today" (product/strategy.md:33), which points to Branch B rather than more inquiries.
- **Gaps:** No count of inquiries, conversions or bookings; fills once `data/events.jsonl` and `data/inquiries.csv` exist (product/strategy.md:51). Days per booking are not counted anywhere; the person who runs scoping calls could say which formats get booked.

### Branch B: follow-up bookings
- **Source:** "A customer who has booked once books again: more days, more teams," (product/strategy.md:18), with the drivers "participants who bring their own task to the session; follow-up" (product/strategy.md:19-20)
- **Assessment:** partly supported
- **Reasoning:** The strategy names this as the biggest lever and backs it with sponsor quotes, for example "Show me it works. Then we talk about more teams." (sources/interviews/sponsor-hard.md:55, cited at product/strategy.md:28). That supports that sponsors tie further bookings to effect. It does not show that follow-ups are the larger share of format days: the strategy marks that as an assumption with "no counted split of bookings into new and follow-up" (product/strategy.md:35-36).
- **Counter-evidence:** "Follow-up bookings take months to show; within one measurement window they are not visible." (product/constraints.md:42). The website "Cannot reach" use in daily work; it "can ask about that in the follow-up; it cannot cause it" (product/constraints.md:57-58), so two of the three drivers sit mostly outside what this repo can change.
- **Gaps:** No counted split of new versus follow-up bookings; no field that links a booking to an earlier one; no source yet for "brings own task". The academy's booking records could fill the split (not in this repo).

## Assumptions in this tree
| Assumption | Where in the tree | What would test it |
|---|---|---|
| Sponsors who can name a success line book more often (product/strategy.md:16) | Branch A, link from drivers to bookings | `success_line_filled` against `booking_confirmed` per inquiry, once data/ exists; reported, not attributed |
| Each new booking adds format days in proportion to its format; days per booking are not counted | Branch A, link to the goal | A count of format days per booking from booking records |
| Reported use in daily work drives follow-up bookings (product/strategy.md:21) | Branch B, link from drivers to follow-up bookings | `followup_answered` content against later `booking_confirmed` of the same customer |
| A participant bringing their own task makes use in daily work more likely | Branch B, first driver | Expectations survey answers against the four-week follow-up answers |
| An answered follow-up signals use in daily work, not only a responsive sponsor | Branch B, second driver | Read the follow-up answers, not only whether one came back |
| Follow-up bookings are the largest share of potential format days (product/strategy.md:35-36) | Branch B against Branch A | A counted split of bookings into new and follow-up |

## Not measured yet
- Inquiries started per month: `inquiry_started`, no export in data/ yet
- Inquiry completion rate: `inquiry_started` and `inquiry_submitted`, no export in data/ yet
- Inquiry to scoping call conversion: `scoping_call_booked`, no export in data/ yet
- Scoping call to booking conversion: `booking_confirmed`, no export in data/ yet
- Participants who bring their own task: no event; would come from the expectations survey or the trainer
- Follow-up answered after four weeks: `followup_answered`, no export in data/ yet
- Follow-up booking within six months: no field linking a booking to an earlier booking of the same customer

## Branch to work on
Branch to work on: ____ (human decides)
Decided by: ____ · Date: ____ · Why: ____
