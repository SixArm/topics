# API protocols comparisons

API protocols define how software components communicate over a network, and choosing the right one is a key architectural decision. The most widely used protocols today are REST, gRPC, GraphQL, WebSockets, MQTT, and SOAP, each optimized for different workloads and constraints.

REST is the dominant choice for public-facing web APIs. It uses HTTP methods and JSON payloads, making it easy to understand, debug, and integrate from any client including browsers. REST works best for straightforward CRUD operations and request-response interactions where simplicity and broad tooling support matter most.

gRPC targets high-performance service-to-service communication. It uses Protocol Buffers for binary serialization and HTTP/2 for transport, delivering lower latency and smaller payloads than REST. gRPC enforces strict contracts via .proto files and supports native bidirectional streaming, making it ideal for microservices architectures and real-time internal APIs. Browser support requires a gRPC-Web proxy.

GraphQL gives clients control over the shape and depth of responses through a flexible query language. It eliminates over-fetching and under-fetching problems common with REST, which is valuable for mobile clients and complex frontend applications that aggregate data from multiple domains.

WebSockets provide full-duplex, persistent connections over a single TCP socket. They suit applications that require continuous real-time data flow, such as chat systems, live dashboards, and collaborative editing tools.

MQTT is a lightweight publish-subscribe protocol designed for constrained devices and unreliable networks. It is the standard choice for IoT telemetry and sensor data collection where bandwidth and power consumption are critical.

SOAP remains in use in enterprise and regulated environments where WS-Security, ACID transactions, and formal WSDL contracts are required, though it carries significant complexity compared to modern alternatives.

The right protocol depends on the use case: REST for broad compatibility, gRPC for internal performance, GraphQL for flexible client queries, WebSockets for real-time connections, and MQTT for IoT workloads.
