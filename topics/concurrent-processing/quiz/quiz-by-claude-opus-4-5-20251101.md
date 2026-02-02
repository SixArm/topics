# Concurrent processing

Question: What is the primary challenge that arises when multiple processes or threads access shared resources simultaneously in concurrent processing?

- [ ] Memory overflow due to excessive thread creation
- [ ] Network latency between distributed nodes
- [ ] Race conditions, deadlocks, and synchronization issues
- [ ] Increased power consumption from multiple processors

<details>
  <summary>Answer</summary>
  <p>Race conditions, deadlocks, and synchronization issues</p>
  <p>When multiple processes or threads access shared resources such as memory or files simultaneously, conflicts or inconsistencies can occur. Race conditions happen when the outcome depends on the timing of thread execution, deadlocks occur when threads block each other waiting for resources, and synchronization issues arise from improper coordination. These challenges are addressed using concurrency control mechanisms such as locks, semaphores, and monitors to ensure only one process or thread can access a shared resource at a time.</p>
</details>
