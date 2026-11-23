# Persona walkthrough: short-form, page

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`loopwise-persona-walkthrough`) on 2026-11-16. Not a decision.
> Prototype card: [discovery/test-cards/short-form-prototype.md](../test-cards/short-form-prototype.md) · Met: `http://localhost:3017/formats.html?variant=short-form` and `http://localhost:3017/inquiry.html?variant=short-form`
> Browser tool: the browser pane of the Claude desktop app. The personas met the rendered page, not the HTML.
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:99](../../product/personas/buyer-without-budget.md#L99), [product/personas/buyer-with-budget.md:101](../../product/personas/buyer-with-budget.md#L101)). The card and the page rest on synthetic material too. This file repeats that label.
> Setting: team. The personas run before the test with five real buyers without budget. They never replace it.

> Run: 1 of round 1 · Earlier run: none, first run · Met: commit 1f6e80f

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
Start on the formats page. The page is the baseline page, unchanged.
- She reads the five formats and cannot tell which one is her group ([product/personas/buyer-without-budget.md:92](../../product/personas/buyer-without-budget.md#L92)).
- The button "Make an inquiry" gives no hint of what the form asks ([site/formats.html:30](../../site/formats.html#L30)). She expects a form that wants her to name what she needs. She does not want to send the form with a guess in it ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)).
- So she keeps the formats page open, or closes it and comes back later ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). She never sees the short form. This start ends before the page under test.

Start on the inquiry page.
- She reads the lead line first: Leave your name and email. We ask about your group in the scoping call ([site/variants/short-form/inquiry.html:22](../../site/variants/short-form/inquiry.html#L22)). No field asks her to guess a format. That fits the line on the guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)).
- She can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The lead line says the call asks about her "group". It does not say she can bring what hurts and leave the format open. She may look for a place to write what hurts.
- At "Send inquiry" she reads that sending books nothing ([site/variants/short-form/inquiry.html:23](../../site/variants/short-form/inquiry.html#L23)). She does not decide alone ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). A send that books nothing fits that.
- Name and email: placeholders "Test Buyer" and "buyer@example.com", no source. The page then shows the confirmation page.
- Whether she presses "Send": [no source in the persona file: the persona cannot tell].

## Buyer with budget
The scenario does not give a budget. The persona keeps its own role: it got a smaller first step approved ([product/personas/buyer-with-budget.md:16](../../product/personas/buyer-with-budget.md#L16)).

Start on the formats page.
- He is also unsure of the format ([product/personas/buyer-with-budget.md:62](../../product/personas/buyer-with-budget.md#L62)). He compares many offers and finds they all look the same on paper ([product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)).
- He clicks "Make an inquiry": [no source in the persona file: the persona cannot tell].

Start on the inquiry page.
- He wants written answers before setting up a call, and writes three precise questions by mail ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). The page has no place for a question. It offers only a call.
- He wants to speak to a comparable reference before a call ([product/personas/buyer-with-budget.md:46](../../product/personas/buyer-with-budget.md#L46)). The page names none.
- So he looks for a place to write his questions. That is the rework sign on looking for a place to describe the group, in his own form.
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
| Leaves without sending, or goes back to the formats to choose first | drop | shown, on the formats page start | cannot tell | keeps the formats page open for weeks, or closes it ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). The formats page is unchanged in this variant, so the line applies as written |
| Says "I need to know the format first" | drop | cannot tell | cannot tell | the tester's own words; no source |

### Table 2: Does the page go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| Clicks into name or email without going back to the formats | yes: the formats page gives no hint that the form asks only name and email. She does not want to send the form with a guess in it ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)), so she stays on the formats page | the file says nothing |
| Sends with name and email | no: no field asks for a guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | yes: he wants written answers before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Says afterwards what happens next | the file says nothing | the file says nothing |
| Looks for a place to describe the group | yes: she can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The page does not say the call is the place for what hurts | yes: the same line on three precise questions ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| Stops at "Send", asks what it commits them to | no: the page says sending books nothing; she does not decide alone ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)) | no: he has to take it to the boss ([product/personas/buyer-with-budget.md:47](../../product/personas/buyer-with-budget.md#L47)); sending books nothing |
| Leaves without sending, or goes back to the formats | yes: the same clash as in the first row ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)) | the file says nothing |
| Says "I need to know the format first" | no: the box beside the form says the format is settled in the scoping call ([site/variants/short-form/inquiry.html:34](../../site/variants/short-form/inquiry.html#L34)) | the file says nothing |

## Other stalls
- None outside the signs.

## Against the two lines
Unclear. On the inquiry page, the buyer without budget meets no field that asks for a guess. That leans towards the go-on line. On the formats page start, she does not reach the inquiry page. Three of five testers start there ([discovery/test-cards/short-form-prototype.md:41](../test-cards/short-form-prototype.md#L41)). The go-on line counts testers who reach the inquiry page. The buyer with budget leans towards the rework line, but the card recruits no tester of that type.

## What the personas cannot tell
- Whether a buyer presses "Send" with only name and email.
- What a tester says afterwards about what happens next.
- Whether a tester stops at "Send" and asks what it commits them to.
- Whether a tester says the format must be known first.

## New assumptions (not blocking)
- [assumption: buyers without budget send an inquiry before they talked it through with colleagues] · rests on [product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41) · may blur the sign "leaves without sending" · for the intent, not this spec
- [assumption: a buyer with no timeline accepts a call within a few days] · rests on "No rush, though." ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)) · may blur the sign "leaves without sending" · for the intent, not this spec

## Compared with the last run
First run, nothing to compare.

| Criticality | Last run | This run |
|---|---|---|
| fix before the test | none | 2 |
| fix if time allows | none | 1 |
| watch in the test | none | 1 |

Fewer findings is not proof the page works. The personas only find less to press on.

## What the pair might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the team picks freely (setting `team`).

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | Next to "Make an inquiry", one line says the inquiry asks only for name and email | formats page, a new variant file `site/variants/short-form/formats.html` | shown sign: leaves or stays on the formats page ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)), with a clash on the guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | fix before the test | Three of five testers start on the formats page. The go-on line counts testers who reach the inquiry page ([discovery/test-cards/short-form-prototype.md:71](../test-cards/short-form-prototype.md#L71)). Without the line, these testers may never meet the page under test |
| 2 | The lead line says the call is where the buyer describes the group and what gets in the way, with no format needed | inquiry page | clash with a fact: she can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | fix before the test | The rework line counts testers who look for a place to describe the group ([discovery/test-cards/short-form-prototype.md:76](../test-cards/short-form-prototype.md#L76)). Note: a clearer line also makes that rework sign show less often. The spec names this risk as an open point |
| 3 | A place to ask questions in writing, or a reference to call | inquiry page | clash with a fact, buyer with budget only ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) | fix if time allows | The card recruits no buyer with budget ([discovery/test-cards/short-form-prototype.md:88](../test-cards/short-form-prototype.md#L88)). A text box would also undo the idea itself |
| 4 | Whether a tester presses "Send" with only name and email | inquiry page | gap: no persona file has a line on it | watch in the test | Only the test with people can show the main go-on sign |
