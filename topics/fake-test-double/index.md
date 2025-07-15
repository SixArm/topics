# Fake (test double)

A fake is a type of test double that provides a working implementation of a dependency, but with simplified behavior compared to the real production version.

Fakes are particularly useful when testing components that depend on external systems like databases, file systems, or web services. For example, an in-memory database or a file system simulator can serve as a fake, allowing tests to run quickly without the overhead of setting up real infrastructure. A fake email service might store messages in a list rather than actually sending them, enabling verification of email functionality without network dependencies.

The key advantage of fakes is that they behave realistically enough to provide confidence in test results while remaining lightweight and deterministic. They eliminate the unpredictability and performance issues associated with real dependencies, making tests more reliable and faster to execute. Fakes also allow testing of edge cases and error conditions that might be difficult to reproduce with real systems.

However, fakes require more development effort than simpler test doubles since they need to implement actual logic. There's also a risk that the fake's behavior might diverge from the real implementation over time, potentially causing tests to pass while the production code fails. This necessitates careful maintenance and occasional validation against the actual system.

Common examples include in-memory repositories for database testing, mock HTTP servers for API testing, and fake authentication services for security testing. Fakes strike a balance between test isolation and realistic behavior, making them valuable tools in comprehensive testing strategies.
