# Factory run 2: the hard gate, release, retro

> **Pairs or threes, at one laptop. 45 minutes. Task: run the factory again, get call-slot past the
> hard gate, decide the release, and hold the retro.**

**What it's for:** a soft gate can be waived by its owner. A hard gate cannot: fix it, or the
release does not happen. Then a person decides whether the build goes to real visitors. The
release here is simulated: it sets one key on your laptop, nothing is deployed anywhere.

Keep the roles from run 1: designer, product lead, and in a three, legal.

## What you do (about 45 min)

1. **Run the factory again (15 min).** Start a fresh Claude Code session (`/clear`). Then
   `/loopwise-factory call-slot run-2`. Each run builds from the kit again, so it replaces run 1's build. It
   plants one error on purpose. Read the gate lines of `npm run check`. A new review is in
   `discovery/factory/call-slot-review-run-2.md`.
2. **Try a waiver (3 min).** The rule behind the failing gate is in `gates/policies/`. Its owner is
   legal. Copy `.claude/skills/loopwise-factory/waiver-template.md` to
   `discovery/decisions/<next number>-legal-waiver-call-slot.md`, write `Gate: legal` and
   `Owner role: legal`, fill in the rest, and run `npm run check`. Read what it says. Then delete
   the file.
3. **Fix it (5 min).** Tell Claude Code "fix the finding the legal gate printed". Then
   `npm run check`. Done when it ends with `gates: pass`.
4. **Decide the release (5 min).** The product lead reads the build
   (`npm start`, then `http://localhost:3000/inquiry.html?variant=call-slot&build=hardened`), the
   review and the open questions in `discovery/factory/call-slot-questions.md`. Then the product
   lead copies `.claude/skills/loopwise-factory/release-decision-template.md` to
   `discovery/decisions/<next number>-release-call-slot.md` and fills it in: release or hold,
   their own name, the date, the reason. An open question can be a reason to hold.
5. **Release (2 min).**
   ```bash
   npm run release -- call-slot
   ```
   It sets `shipped` in `site/config.json` only if the legal gate passes, the design gate passes
   or is waived, and the release decision says release. Then open
   `http://localhost:3000/inquiry.html` without any `?variant=`: every visitor now gets the
   hardened page. Stop the server with `Ctrl+C`. If the product lead decided to hold, the step
   says so and changes nothing. That is a decision too.
6. **Retro (12 min).** Start a fresh session (`/clear`). Then `/loopwise-factory call-slot retro`. It writes
   `discovery/factory/call-slot-retro.md` and asks you four questions, one at a time:
   - What did the gate catch?
   - What would it have missed?
   - Who decided?
   - What did the factory have to ask that the kit did not answer?
7. **Commit (3 min).**
   ```bash
   npm test && npm run check
   git add -A && git commit -m "factory run 2: gate fixed, release decided, retro"
   ```

**Done when:** the legal gate passes, the release decision (release or hold) names a person and a
reason, `npm run release -- call-slot` has run, and the retro file holds your answers. After a
release, `site/config.json` says `"shipped": "call-slot"`; after a hold, it is unchanged.

**If you are stuck:** the reference state after this run is `v3-08-factory-run-2`.

**For the Abgleich:** which of the factory's questions should the launch spec have answered? What
would a gate in your own company check, and who would own it?

**Next:** back to your company table for the reflection.
