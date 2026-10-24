---
name: next-bet
description: Carry a read result back into the tree. Use after read-result has written the Result section and someone asks "what next?", "update the KPI tree", "which opportunity now?". Enters measured values on the KPI tree branch, sets the status of the tested opportunity, reads the new success-line answers as a fresh source, and proposes the next opportunity. Never decides.
---

# next-bet

> **When:** after `read-result`, once the Result section of the shipped variant's test card exists.
> **Reads:** `site/config.json` (key `shipped`); the `## Result` section of `discovery/test-cards/<variant>.md`;
> `discovery/kpi-tree.md`; `discovery/opportunities/`; `discovery/opportunity-comparison.md`;
> `discovery/decisions/`; `data/inquiries.csv` (the success-line answers, read as a NEW source).
> **Writes:** two paths, by design (plan: "update both"): `discovery/kpi-tree.md` (measured values on
> the branch) and `discovery/opportunity-comparison.md` (an appended status and next-bet section). This
> is the one skill in the chain that writes two artefacts, because the loop closes on both.

You close the loop: what was measured goes back on the tree, and the new answers from the shipped
feature are read as evidence for the next opportunity. You are an agent writing an assessment, not a
decision.

## Rules

- **Every claim quotes its source with location**: file and line or section. A success-line answer is
  quoted verbatim with its row in `data/inquiries.csv`. No quote, no claim.
- **Do not invent numbers.** Only counted numbers: values from the Result section (copied, not
  recomputed differently), answers counted in the export. No scores, no probabilities, no totals.
- **Assessments in words, three levels only:** well supported, partly supported, unsupported. Each with
  reasoning, sources, counter-evidence and gaps.
- **Mark every measured value** on the KPI tree with date and source: `measured <YYYY-MM-DD>, source:
  discovery/test-cards/<variant>.md#result`. Leave assumptions marked as assumptions; change one only by
  adding what the result says about it.
- **Edit the KPI tree surgically.** Add values next to the existing metrics; do not restructure the tree.
- **Append, do not rewrite,** in `discovery/opportunity-comparison.md`. Earlier sections stay as written.
- **Do not decide the next opportunity, and do not decide whether the Result's proposal is accepted.**
  If the Result's Decision field is still empty, say so at the top of the appended section.
- **Synthetic data:** if the Result says so, repeat it in both writes.

## Steps

1. Read the Result section. Copy the counted values and the weeks they cover.
2. Read the KPI tree; find the branch the tested opportunity hangs on (quote it). Enter the values.
3. Read the decision files for the tested opportunity: what it said would tip the decision. Check it.
4. Read every success-line answer in `data/inquiries.csv`. Sort each into the opportunities in
   `discovery/opportunities/` it describes, or "fits none". Quote each with its row. Count per opportunity.
5. Compare: which opportunity does the evidence now point to, and how does that change the earlier
   comparison? Name counter-evidence and what one more source would settle.

## Output template, write 1: `discovery/kpi-tree.md`

```markdown
│   ├── inquiry completion rate (started -> submitted)
│   │    measured <YYYY-MM-DD>: before <n>/<n>, after <n>/<n> · source: discovery/test-cards/<variant>.md#result
```

## Output template, write 2: appended to `discovery/opportunity-comparison.md`

```markdown
## Status after <variant>, <YYYY-MM-DD>

> Assessment by the next-bet agent. Not a decision. [Synthetic data.] [Result decision still open.]

### Tested opportunity: <name>
Status: well supported / partly supported / unsupported, with reasoning, the Result counts, what the
decision file said would tip it and whether it did.

### New source: success-line answers (data/inquiries.csv)
| Opportunity | Answers (n) | Quotes with row |
|---|---|---|
| fits none | n | |

### Where the evidence now points
Per opportunity: well supported / partly supported / unsupported, reasoning, counter-evidence, gaps.

**Next opportunity:** ____ (human decides) · **Who:** ____ · **Date:** ____
```
