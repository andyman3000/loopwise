# Opportunities from data

> Assessment by an agent (`opportunities-from-source` skill), not a decision. Date: 2026-10-24.
> Reads: data/events.jsonl, data/inquiries.csv, data/README.md, discovery/kpi-tree.md, product/personas/
> Material: synthetic. "Everything in this folder is synthetic." (data/README.md:3). This file repeats that label.

> Observations, not opportunities: usage data shows where people drop out, not why.

A driver is something people do that you can count, and that moves a branch of the KPI tree.
An observation here is one counted step of the tree. It turns into an opportunity only when another source says why.

## Your first try
Many people drop out here, there might be a usability problem. The form could be way too long, maybe should do "book a call" instead?

Where the draft differs:
- "Many people drop out here" is what the count shows: 81 of 194 started forms were not sent. Two other steps lose more: 546 of 740 inquiry page visits never start the form (D3), and 58 of 113 sent inquiries get no call (D5).
- "Usability problem" and "too long" are reasons, and this data cannot give reasons. The form has five fields, one of them optional (site/inquiry.html:23-27). The log has no event inside the form, so it cannot show where people stop.
- "Book a call instead" is a solution. It belongs in `intent-and-ideas`, once an opportunity says why people stop.

## Source
| File | What it holds | Basis line from the file |
|---|---|---|
| data/events.jsonl | 7508 events, one visit per session, a visit can see several pages, every event `variant` baseline | Everything in this folder is synthetic. |
| data/inquiries.csv | 113 submitted inquiries, with `sponsor_type`, `scoping_call_booked`, `booking_confirmed` | Everything in this folder is synthetic. |

Time span: 2026-02-18 to 2026-08-18, 26 weeks (data/README.md:11).
"Read them as an illustration of how a funnel is counted, never as evidence about real sponsors." (data/README.md:20-21)
A visit can see several pages and opens the inquiry page at most once, as its last page view (data/README.md:18-20). All later events of a visit sit on the inquiry page.
The event `inquiry_step_completed` never occurs, so nothing is counted inside the form.

## Observations

### D1: Most visits never open the inquiry page
- **Count:** 740 of 3766 visits open the inquiry page (`page_view` of the inquiry page ÷ all visits with a `page_view`, data/events.jsonl, 2026-02-18 to 2026-08-18). The other 3026 visits see formats in 1915 visits, home in 1619, sponsor preparation in 1193; one visit can see several of them. All 740 inquiry page visits see another page first.
- **Driver:** reach rate
- **Why:** unknown from this data. Visits are not linked to each other, so the data cannot show whether someone came back later. Could be explained by: `sources/interviews` and `sources/emails` (what a sponsor looks for before they inquire); `sources/inbox` (questions people send instead of using the form).

### D2: Visits that see the formats page open the inquiry page less often
- **Count:** of the visits that see the formats page, 376 of 2291 open the inquiry page; of the visits that do not, 364 of 1475. For the other pages it runs the other way: home 435 of 2054 against 305 of 1712, sponsor preparation 334 of 1527 against 406 of 2239 (`page_view` of each page before the inquiry page, then `page_view` of the inquiry page, data/events.jsonl, 2026-02-18 to 2026-08-18).
- **Driver:** reach rate
- **Why:** unknown from this data. It shows that visits with a formats view go on less often, not what they miss there. Could be explained by: `sources/emails` and `sources/interviews` (whether sponsors know which format fits before they inquire); `sources/inbox` (questions about formats sent by mail).

### D3: Most visits to the inquiry page leave without starting the form
- **Count:** 194 of 740 inquiry page visits start the form (`inquiry_started` ÷ `page_view` of the inquiry page, data/events.jsonl, 2026-02-18 to 2026-08-18). 546 leave without starting.
- **Driver:** start rate
- **Why:** unknown from this data. Could be explained by: `sources/emails` and `sources/interviews` (whether sponsors know what to write before they start); `sources/inbox` (requests that arrive by mail instead of the form).

### D4: Some people start the form and do not send it
- **Count:** 113 of 194 started forms are sent (`inquiry_submitted` ÷ `inquiry_started`, data/events.jsonl, 2026-02-18 to 2026-08-18). 81 are started and not sent.
- **Driver:** submit rate
- **Why:** unknown from this data. The log has no event inside the form, so it cannot show which field people stop at. The form has five fields, one optional (site/inquiry.html:23-27). Could be explained by: `sources/emails` and `sources/interviews` (what sponsors find hard to put into words, for example the field "What do you need?"); `sources/inbox` (problems with the form itself).

### D5: About half of the sent inquiries get no scoping call
- **Count:** 55 of 113 sent inquiries get a scoping call (`scoping_call_booked` ÷ `inquiry_submitted`, data/events.jsonl, 2026-02-18 to 2026-08-18).
- **Driver:** call rate
- **Why:** unknown from this data. The state is the one on the export date (data/README.md:8). Of the 6 inquiries sent from 2026-08-04 on, 2 have a call, so some of the rest may still get one. Could be explained by: `sources/emails` (sponsors who ask for material or proof before they agree to a call); `sources/inbox` (scheduling problems).

### D6: Fewer than half of the scoping calls end in a booking
- **Count:** 23 of 55 scoping calls end in a booking (`booking_confirmed` ÷ `scoping_call_booked`, data/events.jsonl, 2026-02-18 to 2026-08-18).
- **Driver:** booking rate
- **Why:** unknown from this data. Nothing is logged about what happens in the call. Could be explained by: `sources/interviews` and `sources/emails` (what a sponsor needs to hear or pass on before confirming).

### D7: Both sponsor types drop out at the same steps
- **Count:** soft sponsors: 49 inquiries, 22 calls, 8 bookings. Hard sponsors: 64 inquiries, 33 calls, 15 bookings (`sponsor_type`, `scoping_call_booked`, `booking_confirmed` in data/inquiries.csv, 2026-02-18 to 2026-08-18).
- **Driver:** call rate and booking rate
- **Why:** unknown from this data. `sponsor_type` is "a synthetic attribute that no event carries" (data/README.md:9-10), so the split exists only for sent inquiries, not for visits or started forms. Could be explained by: `sources/interviews` (the two sponsor interviews); `sources/emails` (which mails read like which sponsor type).

### D8: Few follow-up answers exist, and they sit outside this quarter
- **Count:** 14 `followup_answered` events, all about four weeks after the booking: 6 "not-yet", 5 "using-it-sometimes", 3 "using-it-regularly" (data/events.jsonl, 2026-04-26 to 2026-08-18). 23 bookings were confirmed in the same data.
- **Driver:** none in the tree. This belongs to Branch B: follow-up bookings, which the tree marks as not this quarter.
- **Why:** unknown from this data. It does not show whether those who answered "not-yet" book again. Could be explained by: `sources/feedback` and `sources/interviews` (whether people stop using what they learned in the weeks after).

Observations go into the comparison only together with an opportunity from another source.

## Goes into comparison
Goes into comparison: ____ (human decides)
Decided by: ____ · Date: ____
