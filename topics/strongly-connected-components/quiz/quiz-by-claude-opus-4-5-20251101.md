# Strongly Connected Components

Question: What defines a Strongly Connected Component (SCC) in a directed graph?

- [ ] A subset of vertices where each vertex has at least one outgoing edge
- [ ] A subset of vertices where all edges point in the same direction
- [ ] A subset of vertices where there is a path from every vertex to every other vertex within that subset
- [ ] A subset of vertices that share a common neighbor

<details>
  <summary>Answer</summary>
  <p>A subset of vertices where there is a path from every vertex to every other vertex within that subset</p>
  <p>Strongly Connected Components are defined by mutual reachability: within an SCC, you can travel from any vertex to any other vertex by following directed edges. This property is fundamental because it captures the notion of maximal connectivity in directed graphs, making SCCs useful for analyzing network flows, program control flow, and community detection in social networks.</p>
</details>
