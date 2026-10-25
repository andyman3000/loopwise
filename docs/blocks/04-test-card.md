# Block 4: Ideas, the assumption to test, prototype test card

**What it's for:** you develop many ideas for your chosen opportunity, then narrow them to three.
Each of the three rests on a different critical assumption: the one thing that must be true for it
to work. You pick which assumption to test first, and why. Then you write the prototype test card
before anything is built: what a tester does, and what you watch for.

You work as a pair on one branch, on your own opportunity from block 3. You keep it to the end.

## What you do (about 65 min)

In Claude Code: `/intent-and-ideas` and name your chosen opportunity. The skill guides you one step
at a time and waits for you each time. You go first in every step.

1. **Your ideas first (8 min).** Write down as many ways to change the inquiry page as you can. Wild
   ones too. Do not judge them yet.
2. **How Might We (5 min).** The skill turns your opportunity into one question. Sharpen it.
3. **Push wider (15 min).** Three techniques, one after the other: change today's page bit by bit,
   borrow from another domain, and turn the problem upside down. Add your ideas first, then read
   the skill's.
4. **Up to five (4 min).** Pick up to five ideas. The skill shows for each what changes on the page,
   the critical assumption, the funnel step it acts on, and whether a prototype can test it.
5. **Three that differ (3 min).** Pick three whose critical assumptions differ. The other ideas stay in
   the file for a second round.
6. **Selection.** Name the assumption you test first and why. Not "the idea we like most": the
   assumption that would hurt most if it is wrong, or the one nobody has a source for. Then a
   variant name, lowercase with dashes (for example `examples-first`).
7. **Prototype test card (15 min).** The skill writes `discovery/test-cards/<variant>-prototype.md`:
   the assumption, a scenario for the tester (situation and task), the signs you watch for, a go-on
   line and a rework-or-drop line.
8. **Own the card (10 min).** Read it as the tester will: does the scenario give away the
   assumption? Can you see each sign, or would you have to guess? Fill `Card owner`. Turn the two
   lines into your own words.
9. **Look and commit (5 min).** `npm start`, open `http://localhost:3000/discovery/tree`. Your three
   ideas hang under your opportunity; the one you test first has a green border.
   ```bash
   npm run check
   git add discovery && git commit -m "block 4: ideas and prototype test card"
   ```

**Done when:** the intent has your ideas, three that differ and your selection, and the prototype
card has an owner, a scenario, signs and both lines in your words.

**For the Abgleich:** which idea came from a technique, not from you? Which assumption did you pick,
and why that one first?
