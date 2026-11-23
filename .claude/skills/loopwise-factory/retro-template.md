# Factory retro: <variant>

> Retro after two factory runs, <YYYY-MM-DD>. Prefilled by the loopwise-factory skill. The answers are the pair's own words.
> Label: <repeated from the launch spec>

The factory rebuilt the prototype for production in site/hardened/<variant>/.
Three gates held the build: the validation gate at the entry (hard, owner: product lead), the design gate (soft, owner: designer) and the legal gate (hard, owner: legal).
In each run the factory planted one error on purpose.

## 1. What did the gate catch?
Per run: the gate that fired, where it fired, the file and the rule, and how it was fixed.
- Run 1: ____
- Run 2: ____

## 2. What would the gate have missed?
What a person saw in the build or the review that no gate checks.
- Review of run 1: [discovery/factory/<variant>-review-run-1.md](<variant>-review-run-1.md)
- Review of run 2: [discovery/factory/<variant>-review-run-2.md](<variant>-review-run-2.md)
- Answer: ____

## 3. Whose judgement was in the system, and who was asked live?
Per check: whose rule decided, and whether a person was asked during the run. The factory decided nothing at a gate.
- Validation gate, at the entry: <the launch decision file, decided by the product lead>
- Design gate, run 1: the designer's rule, held by the design system. <flagged right after the write and fixed by the factory, or waived in the file below>
- Legal gate, run 2: legal's rule. The write with the price was refused before it landed. A hard gate takes no waiver.
- Release: <the release record, approved by the product lead at the release prompt, or "held">
- Decision files: <links to the release record and any waiver files for this variant>
- Answer: ____

## 4. What did the factory have to ask that the kit did not answer?
One line per question in [discovery/factory/<variant>-questions.md](<variant>-questions.md).
For each: which file of the kit should have answered it?
- <question> ([discovery/factory/<variant>-questions.md:<line>](<variant>-questions.md#L<line>)): ____
