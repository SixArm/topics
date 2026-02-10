# Remote Procedure Call (RPC)

Remote Procedure Call (RPC) is a software architecture approach that enables communication between applications or software components distributed across different computers, networks, or devices. RPC allows a program to execute a procedure or function on a remote server as if it were a local call, abstracting away the complexities of network communication. First conceptualized in the 1980s by Andrew Birrell and Bruce Nelson at Xerox PARC, RPC has become a foundational mechanism for building distributed systems, microservices, and modern cloud-native applications.

## How RPC Works

An RPC interaction follows a well-defined request-response lifecycle between a client and a server. The client program invokes a function through a local proxy, often called a **stub**, which represents the remote procedure. The client-side RPC framework serializes the function name, parameters, and metadata into a message through a process called **marshalling**, then transmits that message over the network to the server.

On the server side, the RPC framework receives the incoming message, deserializes (unmarshals) the request, and invokes the specified function or procedure using the provided parameters. The function executes on the server, produces a result, and the server-side framework marshals the result into a response message sent back to the client. The client-side framework then deserializes the response and returns the result to the calling program, completing the round trip.

This process is designed to be **location-transparent**: the calling code does not need to know whether the procedure runs locally or on a remote machine. The stub and the RPC framework handle all serialization, transport, error handling, and deserialization behind the scenes.

## Key Components

RPC systems are composed of several interacting components that work together to provide seamless remote invocation:

- **Client stub**: A local proxy object that exposes the same interface as the remote procedure. It intercepts the call, serializes the arguments, and forwards the request to the transport layer.
- **Server stub (skeleton)**: The server-side counterpart that receives incoming messages, deserializes them, and dispatches the call to the actual implementation of the procedure.
- **Serialization format**: The encoding scheme used to convert function parameters and return values into a byte stream suitable for network transmission. Common formats include Protocol Buffers, JSON, MessagePack, and Thrift Binary Protocol.
- **Transport protocol**: The underlying network protocol used to carry messages between client and server, such as TCP, HTTP/1.1, or HTTP/2.
- **Interface Definition Language (IDL)**: A language-neutral specification that defines the service contract, including available methods, parameter types, and return types. Examples include Protocol Buffers `.proto` files and Apache Thrift `.thrift` files.
- **Service registry / discovery**: In larger systems, a mechanism for clients to locate available server instances, often integrated with load balancing.

## RPC Versus REST

RPC and REST are two dominant paradigms for inter-service communication, each with distinct design philosophies. The following table highlights their core differences:

| Aspect | RPC | REST |
|---|---|---|
| Abstraction model | Action-oriented: call a procedure | Resource-oriented: manipulate resources via URLs |
| Interface contract | Strongly typed IDL (e.g., Protobuf) | Loosely defined (OpenAPI/Swagger optional) |
| Transport | Typically HTTP/2, TCP, or custom | Typically HTTP/1.1 or HTTP/2 |
| Payload format | Binary (Protobuf, Thrift) or JSON | Usually JSON or XML |
| Performance | Generally faster due to binary serialization and persistent connections | Higher overhead due to text-based payloads and stateless design |
| Discoverability | Requires shared IDL or documentation | Self-describing through standard HTTP methods and URLs |
| Browser support | Limited without a gateway or proxy | Native browser support |
| Coupling | Tighter coupling via shared interface definitions | Looser coupling through uniform interface |

RPC is favored for internal service-to-service communication where performance and strict typing matter. REST remains the default choice for public-facing APIs and scenarios where broad client compatibility is important.

## Common RPC Frameworks

Several mature frameworks implement the RPC paradigm, each with different strengths:

- **gRPC**: Developed by Google, gRPC uses Protocol Buffers for serialization and HTTP/2 for transport. It supports bidirectional streaming, deadline propagation, and automatic code generation in over a dozen languages. It is the most widely adopted modern RPC framework.
- **Apache Thrift**: Originally created at Facebook, Thrift provides its own IDL and supports multiple serialization formats and transport layers. It generates client and server code for many languages.
- **Apache Avro**: Part of the Hadoop ecosystem, Avro uses JSON-based schemas and supports schema evolution. It is commonly used in data pipeline and big data contexts.
- **JSON-RPC**: A lightweight, transport-agnostic protocol that uses JSON for encoding. It is simple to implement but lacks features like streaming and strong typing.
- **XML-RPC**: An older protocol that encodes calls in XML over HTTP. It was a precursor to SOAP and is now largely superseded by more efficient alternatives.
- **Java RMI (Remote Method Invocation)**: A Java-specific RPC mechanism that allows objects in one JVM to invoke methods on objects in another JVM.
- **Microsoft .NET Remoting / WCF**: Microsoft's RPC technologies for the .NET ecosystem, with WCF (Windows Communication Foundation) offering a more flexible and configurable successor to .NET Remoting.

## Synchronous Versus Asynchronous RPC

Traditional RPC is synchronous: the client blocks and waits for the server to return a result before continuing execution. This model is straightforward but can lead to performance bottlenecks and cascading failures in distributed systems when remote calls are slow or unresponsive.

Asynchronous RPC addresses these limitations by allowing the client to continue processing while the remote call is in progress. The result is delivered later through callbacks, futures, promises, or streaming responses. gRPC, for example, natively supports asynchronous calls and four communication patterns: unary (single request, single response), server streaming, client streaming, and bidirectional streaming. Asynchronous RPC improves throughput and resilience but adds complexity in error handling and flow control.

## Advantages and Challenges

RPC provides significant benefits for distributed system design, but it also introduces challenges that architects must address:

**Advantages:**

- **Transparency**: Developers interact with remote services using familiar function-call syntax, reducing cognitive overhead.
- **Strong typing**: IDL-based systems catch interface mismatches at compile time rather than at runtime.
- **Performance**: Binary serialization and persistent connections deliver lower latency and higher throughput than text-based alternatives.
- **Code generation**: Frameworks automatically generate client and server stubs from IDL definitions, reducing boilerplate and ensuring consistency.
- **Streaming support**: Modern frameworks like gRPC support streaming data in both directions, enabling real-time use cases.

**Challenges:**

- **Network transparency is a leaky abstraction**: Remote calls are fundamentally different from local calls in terms of latency, partial failure, and concurrency. Treating them identically can lead to fragile systems.
- **Tight coupling**: Shared interface definitions create compile-time dependencies between services, making independent deployment more difficult without careful versioning.
- **Debugging complexity**: Tracing a call across network boundaries requires distributed tracing infrastructure such as OpenTelemetry or Jaeger.
- **Error handling**: Network failures, timeouts, and partial results require explicit handling strategies such as retries with exponential backoff, circuit breakers, and idempotency guarantees.
- **Schema evolution**: Changing an IDL requires coordinating updates across all clients and servers, demanding a disciplined approach to backward and forward compatibility.

## Use Cases

RPC is particularly well-suited to specific architectural contexts:

- **Microservices communication**: Internal service-to-service calls within a microservices architecture benefit from RPC's performance and strict contracts. gRPC has become a standard choice for this purpose.
- **Real-time systems**: Streaming RPC enables applications such as live dashboards, chat systems, and telemetry pipelines where data flows continuously between endpoints.
- **Polyglot environments**: IDL-based code generation allows services written in different programming languages to communicate seamlessly.
- **Mobile and IoT backends**: Binary protocols minimize payload size and bandwidth consumption, which is critical for mobile networks and constrained devices.
- **Database and storage systems**: Many distributed databases and storage engines use RPC internally for node-to-node communication and replication.

## Related

To deepen your understanding of RPC and its ecosystem, explore these related topics: microservices architecture for the broader design context in which RPC operates; API design and interface definition languages for contract-first development practices; Protocol Buffers and serialization formats for understanding how data is encoded on the wire; service mesh and service discovery for managing RPC traffic at scale; distributed systems and the CAP theorem for the theoretical foundations underlying networked communication; event-driven architecture and message queues as alternative integration patterns; and gRPC specifically for the most widely adopted modern RPC framework.

## Summary

Remote Procedure Call is a foundational distributed systems pattern that enables programs to invoke functions on remote servers with the simplicity of a local call. By abstracting serialization, transport, and deserialization behind client and server stubs, RPC reduces the complexity of building networked applications. Modern frameworks like gRPC have advanced the paradigm with binary serialization, HTTP/2 transport, streaming, and polyglot code generation, making RPC the dominant choice for high-performance internal service communication. However, architects must remain mindful that network calls are not local calls: latency, partial failure, versioning, and observability require deliberate design. When applied with discipline, RPC delivers a powerful, efficient, and type-safe foundation for distributed system integration.

## References

- Birrell, A.D. and Nelson, B.J. "Implementing Remote Procedure Calls." ACM Transactions on Computer Systems, 2(1), 1984. https://dl.acm.org/doi/10.1145/2080.357392
- gRPC official documentation. https://grpc.io/docs/
- Google. "Protocol Buffers Language Guide." https://protobuf.dev/programming-guides/proto3/
- Apache Thrift official documentation. https://thrift.apache.org/
- Waldo, J., Wyant, G., Wollrath, A., and Kendall, S. "A Note on Distributed Computing." Sun Microsystems Laboratories, 1994. https://scholar.harvard.edu/waldo/publications/note-distributed-computing
- gRPC concepts: RPC life cycle. https://grpc.io/docs/what-is-grpc/core-concepts/
- JSON-RPC 2.0 Specification. https://www.jsonrpc.org/specification
