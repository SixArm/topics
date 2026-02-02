# Practical Byzantine Fault Tolerance (PBFT)

Question: What is the maximum proportion of Byzantine faulty nodes that PBFT can tolerate while still achieving consensus?

- [ ] Up to one-half of the total nodes
- [ ] Up to one-quarter of the total nodes
- [ ] Up to two-thirds of the total nodes
- [ ] Up to one-third of the total nodes

<details>
  <summary>Answer</summary>
  <p>Up to one-third of the total nodes</p>
  <p>PBFT can tolerate up to one-third of the total nodes being Byzantine faulty. This threshold exists because the algorithm requires at least two-thirds of nodes to be honest and in agreement to reach consensus. This 2f+1 out of 3f+1 node requirement (where f is the number of faulty nodes) ensures that honest nodes always outnumber malicious ones sufficiently to agree on a single valid state, even when Byzantine nodes send contradictory or malicious messages.</p>
</details>
