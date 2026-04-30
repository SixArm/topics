# Software API protocols

Software API protocols define the rules and conventions that applications use to communicate with each other. Choosing the right protocol depends on the use case, performance requirements, and the nature of the interaction between client and server.

REST remains the most widely adopted protocol for public-facing APIs. Its stateless design, use of standard HTTP methods, and universal compatibility make it the default starting point for most integrations. GraphQL has become the preferred alternative for frontend-to-backend communication, allowing clients to request exactly the data they need in a single query and eliminating the over-fetching problems common with REST.

gRPC dominates internal microservices and high-performance workloads. It uses binary Protocol Buffers instead of text-based JSON, delivering significantly faster serialization and lower latency. For event-driven architectures, webhooks invert the typical request model by having the server push notifications to clients when specific events occur, such as payment confirmations or deployment completions.

Real-time communication relies on WebSockets and Server-Sent Events. WebSockets provide full bidirectional channels suitable for live chat and collaborative editing, while SSE offers a simpler one-way stream from server to client for scenarios like live dashboards and stock tickers.

Several trends are shaping the protocol landscape. tRPC is gaining traction in the TypeScript ecosystem by providing end-to-end type safety without a separate schema definition layer. The Model Context Protocol enables AI models to connect directly to data sources and tools. APIs are increasingly designed to be discoverable and consumable by autonomous AI agents, not just human developers. OAuth 2.1 has consolidated as the mandatory baseline for delegated authorization across all protocol choices.
