# Persona walkthrough: format-quiz, spec

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`persona-walkthrough`) on 2026-10-25. Not a decision.
> Prototype card: `discovery/test-cards/format-quiz-prototype.md` · Met: `discovery/specs/format-quiz.md`, sections "What changes on the page" and "Fields and validation"
> The spec changed after this run (2026-10-25). The personas read the version committed as `block(05): spec for format-quiz`.
> Material: personas are drafts from anonymised composite interviews and synthetic inquiries (`product/personas/sponsor-soft.md:6`, `product/personas/sponsor-hard.md:6`). This file repeats that label.

A persona is a written profile of a sponsor type, built from interviews and mails.
Playing it finds obvious problems before people test the page.
A persona cannot show anything its file has no source for.

## Your first try
"I think they might just not go through the quiz" · Where the personas stalled:
- Your guess is the sign "passes the link". Neither persona file says how a sponsor treats an optional step, so this stays open.
- The soft sponsor stalls inside the quiz, at the first question. She has no single team in mind yet.
- Both personas hesitate where a question allows one answer but their file fits two.

## Scenario the personas got
- **Situation:** You help a product team in your company get better at using AI in their daily work. Think of a real team you know well that could use outside training for this. You are on the website of an academy that runs trainings inside companies.
- **Task:** Get in touch with the academy about a training for that team.
- **Start page:** the formats page with the quiz variant (`discovery/specs/format-quiz.md:4`).

## Soft sponsor
No clash with the scenario. She "supports the move to AI for product and project roles, together with the team leads" (`product/personas/sponsor-soft.md:14`).

- **Formats page, quiz link.** The link asks whether she is unsure what to pick (`discovery/specs/format-quiz.md:25`). She "Does not know the format or how many pieces it has" (`product/personas/sponsor-soft.md:43`). So the question fits her. Whether she clicks it: [no source in the persona file: the persona cannot tell].
- **Q1, who is in the team.** She hesitates. She "Sketched three slices (by role, by team, by project) and picked none, on purpose" (`product/personas/sponsor-soft.md:44`). The question assumes one team she has already picked. If she goes on, she ticks product managers, product owners and the people moving over from project management. Her file names product and project roles (`product/personas/sponsor-soft.md:14`, `product/personas/sponsor-soft.md:22`).
- **Q2, team size.** She leaves it empty. [no source in the persona file: the persona cannot tell]
- **Q3, where the team stands with AI.** She hesitates. Q3 allows one answer. Her people range "from a former developer to people using only built-in AI" (`product/personas/sponsor-soft.md:25`). Her teams differ as well (`product/personas/sponsor-soft.md:26`).
- **Q4, what the team tried before.** She picks the option about an external course. Her file says "All of the group went to an external course at some point, mostly optional" (`product/personas/sponsor-soft.md:23`).
- **Q5, what should be different.** She ticks the first two options. They match her goals almost word for word (`product/personas/sponsor-soft.md:30`, `product/personas/sponsor-soft.md:31`).
- **Inquiry page.** The form is filled from her answers. Name, company and email get placeholders ("Test Sponsor", "Test Company", "sponsor@example.com"), with no source. Whether she sends: [no source in the persona file: the persona cannot tell]. She needs the team leads for a pilot (`product/personas/sponsor-soft.md:42`). Her file says nothing about an inquiry.

## Hard sponsor
The persona keeps its own role: "head of product" (`product/personas/sponsor-hard.md:14`). The scenario says "you help a product team". He leads that team.

- **Formats page, quiz link.** He is "Also unsure of the format" (`product/personas/sponsor-hard.md:62`). Whether he clicks the link: [no source in the persona file: the persona cannot tell].
- **Q1, who is in the team.** He ticks product owners. His file says "product owners missed the agent training developers got" (`product/personas/sponsor-hard.md:24`).
- **Q2, team size.** He leaves it empty. [no source in the persona file: the persona cannot tell]
- **Q3, where the team stands with AI.** He hesitates between two options. Tools are rolled out, but "the actual work hasn't changed" (`product/personas/sponsor-hard.md:23`). The group "ranges from never written a prompt to building their own agents" (`product/personas/sponsor-hard.md:24`). Q3 allows one answer.
- **Q4, what the team tried before.** He hesitates again. Developers got training and product people did not (`product/personas/sponsor-hard.md:24`). An earlier training changed nothing: "four weeks later everything was as before" (`product/personas/sponsor-hard.md:38`). Q4 allows one answer.
- **Q5, what should be different.** He ticks the two options that come from his file. He wants "One or two things ready that people can use productively straight after" (`product/personas/sponsor-hard.md:31`). He asks "What is concretely different four weeks later, and how do we measure it?" (`product/personas/sponsor-hard.md:3`).
- **After the quiz.** The quiz gives him nothing back. The spec leaves a format suggestion out (`discovery/specs/format-quiz.md:145`). He "asks the provider what to look at" for a measure (`product/personas/sponsor-hard.md:48`). He "Wants to talk to someone who delivered it, or a comparable reference" (`product/personas/sponsor-hard.md:46`). The page offers no person and no reference (`discovery/specs/format-quiz.md:153`).
- **Inquiry page.** The form is filled from his answers. Name, company and email get placeholders, with no source. Whether he sends: [no source in the persona file: the persona cannot tell].

## Signs
| Sign (from the card) | Points to | Soft sponsor | Hard sponsor | Rests on |
|---|---|---|---|---|
| The tester clicks the quiz link before writing in the form | go on | cannot tell | cannot tell | no source in the persona file |
| The tester answers every quiz question without asking the watcher what it means | go on | cannot tell | cannot tell | no source in the persona file. Both leave Q2 empty for lack of a line. |
| The tester finishes the quiz and sends the inquiry | go on | cannot tell | cannot tell | no source in the persona file on sending |
| The tester stops at a question, says "I don't know", or leaves it empty | rework or drop | shown | cannot tell | The soft sponsor stalls at Q1 because she picked no team (`product/personas/sponsor-soft.md:44`). The hard sponsor hesitates at Q3 and Q4 but does not stop (see "Other stalls"). |
| The tester passes the link and writes straight into the form | rework or drop | cannot tell | cannot tell | no source in the persona file |
| The tester asks for a call or a person instead of the quiz | rework or drop | cannot tell | cannot tell | The hard sponsor wants a reference (`product/personas/sponsor-hard.md:46`). That is a different behaviour, as the card says. |
| The tester says the quiz takes too long, or asks how many questions are left | rework or drop | cannot tell | cannot tell | no source in the persona file |

## Other stalls
- Q3 and Q4 allow one answer. Both persona files fit two options (`product/personas/sponsor-soft.md:25`, `product/personas/sponsor-soft.md:26`, `product/personas/sponsor-hard.md:23`, `product/personas/sponsor-hard.md:24`, `product/personas/sponsor-hard.md:38`).
- The hard sponsor finds no person and no reference on the page (`product/personas/sponsor-hard.md:46`). He "Asks for references and how success is measured before a call" (`product/personas/sponsor-hard.md:60`).
- The quiz tells the hard sponsor nothing back about a measure. He asks the provider what to look at (`product/personas/sponsor-hard.md:48`).

## Against the two lines
Unclear. Neither persona file can show any of the three go-on signs. The only sign shown points to rework or drop: the soft sponsor stalls at Q1. She has no single team in mind (`product/personas/sponsor-soft.md:44`). The test with people decides whether testers take the quiz at all.

## What the personas cannot tell
- Whether a sponsor clicks the quiz link or goes straight to the form.
- Whether a sponsor answers every question without help.
- Whether a sponsor finishes the quiz and sends the inquiry.
- Whether a sponsor asks for a call instead of the quiz.
- Whether the quiz feels too long.
- What team size each sponsor would enter.

## What the pair might change (proposals)
- Formats page, Q1: add an answer like "not decided yet, several teams". Because the soft sponsor picked no team on purpose (`product/personas/sponsor-soft.md:44`).
- Formats page, Q3 and Q4: allow several ticks. Because both persona files fit two options at each question.
- Formats page, every question: add an "I don't know yet" option. The spec leaves this open (`discovery/specs/format-quiz.md:154`). Both personas have no line for Q2.
- Inquiry page or confirmation page: say what the scoping call covers, for example how success gets measured. Because the hard sponsor asks the provider what to look at (`product/personas/sponsor-hard.md:48`).
- Formats page: say that a talk with a person is possible. Because the hard sponsor wants to talk to someone (`product/personas/sponsor-hard.md:46`).

Ask a person who did not build the page to try it too, with only the situation and the task.
