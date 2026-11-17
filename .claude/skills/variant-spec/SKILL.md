---
name: variant-spec
description: Write the spec for one variant so Claude Code can build it, in one of two modes. "learn" (the default) writes the smallest page that tests the critical assumption on the prototype card, ends with a challenger run by a subagent that hunts for bloat, and leaves everything else out. "launch" writes the full page for the release, after the launch card, with events, every way in, fallbacks and edge cases. Use as "/variant-spec <variant>" or "/variant-spec <variant> learn" after "/test-card <variant> prototype", and "/variant-spec <variant> launch" after "/test-card <variant> launch". Use when the team says "write the spec", "spec this variant", or "what exactly do we build for <variant>". Writes one file per variant and mode; never chooses variants and never builds.
---

# Spec

**Input:** one variant name and a mode, `learn` or `launch`. No mode means `learn`. The name must match "Variant name" in the intent's "Selection (human)". If no name is given, ask. If the card for the mode is missing, say which and stop.

| Mode | When | Card it rests on | Goal | Writes |
|---|---|---|---|---|
| `learn` | after `test-card <variant> prototype`, before the prototype build | `discovery/test-cards/<variant>-prototype.md` | the smallest page on which a tester meets the critical assumption and the watcher sees every sign | `discovery/specs/<variant>.md` |
| `launch` | after `test-card <variant> launch`, before the variant ships | `discovery/test-cards/<variant>.md` | the full page for real visitors, measured by the launch card | `discovery/specs/<variant>-launch.md` |

**Reads, both modes:** the card for the mode; `discovery/intents/<opportunity>.md` (the idea and its assumptions); the pages the idea changes in `site/` and `site/components/` (what they do today); `site/formats.html` (the formats a page may name); `product/constraints.md`; `product/personas/`; `sources/` where the variant needs wording from the material.
**Reads, mode `launch` also:** `discovery/specs/<variant>.md` (the learn spec), `discovery/decisions/002-<variant>.md` (the learning card), and `discovery/user-tests/` for this variant.

A spec is the hand-over to the build: precise enough that Claude Code can build the page from this file alone.

**Mode `learn` builds to learn, not to ship.** The page exists to test one critical assumption with a few testers. A critical assumption is the one thing that must be true for the idea to work. Every element on the page must serve that assumption or a sign on the prototype card. Everything else is left out and listed as such. When in doubt, leave it out: the launch spec can add it later.

## Rules, both modes

- **Try first, then compare.** Before you draft, ask the human. In `learn`: "What is the smallest page that lets a tester hit the assumption?" In `launch`: "What does the page need beyond the prototype before real visitors see it?" Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the first try.** After drafting, tell the human in two or three short lines how strong their answer was: what was good, what was weak, and why. Judge it against the mode. In `learn`: is it the smallest page, or a full feature? Does it let a tester meet the assumption? Can the watcher see every sign on it? In `launch`: does it cover what the launch card measures? Name their words. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the same lines under "Feedback" in "Your first try".
- **Every claim quotes its source with location** (file and line). No quote, no claim. Each citation is a Markdown link: `[<file>:<line>](<path from this file>#L<line>)` (`.claude/rules/writing.md`, "Citations are links").
- **Do not invent numbers.** No targets, no thresholds, no expected rates; those belong in the test card.
- **No line on the page says what a go-on sign listens for.** A tester who reads such a line back shows nothing.
- **Name what changes on the page by mechanism:** fields, order, wording, what happens on submit.
- **A page may keep the form, change it, or replace it.** A page that books a call instead of sending an inquiry logs `scoping_call_booked` (`site/components/events.js:8`) and sends nothing to `/api/inquiry`; the rule on fields then does not apply. The spec says which of the two the page does.
- **If the page sends an inquiry, fields go to the server as top-level scalars** (string, number, boolean) in the `POST /api/inquiry` body. The server stores any such field by rule (at most 20, strings up to 300 characters) and drops objects and arrays. It cuts a longer string without a warning, so every new text field gets `maxlength="300"`. Name every field. Core validation still applies on top: name, company, a valid email, and `message` of at least 10 characters (`site/components/inquiry-form.js:4`). An inquiry that drops one of these fails on send, so a page that sends one keeps all four. The message field may get a new label, or be filled from what the buyer ticks or types: text built from the buyer's own choices counts as their answer. Never fill it with fixed text that is the same whatever the buyer does: every record would carry the same fake answer. Every new field sits inside the `<form>` element, or it is not sent.
- **After the send.** The page redirects to `/confirmation.html`, which says the academy gets in touch "within a few days" to book a scoping call. If the variant promises something else (a call back, a time), say so under "Open points for the human".
- **Where it lives:** a variant can replace any page (`README.md:68`). It holds one file per page it changes, named like the page: `site/variants/<variant>/inquiry.html`, `formats.html`, or `index.html` for home. Each is served at `/<page>?variant=<variant>` once the name is listed under `variants` in `site/config.json`. Pages the variant does not hold stay the baseline, and the server keeps `?variant=` on links between pages. Do not set `shipped`; that is a human decision after the launch card. The spec names every page it changes and the page the tester or visitor starts on.
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

- **Every element earns its place.** For each element on the page, name the sign or the part of the assumption it serves. An element that serves neither is left out.
- **One way in.** The page the prototype card names as the start page. A second page or a second way in only if the assumption needs it.
- **The happy path only.** No edge-case rules a tester is unlikely to hit (group splits, limits, rare combinations). No fallbacks for browser features beyond one sentence. If the build needs a fallback to work at all, say it in one line.
- **Fake what the test does not need to work.** A button the watcher only needs to see pressed may do nothing more than show a short reply. Say so in the spec, so the build does not wire it up.
- **No events and no hidden fields.** The prototype test does not read events; the watcher reads the page. Leave out the section "Events to emit" and any field that only feeds events. The site's existing events keep firing as today.
- **The rule behind a result stays as simple as the test allows.** A tester needs a result that plausibly fits their group. They do not need every case covered.
- **Every sign on the prototype card needs something on the page.** For each sign, name the element where the watcher can see it, and check it can happen on the path the tester takes. If a sign has no element, say so under "Open points for the human".
- **Changes from a persona walkthrough or a review** go in only if they touch a sign or the assumption. A change that only a persona type without testers backs goes to "Left out to learn faster", for the launch spec.
- **Challenger run at the end.** After the draft, start a subagent (the Agent tool, a fresh agent with no conversation context). Give it only the prototype card and the draft spec, and this brief: "This spec is for a prototype test of one critical assumption, not for a release. For every element, rule, field and section, say which sign on the card or which part of the assumption it serves. List everything that serves neither, every second path to the same sign, every edge case a tester is unlikely to hit, and every part the build could fake. Do not propose new features. Quote the spec line for each finding." Do not give it your own view of the spec.
- **The human decides on the challenger's findings.** Show them as a table: element, what the challenger says, your proposal (cut, simplify, keep) with the reason. Apply only what the human agrees to. Record the run and the decision under "Challenger check".

## Rules, mode `launch`

- **Start from the learn spec and the learning card.** Keep what the prototype test showed works. Name what changed after the test, with its source in the learning card.
- **Cover what real visitors meet:** every way in the idea names, the paths a visitor may take, fallbacks for browser features, edge cases the rule must handle, and every item left out in the learn spec. For each item left out in the learn spec, say whether it now goes in, and why.
- **Events come from this list only:** `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. For each, say when it fires, which props it carries, and which line of the launch card it measures: the proxy metric, the counter metric, the kill criterion or the success line. If the launch card needs something no event covers, say so under "What we cannot see".
- **Invented lines need a confirmer before launch.** Every invented line names who confirmed it, or stays an open point.

## Steps

0. **Try first.** Ask the human the question for the mode (see Rules). Wait for the answer before you read further or draft anything.
1. Read the card for the mode: the assumption, the scenario and the signs, or the launch lines. Then the intent and its "Selection (human)". Confirm the variant name and which idea it comes from. In `launch`, also read the learn spec, the learning card and the walkthroughs.
2. Read the current pages the idea changes and their components, so the spec says what changes against today and what stays.
3. Draft the spec with the template for the mode. Show the human the section "What changes on the page" and ask them to confirm or change it.
4. Mode `learn` only: **challenger run** (see Rules). Show the findings as a table, ask the human which to apply, apply only those, and record it under "Challenger check". Add its row to the review log and set the stage.
5. Write the file. Give the feedback on the first try (see Rules). Tell the human in three lines what the build needs most and which open point needs their judgement. Say that every open point touching a sign must be answered before the build. Then stop.

## Output template, mode `learn`

```markdown
# Spec: <variant>

> Spec drafted by an agent (`variant-spec`, mode `learn`) on <YYYY-MM-DD>, before the prototype build. Built to learn, not to ship.
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
> Build only what the spec names. Where the spec says an element is faked, do not wire it up.
```

## Output template, mode `launch`

```markdown
# Spec: <variant>, launch

> Spec drafted by an agent (`variant-spec`, mode `launch`) on <YYYY-MM-DD>, before the variant ships.
> **Variant:** `<variant>` · Pages it changes: <page files> · Visitors start at <pages>
> **Launch card:** [discovery/test-cards/<variant>.md](../test-cards/<variant>.md) · **Learn spec:** [discovery/specs/<variant>.md](<variant>.md) · **Learning card:** [discovery/decisions/002-<variant>.md](../decisions/002-<variant>.md)
> **Label:** <synthetic or composite, repeated from the material the intent rests on>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## What changed since the prototype
- <change>: <source in the learning card or a walkthrough>

## What changes on the page
<every way in and every path, step by step>

## Fields and validation
| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|

## Events to emit
| Event | When it fires | Props | Measures (line of the launch card) |
|---|---|---|---|

## What stays the same
- <...>

## Critical assumptions it rests on
- <assumption from the intent or the launch card, quoted with its level>

## What we cannot see
- <what this variant changes that no event measures>

## Invented lines on the page
| Line the buyer sees | Confirmed by |
|---|---|

## Left out in the learn spec, now
| Element | Goes in now? | Why |
|---|---|---|

## Out of scope
- <...>

## Open points for the human
- <point>: who can answer it · Answer: ____ (human decides before launch)

## Build prompt
> Build the variant in discovery/specs/<variant>-launch.md as one file per page it changes in
> site/variants/<variant>/, named like the page it replaces (inquiry.html, formats.html),
> replacing the prototype files, and keep the name in "variants" in site/config.json.
> Do not set "shipped".
```
