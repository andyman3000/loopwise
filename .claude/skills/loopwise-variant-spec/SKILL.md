---
name: loopwise-variant-spec
description: Write the spec for one variant so Claude Code can build it, in one of two modes. "learn" (the default) writes the smallest page that tests the critical assumption on the prototype card, ends with a challenger run by a subagent that hunts for bloat, and leaves everything else out. "launch" writes the lean launch spec after the launch card: at most one page with what a developer needs and the prototype does not show (non-functional requirements, decisions and why, events, invisible behaviour, open points), then a subagent checks it against the prototype and every line the prototype already shows is cut. Use as "/loopwise-variant-spec <variant>" or "/loopwise-variant-spec <variant> learn" after "/loopwise-test-card <variant> prototype", and "/loopwise-variant-spec <variant> launch" after "/loopwise-test-card <variant> launch". Use when the team says "write the spec", "spec this variant", or "what exactly do we build for <variant>". Writes one file per variant and mode; never chooses variants and never builds.
---

# Spec

**Input:** one variant name and a mode, `learn` or `launch`. No mode means `learn`. The name must match "Variant name" in the intent's "Selection (human)". If no name is given, ask. If the card for the mode is missing, say which and stop.

| Mode | When | Card it rests on | Goal | Writes |
|---|---|---|---|---|
| `learn` | after `loopwise-test-card <variant> prototype`, before the prototype build | `discovery/test-cards/<variant>-prototype.md` | the smallest page on which a tester meets the critical assumption and the watcher sees every sign | `discovery/specs/<variant>.md` |
| `launch` | after `loopwise-test-card <variant> launch`, before the variant ships | `discovery/test-cards/<variant>.md` | one page with what the build for real visitors needs and the prototype does not show | `discovery/specs/<variant>-launch.md` |

**Reads, both modes:** the card for the mode; `site/styles.css`, the design system (tokens and components, see `.claude/rules/design-system.md`); `discovery/intents/<opportunity>.md` (the idea and its assumptions); the pages the idea changes in `site/` and `site/components/` (what they do today); `site/formats.html` (the formats a page may name); `product/constraints.md`; `product/personas/`; `sources/` where the variant needs wording from the material.
**Reads, mode `launch` also:** the prototype in `site/variants/<variant>/` (every file); `discovery/specs/<variant>.md` (the learn spec); the learning card, the file in `discovery/decisions/` whose name ends in `-<variant>.md` (002 for the first variant, a later number for the next); every other file in `discovery/decisions/` that names the variant; `discovery/user-tests/` for this variant; `site/components/events.js` and `server.js` (what the site logs and stores today); `gates/gates.json` and `gates/policies/` (the release gates).

A spec is the hand-over to the build: precise enough that Claude Code can build the page from this file alone.
In mode `launch` the hand-over is a kit of three files: the prototype, the intent and the launch spec. The prototype shows everything visible. The intent says why. The launch spec holds only the rest.

**Mode `learn` builds to learn, not to ship.** The page exists to test one critical assumption with a few testers. A critical assumption is the one thing that must be true for the idea to work. Every element on the page must serve that assumption or a sign on the prototype card. Everything else is left out and listed as such. When in doubt, leave it out: the launch spec can add it later.

## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the human writes in. Show first, by mode:
- `learn`: **Where:** Block 5, step 1 of 5: the spec, a description of the smallest page for your test. **You end with:** `discovery/specs/<variant>.md`, at http://localhost:<port>/discovery/specs/<variant>.md. **Time:** about 20 of the 35 minutes of block 5 part 1; the persona run takes the other 15.
- `launch`: **Where:** Factory run 1, step 2 of 8: your own draft of the launch spec, one page with what a developer needs and the prototype does not show. **You end with:** `discovery/specs/<variant>-launch.md`, at http://localhost:<port>/discovery/specs/<variant>-launch.md. **Time:** about 10 minutes; past 10, stop and compare what is there.

End each step with "Done: <what>. Next: <what the human does now>."

## Rules, both modes

- **Try first, then compare.** Before you draft, ask the human. In `learn`: "What is the smallest page that lets a tester hit the assumption?" In `launch`: "What would a developer need to know that the prototype does not show?" The answer should fit about ten minutes of the pair's time. Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the first try.** After drafting, tell the human in two or three short lines how strong their answer was: what was good, what was weak, and why. Judge it against the mode. In `learn`: is it the smallest page, or a full feature? Does it let a tester meet the assumption? Can the watcher see every sign on it? In `launch`: does it name what the prototype cannot show (data, errors, the events the launch card counts, legal limits), or does it repeat what the page already shows? Name their words. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the same lines under "Feedback" in "Your first try".
- **Every claim quotes its source with location** (file and line). No quote, no claim. Each citation is a Markdown link: `[<file>:<line>](<path from this file>#L<line>)` (`.claude/rules/writing.md`, "Citations are links").
- **Do not invent numbers.** No targets, no thresholds, no expected rates; those belong in the test card.
- **No line on the page says what a go-on sign listens for.** A tester who reads such a line back shows nothing.
- **Name what changes on the page by mechanism:** fields, order, wording, what happens on submit.
- **A page may keep the form, change it, or replace it.** A page that books a call instead of sending an inquiry logs `scoping_call_booked` (`site/components/events.js:8`) and sends nothing to `/api/inquiry`; the rule on fields then does not apply. The spec says which of the two the page does.
- **If the page sends an inquiry, fields go to the server as top-level scalars** (string, number, boolean) in the `POST /api/inquiry` body. The server stores any such field by rule (at most 20, strings up to 300 characters) and drops objects and arrays. It cuts a longer string without a warning, so every new text field gets `maxlength="300"`. Name every field. Core validation still applies on top: name, company, a valid email, and `message` of at least 10 characters (`site/components/inquiry-form.js:4`). An inquiry that drops one of these fails on send, so a page that sends one keeps all four. The message field may get a new label, or be filled from what the buyer ticks or types: text built from the buyer's own choices counts as their answer. Never fill it with fixed text that is the same whatever the buyer does: every record would carry the same fake answer. Every new field sits inside the `<form>` element, or it is not sent.
- **After the send.** The page redirects to `/confirmation.html`, which says the academy gets in touch "within a few days" to book a scoping call. If the variant promises something else (a call back, a time), say so under "Open points for the human".
- **Where it lives:** a variant can replace any page (`README.md:110`). It holds one file per page it changes, named like the page: `site/variants/<variant>/inquiry.html`, `formats.html`, or `index.html` for home. Each is served at `/<page>?variant=<variant>` once the name is listed under `variants` in `site/config.json`. Pages the variant does not hold stay the baseline, and the server keeps `?variant=` on links between pages. Do not set `shipped`; that is a human decision after the launch card. The spec names every page it changes and the page the tester or visitor starts on.
- **Wording shown to buyers that comes from the material is marked** with its source, and any invented line is marked as invented. List every invented line in the section "Invented lines on the page". Wording adapted from a source is written as the label, then "adapted from `<file>:<line>`", without quote marks around the label: `npm run check` reads a quote followed by a citation as word for word.
- Respect `product/constraints.md`. If the idea and a constraint disagree, name the conflict and stop at that point; do not resolve it.
- **Stage and review log.** Every spec has a section "Status" right below the header: the stage, and a review log with one row per review. A skill that reviews the spec adds its row and then sets the stage by these rules, never by judgement:
  - **Draft:** written, no review yet.
  - **Reviewed:** at least one persona walkthrough and one challenger run, and the human has decided on their findings.
  - **Ready to build:** no "fix before the test" finding of any walkthrough is still open, and every open point that touches a sign is answered. A finding is closed once the human decided on it: applied, or accepted as a known risk. New assumptions a walkthrough lists under "New assumptions (not blocking)" never block.
  - **Built:** the page opens at the start page with `?variant=<variant>`.
  - **Tested with people:** the learning card exists.
  A further walkthrough run after the human's decisions is optional, not a condition for "Ready to build". Counts in the log are counted from the files the row names.
- **This file is a spec drafted by an agent.** The human reads it before the build. Open points stay open. A change the human decides after a persona walkthrough or a challenger run is recorded under "Changes after review", with the human's role, the date, the options and what was chosen.

## Rules, mode `learn`

- **Built on the design system.** Every element is one of the components in `site/styles.css` (button, card, field, note, path and so on). Name the component for each element in "What changes on the page". An element the design system has no component for gets a page layout class on tokens; say so in one line. The design system makes the prototype fast; no gate checks it here.
- **Every element earns its place.** For each element on the page, name the sign or the part of the assumption it serves. An element that serves neither is left out.
- **One way in.** The page the prototype card names as the start page. A second page or a second way in only if the assumption needs it.
- **The happy path only.** No edge-case rules a tester is unlikely to hit (group splits, limits, rare combinations). No fallbacks for browser features beyond one sentence. If the build needs a fallback to work at all, say it in one line.
- **Fake what the test does not need to work.** A button the watcher only needs to see pressed may do nothing more than show a short reply. Say so in the spec, so the build does not wire it up.
- **Invent the content the test needs.** Loopwise is fictional. If the page needs content the material does not hold (a trainer's background, dates, a quote from a past group), draft it yourself and list it under "Invented lines on the page". Ask the pair to confirm or change it as the product team, never as if they were the academy. Make it as specific as the assumption needs: a placeholder cannot test an assumption about content.
- **No events and no hidden fields.** The prototype test does not read events; the watcher reads the page. Leave out the section "Events to emit" and any field that only feeds events. The site's existing events keep firing as today.
- **The rule behind a result stays as simple as the test allows.** A tester needs a result that plausibly fits their group. They do not need every case covered.
- **Every sign on the prototype card needs something on the page.** For each sign, name the element where the watcher can see it, and check it can happen on the path the tester takes. If a sign has no element, say so under "Open points for the human".
- **Changes from a persona walkthrough or a review** go in only if they touch a sign or the assumption. A change that only a persona type without testers backs goes to "Left out to learn faster", for the launch spec.
- **Challenger run at the end.** After the draft, start a subagent (the Agent tool, a fresh agent with no conversation context). Give it only the prototype card and the draft spec, and this brief: "This spec is for a prototype test of one critical assumption, not for a release. For every element, rule, field and section, say which sign on the card or which part of the assumption it serves. List everything that serves neither, every second path to the same sign, every edge case a tester is unlikely to hit, and every part the build could fake. Do not propose new features. Quote the spec line for each finding." Do not give it your own view of the spec.
- **The human decides on the challenger's findings.** Show them as a table: element, what the challenger says, your proposal (cut, simplify, keep) with the reason. Apply only what the human agrees to. Record the run and the decision under "Challenger check".

## Rules, mode `launch`

- **One page, no more.** Aim for under 60 lines of Markdown; 80 is the hard limit. A longer draft gets cut, never split into a second file. A long requirements document is a poor hand-over: most of what it would say gets decided when a team specs together. The launch spec carries only the rest.
- **The prototype is the reference for everything visible.** Link its files and never describe layout, wording, labels, fields, order or visible states. If the release must change something a visitor sees, write one line: what changes and the decision behind it, or an open point.
- **Six sections and nothing else,** in the order of the template: the kit, non-functional requirements, decisions taken, events, invisible behaviour, open points. Above them stays "Your first try"; below them, one "Prototype check" line. No status log, no build prompt, no list of invented lines. Of the rules for both modes, "Name what changes on the page", the section "Invented lines on the page" and the stage and review log do not apply in `launch`.
- **Non-functional requirements: only those that matter for this release.** Look at least at these: the page works once the faked parts of the prototype are real; accessibility basics; a performance budget for a static page; privacy of form data. Each line has a source or is marked `[assumption: ...]`. A budget is a rule from `product/constraints.md` or a counted number, never an invented one.
- **Decisions taken: only what a human decided in a file.** Each line says what was decided and why, and cites the file and line: a file in `discovery/decisions/`, the launch card or the learning card. Anything no human decided goes to the open points, with your proposal at most.
- **Events come from this list only:** `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. For each, say when it fires, which props it carries, and which line of the launch card it feeds: the success line, the usage hypothesis, the proxy metric, the counter metric or the kill criterion. Cite that line. If the launch card needs something no event covers, say so under invisible behaviour.
- **Invisible behaviour: what a visitor cannot see in the prototype.** States between clicks, errors, edge cases the rule must handle, which data goes where and who may read it, and legal limits. Always name the legal limit on prices: no price on the site, citing `product/constraints.md:7` as a link, and the release gates in `gates/gates.json` that the hardened page must pass.
- **Every item the learn spec left out appears once:** as a decision, as invisible behaviour, or as an open point. The prototype's faked parts are among them.
- **Invented lines need a confirmer before launch.** An invented line from the learn spec without a confirmer is an open point.
- **Prototype check at the end.** After the draft, start a subagent (the Agent tool, a fresh agent with no conversation context). Give it only the prototype files in `site/variants/<variant>/` and the draft, and this brief: "The prototype is the reference for everything a visitor sees. List every line of the launch spec that describes something visible in the prototype: layout, wording, labels, fields, order or visible states. Quote the spec line and name the prototype element. Judge nothing else." Do not give it your own view. Cut every line it lists, with these exceptions: "Your first try" stays as the human said it, the header and the kit lines stay as the template has them, and the legal constraints under "Invisible behaviour" and the open points stay, because a visible element can still hide an open question. If a listed line also holds something the prototype does not show, keep only that part. Record the run in the "Prototype check" line: lines listed, cut, shortened. Tell the human which lines went.

## Steps

0. **Try first.** In `learn`, read only the prototype card's "We believe that" and the scenario's task, and show both to the human, quoted. Say first, by mode, then ask the question for the mode (see Rules).
   - `learn`: about 2 minutes, two or three sentences. A good answer names the one page and the one or two things on it the tester needs; the rest stays as today. Example from an unrelated product, a library app: "Only the reminder screen changes: one renew button under the due date. The rest of the app stays."
   - `launch`: about 3 minutes, a short list. A good answer names what a screen cannot show: errors, data kept, who answers, what is logged. Example from an unrelated product, a library app: "A renewal fails when someone reserved the book, and the page says so. The reminder goes out at 9:00 local time."
   Then ask the human the question for the mode (see Rules). Wait for the answer before you read further or draft anything.
1. Read the card for the mode: the assumption, the scenario and the signs, or the launch lines. Then the intent and its "Selection (human)". Confirm the variant name and which idea it comes from. In `launch`, also read the prototype files, the learn spec, the learning card, the other decisions on the variant and the walkthroughs.
2. Read the current pages the idea changes and their components, so the spec says what changes against today and what stays.
3. Draft the spec with the template for the mode. Show the human the section "What changes on the page". Say in one line what a spec is, then what to check, about 3 minutes: does every change serve the assumption or a sign on the card? Could one go and the test still work? Does the tester have all they need to reach each sign? A good answer is a change in your words, or "fits". Ask them to confirm or change it.
   In `launch`, show the sections "Decisions taken" and "Invisible behaviour" instead.
4. Mode `learn`: **challenger run** (see Rules). Show the findings as a table. Say: about 5 minutes; read the rows the challenger ranks highest first. A good answer is the numbers you apply, or "none", with one reason. Ask the human which to apply, apply only those, and record it under "Challenger check". Add its row to the review log and set the stage.
   Mode `launch`: **prototype check** (see Rules). Cut the lines the subagent lists, tell the human which, and fill the "Prototype check" line. Count the lines of the file: over 80, cut further before you write it.
5. Write the file. Give the feedback on the first try (see Rules). Tell the human in three lines what the build needs most and which open point needs their judgement. In mode `learn`, then guide the open points: list only those that touch a sign, numbered. Say: about 3 minutes; in the workshop nobody from the academy is in the room, so the pair answers as the product lead, and the spec marks each answer as the pair's. A good answer is one short sentence per point, or "leave open" for a point the test can live without. Write the answers in. Points that touch no sign stay open. Then end with four lines: "Made: the spec for <variant>." "Look: http://localhost:<port>/discovery/specs/<variant>.md." "Next: type `/clear`, then `/loopwise-persona-walkthrough <variant> spec`: two personas read the spec before anything is built." "Time: about 20 minutes were planned for the spec; the persona run takes 15." In mode `launch`, say which open points the build needs answered first, and that every open point must be answered before launch. If `git log -1 --format=%h -- discovery/specs/<variant>-launch.md` prints a commit, a reference spec existed and your draft wrote over it. Then end with four lines: "Made: your draft of the launch spec." "Look: `git diff discovery/specs/<variant>-launch.md` shows your draft against the reference; talk 5 minutes about which of your lines the prototype already shows, and what the reference has that you missed." "Next: put the reference back with `git checkout -- discovery/specs/<variant>-launch.md`, then `/clear` and `/loopwise-factory <variant> run-1`." "Time: factory run 1 planned 10 minutes for the draft and 5 for the comparison." If no commit is printed, end with: "Made: the launch spec." "Look: http://localhost:<port>/discovery/specs/<variant>-launch.md." "Next: answer the open points, then `/clear` and `/loopwise-factory <variant> run-1`." Then stop.

## Output template, mode `learn`

```markdown
# Spec: <variant>

> Spec drafted by an agent (`loopwise-variant-spec`, mode `learn`) on <YYYY-MM-DD>, before the prototype build. Built to learn, not to ship.
> **Variant:** `<variant>` · Pages it changes: <page files> · Tester starts at `/<page>?variant=<variant>`
> **Idea:** <I-number> in `discovery/intents/<opportunity>.md` ("<idea line, quoted>")
> **Assumption under test:** "<quoted>" ([discovery/test-cards/<variant>-prototype.md:<line>](../test-cards/<variant>-prototype.md#L<line>))
> **Label:** <synthetic or composite, repeated from the material the intent rests on>

## Status
**Stage:** <Draft | Reviewed | Ready to build | Built | Tested with people>, because <the stage rule it meets>

| # | Date | Review | File | Findings | Decided |
|---|---|---|---|---|---|
| <n> | <date> | <persona walkthrough run n | challenger run n> | <file> | <counted per criticality, or per finding type> | <what the human chose, or "open"> |

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## What changes on the page
<step by step, what the tester sees and does, in order; each element names the sign or the part of the assumption it serves>

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|

## Fields and validation
<only if the page sends an inquiry>
| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|

## What stays the same
- <...>

## Invented lines on the page
| Line the buyer sees | Who could confirm it |
|---|---|

## Left out to learn faster
- <element>: <why the test does not need it> · for the launch spec

## Changes after review
- <change>: <source: walkthrough, challenger or the human> · Decided by: <role>, <date>

## Challenger check
| Element | What the challenger says | Proposal | Decided |
|---|---|---|---|

## Open points for the human
- <point>: who can answer it · Answer: ____ (human decides; points that touch a sign before the build)

## Build prompt
> Build the variant in discovery/specs/<variant>.md as one file per page it changes in
> site/variants/<variant>/, named like the page it replaces (inquiry.html, formats.html),
> and add the name to "variants" in site/config.json. Do not set "shipped".
> Build on the design system in site/styles.css: its components and tokens, no own colours,
> spacing values or button looks (.claude/rules/design-system.md).
> Build only what the spec names. Where the spec says an element is faked, do not wire it up.
```

## Output template, mode `launch`

```markdown
# Launch spec: <variant>

> Launch spec drafted by an agent (`loopwise-variant-spec`, mode `launch`) on <YYYY-MM-DD>, before the variant ships. Not a decision: open points stay open for a human.
> **Kit:** prototype [site/variants/<variant>/<page>.html](../../site/variants/<variant>/<page>.html) · intent [discovery/intents/<opportunity>.md](../intents/<opportunity>.md) · this launch spec
> **Rests on:** launch card [discovery/test-cards/<variant>.md](../test-cards/<variant>.md) · learning card [discovery/decisions/<nnn>-<variant>.md](../decisions/<nnn>-<variant>.md) · learn spec [discovery/specs/<variant>.md](<variant>.md)
> **Label:** <synthetic or composite, repeated from the material the intent rests on>

<one line per product term on first use, as CLAUDE.md asks>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## Kit
- Prototype: <a link to every file in site/variants/<variant>/, and the page visitors start on>
- Intent: <link, and the idea it comes from, quoted with its line>
- The prototype is the reference for everything visible. This file holds only what it does not show.

## Non-functional requirements
- **<requirement>:** <what must hold, and why> (<source link> or [assumption: ...])

## Decisions taken
- **<decision>:** <why> (<source link: discovery/decisions/, the launch card or the learning card>)

## Events
| Event | When it fires | Props | Feeds (launch card line) |
|---|---|---|---|

## Invisible behaviour
- **States:** <...>
- **Errors:** <...>
- **Edge cases:** <...>
- **Data:** <what is stored, where, who may read it>
- **Legal:** no price on the site (<link to product/constraints.md:7>). <the release gates the hardened page must pass>

## Open points
- <point> · who confirms: <role> · Answer: ____ (human decides before launch)

**Prototype check:** <date>, a fresh subagent read only the prototype and the draft. Lines listed: <n> · cut: <n> · shortened: <n>.
```
