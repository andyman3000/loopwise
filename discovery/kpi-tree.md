# KPI tree

> Drawn by an agent (`kpi-tree` skill) from product/strategy.md and the event names in data/ (synthetic). Date: 2026-08-18.

A KPI tree breaks one business goal into numbers the team can move.
A branch is one way the goal can grow.
A driver is something people do that you can count, and that moves a branch.

## Your first try
Find website, Open website, read stuff, open form, fill form, schedule call, decide on detials, book. I think most people dont even get to the form

Where the tree differs:
- The tree starts at the inquiry page. Finding the website and reading other pages are not in the strategy's path.
- "Decide on details" has no event. The data goes straight from call to booking.

## Tree
- Business goal: more booked in-house workshops per quarter (product/strategy.md:8)
  - Branch A: inquiries that end in a booking (product/strategy.md:12)
    - inquiry page views · measured: `page_view` with page `inquiry` in data/events.jsonl
    - start rate: inquiries started per inquiry page view · measured: `inquiry_started` in data/events.jsonl
    - submit rate: inquiries submitted per inquiry started · measured: `inquiry_submitted` in data/events.jsonl
    - call rate: scoping calls per inquiry submitted · measured: `scoping_call_booked` in data/events.jsonl
    - booking rate: bookings per scoping call · measured: `booking_confirmed` in data/events.jsonl
  - Branch B: follow-up bookings, not this quarter (product/strategy.md:35)

## How branch A works
bookings = inquiry page views × start rate × submit rate × call rate × booking rate
