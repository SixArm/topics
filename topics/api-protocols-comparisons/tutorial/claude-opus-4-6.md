# API protocols comparisons

API protocols define how software components communicate over a network, and choosing the right one is a key architectural decision. Each protocol reflects a different set of trade-offs among performance, flexibility, developer experience, and ecosystem support. The most widely used protocols today are REST, gRPC, GraphQL, WebSockets, MQTT, and SOAP, each optimized for different workloads, deployment constraints, and client requirements. This tutorial provides a detailed comparison to help technology professionals select the right protocol for a given system.

## Overview of Major API Protocols

| Protocol | Transport | Data Format | Communication Pattern | Primary Use Case |
|----------|-----------|-------------|-----------------------|------------------|
| REST | HTTP/1.1 or HTTP/2 | JSON (typically) | Request-response | Public web APIs, CRUD operations |
| gRPC | HTTP/2 | Protocol Buffers (binary) | Unary, server streaming, client streaming, bidirectional streaming | Service-to-service, microservices |
| GraphQL | HTTP (typically POST) | JSON | Request-response with flexible queries | Frontend-driven data aggregation |
| WebSockets | TCP (upgraded from HTTP) | Text or binary frames | Full-duplex, persistent connection | Real-time data: chat, dashboards, collaboration |
| MQTT | TCP or WebSockets | Binary (compact) | Publish-subscribe | IoT telemetry, constrained devices |
| SOAP | HTTP, SMTP, JMS | XML | Request-response, one-way, notification | Enterprise, regulated industries |

## REST

REST is the dominant choice for public-facing web APIs. It uses standard HTTP methods (GET, POST, PUT, DELETE, PATCH) and typically exchanges JSON payloads, making it easy to understand, debug, and integrate from any client including browsers. REST works best for straightforward CRUD operations and request-response interactions where simplicity and broad tooling support matter most.

REST benefits from universal infrastructure support: proxies, caches, CDNs, load balancers, and monitoring tools all understand HTTP natively. Statelessness is a core constraint, meaning each request carries all the information the server needs to process it, which simplifies horizontal scaling. OpenAPI (Swagger) specifications provide machine-readable contracts, code generation, and interactive documentation.

REST's limitations become apparent in complex data retrieval scenarios. Clients often face over-fetching (receiving fields they do not need) or under-fetching (requiring multiple round trips to assemble a complete view). Versioning strategies (URL-based, header-based) add operational overhead as APIs evolve.

## gRPC

gRPC targets high-performance service-to-service communication. It uses Protocol Buffers for binary serialization and HTTP/2 for transport, delivering lower latency and smaller payloads than REST. gRPC enforces strict contracts via `.proto` files and supports native bidirectional streaming, making it ideal for microservices architectures and real-time internal APIs.

Key advantages of gRPC include:

- **Binary serialization** reduces payload size by up to 10x compared to JSON, lowering bandwidth and CPU cost.
- **HTTP/2 multiplexing** allows multiple concurrent requests over a single TCP connection, eliminating head-of-line blocking at the application layer.
- **Strongly typed contracts** through `.proto` definitions enable automatic client and server code generation across dozens of languages.
- **Streaming modes** (server, client, and bidirectional) support patterns that REST cannot express natively.

The primary limitation is browser support. Browsers cannot make native gRPC calls; a gRPC-Web proxy is required to bridge the gap. This makes gRPC less suitable for public-facing APIs consumed directly by web frontends. Debugging is also more difficult because binary payloads are not human-readable without tooling.

## GraphQL

GraphQL gives clients control over the shape and depth of responses through a flexible query language. A single endpoint accepts queries that specify exactly which fields and nested relationships are needed, eliminating the over-fetching and under-fetching problems common with REST. This is particularly valuable for mobile clients with bandwidth constraints and complex frontend applications that aggregate data from multiple domains.

GraphQL introduces its own trade-offs:

- **Query complexity** can lead to expensive operations if clients request deeply nested data. Rate limiting and query cost analysis become necessary to protect backend resources.
- **Caching** is harder than with REST because all queries go through a single endpoint (typically POST), bypassing standard HTTP caching mechanisms. Client-side libraries like Apollo and Relay solve this with normalized caches.
- **Schema evolution** replaces versioning: fields are deprecated rather than removed, and new fields are added without breaking existing clients.
- **N+1 query problems** require careful attention on the server side, typically addressed with data loader patterns to batch database lookups.

## WebSockets

WebSockets provide full-duplex, persistent connections over a single TCP socket. After an initial HTTP handshake upgrades the connection, both client and server can send messages independently at any time. They suit applications that require continuous real-time data flow, such as chat systems, live dashboards, collaborative editing tools, multiplayer games, and financial trading platforms.

WebSockets differ fundamentally from request-response protocols. The persistent connection means the server can push data to clients without polling, reducing latency to near-zero for updates. However, this statefulness introduces operational complexity: load balancing requires sticky sessions or a shared pub-sub layer, connection management must handle reconnection logic, and scaling demands more server resources than stateless alternatives.

## MQTT

MQTT is a lightweight publish-subscribe protocol designed for constrained devices and unreliable networks. It is the standard choice for IoT telemetry and sensor data collection where bandwidth and power consumption are critical. Messages are published to topics and delivered to all subscribers through a central broker, decoupling producers from consumers.

MQTT defines three quality-of-service levels:

- **QoS 0 (at most once):** Fire-and-forget delivery with no acknowledgment, suitable for non-critical telemetry.
- **QoS 1 (at least once):** Guaranteed delivery with possible duplicates, appropriate for most sensor data.
- **QoS 2 (exactly once):** Two-phase handshake ensuring no duplicates and no loss, used for billing or command-and-control messages where precision matters.

The protocol's minimal overhead (a fixed header as small as 2 bytes) makes it viable on microcontrollers and over satellite or cellular links where every byte counts.

## SOAP

SOAP remains in use in enterprise and regulated environments where WS-Security, ACID transactions, and formal WSDL contracts are required. SOAP messages use XML envelopes with a rigid structure, and WSDL documents provide complete machine-readable API specifications. The WS-* family of standards covers security, reliable messaging, transactions, and addressing.

SOAP carries significant complexity compared to modern alternatives. XML parsing is CPU-intensive and verbose, tooling is heavy, and integration requires specialized libraries. New projects rarely choose SOAP, but it persists in banking, insurance, healthcare, and government systems where compliance mandates or legacy integrations make migration impractical.

## Performance Comparison

| Metric | REST | gRPC | GraphQL | WebSockets | MQTT |
|--------|------|------|---------|------------|------|
| Latency | Moderate | Low | Moderate | Very low (after connection) | Low |
| Payload size | Larger (JSON) | Smallest (binary) | Variable (query-dependent) | Variable | Very small |
| Connection overhead | Per-request | Multiplexed (HTTP/2) | Per-request | One-time handshake | One-time handshake |
| Bandwidth efficiency | Moderate | High | Moderate to high | High | Very high |
| CPU cost (serialization) | Moderate | Low | Moderate | Low | Very low |

## When to Use Each Protocol

- **REST** when building public APIs consumed by diverse clients, when HTTP caching is valuable, or when developer onboarding speed is a priority.
- **gRPC** when internal services need high throughput and low latency, when strict interface contracts are essential, or when streaming data between services.
- **GraphQL** when frontends need flexible data retrieval, when multiple client types (web, mobile, third-party) consume the same backend, or when reducing round trips is critical.
- **WebSockets** when the application requires server-initiated updates, bidirectional real-time communication, or persistent connections for interactive features.
- **MQTT** when devices are resource-constrained, networks are unreliable, or the architecture follows a publish-subscribe pattern for telemetry and event distribution.
- **SOAP** when regulatory or enterprise requirements mandate WS-Security, formal contracts, or ACID transaction support across service boundaries.

## Combining Protocols

Most production systems use multiple protocols together rather than choosing a single one. A common architecture uses REST or GraphQL for external client-facing APIs, gRPC for internal service mesh communication, WebSockets for real-time features delivered to browsers, and MQTT for device telemetry ingestion. API gateways and service meshes handle protocol translation at system boundaries, allowing each layer to use the protocol best suited to its constraints.

## Related

Professionals exploring API protocol choices should also study API gateway patterns, service mesh architectures (Envoy, Istio, Linkerd), Protocol Buffers and schema evolution strategies, OpenAPI specification design, event-driven architectures with Apache Kafka or NATS, and authentication mechanisms across protocols such as OAuth 2.0, mTLS, and API key management. Understanding HTTP/2 and HTTP/3 (QUIC) transport fundamentals provides deeper insight into why gRPC and modern REST implementations perform the way they do.

## Summary

API protocol selection is a trade-off between performance, flexibility, developer experience, and ecosystem constraints. REST remains the default for public APIs due to its simplicity and universal support. gRPC delivers superior performance for internal service communication through binary serialization and HTTP/2. GraphQL empowers clients with precise data retrieval at the cost of server-side complexity. WebSockets enable real-time bidirectional communication for interactive applications. MQTT serves IoT and constrained environments with minimal overhead. SOAP persists where enterprise compliance demands its formal standards. The strongest architectures combine protocols deliberately, matching each one to the layer and workload where it excels.

## References

- Fielding, R. T. "Architectural Styles and the Design of Network-Based Software Architectures." Doctoral dissertation, University of California, Irvine, 2000. The foundational work defining REST constraints.
- gRPC Authors. "gRPC Documentation." https://grpc.io/docs/ -- Official protocol specification, tutorials, and language guides.
- GraphQL Foundation. "GraphQL Specification." https://spec.graphql.org/ -- The formal language specification maintained by the GraphQL Foundation.
- IETF RFC 6455. "The WebSocket Protocol." https://datatracker.ietf.org/doc/html/rfc6455 -- The standard defining WebSocket framing, handshake, and data transfer.
- OASIS. "MQTT Version 5.0." https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html -- The current MQTT specification covering QoS levels, retained messages, and session management.
- W3C. "SOAP Version 1.2." https://www.w3.org/TR/soap12/ -- The XML-based messaging framework specification.
- Richardson, L. and Amundsen, M. "RESTful Web APIs." O'Reilly Media, 2013. Practical guidance on REST API design and hypermedia.
- Indrasiri, K. and Kuruppu, D. "gRPC: Up and Running." O'Reilly Media, 2020. Covers gRPC patterns, interceptors, and production deployment.
