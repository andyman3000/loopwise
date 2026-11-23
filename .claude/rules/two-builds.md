# Two builds

The same agent builds in two folders of the same repo. The folder sets the checks.
The guard is a check in `.claude/settings.json` that Claude Code runs before and after each write.

| | Build to learn | Build to earn |
|---|---|---|
| Folder | `site/variants/<variant>/` | `site/hardened/<variant>/` |
| Purpose | test one assumption with a few people | serve real visitors |
| May be faked | anything the test does not need | nothing |
| Checks that run | none | the guard, `npm run check`, `npm run release` |
| Who is asked | nobody at a gate | the product lead, once, at the release |

## Where each check sits

| Where | What happens | Who acts |
|---|---|---|
| While the agent writes in `site/hardened/` | Legal (hard): the guard refuses a price before the write. Design (soft): the guard flags a finding right after the write, and the agent fixes it. | the system |
| Before it ships | `npm run release` runs every gate again. Only it changes `shipped`. | the system |
| Going live | the permission prompt on `npm run release -- <variant> --approved-by <name>` | the product lead |

| | Design gate | Legal gate |
|---|---|---|
| Rule | pages use the design system | no prices on the website |
| Owner | designer | legal |
| Kind | soft: the owner may make an exception | hard: no exception, legal included |
| Where it fires | right after the write; the agent fixes it | before the write; the write is refused |
| Owner in the run | nothing to do | nothing to do |
| Owner outside the run | a waiver for one variant, or a change to `site/styles.css` | a change to `gates/policies/no-prices.md` and `gates/gates.json` |

| On this laptop | In a real company |
|---|---|
| the guard on a write | a linter or a pre-commit check |
| `npm run check` | continuous integration (CI) |
| `npm run release` | the deploy pipeline |
| the guard on `site/config.json` | branch protection |
| yes at the release prompt | approving a pull request for production |
| `"shipped"` in `site/config.json` | production |

## Two rules for the agent

- Never write a waiver, a launch or release decision, or a "Decided by" line on your own. Never put `--approved-by` in a command on your own.
- When the guard refuses or flags, show its lines as they are. Never try another way around it.
