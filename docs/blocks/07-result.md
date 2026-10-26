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
   git switch -c demo 06-test-decision
   ```
   If `demo` already exists, use `git switch demo`.
2. The trainer shows the reference launch card, `discovery/test-cards/format-quiz.md`. The quiz ran
   in every other week after launch, today's form in the weeks between.
3. Look at the numbers: run `npm start`, open `http://localhost:3000/dashboard`, and in a second
   terminal run `npm run summary`. Both show the same numbers, counted by the same code.
4. Write down your own reading before the skill says anything. For each line of the card: met, not
   met or unclear, and why in a few words. Then: would you keep the quiz, change it, or take it back?
5. The trainer runs `/read-result`. It shows the numbers and asks for a reading first; the trainer
   answers with the room's. Then the skill sets its own reading beside it, line by line, and names
   where the two differ.
6. Settle the differences together: which reading holds, and why? Then the conclusion: keep, change
   or take back. The skill writes it in the trainer's words into the "Result" section of the card.

**Done when:** you are on `demo` and you have your own reading next to the one in the Result section.

**For the Abgleich:** what would you not conclude from these numbers, even though it is tempting?

**Afterwards, on your own:** on the `demo` branch, run `/read-result` yourself with your own
reading and your own conclusion. `git switch -` takes you back to your
own branch.

The data are synthetic and the files say so.
