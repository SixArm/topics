# Database replication

Database replication is the process of copying and synchronizing data from one database instance to one or more additional instances, ensuring that identical information exists across multiple locations. It is a foundational technique in modern distributed systems, underpinning high availability, disaster recovery, horizontal read scaling, and geographic distribution. Any technology professional working with production databases, cloud infrastructure, or distributed architectures needs a thorough understanding of how replication works, the trade-offs involved, and the operational considerations that determine which replication strategy is appropriate for a given workload.

## Why replication matters

Organizations replicate databases for several reinforcing reasons. A single database server represents a single point of failure: if it goes down, every application that depends on it becomes unavailable. Replication eliminates that risk by maintaining one or more copies that can assume the primary role when needed. Beyond fault tolerance, replication enables read-heavy workloads to be distributed across multiple nodes, reducing latency for end users and preventing the primary server from becoming a bottleneck. In globally distributed systems, placing replicas closer to users in different regions reduces round-trip time and improves perceived performance.

Key motivations include:

- **High availability** — automatic or manual failover to a replica when the primary becomes unreachable.
- **Disaster recovery** — maintaining a geographically separated copy that can be promoted if an entire data center is lost.
- **Read scaling** — offloading SELECT queries to replicas so the primary handles only writes.
- **Analytics isolation** — running expensive reporting or ETL queries against a replica without degrading transactional performance.
- **Data locality** — placing replicas near users in different regions to reduce latency.

## Replication topologies

The topology defines how nodes relate to each other and how data flows between them.

### Primary-replica (master-slave) replication

In this topology a single primary node accepts all write operations. Changes are propagated to one or more read-only replicas. Clients direct reads to replicas and writes to the primary. This is the most common topology and the simplest to reason about because there is a single source of truth for writes at any given moment. The primary limitation is that the primary is still a write bottleneck, and failover requires promoting a replica and redirecting traffic.

### Multi-primary (master-master) replication

Multiple nodes accept writes simultaneously. Each node replicates its changes to every other node. This topology increases write availability and supports geographic distribution of write traffic. However, it introduces the possibility of write conflicts when two nodes modify the same row concurrently. Conflict resolution strategies — last-write-wins, application-level resolution, or conflict-free replicated data types (CRDTs) — add complexity and must be carefully chosen based on the application's consistency requirements.

### Cascading replication

A replica itself feeds changes to downstream replicas, forming a chain or tree. This reduces the replication load on the primary, which only needs to ship changes to a small number of immediate replicas. The trade-off is increased replication lag for nodes further down the chain.

| Topology | Write nodes | Conflict risk | Complexity | Typical use case |
|---|---|---|---|---|
| Primary-replica | 1 | None | Low | Read-heavy web applications |
| Multi-primary | 2+ | High | High | Multi-region write availability |
| Cascading | 1 | None | Medium | Large replica fan-out with constrained primary resources |

## Synchronous vs. asynchronous replication

The timing of how changes propagate from the primary to replicas is one of the most consequential design decisions.

**Synchronous replication** requires the primary to wait for at least one replica to acknowledge receipt (and often durable write) of each transaction before confirming the commit to the client. This guarantees that the replica has a copy of every committed transaction and that no data is lost during failover. The cost is increased write latency because every commit must include a network round trip, and write throughput is bounded by the slowest replica in the synchronous set.

**Asynchronous replication** allows the primary to commit and acknowledge the transaction to the client immediately. Changes are shipped to replicas in the background. This minimizes write latency and maximizes throughput on the primary, but introduces a window during which the replica may be behind. If the primary fails during that window, committed transactions that have not yet reached the replica are lost.

**Semi-synchronous replication** is a practical middle ground used by systems such as MySQL. The primary waits for acknowledgement from at least one replica before confirming the commit, but does not require all replicas to acknowledge. This provides a stronger durability guarantee than fully asynchronous replication while limiting the latency penalty.

| Mode | Write latency | Data loss risk on failover | Throughput impact | Example systems |
|---|---|---|---|---|
| Synchronous | Higher | None (zero RPO) | Significant | PostgreSQL synchronous standby, Oracle Data Guard (sync) |
| Asynchronous | Lowest | Possible (non-zero RPO) | Minimal | MySQL default replication, MongoDB replica sets (default) |
| Semi-synchronous | Moderate | Minimal | Moderate | MySQL semi-sync plugin, PostgreSQL quorum commit |

## Replication methods

The mechanism by which changes are captured and transmitted varies across database systems.

- **Statement-based replication** — the primary logs each SQL statement and replays it on the replica. This is compact but can produce different results for non-deterministic functions such as `NOW()` or `RAND()`.
- **Row-based replication** — the primary logs the before and after state of each modified row. This avoids non-determinism but generates larger log volumes for bulk operations.
- **Write-ahead log (WAL) shipping** — the primary ships its physical or logical WAL segments to replicas, which replay them. PostgreSQL streaming replication uses this approach. Physical WAL shipping is tightly coupled to the storage engine version; logical replication decouples the two.
- **Trigger-based replication** — custom triggers on the primary capture changes and write them to a replication queue. This is the most flexible but also the slowest and most fragile method.

## Consistency and lag

Replication lag is the delay between a write being committed on the primary and that write becoming visible on a replica. In asynchronous configurations, lag is unavoidable and can range from sub-second under normal conditions to minutes or hours during heavy write bursts or network degradation.

Lag creates several consistency challenges:

- **Read-your-writes** — a user writes data and then immediately reads it from a replica that has not yet received the update, seeing stale results.
- **Monotonic reads** — successive reads from different replicas can appear to go backward in time if one replica is more up-to-date than another.
- **Causal consistency** — a sequence of causally related operations may appear out of order on a replica.

Mitigation strategies include routing a user's reads to the same replica (session affinity), reading from the primary for a short window after a write, or using logical timestamps to ensure clients do not read data older than what they have already observed.

## Failover

Failover is the process of promoting a replica to become the new primary when the current primary becomes unavailable. It can be manual, automated, or orchestrated by a consensus protocol.

- **Manual failover** — an operator identifies the failure, selects the most up-to-date replica, promotes it, and reconfigures clients or load balancers. This is the safest but slowest approach.
- **Automated failover** — a monitoring system or built-in cluster manager detects the failure and promotes a replica automatically. Systems such as PostgreSQL Patroni, MySQL Group Replication, and MongoDB replica sets provide automated failover. The risk is split-brain, where two nodes both believe they are the primary.
- **Consensus-based failover** — nodes use a distributed consensus algorithm (Raft, Paxos) to agree on a new leader. This eliminates split-brain at the cost of requiring an odd number of voting members and tolerating only a minority of failures.

## Operational considerations

Running replicated databases in production involves ongoing attention to several areas:

- **Monitoring replication lag** — track seconds-behind-primary or LSN (log sequence number) difference and alert when lag exceeds acceptable thresholds.
- **Schema changes** — DDL operations on the primary must be compatible with the replication method. Some approaches require careful rolling schema changes to avoid breaking replication.
- **Network partitions** — replication depends on network connectivity. Plan for what happens when replicas cannot reach the primary: do they continue serving stale reads, or do they refuse queries?
- **Capacity planning** — each replica consumes CPU, memory, and storage proportional to the primary's write workload. Adding replicas scales reads but not writes.
- **Security** — replication traffic should be encrypted in transit (TLS) and replicas should enforce the same access controls as the primary.
- **Testing failover** — regularly exercise failover procedures in non-production environments. An untested failover plan is not a plan.

## Related

Professionals studying database replication should also explore database sharding for horizontal write scaling, the CAP theorem and its practical implications for distributed data systems, consensus algorithms such as Raft and Paxos, distributed transactions and two-phase commit, event sourcing and change data capture as complementary data propagation patterns, and database high availability architectures that combine replication with load balancing and connection pooling.

## Summary

Database replication copies data across multiple database instances to achieve high availability, disaster recovery, read scaling, and geographic distribution. The choice between primary-replica and multi-primary topologies, synchronous and asynchronous propagation, and statement-based versus row-based or WAL-based methods depends on the application's tolerance for replication lag, its write throughput requirements, and its consistency guarantees. Effective replication requires not only selecting the right configuration but also investing in monitoring, failover testing, and operational procedures that ensure the system behaves correctly when components fail.

## References

- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media. Chapters 5 and 9.
- PostgreSQL Documentation: High Availability, Load Balancing, and Replication. https://www.postgresql.org/docs/current/high-availability.html
- MySQL Reference Manual: Replication. https://dev.mysql.com/doc/refman/8.0/en/replication.html
- MongoDB Manual: Replication. https://www.mongodb.com/docs/manual/replication/
- Ongaro, D., & Ousterhout, J. (2014). "In Search of an Understandable Consensus Algorithm (Raft)." USENIX ATC.
- Tanenbaum, A. S., & Van Steen, M. (2017). *Distributed Systems: Principles and Paradigms*. 3rd Edition. Pearson.
