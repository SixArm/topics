# Database availability

Question: What is the primary purpose of implementing failover mechanisms in a database system?

- [ ] To distribute incoming requests across multiple servers for better performance
- [ ] To create copies of data for backup and archival purposes
- [ ] To automatically switch to a standby server when the primary server becomes unavailable
- [ ] To monitor database health and send alerts to administrators

<details>
  <summary>Answer</summary>
  <p>To automatically switch to a standby server when the primary server becomes unavailable</p>
  <p>Failover mechanisms are designed to detect when the primary database server becomes unavailable and automatically redirect traffic to a standby server. This reduces downtime and ensures continuous service for applications and users that depend on the database. Unlike load balancing (which distributes requests for performance) or disaster recovery (which involves restoring from backups after major failures), failover provides immediate, automatic recovery from server failures.</p>
</details>
