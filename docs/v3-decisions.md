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

## Package 3: lean launch spec and factory

## Package 4: tags

## Package 5: material
