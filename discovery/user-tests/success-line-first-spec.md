# Persona walkthrough: success-line-first, spec

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`persona-walkthrough`) on 2026-08-18. Not a decision.
> Prototype card: `discovery/test-cards/success-line-first-prototype.md` · Met: `discovery/specs/success-line-first.md`, sections "What changes on the page" and "Fields and validation"
> Material: personas are drafts from anonymised composite interviews and synthetic inquiries (`product/personas/sponsor-soft.md:6`, `product/personas/sponsor-hard.md:6`). This file repeats that label.

A persona is a written profile of a sponsor type, built from interviews and mails.
Playing it finds obvious problems before people test the page.
A persona cannot show anything its file has no source for.
A success line is one sentence on what should be different for the team after the training.

## Your first try
"1. Scroll right past the question 2. Get confused by the answers"

Where the personas stalled:
- Neither persona can scroll past the question. The form stays hidden until Continue (`discovery/specs/success-line-first.md:26`).
- The hard sponsor stalls at the examples. One example says a measure was agreed up front. He has none (`product/personas/sponsor-hard.md:55`).
- The hard sponsor's file points to the "Don't know yet" box instead.

## Scenario the personas got
- **Situation:** You help a product team in your company get better at using AI in their daily work. Think of a real team you know well that could use outside training for this. You are on the website of an academy that runs trainings inside companies.
- **Task:** Get in touch with the academy about a training for that team.

(`discovery/test-cards/success-line-first-prototype.md:33`, `:34`)

## Soft sponsor
No clash with the scenario. She "supports the move to AI for product and project roles, together with the team leads" (`product/personas/sponsor-soft.md:14`).

**The question.** The page asks what should be different for the team in three months (`discovery/specs/success-line-first.md:26`). She thinks of the team, not of herself: "For me, nothing at first. It's for them." (`product/personas/sponsor-soft.md:45`). The three months may not fit her. Her file says "No timeline" (`product/personas/sponsor-soft.md:46`).

**The examples.** The first group heading is about taking it into daily work (`discovery/specs/success-line-first.md:29`). Its three examples are her own goals almost word for word (`product/personas/sponsor-soft.md:30`, `:31`, `:32`). She would likely click one. That is recognition of her own file, not a test (`discovery/test-cards/success-line-first-prototype.md:60`). Whether she would change the words: [no source in the persona file: the persona cannot tell]. Her file says this is unknown: "Whether this sponsor can write a success line when given examples. No source tests it." (`product/personas/sponsor-soft.md:68`).

**Hesitation.** She "Does not decide alone: the team leads are needed for a pilot" (`product/personas/sponsor-soft.md:42`). Whether she would commit to a line without them: [no source in the persona file: the persona cannot tell].

**The format note.** The page says the format is settled in the scoping call (`discovery/specs/success-line-first.md:39`). This meets her: she "Does not know the format or how many pieces it has" (`product/personas/sponsor-soft.md:43`).

**The form.** Name, company and email: Test Sponsor, Example Org, sponsor@example.com (no source). The message field "What do you need?" is required (`discovery/specs/success-line-first.md:67`). Her file holds "Not sure what is needed; cannot tell what workshop versus team coaching would mean" (`product/personas/sponsor-soft.md:58`). She would write the format question there. She also has "no clear idea what to ask for" (`product/personas/sponsor-soft.md:59`). Whether she sends: [no source in the persona file: the persona cannot tell].

## Hard sponsor
No clash with the scenario. He is "head of product" (`product/personas/sponsor-hard.md:14`) and "got a first step approved" (`product/personas/sponsor-hard.md:16`).

**The question.** He asks the same kind of question himself: "What is concretely different four weeks later, and how do we measure it?" (`product/personas/sponsor-hard.md:3`). Three months is close to his "after a quarter" (`product/personas/sponsor-hard.md:61`).

**The examples.** The second group heading is about showing the effect (`discovery/specs/success-line-first.md:33`). That is his goal: "Show the effect, then get more budget and more teams" (`product/personas/sponsor-hard.md:30`). The last example says the measure was agreed up front and is checked after four to six weeks (`discovery/specs/success-line-first.md:36`). He wants that: "KPIs defined up front" (`product/personas/sponsor-hard.md:33`). But he has no measure: "Honestly, I haven't worked that out." (`product/personas/sponsor-hard.md:55`). He cannot pick that example as written.

**The tick box.** The box says the outcome can be worked out in the call (`discovery/specs/success-line-first.md:38`). His file: "Demands a measure but has none: no cost-benefit analysis, and asks the provider what to look at" (`product/personas/sponsor-hard.md:48`). He would likely tick it.

**Hesitation.** He "Asks for references and how success is measured before a call" (`product/personas/sponsor-hard.md:60`). The page moves the measure into the call. It shows no reference. He also "Wants to talk to someone who delivered it, or a comparable reference" (`product/personas/sponsor-hard.md:46`).

**The form.** Name, company and email: Test Sponsor, Example Org, sponsor@example.com (no source). In "What do you need?" he would ask for references and how success is measured (`product/personas/sponsor-hard.md:60`). He is "Also unsure of the format: workshop, longer accompaniment or something else" (`product/personas/sponsor-hard.md:62`). Whether he sends: [no source in the persona file: the persona cannot tell].

## Signs
| Sign (from the card) | Points to | Soft sponsor | Hard sponsor | Rests on |
|---|---|---|---|---|
| The tester picks an example and changes words in it to fit their team, or writes their own line | go on | cannot tell | cannot tell | No line in either file on editing text. The soft sponsor's file says it is unknown (`product/personas/sponsor-soft.md:68`). A click on her own goal is recognition (`discovery/test-cards/success-line-first-prototype.md:60`). |
| The tester goes on to the contact form and sends the inquiry | go on | cannot tell | cannot tell | no source in the persona file |
| The tester ticks "Don't know yet", or says they do not know what should be different | rework or drop | cannot tell | shown | Hard sponsor: asks the provider what to look at (`product/personas/sponsor-hard.md:48`), has not worked it out (`product/personas/sponsor-hard.md:55`). Soft sponsor: her "I have no idea" is about the format (`product/personas/sponsor-soft.md:52`, `:43`), not the outcome. |
| The tester asks the watcher what the question means or what kind of answer is wanted | rework or drop | cannot tell | cannot tell | no source in the persona file |
| The tester scrolls past the question to look for the form, or asks which format to choose | rework or drop | cannot tell | cannot tell | The form is hidden until Continue (`discovery/specs/success-line-first.md:26`). Both files hold the format question (`product/personas/sponsor-soft.md:58`, `product/personas/sponsor-hard.md:62`). It comes up later, in the message field, after the success line. |
| The tester asks for a call or a person instead | rework or drop | cannot tell | cannot tell | The card calls the hard sponsor's wish for a reference a different behaviour (`product/personas/sponsor-hard.md:46`). See "Other stalls". |

## Other stalls
- The hard sponsor cannot pick the last example. It says a measure was agreed up front. He has none (`product/personas/sponsor-hard.md:55`).
- The hard sponsor wants references and the success measure before any call (`product/personas/sponsor-hard.md:60`). The page moves the measure into the call.
- The soft sponsor has no timeline (`product/personas/sponsor-soft.md:46`). The question asks about three months.
- The soft sponsor needs the team leads for a pilot (`product/personas/sponsor-soft.md:42`). Whether she writes a line without them is not in her file.
- Both sponsors still must write "What do you need?". Both would ask about the format there (`product/personas/sponsor-soft.md:58`, `product/personas/sponsor-hard.md:62`).

## Against the two lines
For the soft sponsor: unclear. Her file has no line on any of the signs.
For the hard sponsor: the observations lean towards the rework-or-drop line. His file says he asks the provider what to look at (`product/personas/sponsor-hard.md:48`). The tick box offers exactly that.
Five of the six signs stay open. Only the cross test with people can show them.

## What the personas cannot tell
- Whether a sponsor changes the words of an example or writes an own line.
- Whether a sponsor sends the inquiry.
- Whether a sponsor asks what the question means.
- Whether a sponsor looks for a way past the question.
- Whether the soft sponsor ticks "Don't know yet".
- Whether the soft sponsor commits to a line without the team leads.

## What the pair might change (proposals)
- Inquiry page, last example: word it as a wish, not as done. Because the hard sponsor has no measure yet (`product/personas/sponsor-hard.md:55`).
- Inquiry page, tick box: keep it, but watch how often it is ticked in the cross test. Because the hard sponsor's file points to it (`product/personas/sponsor-hard.md:48`).
- Inquiry page, question: test "three months" against a question without a date. Because the soft sponsor has no timeline (`product/personas/sponsor-soft.md:46`).
- Inquiry page, message field: say the format question is welcome there. Because both sponsors would ask it (`product/personas/sponsor-soft.md:58`, `product/personas/sponsor-hard.md:62`).

Ask a person who did not build the page to try it too, with only the situation and the task.
