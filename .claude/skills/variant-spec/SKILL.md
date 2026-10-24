---
name: variant-spec
description: Write the spec for one solution variant the human has chosen, so Claude Code can build it and test-card can draft its card. Use after the intent's selection field names the ideas that become variants, when the team says "write the spec", "spec this variant", or "what exactly do we build for <variant>". Input is one variant name. Writes one file per variant; never chooses variants and never builds.
---

# Spec

**When:** after a human has filled "Ideas that become variants" in `discovery/intents/<opportunity>.md`. Once per variant. Before the build and before `test-card`.
**Input:** one variant name from that selection field. If no name is given, or the name is not in the field, ask.
**Reads:** `discovery/intents/<opportunity>.md` (the idea and its assumptions); `site/inquiry.html` and `site/components/` (what the page does today); `site/formats.html` (the formats a page may name); `product/constraints.md`; `product/personas/`; `sources/` where the variant needs wording from the material.
**Writes:** `discovery/specs/<variant>.md`.

A spec is the hand-over to the build: precise enough that Claude Code can build the page from this file alone, and that `test-card` can find what the variant changes and which events it sends.

## Rules

- **Try first, then compare.** Before you draft, ask the human for which events they would need to see in eight weeks to know whether this variant works. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Every claim quotes its source with location** (file and line or section). No quote, no claim.
- **Do not invent numbers.** No targets, no thresholds, no expected rates; those belong in the test card.
- **Name what changes on the page by mechanism:** fields, order, wording, what happens on submit.
- **Events come from this list only:** `page_view`, `inquiry_started`, `inquiry_step_completed`, `inquiry_submitted`, `success_line_filled`, `scoping_call_booked`, `booking_confirmed`, `followup_answered`. For each, say when it fires and which props it carries. If the variant needs something no event covers, say so under "What we cannot see".
- **Fields go to the server as top-level scalars** (string, number, boolean) in the `POST /api/inquiry` body. The server stores any such field by rule (at most 20, strings up to 300 characters) and drops objects and arrays. Name every field.
- **Where it lives:** the page is `site/variants/<variant>/index.html`, served at `/inquiry?variant=<variant>` once the name is listed under `variants` in `site/config.json`. Do not set `shipped`; that is a human decision after the variant comparison.
- **Wording shown to sponsors that comes from the material is marked** with its source, and any invented example is marked as invented.
- Respect `product/constraints.md`. If the idea and a constraint disagree, name the conflict and stop at that point; do not resolve it.
- **This file is a spec drafted by an agent.** The human reads it before the build. Open points stay open.

## Steps

0. **Try first.** Ask the human for which events they would need to see in eight weeks to know whether this variant works. Wait for the answer before you read further or draft anything.
1. Read the intent and its selection field. Confirm the variant name and which idea it comes from. If the selection field is empty, say so and stop.
2. Read the current inquiry page and its components, so the spec says what changes against today and what stays.
3. Draft the spec with the template below. Show the human the section "What changes on the page" and ask them to confirm or change it.
4. Write the file. Tell the human in three lines what the build needs most, and which open point needs their judgement.

## Output template

```markdown
# Spec: <variant>

> Spec drafted by an agent (`variant-spec`) on <YYYY-MM-DD>, before the build.
> **Variant:** `<variant>`, served at `/inquiry?variant=<variant>`
> **Idea:** <I-number> in `discovery/intents/<opportunity>.md` ("<idea line, quoted>")
> **Selection:** "<selection line, quoted>" (`discovery/intents/<opportunity>.md`, section "Selection (human)")
> **Label:** <synthetic or composite, repeated from the material the intent rests on>

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>

## What changes on the page
<step by step, what the sponsor sees and does, in order>

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

## Out of scope
- <...>

## Open points for the human
- <point>: who can answer it
```
