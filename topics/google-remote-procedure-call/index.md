# Google remote procedure call

Google remote procedure call (gRPC) is a high-performance, open-source framework developed by Google that enables services to communicate with each other as if they were local function calls. It has become the standard for internal microservices communication in modern cloud-native architectures.

gRPC uses Protocol Buffers (Protobuf), a binary serialization format, instead of human-readable JSON. This makes payloads significantly smaller and faster to process. Developers define their API in a .proto file, and gRPC generates client and server code in nearly any language, including Java, Python, Go, and C#. This contract-first approach ensures both sides stay in sync and provides compile-time errors when data types are mismatched, reducing runtime surprises.

gRPC runs on HTTP/2, which enables multiplexing of multiple requests over a single connection and supports bidirectional streaming. This foundation gives gRPC four communication patterns: unary, which is the traditional single request and single response; server streaming, where one client request yields a stream of responses; client streaming, where the client sends a stream of data and the server responds once; and bidirectional streaming, where both sides exchange messages simultaneously.

The framework excels in microservices environments where hundreds of internal services require low-latency communication. It is well suited to polyglot systems where services written in different languages need a shared contract, and to real-time applications that depend on constant, two-way data flow. For these scenarios, gRPC delivers measurable advantages in throughput, type safety, and developer productivity compared to REST-based alternatives.
