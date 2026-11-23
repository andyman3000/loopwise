# Design system

Every page in `site/` is built on the design system in `site/styles.css`. This holds whenever an
agent builds a variant: a prototype in `site/variants/` (build to learn) and a hardened variant in
`site/hardened/` (build to earn) alike. The designer owns the design system.

## When you build a page

- Link `/styles.css` and build from its components: `site-header`, `brand`, `site-footer`, `lead`,
  `eyebrow`, `note`, `muted`, `card`, `card-grid`, `actions`, `button`, `secondary`, `field`,
  `error`, `with-aside`, `path`, `done-head`, `done-check`, `done-next`. The header comment of
  `site/styles.css` is the full list.
- Use tokens for every colour, spacing step and radius: `var(--accent)`, `var(--space-4)`,
  `var(--radius-sm)`. Never a raw colour (`#e33`, `rgb()`, `red`) or a raw spacing value (`12px`,
  `1.5rem`) in a page or a variant's own CSS. The design gate checks colours and spacing; radius
  is a rule the designer reviews by eye.
- One choice from a short list (a time slot) is a group of native radio buttons in a `fieldset`
  with a `legend`: screen readers then say that only one can be chosen. A day in a calendar grid
  is a `.button secondary` with `aria-pressed="true"` when chosen, and disabled when it cannot be
  chosen. A small control such as a close or a month button is a `.button secondary` too.
- One primary action per view is `.button`; a second action is `.button secondary`. No other
  button look.
- A page may add layout classes of its own, for a grid or a calendar. They use tokens only and
  never restyle a component or a native control (`button`, `input`, `select`, `textarea`): no own
  background, colour, border, radius, font or shadow on them.
- If the page needs a component the design system does not have, say so to the human and leave it
  to the designer. Do not invent one in the page.

## Who checks it

- Build to learn: the rule leads, no gate blocks. The design system makes the prototype fast and on
  brand.
- Build to earn: the guard flags design findings right after each write in `site/hardened/`. The
  guard is a check in `.claude/settings.json` that Claude Code runs before and after each write.
  The agent fixes each finding then and there. `npm run check` and `npm run release` check again.
  The designer is not asked in the run: the design system holds the designer's judgement.
- Outside the run, the designer can let one finding pass. The designer writes a waiver in
  `discovery/decisions/`, or approves an addition to `site/styles.css` that the page then uses.
  The guard asks before any change to `site/styles.css`.

## Changing the design system

Only the designer changes `site/styles.css` and the Design System artifact linked in `README.md`.
A change made in one is brought to the other in the same sitting. One exception: in setting
`workshop` (`CLAUDE.md`), an addition the designer approves at the design gate stays in
`site/styles.css` only. The Design System artifact is not updated in the workshop.
