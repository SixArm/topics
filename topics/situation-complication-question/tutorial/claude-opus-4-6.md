# Situation Complication Question (SCQ)

The Situation Complication Question (SCQ) framework is a narrative method for structuring complex information into a compelling story. Developed by Barbara Minto at McKinsey & Company, it is widely used in consulting, strategy, and technology leadership to define problems clearly and persuade decision-makers toward action. SCQ transforms messy, ambiguous challenges into focused problem statements by walking an audience through three deliberate steps: grounding them in shared reality, introducing the tension that demands attention, and crystallizing the exact question that must be answered.

## Why SCQ Matters for Technology Professionals

Technology professionals face a recurring challenge: translating technical complexity into business clarity. Whether you are presenting to a CTO, pitching a migration to a steering committee, or writing an incident postmortem, the quality of your framing determines whether your audience engages or disengages. SCQ forces disciplined thinking before communication begins. It prevents the common failure mode where an engineer launches into a solution without first establishing why anyone should care.

Organizations that adopt structured communication frameworks consistently make faster decisions, produce shorter meetings, and reduce misalignment between engineering and business leadership. SCQ is particularly powerful because it works at every altitude, from a five-minute Slack summary to a thirty-slide executive briefing.

## The Three Components

The framework has three components, each serving a distinct rhetorical purpose. They must appear in order, and each must earn the next.

### Situation

The Situation is a factual, non-controversial description of the current state. It provides context the audience already knows and agrees with. The purpose is to build consensus and establish common ground before introducing anything new. A good Situation statement should pass the "head nod" test: every person in the room should be able to agree with it without objection.

- State observable facts, not opinions or interpretations
- Anchor in data, timelines, or widely accepted business context
- Keep it brief; this is setup, not the main event
- Avoid embedding the problem here; the Situation should feel stable

### Complication

The Complication is what changed, what broke, what emerged, or what threatens to disrupt the stable situation you just described. It introduces tension. This is the engine of the narrative because without complication, there is no reason to act. The Complication can be a problem, a risk, an opportunity cost, or an external force.

- Identify the specific change, failure, or emerging pressure
- Make the stakes concrete and quantifiable when possible
- Connect the complication directly to the situation so the disruption is obvious
- A well-written complication should create a sense of urgency or unease

### Question

The Question is the focused problem statement that arises logically from the complication. It defines the exact decision the audience must make or the exact problem that must be solved. A strong Question narrows scope, preventing the conversation from drifting into tangential concerns.

- Frame as a single, answerable question
- Ensure the question flows inevitably from the complication
- Avoid compound questions; if you have two questions, you have two SCQs
- The answer to this question should drive the rest of your communication

## Component Comparison

| Component    | Purpose                        | Tone              | Length   | Key Test                                       |
|--------------|--------------------------------|--------------------|----------|-------------------------------------------------|
| Situation    | Establish shared context       | Neutral, factual   | Brief    | Does the audience already agree with this?       |
| Complication | Introduce tension or urgency   | Urgent, concrete   | Moderate | Does this make the status quo feel unsustainable? |
| Question     | Focus the decision point       | Direct, singular   | One line | Can this be answered with a clear recommendation?|

## Examples in Technology Contexts

**Infrastructure scaling:**
- Situation: "Our platform serves two million daily active users with an average response time under 200 milliseconds."
- Complication: "A recent spike in traffic from a new integration partner has pushed p99 latency above one second during peak hours, triggering SLA violations."
- Question: "How do we scale our infrastructure to handle partner traffic without degrading performance for existing users?"

**Technical debt prioritization:**
- Situation: "Our monolithic application has supported the business for six years and currently handles all order processing, inventory, and reporting."
- Complication: "Deployment frequency has dropped from daily to biweekly because a single change in one module requires full regression testing of the entire system, and three critical bugs in the last quarter were caused by unrelated module coupling."
- Question: "Which modules should we extract first to restore deployment velocity while minimizing risk to revenue-critical flows?"

**Security incident response:**
- Situation: "Our authentication service processes 50 million login events per month using an industry-standard OAuth 2.0 implementation."
- Complication: "A vulnerability disclosed last week in our token validation library allows token forgery under specific conditions, and proof-of-concept exploits are circulating publicly."
- Question: "What is the fastest path to patching the vulnerability across all environments without forcing a disruptive password reset for our entire user base?"

## Common Mistakes

- **Burying the complication in the situation.** If you describe the problem as part of the background, the audience loses the narrative arc. Keep the situation stable; let the complication disrupt it.
- **Asking a question that does not follow from the complication.** If the question feels like a leap, you have either chosen the wrong complication or skipped a logical step.
- **Writing a compound question.** Two questions mean two separate problem frames. Split them into two SCQs and prioritize.
- **Making the situation too long.** Excessive background signals that you have not distilled the context. Aim for two to four sentences at most.
- **Stating the complication as an opinion rather than a fact.** "Our architecture is bad" is an opinion. "Deployment frequency has dropped 75% in six months due to module coupling" is a fact with evidence.

## When to Use SCQ

| Use Case                       | Why SCQ Helps                                                       |
|--------------------------------|----------------------------------------------------------------------|
| Executive briefings            | Forces concise framing that respects leadership time                 |
| Project proposals              | Clarifies the problem before proposing a solution                    |
| Incident postmortems           | Structures the narrative from stable state to failure to resolution  |
| Architecture decision records  | Establishes why a decision is needed before evaluating options        |
| Sprint planning discussions    | Frames why a particular piece of work matters right now              |
| Stakeholder alignment meetings | Builds consensus on the problem before debating solutions            |

## How SCQ Connects to the Minto Pyramid Principle

SCQ is the top of the Minto Pyramid. Once you have defined the question, the answer to that question becomes your key message, and all supporting arguments and evidence cascade beneath it in a hierarchical structure. Think of SCQ as the problem definition layer and the Pyramid as the solution delivery layer. In practice, a well-constructed SCQ eliminates roughly half the communication friction because the audience is already aligned on the problem before you present your recommendation.

## Related

If you find SCQ useful, explore the Minto Pyramid Principle for structuring the answer that follows your question. MECE (Mutually Exclusive, Collectively Exhaustive) thinking helps ensure your supporting arguments are logically complete. The SCQA variant adds an explicit Answer component directly after the question for situations where you want to lead with your recommendation. For broader strategic communication, look into strategy one-pagers, the Hero-Treasure-Dragon Quest narrative framework, and the concept of value driver trees for connecting technical problems to business outcomes.

## Summary

The Situation Complication Question framework is a disciplined method for framing problems before proposing solutions. By separating stable context from disruptive change and then crystallizing a focused question, SCQ ensures that audiences are aligned on the problem before evaluating answers. For technology professionals, this translates to faster decisions, shorter meetings, and communication that earns credibility with both technical and business stakeholders. Master SCQ, and you master the skill of making complex problems feel solvable.

## References

- Minto, Barbara. *The Minto Pyramid Principle: Logic in Writing, Thinking, & Problem Solving*. Minto International, 1987. The foundational text where SCQ originates as part of the Pyramid Principle methodology.
- Minto, Barbara. "SCQA: A Framework for Defining the Problem." *The Pyramid Principle Toolkit*, McKinsey & Company internal training materials, various editions.
- Rasiel, Ethan M. *The McKinsey Way*. McGraw-Hill, 1999. Provides practical context on how McKinsey consultants apply structured communication frameworks including SCQ.
- Harvard Business Review. "The Science of Strong Business Writing." HBR, November 2021. Discusses evidence-based principles behind structured narrative frameworks in business communication.
- Richards, Mark, and Neal Ford. *Fundamentals of Software Architecture*. O'Reilly Media, 2020. Covers Architecture Decision Records (ADRs), a common application context for SCQ in technology organizations.
