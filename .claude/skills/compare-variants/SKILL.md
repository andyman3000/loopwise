---
name: compare-variants
description: Compare the solution variants of one intent by their critical assumptions and propose a route, either live or user test first. Use after every variant has a test card and before anyone decides which variant ships. Writes one comparison file; never picks the variant or the route.
---

# Compare variants

**When:** after `test-card` has run for every variant in `discovery/specs/`. Before the human decides which variant ships.
**Reads:** `discovery/specs/`, `discovery/test-cards/`, `sources/`, `product/personas/`, and user tests in `discovery/user-tests/` if any exist (say so if there are none).
**Writes:** `discovery/variant-comparison.md`.

This is an assessment by an agent, not a decision. A human picks the variant and the route.

## Rules

- **Try first, then compare.** Before you draft, ask the human for which variant they would ship, and whether they would test it with users first, with a one-sentence reason. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the first try.** After drafting, tell the human in two or three short lines how strong their answer was: what was good, what was weak, and why. Judge the reason, never the variant they named. Does the reason rest on the evidence for each variant's critical assumptions? Or on which variant they like? Does the route follow from how clear that evidence is? Name their words. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the same lines under "Feedback" in "Your first try".
- **Compare assumptions, not variants** (Torres, "compare and contrast"). For each variant, take the critical assumptions from its test card and check them against `sources/` yourself; do not copy the card's level unchecked.
- **Three levels, in words:** **well supported**, **partly supported**, **unsupported**, each with reasoning, sources, counter-evidence and gaps. For an unsupported assumption, say how cheaply it can be tested (what test, with whom, what it needs).
- **Every claim quotes its source with location** (file and line or section). No quote, no claim.
- **Do not invent numbers.** Only counted numbers: sources, voices, events in the log. No scores, no probabilities, no totals, no ranking sum.
- **Routing:** if the evidence for a variant's critical assumptions is clear, it can go live. Otherwise sponsors see the variants first (experiment branch, user test). Name which case you see and why; do not choose.
- **Measurability is a tie-breaker only**, used when the assumption evidence does not separate the variants. Say when you used it.
- **Cost of being wrong lives in the kill criterion**, not in a separate criterion. Quote each card's kill criterion; do not add a risk score.
- Persona objections (`product/personas/`, sponsor reviews) are an aid, quoted with location. They are not evidence about real sponsors.
- Selection fields stay empty.

## Steps

0. **Try first.** Ask the human for which variant they would ship, and whether they would test it with users first, with a one-sentence reason. Wait for the answer before you read further or draft anything.
1. List the variants and check each has a test card. Missing card: stop and name it.
2. Per variant, assess each critical assumption against `sources/`. Search for counter-evidence on purpose.
3. Note persona objections per sponsor type, if personas or reviews exist.
4. Write the routing proposal. Then check: no number without a count and source; no field filled for the human.
5. Write the file. Give the feedback on the first try (see Rules). Tell the human in three lines where the evidence separates the variants and where it does not. Then stop.

## Output template

```markdown
# Variant comparison: <opportunity>

> Assessment by an agent on <YYYY-MM-DD>, not a decision.
> Variants: <n counted> in `discovery/specs/` · Test cards: <n counted> · User tests: <n counted, or "none in discovery/user-tests/">

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## <variant>
Test card: `discovery/test-cards/<variant>.md`

| Critical assumption | Level | Reasoning | Sources | Counter-evidence | Gap, or cheapest test |
|---|---|---|---|---|---|
| <assumption> | well / partly / unsupported | <why> | "<quote>" (`<file>`, line <n>) | <quote with location, or "none found"> | <gap; for unsupported: test, with whom, what it needs> |

- **Kill criterion (cost of being wrong):** "<quote from test card>"
- **Persona objections:** "<quote>" (`<file>`, <section>), or "none available"

## Where the evidence separates the variants
<in words, with sources; say where it does not separate them>

## Tie-breaker: measurability
<only if needed: which variant's success line can be read from the event log soonest, naming the events; otherwise "not needed">

## Routing proposal
<"Evidence is clear for <variant>: can go live" or "Evidence is not clear: sponsors see the variants first (experiment branch, user test)", with the reason>

## Decision (human)
- Variant that ships: ____ (human decides)
- Route: live / user test first: ____ (human decides)
```
