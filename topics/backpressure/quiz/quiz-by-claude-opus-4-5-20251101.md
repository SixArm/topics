# Backpressure

Question: What is the primary purpose of backpressure in distributed systems?

- [ ] To increase the speed of message processing by parallelizing requests
- [ ] To encrypt communication between services for security
- [ ] To prevent system overload by regulating the flow of incoming requests
- [ ] To compress data before transmitting it across the network

<details>
  <summary>Answer</summary>
  <p>To prevent system overload by regulating the flow of incoming requests</p>
  <p>Backpressure is a flow control mechanism that prevents overload by controlling the rate of incoming requests, ensuring a system can process them at a sustainable pace. When a system receives more requests than it can handle, it can become overloaded and unresponsive. Backpressure techniques—such as queue size limits, flow control signaling, and circuit breakers—help maintain system stability and reliable operation.</p>
</details>
