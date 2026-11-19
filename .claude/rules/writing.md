# Writing

Every artefact and every reply here is read by someone new to the material.
Each sentence must make sense on first reading, without the files around it.

## Say the full thing
- No coined labels. Do not invent a short name for an idea and reuse it.
  Write what people said or did, every time.
  - Not: "buyers who don't book name the fade, not the format"
  - But: "buyers who don't book are worried the training won't last,
    not unsure about the format"
- Terms from `product/glossary.md` and the product terms named under
  "Audience and Language" in `CLAUDE.md` are allowed. Nothing else gets a label.
- No bare IDs. Say what the source says first, then add the ID as a pointer.
  Not "R02 and R08 name it", but "two respondents fear nothing changes
  after the workshop (R02, R08)".
- No metaphor in place of a fact. Say what happens, to whom, how often.
- No noun stacks. At most two nouns in a row.
  Not "booking rate link", but "whether this changes the booking rate".
- A person or a system is the subject. Not "the quote carries" or
  "the data says", but "the buyer says" or "12 of 40 visits end here".
- Every verb names its object or person, unless the sentence leaves no
  doubt. Not "before I can ask", but "before I can send you an inquiry".

## Sentences
- Under 15 words. One idea per sentence.
- A semicolon joining two claims becomes two sentences.

## Cut
- Filler: actually, basically, essentially, really, quite, just, simply,
  clearly, of course, in fact.
- Bridges: it's worth noting, in other words, at its core, when it comes to,
  that said, ultimately, this matters.
- "serves as", "stands as", "represents": write "is".
- "Not just X, it's Y": write Y.
- Forced lists of three, and announced counts ("Two things:").
- "Nobody", "nothing", "everyone": name the group. "No respondent reports".
- Stance adverbs: genuinely, quietly, deliberately, plainly.

## Citations are links
Every reference in an artefact is a clickable Markdown link.
A reader in a Markdown preview then opens it with one click.
- The link text stays `file:line`, the path from the repo root.
- The target is the same file, relative to the artefact's own folder.
- A line becomes the fragment `#L<line>`. A range `:12-14` links to `#L12`.
- A file without a line links to the file, with no fragment.
- From `discovery/intents/x.md`, a mail line is
  `[sources/inquiry-mails/inquiry-07.md:16](../../sources/inquiry-mails/inquiry-07.md#L16)`.
- From the same file, the comparison is
  `[discovery/opportunity-comparison.md](../opportunity-comparison.md)`.
- No backticks inside the link text. `npm run check` flags a link
  whose target or line differs from its text.

## While you work
- Before work that takes more than a moment, say what you do now.
  Name the stages, for example "I read the five files, then I draft."
- Before you write a file, name it: "I am writing discovery/... now."
- Never go quiet for minutes. After each stage, say it is done.

## Before saving
Read each sentence as someone who opened only this file.
If a phrase needs another file or the chat to make sense, rewrite it.
