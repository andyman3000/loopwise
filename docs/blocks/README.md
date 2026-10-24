# Block instructions

One file per workshop block. Keep the file of your block open while you work. Each file says what
the block is for, what you do step by step, and when you are done.

| File | Block | Tag after the block |
|---|---|---|
| [00-setup.md](00-setup.md) | Setup | `00-start` |
| [01-kpi-tree.md](01-kpi-tree.md) | KPI tree | `01-kpi-tree` |
| [02-opportunities.md](02-opportunities.md) | Opportunities from sources | `02-opportunities` |
| [03-opportunity-decision.md](03-opportunity-decision.md) | Compare opportunities and decide | `03-opportunity-decision` |
| [04-variants.md](04-variants.md) | Intent, ideas, specs, variants | `04-variants` |
| [05-test-cards.md](05-test-cards.md) | Test card | `05-test-cards` |
| [06-variant-decision.md](06-variant-decision.md) | Compare variants and decide | `06-variant-decision` |
| [07-result.md](07-result.md) | Read the result | `07-result` |
| [08-next-bet.md](08-next-bet.md) | Next bet | `08-next-bet` |

## The same four moves in every block

- **Run the skill.** In Claude Code, inside the `loopwise` folder, type `/` and the skill name.
- **Try first.** Before it drafts anything, the skill asks you one question about the step. Answer it
  yourself, in a sentence or two. Afterwards the output shows your answer next to its draft, under
  "Your first try". That comparison is where you learn the most.
- **Read the output critically.** Does every claim have a quote with file and line? Is a number
  counted, or estimated? `npm run check` tests the citations against the lines they point at.
- **Decide yourself.** Every skill leaves a field marked `____ (human decides)`. Fill it with your
  choice, your name, the date and one sentence why.

## Reading the artefacts

The skills write Markdown into `discovery/`. To read them comfortably, run `npm start` and open
`http://localhost:3000/discovery`. The KPI tree is drawn there as a tree. To fill a decision field,
edit the Markdown file itself. `http://localhost:3000/discovery/map` shows all opportunities on one
evidence map.

## Your own branch and the reference states

You work on your own branch, started from `00-start`. After every block there is a reference state.
If you are stuck or behind, continue from the reference state of the block you missed:

```bash
git add -A && git commit -m "my state"     # keep your own work first
git switch -c from-02 02-opportunities     # continue from a reference state
```

Two switches are planned for everyone: to `04-variants` at the end of block 4, and to
`06-variant-decision` in block 6. The block files say when.
