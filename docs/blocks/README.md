# Block instructions

One file per workshop block. Keep the file of your block open while you work. Each file says what
the block is for, what you do step by step, and when you are done.

| File | Block | Tag after the block |
|---|---|---|
| [00-setup.md](00-setup.md) | Setup | `v3-03-start` |
| [01-kpi-tree.md](01-kpi-tree.md) | KPI tree | `v2-01-kpi-tree` |
| [02-opportunities.md](02-opportunities.md) | Opportunities from sources | `v2-02-opportunities` |
| [03-opportunity-decision.md](03-opportunity-decision.md) | Compare opportunities and decide | `v2-03-opportunity-decision` |
| [04-test-card.md](04-test-card.md) | Ideas, the assumption to test, prototype test card | `v3-04-test-card` |
| [05-prototype.md](05-prototype.md) | Spec, persona reads the spec, build the prototype | `v3-05-prototype` |
| [06-test-decision.md](06-test-decision.md) | Cross test, learning card, carry on | `v3-06-test-decision` |
| [07-result.md](07-result.md) | Demo: read the result | not built (two-day training only) |
| [08-next-bet.md](08-next-bet.md) | Demo: next bet | not built (two-day training only) |
| [09-feedback.md](09-feedback.md) | Feedback and your results, end of the day | none |
| [10-factory-run-1.md](10-factory-run-1.md) | Factory run 1: launch spec, build to earn, the design gate fires | `v3-07-factory-run-1` |
| [11-factory-run-2.md](11-factory-run-2.md) | Factory run 2: the hard gate, release, retro | `v3-08-factory-run-2` |

At the bootcamp the day runs: setup and jump, block 4, the first part of block 5 (no build), then
factory runs 1 and 2 from `v3-06-test-decision`. Blocks 1 to 3 are done in the start state.

## The same four moves in every block

- **Run the skill.** In Claude Code, inside the `loopwise` folder, type `/` and the skill name.
  Start a fresh session before each skill: type `/clear` first. The block 4 and 5 skills end by
  naming what is still open in the block and the next command. Your block file has the full order.
- **Try first.** Before it drafts anything, the skill asks you one question about the step. Answer it
  yourself, in a sentence or two. Afterwards the output shows your answer next to its draft, under
  "Your first try". That comparison is where you learn the most.
- **Read the output critically.** Does every claim have a quote with file and line? Is a number
  counted, or estimated? `npm run check` tests that each cited line exists, and that a quote stands on the line it cites. It cannot tell whether a line without a quote says what the claim says: check that yourself.
- **Decide yourself.** Every skill leaves a field marked `____ (human decides)`. Fill it with your
  choice, your name, the date and one sentence why.

## Reading the artefacts

The skills write Markdown into `discovery/`. To read them comfortably, run `npm start` and open
`http://localhost:3000/discovery`. The KPI tree is drawn there as a tree. To fill a decision field,
edit the Markdown file itself. `http://localhost:3000/discovery/map` shows all opportunities on one
evidence map.

## Your pair's branch and the reference states

You work as a pair on one branch, started from `v3-03-start`. You keep your own opportunity and your
own variant to the end. After every block there is a reference state. If you are stuck or behind,
continue from the reference state of the block you missed:

```bash
git add -A && git commit -m "my state"     # keep your own work first
git switch -c from-04 v3-04-test-card         # continue from a reference state
```

One switch is planned for everybody: to `v3-06-test-decision` at the start of factory run 1. Only
that state has a complete handover kit for call-slot.
