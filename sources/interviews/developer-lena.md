# Developer interview: Lena, developer, grocery retailer

- **Basis:** synthetic, built from patterns in real conversations
- **Format:** one-on-one interview, full conversation
- **Date:** Autumn
- **Interviewee:** Lena Marquardt (she/her), developer in a product team at a grocery retailer, the person who built the team's agent pipeline; not a participant, the interviewer talks to her after interviews with the product people in her area
- **Interviewer:** Loopwise

---

**Lena:** Hi. Hang on, let me shut the door. Our kitchen is right next to the team area, and between twelve and one it turns into a canteen.

**Interviewer:** Take your time.

**Lena:** Okay. Better. Sorry about that.

**Interviewer:** No need. Thanks for fitting me in at lunchtime. A bit of context: I've spoken to a few of the product people in your area over the last weeks, and what I'm missing is how it looks from engineering. When the agent pipeline came up, everybody said, talk to Lena.

**Lena:** Ha. Yes. That's sort of the problem.

**Interviewer:** The problem?

**Lena:** I've been the main driver for about three months now, so anything technical about it ends up with me. Nice for my ego, but it's the opposite of what I want. If it only works because of one person, it hasn't worked. It's meant to belong to the whole team.

**Interviewer:** The whole team meaning who?

**Lena:** Every developer, for a start. And the business analysts too, if they feel like it. Which is where it gets interesting, because then it's not a tool question anymore. Who does what, how we hand things to each other, that'll have to change a lot. The pipeline can already do the work. We just haven't worked out what we, as a team, want to do with that.

**Interviewer:** Let's go back to the start. What was the idea?

**Lena:** Think of it as a colleague, not a tool. It has its own name, though most of the team just calls it the conveyor belt, and its own logins to our systems. So it's not me in a session on my laptop with my name stamped on every change. If you open the history in six months, it should say the pipeline did that, not Lena.

**Interviewer:** Why did that matter so much?

**Lena:** Partly just practical. It doesn't run on my machine. There was a phase when I had four or five sessions open at once, and I'd go to a meeting holding my laptop open in front of me like a tray of drinks, so nothing would stop. Ridiculous.

**Interviewer:** I've seen people do exactly that.

**Lena:** Everybody does. But the bigger reason: whatever I set up locally is tuned to how I work. Give it to the person next to me and it falls apart. We wanted something that feels the same for everyone. And that you can pass on. I start a ticket in the morning, a colleague picks it up after lunch, and nothing gets lost in between.

**Interviewer:** How did you build it? A proper project, or on the side?

**Lena:** More or less a project. Three of us were taken off normal product work for a while. We agreed early not to design the grand version. Little pieces that each have to work on their own. The very first one was an agent that reviews changes other teams send us. Once that held up, we did the whole delivery flow: refining a ticket, cutting it into subtasks, building, reviewing.

**Interviewer:** And today, how does a normal story go? If you can walk me through one.

**Lena:** Sure. Not everyone uses it yet, a bit more than half of the developers. So a story gets refined and estimated with the team first. Then someone decides this one's for the pipeline and sticks a label on the ticket. An agent picks it up, reads it, posts what it's assuming as a comment, and makes the subtasks. If you disagree with its plan you can, sorry, you can push back and it adjusts, as many rounds as you need. Once you're happy, the ticket moves to in progress and the building starts. At the very end a human has to approve the change.

**Interviewer:** Where does it get its context? Is it all in the story?

**Lena:** Ideally the story says everything. But it doesn't have to, because the pipeline has its own user with the same rights any of us has. It can look at how the ticket evolved, read the wiki, open every repository the team owns. And it goes into the code before planning, you can actually see it, the subtasks only make sense if it's looked. So we hand it very little. It fetches the rest itself.

**Interviewer:** Is there a rule for when a story is ready for it? A definition of ready?

**Lena:** Not a real one yet. Acceptance criteria are a must. There are a handful of basics in the skill it runs on. We made that skill deliberately strict to begin with, and every time it turns out to be too strict somewhere, we relax that bit.

**Interviewer:** How does refinement fit with all this? Did you have to change it?

**Lena:** Didn't touch it. Refinement is the bit that fits best. The story has always been what a developer works from. Now the pipeline works from the same story. Estimating is another matter. That doesn't fit at all.

**Interviewer:** Because the pipeline is so much faster?

**Lena:** That's part of it. For us, story points are mainly a way to keep stories small, so one is done in a week, two at the outside. And none of what the pipeline does shows up in our estimates. We still estimate as if a person is typing it all.

**Interviewer:** On the days refinement goes well, what's different?

**Lena:** Two things. One, the story was written by someone from the business side, who knows what the store or the shop actually needs. Not by someone technical. And two, something we started a few weeks ago: before refinement, one of the business analysts sits with one developer and goes through the story, just the two of them. By the time it reaches the whole team, the obvious questions are gone. That's helped a lot.

**Interviewer:** So the business analyst meets a developer before the story ever gets near the pipeline.

**Lena:** Before it even gets to refinement, yes.

**Interviewer:** And your own work? What has changed for you?

**Lena:** Oh. There was a stretch where it got a bit wild. I ran as much in parallel as my head would hold. Now that we take tickets from the board again and they go through the pipeline, it feels like a team again.

**Interviewer:** And reviews? You said a human approves the change at the end.

**Lena:** That's where we're still stuck. At the start it was simple, one developer took the ticket through to review, another one checked it. For small changes, fine. For big ones it wore people out. Picture a big change landing on your desk that was written in no time, and you have to work out from the finished code what it was even trying to do. At that pace nobody keeps up.

**Interviewer:** So what are you doing instead?

**Lena:** I'm trying something with one colleague right now. Every time the pipeline stops and wants a human, the two of us look at it together. Not only at the end. So when the change is finished, there are already two people who know what's in it. Early days. We'll see.

**Interviewer:** Why keep a person in there at all? Couldn't it just ship?

**Lena:** No. Okay, technically maybe. But no. Quality, for one. Then knowledge, more than one of us has to know what's in the code. And honestly, we just don't trust it that much yet. So we left most of how we work alone and change one piece at a time.

**Interviewer:** Do you see problems at the end that could have been caught further up? In the story, say?

**Lena:** All the time. Yesterday we spent ages on what to call a new interface for the delivery slot check and where it should sit. The ticket described the business case one way, and a few people in the room clearly had something else in mind. That could have been settled before anyone wrote a line.

**Interviewer:** Has anyone who isn't a developer used the pipeline?

**Lena:** Properly, the UX designer in our team. We did once walk a couple of the requirements people through it, on a tiny change, so they'd see what it does. But actually using it for real work, that's the UX designer. They had a front-end ticket, and when the pipeline had finished they opened it on staging and clicked around in the browser. Found a few small visual glitches, left them as comments on the change, and the agents fixed them. I only looked at the code at the very end.

**Interviewer:** How did they take it?

**Lena:** Loved it. The next thing they asked was whether we could build three versions of a design, clickable, and put them in front of users in a test. So that went well.

**Interviewer:** Let me go broader. How do you see the team changing?

**Lena:** I think the roles drift towards each other. The business analysts get more technical, the developers get closer to the business. And I'd want that with or without AI, to be honest. One day I'd like a business analyst to just ask the code their question, instead of walking over and pulling a developer out of whatever they're doing. And developers move up a step. More architecture, more thinking about where the product goes.

**Interviewer:** So what stays with the developers?

**Lena:** Technical decisions, and owning them. An agent will happily give you an architecture. Whether it's a good one, a business analyst can't tell you. And the moment a problem needs you to step off the usual path, agents struggle. They aim for whatever most people would do. That's why it's our junior, as we say. A junior can't be responsible for anything.

**Interviewer:** How have the other developers taken all of this?

**Lena:** Two camps, like always. Some couldn't wait to get going, some kept their distance and watched. And I understand it, it goes right to how people see themselves. If your whole day turns into reading what a machine wrote, is that still the job you signed up for? Would you still want it a few years from now? I knew it would make some noise. And it did.

**Interviewer:** Do you share what you've learned with other teams?

**Lena:** Only just starting. We were one of several teams trying something like this. Most of the others stayed with sessions on their own laptops and built their own bits and pieces around them. A few weeks ago the team next door looked at ours and more or less took it over. What I'd really like is some way for teams to learn from each other on purpose. At the moment that just doesn't exist.

**Interviewer:** And planning? Has your sprint rhythm changed?

**Lena:** Not much. Still one-week sprints. Review, planning, then a more detailed plan, partly with the agents. But we're still, how do I put it, finding our feet. One week we do it like this, the next a little differently.

**Interviewer:** That's all I wanted to cover. Thanks, Lena.

**Lena:** Sure. Can I ask something back? What happens with all this? You talk to everyone, and then?

**Interviewer:** I put what I heard side by side, look for patterns, and then we come back to your area with what we found.

**Lena:** Okay. Send it to me when you have it. I'm curious what the product side told you.

**Interviewer:** Will do.

**Lena:** Good. Then I'm going to try and rescue whatever's left in the kitchen.
