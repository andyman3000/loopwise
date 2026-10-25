# Block 4: Intent, three ideas, the assumption to test, prototype test card

**What it's for:** you turn your chosen opportunity into an intent and three solution ideas. Each
idea rests on a different critical assumption: the one thing that must be true for it to work. You
pick which assumption to test first, and why. Then you write the prototype test card before anything
is built: what a tester does, and what you watch for.

You work as a pair on one branch, on your own opportunity from block 3. You keep it to the end.

## What you do (about 65 min)

1. **Intent (20 min).** In Claude Code: `/intent-and-ideas` and name your chosen opportunity. It
   first asks for one idea of your own: what would change on the page? Then it shows the intent;
   confirm or change it. It writes `discovery/intents/<opportunity>.md` with three ideas.
2. **Ideas and selection (15 min).** Read the table "Three ideas side by side". Does each idea fail
   for a different reason? Is each one named by what changes on the page? Then fill "Selection
   (human)" at the end of the intent file:
   - the assumption you test first, copied from the table;
   - why this one first, in one sentence. Not "the idea we like most": the assumption that would
     hurt most if it is wrong, or the one nobody has a source for;
   - the idea it comes from, and a variant name, lowercase with dashes (for example `examples-first`);
   - your names and the date.
   The other two ideas stay in the file for a second round.
3. **Prototype test card (15 min).** `/test-card <variant> prototype`. It asks what you would need
   to see a tester do. It writes `discovery/test-cards/<variant>-prototype.md`: the assumption, a
   scenario for the tester (situation and task), the signs you watch for, a go-on line and a
   rework-or-drop line.
4. **Own the card (10 min).** Read it as the tester will: does the scenario give away the
   assumption? Can you see each sign, or would you have to guess it? Fill `Card owner`. Turn the
   go-on line and the rework-or-drop line into your own words. The column "Can a persona show it?"
   tells you which signs only a person can show on Tuesday.
5. **Check and commit (5 min).**
   ```bash
   npm run check
   git add discovery && git commit -m "block 4: intent and prototype test card"
   ```

**Done when:** the intent has three ideas and your selection, and the prototype card has an owner,
a scenario, signs and both lines in your words.

**For the Abgleich:** which assumption did you pick, and why that one first? Did two pairs with the
same opportunity pick different assumptions?
