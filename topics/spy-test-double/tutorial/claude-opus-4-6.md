# Spy (test double)

A spy is a type of test double that monitors behavior during test execution. Unlike other test doubles that completely replace dependencies, a spy can wrap around a real component, allowing actual method calls to proceed while simultaneously capturing detailed information about how those methods were invoked. This includes the parameters passed, the return values produced, the frequency of calls, and the order in which interactions occur. Spies occupy a unique position in the test double taxonomy because they combine observation with real execution, giving testers confidence that the underlying logic still runs correctly while also providing rich verification data about object interactions.


## How a Spy Works

A spy intercepts calls to a target method or object and records metadata about each invocation before optionally delegating to the original implementation. When a test exercises the system under test, the spy silently accumulates an interaction log. After execution completes, the test can query the spy to assert that specific methods were called, that they received the expected arguments, that they were invoked a particular number of times, or that calls occurred in a required sequence.

There are two common spy strategies. A **wrapping spy** delegates to the real implementation after recording the call, preserving the original behavior. A **non-delegating spy** records the call but does not invoke the real method, effectively acting more like a stub that also tracks invocations. The wrapping approach is more common and is the defining characteristic that distinguishes spies from stubs and mocks in most testing literature.


## Spy vs. Other Test Doubles

Test doubles serve different purposes depending on what aspect of behavior you need to control or verify. The following table clarifies how a spy compares to other common test doubles.

| Test Double | Purpose | Executes Real Code | Records Calls | Provides Canned Responses |
|---|---|---|---|---|
| **Dummy** | Fills a parameter slot; never actually used | No | No | No |
| **Stub** | Returns predetermined values to guide execution paths | No | No | Yes |
| **Mock** | Verifies expected interactions were made | No | Yes (with built-in assertions) | Yes |
| **Spy** | Observes and records interactions, often wrapping real code | Yes (typically) | Yes | No (uses real return values) |
| **Fake** | Provides a simplified working implementation | Yes (alternate logic) | No | No |

The key distinction is that a spy prioritizes observation over control. A mock is pre-programmed with expectations and fails the test if those expectations are not met. A spy, by contrast, passively records what happens and leaves assertion responsibility to the test itself. This makes spies more flexible and less prescriptive than mocks.


## Common Use Cases

Spies are particularly valuable in scenarios where you need to verify that certain interactions occur without interfering with the real behavior of the system:

- **Logging verification**: Confirming that a logging subsystem receives the correct log level, message, and contextual data when specific events occur.
- **Event and callback tracking**: Ensuring that event handlers, listeners, or callback functions are invoked the expected number of times and with the correct arguments.
- **Database transaction auditing**: Validating that commit, rollback, or savepoint operations are called in the correct order during complex transactional workflows.
- **External API call validation**: Checking that outbound HTTP requests carry the correct headers, query parameters, and request bodies without needing to mock the entire HTTP layer.
- **Notification systems**: Verifying that email, SMS, or push notification dispatchers are triggered with the right recipients and content.
- **Cache interaction monitoring**: Confirming that cache reads and writes occur as expected, including cache hit and miss behavior.


## Benefits

The primary advantage of spy test doubles lies in their ability to provide comprehensive interaction verification without disrupting the natural flow of execution. Because spies typically delegate to the real implementation, the system under test behaves as it would in production, reducing the risk of false positives caused by overly simplified substitutes.

- **Minimal intrusiveness**: Spies preserve real behavior, so tests exercise genuine logic paths rather than artificial stand-ins.
- **Flexible assertions**: Unlike mocks, spies do not require expectations to be set before execution. You can inspect the recorded interactions after the fact, which supports a more exploratory testing style.
- **Rich diagnostic data**: Spies capture argument lists, call counts, call order, return values, and thrown exceptions, providing a detailed audit trail useful for debugging test failures.
- **Incremental adoption**: You can introduce spies into an existing test suite without restructuring code or creating elaborate fake implementations.


## Risks and Limitations

Spies should be used judiciously. Over-reliance on interaction testing can lead to tests that are tightly coupled to implementation details rather than observable behavior.

- **Brittle tests**: Asserting on the exact number or order of internal method calls means that refactoring the implementation, even without changing external behavior, can break tests unnecessarily.
- **Testing the "how" instead of the "what"**: Spies tempt developers into verifying implementation mechanics rather than outcomes. A test that asserts a method was called three times is less resilient than one that asserts the final state is correct.
- **Hidden complexity**: Extensive spy setup and teardown can obscure the intent of a test, making it harder for future maintainers to understand what is actually being verified.
- **Partial coverage illusion**: Confirming that a method was called does not guarantee it produced the correct result. Spies verify interaction, not correctness of output.

A practical guideline is to prefer state-based testing (asserting on outcomes and return values) as the default, and reserve spies for situations where the interaction itself is the behavior you care about, such as verifying that a notification was sent or that a transaction was committed.


## Framework Support

Most modern testing frameworks provide built-in or plugin-based spy functionality. The following table highlights spy capabilities across popular ecosystems.

| Framework / Library | Language | Spy Creation | Notable Features |
|---|---|---|---|
| **Jest** | JavaScript | `jest.spyOn(object, method)` | Auto-restoring, integrates with snapshot testing |
| **Sinon.js** | JavaScript | `sinon.spy(object, method)` | Rich matchers, standalone or with any test runner |
| **Jasmine** | JavaScript | `spyOn(object, method)` | Call-through, return value overrides, call tracking |
| **Mockito** | Java | `Mockito.spy(realObject)` | Partial mocking, argument captors, verification modes |
| **unittest.mock** | Python | `unittest.mock.patch` with wraps | Attribute access tracking, call argument inspection |
| **RSpec** | Ruby | `allow(object).to receive(:method).and_call_original` | Expectation chaining, message constraints |
| **Go testify** | Go | `mock.Mock` with custom delegation | Interface-based, integrates with Go testing conventions |


## Related

Developers exploring spy test doubles should also study mock test doubles and stub test doubles to understand the full spectrum of interaction and state-based verification. The broader concepts of test-driven development and behavior-driven development provide context for when and why test doubles are employed. Dependency injection is a closely related architectural pattern that facilitates test double substitution. Testing topics such as integration testing, contract testing, and test isolation strategies help frame when spies are the right tool versus when higher-level or end-to-end approaches are more appropriate.


## Summary

A spy is a test double that wraps a real component, allows its genuine behavior to execute, and records detailed metadata about every interaction that occurs during a test. Spies excel at verifying that the correct collaborations happen between objects, making them ideal for auditing logging, events, transactions, and external calls. They differ from mocks by being passive recorders rather than prescriptive expectation enforcers, and they differ from stubs by preserving real execution rather than substituting canned responses. While spies provide powerful observational capabilities, they should be balanced with state-based assertions to avoid brittle tests that are coupled to implementation details rather than meaningful behavior.


## References

- Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley. The canonical reference for test double taxonomy including spies, mocks, stubs, fakes, and dummies.
- Fowler, M. (2007). "Mocks Aren't Stubs." martinfowler.com. https://martinfowler.com/articles/mocksArentStubs.html — Clarifies the distinction between state-based and interaction-based testing and where spies fit.
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley. Explores interaction-based testing in depth with practical guidance on test double usage.
- Jest Documentation. "jest.spyOn." https://jestjs.io/docs/jest-object#jestspyonobject-methodname — Official reference for spy creation in the Jest testing framework.
- Sinon.js Documentation. "Spies." https://sinonjs.org/releases/latest/spies/ — Comprehensive guide to spy functionality in Sinon.js.
