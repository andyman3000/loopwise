# Block 2: Opportunities from sources

**What it's for:** you find customer needs and pains in the raw material, one source group at a
time, each with a quote, its location and counter-evidence. Needs, not solutions.

## What you do (about 35 min)

1. In Claude Code: `/opportunities-from-source`. It lists every source group in `sources/`. Start
   with `interviews`. It writes `discovery/opportunities/interviews.md`.
2. Read it critically:
   - Does every opportunity quote the source with file and line? Open two of them and check.
   - Is anything a solution in disguise ("they need a dashboard")?
   - How many different voices carry each opportunity, and does the file say so?
3. Run it again for the other source groups as time allows: `emails`, `feedback`, `inbox`. The last
   row, `data`, is the usage data: it gives observations (where people drop out), not opportunities.
   Which source group could tell you why? The reference state `02-opportunities` has all four.
4. Leave "Goes into comparison" empty for now. You fill it at the start of block 3.
5. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 2: opportunities"
   ```

**Done when:** at least `interviews.md` exists and you have checked two of its quotes yourself.

**For the Abgleich:** which opportunity rests on a single voice? Would you still keep it?
