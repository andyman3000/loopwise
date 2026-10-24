---
name: test-card
description: Draft the test card for one solution variant before it is built or launched. Use when a variant from an intent needs its critical assumptions, a success line set upfront, and the post-launch lines (usage hypothesis, proxy metric, counter metric, kill criterion, time frame). Input is one variant name. Writes one file per variant; never decides whether the variant ships.
---

# Test card

**When:** after `variant-spec` has written the spec for the variant, and before any variant goes live or into a user test. Once per variant.
**Reads:** `discovery/intents/<opportunity>.md`, `discovery/specs/<variant>.md` (the spec, written by `variant-spec`), `product/constraints.md`, `discovery/kpi-tree.md`, `sources/` (interviews, emails, feedback, inbox, analytics).
**Writes:** `discovery/test-cards/<variant>.md`.

This is an assessment drafted by an agent, not a decision. A human owns the card and every value on it.

## Rules

- **Critical assumptions first** (Torres): the assumptions this variant rests on, not the variant as a whole. Each gets an evidence level in words: **well supported**, **partly supported** or **unsupported**, with reasoning, sources, counter-evidence and gaps.
- **Every claim quotes its source with location** (file and line or section). No quote, no claim.
- **Do not invent numbers.** Evidence uses only counted numbers: sources, voices, events in the log. No scores, no probabilities, no totals.
- **Thresholds are proposals, not evidence.** The success line, kill criterion and time frame are targets a human sets; mark each "proposal". Where a baseline is needed, name the events it is computed from and say whether `data/` holds them yet. Never state a baseline value you have not counted.
- **Every line is checkable against data later.** Each metric names the event(s) it is computed from, from this list only: `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. If a line cannot be computed from these, say so under "What we cannot see" instead of inventing an event.
- **The success line is set upfront**, before launch, and never edited after data arrives. A later change is a new card version with a date.
- Respect `product/constraints.md`: a line that needs data the constraints rule out goes under "What we cannot see".
- Leave the owner field and the Result section empty. `read-result` fills the Result.

## Steps

1. Read the variant file and its intent. If the variant name has no file in `discovery/specs/`, stop and ask.
2. List the critical assumptions: what must be true for this variant to change behaviour. Two to four. Search `sources/` for evidence for and against each.
3. Map the variant to its KPI branch in `discovery/kpi-tree.md` (quote the line).
4. Draft each field of the template. Check: every metric names events; no counted number lacks a source; every threshold says "proposal".
5. Write the file. Tell the human in three lines which assumption is weakest and which line needs their judgement most.

## Output template

```markdown
# Test card: <variant>

> Assessment drafted by an agent on <YYYY-MM-DD>, not a decision.
> Card owner: ____ (human decides)
> Variant: `discovery/specs/<variant>.md` · Intent: `discovery/intents/<opportunity>.md`
> KPI branch: <branch> ("<quote>", `discovery/kpi-tree.md`, <section>)

## What changes for whom
<who does what differently on the page, in one or two sentences>

## Critical assumptions
1. **<assumption>**: <well supported | partly supported | unsupported>
   - Reasoning: <why this level>
   - Sources: "<quote>" (`<file>`, line <n>)
   - Counter-evidence: <quote with location, or "none found in sources/">
   - Gap: <what nobody has checked yet, who could>

## Success line (set upfront, before launch)
<threshold, proposal> · Computed from: <events> · Set on: <YYYY-MM-DD>

## Usage hypothesis
<the new element is used: by whom, how often, proposal> · Computed from: <events>

## Proxy metric
<metric> · Computed from: <events>

## Counter metric
<what must not get worse> · Computed from: <events> · Baseline: <counted value with source, or "not yet counted: needs <events> before launch">

## Kill criterion
<threshold on the counter metric, proposal> · Computed from: <events>

## Time frame
<weeks, proposal>

## What we cannot see
- <what the data cannot answer, e.g. causality for bookings at the counted case numbers>

## Result

_Empty until after the time frame. `read-result` fills this section from the event log; a human decides keep, adjust or withdraw._
```
