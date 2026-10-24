# Block 7: Read the result

**What it's for:** eight weeks after launch you read every line of the test card against the data.
The honest answer to "did the assumption hold?" is often "partly". You learn what you may conclude,
and what small numbers do not allow.

## What you do (about 60 min)

1. In Claude Code: `/read-result`. It reads `shipped` from `site/config.json`, counts events before
   and after, and writes the "Result" section of that variant's test card.
2. Check two numbers yourself. The result section lists the command behind each number; run two of
   them and compare.
3. Go through the card line by line: success line, usage, proxy, counter metric, kill criterion.
   Which ones are met, not met, unclear?
4. Decide: keep, adjust or roll back. Fill `Decision`, `Who`, `Date` at the end of the Result section.
5. Check and commit:
   ```bash
   npm run check
   git add discovery && git commit -m "block 7: result"
   ```

**Done when:** the Result section exists, you checked two of its numbers, and your decision is in.

**For the Abgleich:** what would you not conclude from these numbers, even though it is tempting?

The data are synthetic and the files say so.
