---
name: compare-opportunities
description: Narrow the opportunities in discovery/opportunities/ to a shortlist the human confirms, then compare the shortlist on fixed criteria (evidence strength, leverage, where in the funnel, need or solution in disguise, measurability, gaps) and challenge the favoured one. Use when the team asks "which opportunity should we pursue" or "compare the opportunities", after opportunities-from-source has run on the sources. Writes an assessment for a human decision; never picks the opportunity.
---

# Compare opportunities

**When:** after `opportunities-from-source` has run on the sources. Before `intent-and-ideas`.
**Reads:** every file in `discovery/opportunities/`; `discovery/kpi-tree.md`; `sources/` (all
subfolders) to verify each quote the opportunity files cite.
**Writes:** `discovery/opportunity-comparison.md`; the "Goes into comparison" lines in
`discovery/opportunities/*.md`, only after the human confirmed the shortlist.

Before the build there is only evidence, so this skill compares evidence. Torres: "compare and
contrast" opportunities against each other, rather than judging one in isolation.

## Rules

- **Try first, then compare.** Before you draft, ask the human for which opportunity they favour right now, with a one-sentence reason. Point them to their opportunity map first: with `npm start` running, `http://localhost:3000/discovery/map` shows every opportunity by source and evidence. The challenger step then also attacks their favourite, if it differs from the row the table favours. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Every claim quotes its source with location** (file and line or section). No quote, no claim.
  Open the cited file in `sources/` and check the quote is there. If it is not, say so in the cell
  and do not use it.
- **Do not invent numbers.** Only counted numbers: independent sources, voices, events in a log.
  No scores, no weights, no probabilities, no totals.
- **Three levels, in words:** well supported, partly supported, unsupported. The cells for evidence,
  leverage and measurability give the level, the reasoning, the sources, the counter-evidence and
  the gaps. The funnel row gives counts only, no level.
- **Independent sources:** two quotes from the same interview or the same mail thread are one
  source. Say whose voice it is (sponsor, participant, academy staff).
- **Shortlist: the agent narrows, the human confirms.** Propose every candidate that passes the
  keep test, never pick one, and never cut a passing candidate to reach a number. Write "Goes into comparison" only after the human explicitly said yes to the
  shortlist or changed it, and write what they confirmed, not your proposal. A vague reply ("ok",
  "go on") is not a confirmation: ask again.
- **This file is an assessment by an agent, not a decision.** "Chosen opportunity" and "What would
  flip it" stay empty for the human.
- Ask the human before including an opportunity that has no KPI branch in `discovery/kpi-tree.md`.
- **Need, not solution in disguise.** An opportunity is a need or pain. It is a solution in disguise
  when its wording names a page, button, field, format, feature or channel ("wants a price list",
  "wants to book a call"), or when only one thing could meet it. Test: name two different solutions
  that would each meet it. If you cannot, write the need underneath in the speaker's words, with the
  quote. Do not rename the opportunity in its file; the human decides whether the reworded need goes
  into the comparison.
- **`discovery/opportunities/data.md` holds observations, not opportunities.** Use an observation as
  evidence for an opportunity on the same driver ("where" next to the quote's "why"). If an
  observation on another driver fits the same need, use it too, marked
  `[assumption: the need also acts on <driver>]`: that is how data shows where a need may act
  earlier or later than the opportunity file assumed. Never compare an observation as an
  opportunity of its own.
- **Dates** in `discovery/` follow the data timeline (data/README.md), not the calendar: use the
  export date given there.

## Steps

0. **Try first.** Ask the human to open their opportunity map (`npm start`, then `http://localhost:3000/discovery/map`) and say which opportunity they favour right now, with a one-sentence reason. The challenger step then also attacks their favourite, if it differs from the row the table favours. Wait for the answer before you read further or draft anything.
1. **Shortlist.** Read all opportunity files and the KPI tree. If a "Goes into comparison" line is
   already filled, show it and ask whether it still holds; otherwise propose:
   - **Merge** the same need found in several source files into one candidate, naming every source
     and ID ("emails O1 + interviews O1 + inbox O1"). Merge only when the role (sponsor or
     participant) and the moment (before the booking or after the training) are the same. Needs that
     differ in either stay apart; name them as related.
   - **Keep** a candidate if it passes all three, judged after merging:
     - it is a need, not a solution in disguise (the need-or-solution test in Rules);
     - it sits on an active branch of `discovery/kpi-tree.md`. A side link that is only an
       `[assumption: ...]` does not count: such a candidate drops with the reason "parked branch,
       link to the active branch is an assumption";
     - it is well supported, or partly supported in two or more independent source groups.
   - **Show** every candidate that passes, each with one line on why, and any need you reworded
     under the need-or-solution test, with the wording you propose. Then show every opportunity
     that dropped out, each with its one-line reason, so the human can bring it back. If their
     favourite from step 0 dropped out, say so first.
   - **Gap line:** name every driver where `discovery/opportunities/data.md` shows a large loss and
     no candidate acts, with the count ("start rate: 546 of 740 leave, no source says why"). It is
     an open research question, not a candidate. Data never removes a candidate.
   - **Ask:** "Confirm this shortlist, or tell me what to add or drop. Who confirms?" Wait.
   - **Write** the confirmed selection into the "Goes into comparison" line of each opportunity
     file: the IDs from that file, with merges named ("O1, together with interviews O1"), or
     `none`. Fill `Decided by` with the name they gave and `Date` with the export date (Rules).
     Leave the line in `data.md` as it is: observations are evidence, not candidates. Touch
     nothing else.
2. For each criterion and each confirmed candidate, fill one cell, verifying quotes in `sources/`.
   - **Evidence strength:** counted independent sources, whose voice, observed or only feared.
   - **Leverage:** which KPI branch in `discovery/kpi-tree.md`, and how direct: can the website
     change it, or does it need a change elsewhere?
   - **Where in the funnel:** the driver the need acts on, how many people are lost there, and of
     those who reach that driver how many end in a booking, both counted from `data.md` ("call
     rate: 58 of 113 sent inquiries get no call; 23 of 55 who get a call book"). If it could act on
     more than one driver, give each. Never multiply the two: an estimated total is not a count.
   - **Need or solution:** need, or solution in disguise. Give the two solutions that would each
     meet it, or the need underneath.
   - **Measurability:** is there a signal within eight weeks, which event or field shows it, and
     how many of those events the data holds over its whole span ("55 calls in 26 weeks").
   - **Gaps and uncertainty:** what is not known, and what would answer it.
3. Name the row the table appears to favour, as "Appears favoured: <name>, because <one line>".
   This is a reading of the table, not a choice.
4. **Challenger.** You are a challenger. Your job is to find out early whether the favoured row is a
   bad bet. Be specific to the material: "what about other sponsors?" is useless, "the format
   question appears in one sponsor's interview only, `sources/interviews/...`, section 4" is useful.
   - Search `sources/` for counter-evidence to the favoured row. Quote it.
   - Run the need-or-solution test again on the favoured row, harder: does its strongest quote ask
     for a thing rather than describe a problem? Quote it.
   - Ask: does the favoured row win on how many people it reaches or on how close they are to a
     booking, and what does it lose on the other? Quote the counts.
   - Search for what would make another candidate better: a stronger branch, a quicker signal, a
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

## Shortlist
Confirmed by <name>, <date>: <candidates as confirmed, merges named>
Proposed by the agent: <the proposal, or "confirmed as proposed"> · Dropped: <ID, file: one-line reason; ...>
Gap: <driver: count, no candidate acts there; ...> Open research questions, not candidates.

## Comparison

One column per confirmed candidate.

| Criterion | <Candidate 1> | <Candidate 2> | ... |
|---|---|---|---|
| Evidence strength | <level>: <reasoning>. Sources: <file, line>. Counter: <...>. Gaps: <...> | ... |
| Leverage | <level>: KPI branch <A/B>, <direct/indirect>, can the website change it, <reasoning, source> | ... |
| Where in the funnel | <driver>: <lost there, counted> · <of those reaching it, how many book> (data.md D-number) | ... |
| Need or solution | <need: two solutions that would each meet it> or <solution in disguise: the need underneath, quote, file, line> | ... |
| Measurability (8 weeks) | <level>: <signal, which event or field, events over the data span> | ... |
| Gaps and uncertainty | <what is unknown, who can answer> | ... |

Appears favoured: <name>, because <one line>. A reading of the table, not a choice.

## Challenger (on the favoured row)

**Counter-evidence to <favoured>:**
- "<quote>" (<file, line or section>): <why it cuts against>

**Wins on, loses on:** <reach or closeness to a booking, with the counts>

**What would make another candidate the better choice:**
- "<quote>" (<file, line or section>): <what it would take>

**Could not check:** <item, who could answer>

## Decision (human)

Chosen opportunity: ____ (human decides)
What would flip it: ____
```
