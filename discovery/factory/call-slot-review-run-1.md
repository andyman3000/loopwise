# Review, run 1: call-slot

> Written by a review subagent that read only the diff. It blocks nothing and decides nothing.

## What changed

- The diff touches one file, the inquiry page of the call-slot variant.
- The booking now sends real data to the server.
- It sends day, time, name, email and the variant name.
- The page waits for the server before it shows the confirmation.
- A second press while waiting sends no second booking.
- The close button has no effect while a booking is waiting.
- A slow answer is cut off after a fixed timeout and counts as failed.
- A failed booking shows a new error line. It says the booking failed.
- A taken time shows the server's own message instead.
- The page no longer logs a booking event. The server logs it.
- Every page event now carries the variant name as an extra argument.
- The phone number is now a real dial link. Before, a click did nothing.
- The first time option now sends a leading zero. The label stays the same.
- Calendar days, month arrows and the close button now use the secondary button.
- Weekday headings in the calendar are hidden from screen readers.
- Picking a day keeps keyboard focus on the picked day.
- Opening the booking moves focus to the close button.
- Most local styles are gone. The page now leans on the design system.
- The confirmation now uses the design system parts for its heading, check and time line.
- The confirmation no longer says where the video link goes.

## Risks

- The timeout can fire after the server has already stored the booking.
- Then the visitor reads that the booking failed, but a slot is booked.
- A retry may then hit the visitor's own slot as "taken".
- The page sends no unique key per booking.
- So the server cannot tell a retry from a new booking.
- Day and time go out without a time zone.
- A visitor abroad may book a different hour than intended.
- Bookable days come from the visitor's clock, not the server's.
- The server must check which days are bookable itself.
- The events component is not in this diff.
- If it ignores the new argument, the variant name is lost without warning.
- The server route for bookings is not in this diff either.
- This diff cannot show that the route exists or stores anything.
- Name and email now leave the browser.
- The diff shows no privacy note near the booking form.
- The confirmation no longer tells visitors how the call link reaches them.
- Visitors may wait for an invite that never comes.

## Anything that looks off

- The style comment promises layout only, with no own look on components.
- The new "Choose a time" button breaks that promise.
- It has its own orange colour, white text, radius and padding.
- These are raw values, not tokens from the design system.
- The design gate should fire on the raw colours and the raw spacing.
- The design system allows two button looks, primary and secondary. This is a third.
- "Book this call" keeps the primary look, so two primary styles now compete.
- White on that orange looks below the usual contrast guideline for normal text.
- The raw colours will not follow a dark theme.
- The new button has no focus style of its own.
- Calendar day cells lost their square shape.
- Both error lines are alerts. A repeated identical message may not be announced again.
