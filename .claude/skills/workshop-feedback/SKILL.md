---
name: workshop-feedback
description: Close the workshop. Ask each of the two people in the pair at most five questions about the two days, one question per message, then pack the pair's work and answers into one zip on this laptop for the pair to mail to the trainer themselves. The Claude Code transcripts go in only after a separate yes. Use at the end of day 2, when the team says "workshop feedback", "pack our results" or "we are done". Sends nothing itself.
---

# Workshop feedback

**When:** the last step of day 2, after the pair's own work is done. The trainer may not be in the room.
**Input:** none.
**Reads:** the pair's branch (`git branch --show-current`), `git log` and `git diff` from `v2-00-start`, the files listed under "What goes into the zip".
**Writes:** `feedback/feedback.md` in the repo, and one zip outside the repo. Changes no other file and makes no commit.

The trainer uses the answers and the pair's artefacts to improve the workshop. This skill asks, packs and tells the pair where the zip is. It never sends anything: no mail, no upload, no push.

## Rules

- **One question at a time.** Use AskUserQuestion with the options below; the person can always type their own answer instead. After each answer, ask one short follow-up only if the answer is a single word and the question asks why. No emojis.
- **Each person answers on their own.** Ask all five questions to the person at the keyboard, then say: "Thank you. Please hand over the keyboard." Then ask the same five to the second person. If the pair says one of them has left or they answer together, write that in the file and ask once.
- **Not anonymous, and say so.** Before the first question, say: "Your answers go into a zip that you mail to the trainer yourselves, so they carry your name. Skip any question with 'skip'."
- **Write only what people say.** Short answers stay as said. Do not summarise, rate or soften them.
- **The pair sees everything before it is packed.** Show the file list and ask for a yes. Nothing goes into the zip that was not on that list.
- **The transcripts are a separate yes.** Never pack them together with the rest, never as a default.

## The five questions

1. **Expectations.** "What did you expect from these two days, and how well did they match?" Options: "Better than expected", "As expected", "Partly", "Not what I expected". Follow-up: "What did you expect?"
2. **Pace.** "Which block felt too fast, and which too slow?" Options: "All about right", "Some too fast", "Some too slow", "Both". Follow-up for any but the first: "Which blocks?"
3. **Stuck.** "Where did you get stuck most?" Options: "A skill's questions or output", "Git or the branch", "The browser tool or the website", "Understanding the step itself". Follow-up: "What happened?"
4. **Your own work.** "Which step will you use in your own work in the next two weeks?" Options: "KPI tree", "Opportunities from sources", "Test cards", "None yet". Follow-up: "For what?"
5. **Format.** "What should we change about the format?" Options: "Nothing", "More time with the trainer", "More time on our own real topics", "Less theory, more doing". Follow-up: "Anything else?"

## What goes into the zip

- `feedback/feedback.md`
- `discovery/` as it is now, committed or not
- `site/variants/` and `site/config.json`
- `git-log.txt`: `git log --stat v2-00-start..HEAD`
- `git-diff.txt`: `git diff v2-00-start` (all changes since the start, committed or not)
- `git-status.txt`: `git status --short`

Nothing from `data/`, nothing outside the repo, nothing else. If `v2-00-start` is not an ancestor of HEAD (`git merge-base --is-ancestor v2-00-start HEAD` fails), say so and use the tag the branch started from, after asking the pair.

## Steps

1. Say what happens, in four lines: five questions each, the answers and your work go into one zip, the zip stays on this laptop, you mail it yourselves. Then the not-anonymous line from the rules.
2. Ask person 1 the five questions. Ask for the first name, or "skip".
3. Ask person 2 the five questions. Ask for the first name, or "skip".
4. Write `feedback/feedback.md`: the branch name, the date, one section per person with each question and the answer word for word.
5. Collect the git files into a temporary folder together with the files above. Show the pair the list, with the number of files per folder. Ask: "Pack these into the zip?" On no, ask what to leave out, then show the list again.
6. **The transcripts, a separate question.** Claude Code keeps each session as a `.jsonl` file in `~/.claude/projects/`, in a folder named after the working directory (on this laptop, the folder whose name ends in the repo path with `/` and `\` turned into `-`). List that folder's `.jsonl` files with their size. Then ask: "Also pack your Claude Code transcripts? They hold everything you typed and every file Claude read in this folder, including anything you pasted. The trainer reads them to see where the skills confused you. Only say yes if nothing private or secret is in them." Options: "Yes, pack them", "No". On yes, copy those `.jsonl` files into `transcripts/` in the temporary folder. If the folder is not found, say so and move on.
7. Zip the temporary folder. Name: `loopwise-<branch>-<YYYY-MM-DD>.zip`. Place it on the Desktop (`~/Desktop`, on Windows also try `~/OneDrive/Desktop`); if neither exists, in the folder above the repo.
   - macOS and Linux: `cd <temp> && zip -qr <zip> .`
   - Windows: `powershell.exe -NoProfile -Command "Compress-Archive -Path '<temp>\*' -DestinationPath '<zip>'"`
   Check the zip exists and is larger than zero bytes. Delete the temporary folder in the same command.
8. Show the zip in the file manager: `open -R <zip>` on macOS, `explorer.exe /select,<zip>` on Windows.
9. End with exactly this, the path filled in:
   "Your zip is at `<full path>`. Please mail it to mail@andreasstephan.com with the subject `Loopwise feedback <branch>`. Nothing has been sent yet. Thank you for the two days."
