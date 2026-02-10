# Representational State Transfer (REST)

Representational State Transfer (REST) is an architectural style for designing networked applications, originally defined by Roy Fielding in his 2000 doctoral dissertation. REST provides a set of constraints that, when applied to the design of a system, promote scalability, simplicity, and reliability. It has become the dominant paradigm for building web APIs and distributed services, leveraging the existing infrastructure of the World Wide Web. REST and RESTful services are built on top of the HTTP protocol, using standard HTTP methods to interact with resources identified by URIs.

## Core Principles

REST is defined by a set of architectural constraints that guide how components in a distributed system should interact. These constraints are not optional add-ons but fundamental properties that a system must exhibit to be considered RESTful.

- **Client-Server Architecture**: The client and server are separate, independent components that communicate through a standardized interface. This separation of concerns allows each to evolve independently. A mobile app, web browser, or CLI tool can all consume the same API without the server needing to know anything about the client's implementation.

- **Statelessness**: Every request from the client to the server must contain all the information necessary to understand and process the request. The server does not store any session state between requests. This constraint simplifies server design, improves reliability, and enables horizontal scaling because any server instance can handle any request.

- **Cacheability**: Responses must explicitly or implicitly define themselves as cacheable or non-cacheable. When a response is cacheable, the client or intermediary can reuse that response for equivalent future requests, reducing latency and network traffic.

- **Uniform Interface**: All interactions between clients and servers follow a consistent, standardized interface. This is the most distinguishing constraint of REST and encompasses four sub-constraints: identification of resources via URIs, manipulation of resources through representations, self-descriptive messages, and hypermedia as the engine of application state (HATEOAS).

- **Layered System**: The architecture is composed of hierarchical layers, where each layer can only interact with the layer immediately adjacent to it. A client cannot tell whether it is connected directly to the origin server or to an intermediary such as a load balancer, cache, or security gateway.

- **Code on Demand (Optional)**: Servers can optionally extend client functionality by transferring executable code, such as JavaScript. This is the only optional constraint in REST.

## HTTP Methods

RESTful web services map operations on resources to standard HTTP methods. Each method has defined semantics regarding safety (no side effects) and idempotency (repeated calls produce the same result).

| HTTP Method | Operation | Safe | Idempotent | Typical Use |
|-------------|-----------|------|------------|-------------|
| GET | Read | Yes | Yes | Retrieve a resource or collection |
| POST | Create | No | No | Create a new resource or submit complex data |
| PUT | Replace | No | Yes | Replace a resource entirely |
| PATCH | Update | No | No | Partially modify a resource |
| DELETE | Remove | No | Yes | Delete a resource |
| HEAD | Metadata | Yes | Yes | Retrieve headers without a body |
| OPTIONS | Capabilities | Yes | Yes | Discover allowed methods and CORS preflight |

The distinction between PUT and PATCH is significant. PUT replaces the entire resource representation, meaning the client must send a complete object. PATCH applies a partial modification, allowing the client to send only the fields that have changed.

## HTTP Status Codes

REST relies on standard HTTP status codes to communicate the outcome of a request. Proper use of status codes allows clients to handle responses programmatically without parsing error messages.

| Code Range | Category | Examples |
|------------|----------|----------|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

A well-designed REST API uses status codes precisely. For example, a successful resource creation returns 201 with a Location header pointing to the new resource, while a deletion with no response body returns 204.

## Resource Design and URIs

In REST, a resource is any information that can be named and addressed. Resources are identified by URIs, and each URI should represent a noun rather than a verb. Good URI design is hierarchical, predictable, and consistent.

- Use plural nouns for collection resources: `/users`, `/orders`, `/products`
- Use path segments for hierarchy: `/users/42/orders/7`
- Use query parameters for filtering, sorting, and pagination: `/products?category=electronics&sort=price&page=2`
- Avoid encoding actions into URIs: prefer `POST /orders` over `POST /createOrder`
- Use hyphens rather than underscores for readability: `/user-profiles` rather than `/user_profiles`

Resource representations are typically serialized as JSON, though REST itself is format-agnostic. Content negotiation via the `Accept` and `Content-Type` headers allows clients and servers to agree on the media type for request and response bodies.

## HATEOAS

Hypermedia as the Engine of Application State (HATEOAS) is a constraint that distinguishes a truly RESTful API from one that merely uses HTTP methods with JSON. Under HATEOAS, a server response includes hyperlinks that tell the client what actions are available next. The client navigates the API by following these links rather than constructing URIs from documentation.

In practice, HATEOAS means that a response for an order resource might include links to cancel the order, view the associated customer, or fetch related invoices. This decouples the client from hardcoded URI structures and allows the server to evolve its URI scheme without breaking clients. While HATEOAS is part of the original REST definition, many production APIs implement only a subset of REST constraints and omit hypermedia controls.

## REST Maturity Model

Leonard Richardson proposed a maturity model that classifies APIs by how fully they embrace REST constraints. This model provides a practical way to assess how RESTful a given service actually is.

| Level | Name | Description |
|-------|------|-------------|
| 0 | The Swamp of POX | A single URI, single HTTP method (typically POST), with operations encoded in the request body. Essentially RPC over HTTP. |
| 1 | Resources | Individual URIs for different resources, but still using a single HTTP method for all operations. |
| 2 | HTTP Verbs | Resources are identified by URIs and manipulated using the appropriate HTTP methods (GET, POST, PUT, DELETE). Most production APIs operate at this level. |
| 3 | Hypermedia Controls | Full HATEOAS. Responses include links that guide the client through available state transitions. |

## Advantages and Limitations

REST's widespread adoption stems from its practical strengths, but it is not the right fit for every scenario.

**Advantages:**

- Leverages existing HTTP infrastructure including caching, load balancing, and security tooling
- Simple to understand and implement for both API providers and consumers
- Statelessness enables straightforward horizontal scaling
- Language and platform agnostic; any system that speaks HTTP can participate
- Mature ecosystem of tooling for documentation, testing, and client generation

**Limitations:**

- Over-fetching and under-fetching are common because resource representations are fixed; clients may receive more data than needed or require multiple requests to assemble a complete view
- No built-in support for real-time communication such as push notifications or streaming
- Batch operations and complex queries can be awkward to express within REST conventions
- The lack of a formal contract or schema (unlike gRPC or GraphQL) can lead to inconsistencies across endpoints
- HATEOAS, while theoretically powerful, is rarely implemented fully in practice

## REST Compared to Alternatives

| Aspect | REST | GraphQL | gRPC |
|--------|------|---------|------|
| Protocol | HTTP/1.1 or HTTP/2 | HTTP (typically POST) | HTTP/2 |
| Data Format | JSON, XML, others | JSON | Protocol Buffers |
| Schema | Informal (OpenAPI optional) | Strongly typed schema | Strongly typed via .proto files |
| Fetching | Fixed resource representations | Client specifies exact fields | Defined by service methods |
| Real-time | Requires polling or WebSockets | Subscriptions | Bidirectional streaming |
| Caching | Native HTTP caching | Requires custom strategies | Limited HTTP caching |
| Browser Support | Native | Native | Requires gRPC-Web proxy |
| Best For | Public APIs, CRUD services, web apps | Complex UIs with varied data needs | Internal microservices, low-latency systems |

REST remains the most common choice for public-facing APIs due to its simplicity and universal HTTP support. GraphQL excels when clients have diverse data requirements and want to avoid multiple round trips. gRPC is favored for internal service-to-service communication where performance and strong typing are priorities.

## Related

Topics to explore next include application programming interface design and documentation with OpenAPI, HTTP protocol fundamentals, content negotiation and media types, authentication and authorization patterns such as OAuth 2.0, API gateway architecture, microservices communication patterns, GraphQL as an alternative query language, gRPC and Protocol Buffers for high-performance services, caching strategies for distributed systems, and rate limiting and throttling for API reliability.

## Summary

Representational State Transfer is an architectural style that uses the existing semantics of HTTP to provide a simple, scalable, and interoperable approach to building web services. Its constraints of statelessness, uniform interface, cacheability, and layered system design have made it the standard for public APIs and web service integration. While REST does not solve every problem, particularly around real-time communication and flexible querying, its alignment with web infrastructure and its low barrier to entry have sustained its dominance for over two decades. A technology professional working with distributed systems should understand REST not only as a practical tool but as a set of architectural principles that inform how networked applications can be designed for durability and scale.

## References

- Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Doctoral dissertation, University of California, Irvine. [https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
- Richardson, L., & Ruby, S. (2007). *RESTful Web Services*. O'Reilly Media.
- Richardson Maturity Model. Martin Fowler. [https://martinfowler.com/articles/richardsonMaturityModel.html](https://martinfowler.com/articles/richardsonMaturityModel.html)
- OpenAPI Specification. [https://spec.openapis.org/oas/latest.html](https://spec.openapis.org/oas/latest.html)
- MDN Web Docs: HTTP. Mozilla. [https://developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- RFC 7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content. [https://www.rfc-editor.org/rfc/rfc7231](https://www.rfc-editor.org/rfc/rfc7231)
- RFC 5789: PATCH Method for HTTP. [https://www.rfc-editor.org/rfc/rfc5789](https://www.rfc-editor.org/rfc/rfc5789)
