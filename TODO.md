# To do

Open work on this repo that is not part of a workshop block.

- **Small eval for the `intent-and-ideas` skill.** Test that an intent file reads on its own: a
  newcomer, or an agent with no other context, can say what should change, for whom, and how it
  would show in the data, without opening another file. Links to other files in `discovery/` are
  allowed for further reading. First test case: `discovery/intents/format-fit.md` before and after
  the rewrite of 2026-11-14 ("This sits on branch A, driver start rate, measured by the event
  `inquiry_started`" failed this test). No eval exists in the repo yet.
- **Decision records for how the repo works.** Bring in the idea of architecture decision records
  (ADRs): one short file per decision on the repo itself, with context, options, decision and
  consequence. Today `discovery/decisions/` holds product decisions only. Changes to skills, rules
  and the chain have no record. First case: the change to `persona-walkthrough` on 2026-11-16
  (walkthroughs shown in chat, two sign tables, proposals ranked by criticality, no two-pick limit
  in setting `team`). Open: folder name, template, and who decides.
- **Ask to update the personas when new evidence comes in.** The persona files in
  `product/personas/` are drafts. When a skill finds a source line that adds to or contradicts a
  persona (a new interview, a test with people, the answers a shipped variant collects), it should
  ask the human whether to update the persona file, and name the line. A persona walkthrough is not
  new evidence: the personas cannot learn from their own run. Open: which skills ask
  (`opportunities-from-source`, `learning-card`, `next-bet`), and who approves the change.
- **Make the views faster to build.** `/discovery/tree` reads and parses every Markdown file it
  needs on each page load: the comparison, every intent, every opportunity file, and per
  experiment the test card, each persona run, each tester file and the learning card. That is fine
  for one opportunity with one experiment. With more experiments the page may get slow. Not now.
  Open: measure first how long one page load takes, then decide. Options: read each file once and
  keep it until it changes, or write the parsed data to one file that `npm run tree` builds.
- **Settle how spec and built page stay in step.** Today the rule is: the spec is the source, and
  every change to the built page goes back into the spec before the test. The product lead accepts
  it for now, and doubts it holds. Spec and page will always drift apart a little. First case:
  `format-quiz` on 2026-11-16. The product lead looked at the built page. The text the quiz puts
  into "What do you need?" read like a data export. The page, the spec and two signs on the
  prototype card changed after the build. Open: is the spec, the page or the prototype card the
  reference for the test? Who checks before the test that the three still fit? Is a check like
  `npm run check` possible, for example one that lists every sign without an element on the page?
