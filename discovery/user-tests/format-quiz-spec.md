# Persona walkthrough: format-quiz, spec

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`loopwise-persona-walkthrough`) on 2026-11-16. Not a decision.
> Prototype card: [discovery/test-cards/format-quiz-prototype.md](../test-cards/format-quiz-prototype.md) · Met: [discovery/specs/format-quiz.md](../specs/format-quiz.md), the sections "What changes on the page" and "Fields and validation"
> Material: personas are drafts from synthetic interviews and synthetic inquiries ([product/personas/buyer-without-budget.md:99](../../product/personas/buyer-without-budget.md#L99), [product/personas/buyer-with-budget.md:101](../../product/personas/buyer-with-budget.md#L101)). The spec and the card rest on synthetic material too. This file repeats that label.
> The personas read the spec as committed in 72d2430. The product lead changed the spec afterwards, from this file. Spec citations here point to the same place in the changed spec; the spec text this file describes is the earlier version. The product lead later cut the spec down to the learn mode of `loopwise-variant-spec`.
> Rerun in the same round: replaces the first run of 2026-11-16, after the skill changed. The first try is the same answer from that run.
> Setting: team. The personas run before the test with five real buyers without budget. They never replace it.

A persona is a written profile of one buyer type, built from interviews and mails.
A sign is something a watcher can see or hear during the test ([discovery/test-cards/format-quiz-prototype.md:12](../test-cards/format-quiz-prototype.md#L12)).
A success line is the result a buyer wants to see after the training.
Here the personas read the spec, before anyone builds the page.

## Your first try
"They will struggle with answering the questions how their teams uses AI"

Where the personas stalled:
- The buyer without budget meets the question on working styles (Q2) without a source for its labels. Her file holds the range in her group, but only as an impression.
- Both personas stall harder at the question "What should change for them?" (Q4) and at the result. The result names one format, with nothing to react to and nothing to show colleagues.
- The rule from answers to a format can send a mixed group to the most advanced format.

Feedback:
- Strong: you named one place on the page, the question on how the team uses AI. The buyer without budget's file partly backs it. She says her own layer lags, "Me included" ([product/personas/buyer-without-budget.md:36](../../product/personas/buyer-without-budget.md#L36)).
- Weak: you did not say why a buyer would stall there. Her file shows she can describe the range in her group. The stall is the five labels, not the knowledge.
- Weak: the guess stops at the questions. The persona showed a sign of leaving at the result screen, after the questions.

## Scenario the personas got
- **Situation:** You lead a group of product people in your company. You want them trained in using AI in product work. Think of a real group you know well: who is in it, and how they use AI today ([discovery/test-cards/format-quiz-prototype.md:45](../test-cards/format-quiz-prototype.md#L45)).
- **Task:** Find out whether Loopwise has something for that group. Then do what you would do next in real life ([discovery/test-cards/format-quiz-prototype.md:46](../test-cards/format-quiz-prototype.md#L46)).

## Buyer without budget
The scenario fits her role. She leads product people and looks for an AI format for them ([product/personas/buyer-without-budget.md:14](../../product/personas/buyer-without-budget.md#L14)).

**Formats page.** She reads the box "Not sure which format fits your group?" ([discovery/specs/format-quiz.md:44](../specs/format-quiz.md#L44)). She looks at formats and cannot tell which one fits ([product/personas/buyer-without-budget.md:91](../../product/personas/buyer-without-budget.md#L91)). She starts the quiz.

**Q1, how many people.** [no source in the persona file: the persona cannot tell] Her file names product owners on the online shop and the store systems, with no number ([product/personas/buyer-without-budget.md:77](../../product/personas/buyer-without-budget.md#L77)).

**Q2, working styles.** Her group runs from people who asked a chat assistant something twice to people who run the coding agent ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)). So she would tick several styles. Her view rests on impressions: "it's only a feeling, I haven't measured anything" ([product/personas/buyer-without-budget.md:52](../../product/personas/buyer-without-budget.md#L52)). Whether she knows "Orchestrating" or "System-building": [no source in the persona file: the persona cannot tell].

**Q3, same product or several teams.** Her product owners are spread over the online shop and the store systems ([product/personas/buyer-without-budget.md:77](../../product/personas/buyer-without-budget.md#L77)). She would tick "Several teams".

**Q4, what should change.** She does not know the formats ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)). The five choices match the five formats one to one ([discovery/specs/format-quiz.md:78](../specs/format-quiz.md#L78)). She cannot name a success line: "Then you'd have got a shrug." ([product/personas/buyer-without-budget.md:44](../../product/personas/buyer-without-budget.md#L44)). Her goal of product owners ready before the change fits the choice A shared start with AI in product work ([product/personas/buyer-without-budget.md:29](../../product/personas/buyer-without-budget.md#L29)). How many ticks she sets: [no source in the persona file: the persona cannot tell].

**Q5, time away.** She has no timeline ([product/personas/buyer-without-budget.md:45](../../product/personas/buyer-without-budget.md#L45)). [no source in the persona file: the persona cannot tell]

**Result.** She needs "Options to react to" ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The result names one format. She wants example agendas to show colleagues ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)). The result has none. She says "I'll take this to two colleagues and talk it through with them." ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)). So she leaves the result without "Inquire now".

**Form.** If she got there, the text would list her "Not sure" answers ([discovery/specs/format-quiz.md:96](../specs/format-quiz.md#L96)). She "Does not want to send the form with a guess in it" ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). Name, company and email: "Test Buyer", "buyer@example.com" (no source).

## Buyer with budget
The scenario fits his role. He is VP product or product director ([product/personas/buyer-with-budget.md:14](../../product/personas/buyer-with-budget.md#L14)). The card recruits only buyers without budget ([discovery/test-cards/format-quiz-prototype.md:96](../test-cards/format-quiz-prototype.md#L96)). So this section stands for no tester.

**Formats page.** He is unsure of the format too ([product/personas/buyer-with-budget.md:62](../../product/personas/buyer-with-budget.md#L62)). He starts the quiz.

**Q1.** His group is "a bit under twenty" ([product/personas/buyer-with-budget.md:80](../../product/personas/buyer-with-budget.md#L80)). The exact number: [no source in the persona file: the persona cannot tell]. Both readings stay under the largest group of the two-day training.

**Q2.** His group runs from people who built a fair amount themselves to a big middle who only touch the built-in features ([product/personas/buyer-with-budget.md:24](../../product/personas/buyer-with-budget.md#L24)). He ticks several styles without stalling.

**Q3.** [no source in the persona file: the persona cannot tell]

**Q4.** He wants one or two assistants or skills that people keep using ([product/personas/buyer-with-budget.md:32](../../product/personas/buyer-with-budget.md#L32)). That fits "Work with AI agents on tasks from their own backlog". His worry is the week after: "Two good days, we'll manage. What worries me is the Monday after" ([product/personas/buyer-with-budget.md:54](../../product/personas/buyer-with-budget.md#L54)). No Q4 choice speaks to that worry.

**Q5.** His first step is one prep day and a day and a half in the room ([product/personas/buyer-with-budget.md:21](../../product/personas/buyer-with-budget.md#L21)). He ticks "Two days".

**Result.** He looks for evidence that work changes months later ([product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)). He wants a comparable company to call ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89)). The result offers neither. It promises a better call (line 88 of the spec as committed in 72d2430; the line is cut since). He wants written answers before he sets up a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)).

## Signs
The persona files hold facts about buyers, not behaviour on this page. So table 1 mostly reads "cannot tell". The findings come from table 2.

### Table 1: What would the persona do on the page?
| Sign (from the card) | Points to | Buyer without budget | Buyer with budget | Rests on |
|---|---|---|---|---|
| The tester answers every quiz question for their own group, without asking what a question means | go on | cannot tell | cannot tell | Without budget: Q1, Q2 labels, Q4 ticks and Q5 have no source. With budget: Q3 has no source |
| On the quiz result, the tester uses the step to the form and clicks into a form field, without going back to the formats | go on | cannot tell | cannot tell | no source in the persona file |
| The tester sends the form and keeps the format text in "What do you need?", or adds to it | go on | cannot tell | cannot tell | no source in the persona file |
| Asked afterwards, the tester says in their own words why the format fits their group | go on | cannot tell | cannot tell | no source in the persona file |
| The tester stops at a question, asks "what do you mean?", or skips it | rework | cannot tell | not shown for Q1, Q2, Q4, Q5; cannot tell for Q3 | With budget: [product/personas/buyer-with-budget.md:80](../../product/personas/buyer-with-budget.md#L80), [product/personas/buyer-with-budget.md:24](../../product/personas/buyer-with-budget.md#L24), [product/personas/buyer-with-budget.md:32](../../product/personas/buyer-with-budget.md#L32) and [product/personas/buyer-with-budget.md:21](../../product/personas/buyer-with-budget.md#L21) answer four questions |
| On the quiz result, the tester looks around for what to do next, or asks where to go | rework | cannot tell | cannot tell | no source in the persona file |
| The tester deletes or overwrites the format text in the form | drop | cannot tell | cannot tell | no source in the persona file |
| The tester leaves the page, or goes back to the formats, without starting the form | drop | shown | cannot tell | She takes it to two colleagues first ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)) and keeps the formats page open for weeks ([product/personas/buyer-without-budget.md:93](../../product/personas/buyer-without-budget.md#L93)). Line 93 describes today's page, without a quiz |
| The tester says "I'm guessing" or "not sure this is us" | drop | cannot tell | cannot tell | no source in the persona file |

### Table 2: Does the spec go against something the persona file says?
| Sign (from the card) | Buyer without budget | Buyer with budget |
|---|---|---|
| The tester answers every quiz question for their own group, without asking what a question means | yes: Q4 asks for what she cannot name, the format ([product/personas/buyer-without-budget.md:42](../../product/personas/buyer-without-budget.md#L42)) or a success line ([product/personas/buyer-without-budget.md:44](../../product/personas/buyer-without-budget.md#L44)) | no. For Q3 the file says nothing |
| On the quiz result, the tester uses the step to the form and clicks into a form field, without going back to the formats | the file says nothing | the file says nothing |
| The tester sends the form and keeps the format text in "What do you need?", or adds to it | yes: the result names one format, and she needs options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | the file says nothing |
| Asked afterwards, the tester says in their own words why the format fits their group | the file says nothing | the file says nothing |
| The tester stops at a question, asks "what do you mean?", or skips it | yes: Q4 is close to the success line she cannot name ([product/personas/buyer-without-budget.md:44](../../product/personas/buyer-without-budget.md#L44)). For the Q2 labels the file says nothing | no |
| On the quiz result, the tester looks around for what to do next, or asks where to go | the file says nothing | the file says nothing |
| The tester deletes or overwrites the format text in the form | yes: the same need for options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)) | the file says nothing |
| The tester leaves the page, or goes back to the formats, without starting the form | yes: the result gives her nothing to show colleagues ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)) | yes: the result offers a call, and he wants written answers before a call ([product/personas/buyer-with-budget.md:96](../../product/personas/buyer-with-budget.md#L96)) |
| The tester says "I'm guessing" or "not sure this is us" | yes: the filled text lists every "Not sure" answer ([discovery/specs/format-quiz.md:96](../specs/format-quiz.md#L96)), and she does not want to send a guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)) | the file says nothing |

The card's sign table was right in its three kinds. No sign was too generous or too strict.

## Other stalls
- The rule can send a mixed group to the most advanced format. With several Q4 ticks, one tick for "Delegating" in Q2 names the Agentic Product Management lab ([discovery/specs/format-quiz.md:78](../specs/format-quiz.md#L78)). The buyer without budget's group includes people who asked a chat assistant something twice ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)). She wants no one to fall behind ([product/personas/buyer-without-budget.md:30](../../product/personas/buyer-without-budget.md#L30)).
- Q4 has no choice for people keeping it up after the training. That is the buyer with budget's main worry ([product/personas/buyer-with-budget.md:54](../../product/personas/buyer-with-budget.md#L54)).
- The result offers the buyer with budget a call, not evidence or a reference ([product/personas/buyer-with-budget.md:89](../../product/personas/buyer-with-budget.md#L89), [product/personas/buyer-with-budget.md:95](../../product/personas/buyer-with-budget.md#L95)).

## Against the two lines
Unclear. The go-on line needs testers to take the step into the form and send it ([discovery/test-cards/format-quiz-prototype.md:80](../test-cards/format-quiz-prototype.md#L80)). Neither persona file can show that step. The buyer without budget shows one drop sign: she leaves the result to talk to colleagues. The spec clashes with her file at the result and in the form text. Both sit where the drop line looks ([discovery/test-cards/format-quiz-prototype.md:86](../test-cards/format-quiz-prototype.md#L86)).

## What the personas cannot tell
- Whether a buyer takes the step from the result into the form and clicks a field.
- Whether a buyer looks around on the result for what to do next.
- Why the format fits, in the buyer's own words.
- How many people the buyer without budget would enter in Q1.
- Whether the buyer without budget knows the labels in Q2.
- How many ticks the buyer without budget sets in Q4, and so which format the rule names for her.
- How much time away the buyer without budget would allow in Q5.
- Whether the buyer with budget's group works on the same product (Q3).
- Whether either buyer keeps, adds to or deletes the format text.

## What the team might change (proposals)
Sorted by criticality, then by evidence. Criticality is a proposal; the team decides. Setting is team, so the team may pick as many proposals as it wants fixed before the test.

| # | Proposal | Page | Evidence | Criticality | Why it ranks here |
|---|---|---|---|---|---|
| 1 | Show the named format and one or two others beside it | quiz result, formats page and inquiry page | shown sign, and a clash with a fact | fix before the test | The buyer without budget leaves the result. She needs options to react to ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)). The drop line counts testers who delete the format or leave ([discovery/test-cards/format-quiz-prototype.md:86](../test-cards/format-quiz-prototype.md#L86)). |
| 2 | Give the buyer something to take to colleagues, for example the result as text to copy | quiz result | shown sign | fix before the test | She talks it through with two colleagues first ([product/personas/buyer-without-budget.md:41](../../product/personas/buyer-without-budget.md#L41)) and wants something to show them ([product/personas/buyer-without-budget.md:86](../../product/personas/buyer-without-budget.md#L86)). Leaving the result is a drop sign on the card ([discovery/test-cards/format-quiz-prototype.md:76](../test-cards/format-quiz-prototype.md#L76)). |
| 3 | Ask in Q4 what hurts today, not what should change | quiz | clash with a fact | fix before the test | She can describe what hurts, not name a format ([product/personas/buyer-without-budget.md:85](../../product/personas/buyer-without-budget.md#L85)), and cannot name a success line ([product/personas/buyer-without-budget.md:44](../../product/personas/buyer-without-budget.md#L44)). The rework line counts testers stuck on a question ([discovery/test-cards/format-quiz-prototype.md:85](../test-cards/format-quiz-prototype.md#L85)). |
| 4 | Leave out the "Not sure" lines in the filled text | inquiry form | clash with a fact | fix before the test | She does not want to send a guess ([product/personas/buyer-without-budget.md:94](../../product/personas/buyer-without-budget.md#L94)). The go-on line needs the form sent with the format still in it ([discovery/test-cards/format-quiz-prototype.md:80](../test-cards/format-quiz-prototype.md#L80)). |
| 5 | In rule step 3, give a group with a wide range of working styles the two-day training, not the lab | quiz rule | other stall | fix if time allows | Her group includes people who asked a chat assistant something twice ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)), and she wants no one to fall behind ([product/personas/buyer-without-budget.md:30](../../product/personas/buyer-without-budget.md#L30)). No sign on the card counts which format the rule names. |
| 6 | Add a Q4 choice for keeping it up after the training | quiz | other stall, buyer with budget only | fix if time allows | He worries about "the Monday after" ([product/personas/buyer-with-budget.md:54](../../product/personas/buyer-with-budget.md#L54)). The card recruits only buyers without budget ([discovery/test-cards/format-quiz-prototype.md:96](../test-cards/format-quiz-prototype.md#L96)). |
| 7 | Put one plain example under each Q2 label | quiz | gap in the file | watch in the test | Her file holds the range in her group ([product/personas/buyer-without-budget.md:24](../../product/personas/buyer-without-budget.md#L24)), but no line on the labels. Only the test with people can show whether the labels stop a tester. |
