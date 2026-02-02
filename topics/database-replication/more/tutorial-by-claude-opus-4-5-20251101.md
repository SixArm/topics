## Database Replication

Database replication is the process of copying data from one database to another to ensure data availability across multiple locations. This foundational technique enables high availability, disaster recovery, and load balancing for modern data infrastructure.

## How Replication Works

In a typical replication architecture, one primary database handles transaction processing while one or more secondary databases serve read-only queries. When a write operation executes on the primary database, the change propagates to secondary databases to maintain synchronization.

The replication process involves:

- **Change capture**: The primary database logs all modifications to data
- **Change transmission**: Logs or change records transfer to replica databases
- **Change application**: Secondary databases apply the changes to their local copies
- **Consistency verification**: Systems confirm data alignment across nodes

## Replication Topologies

### Master-Slave Replication

The primary database (master) sends updates to one or more secondary databases (slaves). Slaves remain read-only and cannot process write operations.

**Best suited for:**
- Read-heavy workloads requiring horizontal scaling
- Reporting and analytics queries that should not impact production
- Geographic distribution of read replicas for lower latency

### Master-Master Replication

Multiple databases function as both masters and slaves simultaneously. Each database can receive and send updates to other databases in the cluster.

**Best suited for:**
- High availability requirements with automatic failover
- Multi-region deployments requiring local write capability
- Disaster recovery scenarios demanding zero downtime

## Replication Topology Comparison

| Aspect | Master-Slave | Master-Master |
|--------|--------------|---------------|
| Write nodes | Single | Multiple |
| Conflict handling | None required | Complex resolution needed |
| Failover complexity | Manual promotion required | Automatic failover possible |
| Data consistency | Simpler to guarantee | Requires conflict resolution |
| Use case | Read scaling | High availability |
| Implementation complexity | Lower | Higher |

## Synchronous vs Asynchronous Replication

### Synchronous Replication

The primary database waits for acknowledgement from secondary databases before committing transactions.

**Characteristics:**
- Strong consistency across all replicas
- Higher latency for write operations
- Lower throughput due to network round-trip delays
- Zero data loss on primary failure

### Asynchronous Replication

The primary database commits transactions without waiting for secondary acknowledgement.

**Characteristics:**
- Lower write latency
- Higher throughput
- Potential data loss if primary fails before propagation
- Possible temporary inconsistencies between replicas

## Replication Mode Comparison

| Factor | Synchronous | Asynchronous |
|--------|-------------|--------------|
| Data loss risk | None | Possible (replication lag) |
| Write latency | Higher | Lower |
| Throughput | Limited by slowest replica | Primary determines throughput |
| Network dependency | Critical | Tolerant of delays |
| Consistency guarantee | Strong | Eventual |
| Geographic suitability | Same region | Cross-region viable |

## Common Replication Strategies

### Statement-Based Replication

The primary database sends SQL statements to replicas for re-execution.

- Lower bandwidth requirements
- Non-deterministic functions can cause divergence
- Simpler to implement and debug

### Row-Based Replication

The primary database sends actual changed row data to replicas.

- Deterministic results regardless of function behavior
- Higher bandwidth consumption
- Better suited for complex queries with triggers

### Logical Replication

Changes are replicated at a logical level, allowing selective table replication and cross-version compatibility.

- Enables partial replication of specific tables
- Supports heterogeneous database versions
- Useful for data migration scenarios

### Physical Replication

Block-level changes are copied directly to replicas.

- Fastest replication method
- Requires identical database versions and configurations
- Ideal for disaster recovery standby servers

## Challenges and Considerations

### Replication Lag

The delay between a write on the primary and its appearance on replicas creates a window where reads from replicas return stale data.

**Mitigation approaches:**
- Read-your-writes consistency routing
- Monitoring lag metrics and alerting
- Synchronous replication for critical data

### Conflict Resolution

Master-master configurations must handle concurrent writes to the same data on different nodes.

**Resolution strategies:**
- Last-write-wins based on timestamps
- Application-level conflict resolution logic
- Conflict-free replicated data types (CRDTs)

### Split-Brain Scenarios

Network partitions can cause multiple nodes to believe they are the primary, leading to data divergence.

**Prevention mechanisms:**
- Quorum-based decision making
- Fencing mechanisms to isolate failed primaries
- Witness nodes for tie-breaking

### Failover Management

Promoting a replica to primary status requires careful orchestration to prevent data loss and application disruption.

**Key considerations:**
- Automated vs manual failover decisions
- Client connection redirection
- Preventing the old primary from accepting writes after recovery

## Database-Specific Implementations

| Database | Replication Type | Key Features |
|----------|------------------|--------------|
| PostgreSQL | Streaming replication | Synchronous option, logical replication |
| MySQL | Binary log replication | GTID-based, semi-synchronous mode |
| MongoDB | Replica sets | Automatic failover, read preferences |
| SQL Server | Always On availability groups | Synchronous commit, automatic failover |
| Oracle | Data Guard | Active standby, far sync instances |
| Redis | Asynchronous replication | Sentinel for failover, cluster mode |

## Best Practices

- **Monitor replication lag continuously** and set alerts for thresholds that impact your application
- **Test failover procedures regularly** in non-production environments
- **Document recovery procedures** for various failure scenarios
- **Use connection pooling** that understands primary/replica topology
- **Implement health checks** that verify both connectivity and data currency
- **Plan for capacity** on replicas to handle full production load during failover
- **Secure replication traffic** with encryption for data in transit between nodes

## When to Use Each Approach

**Choose master-slave with asynchronous replication when:**
- Read scaling is the primary goal
- Some replication lag is acceptable
- Cost efficiency matters more than zero data loss

**Choose master-slave with synchronous replication when:**
- Zero data loss is mandatory
- Replicas are geographically close
- Lower throughput is acceptable

**Choose master-master replication when:**
- Multi-region write capability is required
- Maximum availability is the priority
- Your application can handle conflict resolution complexity
