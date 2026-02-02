## Hyrum's Law

Hyrum's Law is a fundamental principle in software engineering that describes the inevitable coupling between API providers and their consumers. Named after Hyrum Wright, a software engineer at Google who articulated this observation in 2011, the law states:

> "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody."

This principle reveals a critical truth about software at scale: your documented interface is not your actual interface—your observable behavior is.

## The Core Concept

When you publish an API, library, or service, you create two distinct interfaces:

- **The explicit interface**: What you document, promise, and intend users to rely upon
- **The implicit interface**: Every observable behavior, including side effects, timing characteristics, error message formats, and even bugs

Hyrum's Law asserts that with sufficient users, someone will depend on every aspect of the implicit interface. This transforms unintended behaviors into de facto guarantees that become increasingly difficult to change.

## Why This Happens

Several factors drive this phenomenon:

| Factor | Description |
|--------|-------------|
| **Scale** | More users means more diverse use cases, increasing the probability that edge behaviors get discovered and relied upon |
| **Desperation** | Developers facing deadlines will use whatever works, documented or not |
| **Observation** | Users cannot distinguish between intentional and accidental behavior—they see only what the system does |
| **Testing** | Test suites encode actual behavior, making any change a potential breaking change |
| **Documentation gaps** | Undocumented behavior leaves users to experiment and infer contracts |

## Real-World Examples

Hyrum's Law manifests in predictable patterns:

- **Error message parsing**: Users write code that parses specific error message strings, breaking when messages are improved
- **Response ordering**: APIs that return unordered collections find users depending on the incidental ordering
- **Timing dependencies**: Performance improvements can break code that inadvertently relied on slower execution
- **Bug compatibility**: Fixing a bug breaks users who worked around it or depended on the buggy behavior
- **Side effect dependencies**: Users rely on observable side effects like logging output, temp file creation, or memory allocation patterns

## Implications for API Design

Hyrum's Law fundamentally changes how you should approach API development:

| Practice | Rationale |
|----------|-----------|
| **Minimize observable surface** | Every behavior you expose becomes a potential dependency |
| **Randomize non-guaranteed behavior** | Shuffle unordered collections, vary timing, rotate internal identifiers |
| **Version aggressively** | Accept that breaking changes require new versions |
| **Treat bugs as features once deployed** | Acknowledge that "fixing" may require deprecation cycles |
| **Invest in compatibility testing** | Test against real-world usage patterns, not just documented contracts |

## The Semver Paradox

Semantic versioning promises that minor and patch releases maintain backward compatibility. Hyrum's Law reveals this is largely aspirational:

- **Any change can break someone**: If your change alters observable behavior, it is breaking for some subset of users
- **Major versions are expensive**: The friction of major version upgrades means users avoid them, compounding dependency on old behaviors
- **Compatibility is a spectrum**: You must choose which users you are willing to break

## Mitigation Strategies

While you cannot escape Hyrum's Law, you can manage its effects:

- **Explicit instability markers**: Clearly designate experimental features and honor those designations
- **Compatibility test suites**: Maintain tests that verify expected behavior across versions
- **Gradual deprecation**: Provide migration paths and warning periods before removing behaviors
- **Sealed interfaces**: Limit extension points to reduce the surface area users can depend on
- **Changelogs with migration guides**: Document not just what changed, but how to adapt
- **Telemetry**: Understand how your API is actually used, not just how you intended it to be used

## Hyrum's Law vs. Related Principles

| Principle | Focus | Relationship to Hyrum's Law |
|-----------|-------|----------------------------|
| **Postel's Law** | Be liberal in what you accept, conservative in what you send | Increases implicit interface by accepting more inputs |
| **Liskov Substitution** | Subtypes must be substitutable for base types | Defines formal contracts; Hyrum's Law shows actual contracts are broader |
| **Law of Leaky Abstractions** | Abstractions expose underlying complexity | Explains why implementation details become dependencies |
| **Conway's Law** | Systems reflect organizational structure | Organizational boundaries create API boundaries where Hyrum's Law applies |

## Organizational Implications

Hyrum's Law has consequences beyond code:

- **Slower iteration**: Changes require more careful analysis and broader communication
- **Technical debt accumulation**: Maintaining compatibility with unintended behaviors increases complexity
- **Coordination costs**: Breaking changes require synchronization across teams and organizations
- **Documentation burden**: Implicit interfaces should eventually become explicit documentation

## Key Takeaways

- Every observable behavior of your system is part of your interface, whether you intended it or not
- Scale amplifies this effect—the more users, the more complete the coverage of your implicit interface
- Prevention is more effective than cure: design for minimal observable surface from the start
- Accept that backward compatibility is never absolute; make deliberate choices about which users you support
- Document actual behavior, not just intended behavior, to give users accurate expectations

Hyrum's Law is not a problem to solve but a reality to acknowledge. The most successful API designers internalize this principle and build systems that account for the gap between specification and observation.
