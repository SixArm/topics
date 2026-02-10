# Distributed database

A distributed database is a database system composed of multiple interconnected nodes spread across a computer network, potentially spanning multiple sites and geographical locations. Each node maintains its own database management system (DBMS), and these systems communicate with one another to share data, coordinate transactions, and maintain consistency. Distributed databases are foundational to modern cloud-native architectures, global-scale applications, and any system that must serve data reliably across regions. Understanding how they work is essential for any technology professional designing resilient, performant data infrastructure.

## Why distributed databases exist

Traditional centralized databases store all data on a single server or cluster in one location. This model becomes a bottleneck as data volumes grow, user bases become geographically dispersed, and uptime requirements approach 100%. Distributed databases address these constraints by partitioning and replicating data across multiple nodes. The core motivations include:

- **Scalability**: Horizontal scaling by adding nodes rather than upgrading a single machine.
- **Availability**: Continued operation even when individual nodes or entire data centers fail.
- **Latency reduction**: Placing data closer to the users and services that need it.
- **Regulatory compliance**: Storing data within specific jurisdictions to meet legal requirements.
- **Workload isolation**: Separating read and write traffic or analytical and transactional workloads across different nodes.

## Architecture models

Distributed databases follow several architectural patterns, each with different trade-offs in complexity, consistency, and performance.

| Architecture | Description | Consistency model | Typical use case |
|---|---|---|---|
| **Shared-nothing** | Each node has its own CPU, memory, and storage. No resources are shared between nodes. | Varies (often eventual) | Web-scale applications, NoSQL workloads |
| **Shared-disk** | Nodes share a common storage layer but have independent compute. | Strong (via shared storage) | Enterprise OLTP, Oracle RAC |
| **Multi-master** | Every node can accept writes. Conflicts are resolved through protocols or application logic. | Eventual or strong | Globally distributed writes, collaborative systems |
| **Single-leader** | One node handles all writes; replicas serve reads. | Strong (leader) / eventual (replicas) | Read-heavy workloads, traditional replication |
| **Consensus-based** | Nodes use a consensus protocol (Paxos, Raft) to agree on every write. | Strong (linearizable) | Financial systems, coordination services |

## Data distribution strategies

How data is placed across nodes determines query performance, storage efficiency, and fault tolerance.

- **Horizontal partitioning (sharding)**: Rows are divided across nodes based on a partition key. Each shard holds a subset of the data. This is the most common strategy for scaling writes.
- **Vertical partitioning**: Different columns or column families are stored on different nodes. Useful when access patterns clearly separate hot and cold columns.
- **Range partitioning**: Data is split into contiguous ranges of the partition key. Good for range queries but prone to hotspots if traffic concentrates on recent data.
- **Hash partitioning**: A hash function distributes rows uniformly across nodes. Eliminates hotspots but makes range queries expensive.
- **Consistent hashing**: A variant of hash partitioning that minimizes data movement when nodes are added or removed. Used by Amazon DynamoDB and Apache Cassandra.

## Replication

Replication copies data across multiple nodes to improve availability and read performance. The key design decisions are how many replicas to maintain, where to place them, and how to keep them synchronized.

| Replication strategy | How it works | Trade-off |
|---|---|---|
| **Synchronous** | Writes are confirmed only after all replicas acknowledge. | Strong consistency at the cost of higher write latency. |
| **Asynchronous** | Writes are confirmed after the primary acknowledges; replicas catch up later. | Lower write latency but risk of data loss on primary failure. |
| **Semi-synchronous** | Writes are confirmed after at least one replica acknowledges. | Balances latency and durability. |
| **Quorum-based** | Writes and reads require acknowledgment from a configurable majority of replicas. | Tunable consistency; the standard approach in systems like Cassandra. |

## The CAP theorem and its practical implications

The CAP theorem states that a distributed system can guarantee at most two of three properties simultaneously: Consistency, Availability, and Partition tolerance. Since network partitions are unavoidable in real distributed systems, the practical choice is between consistency and availability during a partition.

- **CP systems** (e.g., Google Spanner, etcd) prioritize consistency. During a network partition, some requests may be rejected to prevent stale reads or conflicting writes.
- **AP systems** (e.g., Cassandra, DynamoDB in eventual consistency mode) prioritize availability. During a partition, every node continues to serve requests, but responses may be stale or conflicting.
- **PACELC extension**: When there is no partition, the trade-off shifts to latency versus consistency. A system that chooses consistency during partitions may still favor latency over strict consistency during normal operation.

## Distributed transactions

Maintaining transactional guarantees across multiple nodes is one of the hardest problems in distributed databases. Several protocols exist:

- **Two-phase commit (2PC)**: A coordinator asks all participants to prepare, then instructs them to commit or abort. Simple but blocking; a coordinator failure can stall the entire transaction.
- **Three-phase commit (3PC)**: Adds a pre-commit phase to reduce blocking, though it remains vulnerable to network partitions.
- **Saga pattern**: Breaks a long-running transaction into a sequence of local transactions, each with a compensating action. Commonly used in microservice architectures.
- **Distributed consensus (Paxos/Raft)**: Used by systems like CockroachDB and Google Spanner to achieve serializable isolation across nodes without a single coordinator.
- **TrueTime (Spanner)**: Google Spanner uses GPS and atomic clocks to bound clock uncertainty, enabling globally consistent timestamps and externally consistent transactions.

## Consistency models

Different distributed databases offer different consistency guarantees. The choice depends on the application's tolerance for stale or conflicting data.

| Consistency level | Guarantee | Example systems |
|---|---|---|
| **Linearizability** | Every read returns the most recent write. Operations appear to execute instantaneously at some point between invocation and response. | Google Spanner, etcd |
| **Sequential consistency** | All operations appear in the same order to all nodes, though that order may not match real-time ordering. | ZooKeeper |
| **Causal consistency** | Operations that are causally related are seen in the same order by all nodes. Concurrent operations may be seen in different orders. | MongoDB (causal sessions) |
| **Eventual consistency** | All replicas converge to the same state given sufficient time without new updates. | Cassandra, DynamoDB |
| **Read-your-writes** | A client always sees its own writes. Other clients may see stale data. | Many systems via sticky sessions |

## Advantages and challenges

**Advantages:**

- Reduces single points of failure and improves fault tolerance.
- Enables horizontal scaling to handle growing data volumes and request rates.
- Improves read latency by serving data from geographically nearby replicas.
- Supports multi-region deployments for disaster recovery and regulatory compliance.
- Allows workload isolation, separating analytical queries from transactional traffic.

**Challenges:**

- Maintaining data consistency across nodes requires complex coordination protocols.
- Distributed transactions carry higher latency and operational complexity than local transactions.
- Debugging and monitoring become significantly harder when data and logic span multiple nodes.
- Schema changes and migrations must be coordinated across all nodes.
- Network partitions, clock skew, and partial failures introduce failure modes that do not exist in centralized systems.
- Operational expertise requirements increase substantially.

## Notable distributed database systems

| System | Type | Consistency | Key characteristic |
|---|---|---|---|
| **Apache Cassandra** | Wide-column store | Tunable (eventual to strong) | Peer-to-peer architecture, no single point of failure |
| **Google Cloud Spanner** | Relational | Strong (external consistency) | Global distribution with TrueTime-based synchronization |
| **CockroachDB** | Relational | Serializable | PostgreSQL-compatible, Raft-based consensus |
| **Amazon DynamoDB** | Key-value / document | Tunable (eventual or strong) | Fully managed, single-digit millisecond latency |
| **Apache HBase** | Wide-column store | Strong (per-row) | Built on HDFS, suited for large-scale analytical workloads |
| **TiDB** | Relational | Serializable snapshot isolation | MySQL-compatible, separates compute and storage |
| **YugabyteDB** | Relational / document | Strong | PostgreSQL-compatible, Raft-based replication |
| **Vitess** | Relational (sharding layer) | Depends on underlying MySQL | Horizontal scaling for MySQL, used by YouTube |

## Related

Professionals working with distributed databases should also study the CAP theorem and PACELC theorem for deeper understanding of consistency and availability trade-offs. Database replication and database sharding cover the mechanics of data distribution in detail. Consensus algorithms such as Paxos and Raft underpin many distributed transaction protocols. The distributed ledger concept extends distributed databases into blockchain and decentralized systems. Event-driven architecture and message queues are commonly paired with distributed databases in modern system designs. High availability and disaster recovery planning are closely related operational disciplines.

## Summary

A distributed database spreads data across multiple networked nodes to achieve scalability, fault tolerance, and low-latency access that a single centralized system cannot provide. The fundamental design decisions revolve around how data is partitioned and replicated, what consistency guarantees are offered, and how transactions are coordinated across nodes. The CAP theorem constrains every distributed database to trade off between consistency and availability during network partitions, and practical systems like Cassandra, Spanner, and CockroachDB each make different choices along this spectrum. While distributed databases introduce significant operational complexity in areas such as consistency management, distributed transactions, and failure handling, they are indispensable for applications that must serve global user bases, handle massive data volumes, or maintain continuous availability.

## References

- Ozsu, M. T., & Valduriez, P. (2020). *Principles of Distributed Database Systems* (4th ed.). Springer.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly Media.
- Brewer, E. (2012). "CAP Twelve Years Later: How the 'Rules' Have Changed." *IEEE Computer*, 45(2), 23-29.
- Corbett, J. C., et al. (2013). "Spanner: Google's Globally Distributed Database." *ACM Transactions on Computer Systems*, 31(3).
- Lakshman, A., & Malik, P. (2010). "Cassandra: A Decentralized Structured Storage System." *ACM SIGOPS Operating Systems Review*, 44(2), 35-40.
- Apache Cassandra documentation: https://cassandra.apache.org/doc/latest/
- Google Cloud Spanner documentation: https://cloud.google.com/spanner/docs
- CockroachDB architecture overview: https://www.cockroachlabs.com/docs/stable/architecture/overview
