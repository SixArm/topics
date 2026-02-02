# Kosaraju's Algorithm

Question: What is the primary purpose of Kosaraju's algorithm?

- [ ] To find the shortest path between two nodes in a weighted graph
- [ ] To detect cycles in an undirected graph
- [ ] To find strongly connected components in a directed graph
- [ ] To compute the minimum spanning tree of a graph

<details>
  <summary>Answer</summary>
  <p>To find strongly connected components in a directed graph</p>
  <p>Kosaraju's algorithm uses two depth-first search passes—one on the original graph to determine finishing times, and one on the reversed graph—to identify all strongly connected components (SCCs). An SCC is a subgraph where every pair of nodes is mutually reachable via directed paths. This algorithm is commonly used in compilers, circuit design, and network analysis.</p>
</details>
