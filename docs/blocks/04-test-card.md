# Block 4: Ideas, the assumption to test, prototype test card

**What it's for:** you develop many ideas for your chosen opportunity, then narrow them to 3 to 5,
each with the driver it moves and its critical assumption: the one thing that must be true for it
to work. You pick which idea to test first, and why. Then you write the prototype test card
before anything is built: what a tester does, and what you watch for.

You work as a pair on one branch, on your own opportunity from block 3. You keep it to the end.

## What you do (about 60 min)

Start the site in a second terminal and keep it running: `npm start`. Open
`http://localhost:3000/discovery/tree`. Reload it after every step: your ideas appear under your
opportunity from the first step on.

Start a fresh Claude Code session (`/clear`). Then `/intent-and-ideas` and name your chosen opportunity. The skill guides you one step
at a time and waits for you each time. You go first.

1. **The intent, then your ideas (15 min).** If your opportunity holds two needs, the skill first
   asks which part you work on. It then drafts the intent: what should change for whom, the problem,
   the desired outcome and the open questions. Correct it until it says what you mean. Then list
   as many ways to change the website as you can, on the inquiry page or any page before it.
   Wild ones too. Do not judge them yet. Each idea shows the drivers it would move.
2. **More ideas (5 min).** The skill adds five or six ideas from other angles: today's page changed,
   a pattern from another domain, the problem turned around. Add more if they spark something.
3. **Pick 3 to 5 (10 min).** The skill shows for each pick the critical assumption and how well the
   sources support it. The tree now shows only your picks.
4. **The idea you test first (5 min).** Name it and why. Not "the one we like most": the one whose
   assumption would hurt most if it is wrong, or has no source. Then a variant name, lowercase with
   dashes (for example `examples-first`). The tree marks it with a green border. The skill stops
   here.
5. **Prototype test card (15 min).** Start a fresh session (`/clear`). Then
   `/test-card <variant> prototype`, with the variant name from step 4. It writes
   `discovery/test-cards/<variant>-prototype.md` in three sentences. We believe that <the
   assumption>. To test that, we will <show a tester the page with a scenario and watch for signs>.
   We are right if <go-on line>. A fourth line says when you rework or drop the idea.
6. **Own the card (10 min).** Read it as the tester will: does the scenario give away the
   assumption? Can you see each sign, or would you have to guess? Fill `Card owner`. Turn the two
   lines into your own words.
7. **Check and commit (5 min).**
   ```bash
   npm run check
   git add discovery && git commit -m "block 4: ideas and prototype test card"
   ```

**Done when:** the tree shows 3 to 5 ideas under your opportunity, one marked as tested first, and
the prototype card has an owner, a scenario, signs and both lines in your words.

**For the Abgleich:** which idea came from a technique, not from you? Which assumption did you pick,
and why that one first?

**Next:** wait for the room. After the Abgleich, block 5 starts with `/variant-spec <variant>`:
[05-prototype.md](05-prototype.md).

## If you are done early (optional)

Do this only while other pairs are still working. Stop when the room meets for the Abgleich.

1. **A second idea.** Open your intent in `discovery/intents/`. Pick a second idea from your 3 to 5.
   Below the first "Selection (human)", copy the whole section once more and fill it for that idea.
   Write "Idea it comes from" as `I<n>: <idea>`, with the number from "Solution ideas". Give it its
   own variant name. Reload the tree: it marks the second idea too.
2. **Its prototype test card.** Start a fresh session (`/clear`). Then
   `/test-card <second-variant> prototype`. Own it as in step 6: fill `Card owner`, and put both
   lines in your own words.
3. **Check and commit.**
   ```bash
   npm run check
   git add discovery && git commit -m "block 4: second idea and its prototype test card"
   ```

Your first variant stays the one a tester tries on Tuesday. If you drop it later, the second idea
is ready to go.
