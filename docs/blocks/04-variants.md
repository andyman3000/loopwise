# Block 4: Intent, ideas, specs, variants

**What it's for:** you turn the chosen opportunity into an intent (what should change for whom,
within which limits), several solution ideas, and a spec per variant. Claude Code builds a variant
from its spec. The spec says what; whoever builds decides how.

## What you do (about 90 min)

1. In Claude Code: `/intent-and-ideas` and name your chosen opportunity. It shows the intent first;
   confirm or change it. It writes `discovery/intents/<opportunity>.md` with 3 to 5 ideas.
2. Read the ideas. Is each one named by what changes on the page? Which assumption is marked
   critical, and how well is it supported?
3. Choose three ideas that become variants. Fill "Ideas that become variants" with a short name per
   variant (lowercase with dashes, for example `success-line-first`).
4. For each variant: `/variant-spec <variant-name>`. It writes `discovery/specs/<variant-name>.md`.
   Read "What changes on the page" before it writes, and correct it.
5. Build one variant. Ask Claude Code:
   > Build the variant in discovery/specs/<variant-name>.md as site/variants/<variant-name>/index.html
   > and add the name to "variants" in site/config.json. Do not set "shipped".
   Then `npm start` and open `http://localhost:3000/inquiry?variant=<variant-name>`.
6. Commit your work, then switch to the reference state. From here on everyone works on the same
   three variants, because Tuesday's data fit them:
   ```bash
   npm run check
   git add -A && git commit -m "block 4: intent, specs, my variant"
   git switch -c from-04 04-variants
   ```

**Done when:** your intent, three specs and one built variant are committed on your branch, and you
are on `from-04`.

**For the Abgleich:** compare your three variants with the reference ones. Where did you choose a
different mechanism?
