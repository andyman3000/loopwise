---
name: test-card
description: Draft the test card for one solution variant, in one of two modes. Both read as a Strategyzer test card: we believe that, to test that we will, we are right if. "prototype" writes the card for the prototype test before the spec and the build - one critical assumption, a test scenario for a tester, signs to watch, a go-on line and a rework-or-drop line. "launch" writes the card for the release - critical assumptions, a success line set upfront, usage hypothesis, proxy metric, counter metric, kill criterion, time frame. Use as "/test-card <variant> prototype" or "/test-card <variant> launch". Writes one file per variant and mode; never decides whether the variant ships.
---

# Test card

**Input:** a variant name and a mode, `prototype` or `launch`. If the mode is missing, ask which one,
and say in one line what each is for. If the variant name is missing, ask.

| Mode | When | Reads first | Writes |
|---|---|---|---|
| `prototype` | after `/intent-and-ideas`, once the pair named the idea it tests first; again for the next idea in a second round | `discovery/intents/<opportunity>.md` | `discovery/test-cards/<variant>-prototype.md` |
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

The card reads as a test card (Osterwalder, Strategyzer): **We believe that** <the assumption>.
**To test that, we will** <show a tester the page, with this scenario, and watch for these signs>.
**We are right if** <go-on line>. **We rework or drop the idea if** <rework-or-drop line>.
The learning card later answers it line by line: we believed, we observed, we learned, therefore we will.

### Rules

- **One assumption.** Take the assumption the human named in "Assumption we test first" in the intent's "Selection (human)" whose variant name matches, word for word. A second round adds a second selection below the first. If no selection names this variant, or its assumption field is empty, stop and say so. Do not pick one.
- **The scenario is written for the tester:** a situation in two or three sentences ("You are ..., you want ..."), and one task ("Find ...", "Send ..."). Check it against these rules, in order:
  - It names no assumption, no idea, and no answer the team hopes for. It says nothing about what the tester worries about or hopes to find.
  - It holds no ready words for any sign the tester writes or says: a tester who copies the scenario shows nothing. Recognising the situation is not a sign either.
  - Facts about the team come from a source. The citation goes in the line "Sources" under the scenario, never into the text the tester hears.
  - If the assumption needs the tester to be in a certain situation (a training that did not stick, no idea what to ask for) or to know something about their team, the situation asks them to answer for a real case of their own: "Think of a team you know well", "Think of a training your team had that did not stick". It never hands them that case. If the tester has no such case, the test does not count.
  - It names no role or fact a persona file contradicts unless the test needs it; then say so under "What this test cannot show".
- **Signs are what the watcher can see or hear:** a click, a pause, a question the tester asks, a field left empty, words the tester says. Not a feeling the watcher guesses. Each sign is tied to the go-on line or to the rework-or-drop line.
- **Go-on line and rework-or-drop line** are set before the test, in words, by the human. Propose both, mark each "proposal". No percentages: one tester per pair cannot carry a rate.
- **Persona-source rule.** An AI persona (`persona-walkthrough`) can test only what its persona file has a source for. For each sign, check `product/personas/sponsor-soft.md` and `product/personas/sponsor-hard.md`: quote the line that states the behaviour itself, or write "only the cross test with people can test this". A line that names only the worry, the goal, what the sponsor knows, or a different behaviour is not enough. Anything the tester would write in their own words is always "only the cross test with people can test this".
- **"Pressure-tested, not validated"** stands at the top of the card. The AI personas come from the same sources as the opportunity, so they cannot confirm it from outside.

### Steps

0. **Try first.** Ask the human: "Finish three sentences in your own words. We believe that ... To test that, we will ... We are right if ..." Wait for the answer before you read further or draft anything. The last sentence matters most: what would a tester have to do, or say, for the assumption to hold?
1. Read the intent and its "Selection (human)". Quote the assumption, the idea and the variant name. If a field is empty, stop and say which. If `discovery/decisions/` holds a learning card for an earlier variant of the same intent, quote its "We learned" line and ask the human: "What does this idea answer of what you learned?" Put the answer under "The assumption we test".
2. Read the idea's assumptions and their sources in the intent. Do not reassess them.
3. Draft the scenario, the signs, the two lines and what the test cannot show. Apply the persona-source rule to every sign. Hold the situation against both persona files: their "Persona type" line and their facts (the soft sponsor has no budget and no line authority, `product/personas/sponsor-soft.md:5`; the hard sponsor already got a first step approved, `product/personas/sponsor-hard.md:16`). A role or fact that clashes goes under "What this test cannot show"; the personas then keep their own file.
4. Show the human the scenario and the signs. Ask: can a tester who knows only the situation and the task show these signs? Change what they say.
5. Write the file. Tell the human in three lines which sign is weakest, which lines they must own, and that the next step is `/variant-spec <variant>`. If every sign is "only the cross test with people can test this", say so: the persona runs will then show stalls only, not signs.

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

## We believe that (the assumption we test)
"<assumption, quoted from Selection (human)>" (`discovery/intents/<opportunity>.md:<line>`)
Level in the intent: <level, quoted>

## To test that, we will
Show one tester from another pair the page `/<page>?variant=<variant>`. The tester gets only the scenario below. The person who built the page watches for the signs.

### Test scenario (the tester sees only this)
- **Situation:** <two or three sentences, "You are ...">
- **Task:** <one sentence>
- **Page:** `/<page>?variant=<variant>`, the page the spec names as the start
- **Sources:** <citations for the team facts in the situation, not read to the tester>
- **Does not count if:** <only when the situation asks for a real case: "the tester has no such case">

### Signs the watcher looks for
| Sign (what the watcher sees or hears) | Points to | Can a persona show it? |
|---|---|---|
| <sign> | go on | <"yes: <quote>" (`product/personas/<file>:<line>`), or "only the cross test with people can test this"> |
| <sign> | rework or drop | ... |

## We are right if (go-on line)
<in words, proposal> · Set on: <YYYY-MM-DD>

## We rework or drop the idea if (rework-or-drop line)
<in words, proposal> · Set on: <YYYY-MM-DD>

## What this test cannot show
- One tester per pair: a pattern, not a rate.
- <what the scenario cannot reach, for example whether the sponsor later books>
- <signs no persona file has a source for>
```

## Mode `launch`

A launch card says, before release, what must happen for the variant to count as working, and when
to take it back. Its first section says this as a test card (Osterwalder, Strategyzer): we believe
that, to test that we will, we measure, we are right if, we take it back if.

### Rules

- **Critical assumptions first** (Torres): the assumptions this variant rests on, not the variant as a whole.
- **Thresholds are proposals, not evidence.** The success line, kill criterion and time frame are targets a human sets; mark each "proposal". Where a baseline is needed, name the events it is computed from and say whether `data/` holds them yet. Never state a baseline value you have not counted.
- **Citations into `discovery/` carry a short quote**, so `npm run check` catches a line that moved. Never cite a section name alone.
- **Every line is checkable against data later.** Each metric names the event(s) it is computed from, from this list only: `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. If a line cannot be computed from these, say so under "What we cannot see" instead of inventing an event.
- **Changes before roll-out come first.** If the learning card moves on "with what changes before roll-out", check each change is in the spec. If a page change is missing, list it and stop: the spec needs it before the launch card. A change that is not a page change (someone confirms a line, a person test) is listed as open on the card, not as missing. A change on another page belongs in the spec like any other: the variant holds one file per page it changes.
- **Invented lines are assumptions.** Every line the spec marks as invented that the page shows to sponsors (a promise about what the academy does) becomes a critical assumption, with "unsupported" until someone who runs the training confirms it.
- **Hold every threshold against its counted baseline.** Where `data/` holds the baseline, count it and put it next to the threshold. If the baseline already meets the kill criterion, or already meets the success line, say so in one line: the threshold would fire, or pass, on day one. The human sets the value.
- **Hold every threshold against the usual swing.** Before setting a line on a rate, count the same rate for the unchanged page in blocks as long as the comparison will be (four weeks per side, eight weeks after launch), across the baseline in `data/`. Show the blocks in a table with the command. If the line asks for a change smaller than the largest difference between neighbouring blocks, say so: the rate shows a direction, not an effect. Then propose a line where the variant should make a larger difference (a step it replaces, a field it fills, a record outside the website), or mark the rate "direction only". Counted blocks only, no probabilities. Do the same for the kill criterion: count how often the unchanged page would have met it.
- **Every driver the intent wants to move gets a line.** Quote each driver from the intent's "Desired outcome", with its line. Each one appears on the card: in the success line, as a line marked "direction only", or under "What we cannot see" with the reason. A card that drops a driver gets read without it later, and the result the intent asked for goes unread.
- **Name the driver the page can move.** A variant changes pages on the website, up to the sent inquiry. If the intent's driver lies after it (call rate, booking rate), name the driver the pages can move and write the link as `[assumption: ...]`. Quote both drivers from `discovery/kpi-tree.md`.
- **Say whether this repo's data holds the variant.** Count the events in `data/events.jsonl` whose `variant` is this variant. If there are none, write in the header and under "What we cannot see": "No event in `data/` carries this variant, so this card cannot be read against the data in this repo."
- **The success line is set upfront**, before launch, and never edited after data arrives. A later change is a new card version with a date.
- Leave the Result section empty. `read-result` fills it.

### Steps

0. **Try first.** Ask the human for their success line in one sentence: what must happen for this variant to count as working. Wait for the answer before you read further or draft anything.
1. If the spec changed after the learning card, ask whether the page was rebuilt. If not, stop: the launch card describes the page that ships, so the rebuild comes first. Read the spec, the prototype card `discovery/test-cards/<variant>-prototype.md` and the learning card for this variant in `discovery/decisions/` (`<nnn>-<variant>.md`) if they exist, and the intent. If the variant name has no file in `discovery/specs/`, stop and ask.
2. List the critical assumptions: what must be true for this variant to change behaviour. Two to four. Start with the one the prototype tested and what the learning card says about it, quoted. Search `sources/` for evidence for and against each.
3. Map the variant to its KPI branch in `discovery/kpi-tree.md` (quote the line).
4. Count the events in `data/events.jsonl` that carry this variant.
5. Draft each field of the template. Check: every metric names events; no counted number lacks a source; every threshold says "proposal"; every driver in the intent's "Desired outcome" has a line on the card or a reason under "What we cannot see".
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

## The card in five lines
- **We believe that** <the weakest critical assumption below, in one sentence>.
- **To test that, we will** release the variant to <who> for <time frame>.
- **And measure** <proxy metric>.
- **We are right if** <success line>.
- **We take it back if** <kill criterion>.

Each line repeats a field below in one sentence. If a field changes, this section changes with it.

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
