# Intent: Sponsors who cannot say what to ask for or which format fits can still start an inquiry

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: 2026-10-25.
> Opportunity: C2, the sponsor does not know what to ask for, or which format fits, in discovery/opportunity-comparison.md · Decision: discovery/decisions/001-format-question.md
> Material: interviews are anonymised composites; mails, inbox and data are synthetic. This file repeats that label.

An intent says what should change, for whom, and why, before anyone picks a solution.
A critical assumption is the one thing that must be true for an idea to work.

## Problem
Some sponsors have budget but cannot say what to ask for. "I have budget for training this year but no clear idea what to ask for." (`sources/emails/inquiry-03.md:14`)
Other sponsors read the formats and cannot tell which one fits. "I looked at your formats but cannot tell which one fits: the half-day workshop, the two days, or the longer team coaching." (`sources/inbox/inbox-export.md:125`)
We work on both parts.

## Desired outcome
A sponsor who is unsure about the format starts an inquiry anyway. The sponsor says what the team needs, without naming a format first.
- Branch A, inquiries that end in a booking (`discovery/kpi-tree.md:18`).
- Driver: start rate, the share of inquiry page visits that start the form (`discovery/kpi-tree.md:21`). Event: `inquiry_started`. Today 194 of 740 inquiry page visits start the form (`discovery/opportunities/data.md:44`).
- Driver: reach rate, the share of visits that open the inquiry page (`discovery/kpi-tree.md:20`). Event: `page_view` of the inquiry page. Today 376 of 2291 visits that see the formats page open the inquiry page (`discovery/opportunities/data.md:39`).

No target here. Targets go on the test card.

## For whom and where
- Who: the soft sponsor, who does not know the format (`product/personas/sponsor-soft.md`). The hard sponsor already names a format: "Two days, more of a getting-to-know-each-other thing." (`sources/interviews/sponsor-hard.md:13`)
- Pages the ideas may change: the inquiry page (`site/inquiry.html`) and the formats page (`site/formats.html`).

## Open questions
- Which driver does this need act on? The mails were sent anyway. They say nothing about sponsors who gave up (`discovery/opportunity-comparison.md:83`). · who can answer: sponsors in a user test on the formats and inquiry pages · blocks: the launch
- Answered by the pair: do visits that see the formats page leave because they cannot tell which format fits (`discovery/opportunity-comparison.md:133`)? The pair: "Yes. We know this happens from previous user tests". [assumption: those user tests are not in `sources/`, so this answer rests on the pair's word]
- Did the six mail senders book (`discovery/opportunity-comparison.md:133`)? · who can answer: the academy's inquiry records · blocks: later
- Why do 32 scoping calls end without a booking (`discovery/opportunity-comparison.md:133`)? · who can answer: academy staff who run scoping calls · blocks: later

## Solution ideas

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I2: next to the form, a link "Unsure what to pick? Find out in a small quiz" opens a short quiz whose questions find out what the sponsor needs. The same link also sits on the formats page. (inquiry page, formats page) | the pair | start rate (`discovery/kpi-tree.md:21`) · reach rate (`discovery/kpi-tree.md:20`) | A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person. | partly supported: one sender asks to be asked, "Then you can ask me the questions I apparently don't know to ask." (`sources/emails/inquiry-03.md:16`). Another asks for a way to see where the team stands first (`sources/inbox/inbox-export.md:125`). Counter-evidence: the same sender proposes a call for this, not a page (`sources/emails/inquiry-03.md:16`). Gap: nothing is counted inside the form today (`discovery/opportunities/data.md:29`). |
| I4: a "Book a call" button in place of the form | the pair | call rate (`discovery/kpi-tree.md:23`) | A sponsor who does not know what to ask would rather talk than write. | partly supported: "If a list is not how you work, maybe a 20 minute call would be easier." (`sources/emails/inquiry-03.md:16`); "Happy to explain more in a call." (`sources/emails/inquiry-04.md:20`). Counter-evidence: one sender wants answers in writing first, "If you can answer these in writing, I am happy to follow up with a call." (`sources/emails/inquiry-02.md:23`). Another wants information to forward internally (`sources/emails/inquiry-01.md:18`). |
| I6: the message label "What do you need?" becomes "What do you see in your team today?", with two example answers below it | today's page, changed | start rate (`discovery/kpi-tree.md:21`) | A sponsor who cannot name a format starts writing when the page asks about the team instead of the need. | partly supported: sponsors who do not know the format describe their team without being asked. "Some of them already use chat tools, some don't." (`sources/emails/inquiry-01.md:14`); "Product is lagging behind, and everyone is doing their own thing." (`sources/emails/inquiry-04.md:16`); "mostly people moving over from project management and consulting" (`sources/inbox/inbox-export.md:125`). Gap: these messages were sent anyway, so they say nothing about sponsors who gave up before sending (`discovery/opportunities/emails.md:44`). |
| I9: a picture of a product team's week (planning, discovery, delivery, review), where the sponsor clicks the part that goes wrong | another domain: doctor's intake form | start rate (`discovery/kpi-tree.md:21`) | A sponsor can point at the part of the team's work where things go wrong. | unsupported: no source shows a sponsor naming one part of the team's work that goes wrong. The soft sponsor suggests looking at "how work comes in and moves along" (`sources/interviews/sponsor-soft.md:53`), but has not picked a direction (`sources/interviews/sponsor-soft.md:57`). Counter-evidence: "For the others I can't say, go there, do that. It's one big question mark." (`sources/interviews/sponsor-soft.md:33`). |
| I12: the inquiry page opens with the question "What should be different for your team in three months?", with example answers for both kinds of sponsor and a "don't know yet" box. The contact form comes second. The format is settled in the scoping call. | the pair | start rate (`discovery/kpi-tree.md:21`) · submit rate (`discovery/kpi-tree.md:22`) | A sponsor who is shown example answers can say what should be different for the team after the training. | unsupported: "Whether this sponsor can write a success line when given examples. No source tests it." (`product/personas/sponsor-soft.md:68`). Sponsors ask for it: "So: how would we know it worked? What would you look at?" (`sources/interviews/sponsor-hard.md:37`); "How do you measure whether it worked? What would you show me afterwards?" (`sources/emails/inquiry-02.md:19`). Counter-evidence: "Those are very soft points, I know. It's not a hard return on investment." (`sources/interviews/sponsor-soft.md:63`). |

## Boundaries
- No prices on the website (`product/constraints.md:7`).
- The website reaches the inquiry and the scoping call booking (`product/constraints.md:55`).
- The website cannot reach the training itself (`product/constraints.md:57`).

## Ideas not picked
- I1: the formats page tells a story, told backwards from what participants said after the training (formats page) · the pair
- I3: a support bot asks the sponsor questions about what fits, then sends the answers by mail · the pair
- I5: a dropdown in the form that lists the formats · the pair
- I7: the message field moves to the top, before name, company and email · today's page, changed
- I8: as the sponsor ticks team size and who is in the team, a side box writes "your inquiry so far", which becomes the message · another domain: car configurator
- I10: the first choice on the page is "I don't know which format yet", with one line saying the scoping call settles that · turned around: make the sponsor pick a format before sending
- I11: below the send button, the steps after sending: our reply, the scoping call, the preparation · turned around: hide what happens after sending

## Selection (human)

- Part we work on: both
- Idea it comes from: I2, a small quiz next to the form
- Assumption we test first: A sponsor who is unsure about the format chooses the quiz, and can answer its questions on a page without a person.
- Why this one first: "Find out, if this helps or if it annoys people. After all it takes up valuable time"
- Variant name (lowercase with dashes): format-quiz
- Who: Reference decision (replace with your own) · When: 2026-10-25

## Selection (human)

- Part we work on: both
- Idea it comes from: I12, the inquiry page opens with what should be different for the team
- Assumption we test first: A sponsor who is shown example answers can say what should be different for the team after the training.
- Why this one first: The quiz asked questions the sponsor came to us with. Examples to react to ask less of a sponsor who does not know yet (`discovery/decisions/002-format-quiz.md:55`).
- Variant name (lowercase with dashes): success-line-first
- Who: Reference decision (replace with your own) · When: 2026-10-26

A second round adds a second "Selection (human)" below this one, with its own variant name.
