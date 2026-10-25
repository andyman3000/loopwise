---
name: variant-spec
description: Write the spec for the one variant whose prototype test card exists, covering only what the prototype test needs, so Claude Code can build it. Use after "/test-card <variant> prototype", when the team says "write the spec", "spec this variant", or "what exactly do we build for <variant>". Input is one variant name. Writes one file per variant; never chooses variants and never builds.
---

# Spec

**When:** after `test-card` in prototype mode has written `discovery/test-cards/<variant>-prototype.md`. Before the build.
**Input:** one variant name. It must match "Variant name" in the intent's "Selection (human)" and have a prototype card. If no name is given, ask. If either is missing, say which and stop.
**Reads:** `discovery/test-cards/<variant>-prototype.md` (the assumption, the scenario, the signs); `discovery/intents/<opportunity>.md` (the idea and its assumptions); `site/inquiry.html` and `site/components/` (what the page does today); `site/formats.html` (the formats a page may name); `product/constraints.md`; `product/personas/`; `sources/` where the variant needs wording from the material.
**Writes:** `discovery/specs/<variant>.md`.

A spec is the hand-over to the build: precise enough that Claude Code can build the page from this file alone. **It covers only what the prototype test needs**: the smallest page on which a tester can meet the assumption and the watcher can see the signs. Everything else is out of scope and listed as such.

## Rules

- **Try first, then compare.** Before you draft, ask the human: "What is the smallest page that lets a tester hit the assumption?" Wait for the answer and never invent it. A vague reply ("go on", "ok") is not an answer: ask once more, and if it stays vague, write "skipped". After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Every claim quotes its source with location** (file and line). No quote, no claim.
- **Do not invent numbers.** No targets, no thresholds, no expected rates; those belong in the test card.
- **No line on the page says what a go-on sign listens for.** A tester who reads such a line back shows nothing.
- **Every sign on the prototype card needs something on the page.** For each sign, name the element where the watcher can see it, and check it can happen on every path through the page. If a sign has no element, or a path skips it, say so under "Open points for the human".
- **Name what changes on the page by mechanism:** fields, order, wording, what happens on submit.
- **Events come from this list only:** `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. For each, say when it fires and which props it carries. The prototype test does not read them; they are there for a later launch. If the variant needs something no event covers, say so under "What we cannot see".
- **Fields go to the server as top-level scalars** (string, number, boolean) in the `POST /api/inquiry` body. The server stores any such field by rule (at most 20, strings up to 300 characters) and drops objects and arrays. Name every field. Core validation still applies on top: name, company, a valid email, and `message` of at least 10 characters (`site/components/inquiry-form.js:4`). A page that drops one of these fails on send, so keep all four. The message field may get a new label, or be filled from what the sponsor ticks or types. Never fill it with fixed text the sponsor did not write: every record would carry the same fake answer.
- **After the send.** The page redirects to `/confirmation.html`, which says the academy gets in touch "within a few days" to book a scoping call. If the variant promises something else (a call back, a time), say so under "Open points for the human".
- **Where it lives:** the page is `site/variants/<variant>/index.html`, served at `/inquiry?variant=<variant>` once the name is listed under `variants` in `site/config.json`. Do not set `shipped`; that is a human decision after the launch card. A page copied from `site/inquiry.html` keeps its nav; the nav link "Inquiry" must point to `/inquiry?variant=<variant>`, or a tester who clicks it lands on the baseline form.
- **Wording shown to sponsors that comes from the material is marked** with its source, and any invented line is marked as invented. List every invented line in the section "Invented lines on the page": the test card in launch mode reads it. Wording adapted from a source is written as the label, then "adapted from `<file>:<line>`", without quote marks around the label: `npm run check` reads a quote followed by a citation as word for word.
- Respect `product/constraints.md`. If the idea and a constraint disagree, name the conflict and stop at that point; do not resolve it.
- **This file is a spec drafted by an agent.** The human reads it before the build. Open points stay open.

## Steps

0. **Try first.** Ask the human: "What is the smallest page that lets a tester hit the assumption?" Wait for the answer before you read further or draft anything.
1. Read the prototype card: the assumption, the scenario, the signs. Then the intent and its "Selection (human)". Confirm the variant name and which idea it comes from.
2. Read the current inquiry page and its components, so the spec says what changes against today and what stays.
3. Draft the spec with the template below. Show the human the section "What changes on the page" and ask them to confirm or change it.
4. Write the file. Tell the human in three lines what the build needs most, which open point needs their judgement, and that the next step is `/persona-walkthrough <variant> spec`. Say that every open point touching a sign must be answered before the build.

## Output template

```markdown
# Spec: <variant>

> Spec drafted by an agent (`variant-spec`) on <YYYY-MM-DD>, before the build.
> **Variant:** `<variant>`, served at `/inquiry?variant=<variant>`
> **Idea:** <I-number> in `discovery/intents/<opportunity>.md` ("<idea line, quoted>")
> **Assumption under test:** "<quoted>" (`discovery/test-cards/<variant>-prototype.md:<line>`)
> **Label:** <synthetic or composite, repeated from the material the intent rests on>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## What changes on the page
<step by step, what the sponsor sees and does, in order>

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|

## Fields and validation
| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|

## Events to emit
| Event | When it fires | Props |
|---|---|---|

## What stays the same
- <...>

## Critical assumptions it rests on
- <assumption from the intent, quoted with its level>

## What we cannot see
- <what this variant changes that no event measures>

## Invented lines on the page
| Line the sponsor sees | Who could confirm it |
|---|---|

## Out of scope for the prototype
- <...>

## Open points for the human
- <point>: who can answer it · Answer: ____ (human decides; points that touch a sign before the build)

## Build prompt
> Build the variant in discovery/specs/<variant>.md as site/variants/<variant>/index.html
> and add the name to "variants" in site/config.json. Do not set "shipped".
```
