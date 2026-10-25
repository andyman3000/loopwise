# Block 8: Demo, next bet

**What it's for:** the result flows back into the KPI tree, and the next opportunity is chosen on
the same tree. The loop closes. In the workshop the trainer runs it as part of the demo. Afterwards
you can run it yourself on the `demo` branch.

## In the workshop (part of the demo)

The trainer runs `/next-bet` on the reference. It enters the measured values in
`discovery/kpi-tree.md`, sets the status of the tested opportunity, and appends a proposal to
`discovery/opportunity-comparison.md`. Watch for two things:

- which new evidence it uses, and whether the question the variant asked shaped that evidence;
- that the field `Next opportunity` stays empty: a human decides.

## Run it yourself afterwards (about 30 min)

You need the Result section from block 7 on your `demo` branch.

1. In Claude Code: `/next-bet`.
2. Read the proposal. Which new evidence does it use, and is any of it shaped by the question the
   variant asked?
3. Decide the next opportunity. Fill `Next opportunity`, `Who`, `Date` at the end of
   `discovery/opportunity-comparison.md`.
4. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 8: next bet"
   ```

**Done when:** the KPI tree carries measured values and the next opportunity is chosen.

**For the Abgleich:** compare your tree from block 1 with the one now. What changed?
