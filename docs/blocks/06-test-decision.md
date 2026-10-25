# Block 6: Cross test, learning card, carry on

**What it's for:** a person who did not build your page tries it, and you watch. You hold what you
saw against the lines you set in block 4. Then you decide what happens to your variant: move on,
another round, or kill. That decision is your learning card, decision 002.

## 6a: Cross test and learning card (about 65 min)

1. **Set up the ring (3 min).** One person of each pair goes to the next pair and plays the sponsor
   there. The other stays and watches their own page. On your laptop: `npm start`, open
   `http://localhost:3000/inquiry?variant=<variant>`, and open your prototype card next to it.
2. **Test (20 min).** Give the tester only the "Test scenario" from your card: the situation and the
   task. Ask them to think aloud. Do not explain the page, and do not name the assumption. Then
   watch, and write your notes into `discovery/user-tests/<variant>-cross.md`:
   ```markdown
   # Cross test: <variant>

   > Notes by the watcher, <your name>, <date>. One tester from another pair.

   ## What the tester did and said
   - <one line per thing you saw or heard, words in quotes, word for word>

   ## Signs from the card
   - <sign>: seen / not seen / unclear
   ```
   When the tester asks you something, write the question down and answer "what would you do now?"
   Stop the server with `Ctrl+C` when the test is over. The tester goes back to their own pair.
3. **Learning card (25 min).** Together again: `/learning-card <variant>`. It asks one question at a
   time. It asks how it went, what the tester did, which signs you saw, and whether the assumption
   held. Then what you learned, and what you will do. It writes only what you say, into
   `discovery/decisions/002-<variant>.md`, and quotes your notes file.
4. **Check and commit.**
   ```bash
   npm run check
   git add discovery && git commit -m "block 6: cross test and learning card"
   ```

**If the cross test drops** (no tester, or no page on the other side): run
`/persona-walkthrough <variant> page` on your own page. It opens the page with the browser tool and
plays both sponsors. Then run `/learning-card <variant>`. The card then says "pressure-tested, not
validated". The personas come from the same sources as your opportunity.

## 6b: Carry on (about 35 min), then the Abgleich

Go as far as you get. What you do depends on your learning card:

- **Move on:** first write the changes from "Therefore we will" into the spec, and rebuild if they
  change the page. A variant replaces only the inquiry page, so a change to the thank-you page
  waits. Then `/test-card <variant> launch`. It writes `discovery/test-cards/<variant>.md`: success
  line, usage, proxy, counter metric, kill criterion, time frame. Fill its `Card owner`. Your own launch card cannot be read against the
  data in this repo. The synthetic data were generated for one reference variant only, and the card
  says so. You see a result read against data in the demo.
- **Another round, changed spec:** change the spec. If a sign on your card lost its place on the
  page, change the card and date the change. Rebuild, run `/persona-walkthrough <variant> page`,
  then `/learning-card <variant>` again. It adds round 2 to decision 002.
- **Another round, next idea, or kill:** say why in the learning card. In the intent, fill a second
  "Selection (human)" below the first for the next idea, with its own variant name. Then
  `/test-card <next-variant> prototype`, `/variant-spec <next-variant>`, build, and
  `/persona-walkthrough <next-variant> page`. Its learning card becomes decision 003.

Commit what you have:
```bash
npm run check
git add discovery site && git commit -m "block 6: carry on"
```

**Done when:** decision 002 is committed with what you saw, what you learned and what you decided.

**For the Abgleich:** which signs did the tester show that the personas did not, and the other way
round? Who killed an idea, and why was that a good result?
