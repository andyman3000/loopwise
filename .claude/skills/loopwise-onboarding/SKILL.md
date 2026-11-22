---
name: loopwise-onboarding
description: Get a pair ready for the Loopwise workshop in one step, right after cloning the repo and starting Claude Code inside the loopwise folder. Asks which language to use, checks Node, runs the tests, starts the site (on a free port if 3000 is taken), checks the Loopwise skills are there, checks Claude Code can open a page in a browser, and ends with the page to open next. Use as "/loopwise-onboarding", or when the pair says "set me up", "get started" or "does everything run". Writes only discovery/.local.json (language and port, ignored by git).
---

# Onboarding

**When:** right after `git clone`, `git switch -c pair-<names> v3-03-start` and starting Claude Code
inside the `loopwise` folder. Those come first; this skill cannot do them.
**Writes:** only `discovery/.local.json`, which git ignores: the language and the port, so every later skill uses them. It starts the site in the background of this Claude Code session.

## Orientation

If the command came with a language (`/loopwise-onboarding Deutsch`), use it. If not, and the pair has written nothing else, ask one line first: "Which language should I use with you? Answer in it, for example: Deutsch." Wait. From then on, talk in that language.

Guide as `.claude/rules/guiding.md` says. Show first:
- **Where:** Setup, before block 4. You only watch; I check five things: Node, the tests, the site, the Loopwise skills, the browser.
- **You end with:** the site running on your laptop, and the page where block 4 starts.
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
   which port the site runs on. Write `discovery/.local.json` with the language and the port, for example `{ "language": "Deutsch", "port": 3002 }`, and say in one line that every later skill reads it. If it is not 3000, say: "Port 3000 is taken by another program.
   I use port <port> in every link from now on."
4. **The Loopwise skills.** List the folders in `.claude/skills/` whose names start with
   `loopwise-`, and check each holds a `SKILL.md`. Say how many there are, and name the three the
   day starts with: `/loopwise-intent-and-ideas`, `/loopwise-test-card`, `/loopwise-variant-spec`.
   This skill runs, so Claude Code sees the repo's skills. Tell the pair: "Later, when a skill
   says so, type / and loopwise: all Loopwise skills start with loopwise-, so they stand together."
5. **The browser.** Check whether a browser tool is connected to this session (Playwright MCP,
   Chrome DevTools MCP, or another tool that opens a URL and reads the page). If one is, open
   `http://localhost:<port>/inquiry.html` with it and read the main heading: it is "Inquiry". If
   none is connected, say so, and give the two lines from `docs/blocks/00-setup.md`, step 4, to add
   one. Add: "Without a browser tool you can still work: later skills read the page's HTML and say
   so." Do not install anything yourself.

## The end

If steps 1 to 4 are ok, end with these lines, and nothing after them:

"Done: everything runs. Next, block 4 (50 minutes), first 5 minutes: open
http://localhost:<port>/discovery/tree. On top is the business goal, below it the steps from a visit
to a booking, at the bottom four opportunities: customer needs, never solutions. C1, 'I can't tell
which format fits my group', is marked: your pair works on it all day. You do not need blocks 1 to 3,
and not every word on the page: the next skill explains the words it uses.
Then type /clear and /loopwise-intent-and-ideas C1. It briefs you on C1 first."

If the browser step failed, put one line before it: "The browser tool is missing; add it when you
have a minute (setup step 4)." If step 2 had a failing test, say that the trainer knows best what
to do, and still end with the lines above. If step 1 or 3 failed, end with what to do instead.

Remind the pair once, before the last lines: "The site runs inside this Claude Code session. If you
quit Claude Code, the site stops; the next skill starts it again when you say yes."
