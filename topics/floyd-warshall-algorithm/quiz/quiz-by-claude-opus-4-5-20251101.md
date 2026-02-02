# Floyd-Warshall algorithm

Question: What is a key advantage of the Floyd-Warshall algorithm over Dijkstra's algorithm?

- [ ] It has a better time complexity of O(n log n)
- [ ] It can find shortest paths between all pairs of nodes with negative edge weights
- [ ] It only works with undirected graphs
- [ ] It requires less memory than other shortest path algorithms

<details>
  <summary>Answer</summary>
  <p>It can find shortest paths between all pairs of nodes with negative edge weights</p>
  <p>The Floyd-Warshall algorithm is valuable when you need to find the shortest paths between all pairs of nodes in a graph, particularly when there are negative edge weights. While its O(n³) time complexity makes it less efficient than Dijkstra's algorithm for single-source shortest paths, it handles negative edge weights that Dijkstra's algorithm cannot process correctly.</p>
</details>
