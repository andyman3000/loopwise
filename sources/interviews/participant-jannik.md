# Participant interview: Jannik, product owner, grocery retailer

- **Basis:** synthetic, built from patterns in real conversations
- **Format:** one-on-one interview, full conversation
- **Date:** Autumn
- **Interviewee:** Jannik Engel (he/him), product owner of a long-running store software used in many branches of a grocery retailer, on the requirements side with no line responsibility; one of the people a sponsor at his company wants a format for, interviewed before any booking
- **Interviewer:** Loopwise

---

**Interviewer:** Hi Jannik, thanks for making the time. Is now still good?

**Jannik:** Yes, go. I've just come out of a call with one of the regional offices, give me a second to switch gears. The stores are about to change half their range for the season, so right now everybody wants something from us on the same day.

**Interviewer:** Then I'm grateful you squeezed this in. Some context from my side: your colleague who is talking to us about a format for your group asked me to speak to a few of the people who'd be in it. I want to understand how you work today, and how the product side meets the agent setup your developers use. There's nothing to get right or wrong.

**Jannik:** Sure. Just so you know, I'm probably not the person to explain the agent setup. But ask away.

**Interviewer:** Let's start somewhere easier, then. Product owner means something different everywhere. What does it mean for you?

**Jannik:** Nobody reports to me, so not that kind of lead. I decide what the team picks up next, and I keep asking myself whether that's really where the value is. The details of each story, other people know better than me. And honestly a big chunk of the job is standing in the doorway. The stores, the regional offices, head office, they all want something, and I try to catch it before it lands on the team's desks, so they can actually work.

**Interviewer:** How long have you been doing that?

**Jannik:** On this product, a bit over four years. The software itself is much older, it's been in the stores forever. Well, not forever. Long enough that nobody knows every corner of it anymore.

**Interviewer:** I suspect we'll come back to that. The developers' agent setup: have you used it yourself?

**Jannik:** Never. And it's not the pipeline the ordering-system team runs, our developers have their own. From what I understand, it lives around the code. The developers only take it out once a ticket has been through refinement.

**Interviewer:** So how does a request get that far? Take me through one.

**Jannik:** Let's say a regional office has a problem with something. They call one of our business analysts. The business analyst sits down with the developers and together they turn it into a refined ticket. And only then does a developer give it to the AI. So in that whole chain, the AI is the very last stop.

**Interviewer:** What do you make of that order?

**Jannik:** That's the thing I keep turning over. Who is that AI there for? Look, our software has thousands of settings. Somebody asks for a new feature, and half the time nobody knows whether there's already a setting that does it. Today the only way to find out is to ask a developer. I'd want to ask the AI that right at the start, at the idea stage, before anyone has written a ticket at all.

**Interviewer:** Mm. Go on.

**Jannik:** Or something like this. Someone wants yet another pop-up on the handheld scanners for some special case, and the AI comes back and says: there are already four pop-ups for nearly the same situation, sure you want a fifth? That's the kind of answer I mean.

**Interviewer:** And if you had that, what would be different?

**Jannik:** We'd give the business side better advice. Right now every question like that waits behind real development work, because developer time is the scarce thing. And it's not just settings. This year I've drawn I couldn't tell you how many architecture diagrams myself, box by box, and then gone round the developers asking: is this right? What I'd love is a button that just shows me how it really looks today.

**Interviewer:** By hand as in on paper?

**Jannik:** On a whiteboard tool. But by hand in the sense that every box is one I put there. Comes to the same thing.

**Interviewer:** Let's switch to your own work. Where does AI come in?

**Jannik:** Oh, pretty much everywhere. I use it for most of what I do, and a lot. But I want to be clear about one thing, that has nothing to do with the developers' setup. Completely separate world.

**Interviewer:** Separate in what way?

**Jannik:** Everyone here has their own account and tinkers with their own little helpers. I've got a few that are really good, for me. But try handing one to the team. Then it needs a page in the wiki, it needs to live in some repository, and someone has to keep it working for everybody.

**Interviewer:** Would that be so bad?

**Jannik:** (laughs) Not bad. It's just one more thing to look after. And guess who'd be looking after it.

**Interviewer:** You've got access to the coding agents, I think. Have you thought about letting them write code for you?

**Jannik:** I could. I've had access for a while. I don't want to, though. I tried it at home on a little side thing. Everything looked fine, I told it to go ahead, and it just didn't work. Then the AI asked me if it should add tests. Tests! It hadn't even crossed my mind. After that I thought, no, I'm not shipping production code straight from prompts. Building that side is for the developers. And I see why people worry about it, if everyone starts pushing things out, at some point nothing works anymore.

**Interviewer:** Okay. Different angle. How do you check that a feature actually serves your goals?

**Jannik:** Since early summer I've been building what I call a goal map. The few big goals from our product strategy go at the top. Each one has smaller goals under it, and under those sit the ideas, sorted into now, next and later. Some I mark plainly as "not doing this". And anything over a certain size has to go on the map.

**Interviewer:** How do you know whether you're getting closer?

**Jannik:** Depends which goal. Some I only see in a number that comes once a year. Others show up straight after a change, in how people in the stores use the software. And some things I don't measure at all, if I'm honest. A screen that's easier to read is part of the whole thing feeling smooth. I'm not going to pretend it moves the usage rate.

**Interviewer:** What happens when a store sends in a request?

**Jannik:** So every ticket we have has a field where I write down why. Why we do it, and also why we don't. When a mail comes in now, I hand it to the AI and tell it to dig through the board for the answer. Some questions I've had six times this year. Each one used to cost me an hour. Now it's a minute or so. And months later I can still say, we decided that in spring, and here's the reason.

**Interviewer:** Is there a recent example?

**Jannik:** Yes, last week. I spent a whole morning in a workshop with a big crowd from the stores and the regions. Afterwards I just talked my notes into the AI. Where something touched an existing ticket, add a comment. Where it was new, make a ticket with what people said. A morning's worth of talking, sorted in a few minutes.

**Interviewer:** Wow.

**Jannik:** Yeah. That one I was quite pleased with.

**Interviewer:** Who does discovery in your team?

**Jannik:** Mostly me. Daily, really.

**Interviewer:** And the others?

**Jannik:** That's the bit that doesn't work yet. I've got a kind of second brain for the AI, my transcripts, my mails, my slides. I'm fairly sure lots of people have something like that. But each of us has our own. What I'd want is for the team to use AI together. Not everyone in their own corner.

**Interviewer:** What could that look like? In practice.

**Jannik:** Maybe a skill for the goal map that the others can use too. You feed it a request, it checks if that's already on the map, and it updates the map. With limits, though. A single phone call from a single store can't be allowed to send a ticket straight into the build. And for myself, a weekly summary of what the people who talk to the stores picked up that week.

**Interviewer:** Does the developers' setup know any of this? The goals, the map?

**Jannik:** My guess is it knows nothing about our business goals. You'd have to check with a developer, but I'd be surprised. Give it six months and that map will hold a lot of what the business knows. We've also got a long strategy document. Maybe that's what the agents should be reading before they build anything.

**Interviewer:** I want to keep an eye on your time. Anything else that would help your team right now?

**Jannik:** I've started pushing for us to record refinement. We're ten people, we go through ten tickets in an hour and a half, and nobody writes anything down. A week later? We remember bits.

**Interviewer:** Thanks, Jannik. I think that's a good place to stop.

**Jannik:** I liked this. Can I ask one thing, though? What is it we're actually trying to get out of these conversations?

**Interviewer:** Fair question. I'm still working that out with the colleague who brought me in.

**Jannik:** Okay. Then I'll probably hear it from her first. (laughs) Right, back to the range swap.
