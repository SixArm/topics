## Dummy Test Double

A dummy is the simplest form of test double in software testing. It serves as a placeholder object that satisfies parameter requirements but is never actually used during test execution. Unlike other test doubles that simulate behavior, a dummy exists purely to fill a slot.

## Purpose and Use Cases

The primary purpose of a dummy is to fulfill method signatures when certain parameters are irrelevant to the test scenario. Common use cases include:

- **Satisfying constructor dependencies** when testing unrelated functionality
- **Filling required parameters** in methods where only some arguments matter
- **Completing interface contracts** when the implementation is not under test
- **Reducing test setup complexity** by avoiding unnecessary object creation

For example, if a method requires three parameters but your test only validates behavior related to the first two, you pass a dummy as the third parameter. This keeps tests focused on specific behavior without creating fully functional objects.

## How Dummies Differ from Other Test Doubles

| Test Double | Purpose | Behavior | Verification |
|-------------|---------|----------|--------------|
| **Dummy** | Placeholder only | None—never used | None |
| **Stub** | Provide canned responses | Returns predefined values | None |
| **Mock** | Verify interactions | Programmable responses | Tracks and asserts calls |
| **Spy** | Record interactions | Wraps real object | Logs method invocations |
| **Fake** | Simplified implementation | Working but simplified logic | None |

The critical distinction is that dummies contain no logic whatsoever. They don't respond to method calls, return values, or track invocations. They are purely passive placeholders.

## Implementation Approaches

Dummies are typically implemented through several patterns:

- **Null objects** that simply exist without functionality
- **Empty class instances** with no method implementations
- **Objects with no-op methods** that do nothing when called
- **Framework-generated placeholders** created by testing tools

Most modern testing frameworks provide built-in dummy generators or allow easy instantiation with minimal configuration.

## Best Practices

When working with dummies, follow these guidelines:

- **Ensure dummies remain unused**—any interaction typically signals a test design problem
- **Use the simplest possible implementation**—null references or empty objects often suffice
- **Document why a dummy is appropriate**—clarify that the parameter is intentionally ignored
- **Fail fast if accessed**—consider throwing exceptions if dummy methods are unexpectedly called
- **Prefer framework tools**—leverage built-in dummy creation when available

## Advantages and Limitations

**Advantages:**

- Minimal setup requirements
- No behavioral configuration needed
- Keeps tests focused on relevant components
- Reduces test complexity and maintenance burden

**Limitations:**

- Any accidental interaction causes failures or undefined behavior
- Can mask design issues if overused (too many dependencies)
- May hide tight coupling problems in the system under test

## When to Use Dummies

Choose dummies when:

- A parameter is required by the API but irrelevant to your test
- You need to isolate a specific component from unrelated dependencies
- Creating a real object would add unnecessary complexity
- The object will genuinely never be accessed during execution

Avoid dummies when the object might actually be used, even indirectly. In such cases, use stubs, mocks, or fakes that provide appropriate behavior.
