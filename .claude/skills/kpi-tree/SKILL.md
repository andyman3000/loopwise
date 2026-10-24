---
name: kpi-tree
description: Derive a three-level KPI tree (business goal, branches, measurable drivers) from the product strategy, with every assumption marked and where each driver would be measured. Use at the start of discovery, before any opportunity work, or when the strategy changes. Writes discovery/kpi-tree.md. Does not pick the branch to work on.
---

# kpi-tree

- **When:** first step of the discovery chain, before `opportunities-from-source`. Again when `product/strategy.md` changes.
- **Reads:** `product/strategy.md` (business goal), `CLAUDE.md`, and `data/` if it exists (event names, exports).
- **Writes:** `discovery/kpi-tree.md`.

This file is an **assessment by an agent, not a decision**. Say so at the top of the output.

## Rules

- **The tree is a nested Markdown list** exactly as in the template: business goal, then branches, then drivers and `Assumption:` lines, indented by two spaces per level, with `· measured:` after each driver. `/discovery/kpi-tree.md` draws it as a tree.
- **Try first, then compare.** Before you draft, ask the human for the two or three ways they think the business goal could grow, and one number they would watch for each. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- Every claim quotes its source with location (file and line or section). No quote, no claim.
- **Do not invent numbers.** No targets, baselines, scores, probabilities or totals. A number appears only if it is counted from a file (for example events found in `data/`) or quoted verbatim from the strategy.
- Every link between levels that the strategy does not state is marked `[assumption: ...]`. Most links are assumptions; say so rather than hide it.
- Drivers are measurable behaviours (a count or a rate of something that happens), never solutions, features or pages.
- Assessments in words on exactly three levels: **well supported**, **partly supported**, **unsupported**, each with reasoning, sources, counter-evidence, gaps.
- The skill never decides. "Branch to work on" stays empty for a human.

## Steps

0. **Try first.** Ask the human for the two or three ways they think the business goal could grow, and one number they would watch for each. Wait for the answer before you read further or draft anything.
1. Read `product/strategy.md`. Quote the business goal verbatim with its section. If there is no goal that can be counted, stop and say so: a tree without a countable goal cannot be compared.
2. Derive two to four branches: the independent ways the goal can grow, as the strategy describes them. Quote the passage for each branch. If you add a branch the strategy does not name, mark it `[assumption: ...]`.
3. Under each branch, two to four drivers. For each driver, name where it would be measured: an event or field in `data/` if it exists (quote the name and file), otherwise "not measured yet" plus the place it would come from (form, scoping call, follow-up survey).
4. Assess each branch: how well do the strategy and data support that it moves the goal?
5. Check before writing: no driver names a feature; every assumption is marked; no invented number; the selection field is empty.

## Output template (`discovery/kpi-tree.md`)

````markdown
# KPI tree

> Assessment by an agent (`kpi-tree` skill), not a decision. Date: YYYY-MM-DD.
> Reads: product/strategy.md, CLAUDE.md, data/ (present / not present)

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## Business goal
"<verbatim goal>" (product/strategy.md, section <name>)

## Tree
- Business goal: <goal>
  - Branch A: <name>
    - <driver> · measured: <event/field in data/... | not measured yet, would come from ...>
    - <driver> · measured: ...
    - Assumption: <why these drivers move the branch>
  - Branch B: <name>
    - ...

## Branches
### Branch A: <name>
- **Source:** "<quote>" (<file>, <section or line>)
- **Assessment:** well supported | partly supported | unsupported
- **Reasoning:** ...
- **Counter-evidence:** ... (or "none found in the files read")
- **Gaps:** ... (who could fill them)

## Assumptions in this tree
| Assumption | Where in the tree | What would test it |
|---|---|---|

## Not measured yet
<drivers without a data source, one line each>

## Branch to work on
Branch to work on: ____ (human decides)
Decided by: ____ · Date: ____ · Why: ____
````

Then stop. Do not start opportunity work.
