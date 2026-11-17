# Setup

**What it's for:** everyone has the repo running, Claude Code sees the skills, and Claude Code can
open a page in a browser, before the first block starts.

You work in pairs for both days, on one laptop and one branch per pair.

## What you do (about 10 min)

1. Clone the repo and start your pair's branch from the start state. Use your two names:
   ```bash
   git clone <repo> loopwise && cd loopwise
   git switch -c pair-<name>-<name> v2-00-start
   ```
2. Check the website runs. Node 20 or newer, no `npm install` needed:
   ```bash
   npm test      # all green
   npm start     # then open http://localhost:3000 and click "Inquiry"
   ```
   Leave the server running for step 4.
3. Start Claude Code **inside the `loopwise` folder** and type `/`. You should see `kpi-tree`,
   `opportunities-from-source` and the other skills of the chain.
4. **Browser tool.** On day 2 a skill opens your page in a browser. Add one browser tool to Claude
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

## One Claude Code session per skill

Start a fresh Claude Code session before each skill. Type `/clear`, or quit Claude Code and start it
again inside the `loopwise` folder. Each skill reads what it needs from the files. In one long
session, Claude carries old answers into the next skill, and its answers get worse. Each block file
reminds you at the step where a skill starts, and names the command that comes next.

**Done when:** tests are green, the inquiry page opens, `/kpi-tree` shows up in Claude Code, and
Claude Code read the inquiry page with the browser tool.

If Claude Code lists no skills, it was started outside the `loopwise` folder. If the browser tool
does not work, carry on: the skill then reads the page's HTML and says so. Tell the trainer.

**Next:** wait for the room. Block 1 starts together: [01-kpi-tree.md](01-kpi-tree.md).
