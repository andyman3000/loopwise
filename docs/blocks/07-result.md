# Block 7: Demo, read the result

**What it's for:** you see how a launched variant is read against data, eight weeks after launch.
The trainer runs it on the reference variant, `format-quiz`. You switch once and rerun two
counts yourself. The honest answer to "did the assumption hold?" is often "partly". You learn what
you may conclude, and what small numbers do not allow.

## What you do (about 10 of the demo's 60 min)

1. Commit your own work first. Then switch to the reference state of the demo:
   ```bash
   git add -A && git commit -m "my state before the demo"
   git switch -c demo 06-test-decision
   ```
   If `demo` already exists, use `git switch demo`.
2. The trainer shows the reference launch card, `discovery/test-cards/format-quiz.md`.
   Before anything is counted, write down your decision rule in three short sentences: what result
   would make you keep the quiz, change it, or take it back? The skill asks the trainer the same
   question first.
3. The trainer runs `/read-result`. It reads `shipped` from `site/config.json`. It counts events
   the way the card says: quiz weeks against off weeks, with the weeks before launch as context.
   It writes the "Result" section of the launch card.
4. Rerun two counts yourself. The Result section lists the command behind each number.
   Run each command in your terminal and compare the number.
   The quiz ran in every other week after launch, today's form in the weeks between.
   - **Success line:** of the inquiry page visits, how many start the form, in the quiz weeks
     (variant `format-quiz`) and in the off weeks (variant `baseline`, after the launch)
     (`page_view` of the inquiry page and `inquiry_started`).
   - **Counter metric:** of the visitors who start the form, how many send it, in the quiz weeks and
     in the off weeks (`inquiry_started` and `inquiry_submitted`).
   Together they show the trade-off: did the quiz bring more starts, and did it cost inquiries?
5. Follow the trainer through the card, line by line: success line, adoption, proxy, call quality,
   counter metric, kill criterion. Which are met, not met, unclear? Where does your rule point, and does it agree
   with the skill's proposal?
6. Only now open the dashboard at `http://localhost:3000/dashboard`. It shows the same counts as
   charts, week by week.

**Done when:** you are on `demo` and your two counts match the Result section.

**For the Abgleich:** what would you not conclude from these numbers, even though it is tempting?

**Afterwards, on your own:** on the `demo` branch, run `/read-result` yourself. Then fill
`Decision`, `Who` and `Date` at the end of the Result section. `git switch -` takes you back to your
own branch.

The data are synthetic and the files say so.
