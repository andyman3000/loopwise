# Factory run 2: the hard gate, release, retro

> **Pairs or threes, at one laptop. 45 minutes. Task: run the factory again, watch the hard gate
> refuse a write, decide the release, and hold the retro.**

**What it's for:** a soft gate lets its owner make an exception outside the run. A hard gate
takes no exception, not even from its owner. Then one person is asked live: the product lead
decides whether the build goes to real visitors. The release here is simulated. It sets one key
on your laptop. Nothing is deployed anywhere.

Keep the roles from run 1: designer, product lead, and in a three, legal. In a pair, the designer
is legal too.

| | Legal gate |
|---|---|
| Rule | no prices on the website |
| Owner | legal |
| Kind | hard: no exception, legal included |
| Where it fires | before the write; the write is refused |
| Owner in the run | nothing to do |
| Owner outside the run | a change to the rule (`gates/policies/no-prices.md`, `gates/gates.json`) |

The design gate is the same as in run 1 ([10-factory-run-1.md](10-factory-run-1.md)).

## What you do (about 45 min)

1. **Run the factory again (15 min).** Start a fresh Claude Code session (`/clear`). Then
   `/loopwise-factory call-slot run-2`.
   - First legal reads the rule, `gates/policies/no-prices.md`. Legal says in one sentence what
     the system will catch (about 2 min).
   - Each run builds from the kit again, so it replaces run 1's build. The factory plants one
     error on purpose and does not tell you which.
   - The guard checks each write in `site/hardened/` before it lands. It refuses the write with
     the price. The price never reaches the file. Nobody is asked.
   - At the end the factory runs `npm run check` in the open. It ends with `gates: pass`.
   - A new review is in `discovery/factory/call-slot-review-run-2.md`.
2. **Read what the system did (5 min).** The factory names who owns the gate: legal. It names the
   kind (hard) and where the gate fired: before the write in `site/hardened/`. Nobody was asked in
   the run. Legal's judgement was already in the rule. Outside the run, legal can change the rule
   itself. No one can make an exception for one page.
3. **Decide the release (7 min).** The product lead reads three things:
   - the build: `npm start`, then
     `http://localhost:3000/inquiry.html?variant=call-slot&build=hardened`;
   - the review;
   - the open questions in `discovery/factory/call-slot-questions.md`.

   The factory shows the launch card's success line next to the step the intent names. Both
   should be the same. Then the factory asks: release or hold? Only the product lead answers. An
   open question can be a reason to hold.
   - **Release:** the factory runs `npm run release -- call-slot --approved-by <name>`. Claude Code
     asks for permission on that command. That yes is the approval, like approving a pull request
     for production. Only the product lead clicks it. The release runs every gate again. It sets
     `shipped` in `site/config.json` and writes its record into `discovery/decisions/`.
   - **Hold:** nothing runs. `site/config.json` stays as it is. A hold is a decision too.
4. **Look at it (3 min).** After a release, open `http://localhost:3000/inquiry.html` without any
   `?variant=`. Every visitor now gets the hardened page. Stop the server with `Ctrl+C`.
5. **Retro (12 min).** Start a fresh session (`/clear`). Then `/loopwise-factory call-slot retro`.
   It writes `discovery/factory/call-slot-retro.md` and asks you four questions, one at a time:
   - What did the gate catch?
   - What would it have missed?
   - Whose judgement was in the system, and who was asked live?
   - What did the factory have to ask that the kit did not answer?
6. **Commit (3 min).**
   ```bash
   npm test && npm run check
   git add -A && git commit -m "factory run 2: gate fixed, release decided, retro"
   ```

**Done when:** the legal gate passes and the product lead answered release or hold. After a
release, `site/config.json` says `"shipped": "call-slot"`. The release record in
`discovery/decisions/` names the product lead. After a hold, nothing ran and `site/config.json` is
unchanged. The retro file holds your answers.

**If you are stuck:** the reference state after this run is `v3-08-factory-run-2`.

**For the Abgleich:** which of the factory's questions should the launch spec have answered? What
would a gate in your own company check, and who would own it?

**Next:** back to your company table for the reflection.
