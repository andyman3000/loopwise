# Block 5: Spec, persona reads the spec, build the prototype

**What it's for:** you describe the smallest page that lets a tester meet your assumption. Two AI
personas read that description before the build, so you fix the obvious gaps cheaply. Then Claude
Code builds the page. On Tuesday a person from another pair tests it.

## What you do (about 62 min)

1. **Spec (20 min).** `/variant-spec <variant>`. It asks for the smallest page that lets a tester hit
   the assumption. It reads your prototype card and writes `discovery/specs/<variant>.md`. Read
   "What changes on the page" before it writes, and correct it. Check the table "Where the watcher
   sees each sign": every sign on your card needs a place on the page.
2. **Persona reads the spec (15 min).** `/persona-walkthrough <variant> spec`. It first asks where
   you expect the personas to stall. Then it plays the soft and the hard sponsor through your
   scenario and writes `discovery/user-tests/<variant>-spec.md`. Every reaction quotes the persona
   file. A persona cannot tell you what its file has no source for; the file says where.
3. **Change the spec (10 min).** Pick at most two findings and change the spec. You decide; the
   persona run only proposes.
4. **Build and open (12 min).** Use the build prompt at the end of the spec:
   > Build the variant in discovery/specs/<variant>.md as site/variants/<variant>/index.html
   > and add the name to "variants" in site/config.json. Do not set "shipped".

   Then `npm start` and open `http://localhost:3000/inquiry?variant=<variant>`. Click through it
   once as the tester will. Stop the server with `Ctrl+C`.
5. **Check and commit (5 min).**
   ```bash
   npm test && npm run check
   git add discovery site && git commit -m "block 5: spec and prototype"
   ```

**Done when:** the spec, the persona run on the spec and a page that opens at
`/inquiry?variant=<variant>` are committed. Tuesday's test needs a page from every pair, so the build
comes before anything else that is left.

**If you are short of time:** skip steps 2 and 3. On Tuesday you can run
`/persona-walkthrough <variant> page` on the built page instead.

**For the Abgleich:** what did the persona find that you had not expected? What could it not tell you?
