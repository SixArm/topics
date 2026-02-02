# Actor programming

Question: What is the fundamental characteristic that makes actors well-suited for distributed systems with high latency and fault tolerance requirements?

- [ ] Actors share a global state that is synchronized across all nodes
- [ ] Actors use synchronous blocking calls to ensure message delivery
- [ ] Actors are heavyweight processes that guarantee strong consistency
- [ ] Actors are lightweight with minimal shared state and communicate via asynchronous messages

<details>
  <summary>Answer</summary>
  <p>Actors are lightweight with minimal shared state and communicate via asynchronous messages</p>
  <p>Actors are designed to be lightweight and have minimal shared state, which makes them well suited for distributed systems where latency and fault tolerance are critical. They interact through asynchronous message passing, meaning actors do not block while waiting for responses. This design allows actors to be distributed across multiple machines while providing mechanisms for load balancing, failure detection, and recovery.</p>
</details>
