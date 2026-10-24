# Setup

**What it's for:** everyone has the repo running and Claude Code sees the skills, before the first block starts.

## What you do (about 5 min)

1. Clone the repo and start your own branch from the start state:
   ```bash
   git clone <repo> loopwise && cd loopwise
   git switch -c mine 00-start
   ```
2. Check the website runs. Node 20 or newer, no `npm install` needed:
   ```bash
   npm test      # all green
   npm start     # then open http://localhost:3000 and click "Inquiry"
   ```
   Stop the server with `Ctrl+C`.
3. Start Claude Code **inside the `loopwise` folder** and type `/`. You should see `kpi-tree`,
   `opportunities-from-source` and the other skills of the chain.
4. Open [01-kpi-tree.md](01-kpi-tree.md).

**Done when:** tests are green, the inquiry page opens, and `/kpi-tree` shows up in Claude Code.

If Claude Code lists no skills, it was started outside the `loopwise` folder.
