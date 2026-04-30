# WebSockets

WebSockets provide a persistent, full-duplex communication channel between a client and a server over a single TCP connection. Unlike traditional HTTP request-response patterns used by REST or GraphQL, WebSockets allow both parties to send data independently at any time, eliminating the overhead of repeatedly establishing new connections. The WebSocket protocol, standardized as RFC 6455 by the IETF in 2011, has become a foundational technology for real-time web applications, powering everything from live chat and collaborative editing to financial data feeds and multiplayer games.

## How WebSockets Work

A WebSocket connection begins as a standard HTTP request. The client sends an HTTP GET request with an `Upgrade: websocket` header, signaling its desire to switch protocols. The server responds with HTTP status 101 (Switching Protocols), and the TCP connection is promoted from HTTP to a persistent WebSocket channel. From that point forward, both the client and server can send and receive messages independently, at any time, without waiting for a request from the other side. The connection remains open until either party explicitly closes it or a network interruption occurs.

WebSocket messages are transmitted as lightweight frames rather than full HTTP requests. Each frame contains a small header indicating the payload length, message type (text or binary), and control flags. This framing mechanism keeps per-message overhead to as few as two bytes, compared to the hundreds of bytes of HTTP headers that accompany each REST request. The protocol supports two URI schemes: `ws://` for unencrypted connections and `wss://` for connections secured with TLS, which is the recommended default for production use.

## Key Characteristics

WebSockets differ from other communication approaches in several fundamental ways:

- **Full-duplex communication**: Both client and server can send messages simultaneously without waiting for a response, enabling true bidirectional data flow over a single connection.
- **Persistent connection**: The TCP socket remains open for the duration of the session, avoiding the latency cost of repeatedly establishing and tearing down connections.
- **Low overhead**: After the initial handshake, messages carry minimal framing data, making WebSockets far more efficient than HTTP for frequent, small messages.
- **Server push**: The server can send data to the client proactively the moment new information is available, without the client needing to poll for updates.
- **Event-driven model**: Both endpoints operate on an event-driven paradigm, reacting to incoming messages as they arrive rather than following a strict request-response cycle.

## WebSocket Handshake Process

The WebSocket handshake is the mechanism by which an HTTP connection transitions to a WebSocket connection. The process involves a specific sequence of headers and status codes:

| Step | Actor | Action |
|------|-------|--------|
| 1 | Client | Sends HTTP GET with `Upgrade: websocket` and `Connection: Upgrade` headers, plus a `Sec-WebSocket-Key` containing a random base64-encoded value |
| 2 | Server | Validates the request and computes a response key by concatenating the client key with a magic GUID and hashing with SHA-1 |
| 3 | Server | Returns HTTP 101 Switching Protocols with `Sec-WebSocket-Accept` containing the computed key |
| 4 | Both | The connection is now upgraded; both sides begin exchanging WebSocket frames |

The `Sec-WebSocket-Key` and `Sec-WebSocket-Accept` headers exist to prevent caching proxies from misinterpreting WebSocket traffic as standard HTTP. They do not provide authentication or encryption; those concerns are handled by TLS (via `wss://`) and application-level authentication mechanisms such as tokens passed during or after the handshake.

## WebSockets Compared to Other Communication Patterns

Different communication approaches suit different requirements. The following comparison highlights where WebSockets fit relative to alternatives:

| Feature | WebSockets | HTTP Polling | Server-Sent Events (SSE) | HTTP Long Polling |
|---------|-----------|-------------|-------------------------|-------------------|
| Direction | Full-duplex (bidirectional) | Client-initiated only | Server-to-client only | Client-initiated, server holds response |
| Connection | Persistent TCP socket | New connection per request | Persistent HTTP connection | Held HTTP connection, reconnects after each response |
| Latency | Very low | High (poll interval) | Low for server pushes | Moderate |
| Overhead per message | Minimal (2-14 bytes) | Full HTTP headers each time | Moderate (HTTP streaming) | Full HTTP headers each reconnection |
| Binary data | Native support | Requires encoding | Text only | Requires encoding |
| Browser support | All modern browsers | Universal | All modern browsers | Universal |
| Scalability complexity | Higher (stateful connections) | Lower (stateless) | Moderate | Moderate |

HTTP polling is appropriate when updates are infrequent and latency tolerance is high. Server-Sent Events work well for scenarios requiring only server-to-client push, such as news feeds or notification streams. WebSockets are the right choice when both directions of communication must be low-latency and high-frequency.

## Common Use Cases

WebSockets excel in scenarios that demand real-time, bidirectional communication with minimal latency:

- **Live chat and messaging**: Applications like Slack and Discord rely on WebSockets to deliver messages instantly to all participants in a conversation without polling delays.
- **Financial data feeds**: Stock tickers, cryptocurrency exchanges, and trading platforms stream price updates to clients multiple times per second, where even milliseconds of latency can matter.
- **Multiplayer gaming**: Online games synchronize player positions, actions, and game state across all connected clients many times per second, requiring the low overhead and bidirectional nature of WebSockets.
- **Collaborative editing**: Tools like Google Docs and Figma use WebSocket connections to propagate each user's changes to all other participants in near real time, enabling seamless co-authoring.
- **IoT and telemetry**: Connected devices and sensors stream continuous data to monitoring dashboards, benefiting from the persistent connection and low per-message cost.
- **Live sports and event updates**: Score updates, play-by-play data, and live commentary are pushed to thousands of concurrent viewers without each viewer needing to poll for changes.

## Scaling and Architecture Considerations

Persistent WebSocket connections introduce architectural challenges that stateless HTTP does not. Each open connection consumes memory and a file descriptor on the server, so a single server instance has a finite capacity for concurrent connections. Horizontal scaling requires a message broker or pub/sub system, such as Redis Pub/Sub, Apache Kafka, or NATS, to coordinate messages across multiple server instances so that a message published on one node reaches clients connected to another.

Load balancing WebSocket connections requires session affinity (sticky sessions) or a load balancer that understands the WebSocket protocol, since the long-lived nature of the connection means a client cannot be transparently redirected to a different backend after the handshake. Reverse proxies like NGINX and HAProxy support WebSocket proxying, but require explicit configuration to upgrade connections correctly.

Connection lifecycle management is another critical concern. Servers must handle ungraceful disconnections caused by network failures, implement heartbeat or ping/pong frames to detect dead connections, and manage reconnection logic on the client side to recover from transient failures. Many production systems implement exponential backoff with jitter for reconnection attempts to avoid thundering herd problems when a server restarts.

## Security Best Practices

Securing WebSocket connections requires attention to several layers:

- **Use wss:// in production**: Always encrypt WebSocket traffic with TLS to prevent eavesdropping and man-in-the-middle attacks. The `wss://` scheme provides the same transport security as HTTPS.
- **Authenticate during or after handshake**: Since WebSocket handshakes are standard HTTP requests, authentication tokens can be passed as query parameters, cookies, or custom headers during the upgrade request. Alternatively, the first message after connection can carry credentials.
- **Validate all incoming messages**: Treat data received over WebSockets with the same skepticism as any user input. Validate message format, size, and content to prevent injection attacks or resource exhaustion.
- **Implement rate limiting**: Protect against abusive clients by limiting the number of messages per connection per unit of time and the maximum message size.
- **Apply origin checking**: Validate the `Origin` header during the handshake to prevent cross-site WebSocket hijacking, where a malicious page opens a WebSocket to your server using the victim's cookies.

## Mobile and Resource Considerations

On mobile devices, maintaining a persistent WebSocket connection has implications for battery life and data usage. An open TCP socket prevents the radio from entering low-power idle states, which can drain the battery faster than intermittent polling. Developers targeting mobile clients should evaluate whether the application truly requires continuous real-time updates or whether periodic polling or Server-Sent Events would provide an acceptable user experience with lower power consumption.

Network transitions, such as switching from Wi-Fi to cellular, typically break WebSocket connections. Robust mobile implementations must include automatic reconnection logic, message buffering during disconnections, and mechanisms to reconcile missed messages upon reconnection. Libraries such as Socket.IO, SignalR, and Phoenix Channels provide these resilience features out of the box.

## Related

Professionals working with WebSockets should also explore related communication protocols and patterns, including Server-Sent Events (SSE) for simpler server-push scenarios, gRPC for high-performance RPC with HTTP/2 streaming, MQTT for lightweight publish-subscribe messaging in IoT contexts, GraphQL Subscriptions for real-time data in GraphQL APIs, and the broader topic of API protocol comparisons to understand when each communication approach is most appropriate. Understanding message queue architectures with tools like RabbitMQ, Apache Kafka, and Redis Pub/Sub is also valuable for building scalable WebSocket backends.

## Summary

WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, enabling low-latency, bidirectional data exchange between clients and servers. They are the standard choice for applications requiring real-time interactivity, including live chat, financial data streaming, multiplayer gaming, and collaborative editing. While they introduce architectural complexity around scaling, connection management, and security compared to stateless HTTP, their efficiency for frequent, small messages and their ability to push data from server to client without polling make them indispensable in modern real-time systems. Choosing WebSockets over alternatives like polling or SSE is warranted when both directions of communication must be fast, frequent, and lightweight.

## References

- RFC 6455: The WebSocket Protocol, IETF, https://datatracker.ietf.org/doc/html/rfc6455
- WebSocket API, MDN Web Docs, Mozilla, https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- Writing WebSocket Client Applications, MDN Web Docs, Mozilla, https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
- HTML Living Standard: Web Sockets, WHATWG, https://html.spec.whatwg.org/multipage/web-sockets.html
- WebSocket Protocol, Wikipedia, https://en.wikipedia.org/wiki/WebSocket
