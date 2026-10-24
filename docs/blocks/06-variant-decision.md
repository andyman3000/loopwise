# Block 6: Compare variants and decide

**What it's for:** you decide which variant goes live, or whether it needs a user test first, and
what that test would look like: whom you ask, what you show, what the answer decides.

## What you do (about 40 min)

1. In Claude Code: `/compare-variants`. It writes `discovery/variant-comparison.md`.
2. Read its route proposal: live, or user test first? On which assumption does it hinge?
3. Decide. Fill "Variant that ships" and "Route" in `discovery/variant-comparison.md`. If you chose a
   user test, write three lines: whom you ask, what you show, what the answer decides.
4. Record it in `discovery/decisions/002-<short-name>.md`, same shape as decision 001.
5. Commit, then switch to the reference state. It has the reference decision, the shipped variant and
   eight weeks of synthetic data:
   ```bash
   npm run check
   git add -A && git commit -m "block 6: variant decision"
   git switch -c from-06 06-variant-decision
   ```
6. `npm start` and open `http://localhost:3000/dashboard`.

**Done when:** your decision 002 is committed and you are on `from-06` with the dashboard open.

**For the Abgleich:** who shipped a different variant than the reference, and why?
