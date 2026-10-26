# Loopwise

Loopwise is a fictional academy that offers in-house formats for product teams. This is a training
repo for the loop from a business goal to the next opportunity: pick the problem, define success up
front, test solutions, decide, and let the result flow back into the next decision. Participants
build that chain themselves in pairs, with skills, on top of a small working website.

## Run

```bash
npm start   # http://localhost:3000, set PORT to change it
npm test
npm run check   # citations, quotes, event names, dashes in discovery/ and product/
```

With `npm start` running, `http://localhost:3000/discovery` shows every artefact as a readable page,
and draws the KPI tree as a tree. `http://localhost:3000/discovery/map` shows every opportunity as a
card on an evidence map, filterable by source, evidence, voice and KPI branch.

No dependencies, no `npm install`. Node 20 or newer.

## About the material

All data and material in this repo is either an anonymised composite or synthetic, and each file
labels which of the two it is.

## How this repo works

Step-by-step instructions for every workshop block are in [docs/blocks/](docs/blocks/README.md).

All skills are in `.claude/skills/` from the start; `CLAUDE.md` lists them in chain order. You start
at `00-start` and run the chain yourself. Each further tag is a reference state after one workshop
block. If you decided differently, keep your own state or continue from the reference state.

| Tag | State after the block |
|---|---|
| `00-start` | website in its before state, server, product context, material, all skills |
| `01-kpi-tree` | KPI tree |
| `02-opportunities` | opportunities per source group, selection still empty |
| `03-opportunity-decision` | selection, opportunity comparison, decision 001 |
| `04-test-card` | intent with 3 to 5 ideas and the idea tested first, prototype test card |
| `05-prototype` | spec, persona run on the spec, built variant under `site/variants/` |
| `06-test-decision` | learning cards as decisions 002 (the shipped variant, in two rounds) and 003 (a dropped variant), reference launch card, shipped variant, synthetic data and dashboard |
| `07-result` | result section of the shipped variant's test card |
| `08-next-bet` | measured values in the KPI tree, next opportunity |

**Each pair keeps its own opportunity and variant to the end.** One switch is planned, and it is
optional: to `06-test-decision` for the demo, because that is where the data arrive. The synthetic
data fit only the reference variant, so a pair's own launch card cannot be read against them. The
other tags are fallbacks. Tags are added block by block; `git tag` lists the ones that exist.

```bash
git tag                                # list the tags
git checkout 04-test-card                  # read-only look at a state
git switch -c demo 06-test-decision        # or: continue on a branch from it (recommended)
```

**Dates.** The reference states follow a fictional timeline: the shipped variant launches on
2026-08-19, the data run for eight weeks to 2026-10-13. Your own work carries today's date; a switch
to a reference state replaces it.

Pre-filled decisions in the reference states say "Reference decision (replace with your own)". In
your own run, you are the decider.

## Where the pages are

- `/` home, `/formats.html`, `/inquiry` (the form), `/confirmation.html`, `/sponsor-prep.html`
- A variant can replace any page. It holds a file with the page's name:
  `site/variants/<name>/inquiry.html`, `formats.html`, or `index.html` for home.
- `/<page>?variant=<name>` serves the variant's version of that page if `<name>` is listed in
  `variants` in `site/config.json`. A page the variant does not hold is the baseline page. Links
  between pages keep `?variant=<name>`, so a visitor stays inside the variant.
- Without `?variant=`, every page the variant named under `shipped` holds replaces the baseline.
  `?variant=baseline` always serves the baseline.
