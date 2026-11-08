# Spec: trainer-bio

> Spec drafted by an agent (`variant-spec`) on 2026-11-08, before the build.
> **Variant:** `trainer-bio` · Pages it changes: `site/variants/trainer-bio/inquiry.html` · Tester starts at `/inquiry.html?variant=trainer-bio`
> **Idea:** I5 in `discovery/intents/seriousness-before-form.md` ("a trainer bio block at the top of the inquiry page: name, cohorts delivered, two quoted replies to sponsor questions")
> **Assumption under test:** "Sponsors judge seriousness by a named trainer with specifics, not by a company brand." (`discovery/test-cards/trainer-bio-prototype.md:18`)
> **Label:** real conversations, anonymised composites (sponsor interviews, `sources/interviews/sponsor-hard.md:3`).

## Your first try
"an image and some content on the trainer, some statements where he is helpgulf above the form" · Where the draft differs:
- Jan named the smallest page and kept the form intact. The draft keeps that shape.
- "Some content on the trainer" is softened to the tighter list the idea names: name, cohorts delivered, two quoted replies to sponsor questions. An image is added as Jan asked.
- "Statements where he is helpful" is replaced by two quoted replies to specific sponsor questions. The prototype signs listen for the tester mentioning the trainer or something in the bio. A reply tied to a question the sponsor would have asked is likelier to pull that mention out.

Feedback: Good: Jan named the smallest page, said what goes above the form and kept the form alone. Weak: "some content on the trainer" and "statements where he is helpful" are vague. The signs on the prototype card listen for a specific mention; vague content makes the signs hard to spot. Tying the bio to questions sponsors actually ask gives the tester something concrete to react to.

## What changes on the page
On `site/variants/trainer-bio/inquiry.html`, between the lead paragraphs under `<h1>Inquiry</h1>` and the `<div class="with-aside">` that holds the form, insert a trainer bio block as a `<section class="trainer-bio">`. Order on the page: headline, lead lines, bio block, form. The block holds, in order:

1. A photo of the trainer (`<img>` with alt text that names the trainer).
2. The trainer's name as a visible heading inside the block.
3. One line: cohorts delivered (a count and a timeframe).
4. Two quoted replies to sponsor questions. Each one shows a short italic line of the question, then a short reply below.

For the prototype build, the content is real and confirmed by Jan on 2026-11-08: his name, a cohorts line ("Ten years in product work. Trainer and coach to product teams across industries."), and two question-and-reply pairs. The photo is still a placeholder (initials "JM") until Jan drops an image file in `site/variants/trainer-bio/`.

Everything else stays as the baseline inquiry page (`site/inquiry.html`): the "Tell us a little about you" lead, the "Sending this form books nothing" line, the form with its five fields, and the aside "What happens after you send it" (`site/inquiry.html:33-41`). The form sends an inquiry to `/api/inquiry` and the page redirects to `/confirmation.html?variant=trainer-bio` after a successful send.

The bio block sits in the normal document flow above the form, so a tester cannot submit without scrolling past it; whether they read it is a separate sign the watcher judges.

## Where the watcher sees each sign
| Sign (from the prototype card) | Element on the page |
|---|---|
| The tester stops on the trainer bio block and reads it before going anywhere else | the `<section class="trainer-bio">` above the form |
| The tester mentions the trainer, or something in the bio, in their own words while on the page | visible text in the bio block: the trainer's name, the cohorts line, the two question-and-reply pairs |
| The tester starts filling the form | any field in the `<form id="inquiry-form">` (focus fires `inquiry_started`, `site/components/inquiry-form.js:41-45`) |
| The tester leaves the page without starting the form | the browser closes the tab or navigates away before any field is focused; no `inquiry_started` fires |
| The tester fills the form without looking at or mentioning the bio | the bio block is above the form and visible on load; the watcher sees the tester's eyes and hears what they say while filling |

## Fields and validation
The form keeps today's five fields and today's validation (`site/components/inquiry-form.js:7-23`).

| Field (POST body key) | Type | Required | Allowed values or limit |
|---|---|---|---|
| name | string | yes | trimmed, non-empty (`site/components/inquiry-form.js:10`) |
| company | string | yes | trimmed, non-empty (`site/components/inquiry-form.js:11`) |
| email | string | yes | matches `^[^\s@]+@[^\s@]+\.[^\s@]+$` (`site/components/inquiry-form.js:3`, `:13`) |
| teamSize | number | no | if given, integer ≥ 1 (`site/components/inquiry-form.js:17-21`) |
| message | string | yes | at least 10 characters after trim (`site/components/inquiry-form.js:4`, `:14`) |
| variant | string | yes | set to `trainer-bio` by the init function (`site/components/inquiry-form.js:58`) |

## Events to emit
| Event | When it fires | Props |
|---|---|---|
| `page_view` | on page load | `{ page: 'inquiry' }`, variant `trainer-bio` (`site/inquiry.html:55`) |
| `inquiry_started` | first focus on any field in the form | `{}`, variant `trainer-bio` (`site/components/inquiry-form.js:41-45`) |
| `inquiry_submitted` | after a successful POST to `/api/inquiry` | `{}`, variant `trainer-bio` (`site/components/inquiry-form.js:62`) |

The prototype test does not read these events. They stay in the spec so the launch card later can read the live run against them.

## What stays the same
- The header, the nav, the footer (`site/inquiry.html:10-18`, `:44-51`).
- The lead line "Tell us a little about you and what you need." and the "Sending this form books nothing" line (`site/inquiry.html:21-22`).
- The aside "What happens after you send it" (`site/inquiry.html:33-41`).
- The submit flow: POST to `/api/inquiry`, redirect to `/confirmation.html?variant=trainer-bio` (`site/components/inquiry-form.js:55-66`).

## Critical assumptions it rests on
- "Sponsors judge seriousness by a named trainer with specifics, not by a company brand." (`discovery/intents/seriousness-before-form.md:31`) · Level in the intent: unsupported. One hard sponsor voice (`sources/interviews/sponsor-hard.md:90`).

## What we cannot see
- Whether a sponsor read the bio: no scroll event, no dwell event. The prototype test uses a watcher next to one tester; later live runs cannot count this.
- Whether the tester mentioned the trainer in their own words: no event carries speech.
- Whether the specifics in the bio (which cohorts, which replies) are the right specifics: the page shows one set of specifics, so the test shows only whether that one set moves the tester.

## Invented lines on the page
| Line the sponsor sees | Who could confirm it |
|---|---|
| Trainer name: Jan Milz | confirmed by Jan 2026-11-08 |
| Trainer photo | still a placeholder (initials "JM"); open until Jan supplies an image file |
| Cohorts line: "Ten years in product work. Trainer and coach to product teams across industries." | confirmed by Jan 2026-11-08 |
| Q1: "What is concretely different four weeks later, and how do we measure it?" | adapted from `sources/interviews/sponsor-hard.md:33`; confirmed by Jan 2026-11-08 |
| Q2: "How would I know after a quarter that this time it stuck?" | adapted from `sources/emails/inquiry-04.md:18`; confirmed by Jan 2026-11-08 |
| A1 (reply to Q1): "We settle this on the scoping call. For every format, we pick two or three signs you can read in your team's work four weeks later: a shipped change, a conversation you would not have had before, a decision made with different inputs." | confirmed by Jan 2026-11-08 · promise about what the trainer does; the launch card will carry it as a critical assumption until a delivered cohort confirms it |
| A2 (reply to Q2): "We set a short follow-up with you around week four. One call, one page: what carried over, what did not. If nothing stuck, we say so." | confirmed by Jan 2026-11-08 · promise about what the trainer does; the launch card will carry it as a critical assumption until a delivered cohort confirms it |

Every line above is a promise on the page. Each one becomes a critical assumption on the launch card later (`.claude/skills/test-card`, launch mode, "Invented lines are assumptions").

## Out of scope for the prototype
- Changing the form fields, their order, their labels or their validation.
- Changing the aside "What happens after you send it".
- Any page other than the inquiry page. `formats.html` and `index.html` stay the baseline for this variant.
- A later roll-out to live traffic. That comes after the learning card and a launch card.

## Open points for the human
- Trainer name: Jan Milz (Jan, 2026-11-08).
- Cohorts line: "Ten years in product work. Trainer and coach to product teams across industries." (Jan, 2026-11-08).
- The two questions and replies: drafted and confirmed by Jan 2026-11-08 (see "Invented lines on the page").
- Trainer photo: still open. The build uses a placeholder (initials "JM"). Jan supplies an image file in `site/variants/trainer-bio/` before the prototype test runs. Touches the sign "stops on the bio block before going anywhere else".
- Position on the page: below the headline and lead lines, above the form (Jan, 2026-11-08).

## Build prompt
> Build the variant in discovery/specs/trainer-bio.md as one file per page it changes in
> site/variants/trainer-bio/, named like the page it replaces (inquiry.html), and add the name
> to "variants" in site/config.json. Do not set "shipped".
