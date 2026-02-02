# Circuit breaker

Question: What is the primary purpose of the circuit breaker pattern in distributed systems?

- [ ] To increase the speed of database queries across microservices
- [ ] To encrypt communication between services for security
- [ ] To prevent cascading failures by isolating faulty services when errors reach a threshold
- [ ] To load balance requests evenly across all available servers

<details>
  <summary>Answer</summary>
  <p>To prevent cascading failures by isolating faulty services when errors reach a threshold</p>
  <p>The circuit breaker pattern monitors system operations and temporarily disables certain functions when a predefined error threshold is reached. This prevents a failure in one service from propagating to other services and causing a cascading failure across the entire distributed system. When tripped, the circuit breaker redirects requests to a fallback system until the primary system recovers.</p>
</details>
