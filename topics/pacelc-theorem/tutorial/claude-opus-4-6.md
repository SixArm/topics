# PACELC theorem

## Introduction

The PACELC theorem is an extension of the CAP theorem that provides a more complete framework for reasoning about trade-offs in distributed systems. While the CAP theorem captures the tension between consistency and availability during network partitions, PACELC goes further by also addressing the trade-offs that exist during normal operation when the network is functioning correctly. The theorem was formally introduced by Daniel Abadi of Yale University in 2012 and has become a foundational concept for architects and engineers designing distributed databases and large-scale systems. Understanding PACELC is essential for any technology professional who needs to evaluate, select, or build distributed data infrastructure.

## Background: The CAP Theorem

The CAP theorem, formulated by Eric Brewer in 2000 and later proved by Seth Gilbert and Nancy Lynch, states that a distributed system can provide at most two of the following three guarantees simultaneously:

- **Consistency (C):** Every read receives the most recent write or an error.
- **Availability (A):** Every request receives a non-error response, without the guarantee that it contains the most recent write.
- **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network.

In practice, network partitions are inevitable in any distributed system, so the real choice under CAP is between consistency and availability during a partition. However, CAP says nothing about what trade-offs a system makes when the network is operating normally, which is where PACELC fills the gap.

## What PACELC Adds

PACELC extends the CAP theorem by incorporating the trade-off between latency and consistency that exists even when no partition is present. The acronym encodes an if-then-else decision:

- **If** there is a **P**artition, choose between **A**vailability and **C**onsistency.
- **E**lse (when the system is running normally), choose between **L**atency and **C**onsistency.

This formulation acknowledges a critical reality: even when all nodes can communicate freely, enforcing strong consistency requires coordination (such as synchronous replication or consensus protocols), which adds latency. Systems that relax consistency during normal operation can respond faster but may return stale data.

## The PACELC Components

| Component | Meaning | When It Applies |
|-----------|---------|-----------------|
| **P** — Partition Tolerance | The system continues to function when network communication failures isolate subsets of nodes. | Always assumed in distributed systems. |
| **A** — Availability | Every request receives a response (success or failure), even if some nodes are unreachable. | During a network partition. |
| **C** — Consistency (partition case) | Every read returns the most recent write or an error; the system may reject requests to preserve correctness. | During a network partition. |
| **E** — Else (normal operation) | The network is healthy and all nodes can communicate. | When no partition exists. |
| **L** — Latency | The time required to complete a request; lower latency means faster responses. | During normal operation. |
| **C** — Consistency (normal case) | Strong consistency is enforced through coordination protocols, at the cost of additional latency. | During normal operation. |

## PACELC Classification of Distributed Systems

Every distributed system can be classified by how it handles the two trade-off scenarios. The notation follows the pattern: **P + A or C / E + L or C**.

| Classification | Partition Behavior | Normal Behavior | Example Systems |
|----------------|--------------------|-----------------|-----------------|
| **PA/EL** | Favors availability | Favors low latency | Cassandra, DynamoDB, Riak |
| **PC/EC** | Favors consistency | Favors consistency | VoltDB, H-Store, traditional RDBMS with synchronous replication |
| **PA/EC** | Favors availability | Favors consistency | MongoDB (default configuration) |
| **PC/EL** | Favors consistency | Favors low latency | PNUTS (Yahoo), Cosmos DB (tunable) |

## PA/EL Systems

PA/EL systems prioritize availability during partitions and low latency during normal operation. These systems accept that data may be temporarily inconsistent in exchange for always being responsive and fast. They typically use eventual consistency models and asynchronous replication. Apache Cassandra is the canonical example: it continues to serve reads and writes during partitions and, under normal conditions, replicates data asynchronously to minimize response time. This classification suits use cases such as social media feeds, session stores, and analytics pipelines where freshness of data is less critical than responsiveness.

## PC/EC Systems

PC/EC systems enforce strong consistency in both partition and normal scenarios. During a partition, they may refuse requests or block until the partition heals rather than serve potentially stale data. During normal operation, they use synchronous replication or consensus protocols (such as Paxos or Raft), which adds latency but guarantees that every read reflects the latest write. Traditional relational databases with synchronous replication and systems like Google Spanner fall into this category. This classification is appropriate for financial transactions, inventory management, and any domain where correctness is non-negotiable.

## PA/EC Systems

PA/EC systems take a hybrid approach. During a partition, they favor availability and allow reads that may not reflect the latest writes. However, during normal operation, they enforce strong consistency through synchronous replication or majority quorums. MongoDB with its default write concern and replica set configuration is often cited as an example. This approach works well for applications that can tolerate brief inconsistencies during rare network failures but require strong guarantees under normal conditions.

## PC/EL Systems

PC/EL systems favor consistency during partitions but optimize for low latency during normal operation. This is a less common but strategically useful combination. Yahoo's PNUTS system was designed with this philosophy: it enforced consistency guarantees during failures but used geographic replication with relaxed consistency to minimize read latency under normal conditions. Azure Cosmos DB with tunable consistency levels can also operate in this mode. This classification suits globally distributed applications that need fast reads most of the time but cannot tolerate split-brain scenarios.

## Practical Decision Framework

When selecting a distributed database or designing a distributed system, PACELC provides a structured way to reason about requirements:

- **Identify your partition behavior requirement.** Can your application tolerate stale reads during a network failure (PA), or must it block or reject requests to maintain correctness (PC)?
- **Identify your normal operation requirement.** Is sub-millisecond response time critical to your user experience (EL), or is it acceptable to pay a latency penalty for guaranteed consistency (EC)?
- **Map your requirements to a PACELC classification.** Use the four categories to narrow your technology choices.
- **Consider tunability.** Many modern systems, including Cassandra, Cosmos DB, and DynamoDB, allow per-query or per-table consistency tuning, enabling different parts of your application to make different trade-offs.

## PACELC vs. CAP

| Aspect | CAP Theorem | PACELC Theorem |
|--------|-------------|----------------|
| Scope | Trade-offs during partitions only | Trade-offs during partitions and during normal operation |
| Normal operation | Says nothing about latency vs. consistency | Explicitly addresses the latency-consistency trade-off |
| Practical utility | Broad conceptual framework | More actionable for system design decisions |
| System classification | Three categories (CP, AP, CA — though CA is impractical) | Four categories (PA/EL, PC/EC, PA/EC, PC/EL) |
| Partition assumption | Partitions may or may not occur | Partitions are inevitable; the question is what else matters |

## Common Misconceptions

- **PACELC does not replace CAP.** It extends CAP by adding the else clause. The partition-related trade-off from CAP is fully preserved.
- **The "C" appears twice intentionally.** The first C refers to consistency during a partition; the second C refers to consistency during normal operation. They represent the same property but in different operational contexts.
- **Tunability does not eliminate trade-offs.** Systems that offer tunable consistency (such as Cassandra's consistency levels or Cosmos DB's five consistency models) still make trade-offs; they simply let the developer choose where on the spectrum to operate on a per-request basis.
- **Latency is not the same as throughput.** The L in PACELC specifically refers to response time for individual operations, not the overall data processing capacity of the system.

## Related

Technology professionals studying the PACELC theorem should also explore the CAP theorem for foundational context, eventual consistency models and their guarantees, consensus algorithms such as Paxos and Raft that underpin PC/EC systems, distributed database architectures including replication strategies and sharding, the Dynamo paper and Cassandra's architecture as exemplars of PA/EL design, and Google Spanner's TrueTime mechanism as an example of achieving global strong consistency with bounded latency.

## Summary

The PACELC theorem provides a more complete and actionable framework than CAP alone for understanding the fundamental trade-offs in distributed systems. By encoding the decision as "if partition, choose availability or consistency; else, choose latency or consistency," PACELC forces architects to confront the reality that trade-offs exist even when the network is healthy. Classifying systems into PA/EL, PC/EC, PA/EC, or PC/EL categories gives technology professionals a precise vocabulary for evaluating distributed databases and designing systems that match their application's actual requirements for consistency, availability, and performance.

## References

- Abadi, D. (2012). "Consistency Tradeoffs in Modern Distributed Database System Design." *Computer*, 45(2), 37–42. IEEE. https://doi.org/10.1109/MC.2012.33
- Brewer, E. (2000). "Towards Robust Distributed Systems." Keynote at ACM Symposium on Principles of Distributed Computing (PODC).
- Gilbert, S. & Lynch, N. (2002). "Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services." *ACM SIGACT News*, 33(2), 51–59.
- DeCandia, G. et al. (2007). "Dynamo: Amazon's Highly Available Key-Value Store." *Proceedings of the 21st ACM Symposium on Operating Systems Principles (SOSP)*.
- Corbett, J. et al. (2013). "Spanner: Google's Globally-Distributed Database." *ACM Transactions on Computer Systems*, 31(3).
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media.
