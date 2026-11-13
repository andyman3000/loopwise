# Opportunities from data

> Assessment by an agent (`opportunities-from-source` skill), not a decision. Date: 2026-11-13.
> Reads: data/events.jsonl, data/inquiries.csv, data/README.md, discovery/kpi-tree.md, product/personas/
> Synthetic data: every row in data/ is invented (data/README.md). Every count below repeats that label.

> Observations, not opportunities: usage data shows where people drop out, not why.

An opportunity is a customer need or pain the team could address.
A KPI branch is one way the business goal can grow.
A driver is something people do that you can count, and that moves a branch.

## Your first try
"people struggle on the way when filling out the form, its just not clear what makes them struggle" · Where the draft differs:
- The draft says 81 of 194 started forms are not sent. It does not say the people struggled.
- The data has no event inside the form, so it cannot show where in the form people stop.
- The draft also counts the steps before the form. More visits stop there than inside the form.

Feedback:
- Strong: you kept "where" and "why" apart. You said the data does not tell what makes people stop.
- Weak: "struggle" is already a reason. People may also stop because they are not ready, or only looked.
- Weak: "on the way" reads more into the count than it holds. No event shows a step inside the form.

## Observations

How a visit is counted: one `session` is one visit (data/README.md).
A visit that opens the inquiry page first sees one to three of the home, formats and sponsor preparation pages (data/README.md).
So every split below compares visits that saw a page with visits that did not.
The numbers are small. A gap of a few visits can come from chance.

### D1: 3766 visits came to the website in 26 weeks
- **Count:** 3766 visits with a `page_view` (data/events.jsonl, 2026-02-18 to 2026-08-18, synthetic)
- **Driver:** website visits
- **Why:** unknown from this data. Could be explained by: `sources/interviews` and `sources/inquiry-mails` (how sponsors say they found the academy).

### D2: 3026 of 3766 visits never open the inquiry page
- **Count:** 740 of 3766 visits open the inquiry page (19.6 percent). 3026 visits never do (`page_view` of the inquiry page ÷ all visits with a `page_view`, data/events.jsonl, 2026-02-18 to 2026-08-18, synthetic)
- **Split by pages seen before:**

  | Page seen | Saw it: open inquiry page | Did not see it: open inquiry page |
  |---|---|---|
  | home | 435 of 2054 (21.2 percent) | 305 of 1712 (17.8 percent) |
  | formats | 376 of 2291 (16.4 percent) | 364 of 1475 (24.7 percent) |
  | sponsor preparation | 334 of 1527 (21.9 percent) | 406 of 2239 (18.1 percent) |

  Visits that saw the formats page open the inquiry page less often than visits that did not.
- **Driver:** reach rate
- **Why:** unknown from this data. Could be explained by: `sources/interviews` (what sponsors look for before they contact an academy), `sources/inquiry-mails` (what people write instead of using the form).

### D3: 546 of 740 inquiry page visits never start the form
- **Count:** 194 of 740 inquiry page visits start the form (26.2 percent). 546 do not (`inquiry_started` ÷ `page_view` of the inquiry page, data/events.jsonl, 2026-02-19 to 2026-08-18, synthetic)
- **Split by pages seen before:**

  | Page seen | Saw it: start the form | Did not see it: start the form |
  |---|---|---|
  | home | 112 of 435 (25.7 percent) | 82 of 305 (26.9 percent) |
  | formats | 104 of 376 (27.7 percent) | 90 of 364 (24.7 percent) |
  | sponsor preparation | 88 of 334 (26.3 percent) | 106 of 406 (26.1 percent) |

  The pages seen before make little difference at this step.
- **Driver:** start rate
- **Why:** unknown from this data. Could be explained by: `sources/interviews` (what sponsors need to know before they ask), `sources/inbox` (questions about the inquiry page).

### D4: 81 of 194 started forms are never sent
- **Count:** 113 of 194 started forms are sent (58.2 percent). 81 are not (`inquiry_submitted` ÷ `inquiry_started`, data/events.jsonl, 2026-02-19 to 2026-08-18, synthetic)
- **Split by pages seen before:**

  | Page seen | Saw it: send the form | Did not see it: send the form |
  |---|---|---|
  | home | 66 of 112 (58.9 percent) | 47 of 82 (57.3 percent) |
  | formats | 62 of 104 (59.6 percent) | 51 of 90 (56.7 percent) |
  | sponsor preparation | 51 of 88 (58.0 percent) | 62 of 106 (58.5 percent) |

  The pages seen before make little difference at this step.
  The data has no `inquiry_step_completed` event, so it cannot show where inside the form people stop.
- **Driver:** submit rate
- **Why:** unknown from this data. Could be explained by: `sources/inbox` (support requests about the form), `sources/inquiry-mails` (inquiries sent by mail instead), `sources/interviews` (what sponsors cannot answer yet when they inquire).

### D5: 58 of 113 sent inquiries get no scoping call
- **Count:** 55 of 113 sent inquiries get a scoping call (48.7 percent). 58 do not (`scoping_call_booked` ÷ `inquiry_submitted`, data/events.jsonl, 2026-02-19 to 2026-08-15, synthetic). data/inquiries.csv shows the same 55 of 113.
- **Split by pages seen before:**

  | Page seen | Saw it: get a scoping call | Did not see it: get a scoping call |
  |---|---|---|
  | home | 35 of 66 (53.0 percent) | 20 of 47 (42.6 percent) |
  | formats | 26 of 62 (41.9 percent) | 29 of 51 (56.9 percent) |
  | sponsor preparation | 27 of 51 (52.9 percent) | 28 of 62 (45.2 percent) |

  Inquiries from visits that saw the formats page get a scoping call less often.
  The export shows the state on 2026-08-18 (data/README.md). The last scoping call is on 2026-08-09. Two inquiries came after it and have no call yet.
- **Driver:** call rate
- **Why:** unknown from this data. Could be explained by: `sources/inquiry-mails` (what the inquiry says and how the academy answers), `sources/interviews` (why a sponsor does or does not take the call).

### D6: 32 of 55 scoping calls end without a booking
- **Count:** 23 of 55 scoping calls end in a booking (41.8 percent). 32 do not (`booking_confirmed` ÷ `scoping_call_booked`, data/events.jsonl, 2026-02-23 to 2026-08-18, synthetic). data/inquiries.csv shows the same 23.
- **Split by pages seen before:**

  | Page seen | Saw it: book | Did not see it: book |
  |---|---|---|
  | home | 13 of 35 (37.1 percent) | 10 of 20 (50.0 percent) |
  | formats | 13 of 26 (50.0 percent) | 10 of 29 (34.5 percent) |
  | sponsor preparation | 8 of 27 (29.6 percent) | 15 of 28 (53.6 percent) |

  Calls from visits that saw the sponsor preparation page end in a booking less often.
  Calls from visits that saw the formats page end in a booking more often.
  The export shows the state on 2026-08-18. Recent calls may still turn into bookings.
- **Driver:** booking rate
- **Why:** unknown from this data. Could be explained by: `sources/interviews` (what sponsors need to decide after the call), `sources/feedback` (what booked sponsors say about the result).

Observations go into the comparison only together with an opportunity from another source.

## Goes into comparison
Goes into comparison: ____ (human confirms the shortlist in compare-opportunities)
Decided by: ____ · Date: ____
