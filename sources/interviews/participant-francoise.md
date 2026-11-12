# Participant interview: Françoise, product owner, electronics retailer

- **Basis:** synthetic, built from patterns in real conversations
- **Format:** one-on-one interview, full conversation
- **Date:** Autumn
- **Interviewee:** Françoise Wolter (she/her), product owner at an electronics retailer with about 200 stores; participant in a booked two-day workshop, interviewed a few days after it
- **Interviewer:** Loopwise

---

**Interviewer:** Hi Françoise. Thanks for doing this so soon after the two days.

**Françoise:** Hi. No, it's fine. I'm still digging through what piled up while I was out, so half an hour of not looking at it is welcome.

**Interviewer:** That bad?

**Françoise:** Two days away in the middle of a release, the stores noticed. One store manager wrote to me three times. The last mail was just a question mark.

**Interviewer:** That's efficient, at least. Before we get to the workshop, tell me what you do.

**Françoise:** I'm the product owner for the store side of click and collect. The customer orders online and picks up in the store, and my app is what the staff use in between: taking the parcels in, finding them on the shelf, handing them over at the counter. The customer never sees it, it runs on the counter tablets. I've had it for a year and a half.

**Interviewer:** And the team around it?

**Françoise:** Five developers, a designer we share with another team, and me. Plus two hundred stores who all have opinions.

**Interviewer:** How did you end up in the workshop?

**Françoise:** Our head of digital put it together for the product people, and a couple of colleagues from the technical side were invited too. I got a calendar invite with two full days blocked. I didn't ask for it, but I said yes quickly. Curious, mostly.

**Interviewer:** What were you hoping to get out of it?

**Françoise:** Something practical, honestly. Take last week. Monday to Wednesday went on the store mails: read them, turn them into tickets, chase the answers. Thursday I finally sat down to decide what goes into the next release, and by then I was worn out. If an agent took Monday to Wednesday off me, fine. Thursday stays mine.

**Interviewer:** And where were you with AI before?

**Françoise:** At work, close to nothing. I had the chat tool everyone got, a different vendor's, and I'd hardly opened it. Of your tools, IT only lets us run the coding agent, and that lives in a code editor, which I'd never had a reason to open. So I turned up with it installed and logged in, and that was it.

**Interviewer:** What about the others in the room?

**Françoise:** That was the first surprise. The trainers opened with a round where everyone said where they stood, and the range was enormous. Our architect has a whole routine at home. He described it like a recipe. He writes down what he wants, one agent builds it, a second agent checks the first one's work, and tests run the whole time. And even he had a complaint. The agent fixes one thing for him and quietly breaks something else he'd finished the week before. So that's why he's so keen on the tests.

**Interviewer:** And the other end of the range?

**Françoise:** The other end was me, more or less. When it was my turn I said, if you line us up by how technical we are, put me nearest the door. And our other colleague from IT, who runs a project on the old systems, said he'd seen a short demo the evening before and still couldn't get over it, because he'd never really worked with any of this.

**Interviewer:** So a wide spread.

**Françoise:** Very. Same company, people who've worked together for years, and nowhere near the same starting point.

**Interviewer:** Did that matter during the two days?

**Françoise:** Day one, hardly. Day two, a lot.

**Interviewer:** Day one first, then.

**Françoise:** Day one was good. We split into small groups and took real cases from our own business. Mine was goods-in for the pickup orders. The van from the warehouse arrives, somebody stands there with the paper delivery note, keys in every line on the counter tablet, checks it against the customer orders, books each parcel in so the customer gets told to come. In the big stores that's someone's whole morning. Not one decision in it. Just typing in what's already printed.

**Interviewer:** That's right at the front of your app.

**Françoise:** Right at the front. So for once I was the one at the table who knew where it hurts. We had to name what we were betting on. Is the risk that staff won't use it if it's fiddly? Or is it that every supplier's delivery note looks different, so the reading part never works?

**Interviewer:** Where did you land?

**Françoise:** We went back and forth. In the end we put the people side first. Someone in the group told us about an app he'd seen built for a warehouse once, lovely in the demo, and then the staff refused it, partly because there was no proper network where they actually work. That settled it for us. Our back rooms are exactly like that.

**Interviewer:** And then you built something?

**Françoise:** A small click-through prototype. The agent did most of the heavy lifting. We had screens before lunch.

**Interviewer:** Anything from that part that stayed with you?

**Françoise:** One thing a trainer kept pushing. We wanted to polish our one version, and he said no, make three that are deliberately unlike each other.

**Interviewer:** Did he say why?

**Françoise:** His argument, as far as I got it: show people one version and they tell you it's nice. Show them three that are really different, and suddenly someone says, I want this corner from that one and the button from the other one. Then you know something. I liked that.

**Interviewer:** Were all the groups at the same pace?

**Françoise:** No. Some were done long before the rest. The trainer gave them a second variant to build so they weren't just sitting there. I was not in one of those groups.

**Interviewer:** How did day one end?

**Françoise:** Everyone wrote on cards what they wanted from day two, and we stuck them on the wall.

**Interviewer:** What was on yours?

**Françoise:** Numbers. The online shop people can look at sales. My users have no choice, they have to use the app whatever I do to it. So when I change a screen, what tells me it got better? I wrote something like that, shorter.

**Interviewer:** And the other cards?

**Françoise:** A mix. Someone wanted to know which kind of work this is for at all, and where you'd leave it out. Someone asked who is responsible for what now. I'd been wondering the same thing, because if a prototype takes an hour, is that still my designer's job, or mine, or a developer's? And one card asked, more or less, how we actually use this once we're back at our desks. That one I'd have signed.

**Interviewer:** Okay. Day two.

**Françoise:** Day two went technical. The morning was about getting the agent to keep to rules. Tests, checks that run by themselves, which setting lives where. Our architect was in his element.

**Interviewer:** And you?

**Françoise:** The first hour I could follow. Then at some point I noticed I'd turned into a photocopier. Whatever appeared on the big screen, I reproduced it on my laptop, letter by letter, with no idea what any of it did.

**Interviewer:** What happened then?

**Françoise:** My folders got into a mess, and I lost track of which session was the new one. So I said it out loud, that I'd fallen behind. One of the trainers pulled a chair over and went through it with me, on my laptop.

**Interviewer:** How was that?

**Françoise:** Good, actually. After a few minutes he looked at my screen and said I was exactly where everybody else was. And technically he was right. Nothing on my laptop was broken. I just didn't trust any of it. That was in my head, not on the screen.

**Interviewer:** Was there a moment on day two where it came together for you?

**Françoise:** One, yes. Earlier I'd asked where the settings for one of these checks should even live, only in my folder or for everyone. And a bit later the agent asked the trainer exactly that, and he pointed at me and said, that was your question. And then the agent wanted to know whether a check for missing tests should stop the work or only warn. I thought, how am I supposed to judge that, I'm not a developer. So I asked. And the trainer turned it around and asked what my gut said.

**Interviewer:** What did it say?

**Françoise:** The agent had explained the two options with a smoke alarm. A smoke alarm doesn't ask whether you'd like to hear it. So I said, make it stop, like the alarm. That bit, I understood.

**Interviewer:** So day two leaned towards one end of the group.

**Françoise:** Yes. And I can't judge whether day one was slow for our architect. Maybe it was. I don't think there was one speed for all of us. I don't know how you'd solve that.

**Interviewer:** Let's talk about your own job. Now that you're back, what can you see yourself doing with it?

**Françoise:** What I came for. The repetitive part of my week, reading the store mails, writing them up. I'd like to try that. Setting it up alone, though, I don't see it yet. If it's just me and the agent, I'll get to the first message I don't understand and stop there.

**Interviewer:** You sound quite sure about that.

**Françoise:** I am. That's why I was so keen to get the setup done in the room, with the trainers two metres away, and not tell myself I'd do it at home. I even said that to the person next to me on day two. Half joking. Only half.

**Interviewer:** What exactly would stop you?

**Françoise:** Not the idea. I'd know where to start, with the delivery notes. It's everything around it. Folders, settings, which session I'm in. In the room, when something went wrong, there was someone to ask. At my desk there isn't.

**Interviewer:** Is it time, or know-how?

**Françoise:** Mostly know-how. Or confidence, I'm not sure which. On day one, in my group, I kept apologising for not seeing it. As if the others could already see where the road went and I was still reading the first signpost.

**Interviewer:** What were you discussing?

**Françoise:** Expense claims. That was before we picked goods-in. After store visits I collect my receipts in a folder and then copy everything into a spreadsheet by hand. We talked about whether that needs a proper application or just a small helper that reads the folder and fills in the sheet. The trainer thought the small helper would do to start with.

**Interviewer:** And you?

**Françoise:** My first question was whether I could hand it to colleagues. Everyone in my area does the same claim every month. If I build the helper, can they use it, or does everybody build their own?

**Interviewer:** What did you hear?

**Françoise:** That in principle yes, you package it and people install it. But there's a catch. Our seats on the coding agent were handed out centrally, one each, and one of the trainers explained that whatever you build on your own seat stays there. Your settings and helpers don't travel to the next person by themselves. Somebody would have to put them in a common place and keep that place in order.

**Interviewer:** How did that land?

**Françoise:** For the developers that's daily life. For me, I wouldn't know where to start with a repository. And nobody in the room was sure whether we should ask for one team setup or each stay on our own seat. We said as much. We'll need help with that.

**Interviewer:** Did the group talk about sharing beyond your own seats?

**Françoise:** Quite a bit. In the round on the first morning, both of our technical colleagues said what they wanted most was to work together more, to teach each other, instead of everyone sitting on their own projects.

**Interviewer:** And in practice?

**Françoise:** One of the leads had an idea. Everyone keeps their own notes, there's one shared place for what the whole group learns, and one central place for the helpers.

**Interviewer:** Did anything get decided?

**Françoise:** Not yet. Near the end of day two the same lead said he wants everything we came up with in one place, and he's booked an hour next week to sort out what goes where. So that's still ahead of us.

**Interviewer:** What do you expect from that hour?

**Françoise:** Hope, more than expect. That if I ever build my expense helper, it ends up somewhere the others can find it. Not on my laptop, where it's only mine.

**Interviewer:** Would it help you if there were a follow-up session with a trainer, say a few weeks from now?

**Françoise:** Yes, probably. Sure, something like that.

**Interviewer:** What would it have to look like?

**Françoise:** Hm. Now that you ask, not like day two. If it's another round of someone typing on the big screen, I'll be photocopying again. What worked was a trainer next to me, on my laptop, with my problem. If anything, that.

**Interviewer:** You had screens before lunch on day one. Does that kind of speed change much on your side?

**Françoise:** A colleague put his finger on that on day one. He's spent years on customer projects, and his question was what all the speed is worth if the customer takes ages to come back to you.

**Interviewer:** Did he get an answer?

**Françoise:** The trainer said the best thing is to have someone from the customer's side sit right in the team. And if you can't get that, someone close to them who can speak for them.

**Interviewer:** And for you?

**Françoise:** My customer is the stores. And the stores aren't sitting next to me. I haven't worked out what that means for me yet.

**Interviewer:** If a colleague from another team gets invited next time, what would you tell them?

**Françoise:** Bring a real case from your own work. Day one depends on it.

**Interviewer:** Is there anything from the two days we haven't touched on that you'd want us to know?

**Françoise:** No, I think that's it. Oh, I took a photo of the card wall at the end of day one. If that's useful, I can send it.

**Interviewer:** It would be, yes. Thank you.

**Françoise:** I'll dig it out. After I've answered the question mark.
