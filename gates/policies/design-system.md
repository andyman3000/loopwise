# Policy: hardened pages use the design system

> Gate: design (soft). Owner role: designer. Rule file for the design gate in `gates/gates.json`.

## Owner

The designer role owns this rule.
The designer decides it once, in the design system, not page by page.
In a factory run the designer has nothing to do: the agent fixes each finding.
Outside the run the designer has two moves.
The designer makes an exception for one variant: a waiver, below.
Or the designer adds the missing token or component to `site/styles.css`.

## Where it fires

- Right after each write in `site/hardened/`. A guard runs the gate on the written file.
  It flags each finding, and the agent fixes it at once. Nobody is asked.
- In `npm run check`, for every hardened variant.
- In `npm run release`, which runs every gate again before `shipped` changes.

## Rule

A hardened variant under `site/hardened/<variant>/` builds on the design system.
The design system is `site/styles.css`.
The gate reads its tokens and classes each time it runs:

- A token is any custom property `--name:` defined on `:root` in `site/styles.css`.
- A design system class is any `.name` in a selector in `site/styles.css`.

Prototypes under `site/variants/` are never scanned.
A prototype is built to learn, so no gate blocks it.

## What the gate flags

The gate reads the HTML, CSS and JS files of each hardened variant.

- `design/hard-coded-colour`: a colour written as a value, not as a token.
  Hex (`#e33`), colour functions (`rgb()`, `hsl()` and the like) and named colours (`red`).
  Checked in CSS files, `<style>` blocks, `style` attributes, colour attributes such as `fill`,
  and string literals in scripts.
  `transparent`, `currentColor`, `inherit` and `none` are fine.
- `design/hard-coded-spacing`: a `px`, `rem` or `em` value in margin, padding, gap, inset or
  scroll spacing, outside a token. `var(--space-3)` and `0` are fine.
- `design/unknown-token`: a spacing property that uses a `var(--name)` the design system does
  not define. A variant does not invent its own spacing scale.
- `design/component-outside-system`, in two cases:
  - A `<button>`, an `<input type="submit">` or `<input type="button">`, or a link with a
    button-like class (the name contains btn, button or cta), without the class `button`.
    `button secondary` is the second style.
  - The variant's CSS restyles a design system component or a native control.
    That is a selector whose last part targets a design system class (`.button`, `.card`,
    `.field`) or a bare `button`, `input`, `select` or `textarea`.
    It is flagged when it sets background, color, border, font or box-shadow.
    Layout on those selectors is fine: display, grid, flex, gap with tokens, width, position.
    A `style` attribute on such an element counts the same.

Page-local classes are allowed, such as a calendar or a list of slot times.
Their CSS must use tokens only. The colour and spacing rules check that.

## Soft gate: the owner's exception, outside the run

The gate is soft: its owner may make an exception.
Only the designer can let a failing design gate pass.
The designer does this outside a factory run, never inside it.
The designer writes a waiver file in `discovery/decisions/`.
Its file name contains `waiver`, for example `004-design-waiver-call-slot.md`.
It holds these lines:

```
Gate: design
Variant: <variant>
Owner role: designer
Decided by: <name of the person>
Date: <YYYY-MM-DD>
Reason: <why this variant may ship with these findings>
```

A waiver covers the design gate for that one variant.
It does not cover another variant or the legal gate.
An agent never writes a waiver on its own. `Decided by` names a person.
