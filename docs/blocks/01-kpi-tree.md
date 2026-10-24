# Block 1: KPI tree

**What it's for:** before you read any customer material, you decide which numbers the business goal
depends on. Every opportunity later gets checked against one branch of this tree.

## What you do (about 30 min)

1. In Claude Code: `/kpi-tree`. It reads `product/strategy.md`, `product/vision.md` and the material,
   and writes `discovery/kpi-tree.md`.
2. Open `http://localhost:3000/discovery/kpi-tree.md` (with `npm start` running) to see the tree drawn.
   Read it. For each driver ask: is it measured already, or marked "not measured yet"? Which
   links are marked `[assumption: ...]`?
3. Pick one assumption and check it against `product/strategy.md`. Is it really an assumption, or
   does the strategy state it as fact?
4. Decide which branch you want to work on. Fill the fields at the end of `discovery/kpi-tree.md`:
   `Branch to work on`, `Decided by`, `Date`, `Why` (one sentence).
5. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 1: KPI tree"
   ```

**Done when:** `discovery/kpi-tree.md` exists and the branch is chosen with a reason.

**For the Abgleich:** which branch did you pick, and which assumption would you test first?
