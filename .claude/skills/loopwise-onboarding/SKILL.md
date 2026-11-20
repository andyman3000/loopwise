---
name: loopwise-onboarding
description: Get a pair ready for the Loopwise workshop in one step, right after cloning the repo and starting Claude Code inside the loopwise folder. Checks Node, runs the tests, starts the site (on a free port if 3000 is taken), checks the Loopwise skills are there, checks Claude Code can open a page in a browser, and ends with the page to open next. Use as "/loopwise-onboarding", or when the pair says "set me up", "get started" or "does everything run". Changes no file in the repo.
---

# Onboarding

**When:** right after `git clone`, `git switch -c pair-<names> v3-03-start` and starting Claude Code
inside the `loopwise` folder. Those come first; this skill cannot do them.
**Writes:** nothing in the repo. It starts the site in the background of this Claude Code session.

Say first: "I check five things: Node, the tests, the site, the Loopwise skills and the browser. It
takes about two minutes." Then go through the steps. Before each step, say in one line what you
check now. After each step, say ok, or what is wrong and what to do. Plain English
(`.claude/rules/writing.md`).

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
   which port the site runs on. If it is not 3000, say: "Port 3000 is taken by another program.
   Use port <port> in every link the block files name."
4. **The Loopwise skills.** List the folders in `.claude/skills/` whose names start with
   `loopwise-`, and check each holds a `SKILL.md`. Say how many there are, and name the three the
   day starts with: `/loopwise-intent-and-ideas`, `/loopwise-test-card`, `/loopwise-variant-spec`.
   This skill runs, so Claude Code sees the repo's skills. Tell the pair: "Type / and loopwise: all
   Loopwise skills start with loopwise-, so they stand together."
5. **The browser.** Check whether a browser tool is connected to this session (Playwright MCP,
   Chrome DevTools MCP, or another tool that opens a URL and reads the page). If one is, open
   `http://localhost:<port>/inquiry.html` with it and read the main heading: it is "Inquiry". If
   none is connected, say so, and give the two lines from `docs/blocks/00-setup.md`, step 4, to add
   one. Add: "Without a browser tool you can still work: later skills read the page's HTML and say
   so." Do not install anything yourself.

## The end

If steps 1 to 4 are ok, end with one line, and nothing after it:

"Everything runs. Open http://localhost:<port>/discovery/tree now: that is where block 4 starts."

If the browser step failed, put one line before it: "The browser tool is missing; add it when you
have a minute (setup step 4)." If step 2 had a failing test, say that the trainer knows best what
to do, and still end with the line above. If step 1 or 3 failed, end with what to do instead.

Remind the pair once, before the last line: "The site runs inside this Claude Code session. If you
quit Claude Code, start it again in a second terminal with PORT=<port> npm start."
