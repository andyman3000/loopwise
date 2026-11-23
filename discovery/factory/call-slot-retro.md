# Factory retro: call-slot

> Retro after two factory runs, 2026-11-20. Prefilled by the loopwise-factory skill. The answers are the pair's own words.
> Reference answers (replace with your own): a reference pair answered the four questions below.
> Label: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

The factory rebuilt the prototype for production in site/hardened/call-slot/.
Three gates held the build: the validation gate at the entry (hard, owner: product lead), the design gate (soft, owner: designer) and the legal gate (hard, owner: legal).
In each run the factory planted one error on purpose.

## 1. What did the gate catch?
Per run: the gate that failed, the file and the rule, and how the pair fixed it.
- Run 1: Reference answer. The design gate failed on site/hardened/call-slot/inquiry.html. The "Choose a time" button had its own orange look. The gate printed hard-coded-colour, hard-coded-spacing and component-outside-system. We asked the factory to fix the finding. The button is a .button again.
- Run 2: Reference answer. The legal gate failed on site/hardened/call-slot/inquiry.html with currency-amount. A price line sat in the call slot card. We tried a waiver from legal first. The check ignored it, because the legal gate is hard. We deleted the waiver and took the price out.

## 2. What would the gate have missed?
What a person saw in the build or the review that no gate checks.
- Review of run 1: [discovery/factory/call-slot-review-run-1.md](call-slot-review-run-1.md)
- Review of run 2: [discovery/factory/call-slot-review-run-2.md](call-slot-review-run-2.md)
- Answer: Reference answer. The design gate did not flag the button's own round corners. Radius is checked by eye only. The review saw that white text on the orange button may be hard to read. No gate checks contrast. The review saw that "this week" in the price line clashes with a calendar of four weeks. Both reviews saw a risk no gate checks. A booking can be stored while the page says it failed. If the buyer tries again, the page says the time is already booked.

## 3. Who decided?
Per decision: the role, the person and the file. The factory decided nothing at a gate.
- Validation gate, at the entry: passed on the launch decision [discovery/decisions/005-launch-call-slot.md](../decisions/005-launch-call-slot.md), decided by the product lead.
- Design gate, run 1: fixed by the pair. No waiver.
- Legal gate, run 2: fixed by the pair. A hard gate takes no waiver.
- Release: [discovery/decisions/006-release-call-slot.md](../decisions/006-release-call-slot.md), decided by Noa Vale, product lead.
- Decision files: [discovery/decisions/006-release-call-slot.md](../decisions/006-release-call-slot.md)

## 4. What did the factory have to ask that the kit did not answer?
One line per question in [discovery/factory/call-slot-questions.md](call-slot-questions.md).
For each: which file of the kit should have answered it?
- How do events get a session, and who logs a call booked after a sent inquiry? ([discovery/factory/call-slot-questions.md:11](call-slot-questions.md#L11)): Reference answer. The launch spec, with the developer.
- Who answers the phone number, and at which hours? ([discovery/factory/call-slot-questions.md:17](call-slot-questions.md#L17)): Reference answer. The launch spec.
- Who sends the video link after a booking, and from which tool? ([discovery/factory/call-slot-questions.md:23](call-slot-questions.md#L23)): Reference answer. The launch spec. Without an answer, a booked buyer waits for a link no one sends.
- How many buyers can book one time? ([discovery/factory/call-slot-questions.md:29](call-slot-questions.md#L29)): Reference answer. The launch spec. The server route already takes one, so the spec should say so.
- Can the page show which times are booked already? ([discovery/factory/call-slot-questions.md:35](call-slot-questions.md#L35)): Reference answer. The launch spec, with the developer.
- In which time zone are the four times? ([discovery/factory/call-slot-questions.md:41](call-slot-questions.md#L41)): Reference answer. The prototype should show it. No file in the kit asked.
- What does the page say when a booking fails? ([discovery/factory/call-slot-questions.md:47](call-slot-questions.md#L47)): Reference answer. The launch spec should give the words, not only the behaviour.
- How does the page learn that a booking was stored when the server's answer gets lost? ([discovery/factory/call-slot-questions.md:53](call-slot-questions.md#L53)): Reference answer. The launch spec, under invisible behaviour.
- Who confirms each invented line before launch? ([discovery/factory/call-slot-questions.md:59](call-slot-questions.md#L59)): Reference answer. The launch spec.
- What privacy notice goes with the booking, and how long are bookings kept? ([discovery/factory/call-slot-questions.md:65](call-slot-questions.md#L65)): Reference answer. The launch spec, with words from legal.
- Does the booking ask what the buyer wants to talk about? ([discovery/factory/call-slot-questions.md:71](call-slot-questions.md#L71)): Reference answer. The prototype. A second test round could settle it.

## What we change in the kit next time
- Reference answer. The launch spec answers who sends the video link and when the phone is answered, before the factory runs. The prototype shows the time zone.
