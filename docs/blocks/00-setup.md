# Setup

**What it's for:** everyone has the repo running, Claude Code sees the skills, and Claude Code can
open a page in a browser, before block 4 starts.

You work in pairs all day, on one laptop and one branch per pair.

## Where you start

You do not start from an empty repo. The start state `v3-03-start` already holds blocks 1 to 3:

- the KPI tree: the business goal and the numbers it depends on (`discovery/kpi-tree.md`);
- the opportunities from five source groups: customer needs and pains, each with quotes
  (`discovery/opportunities/`). An opportunity is a need or a pain, never a solution;
- the comparison of four candidate opportunities (`discovery/opportunity-comparison.md`);
- decision 001: the product lead chose C1, "I can't tell which format fits my group"
  (`discovery/decisions/001-format-fit.md`).

Every pair starts from decision 001 and works on C1. Your first own step is block 4: ideas for C1.

## What you do (about 10 min)

1. Clone the repo and start your pair's branch from the start state. Use your two names:
   ```bash
   git clone https://github.com/andyman3000/loopwise.git loopwise && cd loopwise
   git switch -c pair-<name>-<name> v3-03-start
   ```
2. Check the website runs. Node 20 or newer, no `npm install` needed:
   ```bash
   npm test      # all green
   npm start     # then open http://localhost:3000 and click "Inquiry"
   ```
   Leave the server running for step 4.
3. Start Claude Code **inside the `loopwise` folder** and type `/`. You should see
   `loopwise-intent-and-ideas`, `loopwise-test-card` and the other skills of the chain.
4. **Browser tool.** Later today a skill opens your page in a browser. Add one browser tool to Claude
   Code, for your user only. It is not part of the repo. Pick one:
   - Playwright MCP (needs Node). From the
     [official README](https://github.com/microsoft/playwright-mcp), section "Claude Code":
     ```bash
     claude mcp add playwright npx @playwright/mcp@latest
     ```
   - Chrome DevTools MCP (needs Chrome and Node). From the
     [official client guide](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/client-configurations.md),
     section "Claude Code":
     ```bash
     claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
     ```
   Run the line in a terminal inside the `loopwise` folder, then restart Claude Code. `/mcp` lists the
   tool. Check it with the server still running. Ask Claude Code:
   > Open http://localhost:3000/inquiry with the browser tool and tell me the heading of the page.

   It should answer "Inquiry". Then stop the server with `Ctrl+C`.

## Permission questions

The repo allows the routine steps in `.claude/settings.json`: writing in `discovery/` and
`site/variants/`, `npm test`, `npm run check`, `npm start`, and reading commands such as `ls`,
`grep` and `git status`. For anything else Claude Code asks first. Read the command. Say yes if it
stays inside the `loopwise` folder. Ask the trainer if you are unsure.

## One Claude Code session per skill

Start a fresh Claude Code session before each skill. Type `/clear`, or quit Claude Code and start it
again inside the `loopwise` folder. Each skill reads what it needs from the files. In one long
session, Claude carries old answers into the next skill, and its answers get worse. Each block file
reminds you at the step where a skill starts, and names the command that comes next.

## Why you commit

Each block ends with `npm run check` and a commit. The commit keeps your state, so you can go back.
It also lets the trainer see how far your pair got. That is all git is for today. If a git step
fails, tell the trainer and carry on with the block.

## The Abgleich

After each block the room meets for a short comparison, the Abgleich. Pairs say what they decided
and why. Each block file ends with one question for it.

**Done when:** tests are green, the inquiry page opens, `/loopwise-intent-and-ideas` shows up in Claude Code,
and Claude Code read the inquiry page with the browser tool.

If Claude Code lists no skills, it was started outside the `loopwise` folder. If the browser tool
does not work, carry on: the skill then reads the page's HTML and says so. Tell the trainer.

**Next:** wait for the room. Block 4 starts together: [04-test-card.md](04-test-card.md).
