## Representational State Transfer (REST)

Representational State Transfer (REST) is an architectural style for designing networked applications, particularly web services. Introduced by Roy Fielding in his 2000 doctoral dissertation, REST defines a set of constraints that, when applied to web service design, produce scalable, maintainable, and interoperable systems. REST-compliant services (commonly called RESTful services) leverage the existing infrastructure of the World Wide Web, building on HTTP as the underlying protocol.

## Core Principles of REST

REST architecture is defined by six fundamental constraints that guide system design:

**Client-Server Architecture**: The client and server are separate, independent components that communicate through a standardized interface. This separation allows each to evolve independently—client applications can be redesigned without affecting server logic, and server infrastructure can scale without impacting clients.

**Statelessness**: Each request from client to server must contain all information necessary to understand and process the request. The server maintains no session state between requests. This constraint improves scalability because servers don't need to manage client state, and any server in a cluster can handle any request.

**Cacheability**: Responses must explicitly define themselves as cacheable or non-cacheable. When responses are cacheable, clients and intermediaries can reuse response data, reducing the need for repeated server interactions and improving performance.

**Uniform Interface**: All resources are accessed through a consistent, standardized interface. This simplifies architecture and improves visibility of interactions. The uniform interface is defined by four sub-constraints: identification of resources, manipulation through representations, self-descriptive messages, and hypermedia as the engine of application state (HATEOAS).

**Layered System**: The architecture can be composed of hierarchical layers, with each layer unable to see beyond the immediate layer with which it interacts. This enables load balancing, shared caches, and security policies to be inserted transparently.

**Code on Demand (Optional)**: Servers can temporarily extend client functionality by transferring executable code, such as JavaScript. This is the only optional REST constraint.

## HTTP Methods in REST

RESTful services use standard HTTP methods to perform operations on resources. Each method has specific semantics:

| HTTP Method | Operation | Idempotent | Safe | Description |
|-------------|-----------|------------|------|-------------|
| GET | Read | Yes | Yes | Retrieve a resource representation |
| POST | Create | No | No | Create a new resource or submit data for processing |
| PUT | Replace | Yes | No | Replace an entire resource with the request payload |
| PATCH | Update | No | No | Apply partial modifications to a resource |
| DELETE | Remove | Yes | No | Delete a resource |
| HEAD | Metadata | Yes | Yes | Retrieve headers only, no body |
| OPTIONS | Discover | Yes | Yes | Retrieve supported methods for a resource |

**Idempotent** means multiple identical requests produce the same result as a single request. **Safe** means the operation does not modify server state.

## Resource Identification

Resources are the fundamental abstraction in REST. A resource is any concept that can be addressed—a document, image, service, collection, or abstract concept. Resources are identified by URIs (Uniform Resource Identifiers).

Well-designed resource URIs follow these conventions:

- Use nouns, not verbs (resources are things, not actions)
- Use plural forms for collections (`/users`, not `/user`)
- Use hierarchical structure to express relationships (`/users/42/orders`)
- Avoid file extensions in URIs
- Use lowercase letters and hyphens for readability

| Pattern | Example | Description |
|---------|---------|-------------|
| Collection | `/articles` | All articles |
| Specific resource | `/articles/123` | Article with ID 123 |
| Nested collection | `/articles/123/comments` | Comments on article 123 |
| Nested resource | `/articles/123/comments/456` | Comment 456 on article 123 |

## HTTP Status Codes

REST APIs communicate operation results through HTTP status codes. Proper use of status codes makes APIs predictable and debuggable.

| Range | Category | Common Codes |
|-------|----------|--------------|
| 1xx | Informational | 100 Continue, 101 Switching Protocols |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

**Key status codes for REST operations:**

- **200 OK**: Request succeeded; response body contains result
- **201 Created**: Resource created successfully; include Location header
- **204 No Content**: Request succeeded; no response body (common for DELETE)
- **400 Bad Request**: Malformed request syntax or invalid parameters
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Authenticated but not authorized for this resource
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Request conflicts with current resource state
- **422 Unprocessable Entity**: Request well-formed but semantically invalid
- **500 Internal Server Error**: Unexpected server-side failure

## Content Negotiation

REST APIs can support multiple representation formats for the same resource. Content negotiation allows clients and servers to agree on the format.

**Request headers:**
- `Accept`: Specifies preferred response format (e.g., `application/json`)
- `Content-Type`: Specifies request body format

**Common media types:**
- `application/json`: JSON format (most common for modern APIs)
- `application/xml`: XML format
- `text/html`: HTML format
- `application/hal+json`: Hypertext Application Language
- `application/vnd.api+json`: JSON:API specification

## HATEOAS

Hypermedia as the Engine of Application State (HATEOAS) is a constraint that distinguishes truly RESTful APIs from HTTP-based RPC. With HATEOAS, responses include hyperlinks that allow clients to discover available actions dynamically.

**Benefits of HATEOAS:**
- Clients need minimal hardcoded knowledge of API structure
- API can evolve without breaking clients
- Self-documenting responses guide client behavior
- Reduces coupling between client and server

**Challenges:**
- Increased response payload size
- More complex client implementation
- Limited tooling support compared to simpler approaches

## REST vs Other API Styles

| Aspect | REST | GraphQL | gRPC | SOAP |
|--------|------|---------|------|------|
| Protocol | HTTP | HTTP | HTTP/2 | HTTP, SMTP, others |
| Data Format | JSON, XML, others | JSON | Protocol Buffers | XML |
| Typing | Weak/optional | Strong schema | Strong schema | Strong schema (WSDL) |
| Caching | HTTP caching | Custom | Limited | Limited |
| Discoverability | Via HATEOAS | Introspection | Reflection | WSDL |
| Flexibility | Fixed endpoints | Query-based | Fixed methods | Fixed operations |
| Learning Curve | Low | Medium | Medium | High |
| Best For | Public APIs, web services | Complex queries, mobile | Microservices, streaming | Enterprise integration |

## Best Practices for RESTful API Design

**Versioning**: Include API version in the URI path (`/v1/users`) or via headers. Plan for backward compatibility.

**Pagination**: For large collections, implement pagination using query parameters (`?page=2&limit=20`) or cursor-based approaches. Include metadata about total count and navigation links.

**Filtering and Sorting**: Support query parameters for filtering (`?status=active`) and sorting (`?sort=created_at:desc`).

**Error Responses**: Return consistent error response bodies with:
- Error code or type
- Human-readable message
- Details for debugging (in non-production environments)
- Timestamp and request identifier

**Authentication**: Use standard mechanisms such as OAuth 2.0, API keys, or JWT tokens. Transmit credentials via headers, not URIs.

**Rate Limiting**: Protect services from abuse by limiting request rates. Communicate limits via headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`).

**Documentation**: Provide comprehensive API documentation using standards like OpenAPI (Swagger), enabling automated client generation and interactive exploration.

## Common Misconceptions

**"Using JSON over HTTP equals REST"**: REST is an architectural style with specific constraints. Many JSON APIs are actually RPC-style interfaces that happen to use HTTP.

**"REST requires JSON"**: REST is format-agnostic. XML, HTML, plain text, and other formats are equally valid. JSON is popular due to its simplicity and JavaScript compatibility.

**"All HTTP APIs are RESTful"**: Only APIs adhering to REST constraints qualify as RESTful. Many APIs violate statelessness, lack proper use of HTTP methods, or ignore HATEOAS.

**"PUT and POST are interchangeable"**: PUT replaces an entire resource at a known URI (idempotent). POST creates a new resource or submits data for processing (not idempotent).

## When to Use REST

REST is well-suited for:

- Public-facing APIs requiring broad compatibility
- Systems where caching is important for performance
- CRUD-oriented applications with clear resource models
- Services requiring minimal client-side dependencies
- Teams prioritizing simplicity and convention

Consider alternatives when:

- Clients need highly customized responses (consider GraphQL)
- High-performance binary streaming is required (consider gRPC)
- Real-time bidirectional communication is needed (consider WebSockets)
- Complex enterprise integration with formal contracts is required (consider SOAP)

## Summary

REST provides a proven architectural foundation for building web services that are scalable, maintainable, and interoperable. By adhering to its constraints—statelessness, uniform interface, client-server separation, cacheability, and layered architecture—developers create APIs that leverage the full power of HTTP and the web's existing infrastructure. While REST is not the optimal choice for every scenario, its simplicity, widespread adoption, and excellent tooling make it the default choice for most web API development.
