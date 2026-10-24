# Strategy

Status: draft. Numbers appear only where they are counted from a file; everything else is marked
`[assumption: ...]`.

## Business goal

**Business goal: more booked in-house workshops per quarter**

Loopwise earns money when a sponsor books a workshop for their team.

## This quarter: more inquiries that end in a booking

A sponsor finds the website, opens the inquiry form, sends it, has a scoping call, and books.
Each step loses people. This quarter we work on that path, because the website can change it and
`data/` can count it.

Drivers: inquiry page views; inquiries started; inquiries submitted; scoping calls booked; bookings
confirmed. [assumption: sponsors who can name a success line before the call book more often]

## Why this path

Sponsors often come without knowing what they want:

- They ask for "something with AI" for the team (`sources/emails/inquiry-03.md:14`).
- Before booking, sponsors often cannot say which format they need or how they would recognise
  success (`sources/interviews/sponsor-soft.md:49`, `sources/interviews/sponsor-hard.md:37`).

A scoping call with a sponsor who cannot say what success looks like often ends without a booking.
[assumption: the call fails for this reason; `data/` shows how many calls end without a booking, not
why]

## What we deliberately do not do this quarter

- **No work on follow-up bookings.** Customers who book again matter a lot: "Show me it works. Then
  we talk about more teams." (`sources/interviews/sponsor-hard.md:55`). But the website cannot cause
  them, and they take months to show (see `product/constraints.md`). They come back on the table
  once the inquiry path works.
- No prices on the website or in data.
- No change to the content of the training itself from this repo.
- No new tooling: the site stays static Node without dependencies.
- No claim that a website change caused more bookings (see `product/constraints.md`).
- No chat assistant on the site.
- Which step of the path we work on is not decided here. It is decided by a human in
  `discovery/kpi-tree.md` and `discovery/decisions/`.

## How we will know

- The drivers above, counted from `data/events.jsonl` and `data/inquiries.csv` (synthetic). The KPI
  tree in `discovery/kpi-tree.md` holds them.
- For any change we ship: a success line written before it goes live, in its test card under
  `discovery/test-cards/`, read against the data by `read-result`.
- Bookings themselves: reported, not attributed (see `product/constraints.md`).
