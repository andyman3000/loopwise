---
name: loopwise-read-result
description: Read the result of the shipped variant against its test card, together with the human. Use after the measurement window closes, or when someone asks "did our assumption hold?", "read the result", "how did the shipped variant do?". Takes the numbers the dashboard shows (npm run summary), asks the human for their reading first, sets its own reading beside it, settles the differences with the human, and writes the Result section of the test card with the conclusion in the human's words. Does not count on its own and never decides.
---

# loopwise-read-result
> **When:** the time frame on the test card of the shipped variant has passed, or a mid-way check is asked for.
> **Reads:** `site/config.json` (key `shipped`, gives `<variant>`); `discovery/test-cards/<variant>.md`;
> the output of `npm run summary` (the same numbers as `http://localhost:<port>/dashboard`, from the
> same code); `data/scenario.json` only to state whether the data is synthetic.
> **Writes:** the `## Result` section of `discovery/test-cards/<variant>.md`. One path. Replace only that
> section (append it if missing); leave every other line of the test card untouched.

The numbers are already counted, by code, on the dashboard. This skill does not count them again. It
helps the human read them against the test card: the human reads first, then the skill reads, then
both settle where they differ and draw the conclusion. The conclusion and the decision are the human's.


## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the human writes in. Show first:
- **Where:** Block 7, the demo: read a launched variant's result against its card.
- **You end with:** the `## Result` section of `discovery/test-cards/<variant>.md`, with your reading and your decision, at http://localhost:<port>/discovery/test-cards/<variant>.md.
- **Time:** about 30 minutes.

Before the human reads, say: about 10 minutes for the table. A good reading says met, not met or unclear per row, held against the threshold and the usual swing on the card.

End each step with "Done: <what>. Next: <what the human does now>." At the end, four lines: Made (the Result section), Look (http://localhost:<port>/discovery/test-cards/<variant>.md), Next (the trainer runs `/loopwise-next-bet`), Time (the demo planned about 30 minutes for this).

## Rules

- **The human reads first.** Before you say what any number means, ask for their reading (step 1).
  Wait for the answer and never invent it. A vague reply ("go on", "ok", "looks fine") gets one more
  ask; if it stays vague, write "skipped". Do not shorten this step: it is how participants learn to
  read a result.
- **One source for numbers:** `npm run summary`. Quote its lines word for word. Never recount from
  `data/events.jsonl` or `data/inquiries.csv` in your own way. If a line of the test card has no
  number in the summary, say "not on the dashboard" and give a `node -e` command over `data/` that
  counts it, as written on the card.
- **Read only the lines that have a threshold, at most seven rows, better five.** A row is a line
  the card sets a threshold for, so it can be met or not: each part of the success line, the usage
  hypothesis as one row, and the kill criterion with its counter metric as one row. Lines without a
  threshold (a proxy metric, a number the card only reports) get no row. Name them in one line under
  the table as "also on the dashboard, no line to meet". More than seven rows: merge the parts of
  one line into one row. Read each row against what the card says, including the usual swing.
- **Check the step first.** Before the table, compare the card's success line with the intent's "Desired outcome" (the card links the intent). If they name different steps, say so in one line above the table, quoting both with their lines: the result then answers a question the intent did not ask. Read the card as written all the same; changing a line after data arrived is a new card version.
- **Three readings per line, in words:** met, not met, unclear. Unclear when the card itself says the
  line shows a direction only, or when the difference is a few cases.
- **Say what the numbers cannot show:** small numbers per week, bookings that cannot be tied to the
  website change, anything the card lists under "What we cannot see".
- **`data/scenario.json` is off limits for outcomes.** Read it only to see whether the data is
  synthetic. Never read or quote expected results, rates or story beats from it.
- **Feedback on the human's reading.** After step 2, tell the human in two or three short lines how strong their reading was: what was good, what was weak, and why. Judge it against how a result is read. Did they hold each row against its threshold and the usual swing on the card? Or against what they hoped? Did they call a few cases a result? Did they say what the numbers cannot show? Name their words. Be honest and specific, never flattering. A skipped reading gets no feedback. Never judge their keep, change or take back. Write the same lines under "Feedback on your reading" in the Result section.
- **The decision is the human's.** Write the conclusion and the decision in the human's words, with
  the name and date they give. If they name none, the decision field stays `____ (human decides)`.
  Never suggest which of keep, change or take back to choose.
- **Plain words.** Short sentences, no coined labels, as in `.claude/rules/writing.md`.

## Steps

1. **The numbers, then the human's reading.** Read `site/config.json` and the test card. Run
   `npm run summary` for your own reading, but do not show its output in the chat. Point the human
   to `http://localhost:<port>/dashboard` (the port and the site as `.claude/rules/guiding.md` says), where the same numbers are, and to the
   shipped page, so they can see what the numbers are about: the start address the spec names
   (`discovery/specs/<variant>.md`, "Tester starts at"), as a full link on `http://localhost:<port>`.
   Then show what the card assumed, one row per line with a threshold, in plain words with its threshold and
   its comparison. No line numbers, no section names alone, no numbers from after launch:

   | What we assumed | Where on the dashboard | Your reading |
   |---|---|---|
   | <the card line as a sentence, for example "More visits that see the formats page open the inquiry page in quiz weeks than in any four weeks before launch (highest 16.9%) and than in off weeks"> | <the dashboard section that shows it> | met, not met or unclear? Why? |

   Take the rows as the rule "Read only the lines that have a threshold" says. Then ask, in these words: "Fill in the
   last column from the dashboard: met, not met or unclear, and why in a few words." Wait. Keep,
   change or take back comes in step 4.
2. **Our reading beside theirs.** Read each row against the summary yourself: met, not met or
   unclear, with the summary line it rests on. Show a table with both readings side by side. Below it,
   list only the lines where the two readings differ, one sentence each on why yours differs. Then give the feedback on their reading (see Rules).
3. **Settle the differences together.** Say: about 5 minutes; a good answer names, per line where
   we differ, whose reading holds and the summary line it rests on. Ask: "Where we differ, which
   reading holds, and why?" Take
   their answer for each line. If they keep their reading, write theirs as the agreed one and note
   yours in one line.
4. **The conclusion.** Say: about 5 minutes; a good answer is keep, change or take back, with the
   rows it rests on. Ask: "So: keep, change or take back, and why?" Wait. Then, as its own question,
   about one minute, a good answer is a first name and a date: "Who decides, and on what date?"
   Write both in their words.
5. **Write the Result section** with the template below. Then stop.

## Output template (the `## Result` section)

```markdown
## Result

> [Synthetic data: generated by scripts/generate-events.js, see data/scenario.json] (first line, only if synthetic)
> Read together with the loopwise-read-result agent, <YYYY-MM-DD>. The numbers come from `npm run summary`, the same as the dashboard.

### The numbers
<the output of npm run summary, unchanged, in a code block>

### Your reading (before ours)
<the human's answer to step 1, word for word>

Feedback on your reading: <two or three short lines: what was strong, what was weak, and why>

### Line by line
| What we assumed (from the card) | Your reading | Our reading | Agreed reading | Rests on (summary line) |
|---|---|---|---|---|

### What the numbers cannot show
<small numbers, bookings, the card's "What we cannot see", in plain sentences>

### Conclusion
<the conclusion in the human's words: keep, change or take back, and why>

**Decision:** <the human's words, or ____ (human decides)> · **Who:** <name the human gives> · **Date:** <date>
```
