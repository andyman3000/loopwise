---
name: loopwise-learning-card
description: Guide the pair that built a variant through what its prototype test showed, one question at a time, and write a learning card (we believed, we observed, we learned, therefore we will) as decision 002. Use after the cross test or a persona walkthrough of the page, when the team says "write the learning card", "what did the test show", or "record what we learned". Quotes the prototype card and the persona files, writes only what the pair says, and decides nothing.
---

# Learning card

**When:** after the prototype test: the cross test with people, or `/loopwise-persona-walkthrough <variant> page`
if the cross test dropped. Also after a second round, to update the card.
**Input:** the variant name. If missing, ask.
**Reads:** `discovery/test-cards/<variant>-prototype.md` (the assumption, the signs, the two lines);
`discovery/user-tests/<variant>-cross.md` (the watcher's notes from the cross test), `<variant>-spec.md` and `<variant>-page.md` if they exist; `discovery/specs/<variant>.md` (section "Invented lines on the page");
`product/personas/buyer-without-budget.md`, `product/personas/buyer-with-budget.md`;
`discovery/intents/<opportunity>.md` (the other two ideas).
**Writes:** `discovery/decisions/<nnn>-<variant>.md`. If a file for this variant exists, add a dated
round below the last one, with all its sections, its own decision, Who and When included; never
rewrite an earlier round. Otherwise use the next free number in
`discovery/decisions/`: 002 for the first variant, 003 for the next idea.

A learning card (Osterwalder, Strategyzer) records what a test showed: we believed, we observed, we
learned, therefore we will. Here it is also the decision record for what happens to the variant.
The pair decides. This skill asks, quotes and writes; it decides nothing.

**Setting.** Read the `Setting:` line in `CLAUDE.md`. No line means `workshop`.
- `workshop`: one tester from another pair tried the page (the cross test). Notes are in
  `<variant>-cross.md`, as below.
- `team`: the team tested the page with people it recruited. Read "the pair" in this skill as
  "the team", and "the cross test" as "the test with people". The rules under "Setting `team`"
  replace the notes file, the sign marks and the label of a round.


## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the human writes in. Show first:
- **Where:** Block 6a, step 3: the learning card, what the test showed and what you decide.
- **You end with:** `discovery/decisions/<nnn>-<variant>.md`, at http://localhost:<port>/discovery/decisions/<nnn>-<variant>.md.
- **Time:** about 25 minutes.

Before the try first, say: about 2 minutes, a few words. A good answer says what the tester did, not what you hoped. Example from an unrelated product, a library app: "The tester found renew at once, then asked whether it costs anything."

End each step with "Done: <what>. Next: <what the human does now>." At the end, four lines: Made (the learning card), Look (its link), Next (by the decision: move on, `/clear`, then `/loopwise-test-card <variant> launch`; another round with a changed spec, `/clear`, then `/loopwise-variant-spec <variant>` and the rebuild with the build prompt at the end of the spec; the next idea or kill, fill a second "Selection (human)" in the intent for the next idea, then `/clear` and `/loopwise-test-card <next-variant> prototype`), Time (block 6a planned about 25 minutes for the card).

## Rules

- **One question at a time.** Wait for the answer before the next one. Keep each turn short: the step frame, what you quote, the question. No emojis.
- **Try first is the gut feeling.** The first question is always: "How did the test go, in a few words?" Never start with analysis. A vague reply ("go on", "ok") gets one more ask; if it stays vague, write "skipped". "skip" is written as "skipped".
- **Never ask for what the files hold.** Quote the assumption, the signs and the lines from the prototype card. Do not ask the pair to repeat them.
- **Write only what the pair says.** Observations, the learning and the decision are the pair's words, shortened at most. If an answer is vague, ask one follow-up. If it stays vague, write it as said and mark it "[vague: the pair did not say more]".
- **Observations from people and from personas stay apart.** A cross-test observation quotes the watcher's notes with file and line ([discovery/user-tests/<variant>-cross.md:<line>](../user-tests/<variant>-cross.md#L<line>)). If the cross test happened but the notes file is missing, ask the watcher to write it first, about 5 minutes, and wait. Give them this format for `discovery/user-tests/<variant>-cross.md`; a good note is one line per thing the watcher saw or heard, the tester's words in quotes, and one mark per sign from the card:
  ```markdown
  # Cross test: <variant>

  > Notes by the watcher, <first name>, <date>. One tester from another pair.

  ## What the tester did and said
  - <one line per thing you saw or heard, words in quotes, word for word>

  ## Signs from the card
  - <sign>: seen / not seen / unclear
  ```
  The watcher may also tell you the notes in the chat; then you write the file in their words and show it to them before you go on. A persona observation quotes the walkthrough file and the persona-file line it rests on ([product/personas/<file>:<line>](../../product/personas/<file>#L<line>)). A persona action with no persona-file line behind it is not an observation and is left out.
- **One round, one set of files.** Round 1 reads `<variant>-cross.md`, `<variant>-page.md` and the card's first section. Round 2 reads `<variant>-cross-2.md` and `<variant>-page-2.md` and the card's "Round 2" section. A persona walkthrough may have several runs in a round (`-run2`, `-run3`); read the latest run of the round. Never quote an earlier round's test as evidence for a later round.
- **A test that does not count.** If the watcher's notes say the tester had no real case the scenario asked for, write at the top of the round: "This test does not count: the tester had no such case (`<notes file>:<line>`)." Ask the pair for another tester, or for `/loopwise-persona-walkthrough <variant> page`, before the outcome. If the pair still chooses move on, advise against it once, plainly: "I advise against moving on. No counted test shows the assumption holds, so the launch card would rest on a guess." Then write their choice, and add under "Why": "Moved on without a counted test, against the skill's advice." Do not ask again.
- **No sign judged.** If every sign of the round is "cannot tell" or "unclear", say so in one line: "No sign could be judged in this round, so it cannot show whether the assumption holds." The pair still names one of the three outcomes; a person test is the usual next step.
- **Hold observations against the signs, not against hopes.** For each sign on the prototype card, ask whether the watcher saw it. The pair answers; you do not.
- **A seen rework sign is named.** If the pair says the assumption held while a sign that points to rework or drop was seen, quote that sign and ask once: "This sign was seen. Does it change your answer?" Write what they say. The same if the pair calls the result unclear and still moves on: quote the go-on line and ask once, "The go-on line asked for this. Did you see it?"
- **Feedback on the pair's own answers.** These answers get feedback: what the tester did or said (step 2), why the assumption held or broke (step 4), and the sentence "From that we learned that ..." (step 5). Tell the pair in two or three short lines how strong the answer was: what was good, what was weak, and why. Name their words. Be honest and specific, never flattering. Say it in the chat; the card holds only the pair's words. The gut feeling, a skipped answer and the choice of outcome get no feedback.
  - What the tester did or said: are these things a watcher saw or heard? Or guesses about what the tester felt?
  - Held or broke: does the reason rest on the signs and the two lines? Or on how the pair hoped the test would go?
  - We learned: is it something new about the buyer or the assumption? Or does it repeat an observation, or name a solution?
- **Decides nothing.** The pair names one of three outcomes and why: move on (with what changes before roll-out), another round (changed spec or the next idea from the intent), or kill. If they do not name one, the field stays `____ (human decides)`. Never suggest which one.
- **Every claim quotes its source with location** (file and line). Each citation is a Markdown link: `[<file>:<line>](<path from this file>#L<line>)` (`.claude/rules/writing.md`, "Citations are links"). A citation into `discovery/` carries a short quote, so `npm run check` catches a line that moved; never a section name alone. No invented numbers: one tester is a pattern, not a rate.
- **The label of a round.** Each round starts with one label line. If that round has its own cross-test file (`<variant>-cross.md` for round 1, `<variant>-cross-2.md` for round 2): "Tested with one person from another pair: a pattern, not a rate." Otherwise: "Pressure-tested, not validated: rests on persona runs, not on people."
- **Changes on other pages.** A change the pair names for roll-out may sit on any page. Name the page, and write the change as said.
- **Invented lines.** If the outcome is move on, ask it after "What changes before roll-out?", as its own question. Say: about 2 minutes; a good answer names, per invented line, the role that confirms it, for example someone who runs the training. Ask: "Who confirms each invented line before roll-out?" Quote the spec's "Invented lines on the page". Write the answer under "Therefore we will".

### Setting `team`

- **One notes file per tester.** Round 1: `discovery/user-tests/<variant>-tester-<n>.md`, numbered
  from 1. Round 2: `<variant>-2-tester-<n>.md`. If a tester's notes are missing, ask the team to
  write them first, in this format, and wait:
  ```markdown
  # Test with people: <variant>, tester <n>

  > Notes by the watcher, <name>, <date>. Tester: <role, and how they meet the card's criteria>. No real names.

  ## What the tester did and said
  - <one line per thing the watcher saw or heard, words in quotes, word for word>

  ## Signs from the card
  - <sign>: seen / not seen / unclear
  ```
- **Planned against done.** Read the planned number from "How many" in the card's "Testers"
  section. Count the notes files of the round. A tester whose notes say they had no real case does
  not count; name them in one line.
- **Signs per tester, then counted.** Quote the marks from all notes files in one table, one column
  per tester. Ask: "Do these marks stand?" Then count per sign, for example "seen by 3 of 4". If a
  line on the card counts testers, hold the count against it.
- **The label of a round** in setting `team`: "Tested with <done> of <planned> people: a pattern,
  not a rate." If no tester counts, use the persona label below.
- **Step 2 asks across testers:** "What did the testers do or say? List it freely, per tester."

## Steps

0. **Try first.** Ask: "How did the test go, in a few words?" Wait.
1. Read the prototype card and the user-test files. If the prototype card is missing, stop and say so. If neither `<variant>-cross.md` nor `<variant>-page.md` exists, ask which test happened. In setting `team`, read `<variant>-tester-<n>.md` in place of `<variant>-cross.md`.
2. Say: about 5 minutes; a good answer lists what the watcher saw or heard, one line each, not what the tester felt. Ask: "What did the tester do or say? List it freely." Reflect it back as a short list. Give the feedback on it (see Rules). Then ask: "Anything else, or shall we work with these?"
3. Quote the sign marks from `<variant>-cross.md` in one message. Say: about 2 minutes; a good answer is "they stand", or the sign you change, with what the watcher saw. Ask: "Do these marks stand?" Ask per sign only where a mark is missing. Without a cross test, quote the persona run's sign table instead.
4. Quote the assumption and the two lines. Say: about 3 minutes; a good answer is hold, break or unclear, with the sign or line it rests on. Ask: "Against these lines, did the assumption hold, break, or is it unclear, and why?" Give the feedback on the reason (see Rules). If unclear, then ask as its own question, one minute, a good answer names one thing a watcher could see: "What would you need to see to be sure?"
5. Say: about 3 minutes; a good answer is one sentence about the buyer or the assumption, not about the page. Ask: "Finish the sentence: From that we learned that ..." Give the feedback on the sentence (see Rules).
6. Say: about 3 minutes; a good answer is one of the three, with the reason from step 4 or 5. Ask: "Which outcome: move on, another round, or kill, and why?" Wait. Then one follow-up, as its own question, about 2 minutes. If move on: "What changes before roll-out?"; a good answer names the page and the change; then the invented lines (see Rules). If another round: name the two other ideas from the intent, quoted, then ask "Changed spec, or the next idea from the intent?"
7. Ask who decided and the date.
8. Show the card. Say in one line what it is: the record of what the test showed and what you decided, in your words. Check, about 3 minutes: does each observation quote the watcher's notes or a persona line? Does "We learned" say something new about the buyer? Does the decision say what happens next? A good answer is a correction, or "fits". Ask: "What is wrong or missing?" Correct it, then write the file. Then stop.

## Output template

```markdown
# Decision <nnn>: <variant>, learning card

> Decision record and learning card. Each round below starts with its own label line.
> Written by the `loopwise-learning-card` skill from what the pair said. The material behind the prototype is <synthetic or composite, repeated from the card>.
> Rests on: `discovery/test-cards/<variant>-prototype.md`<, `discovery/user-tests/<variant>-cross.md`><, `discovery/user-tests/<variant>-<mode>.md`>

## Round 1, <YYYY-MM-DD>

> <label line for this round, see "The label of a round">
> Rests on: <the files of this round only>

### How it went (first try)
<gut feeling, word for word>

### We believed
"<assumption, quoted>" ([discovery/test-cards/<variant>-prototype.md:<line>](../test-cards/<variant>-prototype.md#L<line>))

### We observed
- <cross test: "<what the tester did or said>" ([discovery/user-tests/<variant>-cross.md:<line>](../user-tests/<variant>-cross.md#L<line>))>
- <persona: "<quote>" ([discovery/user-tests/<file>:<line>](../user-tests/<file>#L<line>)), resting on [product/personas/<file>:<line>](../../product/personas/<file>#L<line>)>

| Sign (from the card) | Points to | Seen? |
|---|---|---|
| <sign> | go on / rework or drop | seen / not seen / unclear |

<setting `team`: one column per tester instead of "Seen?", then "Seen by" with the count, for example "3 of 4">
<setting `team`: "Planned: <n> testers. Tested: <done>. Not counted: <tester, reason, or none>.">
<setting `team`: observations quote `discovery/user-tests/<variant>-tester-<n>.md` with line>

Against the lines: <held / broke / unclear, and why, in the pair's words>

### We learned
From that we learned that <the pair's sentence>.

### Therefore we will
<the pair's next step>

### Options considered
- Move on: <what changes before roll-out, or "not chosen">
- Another round: <changed spec or the next idea, quoted from the intent>
- Kill: <...>

### What we decided
____ (human decides) <filled only with the pair's words>

### Why
<the pair's reason>

### Who
<names the pair gave>

### When
<date the pair gave>

## Round 2, <YYYY-MM-DD>
<the same sections as round 1, from the label line to "When", for this round only>
```
