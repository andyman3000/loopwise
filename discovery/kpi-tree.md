# KPI tree

> Drawn by an agent (`kpi-tree` skill) from product/strategy.md and the event names in data/ (synthetic). Date: 2026-11-06.

A KPI tree breaks the business goal into the steps a team can move. A branch is one path to the goal. A driver is one step on the path, either a count or a rate of the step before.

## Your first try
home, see formats, inquirey form, send the form, bok a call, decide, book a format, then prepare

Where the tree differs:
- "see formats" is not a separate step in the tree; a formats visit counts as a website visit.
- The tree splits "inquiry form" into opening the page and starting the form, and treats "decide" and "book a format" as one step (booking confirmed).

## Tree
- Business goal: more booked in-house workshops per quarter (product/strategy.md:8)
  - Branch A: more inquiries that end in a booking (product/strategy.md:12)
    - website visits: number of sessions that open any page of the website · measured: sessions in `page_view`
    - inquiry page open rate: percentage of website visits that open the inquiry page · measured: `page_view` where page=inquiry ÷ sessions in `page_view`
    - start rate: percentage of inquiry page visits that start the form · measured: `inquiry_started` ÷ `page_view` where page=inquiry
    - submit rate: percentage of started forms that are submitted · measured: `inquiry_submitted` ÷ `inquiry_started`
    - call book rate: percentage of submitted inquiries that book a scoping call · measured: `scoping_call_booked` ÷ `inquiry_submitted`
    - booking rate: percentage of scoping calls that end in a booking · measured: `booking_confirmed` ÷ `scoping_call_booked`
  - Branch B: follow-up bookings, not this quarter (product/strategy.md:35)

## How branch A works
bookings confirmed = website visits × inquiry page open rate × start rate × submit rate × call book rate × booking rate

Events are in data/events.jsonl.
