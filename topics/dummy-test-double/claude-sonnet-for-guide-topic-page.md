# Dummy test double

A dummy is a type of test double that serves as a simple placeholder object. A dummy is never actually used during test execution.

The primary purpose of a dummy is to fulfill parameter requirements when the actual implementation is irrelevant to the test scenario. For example, if a method requires three parameters but your test only cares about the first two, you can pass a dummy object as the third parameter. This allows the test to focus on the specific behavior being validated without the overhead of creating fully functional objects.

Dummies differ from other test doubles like stubs, mocks, and spies in that they contain no logic whatsoever. While stubs return predefined responses and mocks verify interactions, dummies simply exist as empty shells. They don't respond to method calls or track invocations – they're purely passive placeholders.

In practice, dummies are often implemented as null objects, empty classes, or objects with no-op methods. Many testing frameworks provide built-in dummy generators or allow easy creation through object instantiation with minimal configuration. This makes them particularly useful in unit testing scenarios where you need to isolate specific components from their dependencies.

The key advantage of using dummies is their simplicity and minimal setup requirements. However, care must be taken to ensure that dummy objects are truly unused, as any interaction with them typically results in test failures or unexpected behavior.
