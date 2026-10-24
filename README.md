# Loopwise

Loopwise is a fictional academy that offers in-house formats for product teams. This is a training
repo for the loop from a business goal to the next opportunity: pick the problem, define success up
front, test solutions, decide, and let the result flow back into the next decision. Participants
build that chain themselves, with skills, on top of a small working website.

## Run

```bash
npm start   # http://localhost:3000, set PORT to change it
npm test
```

No dependencies, no `npm install`. Node 20 or newer.

## About the material

All data and material in this repo is either an anonymised composite or synthetic, and each file
labels which of the two it is.

## How this repo works

All skills are in `.claude/skills/` from the start; `CLAUDE.md` lists them in chain order. You start
at `00-start` and run the chain yourself. Each further tag is a reference state after one workshop
block. If you decided differently, keep your own state or continue from the reference state.

| Tag | State after the block |
|---|---|
| `00-start` | website in its before state, server, product context, material, all skills |
| `01-kpi-tree` | KPI tree |
| `02-opportunities` | opportunities per source group, selection still empty |
| `03-opportunity-decision` | selection, opportunity comparison, decision 001 |
| `04-variants` | intent and ideas, three specs, three variants under `site/variants/` |
| `05-test-cards` | three test cards |
| `06-variant-decision` | variant comparison, decision 002, shipped variant, synthetic data and dashboard |
| `07-result` | result section of the shipped variant's test card |
| `08-next-bet` | measured values in the KPI tree, next opportunity |

**Two switches are planned for everyone:** to `04-variants`, because the data match these variants,
and to `06-variant-decision`, because that is where the data arrive. The other tags are fallbacks.
Tags are added block by block; `git tag` lists the ones that exist.

```bash
git tag                                # list the tags
git checkout 04-variants               # read-only look at a state
git switch -c mine-04 04-variants      # or: continue on your own branch from it (recommended)
```

**Dates.** The reference states follow a fictional timeline: the shipped variant launches on
2026-08-19, the data run for eight weeks to 2026-10-13. Your own work carries today's date; a switch
to a reference state replaces it.

Pre-filled decisions in the reference states say "Reference decision (replace with your own)". In
your own run, you are the decider.

## Where the pages are

- `/` home, `/formats.html`, `/inquiry` (the form), `/confirmation.html`, `/sponsor-prep.html`
- `/inquiry` serves the variant named in `site/config.json` under `shipped`, if set and present.
  Otherwise it serves the baseline form. `/inquiry?variant=baseline` always serves the baseline.
  `/inquiry?variant=<name>` serves `site/variants/<name>/index.html` if `<name>` is listed in
  `variants` in `site/config.json`.
