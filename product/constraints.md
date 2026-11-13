# Constraints

Hard limits for every artefact and every change in this repo.

## Data and prices

- **No prices**, not on the website and not in data. Buyers do ask for them ("do you have a price
  list", `sources/inquiry-mails/inquiry-03.md:12`); the answer goes through the scoping call.
- **All data is synthetic or an anonymised composite**, and each file says which in its header
  (for example `sources/interviews/sponsor-sabine.md:3`, `sources/inquiry-mails/inquiry-01.md:3`,
  `sources/inbox/inbox-export.md:3`).
- **Feedback ratings are invented** (`sources/feedback/feedback-export.md:3`, `:23`). Free-text
  answers may be quoted; the rating table is never used as evidence.

## Team and tech

- Small team. [assumption: no dedicated developer; changes are made with Claude Code]
- The website is static HTML, CSS and ES modules served by `server.js` on `node:http`; tests run
  with `node --test`. No dependencies, no `npm install`, Node 20 or newer (`README.md`, `package.json`).

## Tool access on the customer side

Buyers often cannot change tool access before a format, and we plan around that:

- IT has not approved the tool, data protection reviews take months (`sources/inquiry-mails/inquiry-05.md:14`).
- Approval pending with IT, no answer expected before the workshop (`sources/inbox/inbox-export.md:53`).
- No admin rights on managed laptops, in the room (`sources/inbox/inbox-export.md:77`).
- One of the trainer's tools cleared, the others not; what people may put into it still open with
  IT (`sources/interviews/sponsor-sabine.md:81`, `sources/interviews/sponsor-sabine.md:97`).
- Access to the coding agent taken away again from non-developers until security is sorted
  (`sources/interviews/sponsor-carla.md:133`).

Counter-evidence: in other companies access is not the gap (`sources/interviews/sponsor-thomas.md:113`,
`sources/interviews/participant-jannik.md:65`, `sources/inbox/inbox-export.md:65`). Access is a
constraint to plan for, not the problem we exist for.

## Measurement

- **We cannot measure bookings causally.** [assumption: roughly 30 to 40 inquiries per measurement
  period, too few to attribute bookings to a website change; to be checked against `data/` once
  generated]
- We measure what a change triggers directly (a field filled, a step completed, a form submitted)
  and report bookings without attributing them.
- Follow-up bookings take months to show; within one measurement window they are not visible.

## Anonymisation of material

- No real names, companies, products, places or prices in any file. People are roles ("S",
  "P1", "head of product"); tools are generic ("the assistant", "the ticket tool").
- Composite conversations carry only statements that were made in real conversations, paraphrased
  in English, never translated word for word. The link back to the original conversations is kept
  outside this repo.
- Synthetic files say so in their header.

## What the website can reach

- **Can reach:** the inquiry, the scoping call booking, and the buyer preparation around a format:
  participant list, setup check, expectations survey, follow-up after four weeks (`site/buyer-prep.html`).
- **Cannot reach:** the training itself, what happens in the room, and whether participants use it
  in their work afterwards. The website can ask about that in the follow-up; it cannot cause it.
