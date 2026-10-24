---
name: compare-opportunities
description: Compare the candidate opportunities in discovery/opportunities/ on fixed criteria (evidence strength, leverage, measurability, gaps) and challenge the favoured one. Use when the team asks "which opportunity should we pursue", "compare the opportunities", or after the human has chosen which opportunities go into the comparison. Writes an assessment for a human decision; never picks the opportunity.
---

# Compare opportunities

**When:** after `opportunities-from-source` has run on the sources and the human has said which
opportunities go into the comparison. Before `intent-and-ideas`.
**Reads:** every file in `discovery/opportunities/`; `discovery/kpi-tree.md`; `sources/` (all
subfolders) to verify each quote the opportunity files cite.
**Writes:** `discovery/opportunity-comparison.md`.

Before the build there is only evidence, so this skill compares evidence. Torres: "compare and
contrast" opportunities against each other, rather than judging one in isolation.

## Rules

- **Try first, then compare.** Before you draft, ask the human for which opportunity they favour right now, with a one-sentence reason. The challenger step then also attacks their favourite, if it differs from the row the table favours. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Every claim quotes its source with location** (file and line or section). No quote, no claim.
  Open the cited file in `sources/` and check the quote is there. If it is not, say so in the cell
  and do not use it.
- **Do not invent numbers.** Only counted numbers: independent sources, voices, events in a log.
  No scores, no weights, no probabilities, no totals.
- **Three levels, in words:** well supported, partly supported, unsupported. Each cell gives the
  level, the reasoning, the sources, the counter-evidence and the gaps.
- **Independent sources:** two quotes from the same interview or the same mail thread are one
  source. Say whose voice it is (sponsor, participant, academy staff).
- **This file is an assessment by an agent, not a decision.** The selection fields stay empty.
- Ask the human before including an opportunity that has no KPI branch in `discovery/kpi-tree.md`.

## Steps

0. **Try first.** Ask the human for which opportunity they favour right now, with a one-sentence reason. The challenger step then also attacks their favourite, if it differs from the row the table favours. Wait for the answer before you read further or draft anything.
1. Read all opportunity files and the KPI tree. List the opportunities you will compare and show
   the list before writing.
2. For each criterion and each opportunity, fill one cell, verifying quotes in `sources/`.
   - **Evidence strength:** counted independent sources, whose voice, observed or only feared.
   - **Leverage:** which KPI branch in `discovery/kpi-tree.md`, and how direct: can the website
     change it, or does it need a change elsewhere?
   - **Measurability:** is there a signal within eight weeks, and which event or field shows it?
   - **Gaps and uncertainty:** what is not known, and what would answer it.
3. Name the row the table appears to favour, as "Appears favoured: <name>, because <one line>".
   This is a reading of the table, not a choice.
4. **Challenger.** You are a challenger. Your job is to find out early whether the favoured row is a
   bad bet. Be specific to the material: "what about other sponsors?" is useless, "the format
   question appears in one sponsor's interview only, `sources/interviews/...`, section 4" is useful.
   - Search `sources/` for counter-evidence to the favoured row. Quote it.
   - Search for what would make the other option better: a stronger branch, a quicker signal, a
     cheaper way to reach it. Quote it.
   - Name what you could not check, and who could answer it.
   Do not answer your own challenges and do not change the table to fit them.
5. Write the file with the template below. Then stop. Do not start an intent.

## Output template

```markdown
# Opportunity comparison

> Assessment by an agent (`compare-opportunities`), not a decision. Date: YYYY-MM-DD.
> Inputs: <list of files in discovery/opportunities/>, discovery/kpi-tree.md

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## Comparison

| Criterion | <Opportunity 1> | <Opportunity 2> |
|---|---|---|
| Evidence strength | <level>: <reasoning>. Sources: <file, line>. Counter: <...>. Gaps: <...> | ... |
| Leverage | <level>: KPI branch <A/B>, <direct/indirect>, <reasoning, source> | ... |
| Measurability (8 weeks) | <level>: <signal, which event or field> | ... |
| Gaps and uncertainty | <what is unknown, who can answer> | ... |

Appears favoured: <name>, because <one line>. A reading of the table, not a choice.

## Challenger (on the favoured row)

**Counter-evidence to <favoured>:**
- "<quote>" (<file, line or section>): <why it cuts against>

**What would make <other> the better choice:**
- "<quote>" (<file, line or section>): <what it would take>

**Could not check:** <item, who could answer>

## Decision (human)

Chosen opportunity: ____ (human decides)
What would flip it: ____
```
