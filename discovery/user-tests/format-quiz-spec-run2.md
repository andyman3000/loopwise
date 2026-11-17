# Persona walkthrough: format-quiz, spec, run 2

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`persona-walkthrough`) on 2026-11-16. Not a decision.
> Run: 2 of round 1 · Earlier run: [discovery/user-tests/format-quiz-spec.md](format-quiz-spec.md) · Met: [discovery/specs/format-quiz.md](../specs/format-quiz.md), uncommitted, 2026-11-16: the sections "What changes on the page" and "Fields and validation", after the cut to the learn mode of `variant-spec`
> Prototype card: [discovery/test-cards/format-quiz-prototype.md](../test-cards/format-quiz-prototype.md)
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:99](../../product/personas/buyer-without-budget.md#L99), [product/personas/buyer-with-budget.md:101](../../product/personas/buyer-with-budget.md#L101)). The spec and the card rest on synthetic material too. This file repeats that label.
> Setting: team. The personas run before the test with five real buyers without budget. They never replace it.

A persona is a written profile of one buyer type, built from interviews and mails.
A sign is something a watcher can see or hear during the test ([discovery/test-cards/format-quiz-prototype.md:12](../test-cards/format-quiz-prototype.md#L12)).
A success line is the result a buyer wants to see after the training.

## Your first try
"I dont expect them to stall anymore"

Where the personas stalled:
- In the quiz, neither persona stalls on anything its file speaks to. The questions now fit both files.
- The buyer without budget still leaves at the result. She copies it, then talks it through with colleagues before she sends anything.
- The buyer with budget still finds no evidence on the result.

Feedback:
- Strong: a clear prediction, and right for the quiz. Run 1 found clashes in Q4 and in the form text. Run 2 finds none there.
- Weak: it names no place. A walkthrough checks places on the page, so "nowhere" can only be checked screen by screen.
- Weak: the leave at the result is not a stall on the page. It comes from how this buyer decides, and no page change removes it.

## Scenario the personas got
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today ([discovery/test-cards/format-quiz-prototype.md:45](../test-cards/format-quiz-prototype.md#L45)).
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life ([discovery/test-cards/format-quiz-prototype.md:46](../test-cards/format-quiz-prototype.md#L46)).

## Buyer without budget
The scenario fits her role. She leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)).

**Formats page.** She reads the box "Not sure which format fits your group?" ([discovery/specs/format-quiz.md:44](../specs/format-quiz.md#L44)). She cannot tell which format fits ([product/personas/buyer-without-budget.md:91](../../product/personas/buyer-without-budget.md#L91)). She starts the quiz.

**Q1.** [no source in the persona file: the persona cannot tell] Her file names no number for the group ([product/personas/buyer-without-budget.md:77](../../product/personas/buyer-without-budget.md#L77)). The hint lets her leave it empty.

**Q2.** Her group runs from people who asked a chat assistant something twice to people who run the coding agent ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)). The first end matches the example under Assisting ([discovery/specs/format-quiz.md:58](../specs/format-quiz.md#L58)). Her advisor says one team built a set of shared skills ([product/personas/buyer-without-budget.md:25](../../product/personas/buyer-without-budget.md#L25)). That matches the example under System-building. Whether "runs the coding agent" is Delegating: [no source in the persona file: the persona cannot tell].

**Q3.** Her product owners are spread over the online shop and the store systems ([product/personas/buyer-without-budget.md:77](../../product/personas/buyer-without-budget.md#L77)). She ticks "Several teams".

**Q4.** The question asks what gets in the way ([discovery/specs/format-quiz.md:60](../specs/format-quiz.md#L60)). She can describe what hurts ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). Her group's range ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)) fits "They are at very different levels with AI, and have no shared start". Whether she ticks more: [no source in the persona file: the persona cannot tell]. Both ways, the rule names the Two-day training ([discovery/specs/format-quiz.md:79](../specs/format-quiz.md#L79)).

**Result.** She sees the Two-day training and four other formats to react to ([discovery/specs/format-quiz.md:89](../specs/format-quiz.md#L89)). That fits her need for "Options to react to" ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). She says "I'll take this to two colleagues and talk it through with them." ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). She presses "Copy the result" ([discovery/specs/format-quiz.md:91](../specs/format-quiz.md#L91)) and leaves without "Inquire now". She is in no hurry: "No rush, though." ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)). The copied text holds no example agenda, which she wants to show colleagues ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)).

**Form.** If she came back, the text would hold only the lines she answered ([discovery/specs/format-quiz.md:96](../specs/format-quiz.md#L96)). That fits: she does not want to send a guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). Name, company and email: "Test Buyer", "buyer@example.com" (no source).

## Buyer with budget
The scenario fits his role ([product/personas/buyer-with-budget.md:14](../../product/personas/buyer-with-budget.md#L14)). The card recruits only buyers without budget ([discovery/test-cards/format-quiz-prototype.md:96](../test-cards/format-quiz-prototype.md#L96)), so this section stands for no tester.

**Formats page.** He is unsure of the format too ([product/personas/buyer-with-budget.md:62](../../product/personas/buyer-with-budget.md#L62)). He starts the quiz.

**Q1.** His group is a bit under twenty ([product/personas/buyer-with-budget.md:80](../../product/personas/buyer-with-budget.md#L80)). The exact number: [no source in the persona file: the persona cannot tell].

**Q2.** His group runs from people who built a fair amount themselves to a big middle who only touch built-in features ([product/personas/buyer-with-budget.md:24](../../product/personas/buyer-with-budget.md#L24)). He ticks several styles without stalling.

**Q3.** [no source in the persona file: the persona cannot tell]

**Q4.** Most of his people "just don't know how to make it part of their day" ([product/personas/buyer-with-budget.md:23](../../product/personas/buyer-with-budget.md#L23)). That fits "They know AI tools, but do not use them on real backlog work". His group's range ([product/personas/buyer-with-budget.md:24](../../product/personas/buyer-with-budget.md#L24)) also fits "very different levels". Two ticks for two formats send the rule to Q2, and the wide range names the Two-day training ([discovery/specs/format-quiz.md:79](../specs/format-quiz.md#L79)). His worry about "the Monday after" ([product/personas/buyer-with-budget.md:54](../../product/personas/buyer-with-budget.md#L54)) has no choice. The spec left it out on purpose.

**Result.** He looks for evidence that work changes months later ([product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)). He wants a comparable company to call ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89)). The result offers neither. He wants written answers before he sets up a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)). He has to take it to the boss ([product/personas/buyer-with-budget.md:47](../../product/personas/buyer-with-budget.md#L47)), so "Copy the result" fits him.

## Signs
The persona files hold facts about buyers, not behaviour on this page. So table 1 mostly reads "cannot tell". The findings come from table 2.

### Table 1: What would the persona do on the page?
| Sign (from the card) | Points to | Buyer without budget | Buyer with budget | Rests on |
|---|---|---|---|---|
| The tester answers every quiz question for their own group, without asking what a question means | go on | cannot tell | cannot tell | Without budget: Q1 and the Delegating tick have no source. With budget: Q3 has no source |
| On the quiz result, the tester uses the step to the form and clicks into a form field, without going back to the formats | go on | cannot tell | cannot tell | no source in the persona file |
| The tester sends the form and keeps the format text in "What do you need?", or adds to it | go on | cannot tell | cannot tell | no source in the persona file |
| Asked afterwards, the tester says in their own words why the format fits their group | go on | cannot tell | cannot tell | no source in the persona file |
| The tester stops at a question, asks "what do you mean?", or skips it | rework | cannot tell | not shown for Q1, Q2, Q4; cannot tell for Q3 | With budget: [product/personas/buyer-with-budget.md:80](../../product/personas/buyer-with-budget.md#L80), [product/personas/buyer-with-budget.md:24](../../product/personas/buyer-with-budget.md#L24) and [product/personas/buyer-with-budget.md:23](../../product/personas/buyer-with-budget.md#L23) answer three questions |
| On the quiz result, the tester looks around for what to do next, or asks where to go | rework | cannot tell | cannot tell | no source in the persona file |
| The tester deletes or overwrites the format text in the form | drop | cannot tell | cannot tell | no source in the persona file |
| The tester leaves the page, or goes back to the formats, without starting the form | drop | shown | cannot tell | She takes it to two colleagues first ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)) and is in no rush ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)) |
| The tester says "I'm guessing" or "not sure this is us" | drop | cannot tell | cannot tell | no source in the persona file |

### Table 2: Does the spec go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| The tester answers every quiz question for their own group, without asking what a question means | no: Q4 asks what gets in the way, which she can describe ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)); the Q2 examples match her group ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24), [product/personas/buyer-without-budget.md:25](../../product/personas/buyer-without-budget.md#L25)). For Delegating the file says nothing | no. For Q3 the file says nothing |
| On the quiz result, the tester uses the step to the form and clicks into a form field, without going back to the formats | the file says nothing | the file says nothing |
| The tester sends the form and keeps the format text in "What do you need?", or adds to it | no: four other formats give her options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | the file says nothing |
| Asked afterwards, the tester says in their own words why the format fits their group | the file says nothing | the file says nothing |
| The tester stops at a question, asks "what do you mean?", or skips it | no | no |
| On the quiz result, the tester looks around for what to do next, or asks where to go | the file says nothing | the file says nothing |
| The tester deletes or overwrites the format text in the form | no: the same options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | the file says nothing |
| The tester leaves the page, or goes back to the formats, without starting the form | yes, partly: the copied result holds no example agenda to show colleagues ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)) | yes: the result offers a call, and he wants written answers before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| The tester says "I'm guessing" or "not sure this is us" | no: the form text leaves out empty and "Not sure" answers ([discovery/specs/format-quiz.md:96](../specs/format-quiz.md#L96)) | the file says nothing |

The card's sign table was right in its three kinds. One sign needs a reading rule, see "Other stalls".

## Other stalls
- Copying the result and leaving looks like the drop sign that the tester leaves without starting the form ([discovery/test-cards/format-quiz-prototype.md:76](../test-cards/format-quiz-prototype.md#L76)). For the buyer without budget, it is what her file predicts whatever she thinks of the format: she decides with colleagues ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)) and has no rush ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)). The test cannot tell trust from her way of deciding, unless the watcher asks.

## Against the two lines
Unclear. Neither persona file can show the step into the form that the go-on line needs ([discovery/test-cards/format-quiz-prototype.md:80](../test-cards/format-quiz-prototype.md#L80)). The buyer without budget shows the drop sign of leaving ([discovery/test-cards/format-quiz-prototype.md:86](../test-cards/format-quiz-prototype.md#L86)). Her file gives a reason that is not distrust in the format.

## What the personas cannot tell
- Whether a buyer takes the step from the result into the form and clicks a field.
- Whether a buyer looks around on the result for what to do next.
- Why the format fits, in the buyer's own words.
- How many people the buyer without budget would enter in Q1.
- Whether the buyer without budget reads "runs the coding agent" as Delegating.
- How many ticks the buyer without budget sets in Q4.
- Whether the buyer with budget's group works on the same product (Q3).
- Whether either buyer keeps, adds to or deletes the format text.

## Compared with the last run
The last run read the spec as committed in 72d2430, before the changes and the cut.

| Finding of the last run | Now | Rests on |
|---|---|---|
| Show one or two formats beside the named one | gone: four other formats show on the result | the result, buyer without budget |
| Give the buyer something to take to colleagues | changed: "Copy the result" exists, but she still leaves, and the copy holds no agenda | the result, buyer without budget |
| Ask in Q4 what hurts today | gone: Q4 asks what gets in the way | Q4, buyer without budget |
| Leave out the "Not sure" lines in the form text | gone | the form, buyer without budget |
| Rule step 3: a wide range of working styles gets the two-day training | gone | Q4, both buyers |
| Add a Q4 choice for keeping it up after the training | still there, left out on purpose for the launch spec | Q4, buyer with budget |
| Put one plain example under each Q2 label | changed: the examples match her group, except for the coding agent | Q2, buyer without budget |

New findings: copying and leaving reads like the drop sign (see "Other stalls"). The buyer with budget's clash at the result, a call instead of written answers, was under "Other stalls" in the last run and is now in table 2.

| Criticality | Last run | This run |
|---|---|---|
| fix before the test | 4 | 2 |
| fix if time allows | 2 | 2 |
| watch in the test | 1 | 1 |

Fewer findings is not proof the page works. The personas only find less to press on.

## What the team might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the team decides. Setting is team, so the team may pick as many proposals as it wants fixed before the test.

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | Decide before the test how the watcher reads "copied, then left". For example, the watcher asks: "What would you do with what you copied?" | the watcher's questions in the spec | shown sign | fix before the test | The buyer without budget copies and leaves because she decides with colleagues ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). The drop line counts testers who leave ([discovery/test-cards/format-quiz-prototype.md:86](../test-cards/format-quiz-prototype.md#L86)), and it would read this as distrust. |
| 2 | Put the format's duration and audience lines from the formats page into the copied text | the quiz result | clash with a fact | fix before the test | She wants something to show colleagues ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)). Leaving is a drop sign ([discovery/test-cards/format-quiz-prototype.md:76](../test-cards/format-quiz-prototype.md#L76)). The formats page has those lines, so nothing new is invented. |
| 3 | Leave the result as it is for the buyer with budget | the quiz result | clash with a fact, buyer with budget only | fix if time allows | He wants written answers and evidence before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96), [product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)). The card recruits only buyers without budget ([discovery/test-cards/format-quiz-prototype.md:96](../test-cards/format-quiz-prototype.md#L96)). For the launch spec. |
| 4 | Keep the Q4 choice on keeping it up for the launch spec | the quiz | other stall, buyer with budget only | fix if time allows | He worries about "the Monday after" ([product/personas/buyer-with-budget.md:54](../../product/personas/buyer-with-budget.md#L54)). No tester is of his type. |
| 5 | Watch whether testers read "runs the coding agent" as Delegating | the quiz, Q2 | gap in the file | watch in the test | Her file names the coding agent ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)), but no line says how she would label it. |
