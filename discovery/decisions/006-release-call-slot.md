# Decision 006: release call-slot

> Reference decision (replace with your own). Release decision for the hardened build in site/hardened/call-slot/. A person writes it, never an agent.
> Copied from .claude/skills/loopwise-factory/release-decision-template.md.
> `npm run release -- call-slot` reads the six lines below. It releases only on "Decision: release".

Variant: call-slot
Decision: release
Decided by: Noa Vale
Role: product lead
Date: 2026-11-20
Reason: All three gates pass: the test with people passed and launch is decided ([discovery/decisions/005-launch-call-slot.md](005-launch-call-slot.md)), the design and legal findings are fixed, and the server stores each booked slot and counts it. The release is one key on localhost. Before real visitors book, someone must send the video link and answer the phone at set hours.

## Options considered
- Release now.
- Hold the release until someone sends the video link after each booking and the phone hours are set.

## What it rests on
- Gates: validation gate (owner: product lead, hard): pass. Design gate (owner: designer, soft): pass. Legal gate (owner: legal, hard): pass.
- Launch decision: [discovery/decisions/005-launch-call-slot.md](005-launch-call-slot.md)
- Launch card: [discovery/test-cards/call-slot.md](../test-cards/call-slot.md), success line at least 10% of inquiry page visits end in a scoping call, on the step the intent names: yes
- Design waiver: none
- Launch spec: [discovery/specs/call-slot-launch.md](../specs/call-slot-launch.md)
- Questions the factory left open: [discovery/factory/call-slot-questions.md](../factory/call-slot-questions.md)
