# Strategy

Status: draft. Numbers appear only where they are counted from a file; everything else is marked
`[assumption: ...]`.

## Business goal

**Business goal: more booked in-house format days per quarter**

Loopwise earns on booked format days. There are two ways to get more of them.

## The two levers

**Lever A: new bookings.** A sponsor inquires through the website, has a scoping call, books.
Drivers: inquiries started per month; inquiry completion rate (started to submitted); inquiry to
scoping call to booking conversion. [assumption: sponsors who can name a success line book more often]

**Lever B: follow-up bookings.** A customer who has booked once books again: more days, more teams,
a follow-up session. Drivers: participants who bring their own task to the session; follow-up
answered four weeks after the training; follow-up booking within six months.
[assumption: reported use in daily work drives follow-up bookings]

## Why follow-up bookings are the biggest lever

Sponsors make the next booking depend on the first one working:

- "Anything beyond that, I need to show the effect." (`sources/interviews/sponsor-hard.md:13`)
- "Show me it works. Then we talk about more teams." (`sources/interviews/sponsor-hard.md:55`)
- A pilot, and if it works, "we call it a method and multiply it" (`sources/interviews/sponsor-soft.md:67`).
- Customers already ask for a follow-up session (`sources/inbox/inbox-export.md:101`) and for help
  keeping it going (`sources/inbox/inbox-export.md:113`).

And the first booking is what fails today: a training that fades after four weeks
(`sources/interviews/sponsor-hard.md:23`, `sources/emails/inquiry-04.md:14`) leaves nothing to book
again. [assumption: follow-up bookings are the largest share of potential format days; we have no
counted split of bookings into new and follow-up]

## What we deliberately do not do this quarter

- No prices on the website or in data.
- No change to the content of the training itself from this repo; the website reaches preparation
  and follow-up only.
- No new tooling: the site stays static Node without dependencies.
- No claim that a website change caused more bookings (see `product/constraints.md`).
- No chat assistant on the site and no variants generated live from specs.
- Which opportunity we pursue is not decided here. It is decided by a human in
  `discovery/decisions/`, after `compare-opportunities`.

## How we will know

- Per lever, the drivers above, counted from `data/events.jsonl` and `data/inquiries.csv` once they
  exist (synthetic). The KPI tree in `discovery/kpi-tree.md` holds them.
- For any variant we ship: a success line written before it goes live, in its test card under
  `discovery/test-cards/`, read against the data by `read-result`.
- Bookings themselves: reported, not attributed (see `product/constraints.md`).
