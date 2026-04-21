# Value demand vs failure demand

Value demand and failure demand are two categories of work that flow into any technology team. The distinction, originally articulated by systems thinker John Seddon in his study of service organizations, has become a foundational concept in lean and agile software engineering. Value demand is work that a customer or stakeholder genuinely wants done — new features, improvements, capabilities that move the product forward. Failure demand is work caused by a failure to do something right the first time — bug fixes, rework, support escalations, and firefighting. Understanding the difference is essential for any technology professional who wants to improve throughput, reduce waste, and deliver meaningful outcomes.

## What is value demand

Value demand is any request or unit of work that directly advances a customer need, a business objective, or a strategic goal. It is the work that justifies the existence of the team. Examples include building a new feature that users have requested, improving the performance of a critical workflow, integrating with a partner system to unlock new revenue, or redesigning an interface to improve usability. Value demand is pull-based: it originates from genuine needs in the market, the organization, or the user base. When a team spends most of its capacity on value demand, the organization moves forward. Products improve. Customers benefit. Revenue grows.

## What is failure demand

Failure demand is work that exists only because something else went wrong. It is a symptom, not a goal. Common examples include fixing production bugs, patching security vulnerabilities introduced by careless coding, reworking a feature because requirements were misunderstood, handling support tickets caused by confusing user interfaces, and recovering from outages triggered by insufficient testing. Failure demand is waste in the lean sense: it consumes time, energy, and budget without producing new value. It often creates a vicious cycle — teams under pressure from failure demand cut corners, which generates more failure demand.

## Key differences

| Dimension | Value demand | Failure demand |
|---|---|---|
| Origin | Customer need, business strategy, market opportunity | System defect, process breakdown, prior mistake |
| Effect on product | Adds new capability or improves existing capability | Restores expected capability or corrects a deficiency |
| Customer perception | Delights or satisfies the customer | Frustrates the customer; resolution merely returns to baseline |
| Resource impact | Investment that yields returns | Cost that yields no new value |
| Strategic signal | Indicates alignment with market needs | Indicates quality, process, or architectural problems |
| Typical examples | New features, enhancements, performance optimization, UX improvements | Bug fixes, rework, incident response, complaint resolution |

## Why the distinction matters

Technology teams have finite capacity. Every hour spent on failure demand is an hour not spent on value demand. When failure demand dominates a team's backlog, the organization stagnates: the product does not improve, competitors advance, and morale declines as engineers spend their days fixing preventable problems rather than building meaningful solutions. Tracking the ratio of value demand to failure demand gives leaders a clear, honest signal about the health of their engineering organization. A team that spends 70% of its time on failure demand is not an engineering team — it is a maintenance crew.

## Common sources of failure demand in technology

- **Inadequate requirements gathering.** Features built on ambiguous or incorrect requirements inevitably need rework once the misunderstanding surfaces.
- **Insufficient testing.** Skipping unit tests, integration tests, or end-to-end tests in the name of speed creates a backlog of undetected defects that surface in production.
- **Technical debt.** Accumulated shortcuts in architecture, code quality, and infrastructure make every subsequent change more fragile and error-prone.
- **Poor incident management.** When root causes are not identified and fixed, the same incidents recur, generating repeated failure demand.
- **Weak communication.** Misalignment between product, engineering, design, and operations leads to misbuilt features and duplicated effort.
- **Missing observability.** Systems without adequate logging, monitoring, and alerting allow small problems to escalate into large outages.

## Strategies to reduce failure demand

- **Invest in automated testing.** Comprehensive test suites catch defects before they reach production. The upfront cost is repaid many times over in reduced bug-fixing work.
- **Practice continuous integration and continuous delivery.** Smaller, more frequent releases reduce the blast radius of any individual change and make defects easier to isolate.
- **Conduct regular retrospectives.** Structured reflection helps teams identify recurring sources of failure demand and commit to specific corrective actions.
- **Manage technical debt deliberately.** Allocate a consistent percentage of capacity to paying down technical debt rather than allowing it to compound indefinitely.
- **Strengthen requirements practices.** Use techniques such as user story mapping, acceptance criteria, and definition of done to ensure shared understanding before development begins.
- **Implement blameless postmortems.** After incidents, focus on systemic causes rather than individual blame. Fix the system, not the symptom.
- **Build observability into the platform.** Invest in monitoring, alerting, and distributed tracing so that problems are detected early and diagnosed quickly.

## Measuring value demand and failure demand

Tracking the ratio requires consistent categorization of work items. Teams can tag backlog items, tickets, or stories as either value demand or failure demand. Over time, the data reveals trends:

| Metric | What it tells you |
|---|---|
| Value demand ratio (value items / total items) | How much of the team's effort goes toward forward progress |
| Failure demand ratio (failure items / total items) | How much effort is consumed by preventable work |
| Failure demand trend over time | Whether process improvements are taking effect |
| Failure demand by source category | Where to focus improvement efforts for maximum impact |
| Time spent on failure demand per sprint | The concrete cost of quality problems in engineering hours |

A healthy, mature engineering organization typically maintains a value demand ratio above 70%. Teams below 50% should treat the imbalance as a systemic problem requiring leadership attention and structural investment.

## Organizational and cultural implications

The value demand versus failure demand lens extends beyond individual teams. At the organizational level, it reveals whether leadership is investing in sustainable engineering practices or perpetuating a cycle of reactive firefighting. Organizations that reward heroic incident response but underinvest in prevention inadvertently incentivize failure demand. A culture shift is required: celebrating the absence of incidents, recognizing investments in quality infrastructure, and making failure demand visible in planning and reporting. When executives see that 60% of engineering capacity is consumed by failure demand, the business case for investing in quality becomes self-evident.

## Related

Professionals interested in value demand versus failure demand should explore lean software development and its principles of eliminating waste, the theory of constraints and how bottlenecks amplify failure demand, the concept of technical debt and strategies for managing it, DevOps practices including continuous integration and continuous delivery, service design thinking as pioneered by John Seddon, systems thinking and feedback loops, agile retrospectives and continuous improvement, site reliability engineering and its error budget model, and the DORA metrics for measuring software delivery performance.

## Summary

Value demand and failure demand represent two fundamentally different types of work flowing into technology teams. Value demand creates new capability and moves the product forward. Failure demand consumes capacity to correct past mistakes and process breakdowns. The ratio between the two is one of the most honest indicators of engineering health available to technology leaders. Reducing failure demand is not simply a matter of writing fewer bugs — it requires deliberate investment in testing, architecture, process discipline, observability, and organizational culture. Teams that systematically shift their work toward value demand deliver more, deliver faster, and sustain higher morale. The goal is not to eliminate failure demand entirely, which is unrealistic, but to drive it low enough that the majority of engineering effort goes toward work that genuinely matters.

## References

- Seddon, John. *Freedom from Command and Control: Rethinking Management for Lean Service*. Productivity Press, 2005. The original formulation of value demand and failure demand in the context of service organizations.
- Seddon, John. *Systems Thinking in the Public Sector*. Triarchy Press, 2008. Extends the value demand and failure demand framework to public sector service delivery.
- Poppendieck, Mary, and Tom Poppendieck. *Lean Software Development: An Agile Toolkit*. Addison-Wesley, 2003. Applies lean principles including waste elimination to software engineering.
- Forsgren, Nicole, Jez Humble, and Gene Kim. *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press, 2018. Empirical research on the practices that drive software delivery performance.
- Kim, Gene, et al. *The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win*. IT Revolution Press, 2013. A narrative exploration of how unmanaged failure demand cripples technology organizations.
- Humble, Jez, and David Farley. *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley, 2010. Foundational text on the practices that reduce failure demand through automation.
