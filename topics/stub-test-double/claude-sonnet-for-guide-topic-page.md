# Stub (test double)

A stub is a type of test double that is simplified implementation of a component, to replace a real dependency during testing. A stub simulates the behavior of actual system components like databases, web services, or external APIs, all without executing their full functionality.

The primary advantage of using stub objects lies in their ability to create predictable, repeatable test scenarios. Instead of relying on external systems that might be unavailable, slow, or produce inconsistent results, stubs return fixed responses that allow tests to focus on the logic being examined. This approach significantly reduces test execution time and eliminates dependencies that could cause tests to fail for reasons unrelated to the code under test.

Stubs differ from other test doubles like mocks in that they primarily provide state-based testing rather than behavior verification. While mocks verify that specific methods were called with correct parameters, stubs simply return predefined values when invoked. This makes stubs particularly useful for testing scenarios where you need to simulate different system states or error conditions without the complexity of setting up actual failure scenarios.
