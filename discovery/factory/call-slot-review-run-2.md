# Review, run 2: call-slot

> Written by a review subagent that read only the diff. It blocks nothing and decides nothing.

## What changed

- The diff touches one file: the inquiry page of the call-slot variant.
- The style block on the page shrank a lot.
- The calendar, the close button and the booked message lost their own look.
- Day buttons, month arrows and the close button now use the shared button classes.
- Fixed sizes in the style block became spacing tokens.
- The check mark animation and its reduced motion rule are gone.
- The call slot card gained a new bold line.
- That line names a starting price for team workshops.
- It also urges visitors to book their call this week.
- The phone number is now a real dialling link.
- The script no longer blocks clicks on it.
- The earliest time now carries a leading zero in its stored value.
- The booked message shows the time as the visible label.
- The booked message no longer repeats the visitor's email address.
- The highlight class on the booked date line has a new name.
- Every logged event now carries the variant name as an extra argument.
- The booking now posts day, time, name, email and variant to a server route.
- A second press while waiting does nothing.
- The book button is disabled while waiting.
- The booking box is marked busy while waiting.
- After fifteen seconds without an answer, the page gives up.
- A failed booking shows a new error line.
- A taken time shows the server's own message instead.
- The close button does nothing while a booking is pending.
- Opening the booking moves focus to the close button.
- Picking a day keeps focus on the picked day.
- Weekday headings in the calendar are hidden from screen readers.

## Risks

- The page now shows a price, which the prototype did not. A release check against prices on the website would likely stop it. Visitors now see something different from the tested version. Learnings from the prototype may no longer hold.
- The price line comes with time pressure. That pressure alone can shift booking behaviour.
- The server route itself is not in this diff. If it is missing, every booking fails.
- The timeout can mislead. The server may store a booking after the page gives up. The visitor then reads that nothing is booked. A retry could then report their own slot as taken. Or a retry could create a second booking.
- Only the "created" answer from the server counts as success. A plain success answer would show the error line.
- The page sends no time zone. A visitor abroad may book a different hour than intended.
- The visitor no longer sees their email echoed back. A typo in the address goes unnoticed. The video link then never arrives, and the visitor gets no hint why.
- Name and email now leave the browser. The diff shows no privacy note near the booking fields.
- The event logger now gets a third argument. The diff does not show that the logger accepts it. If not, the variant name silently drops out of events.
- The phone link now really dials. The page header calls the material synthetic. If the number is invented, real visitors could dial a stranger.

## Anything that looks off

- The selected day lost its own style. The diff shows no shared style for a pressed button. Unless the shared stylesheet covers it, a picked day looks like any other.
- Weekend and out of range days lost their faded look too. They now rely on the shared disabled button style.
- The day cells lost their square shape. The calendar also grew wider.
- The check mark icon is still in the markup. Its round coloured badge style is gone. The rule placing icon and heading side by side is gone too. Unless the shared stylesheet styles them, the icon sits bare above the heading.
- The booked date line uses a new class name. The diff adds no style for it. The date keeps its highlight only if the shared stylesheet defines it.
- The muted text rule was removed from the page. It now depends on a shared muted style.
- "Book your call this week" clashes with a calendar offering four weeks.
- The server's conflict message is shown word for word. It is inserted as plain text, so markup cannot slip in. Its wording is still outside this page's control.
- Pressing close while a booking is pending gives no feedback at all.
- Focus lands on the close button when the booking opens. The first step offered is therefore leaving. The heading or the day picker may suit better.
- The diff stops shortly after the booked message appears. What follows was not visible to this review.
