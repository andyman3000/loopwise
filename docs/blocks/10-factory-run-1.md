# Factory run 1: the design gate fires, heal it

> **Pairs or threes, at one laptop. 50 minutes. Task: hand call-slot to the factory, let it build
> for production, and heal what the design gate finds.**

**What it's for:** the prototype `call-slot` was built to learn (the vibe cycle): fast, on the
design system, good enough to test one assumption with a person. Now it is built to earn (the
hardening cycle): rebuilt for real visitors, in `site/hardened/call-slot/`. The factory runs in the
open. Gates hold the release until the checks pass and a person agrees. The agent never decides at
a gate.

The factory reads only the handover kit, three files:

- the prototype `site/variants/call-slot/inquiry.html`: everything visible;
- the intent `discovery/intents/format-fit.md`: why;
- the launch spec `discovery/specs/call-slot-launch.md`: only what the prototype does not show.

**Roles.** Before you start, give each person a role. One is the **designer**: owns the design
system and the design gate. One is the **product lead**: decides the release in run 2. In a three,
the third is **legal**: owns the legal gate in run 2. Everybody types; the role decides.

## What you do (about 50 min)

1. **Start from the reference state (2 min).** Keep your morning work, then switch:
   ```bash
   git add -A && git commit -m "our morning state"
   git switch -c factory-<names> v3-06-test-decision
   ```
   If git says "nothing to commit", go on: the switch still works.
2. **Draft the launch spec yourself (10 min).** Start a fresh Claude Code session (`/clear`). Then
   `/loopwise-variant-spec call-slot launch`. It asks what a developer would need to know that the
   prototype does not show. Answer it yourself first. It drafts at most one page and cuts every
   line the prototype already shows. It writes over the reference spec; that is fine for now.
   If it runs past 10 minutes, stop it and go to step 3.
3. **Compare with the reference (5 min).** `git diff discovery/specs/call-slot-launch.md` shows your
   draft against the reference. Talk about two things: which line of yours describes something the
   prototype already shows, and what the reference has that you missed.
4. **Put the reference back (1 min).** The factory builds from the reference kit:
   ```bash
   git checkout -- discovery/specs/call-slot-launch.md
   ```
5. **Run the factory (15 min).** Start a fresh session (`/clear`). Then
   `/loopwise-factory call-slot run-1`. Watch what it says it does. It plants one error on purpose and does
   not tell you which. At the end it runs `npm run check` in the open. Read the gate lines: each
   finding names the file, the line, the rule and the owner. A fresh review agent also writes
   `discovery/factory/call-slot-review-run-1.md`. Read it: it blocks nothing and decides nothing.
   The factory's open questions are in `discovery/factory/call-slot-questions.md`.
6. **Heal (10 min).** The design gate is soft and lands on the designer's table. The designer
   decides, not the agent:
   - **Fix it:** tell Claude Code "fix the finding the design gate printed", then `npm run check`.
   - **Or waive it:** the designer copies `.claude/skills/loopwise-factory/waiver-template.md` to
     `discovery/decisions/<next number>-design-waiver-call-slot.md` and fills it in with their own
     name and reason. Then `npm run check`.

   Done when `npm run check` ends with `gates: pass`.
7. **Look at it (5 min).** `npm start`, then open
   `http://localhost:3000/inquiry.html?variant=call-slot&build=hardened` and click through it once.
   Compare it with the prototype at `http://localhost:3000/inquiry.html?variant=call-slot`. Stop the
   server with `Ctrl+C`. Then ask what the release still waits for:
   ```bash
   npm run release -- call-slot --dry-run
   ```
8. **Commit (2 min).**
   ```bash
   npm test && npm run check
   git add -A && git commit -m "factory run 1: built, gate healed"
   ```

**Done when:** `npm run check` is green, the hardened page opens, and the dry run lists what the
release still waits for.

**If you are stuck:** continue from the reference state after this run:
`git switch -c from-07 v3-07-factory-run-1`.

**For the Abgleich:** what did the gate catch? Fix or waiver: who decided, and why? Which line of
your own launch spec did the prototype already show?

**Next:** [11-factory-run-2.md](11-factory-run-2.md).
