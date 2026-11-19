# Policy: no prices on the website

> Gate: legal (hard). Owner role: legal. Rule file for the legal gate in `gates/gates.json`.
> Scenario rule: the agreement below is part of the fictional Loopwise setting.

## Owner

The legal role owns this rule. A failing legal gate lands on legal's table.
The fix is in the page: the price comes out.

## Rule

Loopwise publishes no prices on its website.
This covers every hardened variant under `site/hardened/<variant>/`.
Prices go to a buyer only in the written offer, after the scoping call.

## Reason

Loopwise has an agreement with a trade association.
Under it, members publish no prices for in-house training.
The product context already keeps prices off the website:
"No prices, not on the website and not in data"
([product/constraints.md:7](../../product/constraints.md#L7)).
The strategy repeats it ([product/strategy.md:41](../../product/strategy.md#L41)).

## Hard gate: no waiver

This gate is hard. No role can waive it, legal included.
A waiver file for `Gate: legal` in `discovery/decisions/` is ignored.
`npm run check` says so in its output.
To change the rule, legal changes this file and `gates/gates.json`.

## What counts as a price

The legal gate reads every text file in a hardened variant.
That includes HTML comments and scripts, because a browser receives them too.
These count as a price:

- A currency symbol or code next to a number: `€ 1,200`, `1.200 EUR`, `$990`, `CHF 800`,
  `450 euro`. Symbols and codes: €, $, £, EUR, USD, GBP, CHF, euro, dollar, franc.
- An amount per unit: `1,200 per participant`, `990/day`, `€ 80 per person`.
  Units: participant, person, head, day, seat, attendee, team, group, session, workshop, hour.
- A price word with an amount: `from 1,200`, `only 990`, `starting at 2.400`, `costs 900`.
  Price words: from, only, just, starting at, starts at, as low as, price, priced at, cost,
  costs, fee, budget, pay.

An amount here is a number with a thousands separator, or with three digits or more.
With a currency, any number counts.

## What does not count

These stay clean, so the gate stays quiet on normal page text:

- Dates: `2026-08-19`, `19.08.2026`, `19/08/2026`, `from 2027`.
- Times: `from 9:00 to 17:00`, `14.30`.
- Phone numbers: `+49 30 1234 5678`, `call 0800 123 456`.
- Counts: `5 people`, `from 6 to 20 participants`, `up to 15 per team`, `four weeks`.
- Percentages: `only 30%`.

When the gate flags a line that is not a price, tell the legal role.
Legal decides whether the rule changes. The gate does not take a waiver.
