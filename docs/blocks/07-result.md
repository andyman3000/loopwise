# Block 7: Demo, read the result

**What it's for:** you see how a launched variant is read against data, eight weeks after launch.
The trainer runs it on the reference variant, `success-line-first`. You switch once and rerun two
counts yourself. The honest answer to "did the assumption hold?" is often "partly". You learn what
you may conclude, and what small numbers do not allow.

## What you do (about 10 of the demo's 60 min)

1. Commit your own work first. Then switch to the reference state of the demo:
   ```bash
   git add -A && git commit -m "my state before the demo"
   git switch -c demo 06-test-decision
   ```
   If `demo` already exists, use `git switch demo`.
2. The trainer shows the reference launch card, `discovery/test-cards/success-line-first.md`.
   Before anything is counted, write down your prediction. Which lines of the card will be met?
   The skill asks the trainer the same question first.
3. The trainer runs `/read-result`. It reads `shipped` from `site/config.json`. It counts events
   before and after the launch. It writes the "Result" section of the launch card.
4. Rerun the two counts the trainer names. The Result section lists the command behind each number.
   Run each command in your terminal and compare the number.
5. Follow the trainer through the card, line by line: success line, usage, proxy, counter metric,
   kill criterion. Which are met, not met, unclear? Where was your prediction wrong?

**Done when:** you are on `demo` and your two counts match the Result section.

**For the Abgleich:** what would you not conclude from these numbers, even though it is tempting?

**Afterwards, on your own:** on the `demo` branch, run `/read-result` yourself. Then fill
`Decision`, `Who` and `Date` at the end of the Result section. `git switch -` takes you back to your
own branch.

The data are synthetic and the files say so.
