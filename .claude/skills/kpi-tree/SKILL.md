---
name: kpi-tree
description: Derive a KPI tree (business goal, branches, measurable drivers) from the product strategy, count each driver from data/, and mark every assumption. Use at the start of discovery, before any opportunity work, or when the strategy changes. Writes discovery/kpi-tree.md. Does not pick the step to work on.
---

# kpi-tree

- **When:** first step of the discovery chain, before `opportunities-from-source`. Again when `product/strategy.md` changes.
- **Reads:** `product/strategy.md` (business goal), `CLAUDE.md`, `data/events.jsonl`, `data/inquiries.csv`.
- **Writes:** `discovery/kpi-tree.md`.

This file is an **assessment by an agent, not a decision**. Say so at the top of the output.

## Rules

- **The tree is a nested Markdown list** exactly as in the template: business goal, then branches, then drivers and `Assumption:` lines, indented by two spaces per level, with `· measured:` after each driver. `/discovery/kpi-tree.md` draws it as a tree.
- **Try first, then compare.** Before you draft, ask the human: "Which steps does a sponsor go through from the website to a booking, and where do you think most of them drop out?" Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft and the counts differ. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- Every claim quotes its source with location (file and line or section). No quote, no claim.
- **Count, do not estimate.** Each driver in the active branch gets its count from `data/`, plus the share of the step before it in percent. Name the event or column it was counted from. No targets, scores, probabilities or forecasts.
- Every link between levels that the strategy does not state is marked `[assumption: ...]`. Keep only the assumptions that matter for choosing a step: at most three.
- Drivers are measurable behaviours (a count or a rate of something that happens), never solutions, features or pages.
- Assess the active branch in words on exactly three levels: **well supported**, **partly supported**, **unsupported**, with reasoning, sources, counter-evidence, gaps.
- The skill never decides. "Step to work on" stays empty for a human.
- Keep the file short. A participant reads it in five minutes.

## Steps

0. **Try first.** Ask the question above. Wait for the answer before you read further or draft anything.
1. Read `product/strategy.md`. Quote the business goal verbatim with its section. If there is no goal that can be counted, stop and say so.
2. Take the branches the strategy names. The branch the strategy works on this quarter is the active branch. A branch the strategy parks gets one line in the tree, marked "not this quarter", with its quote, and no drivers.
3. Under the active branch, the drivers the strategy names, in the order a sponsor meets them. Count each one over the whole export:
   - inquiry page views: `page_view` with `props.page` = `inquiry` in `data/events.jsonl`
   - other steps: the matching event type in `data/events.jsonl`
   - cross-check submitted inquiries, calls and bookings against `data/inquiries.csv` and say if they differ
   Give the time span of the export (first and last event date).
4. Name the step with the largest drop and the step with the second largest. Say in one sentence why the largest drop is not automatically the one to work on (for example: most page views on any website do not start a form).
5. Check before writing: every number is counted and names its source; no driver names a feature; assumptions are marked; the selection field is empty.

## Output template (`discovery/kpi-tree.md`)

````markdown
# KPI tree

> Assessment by an agent (`kpi-tree` skill), not a decision. Date: YYYY-MM-DD.
> Reads: product/strategy.md, CLAUDE.md, data/events.jsonl, data/inquiries.csv
> data/ is synthetic (data/README.md). Export from <first date> to <last date>.

<one short sentence per term, only if CLAUDE.md asks for it: KPI tree, branch, driver>

## Your first try
<the human's answer, word for word>

Where the draft differs:
- <two or three short lines>

## Business goal
"<verbatim goal>" (product/strategy.md, section <name>)

## Tree
- Business goal: <goal>
  - Branch A: <name> (this quarter)
    - <driver> · measured: <count> (<share of the step before>), `<event or column>` in data/<file>
    - <driver> · measured: ...
    - Assumption: <the link that matters most>
  - Branch B: <name> (not this quarter, product/strategy.md, section <name>)

## Where the path loses people
- Largest drop: <step to step>, <count lost> of <count> (<percent>).
- Second largest: <step to step>, <count lost> of <count> (<percent>).
- <one sentence: why the largest drop is not automatically the one to work on>

## Branch A: <name>
- **Source:** "<quote>" (<file>, <section or line>)
- **Assessment:** well supported | partly supported | unsupported
- **Reasoning:** ...
- **Counter-evidence:** ... (or "none found in the files read")
- **Gaps:** ... (who could fill them)

## Assumptions that matter
| Assumption | What would test it |
|---|---|

## Step to work on
Step to work on: ____ (human decides)
Decided by: ____ · Date: ____ · Why: ____
````

Then stop. Do not start opportunity work.
