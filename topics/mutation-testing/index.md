# Mutation testing

Mutation testing introduces deliberate changes called mutations into source code, to simulate common programming errors such as changing operators, modifying constants, or altering conditional statements. The fundamental principle behind mutation testing is that if a test suite is robust and comprehensive, it should detect these artificial defects and fail when mutations are introduced.

The process begins by creating multiple versions of the original program, each containing a single mutation. The existing test suite is then executed against each mutated version, called a mutant. If the tests fail when run against a mutant, the mutant is considered "killed," indicating that the test suite successfully detected the introduced error. Conversely, if the tests pass despite the mutation, the mutant "survives," suggesting a potential gap in test coverage or inadequate test cases.

Mutation testing provides a more sophisticated measure of test quality than traditional code coverage metrics. While code coverage indicates which lines of code are executed during testing, mutation testing reveals whether the tests can actually detect faults in those lines. This approach helps developers identify weak spots in their testing strategy and guides them toward writing more effective test cases.

Modern mutation testing tools have automated much of this process, making it more practical for regular use in software development. These tools can generate hundreds or thousands of mutants automatically and execute test suites against them efficiently. The resulting mutation score, calculated as the percentage of killed mutants, provides a quantitative measure of test suite effectiveness.
