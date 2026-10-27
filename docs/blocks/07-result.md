# Block 7: Demo, read the result

**What it's for:** you see how a launched variant is read against data, eight weeks after launch.
You read the reference variant, `format-quiz`, in pairs with `/read-result`. You read the numbers
yourself first, and then compare your reading with the skill's. The honest answer to "did the
assumption hold?" is often "partly". You learn what you may conclude, and what small numbers do not
allow.

## What you do (about 30 of the demo's 60 min)

1. Commit your own work first. Then make a branch from the reference state of the demo. You need a
   branch because `/read-result` writes into the card:
   ```bash
   git add -A && git commit -m "my state before the demo"
   git fetch --tags --force
   git switch -c result 06-test-decision
   ```
2. The trainer shows the reference launch card, `discovery/test-cards/format-quiz.md`. The quiz ran
   in every other week after launch, today's form in the weeks between.
3. Run `npm start`. The trainer shows the dashboard on the wall once, at
   `http://localhost:3000/dashboard`, and where each number is. Then click through the quiz yourself
   at `http://localhost:3000/formats.html?variant=format-quiz`.
4. In pairs, start a fresh Claude Code session (`/clear`). Then run `/read-result`. Before it says what any number means, it shows a table: what the
   card assumed, one row per line, and where on the dashboard to look. Fill in the last column
   yourself: met, not met or unclear, and why in a few words. Then: would you keep the quiz, change
   it, or take it back?
5. The skill sets its own reading beside yours, row by row, and names where the two differ. Settle
   the differences with it: which reading holds, and why? Then the conclusion: keep, change or take
   back. The skill writes it in your words into the "Result" section of the card.
6. Commit on your branch, then go back to your own work:
   ```bash
   git add discovery && git commit -m "block 7: my reading of the result"
   git switch -
   ```

**In the room afterwards:** each pair names its decision. Where do pairs read differently, and why?
Where did the skill read differently from you, and who was right?

**Done when:** you have your own reading and the skill's in the card, and you have heard how the
other pairs read it.

**For the Abgleich:** what would you not conclude from these numbers, even though it is tempting?

The data are synthetic and the files say so.

**Next:** stay in the room. The trainer runs `/next-bet` as the rest of the demo:
[08-next-bet.md](08-next-bet.md).
