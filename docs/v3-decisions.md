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

The designer role should check G3 to G6 and G9. The legal role should check G7 and G8.

### G1. How does `npm run check` run both checks?

- **Question:** the discovery check and the gates are two scripts. How do both run and both report?
- **Choice:** `npm run check` is `node scripts/check-gates.js --with-discovery`. The gate script
  runs `scripts/check-discovery.js` first, unchanged, then the gates. It exits 1 if either fails.
- **Reason:** `a && b` skips the gates when discovery fails, so a reader sees only half.
  A shell construct with exit codes does not run the same on every system.
  The discovery script stays as it is.
- **Undo:** set the `check` script back to `node scripts/check-discovery.js` and call
  `node scripts/check-gates.js` on its own.

### G2. Where do owner, kind and rule of a gate live?

- **Question:** does the script or `gates/gates.json` say who owns a gate and whether it is soft?
- **Choice:** `gates/gates.json` holds id, name, owner role, kind and rule file. The script holds
  only the checks, one per gate id. The rule file of the design gate is
  `gates/policies/design-system.md`; the legal gate's is `gates/policies/no-prices.md`.
- **Reason:** a trainer can make the design gate hard, or change an owner role, in one file.
- **Undo:** move the fields into the script and drop them from the JSON file.

### G3. Which classes may a hardened variant use?

- **Question:** the first brief flagged every class that `site/styles.css` does not define. A
  hardened variant may need classes of its own, for a calendar or slot times.
- **Choice (orchestrator update):** page-local classes are allowed. Their CSS must use tokens
  only, which the colour and spacing rules check. `design/component-outside-system` fires in two
  cases. A `<button>`, `<input type="submit|button">` or a link with a class containing btn, button
  or cta lacks the class `button`. Or the variant restyles a design system component or a native
  control: the last part of a selector targets a class from `site/styles.css`, or a bare `button`,
  `input`, `select` or `textarea`, and sets background, color, border (radius included), font or
  box-shadow. Layout properties on those selectors pass.
  A `style` attribute on such an element counts the same as a CSS rule.
  The button class name `button` is written in the script, as the contract names it.
- **Reason:** a hardened page needs its own layout. The look of components stays with the designer.
- **Undo:** in `scripts/check-gates.js`, drop the restyle check in `scanDeclarations` or the
  button check in `scanTags`.

### G4. May a variant define its own spacing tokens?

- **Question:** a variant could write `--slot-gap: 12px` and then `gap: var(--slot-gap)`. The
  spacing rule would not see it.
- **Choice:** in a spacing property, a `var(--name)` that `site/styles.css` does not define on
  `:root` is a finding, `design/unknown-token`.
- **Reason:** without it, any spacing value passes behind a local custom property.
- **Undo:** remove the `var(` loop in `scanDeclarations`.

### G5. Where does the design gate look for colours?

- **Question:** "hard-coded colours anywhere" could mean every `#abc` in a file, page text included.
- **Choice:** CSS files, `<style>` blocks, `style` attributes, colour attributes (`fill`, `stroke`,
  `color`, `bgcolor`, `stop-color`), and string literals in scripts. In scripts, hex and colour
  functions count in every string, named colours only where a script sets a style. A string passed
  to `querySelector`, `getElementById`, `closest` or `matches` is skipped, because `#add` is an id
  there. Page text and HTML comments are not read for colours. `transparent`, `currentColor`,
  `inherit` and `none` are not colours.
- **Reason:** keeps findings to code that paints the page, with few false alarms.
- **Undo:** widen `scanJs` or `scanTags` in `scripts/check-gates.js`.

### G6. Which values count as hard-coded spacing?

- **Question:** which properties and units?
- **Choice:** `px`, `rem` and `em` values in margin, padding, gap (also row-gap, column-gap),
  inset and scroll-margin or scroll-padding, outside a token. `0` passes. Width, height, top and
  left are layout and are not checked. Border widths are not spacing, so `1px solid` passes.
  Radius is not checked yet, although `.claude/rules/design-system.md` asks for radius tokens.
- **Reason:** the brief names margin, padding and gap. Radius can join once the designer wants it.
- **Undo or extend:** edit the `SPACING` pattern in `scripts/check-gates.js`.

### G7. What does the legal gate read, and what counts as a price?

- **Question:** which files and which number patterns?
- **Choice:** every text file of a hardened variant (HTML, CSS, JS, JSON, SVG, text, Markdown),
  comments included, because a browser receives them. Three rules, listed in
  `gates/policies/no-prices.md`: a currency next to a number, an amount per unit, a price word with
  an amount. Without a currency, an amount needs a thousands separator or three digits, does not
  start with 0, and is not a year. A number followed by a count word, a percent sign, a colon or a
  date separator is not an amount. `$` followed by a quote is a script pattern, not a price.
- **Reason:** keeps dates, times, phone numbers and counts clean.
- **Known gaps:** "only 90" without a currency passes. Amounts in words ("twelve hundred euros")
  pass. Legal decides whether the rule grows.
- **Undo or extend:** edit `PRICE_RULES` and `NOT_AN_AMOUNT` in `scripts/check-gates.js`, and the
  policy file with it.

### G8. The reason behind the legal rule

- **Question:** the brief names an agreement with a trade association. The product files give
  another reason: the price is discussed in the scoping call.
- **Choice:** the policy names the agreement as a scenario rule and cites
  `product/constraints.md:7` and `product/strategy.md:41`, where prices already stay off the site.
- **Reason:** both reasons point the same way. The citation shows the rule is not new.
- **Undo:** edit `gates/policies/no-prices.md`.

### G9. What makes a waiver valid?

- **Question:** how strict is the check on a waiver file?
- **Choice:** a file in `discovery/decisions/` with `waiver` in its name. It needs `Gate`,
  `Variant`, `Owner role` equal to the gate's owner role, `Decided by` with a person (a
  placeholder, or a name such as Claude, agent or assistant, is refused), `Date` as YYYY-MM-DD,
  and a reason (a `Reason:` line or other text). Field lines may carry Markdown bold or a list
  dash. A waiver covers one variant and every design finding in it, also later ones. A waiver for
  a hard gate is ignored, and the output and the JSON say so.
- **Reason:** the agent never decides at a gate. A waiver that names no person is not a decision.
- **Risk:** a waiver stays valid when the variant gets new findings after the designer signed.
  The designer may want the waiver to list the findings it covers.
- **Undo:** edit `waiverProblem` in `scripts/check-gates.js`.

### G10. What does `--json` print?

- **Question:** package 3's release step reads the gate result. In which shape?
- **Choice:** `{ ok, scanned, hardened, gates, notes }`. `gates` is keyed by gate id. Each gate
  has `status` (`pass`, `fail`, `waived`), `owner`, `kind`, `rule`, `variants` (status per
  variant), `findings` (variant, file, line, rule, match, owner, kind, waived, waiver) and
  `waivers` (file, variant, applied, and why it was ignored). `--json` runs the gates only, not
  the discovery check.
- **Reason:** the release step needs one status per gate and per variant.
- **Undo:** change `checkGates` in `scripts/check-gates.js`; package 3 reads it.

### G11. Files outside a variant folder

- **Question:** what happens to a file placed directly in `site/hardened/`?
- **Choice:** it is not scanned, and the output gives a note.
- **Reason:** every finding and every waiver names a variant.
- **Undo:** scan such files under their own name in `checkGates`.

## Package 3: lean launch spec and factory

### P3-1. Lean launch mode (loopwise-variant-spec)

- **Choice:** mode `launch` writes at most one page (aim under 60 lines, cap 80) with six sections:
  kit, non-functional requirements, decisions taken, events against the launch card, invisible
  behaviour, open points. It keeps "try first", now asking what a developer would need that the
  prototype does not show. A fresh subagent compares the draft with the prototype; every line it
  lists as visible is cut or shortened. Mode `learn` is byte-identical to before (both learn
  sections diffed).
- **Smaller choices:** the learn-only rules shared by both modes stay in place, with a sentence
  that they do not apply in launch. Launch finds the learning card by name (`*-<variant>.md`), since
  call-slot's card is 003, not 002. The launch template has no build prompt; the factory builds
  from the kit.
- **Undo:** revert the commit "loopwise-variant-spec: launch mode writes the lean launch spec".

### P3-2. The reference launch spec for call-slot

- **Choice:** 60 lines. Only decisions the product lead already took are written as decided; every
  other human field is open. The prototype check listed 13 lines: 3 cut, 10 shortened. Time zone
  and public holidays left the open points that way, because the check counted their absence on
  the page as visible. The factory then asked about the time zone itself (see the questions file
  on `v3-07-factory-run-1`).
- **Found:** the live event log stores no session (`site/components/events.js`), while the launch
  card counts sessions. The success line cannot be counted from the live log as it stands. Left as
  an open point for the developer in the spec; not fixed.
- **Check:** the trainer who owns Loopwise, whether "how a booked slot is stored" should be decided in the spec for the
  day, so the factory has one question fewer.

### P3-3. Factory, release, serving

- **Choice:** `/loopwise-factory <variant> run-1 | run-2 | retro`. It reads only the kit plus the design
  system and the site infrastructure, writes only `site/hardened/<variant>/` and
  `discovery/factory/`. Before planting, it checks its clean build with the gates quietly and fixes
  it; then it plants one error, runs `npm run check` in the open, has a fresh subagent review the
  diff into `discovery/factory/<variant>-review-run-<n>.md`, and hands each failing gate to its
  owner role with the options. It never writes a waiver, a release decision or the shipped key,
  and never says which error it planted.
- **Release:** `npm run release -- <variant>` (with `--dry-run`) sets `shipped` only when the legal
  gate passes, the design gate passes or is waived, and a release decision names a person with
  role product lead and says "Decision: release". Nothing is deployed anywhere.
- **Serving:** `?variant=<name>&build=hardened` shows the hardened build before release; a shipped
  variant is served from `site/hardened/<name>/` when that folder exists.
- **How it was built:** the subagent for this package lost its network connection after its four
  tooling commits and the first trial run (run 1 failed at the design gate and passed after a fix).
  The orchestrator reviewed the commits, kept them, and ran run 2 in the reference runs (P4-3).
- **Undo:** revert the four commits (server, release, loopwise-factory skill, fixes from the first trial).

## Package 4: tags

### P4-1. Reference states carried by path, not by commit

- **Question:** the brief says to carry the v2 reference states onto v3 by cherry-pick. Between
  `v2-03` and `v2-06` lie 79 commits, most of them tooling that v3 already carries (D2).
- **Choice:** one commit per block: the files under `discovery/`, `site/variants/`,
  `site/config.json` (and `walkthrough/` at block 6) as they are at the v2 tag. The opportunity
  comparison keeps v3's corrected citation. One citation into `site/confirmation.html` follows the
  page, whose styles moved into the design system file. `data/` is unchanged between `v2-03` and
  `v2-06`, so the launch card still finds no events for call-slot.
- **Reason:** the same end state with four readable commits, and no conflicts with v3's tooling.
- **Undo:** none needed; each commit names its v2 tag.

### P4-2. Reference prototypes on tokens

- **Choice:** in the three prototypes, every spacing or radius value that equals a token became
  that token (17 lines). Other values stay as they are: prototypes are not gated. Screenshots of
  the five variant pages at 1280 and 390 px are pixel-identical before and after; scripts and event
  names are unchanged.

### P4-3. Reference runs

- **Choice:** `v3-07-factory-run-1` and `v3-08-factory-run-2` were produced by an agent following
  the loopwise-factory skill, with the human steps played by a fictional product team member ("Noa Vale")
  and marked as reference decisions. Run 1 is healed by a fix, not a waiver; the run 1 guide offers
  both.

### P4-4. Two design system states added for the factory

- **Question:** call-slot's calendar needs a chosen day and days that cannot be chosen. The design
  system had no look for either, so a clean hardened build was impossible without restyling a
  button, which the design gate flags.
- **Choice:** `site/styles.css` got `.button[aria-pressed=true]` and `.button:disabled`, and the
  rule file says to use them. No base page uses them; base page screenshots are unchanged. The
  artifact's Button card shows both.
- **Undo:** revert the commit "design system: button states ...".

## Package 5: material

### P5-1. The morning maps onto existing blocks

- **Choice:** jump = `00-setup.md` (25 min); ideation = block 4, read first and steps 1 to 4
  (50 min); persona test and what to measure = block 4 steps 5 to 7 plus block 5 steps 1 and 2,
  without the build (60 min). Each block file says group size, minutes and task at the top. Block
  5's step 3 (change the spec) is done only if time is left.
- **Reason:** the agenda's three morning slots fit the existing steps; no new block file.
- **Check:** the trainer who owns Loopwise, whether "persona test" means the persona run on the spec, as assumed here.

### P5-2. Agenda differences decided by the trainers on 2026-11-19

- Run 2 is a legal gate (prices on the page), not the API key gate in the agenda.
- The afternoon runs on call-slot from `v3-06-test-decision`, the only variant with a launch card.
  A pair may use its own prototype once it has a launch card and a launch spec.
- No agenda file was changed.

