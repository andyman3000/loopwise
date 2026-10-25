---
name: intent-and-ideas
description: Turn the opportunity a human has chosen into an intent (what should change for whom, why now, the outcome it serves, boundaries) plus exactly three solution ideas named by mechanism, each resting on a different critical assumption. Use after the opportunity decision is recorded, when the team says "write the intent", "what could we build for this opportunity", or "give us solution ideas". Never picks which assumption is tested first.
---

# Intent and ideas

**When:** after the human has chosen an opportunity in `discovery/opportunity-comparison.md` and the
decision is recorded in `discovery/decisions/`. Before `test-card` in prototype mode.
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

**A critical assumption** is the one thing that must be true for an idea to work. If it is false, the
idea fails, however well it is built.

## Rules

- **Try first, then compare.** Before you draft, ask the human for one solution idea of their own, in one line, named by what changes on the page. Wait for the answer and never invent it. If it fits the intent, it becomes one of the three ideas, marked as theirs. If it names a solution that does not fit the intent, say why in "Your first try" and do not use it. A vague reply ("go on", "ok", "you choose") is not an answer: ask once more, and if it stays vague, write "skipped". After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Every claim quotes its source with location** (file and line). No quote, no claim.
- **Do not invent numbers.** Only counted numbers: sources, voices, events in a log. No targets, no
  success lines, no thresholds here; those belong in the test card.
- **Three levels, in words** for each assumption: well supported, partly supported, unsupported,
  with reasoning, sources, counter-evidence, gaps.
- **Exactly three ideas, each with a different critical assumption.** Two ideas that fail for the same
  reason are one idea in two shapes: replace one of them. Say in one line per idea why its critical
  assumption differs from the other two.
- **Ideas are named by mechanism:** what changes on the page ("one question before the form",
  "calendar link after three case stories"), not by strategy ("reduce friction").
- **Boundaries come from `product/constraints.md` and the decision record.** Quote them. If the
  two disagree, name the conflict and stop at that point; do not resolve it.
- **This file is an assessment by an agent, not a decision.** The selection fields stay
  `____ (human decides)`. Do not suggest which assumption to test first.

## Steps

0. **Try first.** Ask the human for one solution idea of their own, in one line, named by what changes on the page. Wait for the answer before you read further or draft anything.
1. Confirm the chosen opportunity with the human and read the decision record. If the record does
   not exist or names a different opportunity, say so and stop.
2. Draft the intent: what should change for whom (which persona in `product/personas/`), why now,
   the outcome it serves (the KPI branch named in the comparison), boundaries. Show it, ask the
   human to confirm or change it. A vague reply is not a confirmation: ask again.
3. Propose exactly three ideas. Include the obvious one and ideas that solve the same problem
   differently. One line each: what changes on the page. Under each, the assumptions it rests on,
   each with its level and source. Mark the assumption the idea fails without as "critical".
4. Check: three critical assumptions, no two the same. Fill the table "Three ideas side by side".
   In "What a test would need", say what a tester would have to do or see on a page to show the
   assumption holds or breaks. No numbers.
5. Write the file with the template below. Then stop. Tell the human what to fill in "Selection"
   and that the next step is `/test-card <variant> prototype`. Do not write a test card.

## Output template

```markdown
# Intent: <short name>

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: YYYY-MM-DD.
> Opportunity: <name> in discovery/opportunities/<file>.md · Decision: discovery/decisions/<file>.md
> Material: <synthetic or composite, repeated from the material the opportunity rests on>

A critical assumption is the one thing that must be true for an idea to work.

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## What should change for whom
<two or three sentences, persona from product/personas/<file>, strongest quote with source>

## Why now
<reason, with source>

## Outcome it serves
<KPI branch and driver from discovery/kpi-tree.md, quoted>

## Boundaries
- <constraint> (product/constraints.md:<line>)
- Out of scope: <...>

## Open questions
- <question>: who can answer it

## Solution ideas

### I1: <mechanism: what changes on the page> [<"your idea" if it came from the first try>]
- **Assumptions:**
  - <assumption> (critical): <level>. <reasoning>. Sources: <...>. Counter: <...>. Gaps: <...>
  - <assumption>: <level>. ...
- **Why its critical assumption differs:** <one line>

### I2: ...

### I3: ...

## Three ideas side by side

| Idea | Critical assumption | Level | What a test would need |
|---|---|---|---|
| I1: <mechanism> | <assumption> | <level> | <what a tester does or sees that shows it holds or breaks> |
| I2: ... | | | |
| I3: ... | | | |

## Selection (human)

- Assumption we test first: ____ (human decides)
- Why this one first: ____ (human decides)
- Idea it comes from: ____ (human decides)
- Variant name (lowercase with dashes): ____ (human decides)
- Who: ____ · When: ____

The other two ideas stay here for the next round. A second round adds a second "Selection (human)"
below this one, with its own variant name.
```
