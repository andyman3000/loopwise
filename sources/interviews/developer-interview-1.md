# Developer interview 1

- **Basis:** real conversations, anonymised composite
- **Format:** one-on-one interview, excerpt
- **Date:** Autumn
- **Speaker:** D, developer in a product team who built the team's agent pipeline. D is a developer, not a participant as described in `product/personas/participant.md`. D gives the developer side of how product people and the pipeline meet.
- **Interviewer:** I

---

**I:** Thanks for making time. I've talked to the product people in your area. Now I'd like the engineering side. How did the agent pipeline start?

**D:** I've been the main person on it for the last three months. On the technical side I can say the most about it. I'm trying to change that. It should be spread across everyone and used by everyone.

**I:** Who is everyone?

**D:** All developers, for sure. Consultants too, if they want. That's where roles and collaboration will have to change a lot. The capability is there now. We first have to find out what to do with it.

**I:** What was the idea behind it?

**D:** An agent that works like a team member of its own. Its own name, its own access to the systems. Not me in a local session with my name on every change. The history should say the pipeline did it.

**I:** What made that attractive?

**D:** It runs away from my laptop. I often had four or five sessions open at once. I don't want to walk into a meeting with an open laptop. And a setup that works for me often doesn't work for the next person. We needed one experience for everyone. And a handover: I start, a colleague takes over, and it all fits together.

**I:** How did you build it?

**D:** A small group of three, taken out of product work for a while. We started with small blocks that should work, without thinking too big. The first use was a review agent for changes from other teams. Then the full delivery flow: refine a ticket, split it into subtasks, build, review.

**I:** How does the team use it today?

**D:** More than half of the developers use it. We pre-refine a story together and estimate it. Then someone decides the pipeline should do it and puts a tag on the ticket. An agent reads the story, writes its assumptions as a comment and creates subtasks. You can go back and forth with it until you're happy. Then the story moves to in progress, and the build starts. At the end there's a change request for a human.

**I:** Where does it get its context from?

**D:** Ideally the story brings everything. Apart from that it has its own user with the same rights as anyone. It can read the ticket history, the wiki and all of the team's repositories. It looks through the code before it plans. You can see that in the subtasks it writes. The starting context is tiny. It pulls what it needs.

**I:** Is there something like a definition of ready?

**D:** Not yet. Acceptance criteria have to be there, and a few basics are in the skill it uses. We scoped that skill very tightly. Now we open it step by step where it's too rigid.

**I:** How does refinement fit with the pipeline?

**D:** Refinement fits perfectly. The story was always the prompt for the developer. Now it's the prompt for the pipeline. Estimation doesn't fit at all. We use story points to cut stories small, so they finish within a week or two. Nothing about the pipeline's speed has gone into the estimates.

**I:** When does refinement work well?

**D:** When the story is written from the business side, not from a technical role. And for a few weeks now, the consultant talks a story through with one developer beforehand. Then the obvious questions come up early. That helps a lot.

**I:** What has changed in your own work?

**D:** For a while I ran as many things in parallel as I could keep in my head. Now that we work tickets off the board, it's more collaborative again.

**I:** And the review?

**D:** At first one developer took a ticket up to the review, and a second one checked it. With big changes that got exhausting. The pipeline produces changes so fast that the reviewer has to rebuild the whole picture from finished code. That doesn't work at that speed. Now I'm trying something else with one colleague. After every step where the pipeline needs a human, we look at it together. Then two people know what to expect by the end.

**I:** Why keep humans in the loop at all?

**D:** Quality is one reason. Spreading knowledge is the second. And our trust in the system isn't very high yet. So we kept most of our process and change one thing at a time.

**I:** Do things come out at the end that could have been caught earlier?

**D:** Often, yes. Yesterday we argued about the name and path of a new interface. The ticket described the business case one way. Some people had a different picture in their heads. That could have been settled before.

**I:** Has anyone outside the developers used it?

**D:** The UX person in our team. They had a front-end ticket and clicked through the result on a test stage in the browser. They found a few small visual bugs and wrote them as comments on the change. The agents picked them up. I only came in at the end to judge the code. Right away they wanted to try three design variants as clickable versions for a user test.

**I:** How do you see the team change?

**D:** The roles grow together. Consultants get more technical, developers more on the business side. I like that with or without AI. Consultants will ask the code directly instead of pulling a developer away. Developers move up a level, to architecture and where the product should go.

**I:** What stays with developers?

**D:** Making technical decisions and taking responsibility for them. An agent can build an architecture. A consultant can't judge whether it's good. And when a problem needs you to leave the standard, agents are weak. They tend towards the average. That's why we call it a junior developer. It can't carry responsibility.

**I:** How did the team react?

**D:** There are always two camps. Some push ahead, some find it suspicious. It touches how people see their job. Am I still a developer if I only review? Will I want this job in five years? I expected it would stir things up.

**I:** Do you share this with other teams?

**D:** That's just starting. We were one of several teams that tried something like this. Most stayed with local sessions and built things around them. One team close to us copied our approach a few weeks ago. What I'd want is a shared way to learn from each other across teams.

**I:** How do you plan your work around it?

**D:** We still work in weekly sprints. Review, then planning, then a detailed plan, partly with agents. But we're still finding our way. Sometimes we do it one way, sometimes another.

**I:** Thanks, that's our time.

**D:** What happens next? You talk to everyone, and then?
