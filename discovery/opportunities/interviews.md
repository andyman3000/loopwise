# Opportunities from interviews

> Assessment by an agent (`opportunities-from-source` skill), not a decision. Date: 2026-11-06.
> Reads: `sources/interviews/`, `discovery/kpi-tree.md`, `product/personas/`

## Your first try

The user does not know her needs and we ask for needs. That is impossible to answer. The form cannot be done. It is a pain. The need is to help the user to understand her needs.

Where the draft differs:
- The draft keeps the need in her own words: she can describe the people, not name a format (`sources/interviews/sponsor-soft.md:114`). "Help her understand her needs" slides into a service.
- Her simpler need is to reach first contact without having to name a format up front. Many shapes can meet that, not only coaching.

Feedback:
- Strong: you saw the pain, not a need, and stayed close to her words. You read "impossible to answer" straight from the quote.
- Weak: "help her understand her needs" is a solution step, not a need. It builds a product (coaching to clarity) into the need itself.
- Why it matters: if the need is written as her words say, the comparison stays open to many shapes (a different first question, a callback, a short written exchange). If written as "help her understand", we are already halfway to one solution.

## Source

| File | Type | Speakers (role) | Basis line from the file |
|---|---|---|---|
| `sources/interviews/sponsor-soft.md` | one-on-one, excerpt | S, soft sponsor (large org, supports the AI move, no line responsibility) | "real conversations, anonymised composite; the follow-up conversation from line 75 on is synthetic" |
| `sources/interviews/sponsor-hard.md` | one-on-one, excerpt | S, hard sponsor (head of product, software company) | "real conversations, anonymised composite; the follow-up conversation from line 59 on is synthetic" |
| `sources/interviews/participants-group-1.md` | group interview, excerpt | P1 (BA with product duties), P2 (PO), P3 (PM), P4 (project lead) | "real conversations, anonymised composite; the follow-up questions from line 71 on are synthetic" |
| `sources/interviews/participants-group-2.md` | group interview, excerpt | P1 (PO), P2 (PM, business side), P3 (PO), P4 (member of a product team) | "real conversations, anonymised composite" |
| `sources/interviews/participants-group-3.md` | group interview, excerpt | P1 (analyst), P2 (PM), P3 (PM, business side), P4 (product specialist), P5 (PO) | "real conversations, anonymised composite; the follow-up questions from line 69 on are synthetic" |

## Opportunities

### O1: Need to reach first contact without having to name a format up front

- **Evidence:**
  - "I opened the inquiry form and got stuck on ... That's exactly the question I can't answer. I didn't want to write ... to people I've never spoken to. I closed it again." (`sources/interviews/sponsor-soft.md:110`, S, soft sponsor)
  - "Someone who asks me the questions. I can describe the people and what I hear from them. I can't translate that into a format." (`sources/interviews/sponsor-soft.md:114`, S, soft sponsor)
- **Voices:** 1 distinct speaker (soft sponsor). Second-hand: no.
- **Merged:** no. Both quotes come from the same voice at the same moment (the inquiry form page).
- **Close to:** O2 (same moment, different need: the hard sponsor also does not fill the form, but because he wants to see the provider is serious first).
- **KPI branch:** Branch A, driver *submit rate*. She starts the form and closes it before submitting (`sources/interviews/sponsor-soft.md:110`). [assumption: she counts as `inquiry_started` because she opened the form and read the first question, but this is not confirmed in the data for her specifically.]
- **Counter-evidence in this source:** the hard sponsor also will not fill the form (`sources/interviews/sponsor-hard.md:90`), which shows the drop at this step has more than one reason.
- **Gaps:** no second sponsor voice says this in the interviews. The pattern reappears in emails and inbox (`product/personas/sponsor-soft.md:58`, `:60`), but that is a different source group.
- **Assessment:** unsupported. One voice says it; the quote is sharp and lived, but the source holds only one.

### O2: Need to see the provider is serious before filling a general form

- **Evidence:**
  - "A general form that asks ..., I don't fill in before I know the other side is serious. I'd rather send three precise questions by mail and see how they answer." (`sources/interviews/sponsor-hard.md:90`, S, hard sponsor)
- **Voices:** 1 distinct speaker (hard sponsor). Second-hand: no.
- **Merged:** no.
- **Close to:** O1 (same moment, different need: the soft sponsor cannot answer the question; the hard sponsor will not answer until trust is there).
- **KPI branch:** Branch A, driver *start rate*. He does not start the form at all; he writes three precise questions by mail instead (`sources/interviews/sponsor-hard.md:90`).
- **Counter-evidence in this source:** none found in this source.
- **Gaps:** we do not know if other hard sponsors share the "three precise questions" route; only one voice here.
- **Assessment:** unsupported. One voice.

### O3: Need to see what the format changes four weeks later before writing to the provider

- **Evidence:**
  - "On each site I look for the same two things. Who have they done it with, and what changed afterwards?" (`sources/interviews/sponsor-hard.md:82`, S, hard sponsor)
  - "Your formats page lists five options with durations and audiences. Fine. But none of them tells me what is different four weeks later. I couldn't compare them on the thing I care about. Half day, two days, coaching: I can't tell which one gets me a result I can show. I left the page open in a tab and moved on to the next provider." (`sources/interviews/sponsor-hard.md:86`, S, hard sponsor)
  - "A comparable company I can call. And a sense that you'll help me define what we measure, because I can't do that alone." (`sources/interviews/sponsor-hard.md:94`, S, hard sponsor)
- **Voices:** 1 distinct speaker (hard sponsor). Second-hand: no.
- **Merged:** no. Three quotes, one voice, same moment (comparing providers before any contact), one need (seeing what a format changes afterwards).
- **Close to:** O6 (participants also want to carry something concrete back; different role, different moment, same underlying worry).
- **KPI branch:** Branch A, driver *inquiry page open rate*. He leaves the formats page open in a tab and moves on (`sources/interviews/sponsor-hard.md:86`), never reaching the inquiry page from this provider.
- **Counter-evidence in this source:** the soft sponsor says the opposite: "Those are very soft points, I know. It's not a hard return on investment." (`sources/interviews/sponsor-soft.md:63`). She would not look for hard after-state on the formats page.
- **Gaps:** nothing in the interviews shows what wording of "what changes afterwards" would have kept the hard sponsor on the page.
- **Assessment:** unsupported. One voice; the voice is specific and detailed, but the source holds only one.

### O4: Need to see from the formats page whether a format fits her group

- **Evidence:**
  - "Five formats. A half day, two days, a lab, coaching over several weeks, shadowing. Each one sounded reasonable. I sat there and thought, which of these is us? I couldn't tell. The page says the call shapes the real format. But I felt I should know roughly what I want before I call anyone. So I closed the tab and told myself I'd think about it." (`sources/interviews/sponsor-soft.md:106`, S, soft sponsor)
- **Voices:** 1 distinct speaker (soft sponsor). Second-hand: no.
- **Merged:** no.
- **Close to:** O3 (same moment, same page, different need: the hard sponsor wants outcome signals; the soft sponsor wants fit-to-group signals).
- **KPI branch:** Branch A, driver *inquiry page open rate*. She closes the tab without opening the inquiry page (`sources/interviews/sponsor-soft.md:106`).
- **Counter-evidence in this source:** none found in this source.
- **Gaps:** nothing in the interviews tests what a formats page sorted by "who it is for" would do.
- **Assessment:** unsupported. One voice.

### O5: Need to know before the day what the day looks like and whether to prepare

- **Evidence:**
  - "Yes, the evening before. I wanted to know what I was in for. The site showed several formats, and I couldn't tell which one we had booked. Nothing told me what to prepare either, so I didn't." (`sources/interviews/participants-group-1.md:92`, P4, project lead)
  - "What the day looks like, and whether it's written for developers again. After the last one, that was my main worry." (`sources/interviews/participants-group-1.md:98`, P4, project lead)
  - "Whether I should bring something of my own. Nobody said." (`sources/interviews/participants-group-1.md:100`, P3, product manager)
- **Voices:** 2 distinct participants (P3 and P4 in group 1). Second-hand: no.
- **Merged:** yes. P4 says the website did not help him pick a format or prepare. P3 says nobody told him whether to bring something. Both are participants, both before the day after the booking, both the same need (know what is coming and how to prepare).
- **Close to:** O4 (sponsors also cannot pick a format from the website; different role).
- **KPI branch:** Branch B (not this quarter). The need is met after the booking is already confirmed, so it sits on the follow-up branch first. No side link on Branch A; this need does not shape what a new sponsor reads or starts.
- **Counter-evidence in this source:** P1 in group 1 did not open the link and did not mind: "I didn't open it. I figured the trainer would tell us on the day." (`sources/interviews/participants-group-1.md:94`).
- **Gaps:** the follow-up questions in group 1 that ask about the invitation link are synthetic (file header, `sources/interviews/participants-group-1.md:73`).
- **Assessment:** partly supported. Two voices who lived it, with one counter-voice in the same source.

### O6: Need to carry something concrete back to the day after

- **Evidence:**
  - "On the day everything is great, and then the next morning you carry on exactly the way you did before." (`sources/interviews/participants-group-1.md:35`, P2, product owner)
  - "Practical examples I can carry straight over into my day. I didn't want to walk out with knowledge only, I wanted approaches I can actually try." (`sources/interviews/participants-group-1.md:47`, P3, product manager)
  - "Three weeks later a colleague asks me what I'm doing differently, and I have an answer. And at least one thing from the format is in my daily work." (`sources/interviews/participants-group-1.md:51`, P3, product manager)
  - "What I wanted to leave with was an idea of how to apply this, or part of it, to actual features on our roadmap. A direction for how to use it on a daily basis. And a plan for how we move forward in the next weeks, with next steps." (`sources/interviews/participants-group-2.md:43`, P4, product team member)
  - "I built myself a small interface for one of my own cases, and on the second day we developed it further. That's something I'll stick with. I'll use it, and it gives me good results." (`sources/interviews/participants-group-3.md:25`, P5, product owner)
- **Voices:** 4 distinct participants (P2 g1, P3 g1, P4 g2, P5 g3). Second-hand: no.
- **Merged:** yes. All four speak as participants, about the day itself and the weeks after, about the same need: walking out with something they will actually use.
- **Close to:** O3 (the hard sponsor wants the same proof, but before any booking, not during the day).
- **KPI branch:** Branch B (not this quarter). The need is met after the day. [assumption: if a scoping call could show how a past format landed into daily work four weeks later, booking rate on Branch A might rise, because this is exactly what the hard sponsor asks for in O3. The link is an assumption; no quote in this source states it.]
- **Counter-evidence in this source:** some participants already did carry it over: P2 in group 1 said this time it was practical and he is taking something away ("This time, no. It was practical.", `sources/interviews/participants-group-1.md:39`). P5 in group 3 built his own case and will stick with it (`sources/interviews/participants-group-3.md:25`).
- **Gaps:** the sources are participants in the room on the day. No one is interviewed four weeks after the day in this source group.
- **Assessment:** well supported. Four voices who lived it, from three different group interviews.

### O7: Need for someone who sits with them on their own topic

- **Evidence:**
  - "I tried to set up a project. But what's missing is someone walking alongside me on the topics that actually sit with me." (`sources/interviews/participants-group-3.md:19`, P1, analyst)
  - "Honestly, someone who sits with me on my own topic. Working on the real thing together would teach me more than another course." (`sources/interviews/participants-group-3.md:59`, P1, analyst)
- **Voices:** 1 distinct participant (P1 in group 3). Second-hand: no.
- **Merged:** no. Both quotes are the same voice saying the same thing twice in one interview.
- **Close to:** O8 (shared way of working across the team; different need: individual topic work versus team-level sharing).
- **KPI branch:** Branch B (not this quarter). The need is met in the weeks after a format or alongside daily work.
- **Counter-evidence in this source:** P2 in group 3 wants the opposite shape: a workflow that runs without him in the loop (`sources/interviews/participants-group-3.md:55`).
- **Gaps:** one voice only; no way to tell how common this need is.
- **Assessment:** unsupported. One voice.

### O8: Need for a shared way of working with AI across the team

- **Evidence:**
  - "What I hoped for was a shared picture of how we use AI collectively, not each person one to one with their assistant. An agreed way of working on product features. And some guidance on a shared setup where we learn from each other." (`sources/interviews/participants-group-2.md:55`, P4, product team member)
  - "For us it's the sharing that catches. Everyone works with their own assistant. Sure, you can create skills and share them, but that's where it still gets stuck. Everyone researches on their own, has things explained to them, and then pulling that back together is hard." (`sources/interviews/participants-group-3.md:43`, P4, product specialist)
  - "A way to share the skills we create that actually works between us." (`sources/interviews/participants-group-3.md:63`, P4, product specialist)
- **Voices:** 2 distinct participants (P4 in group 2 and P4 in group 3; different people, same group-interview label). Second-hand: no.
- **Merged:** yes. Both voices are participants, speaking of the day and the weeks after, about the same need: a shared team-level way of using AI, not everyone one on one with the assistant.
- **Close to:** O7 (individual topic work).
- **KPI branch:** Branch B (not this quarter). The need is met inside the team after the day.
- **Counter-evidence in this source:** none found in this source.
- **Gaps:** no voice says what the current team-level practice looks like after a format; only what is missing.
- **Assessment:** partly supported. Two voices.

### O9: Setup friction gets in the way of working during the day

- **Evidence:**
  - "For me it was hardware first. I had to request more memory for my laptop so this runs at all. Once that's there I can keep working on my skill." (`sources/interviews/participants-group-2.md:29`, P1, product owner)
  - "With data it's a topic too. Finding the right sources, the permissions and so on. That's sometimes a thing." (`sources/interviews/participants-group-2.md:31`, P2, product manager on the business side)
  - "I tried connecting the ticket tool. It didn't work in a way I liked. I let it fill things in and nothing useful came out." (`sources/interviews/participants-group-3.md:49`, P1, analyst)
- **Voices:** 3 distinct participants (P1 g2, P2 g2, P1 g3). Second-hand: no.
- **Merged:** yes. Three participants, same moment (during the day), same need (a working setup for the task at hand).
- **Close to:** no close opportunity in this source.
- **KPI branch:** Branch B (not this quarter). The need is met during the day.
- **Counter-evidence in this source:** two voices say the opposite in the same source group. P1 in group 1: "No. The connectors are all in, that part works for me." (`sources/interviews/participants-group-1.md:19`). P4 in group 3: "Not really. I have the wiki and our day-to-day tool connected." (`sources/interviews/participants-group-3.md:47`).
- **Gaps:** no voice says whether the setup problems delay a decision or only slow the day.
- **Assessment:** well supported. Three voices who lived it. The counter-evidence is strong: two other voices in the same source say access is fine. The level still fits the rule (three voices who lived it).

### O10: Lost at the start of the first morning, no clear schedule or goal

- **Evidence:**
  - "I walked in on the first morning thinking, what am I doing here. I had zero clue and I thought it would be far too much to get into." (`sources/interviews/participants-group-2.md:15`, P3, product owner)
  - "The first day I was a bit lost at the start. No schedule, no concrete goal for the day. That was the biggest gap." (`sources/interviews/participants-group-2.md:47`, P4, product team member)
  - "On the first day I got left behind a bit with the persona part." (`sources/interviews/participants-group-3.md:25`, P5, product owner)
- **Voices:** 3 distinct participants (P3 g2, P4 g2, P5 g3). Second-hand: no.
- **Merged:** yes. Three participants, same moment (first morning), same need (a clear starting picture).
- **Close to:** O5 (same participant preparation gap, before the day; this is the gap on the day itself).
- **KPI branch:** Branch B (not this quarter). The need is met on the first morning.
- **Counter-evidence in this source:** none found in this source.
- **Gaps:** no voice says what a clear starting picture looks like for them.
- **Assessment:** well supported.

## Looks like an opportunity, but

| Finding | Quote and location | Why it is not one (yet) |
|---|---|---|
| Fear of a training that flops in front of the board | "If this flops, I look bad in front of my team and in front of the board." (`sources/interviews/sponsor-hard.md:19`) | It is a worry behind O3, not a separate need. Written as its own opportunity it would name a feeling, not a need to act on. |
| "Not another training" | "Another training. Not another format where someone talks for four hours ... people go home with a full bag of new tricks and no reason to reach for any of them, so nothing changes." (`sources/interviews/sponsor-soft.md:37`) | A rejection, not a need. The need behind it sits in O1 and O6. |
| Compliance and the one approved tool | "Whatever gets built in the training has to keep living in that tool. I'd rather work with the stack we have than bring in yet another one." (`sources/interviews/sponsor-hard.md:51`) | A constraint on the day, not a driver of the funnel to the booking. |
| Standing up a business case before asking for more | "Internally I need a business case before I even ask." (`sources/interviews/sponsor-hard.md:13`) | An internal step at the hard sponsor's side, after a first booking. Lives on Branch B. |
| "Just type everything in" worry | "Something where I'm not worried that I stop thinking about the solution myself." (`sources/interviews/participants-group-1.md:65`) | One voice, named as a worry, not a need the format can meet directly. |

## Solution ideas heard

| Idea | Quote and location | Opportunity it might serve |
|---|---|---|
| Someone who asks the questions | "Someone who asks me the questions. I can describe the people and what I hear from them." (`sources/interviews/sponsor-soft.md:114`) | O1 |
| One page to show the team leads afterwards | "And afterwards I need something I can show the team leads, one page, in their language." (`sources/interviews/sponsor-soft.md:114`) | O1 |
| Three precise questions by mail | "I'd rather send three precise questions by mail and see how they answer." (`sources/interviews/sponsor-hard.md:90`) | O2 |
| A comparable company to call | "A comparable company I can call." (`sources/interviews/sponsor-hard.md:94`) | O3 |
| A pilot: does the approach enable people to carry on by themselves | "What I could imagine is a pilot: does the approach enable people to carry on by themselves? If it works, we call it a method and multiply it." (`sources/interviews/sponsor-soft.md:67`) | O6 |
| Someone who sits alongside on their own topic | "Honestly, someone who sits with me on my own topic." (`sources/interviews/participants-group-3.md:59`) | O7 |
| A small shared project for remote formats | "Maybe a small shared project when it's remote, so everyone can work on it and nobody loses the thread." (`sources/interviews/participants-group-2.md:61`) | O10 |
| A shared setup where the team learns from each other | "some guidance on a shared setup where we learn from each other" (`sources/interviews/participants-group-2.md:55`) | O8 |
| A skill that first loads product and people context | "I'd need one that first loads the background of my product and the people involved, and only then starts on the task." (`sources/interviews/participants-group-3.md:33`) | O8 |
| Material to reread afterwards | "I still need the material afterwards to reread. When you actually sit down to do it, you need it again as a memory aid." (`sources/interviews/participants-group-2.md:57`) | O6 |

## Goes into comparison

Goes into comparison: O1, O2, O3, O4 (best of a weak pool, one voice each; only interviews was processed)
Decided by: Jan · Date: 2026-08-18
