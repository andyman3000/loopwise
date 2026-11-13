# Opportunity comparison

> Assessment by an agent (`compare-opportunities`), not a decision. Date: 2026-08-18.
> Inputs: discovery/opportunities/interviews.md, inquiry-mails.md, inbox.md, feedback.md, data.md, discovery/kpi-tree.md
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

Drawn as a tree at `http://localhost:3000/discovery/tree`.

An opportunity is a need or a pain a customer has. It is never a solution.
A KPI branch is one way the business goal can grow.
A driver is a step people take that we can count, and that moves a branch.
Counter-evidence is a quote that speaks against the need.

## What you decide
Question: Which sponsor need before the booking do we work on for the next eight weeks?
Appears favoured: C1, because 11 sponsors in three source groups say it, three of them say it kept them from the form, and the website can change the step where 546 of 740 inquiry page visits stop. A reading of the comparison, not a choice.
Not readable from today's data: C3 and C4. Both show mainly in `scoping_call_booked` (55 in 26 weeks) and `booking_confirmed` (23 in 26 weeks).
No candidate: reach rate, 3026 of 3766 visits never open the inquiry page, and submit rate, 81 of 194 started forms are never sent. Only C1 touches them, as an assumption. Open research questions, not candidates.

## Your first try
"I'm afraid my people slip back into old habits afterwards." If we can create trust that we can do this on the site, this will help throughout the process and this is the actual outcome that the training should achieve
Matches: none
Where the draft differs:
- Your favourite is not in the comparison. The need is met in the weeks after the training, on Branch B, which is parked this quarter (`discovery/kpi-tree.md:25`).
- The nearest candidate is C4. Two sponsors want proof of a lasting effect before they book. That sits on Branch A.
- Your reason is about the training's effect. The website cannot cause that, it can only ask about it in the follow-up (`product/constraints.md:59`).

## Tree
Outcome: more booked in-house workshops per quarter (product/strategy.md:8)
Branch: Branch A: more inquiries that end in a booking (product/strategy.md:12)
- website visits: 3766 visits, the top of the funnel (`discovery/opportunities/data.md:32`) · Candidates: none
- reach rate: 3026 of 3766 visits never open the inquiry page (`discovery/opportunities/data.md:37`) · Candidates: C1 (assumed)
  - Data: of visits that see the formats page, 376 of 2291 open the inquiry page; of the others, 364 of 1475 (`discovery/opportunities/data.md:43`)
- start rate: 546 of 740 inquiry page visits never start the form (`discovery/opportunities/data.md:51`) · Candidates: C1, C2
- submit rate: 81 of 194 started forms are never sent (`discovery/opportunities/data.md:65`) · Candidates: C1 (assumed)
- call rate: 58 of 113 sent inquiries get no scoping call (`discovery/opportunities/data.md:80`) · Candidates: C3 (assumed), C4
- booking rate: 32 of 55 scoping calls end without a booking (`discovery/opportunities/data.md:95`) · Candidates: C1 (assumed), C3 (assumed), C4 (assumed)
  - Data: calls from visits that saw the sponsor preparation page end in a booking 8 of 27 times; the other calls 15 of 28 times (`discovery/opportunities/data.md:102`)

"(assumed)" means no source line ties the need to this step. The opportunity file states it only as an assumption.

## Candidates
### C1: "I can't tell which format fits my group." (sponsor, before booking)
- **From:** inquiry-mails O1 + inbox O1 + interviews O1
- **Evidence:** well supported: 3 source groups, 11 sponsors, each about their own situation now or at first contact
- **Leverage:** partly supported: direct, the website can change it; but the site already says the format is settled in the scoping call
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** partly supported: `inquiry_started` 194 and inquiry page visits 740 in 26 weeks; the data cannot say why a visit stops
- **Wins on:** most voices in most source groups; three sponsors say it kept them from the form
- **Loses on:** four sponsors knew their format; the site already answers the question and sponsors still feel stuck
- **Strongest quote:** "I didn't want to send your form with a guess in it, so I am writing instead." (sources/inquiry-mails/inquiry-07.md:18)

### C2: "I feel I must pick a format before I can send you an inquiry." (sponsor, before booking)
- **From:** inbox O3
- **Evidence:** well supported: 1 source group, 3 sponsors, each lived it on the formats page
- **Leverage:** partly supported: direct, the inquiry page can change it; but the form asks for no format today
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** partly supported: `inquiry_started` 194 of 740 inquiry page visits in 26 weeks
- **Wins on:** acts on the exact step where 546 of 740 visits stop, and the senders name that step
- **Loses on:** one source group only; it may be part of C1 rather than a need of its own
- **Strongest quote:** "I do not want to pick one just to have something to write in the form." (sources/inbox/inbox-export.md:137)

### C3: "I need something to show the people who decide with me." (sponsor, before booking)
- **From:** inquiry-mails O3 + interviews O2
- **Evidence:** well supported: 2 source groups, 5 sponsors, all in that situation now; one account of a boss is second-hand
- **Leverage:** partly supported: the website could give something to forward, but the decision happens with colleagues, off the site
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** unsupported: `scoping_call_booked` 55 and `booking_confirmed` 23 in 26 weeks
- **Wins on:** sponsors say it without being asked; it acts close to the booking
- **Loses on:** every driver link is an assumption; no source says what the people above want to see
- **Strongest quote:** "My manager asked me to come back with a proposal before the end of the month." (sources/inquiry-mails/inquiry-07.md:14)

### C4: "I want proof people work differently months later." (sponsor, before booking)
- **From:** inquiry-mails O2
- **Evidence:** partly supported: 1 source group, 2 sponsors; one lived a training that faded, one has seen offers without proof
- **Leverage:** unsupported: the website can show how the effect is checked, but it cannot cause the effect, and no proof exists yet to show
- **Need or solution:** need
- **Readable from today's data in 8 weeks:** unsupported: `scoping_call_booked` 55 in 26 weeks; `followup_answered` 14 in 26 weeks measures the need itself, on Branch B, a month after the booking
- **Wins on:** the one sponsor who makes the call depend on it says so; it is the version of your favourite that sits on this quarter's branch
- **Loses on:** fewest voices, one source group; the other sponsor offered a call anyway
- **Strongest quote:** "What I have not seen is evidence that any of it changes how people actually work three months later." (sources/inquiry-mails/inquiry-02.md:14)

## Evidence
### C1: "I can't tell which format fits my group." (sponsor, before booking)
- **Evidence strength:** well supported. Three independent source groups: inquiry mails, inbox, interviews. Voices: 11 sponsors (inquiry-01, 02, 03, 04, 07; four inbox senders; Carla and Ines). The inbox export names roles, not people, so four inbox senders is an assumption (`discovery/opportunities/inbox.md:21`). Stated about themselves: "Side by side, I can't tell which one is us." (sources/inquiry-mails/inquiry-07.md:16); "I looked at your formats but cannot tell which one fits" (sources/inbox/inbox-export.md:125); "I did not know what to choose and did not want to commit to the wrong thing." (sources/inbox/inbox-export.md:161); "One event or three, and in what order, that was the question I brought" (sources/interviews/sponsor-ines.md:49). Counter-evidence: "we would like to book an AI workshop for our product and UX team, around 15 people." (sources/inquiry-mails/inquiry-06.md:12); "we are interested in your hands-on workshop for product owners, about 12 participants." (sources/inquiry-mails/inquiry-05.md:12); "The two days, those we settled almost in the first week, the dates too." (sources/interviews/sponsor-thomas.md:21); "The shape I knew." (sources/interviews/sponsor-mehmet.md:29). Gap: every sender in this evidence wrote in the end. Sponsors who gave up silently are in no source.
- **Leverage:** Branch A (`discovery/kpi-tree.md:18`). Direct: the website can change what a sponsor reads on the formats and inquiry pages. Three sponsors tie it to the form: "I didn't want to send your form with a guess in it" (sources/inquiry-mails/inquiry-07.md:18), "I do not want to pick one just to have something to write in the form." (sources/inbox/inbox-export.md:137), "Can I talk to someone before I fill in anything?" (sources/inbox/inbox-export.md:149). The site already tells them: "The scoping call shapes the real format." (site/formats.html:21) and "You book a format after the scoping call, once we have settled together which one fits." (site/formats.html:29). So the words exist and sponsors still feel stuck. Whether other words would help is open.
- **Where in the funnel:** start rate: 546 of 740 inquiry page visits never start the form; 23 of 194 who start end in a booking (`discovery/opportunities/data.md:51`, `discovery/opportunities/data.md:95`). Submit rate, as an assumption in the interviews file (`discovery/opportunities/interviews.md:60`): 81 of 194 started forms are never sent; 23 of 113 sent inquiries end in a booking. Booking rate, same assumption: 32 of 55 calls end without a booking; 23 of 55 book. [assumption: the need also acts on reach rate]: 3026 of 3766 visits never open the inquiry page; 23 of 740 who open it book. One sponsor closed the formats page (sources/inbox/inbox-export.md:161). Of visits that see the formats page, 376 of 2291 open the inquiry page; of the others, 364 of 1475 (`discovery/opportunities/data.md:43`).
- **Need or solution:** need. Two different solutions would each meet it: a short call where the academy asks the questions, "maybe a 20 minute call would be easier." (sources/inquiry-mails/inquiry-03.md:16), or a way to see where the team stands first, "Is there a way to find out where the team stands before we decide?" (sources/inbox/inbox-export.md:125).
- **Readable from today's data (8 weeks):** partly supported. Inquiry page visits: 740 in 26 weeks. `inquiry_started`: 194 in 26 weeks, 70 in the last eight weeks of the export (counted in data/events.jsonl from 2026-06-23). `page_view` with the page name shows the formats page. Nothing is logged inside the form, and `inquiry_step_completed` never occurs (`discovery/opportunities/data.md:75`). So the data can show the start rate moving. It cannot show that this need moved it.
- **Gaps and uncertainty:** which part of the formats page leaves sponsors unsure. No sender says (`discovery/opportunities/inbox.md:40`). A walk-through of the formats and inquiry pages with sponsors could answer it.

### C2: "I feel I must pick a format before I can send you an inquiry." (sponsor, before booking)
- **Evidence strength:** well supported in one source group: the inbox. Voices: 3 sponsors (team lead, learning and development partner, product lead). Each lived it: "I do not want to pick one just to have something to write in the form." (sources/inbox/inbox-export.md:137); "Can I talk to someone before I fill in anything?" (sources/inbox/inbox-export.md:149); "Is that enough to start with, or do I need to know the format first?" (sources/inbox/inbox-export.md:161). One inquiry mail says the same, inside C1: "I didn't want to send your form with a guess in it" (sources/inquiry-mails/inquiry-07.md:18). Counter-evidence: none in the inbox. Gap: the three senders who held back still wrote to the academy.
- **Leverage:** Branch A, start rate. Direct: the inquiry page and the formats page can change it. The form has no format field today. It asks "What do you need?" (site/inquiry.html:29). The home page says the form "does not book anything." (site/index.html:26). So the belief that a format is needed comes from somewhere other than the form itself. Where, no source says.
- **Where in the funnel:** start rate: 546 of 740 inquiry page visits never start the form; 23 of 194 who start end in a booking (`discovery/opportunities/data.md:51`, `discovery/opportunities/data.md:95`).
- **Need or solution:** need. Two different solutions would each meet it: a line on the inquiry page that says a format is not needed, or a way to talk to a person before the form. The second is what one sender asks for (sources/inbox/inbox-export.md:149).
- **Readable from today's data (8 weeks):** partly supported. `inquiry_started` 194 of 740 inquiry page visits in 26 weeks, 70 in the last eight weeks. The data cannot show what a visitor believed.
- **Gaps and uncertainty:** whether this is a need of its own or the same need as C1, seen at the form. Three of the four C1 inbox senders also say C2. A walk-through of the inquiry page with sponsors could separate them.

### C3: "I need something to show the people who decide with me." (sponsor, before booking)
- **Evidence strength:** well supported. Two independent source groups: inquiry mails and interviews. Voices: 5 sponsors (inquiry-01, 02, 07; Carla and Mehmet). In that situation now: "Could you send me some information so I can forward it internally?" (sources/inquiry-mails/inquiry-01.md:18); "My manager asked me to come back with a proposal before the end of the month." (sources/inquiry-mails/inquiry-07.md:14); "I'll take this to two colleagues and talk it through with them." (sources/interviews/sponsor-carla.md:153); "I said fine, I'll take it to him and see how he reacts." (sources/interviews/sponsor-mehmet.md:29). Second-hand: Mehmet on his boss (sources/interviews/sponsor-mehmet.md:37). Counter-evidence: "I have budget for training this year" (sources/inquiry-mails/inquiry-03.md:14); this sponsor names no one above. "The two days, those we settled almost in the first week, the dates too." (sources/interviews/sponsor-thomas.md:21).
- **Leverage:** Branch A, call rate and booking rate. Both links are assumptions (`discovery/opportunities/inquiry-mails.md:68`, `discovery/opportunities/interviews.md:74`). Indirect: the website could offer something to forward, but the people above decide off the site. Mehmet's boss shrank the format after the offer (sources/interviews/sponsor-mehmet.md:37).
- **Where in the funnel:** call rate: 58 of 113 sent inquiries get no scoping call; 23 of 55 who get a call book (`discovery/opportunities/data.md:80`, `discovery/opportunities/data.md:95`). Booking rate: 32 of 55 calls end without a booking; 23 of 55 book.
- **Need or solution:** need. Two different solutions would each meet it: example agendas to forward, which the interviewer offered (sources/interviews/sponsor-carla.md:155), or references from a comparable company: "Can you share references, ideally a company comparable to ours that I could speak to?" (sources/inquiry-mails/inquiry-02.md:18).
- **Readable from today's data (8 weeks):** unsupported. `scoping_call_booked` 55 in 26 weeks, 17 in the last eight weeks. `booking_confirmed` 23 in 26 weeks, 6 in the last eight weeks. No event shows that a sponsor forwarded anything.
- **Gaps and uncertainty:** what the people above ask for. No source says (`discovery/opportunities/inquiry-mails.md:70`). The academy staff who run scoping calls could say what sponsors come back with.

### C4: "I want proof people work differently months later." (sponsor, before booking)
- **Evidence strength:** partly supported, one source group: inquiry mails. Voices: 2 sponsors. One lived it with another provider: "But when I asked around a few weeks later, almost nobody was using any of it." (sources/inquiry-mails/inquiry-04.md:14); "And how would I know after a quarter that this time it stuck?" (sources/inquiry-mails/inquiry-04.md:18). One has seen offers without proof: "What I have not seen is evidence that any of it changes how people actually work three months later." (sources/inquiry-mails/inquiry-02.md:14); "How do you measure whether it worked?" (sources/inquiry-mails/inquiry-02.md:19). Counter-evidence: the other five mails do not ask for proof (`discovery/opportunities/inquiry-mails.md:56`). The four inbox sponsors before a booking ask about the format, not about proof (sources/inbox/inbox-export.md:125, sources/inbox/inbox-export.md:137, sources/inbox/inbox-export.md:149, sources/inbox/inbox-export.md:161). Related: six sponsors fear or see people slipping back after a training. That need is parked on Branch B (`discovery/opportunities/interviews.md:103`).
- **Leverage:** Branch A, call rate. One sponsor makes the call depend on written answers: "If you can answer these in writing, I am happy to follow up with a call." (sources/inquiry-mails/inquiry-02.md:23). Booking rate for the other sponsor is an assumption (`discovery/opportunities/inquiry-mails.md:55`). The website cannot cause the effect. It can only ask about it in the follow-up (`product/constraints.md:59`). The site already names a "Follow-up after four weeks" (site/sponsor-prep.html:27). There is no proof of a lasting effect to show yet beyond 14 follow-up answers.
- **Where in the funnel:** call rate: 58 of 113 sent inquiries get no scoping call; 23 of 55 who get a call book (`discovery/opportunities/data.md:80`, `discovery/opportunities/data.md:95`). Booking rate: 32 of 55 calls end without a booking; 23 of 55 book.
- **Need or solution:** need. Two different solutions would each meet it: a way to measure the effect, agreed before booking, or a reference the sponsor can talk to: "Can you share references, ideally a company comparable to ours that I could speak to?" (sources/inquiry-mails/inquiry-02.md:18).
- **Readable from today's data (8 weeks):** unsupported. `scoping_call_booked` 55 in 26 weeks, 17 in the last eight weeks. A signal on Branch B measures the need itself: `followup_answered`, 14 answers in 26 weeks (6 "not-yet", 5 "using-it-sometimes", 3 "using-it-regularly", counted in data/events.jsonl). Each answer arrives 28 to 31 days after its booking (data/README.md). In 8 weeks only a booking in the first four weeks can produce an answer.
- **Gaps and uncertainty:** what proof would be enough. No mail says (`discovery/opportunities/inquiry-mails.md:57`). Whether sponsors who never wrote hold back for this reason. The academy staff who run scoping calls could say how often proof comes up.

## Shortlist
Confirmed by Product lead (Loopwise), 2026-08-18: C1 (inquiry-mails O1 + inbox O1 + interviews O1), C2 (inbox O3), C3 (inquiry-mails O3 + interviews O2), C4 (inquiry-mails O2). The product lead's words: "Yes, add it"
Proposed by the agent: C1, C2, C3. The product lead added C4, which the agent had dropped as partly supported in one source group only.
Strong, but parked (Branch B or no branch this quarter):
- sponsor fears or sees people slip back into old habits after the training: interviews O4 + inquiry-mails O6 + inbox O10, 6 sponsors, partly supported
- participant cannot see where it fits in a normal work week: feedback O1, 3 participants, well supported
- participant cannot keep up during the day: feedback O6, 3 participants, well supported
- participant's tools do not work when the exercise starts: inbox O6 + feedback O9, partly supported
- sponsor does not know if IT allows the tools in time: inquiry-mails O5 + inbox O5 + interviews O11, partly supported
Dropped:
- inquiry-mails O4: partly supported in one group; met on the day itself; Branch A link is an assumption
- inquiry-mails O7, inbox O2, interviews O16, interviews O17: unsupported, one voice; related to C1
- inbox O4, O7, O8, O9, O11: unsupported, one voice
- interviews O3, O5, O6: partly supported in one group; mainly Branch B
- interviews O7, O8, O9, O10, O12, O13, O14, O15: unsupported, one voice
- feedback O2, O3, O5, O7, O8: partly supported in one group; Branch B or no branch
- feedback O4, O10 to O16: unsupported, one participant
- data.md D1 to D6: observations, used as evidence, not compared

## Challenger (on the favoured row, and on your first try)

**Counter-evidence to C1:**
- Four sponsors knew their format: "we would like to book an AI workshop for our product and UX team, around 15 people." (sources/inquiry-mails/inquiry-06.md:12); "we are interested in your hands-on workshop for product owners, about 12 participants." (sources/inquiry-mails/inquiry-05.md:12); "The two days, those we settled almost in the first week, the dates too." (sources/interviews/sponsor-thomas.md:21); "The shape I knew." (sources/interviews/sponsor-mehmet.md:29).
- Every C1 sender wrote to the academy anyway. "maybe a 20 minute call would be easier." (sources/inquiry-mails/inquiry-03.md:16). Not knowing did not stop them from asking.
- The site already says what they want to hear: "The scoping call shapes the real format." (site/formats.html:21). If sponsors miss that line, new words may be missed too.
- The formats page split points both ways. Visits that see it open the inquiry page less often: 376 of 2291 against 364 of 1475 (`discovery/opportunities/data.md:43`). But calls from those visits end in a booking more often: 13 of 26 against 10 of 29 (`discovery/opportunities/data.md:101`). The numbers are small, and a gap of a few visits can come from chance (`discovery/opportunities/data.md:29`).
- Need test, harder: two strong quotes ask for a thing. "do you have a price list or an overview of your formats you could send me?" (sources/inquiry-mails/inquiry-03.md:12); "Is there a way to find out where the team stands before we decide?" (sources/inbox/inbox-export.md:125). The problem sits on the next line or the same line, so the need holds. But the quotes invite a format overview as the answer.
- The same senders count twice. inquiry-02 and inquiry-07 are voices in C1 and in C3; inquiry-02 and inquiry-04 are voices in C1 and in C4. Three inbox senders are voices in C1 and in C2.

**Counter-evidence to your first try and its reason:**
- Your reason says trust built on the site helps the booking. No source says that. The link is an assumption in all three files (`discovery/opportunities/interviews.md:103`, `discovery/opportunities/inquiry-mails.md:105`, `discovery/opportunities/inbox.md:147`).
- The site already shows a follow-up after four weeks, on the home page (site/index.html:30) and the sponsor preparation page (site/sponsor-prep.html:27). Calls from visits that saw the sponsor preparation page end in a booking less often: 8 of 27 against 15 of 28 (`discovery/opportunities/data.md:102`). That is no proof against you, the numbers are small. It is no support either.
- "the actual outcome that the training should achieve" is the training's content and effect. This repo does not change the training (`product/strategy.md:42`), and the website cannot cause use after the training (`product/constraints.md:59`).
- The strongest interview voices for your favourite answer questions that asked for a fear or a failure. See leading questions below.
- Counter-evidence in the sources: "We booked another round." (sources/interviews/sponsor-sabine.md:173); this sponsor names no fading after the first run. "This time I have a good feeling I will build it into my daily work." (sources/feedback/feedback-export.md:45).
- The sponsor who lived a faded training still moved on to a call: "Happy to explain more in a call." (sources/inquiry-mails/inquiry-04.md:20). Nothing here shows the fear costing a call.

**Leading questions:**
- C1: "Before I describe them, what do you think your people would need?" (sources/interviews/sponsor-carla.md:123) before "Tell me what's on the menu and I'll react to it." (sources/interviews/sponsor-carla.md:125): an open question. For Ines the interviewer says it first: "So you weren't sure which of those you needed from us." (sources/interviews/sponsor-ines.md:47), then Ines agrees (sources/interviews/sponsor-ines.md:49). That question asked for exactly this answer. The strongest quote, the mails and the inbox requests are unprompted.
- C2: inbox requests only, all unprompted.
- C3: Carla's line on taking it to two colleagues follows a remark, not a question (sources/interviews/sponsor-carla.md:151). Her "Sure, why not. Send them over." (sources/interviews/sponsor-carla.md:157) accepts an offer the interviewer made: "Should I send you a couple of example agendas, so you have something to show them?" (sources/interviews/sponsor-carla.md:155). Mehmet answers an open question: "Which of the usual questions could you have answered on the spot?" (sources/interviews/sponsor-mehmet.md:27). The mails are unprompted.
- C4: inquiry mails only, unprompted.
- Your favourite: "Once the two days are over, what could still go wrong?" (sources/interviews/sponsor-mehmet.md:167) comes before "What worries me is the Monday after, and the one after that" (sources/interviews/sponsor-mehmet.md:169). "And what would failure look like?" (sources/interviews/sponsor-thomas.md:91) comes before "People go back to their desks and file AI under" (sources/interviews/sponsor-thomas.md:93). "What would it look like if it doesn't change anything?" (sources/interviews/sponsor-ines.md:151) comes before Ines's advisor story (sources/interviews/sponsor-ines.md:153). All three questions asked for a fear or a failure. The mail (sources/inquiry-mails/inquiry-04.md:14) and the inbox request (sources/inbox/inbox-export.md:113) are unprompted.

**Wins on, loses on:** C1 and C2 win on reach. They act where 740 inquiry page visits arrive and 546 stop (`discovery/opportunities/data.md:51`). They lose on closeness: of 194 who start, 23 book. C3 and C4 act after the inquiry, where 23 of 55 with a call book (`discovery/opportunities/data.md:95`). But they reach 113 sent inquiries at most, and their signal is 17 calls in the last eight weeks.

**What would make another candidate the better choice:**
- C2 is the cheapest way in. The inquiry page is one page, and it already has no format field (site/inquiry.html:29). If a walk-through shows sponsors stop there for this reason, C2 is C1 at the exact step, with a direct signal in `inquiry_started`.
- C4 has the only stated link to the call: "If you can answer these in writing, I am happy to follow up with a call." (sources/inquiry-mails/inquiry-02.md:23). If the academy staff say proof comes up in many calls, C4 sits where a booking is closest. The 14 `followup_answered` answers already measure whether people use what they learned.
- C3 has five sponsors who are in that situation now. If scoping call notes show that many calls end with "I'll take it to my boss", C3 is closer to the 32 calls without a booking than C1.

**Could not check:**
- Why 32 of 55 scoping calls end without a booking. Nothing is logged about the call. The academy staff who run the calls could answer it.
- Whether the mail and inbox senders booked. The academy's inquiry records could answer it.
- Whether visits leave the formats page because they cannot choose. A walk-through with sponsors could answer it.
- What proof would be enough for C4, and what the people above want to see for C3. No source says.

## Decision (human)

Chosen opportunity: ____
We would switch if: ____
