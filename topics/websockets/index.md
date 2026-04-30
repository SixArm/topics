# WebSockets

WebSockets provide a persistent, full-duplex communication channel between a client and a server over a single TCP connection. Unlike traditional HTTP request-response patterns used by REST or GraphQL, WebSockets allow both parties to send data independently at any time, eliminating the overhead of repeatedly establishing new connections.

A WebSocket connection begins as a standard HTTP request. The client sends an Upgrade header requesting a switch to the WebSocket protocol, using either ws:// or wss:// for encrypted connections. Once the server agrees, the HTTP connection is upgraded to a long-lived TCP socket. Both sides can then exchange messages instantly and continuously until either party closes the connection.

WebSockets excel in scenarios demanding low latency and real-time data flow. Because each message avoids the repeated transmission of HTTP headers such as cookies and user-agent strings, data overhead drops significantly. The server can push updates to the client the moment new data is available, replacing inefficient polling strategies. Communication is fully bidirectional, making the client and server equal peers in the exchange.

Common use cases include live chat applications like Slack, financial ticker feeds for stock or cryptocurrency prices, multiplayer gaming where player state must synchronize many times per second, and collaborative editing tools where multiple users modify a shared document simultaneously.

Several considerations apply when adopting WebSockets. Persistent connections consume server resources, so scaling typically requires a pub/sub system like Redis to coordinate messages across multiple server instances. Security best practice mandates using wss:// to encrypt traffic and prevent interception. On mobile devices, maintaining an open socket can increase battery consumption compared to intermittent polling, so developers should weigh real-time needs against power efficiency.
