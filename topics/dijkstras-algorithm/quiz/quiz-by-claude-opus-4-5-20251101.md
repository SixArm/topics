# Dijkstra's algorithm

Question: What is the primary constraint that Dijkstra's algorithm requires for the graph's edge weights?

- [ ] Edge weights must be integers
- [ ] Edge weights must be non-negative
- [ ] Edge weights must be equal
- [ ] Edge weights must be positive (greater than zero)

<details>
  <summary>Answer</summary>
  <p>Edge weights must be non-negative</p>
  <p>Dijkstra's algorithm is designed to work with weighted, directed graphs that have non-negative edge weights. This constraint is essential because the algorithm assumes that once a node is visited with a certain distance, no shorter path to that node can be found. Negative edge weights would violate this assumption and could lead to incorrect results. Note that zero-weight edges are permitted, which distinguishes "non-negative" from "positive."</p>
</details>
