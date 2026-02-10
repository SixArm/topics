# One person's constant is another person's variable

The quotation "One person's constant is another person's variable" is a well-known aphorism in computer science and software engineering, often attributed to Alan Perlis from his 1982 collection "Epigrams on Programming." It highlights the subjective nature of software design decisions and how different developers, teams, or systems may perceive and use the same elements in fundamentally different ways. What one programmer hardcodes as a fixed value, another treats as configurable. What one team considers a settled architectural decision, another team revisits as a tunable parameter. This principle extends well beyond literal constants and variables in code — it speaks to assumptions, perspectives, and the importance of recognizing that context shapes every design choice.


## Origin and Context

The saying originates from Alan Perlis's "Epigrams on Programming," published in the ACM SIGPLAN Notices in September 1982. Perlis, the first recipient of the Turing Award, crafted a series of pithy observations about computing, language design, and software development. Epigram 31 states: "One man's constant is another man's variable." Among the 130 epigrams in the collection, this one resonates strongly because it captures a tension that every developer encounters — the boundary between what is fixed and what is flexible is rarely absolute. In programming, a "constant" is a value that remains unchanged throughout execution, while a "variable" is a value that can change during runtime. The quote plays on this distinction to make a deeper point about perspective, context, and the relativity of design decisions.


## The Core Insight

At its heart, the aphorism describes a fundamental challenge in software engineering: assumptions that seem obvious and permanent to one person are often temporary or arbitrary to another. Consider a tax rate embedded in a financial application. The original developer, building the system for a single jurisdiction, might hardcode it as a constant. A second developer, tasked with expanding the application internationally, immediately sees it as a variable that must change per country, per year, or per transaction type. Neither developer is wrong — they are operating under different requirements and different scopes of concern.

This pattern recurs at every level of abstraction:

- **Values in code**: A port number, a file path, a timeout duration, or a color code may be constant in one deployment and variable in another.
- **Configuration and environment**: What is fixed in development may be parameterized in production. What is stable in one cloud region may differ in another.
- **Architecture and design**: A monolithic application treats its database schema as a given; a multi-tenant platform treats the same schema as something each customer might customize.
- **Business rules**: A pricing model that one product manager considers permanent may be the first thing a new product manager wants to experiment with.


## Practical Implications for Software Design

The aphorism has direct consequences for how technology professionals design, build, and maintain systems. The table below contrasts a "constant mindset" with a "variable mindset" across common software engineering concerns.

| Concern | Constant Mindset | Variable Mindset |
|---|---|---|
| Configuration values | Hardcoded in source code | Externalized to config files or environment variables |
| Business rules | Embedded in application logic | Expressed in rule engines or policy layers |
| Feature behavior | Fixed at compile time | Toggled via feature flags at runtime |
| Data formats | Single schema assumed | Schema versioning and migration supported |
| Deployment targets | Single environment assumed | Multi-environment, multi-region parameterization |
| User interface text | Strings inline in templates | Internationalized via locale resource bundles |

Neither column is inherently superior. Premature generalization — making everything variable — introduces unnecessary complexity, indirection, and maintenance burden. Conversely, excessive hardcoding creates brittle systems that resist change. The skill lies in identifying the right boundary for a given context and revisiting that boundary as requirements evolve.


## Collaboration and Communication

The saying also serves as a reminder about teamwork and communication. When developers collaborate on a shared codebase, their assumptions about what is fixed and what is flexible may conflict silently. One developer adds a constant for a buffer size that seems obvious; another developer, working on a different performance profile, needs to tune that same value. Without clear documentation, naming conventions, and communication, these conflicting assumptions become a source of bugs, technical debt, and frustration.

Key practices that address this tension include:

- **Documenting intent**: Explain why a value is constant, not just that it is. A comment stating "fixed per regulatory requirement X" communicates more than `const TAX_RATE = 0.07`.
- **Code review as perspective exchange**: Code reviews surface hidden assumptions. A reviewer from a different team or domain naturally questions what the author took for granted.
- **Naming conventions**: Naming a value `DEFAULT_TIMEOUT_MS` signals that it is a default that might be overridden, whereas `TIMEOUT_MS` is ambiguous about whether it should ever change.
- **Architecture decision records**: Documenting why a particular value or behavior was fixed at design time helps future maintainers understand the original context and decide whether the assumption still holds.


## Beyond Code: The Broader Principle

The aphorism extends beyond literal programming constructs. In technology organizations, "constants" and "variables" appear in many forms:

- **Process**: One team's mandatory approval workflow is another team's optional checkpoint.
- **Technology choices**: One organization's standard database is another organization's legacy system to be replaced.
- **Organizational structure**: One company's permanent reporting hierarchy is another company's quarterly experiment in team composition.
- **Product strategy**: One product's core feature is another product's deprecated capability.

Recognizing this relativity cultivates intellectual humility. It encourages professionals to question inherited assumptions, seek out diverse perspectives, and design systems that are transparent about what they assume to be fixed and what they expect to change.


## Applying the Principle in Practice

Technology professionals can apply this principle through several concrete habits:

- **Conduct assumption audits**: Periodically review a system's hardcoded values, fixed configurations, and implicit constraints. Ask whether any of them have become variables due to changing requirements.
- **Design for the likely axis of change**: Use experience and domain knowledge to identify which dimensions are most likely to vary over the system's lifetime. Parameterize those dimensions early.
- **Resist over-engineering**: Not every value needs to be configurable. If a value has not changed in five years and there is no foreseeable reason for it to change, keeping it as a constant is appropriate and simpler.
- **Use layered configuration**: Separate compile-time constants, deployment-time configuration, and runtime parameters. This gives each value an appropriate level of flexibility without making the entire system dynamically reconfigurable.
- **Communicate boundaries explicitly**: Whether in code comments, API documentation, or architecture diagrams, make clear which elements are intended to be stable and which are intended to be tuned.


## Related

Professionals interested in this topic may also benefit from exploring related concepts: Alan Perlis's full "Epigrams on Programming" collection, the Open-Closed Principle from SOLID design (software entities should be open for extension but closed for modification), the Twelve-Factor App methodology (particularly its guidance on configuration), feature flag management and progressive delivery, the YAGNI principle (You Aren't Gonna Need It) as a counterbalance to premature generalization, and the concept of accidental versus essential complexity as described by Fred Brooks in "No Silver Bullet."


## Summary

"One person's constant is another person's variable" captures a truth that every technology professional encounters repeatedly: the boundary between what is fixed and what is flexible is determined by context, requirements, and perspective — not by the nature of the value itself. Applying this insight means designing systems with intentional, well-communicated boundaries between constants and variables, conducting regular assumption audits, collaborating across perspectives during design and review, and resisting both the temptation to hardcode everything and the temptation to make everything configurable. The professionals who internalize this principle build systems that are not only correct and efficient but also resilient to the inevitable changes that time, scale, and shifting requirements bring.


## References

- Perlis, Alan. "Epigrams on Programming." ACM SIGPLAN Notices, Vol. 17, No. 9, September 1982, pp. 7-13. Available at: https://www.cs.yale.edu/homes/perlis-alan/quotes.html
- Martin, Robert C. "Design Principles and Design Patterns." Object Mentor, 2000. Discusses the Open-Closed Principle and related SOLID principles.
- Wiggins, Adam. "The Twelve-Factor App." 2011. https://12factor.net/ — Factor III (Config) directly addresses the constant-versus-variable question for deployment.
- Brooks, Frederick P. "No Silver Bullet: Essence and Accidents of Software Engineering." Proceedings of the IFIP Tenth World Computing Conference, 1986. Introduces the distinction between essential and accidental complexity.
- Hunt, Andrew, and David Thomas. "The Pragmatic Programmer." Addison-Wesley, 1999. Covers the DRY principle and the importance of making assumptions explicit.
