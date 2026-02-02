# Eventually-consistent database

Question: What is the primary reason for using eventually-consistent databases in distributed systems?

- [ ] To ensure real-time data synchronization across all nodes
- [ ] To provide stronger ACID transaction guarantees than traditional databases
- [ ] To maintain high availability even during network partitions or node failures
- [ ] To eliminate the need for conflict resolution mechanisms

<details>
  <summary>Answer</summary>
  <p>To maintain high availability even during network partitions or node failures</p>
  <p>Eventually-consistent databases are designed to remain highly available by allowing updates to be applied independently and asynchronously across multiple nodes. This means the system can continue to respond to requests even when some nodes are temporarily unavailable or disconnected from the network. The tradeoff for this high availability is weaker consistency guarantees, as different copies of data may be temporarily out of sync.</p>
</details>
