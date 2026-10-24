# Opportunity comparison

> Assessment by an agent (`compare-opportunities`), not a decision. Date: 2026-08-18.
> Inputs: discovery/opportunities/interviews.md, emails.md, inbox.md, feedback.md, data.md, discovery/kpi-tree.md
> Material: interviews and feedback free text are anonymised composites; mails, inbox and data are synthetic. This file repeats that label.

Drawn as a tree at `http://localhost:3000/discovery/tree`.

An opportunity is a need or pain of a customer that, if we serve it, could move a number in the KPI tree.
A KPI branch is one way the business goal can grow. A driver is a step people take that we can count.

## What you decide
Question: Which need do we work on for the next eight weeks?
Appears favoured: C2, because it has the most sponsor voices (6) in the most source groups (3) and acts on the website, early in the funnel. A reading of the comparison, not a choice.
Not readable from today's data: C1, C3. Both show mainly in `booking_confirmed`, 23 events in 26 weeks (data.md D6).
No candidate: reach rate: 3026 of 3766 visits never open the inquiry page (data.md D1), only C2 as an assumption. Open research question, not a candidate.

## Your first try
"Sponsors fear the training fades like the last one and nothing changes" if we create trust, we can really solve this, we would increase calls and bookins
Matches: C1
Where the draft differs:
- Same candidate is in the shortlist (C1). The comparison favours C2: more sponsor voices in more sources, and it acts on the website.
- Your reason adds calls. The files put this fear on booking rate only. The fearful mail sender offered a call anyway: "Happy to explain more in a call." (sources/emails/inquiry-04.md:20).
- "Create trust" is a way to meet the need, not the need. Whether trust settles the fear is not in any source.

## Tree
Outcome: more booked in-house workshops per quarter (product/strategy.md:8)
Branch: Branch A: inquiries that end in a booking (product/strategy.md:12)
- website visits: 3766 visits, the top of the funnel (data.md D1) · Candidates: none
- reach rate: 3026 of 3766 visits never open the inquiry page (data.md D1) · Candidates: C2 (assumed)
  - Data: of visits that see the formats page, 376 of 2291 open the inquiry page, of the others 364 of 1475 (data.md D2)
- start rate: 546 of 740 inquiry page visits leave without starting the form (data.md D3) · Candidates: C2
- submit rate: 81 of 194 started forms are not sent (data.md D4) · Candidates: C2
- call rate: 58 of 113 sent inquiries get no call (data.md D5) · Candidates: C2, C3
- booking rate: 32 of 55 scoping calls end without a booking (data.md D6) · Candidates: C1, C2, C3

## Candidates
### C1: Sponsor fears the training fades like the last one
- **From:** interviews O3 + emails O3
- **Evidence:** well supported: 2 source groups, 3 sponsors plus 1 participant, lived, not only feared
- **Leverage:** partly supported: indirect, the fear is settled in the call, off the website
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** unsupported: `booking_confirmed`, 23 events in 26 weeks; also `followup_answered`, 14 answers, 28 to 31 days after the booking, Branch B
- **Wins on:** both sponsors say it in their own words, from lived experience
- **Loses on:** acts only on the last step, and 23 bookings are too few to read
- **Strongest quote:** "Booked, everyone thought it was nice, four weeks later everything was as before." (sources/interviews/sponsor-hard.md:23)

### C2: Sponsor does not know what to ask for, or which format fits
- **From:** interviews O1 + emails O1 + inbox O1
- **Evidence:** well supported: 3 source groups, 6 sponsors, stated about themselves now
- **Leverage:** partly supported: direct, the website can change it; which driver is an assumption
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** partly supported: `inquiry_started` 194, `inquiry_submitted` 113, `scoping_call_booked` 55 in 26 weeks
- **Wins on:** most voices, most source groups, acts early where most people are
- **Loses on:** every driver link is an assumption; two of six mail senders knew their format
- **Strongest quote:** "I have budget for training this year but no clear idea what to ask for." (sources/emails/inquiry-03.md:14)

### C3: Sponsor worries one format cannot hold mixed levels
- **From:** interviews O5 + emails O4
- **Evidence:** partly supported: 2 source groups, 3 sponsors plus 3 participants, feared, not seen stopping a booking
- **Leverage:** partly supported: indirect, settled in the call; the website could show how levels are handled
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** unsupported: `booking_confirmed` 23, `scoping_call_booked` 55 in 26 weeks
- **Wins on:** concrete worry, raised by sponsors who already want to book
- **Loses on:** fewest sponsor voices; the strongest interview quote answers a leading question
- **Strongest quote:** "I am worried that one group will be bored and the other lost." (sources/emails/inquiry-06.md:14)

## Evidence
### C1: Sponsor fears the training fades like the last one
- **Evidence strength:** well supported. Two independent source groups: interviews and emails. Voices: 3 sponsors (sponsor-hard, sponsor-soft, inquiry-04) and 1 participant. Lived, not only feared: "Booked, everyone thought it was nice, four weeks later everything was as before." (sources/interviews/sponsor-hard.md:23); "But when I asked around a few weeks later, almost nobody was using any of it." (sources/emails/inquiry-04.md:14). Feared: "What I fear most: people go home with a full bag of new tricks and no reason to reach for any of them, so nothing changes." (sources/interviews/sponsor-soft.md:37). Participant: "On the day everything is great, and then the next morning you carry on exactly the way you did before." (sources/interviews/participants-group-1.md:35). Counter-evidence: the same participant says "This time, no. It was practical." (sources/interviews/participants-group-1.md:39). Gap: no source shows a sponsor who did not book because of this fear.
- **Leverage:** Branch A, booking rate (discovery/kpi-tree.md:24). Indirect: the fear is settled in the scoping call, which happens off the website. The website could show what happens after the training; the sponsor preparation page already names a "Follow-up after four weeks" (site/sponsor-prep.html:25). The link to booking rate is an assumption in both files (discovery/opportunities/interviews.md:66, discovery/opportunities/emails.md:66). The fear also belongs to Branch B, which is not this quarter (product/strategy.md:35).
- **Where in the funnel:** booking rate: 32 of 55 scoping calls end without a booking · 23 of 55 book (data.md D6).
- **Need or solution:** need. Two different solutions would each meet it: a follow-up plan the sponsor sees before booking (site/sponsor-prep.html:25), or a second touchpoint after four to six weeks: "Meeting every week, a second touchpoint after four or six weeks, going deep again." (sources/interviews/sponsor-hard.md:29).
- **Readable from today's data (8 weeks):** unsupported. The driver shows in `booking_confirmed`, 23 events in 26 weeks. A signal on Branch B measures the need itself: `followup_answered`, 14 answers in 26 weeks (6 "not-yet", 5 "using-it-sometimes", 3 "using-it-regularly", data.md D8). Each answer arrives 28 to 31 days after its booking (counted from `booking_confirmed` and `followup_answered` per session in data/events.jsonl).
- **Gaps and uncertainty:** whether the fear is what stops a booking in the call. Nothing is logged about the call (data.md D6). Academy staff who run scoping calls could answer it.

### C2: Sponsor does not know what to ask for, or which format fits
- **Evidence strength:** well supported. Three independent source groups: interviews, emails, inbox. Voices: 6 sponsors (sponsor-soft; inquiry-01, 02, 03, 04; INB-010). Stated about themselves, now: "I have no idea." (sources/interviews/sponsor-soft.md:49); "I have budget for training this year but no clear idea what to ask for." (sources/emails/inquiry-03.md:14); "I also don't know yet whether we need a workshop, a longer accompaniment or something else." (sources/emails/inquiry-02.md:21); "I looked at your formats but cannot tell which one fits: the half-day workshop, the two days, or the longer team coaching." (sources/inbox/inbox-export.md:125). Counter-evidence: "Two days, more of a getting-to-know-each-other thing." (sources/interviews/sponsor-hard.md:13); "we would like to book an AI workshop for our product and UX team, around 15 people." (sources/emails/inquiry-06.md:12); "we are interested in your hands-on workshop for product owners, about 12 participants." (sources/emails/inquiry-05.md:12).
- **Leverage:** Branch A (discovery/kpi-tree.md:18). Direct: the website can change what a sponsor sees before and inside the form, for example the field "What do you need?" (site/inquiry.html:27). The strategy names this path because "the website can change it" (product/strategy.md:15). Each file puts it on a different driver, and each link is an assumption: submit rate (discovery/opportunities/interviews.md:39), call rate (discovery/opportunities/emails.md:42), booking rate and start rate (discovery/opportunities/inbox.md:34).
- **Where in the funnel:** start rate: 546 of 740 inquiry page visits leave without starting · 23 of 194 who start book (data.md D3, D6); inbox O1: "Could also sit on start rate" (discovery/opportunities/inbox.md:34). Submit rate: 81 of 194 started forms are not sent · 23 of 113 sent inquiries book (data.md D4, D6). Call rate: 58 of 113 sent inquiries get no call · 23 of 55 with a call book (data.md D5, D6). Booking rate: 32 of 55 calls end without a booking · 23 of 55 book (data.md D6). [assumption: the need also acts on reach rate]: 3026 of 3766 visits never open the inquiry page; of visits that see the formats page, 376 of 2291 open it, of the others 364 of 1475 (data.md D1, D2).
- **Need or solution:** need. Two different solutions would each meet it: a short call where the academy asks the questions, "Then you can ask me the questions I apparently don't know to ask." (sources/emails/inquiry-03.md:16), or a way to see where the team stands first, "Is there a way to find out where the team stands before we decide?" (sources/inbox/inbox-export.md:125).
- **Readable from today's data (8 weeks):** partly supported. `inquiry_started` 194, `inquiry_submitted` 113, `scoping_call_booked` 55 events in 26 weeks; `page_view` of the inquiry page 740 visits (data.md D1, D3). Nothing is logged inside the form: `inquiry_step_completed` never occurs (discovery/opportunities/data.md:29). So the data can show a step moving, not that this need moved it.
- **Gaps and uncertainty:** which driver the need acts on. The mails were sent anyway, so they say nothing about sponsors who gave up before sending (discovery/opportunities/emails.md:44). A user test on the formats and inquiry pages with sponsors could answer it.

### C3: Sponsor worries one format cannot hold mixed levels
- **Evidence strength:** partly supported. Two independent source groups: interviews and emails. Voices: 3 sponsors (sponsor-hard, sponsor-soft, inquiry-06) and 3 participants who describe the mix. Feared: "And that the strongest are bored while the weakest drop out on the first morning." (sources/interviews/sponsor-hard.md:41); "The group won't have one level that suits everyone." (sources/interviews/sponsor-soft.md:45); "I am worried that one group will be bored and the other lost." (sources/emails/inquiry-06.md:14). inquiry-01 states the mix as a fact only: "Some of them already use chat tools, some don't." (sources/emails/inquiry-01.md:14). Counter-evidence: "In our group it was okay. Everyone took a lot away." (sources/interviews/participants-group-2.md:61); the worried sender already wants to book (sources/emails/inquiry-06.md:12).
- **Leverage:** Branch A, booking rate, could also touch call rate (discovery/opportunities/interviews.md:95). Indirect: settled in the scoping call. The website could show how a format handles mixed levels; the sponsor preparation page already has an expectations survey that asks "what they already know" (site/sponsor-prep.html:24). The link is an assumption in both files.
- **Where in the funnel:** booking rate: 32 of 55 calls end without a booking · 23 of 55 book (data.md D6). Call rate: 58 of 113 sent inquiries get no call · 23 of 55 with a call book (data.md D5, D6).
- **Need or solution:** need. Two different solutions would each meet it: split the group by level, or ask people beforehand where they stand: "Do you split into levels, or do you ask people beforehand where they stand?" (sources/emails/inquiry-06.md:16).
- **Readable from today's data (8 weeks):** unsupported. `booking_confirmed` 23 and `scoping_call_booked` 55 events in 26 weeks. `team_size` in data/inquiries.csv counts people, not levels.
- **Gaps and uncertainty:** no source says the worry stopped a booking. The day itself is training content this repo does not own (discovery/opportunities/interviews.md:97). Academy staff who run scoping calls could say how often it comes up.

## Shortlist
Confirmed by Reference decision (replace with your own), 2026-08-18: C1 fade fear (interviews O3 + emails O3); C2 does not know what to ask for (interviews O1 + emails O1 + inbox O1); C3 mixed levels (interviews O5 + emails O4)
Proposed by the agent: confirmed as proposed
Dropped:
- interviews O2: parked branch, link to the active branch is an assumption; related to emails O2, but about the next budget, not the first booking
- emails O2: partly supported in one source group only
- emails O5: partly supported in one source group only
- interviews O4 + feedback O1: parked branch, link to the active branch is an assumption
- feedback O2: parked branch, link to the active branch is an assumption; related to C1, after the training
- inbox O3: parked branch, link to the active branch is an assumption; related to C1, after the training
- feedback O3: parked branch, link to the active branch is an assumption; related to C3, on the day
- inbox O2 + feedback O4: parked branch, link to the active branch is an assumption
- inbox O4: no Branch A link

## Challenger (on the favoured row)

**Counter-evidence to C2:**
- "Two days, more of a getting-to-know-each-other thing." (sources/interviews/sponsor-hard.md:13): the hard sponsor knows her format.
- "I really want to stay open, see what comes out, and then decide that one sounds like a good direction." (sources/interviews/sponsor-soft.md:57): the soft sponsor keeps it open on purpose. Not knowing may not feel like a pain to her.
- "we would like to book an AI workshop for our product and UX team, around 15 people." (sources/emails/inquiry-06.md:12) and "we are interested in your hands-on workshop for product owners, about 12 participants." (sources/emails/inquiry-05.md:12): two of six senders know the format.
- "If a list is not how you work, maybe a 20 minute call would be easier." (sources/emails/inquiry-03.md:16): not knowing did not stop this sender from asking for a call. All four mail senders who do not know still wrote.
- Need test, harder: two of the strongest quotes ask for a thing. "do you have a price list or an overview of your formats you could send me?" (sources/emails/inquiry-03.md:12); "Is there a way to find out where the team stands before we decide?" (sources/inbox/inbox-export.md:125). The problem itself is described on the next line or the same line, so the need holds, but the quotes invite a format overview as the answer.

**Counter-evidence to C1 (the first try):**
- "This time, no. It was practical." (sources/interviews/participants-group-1.md:39): the participant who named the pattern says it did not happen this time.
- "What I got approved is a first step." (sources/interviews/sponsor-hard.md:13): the sponsor who lived the fade still booked.
- "Happy to explain more in a call." (sources/emails/inquiry-04.md:20): the fearful sender moves on to a call. Nothing here shows the fear costing a call.
- "No work on follow-up bookings." (product/strategy.md:35): part of this fear is about what happens after, which the strategy leaves for later.

**Leading questions:**
- C1: "Have you run trainings before?" (sources/interviews/sponsor-hard.md:21) before "Booked, everyone thought it was nice, four weeks later everything was as before.": open, it does not ask for a fade. sponsor-soft's fear follows "What would you not want to happen?" (sources/interviews/sponsor-soft.md:35): asked for exactly a fear. The participant volunteered it after a question to someone else: "P4, you mentioned a training earlier. What did you take from it?" (sources/interviews/participants-group-1.md:31). The mail is unprompted.
- C2: "When you picture working with someone on this, what does it look like?" (sources/interviews/sponsor-soft.md:47) before "I have no idea." (sources/interviews/sponsor-soft.md:49): open. The four mails and the inbox request are unprompted.
- C3: "Let me come back to that. What must not happen?" (sources/interviews/sponsor-hard.md:39) before "And that the strongest are bored while the weakest drop out on the first morning.": asked for exactly a fear. The mail is unprompted.

**Wins on, loses on:** C2 wins on reach: it can act where 740 inquiry page visits arrive and 194 forms start (data.md D3). It loses on closeness: of 194 who start, 23 book, against 23 of 55 for C1 and C3, which act after the call (data.md D6).

**What would make another candidate the better choice:**
- "Booked, everyone thought it was nice, four weeks later everything was as before." (sources/interviews/sponsor-hard.md:23): if call notes show sponsors stop at the call over this fear, C1 sits where the conversion is closest to a booking. The 14 `followup_answered` answers, 6 of them "not-yet" (data.md D8), already measure the fade itself, 28 to 31 days after a booking.
- "Do you split into levels, or do you ask people beforehand where they stand?" (sources/emails/inquiry-06.md:16): a concrete question the website could answer on a page that exists. If scoping calls show it comes up often, C3 is a cheap way in.

**Could not check:** what happens in scoping calls and why 32 end without a booking: academy staff who run them. Whether the six mail senders booked: the academy's inquiry records. Whether visits that see the formats page leave because they cannot tell which format fits: a user test with sponsors.

## Decision (human)

Chosen opportunity: C2: the sponsor does not know what to ask for, or which format fits. Reference decision (replace with your own). Six sponsors say it, in three kinds of source, and we can change it on the website. My first try was C1, but C1 only matters after the scoping call.
We would switch if: the people who run the scoping calls tell us that sponsors who don't book are worried the training won't last, not unsure about the format. Then we switch to C1.
