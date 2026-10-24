---
name: kpi-tree
description: Draw the KPI tree for the business goal: the branches the strategy names, and under each the drivers the team can influence, each tied to the event that measures it. Use at the start of discovery, before any opportunity work, or when the strategy changes. Writes discovery/kpi-tree.md and draws it as discovery/kpi-tree.html. Shows the mechanism only; it does not diagnose, rank or recommend.
---

# kpi-tree

- **When:** first step of the discovery chain, before `opportunities-from-source`. Again when `product/strategy.md` changes.
- **Reads:** `product/strategy.md` (goal and branches), `CLAUDE.md`, `data/events.jsonl` and `data/inquiries.csv` (which events and columns exist).
- **Writes:** `discovery/kpi-tree.md` (the tree as text) and `discovery/kpi-tree.html` (the same tree drawn, made by `npm run tree`).

A KPI tree breaks one output metric (the business goal) into the input metrics a team can move.
Each link is a plain relationship: a product or a sum. This skill draws that tree and nothing else.

## Rules

- **Only the tree.** Goal, branches, drivers, the formula of each branch. No counts, no drop-off ranking, no assessment, no assumptions table, no recommendation, no decision field. Opportunities, assumptions and the choice of what to move come in later blocks.
- **Data builds the tree, it does not appear in it.** Use `data/` to check that each driver can be measured and to name its event or column. Do not write counts or rates into the file.
- **The tree is a nested Markdown list** exactly as in the template, indented by two spaces per level, with `· measured:` after each driver. `/discovery/kpi-tree.md` draws it as a tree. Never put ` · ` anywhere else in a tree line: the drawing drops what follows it.
- **Drivers are things the team can influence**, written as a count or a rate of something people do. Never a solution, feature or page.
- **Every branch the strategy names** goes into the tree. A branch the strategy parks keeps its name and the words "not this quarter", and gets no drivers.
- **Quote the strategy** for the goal and each branch, with file and line. No quote, no branch.
- **Try first, then compare.** Before you draft, ask the human: "Which steps does a sponsor go through from the website to a booking?" Wait for the answer and never invent it. Afterwards, fill "Your first try": their answer word for word, then at most two lines on where the tree differs. If they say skip, write "skipped". Do not shorten this step.
- Keep the file short. If it does not fit on one screen, cut.

## Steps

0. **Try first.** Ask the question above. Wait for the answer before you read further or draft anything.
1. Read `product/strategy.md`. Quote the business goal with its line. If it cannot be counted, stop and say so.
2. Take the branches the strategy names, in its order.
3. For the active branch, take the drivers the strategy names in the order a sponsor meets them. Write each as a count or a rate (for example "start rate: started per inquiry page view").
4. For each driver, find the event in `data/events.jsonl` or the column in `data/inquiries.csv` that measures it. If none exists, write "no event yet".
5. Write the branch formula: the goal of the branch as the product (or sum) of its drivers.
6. Check: no number from `data/` in the file, every driver has a measure or "no event yet", the parked branch has no drivers, the file fits on one screen.
7. Draw it: run `npm run tree`. It writes `discovery/kpi-tree.html` from the Markdown. Never write or edit the HTML by hand; if the drawing is wrong, fix the Markdown and draw again. Tell the human to open the file in the browser.

## Output template (`discovery/kpi-tree.md`)

````markdown
# KPI tree

> Drawn by an agent (`kpi-tree` skill) from product/strategy.md and the event names in data/ (synthetic). Date: YYYY-MM-DD.

<one short sentence per term, only if CLAUDE.md asks for it: KPI tree, branch, driver>

## Your first try
<the human's answer, word for word>

Where the tree differs:
- <at most two short lines>

## Tree
- Business goal: <goal> (product/strategy.md:<line>)
  - Branch A: <name> (product/strategy.md:<line>)
    - <driver> · measured: `<event or column>` in data/<file>
    - <driver> · measured: ...
  - Branch B: <name>, not this quarter (product/strategy.md:<line>)

## How branch A works
<branch outcome> = <driver> × <driver> × ...
````

Then run `npm run tree` and stop. Do not start opportunity work.
