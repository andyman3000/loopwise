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

## Package 4: tags

## Package 5: material
