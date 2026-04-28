# Agile-adjacent methodologies

Agile-adjacent methodologies are frameworks that share Agile's core values of iteration and customer feedback but solve specific problems where standard Scrum or Kanban fall short. These methodologies address gaps in long-term planning, deep user research, business validation, and work structure that iterative delivery alone does not cover. Technology professionals benefit from understanding these approaches because real-world product development rarely fits neatly within a single framework. By combining Agile delivery with adjacent methodologies, teams gain strategic clarity, stronger discovery practices, and sustainable development rhythms.

## Lean Startup

Lean Startup, popularized by Eric Ries, focuses on validated learning rather than software delivery. Its central mechanism is the Build-Measure-Learn feedback loop, which uses Minimum Viable Products (MVPs) to test business hypotheses with the least effort possible. Unlike Agile sprints that optimize for shipping working software, Lean Startup optimizes for learning whether the product should exist at all.

Key principles of Lean Startup include:

- **Validated learning**: Treating every product decision as a hypothesis to confirm or invalidate with real customer data.
- **Build-Measure-Learn loop**: Building the smallest possible experiment, measuring customer behavior, and learning whether to pivot or persevere.
- **Minimum Viable Product**: Delivering just enough functionality to test one assumption, not a polished feature set.
- **Innovation accounting**: Tracking actionable metrics tied to learning goals rather than vanity metrics like page views or sign-ups.
- **Pivot or persevere**: Making structured decisions about whether to change direction based on evidence rather than intuition.

Lean Startup works best for early-stage teams seeking product-market fit. Once a team has confirmed demand and established a sustainable business model, Agile delivery methods become the primary driver for scaling that product.

## Shape Up

Shape Up, created by Basecamp (now 37signals), addresses sprint fatigue by fundamentally rethinking how work is scoped, scheduled, and delivered. It replaces the two-week sprint cycle with six-week cycles followed by a two-week cool-down period for bug fixes, technical debt, and exploratory work.

The methodology introduces three distinct phases:

- **Shaping**: Senior team members define work at an appropriate level of abstraction. They sketch rough boundaries and identify key risks without producing detailed specifications or wireframes. The output is a "pitch" that communicates the problem, appetite (time budget), solution sketch, and known rabbit holes.
- **Betting**: Leadership reviews shaped pitches and decides which to fund for the next cycle. There is no backlog; any pitch not selected must be re-pitched in a future cycle. This forces prioritization and prevents stale work from accumulating indefinitely.
- **Building**: Small teams of designers and developers have full autonomy to implement the shaped work within the six-week appetite. Progress is tracked using a "hill chart" that visualizes whether work is still being figured out (uphill) or being executed (downhill).

Shape Up suits teams that find Scrum too meeting-heavy, struggle to finish meaningful features within short sprints, or need longer uninterrupted blocks of focused work.

## Design Thinking

Design Thinking is a human-centered problem-solving framework that prioritizes understanding user needs over technical requirements. Originally developed at Stanford's d.school and popularized by IDEO, it provides structured methods for the discovery phase of product development where the team has not yet confirmed what users actually need.

Its five stages are:

| Stage | Purpose | Key Activities |
|-------|---------|----------------|
| Empathize | Understand user context and emotions | Interviews, observation, immersion |
| Define | Frame the core problem clearly | Problem statements, personas, journey maps |
| Ideate | Generate diverse solutions | Brainstorming, sketching, analogous inspiration |
| Prototype | Make ideas tangible quickly | Low-fidelity mockups, storyboards, role-plays |
| Test | Validate with real users | Usability testing, feedback sessions, iteration |

The critical distinction is scope: Design Thinking focuses on solving the right problem, whereas Agile focuses on solving the problem right. Design Thinking excels when requirements are ambiguous, the user base is poorly understood, or past solutions have failed despite competent execution. Many teams use Design Thinking during a discovery track that feeds shaped work into Agile delivery sprints.

## Jobs-to-be-Done

Jobs-to-be-Done (JTBD) is a framework for understanding customer motivation by viewing products through the lens of the "job" a customer is trying to accomplish. Popularized by Clayton Christensen, Tony Ulwick, and Bob Moesta, JTBD asserts that customers do not buy products—they hire them to make progress in a specific circumstance.

Core concepts include:

- **The job**: A functional, emotional, or social goal the customer wants to achieve, expressed independently of any particular solution.
- **Circumstances**: The specific context that triggers a customer to seek a solution, including constraints, anxieties, and desired outcomes.
- **Competing solutions**: The full set of alternatives a customer considers, which often crosses industry boundaries. A milkshake competes with a banana, a bagel, or boredom—not just other milkshakes.
- **Progress**: The measurable improvement the customer seeks, which becomes the basis for evaluating whether a product fulfills the job.

JTBD is best applied when redefining a product roadmap based on user motivation rather than a backlog of requested features. It reframes prioritization conversations from "what did customers ask for" to "what progress are customers trying to make, and where do current solutions fail them."

## Comparing the Methodologies

| Methodology | Primary Focus | Best Applied When | Relationship to Agile |
|-------------|--------------|-------------------|----------------------|
| Lean Startup | Business validation | Seeking product-market fit | Precedes Agile delivery; validates what to build |
| Shape Up | Work structure and autonomy | Sprints feel too short or prescriptive | Replaces Scrum ceremonies and cadence |
| Design Thinking | User problem discovery | Requirements are ambiguous | Feeds discovery into Agile delivery |
| Jobs-to-be-Done | Customer motivation | Roadmap lacks strategic clarity | Informs backlog prioritization |

## Choosing and Combining Approaches

These methodologies are not mutually exclusive. A mature product organization might use:

- JTBD to identify which customer jobs are underserved and worthy of investment.
- Design Thinking to explore solution spaces for those jobs through rapid prototyping and user testing.
- Lean Startup to validate whether the proposed solution achieves product-market fit before committing to full development.
- Shape Up or Scrum to deliver validated solutions at a sustainable pace with appropriate team autonomy.

The key decision factor is where the team's greatest uncertainty lies. If the team knows what to build but struggles with delivery, standard Agile suffices. If uncertainty sits in the problem space, discovery frameworks like Design Thinking or JTBD provide structure. If uncertainty sits in the business model, Lean Startup offers the fastest path to clarity. If uncertainty sits in work cadence and team energy, Shape Up offers an alternative rhythm.

## Related

Teams exploring agile-adjacent methodologies should also study Continuous Discovery Habits by Teresa Torres for integrating ongoing user research into delivery teams, Dual Track Agile for managing discovery and delivery in parallel, OKRs (Objectives and Key Results) for aligning team work with strategic outcomes, Lean UX for integrating design experimentation into Agile sprints, and the Cynefin Framework for understanding which problem domains benefit from iterative versus structured approaches.

## Summary

Agile-adjacent methodologies extend the reach of iterative development by addressing strategic, structural, and discovery challenges that standard Scrum and Kanban were not designed to solve. Lean Startup validates business assumptions before committing to delivery. Shape Up provides an alternative work cadence that grants teams longer cycles and greater autonomy. Design Thinking structures the messy front-end of innovation where user needs remain unclear. Jobs-to-be-Done reframes product decisions around customer progress rather than feature requests. Together with Agile delivery, these frameworks form a complete toolkit for building products that solve real problems sustainably.

## References

- Ries, Eric. *The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses*. Crown Business, 2011.
- Singer, Ryan. *Shape Up: Stop Running in Circles and Ship Work that Matters*. Basecamp, 2019. Available at https://basecamp.com/shapeup
- Brown, Tim. *Change by Design: How Design Thinking Transforms Organizations and Inspires Innovation*. Harper Business, 2009.
- Christensen, Clayton M., Taddy Hall, Karen Dillon, and David S. Duncan. "Know Your Customers' Jobs to Be Done." *Harvard Business Review*, September 2016.
- Ulwick, Tony. *Jobs to Be Done: Theory to Practice*. IDEA BITE PRESS, 2016.
- Moesta, Bob, and Greg Engle. *Demand-Side Sales 101: Stop Selling and Help Your Customers Make Progress*. Lioncrest Publishing, 2020.
- Gothelf, Jeff, and Josh Seiden. *Lean UX: Designing Great Products with Agile Teams*. O'Reilly Media, 3rd edition, 2021.
