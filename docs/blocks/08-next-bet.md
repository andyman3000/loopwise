# Block 8: Demo, next bet

**What it's for:** the result flows back into the KPI tree. The next opportunity is chosen on the
same tree, and the loop closes. In the workshop the trainer runs it as part of the demo. Afterwards
you can run it yourself.

## In the workshop (part of the demo)

The trainer runs `/next-bet` on the reference. It first asks what you would work on next, and why.
Then it enters the measured values in `discovery/kpi-tree.md`. It appends a section to
`discovery/opportunity-comparison.md`: the status of the tested opportunity and a proposal for the
next one. Watch for two things:

- which new evidence it uses. The reference quiz stores what each sponsor ticked, so the new
  evidence is shaped by the quiz's questions.
- the field `Next opportunity` stays empty: a human decides.

## Run it yourself afterwards (about 30 min)

You need a Result section. Either run `/read-result` on your `demo` branch first (block 7,
"Afterwards"), or start from the reference result: `git switch -c demo-result 07-result`.

1. In Claude Code: `/next-bet`. Answer its first question yourself: what would you work on next?
2. Read the proposal. Which new evidence does it use? Did the questions on the shipped page shape it?
3. Decide the next opportunity. Fill `Next opportunity`, `Who` and `Date` at the end of
   `discovery/opportunity-comparison.md`.
4. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 8: next bet"
   ```

**Done when:** the KPI tree carries measured values and the next opportunity is chosen.

**For the Abgleich:** compare your tree from block 1 with the one now. What changed?
