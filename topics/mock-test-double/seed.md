# Mock (test double)

A mock is a type of test double that is simulated implementation of a real component, used to isolate the code under test from its dependencies.

The primary advantage of mock objects with expectations is their ability to verify behavior rather than just state. When a test runs, the mock framework records all interactions with the mock object and compares them against the predefined expectations. If the actual behavior doesn't match the expected behavior, the test fails, providing immediate feedback about incorrect usage of dependencies.

Unlike stubs that simply return predefined values, mock objects go further by setting expectations about how they should be used during test execution. These expectations typically include which methods should be called, how many times they should be invoked, what parameters they should receive, and in what order interactions should occur.

Mock objects are particularly valuable when testing interactions with external systems like databases, web services, or file systems. Instead of setting up complex test environments, developers can create mocks that simulate these dependencies while verifying that the system under test communicates with them correctly. This approach makes tests faster, more reliable, and independent of external factors. However, over-reliance on mocks can lead to brittle tests that break when implementation details change, even if the overall behavior remains correct. The key is finding the right balance between using mocks and real components.
