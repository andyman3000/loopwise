# KPI tree

> Assessment by an agent (`kpi-tree` skill), not a decision. Date: 2026-08-18.
> Reads: product/strategy.md, CLAUDE.md, data/events.jsonl, data/inquiries.csv
> data/ is synthetic (data/README.md). Export from 2026-02-18 to 2026-08-18.

A KPI tree breaks one business goal into numbers you can count.
A branch is one way the goal can grow.
A driver is a behaviour you can count that moves a branch.

## Your first try
Find website, Open website, read stuff, open form, fill form, schedule call, decide on detials, book. I think most people dont even get to the form

Where the draft differs:
- You are right about the biggest loss. Of 740 inquiry page views, 194 start the form. 546 do not.
- But they did reach the form page. They see it and leave. The export cannot show people who never reach it.
- Your "decide on details" step has no event. The data goes straight from call to booking.

## Business goal
"more booked in-house workshops per quarter" (product/strategy.md:8, section Business goal)

## Tree
- Business goal: more booked in-house workshops per quarter
  - Branch A: inquiries that end in a booking (this quarter)
    - inquiry page views · measured: 740, `page_view` with `props.page` = `inquiry` in data/events.jsonl
    - inquiries started · measured: 194 (26.2% of page views), `inquiry_started` in data/events.jsonl
    - inquiries submitted · measured: 113 (58.2% of started), `inquiry_submitted` in data/events.jsonl
    - scoping calls booked · measured: 55 (48.7% of submitted), `scoping_call_booked` in data/events.jsonl
    - bookings confirmed · measured: 23 (41.8% of calls), `booking_confirmed` in data/events.jsonl
    - Assumption: sponsors who can name a success line before the call book more often (product/strategy.md:19)
  - Branch B: follow-up bookings (not this quarter, product/strategy.md, section What we deliberately do not do this quarter)
    - "No work on follow-up bookings." (product/strategy.md:35)

Cross-check: data/inquiries.csv has 113 rows, 55 with `scoping_call_booked` true, 23 with `booking_confirmed` true.
That matches the events. No booking in the file lacks a call.
Each event appears once per session, so counts and sessions are the same.

## Where the path loses people
Ranked by the share lost at each step.
- Largest drop: page view to started, 546 lost of 740 (73.8%).
- Second largest: call to booking, 32 lost of 55 (58.2%).
- By count, the second largest is started to submitted: 81 lost of 194 (41.8%).
- Most visitors on any page never start a form, so the largest drop may be normal and hard to move.

## Branch A: inquiries that end in a booking
- **Source:** "A sponsor finds the website, opens the inquiry form, sends it, has a scoping call, and books." (product/strategy.md:14)
- **Assessment:** partly supported
- **Reasoning:** The strategy names this path and its drivers (product/strategy.md:18). Every driver can be counted, and the two data files agree. The path loses people at every step. What is not supported is why they drop out. The strategy says so itself: "shows how many calls end without a booking, not why" (product/strategy.md:30-31).
- **Counter-evidence:** None found in the files read against working on this path. But the numbers are small. The data README says to read them "never as evidence about real sponsors" (data/README.md:16).
- **Gaps:** No event says why someone leaves the form or the call. Call and booking fields show "the state on the export date" (data/README.md:8). Late inquiries may still get a call or booking. Interviews and the person who runs scoping calls could explain the drops.

## Assumptions that matter
An assumption is a link we believe but have not checked.

| Assumption | What would test it |
|---|---|
| [assumption: sponsors who can name a success line before the call book more often] (product/strategy.md:19) | `success_line_filled` against `booking_confirmed` per inquiry, once a form asks for it |
| [assumption: calls end without a booking because the sponsor cannot say what success looks like] (product/strategy.md:29-31) | Notes from scoping calls that ended without a booking |
| [assumption: page views to started is a normal loss, not a form problem] | `inquiry_step_completed` per step, and asking sponsors who left the form |

## Step to work on
Step to work on: ____ (human decides)
Decided by: ____ · Date: ____ · Why: ____
