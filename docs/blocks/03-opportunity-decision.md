# Block 3: Compare opportunities and decide

**What it's for:** you choose which opportunity to pursue, on evidence, leverage on the KPI tree,
and what you can measure within eight weeks. The agent compares and challenges; you decide.

## What you do (about 60 min)

1. Run `npm start`. In Claude Code: `/compare-opportunities`. It first asks which opportunity you
   favour. Answer from your opportunity map at `http://localhost:3000/discovery/map`: the colour
   shows how well each opportunity is supported, the dots count the voices.
2. The skill merges the same need across sources and proposes every candidate that passes its
   keep test, with everything it dropped and why, and the steps where the data shows a loss no
   source explains. Confirm it, or say what to add or drop, and give your name. It
   writes your choice into "Goes into comparison", then writes `discovery/opportunity-comparison.md`.
3. Open `http://localhost:3000/discovery/tree`. It draws the comparison as a tree: the business
   goal on top, the funnel steps below it, your candidates at the bottom, each linked to the steps
   it acts on. Read three things there:
   - the question in the box on top, and which candidates are not readable from today's data in eight weeks;
   - the steps with a dashed grey border: a loss, and no candidate acts there;
   - on each card, what it wins on and what it loses on. Click a card to see only its links.
4. Open the comparison file only for the candidate you doubt. Read its evidence and the
   challenger. Do the strongest voices come from a question that asked for exactly that answer?
   The challenger quotes the interviewer's question before each strongest quote.
5. Decide. Fill "Chosen opportunity" and "We would switch if" in
   `discovery/opportunity-comparison.md`. Reload the tree: your choice shows on top and on its card.
6. Record the decision in `discovery/decisions/001-<short-name>.md`:
   ```markdown
   # Decision 001: <chosen opportunity>

   ## What we decided
   ## Options considered
   ## Why, with the evidence it rests on (file and line)
   ## We would switch if
   ## Who
   ## When
   ```
7. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 3: opportunity decision"
   ```

**Done when:** the comparison exists and decision 001 names the opportunity, the options, a reason
and who decided.

Two pairs may choose the same opportunity. That is fine: in block 4, try to test a different solution.

**For the Abgleich:** did you pick the better supported opportunity or the more reachable one, and why?
