# WebSockets

WebSockets provide a persistent, full-duplex connection between a client (like a browser) and a server. Unlike REST or GraphQL, which follow a "request-response" pattern, WebSockets allow both parties to send data at any time without the overhead of opening a new connection. [1, 2, 3, 4, 5] 

## How It Works: The Handshake

A WebSocket connection starts as a standard HTTP request. The client sends an Upgrade header asking to switch to the WebSocket protocol (ws:// or wss://). Once the server agrees, the HTTP connection is "upgraded" to a long-lived TCP socket, and they can trade messages instantly until one side closes it. [6, 7, 8, 9, 10] 

## Why Use WebSockets?

* Low Latency: There is no need to send HTTP headers (cookies, User-Agents, etc.) with every message, which drastically reduces data overhead. [11, 12, 13] 
* Real-Time "Push": The server can push data to the client the millisecond it's available—no more "polling" every 5 seconds to see if there's an update. [14, 15] 
* Bi-directional: Both the client and server are equal peers; either can initiate a message. [16, 17, 18, 19, 20] 

## Best Use Cases

* Live Chat Apps: Instant messaging where speed is critical (e.g., Slack, WhatsApp Web).
* Financial Tickers: Real-time stock prices or crypto exchange data.
* Multiplayer Gaming: Sending player positions and actions dozens of times per second.
* Collaborative Tools: Multiple users editing a document simultaneously (e.g., Google Docs or Figma). [21, 22, 23, 24, 25] 

## Important Considerations

   1. Scaling: Because connections are persistent, a server can only handle a finite number of active "open" sockets. You often need a Pub/Sub system (like Redis) to sync messages across multiple server instances.
   2. Security: Always use wss:// (the encrypted version) to prevent "man-in-the-middle" attacks, just as you use HTTPS.
   3. Battery Life: On mobile devices, keeping a socket open can drain the battery faster than intermittent polling. [31, 32, 33, 34, 35] 
