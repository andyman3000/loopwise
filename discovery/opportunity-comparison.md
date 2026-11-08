# Opportunity comparison

> Assessment by an agent (`compare-opportunities`), not a decision. Date: 2026-08-18.
> Inputs: `discovery/opportunities/interviews.md`, `discovery/kpi-tree.md`.
> Material: real conversations, anonymised composites (file headers in `sources/interviews/`).
> `discovery/opportunities/data.md` was not written. Funnel counts come from
> `data/events.jsonl` (26 weeks, 2026-02-18 to 2026-08-18) and cite that file.
> Only one source group was processed (interviews). Every Branch A candidate rests on one voice.
> The shortlist is carried as "best of a weak pool, one voice each".

Drawn as a tree at `http://localhost:3000/discovery/tree`.

## What you decide
Question: Which need do we work on for the next eight weeks?
Appears favoured: C3, because it sits on the largest absolute loss on Branch A (3026 of 3766 sessions do not open the inquiry page, `data/events.jsonl`) and the proof the hard sponsor asks for is well supported on Branch B (interviews O6, four participant voices on carrying something concrete back). A reading of the comparison, not a choice.
Not readable from today's data: none. All four drivers have a direct event in `data/events.jsonl`.
No candidate: call book rate (58 of 113 submitted inquiries do not book a call, `data/events.jsonl`); booking rate (32 of 55 booked calls do not end in a booking, `data/events.jsonl`). Open research questions, not candidates.

## Your first try
Jan: "o2 seems crucial, trust is important for prospects to fill out the form"
Matches: C1
Where the draft differs:
- The draft does not favour C1. It favours C3.
- C1 rests on one hard sponsor voice. "Crucial" overstates it.
- C1's driver (start rate, 546 of 740 lost) is smaller than C3's (3026 of 3766 lost at open rate).

## Tree
Outcome: more booked in-house workshops per quarter (`product/strategy.md:8`)
Branch: Branch A: more inquiries that end in a booking (`product/strategy.md:12`)
- website visits: 3766 sessions (`data/events.jsonl`) · Candidates: none
- inquiry page open rate: 3026 of 3766 sessions do not open the inquiry page (`data/events.jsonl`) · Candidates: C3, C4
- start rate: 546 of 740 inquiry page visits do not start the form (`data/events.jsonl`) · Candidates: C1
- submit rate: 81 of 194 started forms are not submitted (`data/events.jsonl`) · Candidates: C2
- call book rate: 58 of 113 submitted inquiries do not book a call (`data/events.jsonl`) · Candidates: none
- booking rate: 32 of 55 booked calls do not end in a booking (`data/events.jsonl`) · Candidates: none

## Candidates
### C1: Need to see the provider is serious before filling a general form
- **From:** interviews O2 (`sources/interviews/sponsor-hard.md:90`)
- **Evidence:** unsupported. One hard sponsor voice. Observed, not feared.
- **Leverage:** direct. The formats page and the inquiry page can carry seriousness signals.
- **Need or solution:** need. Two solutions meet it: a reference list by cohort, or quoted sponsor replies with dates.
- **Readable from today's data in 8 weeks:** `inquiry_started` and `page_view page=inquiry` fire today (194 and 740 over 26 weeks).
- **Wins on:** reach against C2 (546 at start rate vs 81 at submit rate).
- **Loses on:** closeness. Three steps from a booking, vs C2 at two steps.
- **Strongest quote:** "A general form that asks ... I don't fill in before I know the other side is serious." (`sources/interviews/sponsor-hard.md:90`)

### C2: Need to reach first contact without having to name a format up front
- **From:** interviews O1 (`sources/interviews/sponsor-soft.md:110`)
- **Evidence:** unsupported. One soft sponsor voice. Observed, not feared.
- **Leverage:** direct. The inquiry form's first question lives on the website.
- **Need or solution:** need. Two solutions meet it: a first question in the sponsor's words, or a callback request with no format named.
- **Readable from today's data in 8 weeks:** `inquiry_started` and `inquiry_submitted` fire today (194 and 113 over 26 weeks).
- **Wins on:** closeness. Two steps from a booking.
- **Loses on:** reach. 81 lost at submit rate.
- **Strongest quote:** "I opened the inquiry form and got stuck on ... That's exactly the question I can't answer." (`sources/interviews/sponsor-soft.md:110`)

### C3: Need to see what the format changes four weeks later before writing to the provider
- **From:** interviews O3 (`sources/interviews/sponsor-hard.md:82`, `:86`, `:94`)
- **Evidence:** unsupported. One hard sponsor voice, three quotes at one moment. Observed.
- **Leverage:** direct. The formats page lives on the website. Indirect support: O6 is well supported on Branch B (four participant voices on carrying something concrete back).
- **Need or solution:** need. Two solutions meet it: a before/after story per format, or a reference list the sponsor can call.
- **Readable from today's data in 8 weeks:** `page_view page=inquiry` fires today (740 over 26 weeks). Also `followup_answered` four weeks after the booking (14 answers over 26 weeks) measures what participants carried over.
- **Wins on:** reach. 3026 lost at open rate.
- **Loses on:** closeness. Four steps from a booking.
- **Strongest quote:** "none of them tells me what is different four weeks later ... I left the page open in a tab and moved on to the next provider." (`sources/interviews/sponsor-hard.md:86`)

### C4: Need to see from the formats page whether a format fits her group
- **From:** interviews O4 (`sources/interviews/sponsor-soft.md:106`)
- **Evidence:** unsupported. One soft sponsor voice. Observed.
- **Leverage:** direct. The formats page lives on the website.
- **Need or solution:** need. Two solutions meet it: a formats page sorted by audience and team size, or a short "which of these is us?" flow.
- **Readable from today's data in 8 weeks:** `page_view page=inquiry` fires today (740 over 26 weeks).
- **Wins on:** reach. 3026 lost at open rate.
- **Loses on:** closeness. Four steps from a booking.
- **Strongest quote:** "Five formats... I sat there and thought, which of these is us? I couldn't tell." (`sources/interviews/sponsor-soft.md:106`)

## Evidence
### C1: see provider is serious before filling a general form
- **Evidence strength:** one hard sponsor voice (`sources/interviews/sponsor-hard.md:90`). Observed, not feared. He closed the tab and sent three mail questions instead. Counter-evidence in this source: none (`discovery/opportunities/interviews.md:52`). Gaps: no second hard sponsor voice in this source (`discovery/opportunities/interviews.md:53`). The three other source groups (emails, feedback, inbox) were not processed.
- **Leverage:** Branch A, driver *start rate* (`discovery/kpi-tree.md:20`; `discovery/opportunities/interviews.md:51`). The website can carry seriousness signals before the form. Direct.
- **Where in the funnel:** start rate: 546 of 740 inquiry page visits do not start the form (`data/events.jsonl`). Of those who do start, 23 of 194 end in a booking (`data/events.jsonl`). Could also sit on inquiry page open rate [assumption: a sponsor who does not trust the provider may not open the inquiry page at all].
- **Need or solution:** need. Two solutions meet it: a reference list by cohort on the formats page, or quoted sponsor replies with dates. The quote "I'd rather send three precise questions by mail" (`sources/interviews/sponsor-hard.md:90`) names one shape; the need underneath is to verify seriousness before committing.
- **Readable from today's data (8 weeks):** `inquiry_started` on Branch A (194 over 26 weeks). Also `inquiry_submitted` (113 over 26 weeks) as a downstream signal on the same page.
- **Gaps and uncertainty:** the data cannot tell how many of the 546 who did not start left for trust reasons (C1) vs clarity reasons (C2). A short exit question on the inquiry page, or academy staff reading mail replies, could answer this.

### C2: reach first contact without having to name a format
- **Evidence strength:** one soft sponsor voice (`sources/interviews/sponsor-soft.md:110`, `:114`). Observed, not feared. She opened the form and closed it. Counter-evidence in this source: the hard sponsor also will not fill the form, for a different reason (`sources/interviews/sponsor-hard.md:90`). Gaps: no second sponsor voice in this source (`discovery/opportunities/interviews.md:41`).
- **Leverage:** Branch A, driver *submit rate* (`discovery/kpi-tree.md:20`; `discovery/opportunities/interviews.md:39`). The inquiry form's first question lives on the website. Direct.
- **Where in the funnel:** submit rate: 81 of 194 started forms are not submitted (`data/events.jsonl`). Of those who do submit, 23 of 113 end in a booking (`data/events.jsonl`).
- **Need or solution:** need. Two solutions meet it: a first question in the sponsor's words ("describe the people"), or a callback request with no format named. The quote "Someone who asks me the questions" (`sources/interviews/sponsor-soft.md:114`) names one shape; others would also meet the need.
- **Readable from today's data (8 weeks):** `inquiry_started` and `inquiry_submitted` fire today (194 and 113 over 26 weeks).
- **Gaps and uncertainty:** the data cannot tell how many of the 81 who did not submit closed on the first question vs other questions. A session recording, or a field-level drop signal, could answer this.

### C3: see what the format changes four weeks later
- **Evidence strength:** one hard sponsor voice, three quotes at one moment (`sources/interviews/sponsor-hard.md:82`, `:86`, `:94`). Observed, not feared. He moved on to the next provider. Counter-evidence in this source: the soft sponsor calls after-state "very soft points ... not a hard return on investment" (`sources/interviews/sponsor-soft.md:63`). She would not look for a hard outcome on the formats page. Gaps: nothing in the interviews shows what wording of "what changes afterwards" would have kept him on the page (`discovery/opportunities/interviews.md:67`).
- **Leverage:** Branch A, driver *inquiry page open rate* (`discovery/kpi-tree.md:18`; `discovery/opportunities/interviews.md:65`). The formats page lives on the website. Direct. Cross-branch support: O6 is well supported on Branch B (four participant voices on carrying something concrete back, `discovery/opportunities/interviews.md:98-110`). What the sponsor asks about from the outside is what participants say they want from the inside.
- **Where in the funnel:** inquiry page open rate: 3026 of 3766 sessions do not open the inquiry page (`data/events.jsonl`). Of those who do open, 23 of 740 end in a booking (`data/events.jsonl`). Largest absolute loss on Branch A.
- **Need or solution:** need. Two solutions meet it: a before/after story per format, or a reference list the sponsor can call. The quote "A comparable company I can call" (`sources/interviews/sponsor-hard.md:94`) names one shape; others would also meet the need.
- **Readable from today's data (8 weeks):** `page_view page=inquiry` fires today (740 over 26 weeks). Also `followup_answered` on Branch B, around four weeks after the booking (14 over 26 weeks, `data/events.jsonl`), measures what participants carried over. That is the thing C3 asks to be shown.
- **Gaps and uncertainty:** the data cannot tell how many of the 3026 saw the formats page at all. A split by first page, readable from `page_view`, could answer this. The sponsor's pattern was not checked in the other three source groups.

### C4: see from the formats page whether a format fits her group
- **Evidence strength:** one soft sponsor voice (`sources/interviews/sponsor-soft.md:106`). Observed. She closed the tab. Counter-evidence in this source: none (`discovery/opportunities/interviews.md:78`). Gaps: nothing tests what a formats page sorted by "who it is for" would do (`discovery/opportunities/interviews.md:79`).
- **Leverage:** Branch A, driver *inquiry page open rate* (`discovery/kpi-tree.md:18`; `discovery/opportunities/interviews.md:77`). The formats page lives on the website. Direct.
- **Where in the funnel:** inquiry page open rate: 3026 of 3766 sessions do not open the inquiry page (`data/events.jsonl`). Of those who do open, 23 of 740 end in a booking (`data/events.jsonl`).
- **Need or solution:** need. Two solutions meet it: a formats page sorted by audience and team size, or a short "which of these is us?" flow.
- **Readable from today's data (8 weeks):** `page_view page=inquiry` fires today (740 over 26 weeks).
- **Gaps and uncertainty:** same as C3. The data cannot tell how many of the 3026 saw the formats page.

## Shortlist
Confirmed by Jan, 2026-08-18: C1 (interviews O2), C2 (interviews O1), C3 (interviews O3), C4 (interviews O4). "Best of a weak pool, one voice each."
Proposed by the agent: confirmed as proposed.
Strong, but parked:
- interviews O5: Branch B (not this quarter). Partly supported (two participant voices on the pre-day gap).
- interviews O6: Branch B (not this quarter). Well supported (four participant voices on carrying something concrete back).
- interviews O7: Branch B (not this quarter). Unsupported (one participant voice on a sit-alongside shape).
- interviews O8: Branch B (not this quarter). Partly supported (two participant voices on a shared team setup).
- interviews O9: Branch B (not this quarter). Well supported (three participant voices on setup friction during the day).
- interviews O10: Branch B (not this quarter). Well supported (three participant voices on a lost first morning).

Dropped:
- none from Branch A. Nothing passes the strict keep test on one source group; the shortlist is carried under the "weak pool" label instead.

## Challenger (on the favoured row)

**Counter-evidence to C3:**
- "Those are very soft points, I know. It's not a hard return on investment." (`sources/interviews/sponsor-soft.md:63`): a soft sponsor says the opposite. She would not look for a hard after-state on the formats page.

**Counter-evidence to C1 (Jan's favourite, differs from the favoured row):**
- No other voice in this source says the same. 194 sessions did start the form in 26 weeks (`data/events.jsonl`). Some sponsors fill it without the seriousness signal C1 asks for.

**Leading questions:**
- C3: "What did you find on ours?" (`sources/interviews/sponsor-hard.md:84`) before the strongest C3 quote. Open, not leading.
- C1: "Did you write to anyone?" (`sources/interviews/sponsor-hard.md:88`) before the strongest C1 quote. Open, not leading.
- C2: "Did you come back?" (`sources/interviews/sponsor-soft.md:108`) before the strongest C2 quote. Open.
- C4: "And?" (`sources/interviews/sponsor-soft.md:104`) before the strongest C4 quote. Open.
- No voice from emails, feedback or inbox was processed. There is no unprompted check for any candidate.

**Wins on, loses on:**
- C3: wins on reach (3026 of 3766 at open rate). Loses on closeness. Four steps from a booking; of 3766 sessions, 23 end in one.
- C1: wins on reach against C2 (546 vs 81) and on closeness against C3 and C4 (three steps vs four). Loses on closeness against C2 (three vs two steps).

**What would make another candidate the better choice:**
- "I opened the inquiry form and got stuck on ... That's exactly the question I can't answer." (`sources/interviews/sponsor-soft.md:110`): a change to the form's first question could move both C1 and C2 at once. The two drivers together hold 627 losses (546 at start, 81 at submit). If the first question were in the sponsor's words, both the trust worry and the clarity worry might ease.
- O6 is well supported on Branch B (`sources/interviews/participants-group-1.md:35`, `:47`, `:51`; `sources/interviews/participants-group-2.md:43`; `sources/interviews/participants-group-3.md:25`). A "four weeks later, what changed" story on the formats page would bring the participant signal onto Branch A. C3 would gain, because the inside voice matches the sponsor's ask.

**Could not check:**
- Whether the 546 who did not start, or the 81 who started but did not submit, did so for trust reasons (C1), clarity reasons (C2), or a reason no source names. A short exit question on the inquiry page, or academy staff reading mail replies, could answer this.
- Whether the hard sponsor pattern at `sources/interviews/sponsor-hard.md:94` ("A comparable company I can call") holds across sponsors. The three other source groups (emails, feedback, inbox) were not processed.

## Decision (human)

Chosen opportunity: C1 (interviews O2: need to see the provider is serious before filling a general form). Decided by Jan, 2026-08-18.
We would switch if: ____ (a finding, and the candidate you would switch to)
