# Block 8: Next bet

**What it's for:** the result flows back into the KPI tree, and the next opportunity is chosen on
the same tree. The loop closes.

## What you do (about 30 min)

1. In Claude Code: `/next-bet`. It enters the measured values in `discovery/kpi-tree.md`, sets the
   status of the tested opportunity, and appends its proposal to `discovery/opportunity-comparison.md`.
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
