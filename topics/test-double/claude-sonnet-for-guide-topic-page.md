# Test double

A test double is a simplified implementation used in software testing to replace a real dependency, to enable faster, more reliable, and isolated tests. A test double can serve as a stand-in for an external system, database, or complex object that would otherwise make testing difficult or slow. A test double can help isolate the system under test from its dependencies, making it easier to identify the source of failures and ensuring tests remain reliable across different environments.

* A dummy is the simplest test double, containing no implementation and used only to fill parameter lists or satisfy interface requirements. It's typically passed around but never actually used during test execution.

* A fake contains a working implementation but simplified version of the real component. For example, an in-memory database might serve as a fake for a production database, providing actual functionality without the complexity of a full database system.

* A stub provides a predetermined responses to method calls made during tests, allowing testers to control the behavior of dependencies and test various scenarios predictably.

* A spy records information about how its used, such as which methods were called, how many times, and with what parameters. A spy can wrap a real object or provide its own implementation.

* A mock is pre-programmed with expectations about how it should be called, and how to verify that these expectations are met during test execution. A mock fails a testDs if it's not used as expected.
