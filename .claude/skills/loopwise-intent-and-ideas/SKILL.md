---
name: loopwise-intent-and-ideas
description: Guide the pair from the chosen opportunity to an intent (problem, desired outcome, for whom, open questions) and 3 to 5 solution ideas on the opportunity tree, one question per message. The skill drafts the intent and the pair corrects it, then the pair lists its own ideas, the skill adds ideas from other angles, the pair picks 3 to 5 and the skill shows the driver and the critical assumption of each, then the pair names the idea it tests first. The file is rewritten after every step, so the ideas show on /discovery/tree from the first step on. Use after the opportunity decision is recorded, when the team says "write the intent", "let's develop ideas", or "what could we build for this opportunity". Writes the intent. Never picks an idea.
---

# Intent and ideas

**When:** after the human has chosen an opportunity in `discovery/opportunity-comparison.md` and the
decision is recorded in `discovery/decisions/`. Before `/loopwise-test-card <variant> prototype`.
**Input:** the chosen opportunity, named by the human. If no name is given, ask. Do not take it from
"Appears favoured" in the comparison.
**Reads:** `discovery/opportunity-comparison.md`; the decision record in `discovery/decisions/`; the
matching files in `discovery/opportunities/`; `discovery/kpi-tree.md`; `product/constraints.md`;
the pages in `site/` (what they do today).
**Writes:** `discovery/intents/<opportunity-slug>.md`, after every step.

First many ideas, without judging them. Then a few, each with the driver it moves and the one thing
that must be true for it to work. The pair has the ideas; the skill pushes past the obvious. AI ideas
tend to be obvious or average, so the pair always goes first.

**A critical assumption** is the one thing that must be true for an idea to work. If it is false, the
idea fails, however well it is built.

**Setting.** Read the `Setting:` line in `CLAUDE.md`. No line means `workshop`. In `team`, read
"the pair" in this skill as "the team", and write "the team" in the From column for the human's
ideas. Do not show the time hints ("about 15 min") to the team.

## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the pair writes in. Show first, before the briefing:
- **Where:** Block 4, steps 1 to 4 of 7: the intent, then your ideas, then the idea you test first.
- **You end with:** `discovery/intents/<opportunity-slug>.md`: 3 to 5 ideas, one marked "tested first", drawn at http://localhost:<port>/discovery/tree.
- **Time:** about 35 of the block's 50 minutes: step 1 15, step 2 5, step 3 10, step 4 5. The 5 minutes on the tree page came before; the prototype test card follows right after this skill, about 25 minutes.

Start each step with one line, for example "Step 2 of 7: more ideas." The line names no minutes: the time comes once, with the action the pair takes, so the pair never sees two times for one step. End each step with "Done: <what>. Next: <what the pair does now>."

## Rules

- **The intent is short and reads on its own.** People read it as a communication tool. Agents read it as context for the prototype and later the implementation. Someone with only this file open must be able to say what should change, for whom, and how it would show on the site. Less detail is better, as long as that meaning stays.
  - "Problem" and "Desired outcome" get at most three sentences each. "For whom and where" gets two lines, each open question one line.
  - Explain a term once, inside the sentence where it first appears, for example "a scoping call, the first call where the format is settled". No separate block of definitions.
  - No event names and no tree vocabulary beyond the step's name in brackets: the KPI tree holds the events. Say what the site counts in plain words, for example "visits that start the form".
  - A number says what it counts and over how long, for example "55 of 740 inquiry page visits, in 26 weeks". The header says once that the data is synthetic.
  - Quotes appear in full, at most one per section. Name who said it, for example "one buyer writes".
  - Leave out what a later skill decides: targets, who answers a question, what it blocks.
- **One question per message.** Each step ends with one question to the pair; step 1 asks up to three (the part, the intent check, the ideas), one at a time, plus the one follow-up on a feature below. Wait for the answer. A vague reply ("go on", "ok", "you choose") gets one more ask; if it stays vague, carry on and note "the pair added none".
- **Write the file after every step**, then tell the pair to reload `http://localhost:<port>/discovery/tree`, with the port the site runs on. The tree draws every row of "Solution ideas" under the opportunity.
- **No judging in steps 1 and 2.** No levels, no "this would not work", no constraint checks. Every idea goes in the table. The feedback on the pair's list judges how the ideas are named and how varied they are, never whether one would work. An idea may change any page of the website. If it changes another page than the inquiry page, name the page after the idea, for example "(formats page)".
- **Ideas are named by mechanism:** what the buyer sees or does on the page ("one question before the form", "calendar link after three case stories"), not by strategy ("reduce friction"). If the pair names a feature without a page change ("a trust badge"), ask once, about one minute, a good answer names what is on the page: "What would the buyer see on the page?"
- **Driver from step 1 on.** Each idea gets the driver it moves, named as in `discovery/kpi-tree.md`, with its line. This is a lookup, not a judgement. Its line is a numbered reference, as every citation in this file (next rule). An idea that moves more than one driver lists each, separated by " · ", for example "start rate [3] · submit rate [4]". The tree lights up every driver listed. If no driver fits, write "no driver".
- **Boundaries apply from step 3 on.** They come from `product/constraints.md`: no prices (`product/constraints.md:7`); the website reaches the inquiry and the scoping call booking, not the training itself (`product/constraints.md:57`, `product/constraints.md:59`). An idea may change the form, replace it, or replace it with booking a call. Which fields a page sends is not settled here.
- **Every claim quotes its source with location** (file and line), as a numbered reference. The intent is read as a document, so its text carries no links (`.claude/rules/writing.md`, "Citations are links", the intent exception). Write `[1]` after the claim or the quote, `"quote" [1]`, or `[1, 3]` for two sources; a table cell carries the number too. The section "## Sources" at the end of the file lists each number once, as a link from this file: `1. [sources/inquiry-mails/inquiry-07.md:16](../../sources/inquiry-mails/inquiry-07.md#L16)`; a file without a line links to the file. Number in the order a source first appears; the same file and line keeps its number. Renumber when you rewrite the file after a step. `npm run check` reads each number as its source and checks a quote before it. Evidence levels in words: well supported, partly supported, unsupported. Only counted numbers.
- **Feedback on the pair's own answers.** These answers get feedback: the corrections to the intent, the pair's own ideas, and why they test one idea first. Tell the pair in two or three short lines how strong the answer was: what was good, what was weak, and why. Name their words. Feedback asks no question: the step's question stays the last line. Be honest and specific, never flattering. Say it in the chat; it does not go into the file. A plain "yes" to the draft, a skipped answer, and the choice of a part or an idea get no feedback.
  - Intent corrections: is the problem still a need, or did a correction turn it into a solution? Does the desired outcome still name a step and an event that can be counted? Is it the step where the need is met, or only the first step a page changes? Does the file still read on its own?
  - Own ideas: judge the list as a whole, never one idea's chance to work. Are the ideas named by what the buyer sees or does on the page, or by strategy? Do they use different mechanisms, or all the same one?
  - Why this idea first: does the reason name the assumption that would hurt most if wrong, or one with no source? Or does it name how much the pair likes the idea? Judge the reason, never the idea they chose.
- **The pair picks.** The skill never suggests which ideas to keep or which to test first. Selection fields stay `____ (human decides)` until the pair fills them.
- **Date** is today's date, not the date of the data.

## Steps

1. **The intent, then your ideas** (about 15 min). Read the decision record; if it is missing or names a different opportunity, say so and stop. **Brief the pair before you ask anything.** The pair may not have read blocks 1 to 3. Give a short briefing of the chosen opportunity: its name, then the problem in three short sentences (who has it, where on the way to a booking it shows, what it costs, each from the decision record or the comparison), then two customer quotes, word for word, each cited with the file and line in `discovery/` where it stands (not the source line behind it) as a link (from the opportunity files or the comparison; two different speakers if the files have them). End the briefing with: "This is the problem your ideas solve." Name no block: a pair that starts here has never heard of blocks 1 to 3. Only then go on. The site runs since `/loopwise-onboarding`, on the port in `discovery/.local.json`; if it does not answer, offer to start it, as `.claude/rules/guiding.md` says.
   **First check whether the opportunity holds two needs.** It does if its name joins two needs with "or", or if the comparison puts it on drivers far apart in the funnel. Count only drivers the comparison backs with a source; a driver marked "(assumed)" does not count. If so, show each part in one line with one quote and its file and line. Ask: "Which part do you work on?" Wait for the answer. Do not suggest a part. Write the answer in the pair's words into "Part we work on" under "Selection (human)". A pair that wants both writes "both". If the opportunity holds one need, write "the whole opportunity" there.
   **Then draft the intent.** Say first, in these words: "I draft the intent from the chosen problem. You correct it next." Draft it for the part the pair named, from the decision record, the comparison and `discovery/kpi-tree.md`: the title, "Problem", "Desired outcome", "For whom and where" and "Open questions". Mark the five "(draft)". The title says what should change, for whom ("Buyers can say before the call what should be different afterwards"), never the opportunity's name. The desired outcome says in plain words who does what more often, then what the site counts to show it, then today's counted value with its period. It names the step in plain words, with its name in the KPI tree in brackets and its line, for example "reach a scoping call (visit-to-call in the KPI tree) [6]". It sets no target.
   **Pick the step where the need is met**, not the first step a page changes. Find yourself where on the way to a booking the buyer's problem is solved (this is not a question to the pair), and quote the line that says so (the glossary, the decision record or the comparison). The step is a driver in `discovery/kpi-tree.md`, or a line the tree derives from several drivers; cite the tree line either way. If the need can be met by more than one path (a call booked without the form), the step must count every path. Then the launch card can measure the same step. A driver before that step may stay as an early signal, marked so. Before writing the file, read it as someone who has only this file open. Open questions come from "Gaps and uncertainty" and "Could not check" in the comparison: the two or three that matter for the prototype, one line each. Write the file. Show the title, the problem and the desired outcome in chat, and link the file at http://localhost:<port>/discovery/intents/<opportunity-slug>.md. Say in one line what an intent is (`.claude/rules/guiding.md`, "Terms"), then what to check, about 3 minutes:
   - Is the problem a need of the buyer, not a solution?
   - Does the desired outcome name the step where the buyer's need is met, with today's number?
   - Would someone who reads only this page understand it?
   A good answer is a correction in your words, or "fits". Ask: "Is this the change you want? Correct anything." Put the pair's corrections in and remove "(draft)" from what they confirmed. If they corrected something, give the feedback on their correction (see Rules).
   Then the ideas. First say what to look at, about 2 minutes: http://localhost:<port>/inquiry.html (the inquiry page) and http://localhost:<port>/formats.html (the formats page). Then: 5 minutes, at least 5 ideas, one line each, wild ones count. A good idea says what the buyer sees or does on a page. One example from an unrelated product, a library app whose borrowers return books late: "a reminder two days before the due date", "return at any supermarket", "renew with one tap in the reminder". Then ask: "List as many ways as you can to change the website for this, on the inquiry page or any page before it, one line each. Wild ones too." Write the file: each idea a row, From "the pair", with its driver. Point to the tree. Give the feedback on the list of ideas (see Rules), in the same message. Ask nothing more: go straight on with step 2 in the same message, so its question ("Anything to add?") is the last line.
2. **More ideas from other angles** (about 5 min). Add five or six ideas in one message, each from a different angle, and say the angle in the From column:
   - "today's page, changed": take `site/inquiry.html` or `site/formats.html` and swap, cut, reorder or combine one element.
   - "another domain": carry a concrete pattern from a car configurator, a doctor's intake form, a travel agent or a dating app.
   - "turned around": ask how the buyer could be made even less sure, then flip it.
   Check that your ideas do not share one mechanism (all text on the page, all a new field). Add them to the table, show the full table numbered. Ask: "Anything to add?" Write the file. Point to the tree.
3. **Pick 3 to 5** (about 10 min). State the boundaries in one short list: what no idea may do. Say: about 3 minutes to pick; name 3 to 5 numbers from the table. A good pick holds different ways to help the buyer, not three versions of one idea. Ask the pair to pick 3 to 5 ideas. For each pick, fill the critical assumption and its level with the source. An idea that breaks a boundary is marked in the Idea cell, with why in one line. If two picks rest on the same assumption, say so once, and ask it as its own question at the end of the step. Ask: "Keep both, or drop one?" The pair decides. Keep only the picks in "Solution ideas", keep their I-numbers; the rest go to "Ideas not picked". Write the file. Point to the tree.
4. **The idea you test first** (about 5 min). Say what a critical assumption is (`.claude/rules/guiding.md`, "Terms"). Ask, one at a time: which idea do you test first, and why that one? Not "the one we like most": the one whose assumption would hurt most if wrong, or has no source. A good answer is the I-number and one sentence on that assumption. Give the feedback on their reason (see Rules). Then ask for a variant name, lowercase with dashes, in English, about one minute: a good name says the idea in two or three words, for example `one-tap-renew` for a library app. Say in one line what it is for: a variant is their version of a page; the name becomes the folder `site/variants/<name>/`, the link `?variant=<name>`, and the word after the next commands, for example `/loopwise-test-card <name> prototype`. Write the names from `discovery/.local.json` and today's date into the "Who" line; ask nothing (`.claude/rules/guiding.md`, "Language and port"). Write "Idea it comes from" as `I<n>: <idea>`, with the I-number from "Solution ideas", even if the pair named the idea in words; the tree finds the idea only by its I-number. Copy that idea's critical assumption into "Assumption we test first"; the pair may reword it. Write the file. Then check the mark yourself: `curl -s http://localhost:<port>/discovery/tree | grep -oE 'class="sol[a-z ]* picked"'` must print one line per filled "Selection (human)" (the class also names the idea's level, for example `sol partly picked`). If it prints fewer, fix the I-number line and check again. Do this check quietly; tell the pair only that the tree marks the idea. Tell the pair: the tree marks the idea with a green border and "tested first". End with four lines: "Made: the intent, with your ideas and the one you test first." "Look: http://localhost:<port>/discovery/tree." "Next: type `/clear`, then `/loopwise-test-card <variant> prototype`. A prototype test card says, before anything is built, what a tester does on your page and what you watch for." "Time: about 40 of the block's 50 minutes are planned up to here. Start the card now if the room is still working; if the trainer calls the room together for the Abgleich, start it right after. It takes about 25 minutes." Then stop.

## Output template

```markdown
# Intent: <what should change, for whom, in words> (draft)

> Draft by an agent (`loopwise-intent-and-ideas`), not a decision. YYYY-MM-DD. <Synthetic data, or what the material is>.
> Opportunity: <C-id>, in [the comparison](../opportunity-comparison.md) · [Decision <nnn>](../decisions/<file>.md)

## Problem (draft)
<who has the problem and where it shows, in at most three sentences, with the strongest quote in full and who said it: "quote" [1]>

## Desired outcome (draft)
<who does what more often, in plain words, with the step's name in the KPI tree in brackets [n]>
Today <counted value, what it counts, over how long> [n].
<only if there is one: Early signal: <the earlier step in plain words>, today <value> [n].>

## For whom and where (draft)
Who: <buyer types in words [n]>. Pages: <the pages in words, such as inquiry, formats>.

## Open questions (draft)
- <question, one line> [n]

## Solution ideas

A driver is one step from a visit to a booking that the site counts. A critical assumption is the one thing that must be true for an idea to work.

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I1: <idea, by mechanism> | the pair | <driver> [n] | <empty until step 3> | <empty until step 3, then level and source number [n]> |

## Boundaries
- <constraint> [n]

## Ideas not picked
- I<n>: <idea> · <from>

## Selection (human)

- Part we work on: ____ (human decides)
- Idea it comes from: ____ (human decides; written as I<n>: <idea>)
- Assumption we test first: ____ (human decides)
- Why this one first: ____ (human decides)
- Variant name (lowercase with dashes): ____ (human decides)
- Who: ____ · When: ____

A second round adds a second "Selection (human)" below this one, with its own variant name.

## Sources
1. [<file>:<line>](../../<file>#L<line>)
2. [discovery/kpi-tree.md:<line>](../kpi-tree.md#L<line>)
```

"Boundaries" and "Ideas not picked" appear from step 3 on. "Sources" stays the last section, below every "Selection (human)". "(draft)" stays on a section until the pair confirms or corrects it.
