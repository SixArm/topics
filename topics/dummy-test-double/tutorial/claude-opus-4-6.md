# Dummy (test double)

## Introduction

A dummy is a type of test double that serves as a simple placeholder object, passed into a method or constructor solely to satisfy parameter requirements. Unlike other test doubles, a dummy is never actually exercised during test execution. It carries no logic, returns no values, and tracks no interactions. Its entire purpose is to fill a slot so the code under test can compile and run, while the test itself focuses on entirely different behavior. Despite its simplicity, the dummy plays an important role in maintaining clean, focused unit tests by preventing unnecessary complexity in test setup.

## What Is a Test Double?

A test double is any object that stands in for a real dependency during testing. The term, coined by Gerard Meszaros in *xUnit Test Patterns*, draws an analogy to stunt doubles in filmmaking: the substitute looks enough like the real thing to get the job done, but it is purpose-built for a controlled scenario. Test doubles allow developers to isolate the system under test from external dependencies such as databases, network services, file systems, and other components that would make tests slow, brittle, or nondeterministic.

Test doubles come in several varieties, each with a distinct level of behavior and verification capability. The dummy is the simplest of these varieties.

## Types of Test Doubles

The following table compares the five canonical types of test doubles, highlighting how the dummy fits into the broader landscape.

| Type | Purpose | Contains Logic | Verifies Behavior | Typical Use |
|------|---------|---------------|-------------------|-------------|
| **Dummy** | Fill parameter lists | No | No | Satisfying signatures where the argument is irrelevant |
| **Stub** | Provide canned responses | Minimal | No | Returning predetermined data to drive a specific code path |
| **Spy** | Record interactions | Minimal | Yes (after the fact) | Capturing calls for later assertion |
| **Mock** | Verify expected interactions | Yes | Yes (up front) | Asserting that specific methods were called with specific arguments |
| **Fake** | Provide working alternative | Yes | No | Lightweight in-memory implementations of heavyweight services |

The dummy stands apart because it is entirely inert. Every other test double participates in the test in some meaningful way; the dummy does not.

## How Dummies Work

A dummy object is created with the minimum effort necessary to satisfy a type constraint. In statically typed languages, this typically means instantiating a class or providing a null reference. In dynamically typed languages, it may be as simple as passing `nil`, `None`, `null`, or an empty object literal.

Key characteristics of a dummy:

- **No behavior**: A dummy does not respond to method calls in any meaningful way. If a method is invoked on it, the result is typically an error or a default no-op.
- **No state**: A dummy holds no data and maintains no internal state between interactions.
- **No verification**: Unlike mocks and spies, a dummy is never inspected after the test runs. There are no assertions against it.
- **Minimal creation cost**: Because a dummy does nothing, it requires almost no setup or configuration.

The defining rule is straightforward: if your test ever actually uses the object, it is not a dummy. The moment the placeholder participates in logic, returns a value the test depends on, or is checked for interactions, it has become a stub, fake, mock, or spy.

## When to Use a Dummy

Dummies are most valuable in the following situations:

- **Satisfying constructor signatures**: A class under test requires injected dependencies, but only some of those dependencies are relevant to the current test case. The irrelevant ones can be dummies.
- **Filling collection or list parameters**: A method accepts a list of collaborators, but the behavior being tested does not interact with every item in the list.
- **Complying with interface contracts**: A method signature demands an argument of a particular interface type, but the test scenario never triggers the code path that calls methods on that argument.
- **Reducing test noise**: Replacing complex real objects with dummies keeps the test's arrange section short and signals to the reader which dependencies matter and which do not.

## Dummies Compared to Null Values

A natural question is whether passing `null` (or its equivalent) is the same as using a dummy. The answer depends on context.

| Approach | Advantage | Risk |
|----------|-----------|------|
| **Passing null** | Zero setup effort | May trigger null-pointer exceptions if the object is unexpectedly accessed |
| **Using a dummy object** | Clearly communicates intent; can provide safe no-op methods | Slightly more setup, though usually trivial |

In many cases, passing `null` works perfectly well and is the simplest form of a dummy. However, when the code under test might defensively call a method on the parameter, a purpose-built dummy with no-op methods prevents accidental failures and makes the test's intent more explicit.

## Common Mistakes with Dummies

- **Accidentally relying on dummy behavior**: If a test passes because a dummy returns a default value that happens to satisfy a condition, the test is fragile and misleading. The dummy should truly be unused.
- **Confusing dummies with stubs**: When you find yourself configuring return values on a "dummy," you have created a stub. Use the correct terminology to keep communication clear within the team.
- **Over-engineering dummy creation**: Dummies should be the simplest objects possible. Building elaborate dummy factories defeats the purpose.
- **Ignoring framework support**: Most modern testing frameworks and mocking libraries can generate dummies automatically. Leveraging these tools reduces boilerplate.

## Best Practices

- Name your dummy variables clearly (e.g., `unusedLogger`, `irrelevantRepository`) so that readers immediately understand the object is not part of the test's core logic.
- If a dummy is used across many tests in a suite, extract it into a shared fixture or helper to avoid repetition.
- Treat any interaction with a dummy as a design signal. If a test starts needing the dummy to do something, reconsider whether the system under test has too many responsibilities or whether the test scope is too broad.
- Prefer the simplest possible implementation: a null reference when safe, an empty object when null is unsafe, and a framework-generated double when the interface is complex.

## Related

To deepen your understanding of test doubles and testing strategy, explore these related topics: stubs and how they provide canned responses to guide code paths, mocks and the practice of behavior verification, spies and how they passively record interactions for later assertions, fakes and their role as lightweight working implementations, the Arrange-Act-Assert pattern for structuring tests, dependency injection as the architectural enabler of test doubles, and Martin Fowler's distinction between classical and mockist testing styles.

## Summary

A dummy is the simplest and most passive form of test double. It exists solely to satisfy parameter requirements and is never exercised by the test. Because it carries no logic, maintains no state, and supports no verification, it serves as a clear signal to readers that a particular dependency is irrelevant to the scenario under test. When used correctly, dummies reduce test setup complexity, improve readability, and help developers focus on the behavior that actually matters. The key discipline is ensuring that a dummy remains truly unused; the moment it participates in test logic, it has graduated to a more active form of test double.

## References

- Meszaros, Gerard. *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley, 2007. The definitive source for test double taxonomy, including the formal definition of dummies, stubs, mocks, fakes, and spies.
- Fowler, Martin. "Mocks Aren't Stubs." martinfowler.com, 2007. https://martinfowler.com/articles/mocksArentStubs.html — A widely cited article clarifying the differences among test double types and the classical versus mockist testing philosophies.
- Freeman, Steve, and Nat Pryce. *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley, 2009. Provides practical guidance on using test doubles, including dummies, within a test-driven development workflow.
- Beck, Kent. *Test-Driven Development: By Example*. Addison-Wesley, 2002. Foundational text on TDD practices that underpin effective use of test doubles.
