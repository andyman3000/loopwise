---
name: loopwise-factory
description: Build to earn. Rebuilds one variant's prototype for production into site/hardened/<variant>/ from the handover kit (prototype, intent, launch spec), on the design system, with the launch spec's events wired up. Checks its clean build with the release gates, then plants one error on purpose and runs `npm run check` in the open, so the pair sees a gate fire and heals it. A fresh review subagent reads the diff. Use as "/loopwise-factory <variant> run-1" (plants a design error), "/loopwise-factory <variant> run-2" (plants a price) or "/loopwise-factory <variant> retro" (writes the retro file). Writes site/hardened/<variant>/ and discovery/factory/. Never decides at a gate: never writes a waiver or a release decision.
---

# Factory

**Input:** a variant name and a mode. If either is missing, ask.

Before anything is built, the validation gate checks that the product lead decided launch for the variant (hard, owner: product lead). No launch decision, no factory run.

| Mode | The factory plants | The gate that should fire | Owner role |
|---|---|---|---|
| `run-1` | one design error | design gate (soft) | designer |
| `run-2` | one price on the page | legal gate (hard) | legal |
| `retro` | nothing | none | the pair |

The prototype in `site/variants/<variant>/` was built to learn: fast, for a test with a few people.
The factory builds to earn: the same page, fit for real visitors, in `site/hardened/<variant>/`.
The factory runs in the open. People decide at the gates. The factory never decides at a gate.

**Say this first, word for word:** "The factory runs in the open. In each run it plants one error on purpose and does not tell you which. The gate should find it. If the gate stays green, note that for the retro."

## What the factory reads
The handover kit:
- the prototype: every file in `site/variants/<variant>/`
- the launch spec: `discovery/specs/<variant>-launch.md`. If it is missing, say "The launch spec discovery/specs/<variant>-launch.md is missing, so the kit is not complete. The factory stops." Then stop.
- the intent: the file in `discovery/intents/` that the launch spec links to

And what the build plugs into: `site/styles.css`, `.claude/rules/design-system.md`, `site/components/`, the page routing and the API routes in `server.js` (`/api/inquiry`, `/api/booking`, `/api/events`), `site/config.json`. Also its own questions file in `discovery/factory/`, if one exists.

Never read `gates/`, `discovery/test-cards/`, or any other file in `discovery/`. You may list the file names in `discovery/decisions/`, to name the next free number, but never open them. If the build needs a rule the kit does not state, that is a question (below), not a reason to look elsewhere.

## Rules
- **Write only in `site/hardened/<variant>/` and `discovery/factory/`.** Use the prototype's page file names. Change no other file: not the prototype, `site/styles.css`, `server.js` or `site/config.json`. If the build needs a change elsewhere (an endpoint, a shared component, a new token), write a question.
- **Design system only** (`.claude/rules/design-system.md`). Link `/styles.css` and build from its components and tokens. Page layout classes use tokens for colour, spacing and radius, and never restyle a component or a native control. Width and height are layout, not spacing. Every button has the class `button`, also a button a script creates. A chosen day in a calendar is a `button secondary` with `aria-pressed="true"`. A time from a short list is a native radio button in a `fieldset` with a `legend`. The prototype may break these rules. The hardened build does not.
- **Nothing faked.** Wire up each part the prototype fakes, as the launch spec says. If the launch spec does not say how, write a question and build the closest honest version meanwhile. Keep what the prototype shows when the kit leaves open whether someone keeps its promise (a phone number, a mail after a booking): keep the element, write the question, and name it in the hand-over as a point the product lead answers before the release. Remove only a promise the kit says nobody keeps.
- **Events as the launch spec names them.** Wire every event in the launch spec's event table: same name, same moment, same props. Names come only from `EVENT_TYPES` in `site/components/events.js` and stay the same as in the prototype. Pass the variant name in every `logEvent` call and to `initInquiryForm`, so events carry it once the variant ships and the URL has no `?variant=`. Add no event the launch spec does not name.
- **Wording from the kit.** A line a buyer reads comes from the prototype or the launch spec. A new line the page needs goes into the questions file, with who should confirm it.
- **Ask, do not guess.** Where the kit leaves a question open, write it in the questions file and go on with the most cautious choice. Tell the pair the question in one line. Do not wait for an answer: the questions feed the retro.
- **No line numbers for files in `site/` inside `discovery/factory/`.** The build changes during the run, and `npm run check` checks every `file:line` in `discovery/`. Name the file and the place in words. Lines of the launch spec or the intent may be cited as links, as `.claude/rules/writing.md` says.
- **Never decide at a gate.** Never write a waiver, a release decision or a "Decided by" line. Never change `shipped` in `site/config.json`. Never say which error you planted, before or after, and never mark it in the code.
- Plain English (`.claude/rules/writing.md`). Before each step, say in one line what you do now.

## Steps, modes `run-1` and `run-2`
1. **Frame.** Say the sentence above. First run the entry check in the open: `node scripts/check-gates.js --entry <variant>`. It passes only if the product lead decided launch for the variant in `discovery/decisions/`. If it fails, show its lines as they are, say that the variant has not proved itself yet and build to earn waits for the product lead, and stop. Do not build, and never write the launch decision yourself. Only after it passes, check that the kit is complete.
2. **Read** the kit and the files the build plugs into. Note where the kit is silent.
3. **Build** `site/hardened/<variant>/`. If the folder exists from an earlier run, say so and replace it: each run builds from the kit. Write each open question as you meet it.
4. **Check your clean build quietly.** Run `node scripts/check-gates.js --json` without showing the output. Read only the findings whose `variant` is `<variant>`. Fix your build until it has no findings in either gate. Do not open the rule files the output names.
5. **Plant one error**, by the mode, where a visitor sees it. It looks like a normal part of the page.
   - `run-1`: a call-to-action that does not match the design system. It has its own look, written as raw values instead of tokens: a hex background colour, its own radius and padding. It is not a `.button`.
   - `run-2`: a price, sold as a strong selling point next to the main action. For example: From € 1,900 per team: book this week.
6. **Run `npm run check` in the open.** Show the gate lines as they are, without a summary.
7. **Review.** Run `git diff --no-index site/variants/<variant> site/hardened/<variant>`. Start a subagent (the Agent tool, a fresh agent with no context). Give it only that diff, the absolute path of the repo root, and this brief: "You review a production rebuild of one web page. The diff below goes from the prototype (site/variants/<variant>/) to the hardened build (site/hardened/<variant>/). Read only this diff. Write discovery/factory/<variant>-review-run-<n>.md with the title '# Review, run <n>: <variant>', the line '> Written by a review subagent that read only the diff. It blocks nothing and decides nothing.', and three sections: What changed; Risks; Anything that looks off. Plain English, sentences under 15 words. Name files and places in words, never a file with a line number. Copy no price or amount into the report; describe it in words. No em or en dashes." Do not give it your own view. Tell the pair: "The review blocks nothing and decides nothing. It is a second pair of eyes. Read it: discovery/factory/<variant>-review-run-<n>.md." The review may name the planted error. That is fine: a person reading the diff may see what a gate sees. The gate still decides whether the build may go on.
8. **Hand over.** For each failing gate, tell the pair:
   - each finding as `npm run check` printed it: file, line, rule
   - the owner role: the designer for the design gate, legal for the legal gate
   - the options. Design gate, soft: fix it, or the designer writes a waiver. The designer copies `.claude/skills/loopwise-factory/waiver-template.md` to `discovery/decisions/<next number>-design-waiver-<variant>.md` and fills it in. Name the next free number. Legal gate, hard: fix it. No waiver counts, not even one from legal.

   If an open question means the page promises what no one delivers, say so: the product lead answers it before the release.
   Then say: "Tell me what to fix, or fix it yourself. Then run npm run check again. See the build with npm start at http://localhost:3000/<page>?variant=<variant>&build=hardened." When the pair asks for a fix, change only what the finding or the pair names, and run `npm run check` again.
9. **Release step.**
   - `run-1`: once the gate is fixed or waived, run `npm run release -- <variant> --dry-run`. It lists what the release still waits for, with the owner role. The release itself comes in run 2.
   - `run-2`: once both gates allow it, the product lead decides. They copy `.claude/skills/loopwise-factory/release-decision-template.md` to `discovery/decisions/<next number>-release-<variant>.md` and fill it in themselves. Name the next free number. Then `npm run release -- <variant>`. It sets `shipped` in `site/config.json` only if the legal gate passes, the design gate passes or is waived, and the decision exists. Nothing is deployed anywhere: the release is that one key on localhost. Then ask: "Shall I write the retro file now? (/loopwise-factory <variant> retro)"

## Questions file
`discovery/factory/<variant>-questions.md`. Create it in the first run. In a later run, add a section and do not repeat a question. If a question has an answer, follow it and say so.

```markdown
# Factory questions: <variant>

> Written by the loopwise-factory skill. Each question is one the handover kit left open. The factory did not guess.
> Kit: [site/variants/<variant>/<page>.html](../../site/variants/<variant>/<page>.html), [discovery/intents/<opportunity>.md](../intents/<opportunity>.md), [discovery/specs/<variant>-launch.md](../specs/<variant>-launch.md)
> Label: <repeated from the launch spec>

## Run <n>, <YYYY-MM-DD>

### <the question, one sentence>
- Where the kit is silent: <the kit file, with a line link where the gap shows>
- Meanwhile the factory: <what it built instead, one sentence>
- Who should answer: <a role: product lead, designer, legal, someone who runs scoping calls, developer>
- Answer: ____
```

## Mode `retro`
Reads the questions file, the review reports in `discovery/factory/`, and only those files in `discovery/decisions/` whose names contain `waiver`, `release` or `launch` and that name the variant.
1. Copy `.claude/skills/loopwise-factory/retro-template.md` to `discovery/factory/<variant>-retro.md`. Say the file name first.
2. Prefill question 3 with the waiver and release files found, as links. Prefill question 4 with each question from the questions file, without quote marks, and a link to its heading line.
3. Ask the pair the four questions, one at a time. Write their answers word for word. A skipped answer stays `____`.
4. Do not say which errors were planted. The pair knows what the gates caught.
