# KPI tree

> Drawn by an agent (`loopwise-kpi-tree` skill) from [product/strategy.md](../product/strategy.md) and the event names in data/ (synthetic). Date: 2026-11-13.

A KPI tree breaks one business goal into numbers the team can move.
A branch is one way the goal can grow.
A driver is something people do that you can count, and that moves a branch.

## Your first try
Visit the website, look at the formats, send an inquiry, hold the scoping call, booking, follow-up booking, recommend us to others

Where the tree differs:
- "Look at the formats" is no driver. The tree splits "send an inquiry" into open, start and send.
- "Follow-up booking" is branch B, parked. "Recommend us to others" has no branch and no event.

## Tree
- Business goal: more booked in-house workshops per quarter ([product/strategy.md:8](../product/strategy.md#L8))
  - Branch A: more inquiries that end in a booking ([product/strategy.md:12](../product/strategy.md#L12))
    - website visits: number of visits to any page of the website · measured: visits with a `page_view`
    - reach rate: percentage of website visits that open the inquiry page · measured: visits with a `page_view` of the inquiry page ÷ all visits
    - start rate: percentage of inquiry page visits that start the form · measured: `inquiry_started` ÷ inquiry page visits
    - submit rate: percentage of started forms that are sent · measured: `inquiry_submitted` ÷ `inquiry_started`
    - call rate: percentage of sent inquiries that get a scoping call · measured: `scoping_call_booked` ÷ `inquiry_submitted`
    - booking rate: percentage of scoping calls that end in a booking · measured: `booking_confirmed` ÷ `scoping_call_booked`
  - Branch B: follow-up bookings, not this quarter ([product/strategy.md:36](../product/strategy.md#L36))

## How branch A works
bookings = website visits × reach rate × start rate × submit rate × call rate × booking rate

Events are in [data/events.jsonl](../data/events.jsonl).
