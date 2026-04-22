# Gall's Law

Gall's Law is one of the most enduring principles in systems design. Coined by John Gall in his 1975 book *Systemantics: How Systems Work and Especially How They Fail*, it states: **a complex system that works is invariably found to have evolved from a simple system that worked.** The corollary is equally important: a complex system designed from scratch never works and cannot be patched into working. You have to start over with a working simple system. For technology professionals building software, platforms, and organizations, Gall's Law offers a reliable heuristic for managing complexity and reducing the risk of catastrophic failure.

## The Core Principle

The insight behind Gall's Law is deceptively simple. Complex systems have emergent behaviors, hidden interactions, and failure modes that no amount of upfront planning can fully anticipate. When you attempt to design and build a large, intricate system all at once, you are betting that your mental model of the system is correct in every detail before you have any empirical evidence. That bet almost always loses.

Instead, Gall's Law prescribes an evolutionary approach. Begin with a simple system that demonstrably works. Add complexity incrementally, validating each addition against reality. At every stage, the system has been tested and refined, which means each new layer of complexity builds on a proven foundation rather than on assumptions.

This is not an argument against complexity itself. Many valuable systems are deeply complex. The argument is about how you arrive at that complexity: through evolution and iteration, not through grand upfront design.

## Why Complex Systems Fail When Built From Scratch

Several forces conspire against the "design it all first" approach:

- **Unforeseen interactions.** Components that seem independent on a whiteboard often interact in unexpected ways once integrated. These emergent behaviors are nearly impossible to predict without running the actual system.
- **Compounding assumptions.** Each design decision rests on assumptions about requirements, user behavior, load patterns, and environmental constraints. The more decisions you make before validating any of them, the more likely several are wrong simultaneously.
- **Delayed feedback.** A system built entirely before testing provides no feedback until late in the process, when the cost of correcting errors is highest.
- **Integration risk.** Assembling many untested components at once creates a combinatorial explosion of potential failure points, making root cause analysis extremely difficult.
- **Organizational complexity.** Large upfront designs require large teams working in parallel on unvalidated interfaces, increasing coordination overhead and miscommunication.

## Gall's Law Compared to Related Principles

Gall's Law sits within a family of principles that caution against premature complexity. Understanding the distinctions helps you apply the right lens at the right time.

| Principle | Core Idea | Primary Focus |
|---|---|---|
| **Gall's Law** | Complex working systems evolve from simple working systems | System design and architecture |
| **YAGNI** | Don't build features until they are actually needed | Feature scope and requirements |
| **KISS** | Keep designs as simple as possible | Design simplicity |
| **Occam's Razor** | Prefer the simplest explanation that fits the evidence | Reasoning and problem-solving |
| **Second System Effect** | The second system an architect builds tends to be over-engineered | Designer psychology and scope creep |
| **Premature Optimization** | Don't optimize until you have evidence of a bottleneck | Performance engineering |

Gall's Law is broader than most of these. While YAGNI addresses individual features and KISS addresses design aesthetics, Gall's Law addresses the fundamental trajectory of system evolution. It tells you not just to keep things simple, but that simplicity is the only viable starting point for systems that must eventually become complex.

## Applying Gall's Law in Software Engineering

### Start With a Monolith, Not Microservices

One of the most common applications of Gall's Law in modern software architecture is the advice to start with a monolith. Microservices introduce distributed systems complexity: network partitions, eventual consistency, service discovery, distributed tracing, and independent deployment pipelines. Starting with microservices before you understand your domain boundaries means you are distributing complexity across a network before you know where the natural seams are.

A monolith that works gives you a living system where domain boundaries can be discovered empirically. When a module becomes a bottleneck or needs independent scaling, you extract it into a service with confidence because you already understand its interfaces, data access patterns, and failure modes.

### Build a Minimum Viable Product

The Minimum Viable Product (MVP) is Gall's Law applied to product development. Rather than building a fully featured product, you build the smallest version that delivers value to real users. This approach offers several advantages:

- Validates core assumptions about user needs before investing in secondary features
- Generates real usage data that informs subsequent design decisions
- Establishes a working foundation that can absorb additional complexity
- Reduces time-to-market and financial risk

Facebook is a frequently cited example. It began as a basic profile directory for Harvard students. Features like the News Feed, Messenger, Marketplace, and the advertising platform were added incrementally over years. Attempting to design and build the full scope of today's Facebook in 2004 would have been an exercise in futility.

### Evolve Infrastructure Gradually

Infrastructure follows the same pattern. Organizations that attempt to build a fully automated, self-healing, multi-region Kubernetes platform before they have a single application running in production are violating Gall's Law. A more effective path is:

1. Deploy a single application on a single server
2. Add monitoring and alerting once the application is running
3. Introduce containerization when deployment friction becomes a real problem
4. Adopt orchestration when managing containers manually becomes untenable
5. Add multi-region capability when availability requirements demand it

Each step solves a problem that has been observed, not anticipated.

## Common Violations and Their Consequences

| Violation | What Happens | Gall's Law Alternative |
|---|---|---|
| Building a universal data platform before having a single working data pipeline | The platform never ships, or ships and doesn't match real workloads | Build one working pipeline, then generalize |
| Designing a plugin architecture before writing the core application | The abstraction layer doesn't match actual extension points | Build the application, find the extension points, then refactor |
| Adopting event-driven architecture for a system with no proven need for async processing | Debugging becomes nearly impossible due to distributed state | Use synchronous calls, add async where bottlenecks appear |
| Creating a comprehensive API gateway before building any APIs | The gateway's assumptions about routing, auth, and rate limiting don't match real API needs | Build APIs directly, extract common concerns into a gateway later |
| Writing a framework before writing the applications it is supposed to support | The framework solves hypothetical problems instead of real ones | Write three applications, extract the common patterns |

## When Gall's Law Seems Not to Apply

Critics sometimes point to examples of complex systems that appear to have been designed from scratch: the Apollo guidance computer, the Internet Protocol suite, or the Space Shuttle software. On closer inspection, these examples actually reinforce Gall's Law:

- **The Internet protocols** evolved through a series of progressively more capable systems (ARPANET, NCP, then TCP/IP), each building on the validated behaviors of its predecessor.
- **Apollo guidance software** was developed incrementally across multiple missions, with each flight testing and refining subsystems before they were combined.
- **Large infrastructure projects** that genuinely attempt a big-bang approach (healthcare.gov at launch, the FBI's Virtual Case File system) tend to be the cautionary tales, not the success stories.

The lesson holds: what looks like a successful complex system built from scratch is almost always a system whose evolutionary history has been forgotten or compressed in the retelling.

## Practical Guidelines

For technology professionals looking to apply Gall's Law consistently, these guidelines serve as a checklist:

- **Prove the core works first.** Before adding any secondary capability, demonstrate that the primary function of your system operates correctly under real conditions.
- **Add one thing at a time.** Each increment should be small enough that if it breaks the system, the cause is obvious.
- **Validate against reality, not models.** Design documents, architecture diagrams, and whiteboard sessions are useful but not sufficient. Only running systems provide ground truth.
- **Resist the urge to generalize prematurely.** Abstractions should be extracted from working code, not imposed on code that doesn't yet exist.
- **Treat complexity as a cost.** Every layer of abstraction, every additional service, every configuration option is a liability until proven otherwise.
- **Preserve the ability to roll back.** Incremental evolution requires that each step be reversible. If adding a component makes it impossible to return to the previous state, you have taken too large a step.

## Related

Gall's Law connects naturally to several other topics worth exploring. **The Second System Effect** describes the tendency for designers to over-engineer their second attempt at a system, a direct violation of Gall's Law. **YAGNI (You Ain't Gonna Need It)** reinforces the discipline of building only what is currently necessary. **The Law of Leaky Abstractions** explains why complex systems built on unvalidated abstractions tend to fail in unpredictable ways. **Brooks's Law** and **the Ringelmann Effect** illuminate the organizational dynamics that make large upfront designs even harder to execute. **Conway's Law** shows how system structure mirrors team structure, which means incremental system evolution also requires incremental organizational evolution. Finally, **the Lean Startup methodology** and **iterative development practices** such as Agile provide concrete frameworks for putting Gall's Law into practice.

## Summary

Gall's Law is a reminder that complexity must be earned, not assumed. A complex system that works has always evolved from a simple system that worked, because evolution provides the feedback, validation, and course correction that upfront design cannot. For technology professionals, this means starting with the simplest system that delivers value, proving that it works, and then adding complexity incrementally with each addition validated against real-world conditions. The principle applies at every level of abstraction, from individual features to entire platform architectures, and its violations are reliably punished by delays, failures, and systems that never ship. Start simple. Prove it works. Then evolve.

## References

- Gall, John. *Systemantics: How Systems Work and Especially How They Fail*. Quadrangle, 1975. The original source of Gall's Law and a broader exploration of system behavior and failure modes.
- Gall, John. *The Systems Bible: The Beginner's Guide to Systems Large and Small*. General Systemantics Press, 2002. An updated and expanded edition of *Systemantics* with additional examples and commentary.
- Brooks, Frederick P. *The Mythical Man-Month: Essays on Software Engineering*. Addison-Wesley, 1975. Discusses the Second System Effect and other principles closely related to Gall's Law.
- Fowler, Martin. "MonolithFirst." martinfowler.com, 2015. Argues for starting with a monolith before migrating to microservices, directly applying Gall's Law to modern architecture decisions.
- Ries, Eric. *The Lean Startup*. Crown Business, 2011. Provides a practical methodology for iterative product development grounded in the same evolutionary principles as Gall's Law.
- Meadows, Donella H. *Thinking in Systems: A Primer*. Chelsea Green Publishing, 2008. A broader treatment of systems thinking that contextualizes why complex systems resist top-down design.
