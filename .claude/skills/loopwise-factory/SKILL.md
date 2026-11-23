---
name: loopwise-factory
description: Build to earn. Rebuilds one variant's prototype for production into site/hardened/<variant>/ from the handover kit (prototype, intent, launch spec), on the design system, with the launch spec's events wired up. Checks its clean build with the release gates, then plants one error on purpose, so the pair sees where the system catches it. The guard (a check in .claude/settings.json that Claude Code runs before and after each write) flags a design error right after the write. The factory stops so the pair can look, fixes it, and explains how the check works. The guard refuses a price before the write. The factory stops there too, and explains. Then `npm run check` runs in the open, and a fresh review subagent reads the diff. In run 2 the product lead approves the release at the permission prompt of `npm run release`. Use as "/loopwise-factory <variant> run-1", "/loopwise-factory <variant> run-2" or "/loopwise-factory <variant> retro" (writes the retro file). Writes site/hardened/<variant>/ and discovery/factory/. Never decides at a gate: never writes a waiver or a release decision, and never puts --approved-by in a command before the product lead said yes.
---

# Factory

**Input:** a variant name and a mode (`run-1`, `run-2`, `retro`). If either is missing, ask (`.claude/rules/guiding.md`, "One question, at the end").

Before anything is built, the validation gate checks that the product lead decided launch for the variant (hard, owner: product lead). No launch decision, no factory run.

| Mode | The factory plants | The gate that should fire | Owner role |
|---|---|---|---|
| `run-1` | one design error | design gate (soft) | designer |
| `run-2` | one price on the page | legal gate (hard) | legal |
| `retro` | nothing | none | the pair |

The prototype in `site/variants/<variant>/` was built to learn: fast, for a test with a few people.
The factory builds to earn: the same page, fit for real visitors, in `site/hardened/<variant>/`.
The factory runs in the open. People decide at the gates. The factory never decides at a gate.

## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the pair writes in. Show first, by mode:
- `run-1`: **Where:** Factory run 1: build to earn. The factory rebuilds the prototype for real visitors, and the gates check it. **You end with:** `site/hardened/<variant>/`, at http://localhost:<port>/inquiry.html?variant=<variant>&build=hardened, and `npm run check` green after the system caught the planted error. **Time:** about 20 minutes. It stops after about 5, so you can look at what the system caught.
- `run-2`: **Where:** Factory run 2: a second build, the legal gate, the release. **You end with:** a build the design gate and the legal gate pass, and the product lead's release or hold. On a release, `npm run release` writes the record in `discovery/decisions/`. **Time:** about 22 minutes. It stops after about 5, so you can look at what the system refused.
- `retro`: **Where:** Factory run 2: the retro, four questions. **You end with:** `discovery/factory/<variant>-retro.md` with your answers. **Time:** about 12 minutes.

In that same message, say in one line what a gate is, and in run 1 what a waiver is (`.claude/rules/guiding.md`, "Terms"). Say once what the guard is: a check in `.claude/settings.json` that Claude Code runs before and after each write. Before every decision the pair takes, say who decides (the role), how long, and what a good answer looks like. End each step with "Done: <what>. Next: <what the pair does now>."

**At the end, in setting `workshop`:** the Next and Time lines follow `.claude/rules/guiding.md`, "At the end of the skill", not the lines this skill names below. Stop; name no next skill, no command to type and no block.

**In `run-1` and `run-2`, say this first, word for word, in your first message that ends with a question, right after the three lines:** "The factory runs in the open. In each run it plants one error on purpose and does not tell you which. The gate should find it. If the gate stays green, note that for the retro."

## What the factory reads
The handover kit:
- the prototype: every file in `site/variants/<variant>/`
- the launch spec: `discovery/specs/<variant>-launch.md`. If it is missing, say "The launch spec discovery/specs/<variant>-launch.md is missing, so the kit is not complete. The factory stops." Then stop.
- the intent: the file in `discovery/intents/` that the launch spec links to

And what the build plugs into: `site/styles.css`, `.claude/rules/design-system.md`, `site/components/`, the page routing and the API routes in `server.js` (`/api/inquiry`, `/api/booking`, `/api/events`), `site/config.json`. Also its own questions file in `discovery/factory/`, if one exists.

Never read `gates/`, `discovery/test-cards/`, or any other file in `discovery/`, with one exception: in run 2, step 9, after the build, read the success line of `discovery/test-cards/<variant>.md` and the intent's "Desired outcome", to show them side by side. You may list the file names in `discovery/decisions/`, to name the next free number, but never open them. If the build needs a rule the kit does not state, that is a question (below), not a reason to look elsewhere.

## Rules
- **Write only in `site/hardened/<variant>/` and `discovery/factory/`.** Use the prototype's page file names. Change no other file: not the prototype, `site/styles.css`, `server.js` or `site/config.json`. The factory never changes `site/styles.css`. A change to the design system is the designer's, outside the run. The guard asks before any change to it. If the build needs a change elsewhere (an endpoint, a shared component, a new token), write a question.
- **Design system only** (`.claude/rules/design-system.md`). Link `/styles.css` and build from its components and tokens. Page layout classes use tokens for colour, spacing and radius, and never restyle a component or a native control. Width and height are layout, not spacing. Every button has the class `button`, also a button a script creates. A chosen day in a calendar is a `button secondary` with `aria-pressed="true"`. A time from a short list is a native radio button in a `fieldset` with a `legend`. The prototype may break these rules. The hardened build does not.
- **Nothing faked.** Wire up each part the prototype fakes, as the launch spec says. If the launch spec does not say how, write a question and build the closest honest version meanwhile. Keep what the prototype shows when the kit leaves open whether someone keeps its promise (a phone number, a mail after a booking): keep the element, write the question, and name it in step 8 as a point the product lead answers before the release. Remove only a promise the kit says nobody keeps.
- **Events as the launch spec names them.** Wire every event in the launch spec's event table: same name, same moment, same props. Names come only from `EVENT_TYPES` in `site/components/events.js` and stay the same as in the prototype. Pass the variant name in every `logEvent` call and to `initInquiryForm`, so events carry it once the variant ships and the URL has no `?variant=`. Add no event the launch spec does not name.
- **Wording from the kit.** A line a buyer reads comes from the prototype or the launch spec. A new line the page needs goes into the questions file, with who should confirm it.
- **Ask, do not guess.** Where the kit leaves a question open, write it in the questions file and go on with the most cautious choice. Tell the pair the question in one line. Do not wait for an answer: the questions feed the retro.
- **No line numbers for files in `site/` inside `discovery/factory/`.** The build changes during the run, and `npm run check` checks every `file:line` in `discovery/`. Name the file and the place in words. Lines of the launch spec or the intent may be cited as links, as `.claude/rules/writing.md` says.
- **Never decide at a gate.** Never write a waiver, a release decision or a "Decided by" line. Never put `--approved-by` in a command before the product lead said yes in chat, with their name. Never change `shipped` in `site/config.json`. Never say which error you planted before the guard shows it, and never mark it in the code.
- **When the guard refuses a write or flags a finding, show its lines as they are,** without a summary. Do not try another way: no other tool, no other path, no split of the text.
- **Start no server and open no browser.** The site runs since the onboarding. The pair opens the page.
- Plain words (`.claude/rules/writing.md`), in the language the pair writes in. Before each step, say in one line what you do now. Run each command this skill names alone and as written, without pipes or chains, so the allow list covers it and the pair sees its whole output.

## Steps, modes `run-1` and `run-2`
1. **Frame.** Say the sentence above. First run the entry check in the open: `node scripts/check-gates.js --entry <variant>`. It passes only if the product lead decided launch for the variant in `discovery/decisions/`. If it fails, show its lines as they are, say that the variant has not proved itself yet and build to earn waits for the product lead, and stop. Do not build, and never write the launch decision yourself. After it passes, give the role task, about 2 minutes. In `run-1` the designer reads `gates/policies/design-system.md`. In `run-2` legal reads `gates/policies/no-prices.md`. The pair reads the policy. The site does not serve `gates/`: give the path, not a link. They open it in the app's file view, an editor or a terminal. The factory still never opens `gates/`. Ask, in these words: "In one sentence: what will the system catch?" A good answer names one thing the rule forbids. Keep the answer word for word. Say in one line, in these words: "Noted. I do not read the rule and I do not judge your sentence yet. After the run you see it next to what the system caught." Then check on disk, never from memory, that the kit is complete and that `git status --short discovery/specs` is empty. If the launch spec is changed, ask: "Your draft or the reference?"
2. **Read** the kit and the files the build plugs into. Note where the kit is silent.
3. **Build** `site/hardened/<variant>/`. If the folder exists from an earlier run, print one line before the first write: "I replace the earlier build: each run builds from the kit." Then replace it. Write each open question as you meet it.
4. **Check your clean build quietly.** Run `node scripts/check-gates.js --json` without showing the output. Read only the findings whose `variant` is `<variant>`. Fix your build until it has no findings in either gate. Do not open the rule files the output names.
5. **Plant one error**, by the mode, where a visitor sees it. It looks like a normal part of the page.
   - `run-1`: a call-to-action that does not match the design system. Take a button the page already has with the class `button`. Take its class away and give it its own look in a `style` attribute: a hex background colour, its own radius and padding, as raw values. Change nothing else in that line, so the fix gives back the line as it was.
   - `run-2`: a price, sold as a strong selling point next to the main action. For example: From € 1,900 per team: book this week.

   What happens next, by the mode:
   - `run-1`: the guard flags the finding right after the write. Do not fix it yet, and make no other tool call. Go through steps 5a to 5c. Each ends your turn.

     **5a. Stop and show.** The guard found the error, not you. The message holds, in this order:
     1. "The guard found an error in what I just wrote. I have not fixed it. It is in the page now."
     2. "Look at it: <the hardened page's link>. Reload the page if it is open. Which element does not fit?"
     3. "What I wrote:" and the line of HTML in a code block, as it is in the file.
     4. "What the guard said:" and its lines in a code block, as they are.
     5. "Check it without me. Open a terminal in this folder and run `node scripts/check-gates.js`. It is a script, no AI. Now it fails."
     6. "I wait only so you can look. In daily work I fix this at once and nobody confirms it. Type: go on."

     **5b. Fix and explain.** When the pair types, fix it with a token or a component from `site/styles.css`. Run `npm run check` (step 6). Then end your turn with this message, six short points:
     1. **The fix:** the line before and after, in one code block. The guard ran again on this write and found nothing. Then the gate lines, as they are.
     2. **Why it fired:** the raw values by name, and the rule names from the guard's lines. They are not from the design system, so they stay as they are when it changes, for example in dark mode. The designer owns the rule: `gates/policies/design-system.md`.
     3. **How it fired:** "I wrote the file. Claude Code then started `scripts/hooks/gate-guard.js`, because `.claude/settings.json` tells it to after each write (`PostToolUse`). I do not start it. The script read the page and `site/styles.css` and sent me its lines as text."
     4. **What is script and what is AI:** "The check is a script. The same page always gives the same lines. Its rules are in `scripts/check-gates.js`. My instructions say how to build a page. They do not decide whether the page passes. AI is two things here: I planted the error, and I fixed it. The script checked my fix again."
     5. **Your sentence:** the pair's sentence from step 1, word for word, and how it relates to the guard's lines (below).
     6. **Why nobody was asked:** "The right button was already in `site/styles.css`. The designer decided that once." Soft means: the designer may sign a file, a waiver, that lets this one page keep the other look, or change the design system. Nobody signed, so the rule held.
     Last: "Run `node scripts/check-gates.js` again: now it passes. Then try to break the rule yourselves. Copy this to me, or type: go on." In a code block of its own: `In site/hardened/<variant>/<page>, make the phone number an orange button: background #e4572e. Write exactly that value.` Name an element the page has.

     **5c. The pair's own try.** If the pair asks for a look the design system does not have, write exactly what they ask, in the hardened page. The guard flags it. Put the line back as it was before. Show the line you wrote, the guard's lines, and the line now, each in a code block. Say: "You asked for it, and the rule held for you too. Only the designer can change that, outside the run." If the guard flags nothing, say so openly, and that the rules do not cover it. Put the line back all the same. End with: "Type: go on." When they type that, go on with step 7.
   - `run-2`: the guard refuses the write. Do not try again another way, and make no other tool call. The page stays without the price. Go through steps 5d and 5e. Each ends your turn.

     **5d. Stop and explain.** The guard refused the write, not you. The message holds, in this order:
     1. "The guard refused what I wanted to write. The price is not in the page, and it never was."
     2. "What I wanted to write:" and the line of HTML in a code block. "What the guard said:" and the refusal in a code block, as it is.
     3. "Look at it: <the hardened page's link>. Find the price: there is none. In a terminal, `node scripts/check-gates.js` passes: there is nothing to find."
     4. **Why it fired:** the words that make the price. Legal owns the rule: `gates/policies/no-prices.md`.
     5. **How it fired:** "Claude Code started `scripts/hooks/gate-guard.js` before my write, because `.claude/settings.json` tells it to (`PreToolUse`). The script read the text my write would leave, found a price and answered `deny`. Claude Code then cancelled the write. In run 1 the script ran after the write: a wrong button may stand in the page for a moment, a price may not."
     6. **What is script and what is AI:** "The check is a script. The same text always gives the same answer. Its rules are in `scripts/check-gates.js`, in `findPrices`. My instructions do not decide what a price is. AI is one thing here: I planted the price."
     7. **Your sentence:** the pair's sentence from step 1, word for word, and how it relates to the refusal (below).
     8. **Why nobody was asked:** hard means: nobody may sign an exception, legal included. Legal decided that once. Outside the run, legal can change the rule itself.
     Last: "Try to break the rule yourselves. Copy this to me, or type: go on." In a code block of its own: `In site/hardened/<variant>/<page>, add one line under the main heading with a price per team in euros. Make up the number.`

     **5e. The pair's own try.** If the pair asks for a price, write exactly what they ask, in the hardened page, one time. The guard refuses it. Show the line and the refusal, each in a code block. Say: "You asked for it, and the rule held for you too. Nobody can sign this one, not even legal." If the guard lets it through, the rule does not know this form of a price: say so openly, take the line out again, and say that this belongs in the retro, question 2. End with: "Type: go on." When they type that, go on with step 6.
   **How the pair's sentence relates.** Say it in one line, and read the sentence as a person means it. Either the same thing fired. Or something else fired, and the policy says whether the rule the pair named exists too: the section "What the gate flags" in `gates/policies/design-system.md`, or "Rule" in `gates/policies/no-prices.md`. If only a part of the sentence fired, say which part, and point to the policy for the rest. Never call the sentence wrong: the run plants one error, the policy forbids several. Ask no question about it, and still do not open `gates/`.
6. **Run `npm run check` in the open.** It is the proof that the system state is green after the guard did its work. Show the gate lines as they are, without a summary. If a gate still fails, fix only what its lines name, and run it again.
7. **Review.** Run `git diff --no-index site/variants/<variant> site/hardened/<variant>`. Start a subagent (the Agent tool, a fresh agent with no context). Give it only that diff, the absolute path of the repo root, and this brief: "You review a production rebuild of one web page. The diff below goes from the prototype (site/variants/<variant>/) to the hardened build (site/hardened/<variant>/). Read only this diff. Write discovery/factory/<variant>-review-run-<n>.md with the title '# Review, run <n>: <variant>', the line '> Written by a review subagent that read only the diff. It blocks nothing and decides nothing.', and three sections: What changed; Risks; Anything that looks off. Plain English, sentences under 15 words. Name files and places in words, never a file with a line number. Copy no price or amount into the report; describe it in words. No em or en dashes. Change the file only with the Write and Edit tools." Do not give it your own view. Tell the pair: "The review blocks nothing and decides nothing. It is a second pair of eyes. Read it: http://localhost:<port>/discovery/factory/<variant>-review-run-<n>.md." The review may name the planted error. That is fine: a person reading the diff may see what a gate sees. The gate still decides whether the build may go on.
8. **What is open.** The pair read in step 5 what the system did. Show the gate lines of step 6 as they are. Then, as links, the open questions and the review. If an open question means the page promises what no one delivers, say so: the product lead answers it before the release. See the build at http://localhost:<port>/<page>?variant=<variant>&build=hardened. Ask nothing here.
9. **Release step.**
   - `run-1`: once `npm run check` is green, say: "The next command refuses on purpose. Its red exit code is expected." Then run `npm run release -- <variant> --dry-run` yourself. It lists what the release still waits for, with the owner role. The release itself comes in run 2. Say that the commit saves the files in their branch and nothing leaves the laptop. End with four lines: "Made: the hardened build of <variant>, both gates green." "Look: http://localhost:<port>/inquiry.html?variant=<variant>&build=hardened, next to the prototype at http://localhost:<port>/inquiry.html?variant=<variant>." "Next: say yes and I commit (`npm test && npm run check`, then `git add -A && git commit -m "factory run 1: built, gate healed"`). Then type `/clear`, then `/loopwise-factory <variant> run-2`." "Time: factory run 1 planned 28 minutes in all." Then stop. On yes, run the commit.
   - `run-2`: once both gates pass, the product lead decides. First the product lead reads the build, the review and the questions file, about 5 minutes. The build is at http://localhost:<port>/inquiry.html?variant=<variant>&build=hardened. Then show in one line the launch card's success line and the step the intent's "Desired outcome" names, each quoted with its file and line. If the two name different steps, say so: after the release, the build would be measured on a step the intent does not ask for. This blocks nothing. Then ask: "Release or hold?"
     - On release: if `discovery/.local.json` names more than one person, ask which of the names is the product lead. If it names none, ask for the product lead's name. If the entry check named another product lead, say in one line: that name is fictional, your product lead decides this release. Then ask for one sentence of reason, in these words: "In one sentence, in your words: why may this build go to real visitors now?" About one minute. A good reason names what the build can do for real visitors now. Then say, in one line: "Claude Code now asks for permission. That prompt is the approval, like approving a pull request for production. Only the product lead says yes." Then run `npm run release -- <variant> --approved-by "<name>" --reason "<their words>"`, with their words as they are. It sets `shipped` only if the legal gate passes and the design gate passes or is waived. It writes the release record in `discovery/decisions/` itself and prints its file name. Show its lines as they are. Nothing is deployed anywhere: the release is that one key on localhost.
     - On hold: run nothing. Say that a hold is a decision too. The system records nothing. The pair may note the hold in the retro.

     End with four lines: "Made: a build the design gate and the legal gate pass, and the product lead's release or hold." "Look: http://localhost:<port>/inquiry.html: after a release every visitor gets the hardened page." "Next: type `/clear`, then `/loopwise-factory <variant> retro`." "Time: factory run 2 planned about 22 minutes up to here; the retro takes 13, with the commit."

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
1. With the Write tool, write `discovery/factory/<variant>-retro.md` from `.claude/skills/loopwise-factory/retro-template.md`. Say the file name first.
2. Prefill question 3 with the release record and any waiver files found, as links. Prefill question 4 with each question from the questions file, without quote marks, and a link to its heading line.
3. Ask the pair the four questions, one at a time, about 3 minutes each. Before each, say what a good answer names: question 1, the gate, where it fired, the file and what changed; question 2, something a person saw in the build or a review that no gate checks; question 3, "Whose judgement was in the system, and who was asked live?", and a good answer names, per check, the owner whose rule decided and the one person asked live; question 4, the prefilled questions are shown, so ask only "Which file of the kit should have answered each one?", and a good answer names the prototype, the intent or the launch spec per question, or "none". Write their answers word for word. Do not check them against another file and do not correct them. A skipped answer stays `____`.
4. Do not say which errors were planted. The pair knows what the gates caught.
5. Say that the commit saves the files in their branch and nothing leaves the laptop. End with four lines: "Made: the retro for <variant>." "Look: http://localhost:<port>/discovery/factory/<variant>-retro.md." "Next: say yes and I commit (`npm test && npm run check`, then `git add -A && git commit -m "factory run 2: price refused, product lead decided, retro"`); then back to your company table." "Time: the retro planned 13 minutes, with the commit." On yes, run the commit.
