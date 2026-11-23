# Factory run 1: the design gate fires, the agent fixes it

> **Pairs or threes, at one laptop. 50 minutes. Task: hand call-slot to the factory, let it build
> for production, and read what the design gate did.**

**What it's for:** the prototype `call-slot` was built to learn (the vibe cycle): fast, on the
design system, good enough to test one assumption with a person. Now it is built to earn (the
hardening cycle): rebuilt for real visitors, in `site/hardened/call-slot/`. The factory runs in the
open. The system puts each check where the mistake would happen. People are not asked in the run.
Each owner decided the rule once, not each page. The agent never decides at a gate.

The factory reads only the handover kit, three files:

- the prototype `site/variants/call-slot/inquiry.html`: everything visible;
- the intent `discovery/intents/format-fit.md`: why;
- the launch spec `discovery/specs/call-slot-launch.md`: only what the prototype does not show.

**Three gates.** The validation gate (hard, owner: product lead) stands at the entry. The factory
builds only a variant the product lead decided to launch. call-slot passed its test with people,
so it passes here. Your own variant from the morning is a prototype. It has no launch decision, so
the entry gate stops it. It gets in only after a test with people. Then the product lead must decide
launch. The format is in `gates/policies/launch-decision.md`.
The design gate and the legal gate check the build:

| | Design gate | Legal gate |
|---|---|---|
| Rule | pages use the design system | no prices on the website |
| Owner | designer | legal |
| Kind | soft: the owner may make an exception | hard: no exception, legal included |
| Where it fires | right after the write; the agent fixes it | before the write; the write is refused |
| Owner in the run | nothing to do | nothing to do |
| Owner outside the run | an exception for one variant (a waiver), or a change to the system (`site/styles.css`) | a change to the rule (`gates/policies/no-prices.md`, `gates/gates.json`) |

**Roles.** Before you start, give each person a role. One is the **designer**: owns the design
system and the design gate. One is the **product lead**: decides the release in run 2. In a three,
the third is **legal**: owns the legal gate in run 2. In a pair, the designer is legal too.
Everybody types. The role decides.

> **On your laptop vs in a company.** Each part here stands in for something a company runs.
>
> | On your laptop | In a company |
> |---|---|
> | the guard on a write in `site/hardened/` | a linter or a pre-commit check |
> | `npm run check` | CI |
> | `npm run release` | the deploy pipeline |
> | the guard on `site/config.json` | branch protection |
> | the yes on the release prompt | a pull request approval |
> | `"shipped"` in `site/config.json` | production |

## What you do (about 50 min)

1. **Start from the reference state (2 min).** Keep your morning work, then switch:
   ```bash
   git add -A && git commit -m "our morning state"
   git switch -c factory-<names> v3-06-test-decision
   ```
   If git says "nothing to commit", go on: the switch still works.
2. **Meet the prototype (5 min).** Open `http://localhost:<port>/inquiry.html?variant=call-slot` and
   book a call slot as a visitor. This page is the first file of the kit: everything visible.
3. **Read the launch spec (5 min).** Open
   `http://localhost:<port>/discovery/specs/call-slot-launch.md` next to the prototype. The product
   team hands it to you, the developer. You write no launch spec in this run. Write down two things:
   - which open point you need answered before you build;
   - which question you have that is nowhere on the page.
4. **Run the factory (17 min).** Start a fresh session (`/clear`). Then
   `/loopwise-factory call-slot run-1`.
   - First the designer reads the rule, `gates/policies/design-system.md`. The designer says in
     one sentence what the system will catch (about 2 min).
   - The factory runs the validation gate in the open, then builds. It plants one error on
     purpose and does not tell you which.
   - A guard watches each write in `site/hardened/`. Right after the write, the guard flags the
     design finding: the file, the line, the rule and the owner. The agent fixes it at once.
     Nobody is asked.
   - At the end the factory runs `npm run check` in the open. It ends with `gates: pass`.
   - A fresh review agent writes `discovery/factory/call-slot-review-run-1.md`. Read it: it blocks
     nothing and decides nothing. The factory's open questions are in
     `discovery/factory/call-slot-questions.md`. Hold them against your list: what did you ask that
     the factory did not ask, and the other way round?
5. **Read what the system did (5 min).** The factory names who owns the gate: the designer. It
   names the kind (soft) and where the gate fired: right after the write in `site/hardened/`.
   Nobody was asked in the run. The designer's judgement was already in the design system.
   Outside the run, the designer has two moves:
   - an exception for one variant: a waiver in `discovery/decisions/`, with name and reason;
   - a change to the system: a new token or component in `site/styles.css`, which the designer
     approves as its owner.
6. **Look at it (5 min).** Open
   `http://localhost:<port>/inquiry.html?variant=call-slot&build=hardened` and click through it once.
   Compare it with the prototype at `http://localhost:<port>/inquiry.html?variant=call-slot`. The
   factory ran the dry run at its end. It lists what the release still waits for. To run it again:
   ```bash
   npm run release -- call-slot --dry-run
   ```
7. **Commit (2 min).**
   ```bash
   npm test && npm run check
   git add -A && git commit -m "factory run 1: built, gate healed"
   ```

**Done when:** `npm run check` is green, the hardened page opens, and the dry run lists what the
release still waits for.

**If you are stuck:** continue from the reference state after this run:
`git switch -c from-07 v3-07-factory-run-1`.

**For the Abgleich:** whose judgement was in the system, and where? What would you have asked before
building, and did the factory ask it?

**Next:** [11-factory-run-2.md](11-factory-run-2.md).
