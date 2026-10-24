# KPI tree

> Drawn by an agent (`kpi-tree` skill) from product/strategy.md and the event names in data/ (synthetic). Date: 2026-08-18.

A KPI tree breaks one business goal into numbers the team can move.
A branch is one way the goal can grow.
A driver is something people do that you can count, and that moves a branch.

## Your first try
Find website, Open website, read stuff, open form, fill form, schedule call, decide on detials, book. I think most people dont even get to the form

Where the tree differs:
- "Read stuff" has no driver of its own. The data sees only whether a visit opens the inquiry page.
- "Decide on details" has no event. The data goes straight from call to booking.

## Tree
- Business goal: more booked in-house workshops per quarter (product/strategy.md:8)
  - Branch A: inquiries that end in a booking (product/strategy.md:12)
    - website visits: number of visits to any page of the website · measured: visits with a `page_view`
    - reach rate: percentage of website visits that open the inquiry page · measured: visits with a `page_view` of the inquiry page ÷ all visits
    - start rate: percentage of inquiry page visits that start the form · measured: `inquiry_started` ÷ inquiry page visits
    - submit rate: percentage of started forms that are sent · measured: `inquiry_submitted` ÷ `inquiry_started`
    - call rate: percentage of sent inquiries that get a scoping call · measured: `scoping_call_booked` ÷ `inquiry_submitted`
    - booking rate: percentage of scoping calls that end in a booking · measured: `booking_confirmed` ÷ `scoping_call_booked`
  - Branch B: follow-up bookings, not this quarter (product/strategy.md:35)

## How branch A works
bookings = website visits × reach rate × start rate × submit rate × call rate × booking rate

Events are in data/events.jsonl. In this data every visit has exactly one page view.
