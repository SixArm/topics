# Bellman-Ford algorithm

Question: What is the primary advantage of the Bellman-Ford algorithm over Dijkstra's algorithm for finding shortest paths in a weighted directed graph?

- [ ] It has a faster time complexity of O(V log V)
- [ ] It can handle graphs with negative weight edges
- [ ] It uses less memory by avoiding distance arrays
- [ ] It only works with undirected graphs

<details>
  <summary>Answer</summary>
  <p>It can handle graphs with negative weight edges</p>
  <p>The Bellman-Ford algorithm can find shortest paths in graphs containing negative weight edges, which Dijkstra's algorithm cannot handle correctly. Additionally, Bellman-Ford can detect negative weight cycles in the graph. However, this versatility comes at a cost: its O(V*E) time complexity is less efficient than Dijkstra's algorithm for graphs with only non-negative weights.</p>
</details>
