# Block 7: Demo, read the result

**What it's for:** you see how a launched variant is read against data, eight weeks after launch.
The trainer runs it on the reference variant, `format-quiz`. You switch once, read the numbers
yourself first, and then compare your reading with the skill's. The honest answer to "did the
assumption hold?" is often "partly". You learn what you may conclude, and what small numbers do not
allow.

## What you do (about 10 of the demo's 60 min)

1. Commit your own work first. Then switch to the reference state of the demo:
   ```bash
   git add -A && git commit -m "my state before the demo"
   git fetch --tags --force
   git switch --detach 06-test-decision
   ```
   `git switch -` takes you back to your own branch afterwards.
2. The trainer shows the reference launch card, `discovery/test-cards/format-quiz.md`. The quiz ran
   in every other week after launch, today's form in the weeks between.
3. Open the numbers and the page: run `npm start`, open `http://localhost:3000/dashboard`, and click
   through the quiz at `http://localhost:3000/formats.html?variant=format-quiz`.
4. The trainer runs `/read-result`. Before it says what any number means, it shows a table: what the
   card assumed, one row per line, and where on the dashboard to look. Fill in the last column
   yourself: met, not met or unclear, and why in a few words. Then: would you keep the quiz, change
   it, or take it back? The trainer answers with the room's reading.
5. The skill sets its own reading beside the room's, row by row, and names where the two differ.
6. Settle the differences together: which reading holds, and why? Then the conclusion: keep, change
   or take back. The skill writes it in the trainer's words into the "Result" section of the card.

**Done when:** you have your own reading next to the room's and the skill's.

**For the Abgleich:** what would you not conclude from these numbers, even though it is tempting?

**Afterwards, on your own:** make a branch from the tag with `git switch -c demo 06-test-decision`,
then run `/read-result` yourself with your own reading and your own conclusion. Commit it there.
`git switch <your branch>` takes you back.

The data are synthetic and the files say so.
