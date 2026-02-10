# Stub (test double)

A stub is a type of test double that provides a simplified implementation of a component, replacing a real dependency during testing. Stubs simulate the behavior of actual system components — such as databases, web services, or external APIs — without executing their full functionality. By returning predetermined responses instead of performing real operations, stubs allow developers and testers to isolate the unit under test and verify its logic in a controlled, predictable environment.

## Why Stubs Matter

Testing software in isolation is a foundational principle of unit testing. Real dependencies introduce variability: a database might be temporarily unavailable, a third-party API might return different results depending on time of day, or a network call might introduce latency that slows down a test suite. Stubs eliminate these variables by standing in for the real dependency and returning fixed, known values. This makes test results deterministic and repeatable, which is essential for continuous integration pipelines and rapid development workflows.

## How Stubs Work

A stub intercepts calls that would normally reach a real component and instead returns a preconfigured response. The stub does not contain the business logic of the real component; it only mimics the interface. When the system under test calls a method on the stub, the stub returns a hardcoded or preconfigured value, regardless of the input. This allows the tester to control exactly what data flows through the system during a test, making it straightforward to exercise specific code paths, including edge cases and error conditions.

## Key Characteristics of Stubs

- **Predefined responses**: Stubs return fixed, predetermined values rather than computing results dynamically.
- **State-based testing**: Stubs support verifying the state of the system after an operation, rather than verifying which methods were called.
- **No behavior verification**: Unlike mocks, stubs do not track whether or how they were invoked. They exist solely to supply data.
- **Simplified implementation**: Stubs implement only the interface needed by the code under test, ignoring unrelated methods or functionality.
- **Isolation of dependencies**: Stubs decouple the unit under test from external systems, databases, file systems, and network services.

## Stubs Compared to Other Test Doubles

| Test Double | Purpose | Verification Style | Typical Use Case |
|---|---|---|---|
| **Stub** | Returns predefined data to the caller | State-based (check output or resulting state) | Simulating a database query that returns specific rows |
| **Mock** | Verifies that specific interactions occurred | Behavior-based (check method calls and arguments) | Ensuring a notification service was called exactly once |
| **Fake** | Provides a working but simplified implementation | Functional (operates like the real thing, in memory) | An in-memory database replacing a production database |
| **Dummy** | Fills a required parameter slot without being used | None (never actually invoked) | Passing a placeholder object to satisfy a constructor signature |
| **Spy** | Records interactions for later inspection | Behavior-based (retrospective call analysis) | Logging which methods were called and in what order |

The key distinction is that stubs are passive: they supply data but do not assert anything about how they were used. Mocks are active: they fail the test if expected interactions did not occur. This makes stubs simpler to set up and maintain, while mocks are better suited for verifying collaboration between objects.

## When to Use Stubs

Stubs are most valuable in the following scenarios:

- **External service dependencies**: When your code calls a remote API, payment gateway, or third-party service, a stub can return known responses without making network calls.
- **Slow or expensive operations**: Database queries, file system reads, or complex computations can be replaced with stubs to keep tests fast.
- **Error condition testing**: Stubs make it easy to simulate failures such as timeouts, null responses, or exception states that would be difficult to trigger with real systems.
- **Nondeterministic behavior**: When a dependency produces results that vary (such as random number generators or current timestamps), a stub provides consistency.
- **Early-stage development**: When a dependency has not yet been implemented, a stub allows parallel development by standing in for the missing component.

## Common Pitfalls

Stubs are powerful, but misuse can lead to problems. Overly detailed stubs that replicate significant business logic risk becoming maintenance burdens that drift out of sync with the real implementation. Tests that rely too heavily on stubs may pass consistently yet fail to catch integration issues, because the stub does not behave exactly like the real dependency. It is important to complement stub-based unit tests with integration tests that exercise the real components together.

Another common mistake is stubbing too broadly. When every dependency in a test is stubbed, the test may verify very little meaningful behavior. The goal is to stub only the dependencies that are outside the scope of what you are testing, while allowing the code under test to execute its real logic.

## Related

Related topics to explore next include mock test doubles and behavior verification, spy test doubles and call recording, fake test doubles and lightweight implementations, dummy test doubles and parameter placeholders, test-driven development practices, dependency injection as a technique for substituting test doubles, and integration testing strategies that complement unit tests using stubs.

## Summary

A stub is a passive test double that replaces a real dependency with a simplified stand-in returning predefined responses. Stubs enable state-based testing by isolating the unit under test from external systems, producing fast, deterministic, and repeatable test results. They are distinct from mocks, which verify behavior, and from fakes, which provide working simplified implementations. When used judiciously alongside integration tests, stubs are an essential tool for building reliable, maintainable test suites.

## References

- Meszaros, Gerard. *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley, 2007. The definitive reference for test double terminology including stubs, mocks, fakes, dummies, and spies.
- Fowler, Martin. "Mocks Aren't Stubs." martinfowler.com, 2007. https://martinfowler.com/articles/mocksArentStubs.html — A widely cited article clarifying the differences between stubs and mocks.
- Freeman, Steve, and Nat Pryce. *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley, 2009. Covers practical use of test doubles in test-driven development workflows.
- Beck, Kent. *Test-Driven Development: By Example*. Addison-Wesley, 2002. Foundational text on TDD practices that frequently employs stubs and other test doubles.
