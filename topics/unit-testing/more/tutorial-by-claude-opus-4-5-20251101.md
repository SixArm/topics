## Unit Testing

Unit testing is a software testing technique that verifies individual units or components of a software system. A unit is the smallest testable part of an application—typically a method, function, class, or module. The primary purpose is to validate that each unit performs as expected and satisfies specified requirements.

## Core Concept

The fundamental idea behind unit testing is isolation. You separate a unit from the rest of the software system and test it in an automated, repeatable way. This involves writing test cases that exercise the unit's functionality and compare actual results with expected results. If results match, the test passes; otherwise, it fails and indicates a defect.

## The Unit Testing Pyramid

Unit tests form the foundation of the testing pyramid, which describes the ideal distribution of test types:

| Test Level | Scope | Speed | Quantity |
|------------|-------|-------|----------|
| Unit Tests | Single function/method | Milliseconds | Many (70-80%) |
| Integration Tests | Multiple components | Seconds | Some (15-20%) |
| End-to-End Tests | Entire system | Minutes | Few (5-10%) |

## Key Characteristics of Good Unit Tests

Effective unit tests follow the FIRST principles:

- **Fast** — Execute in milliseconds, enabling developers to run them frequently
- **Independent** — No dependencies on other tests; can run in any order
- **Repeatable** — Produce the same results regardless of environment or execution time
- **Self-Validating** — Pass or fail without manual interpretation
- **Timely** — Written alongside or before the production code

## Benefits of Unit Testing

Unit testing delivers substantial value across the development lifecycle:

- **Early defect detection** — Catches bugs during development when they are cheapest to fix
- **Improved code quality** — Forces developers to write modular, testable, and maintainable code
- **Living documentation** — Describes expected behavior better than comments or external docs
- **Refactoring confidence** — Enables safe code changes with immediate feedback
- **Design feedback** — Difficult-to-test code often signals poor design decisions
- **Reduced debugging time** — Pinpoints exact location of failures

## Unit Test Structure: Arrange-Act-Assert

Most unit tests follow the AAA pattern:

| Phase | Purpose | Activities |
|-------|---------|------------|
| Arrange | Set up test conditions | Create objects, initialize data, configure mocks |
| Act | Execute the unit under test | Call the method or function being tested |
| Assert | Verify the outcome | Compare actual results to expected results |

## What to Test

Focus unit tests on behavior, not implementation:

- **Happy path** — Normal expected inputs produce correct outputs
- **Edge cases** — Boundary conditions, empty inputs, maximum values
- **Error conditions** — Invalid inputs, null values, exceptions
- **State changes** — Object state transitions correctly after operations
- **Return values** — Methods return expected results

## Test Doubles

When testing a unit in isolation, you replace its dependencies with test doubles:

| Double Type | Purpose | Behavior |
|-------------|---------|----------|
| Dummy | Fill parameter lists | No implementation; never actually used |
| Stub | Provide predetermined responses | Returns fixed values regardless of input |
| Spy | Record interactions | Tracks how the unit uses its dependencies |
| Mock | Verify behavior | Asserts specific methods were called with expected arguments |
| Fake | Simplified implementation | Working implementation unsuitable for production |

## Popular Unit Testing Frameworks

Different languages have established testing frameworks:

| Language | Primary Frameworks |
|----------|-------------------|
| Java | JUnit, TestNG |
| Python | pytest, unittest |
| JavaScript | Jest, Mocha, Vitest |
| C# | NUnit, xUnit, MSTest |
| Go | testing (built-in) |
| Ruby | RSpec, Minitest |
| Rust | cargo test (built-in) |

## Code Coverage

Code coverage measures how much of your code is exercised by tests:

| Coverage Type | What It Measures |
|---------------|------------------|
| Line Coverage | Percentage of lines executed |
| Branch Coverage | Percentage of decision branches taken |
| Function Coverage | Percentage of functions called |
| Condition Coverage | Percentage of boolean sub-expressions evaluated |

Target coverage levels vary by project, but 70-80% line coverage is a common baseline. Coverage alone does not guarantee quality—tests must make meaningful assertions.

## Integration with CI/CD

Unit tests integrate into continuous integration pipelines:

- **Pre-commit hooks** — Run tests locally before pushing code
- **Pull request gates** — Block merging if tests fail
- **Build pipelines** — Execute full test suite on every commit
- **Test reporting** — Generate coverage reports and trend analysis
- **Failure notifications** — Alert teams immediately when tests break

## Common Unit Testing Anti-Patterns

Avoid these practices that reduce test effectiveness:

- **Testing implementation details** — Tests break when refactoring without behavior changes
- **Excessive mocking** — Over-mocking creates tests that pass despite broken code
- **Test interdependence** — Tests that rely on shared state or execution order
- **Ignored tests** — Disabling failing tests rather than fixing them
- **Assertion-free tests** — Tests that execute code but verify nothing
- **Slow tests** — Tests that take seconds instead of milliseconds

## When Not to Unit Test

Unit testing is not universally applicable. Consider alternatives for:

- **Simple getters and setters** — Trivial code with no logic
- **Framework code** — Configuration and boilerplate the framework handles
- **Thin wrappers** — Code that only delegates to external systems
- **Rapidly changing prototypes** — Exploratory code that will be rewritten

## Measuring Unit Test Quality

Beyond coverage, evaluate test quality through:

- **Mutation testing** — Introduces small code changes to verify tests detect them
- **Test execution time** — Fast suites get run more frequently
- **Flakiness rate** — Percentage of tests that intermittently fail
- **Defect escape rate** — Bugs that reach production despite passing tests
- **Maintenance burden** — Time spent updating tests after code changes

## Best Practices Summary

- Write tests during development, not after
- Test behavior, not implementation
- Keep tests fast and independent
- Use descriptive test names that explain expected behavior
- One logical assertion per test
- Treat test code with the same quality standards as production code
- Run tests frequently—ideally on every save
- Fix broken tests immediately

Unit testing is an essential practice for professional software development. When done well, it accelerates development, improves code quality, and provides confidence when making changes to the codebase.
