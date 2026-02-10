# Circuit breaker

The circuit breaker is a software design pattern used to enhance the stability and resilience of distributed systems. Inspired by electrical circuit breakers that protect power systems from damage, the pattern monitors application operations and temporarily disables failing functions when error rates exceed a predefined threshold. This prevents a single failing component from cascading into a system-wide outage. The pattern was popularized by Michael Nygard in his book *Release It!* and has since become a foundational practice in microservices architecture, cloud-native development, and any system where reliability under partial failure is critical.

## How the circuit breaker works

The circuit breaker wraps calls to an external dependency — such as a remote service, database, or third-party API — inside a monitoring proxy. This proxy tracks recent outcomes (successes, failures, timeouts) and makes decisions about whether to allow subsequent calls to proceed. When failures accumulate past a configured threshold, the circuit breaker "trips" and immediately rejects or redirects requests without attempting the actual call. After a cooling-off period, the breaker allows a limited number of probe requests through to determine whether the dependency has recovered. If those probes succeed, the circuit closes and normal traffic resumes. If they fail, the breaker remains open and the wait period resets.

## The three states

The circuit breaker operates as a finite state machine with three primary states. Understanding these states is essential to configuring and reasoning about circuit breaker behavior in production.

| State | Behavior | Transition trigger |
|---|---|---|
| **Closed** | All requests pass through normally. Failures are counted against the threshold. | Failure count exceeds threshold within the configured window. Transitions to Open. |
| **Open** | All requests are immediately rejected or routed to a fallback. No calls reach the dependency. | A configurable timeout expires. Transitions to Half-Open. |
| **Half-Open** | A limited number of trial requests are allowed through to test whether the dependency has recovered. | If trial requests succeed, transitions to Closed. If they fail, transitions back to Open. |

The Closed state is the normal operating mode. The Open state is protective, shielding both the caller and the degraded dependency from further damage. The Half-Open state is diagnostic, probing for recovery without exposing the system to full traffic volume.

## Why cascading failures happen

In distributed systems, services depend on one another through network calls. When a downstream service becomes slow or unresponsive, the calling service accumulates threads, connections, and memory waiting for responses that may never arrive. Those consumed resources prevent the caller from handling its own traffic, which causes the caller itself to degrade. That degradation then propagates upstream to every service that depends on the caller, creating a chain reaction that can bring down an entire platform from a single point of failure.

The circuit breaker interrupts this chain by failing fast. Rather than waiting for a timeout on every request to a known-degraded service, the breaker immediately returns an error or fallback response, freeing resources for healthy operations.

## Key configuration parameters

Tuning a circuit breaker requires balancing sensitivity against stability. The following parameters are commonly exposed for configuration:

- **Failure threshold**: The number or percentage of failures within a rolling window that triggers the breaker to open. A low threshold makes the system more responsive to problems but risks false positives from transient errors.
- **Rolling window duration**: The time period over which failures are counted. Shorter windows detect issues faster but are more susceptible to noise.
- **Open-state timeout**: How long the breaker remains open before transitioning to half-open. Too short and the dependency has no time to recover; too long and the system unnecessarily rejects traffic.
- **Half-open trial count**: The number of probe requests allowed in the half-open state. A single probe risks a false positive on recovery; too many probes risk re-stressing a recovering service.
- **Timeout per request**: The maximum time allowed for a single call before it is counted as a failure. This must be set in coordination with the dependency's expected response time under normal load.

## Fallback strategies

When the circuit breaker is open, the system must decide what to do with rejected requests. Several fallback strategies are available, and the right choice depends on the nature of the operation.

- **Return a cached response**: Serve the last known good result. This works well for read operations where slightly stale data is acceptable, such as product catalogs or configuration lookups.
- **Return a default value**: Provide a safe, static response. For example, a recommendation engine might return a generic "popular items" list when the personalization service is unavailable.
- **Degrade gracefully**: Disable the affected feature while keeping the rest of the application functional. A checkout page might hide estimated delivery dates rather than blocking the entire purchase flow.
- **Queue for retry**: Accept the request and process it asynchronously once the dependency recovers. This is appropriate for write operations that must eventually succeed, such as order submissions or event logging.
- **Fail explicitly**: Return a clear error to the caller so it can make its own decisions. This is the simplest approach and is appropriate when no meaningful fallback exists.

## Circuit breaker versus retry logic

Circuit breakers and retries are complementary but serve different purposes. Retries address transient, short-lived failures — a single dropped packet, a momentary DNS hiccup. The circuit breaker addresses sustained failures where repeated retries would only worsen the problem.

| Concern | Retry logic | Circuit breaker |
|---|---|---|
| **Target failure type** | Transient, intermittent errors | Sustained, systemic outages |
| **Behavior on failure** | Attempts the call again, often with backoff | Stops attempting calls entirely |
| **Resource impact** | Can amplify load on a degraded service | Protects the degraded service from additional load |
| **Recovery model** | Succeeds on a subsequent attempt | Probes periodically and restores traffic when safe |
| **Risk** | Retry storms can worsen outages | Overly aggressive tripping can block valid requests |

In practice, retries are often nested inside a circuit breaker. Individual calls may retry once or twice with exponential backoff, but if the overall failure rate crosses the threshold, the circuit breaker opens and stops all attempts.

## Common implementation libraries

The circuit breaker pattern is available in mature libraries across most technology ecosystems. These libraries handle the state machine, threading, metrics collection, and configuration so that developers focus on defining thresholds and fallbacks rather than building infrastructure.

- **Resilience4j** (Java): The modern standard for JVM-based applications, offering circuit breakers alongside rate limiters, bulkheads, and retry modules.
- **Polly** (.NET): A comprehensive resilience library for C# and .NET applications with fluent configuration for circuit breakers, retries, and timeouts.
- **Hystrix** (Java): The Netflix library that originally brought the circuit breaker pattern to mainstream microservices. Now in maintenance mode, superseded by Resilience4j.
- **Istio / Envoy** (infrastructure): Service mesh platforms that implement circuit breaking at the network proxy layer, requiring no changes to application code.
- **opossum** (Node.js): A lightweight circuit breaker for JavaScript and TypeScript applications.

## Observability and monitoring

A circuit breaker is only effective if operations teams can see its behavior. Every circuit breaker implementation should emit metrics and events that feed into the organization's monitoring and alerting stack.

- **State transitions**: Log and alert whenever a breaker moves between Closed, Open, and Half-Open states. Frequent transitions indicate an unstable dependency.
- **Failure rates**: Track the rolling failure rate that drives state transitions. This metric helps distinguish between transient spikes and sustained degradation.
- **Rejected request volume**: Measure how many requests the breaker is short-circuiting while open. High rejection rates quantify the user impact of an outage.
- **Latency distribution**: Compare latency when the breaker is closed (actual calls) versus open (fast-fail responses). The difference illustrates the performance benefit of the pattern.
- **Recovery time**: Measure the duration from when the breaker opens to when it successfully closes. This metric tracks dependency reliability over time.

Dashboards that visualize these metrics across all circuit breakers in a system provide a real-time map of service health and dependency risk.

## Anti-patterns and pitfalls

Adopting the circuit breaker pattern without careful design can introduce its own problems.

- **Overly sensitive thresholds**: Setting the failure threshold too low causes the breaker to trip on normal error variance, blocking healthy traffic unnecessarily.
- **Ignoring idempotency**: If a request was partially processed before triggering a failure, replaying it after recovery can cause duplicate side effects. Circuit breakers must be paired with idempotent operation design.
- **Silent failures**: When fallbacks silently mask problems, operators may not realize a dependency is degraded. Every open circuit must generate alerts.
- **Single global breaker**: Using one circuit breaker for all calls to a service ignores the possibility that only certain endpoints are failing. Breakers should be scoped to specific operations or endpoints.
- **Hardcoded configuration**: Thresholds and timeouts baked into code cannot be adjusted during an incident. Configuration should be externalized and, ideally, dynamically tunable.

## Related

After understanding the circuit breaker pattern, explore related topics that form a broader resilience engineering toolkit. Study the **bulkhead pattern** for isolating resource pools so that one failing component cannot starve others. Learn about **retry with exponential backoff** to handle transient failures before a circuit breaker trips. Investigate **rate limiting** and **throttling** for managing inbound load. Examine **health checks** and **service mesh** architectures such as Istio and Envoy for infrastructure-level resilience. Review **chaos testing** and **disaster recovery** practices that validate circuit breaker behavior under real failure conditions. Finally, study **event-driven architecture** and **message queues** as alternatives that decouple services and reduce synchronous dependency chains.

## Summary

The circuit breaker pattern is a critical building block for resilient distributed systems. By monitoring dependency health and failing fast when failures exceed a threshold, it prevents cascading outages, conserves system resources, and gives degraded services time to recover. Its three-state model — Closed, Open, and Half-Open — provides a clear, predictable mechanism for balancing availability against protection. When combined with thoughtful fallback strategies, proper observability, and complementary patterns like retries and bulkheads, the circuit breaker transforms brittle service-to-service communication into a system that degrades gracefully under stress and recovers automatically when conditions improve.

## References

- Nygard, Michael T. *Release It! Design and Deploy Production-Ready Software*. Pragmatic Bookshelf, 2007. The original source of the circuit breaker pattern for software systems.
- Microsoft Azure Architecture Center. "Circuit Breaker pattern." https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
- Resilience4j documentation. https://resilience4j.readme.io/
- Fowler, Martin. "CircuitBreaker." https://martinfowler.com/bliki/CircuitBreaker.html
- Netflix Technology Blog. "Fault Tolerance in a High Volume, Distributed System." https://netflixtechblog.com/fault-tolerance-in-a-high-volume-distributed-system-91ab4faae74a
- Newman, Sam. *Building Microservices*. O'Reilly Media, 2015. Covers circuit breakers in the context of microservice communication patterns.
