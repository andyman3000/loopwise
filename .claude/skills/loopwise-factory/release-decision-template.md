# Decision <number>: release <variant>

> Release decision for the hardened build in site/hardened/<variant>/.
> `npm run release` writes this record itself after the product lead approves at the release prompt.
> A person can still write one by hand, never an agent: copy .claude/skills/loopwise-factory/release-decision-template.md and replace every <...>.
> `npm run release -- <variant>` reads the six lines below. It releases only on "Decision: release".

Variant: <variant>
Decision: <release or hold>
Decided by: <name of the person>
Role: product lead
Date: <YYYY-MM-DD>
Reason: <why this build may go to real visitors now, or what must change first>

## Options considered
- Release now.
- Hold the release until <what must change first>.

## What it rests on
- Gates: <the three gate lines from npm run check, for example: legal gate (owner: legal, hard): pass>
- Launch decision: <the launch decision file in discovery/decisions/>
- Launch card: <the success line>, on the step the intent names: <yes, or which step differs>
- Design waiver: <the waiver file in discovery/decisions/, or "none">
- Launch spec: discovery/specs/<variant>-launch.md
- Questions the factory left open: discovery/factory/<variant>-questions.md
