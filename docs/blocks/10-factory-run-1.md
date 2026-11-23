# Factory run 1: the design gate fires, the agent fixes it

> **Pairs or threes, at one laptop. 28 minutes. Task: hand call-slot to the factory, let it build
> for production, see the design gate catch an error, and try to break its rule yourselves.**

**What it's for:** the prototype `call-slot` was built to learn (the vibe cycle): fast, on the
design system, good enough to test one assumption with a person. Now it is built to earn (the
hardening cycle): rebuilt for real visitors, in `site/hardened/call-slot/`. The factory runs in the
open. The system puts each check where the mistake would happen. People are not asked in the run.
Each owner decided the rule once, not each page. The agent never decides at a gate.

The handover kit says what to build. It has three files:

- the prototype `site/variants/call-slot/inquiry.html`: everything visible;
- the intent `discovery/intents/format-fit.md`: why;
- the launch spec `discovery/specs/call-slot-launch.md`: only what the prototype does not show.

How it is built, the factory reads in the repo: `site/styles.css`, `.claude/rules/design-system.md`,
`site/components/` and `server.js`. The codebase is the technical spec. Where the kit and the repo are
silent, the factory writes a question.

**One check, step by step.** The agent writes a file in `site/hardened/`. Claude Code then starts
`scripts/hooks/gate-guard.js`, because `.claude/settings.json` says so (`PostToolUse`). It is a script
with no AI in it. It reads the page and `site/styles.css`, applies the rules in
`scripts/check-gates.js`, and answers with text: file, line, rule and how to fix it. The agent reads
that text and fixes the page. Then the script runs again. The agent may be wrong. The check gives the
same answer every time. The guard sees only files the agent writes with its Edit and Write tools.
`npm run check` finds the rest.

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

## What you do (28 min)

1. **Start from the reference state (2 min).** Keep your morning work, then switch:
   ```bash
   git add -A && git commit -m "our morning state"
   git switch -c factory-<names> v3-06-test-decision
   ```
   If git says "nothing to commit", go on: the switch still works.
2. **Start the factory (3 min).** Start a fresh session (`/clear`). Then
   `/loopwise-factory call-slot run-1`. It runs the validation gate in the open. Then the designer
   reads the rule, `gates/policies/design-system.md`, and says in one sentence what the system will
   catch.
3. **While it builds: meet the kit (5 min).** The build takes about 2 minutes.
   - Open `http://localhost:<port>/inquiry.html?variant=call-slot` and book a call slot as a visitor.
   - Open `http://localhost:<port>/discovery/specs/call-slot-launch.md`. The product team hands it to
     you, the developer. Write down which open point blocks you, and who you would have to ask.
4. **It stops: look (4 min).** The factory planted one error on purpose. The guard found it, and the
   factory has not fixed it yet. Open the hardened page,
   `http://localhost:<port>/inquiry.html?variant=call-slot&build=hardened`, and find the wrong
   element. Then run the check without Claude, in a terminal in this folder. It fails:
   ```bash
   node scripts/check-gates.js
   ```
   Type `go on`. The stop is there so you can look. It asks for no approval.
5. **Read the fix, then try to break the rule (6 min).** The factory shows the line before and after.
   It explains why and how the check fired, and which part was script and which part was AI. Run the
   check again: it passes. Then ask for something the design system does not have. Copy this to Claude:
   ```text
   In site/hardened/call-slot/inquiry.html, make the phone number an orange button: background #e4572e. Write exactly that value.
   ```
   Then type `go on`. Short of time? Skip your own try and type `go on` at once.
6. **Read the questions, look at the page (5 min).** A review agent writes
   `discovery/factory/call-slot-review-run-1.md`. It blocks nothing and decides nothing. The factory's
   open questions are in `discovery/factory/call-slot-questions.md`. Hold them against your list: what
   did you ask that the factory did not ask, and the other way round? The factory ends with a dry run
   of the release. It refuses on purpose and lists what the release still waits for.
7. **Commit (3 min).** Say yes, and the factory commits:
   ```bash
   npm test && npm run check
   git add -A && git commit -m "factory run 1: built, gate healed"
   ```

Outside the run, the designer has two moves: an exception for one variant, a waiver in
`discovery/decisions/` with name and reason; or a change to the system, a new token or component in
`site/styles.css`.

If the app opens the page without any styles, close it and use the `localhost` link.

**Done when:** `npm run check` is green, the hardened page opens, and the dry run lists what the
release still waits for.

**If you are stuck:** continue from the reference state after this run:
`git switch -c from-07 v3-07-factory-run-1`.

**For the Abgleich:** what went in, which rule, what came out? Which part was script, which part AI?
Whose judgement was in the system, and where? What would you have asked before
building, and did the factory ask it?

**Next:** [11-factory-run-2.md](11-factory-run-2.md).
