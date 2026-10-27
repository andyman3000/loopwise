---
name: read-result
description: Read the result of the shipped variant against its test card, together with the human. Use after the measurement window closes, or when someone asks "did our assumption hold?", "read the result", "how did the shipped variant do?". Takes the numbers the dashboard shows (npm run summary), asks the human for their reading first, sets its own reading beside it, settles the differences with the human, and writes the Result section of the test card with the conclusion in the human's words. Does not count on its own and never decides.
---

# read-result

> **When:** the time frame on the test card of the shipped variant has passed, or a mid-way check is asked for.
> **Reads:** `site/config.json` (key `shipped`, gives `<variant>`); `discovery/test-cards/<variant>.md`;
> the output of `npm run summary` (the same numbers as `http://localhost:3000/dashboard`, from the
> same code); `data/scenario.json` only to state whether the data is synthetic.
> **Writes:** the `## Result` section of `discovery/test-cards/<variant>.md`. One path. Replace only that
> section (append it if missing); leave every other line of the test card untouched.

The numbers are already counted, by code, on the dashboard. This skill does not count them again. It
helps the human read them against the test card: the human reads first, then the skill reads, then
both settle where they differ and draw the conclusion. The conclusion and the decision are the human's.

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
- **Three readings per line, in words:** met, not met, unclear. Unclear when the card itself says the
  line shows a direction only, or when the difference is a few cases.
- **Say what the numbers cannot show:** small numbers per week, bookings that cannot be tied to the
  website change, anything the card lists under "What we cannot see".
- **`data/scenario.json` is off limits for outcomes.** Read it only to see whether the data is
  synthetic. Never read or quote expected results, rates or story beats from it.
- **The decision is the human's.** Write the conclusion and the decision in the human's words, with
  the name and date they give. If they name none, the decision field stays `____ (human decides)`.
  Never suggest which of keep, change or take back to choose.
- **Plain words.** Short sentences, no coined labels, as in `.claude/rules/writing.md`.

## Steps

1. **The numbers, then the human's reading.** Read `site/config.json` and the test card. Run
   `npm run summary` for your own reading, but do not show its output in the chat. Point the human
   to `http://localhost:3000/dashboard` (it needs `npm start`), where the same numbers are, and to the
   shipped page, so they can see what the numbers are about: the start address the spec names
   (`discovery/specs/<variant>.md`, "Tester starts at"), as a full link on `http://localhost:3000`.
   Then show what the card assumed, one row per line with a threshold, in plain words with its threshold and
   its comparison. No line numbers, no section names alone, no numbers from after launch:

   | What we assumed | Where on the dashboard | Your reading |
   |---|---|---|
   | <the card line as a sentence, for example "More visits that see the formats page open the inquiry page in quiz weeks than in any four weeks before launch (highest 16.9%) and than in off weeks"> | <the dashboard section that shows it> | met, not met or unclear? Why? |

   Take the rows as the rule "Read only the lines that have a threshold" says. Then ask, in these words: "Fill in the
   last column from the dashboard: met, not met or unclear, and why in a few words. Then: would you
   keep the variant, change it, or take it back?" Wait.
2. **Our reading beside theirs.** Read each row against the summary yourself: met, not met or
   unclear, with the summary line it rests on. Show a table with both readings side by side. Below it,
   list only the lines where the two readings differ, one sentence each on why yours differs.
3. **Settle the differences together.** Ask: "Where we differ, which reading holds, and why?" Take
   their answer for each line. If they keep their reading, write theirs as the agreed one and note
   yours in one line.
4. **The conclusion.** Ask: "So: keep, change or take back, and why? Who decides, and on what date?"
   Write it in their words.
5. **Write the Result section** with the template below. Then tell the human in one line that the next
   step is `/next-bet`.

## Output template (the `## Result` section)

```markdown
## Result

> [Synthetic data: generated by scripts/generate-events.js, see data/scenario.json] (first line, only if synthetic)
> Read together with the read-result agent, <YYYY-MM-DD>. The numbers come from `npm run summary`, the same as the dashboard.

### The numbers
<the output of npm run summary, unchanged, in a code block>

### Your reading (before ours)
<the human's answer to step 1, word for word>

### Line by line
| What we assumed (from the card) | Your reading | Our reading | Agreed reading | Rests on (summary line) |
|---|---|---|---|---|

### What the numbers cannot show
<small numbers, bookings, the card's "What we cannot see", in plain sentences>

### Conclusion
<the conclusion in the human's words: keep, change or take back, and why>

**Decision:** <the human's words, or ____ (human decides)> · **Who:** <name the human gives> · **Date:** <date>
```
