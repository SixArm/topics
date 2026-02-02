# PACELC Theorem

Question: According to the PACELC theorem, what trade-off must a distributed system make when a network partition occurs?

- [ ] Between latency and cost
- [ ] Between consistency and availability
- [ ] Between throughput and durability
- [ ] Between scalability and fault tolerance

<details>
  <summary>Answer</summary>
  <p>Between consistency and availability</p>
  <p>The PACELC theorem extends the CAP theorem and states that when a network partition occurs, a distributed system must choose between availability (continuing to respond to requests) and consistency (ensuring all nodes return the same data). This is the fundamental trade-off at the heart of distributed systems design during partition scenarios.</p>
</details>
