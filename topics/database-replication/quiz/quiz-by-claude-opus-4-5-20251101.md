# Database replication

Question: What is the key trade-off between synchronous and asynchronous database replication?

- [ ] Synchronous replication provides faster writes but risks data loss; asynchronous replication is slower but guarantees consistency
- [ ] Synchronous replication only works with master-slave setups; asynchronous replication only works with master-master setups
- [ ] Synchronous replication ensures consistency but increases latency; asynchronous replication provides faster writes but risks data inconsistency
- [ ] Synchronous replication requires more storage; asynchronous replication requires more network bandwidth

<details>
  <summary>Answer</summary>
  <p>Synchronous replication ensures consistency but increases latency; asynchronous replication provides faster writes but risks data inconsistency</p>
  <p>In synchronous replication, the primary database waits for acknowledgement from the secondary database before committing, ensuring data consistency across all databases but resulting in increased latency and decreased throughput. In asynchronous replication, the primary commits without waiting for acknowledgement, enabling faster write operations but potentially causing data inconsistencies if network issues or failures occur.</p>
</details>
