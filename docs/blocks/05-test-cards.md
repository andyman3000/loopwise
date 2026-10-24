# Block 5: Test card

**What it's for:** before anything goes live, you write down per variant what must be true, the
success line, and what you will measure after the release: usage, a proxy, a counter metric, and when
you take the variant back. The success line is set now and never edited after data arrive.

## What you do (about 60 min)

1. You are on `from-04` with the three reference variants. Look at each:
   `http://localhost:3000/inquiry?variant=<name>` (names in `site/config.json`).
2. For each variant: `/test-card <variant-name>`. It writes `discovery/test-cards/<variant-name>.md`.
3. Read each card. Does every metric name the events it is computed from? What does "What we cannot
   see" list?
4. Own the card. Fill `Card owner`, and turn the proposals into your values: the success line and the
   kill criterion at least. A number you set here is a target, not evidence; that is fine, as long as
   it is set before launch.
5. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 5: test cards"
   ```

**Done when:** three test cards exist, each with an owner, a success line and a kill criterion.

**For the Abgleich:** which variant has the weakest critical assumption? What would you test before
going live?
