# Google remote procedure call

Google remote procedure call (gRPC) is a high-performance, open-source framework developed by Google that allows services to communicate with each other as if they were local function calls. It has become the gold standard for internal microservices communication in modern cloud-native architectures.

## Why use gRPC?

The "g" in gRPC technically stands for something different in every version (e.g., "gentle," "glorious"), but its core strengths are consistent:

- Protocol Buffers (Protobuf): Unlike REST, which uses human-readable JSON, gRPC uses Protobuf, a binary serialization format. This makes payloads significantly smaller and faster to process.
- Contract-First Development: You define your API in a .proto file. gRPC then generates the client and server code for you in almost any language (Java, Python, Go, C#, etc.), ensuring both sides stay in sync.
- HTTP/2 Based: It uses HTTP/2 as its transport layer, enabling features like multiplexing (multiple requests over one connection) and bidirectional streaming.
- Strict Typing: Because the schema is defined upfront, you get compile-time errors if you try to send the wrong data type, reducing "runtime surprises."

## Types of gRPC Communication

1.  Unary: The traditional request-response (one client request, one server response).
2.  Server Streaming: The client sends one request and gets a stream of responses (e.g., a live sports ticker).
3.  Client Streaming: The client sends a stream of data, and the server responds once (e.g., uploading a large file in chunks).
4.  Bidirectional Streaming: Both sides send a stream of messages simultaneously (e.g., a real-time chat or navigation app).

## Best Use Cases

- Microservices: Connecting hundreds of internal services where low latency is critical.
- Polyglot Systems: When you have a Go backend talking to a Java service and a Python data-processing engine.
- Real-time Services: Any application requiring constant, two-way data flow.
