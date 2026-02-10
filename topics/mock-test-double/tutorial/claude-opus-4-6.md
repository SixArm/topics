# Mock (test double)

A mock is a type of test double that provides a simulated implementation of a real component, used to isolate the code under test from its dependencies. Unlike simpler test doubles that merely return canned responses, mocks set explicit expectations about how the system under test should interact with its collaborators. They verify not just the final state of a computation, but the behavioral contract between components. Mocks are a cornerstone of interaction-based testing and are widely supported by testing frameworks across all major programming languages.

## How Mocks Work

A mock object is configured before a test runs with a set of expectations. These expectations define which methods should be called, how many times each method should be invoked, what arguments each call should receive, and optionally in what order the calls should occur. When the test executes, the mock framework records every interaction with the mock object. After the code under test has finished, a verification step compares actual interactions against the predefined expectations. If any expectation is unmet or any unexpected call is made, the test fails with a descriptive error message.

This approach shifts the focus of testing from asserting on outputs (state verification) to asserting on communication patterns (behavior verification). The distinction is significant: state verification asks "did the system produce the right result?" while behavior verification asks "did the system talk to its collaborators correctly?"

## Mocks Compared to Other Test Doubles

Mocks are one of several kinds of test doubles. Each serves a different purpose in isolating the code under test.

| Test Double | Purpose | Verification Style |
|---|---|---|
| **Dummy** | Fills a required parameter but is never actually used | None |
| **Stub** | Returns predefined values to guide the code under test down a specific path | State verification |
| **Spy** | Records interactions for later inspection by the test | State verification of recorded calls |
| **Mock** | Sets expectations before execution and verifies interactions automatically | Behavior verification |
| **Fake** | Provides a lightweight working implementation (e.g., in-memory database) | State verification against the fake |

The key differentiator for mocks is that expectations are declared upfront and verified automatically by the framework, rather than being asserted manually after the fact as with spies.

## When to Use Mocks

Mocks are most valuable in specific situations where direct testing against real dependencies is impractical or undesirable:

- **External system boundaries.** When the code under test communicates with databases, web services, message queues, or file systems, mocks eliminate the need for complex environment setup and make tests fast and deterministic.
- **Verifying outgoing commands.** When the important behavior is that the system sends the right message to a collaborator (e.g., confirming that an email service was called with the correct recipient and body), mocks are the natural choice.
- **Slow or unreliable dependencies.** When a real dependency introduces latency or intermittent failures, mocks keep the test suite fast and stable.
- **Third-party APIs with rate limits or costs.** When calling a real API would incur charges or hit quotas, mocks provide a safe alternative during development and continuous integration.
- **Forcing error conditions.** When the test needs to simulate failures such as network timeouts, permission errors, or malformed responses that are difficult to trigger with real components.

## When to Avoid Mocks

Mocks are not always the right tool. Overuse introduces its own set of problems:

- **Implementation coupling.** Mocks tie tests to internal implementation details. If the code under test is refactored to call methods in a different order or use a different collaborator, mock-based tests break even though the external behavior is unchanged.
- **False confidence.** A passing mock-based test proves that the code sends the right messages, but does not prove that the real collaborator will respond correctly. Integration tests remain necessary to verify end-to-end behavior.
- **Test complexity.** Elaborate mock setups can make tests harder to read and maintain than the production code they verify. When a test requires dozens of lines of mock configuration, it is often a signal that the design needs simplification.
- **Value objects and simple logic.** When the dependency is a straightforward calculation or data structure with no side effects, using the real object is simpler and more reliable than mocking it.

## Best Practices

Effective use of mocks requires discipline and design awareness:

- **Mock roles, not objects.** Define expectations in terms of interfaces and contracts rather than concrete classes. This keeps tests resilient to refactoring.
- **Keep expectations minimal.** Specify only the interactions that matter for the specific behavior being tested. Avoid asserting on call order unless ordering is part of the contract.
- **Prefer stubs for queries, mocks for commands.** When a collaborator returns data without side effects, a stub is sufficient. Reserve mocks for calls that trigger side effects or send outgoing commands.
- **Use mocks as a design feedback tool.** Difficult mock setups often reveal design problems such as excessive coupling, violations of the single responsibility principle, or missing abstractions.
- **Complement with integration tests.** Mock-based unit tests verify component interactions in isolation. Integration tests verify that real components work together. Both are necessary for a robust test suite.

## Classical Testing vs. Mockist Testing

The testing community recognizes two broad schools of thought regarding the use of mocks:

| Aspect | Classical (Detroit) School | Mockist (London) School |
|---|---|---|
| **Default test double** | Real objects and fakes | Mocks for all collaborators |
| **Verification style** | State verification | Behavior verification |
| **Test isolation** | Tests may share real dependencies | Each unit is tested in strict isolation |
| **Design feedback** | Comes from difficulty writing tests | Comes from difficulty setting up mocks |
| **Failure diagnosis** | Failures may cascade across tests | Failures are localized to one unit |
| **Refactoring resilience** | Higher, since tests focus on outcomes | Lower, since tests are coupled to interactions |

Neither school is universally superior. Many experienced practitioners adopt a pragmatic blend, choosing the style that best fits each testing scenario.

## Related

Topics to explore next include test doubles more broadly, including stubs, spies, fakes, and dummy objects. Behavior-driven development (BDD) builds on many of the same interaction-verification ideas. Test-driven development (TDD) provides the workflow context in which mocks are most commonly used. Integration testing and end-to-end testing complement mock-based unit testing by verifying real component collaboration. Dependency injection and inversion of control are the design patterns that make mock-based testing practical.

## Summary

A mock is a test double that sets behavioral expectations before test execution and automatically verifies that the code under test interacts with its dependencies in the prescribed way. Mocks excel at verifying outgoing commands, isolating units from slow or unreliable external systems, and providing rapid design feedback through the discomfort of complex setups. Their primary risk is coupling tests to implementation details, which can make test suites brittle under refactoring. The most effective testing strategies use mocks judiciously at system boundaries and for command verification, complement them with stubs for simpler query dependencies, and back everything with integration tests that exercise real collaborators end to end.

## References

- Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley. The definitive reference for test double terminology including mocks, stubs, fakes, spies, and dummies.
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley. The foundational text for the mockist (London) school of test-driven development.
- Fowler, M. (2007). "Mocks Aren't Stubs." [https://martinfowler.com/articles/mocksArentStubs.html](https://martinfowler.com/articles/mocksArentStubs.html). A widely cited article clarifying the distinction between mocks and other test doubles, and between classical and mockist testing.
- Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley. Presents the classical school of TDD with emphasis on state verification and real collaborators.
- Mockito documentation. [https://site.mockito.org/](https://site.mockito.org/). A popular Java mocking framework that illustrates modern mock API design conventions.
