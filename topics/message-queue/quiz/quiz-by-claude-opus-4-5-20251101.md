# Message queue

Question: What is the primary benefit of using a message queue for communication between software components?

- [ ] It requires all components to share the same database connection
- [ ] It enables loose coupling by allowing components to operate independently and at their own pace
- [ ] It forces synchronous communication to ensure message delivery order
- [ ] It eliminates the need for network protocols between distributed systems

<details>
  <summary>Answer</summary>
  <p>It enables loose coupling by allowing components to operate independently and at their own pace</p>
  <p>A message queue allows processes to communicate asynchronously by putting and getting messages from a queue. This loose coupling means each component can operate at its own pace without direct knowledge of the state or operation of other components, enabling benefits like decoupling, asynchronous processing, load balancing, and event-driven architectures.</p>
</details>
