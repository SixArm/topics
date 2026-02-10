# Test double

A test double is a simplified implementation used in software testing to replace a real dependency, enabling faster, more reliable, and isolated tests. The term was popularized by Gerard Meszaros in his book *xUnit Test Patterns*, drawing an analogy to stunt doubles in film production. Just as a stunt double stands in for an actor during dangerous scenes, a test double stands in for a real component during automated testing. Test doubles allow developers to control the behavior of dependencies, verify interactions between components, and ensure that the system under test can be exercised in isolation without requiring access to databases, network services, file systems, or other external resources.

## Why test doubles matter

Testing software in isolation is a cornerstone of effective unit testing. When a class or function depends on external systems, those dependencies introduce variability, latency, and fragility into the test suite. A test that calls a real database may fail because the database is down, not because the code is wrong. A test that contacts a remote API may be slow, flaky, or rate-limited. Test doubles eliminate these problems by replacing real dependencies with controlled substitutes that behave predictably.

Beyond reliability, test doubles enable developers to simulate edge cases and error conditions that would be difficult or impossible to reproduce with real systems. You can force a test double to throw an exception, return an empty result, or simulate a timeout, allowing you to verify that your code handles these scenarios correctly. This makes the test suite far more thorough than one that relies solely on real integrations.

## Types of test doubles

There are five widely recognized types of test doubles, each serving a distinct purpose. The following table summarizes their characteristics:

| Type | Purpose | Behavior | Verification |
|------|---------|----------|--------------|
| Dummy | Fill parameter lists | No implementation | Not used in assertions |
| Fake | Provide working shortcut | Simplified but functional | Verified through output |
| Stub | Supply predetermined data | Returns fixed responses | State-based verification |
| Spy | Record interaction details | Wraps or replaces real object | Inspected after execution |
| Mock | Enforce expected interactions | Pre-programmed expectations | Fails test if expectations unmet |

## Dummy

A dummy is the simplest form of test double. It contains no meaningful implementation and exists solely to satisfy a method signature, constructor parameter, or interface requirement. A dummy is passed around but never actually exercised during the test. For example, if a function requires three arguments but the test only exercises logic related to one of them, the other two can be dummies. Dummies keep tests compiling and running without introducing unnecessary complexity.

## Fake

A fake contains a working but simplified implementation of the real component it replaces. Unlike a dummy or stub, a fake actually processes input and produces output, but it takes shortcuts that make it unsuitable for production use. Common examples include:

- An in-memory database that replaces a production relational database
- A local file-based message queue that replaces a distributed messaging system
- A simplified authentication service that accepts any credentials
- A hash map-based repository that replaces a persistent data store

Fakes are valuable when the test needs realistic behavior from a dependency but cannot afford the overhead of the real system. They are typically reused across many tests and sometimes maintained as shared test infrastructure.

## Stub

A stub provides predetermined responses to method calls made during a test. The tester configures the stub to return specific values or throw specific exceptions, controlling the conditions under which the system under test operates. Stubs enable state-based testing: you set up the dependency to return known data, exercise the system under test, and then assert that the output or state is correct.

Stubs are particularly useful for:

- Simulating specific return values from a service layer
- Forcing error conditions such as timeouts or null results
- Controlling the data flowing into the system under test without relying on external state
- Testing branching logic that depends on the output of a dependency

## Spy

A spy records information about how it was used during a test. It captures details such as which methods were called, how many times each method was invoked, and what arguments were passed. After the system under test has been exercised, the test inspects the spy to verify that the correct interactions took place.

A spy can either wrap a real object, allowing the real implementation to execute while recording calls, or it can provide its own lightweight implementation. Spies are well suited for verifying side effects such as logging, event publishing, or notification sending, where the important thing is not the return value but whether the interaction occurred.

## Mock

A mock is pre-programmed with expectations about how it should be called. Before the test runs, the developer specifies which methods should be invoked, in what order, with what arguments, and how many times. After the system under test executes, the mock verifies that all expectations were met. If any expectation is violated, the mock causes the test to fail.

Mocks support behavior-based verification, focusing on how the system under test interacts with its dependencies rather than on what state results from those interactions. This makes mocks powerful for verifying protocols, contracts, and communication patterns between components. However, overuse of mocks can lead to brittle tests that break when internal implementation details change, even if the external behavior remains correct.

## Choosing the right test double

Selecting the appropriate type of test double depends on what the test needs to verify and how tightly coupled the test should be to the implementation.

| Scenario | Recommended double | Rationale |
|----------|-------------------|-----------|
| Parameter not relevant to test | Dummy | Keeps the test simple and focused |
| Need realistic but lightweight behavior | Fake | Provides functional substitute without production overhead |
| Need to control input data | Stub | Enables precise control over dependency responses |
| Need to verify a side effect occurred | Spy | Records interactions for post-execution inspection |
| Need to enforce a specific interaction protocol | Mock | Validates the exact sequence and pattern of calls |

A general guideline is to prefer the simplest test double that satisfies the test's requirements. Dummies and stubs are low-ceremony and easy to maintain. Fakes require more upfront investment but pay dividends across large test suites. Spies and mocks introduce coupling to implementation details and should be used judiciously.

## Common pitfalls

- **Over-mocking**: Writing tests that mock every dependency, resulting in tests that verify wiring rather than behavior. These tests break frequently during refactoring even when functionality is preserved.
- **Testing the mock instead of the code**: Constructing elaborate mock setups that effectively duplicate the production logic, making the test a tautology.
- **Ignoring integration boundaries**: Relying exclusively on test doubles without ever testing real integrations. Test doubles verify that components work in isolation, but integration tests are still necessary to verify that components work together.
- **Shared mutable fakes**: Using a single fake instance across tests without resetting state, causing hidden coupling between tests and intermittent failures.

## Related

Related topics to explore next include unit testing and integration testing, which provide the broader context in which test doubles operate. Dependency injection is the design technique that makes it practical to substitute test doubles for real dependencies. Behavior-driven development and test-driven development are methodologies that rely heavily on test doubles to guide design. Mock object frameworks such as Mockito, Moq, and unittest.mock provide library-level support for creating and verifying test doubles. Contract testing and consumer-driven contracts address the challenge of ensuring that test doubles remain faithful representations of the real components they replace.

## Summary

Test doubles are indispensable tools for writing fast, reliable, and focused automated tests. The five types, dummy, fake, stub, spy, and mock, form a spectrum from simple placeholders to sophisticated interaction verifiers. Each type serves a distinct purpose: dummies fill parameters, fakes provide lightweight implementations, stubs control input data, spies record interactions, and mocks enforce behavioral expectations. Choosing the right test double for each situation keeps tests maintainable and meaningful, while avoiding common pitfalls such as over-mocking ensures that the test suite remains a trustworthy safety net for the codebase.

## References

- Meszaros, Gerard. *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley, 2007.
- Fowler, Martin. "Mocks Aren't Stubs." martinfowler.com, 2007. https://martinfowler.com/articles/mocksArentStubs.html
- Freeman, Steve, and Nat Pryce. *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley, 2009.
- Beck, Kent. *Test-Driven Development: By Example*. Addison-Wesley, 2002.
- Osherove, Roy. *The Art of Unit Testing*. Manning Publications, 2013.
