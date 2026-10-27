---
name: persona-walkthrough
description: Play both sponsor personas (soft and hard) through the prototype test of one variant, with the same situation and task a human tester gets, and judge each by the signs on the prototype test card. Two modes - "spec" reads the spec before the build, "page" opens the built page in the browser. Use as "/persona-walkthrough <variant> spec" or "/persona-walkthrough <variant> page". Writes discovery/user-tests/<variant>-spec.md or <variant>-page.md. Pressure-tests; never validates and never decides.
---

# Persona walkthrough

**Input:** a variant name and a mode, `spec` or `page`. If either is missing, ask.

| Mode | When | The personas meet | Writes |
|---|---|---|---|
| `spec` | after `variant-spec`, before the build | the spec's "What changes on the page" and "Fields and validation" | `discovery/user-tests/<variant>-spec.md` |
| `page` | after the build; in block 6 as fallback if the cross test drops, or after a rebuild | the page at `http://localhost:<port>/<page>?variant=<variant>`, the start page the spec names | `discovery/user-tests/<variant>-page.md` |

**Reads:** `discovery/test-cards/<variant>-prototype.md` (scenario, signs, the two lines);
`product/personas/sponsor-soft.md`; `product/personas/sponsor-hard.md`; in mode `spec`,
`discovery/specs/<variant>.md`; in mode `page`, the running page.

A persona here is a written profile of a sponsor type, built from the same interviews and mails as
the opportunity. Playing it finds the obvious problems early, so the cross test with people does not
spend its time on them. **It pressure-tests; it does not validate.** The persona cannot tell you
anything its file has no source for.

## Rules

- **Try first, then compare.** Before the personas read anything, ask the human: "Before the personas read, where do you expect them to stall?" Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". If the answer names a page change instead of a place where they expect a stall, keep it word for word and say so in "Your first try". After the run, fill "Your first try": their answer word for word, then two or three short lines on where the personas stalled instead, or also. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the first try.** After the run, tell the human in two or three short lines how strong their guess was: what was good, what was weak, and why. Judge it against what a walkthrough tests. Did they name a place on the page and why a sponsor would stall there? Or a page change, or a worry no persona file has a source for? Did they expect the stall the personas showed, or a different one? Name their words. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the same lines under "Feedback" in "Your first try".
- **Same test as the human tester.** Each persona gets only the "Test scenario" of the prototype card: the situation and the task. Never the assumption, the idea, the go-on line, the signs or the spec header. In mode `spec` the persona reads only "What changes on the page" and "Fields and validation".
- **Both personas, one section each.** Play the soft sponsor, then the hard sponsor. Each reaction quotes the line of that persona's own file it rests on. Always cite the full path, `product/personas/sponsor-soft.md:<line>`: a bare `sponsor-soft.md` also matches the interview file, and `npm run check` rejects it.
- **The persona keeps its own role.** If the scenario gives the tester a role or a fact the persona file contradicts (for example "head of product" for the soft sponsor, who has no budget, `product/personas/sponsor-soft.md:5`), the persona keeps what its file says. Name the clash in one line at the top of its section. Do not change the scenario.
- **What a persona types is built from its file.** Text the persona enters in a field is made only from lines of its file, and the walkthrough quotes those lines. A sign that turns on what the persona would write in its own words is "cannot tell", in both modes. Name, company and email get placeholders ("Test Sponsor", "sponsor@example.com"), marked as having no source.
- **No source, no reaction.** If the persona file has nothing on a point, write "[no source in the persona file: the persona cannot tell]" and do not use it as a sign. Never invent a goal, a fear or a habit the file does not hold.
- **Judge by the card's signs only**, after the walkthrough. For each sign: shown, not shown, or cannot tell, with the walkthrough line it rests on. A sign the card marks "only the cross test with people can test this" is "cannot tell", unless the walkthrough quotes a persona line that states the behaviour (see "too strict" below). A field the persona leaves empty because its file has no line for it is "cannot tell", never "not shown". If the card says a persona can show a sign but its file holds only the worry, the goal, what the sponsor knows, or a different behaviour, the sign is "cannot tell", and the file says the card was too generous. The other way round: if the card says only people can show a sign, but the walkthrough quotes a persona line that states the behaviour, mark it shown or not shown and say the card was too strict. A stall that matches no sign goes under "Other stalls", with its source.
- **Mode `page` uses a browser tool** (Playwright MCP or Chrome DevTools MCP): open the page, take a snapshot of each screen, click as the persona would. React to what is on screen, not to the code. If no browser tool is connected, read the files in `site/variants/<variant>/` and their scripts instead, and write at the top of the file: "No browser tool connected: the personas read the HTML, not the page. The HTML shows things a sponsor never sees." Never read the HTML silently in place of the page.
- **Screen text is cited to the page.** Text the persona reads on screen is cited as `site/variants/<variant>/<page>.html:<line>`, or written without quote marks. A quote followed by a persona citation must stand in the persona file, or `npm run check` fails.
- **No publishing.** The page stays on localhost. Do not upload it anywhere.
- **Every claim quotes its source with location** (file and line). No invented numbers.
- **Decides nothing.** No verdict on the variant, no go-on, no rework or drop. The file ends with what the pair might change, as proposals. Proposals may change any page; name the page in each.
- **Round 2 gets its own file.** A run for round 2 of the learning card writes `<variant>-<mode>-2.md`. A rerun within the same round replaces the file and says at the top which earlier run it replaced, with the date. Ask which case it is if unsure.

## Steps

0. **Try first.** Ask the human: "Before the personas read, where do you expect them to stall?" Wait for the answer before you read further.
1. Read the prototype card. If it does not exist, stop and say so. Note the scenario for the personas, and keep the signs and lines aside for step 5.
2. Read both persona files.
3. Open what the personas meet:
   - mode `spec`: read `discovery/specs/<variant>.md`, only the two sections named above. If the spec does not exist, stop.
   - mode `page`: ask which port the server runs on (3000 unless `PORT` is set), then check it answers: `curl -s -o /dev/null -w '%{http_code}' 'http://localhost:<port>/<page>?variant=<variant>'`. Not 200: ask the human to run `npm start` in a second terminal and check `site/config.json` lists the variant. Then open the page with the browser tool. Record which tool, or that none was connected.
4. Walk through as each persona, in turn. Per screen or step: what they notice first, what they would do and why, where they hesitate, what they would ask. Each line with its persona-file source. 100 to 250 words per persona.
5. Judge each sign, per persona: shown, not shown, cannot tell. Then hold the result against the go-on line and the rework-or-drop line, in words: which line the observations lean towards, or "unclear".
6. Show the human the sign table. Ask what is wrong or missing, and correct it.
7. Write the file. Give the feedback on the first try (see Rules). Tell the human in two lines the strongest finding and the sign no persona could test. Then stop.

## Output template

```markdown
# Persona walkthrough: <variant>, <spec | page>

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`persona-walkthrough`) on <YYYY-MM-DD>. Not a decision.
> Prototype card: `discovery/test-cards/<variant>-prototype.md` · Met: <`discovery/specs/<variant>.md` | `http://localhost:<port>/<page>?variant=<variant>`>
> Browser tool: <Playwright MCP | Chrome DevTools MCP | none: read the HTML> (mode `page` only)
> Material: personas are drafts from anonymised composite interviews and synthetic inquiries (`product/personas/sponsor-soft.md:<line>`, `product/personas/sponsor-hard.md:<line>`)

## Your first try
<the human's answer, word for word> · Where the personas stalled: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## Scenario the personas got
<situation and task, copied from the prototype card>

## Soft sponsor
<walkthrough, each reaction with "(`product/personas/sponsor-soft.md:<line>`)">

## Hard sponsor
<walkthrough, each reaction with "(`product/personas/sponsor-hard.md:<line>`)">

## Signs
| Sign (from the card) | Points to | Soft sponsor | Hard sponsor | Rests on |
|---|---|---|---|---|
| <sign> | go on / rework or drop | shown / not shown / cannot tell | ... | <walkthrough line, or "no source in the persona file"> |

## Other stalls
- <stall that matches no sign, with its persona-file source, or "none">

## Against the two lines
<which line the observations lean towards, in words, or "unclear", and why>

## What the personas cannot tell
- <every sign or question with no source in either persona file>

## What the pair might change (proposals)
- <change>: because <finding>
```
