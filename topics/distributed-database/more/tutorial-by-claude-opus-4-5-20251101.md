# Distributed Database

## Introduction

A distributed database is a database system that consists of multiple interconnected databases spread across a computer network. Rather than storing all data in a single location, the system distributes data across multiple sites, nodes, or geographical regions. Each site operates its own database management system (DBMS), and these systems communicate with each other to share data and maintain consistency.

Distributed databases have become essential infrastructure for modern applications that require global reach, high availability, and the ability to handle massive data volumes. From social media platforms to financial systems, distributed databases power the most demanding workloads in production today.

## Core Architecture Models

Distributed databases follow different architectural approaches depending on requirements:

| Architecture | Description | Use Case |
|-------------|-------------|----------|
| **Shared Nothing** | Each node has its own CPU, memory, and storage. Nodes communicate only through the network. | High scalability systems like Cassandra |
| **Shared Disk** | Nodes share storage but have separate CPU and memory. | Oracle RAC, clustered file systems |
| **Shared Everything** | All nodes share CPU, memory, and storage. | Traditional mainframes |
| **Federated** | Independent databases connected through a middleware layer. | Enterprise data integration |

The shared-nothing architecture dominates modern distributed database design because it eliminates single points of failure and enables horizontal scaling.

## Data Distribution Strategies

How data is distributed across nodes fundamentally affects performance, availability, and consistency.

### Partitioning (Sharding)

Partitioning divides data into subsets stored on different nodes:

- **Horizontal partitioning** splits rows across nodes based on a partition key
- **Vertical partitioning** splits columns across nodes based on access patterns
- **Range partitioning** assigns contiguous key ranges to specific nodes
- **Hash partitioning** uses a hash function to distribute keys uniformly
- **Composite partitioning** combines multiple strategies (e.g., range then hash)

### Replication

Replication maintains copies of data on multiple nodes:

| Replication Type | Consistency | Availability | Write Performance |
|-----------------|-------------|--------------|-------------------|
| **Synchronous** | Strong | Lower (waits for all replicas) | Slower |
| **Asynchronous** | Eventual | Higher | Faster |
| **Semi-synchronous** | Bounded staleness | Moderate | Moderate |

Common replication topologies include master-replica, multi-master, and leaderless configurations.

## The CAP Theorem

The CAP theorem states that a distributed system can guarantee at most two of three properties simultaneously:

- **Consistency**: All nodes see the same data at the same time
- **Availability**: Every request receives a response
- **Partition Tolerance**: The system continues operating despite network failures

Since network partitions are inevitable in distributed systems, the practical choice is between CP (consistency + partition tolerance) and AP (availability + partition tolerance) systems.

| System Type | Behavior During Partition | Examples |
|-------------|---------------------------|----------|
| **CP** | Sacrifices availability to maintain consistency | Google Spanner, CockroachDB, etcd |
| **AP** | Sacrifices consistency to maintain availability | Cassandra, DynamoDB, CouchDB |

## Consistency Models

Distributed databases offer various consistency guarantees:

### Strong Consistency
All reads return the most recent write. Operations appear atomic and instantaneous. Achieved through consensus protocols like Paxos or Raft.

### Eventual Consistency
Given enough time without updates, all replicas converge to the same value. Reads may return stale data temporarily.

### Causal Consistency
Operations that have a causal relationship are seen in the same order by all nodes. Concurrent operations may appear in different orders.

### Read-Your-Writes Consistency
A process always sees its own writes. Other processes may see stale data.

### Linearizability
Operations appear to occur instantaneously at some point between invocation and response. The strongest form of consistency.

## Transaction Management

Distributed transactions span multiple nodes, requiring coordination mechanisms.

### Two-Phase Commit (2PC)

The classic protocol for atomic distributed transactions:

1. **Prepare phase**: Coordinator asks all participants if they can commit
2. **Commit phase**: If all agree, coordinator instructs all to commit; otherwise, all abort

Limitations include blocking if the coordinator fails and reduced availability during network partitions.

### Three-Phase Commit (3PC)

Adds a pre-commit phase to reduce blocking scenarios, though it cannot fully solve the problem in asynchronous networks.

### Saga Pattern

Breaks transactions into a sequence of local transactions with compensating actions for rollback. Better suited for long-running transactions and microservices architectures.

## Consensus Protocols

Consensus protocols enable nodes to agree on values despite failures:

| Protocol | Fault Tolerance | Complexity | Latency |
|----------|-----------------|------------|---------|
| **Paxos** | Byzantine and crash | High | Moderate |
| **Raft** | Crash failures | Lower (designed for understandability) | Moderate |
| **PBFT** | Byzantine (up to 1/3 malicious) | High | Higher |
| **Zab** | Crash failures | Moderate | Moderate |

Raft has become the dominant choice for new systems due to its relative simplicity while maintaining correctness guarantees.

## Query Processing

Distributed query execution differs significantly from single-node processing:

### Query Optimization
- Cost-based optimization must account for network transfer costs
- Data locality awareness minimizes cross-node data movement
- Parallel execution plans exploit multiple nodes simultaneously

### Join Strategies
- **Broadcast join**: Send smaller table to all nodes
- **Partitioned join**: Co-locate matching partitions
- **Shuffle join**: Redistribute both tables by join key

### Query Routing
- Direct routing to the correct partition when possible
- Scatter-gather pattern for queries spanning multiple partitions
- Query coordinators that aggregate results from multiple nodes

## Types of Distributed Databases

### Relational Distributed Databases

Maintain SQL semantics and ACID guarantees across distributed nodes:

- **Google Spanner**: Globally distributed with external consistency using TrueTime
- **CockroachDB**: Open-source, PostgreSQL-compatible distributed SQL
- **TiDB**: MySQL-compatible with horizontal scalability
- **YugabyteDB**: Supports both PostgreSQL and Cassandra APIs

### NoSQL Distributed Databases

Trade some relational guarantees for scalability and flexibility:

| Category | Characteristics | Examples |
|----------|-----------------|----------|
| **Key-Value** | Simple get/put operations, highest throughput | Redis Cluster, Amazon DynamoDB |
| **Document** | JSON/BSON documents, flexible schema | MongoDB, Couchbase |
| **Wide-Column** | Column families, time-series optimized | Apache Cassandra, Apache HBase |
| **Graph** | Relationship-focused, traversal queries | Neo4j, Amazon Neptune |

### NewSQL Databases

Combine SQL capabilities with NoSQL scalability:

- Distributed SQL with horizontal scaling
- ACID transactions across nodes
- Modern architectures built from the ground up

## Advantages of Distributed Databases

### Scalability
- Horizontal scaling by adding nodes
- Linear performance improvement with additional resources
- Handle petabyte-scale datasets

### High Availability
- No single point of failure
- Automatic failover to healthy nodes
- Continued operation during partial system failures

### Geographic Distribution
- Data locality reduces latency for global users
- Compliance with data residency requirements
- Disaster recovery across regions

### Performance
- Parallel query execution across nodes
- Workload distribution prevents bottlenecks
- Read replicas offload read-heavy workloads

## Challenges and Trade-offs

### Complexity
- More moving parts to configure, monitor, and maintain
- Debugging distributed issues requires specialized skills
- Operational overhead increases significantly

### Network Dependencies
- Network latency affects transaction performance
- Partition handling requires careful design
- Bandwidth costs for data transfer between nodes

### Consistency vs. Performance
- Stronger consistency requires more coordination
- Synchronous replication adds latency
- Application design must account for chosen consistency model

### Cost
- Infrastructure costs for multiple nodes
- Network transfer charges in cloud environments
- Specialized expertise for operations

## Operational Considerations

### Monitoring and Observability
- Per-node and cluster-wide metrics
- Replication lag tracking
- Network partition detection
- Query performance across nodes

### Backup and Recovery
- Consistent snapshots across distributed state
- Point-in-time recovery coordination
- Cross-region backup strategies

### Capacity Planning
- Partition key distribution analysis
- Hot spot identification and mitigation
- Growth projection across nodes

### Security
- Encryption in transit between nodes
- Per-node access controls
- Audit logging across the cluster

## Selection Criteria

When choosing a distributed database, evaluate:

| Factor | Questions to Ask |
|--------|-----------------|
| **Consistency requirements** | Does the application tolerate eventual consistency? Are ACID transactions required? |
| **Scale requirements** | What data volume and throughput are expected? How will growth occur? |
| **Query patterns** | Are queries simple lookups or complex analytics? What are the access patterns? |
| **Latency requirements** | What response times are acceptable? Is geographic distribution needed? |
| **Operational maturity** | What expertise exists in-house? What support is available? |
| **Ecosystem integration** | What tools, drivers, and integrations are needed? |

## Summary

Distributed databases solve the fundamental challenge of managing data at scale across multiple nodes and geographic regions. They provide high availability, fault tolerance, and horizontal scalability that single-node systems cannot achieve.

The key design decisions revolve around:

- Choosing appropriate consistency guarantees for application requirements
- Selecting partitioning and replication strategies that match access patterns
- Understanding the CAP theorem trade-offs in the chosen system
- Building operational capabilities to manage distributed complexity

The right choice depends on specific requirements around consistency, availability, query complexity, and operational capacity. Modern distributed databases span a spectrum from strongly consistent distributed SQL systems like Spanner and CockroachDB to highly available eventual consistency systems like Cassandra and DynamoDB, with many options in between.
