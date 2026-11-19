---
name: loopwise-opportunities-from-source
description: Find opportunities (customer needs or pains, never solutions) in one source group under sources/, with verbatim quotes and line locations, counted voices, the KPI branch each would move, and counter-evidence. Run once per source group, e.g. "loopwise-opportunities-from-source sources/interviews". The usage data in data/ can be read too: it yields observations (where people drop out), not opportunities. Writes discovery/opportunities/<source-group>.md. Does not choose what goes into the comparison.
---

# loopwise-opportunities-from-source
- **When:** after `loopwise-kpi-tree`, once per source group (`sources/interviews`, `sources/inquiry-mails`, `sources/feedback`, `sources/inbox`, and `data`).
- **Input:** one folder or file under `sources/`, or `data`. If none is given, offer every source group first (step 0a), then wait.
- **Reads:** that source, `discovery/kpi-tree.md`, `product/personas/`.
- **Writes:** `discovery/opportunities/<source-group>.md` (for example `interviews.md`, or `data.md` for the usage data).

This file is an **assessment by an agent, not a decision**. Say so at the top of the output.

## Rules

- **Try first, then compare.** Before you draft, ask the human for the need behind one quote. Show one quote from the source with file:line, then ask: what need or pain sits behind it, and is what the person says a need or already a solution?. Wait for the answer and never invent it. After drafting, fill the section "Your first try": their answer word for word, then two or three short lines on where your draft differs and why. If they say skip, write "skipped". This step is how participants learn the concept; do not shorten it.
- **Feedback on the first try.** Right after the human answers, tell them in two or three short lines how strong their answer was: what was good, what was weak, and why. Judge it against what an opportunity is. Did they name a need or a pain, or a solution in disguise (a page, a button, a field, a format)? Does the need stay close to the speaker's words, or read more into the quote than it says? Did they say correctly whether the quote itself is a need or a solution? For `data`, judge whether they read the count as where people drop out, not why. Name their words. Be honest and specific, never flattering. A skipped answer gets no feedback. Write the same lines under "Feedback" in "Your first try".
- Every claim quotes its source with location: file and line, written as a Markdown link from this file: `[sources/interviews/sponsor-carla.md:33](../../sources/interviews/sponsor-carla.md#L33)` (`.claude/rules/writing.md`, "Citations are links"). No quote, no claim. Quotes are verbatim and short (one sentence or less).
- **Do not invent numbers.** Count only what is in the files: sources, items, distinct speakers. No scores, no probabilities, no totals, no "most users".
- **The heading is the opportunity statement, in the first person.** Write it the way the speaker would say it: "I want", "I need", "I wish", "I'm trying to", "I can't", "I don't know". Teresa Torres, Product Talk (https://www.producttalk.org/2021/03/no-single-right-way-2/): "I actually encourage teams to write their opportunities like, “I want,” “I need,” “I wish,” “I hope,” “I'm trying to,”". Her test: a business need in disguise fails, because no customer would say it ("no customer would ever say, “I wish I spent more money with Amazon.”").
  - After the quoted statement, role and moment in brackets. The moment is one of those in the merge rule: before booking, preparation, the day itself, the weeks after. `### O1: "I don't know which format to ask for." (buyer, before booking)`
  - One need per statement. No lists inside it ("which format, how many parts or how long"). If the quotes carry several needs, split them into separate opportunities and count voices for each.
  - Every verb names its object or person: who is asked, what is sent. Not "before I can ask", but "before I can send you an inquiry".
  - Plain everyday words, under 12 words, an active verb. No noun stacks, no nominalisations: "I can't tell which format fits my group", not "uncertainty in format selection". No coined labels. Glossary terms are fine ("group", "format", "scoping call").
  - Never stronger than the evidence. A fear stays a fear ("I'm afraid my people slip back"). A second-hand report stays the reporter's view: write what the reporter would say.
  - Not: `### O1: At first contact, buyers do not know which format, how many parts or how long`. It is third person, no buyer would say it, and it lists three needs.
    But: `### O1: "I don't know which format to ask for." (buyer, before booking)`, and as its own opportunity `### O2: "I don't know how many days or hours we need." (buyer, before booking)`.
  - Solution test: if the statement asks for a button, page, field or a particular format, it is a solution. Put it under "Solution ideas heard".
- **Voices:** count distinct speakers per opportunity and name their role (buyer, participant, developer, other). The interviewer is not a voice. One person said three times is one voice. Mark second-hand evidence (someone reporting what others said) as second-hand.
- **Map by where the need is met first, then check the active branch.** A need that is met after the booking (preparation, the day itself, the weeks after) sits mainly on the branch for that moment, even if it is parked; say so first. Then go through each driver of the active branch: could showing that this need is met change what a new buyer reads, starts or books? If yes, add it as a side link with an `[assumption: ...]` saying how. If none fits, write "No side link" and why. Never move a need onto the active branch just because that branch is active.
- **Merge only what is one need.** Put two quotes under one opportunity only if all three hold: the same role says them, at the same moment (before the booking, preparation, the day itself, the weeks after), about the same need. Sounding alike is not enough. If one test fails, they stay separate, and each says in one line which test failed ("Close to O2: same need, but buyers before the booking, here participants after the day").
- **Every merge shows its parts.** An opportunity built from more than one need as first heard gets a "Merged" line: what each part said and why it is one need. When in doubt, keep them apart: `loopwise-compare-opportunities` can still put them side by side, but cannot split a merged one.
- **Decoy-like findings:** loud, vivid or repeated themes that do not link to any KPI branch, or are solution requests in disguise, go under "Looks like an opportunity, but". Say honestly why.
- Counter-evidence from the same source is mandatory per opportunity. "None found in this source" is a valid answer; leaving it out is not.
- Assessments in words on exactly three levels: **well supported**, **partly supported**, **unsupported**, each with reasoning, sources, counter-evidence, gaps.
  The level rates the evidence only:
  - **well supported:** three or more distinct voices who lived it;
  - **partly supported:** two voices, or voices who only fear it or report it second-hand;
  - **unsupported:** one voice.
  The KPI branch never lowers the level. A need on a branch that is not this quarter's can be well supported. Whether the link to a driver is stated in the source or an assumption goes into the "KPI branch" line, not into the assessment.
- If `discovery/kpi-tree.md` is missing, stop and say so: opportunities without a branch cannot be compared.
- **Usage data shows where, never why.** When the source is `data`, write observations, not opportunities: a counted share at one step of the KPI tree, with the events divided. Each observation names the driver it sits on and which source groups could explain why. It becomes an opportunity only when a quote from another source gives the reason; this skill does not make that link for `data`. Counts are allowed here because they are counted from the files.
- **Split each step by what came before it.** Where the data shows what a visit did before a step
  (for example which pages it saw), count every one of those the same way: of the visits that did
  it, how many reach the next step, against the visits that did not. Do this for every page, never
  for a chosen one, and write each split that differs into one observation on the same driver. It
  still shows where, not why.
- The skill never decides. "Goes into comparison" stays empty; `loopwise-compare-opportunities` fills it once
  the human has confirmed the shortlist.

## Steps

0a. **Offer the sources** (only if none was given). List every folder under `sources/` as it is on disk, never from memory: name, number of files, and what kind of material it is (the `Basis` line from the file headers, for example "anonymised composite" or "synthetic"). Mark empty folders as empty. Add `data` as the last row: "event log and inquiry export, synthetic (data/README.md), shows what people do, not why", with the time span from `data/README.md`. Ask which one to read, and wait.
0. **Try first.** Read just enough of the source to pick one telling quote. Show it with file:line and ask: what need or pain sits behind it, and is it a need or already a solution? Wait for the answer before you draft anything. Then give the feedback on it (see Rules).
1. Read the KPI tree, the personas, then every file of the source. Tell the human in three lines: which branches you map against, what the source holds (type, files, speakers), what is missing.
2. Group quotes into opportunities by the merge rule above. There is no target count: a need with one voice stays its own opportunity, rated unsupported, and is never folded into a stronger one to make it count.
3. For each: quotes with file:line, voices counted, KPI branch and driver from `discovery/kpi-tree.md` (the short name, for example "call rate") with the link (an `[assumption: ...]` if the tree does not state it), counter-evidence, gaps, assessment.
4. Check before writing: every heading is one first-person statement with role and moment; no opportunity names a solution; every opportunity has a quote with line; voices are counted, not estimated; every opportunity with quotes from more than one role or moment has a "Merged" line, or is split; nothing is ranked or chosen.

## Output template (`discovery/opportunities/<source-group>.md`)

```markdown
# Opportunities from <source-group>

> Assessment by an agent (`loopwise-opportunities-from-source` skill), not a decision. Date: YYYY-MM-DD.
> Reads: <files, each as a link>, [discovery/kpi-tree.md](../kpi-tree.md), product/personas/

## Your first try
<the human's answer, word for word> · Where the draft differs: <two or three short lines>
Feedback: <two or three short lines: what was strong, what was weak, and why>

## Source
| File | Type | Speakers (role) | Basis line from the file |
|---|---|---|---|

## Opportunities
### O1: "<the need, as the speaker would say it, first person>" (<role>, <moment>)
- **Evidence:**
  - "<short verbatim quote>" ([<file>:<line>](../../<file>#L<line>), <speaker>, <role>)
- **Voices:** <n> distinct speakers: <roles>. Second-hand: <yes/no, which>
- **Merged:** no | yes: <each part in a few words, and why it is one need>
- **Close to:** <O-number and the test that keeps it apart> | none
- **KPI branch:** <Branch X: name>, driver <short name from the tree> because ... [assumption: ...]
- **Counter-evidence in this source:** "<quote>" ([<file>:<line>](../../<file>#L<line>)) | none found in this source
- **Gaps:** ...
- **Assessment:** well supported | partly supported | unsupported. <reasoning>

## Looks like an opportunity, but
| Finding | Quote and location | Why it is not one (yet) |
|---|---|---|

## Solution ideas heard
| Idea | Quote and location | Opportunity it might serve |
|---|---|---|

## Goes into comparison
Goes into comparison: ____ (human confirms the shortlist in loopwise-compare-opportunities)
Decided by: ____ · Date: ____
```

## Output template for `data` (`discovery/opportunities/data.md`)

Same header, "Your first try" and "Goes into comparison" as above. For try first, show one count from the data and ask: what does this number tell you, and what does it not tell you? Instead of "Source", "Opportunities", "Looks like an opportunity, but" and "Solution ideas heard":

```markdown
> Observations, not opportunities: usage data shows where people drop out, not why.

## Observations
### D1: <what people do, in plain words>
- **Count:** <n> of <m> (`<event>` ÷ `<event>`, data/events.jsonl, <first date> to <last date>)
- **Driver:** <short name from discovery/kpi-tree.md>
- **Why:** unknown from this data. Could be explained by: <source groups, and what to look for there>
```

Observations go into the comparison only together with an opportunity from another source.

Then stop. Do not compare across sources.
