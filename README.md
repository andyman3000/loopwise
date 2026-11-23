# Loopwise

Loopwise is a fictional academy that offers in-house formats for product teams. This is a training
repo for the loop from a business goal to the next opportunity: pick the problem, define success up
front, test solutions, decide, and let the result flow back into the next decision. Participants
build that chain themselves in pairs, with skills, on top of a small working website.

## Run

```bash
npm start   # http://localhost:3000, set PORT to change it
npm test
npm run check   # citations, quotes, event names, dashes in discovery/ and product/,
                # then the release gates on site/hardened/ (validation and legal: hard, design: soft)
node scripts/check-gates.js --entry <variant>   # validation gate: has the product lead decided launch?
node scripts/check-gates.js --json   # the gate result as JSON, read by the release step
npm run release -- <variant> --dry-run   # what the release still waits for
npm run release -- <variant> --approved-by <name>   # simulated release: runs every gate again, sets the shipped key, writes the record
```

In build to earn a guard runs too: `scripts/hooks/gate-guard.js`, wired in `.claude/settings.json`.
Claude Code runs it before and after each write in `site/hardened/` and on `site/config.json`.
It refuses a price before the write lands. It flags a design finding right after the write, and
the agent fixes it. Only `npm run release` sets `shipped`. The product lead says yes on its
permission prompt. That yes is the approval, as for a pull request to production. Prototypes in
`site/variants/` get none of this.

With `npm start` running, `http://localhost:3000/discovery` shows every artefact as a readable page,
and draws the KPI tree as a tree. `http://localhost:3000/discovery/map` shows every opportunity as a
card on an evidence map, filterable by source, evidence, voice and KPI branch.
`http://localhost:3000/sources/<file>#L<n>` shows one file from `sources/` with numbered lines and
marks line n; each quote on the map links there.

No dependencies, no `npm install`. Node 20 or newer.

## About the material

All data and material in this repo is either an anonymised composite or synthetic, and each file
labels which of the two it is.

## How this repo works

Step-by-step instructions for every workshop block are in [docs/blocks/](docs/blocks/README.md).

All skills are in `.claude/skills/` from the start; `CLAUDE.md` lists them in chain order. In the one-day workshop you start at `v3-03-start`, with blocks 1 to 3 done, and run the chain
from block 4. Each further tag is a reference state after one workshop
block. If you decided differently, keep your own state or continue from the reference state.

**Start with `/loopwise-onboarding`.** The training uses the Claude desktop app (Code tab), which
has a browser built in. In a terminal, Claude Code works too; a browser tool there is your own
setup, and no skill on the day needs one. After cloning and opening Claude Code on the folder, it
checks everything the day needs. Every Loopwise skill starts with
`loopwise-`, so they stand together when you type `/`.

**One Claude Code session per skill.** Start a fresh session before each skill: type `/clear`, or
quit Claude Code and start it again. Each skill reads what it needs from the files. In a long session,
Claude carries old answers into the next skill. The block files say which command comes next.

### v3: the one-day bootcamp

| Tag | State |
|---|---|
| `v3-03-start` | the jump: `v2-03-opportunity-decision` plus the design system, three gates (validation, design, legal), the lean launch spec mode, the loopwise-factory skill and the release step |
| `v3-04-test-card` | intent with 3 to 5 ideas and the idea tested first, prototype test card |
| `v3-05-prototype` | specs, persona runs, three built prototypes on the design system tokens |
| `v3-06-test-decision` | learning cards; call-slot passed a test with five people and the product lead decided launch (decision 005); its launch card and complete handover kit: prototype, intent, launch spec. The afternoon starts here |
| `v3-07-factory-run-1` | call-slot rebuilt in `site/hardened/`, the design gate failed and was healed |
| `v3-08-factory-run-2` | the legal gate failed and was fixed, the release decision (006), call-slot shipped on localhost, the retro |

The decisions taken while building v3 are in [docs/v3-decisions.md](docs/v3-decisions.md).

### v2: the two-day training

| Tag | State after the block |
|---|---|
| `v2-00-start` | website in its before state, server, product context, material, all skills |
| `v2-01-kpi-tree` | KPI tree |
| `v2-02-opportunities` | opportunities per source group, selection still empty |
| `v2-03-opportunity-decision` | selection, opportunity comparison, decision 001 |
| `v2-04-test-card` | intent with 3 to 5 ideas and the idea tested first, prototype test card |
| `v2-05-prototype` | spec, persona run on the spec, built variant under `site/variants/` |
| `v2-06-test-decision` | learning cards as decisions 002 (the shipped variant, in two rounds) and 003 (a dropped variant), reference launch card, shipped variant, synthetic data and dashboard |
| `v2-07-result` | result section of the shipped variant's test card |
| `v2-08-next-bet` | measured values in the KPI tree, next opportunity |

**Each pair keeps its own opportunity and variant to the end.** One switch is planned, and it is
optional: to `v2-06-test-decision` for the demo, because that is where the data arrive. The synthetic
data fit only the reference variant, so a pair's own launch card cannot be read against them. The
other tags are fallbacks. Tags are added block by block; `git tag` lists the ones that exist.

```bash
git tag                                # list the tags
git checkout v2-04-test-card                  # read-only look at a state
git switch -c demo v2-06-test-decision        # or: continue on a branch from it (recommended)
```

**Dates.** The reference states follow a fictional timeline: the shipped variant launches on
2026-08-19, the data run for eight weeks to 2026-10-13. Your own work carries today's date; a switch
to a reference state replaces it.

Pre-filled decisions in the reference states say "Reference decision (replace with your own)". In
your own run, you are the decider.

## Design system

Every page is built on one style file, [site/styles.css](site/styles.css): tokens for colour, type,
spacing and radius, and the few components the site uses. The same system is shown with previews
and rules in the [Loopwise Design System](https://claude.ai/artifact/LnuyCcsvwkDQxd9qKFVQ1V)
artifact in Claude Design. The rule that binds an agent to it is
[.claude/rules/design-system.md](.claude/rules/design-system.md).

A change made in Claude Design reaches the repo when someone asks Claude Code to bring the
artifact's `tokens.json` into `site/styles.css`; a change in the style file goes back when Claude
Code re-syncs the artifact from the repo. The designer owns both, and the design gate that checks
released pages against them.

## Where the pages are

- `/` home, `/formats.html`, `/inquiry` (the form), `/confirmation.html`, `/buyer-prep.html`
- A variant can replace any page. It holds a file with the page's name:
  `site/variants/<name>/inquiry.html`, `formats.html`, or `index.html` for home.
- `/<page>?variant=<name>` serves the variant's version of that page if `<name>` is listed in
  `variants` in `site/config.json`. A page the variant does not hold is the baseline page. Links
  between pages keep `?variant=<name>`, so a visitor stays inside the variant.
- Without `?variant=`, every page the variant named under `shipped` holds replaces the baseline.
  `?variant=baseline` always serves the baseline.
