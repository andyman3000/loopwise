# Intent: Buyers start an inquiry with confidence, whether or not they know their format

> Assessment by an agent (`intent-and-ideas`), not a decision. Date: 2026-11-14.
> Opportunity: C1, "I can't tell which format fits my group.", in [discovery/opportunity-comparison.md](../opportunity-comparison.md) · Decision: [discovery/decisions/001-format-fit.md](../decisions/001-format-fit.md)
> Material: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

An intent says what should change, for whom, and why, before anyone picks a solution.
A critical assumption is the one thing that must be true for an idea to work.
An opportunity is a need or a pain a customer has, never a solution.
A buyer is the person in the customer company who wants a format for their team ([product/glossary.md:8](../../product/glossary.md#L8)).
A format is one thing a team can book, from a half-day workshop to weeks of team coaching ([product/glossary.md:20](../../product/glossary.md#L20)).
The inquiry is the form on the website where a buyer asks for a format ([product/glossary.md:32](../../product/glossary.md#L32)).
The scoping call is the first call after an inquiry. Buyer and Loopwise settle there which format fits ([product/glossary.md:33](../../product/glossary.md#L33)).
A KPI branch is one way the business goal can grow.
A driver is one step in the path to a booking that the site can count.

This file reads on its own. Links to other files are for further reading.

## Problem
The [formats page](../../site/formats.html) shows five formats side by side.
Buyers read them and cannot tell which one fits their group.
One buyer writes: "Side by side, I can't tell which one is us." ([sources/inquiry-mails/inquiry-07.md:16](../../sources/inquiry-mails/inquiry-07.md#L16)).
Some buyers then do not fill in the form at all.
The same buyer writes: "I didn't want to send your form with a guess in it, so I am writing instead." ([sources/inquiry-mails/inquiry-07.md:18](../../sources/inquiry-mails/inquiry-07.md#L18)).
11 buyers in mails, support requests and interviews describe this need ([discovery/opportunity-comparison.md:85](../opportunity-comparison.md#L85)).
The [formats page](../../site/formats.html) already says: "The scoping call shapes the real format."
Buyers still feel they must choose first ([discovery/opportunity-comparison.md:86](../opportunity-comparison.md#L86)).

## Desired outcome
More of the buyers who open the inquiry page start filling in the form.
They start even when they do not know their format yet.
- How the site counts it: a visit counts as started when the visitor clicks into a form field (`inquiry_started`, [site/components/inquiry-form.js:41](../../site/components/inquiry-form.js#L41)). The share of inquiry page visits that start the form is the driver "start rate" ([discovery/kpi-tree.md:21](../kpi-tree.md#L21)).
- Why it matters: this quarter Loopwise works on one way to grow, more inquiries that end in a booking ([discovery/kpi-tree.md:18](../kpi-tree.md#L18)). Every booking passes through this step first.
- Today: 194 of 740 inquiry page visits started the form, in 26 weeks of synthetic data ([discovery/opportunities/data.md:51](../opportunities/data.md#L51)). The other 546 visits left without clicking into the form.
- No target here.

## For whom and where
- Who: buyers before they send their first inquiry.
  - Mainly the buyer without budget. This buyer cannot tell what a workshop would mean compared with team coaching ([product/personas/buyer-without-budget.md:57](../../product/personas/buyer-without-budget.md#L57)).
  - The buyer with budget is also unsure which format to take ([product/personas/buyer-with-budget.md:62](../../product/personas/buyer-with-budget.md#L62)).
- Pages the ideas may change: the inquiry page ([site/inquiry.html](../../site/inquiry.html)), and any page a buyer sees before it.
  - The formats page ([site/formats.html](../../site/formats.html)) lists the five formats.
  - The home page ([site/index.html](../../site/index.html)).
  - The buyer preparation page ([site/buyer-prep.html](../../site/buyer-prep.html)) shows what happens after a booking.

## Open questions
- Which part of the formats page leaves buyers unsure? No sender says ([discovery/opportunity-comparison.md:90](../opportunity-comparison.md#L90)). · who can answer: buyers, walking through the formats and inquiry pages · blocks: the prototype
- Do visitors leave the formats page because they cannot choose? ([discovery/opportunity-comparison.md:170](../opportunity-comparison.md#L170)) · who can answer: buyers, in the same walk-through · blocks: the prototype
- Do buyers who gave up without writing have the same need? Every buyer quoted here wrote to Loopwise in the end ([discovery/opportunity-comparison.md:85](../opportunity-comparison.md#L85)). · who can answer: no source today; a walk-through with buyers who have not written · blocks: the launch
- Did the buyers who wrote mails and support requests book in the end? ([discovery/opportunity-comparison.md:169](../opportunity-comparison.md#L169)) · who can answer: Loopwise, from its inquiry records · blocks: neither the prototype nor the launch; the team needs the answer when it reads the result after the launch
- Is the real reason for not booking a different one? The product lead would switch to another need in one case. Buyers do not book because Loopwise cannot show its training is different ([discovery/decisions/001-format-fit.md:43](../decisions/001-format-fit.md#L43)). · who can answer: the Loopwise staff who run scoping calls · blocks: neither the prototype nor the launch; the team needs the answer when it picks the next need to work on

## Solution ideas

| Idea | From | Driver | Critical assumption | Level |
|---|---|---|---|---|
| I1: Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page) | the team | reach rate ([discovery/kpi-tree.md:20](../kpi-tree.md#L20)) · start rate ([discovery/kpi-tree.md:21](../kpi-tree.md#L21)) · submit rate ([discovery/kpi-tree.md:22](../kpi-tree.md#L22)) | Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form. | partly supported: buyers ask for a way to find out where the team stands: "Is there a way to find out where the team stands before we decide?" ([sources/inbox/inbox-export.md:125](../../sources/inbox/inbox-export.md#L125)). Another buyer asks what Loopwise would need to work it out: "What would you need from me to work it out?" ([sources/inquiry-mails/inquiry-07.md:18](../../sources/inquiry-mails/inquiry-07.md#L18)). No source shows a buyer trusting a format a tool names. Counter: one buyer wants to see the options and react: "Tell me what's on the menu and I'll react to it." ([sources/interviews/sponsor-carla.md:125](../../sources/interviews/sponsor-carla.md#L125)) |
| I2: Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page) | the team | call rate ([discovery/kpi-tree.md:23](../kpi-tree.md#L23)) | Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one. | partly supported: two buyers in two source groups ask for a call first: "Can I talk to someone before I fill in anything?" ([sources/inbox/inbox-export.md:149](../../sources/inbox/inbox-export.md#L149)); "maybe a 20 minute call would be easier." ([sources/inquiry-mails/inquiry-03.md:16](../../sources/inquiry-mails/inquiry-03.md#L16)). No source shows a buyer booking a slot alone. Counter: the buyer with budget wants answers in writing before a call: "If you can answer these in writing, I am happy to follow up with a call." ([sources/inquiry-mails/inquiry-02.md:23](../../sources/inquiry-mails/inquiry-02.md#L23)). Gap: the site counts a booked scoping call, but no event counts a phone call. |
| I6: Cut the form to name and email. Everything else is asked in the scoping call (inquiry page) | today's page, changed | start rate ([discovery/kpi-tree.md:21](../kpi-tree.md#L21)) · submit rate ([discovery/kpi-tree.md:22](../kpi-tree.md#L22)) | Buyers stop at the form because of what it asks them to write. With only name and email to give, they send it without knowing the format. | partly supported: buyers hold back from writing a guess into the form: "I didn't want to send your form with a guess in it" ([sources/inquiry-mails/inquiry-07.md:18](../../sources/inquiry-mails/inquiry-07.md#L18)); "I do not want to pick one just to have something to write in the form." ([sources/inbox/inbox-export.md:137](../../sources/inbox/inbox-export.md#L137)). Counter: the form asks no format today, only "What do you need?" ([site/inquiry.html:28](../../site/inquiry.html#L28)). Gap: the data cannot show where inside the form people stop ([discovery/opportunities/data.md:75](../opportunities/data.md#L75)). |
| I8: The inquiry page promises a short written proposal of two fitting formats, sent before any call (inquiry page) | another domain: a travel agent | start rate ([discovery/kpi-tree.md:21](../kpi-tree.md#L21)) · call rate ([discovery/kpi-tree.md:23](../kpi-tree.md#L23)) | Buyers send an inquiry when Loopwise promises two fitting formats in writing first. Loopwise can name two formats from what the form says. | partly supported: buyers ask for something in writing: "do you have a price list or an overview of your formats you could send me?" ([sources/inquiry-mails/inquiry-03.md:12](../../sources/inquiry-mails/inquiry-03.md#L12)); "Could you send me some information so I can forward it internally?" ([sources/inquiry-mails/inquiry-01.md:18](../../sources/inquiry-mails/inquiry-01.md#L18)). No source shows that two named formats would get a buyer to send the form. Counter: the same buyer who asks for a list offers a call instead: "maybe a 20 minute call would be easier." ([sources/inquiry-mails/inquiry-03.md:16](../../sources/inquiry-mails/inquiry-03.md#L16)). The site says the format is settled in the scoping call ([site/formats.html:29](../../site/formats.html#L29)). |

## Boundaries
- No prices on the website, not in data either ([product/constraints.md:7](../../product/constraints.md#L7)). A written proposal (I8) names formats, never a price.
- The website can reach the inquiry, the scoping call booking and the buyer preparation ([product/constraints.md:57](../../product/constraints.md#L57)).
- The website cannot reach the training itself, or whether people use it afterwards ([product/constraints.md:59](../../product/constraints.md#L59)).
- An idea may change the form, replace it, or replace it with booking a call. Which fields a page sends is not settled here.

None of the four picks breaks a boundary.
I1 and I8 rest on a similar assumption: buyers accept a format someone names for them before the call. The team decides whether to keep both.

## Ideas not picked
- I3: Format page: add more info to the actual format tiles. Who this is for, when is it a good pick for you. Each tile gets a button "let's talk about this format" that opens the inquiry form pre-filled, "What do you need?" reading for example "I am thinking about a two day training" (formats page) · the team
- I4: Remove "Team size" from the form and put it all together in the quiz, which fills "What do you need?" (inquiry page) · the team
- I5: Lets skip the form all together and just put a "book a call" button, also add a mail link, so people can just write an email (inquiry page) · the team
- I7: Replace the free-text box with three situation choices: "new to AI", "tried it", "uses it daily". No format is asked (inquiry page) · another domain: a doctor's intake form
- I9: Two filter buttons above the tiles, team size and days away from work. Tiles that do not fit turn grey (formats page) · another domain: a car configurator
- I10: The inquiry page heading reads "Ask without choosing a format". A line below reads "You do not need to know your format to write to us." (inquiry page) · turned around: make the buyer feel they must choose, then flip it

## Selection (human)

- Part we work on: the whole opportunity
- Idea it comes from: I1: Build a small quiz to help the buyer pick the right format. The quiz fills "What do you need?" in the form (home page, formats page, inquiry page)
- Assumption we test first: Buyers who cannot tell which format fits will answer a few questions about their team. They then trust the format the quiz names enough to start the form.
- Why this one first: "A good quiz is hard to design right. If the general idea already does not work, we can rule this out quickly"
- Variant name (lowercase with dashes): format-quiz
- Who: Product lead (Loopwise) · When: 2026-11-14

## Selection (human), round 2

- Part we work on: the whole opportunity
- Idea it comes from: I2: Offer other ways of contact: Call us directly, Book a call slot, that opens a calendar link (inquiry page)
- Assumption we test first: Buyers who cannot tell which format fits would rather talk to a person than write. They book a call slot themselves when the page offers one.
- Why this one first: The furthest from the quiz: talking instead of writing. Drafted by Claude, kept by the product lead on 2026-11-16.
- Variant name (lowercase with dashes): call-slot
- Who: Product lead (Loopwise) · When: 2026-11-16

## Selection (human), round 3

- Part we work on: the whole opportunity
- Idea it comes from: I6: Cut the form to name and email. Everything else is asked in the scoping call (inquiry page)
- Assumption we test first: Buyers stop at the form because of what it asks them to write. With only name and email to give, they send it without knowing the format.
- Why this one first: The opposite of the quiz: ask nothing up front. Drafted by Claude, kept by the product lead on 2026-11-16.
- Variant name (lowercase with dashes): short-form
- Who: Product lead (Loopwise) · When: 2026-11-16

A second round adds a second "Selection (human)" below this one, with its own variant name.
