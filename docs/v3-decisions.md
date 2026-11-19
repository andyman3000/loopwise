# v3 decisions

Decisions taken while building v3 (design system, gates, lean launch spec, factory), in place of
the people who own them. Each entry: question, choice, reason, how to undo it. The people who
should check an entry are named by role.

## Base

### D1. Which state do the groups jump onto?

- **Question:** which tag does v3 start from?
- **Choice:** `v2-03-opportunity-decision` (KPI tree, opportunities, comparison and decision 001
  ready; ideation next).
- **Reason:** the brief names it as the 10:00 jump point. It is an assumption until the trainers
  confirm it.
- **Undo:** branch v3 again from another v2 tag and replay the v3 commits.

### D2. Which skills and views does v3 carry?

- **Question:** `v2-03-opportunity-decision` predates most v2 fixes to the skills (loopwise-variant-spec
  learn and launch modes, loopwise-persona-walkthrough, loopwise-learning-card, loopwise-test-card), the views and the base
  pages. Start with the tag's old tooling or with v2's current tooling?
- **Choice:** the tag's discovery state, with v2's current skills, views, base pages and tests
  (first v3 commit). The generated walkthrough pages (`walkthrough/`) stay out of `v3-03-start`,
  because they show the reference run's ideas and variants before the pair has its own.
- **Reason:** the morning and afternoon blocks need the learn and launch modes, and the v2
  reference states from block 4 on were built with that tooling.
- **Undo:** revert the first v3 commit.

## Package 0: feedback from the full run

(filled by package 0)

## Package 1: design system

### P1-1. How does the design system get from Claude Design into the repo?

- **Question:** the brief says: derive the system in Claude Design from the codebase, then bring it
  into the repo with `/design` as one style file. Does `/design` do that?
- **What the docs say** (read 2026-11-19): the commands page describes `/design` as a way to
  "Draft UI mockups, screen flows, landing pages, or posters as artboards on one canvas"
  (code.claude.com/docs/en/commands). The getting-started article says "From Claude Code, use
  /design to import a design into your codebase" (support.claude.com, article 14604416): a design,
  not a design system. `/design-sync` goes the other way: "Convert your repo's React design system
  and upload it to Claude Design" (commands page). The docs say nothing about a design system
  flowing from Claude Design back into a repo.
- **What was measured:** the Design System artifact type's own instructions describe building a
  system from a repository ("A Design System artifact from a code repository"), and a system synced
  by `/design-sync` opens read-only. Loopwise has no React components, so `/design-sync` does not
  fit. An agent in Claude Code can read the artifact's `project/tokens.json` with the artifact
  tools (tested 2026-11-19, one text file per call). That is the route from Claude Design to the
  repo.
- **Contradiction recorded:** the brief's step "bring it into the repo with `/design`" does not
  match the docs or the measurement. The measurement wins.
- **Choice:** `site/styles.css` already held colour tokens. It was restructured into the one style
  file (tokens for colour, type, spacing, radius, layout; the components the base pages use). The
  artifact "Loopwise Design System" (https://claude.ai/artifact/LnuyCcsvwkDQxd9qKFVQ1V, private to
  the account that made it) was built from that file with the type's from-code procedure: tokens,
  eight components with static previews and guidelines, a brand book, a cover. The artifact stays
  editable in Claude Design. A change there reaches the repo when Claude Code is asked to bring
  `tokens.json` into `site/styles.css`.
- **Reason:** keeps one style file in the repo, keeps vanilla JS, and gives the designer a page to
  own and edit.
- **Undo:** revert the commits of this package; delete the artifact in Claude.
- **Check:** the trainers. The artifact is private until someone shares it.

### P1-2. No visible change

- **Question:** how to prove the switch to tokens changed nothing?
- **Choice:** headless Chrome screenshots of the five base pages at 1280 and 390 px, light theme,
  reduced motion, before and after: pixel-identical (10 of 10). The dark theme token values are
  byte-identical to before; it was not screenshot, because headless Chrome ignored the dark mode
  switch.
- **Undo:** none needed.

### P1-3. The confirmation page's own styles

- **Choice:** they move into `site/styles.css` as the component "Confirmation" (`done-head`,
  `done-check`, `done-next`, `muted`). The call-slot prototype defines the same class names in its
  own style block; its rules come later and still win on that page.
- **Undo:** move the block back into `site/confirmation.html`.

## Package 2: gates

## Package 3: lean launch spec and factory

## Package 4: tags

## Package 5: material
