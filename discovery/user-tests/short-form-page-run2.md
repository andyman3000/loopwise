# Persona walkthrough: short-form, page, run 2

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`loopwise-persona-walkthrough`) on 2026-11-16. Not a decision.
> Prototype card: [discovery/test-cards/short-form-prototype.md](../test-cards/short-form-prototype.md) · Met: `http://localhost:3017/formats.html?variant=short-form` and `http://localhost:3017/inquiry.html?variant=short-form`
> Browser tool: the browser pane of the Claude desktop app. The personas met the rendered page, not the HTML.
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:99](../../product/personas/buyer-without-budget.md#L99), [product/personas/buyer-with-budget.md:101](../../product/personas/buyer-with-budget.md#L101)). The card and the page rest on synthetic material too. This file repeats that label.
> Setting: team. The personas run before the test with five real buyers without budget. They never replace it.

> Run: 2 of round 1 · Earlier run: [discovery/user-tests/short-form-page.md](short-form-page.md) · Met: commit 6da3b2a, after the fixes from run 1

A persona is a written profile of one buyer type, built from interviews and mails.
A sign is something a watcher can see or hear during the test ([discovery/test-cards/short-form-prototype.md:12](../test-cards/short-form-prototype.md#L12)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).

## Your first try
Skipped. The product lead skipped the try-first step tonight (2026-11-16), so the agent went on with the run.

## Scenario the personas got
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today ([discovery/test-cards/short-form-prototype.md:39](../test-cards/short-form-prototype.md#L39)).
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life ([discovery/test-cards/short-form-prototype.md:40](../test-cards/short-form-prototype.md#L40)).

Each persona walked both starts: the formats page first, then the inquiry page directly.

## Buyer without budget
Start on the formats page.
- She reads the five formats and cannot tell which one is her group ([product/personas/buyer-without-budget.md:92](../../product/personas/buyer-without-budget.md#L92)).
- Below the tiles she reads: The inquiry asks only for your name and email ([site/variants/short-form/formats.html:31](../../site/variants/short-form/formats.html#L31)). The form now asks for no guess. That fits the line on the guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)).
- Whether she clicks "Make an inquiry" now: [no source in the persona file: the persona cannot tell]. The line on keeping the formats page open for weeks describes the page without this hint ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)).

Start on the inquiry page, or arriving from the formats page.
- She reads the lead line: in the scoping call she tells Loopwise about her group and what gets in the way, and the format is worked out together ([site/variants/short-form/inquiry.html:22](../../site/variants/short-form/inquiry.html#L22)). She can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The page now names the call as the place for it.
- She wants example agendas to show the colleagues she talks to ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)). The page offers none. She talks it through with two colleagues before she decides ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). This is about how she decides, not about the form. See "New assumptions".
- At "Send inquiry" she reads that sending books nothing ([site/variants/short-form/inquiry.html:23](../../site/variants/short-form/inquiry.html#L23)). That fits a buyer who does not decide alone.
- Name and email: placeholders "Test Buyer" and "buyer@example.com", no source. The page then shows the confirmation page.
- Whether she presses "Send": [no source in the persona file: the persona cannot tell].

## Buyer with budget
The scenario does not give a budget. The persona keeps its own role: it got a smaller first step approved ([product/personas/buyer-with-budget.md:16](../../product/personas/buyer-with-budget.md#L16)).

Start on the formats page.
- He is also unsure of the format ([product/personas/buyer-with-budget.md:62](../../product/personas/buyer-with-budget.md#L62)). The hint below the tiles does not answer what he looks for: evidence that work changes months later ([product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)).

Start on the inquiry page.
- He wants written answers before setting up a call, and writes three precise questions by mail ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The page still has no place for a question.
- He wants to speak to a comparable reference before a call ([product/personas/buyer-with-budget.md:46](../../product/personas/buyer-with-budget.md#L46)). The page names none.
- Whether he sends name and email anyway: [no source in the persona file: the persona cannot tell].

## Signs
The persona files hold facts about buyers, not behaviour on this page. So table 1 mostly reads "cannot tell". The findings come from table 2.

### Table 1: What would the persona do on the page?
| Sign (from the card) | Points to | Buyer without budget | Buyer with budget | Rests on |
|---|---|---|---|---|
| Clicks into name or email without going back to the formats | go on | cannot tell | cannot tell | no source in the persona file for behaviour on this page |
| Sends with name and email, does not ask where to describe the group | go on | cannot tell | not shown | buyer with budget writes three precise questions before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Says afterwards what happens next | go on | cannot tell | cannot tell | the tester's own words; no source |
| Looks for a place to describe the group | rework | cannot tell | shown | the same line on three precise questions ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The card was too strict for this buyer type |
| Stops at "Send", asks what it commits them to | rework | cannot tell | cannot tell | no source in the persona file |
| Leaves without sending, or goes back to the formats to choose first | drop | cannot tell | cannot tell | the line on keeping the formats page open describes the page without the hint ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)) |
| Says "I need to know the format first" | drop | cannot tell | cannot tell | the tester's own words; no source |

### Table 2: Does the page go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| Clicks into name or email without going back to the formats | no: the formats page now says the inquiry asks only for name and email; no guess is asked ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | the file says nothing |
| Sends with name and email | no: no field asks for a guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | yes: he wants written answers before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Says afterwards what happens next | the file says nothing | the file says nothing |
| Looks for a place to describe the group | no: the lead line names the call as the place for what gets in the way ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | yes: the same line on three precise questions ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Stops at "Send", asks what it commits them to | no: the page says sending books nothing; she does not decide alone ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)) | no: he has to take it to the boss ([product/personas/buyer-with-budget.md:47](../../product/personas/buyer-with-budget.md#L47)); sending books nothing |
| Leaves without sending, or goes back to the formats | no: the same as the first row | the file says nothing |
| Says "I need to know the format first" | no: the lead line and the box beside the form say the format is worked out in the call ([site/variants/short-form/inquiry.html:34](../../site/variants/short-form/inquiry.html#L34)) | the file says nothing |

## Other stalls
- None outside the signs.

## Against the two lines
Unclear. The buyer without budget meets no clash on the path the go-on line counts. Whether she presses "Send" has no source in her file. The buyer with budget still leans towards the rework line, and the card recruits no tester of that type.

## What the personas cannot tell
- Whether a buyer clicks "Make an inquiry" after the new hint.
- Whether a buyer presses "Send" with only name and email.
- What a tester says afterwards about what happens next.
- Whether a tester stops at "Send" and asks what it commits them to.
- Whether a tester says the format must be known first.

## New assumptions (not blocking)
- [assumption: buyers without budget send an inquiry before they talked it through with colleagues] · rests on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41) and the wish for example agendas to show them ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)) · may blur the sign "leaves without sending" · for the intent, not this spec
- [assumption: a buyer with no timeline accepts a call within a few days] · rests on "No rush, though." ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)) · may blur the sign "leaves without sending" · for the intent, not this spec

## Compared with the last run
| Finding of the last run | Now | Rests on |
|---|---|---|
| 1: the formats page gives no hint of what the form asks; the buyer without budget stays there | gone | Table 2, first row: the hint line, [site/variants/short-form/formats.html:31](../../site/variants/short-form/formats.html#L31) |
| 2: the lead line does not name the call as the place for what hurts | gone | Table 2, fourth row: the lead line, [site/variants/short-form/inquiry.html:22](../../site/variants/short-form/inquiry.html#L22) |
| 3: no place for written questions, buyer with budget only | still there | Table 2, second and fourth rows |
| 4: whether a tester presses "Send" | still there | "What the personas cannot tell" |

New findings: the lead line now names the call as the place for what gets in the way. It may stop testers from looking for a place to describe the group. Then the rework sign shows less often, whether or not the page works. The spec already names this risk as an open point.

| Criticality | Last run | This run |
|---|---|---|
| fix before the test | 2 | 0 |
| fix if time allows | 1 | 1 |
| watch in the test | 1 | 2 |

Fewer findings is not proof the page works. The personas only find less to press on.

## What the pair might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the team picks freely (setting `team`).

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | A place to ask questions in writing, or a reference to call | inquiry page | clash with a fact, buyer with budget only ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) | fix if time allows | The card recruits no buyer with budget ([discovery/test-cards/short-form-prototype.md:88](../test-cards/short-form-prototype.md#L88)). A text box would also undo the idea itself |
| 2 | Whether a tester presses "Send" with only name and email | inquiry page | gap: no persona file has a line on it | watch in the test | Only the test with people can show the main go-on sign |
| 3 | Whether the lead line answers the question on where to describe the group before a tester asks it | inquiry page | gap: no persona file has a line on it | watch in the test | The rework line counts testers who look for that place ([discovery/test-cards/short-form-prototype.md:76](../test-cards/short-form-prototype.md#L76)). The watcher notes whether a tester reads the lead line before the fields |
