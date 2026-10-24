---
name: opportunities-from-source
description: Find opportunities (customer needs or pains, never solutions) in one source group under sources/, with verbatim quotes and line locations, counted voices, the KPI branch each would move, and counter-evidence. Run once per source group, e.g. "opportunities-from-source sources/interviews". Writes discovery/opportunities/<source-group>.md. Does not choose what goes into the comparison.
---

# opportunities-from-source

- **When:** after `kpi-tree`, once per source group (`sources/interviews`, `sources/emails`, `sources/feedback`, `sources/inbox`, `sources/analytics`).
- **Input:** one folder or file under `sources/`. If none is given, offer every source group first (step 0a), then wait.
- **Reads:** that source, `discovery/kpi-tree.md`, `product/personas/`.
- **Writes:** `discovery/opportunities/<source-group>.md` (for example `interviews.md`).

This file is an **assessment by an agent, not a decision**. Say so at the top of the output.

## Rules

- **Try first, then compare.** Before you draft, ask the human for the need behind one quote. Show one quote from the source with file:line, then ask: what need or pain sits behind it, and is what the person says a need or already a solution?. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- Every claim quotes its source with location: file and line (`sources/interviews/participants-group-1.md:24`). No quote, no claim. Quotes are verbatim and short (one sentence or less).
- **Do not invent numbers.** Count only what is in the files: sources, items, distinct speakers. No scores, no probabilities, no totals, no "most users".
- Phrase each opportunity as a need or pain, in the speaker's words where possible. If it names a button, page, field or format, it is a solution: put it under "Solution ideas heard".
- **Voices:** count distinct speakers per opportunity and name their role (sponsor, participant, other). The interviewer is not a voice. One person said three times is one voice. Mark second-hand evidence (someone reporting what others said) as second-hand.
- **Do not merge distinct needs.** Two needs that sound alike but come from different roles or different moments stay separate, with a line saying why they are separate.
- **Decoy-like findings:** loud, vivid or repeated themes that do not link to any KPI branch, or rest on one voice, or are solution requests in disguise, go under "Looks like an opportunity, but". Say honestly why.
- Counter-evidence from the same source is mandatory per opportunity. "None found in this source" is a valid answer; leaving it out is not.
- Assessments in words on exactly three levels: **well supported**, **partly supported**, **unsupported**, each with reasoning, sources, counter-evidence, gaps.
- If `discovery/kpi-tree.md` is missing, stop and say so: opportunities without a branch cannot be compared.
- The skill never decides. "Goes into comparison" stays empty for a human.

## Steps

0a. **Offer the sources** (only if none was given). List every folder under `sources/` as it is on disk, never from memory: name, number of files, and what kind of material it is (the `Basis` line from the file headers, for example "anonymised composite" or "synthetic"). Mark empty folders as empty. Ask which one to read, and wait.
0. **Try first.** Read just enough of the source to pick one telling quote. Show it with file:line and ask: what need or pain sits behind it, and is it a need or already a solution? Wait for the answer before you draft anything.
1. Read the KPI tree, the personas, then every file of the source. Tell the human in three lines: which branches you map against, what the source holds (type, files, speakers), what is missing.
2. Cluster evidence into opportunities. Three to six strong ones beat many weak ones.
3. For each: quotes with file:line, voices counted, KPI branch and driver from `discovery/kpi-tree.md` (the short name, for example "call rate") with the link (an `[assumption: ...]` if the tree does not state it), counter-evidence, gaps, assessment.
4. Check before writing: no opportunity names a solution; every opportunity has a quote with line; voices are counted, not estimated; nothing is ranked or chosen.

## Output template (`discovery/opportunities/<source-group>.md`)

```markdown
# Opportunities from <source-group>

> Assessment by an agent (`opportunities-from-source` skill), not a decision. Date: YYYY-MM-DD.
> Reads: <files>, discovery/kpi-tree.md, product/personas/

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## Source
| File | Type | Speakers (role) | Basis line from the file |
|---|---|---|---|

## Opportunities
### O1: <need or pain>
- **Evidence:**
  - "<short verbatim quote>" (<file>:<line>, <speaker>, <role>)
- **Voices:** <n> distinct speakers: <roles>. Second-hand: <yes/no, which>
- **KPI branch:** <Branch X: name>, driver <short name from the tree> because ... [assumption: ...]
- **Counter-evidence in this source:** "<quote>" (<file>:<line>) | none found in this source
- **Gaps:** ...
- **Assessment:** well supported | partly supported | unsupported. <reasoning>

## Looks like an opportunity, but
| Finding | Quote and location | Why it is not one (yet) |
|---|---|---|

## Solution ideas heard
| Idea | Quote and location | Opportunity it might serve |
|---|---|---|

## Goes into comparison
Goes into comparison: ____ (human decides)
Decided by: ____ · Date: ____
```

Then stop. Do not compare across sources; that is `compare-opportunities`.
