---
name: loopwise-test-card
description: Draft the test card for one solution variant, in one of two modes. Both read as a Strategyzer test card in four lines: we believe that, to verify that we will, and measure, we are right if. "prototype" writes the card for the prototype test before the spec and the build - one critical assumption, a test scenario for a tester, signs to watch, a go-on line and a rework-or-drop line. "launch" writes the card for the release - critical assumptions, a success line set upfront, usage hypothesis, proxy metric, counter metric, kill criterion, time frame. Use as "/loopwise-test-card <variant> prototype" or "/loopwise-test-card <variant> launch". Writes one file per variant and mode; never decides whether the variant ships.
---

# Test card

**Input:** a variant name and a mode, `prototype` or `launch`. If the mode is missing, ask which one,
and say in one line what each is for. If the variant name is missing, ask.

| Mode | When | Reads first | Writes |
|---|---|---|---|
| `prototype` | after `/loopwise-intent-and-ideas`, once the pair named the idea it tests first; again for the next idea in a second round | `discovery/intents/<opportunity>.md` | `discovery/test-cards/<variant>-prototype.md` |
| `launch` | after the learning card says move on, before release | `discovery/specs/<variant>.md` | `discovery/test-cards/<variant>.md` |

Both modes also read `product/constraints.md`, `discovery/kpi-tree.md`, `product/personas/` and
`sources/`.

This is an assessment drafted by an agent, not a decision. A human owns the card and every value on it.

**Setting.** Read the `Setting:` line in `CLAUDE.md`. No line means `workshop`.
- `workshop`: a pair in the one-day bootcamp. Mode `prototype` plans a real test with people, as
  under "Testers". The pair does not run it today: it builds the page from its spec, and the
  test with people comes after the workshop. No AI persona reads the card in the bootcamp, so leave
  out everything about AI personas: the persona-source rule, the column "Can an AI persona show
  it?", the persona lines in steps 4 and 5, and the persona sentence in the banner. Propose the
  testers and how many, each marked "proposal", and ask nothing more about them: the pair changes
  them when it makes the card its own.
- `team`: a product team. It runs the test with the people it recruits. Read "the pair" in this
  skill as "the team".
Mode `launch` is the same in both settings.

## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the human writes in. Show first, by mode:
- `prototype`: **Where:** Block 4, steps 5 to 7 of 7: the prototype test card. **You end with:** `discovery/test-cards/<variant>-prototype.md`, at http://localhost:<port>/discovery/test-cards/<variant>-prototype.md, owned by you. **Time:** about 25 minutes: 15 for the card, 5 to make it yours, 5 to check and commit.
- `launch`: **Where:** Block 6b: the launch card, after the learning card said move on. **You end with:** `discovery/test-cards/<variant>.md`, at http://localhost:<port>/discovery/test-cards/<variant>.md. **Time:** about 20 of the 35 minutes of block 6b.

Say in one line what a test card is, and in mode `prototype` that the card plans a test with people; in setting `workshop`, add that today you build the page from your spec, and the test with people comes after the workshop. End each step with "Done: <what>. Next: <what the human does now>."

**At the end, in setting `workshop`:** the Next and Time lines follow `.claude/rules/guiding.md`, "At the end of the skill", not the lines this skill names below. Stop; name no next skill, no command to type and no block.

## Rules for both modes

- **Every claim quotes its source with location** (file and line). No quote, no claim. Each citation is a Markdown link: `[<file>:<line>](<path from this file>#L<line>)` (`.claude/rules/writing.md`, "Citations are links").
- **Do not invent numbers.** Evidence uses only counted numbers: sources, voices, events in the log. No scores, no probabilities, no totals.
- **Evidence levels in words:** **well supported**, **partly supported** or **unsupported**, with reasoning, sources, counter-evidence and gaps.
- **Repeat the material label:** the sources are synthetic or anonymised composites; the card says so in its header.
- Respect `product/constraints.md`: a line that needs data the constraints rule out goes under "What we cannot see" or "What this test cannot show".
- Leave the owner field and every `____ (human decides)` field empty.
- **Try first, then compare.** Each mode asks the human one question before it drafts (below). Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". If the answer names a solution or a page change instead of what they want to see, keep it word for word and say so in "Your first try". After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the human's answer.** Each answer the human gives in their own words gets feedback: the first try, and in mode `prototype` the answer on what the idea answers of an earlier learning. Tell them in two or three short lines how strong it was. Say what was good, what was weak, and why. Judge it against what a test card needs, as each mode says below. Name the words in their answer. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the feedback on the first try under "Feedback" in "Your first try" too.

## Mode `prototype`

A prototype test shows one person a rough page and watches what they do. It tests one critical
assumption, before anyone builds the real thing. The person who built the page watches; the tester
knows only the situation and the task, never the assumption.

The card reads as a test card (Osterwalder and Bland, Strategyzer), in four lines:
- **We believe that** <the assumption>.
- **To verify that, we will** <show a tester the page, with this scenario>.
- **And measure** <the signs the watcher sees or hears>.
- **We are right if** <go-on line>.

Under the four lines: **We rework or drop the idea if** <rework-or-drop line>.

### Rules

- **One assumption.** Take the assumption the human named in "Assumption we test first" in the intent's "Selection (human)" whose variant name matches, word for word. A second round adds a second selection below the first. If no selection names this variant, or its assumption field is empty, stop and say so. Do not pick one.
- **The scenario is written for the tester:** a situation in two or three sentences ("You are ..., you want ..."), and one task ("Find ...", "Send ..."). Check it against these rules, in order:
  - It names no assumption, no idea, and no answer the team hopes for. It says nothing about what the tester worries about or hopes to find.
  - It holds no ready words for any sign the tester writes or says: a tester who copies the scenario shows nothing. Recognising the situation is not a sign either.
  - Facts about the team come from a source. The citation goes in the line "Sources" under the scenario, never into the text the tester hears. A fact that fits only one of the choices on the page stays out of the scenario.
  - If the assumption needs the tester to be in a certain situation (a training that did not stick, no idea what to ask for) or to know something about their team, the situation asks them to answer for a real case of their own: "Think of a team you know well", "Think of a training your team had that did not stick". It never hands them that case. If the tester has no such case, the test does not count.
  - It names no role or fact a persona file contradicts unless the test needs it; then say so under "What this test cannot show".
- **Signs are what the watcher can see or hear:** a click, a pause, a question the tester asks, a field left empty, words the tester says. Not a feeling the watcher guesses. Each sign is tied to the go-on line or to the rework-or-drop line.
- **Go-on line and rework-or-drop line** are set before the test, in words, by the human. Propose both, mark each "proposal". No percentages. The lines may count testers (see "Testers").
- **Persona-source rule.** An AI persona (`loopwise-persona-walkthrough`) can test only what its persona file has a source for. For each sign, check `product/personas/buyer-without-budget.md` and `product/personas/buyer-with-budget.md`: quote the line that states the behaviour itself, or write "only a test with people can test this". A line that names only the worry, the goal, what the buyer knows, or a different behaviour is not enough. Anything the tester would write in their own words is always "only a test with people can test this".
- **Feedback on the first try** asks: does "We believe that" name the assumption, not the idea? Is "To verify that, we will" something one tester does on a page? Does "And measure" name what a watcher can see or hear, not a feeling? Is "We are right if" set before the test, and could a watcher tell whether it happened?
- **"Pressure-tested, not validated"** stands at the top of the card; in setting `workshop`, "Not validated yet". The AI personas come from the same sources as the opportunity, so they cannot confirm it from outside.

### Testers

- **Who tests.** Propose who qualifies as a tester, from the persona file of the buyer type the
  scenario targets. Quote the lines you use. In setting `team`, ask the human to confirm or change the criteria,
  and to name who recruits the testers and by when. In setting `workshop`, ask nothing: write
  "after the workshop" for who recruits and when.
- **How many.** Propose five people per buyer type the test targets, marked "proposal". Say why in
  one line in the chat: five people show most of the problems people have in understanding and
  using one page. If the scenario fits both buyer types, ask whether the test covers one type or
  both. The human sets the number.
- **The two lines may count testers.** For example "at least 3 of 5 testers ...". Mark each line
  "proposal". The human sets it before the first test. Never a percentage.
- **Not every assumption fits a prototype test.** A prototype test shows whether people understand
  and use the page. It cannot show whether they would book or pay. If the assumption is about that,
  say so under "What this test cannot show", and name the launch card as the place to measure it.
- **The tester count goes on the card**, so the learning card can say how many of the planned
  people tested.

### Steps

0. **Try first.** Start with "Step 5 of 7: the prototype test card". Read only the intent's "Selection (human)" whose variant name matches, and show the human the idea and the assumption they chose to test first, quoted. Then say: about 3 minutes, a sentence per line. A good answer names what one tester does on a page, and what you would see or hear. One example from an unrelated product, a library app whose borrowers return books late: "We believe that borrowers renew when the reminder offers one tap. To verify that, we will show a tester the reminder screen. And measure whether they find the renew button without scrolling. We are right if the tester renews and can say the new due date." Say that the last line matters most: it says what a tester would have to do, or say, for the assumption to hold. Then ask the human: "Finish four lines in your own words. We believe that ... To verify that, we will ... And measure ... We are right if ..." Wait for the answer before you read further or draft anything.
1. Read the intent and its "Selection (human)". Quote the assumption, the idea and the variant name. If a field is empty, stop and say which. Now give the feedback on the first try (see Rules): the intent shows whether "We believe that" names the assumption or the idea. If `discovery/decisions/` holds a learning card for an earlier variant of the same intent, quote its "We learned" line. Say: about 2 minutes; a good answer is one sentence that ties this idea to what you learned. Ask the human: "What does this idea answer of what you learned?" Put the answer under "We believe that". Then give feedback in two or three short lines: does the answer tie the new idea to what was learned, or only restate the idea? If there is no learning card, skip all of this and say nothing about it.
2. Read the idea's assumptions and their sources in the intent. Do not reassess them.
3. Draft the scenario, the signs, the two lines and what the test cannot show. Apply the persona-source rule to every sign. Hold the situation against both persona files: their "Persona type" line and their facts (the buyer without budget does not decide alone and has no budget settled at first contact, `product/personas/buyer-without-budget.md:5`; the buyer with budget already got a first step approved, `product/personas/buyer-with-budget.md:16`). A role or fact that clashes goes under "What this test cannot show"; the personas then keep their own file.
4. Show the human the scenario, then the signs as a table with four columns: number, what the watcher sees or hears, what it tells them (go on, or rework or drop), and whether an AI persona can show it. Say: about 2 minutes, a good answer is the numbers of the signs you could not see or hear, or "none" if you could see or hear every one. Ask: "Picture yourself watching a tester. Which of these signs could you not see or hear? Name their numbers, or say none." Offer "none" as an answer, never "all of them": it reads as the opposite. Change what they say. Then say in two lines which signs an AI persona can show: in block 5 Claude plays two buyers from `product/personas/`, written profiles built from the same sources, and a persona can only do what its file has a line for. In setting `team`, then ask who qualifies, how many, who recruits and by when (see "Testers").
5. Write the file. Tell the human in three lines which sign is weakest and which lines they must own. If every sign is "only a test with people can test this", say so: no AI persona can show a sign on this card. Say that the page on the card is built in block 5: until then its link answers "Not found". Then guide the last part of the block, step by step, and wait after each:
   - "Step 6 of 7: make the card yours, about 5 minutes." Link the file at http://localhost:<port>/discovery/test-cards/<variant>-prototype.md. Say first what the two lines are (`.claude/rules/guiding.md`, "Terms": go-on line, rework-or-drop line) and what `Card owner` means: the people who run the test and decide after it; write the names from `discovery/.local.json` there (`.claude/rules/guiding.md`, "Language and port"). What to do: tell me in the chat "We are right if" and "We rework or drop the idea if" in your own words; I put them in. Or edit the file yourself. The file is in English: write in English, or tell me your words in your language and I put them in English, keeping your meaning, and show you the English line to confirm. A good line says what a watcher would see, without "maybe". Two things to check in the file first: the scenario must not give the assumption away, and you must be able to see each sign without guessing. In setting `workshop`, say in one line who qualifies, how many testers, and why that number, marked "proposal". Every rule on how signs or lines count stands on the card and is shown here, in the same words. When the pair gives its two lines, check that each tester meets exactly one; if not, name the gap or the overlap and ask. End with the one ask: the two lines in your words.
   - "Step 7 of 7: check and commit, about 5 minutes." Say that the commit saves the files in their branch, nothing leaves the laptop, and you run it when they say yes. After the human says yes, run `npm run check` alone, without a pipe. Only if it finds no problem, run `git add discovery && git commit -m "block 4: ideas and prototype test card"`.
   End with four lines: "Made: the prototype test card for <variant>." "Look: http://localhost:<port>/discovery/test-cards/<variant>-prototype.md." "Next: block 5. Type `/clear`, then `/loopwise-variant-spec <variant>`: the spec, a description of the smallest page for your test." "Time: about 25 minutes were planned for the card; block 5 starts with the spec, 20 minutes." Then stop.

### Output template, mode `prototype`

```markdown
# Prototype test card: <variant>

> **<team: "Pressure-tested, not validated." | workshop: "Not validated yet.">** <team only: "The AI personas come from the same sources as the opportunity."> Only a test with people tests from outside.
> Assessment drafted by an agent on <YYYY-MM-DD>, not a decision.
> Card owner: ____ (human decides)
> Intent: `discovery/intents/<opportunity>.md` · Idea: <I-number> ("<idea line, quoted>")
> Material: <synthetic or composite, repeated from the intent>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## We believe that (the assumption we test)
"<assumption, quoted from Selection (human)>" ([discovery/intents/<opportunity>.md:<line>](../intents/<opportunity>.md#L<line>))
Level in the intent: <level, quoted>

## To verify that, we will
Show <n> people who <criteria> the page `/<page>?variant=<variant>`. Each tester gets only the scenario below. The person who built the page watches for the signs.
<workshop only: "Today you build the page from your spec. The test with people comes after the workshop.">

### Testers
- **Who qualifies:** <criteria, proposal, with the persona lines they rest on>
- **How many:** <n> per <buyer type>, proposal · Set by: <team: ____ (human decides) | workshop: after the workshop>
- **Recruited by:** <workshop: "after the workshop" | team: <name or role> · **By:** <YYYY-MM-DD>>

### Test scenario (the tester sees only this)
- **Situation:** <two or three sentences, "You are ...">
- **Task:** <one sentence>
- **Page:** `/<page>?variant=<variant>`, the page the tester starts on. It is built in block 5; until then the link answers "Not found"
- **Sources:** <citations for the team facts in the situation, not read to the tester>
- **Does not count if:** <only when the situation asks for a real case: "the tester has no such case">

## And measure (the signs the watcher looks for)
| # | What the watcher sees or hears | What it tells you | Can an AI persona show it? (team only) |
|---|---|---|---|
| 1 | <sign> | go on | <"yes: <quote>" ([product/personas/<file>:<line>](../../product/personas/<file>#L<line>)), or "only a test with people can test this"> |
| 2 | <sign> | rework or drop | <the same> |

An AI persona is Claude playing a buyer from `product/personas/`, in the persona walkthrough.

## We are right if (go-on line)
<in words, proposal> · Set on: <YYYY-MM-DD>

## We rework or drop the idea if (rework-or-drop line)
<in words, proposal> · Set on: <YYYY-MM-DD>

## What this test cannot show
- <n> testers: a pattern, not a rate.
- <whether the assumption needs a test the prototype cannot give, for example whether buyers book>
- <what the scenario cannot reach, for example whether the buyer later books>
- <signs no persona file has a source for>
```

## Mode `launch`

A launch card says, before release, what must happen for the variant to count as working, and when
to take it back. Its first section says this as a test card (Osterwalder and Bland, Strategyzer), in
four lines: we believe that, to verify that we will, and measure, we are right if. The kill criterion
follows under the four lines: we take it back if.

### Rules

- **Critical assumptions first** (Torres): the assumptions this variant rests on, not the variant as a whole.
- **Thresholds are proposals, not evidence.** The success line, kill criterion and time frame are targets a human sets; mark each "proposal". Where a baseline is needed, name the events it is computed from and say whether `data/` holds them yet. Never state a baseline value you have not counted.
- **Citations into `discovery/` carry a short quote**, so `npm run check` catches a line that moved. Never cite a section name alone.
- **Every line is checkable against data later.** Each metric names the event(s) it is computed from, from this list only: `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. If a line cannot be computed from these, say so under "What we cannot see" instead of inventing an event.
- **Changes before roll-out come first.** If the learning card moves on "with what changes before roll-out", check each change is in the spec. If a page change is missing, list it and stop: the spec needs it before the launch card. A change that is not a page change (someone confirms a line, a person test) is listed as open on the card, not as missing. A change on another page belongs in the spec like any other: the variant holds one file per page it changes.
- **Invented lines are assumptions.** Every line the spec marks as invented that the page shows to buyers (a promise about what the academy does) becomes a critical assumption, with "unsupported" until someone who runs the training confirms it.
- **Hold every threshold against its counted baseline.** Where `data/` holds the baseline, count it and put it next to the threshold. If the baseline already meets the kill criterion, or already meets the success line, say so in one line: the threshold would fire, or pass, on day one. The human sets the value.
- **Hold every threshold against the usual swing.** Before setting a line on a rate, count the same rate for the unchanged page in blocks as long as the comparison will be (four weeks per side, eight weeks after launch), across the baseline in `data/`. Show the blocks in a table with the command. If the line asks for a change smaller than the largest difference between neighbouring blocks, say so: the rate shows a direction, not an effect. Then propose a line where the variant should make a larger difference (a step it replaces, a field it fills, a record outside the website), or mark the rate "direction only". Counted blocks only, no probabilities. Do the same for the kill criterion: count how often the unchanged page would have met it.
- **The success line names the same step as the intent.** Quote the step the intent's "Desired outcome" names, with its line, and the KPI tree line for that step. The success line measures that step, not a driver before or after it. If the human's first try names another step, the feedback says so: "The first try names <step>; the intent names <step>." Check whether the variant opens a path that skips a step (a call slot skips the sent inquiry): a rate whose base is the skipped step cannot show the variant.
- **Every step the intent wants to move gets a line.** Quote each step from the intent's "Desired outcome", with its line, including any early signal it names. Each one appears on the card: in the success line, as a line marked "direction only", or under "What we cannot see" with the reason. A card that drops a driver gets read without it later, and the result the intent asked for goes unread.
- **Name the driver the page can move.** A variant changes pages on the website. If the intent's step lies after what the page changes (a booking after the call), keep the intent's step in the success line. Add the driver the page can move as the proxy metric, with the link as `[assumption: ...]`. Quote both lines from `discovery/kpi-tree.md`.
- **Say whether this repo's data holds the variant.** Count the events in `data/events.jsonl` whose `variant` is this variant. If there are none, write in the header and under "What we cannot see": "No event in `data/` carries this variant, so this card cannot be read against the data in this repo."
- **The success line is set upfront**, before launch, and never edited after data arrives. A later change is a new card version with a date.
- Leave the Result section empty.
- **Feedback on the first try** asks: does it name the same step as the intent's "Desired outcome"? Can the success line be counted from the events in the list above? Does it name what is compared with what? Is it set before launch, not tuned to a hoped result? Once the swing table exists, say whether the change it asks for is larger than the usual swing.

### Steps

0. **Try first.** Say first: about 3 minutes, one sentence. A good answer names what you count, how much, by when, and against what. One example from an unrelated product, a library app: "We are right if at least 3 in 10 loans are renewed from the reminder, over four weeks, against 1 in 10 before." Then ask the human to finish one line: "We are right if ...". That is their success line: what must happen for this variant to count as working. Wait for the answer before you read further or draft anything.
1. If the spec changed after the learning card, ask whether the page was rebuilt. If not, stop: the launch card describes the page that ships, so the rebuild comes first. Read the spec, the prototype card `discovery/test-cards/<variant>-prototype.md` and the learning card for this variant in `discovery/decisions/` (`<nnn>-<variant>.md`) if they exist, and the intent. If the variant name has no file in `discovery/specs/`, stop and ask.
2. List the critical assumptions: what must be true for this variant to change behaviour. Two to four. Start with the one the prototype tested and what the learning card says about it, quoted. Search `sources/` for evidence for and against each.
3. Map the variant to its KPI branch in `discovery/kpi-tree.md` (quote the line).
4. Count the events in `data/events.jsonl` that carry this variant.
5. Draft each field of the template. Check: every metric names events; no counted number lacks a source; every threshold says "proposal"; the success line names the same step as the intent's "Desired outcome"; every step the intent names has a line on the card or a reason under "What we cannot see".
6. Write the file. Give the feedback on the first try (see Rules), now that the swing table shows the usual swing. Tell the human in three lines which assumption is weakest and which line needs their judgement most.
7. **Make the card yours** (about 5 minutes). Link http://localhost:<port>/discovery/test-cards/<variant>.md. Say in one line what the card is: the lines you set before launch, read against the data after it. Show the success line, the kill criterion and the time frame, each marked "proposal". Check: does the success line name the same step as the intent? Is the change it asks for larger than the usual swing? Would the kill criterion fire on day one? A good answer is "they stand", or a line in your words. Ask: "Do these three lines stand, or what do you change?" Put their words in. Write the names from `discovery/.local.json` under `Card owner`; ask nothing (`.claude/rules/guiding.md`, "Language and port").
8. **Check and commit.** Say that the commit saves the files in their branch, nothing leaves the laptop, and you run it when they say yes. On yes, run `npm run check`, then `git add discovery site && git commit -m "block 6: carry on"`. End with four lines: "Made: the launch card for <variant>." "Look: http://localhost:<port>/discovery/test-cards/<variant>.md." "Next: for build to earn, type `/clear`, then `/loopwise-variant-spec <variant> launch`." "Time: block 6b planned about 20 minutes for the card; the Abgleich follows the block." Then stop.

### Output template, mode `launch`

```markdown
# Test card: <variant>

> Assessment drafted by an agent on <YYYY-MM-DD>, not a decision.
> Card owner: ____ (human decides)
> Variant: `discovery/specs/<variant>.md` · Intent: `discovery/intents/<opportunity>.md` · Prototype test: `discovery/test-cards/<variant>-prototype.md`, learning card `discovery/decisions/<nnn>-<variant>.md` (or "none")
> KPI branch: <branch> ("<quote>", [discovery/kpi-tree.md:<line>](../kpi-tree.md#L<line>))
> Material: <synthetic or composite, repeated>
> Data: <n> events in `data/events.jsonl` carry this variant <(command)>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## The test card in four lines
- **We believe that** <the weakest critical assumption below, in one sentence>.
- **To verify that, we will** release the variant to <who> for <time frame>.
- **And measure** <proxy metric, with the events it is computed from>.
- **We are right if** <success line>.

Under the four lines: **We take it back if** <kill criterion>.

Each line repeats a field below in one sentence. If a field changes, this section changes with it.

## What changes for whom
<who does what differently on the page, in one or two sentences>

## Critical assumptions
1. **<assumption>**: <well supported | partly supported | unsupported>
   - Reasoning: <why this level>
   - Sources: "<quote>" ([<file>:<line>](../../<file>#L<line>))
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

_Empty until after the time frame. A human decides keep, adjust or withdraw._
```
