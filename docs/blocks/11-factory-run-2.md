# Factory run 2: the hard gate, release, retro

> **Pairs or threes, at one laptop. 35 minutes. Task: run the factory again, watch the hard gate
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

**The same script, before the write.** Claude Code starts `scripts/hooks/gate-guard.js` before the
agent's write, because `.claude/settings.json` says so (`PreToolUse`). The script reads the text the
write would leave. If it holds a price, the script answers `deny` and Claude Code cancels the write. In
run 1 the script ran after the write: a wrong button may stand in the page for a moment, a price may
not.

## What you do (35 min)

1. **Run the factory again (6 min).** Start a fresh Claude Code session (`/clear`). Then
   `/loopwise-factory call-slot run-2`.
   - First legal reads the rule, `gates/policies/no-prices.md`. Legal says in one sentence what
     the system will catch.
   - Each run builds from the kit again, so it replaces run 1's build. The factory plants one
     error on purpose and does not tell you which. While it builds, the product lead reads the open
     questions in `discovery/factory/call-slot-questions.md`.
2. **It stops: look, then try to break the rule (7 min).** The guard refused a write. Open the
   hardened page and look for the price: there is none. Read what the factory wanted to write, why and
   how the check fired, and which part was script and which part was AI. Then ask for a price yourselves.
   Copy this to Claude:
   ```text
   In site/hardened/call-slot/inquiry.html, add one line under the main heading with a price per team in euros. Make up the number.
   ```
   Then type `go on`. The factory runs `npm run check` in the open. It ends with `gates: pass`. A new
   review is in `discovery/factory/call-slot-review-run-2.md`. Nobody was asked, and no one can make an
   exception for one page. Outside the run, legal can change the rule itself.
3. **Decide the release (7 min).** The product lead reads three things:
   - the build: `http://localhost:<port>/inquiry.html?variant=call-slot&build=hardened`;
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
4. **Look at it (2 min).** After a release, open `http://localhost:<port>/inquiry.html` without any
   `?variant=`. Every visitor now gets the hardened page.
5. **Retro (11 min).** Start a fresh session (`/clear`). Then `/loopwise-factory call-slot retro`.
   It writes `discovery/factory/call-slot-retro.md` and asks you four questions, one at a time:
   - What did the gate catch?
   - What would it have missed?
   - Whose judgement was in the system, and who was asked live?
   - What did the factory have to ask that the kit did not answer?
6. **Commit (2 min).**
   ```bash
   npm test && npm run check
   git add -A && git commit -m "factory run 2: price refused, product lead decided, retro"
   ```

**Done when:** the legal gate passes and the product lead answered release or hold. After a
release, `site/config.json` says `"shipped": "call-slot"`. The release record in
`discovery/decisions/` names the product lead. After a hold, nothing ran and `site/config.json` is
unchanged. The retro file holds your answers.

**If you are stuck:** the reference state after this run is `v3-08-factory-run-2`.

**For the Abgleich:** which of the factory's questions should the launch spec have answered? What
would a gate in your own company check, and who would own it?

**Next:** back to your company table for the reflection.
