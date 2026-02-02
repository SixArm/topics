# Topological sort algorithm

Question: What is a fundamental requirement for a graph to have a valid topological sort?

- [ ] The graph must be undirected and connected
- [ ] The graph must have exactly one vertex with in-degree of 0
- [ ] The graph must be a directed acyclic graph (DAG)
- [ ] The graph must have an equal number of vertices and edges

<details>
  <summary>Answer</summary>
  <p>The graph must be a directed acyclic graph (DAG)</p>
  <p>Topological sorting is only defined for directed acyclic graphs (DAGs). If the graph contains cycles, no valid topological ordering exists because a cycle would create a contradiction where a vertex would need to come both before and after another vertex in the linear ordering. The algorithm requires directed edges to establish the "before" relationship between vertices, and the absence of cycles ensures this ordering is consistent.</p>
</details>
