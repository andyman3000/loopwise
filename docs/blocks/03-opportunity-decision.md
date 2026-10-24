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
3. Read the challenger part. Do the strongest voices come from a question that asked for exactly
   that answer? Is the favoured opportunity measurable in eight weeks?
4. Decide. Fill "Chosen opportunity" and "What would flip it" in
   `discovery/opportunity-comparison.md`.
5. Record the decision in `discovery/decisions/001-<short-name>.md`:
   ```markdown
   # Decision 001: <chosen opportunity>

   ## What we decided
   ## Options considered
   ## Why, with the evidence it rests on (file and line)
   ## What would flip it
   ## Who
   ## When
   ```
6. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 3: opportunity decision"
   ```

**Done when:** the comparison exists and decision 001 names the opportunity, the options, a reason
and who decided.

**For the Abgleich:** did you pick the better supported opportunity or the more reachable one, and why?
