---
name: intent-and-ideas
description: Guide the pair through block 4, one step per message. Frame the chosen opportunity as a How Might We question, collect the pair's own ideas, push wider with three creative techniques, converge to up to five ideas and then three that differ in their critical assumption, let the pair pick the assumption to test first, and write the prototype test for it. Use after the opportunity decision is recorded, when the team says "write the intent", "let's develop ideas", or "what could we build for this opportunity". Writes the intent and the prototype test card. Never picks an idea or an assumption.
---

# Intent and ideas

**When:** after the human has chosen an opportunity in `discovery/opportunity-comparison.md` and the
decision is recorded in `discovery/decisions/`. Before `variant-spec`.
**Input:** the chosen opportunity, named by the human. If no name is given, ask. Do not take it from
"Appears favoured" in the comparison.
**Reads:** `discovery/opportunity-comparison.md`; the decision record in `discovery/decisions/`; the
matching files in `discovery/opportunities/`; `discovery/kpi-tree.md`; `product/constraints.md`;
`product/personas/`; `site/inquiry.html` (what the page does today);
`.claude/skills/test-card/SKILL.md` (mode `prototype`, for step 7).
**Writes:** `discovery/intents/<opportunity-slug>.md` and `discovery/test-cards/<variant>-prototype.md`.

This is the diverge and converge part of the double diamond. First many ideas, without judging them.
Then a few, held against what the inquiry page can do and what a prototype can test. The pair has the
ideas; the skill keeps the pace, brings techniques and pushes past the obvious. AI ideas tend to be
obvious or average; their value is the push, not the originality. So the pair always goes first.

**A critical assumption** is the one thing that must be true for an idea to work. If it is false, the
idea fails, however well it is built.

## Rules

- **One step per message.** Each step ends with one question to the pair. Wait for the answer. Never run two steps in one message, and never skip ahead to drafting.
- **The pair goes first.** In step 1 and in every technique, the pair answers before the skill adds ideas. A vague reply ("go on", "ok", "you choose") gets one more ask; if it stays vague, carry on and note "the pair added none" for that step.
- **No judging while diverging** (steps 1 to 3). No levels, no "this would not work", no constraint checks. Every idea goes on the list. Ideas that would change another page than the inquiry page stay on the list, marked "not on the variant page".
- **Change the angle on purpose.** Each technique looks from a different side. Before you add ideas, check your last ones: if they share a mechanism (all text on the page, all a new field), take a different one. Models drift into one cluster; this rule pushes against it.
- **Ideas are named by mechanism:** what the sponsor sees or does on the page ("one question before the form", "calendar link after three case stories"), not by strategy ("reduce friction"). If the pair names a feature without a page change ("a trust badge"), ask once: "What would the sponsor see on the page?"
- **Boundaries apply from step 4 on**, not before. They come from `product/constraints.md` and the server: no prices (`product/constraints.md:7`); a variant replaces only the inquiry page (`server.js`, route `/inquiry`); the form keeps its four core fields, name, company, a valid email and a message of at least 10 characters (`site/components/inquiry-form.js:4`). An idea may relabel the message field, add a help line, or fill it from what the sponsor ticks or types. It may not drop a core field. State the boundaries in step 4; do not ask about them.
- **Every claim quotes its source with location** (file and line). No quote, no claim. Evidence levels in words: well supported, partly supported, unsupported.
- **Do not invent numbers.** Only counted numbers: sources, voices, events in a log. No targets and no thresholds before step 7.
- **This file is an assessment by an agent, not a decision.** The pair picks the five, the three, the assumption and the variant. Every selection field stays `____ (human decides)` until the pair fills it. Never suggest which assumption to test first.

## Steps

1. **Your ideas first** (about 8 min). Name the chosen opportunity in one line, with its strongest quote. Ask: "Write down as many ways as you can think of to change the inquiry page for this, one line each. Wild ones too. Take five minutes." Collect them as they come, ask "What else?" once, then move on. These ideas go under "Your first try", word for word. Read the decision record now; if it is missing or names a different opportunity, say so and stop.
2. **How Might We** (about 3 min). Propose one question: "How might we help <persona> <need, in the sponsor's words> so that <driver from `discovery/kpi-tree.md`> moves?" Quote the need and the driver line. Ask the pair to sharpen it. Take their version.
3. **Push wider: three techniques** (about 15 min, one technique per message). For each, say in one line what it does, give one prompt, wait for the pair's ideas, then add three or four of your own that build on theirs or go elsewhere:
   - **SCAMPER on today's inquiry page** (`site/inquiry.html`): substitute, combine, adapt, modify, put to another use, eliminate, reverse. Pick the two or three letters that fit best.
   - **Analogy from another domain:** "How does a car configurator, a doctor's intake form, a travel agent or a dating app solve this?" Name a concrete pattern from that domain and carry it to the inquiry page.
   - **Reversal:** "How could we make the sponsor even less sure, or make the inquiry fail?" Then flip each answer into an idea.
   After the third technique, show the full list, numbered, with the pair's ideas marked. Ask: "Anything to add before we choose?"
4. **Converge to up to five** (about 4 min). State the boundaries in one short list. Ask the pair to pick up to five ideas from the list. For each pick, fill one row: what changes on the page, the critical assumption, its level with the source, the driver it moves (quoted from `discovery/kpi-tree.md`), and whether a prototype on the inquiry page can test it. An idea that breaks a boundary stays in the table, marked; say why in one line. Show the table. Ask whether to swap any.
5. **Three that differ** (about 3 min). Ask the pair to pick three from the five. Check their critical assumptions: if two fail for the same reason, say so and ask for a swap. Fill "Three ideas side by side". The other ideas stay in the file, under "Further ideas".
6. **Selection.** Ask, one at a time: which assumption do you test first, and why that one first? Not "the idea we like most": the assumption that would hurt most if wrong, or the one with no source. Then the variant name, lowercase with dashes. Then their names and the date. Write the intent file now, with the template below.
7. **Prototype test** (about 15 min). Run mode `prototype` of `.claude/skills/test-card/SKILL.md`, from its step 1, with its rules and its template. Its try-first question is the first question of this step. Write `discovery/test-cards/<variant>-prototype.md`. Then stop. Tell the pair to own the card (block 4, step "Own the card") and that the next step is `/variant-spec <variant>`. Point them to `http://localhost:3000/discovery/tree`: the three ideas now hang under their opportunity.

## Output template

```markdown
# Intent: <short name>

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: YYYY-MM-DD.
> Opportunity: <C-id>, <name>, in discovery/opportunity-comparison.md · Decision: discovery/decisions/<file>.md
> Material: <synthetic or composite, repeated from the material the opportunity rests on>

A critical assumption is the one thing that must be true for an idea to work.

## Your first try
- <each idea the pair wrote in step 1, word for word>

## How might we
<the pair's version of the question> · Need: "<quote>" (`<file>:<line>`) · Driver: <driver> (`discovery/kpi-tree.md:<line>`)

## All ideas
1. <idea, by mechanism> · <the pair | SCAMPER | analogy | reversal> <· not on the variant page>
2. ...

## Boundaries
- <constraint> (`<file>:<line>`)

## Up to five
| Idea | What changes on the page | Critical assumption | Level | Driver it moves | Prototype can test it |
|---|---|---|---|---|---|
| <n>: <idea> | <...> | <assumption> | <level>, <source> | <driver> | yes / no, <why> |

## Three ideas side by side

| Idea | Critical assumption | Level | Driver | What a test would need |
|---|---|---|---|---|
| I1: <mechanism> | <assumption> | <level> | <driver> | <what a tester does or sees that shows it holds or breaks> |
| I2: ... | | | | |
| I3: ... | | | | |

## Further ideas
- <the ideas from "Up to five" not in the three, for the next round>

## Selection (human)

- Assumption we test first: ____ (human decides)
- Why this one first: ____ (human decides)
- Idea it comes from: ____ (human decides)
- Variant name (lowercase with dashes): ____ (human decides)
- Who: ____ · When: ____

A second round adds a second "Selection (human)" below this one, with its own variant name.
```
