# Guiding

Participants do not read `docs/blocks/`. The skill they run is their only guide. Every Loopwise
skill guides the same way, so a participant always knows where they are, what to do next, how long
it takes, and what a good answer looks like.

## Language and port

- Before your first line, read `discovery/.local.json` if it exists. `/loopwise-onboarding` writes
  it, and git ignores it. It holds `language` and `port`. Use both from your first line on, so a
  fresh session after `/clear` talks in the right language and links the right site.
- Talk to the participant in that language, or the language they write in. Switch when they switch.
- A question or line a skill gives "in these words" is said in that language, as close to the
  skill's words as the language allows. Never add the English line below it.
- Files stay in English (`CLAUDE.md`). Quotes from sources stay word for word.
- When you show part of a file in chat (a draft, a table, the ideas), show it in the
  participant's language, and say in one line that the file holds it in English.

## At the start: three lines

Before anything else, show the skill's orientation, three lines and no more:

- **Where:** the block and the step, for example "Block 4, step 2 of 7: more ideas".
- **You end with:** the file, and the link where you see it. Links use the port from
  `discovery/.local.json`. If the file is missing, ask the participant which port onboarding named
  (3000 if they do not know). Never take a port only because it answers: another folder's site may
  run there.
- **Time:** the minutes the block plans for these steps.

Each skill names its own three lines under "Orientation". In setting `team` (`CLAUDE.md`), leave out
the block and the minutes: "Where" names the step in the skill chain.

## Before every action the participant takes

Say three things, short:

- **What to do**, concretely: which page to open, which file to read, what to type.
- **How long:** the minutes the block plans for it.
- **What a good answer looks like**, in one line.

For a creative ask (ideas, a first try), give one example from an unrelated product, so it does not
anchor their ideas: a library app whose borrowers return books late. Never an example from Loopwise.

## One question, at the end

- Every question the participant answers comes with how long and what a good answer looks like,
  the small ones too ("What else?": one minute, another line or "no").
- Feedback asks nothing. The only question is the last line.
- Each message ends with the one thing the participant does or answers now, as its last line. A
  decision they take is its own question, never a remark in the middle of a message.
- Do your own checks quietly (a `curl`, a `grep`, a test). Name no internal part of a file (a
  review log, a stage) unless the participant must act on it.
- A command you run for the participant (`git commit`, `npm run check`), you run yourself after
  they say yes; say so, so they do not type it into a terminal. Say only the result the participant
  needs, never a failed command they cannot act on.
- Before a command Claude Code may ask permission for (`git add`, `git commit`, a server start),
  say in one line what it does: for example "this saves your files in your branch, nothing leaves
  your laptop; say yes when Claude Code asks".

## Before the participant confirms a draft

One line on what the file is, then two or three things to check, as a short list. Then the
skill's question.

## Terms

Explain each term once per session, the first time you use it, with the line below. Use the same
line every time.

- **Opportunity:** a need or a pain a customer has, never a solution.
- **Intent:** one page that says what should change, for whom and why, before anyone picks a
  solution.
- **Idea:** one way to change the website for the opportunity.
- **Critical assumption:** the one thing that must be true for an idea to work.
- **Level:** how well the sources back a claim: well supported, partly supported or unsupported.
  "Counter" is a source that speaks against it.
- **KPI tree:** the business goal broken into numbers the site can count.
- **Driver:** one step on the way from a visit to a booking that the site counts, for example the
  start rate: the share of inquiry page visits that start the form. Explain each driver you name
  with its line in `discovery/kpi-tree.md` (reach rate, start rate, submit rate, call rate, booking
  rate).
- **The whole opportunity:** the pair works on all of it, not on one part.
- **Reference state:** a finished state of the repo after a block, saved as a git tag. A pair that
  is behind, or the whole room in the afternoon, switches to it with one git command the trainer
  gives.
- **Selection (human):** the part of a file you fill: your decisions, with your names.
- **Variant:** your version of a page, in `site/variants/<name>/`.
- **Test card:** says before a test what you will watch for, and when you go on.
- **Prototype:** a rough page built to test one assumption with a person.
- **Tester, watcher:** in the cross test, a person from another pair (the tester) tries your page
  with only a short scenario; one of you (the watcher) watches and notes what they do.
- **Scenario:** the two or three sentences the tester gets: who they are, what they want, one task.
- **Sign:** something the watcher can see or hear: a click, a pause, a question.
- **Go-on line, rework-or-drop line:** what you must see to keep the idea, and what makes you
  change or drop it. You set both before the test.
- **Cross test:** block 6: each pair's page is tried by a tester from another pair.
- **Abgleich:** after each block, the room meets for a short comparison: pairs say what they
  decided and why.
- **Spec:** the description of the smallest page, precise enough to build it from. Mode `learn`
  is the spec for the prototype test; mode `launch` is the launch spec.
- **Persona:** a written buyer profile in `product/personas/`, built from the interviews. Claude
  plays it.
- **Launch spec:** one page with what a developer needs and the prototype does not show.
- **Gate:** a check in `npm run check` that holds the release until it passes. Each gate has an
  owner.
- **Waiver:** a file in which the owner of a soft gate lets one finding pass, with name and reason.
- **Build to learn:** a fast page, good enough to test one assumption with a few people.
- **Build to earn:** the same page rebuilt for real visitors, held by the gates.
- **KPI tree, driver, success line, proxy metric, counter metric, kill criterion:** as `CLAUDE.md`
  explains them under "Audience and Language".

## After each step

One line: "Done: <what you made>. Next: <the exact next action or command>."

## At the end of the skill

Four short lines:

- **Made:** the file.
- **Look:** the link or the file to open.
- **Next:** the exact command, with `/clear` before a new skill.
- **Time:** the minutes the block planned for this skill, and what comes after it in the block.

Keep it short. The orientation is three lines, a step frame one or two.
