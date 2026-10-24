---
name: intent-and-ideas
description: Turn the opportunity a human has chosen into an intent (what should change for whom, why now, the outcome it serves, boundaries) plus 3 to 5 solution ideas named by mechanism, each with the assumptions it rests on. Use after the opportunity decision is recorded, when the team says "write the intent", "what could we build for this opportunity", or "give us solution ideas". Never picks which ideas become variants.
---

# Intent and ideas

**When:** after the human has chosen an opportunity in `discovery/opportunity-comparison.md` and the
decision is recorded in `discovery/decisions/`. Before `variant-spec`.
**Input:** the chosen opportunity, named by the human. If no name is given, ask. Do not take it from
"Appears favoured" in the comparison.
**Reads:** `discovery/opportunity-comparison.md`; the decision record for the opportunity choice in
`discovery/decisions/`; the matching file in `discovery/opportunities/`; `product/constraints.md`;
`product/personas/`.
**Writes:** `discovery/intents/<opportunity-slug>.md`.

**The intent is the hand-over to the build, not a level in the tree.** The opportunity solution tree
(Torres) has four levels: desired outcome, opportunities, solutions, assumption tests. The intent sits
beside it and tells the builders what should change and where the edges are. There is no hypothesis
field here: assumptions belong to each idea, and the test card tests them.

## Rules

- **Every claim quotes its source with location** (file and line or section). No quote, no claim.
- **Do not invent numbers.** Only counted numbers: sources, voices, events in a log. No targets, no
  success lines, no thresholds here; those belong in the test card.
- **Three levels, in words** for each assumption: well supported, partly supported, unsupported,
  with reasoning, sources, counter-evidence, gaps.
- **Ideas are named by mechanism:** what changes on the page ("one question before the form",
  "calendar link after three case stories"), not by strategy ("reduce friction").
- **Boundaries come from `product/constraints.md` and the decision record.** Quote them. If the
  two disagree, name the conflict and stop at that point; do not resolve it.
- **This file is an assessment by an agent, not a decision.** The selection field stays empty.

## Steps

1. Confirm the chosen opportunity with the human and read the decision record. If the record does
   not exist or names a different opportunity, say so and stop.
2. Draft the intent: what should change for whom (which persona in `product/personas/`), why now,
   the outcome it serves (the KPI branch named in the comparison), boundaries. Show it, ask the
   human to confirm or change it.
3. Propose 3 to 5 ideas. Include the obvious one and ideas that solve the same problem differently.
   One line each: what changes on the page. Under each, the assumptions it rests on, each with its
   level and source. Mark the assumption the idea fails without as "critical".
4. Write the file with the template below. Then stop. Do not write a test card.

## Output template

```markdown
# Intent: <short name>

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: YYYY-MM-DD.
> Opportunity: <name> in discovery/opportunities/<file>.md · Decision: discovery/decisions/<file>.md

## What should change for whom
<two or three sentences, persona from product/personas/<file>, strongest quote with source>

## Why now
<reason, with source>

## Outcome it serves
<KPI branch and metric from discovery/kpi-tree.md, quoted>

## Boundaries
- <constraint> (product/constraints.md, <section>)
- Out of scope: <...>

## Open questions
- <question>: who can answer it

## Solution ideas

### I1: <mechanism: what changes on the page>
- **Assumptions:**
  - <assumption> (critical): <level>. <reasoning>. Sources: <...>. Counter: <...>. Gaps: <...>
  - <assumption>: <level>. ...

### I2: ...

## Selection (human)

Ideas that become variants: ____ (human decides)
```
