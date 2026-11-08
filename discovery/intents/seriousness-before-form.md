# Intent: Sponsors judge we are serious before they start the form

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: 2026-11-08.
> Opportunity: C1, need to see the provider is serious before filling a general form, in discovery/opportunity-comparison.md · Decision: discovery/decisions/001-opportunity.md
> Material: real conversations, anonymised composites (sponsor interviews, `sources/interviews/sponsor-hard.md:3`).

An intent says what should change, for whom, and why, before anyone picks a solution.
A critical assumption is the one thing that must be true for an idea to work.

## Problem
One hard sponsor says he will not fill a general form until he knows the other side is serious. He sends three precise questions by mail instead (`sources/interviews/sponsor-hard.md:90`). The data shows 546 of 740 inquiry page visits do not start the form (`data/events.jsonl`). Why those 546 did not start is not known.

> "A general form that asks ..., I don't fill in before I know the other side is serious. I'd rather send three precise questions by mail and see how they answer." (`sources/interviews/sponsor-hard.md:90`)

## Desired outcome
More inquiry page visits start the form. KPI branch A, driver *start rate* (`discovery/kpi-tree.md:19`). Event: `inquiry_started` ÷ `page_view` where page=inquiry (`data/events.jsonl`). Today: 194 of 740 inquiry page visits start the form; 546 do not (`data/events.jsonl`). No target here.

## For whom and where
- Who: hard sponsors (`product/personas/sponsor-hard.md`); the pattern may reach soft sponsors but no soft-sponsor voice says so.
- Pages the ideas may change: inquiry page (`site/inquiry.html`), formats page (`site/formats.html`), home (`site/index.html`).

## Open questions
- How many of the 546 who did not start did so for trust reasons, clarity reasons, or something else? · who can answer: academy staff reading mail replies, or a short exit question on the inquiry page · blocks: sharper targeting of ideas later.
- Does the hard sponsor's pattern hold across more sponsors? Only one voice in interviews; three source groups (emails, feedback, inbox) were not processed. · who can answer: the research team processing those sources · blocks: the launch.

## Solution ideas

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I1: testimonials from recent clients | the pair | start rate (`discovery/kpi-tree.md:19`) | Sponsors who close the inquiry page today would start the form if named client voices sat above it. | unsupported. One hard sponsor voice names a reference he could call (`sources/interviews/sponsor-hard.md:94`). |
| I5: a trainer bio block at the top of the inquiry page: name, cohorts delivered, two quoted replies to sponsor questions | another domain (doctor's intake) | start rate (`discovery/kpi-tree.md:19`) | Sponsors judge seriousness by a named trainer with specifics, not by a company brand. | unsupported. One hard sponsor voice says he will not fill a general form until the other side is serious (`sources/interviews/sponsor-hard.md:90`). |
| I7: on the formats page, a "where we fail and who we decline" block above the formats list | turned around | inquiry page open rate (`discovery/kpi-tree.md:18`) | Sponsors read saying-no as a seriousness signal and open the inquiry page after it. | unsupported. No voice names this. The hard sponsor leaves the formats page for a different reason: no after-state (`sources/interviews/sponsor-hard.md:86`). |

Close assumptions: I1 and I5 both bet that specific, named voices on the page move the sponsor to start the form. Different voices (clients vs trainer), same underlying bet.

## Boundaries
- No prices, on the website or in data (`product/constraints.md:7`).
- The website reaches the inquiry and the scoping call booking, not the training (`product/constraints.md:55`).
- An idea may change the form, replace it, or replace it with booking a call.

## Ideas not picked
- I2: three case stories above the form, each with what changed four weeks later, client type and date · today's page, changed
- I3: replace the "What do you need?" textarea with three short specific questions · today's page, changed
- I4: replace the form with a "book a 20-minute scoping call" calendar link, no fields · today's page, changed
- I6: "ask three questions by mail" box next to the form, with a sample set and a 48-hour reply promise · another domain (pre-purchase product Q&A)

## Selection (human)

- Part we work on: the whole opportunity
- Idea it comes from: I5: a trainer bio block at the top of the inquiry page: name, cohorts delivered, two quoted replies to sponsor questions
- Assumption we test first: Sponsors judge seriousness by a named trainer with specifics, not by a company brand.
- Why this one first: I have no idea if I as the trainer am credible in the outer world.
- Variant name (lowercase with dashes): trainer-bio
- Who: Jan · When: next week (2026-11-09 to 2026-11-15)
