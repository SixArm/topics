## Test Double

A test double is a simplified implementation used in software testing to replace a real dependency. Test doubles enable faster, more reliable, and isolated tests by serving as stand-ins for external systems, databases, or complex objects that would otherwise make testing difficult or slow. By isolating the system under test from its dependencies, test doubles make it easier to identify the source of failures and ensure tests remain reliable across different environments.

## Why Use Test Doubles

Test doubles solve several fundamental problems in software testing:

- **Speed**: Real dependencies like databases, APIs, or file systems are slow. Test doubles eliminate network latency, disk I/O, and initialization overhead.
- **Determinism**: External systems can return different results based on state, timing, or availability. Test doubles provide consistent, repeatable behavior.
- **Isolation**: When a test fails, you want to know whether the failure is in your code or a dependency. Test doubles remove that ambiguity.
- **Control**: Some scenarios are difficult to trigger with real dependencies, such as network timeouts, rate limits, or error conditions. Test doubles let you simulate any scenario.
- **Cost**: External services may charge per request, have usage limits, or require expensive infrastructure. Test doubles eliminate these costs during development.

## Types of Test Doubles

| Type | Purpose | Behavior | Verification |
|------|---------|----------|--------------|
| Dummy | Fill parameter lists | No implementation | None |
| Fake | Provide working shortcut | Simplified real logic | None |
| Stub | Return predetermined data | Canned responses | None |
| Spy | Record interactions | May wrap real object | After execution |
| Mock | Verify expectations | Pre-programmed responses | During/after execution |

## Dummy

A dummy is the simplest test double, containing no implementation. Dummies exist only to satisfy parameter lists or interface requirements. They are passed around but never actually used during test execution.

**When to use a dummy:**
- A method signature requires an object you do not need for your specific test
- You need to instantiate a class that has required constructor parameters
- The dependency exists but is irrelevant to what you are testing

## Fake

A fake contains a working but simplified implementation of the real component. Unlike stubs that return canned responses, fakes have actual logic that behaves similarly to the real dependency.

**Common examples of fakes:**
- In-memory databases replacing production databases
- Local file system implementations replacing cloud storage
- Simplified authentication services that accept any credentials
- In-process message queues replacing distributed messaging systems

**When to use a fake:**
- You need realistic behavior without the overhead of the real system
- Multiple tests need to share state within a test run
- The real dependency is unavailable in the test environment

## Stub

A stub provides predetermined responses to method calls made during tests. Stubs allow testers to control the behavior of dependencies and test various scenarios predictably without implementing real logic.

**Characteristics of stubs:**
- Return fixed values regardless of input
- Can be configured to return different values for different inputs
- Do not verify how they are called
- Focus on providing indirect inputs to the system under test

**When to use a stub:**
- You need to control what data flows into your system under test
- You want to simulate specific scenarios like empty results or edge cases
- The real dependency's behavior is complex but your test only needs specific outputs

## Spy

A spy records information about how it is used during test execution. Spies track which methods were called, how many times, and with what parameters. A spy can either wrap a real object, allowing actual behavior while recording calls, or provide its own implementation.

**What spies can track:**
- Method invocation count
- Arguments passed to each call
- Order of method calls
- Return values

**When to use a spy:**
- You need to verify interactions without replacing the real implementation
- You want to confirm side effects occurred correctly
- You need detailed information about how your code uses a dependency

## Mock

A mock is pre-programmed with expectations about how it should be called. Mocks verify that these expectations are met during or after test execution. If a mock is not used as expected, the test fails.

**Characteristics of mocks:**
- Define expectations before execution
- Fail tests when expectations are not met
- Verify behavior rather than state
- Focus on how the system under test interacts with dependencies

**When to use a mock:**
- Verifying correct interactions is more important than return values
- You need to ensure specific methods are called with specific arguments
- The side effects of calling a dependency are the primary concern

## Choosing the Right Test Double

| Scenario | Recommended Double |
|----------|-------------------|
| Need to satisfy a required parameter | Dummy |
| Need realistic behavior without infrastructure | Fake |
| Need to control inputs to the system under test | Stub |
| Need to verify interactions after the fact | Spy |
| Need to enforce interaction contracts | Mock |

## Best Practices

- **Prefer simpler doubles**: Use the simplest test double that meets your needs. Dummies before stubs, stubs before mocks.
- **Avoid over-mocking**: Excessive mocking creates brittle tests that break when implementation details change, even if behavior is correct.
- **Keep fakes maintained**: Fakes must evolve with the real implementation, or they become a source of false confidence.
- **Test the contract, not the implementation**: Focus on what your code does, not how it does it internally.
- **Use test doubles at boundaries**: Apply test doubles at system boundaries where real dependencies live, not deep within your own code.

## Common Pitfalls

- **Mocking what you do not own**: Creating test doubles for third-party libraries couples your tests to their implementation details. Instead, wrap external dependencies in your own abstractions.
- **Testing mock behavior**: When tests verify that mocks return what you told them to return, you are testing the mock framework, not your code.
- **Ignoring integration**: Unit tests with test doubles do not replace integration tests. Real dependencies must eventually be tested together.
- **Overly specific expectations**: Mocks that verify exact argument values or call counts create fragile tests. Verify only what matters for correctness.
