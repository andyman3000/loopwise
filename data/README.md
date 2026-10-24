# data/

**Everything in this folder is synthetic.** No real visitor, sponsor, company or booking exists behind any row.

- `events.jsonl`: one event per line (`ts`, `type`, `variant`, `session`, `props`). Every event is
  from the current inquiry form, so `variant` is always `baseline`.
- `inquiries.csv`: one row per submitted inquiry. `sponsor_type` is a synthetic attribute that no
  event carries. `scoping_call_booked` and `booking_confirmed` show the state on the export date.
- `*-live.jsonl`: written by the running site, git-ignored.

The export covers 26 weeks, from 2026-02-18 to 2026-08-18. It was taken before any change to the
inquiry form. Every date inside `discovery/` follows this timeline; commit dates only show when the
repo was built.

The numbers are small on purpose: a few inquiries a week, as for a small academy. Read them as an
illustration of how a funnel is counted, never as evidence about real sponsors.
