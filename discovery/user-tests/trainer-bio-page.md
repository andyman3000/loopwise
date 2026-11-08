# Persona walkthrough: trainer-bio, page

> **Pressure-tested, not validated.** The personas are built from the same sources as the opportunity.
> Run by an agent (`persona-walkthrough`) on 2026-11-08. Not a decision.
> Prototype card: `discovery/test-cards/trainer-bio-prototype.md` · Met: `http://localhost:3000/inquiry.html?variant=trainer-bio`
> Browser tool: Playwright MCP
> Material: personas are drafts from anonymised composite interviews and synthetic inquiries (`product/personas/sponsor-soft.md:6`, `product/personas/sponsor-hard.md:6`).

## Your first try
"does not know Jan well" · Where the personas stalled:
- The soft sponsor stalls on "What do you need?" in the form, not on the trainer bio (`product/personas/sponsor-soft.md:94`). She does not reach the trainer as a person at all.
- The hard sponsor leaves without starting because he does not fill a general form before trusting the provider (`product/personas/sponsor-hard.md:98`). His file says nothing about whether the bio closes that trust gap.
- Neither persona file has a source on "knowing Jan well". The stall you expected needs the cross test with people; the personas cannot test it.

Feedback: You named a specific worry on a specific element, which is a strong first try. Weak: "knowing Jan well" is what the tester feels or thinks, not what a watcher can see. Neither persona file has a source on reading or reacting to a trainer bio by name. The walkthrough showed stalls, but at other places: the form field for the soft sponsor, and the form itself for the hard sponsor.

## Scenario the personas got
- **Situation:** You are looking for an external training for your team. You have had trainings before that did not stick, so you are careful about who you bring in. You have just landed on a provider's inquiry page.
- **Task:** Have a look at this page. Decide what you would do next.

Mild clash with the soft sponsor: the scenario says "your team"; she has no line responsibility, team leads own the team (`product/personas/sponsor-soft.md:5`, `:16`). She keeps her own role.

## Soft sponsor
She lands on the inquiry page. Her file says she goes to the formats page first and expects to find out what she needs there (`product/personas/sponsor-soft.md:92`); here she skipped that step. She sees the bio block with a "JM" placeholder image and the heading "Jan Milz". Her file has no source for pausing on a named trainer, so the bio alone would not hold her [no source in the persona file: the persona cannot tell]. She reads the cohorts line "Ten years in product work". Her file has no source for reacting to tenure.

She reads Q1: "What is concretely different four weeks later, and how do we measure it?" Her file: "Those are very soft points, I know. It's not a hard return on investment." (`product/personas/sponsor-soft.md:53`). "Evidence comes from conversations, not measurement" (`:47`). The question lands in a vocabulary she avoids. A1 names signs to pick and measure; same mismatch. Q2 asks about a quarter; "I don't have a timeline" (`:54`).

She scrolls to the form. She stalls on "What do you need?" and closes it again (`:94`). She does not want to write "I don't know" to strangers (`:95`). She also wants someone who asks her the questions (`:86`); a static bio does not ask. She leaves without starting.

## Hard sponsor
He lands on the page. His file: "Compares providers in one evening. Looks for who they worked with and what changed afterwards" (`product/personas/sponsor-hard.md:95`). He sees the bio block. "Wants to talk to someone who delivered it, or a comparable reference" (`:46`). A named trainer is a step toward that; a static bio is not a conversation [the file has no source on reading a bio in place of a conversation].

Cohorts line: his file emphasises "Show me it works" (`:56`), not tenure [no source for reacting to ten years].

Q1 echoes his own standing question: "What is concretely different four weeks later, and how do we measure it?" (`:3`). A1 names signs the sponsor can read four weeks later. He "Demands a measure but has none" and "asks the provider what to look at" (`:48`): A1 matches the behaviour of asking the provider what to look at. Q2 about sticking after a quarter matches his frustration "four weeks later everything was as before" (`:38`). A2 about a short follow-up around week four matches "a second touchpoint after four or six weeks" (`:34`).

The bio does not give him "a comparable company I can call" (`:89`) or an internal business case (`:47`). He scrolls to the form. His file: "Does not fill in a general 'What do you need?' form before trusting the provider. Writes three precise questions by mail instead" (`:98`). The bio closes some of the trust gap in his vocabulary, but his file does not quote a behaviour of starting the form after reading a bio. He does not start.

## Signs
| Sign (from the card) | Points to | Soft sponsor | Hard sponsor | Rests on |
|---|---|---|---|---|
| Stops on the bio block and reads it before going anywhere else | go on | cannot tell | cannot tell | no source in either persona file for pausing on a trainer bio; `product/personas/sponsor-hard.md:46` names wanting a conversation, not reading a static bio. The card said "only the cross test with people can test this". |
| Mentions the trainer or something in the bio in their own words | go on | cannot tell | cannot tell | the card said "only the cross test with people can test this" |
| Starts filling the form | go on | not shown | not shown | `product/personas/sponsor-soft.md:94` (stalls on "What do you need?"); `product/personas/sponsor-hard.md:98` (does not fill a general form before trusting the provider) |
| Leaves the page without starting the form | rework or drop | shown | shown | `product/personas/sponsor-soft.md:94`; `product/personas/sponsor-hard.md:98` |
| Fills the form without looking at or mentioning the bio | rework or drop | cannot tell | cannot tell | neither persona fills the form at all, so the sign cannot fire from either file |

## Other stalls
- The soft sponsor reads Q1, A1 and Q2 in a measurement vocabulary she avoids (`product/personas/sponsor-soft.md:47`, `:53`, `:54`). The bio reads as aimed at a different sponsor type. Not a sign on the card; a signal the bio does not reach her.
- The hard sponsor's file quotes "a comparable company I can call" (`:89`) and help defining what to measure (`:90`). The bio covers the second (A1 hints at it); the first is absent. Not a sign on the card.

## Against the two lines
- Go-on line ("The tester starts the form, and names the trainer or something in the bio as part of why"): neither persona starts; neither file has a source for "names the trainer". Not testable by the personas.
- Rework-or-drop line ("The tester leaves without starting, or starts without ever looking at or referring to the bio"): both personas leave. In letter, the line fires. In spirit, both leave for behaviour quoted before any bio existed (`:94`, `:98`), not because the bio failed. The walkthrough is unclear on whether the bio changes this.

Reading: unclear. The personas cannot say whether the bio moves anyone to start.

## What the personas cannot tell
- Whether the bio moves a sponsor to start the form. Neither persona file quotes behaviour that reads a bio and then starts.
- Whether the tester would mention the trainer by name or quote something from the bio. That lives in words in the tester's own voice.
- Whether a soft sponsor could be reached by changing the bio's vocabulary. No source in her file tests that.
- The three signs the card marked "only the cross test with people can test this".

## What the pair might change (proposals)
- Add a soft-sponsor path on the bio block (inquiry page, `site/variants/trainer-bio/inquiry.html`): a third Q+A pair in her vocabulary, not measurement. Draws from "In theory the knowledge should be there. The doing isn't." (`product/personas/sponsor-soft.md:51`) or "Someone who asks me the questions" (`sources/interviews/sponsor-soft.md:114`). The current bio reads as aimed at the hard sponsor only.
- Add a line or element the hard sponsor's file quotes as missing (inquiry page): "A comparable company to call" (`product/personas/sponsor-hard.md:89`). The trainer is named; a reference he can call is not.
- Pair the bio with a change to the first form field on the inquiry page. Both personas' files quote a stall before any field is filled: "What do you need?" is where the soft sponsor closes (`product/personas/sponsor-soft.md:94`); the hard sponsor refuses a general form at all (`product/personas/sponsor-hard.md:98`). The bio alone leaves this intact.
