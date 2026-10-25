---
name: learning-card
description: Guide the pair that built a variant through what its prototype test showed, one question at a time, and write a learning card (we believed, we observed, we learned, therefore we will) as decision 002. Use after the cross test or a persona walkthrough of the page, when the team says "write the learning card", "what did the test show", or "record what we learned". Quotes the prototype card and the persona files, writes only what the pair says, and decides nothing.
---

# Learning card

**When:** after the prototype test: the cross test with people, or `/persona-walkthrough <variant> page`
if the cross test dropped. Also after a second round, to update the card.
**Input:** the variant name. If missing, ask.
**Reads:** `discovery/test-cards/<variant>-prototype.md` (the assumption, the signs, the two lines);
`discovery/user-tests/<variant>-spec.md` and `<variant>-page.md` if they exist;
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
- **Try first is the gut feeling.** The first question is always: "How did the test go, in a few words?" Never start with analysis.
- **Never ask for what the files hold.** Quote the assumption, the signs and the lines from the prototype card. Do not ask the pair to repeat them.
- **Write only what the pair says.** Observations, the learning and the decision are the pair's words, shortened at most. If an answer is vague, ask one follow-up. If it stays vague, write it as said and mark it "[vague: the pair did not say more]".
- **Observations from people and from personas stay apart.** A cross-test observation is what the watcher saw or heard. A persona observation quotes the walkthrough file and the persona-file line it rests on (`product/personas/<file>:<line>`). If the card rests on persona runs only, the top line says so.
- **Hold observations against the signs, not against hopes.** For each sign on the prototype card, ask whether the watcher saw it. The pair answers; you do not.
- **Decides nothing.** The pair names one of three outcomes and why: move on (with what changes before roll-out), another round (changed spec or the next idea from the intent), or kill. If they do not name one, the field stays `____ (human decides)`. Never suggest which one.
- **Every claim quotes its source with location** (file and line). No invented numbers: one tester is a pattern, not a rate.
- **"Pressure-tested, not validated"** stands at the top when any observation comes from a persona.

## Steps

0. **Try first.** Ask: "How did the test go, in a few words?" Wait.
1. Read the prototype card and the user-test files. If the prototype card is missing, stop and say so.
2. Ask: "What did the tester do or say? List it freely." Reflect it back as a short list. Ask: "Anything else, or shall we work with these?"
3. Go through the signs on the prototype card, one message for all of them: quote each sign, ask which ones the watcher saw. Record the answer per sign: seen, not seen, unclear.
4. Quote the assumption and the two lines. Ask: "Against these lines, did the assumption hold, break, or is it unclear? Why?" If unclear: "What would you need to see to be sure?"
5. Ask: "Finish the sentence: From that we learned that ..."
6. Ask: "Which outcome: move on, another round, or kill? And why?" If move on: "What changes before roll-out?" If another round: "Changed spec, or the next idea from the intent?" Name the two other ideas from the intent, quoted.
7. Ask who decided and the date.
8. Show the card. Ask what is wrong. Correct it, then write the file. Tell the human the next step: move on, `/test-card <variant> launch`; another round, rebuild, then `/persona-walkthrough <variant> page` and this skill again; kill, the next idea starts with `/test-card <next-variant> prototype`.

## Output template

```markdown
# Decision <nnn>: <variant>, learning card

> Decision record and learning card. <"Pressure-tested, not validated: rests on persona runs, not on people." if any observation comes from a persona>
> Written by the `learning-card` skill from what the pair said. The material behind the prototype is <synthetic or composite, repeated from the card>.
> Rests on: `discovery/test-cards/<variant>-prototype.md`<, `discovery/user-tests/<variant>-<mode>.md`>

## Round 1, <YYYY-MM-DD>

### How it went (first try)
<gut feeling, word for word>

### We believed
"<assumption, quoted>" (`discovery/test-cards/<variant>-prototype.md:<line>`)

### We observed
- <cross test, seen by the watcher: what the tester did or said>
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
