---
name: learning-card
description: Guide the pair that built a variant through what its prototype test showed, one question at a time, and write a learning card (we believed, we observed, we learned, therefore we will) as decision 002. Use after the cross test or a persona walkthrough of the page, when the team says "write the learning card", "what did the test show", or "record what we learned". Quotes the prototype card and the persona files, writes only what the pair says, and decides nothing.
---

# Learning card

**When:** after the prototype test: the cross test with people, or `/persona-walkthrough <variant> page`
if the cross test dropped. Also after a second round, to update the card.
**Input:** the variant name. If missing, ask.
**Reads:** `discovery/test-cards/<variant>-prototype.md` (the assumption, the signs, the two lines);
`discovery/user-tests/<variant>-cross.md` (the watcher's notes from the cross test), `<variant>-spec.md` and `<variant>-page.md` if they exist; `discovery/specs/<variant>.md` (section "Invented lines on the page");
`product/personas/sponsor-soft.md`, `product/personas/sponsor-hard.md`;
`discovery/intents/<opportunity>.md` (the other two ideas).
**Writes:** `discovery/decisions/<nnn>-<variant>.md`. If a file for this variant exists, add a dated
round below the last one; never rewrite an earlier round. Otherwise use the next free number in
`discovery/decisions/`: 002 for the first variant, 003 for the next idea.

A learning card (Osterwalder, Strategyzer) records what a test showed: we believed, we observed, we
learned, therefore we will. Here it is also the decision record for what happens to the variant.
The pair decides. This skill asks, quotes and writes; it decides nothing.

## Rules

- **One question at a time.** Wait for the answer before the next one. At most five sentences per turn. No emojis.
- **Try first is the gut feeling.** The first question is always: "How did the test go, in a few words?" Never start with analysis. A vague reply ("go on", "ok") gets one more ask; if it stays vague, write "skipped". "skip" is written as "skipped".
- **Never ask for what the files hold.** Quote the assumption, the signs and the lines from the prototype card. Do not ask the pair to repeat them.
- **Write only what the pair says.** Observations, the learning and the decision are the pair's words, shortened at most. If an answer is vague, ask one follow-up. If it stays vague, write it as said and mark it "[vague: the pair did not say more]".
- **Observations from people and from personas stay apart.** A cross-test observation quotes the watcher's notes with file and line (`discovery/user-tests/<variant>-cross.md:<line>`). If the cross test happened but the notes file is missing, ask the pair to write it first (block 6a says how) and wait. A persona observation quotes the walkthrough file and the persona-file line it rests on (`product/personas/<file>:<line>`). A persona action with no persona-file line behind it is not an observation and is left out.
- **One round, one set of files.** Round 1 reads `<variant>-cross.md`, `<variant>-page.md` and the card's first section. Round 2 reads `<variant>-cross-2.md` and `<variant>-page-2.md` and the card's "Round 2" section. Never quote an earlier round's test as evidence for a later round. The top line is chosen per round: "tested with one person" only if that round has its own cross-test file.
- **A test that does not count.** If the watcher's notes say the tester had no real case the scenario asked for, write at the top of the round: "This test does not count: the tester had no such case (`<notes file>:<line>`)." Ask the pair for another tester, or for `/persona-walkthrough <variant> page`, before the outcome.
- **No sign judged.** If every sign of the round is "cannot tell" or "unclear", say so in one line: "No sign could be judged in this round, so it cannot show whether the assumption holds." The pair still names one of the three outcomes; a person test is the usual next step.
- **Hold observations against the signs, not against hopes.** For each sign on the prototype card, ask whether the watcher saw it. The pair answers; you do not.
- **A seen rework sign is named.** If the pair says the assumption held while a sign that points to rework or drop was seen, quote that sign and ask once: "This sign was seen. Does it change your answer?" Write what they say. The same if the pair calls the result unclear and still moves on: quote the go-on line and ask once, "The go-on line asked for this. Did you see it?"
- **Decides nothing.** The pair names one of three outcomes and why: move on (with what changes before roll-out), another round (changed spec or the next idea from the intent), or kill. If they do not name one, the field stays `____ (human decides)`. Never suggest which one.
- **Every claim quotes its source with location** (file and line). A citation into `discovery/` carries a short quote, so `npm run check` catches a line that moved; never a section name alone. No invented numbers: one tester is a pattern, not a rate.
- **"Pressure-tested, not validated"** stands at the top only when no person tested the page, that is, when `<variant>-cross.md` does not exist. With a cross test, the top line says "Tested with one person from another pair: a pattern, not a rate."
- **Changes on other pages.** If a change the pair names for roll-out sits on another page than the inquiry page, say once that a variant replaces only `/inquiry`, so that change needs its own decision. Write it as said.
- **Invented lines.** If the outcome is move on, ask: "Which lines on the page are invented, and who confirms them before roll-out?" Quote the spec's "Invented lines on the page". Write the answer under "Therefore we will".

## Steps

0. **Try first.** Ask: "How did the test go, in a few words?" Wait.
1. Read the prototype card and the user-test files. If the prototype card is missing, stop and say so. If neither `<variant>-cross.md` nor `<variant>-page.md` exists, ask which test happened.
2. Ask: "What did the tester do or say? List it freely." Reflect it back as a short list. Ask: "Anything else, or shall we work with these?"
3. Quote the sign marks from `<variant>-cross.md` in one message and ask: "Do these marks stand?" Ask per sign only where a mark is missing. Without a cross test, quote the persona run's sign table instead.
4. Quote the assumption and the two lines. Ask: "Against these lines, did the assumption hold, break, or is it unclear? Why?" If unclear: "What would you need to see to be sure?"
5. Ask: "Finish the sentence: From that we learned that ..."
6. Ask: "Which outcome: move on, another round, or kill? And why?" If move on: "What changes before roll-out?" If another round: "Changed spec, or the next idea from the intent?" Name the two other ideas from the intent, quoted.
7. Ask who decided and the date.
8. Show the card. Ask what is wrong. Correct it, then write the file. Tell the human the next step: move on, `/test-card <variant> launch`; another round, rebuild, then `/persona-walkthrough <variant> page` and this skill again; kill, the next idea starts with `/test-card <next-variant> prototype`.

## Output template

```markdown
# Decision <nnn>: <variant>, learning card

> Decision record and learning card. <"Tested with one person from another pair: a pattern, not a rate." if `<variant>-cross.md` exists; otherwise "Pressure-tested, not validated: rests on persona runs, not on people.">
> Written by the `learning-card` skill from what the pair said. The material behind the prototype is <synthetic or composite, repeated from the card>.
> Rests on: `discovery/test-cards/<variant>-prototype.md`<, `discovery/user-tests/<variant>-cross.md`><, `discovery/user-tests/<variant>-<mode>.md`>

## Round 1, <YYYY-MM-DD>

### How it went (first try)
<gut feeling, word for word>

### We believed
"<assumption, quoted>" (`discovery/test-cards/<variant>-prototype.md:<line>`)

### We observed
- <cross test: "<what the tester did or said>" (`discovery/user-tests/<variant>-cross.md:<line>`)>
- <persona: "<quote>" (`discovery/user-tests/<file>:<line>`), resting on `product/personas/<file>:<line>`>

| Sign (from the card) | Points to | Seen? |
|---|---|---|
| <sign> | go on / rework or drop | seen / not seen / unclear |

Against the lines: <held / broke / unclear, and why, in the pair's words>

### We learned
From that we learned that <the pair's sentence>.

### Therefore we will
<the pair's next step>

## Options considered
- Move on: <what changes before roll-out, or "not chosen">
- Another round: <changed spec or the next idea, quoted from the intent>
- Kill: <...>

## What we decided
____ (human decides) <filled only with the pair's words>

## Why
<the pair's reason>

## Who
<names the pair gave>

## When
<date the pair gave>
```
