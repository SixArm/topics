## Fake (Test Double)

A fake is a type of test double that provides a fully working implementation of a dependency, but with simplified behavior compared to the real production version. Unlike stubs that return canned responses or mocks that verify interactions, fakes contain actual functional logic that mimics the real component's behavior in a lightweight, controllable manner.

## When to Use Fakes

Fakes are particularly valuable when testing components that depend on external systems where setting up the real infrastructure would be impractical or slow. Common scenarios include:

- **Database interactions**: An in-memory database replaces a production database server
- **File system operations**: A virtual file system simulator replaces actual disk I/O
- **External APIs**: A simplified HTTP server replaces third-party web services
- **Email systems**: An in-memory message store replaces an actual SMTP server
- **Authentication services**: A simplified identity provider replaces production OAuth servers
- **Message queues**: An in-memory queue replaces distributed messaging infrastructure

## Key Characteristics of Fakes

| Characteristic | Description |
|----------------|-------------|
| Working implementation | Contains real logic, not just predefined responses |
| Simplified behavior | Omits complexity unnecessary for testing purposes |
| Deterministic | Produces consistent, predictable results |
| Fast execution | Eliminates network latency and external dependencies |
| Self-contained | Requires no external infrastructure to operate |
| Stateful | Maintains state across method calls within a test |

## Fakes Compared to Other Test Doubles

| Test Double | Purpose | Complexity | Behavior |
|-------------|---------|------------|----------|
| **Dummy** | Fill parameter lists | Minimal | No behavior, never actually used |
| **Stub** | Provide canned answers | Low | Returns predefined values |
| **Spy** | Record interactions | Medium | Wraps real object, tracks calls |
| **Mock** | Verify behavior | Medium | Expects specific calls, fails if not met |
| **Fake** | Simulate real system | High | Contains working simplified logic |

## Advantages of Using Fakes

- **Realistic behavior**: Fakes behave similarly to production systems, providing higher confidence that tests reflect real-world scenarios
- **Performance**: Tests execute rapidly without network calls, disk I/O, or database connections
- **Reliability**: Eliminates flaky tests caused by network timeouts, service unavailability, or external system state
- **Isolation**: Tests remain independent and unaffected by external system changes
- **Edge case testing**: Easily simulate error conditions, boundary cases, and failure scenarios that are difficult to reproduce with real systems
- **Parallel execution**: Multiple test processes can run simultaneously without resource conflicts

## Disadvantages and Risks

- **Development overhead**: Fakes require significant effort to build and maintain compared to simpler test doubles
- **Behavioral drift**: The fake's behavior may diverge from the real implementation over time, causing tests to pass while production fails
- **Incomplete simulation**: Fakes may not capture all nuances of the real system, missing subtle bugs
- **Maintenance burden**: Changes to the real system require corresponding updates to the fake
- **False confidence**: Passing tests against a fake do not guarantee success against the production system

## Common Examples

| Real System | Fake Implementation |
|-------------|---------------------|
| PostgreSQL database | In-memory SQLite or hash map repository |
| AWS S3 storage | Local file system or in-memory file store |
| Redis cache | In-memory dictionary with expiration logic |
| Stripe payment API | Fake payment processor that tracks transactions |
| SendGrid email | In-memory list of sent messages |
| OAuth provider | Simplified token generator returning valid tokens |

## Best Practices

- **Validate periodically**: Run integration tests against real systems to ensure fakes remain accurate
- **Document differences**: Clearly state where fake behavior intentionally differs from production
- **Keep fakes simple**: Implement only the behavior needed for your tests
- **Share across teams**: Centralize fake implementations to ensure consistency and reduce duplication
- **Version alongside production**: Update fakes when production dependencies change
- **Test the fake itself**: Verify your fake behaves correctly for the scenarios it simulates

## When to Avoid Fakes

Fakes are not always the right choice. Consider alternatives when:

- The real dependency is already fast and reliable
- You only need to verify that a method was called (use a mock instead)
- You only need a single predetermined response (use a stub instead)
- Integration testing with the real system is the primary goal
- The effort to build an accurate fake exceeds its testing value

## Summary

Fakes occupy a unique position among test doubles by providing working implementations that balance realism with test performance. They excel when testing against complex external dependencies where simpler doubles would be inadequate and real systems would be impractical. While they require more development effort than stubs or mocks, fakes deliver higher confidence that tested code will function correctly in production environments. The key to success with fakes is maintaining alignment between the fake's behavior and the real system it replaces.
