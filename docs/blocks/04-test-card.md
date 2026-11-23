# Block 4: Ideas, the assumption to test, prototype test card

> **Ideation: pairs or threes, at one laptop. 50 minutes. Task: find many ideas for C1, pick 3 to
> 5, and name the one you test first and why.** This is "Read first" and steps 1 to 4.
>
> **Persona test and what to measure, part 1: same group. About 25 of 60 minutes. Task: write and
> own the prototype test card for your variant.** This is steps 5 to 7, with step 6 cut to 5
> minutes. Part 2 is block 5, steps 1 and 2.

**Blocks 1 to 3 are done for you in the start state. You do not need to read them:** the skill
briefs you on the opportunity before it asks anything.

**What it's for:** you develop many ideas for your chosen opportunity, then narrow them to 3 to 5,
each with the driver it moves and its critical assumption: the one thing that must be true for it
to work. You pick which idea to test first, and why. Then you write the prototype test card
before anything is built: what a tester does, and what you watch for.

You work as a pair on one branch, on the opportunity chosen in decision 001. You keep it to the end.

**Read first (5 min).** Open `http://localhost:<port>/discovery/tree`
(port 3000 unless onboarding said otherwise). On top
is the business goal, below it the funnel steps, at the bottom the four candidate opportunities. The
chosen one, C1, is marked. Then read `discovery/decisions/001-format-fit.md`: what was decided, and
why. An opportunity is a customer need or pain, never a solution. Your ideas in this block are
solutions for it.

## What you do (about 60 min)

The site runs since onboarding. If it does not answer, start it in a second terminal and keep it
running: `PORT=<port> npm start`. Open `http://localhost:<port>/discovery/tree`. Reload it after every step: your ideas appear under your
opportunity from the first step on.

Start a fresh Claude Code session (`/clear`). Then `/loopwise-intent-and-ideas` and name your chosen opportunity. The skill guides you one step
at a time and waits for you each time. You go first.

1. **The intent, then your ideas (15 min).** If your opportunity holds two needs, the skill first
   asks which part you work on. It then drafts the intent: what should change for whom, the problem,
   the desired outcome and the open questions. The desired outcome names the step where the
   buyer's need is met; the launch card later measures that same step. Correct it until it says
   what you mean. Then list
   as many ways to change the website as you can, on the inquiry page or any page before it.
   Wild ones too. Do not judge them yet. Each idea shows the drivers it would move.
2. **More ideas (5 min).** The skill adds five or six ideas from other angles: today's page changed,
   a pattern from another domain, the problem turned around. Add more if they spark something.
3. **Pick 3 to 5 (10 min).** The skill shows for each pick the critical assumption and how well the
   sources support it. The tree now shows only your picks.
4. **The idea you test first (5 min).** Name it and why. Not "the one we like most": the one whose
   assumption would hurt most if it is wrong, or has no source. Then a variant name, lowercase with
   dashes (for example `examples-first`). A variant is your version of a page. Its name becomes the
   folder `site/variants/<name>/`, the link `?variant=<name>`, and the word after each later
   command, for example `/loopwise-test-card examples-first prototype`. The tree marks the idea with a green
   border. The skill stops here.
5. **Prototype test card (15 min).** Start a fresh session (`/clear`). Then
   `/loopwise-test-card <variant> prototype`, with the variant name from step 4. It writes
   `discovery/test-cards/<variant>-prototype.md` in the four lines of a test card. We believe
   that <the assumption>. To verify that, we will <show a tester the page with a scenario>. And
   measure <the signs the watcher looks for>. We are right if <go-on line>. One more line says when
   you rework or drop the idea. The page in the card does not exist yet: you build it in block 5.
   Until then its link answers "Not found".
6. **Own the card (10 min).** Read it as the tester will: does the scenario give away the
   assumption? Can you see each sign, or would you have to guess? Check `Card owner`. Turn the two
   lines into your own words. The go-on line says what you must see to keep the idea. The
   rework-or-drop line says what makes you change it or drop it.
   Under the signs, the card says which ones an AI persona can show. In block 5, Claude plays two
   buyers from `product/personas/`: written profiles built from the same interviews and mails. A
   persona can only do what its file has a line for. Signs in the tester's own words need a person.
7. **Check and commit (5 min).**
   ```bash
   npm run check
   git add discovery && git commit -m "block 4: ideas and prototype test card"
   ```

**Done when:** the tree shows 3 to 5 ideas under your opportunity, one marked as tested first, and
the prototype card has an owner, a scenario, signs and both lines in your words.

**For the Abgleich:** which idea came from a technique, not from you? Which assumption did you pick,
and why that one first?

**Next:** wait for the room. After the Abgleich, block 5 starts with `/loopwise-variant-spec <variant>`:
[05-prototype.md](05-prototype.md).

## If you are done early (optional)

Do this only while other pairs are still working. Stop when the room meets for the Abgleich.

1. **A second idea.** Open your intent in `discovery/intents/`. Pick a second idea from your 3 to 5.
   Below the first "Selection (human)", copy the whole section once more and fill it for that idea.
   Write "Idea it comes from" as `I<n>: <idea>`, with the number from "Solution ideas". Give it its
   own variant name. Reload the tree: it marks the second idea too.
2. **Its prototype test card.** Start a fresh session (`/clear`). Then
   `/loopwise-test-card <second-variant> prototype`. Own it as in step 6: fill `Card owner`, and put both
   lines in your own words.
3. **Check and commit.**
   ```bash
   npm run check
   git add discovery && git commit -m "block 4: second idea and its prototype test card"
   ```

Your first variant stays the one you test first. If you drop it later, the second idea
is ready to go.
