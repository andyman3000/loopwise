# Launch spec: call-slot

> Launch spec drafted by an agent (`loopwise-variant-spec`, mode `launch`) on 2026-11-19, before the variant ships. Not a decision: open points stay open for a human.
> **Kit:** prototype [site/variants/call-slot/inquiry.html](../../site/variants/call-slot/inquiry.html) · intent [discovery/intents/format-fit.md](../intents/format-fit.md) · this launch spec
> **Rests on:** launch card [discovery/test-cards/call-slot.md](../test-cards/call-slot.md) · learning card [discovery/decisions/003-call-slot.md](../decisions/003-call-slot.md) · learn spec [discovery/specs/call-slot.md](call-slot.md)
> **Label:** interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

A success line is the result, set before launch, at which the variant counts as working ([discovery/test-cards/call-slot.md:18](../test-cards/call-slot.md#L18)).
A proxy metric is a number we see soon that we expect to move with the goal ([discovery/test-cards/call-slot.md:19](../test-cards/call-slot.md#L19)).
A counter metric must not get worse while the main number improves ([discovery/test-cards/call-slot.md:20](../test-cards/call-slot.md#L20)).
A kill criterion is the line at which we take the variant back ([discovery/test-cards/call-slot.md:21](../test-cards/call-slot.md#L21)).

## Your first try
Skipped (reference state). No feedback, since there is no answer to judge.

## Kit
- Prototype: [site/variants/call-slot/inquiry.html](../../site/variants/call-slot/inquiry.html), the only page the variant changes. Visitors start on the inquiry page.
- Intent: [discovery/intents/format-fit.md](../intents/format-fit.md), idea I2 ([discovery/intents/format-fit.md:91](../intents/format-fit.md#L91)).
- The prototype is the reference for everything visible. This file holds only what it does not show.

## Non-functional requirements
- **No faked parts left:** in the prototype the number dials nothing and the booking sends, stores and logs nothing ([site/variants/call-slot/inquiry.html:154](../../site/variants/call-slot/inquiry.html#L154)). The release makes each part real ([discovery/test-cards/call-slot.md:59](../test-cards/call-slot.md#L59)).
- **Static and light:** the page stays static HTML, CSS and ES modules, with no dependency ([product/constraints.md:18](../../product/constraints.md#L18)). [assumption: no script from another site either, so a booking tool must not need one]
- **Accessibility basics:** every control works by keyboard. Screen readers hear the booked message. [assumption: no file names an accessibility standard]
- **Privacy of form data:** name and email of a booking never go into event props. The server writes props to the event log as sent ([server.js:170](../../server.js#L170)).

## Decisions taken
- **No launch before the test with people:** the launch card applies only after that test has passed ([discovery/test-cards/call-slot.md:3](../test-cards/call-slot.md#L3)). The product lead named "the next step is a real user test" ([discovery/decisions/003-call-slot.md:131](../decisions/003-call-slot.md#L131)).
- **A booked slot stays out of the call rate:** it is reported on its own, because it has no sent inquiry ([discovery/test-cards/call-slot.md:119](../test-cards/call-slot.md#L119)).
- **Every inquiry page visitor sees the variant** for the time frame the product lead set ([discovery/test-cards/call-slot.md:49](../test-cards/call-slot.md#L49), [discovery/test-cards/call-slot.md:143](../test-cards/call-slot.md#L143)).

## Events
| Event | When it fires | Props | Feeds (launch card line) |
|---|---|---|---|
| `page_view` | the inquiry page loads, as in the prototype ([site/variants/call-slot/inquiry.html:150](../../site/variants/call-slot/inquiry.html#L150)) | `page` | proxy metric ([discovery/test-cards/call-slot.md:127](../test-cards/call-slot.md#L127)), counter metric ([discovery/test-cards/call-slot.md:135](../test-cards/call-slot.md#L135)), kill criterion ([discovery/test-cards/call-slot.md:140](../test-cards/call-slot.md#L140)) |
| `inquiry_started` | first click into the form, as today ([site/components/inquiry-form.js:44](../../site/components/inquiry-form.js#L44)); never from the booking | none | start rate ([discovery/test-cards/call-slot.md:132](../test-cards/call-slot.md#L132)) |
| `inquiry_submitted` | the server accepted the form, as today ([site/components/inquiry-form.js:62](../../site/components/inquiry-form.js#L62)) | none | success line ([discovery/test-cards/call-slot.md:120](../test-cards/call-slot.md#L120)), counter metric ([discovery/test-cards/call-slot.md:135](../test-cards/call-slot.md#L135)) |
| `scoping_call_booked` | the server has stored a booked slot; never on the click alone | none; never name or email | usage hypothesis ([discovery/test-cards/call-slot.md:124](../test-cards/call-slot.md#L124)), proxy metric ([discovery/test-cards/call-slot.md:127](../test-cards/call-slot.md#L127)), counter metric ([discovery/test-cards/call-slot.md:135](../test-cards/call-slot.md#L135)) |
| `booking_confirmed` | not on this page: when a buyer books a format after the call | none | second counter metric ([discovery/test-cards/call-slot.md:137](../test-cards/call-slot.md#L137)) |

## Invisible behaviour
- **States:** the booking is pending until the server stores it. A second press while pending books nothing more. [assumption]
- **Errors:** a failed store books nothing and logs no event. [assumption]
- **Edge cases:** a booked time can no longer be booked. If two buyers book one time at once, only the first is stored. The prototype never takes a time ([discovery/specs/call-slot.md:48](../specs/call-slot.md#L48)).
- **Data:** a stored booking carries the variant, so the launch card can count it ([discovery/test-cards/call-slot.md:124](../test-cards/call-slot.md#L124)).
- **Data:** the live event log stores no session ([site/components/events.js:24](../../site/components/events.js#L24)). The launch card counts sessions ([discovery/test-cards/call-slot.md:120](../test-cards/call-slot.md#L120)).
- **Data:** a phone call leaves no event. The counter metric counts a buyer who phones as no contact ([discovery/test-cards/call-slot.md:135](../test-cards/call-slot.md#L135)).
- **Legal:** no price on the site ([product/constraints.md:7](../../product/constraints.md#L7)). The hardened page passes both gates in [gates/gates.json](../../gates/gates.json). The legal gate takes no waiver ([gates/policies/no-prices.md:28](../../gates/policies/no-prices.md#L28)).

## Open points
- Where bookings are stored: a new server route or a booking tool ([discovery/specs/call-slot.md:105](../specs/call-slot.md#L105)) · who confirms: product lead with the developer · Answer: ____ (human decides before launch)
- How events get a session, and who logs `scoping_call_booked` for a call after a sent inquiry · who confirms: the developer · Answer: ____ (human decides before launch)
- Who answers the phone number, and at which hours ([discovery/specs/call-slot.md:107](../specs/call-slot.md#L107), [discovery/specs/call-slot.md:111](../specs/call-slot.md#L111)) · who confirms: product lead · Answer: ____ (human decides before launch)
- Who sends the mail or calendar invite after a booking, and from which tool ([discovery/specs/call-slot.md:108](../specs/call-slot.md#L108)) · who confirms: product lead · Answer: ____ (human decides before launch)
- How many buyers one time takes ([discovery/specs/call-slot.md:109](../specs/call-slot.md#L109)) · who confirms: someone who runs scoping calls · Answer: ____ (human decides before launch)
- Who confirms each invented line before launch ([discovery/test-cards/call-slot.md:81](../test-cards/call-slot.md#L81)) · who confirms: someone who runs scoping calls · Answer: ____ (human decides before launch)
- A privacy notice for the booking, and how long bookings are kept · who confirms: legal · Answer: ____ (human decides before launch)
- A booking question on what the buyer wants to talk about ([discovery/specs/call-slot.md:110](../specs/call-slot.md#L110)) · who confirms: product lead · Answer: ____ (human decides before launch)

**Prototype check:** 2026-11-19, a fresh subagent read only the prototype and the draft. Lines listed: 13 · cut: 3 · shortened: 10.
