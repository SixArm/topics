# Representational State Transfer (REST)

Question: Which principle of REST requires that each client request to the server must contain all the information needed to process the request, with the server maintaining no session state between requests?

- [ ] Layered System
- [ ] Stateless
- [ ] Uniform Interface
- [ ] Client-Server Architecture

<details>
  <summary>Answer</summary>
  <p>Stateless</p>
  <p>The Stateless principle is a core REST constraint requiring that every request from the client to the server must contain all the necessary information required to complete the request. The server does not maintain any state about the client between requests. This improves scalability because the server doesn't need to store session information, and any server can handle any request without needing context from previous interactions.</p>
</details>
