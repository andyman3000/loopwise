---
name: intent-and-ideas
description: Guide the pair from the chosen opportunity to 3 to 5 solution ideas on the opportunity tree, one step per message. The pair lists its own ideas, the skill adds ideas from other angles, the pair picks 3 to 5 and the skill shows the driver and the critical assumption of each, then the pair names the idea it tests first. The file is rewritten after every step, so the ideas show on /discovery/tree from the first step on. Use after the opportunity decision is recorded, when the team says "write the intent", "let's develop ideas", or "what could we build for this opportunity". Writes the intent. Never picks an idea.
---

# Intent and ideas

**When:** after the human has chosen an opportunity in `discovery/opportunity-comparison.md` and the
decision is recorded in `discovery/decisions/`. Before `/test-card <variant> prototype`.
**Input:** the chosen opportunity, named by the human. If no name is given, ask. Do not take it from
"Appears favoured" in the comparison.
**Reads:** `discovery/opportunity-comparison.md`; the decision record in `discovery/decisions/`; the
matching files in `discovery/opportunities/`; `discovery/kpi-tree.md`; `product/constraints.md`;
the pages in `site/` (what they do today).
**Writes:** `discovery/intents/<opportunity-slug>.md`, after every step.

First many ideas, without judging them. Then a few, each with the driver it moves and the one thing
that must be true for it to work. The pair has the ideas; the skill pushes past the obvious. AI ideas
tend to be obvious or average, so the pair always goes first.

**A critical assumption** is the one thing that must be true for an idea to work. If it is false, the
idea fails, however well it is built.

## Rules

- **One step per message.** Each step ends with one question to the pair. Wait for the answer. A vague reply ("go on", "ok", "you choose") gets one more ask; if it stays vague, carry on and note "the pair added none".
- **Write the file after every step**, then tell the pair to reload `http://localhost:3000/discovery/tree`. The tree draws every row of "Solution ideas" under the opportunity.
- **No judging in steps 1 and 2.** No levels, no "this would not work", no constraint checks. Every idea goes in the table. An idea may change any page of the website. If it changes another page than the inquiry page, name the page after the idea, for example "(formats page)".
- **Ideas are named by mechanism:** what the sponsor sees or does on the page ("one question before the form", "calendar link after three case stories"), not by strategy ("reduce friction"). If the pair names a feature without a page change ("a trust badge"), ask once: "What would the sponsor see on the page?"
- **Driver from step 1 on.** Each idea gets the driver it moves, named as in `discovery/kpi-tree.md`, with its line. This is a lookup, not a judgement. An idea that moves more than one driver lists each, with its line, separated by " · ", for example "start rate (`discovery/kpi-tree.md:21`) · submit rate (`discovery/kpi-tree.md:22`)". The tree lights up every driver listed. If no driver fits, write "no driver".
- **Boundaries apply from step 3 on.** They come from `product/constraints.md`: no prices (`product/constraints.md:7`); the website reaches the inquiry and the scoping call booking, not the training itself (`product/constraints.md:55`). An idea may change the form, replace it, or replace it with booking a call. Which fields a page sends is settled in the spec, not here.
- **Every claim quotes its source with location** (file and line). Evidence levels in words: well supported, partly supported, unsupported. Only counted numbers.
- **The pair picks.** The skill never suggests which ideas to keep or which to test first. Selection fields stay `____ (human decides)` until the pair fills them.
- **Date** is today's date, not the date of the data.

## Steps

1. **Your ideas** (about 10 min). Read the decision record; if it is missing or names a different opportunity, say so and stop. Name the opportunity in one line with its strongest quote. Ask the pair to start `npm start` in a second terminal if it is not running.
   **First check whether the opportunity holds two needs.** It does if its name joins two needs with "or", or if the comparison puts it on drivers far apart in the funnel. If so, show each part in one line with one quote and its file and line. Ask: "Which part do you work on?" Wait for the answer. Do not suggest a part. Write the answer in the pair's words into "Part we work on" under "Selection (human)". A pair that wants both writes "both". If the opportunity holds one need, write "the whole opportunity" there.
   Then ask: "List as many ways as you can to change the website for this, on the inquiry page or any page before it, one line each. Wild ones too." Ask "What else?" once. Write the file: each idea a row, From "the pair", with its driver. Point to the tree.
2. **More ideas from other angles** (about 5 min). Add five or six ideas in one message, each from a different angle, and say the angle in the From column:
   - "today's page, changed": take `site/inquiry.html` or `site/formats.html` and swap, cut, reorder or combine one element.
   - "another domain": carry a concrete pattern from a car configurator, a doctor's intake form, a travel agent or a dating app.
   - "turned around": ask how the sponsor could be made even less sure, then flip it.
   Check that your ideas do not share one mechanism (all text on the page, all a new field). Add them to the table, show the full table numbered, and ask: "Anything to add?" Write the file. Point to the tree.
3. **Pick 3 to 5** (about 10 min). State the boundaries in one short list. Ask the pair to pick 3 to 5 ideas. For each pick, fill the critical assumption and its level with the source. An idea that breaks a boundary is marked in the Idea cell, with why in one line. If two picks rest on the same assumption, say so once; the pair decides. Keep only the picks in "Solution ideas", keep their I-numbers; the rest go to "Ideas not picked". Write the file. Point to the tree.
4. **The idea you test first** (about 5 min). Ask, one at a time: which idea do you test first, and why that one? Not "the one we like most": the one whose assumption would hurt most if wrong, or has no source. Then a variant name, lowercase with dashes. Then their names. Copy that idea's critical assumption into "Assumption we test first"; the pair may reword it. Write the file. Tell the pair: the tree marks the idea with a green border, and the next step is `/test-card <variant> prototype`. Then stop.

## Output template

```markdown
# Intent: <short name>

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: YYYY-MM-DD.
> Opportunity: <C-id>, <name>, in discovery/opportunity-comparison.md · Decision: discovery/decisions/<file>.md
> Material: <synthetic or composite, repeated from the material the opportunity rests on>

A critical assumption is the one thing that must be true for an idea to work.

## Solution ideas

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I1: <idea, by mechanism> | the pair | <driver> (`discovery/kpi-tree.md:<line>`) | <empty until step 3> | <empty until step 3, then level and source> |

## Boundaries
- <constraint> (`<file>:<line>`)

## Ideas not picked
- I<n>: <idea> · <from>

## Selection (human)

- Part we work on: ____ (human decides)
- Idea it comes from: ____ (human decides)
- Assumption we test first: ____ (human decides)
- Why this one first: ____ (human decides)
- Variant name (lowercase with dashes): ____ (human decides)
- Who: ____ · When: ____

A second round adds a second "Selection (human)" below this one, with its own variant name.
```

"Boundaries" and "Ideas not picked" appear from step 3 on.
