# Block 1: KPI tree

**What it's for:** before you read any customer material, you see what the business goal depends on
and which of those numbers the team can move. Every opportunity later names the branch and driver it
would move.

## What you do (about 30 min)

1. Read `product/strategy.md`. It is one page. Note the business goal and the path the academy works
   on this quarter.
2. In Claude Code: `/kpi-tree`. It first asks you which steps a sponsor goes through from the website
   to a booking. Answer before it drafts. It then writes `discovery/kpi-tree.md` and draws it as
   `discovery/kpi-tree.html`.
3. Open `discovery/kpi-tree.html` in your browser to see the tree. Compare it with your steps. Which step did you name that the tree does not have, and why?
4. Read the formula under the tree. Each driver multiplies the others: a small change in any of them
   moves the bookings.
5. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 1: KPI tree"
   ```

**Done when:** `discovery/kpi-tree.md` exists and you can say in one sentence what each driver counts.

**For the Abgleich:** which steps did you name that the tree left out?
