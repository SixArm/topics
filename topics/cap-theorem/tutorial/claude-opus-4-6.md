# CAP theorem

## Introduction

The CAP theorem, also known as Brewer's theorem after computer scientist Eric Brewer who first conjectured it in 2000, is a foundational principle of distributed systems design. It was formally proven by Seth Gilbert and Nancy Lynch of MIT in 2002. The theorem states that a distributed data store can provide at most two out of three guarantees simultaneously: Consistency, Availability, and Partition tolerance. Understanding CAP is essential for any technology professional who designs, builds, or operates distributed systems, because it defines the fundamental trade-offs that shape architectural decisions in databases, microservices, cloud platforms, and large-scale web applications.

## The Three Guarantees

The CAP theorem revolves around three properties. Each represents a desirable characteristic of a distributed system, but the theorem proves that achieving all three at once is impossible when network failures can occur.

- **Consistency (C):** Every read operation receives the most recent write or an error. All nodes in the system see the same data at the same time. This is linearizable consistency, meaning the system behaves as if there is a single copy of the data, regardless of how many replicas exist.

- **Availability (A):** Every request received by a non-failing node must result in a response. The system remains operational and responsive, even if the data returned may not reflect the most recent write.

- **Partition tolerance (P):** The system continues to operate despite arbitrary message loss or failure of part of the network. A network partition occurs when communication between groups of nodes is disrupted, causing them to be unable to synchronize.

## Why You Can Only Pick Two

In any real-world distributed system, network partitions are inevitable. Hardware fails, cables get cut, cloud regions lose connectivity. Because partition tolerance is not truly optional for a distributed system deployed across multiple nodes or data centers, the practical choice reduces to a trade-off between consistency and availability during a partition event.

When a partition occurs, the system must decide: should it refuse to serve requests until the partition heals and all nodes are synchronized (preserving consistency but sacrificing availability), or should it continue to serve requests with potentially stale data (preserving availability but sacrificing consistency)? There is no way to guarantee both simultaneously while also tolerating partitions.

## CAP Trade-Off Categories

| Category | Guarantees Provided | Guarantee Sacrificed | Behavior During Partition |
|----------|-------------------|---------------------|--------------------------|
| CP | Consistency + Partition tolerance | Availability | System may reject requests or become unavailable until partition heals, ensuring all responses are consistent |
| AP | Availability + Partition tolerance | Consistency | System continues responding but may return stale or divergent data across nodes |
| CA | Consistency + Availability | Partition tolerance | Only viable on a single node or a network with no partitions; not practical for truly distributed systems |

## Real-World System Examples

Different systems make different CAP trade-offs depending on their use cases. The following table illustrates how well-known distributed data stores align with CAP categories.

| System | CAP Category | Rationale |
|--------|-------------|-----------|
| Traditional RDBMS (single node) | CA | No distribution means no partitions to tolerate; provides strong consistency and availability |
| Apache ZooKeeper | CP | Prioritizes consistent coordination data; may become unavailable during leader election or partition |
| etcd | CP | Provides strongly consistent key-value storage for configuration and service discovery |
| Apache Cassandra | AP | Tunable consistency, but default design favors availability and partition tolerance |
| Amazon DynamoDB | AP | Designed for high availability with eventual consistency; offers optional strong reads |
| MongoDB (replica set) | CP | Default behavior returns consistent reads from primary; secondary nodes may be unavailable during partitions |
| CouchDB | AP | Prioritizes availability with eventual consistency and conflict resolution on sync |

## Consistency Models in Practice

The CAP theorem uses a strict definition of consistency (linearizability), but real systems implement a spectrum of consistency models. Understanding where your system falls on this spectrum is critical.

- **Strong consistency (linearizability):** Every read returns the value of the most recent completed write. This is the "C" in CAP and is the most restrictive model.

- **Sequential consistency:** All operations appear to execute in some sequential order, and each individual node's operations appear in the order issued by that node.

- **Causal consistency:** Operations that are causally related are seen by all nodes in the same order. Concurrent operations may be seen in different orders by different nodes.

- **Eventual consistency:** If no new updates are made, all replicas will eventually converge to the same value. There is no guarantee about how long convergence takes. This is the most relaxed model and is common in AP systems.

- **Read-your-writes consistency:** A client always sees its own writes reflected in subsequent reads, even if other clients may see stale data.

## Common Misconceptions

The CAP theorem is widely cited but frequently misunderstood. Several clarifications are important for technology professionals.

- **CAP is not "pick any two."** Since network partitions are unavoidable in distributed systems, the real choice is between consistency and availability during a partition. When the network is healthy, a system can provide both consistency and availability.

- **CAP does not apply to single-node systems.** If your database runs on one machine, partition tolerance is irrelevant. CAP is specifically about distributed systems.

- **CAP is not all-or-nothing.** Many modern systems allow tunable consistency. For example, Cassandra lets you configure the number of replicas that must acknowledge a read or write, effectively sliding between CP and AP behavior per operation.

- **CAP does not cover latency.** The theorem says nothing about how fast responses arrive. A system can be technically "available" under CAP while having unacceptably high latency.

## PACELC: Extending CAP

Daniel Abadi proposed the PACELC theorem as an extension of CAP to address its limitations. PACELC states: if there is a Partition (P), the system must choose between Availability (A) and Consistency (C); Else (E), when the system is running normally without partitions, it must choose between Latency (L) and Consistency (C).

| Scenario | Trade-Off | Example |
|----------|-----------|---------|
| During partition (PAC) | Availability vs. Consistency | Cassandra chooses A; MongoDB chooses C |
| During normal operation (ELC) | Latency vs. Consistency | Cassandra chooses L (fast, eventual); systems using Raft/Paxos choose C (slower, strong) |

PACELC provides a more nuanced framework because it acknowledges that even when the network is functioning correctly, there is still a trade-off between the latency of responses and the strength of consistency guarantees.

## Practical Design Guidelines

When designing distributed systems, the following guidelines help navigate CAP trade-offs effectively.

- **Identify your domain requirements first.** Financial transactions, healthcare records, and inventory management typically demand strong consistency. Social media feeds, caching layers, and analytics dashboards can tolerate eventual consistency.

- **Accept that partition tolerance is mandatory.** For any system deployed across multiple nodes, you must design for network partitions. The question is not whether partitions will happen, but how your system will behave when they do.

- **Use tunable consistency when possible.** Many modern databases allow per-query or per-table consistency settings. Use strong consistency where correctness matters and relax it where performance and availability are more important.

- **Design for graceful degradation.** Rather than choosing a single CAP category for your entire system, consider different trade-offs for different components. A shopping cart (AP) and a payment processor (CP) can coexist within the same application.

- **Monitor and test for partition scenarios.** Use chaos engineering tools to simulate network partitions and validate that your system behaves as expected under failure conditions.

## Related

Technology professionals studying the CAP theorem should also explore distributed consensus algorithms such as Paxos and Raft, which address how CP systems achieve agreement across nodes. Eventual consistency and conflict resolution strategies such as CRDTs (Conflict-free Replicated Data Types) and vector clocks are essential for understanding AP system design. The PACELC theorem provides a more complete framework for reasoning about distributed system trade-offs. Database replication strategies including leader-follower, multi-leader, and leaderless architectures each make different CAP trade-offs. Broader topics such as distributed systems fundamentals, Byzantine fault tolerance, the split-brain problem, and consensus algorithms provide deeper context for applying CAP in practice.

## Summary

The CAP theorem establishes that any distributed data store must choose between consistency and availability when network partitions occur, since partition tolerance is a practical necessity for distributed systems. This trade-off is not a limitation to be overcome but a fundamental law that guides architectural decisions. In practice, modern systems often implement tunable consistency models, allowing different parts of an application to make different trade-offs based on their specific requirements. By understanding CAP and its extension PACELC, technology professionals can make informed decisions about database selection, replication strategies, and system architecture that align with their application's correctness, performance, and reliability needs.

## References

- Brewer, Eric. "Towards Robust Distributed Systems." Keynote at ACM Symposium on Principles of Distributed Computing (PODC), 2000. The original presentation of the CAP conjecture.
- Gilbert, Seth and Nancy Lynch. "Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services." ACM SIGACT News, 2002. The formal proof of the CAP theorem. Available at: https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf
- Abadi, Daniel. "Consistency Tradeoffs in Modern Distributed Database System Design." IEEE Computer, 2012. Introduction of the PACELC theorem.
- Kleppmann, Martin. *Designing Data-Intensive Applications.* O'Reilly Media, 2017. Chapters 5, 7, and 9 provide thorough coverage of consistency models, replication, and distributed system trade-offs.
- Brewer, Eric. "CAP Twelve Years Later: How the 'Rules' Have Changed." IEEE Computer, 2012. Brewer's own retrospective clarifying common misconceptions about CAP. Available at: https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
