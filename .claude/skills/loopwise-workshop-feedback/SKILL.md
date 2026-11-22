---
name: loopwise-workshop-feedback
description: Close the workshop. Ask each of the two people in the pair at most five questions about the workshop, one question per message, then pack the pair's work and answers into one zip on this laptop for the pair to mail to the trainer themselves. The Claude Code transcripts go in only after a separate yes. Use at the end of the workshop, when the team says "workshop feedback", "pack our results" or "we are done". Sends nothing itself.
---

# Workshop feedback

**When:** the last step of the workshop, after the pair's own work is done. The trainer may not be in the room.
**Input:** none.
**Reads:** the pair's branch (`git branch --show-current`), `git log` and `git diff` from `v3-03-start`, the files listed under "What goes into the zip".
**Writes:** `feedback/feedback.md` in the repo, and one zip outside the repo. Changes no other file and makes no commit.

The trainer uses the answers and the pair's artefacts to improve the workshop. This skill asks, packs and tells the pair where the zip is. It never sends anything: no mail, no upload, no push.


## Orientation

Guide as `.claude/rules/guiding.md` says, in the language the human writes in. Show first:
- **Where:** Block 9: feedback and your results, at the end of the day.
- **You end with:** `feedback/feedback.md` with your answers to five questions, and a zip of your results on your Desktop, for the trainer.
- **Time:** about 15 minutes.

Before each question, say: about 2 minutes; a good answer is honest and concrete, one or two sentences.

End each step with "Done: <what>. Next: <what the human does now>." At the end, the closing line in step 9 covers Made, Look and Next; add Time: block 9 planned about 15 minutes, and the day ends after it.

## Rules

- **One question at a time.** Use AskUserQuestion with the options below; the person can always type their own answer instead. After each answer, ask the question's follow-up once, as its own message, unless the answer already says it or is "skip". About one minute; a good answer is one sentence. No emojis.
- **Each person answers on their own.** Ask all five questions to the person at the keyboard, then say: "Thank you. Please hand over the keyboard." Then ask the same five to the second person. If the pair says one of them has left or they answer together, write that in the file and ask once.
- **Not anonymous, and say so.** Before the first question, say: "Your answers go into a zip that you mail to the trainer yourselves, so they carry your name. Skip any question with 'skip'."
- **Write only what people say.** Short answers stay as said. Do not summarise, rate or soften them.
- **The pair sees everything before it is packed.** Show the file list and ask for a yes. Nothing goes into the zip that was not on that list.
- **The transcripts are a separate yes.** Never pack them together with the rest, never as a default.

## The five questions

1. **Expectations.** "How well did the workshop match what you expected?" Options: "Better than expected", "As expected", "Partly", "Not what I expected". Follow-up: "What did you expect?"
2. **Pace.** "How was the pace of the blocks?" Options: "All about right", "Some too fast", "Some too slow", "Both". Follow-up for any but the first: "Which blocks, and too fast or too slow?"
3. **Stuck.** "Where did you get stuck most?" Options: "A skill's questions or output", "Git or the branch", "The browser tool or the website", "Understanding the step itself". Follow-up: "What happened?"
4. **Your own work.** "Which step will you use in your own work in the next two weeks?" Options: "KPI tree", "Opportunities from sources", "Test cards", "None yet". Follow-up: "For what?"
5. **Format.** "What should we change about the format?" Options: "Nothing", "More time with the trainer", "More time on our own real topics", "Less theory, more doing". Follow-up: "Anything else?"

## What goes into the zip

- `feedback/feedback.md`
- `discovery/` as it is now, committed or not
- `site/variants/` and `site/config.json`
- `git-log.txt`: `git log --stat v3-03-start..HEAD`
- `git-diff.txt`: `git diff v3-03-start` (all changes since the start, committed or not)
- `git-status.txt`: `git status --short`

Nothing from `data/`, nothing outside the repo, nothing else. If `v3-03-start` is not an ancestor of HEAD (`git merge-base --is-ancestor v3-03-start HEAD` fails), say so and use the tag the branch started from, after asking the pair.

## Steps

1. Say what happens, in four lines: five questions each, the answers and your work go into one zip, the zip stays on this laptop, you mail it yourselves. Then the not-anonymous line from the rules.
2. Ask person 1 the five questions. Then ask for the first name: a few seconds; a good answer is your first name, or "skip".
3. Ask person 2 the five questions. Then the first name, the same way.
4. Write `feedback/feedback.md`: the branch name, the date, one section per person with each question and the answer word for word.
5. Collect the git files into a temporary folder together with the files above. Show the pair the list, with the number of files per folder. Say: about one minute; check that nothing private is on the list. Ask: "Pack these into the zip?" On no, ask what to leave out, then show the list again.
6. **The transcripts, a separate question.** Claude Code keeps each session as a `.jsonl` file in `~/.claude/projects/`, in a folder named after the working directory (on this laptop, the folder whose name ends in the repo path with `/` and `\` turned into `-`). List that folder's `.jsonl` files with their size. Then ask: "Also pack your Claude Code transcripts? They hold everything you typed and every file Claude read in this folder, including anything you pasted. The trainer reads them to see where the skills confused you. Only say yes if nothing private or secret is in them." Say first: about one minute; a good answer is "no" when in doubt. Options: "Yes, pack them", "No". On yes, copy those `.jsonl` files into `transcripts/` in the temporary folder. If the folder is not found, say so and move on.
7. Zip the temporary folder. Name: `loopwise-<branch>-<YYYY-MM-DD>.zip`. Place it on the Desktop (`~/Desktop`, on Windows also try `~/OneDrive/Desktop`); if neither exists, in the folder above the repo.
   - macOS and Linux: `cd <temp> && zip -qr <zip> .`
   - Windows: `powershell.exe -NoProfile -Command "Compress-Archive -Path '<temp>\*' -DestinationPath '<zip>'"`
   Check the zip exists and is larger than zero bytes. Delete the temporary folder in the same command.
8. Show the zip in the file manager: `open -R <zip>` on macOS, `explorer.exe /select,<zip>` on Windows.
9. End with exactly this, the path filled in:
   "Your zip is at `<full path>`. Please mail it to mail@andreasstephan.com with the subject `Loopwise feedback <branch>`. Nothing has been sent yet. Thank you for the day."
