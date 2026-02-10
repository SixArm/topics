# Fake (test double)

A fake is a type of test double that provides a working implementation of a dependency, but with simplified or lightweight behavior compared to the real production version. Unlike stubs that return hardcoded values or mocks that verify interaction patterns, fakes contain actual functional logic that mimics the real component. This makes fakes one of the most powerful and realistic forms of test doubles, suitable for integration-style testing where behavioral fidelity matters but full infrastructure is impractical.

## What Is a Fake?

A fake replaces a real dependency with a self-contained, functioning substitute. It honors the same interface or contract as the production component, but takes shortcuts in its internal implementation. For instance, a fake repository might store records in an in-memory dictionary rather than connecting to a relational database. The calling code cannot distinguish the fake from the real thing based on its external behavior, which is precisely the point: the fake provides a realistic stand-in that exercises the same logical paths your production code would follow, without requiring heavyweight infrastructure.

Fakes are not mere placeholders. They maintain internal state, respond dynamically to inputs, and can even enforce constraints such as uniqueness or referential integrity. This behavioral richness distinguishes fakes from simpler test doubles and makes them particularly effective for testing workflows that span multiple operations, such as create-read-update-delete sequences.

## How Fakes Differ from Other Test Doubles

Test doubles come in several varieties, each with a distinct purpose and level of sophistication. Understanding the differences helps you choose the right tool for each testing scenario.

| Test Double | Purpose | Contains Logic | Maintains State | Verifies Calls |
|---|---|---|---|---|
| Dummy | Fills a parameter slot; never actually used | No | No | No |
| Stub | Returns predetermined responses to method calls | Minimal | No | No |
| Spy | Records calls for later inspection | Minimal | Yes (call log) | Yes |
| Mock | Asserts that specific interactions occurred | Minimal | Yes (expectations) | Yes |
| Fake | Provides a simplified but working implementation | Yes | Yes | No |

The critical distinction is that fakes operate with real logic. A stub might always return the same user object regardless of input. A fake user repository, by contrast, would store users that were added, return them when queried by identifier, and raise an error if a requested user does not exist. This behavioral correctness gives fakes a level of trustworthiness that simpler doubles cannot match.

## When to Use Fakes

Fakes are most valuable in scenarios where the dependency's behavior materially affects the correctness of the code under test. Consider using fakes when:

- **The dependency manages state across multiple operations.** If your test involves writing data and later reading it back, a stub cannot capture that relationship, but a fake can.
- **The real dependency is slow, expensive, or unreliable.** External databases, network services, and file systems introduce latency and flakiness. A fake eliminates these concerns while preserving realistic behavior.
- **You need to test edge cases and error conditions.** A fake can be designed to simulate scenarios that are difficult to reproduce with real infrastructure, such as disk-full errors, network timeouts, or constraint violations.
- **You want fast, deterministic test execution.** Fakes run entirely in-process, so tests complete in milliseconds rather than seconds, and they produce the same results every time.
- **Integration-level confidence is needed without full integration infrastructure.** Fakes occupy a middle ground between isolated unit tests and full end-to-end tests, giving you much of the confidence of the latter with the speed of the former.

## Common Examples of Fakes

Fakes appear throughout software testing in predictable patterns, often replacing infrastructure-heavy components with in-process alternatives.

- **In-memory database.** Stores records in a collection such as a list or hash map, supporting queries, inserts, updates, and deletes without any database server.
- **In-memory file system.** Simulates file and directory operations using data structures in memory, avoiding actual disk I/O and enabling tests to run without filesystem side effects.
- **Fake email service.** Captures outgoing messages in an internal list instead of dispatching them over a network, allowing tests to verify that the right emails were composed and addressed.
- **Fake HTTP server.** Responds to HTTP requests with canned or dynamically generated responses based on the request path and payload, removing the need for a live API endpoint.
- **Fake authentication service.** Validates credentials against a predefined set of users and issues tokens without connecting to an identity provider, enabling security-related testing in isolation.
- **Fake clock or timer.** Allows tests to control the passage of time explicitly, making it possible to test time-dependent logic such as expiration, scheduling, or rate limiting without waiting.

## Advantages of Fakes

Fakes deliver several benefits that make them a cornerstone of robust testing strategies:

- **Behavioral fidelity.** Because fakes implement real logic, they catch bugs that simpler doubles would miss, such as incorrect query construction or improper state transitions.
- **Speed.** In-process execution eliminates network round trips, disk access, and process startup costs. Test suites that use fakes routinely run orders of magnitude faster than those relying on real infrastructure.
- **Determinism.** Fakes produce consistent results regardless of external conditions, eliminating flaky tests caused by network glitches, database contention, or environmental differences.
- **Portability.** Tests that use fakes run anywhere without requiring specific infrastructure to be installed and configured, simplifying continuous integration pipelines and developer onboarding.
- **Isolation.** Each test can start with a clean fake, avoiding the pollution and ordering dependencies that plague tests sharing real resources.

## Risks and Tradeoffs

Despite their strengths, fakes introduce risks that must be managed deliberately:

- **Implementation divergence.** A fake that does not keep pace with changes to the real dependency can create a false sense of security. Tests pass against the fake while the production code fails against the real system. Periodic contract tests or conformance tests that run the same assertions against both the fake and the real implementation help mitigate this risk.
- **Development and maintenance cost.** Writing a faithful fake requires understanding the dependency's behavior in detail, and maintaining it as the real system evolves adds ongoing effort. For simple dependencies, a stub or mock may be more cost-effective.
- **Incomplete coverage of production behavior.** By definition, a fake simplifies. It may omit concurrency semantics, transaction isolation levels, or performance characteristics that matter in production. Teams must remain aware of what the fake does not simulate.
- **Overconfidence.** Passing tests against a well-crafted fake can tempt teams to skip integration or end-to-end testing entirely. Fakes complement but do not replace tests against real systems.

## Best Practices

To get the most value from fakes while managing their risks, follow these guidelines:

- **Share the same interface.** The fake and the real implementation should satisfy the same contract, ideally enforced by an interface or abstract type. This guarantees substitutability and makes divergence easier to detect.
- **Write contract tests.** Maintain a suite of tests that run against both the fake and the real implementation. Any test that passes against one but fails against the other signals a divergence that needs correction.
- **Keep fakes simple.** Implement only the behavior your tests actually need. A fake does not need to replicate every nuance of the real system, just enough to exercise the code under test realistically.
- **Version fakes alongside production code.** When the real implementation changes, update the fake in the same commit or pull request to prevent drift.
- **Document limitations.** Make it explicit what the fake does and does not simulate, so that test authors understand the boundaries of the confidence their tests provide.

## Related

After understanding fakes, explore other test doubles in depth: dummies, stubs, spies, and mocks each serve distinct roles in a testing strategy. Study test-driven development and behavior-driven development to see how test doubles fit into broader development workflows. Investigate contract testing and consumer-driven contracts for techniques that keep fakes synchronized with real implementations. Learn about dependency injection and inversion of control, which provide the architectural foundation for substituting fakes at test time. Finally, review integration testing and end-to-end testing to understand where fakes fit in the broader testing pyramid.

## Summary

A fake is a test double that provides a simplified but functionally correct implementation of a dependency, maintaining state and executing real logic without the overhead of production infrastructure. Fakes occupy a unique position among test doubles by offering behavioral realism that stubs and mocks cannot match, while preserving the speed, determinism, and isolation that real dependencies compromise. Their primary tradeoff is the development and maintenance effort required to keep them faithful to the real system, a risk best managed through shared interfaces, contract tests, and disciplined co-evolution with production code. When used thoughtfully, fakes enable fast, reliable, and high-confidence testing that bridges the gap between lightweight unit tests and heavyweight integration tests.

## References

- Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley. The definitive reference on test doubles, including the taxonomy of dummies, stubs, spies, mocks, and fakes.
- Fowler, M. (2007). "Mocks Aren't Stubs." martinfowler.com. https://martinfowler.com/articles/mocksArentStubs.html — A widely cited article clarifying the distinctions among test double types.
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley. Covers the role of test doubles in test-driven development with practical examples.
- Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley. Foundational text on TDD that contextualizes when and why to use various forms of test doubles.
- Google Testing Blog. "Testing on the Toilet: Know Your Test Doubles." https://testing.googleblog.com/ — Short, practical guides on applying test doubles effectively in production codebases.
