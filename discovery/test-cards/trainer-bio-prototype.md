# Prototype test card: trainer-bio

> **Pressure-tested, not validated.** The AI personas come from the same sources as the opportunity. Only the cross test with people tests from outside.
> Assessment drafted by an agent on 2026-11-08, not a decision.
> Card owner: ____ (human decides)
> Intent: `discovery/intents/seriousness-before-form.md` · Idea: I5 ("a trainer bio block at the top of the inquiry page: name, cohorts delivered, two quoted replies to sponsor questions")
> Material: real conversations, anonymised composites (sponsor interviews, `sources/interviews/sponsor-hard.md:3`).

## Your first try
"prospects gai trust if they see a trainer's bio on top of the form" · Where the draft differs:
- Jan rolled all four lines into one. The draft splits them: the assumption, what one tester does on the page, what the watcher sees, and the go-on line.
- Jan's line blends the assumption (sponsors judge seriousness by a named trainer with specifics) with the idea (the bio block). The draft keeps the assumption separate from the idea.
- "And measure" and "We are right if" are missing in the first try. The draft adds signs the watcher can see or hear, and a go-on line set before the test.

Feedback: Good: names what should happen on the page. Weak: the four lines are not separated. A test card needs them distinct so the watcher knows which sign to look for and when to stop. The first try alone could not guide a watcher through the test.

## We believe that (the assumption we test)
"Sponsors judge seriousness by a named trainer with specifics, not by a company brand." (`discovery/intents/seriousness-before-form.md:31`)
Level in the intent: unsupported. One hard sponsor voice says he will not fill a general form until the other side is serious (`sources/interviews/sponsor-hard.md:90`).

## To verify that, we will
Show one tester from another pair the page `/inquiry.html?variant=trainer-bio`. The tester gets only the scenario below. The person who built the page watches for the signs.

### Test scenario (the tester sees only this)
- **Situation:** You are looking for an external training for your team. You have had trainings before that did not stick, so you are careful about who you bring in. You have just landed on a provider's inquiry page.
- **Task:** Have a look at this page. Decide what you would do next.
- **Page:** `/inquiry.html?variant=trainer-bio`, the page the spec names as the start
- **Sources:** `sources/interviews/sponsor-hard.md:23` (trainings that did not stick), `sources/interviews/sponsor-hard.md:90` (does not fill a general form before trusting the provider)
- **Does not count if:** the tester has no real team or training situation in mind.

## And measure (the signs the watcher looks for)
| Sign (what the watcher sees or hears) | Points to | Can a persona show it? |
|---|---|---|
| The tester stops on the trainer bio block and reads it before going anywhere else | go on | only the cross test with people can test this |
| The tester mentions the trainer, or something in the bio, in their own words while on the page | go on | only the cross test with people can test this |
| The tester starts filling the form | go on | no persona source for starting the form after reading a bio; the inverse behaviour is quoted (`product/personas/sponsor-hard.md:98`) |
| The tester leaves the page without starting the form | rework or drop | yes: "stalls at ... and closes it again" (`product/personas/sponsor-soft.md:94`); "Does not fill in a general ... form before trusting the provider" (`product/personas/sponsor-hard.md:98`) |
| The tester fills the form without looking at or mentioning the bio | rework or drop | only the cross test with people can test this |

## We are right if (go-on line)
The tester starts the form, and names the trainer or something in the bio as part of why. · proposal · Set on: 2026-11-08

## We rework or drop the idea if (rework-or-drop line)
The tester leaves without starting, or starts without ever looking at or referring to the bio. · proposal · Set on: 2026-11-08

## What this test cannot show
- One tester per pair: a pattern, not a rate.
- Whether the sponsor later books, or whether they come back to the page.
- Whether the specifics in the bio (cohorts delivered, quoted replies) are the right specifics: the test only shows whether the tester reads the block and ties their next step to it.
- The three signs marked "only the cross test with people can test this" need a human tester. An AI persona walkthrough cannot show them, since every one needs words in the tester's own voice or a behaviour no persona file has a source for.
