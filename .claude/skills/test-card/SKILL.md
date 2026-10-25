---
name: test-card
description: Draft the test card for one solution variant, in one of two modes. "prototype" writes the card for the prototype test before the spec and the build - one critical assumption, a test scenario for a tester, signs to watch, a go-on line and a rework-or-drop line. "launch" writes the card for the release - critical assumptions, a success line set upfront, usage hypothesis, proxy metric, counter metric, kill criterion, time frame. Use as "/test-card <variant> prototype" or "/test-card <variant> launch". Writes one file per variant and mode; never decides whether the variant ships.
---

# Test card

**Input:** a variant name and a mode, `prototype` or `launch`. If the mode is missing, ask which one,
and say in one line what each is for. If the variant name is missing, ask.

| Mode | When | Reads first | Writes |
|---|---|---|---|
| `prototype` | after the human filled "Selection" in the intent, before `variant-spec` | `discovery/intents/<opportunity>.md` | `discovery/test-cards/<variant>-prototype.md` |
| `launch` | after the learning card says move on, before release | `discovery/specs/<variant>.md` | `discovery/test-cards/<variant>.md` |

Both modes also read `product/constraints.md`, `discovery/kpi-tree.md`, `product/personas/` and
`sources/`.

This is an assessment drafted by an agent, not a decision. A human owns the card and every value on it.

## Rules for both modes

- **Every claim quotes its source with location** (file and line). No quote, no claim.
- **Do not invent numbers.** Evidence uses only counted numbers: sources, voices, events in the log. No scores, no probabilities, no totals.
- **Evidence levels in words:** **well supported**, **partly supported** or **unsupported**, with reasoning, sources, counter-evidence and gaps.
- **Repeat the material label:** the sources are synthetic or anonymised composites; the card says so in its header.
- Respect `product/constraints.md`: a line that needs data the constraints rule out goes under "What we cannot see" or "What this test cannot show".
- Leave the owner field and every `____ (human decides)` field empty.
- **Try first, then compare.** Each mode asks the human one question before it drafts (below). Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". If the answer names a solution or a page change instead of what they want to see, keep it word for word and say so in "Your first try". After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.

## Mode `prototype`

A prototype test shows one person a rough page and watches what they do. It tests one critical
assumption, before anyone builds the real thing. The person who built the page watches; the tester
knows only the situation and the task, never the assumption.

### Rules

- **One assumption.** Take the assumption the human named in "Assumption we test first" in the intent's "Selection (human)" whose variant name matches, word for word. A second round adds a second selection below the first. If no selection names this variant, or its assumption field is empty, stop and say so. Do not pick one.
- **The scenario is written for the tester:** a situation in two or three sentences ("You are ..., you want ..."), and one task ("Find ...", "Send ..."). It must not name the assumption, the idea or the answer the team hopes for. It may give facts about the tester's team, taken from a source and cited; it must not say what the tester worries about or hopes to find on the page. Name no role a persona file contradicts unless the test needs it; if it does, say so under "What this test cannot show". If the assumption is about what the sponsor knows or can say, the situation must not give that fact. Instead it asks the tester to answer for a real team they know ("Think of a team you know well"), so their answer is not made up. A tester recognising the situation is not a sign: signs are what the assumption predicts the tester does on the page.
- **Signs are what the watcher can see or hear:** a click, a pause, a question the tester asks, a field left empty, words the tester says. Not a feeling the watcher guesses. Each sign is tied to the go-on line or to the rework-or-drop line.
- **Go-on line and rework-or-drop line** are set before the test, in words, by the human. Propose both, mark each "proposal". No percentages: one tester per pair cannot carry a rate.
- **Persona-source rule.** An AI persona (`persona-walkthrough`) can test only what its persona file has a source for. For each sign, check `product/personas/sponsor-soft.md` and `product/personas/sponsor-hard.md`: quote the line that states the behaviour itself, or write "only the cross test with people can test this". A line that names only the worry or goal behind the behaviour is not enough. Anything the tester would write in their own words is always "only the cross test with people can test this".
- **"Pressure-tested, not validated"** stands at the top of the card. The AI personas come from the same sources as the opportunity, so they cannot confirm it from outside.

### Steps

0. **Try first.** Ask the human: "What would you need to see a tester do, or hear them say, to believe the assumption holds?" Wait for the answer before you read further or draft anything.
1. Read the intent and its "Selection (human)". Quote the assumption, the idea and the variant name. If a field is empty, stop and say which. If `discovery/decisions/` holds a learning card for an earlier variant of the same intent, quote its "We learned" line and ask the human: "What does this idea answer of what you learned?" Put the answer under "The assumption we test".
2. Read the idea's assumptions and their sources in the intent. Do not reassess them.
3. Draft the scenario, the signs, the two lines and what the test cannot show. Apply the persona-source rule to every sign.
4. Show the human the scenario and the signs. Ask: can a tester who knows only the situation and the task show these signs? Change what they say.
5. Write the file. Tell the human in three lines which sign is weakest, which lines they must own, and that the next step is `/variant-spec <variant>`.

### Output template, mode `prototype`

```markdown
# Prototype test card: <variant>

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the cross test with people tests from outside.
> Assessment drafted by an agent on <YYYY-MM-DD>, not a decision.
> Card owner: ____ (human decides)
> Intent: `discovery/intents/<opportunity>.md` · Idea: <I-number> ("<idea line, quoted>")
> Material: <synthetic or composite, repeated from the intent>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## The assumption we test
"<assumption, quoted from Selection (human)>" (`discovery/intents/<opportunity>.md:<line>`)
Level in the intent: <level, quoted>

## Test scenario (the tester sees only this)
- **Situation:** <two or three sentences, "You are ...">
- **Task:** <one sentence>
- **Page:** `/inquiry?variant=<variant>`

## Signs the watcher looks for
| Sign (what the watcher sees or hears) | Points to | Can a persona show it? |
|---|---|---|
| <sign> | go on | <"yes: <quote>" (`product/personas/<file>:<line>`), or "only the cross test with people can test this"> |
| <sign> | rework or drop | ... |

## Go-on line
<in words, proposal> · Set on: <YYYY-MM-DD>

## Rework-or-drop line
<in words, proposal> · Set on: <YYYY-MM-DD>

## What this test cannot show
- One tester per pair: a pattern, not a rate.
- <what the scenario cannot reach, for example whether the sponsor later books>
- <signs no persona file has a source for>
```

## Mode `launch`

A launch card says, before release, what must happen for the variant to count as working, and when
to take it back.

### Rules

- **Critical assumptions first** (Torres): the assumptions this variant rests on, not the variant as a whole.
- **Thresholds are proposals, not evidence.** The success line, kill criterion and time frame are targets a human sets; mark each "proposal". Where a baseline is needed, name the events it is computed from and say whether `data/` holds them yet. Never state a baseline value you have not counted.
- **Every line is checkable against data later.** Each metric names the event(s) it is computed from, from this list only: `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. If a line cannot be computed from these, say so under "What we cannot see" instead of inventing an event.
- **Changes before roll-out come first.** If the learning card moves on "with what changes before roll-out", check each change is in the spec. If one is missing, list it and stop: the spec needs it before the launch card.
- **Invented lines are assumptions.** Every line the spec marks as invented that the page shows to sponsors (a promise about what the academy does) becomes a critical assumption, with "unsupported" until someone who runs the training confirms it.
- **Name the driver the page can move.** A variant replaces only the inquiry page. If the intent's driver lies after it (call rate, booking rate), name the driver the page can move and write the link as `[assumption: ...]`. Quote both drivers from `discovery/kpi-tree.md`.
- **Say whether this repo's data holds the variant.** Count the events in `data/events.jsonl` whose `variant` is this variant. If there are none, write in the header and under "What we cannot see": "No event in `data/` carries this variant, so this card cannot be read against the data in this repo."
- **The success line is set upfront**, before launch, and never edited after data arrives. A later change is a new card version with a date.
- Leave the Result section empty. `read-result` fills it.

### Steps

0. **Try first.** Ask the human for their success line in one sentence: what must happen for this variant to count as working. Wait for the answer before you read further or draft anything.
1. Read the spec, the prototype card `discovery/test-cards/<variant>-prototype.md` and the learning card for this variant in `discovery/decisions/` (`<nnn>-<variant>.md`) if they exist, and the intent. If the variant name has no file in `discovery/specs/`, stop and ask.
2. List the critical assumptions: what must be true for this variant to change behaviour. Two to four. Start with the one the prototype tested and what the learning card says about it, quoted. Search `sources/` for evidence for and against each.
3. Map the variant to its KPI branch in `discovery/kpi-tree.md` (quote the line).
4. Count the events in `data/events.jsonl` that carry this variant.
5. Draft each field of the template. Check: every metric names events; no counted number lacks a source; every threshold says "proposal".
6. Write the file. Tell the human in three lines which assumption is weakest and which line needs their judgement most.

### Output template, mode `launch`

```markdown
# Test card: <variant>

> Assessment drafted by an agent on <YYYY-MM-DD>, not a decision.
> Card owner: ____ (human decides)
> Variant: `discovery/specs/<variant>.md` · Intent: `discovery/intents/<opportunity>.md` · Prototype test: `discovery/test-cards/<variant>-prototype.md`, learning card `discovery/decisions/<nnn>-<variant>.md` (or "none")
> KPI branch: <branch> ("<quote>", `discovery/kpi-tree.md:<line>`)
> Material: <synthetic or composite, repeated>
> Data: <n> events in `data/events.jsonl` carry this variant <(command)>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## What changes for whom
<who does what differently on the page, in one or two sentences>

## Critical assumptions
1. **<assumption>**: <well supported | partly supported | unsupported>
   - Reasoning: <why this level>
   - Sources: "<quote>" (`<file>:<line>`)
   - Prototype test: <what the learning card says about it, quoted, or "not tested">
   - Counter-evidence: <quote with location, or "none found in sources/">
   - Gap: <what nobody has checked yet, who could>

## Success line (set upfront, before launch)
<threshold, proposal> · Computed from: <events> · Set on: <YYYY-MM-DD>

## Usage hypothesis
<the new element is used: by whom, how often, proposal> · Computed from: <events>

## Proxy metric
<metric> · Computed from: <events>

## Counter metric
<what must not get worse> · Computed from: <events> · Baseline: <counted value with source, or "not yet counted: needs <events> before launch">

## Kill criterion
<threshold on the counter metric, proposal> · Computed from: <events>

## Time frame
<weeks, proposal>

## What we cannot see
- <what the data cannot answer, e.g. causality for bookings at the counted case numbers>

## Result

_Empty until after the time frame. `read-result` fills this section from the event log; a human decides keep, adjust or withdraw._
```
