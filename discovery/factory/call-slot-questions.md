# Factory questions: call-slot

> Written by the loopwise-factory skill. Each question is one the handover kit left open. The factory did not guess.
> Kit: [site/variants/call-slot/inquiry.html](../../site/variants/call-slot/inquiry.html), [discovery/intents/format-fit.md](../intents/format-fit.md), [discovery/specs/call-slot-launch.md](../specs/call-slot-launch.md)
> Label: interviews, inquiry mails, inbox and data are synthetic; the feedback free text is an anonymised composite. This file repeats that label.

## Run 1, 2026-11-20

The launch spec answers where bookings are stored: the server route for bookings ([discovery/specs/call-slot-launch.md:51](../specs/call-slot-launch.md#L51)). The factory follows that answer. The page sends each booking there. The server logs the booked call, so the page does not.

### How do events get a session, and who logs a call booked after a sent inquiry?
- Where the kit is silent: the launch spec leaves both open ([discovery/specs/call-slot-launch.md:52](../specs/call-slot-launch.md#L52)).
- Meanwhile the factory: events carry no session, as on the site today. Only a slot booked on this page logs a booked call.
- Who should answer: developer
- Answer: ____

### Who answers the phone number, and at which hours?
- Where the kit is silent: the launch spec leaves this open ([discovery/specs/call-slot-launch.md:53](../specs/call-slot-launch.md#L53)).
- Meanwhile the factory: the number from the prototype is a real phone link. A visitor can dial it. No hours are shown.
- Who should answer: product lead
- Answer: ____

### Who sends the video link after a booking, and from which tool?
- Where the kit is silent: the launch spec leaves this open ([discovery/specs/call-slot-launch.md:54](../specs/call-slot-launch.md#L54)).
- Meanwhile the factory: the booked message no longer says the video link is on its way. The server route stores the booking and sends no mail.
- Who should answer: product lead
- Answer: ____

### How many buyers can book one time?
- Where the kit is silent: the launch spec leaves this open ([discovery/specs/call-slot-launch.md:55](../specs/call-slot-launch.md#L55)).
- Meanwhile the factory: the server route takes one booking per day and time. It refuses a second one.
- Who should answer: someone who runs scoping calls
- Answer: ____

### Can the page show which times are booked already?
- Where the kit is silent: the launch spec says a booked time can no longer be booked ([discovery/specs/call-slot-launch.md:44](../specs/call-slot-launch.md#L44)). It does not say whether the buyer sees that before pressing the button.
- Meanwhile the factory: the page offers every time on every working day. When the server refuses a booked time, the page shows the server's own line.
- Who should answer: developer
- Answer: ____

### In which time zone are the four times?
- Where the kit is silent: the prototype shows four times without a time zone ([site/variants/call-slot/inquiry.html](../../site/variants/call-slot/inquiry.html)). The launch spec does not name one ([discovery/specs/call-slot-launch.md:19](../specs/call-slot-launch.md#L19)).
- Meanwhile the factory: the times stay as in the prototype, without a time zone. The booking sends the day and the time as shown.
- Who should answer: product lead
- Answer: ____

### What does the page say when a booking fails?
- Where the kit is silent: the launch spec says a failed store books nothing ([discovery/specs/call-slot-launch.md:43](../specs/call-slot-launch.md#L43)). Neither file gives the words a buyer reads.
- Meanwhile the factory: the page starts with the form's own error, "Something went wrong. Please try again." It adds that nothing is booked and points to the form below. For a time booked by someone else, the page shows the server's line.
- Who should answer: someone who runs scoping calls
- Answer: ____

### How does the page learn that a booking was stored when the server's answer gets lost?
- Where the kit is silent: the launch spec covers a failed store ([discovery/specs/call-slot-launch.md:43](../specs/call-slot-launch.md#L43)). It does not cover a store whose answer never arrives.
- Meanwhile the factory: after a set wait without an answer, the page shows the failed message. If the buyer tries the same time again, the server says it is booked.
- Who should answer: developer
- Answer: ____

### Who confirms each invented line before launch?
- Where the kit is silent: the launch spec leaves this open ([discovery/specs/call-slot-launch.md:56](../specs/call-slot-launch.md#L56)).
- Meanwhile the factory: every line a buyer reads comes from the prototype, except the failed messages above.
- Who should answer: someone who runs scoping calls
- Answer: ____

### What privacy notice goes with the booking, and how long are bookings kept?
- Where the kit is silent: the launch spec leaves this open ([discovery/specs/call-slot-launch.md:57](../specs/call-slot-launch.md#L57)).
- Meanwhile the factory: the page shows no privacy notice. A new line needs words from legal.
- Who should answer: legal
- Answer: ____

### Does the booking ask what the buyer wants to talk about?
- Where the kit is silent: the launch spec leaves this open ([discovery/specs/call-slot-launch.md:58](../specs/call-slot-launch.md#L58)).
- Meanwhile the factory: the booking asks only for a day, a time, a name and an email, as in the prototype.
- Who should answer: product lead
- Answer: ____
