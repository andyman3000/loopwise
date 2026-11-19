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

### D3. Work packages ran as subagents, not as sessions

- **Question:** the brief asks for one sub-session per work package, started with
  `start_session`, each in its own worktree.
- **Choice:** the app refused `start_session` from a session that another session started. Each
  package ran as a background subagent in its own git worktree and branch (`v3-p0-feedback`,
  `v3-p1-design-system`, `v3-p2-gates`, ...). The orchestrator read each diff, ran `npm test` and
  `npm run check` itself, and merged with `--no-ff`.
- **Reason:** same isolation and review, no wait for a person to click a card.
- **Undo:** none needed; the merge commits name each package.

## Package 0: feedback from the full run

A trainer's full run of the v2 chain, and the notes from the first reference run, raise the points
below. Each line says whether v2 already fixes the point, whether v3 fixes it, or why it stays
open. "Proposed" means the fix touches a file package 0 may not change. The exact change waits
for the orchestrator, as P1 to P7 in the package 0 proposals. The reference run notes also record
many fixes made during that run; those are left out here. Commits marked v3 are on
`v3-p0-feedback`.

The groups jump onto the start state at block 4. Points in blocks 1 to 3 stay open where the start
state already holds the block's result.

Count: fixed in v2: 13. Fixed in v3: 13. Proposed, applied by orchestrator: 2. Open: 27.

Orchestrator, on the proposals: P1 to P4, P6 and P7 are applied (commit "v3: apply package 0
proposals"). P5, a new allow rule in `.claude/settings.json` for the persona run's page check
(`curl -s -o /dev/null *`), is not applied: it widens what Claude Code runs without asking, and
that is a person's call. Until it is decided, a pair answers one permission prompt per page run.

### Setup and across blocks

- **0.1 Fixed in v2.** The reference tags were the v1 tags, and block 8 had none. The reference
  states now carry tags `v2-00` to `v2-06` (prefix set in e6b1147). `v2-07-result` and `v2-08-next-bet` still do not exist; the
  v3 tags are package 4.
- **0.2 Open.** The cross test needs a second person, so a solo run takes the persona path. Solo
  runs only, and the persona path of block 6 worked.
- **0.3 Open.** Skill names such as `loopwise-kpi-tree` or `loopwise-test-card` can clash with skills a participant
  has installed for their own user. A rename touches `CLAUDE.md`, `README.md` and every block file.
  A trainer should know that a personal skill of the same name can win over the repo's.
- **0.4 Fixed in v3.** Block 9 fetched the feedback skill from a branch that does not exist, while
  the skill is already in the start state. 7dac825 drops the step; 33d448d makes the skill diff
  from `v3-03-start`.
- **0.5 Fixed in v2.** Claude Code asks for permission for node commands, new files and most shell
  commands. 3570d73 commits `.claude/settings.json`. Setup now says which steps run without asking
  (v3, 8eb01ef). The persona run's page check still asks: proposed, applied by orchestrator (P5).
- **0.6 Open.** The product website and the discovery pages share one header and one style, so the
  two blur. A change to the look, not a blocker; the look is package 1.
- **0.7 Open.** A second navigation for the discovery team, with links from an opportunity to the
  page it is about. A new feature, not a blocker for the day.
- **0.8 Fixed in v3.** Skills end without saying what is left in the block or what comes next.
  fa6b404, e7b3d06 and be47c0c fix it for the block 4 and 5 skills. `loopwise-variant-spec` is proposed,
  applied by orchestrator (P1, with the block README sentence in P3). The block 1 to 3 and block 6
  skills stay open: their blocks are done in the start state or come after block 5.

### Block 1: KPI tree

- **1.1 Fixed in v2.** Block 1 says to read `product/strategy.md` but not where, and the website
  did not show `product/`. a38f5e2 shows it at `/product/strategy.md` with line numbers.
- **1.2 Open.** The try-first question on the buyer's steps gives no format, such as a verb and an
  object. Block 1 is done in the start state.
- **1.3 Open.** The steps in the tree carry metric names, so a reader cannot tell what each step
  is. Block 1 is done in the start state. v2 adds a plain sentence to each driver
  (`loopwise-kpi-tree/SKILL.md:21`); the names stay rates.

### Block 2: Opportunities

- **2.1 Fixed in v3.** The word opportunity is used before anyone explains it. 8eb01ef and 0b0fdf6
  explain it in setup and block 4, where the groups start. The block 2 text stays as it is: block 2
  is done in the start state.
- **2.2 Open.** The feedback on the first try called a need a solution. It should name the
  criterion that broke, and keep the provider's view apart from a solution in disguise. Block 2 is
  done in the start state. v2 writes opportunities as first-person statements in the speaker's
  words (cd5fd36).
- **2.3 Fixed in v3.** Minutes of silence while a skill drafts, with no word on what it does.
  2b1f12e adds a rule to the writing rules, loaded in every session: name each stage.
- **2.4 Fixed in v2.** Ten opportunities in one flat list overwhelm a reader who does not know the
  problem yet. 045a470 shows them on the opportunity map in rows by driver, the active branch first.
- **2.5 Open.** "Done when" stands at the end of block 2, so the other source groups read like a
  must. Block 2 is done in the start state.

### Block 3: Compare and decide

- **3.1 Open.** Block 2 is done with the interviews alone, but the comparison needs the usage data
  and a second source group. The start state holds all five files.
- **3.2 Open.** The shortlist question does not say it only wants a name, and the skill kept
  candidates that failed its own keep test. Block 3 is done in the start state.
- **3.3 Open.** The word shortlist is not explained anywhere. Block 3 is done in the start state.
- **3.4 Open.** The pair's favourite is hard to find in the shortlist, because new IDs cover the
  old ones. Block 3 is done in the start state.
- **3.5 Fixed in v2.** The question to create the comparison file came without warning. 3570d73
  allows writes in `discovery/`; v3 adds the rule to name a file before writing it (2b1f12e).
- **3.6 Open.** After the feedback on the pick, three tasks come at once, and the template's
  example for "We would switch if" can read as a nudge. Block 3 is done in the start state.
- **3.7 Open.** Claude moved on to the next skill while block 3 was still open. The start state
  holds the filled comparison and decision 001; see 0.8 for the skills the groups run.
- **3.8 Open.** The candidate IDs of the comparison do not appear on the opportunity map. Block 3 is
  done in the start state; `/discovery/tree` shows the candidates.
- **3.9 Open.** The comparison merged opportunities that sit on different drivers without flagging
  it. Block 3 is done in the start state.
- **3.10 Open.** The follow-up in the synthetic data comes 28 days after the booking, with no
  training date. It needs regenerated data, and blocks 4 and 5 do not read it.

### Block 4: Intent, ideas, test card

- **4.1 Fixed in v3.** The skill asks for a variant name without saying what a variant is or what
  the name is for. fa6b404, 0b0fdf6.
- **4.2 Fixed in v3.** The test card links a page that does not exist yet. e7b3d06 and 0b0fdf6 say
  the page is built in block 5.
- **4.3 Fixed in v3.** After the draft, the pair gets one abstract question about all signs.
  e7b3d06 asks which numbered signs a watcher could see or hear.
- **4.4 Fixed in v3.** The sign table has three columns nobody explains, and the persona column
  makes the card read like a plan for an AI test. e7b3d06: two plain columns, the persona view in a
  list below.
- **4.5 Fixed in v3.** AI personas are never introduced before the test card assumes them.
  e7b3d06, 0b0fdf6.
- **4.6 Fixed in v2.** An opportunity that holds two needs leaves the pair unsure which part to work
  on. `loopwise-intent-and-ideas/SKILL.md:53` asks which part.
- **4.7 Fixed in v3.** Go-on line, rework-or-drop line, cross test, ring and Abgleich have no
  explanation. 0b0fdf6 and 8eb01ef explain the two lines and the Abgleich. Cross test and ring
  belong to block 6 and stay as they are.
- **4.8 Open.** A baseline page shown inside a variant logs its events as baseline. Low: no pair's
  variant is read against live data.

### Block 5: Spec, persona, build

- **5.1 Proposed, applied by orchestrator (P2).** The spec skill asked the pair for content as if
  they were the academy, so the pair used dummy text.
- **5.2 Fixed in v3.** The try-first question of the persona run is unclear about which personas
  and what answer it wants. be47c0c.
- **5.3 Fixed in v3.** The persona result was nearly empty and its tables hard to read; nobody said
  up front what a persona run can show. be47c0c says what it can and cannot show and leads with the
  conclusion. v2 already shows the walkthroughs before the tables (407d8fb).
- **5.4 Proposed, applied by orchestrator (P1).** The spec skill named the build as the next step,
  so the persona run on the spec was skipped.
- **5.5 Open.** Nothing at the end of block 5 says that a test with a person comes next, or what to
  do alone. Block 5's file follows the one-day agenda of package 3. The persona run now ends with
  the next step (be47c0c); P7 removes the second day from block 5.
- **5.6 Fixed in v2.** Persona runs judge no sign when every sign is something the tester writes or
  says. `loopwise-test-card/SKILL.md:91` warns the pair; `loopwise-persona-walkthrough/SKILL.md:41` explains why.
- **5.7 Fixed in v2.** A pair that applies every persona proposal adds lines that can touch a sign.
  `05-prototype.md:20`: at most two findings, then check the sign table again.
- **5.8 Fixed in v2.** The persona keeps its own role, which bends the rule that it gets the
  tester's situation. `loopwise-persona-walkthrough/SKILL.md:37` names the clash.

### Block 6: Cross test and learning card

- **6.1 Open.** The learning card asks how the test went before it knows which test happened.
  Block 6. Small fix: read the test files first, then name the test in the question.
- **6.2 Open.** The question whether the sign marks stand is unclear to a pair that observed
  nothing itself. Block 6.
- **6.3 Open.** The same table comes four times in four shapes, then the whole card at once, with
  no word on how to agree. Block 6.
- **6.4 Open.** After the learning card, the skill ends the session without a next step. Block 6;
  the ending from 0.8 would fix it.
- **6.5 Fixed in v2.** A pair whose cross test does not count may move on.
  `loopwise-learning-card/SKILL.md:39` advises against it once.
- **6.6 Fixed in v2.** A later round leaves a stale decision on top. `loopwise-learning-card/SKILL.md:16`:
  each round has its own decision, Who and When.
- **6.7 Fixed in v2.** A persona run that judges no sign is accepted.
  `loopwise-learning-card/SKILL.md:40`.
- **6.8 Open.** The persona of the buyer without budget should show a buyer who does not know
  their people. The re-grounded persona files (224a3ef) no longer hold that line.
- **6.9 Open.** A spec change in round 2 is made by hand and skips the spec rules. Block 6.
- **6.10 Fixed in v2.** The shared thank-you page links back to the baseline form, and a variant
  cannot change it. b3ac23d; `06-test-decision.md:54`: a variant can change the thank-you page.

### Git and block 7

- **7.1 Fixed in v3.** Every block ends with git steps, and nobody says why. 8eb01ef says in setup
  what the commits are for. Hiding git behind one command is not done.
- **7.2 Open.** The run ended at block 7's switch to the reference state. The one-day afternoon
  replaces the demo (package 3).
- **7.3 Open.** Block 7 names no two counts to read. Block 7 is not part of the one-day workshop.

### Assumptions package 0 made

- The start tag is `v3-03-start`, as in D2. Setup, the feedback skill and P4 use that name.
- Every pair works on C1, the opportunity of decision 001. `loopwise-intent-and-ideas` stops if the decision
  names another opportunity, so a pair with its own pick writes its own decision first.

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
