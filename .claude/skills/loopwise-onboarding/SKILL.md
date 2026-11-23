---
name: loopwise-onboarding
description: Get a pair ready for the Loopwise workshop in one step, right after cloning the repo and starting Claude Code inside the loopwise folder. Asks which language to use, checks Node, runs the tests, starts the site (on a free port if 3000 is taken), checks the Loopwise skills are there, opens the site in the Claude desktop app's built-in browser when there is one, and ends with the page to open next. Use as "/loopwise-onboarding", or when the pair says "set me up", "get started" or "does everything run". Writes only discovery/.local.json (language, port and first names, ignored by git).
---

# Onboarding

**When:** right after `git clone`, `git switch -c pair-<names> v3-03-start` and starting Claude Code
inside the `loopwise` folder. Those come first; this skill cannot do them.
**Writes:** only `discovery/.local.json`, which git ignores: the language, the port and the pair's first names, so every later skill uses them. It starts the site in the background of this Claude Code session.

## Orientation

If the command came with a language (`/loopwise-onboarding Deutsch`), use it. If not, and the pair has written nothing else, ask one line first: "Which language should I use with you? Answer in it, for example: Deutsch." Wait. From then on, talk in that language.

Guide as `.claude/rules/guiding.md` says. Show first:
- **Where:** Setup, before block 4. You only watch; I check five things: Node, the tests, the site, the Loopwise skills, the browser.
- **You end with:** the site running on your laptop.
- **Time:** about two minutes. You type nothing until I ask.

Then go through the steps. Before each step, say in one line what you check now. After each step,
say ok, or what is wrong and what to do. Plain words (`.claude/rules/writing.md`).

## Steps

1. **Folder and Node.** Check that `package.json` in the current folder has `"name": "loopwise"`.
   If not, say: "Claude Code runs outside the loopwise folder. Quit it, `cd loopwise`, start it
   again, then run /loopwise-onboarding." and stop. Then run `node -v`. Below 20: say "Loopwise
   needs Node 20 or newer. Install it from nodejs.org, then run /loopwise-onboarding again." and
   stop. No `npm install`: Loopwise has no dependencies.
2. **Tests.** Run `npm test`. Report "<n> tests, all green" or name the failing test and say:
   "Tell the trainer. You can carry on meanwhile."
3. **The site.** Start this folder's own site; never reuse a server that is already running, even a
   Loopwise one: it may serve another folder, and the pair would read the wrong files. Find the
   first free port from 3000 up: `curl -s -o /dev/null -w '%{http_code}' 'http://localhost:<port>/'`
   answers 000 on a free port. Start `PORT=<port> npm start` in the background on it. Then check
   `curl -s -o /dev/null -w '%{http_code}' 'http://localhost:<port>/inquiry.html'` answers 200. Say
   which port the site runs on. Then ask: "Your first names? I put them wherever you decide something today." Write `discovery/.local.json` with the language, the port and the names, for example `{ "language": "Deutsch", "port": 3002, "names": "Ada, Linus" }`, and say in one line that every later skill reads it, so no skill asks for your names again. If it is not 3000, say: "Port 3000 is taken by another program.
   I use port <port> in every link from now on."
4. **The Loopwise skills.** List the folders in `.claude/skills/` whose names start with
   `loopwise-`, and check each holds a `SKILL.md`. Say how many there are, and name the three the
   day starts with: `/loopwise-intent-and-ideas`, `/loopwise-test-card`, `/loopwise-variant-spec`.
   This skill runs, so Claude Code sees the repo's skills. Tell the pair: "Later, when a skill
   says so, type / and loopwise: all Loopwise skills start with loopwise-, so they stand together."
5. **The browser.** The training uses the Claude desktop app, which has a browser built in. Check
   whether this session has a browser tool: the desktop app's built-in browser first, else any
   other tool that opens a URL and reads the page. If one is there, open
   `http://localhost:<port>/inquiry.html` with it and read the main heading: it is "Inquiry". Say
   in one line that the pair sees the page in the app's browser pane. If none is there, Claude
   Code runs in a terminal. Say: "No browser in this session. Today no skill needs one: open the
   links in your own browser. If you want one in the terminal, docs/blocks/00-setup.md, step 4,
   names two you can set up yourself." This step never fails the setup. Do not install anything
   yourself.

## The end

If steps 1 to 4 are ok, in setting `workshop` (`CLAUDE.md`), end with this line, and nothing after it:

"Done: everything runs. Stop here. The trainer shows what comes next."

In setting `team`, end with these lines instead, and nothing after them:

"Done: everything runs. Next, block 4 (50 minutes), first 5 minutes: open
http://localhost:<port>/discovery/tree. On top is the business goal, below it the steps from a visit
to a booking, at the bottom four opportunities: customer needs, never solutions. C1, 'I can't tell
which format fits my group', is marked: your pair works on it all day. You do not need blocks 1 to 3,
and not every word on the page: the next skill explains the words it uses.
Then type /clear and /loopwise-intent-and-ideas C1. It briefs you on C1 first."

If step 2 had a failing test, say that the trainer knows best what
to do, and still end with the line or lines above. If step 1 or 3 failed, end with what to do instead.

Remind the pair once, before the last lines: "The site runs inside this Claude Code session. If you
quit Claude Code, the site stops; the next skill starts it again when you say yes."
