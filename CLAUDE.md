# CLAUDE.md

Project preferences for Claude Code in the Loopwise demo repo.

# Project Reference

**Product context (read before any discovery work):**
- [product/vision.md](product/vision.md): who we serve, what we believe, what we are not
- [product/strategy.md](product/strategy.md): business goal, the two levers, what we do not do this quarter
- [product/constraints.md](product/constraints.md): hard limits on data, tech, measurement and material
- [product/personas/](product/personas/): soft sponsor, hard sponsor, participant

**Material (raw, never edited by skills):**
- `sources/interviews/`: three participant group interviews, two sponsor interviews (anonymised composites)
- `sources/emails/`: six inquiry mails (synthetic)
- `sources/feedback/`: one feedback export (mixed: paraphrased free text, invented ratings)
- `sources/inbox/`: ten support requests (synthetic)
- `sources/analytics/`: empty until exports exist
- `data/`: empty at the start. Synthetic event log, inquiry export and generator arrive with the
  tag `06-variant-decision`

---

# Product

## Loopwise

Loopwise offers in-house formats for product teams (product managers, product owners, UX and
consultants with product duties), from a half-day workshop to multi-week team coaching, including
Agentic Product Management. A sponsor in the customer company inquires through the website, settles
the format in a scoping call, and then prepares it with the academy: participant list, setup check,
expectations survey, follow-up. The academy earns on booked format days; follow-up bookings from the
same customer are the biggest lever.

| Persona | Role | Focus |
|---|---|---|
| [Soft sponsor](product/personas/sponsor-soft.md) | supports the AI move, no budget or line authority | names only soft success signals, does not know the format |
| [Hard sponsor](product/personas/sponsor-hard.md) | head of product with budget | wants proof of effect before booking more |
| [Participant](product/personas/participant.md) | PM, PO, BA, UX | same title, very mixed level |

## Repo layout

```
loopwise/
  README.md  CLAUDE.md  package.json  server.js
  site/            pages, components/, config.json   (variants/ appears once variants are built)
  data/            empty at the start
  tests/
  product/         vision.md, strategy.md, constraints.md, personas/
  sources/         interviews/, emails/, feedback/, inbox/, analytics/
  discovery/       kpi-tree.md, opportunities/, intents/, specs/,
                   test-cards/, decisions/, user-tests/
  .claude/skills/  one folder per skill
```

## How to run

```bash
npm start   # http://localhost:3000, PORT overrides
npm test    # node --test
npm run check   # citations point at real lines, quotes match, event names from the list
```

Node 20 or newer. No dependencies, no `npm install`. Keep it that way.

---

# Scope (Quick Reference)

**This repo owns:** the website (inquiry, formats, sponsor preparation), the
product context, the discovery artefacts and the decisions taken on them.

**This repo does NOT own:**
- the content of the training itself: the website reaches preparation and follow-up only
- prices: none on the website, none in data
- real customer data: everything here is synthetic or an anonymised composite

---

# Hard Constraints (Always Apply)

- **English** in every file.
- **Every claim in an artefact quotes its source with location**: file and line, for example
  `sources/interviews/sponsor-soft.md:49`. No quote, no claim.
- **Only counted numbers.** A number appears only if it is counted from a file in `sources/` or
  `data/`. No scores, no probabilities, no estimated totals, no invented targets.
- **Assessments on three levels, in words:** well supported, partly supported, unsupported. Each
  with reasoning, sources, counter-evidence and gaps.
- **Agents never decide.** Selection fields (chosen opportunity, chosen variant, keep or roll back)
  stay empty for a human.
- **Synthetic data and composites are labelled** in the file header, and any artefact built on them
  repeats the label.
- Assumptions are written as `[assumption: ...]`.
- No real names, companies, products, places or prices, in material or artefacts.
- If in doubt about evidence, say so and leave the field open. Do not guess.

---

# Skill chain

Run in this order. Each skill writes its artefact under `discovery/`.

| # | Skill | Writes |
|---|---|---|
| 1 | `kpi-tree` | `discovery/kpi-tree.md` |
| 2 | `opportunities-from-source` | `discovery/opportunities/<source-group>.md` |
| 3 | `compare-opportunities` | `discovery/opportunity-comparison.md` |
| 4 | `intent-and-ideas` | `discovery/intents/<opportunity>.md` |
| 5 | `variant-spec` | `discovery/specs/<variant>.md`, then Claude Code builds `site/variants/<variant>/` |
| 6 | `test-card` | `discovery/test-cards/<variant>.md` |
| 7 | `compare-variants` | `discovery/variant-comparison.md` |
| 8 | `read-result` | the `## Result` section of `discovery/test-cards/<variant>.md` |
| 9 | `next-bet` | `discovery/kpi-tree.md` (measured values), `discovery/opportunity-comparison.md` (appended) |

# Decisions

Decisions live in `discovery/decisions/`, one file per decision, each with a named human decider,
the date, the options considered and the artefact it rests on. A skill may prepare a decision; it
never records one on its own.

---

# Counterparts

| Role | Person | Notes |
|---|---|---|
| Decider for opportunity and variant | | human, named in each decision file |
| Reviewer of material anonymisation | | |

---

# Key Metrics (Anchor Numbers)

| Metric | Target |
|---|---|
| Booked in-house format days per quarter | [TODO: no counted baseline yet] |
| Inquiry completion rate (started to submitted) | [TODO: count from `data/` once generated] |
| Follow-up bookings within 6 months | [TODO: no counted baseline yet] |

---

# Version History

| Date | Author | Changes |
|---|---|---|
| 2026-10-21 | product team | Initial version |
| 2026-10-24 | product team | Training start state: `variant-spec` skill added, only what exists at the start is described |
