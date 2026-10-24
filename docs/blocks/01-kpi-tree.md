# Block 1: KPI tree

**What it's for:** before you read any customer material, you see which numbers the business goal
depends on, and where the path to a booking loses people. Every opportunity later gets checked
against this tree.

## What you do (about 30 min)

1. Read `product/strategy.md`. It is one page. Note the business goal and the one path the academy
   works on this quarter.
2. In Claude Code: `/kpi-tree`. It first asks you which steps a sponsor goes through and where most
   drop out. Answer before it drafts. It then counts each step from `data/` and writes
   `discovery/kpi-tree.md`.
3. Open `http://localhost:3000/discovery/kpi-tree.md` (with `npm start` running) to see the tree drawn.
   Compare the counts with your guess. Where was it right, where wrong?
4. Read "Where the path loses people". The biggest drop is not always the one to work on. Why not?
5. Decide which step you want to work on. Fill the fields at the end of `discovery/kpi-tree.md`:
   `Step to work on`, `Decided by`, `Date`, `Why` (one sentence).
6. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 1: KPI tree"
   ```

**Done when:** `discovery/kpi-tree.md` exists and the step is chosen with a reason.

**For the Abgleich:** which step did you pick, and how far off was your first guess?
