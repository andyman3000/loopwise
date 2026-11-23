---
name: loopwise-persona-walkthrough
description: Play both buyer personas (buyer without budget, buyer with budget) through the prototype test of one variant, with the same situation and task a human tester gets, and judge each by the signs on the prototype test card. Two modes - "spec" reads the spec before the build, "page" opens the built page in the browser. Use as "/loopwise-persona-walkthrough <variant> spec" or "/loopwise-persona-walkthrough <variant> page". Writes one file per run in discovery/user-tests/ (<variant>-spec.md, then <variant>-spec-run2.md, ...) and one row in the spec's review log. Pressure-tests; never validates and never decides.
---

# Persona walkthrough

**Input:** a variant name and a mode, `spec` or `page`. If either is missing, ask.

| Mode | When | The personas meet | Writes |
|---|---|---|---|
| `spec` | after `loopwise-variant-spec`, before the build | the spec's "What changes on the page" and "Fields and validation" | `discovery/user-tests/<variant>-spec.md` |
| `page` | after the build, or after a rebuild | the page at `http://localhost:<port>/<page>?variant=<variant>`, the start page the spec names | `discovery/user-tests/<variant>-page.md` |

**Reads:** `discovery/test-cards/<variant>-prototype.md` (scenario, signs, the two lines);
`product/personas/buyer-without-budget.md`; `product/personas/buyer-with-budget.md`; in mode `spec`,
`discovery/specs/<variant>.md`; in mode `page`, the running page.

A persona here is a written profile of a buyer type, built from the same interviews and mails as
the opportunity. Playing it finds the obvious problems early, so the test with people does not
spend its time on them. **It pressure-tests; it does not validate.** The persona cannot tell you
anything its file has no source for.

**Setting.** Read the `Setting:` line in `CLAUDE.md`. No line means `workshop`. In `workshop`
(the one-day bootcamp), this skill is not part of the day: the pair builds the prototype from its
spec instead, and the trainer shows on a slide what AI personas can and cannot show. If a pair runs
it anyway, say once that the test with people the card plans comes after the workshop. In `team`, read "the pair" in
this skill as "the team". Mode `page` then runs if no people can be found for the test, or before
they test. It never replaces them.
In `workshop`, block 5 lets the pair pick at most two proposals for the spec, to fit the time box.
In `team`, there is no such limit: the team picks every proposal it wants fixed before the test.
Say which case applies when you list the proposals.

## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the human writes in. Show first, by mode:
- `spec`: **Where:** Block 5, step 2 of 5: two personas read your spec before anything is built. **You end with:** `discovery/user-tests/<variant>-spec.md`, at http://localhost:<port>/discovery/user-tests/<variant>-spec.md, and at most two changes to the spec. **Time:** about 15 of the 35 minutes of block 5 part 1; changing the spec only if time is left.
- `page`: **Where:** after the build (block 5 if short of time, or block 6 when no tester comes): two personas try your page. **You end with:** `discovery/user-tests/<variant>-page.md`. **Time:** about 15 minutes.

Say in one line what a persona is (`.claude/rules/guiding.md`, "Terms"). End each step with "Done: <what>. Next: <what the human does now>."

**At the end, in setting `workshop`:** the Next and Time lines follow `.claude/rules/guiding.md`, "At the end of the skill", not the lines this skill names below. Stop; name no next skill, no command to type and no block.

## Rules

- **Try first, then compare.** Before the personas read anything, tell the human in two lines what this run can and cannot show. It can show gaps in the spec or page and clashes with what the persona files say about buyers. It cannot show whether the idea works: a persona repeats its file and cannot react to anything new. Then ask: "Before I play the buyer without budget and the buyer with budget through your page: where will each of them hesitate or leave, and why?" Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". If the answer names a page change instead of a place where they expect a stall, keep it word for word and say so in "Your first try". After the run, fill "Your first try": their answer word for word, then two or three short lines on where the personas stalled instead, or also. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the first try.** After the run, tell the human in two or three short lines how strong their guess was: what was good, what was weak, and why. Judge it against what a walkthrough tests. Did they name a place on the page and why a buyer would stall there? Or a page change, or a worry no persona file has a source for? Did they expect the stall the personas showed, or a different one? Name their words. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the same lines under "Feedback" in "Your first try".
- **Same test as the human tester.** Each persona gets only the "Test scenario" of the prototype card: the situation and the task. Never the assumption, the idea, the go-on line, the signs or the spec header. In mode `spec` the persona reads only "What changes on the page" and "Fields and validation".
- **Both personas, one section each.** Play the buyer without budget, then the buyer with budget. Each reaction quotes the line of that persona's own file it rests on. Always cite the full path as the link text, `[product/personas/buyer-without-budget.md:<line>](../../product/personas/buyer-without-budget.md#L<line>)`, so the reader can tell the persona file from an interview.
- **The persona keeps its own role.** If the scenario gives the tester a role or a fact the persona file contradicts (for example "has the budget signed off" for the buyer without budget, who has no budget settled at first contact, `product/personas/buyer-without-budget.md:5`), the persona keeps what its file says. Name the clash in one line at the top of its section. Do not change the scenario.
- **What a persona types is built from its file.** Text the persona enters in a field is made only from lines of its file, and the walkthrough quotes those lines. A sign that turns on what the persona would write in its own words is "cannot tell", in both modes. Name, company and email get placeholders ("Test Buyer", "buyer@example.com"), marked as having no source.
- **No source, no reaction.** If the persona file has nothing on a point, write "[no source in the persona file: the persona cannot tell]" and do not use it as a sign. Never invent a goal, a fear or a habit the file does not hold.
- **Judge by the card's signs only**, after the walkthrough. For each sign: shown, not shown, or cannot tell, with the walkthrough line it rests on. A sign the card marks "only a test with people can test this" (older cards: "only the cross test with people can test this" or "only the test with people can test this") is "cannot tell", unless the walkthrough quotes a persona line that states the behaviour (see "too strict" below). A field the persona leaves empty because its file has no line for it is "cannot tell", never "not shown". If the card says a persona can show a sign but its file holds only the worry, the goal, what the buyer knows, or a different behaviour, the sign is "cannot tell", and the file says the card was too generous. The other way round: if the card says only people can show a sign, but the walkthrough quotes a persona line that states the behaviour, mark it shown or not shown and say the card was too strict. A stall that matches no sign goes under "Other stalls", with its source.
- **Two questions per sign, two tables.** Table 1 asks what the persona would do on the page: shown, not shown or cannot tell. Table 2 asks whether the spec or page goes against something the persona file says: "yes" with what clashes and the line, "no", or "the file says nothing". Ask the second question for every sign, most of all where the card says "a fact the page must fit". Never hide a clash in the "Rests on" column. A sign can read "cannot tell" in table 1 and "yes" in table 2. The persona files hold facts about buyers, not behaviour on a new page, so table 1 mostly reads "cannot tell". The findings then come from table 2. Title each table with its question, never with a short label.
- **Every proposal names its evidence**, in this order of strength: a sign the persona showed; a clash with a fact in the persona file; a stall outside the signs; a gap where the persona file has no line. Sort the proposals in that order. Mark a proposal "buyer with budget only" when only that persona backs it, and say so if the card recruits no tester of that type.
- **Stay on the assumption under test.** A walkthrough tests the one critical assumption on the prototype card. If a finding rests on something else the buyer would have to do or believe, for example how they decide, who they ask, budget or timing, it is a new assumption. Do not turn it into a proposal for the page, and never mark it "fix before the test". Write it once under "New assumptions (not blocking)" as `[assumption: ...]`, with the persona line it rests on, and say which sign it may blur. It goes to the intent, not to this spec. Before you rank a finding, ask: does it change whether a tester meets the assumption under test? If not, it is a new assumption.
- **Every proposal gets a criticality, in words, with the reason for it.** "Fix before the test": a persona showed a sign, or the spec clashes with a persona line, on a step the go-on line or the rework-or-drop line counts. "Fix if time allows": a clash or stall on a step neither line counts, or one that only a persona type without testers backs. "Watch in the test": a gap, where no persona file has a line, so only people can tell. Within one criticality, sort by evidence. The reason names the evidence, the step and the line of the card it touches. Criticality is a proposal; the human decides what to fix.
- **Mode `page` uses a browser tool** (Playwright MCP or Chrome DevTools MCP): open the page, take a snapshot of each screen, click as the persona would. React to what is on screen, not to the code. If no browser tool is connected, read the files in `site/variants/<variant>/` and their scripts instead, and write at the top of the file: "No browser tool connected: the personas read the HTML, not the page. The HTML shows things a buyer never sees." Never read the HTML silently in place of the page.
- **Screen text is cited to the page.** Text the persona reads on screen is cited as `[site/variants/<variant>/<page>.html:<line>](../../site/variants/<variant>/<page>.html#L<line>)`, or written without quote marks. A quote followed by a persona citation must stand in the persona file, or `npm run check` fails.
- **No publishing.** The page stays on localhost. Do not upload it anywhere.
- **Every claim quotes its source with location** (file and line). No invented numbers. Each citation is a Markdown link: `[<file>:<line>](<path from this file>#L<line>)` (`.claude/rules/writing.md`, "Citations are links").
- **Decides nothing.** No verdict on the variant, no go-on, no rework or drop. The file ends with what the pair might change, as proposals. Proposals may change any page; name the page in each.
- **The spec's review log gets one row per run** (mode `spec`, and mode `page` once the spec is built). Add the row to "Status" in `discovery/specs/<variant>.md`: date, run, file, findings counted per criticality, and "open" under "Decided". Then set the stage by the rules in `.claude/skills/loopwise-variant-spec/SKILL.md`. Change nothing else in the spec. When the human later decides on the findings, the skill that changes the spec fills "Decided".
- **Every run gets its own file, so the runs can be compared.** Never overwrite an earlier run. Round 1 (before the learning card): the first run writes `<variant>-<mode>.md`, later runs `<variant>-<mode>-run2.md`, `-run3.md` and so on. Round 2 of the learning card: `<variant>-<mode>-2.md`, then `<variant>-<mode>-2-run2.md`. If unsure, ask: "Is this the first test of this page, or a second round after the learning card?" The header names the run, the round, and what the personas met: the spec's commit if it is committed, or "uncommitted, <date>".
- **A later run compares itself with the run before.** Fill "Compared with the last run": each finding of the last run, and whether it is gone, still there or changed, with the line of this run it rests on. Then the new findings. Then the counts of findings per criticality, last run and this run, counted from the two files. Fewer findings is not proof the page works. It only shows the personas find less to press on. Say so.

## Steps

0. **Try first.** Say in two lines what the run can and cannot show (see Rules). Introduce the two buyers in one line each, from their persona files: the buyer without budget leads product people, does not decide alone and has no budget settled at first contact; the buyer with budget is a product lead who has budget and wants proof of effect. Say: about 2 minutes, one line per buyer. A good answer names a place on the page and a reason. Example from an unrelated product, a library app: "A student stops at the renew button: does renewing cost anything?" Then ask: "Before I play the buyer without budget and the buyer with budget through your page: where will each of them hesitate or leave, and why?" Wait for the answer before you read further.
1. Read the prototype card. If it does not exist, stop and say so. Note the scenario for the personas, and keep the signs and lines aside for step 6.
2. Read both persona files.
3. Open what the personas meet:
   - mode `spec`: read `discovery/specs/<variant>.md`, only the two sections named above. If the spec does not exist, stop.
   - mode `page`: take the port from `discovery/.local.json` (`.claude/rules/guiding.md`, "Language and port"), then check quietly that the page answers: `curl -s -o /dev/null -w '%{http_code}' 'http://localhost:<port>/<page>?variant=<variant>'`. If the site does not answer at all, offer to start it, as `.claude/rules/guiding.md` says. If the site answers but the page does not, check yourself that `site/config.json` lists the variant under `variants` and that `site/variants/<variant>/` holds the page. If not, say in one line that the page is not built yet, and stop: the build comes first. Then open the page with the browser tool. Record which tool, or that none was connected.
4. Walk through as each persona, in turn. Per screen or step: what they notice first, what they would do and why, where they hesitate, what they would ask. Each line with its persona-file source. 100 to 250 words per persona.
5. **Show both walkthroughs in chat**, before any table. One short block per persona, one line per screen or question: what the persona does or where it stalls, and the persona-file line it rests on. The human must see the reasoning before judging the signs.
6. Judge each sign, per persona, in both tables (see Rules): what the persona would do, and whether the spec or page goes against the persona file. Then hold the result against the go-on line and the rework-or-drop line, in words: which line the observations lean towards, or "unclear".
7. Lead with the conclusion in two lines: the strongest finding, and which line the observations lean towards. Then show the human both sign tables. Above them, write in one line why table 1 mostly reads "cannot tell", and that the findings come from table 2. Say: about 3 minutes; check whether a row says "shown" or "clash" without a persona line you find convincing, and whether a sign you care about is missing. A good answer is the row numbers you doubt, with one reason, or "fits". In chat, every persona line you rest on is quoted in a few words with its file and line, never a bare line number. When a persona cannot show a sign the test card said it could, say it in these plain words: "the test card said a persona can show this sign, but the persona file has no line for it". Ask what is wrong or missing, and correct it.
8. Write the file. Add the row to the spec's review log and set the stage (see Rules). Give the feedback on the first try (see Rules). Tell the human in two lines the strongest finding and the sign no persona could test. Then show the proposals in chat as the same table as in the file: proposal, page, evidence, criticality and why it ranks there (see Rules). Say whether the pair picks at most two (`workshop`) or the team picks freely (`team`). Say in one line what criticality is: the run's proposal of how urgent a fix is (fix before the test, fix if time allows, watch in the test); the pair decides. If a proposal goes against a decision the pair took on the spec, or against a challenger finding they applied, say so in its row and in chat. In mode `spec`, then guide the next step: "Step 3 of 5, only if time is left: change the spec, about 10 minutes." Say: name the proposals you act on by their number, at most two in `workshop`, or "none"; a good pick fixes what would stop a tester before they reach a sign. I change the file each proposal names (the spec, or the test card) for exactly those and record them under "Changes after review". Wait, apply only those, run `npm run check`. Say that the commit saves the files in their branch and nothing leaves the laptop. End with four lines: "Made: the persona run on your spec, and your picks applied." "Look: http://localhost:<port>/discovery/user-tests/<variant>-spec.md and http://localhost:<port>/discovery/specs/<variant>.md." "Next: say yes and I commit your files (`git add discovery && git commit -m "block 5: spec and persona run"`). Then wait for the room: block 5 part 1 ends here, and no prototype is built in the morning. The afternoon starts from a reference state, a finished state of the repo; the trainer gives the one git command to switch to it." "Time: about 35 minutes were planned for the spec and this run." In mode `page`, end with four lines: "Made: the persona run on your page." "Look: http://localhost:<port>/discovery/user-tests/<variant>-page.md." "Next: type `/clear`, then `/loopwise-learning-card <variant>`." "Time: about 15 minutes." Then stop.

## Output template

```markdown
# Persona walkthrough: <variant>, <spec | page>

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`loopwise-persona-walkthrough`) on <YYYY-MM-DD>. Not a decision.
> Prototype card: `discovery/test-cards/<variant>-prototype.md` · Met: <`discovery/specs/<variant>.md` | `http://localhost:<port>/<page>?variant=<variant>`>
> Browser tool: <Playwright MCP | Chrome DevTools MCP | none: read the HTML> (mode `page` only)
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:<line>](../../product/personas/buyer-without-budget.md#L<line>), [product/personas/buyer-with-budget.md:<line>](../../product/personas/buyer-with-budget.md#L<line>))

> Run: <n> of round <1 | 2> · Earlier run: <`discovery/user-tests/<file>`, or "none, first run"> · Met: <commit | "uncommitted, <date>">

## Your first try
<the human's answer, word for word> · Where the personas stalled: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## Scenario the personas got
<situation and task, copied from the prototype card>

## Buyer without budget
<walkthrough, each reaction with "([product/personas/buyer-without-budget.md:<line>](../../product/personas/buyer-without-budget.md#L<line>))">

## Buyer with budget
<walkthrough, each reaction with "([product/personas/buyer-with-budget.md:<line>](../../product/personas/buyer-with-budget.md#L<line>))">

## Signs
The persona files hold facts about buyers, not behaviour on this page. So table 1 mostly reads "cannot tell". The findings come from table 2.

### Table 1: What would the persona do on the page?
| Sign (from the card) | Points to | Buyer without budget | Buyer with budget | Rests on |
|---|---|---|---|---|
| <sign> | go on / rework / drop | shown / not shown / cannot tell | ... | <walkthrough line, or "no source in the persona file"> |

### Table 2: Does the spec go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| <sign> | yes: <what clashes, with the persona line> / no / the file says nothing | ... |

## Other stalls
- <stall that matches no sign, with its persona-file source, or "none">

## Against the two lines
<which line the observations lean towards, in words, or "unclear", and why>

## What the personas cannot tell
- <every sign or question with no source in either persona file>

## New assumptions (not blocking)
- [assumption: <what the buyer would have to do or believe>] · rests on <persona line> · may blur the sign <sign> · for the intent, not this spec
<or "none">

## Compared with the last run
<first run: "First run, nothing to compare.">
| Finding of the last run | Now | Rests on |
|---|---|---|
| <finding> | gone / still there / changed | <line of this run> |

New findings: <list, or "none">

| Criticality | Last run | This run |
|---|---|---|
| fix before the test | <n counted> | <n counted> |
| fix if time allows | <n counted> | <n counted> |
| watch in the test | <n counted> | <n counted> |

Fewer findings is not proof the page works. The personas only find less to press on.

## What the pair might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the <pair | team> decides.

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | <change> | <page> | <shown sign / clash with a fact / other stall / gap in the file>[, buyer with budget only] | <fix before the test / fix if time allows / watch in the test> | <the finding with its persona line, the step, and the line of the card it touches> |
```
