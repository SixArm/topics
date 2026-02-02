# Lamport timestamp

Question: What is the primary purpose of a Lamport timestamp in distributed systems?

- [ ] To synchronize physical clocks across all nodes in the network
- [ ] To provide a global ordering of all events across all nodes
- [ ] To provide a partial ordering of events based on logical clocks
- [ ] To encrypt messages between distributed processes

<details>
  <summary>Answer</summary>
  <p>To provide a partial ordering of events based on logical clocks</p>
  <p>Lamport timestamps use logical clocks (counters that increment with each event) to establish a partial ordering of events in distributed systems where no global clock exists. They ensure causally related events are ordered correctly, but do not provide a global ordering—concurrent events that are not causally related may be ordered differently on different nodes.</p>
</details>
