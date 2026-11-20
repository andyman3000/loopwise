# Policy: build to earn starts only after a launch decision

> Gate: validation (hard). Owner role: product lead. Rule file for the validation gate in
> `gates/gates.json`.

## Owner

The product lead owns this rule. A failing validation gate lands on the product lead's table.

## Rule

A variant goes into build to earn only after it proved itself. The proof is a launch decision by
the product lead in `discovery/decisions/`: a file whose name contains `launch`, with these lines:

```
Variant: <variant>
Decision: launch
Decided by: <a person>
Role: product lead
Date: <YYYY-MM-DD>
Reason: <why the variant proved itself, citing the learning card round it rests on>
```

The gate checks it twice:

- at the entry, before the factory builds: `node scripts/check-gates.js --entry <variant>`. The
  loopwise-factory skill runs it first and stops if it fails.
- in `npm run check`, for every hardened variant under `site/hardened/`, and in the release step.

## Reason

Build to learn makes a prototype fast to test one assumption. Build to earn rebuilds it for real
visitors, and that costs. It is worth it only for a variant whose assumption held with people. A
learning card that says "another round" is not a launch.

## Hard gate: no waiver

This gate is hard. A waiver for `Gate: validation` is ignored. An agent never writes the launch
decision: `Decided by` must name a person.

## What does not count

- A learning card alone, even one that says "move on". The launch is its own decision.
- A decision that says `Decision: hold`, or names an agent, or has no role, date or reason.
