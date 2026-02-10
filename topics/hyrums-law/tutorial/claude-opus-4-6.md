# Hyrum's Law

Hyrum's Law is a principle of software engineering that captures an uncomfortable truth about how systems evolve under real-world usage. Coined by Google engineer Hyrum Wright, the law states: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." This insight has profound consequences for anyone who builds, maintains, or depends on software interfaces. Understanding Hyrum's Law is essential for technology professionals who design APIs, manage platform migrations, or make architectural decisions about long-lived systems.

## The Core Principle

At its heart, Hyrum's Law describes the gap between a system's intended contract and its actual observed behavior. Every piece of software has documented guarantees — the explicit API contract — and a much larger surface of implicit behaviors: response ordering, error message formatting, timing characteristics, side effects, and even bugs. As the user base grows, some subset of users will inevitably come to depend on those implicit behaviors, whether consciously or not. Once that dependency exists, changing the behavior — even if it was never promised — becomes a breaking change in practice.

This means that the effective contract of a system is not what the documentation says. It is the union of all observable behaviors, because someone, somewhere, is relying on each of them.

## Why It Happens

Several forces drive the phenomenon that Hyrum's Law describes:

- **Discovery through usage.** Developers explore APIs by experimentation. When they observe a behavior that solves their problem, they use it, regardless of whether it is documented.
- **Undocumented consistency.** If an API returns results in a particular order, consumers will write code that assumes that order, even if the documentation makes no ordering guarantee.
- **Error message parsing.** Users parse error strings for programmatic decision-making, coupling themselves to the exact wording of messages that were intended only for human readers.
- **Performance characteristics as contracts.** If a function historically returns within 5 milliseconds, callers may set tight timeouts that break when the implementation changes.
- **Bug compatibility.** When a bug has existed long enough, downstream systems compensate for it. Fixing the bug then breaks those systems.

## Documented vs. Observable Contract

The distinction between what a system promises and what it actually does is central to understanding Hyrum's Law.

| Aspect | Documented Contract | Observable Contract |
|---|---|---|
| Definition | Explicitly stated guarantees in API docs, specs, or type signatures | Every behavior a user can detect through interaction |
| Scope | Narrow and intentional | Broad and often accidental |
| Stability expectation | Provider commits to maintaining it | No commitment, but users depend on it anyway |
| Examples | Function signatures, return types, status codes | Response ordering, whitespace formatting, timing |
| Change risk | Low risk if contract is honored | High risk because hidden dependencies exist |
| Discoverability | Read the documentation | Observe the system, read the source, run experiments |

## Real-World Consequences

Hyrum's Law has practical consequences that technology professionals encounter regularly:

- **Costly migrations.** Large-scale API version upgrades become expensive because consumers depend on behaviors that were never part of the contract, requiring extensive compatibility analysis.
- **Semantic versioning limitations.** Semantic versioning assumes a clear boundary between breaking and non-breaking changes. Hyrum's Law blurs that boundary, because any change to observable behavior can break someone.
- **Defensive API design.** Teams begin deliberately randomizing non-guaranteed behaviors — such as shuffling result ordering — to prevent users from depending on them.
- **Slow deprecation cycles.** Removing deprecated features takes far longer than expected because implicit dependencies surface only after the change ships.
- **Testing complexity.** Teams must test not only the documented contract but also the observable behaviors that users have come to rely on.

## Strategies for Managing Hyrum's Law

While Hyrum's Law cannot be eliminated, its impact can be managed through deliberate engineering practices:

- **Minimize the observable surface.** Return only what is necessary. Avoid exposing internal state, implementation details, or ordering guarantees that are not part of the contract.
- **Randomize non-contractual behavior.** If result ordering is not guaranteed, actively shuffle results so that no consumer can build a stable dependency on order.
- **Use opaque types and encapsulation.** Prevent users from inspecting or depending on internal representations by hiding implementation details behind well-defined interfaces.
- **Version aggressively and communicate clearly.** When changes to observable behavior are unavoidable, provide migration guides, deprecation warnings, and transition periods.
- **Invest in contract testing.** Use consumer-driven contract tests and integration tests to detect when observable behaviors shift in ways that affect downstream systems.
- **Treat bug fixes as potential breaking changes.** Evaluate every bug fix through the lens of Hyrum's Law: someone may be depending on the broken behavior.

## Hyrum's Law Compared to Related Principles

Hyrum's Law shares intellectual space with several other software engineering principles, but addresses a distinct concern.

| Principle | Focus | Relationship to Hyrum's Law |
|---|---|---|
| Postel's Law (Robustness Principle) | Be liberal in what you accept, conservative in what you send | Encourages tolerance of variation, but can amplify Hyrum's Law by accepting malformed input that users then depend on |
| Goodhart's Law | When a measure becomes a target, it ceases to be a good measure | Both describe emergent misuse; Goodhart's applies to metrics, Hyrum's to interfaces |
| Leaky Abstractions (Spolsky) | All non-trivial abstractions leak implementation details | Leaky abstractions create the observable behaviors that Hyrum's Law warns about |
| Conway's Law | System design mirrors organizational communication structure | Conway's explains structural coupling; Hyrum's explains behavioral coupling |
| Liskov Substitution Principle | Subtypes must be substitutable for their base types | LSP defines formal contracts; Hyrum's Law shows that users enforce a broader, informal contract |

## Related

Technology professionals studying Hyrum's Law should also explore related topics including API design and versioning strategies, semantic versioning and its limitations, Postel's Law and the robustness principle, Conway's Law and organizational coupling, the concept of leaky abstractions, backward compatibility patterns, contract testing and consumer-driven contracts, deprecation strategies for long-lived systems, and software entropy and technical debt management.

## Summary

Hyrum's Law reveals that the true contract of any sufficiently popular system is not what the documentation promises but what the system observably does. As user bases grow, every detectable behavior — intended or not — becomes a dependency that constrains future evolution. Technology professionals who internalize this principle will design narrower interfaces, defend against implicit coupling, plan for the hidden cost of change, and ultimately build systems that are more resilient to the inevitable pressures of real-world adoption.

## References

- Wright, Hyrum. "Hyrum's Law." https://www.hyrumslaw.com/
- Winters, Titus, Tom Manshreck, and Hyrum Wright. *Software Engineering at Google: Lessons Learned from Programming Over Time*. O'Reilly Media, 2020.
- Wright, Hyrum. "The Law of Implicit Interfaces." Google Testing Blog, 2012.
- Spolsky, Joel. "The Law of Leaky Abstractions." Joel on Software, 2002.
- Preston-Werner, Tom. "Semantic Versioning 2.0.0." https://semver.org/
