## Floyd-Warshall Algorithm

The Floyd-Warshall algorithm is a dynamic programming approach for finding the shortest paths between all pairs of vertices in a weighted, directed graph. Unlike single-source shortest path algorithms, Floyd-Warshall computes the minimum distance between every possible pair of nodes in a single execution, making it invaluable for dense graphs and network analysis applications.

## Core Concept

The algorithm builds and iteratively refines a distance matrix that represents the shortest known distances between all pairs of nodes. The fundamental insight is that any shortest path from vertex i to vertex j either goes through an intermediate vertex k or it does not. By systematically considering each vertex as a potential intermediate node, the algorithm discovers progressively shorter paths.

The recurrence relation at the heart of the algorithm asks: Is the current known distance from i to j shorter than going from i to k and then from k to j? If the indirect route is shorter, update the distance matrix accordingly.

## Algorithm Steps

The Floyd-Warshall algorithm proceeds in three phases:

**Initialization Phase**
- Create a square matrix of size n × n, where n is the number of vertices
- Set each cell dist[i][j] to the weight of the direct edge from i to j if one exists
- Set cells to infinity where no direct edge exists
- Set all diagonal entries dist[i][i] to zero (distance from any node to itself)

**Iteration Phase**
- For each vertex k (considered as an intermediate node):
  - For each pair of vertices (i, j):
    - Compare the current distance dist[i][j] with the path through k
    - If dist[i][k] + dist[k][j] is smaller, update dist[i][j]

**Result Phase**
- The final matrix contains the shortest distances between all vertex pairs
- Negative values on the diagonal indicate negative cycles

## Handling Negative Weights

One of Floyd-Warshall's distinguishing capabilities is its ability to handle graphs with negative edge weights. This contrasts with Dijkstra's algorithm, which fails on graphs containing negative edges. However, Floyd-Warshall requires that the graph contain no negative cycles—cycles where the sum of edge weights is negative. If such cycles exist, the concept of "shortest path" becomes undefined, as one could traverse the cycle infinitely to achieve arbitrarily negative distances.

After running the algorithm, negative cycles can be detected by examining the diagonal of the distance matrix. Any negative value indicates that a node can reach itself through a path with negative total weight, signaling a negative cycle.

## Time and Space Complexity

| Aspect | Complexity | Notes |
|--------|------------|-------|
| Time | O(n³) | Three nested loops over n vertices |
| Space | O(n²) | Storage for the n × n distance matrix |

The cubic time complexity makes Floyd-Warshall impractical for very large graphs. However, the simplicity of the algorithm and its ability to find all-pairs shortest paths in a single run can make it preferable when multiple shortest path queries are needed.

## Comparison with Other Shortest Path Algorithms

| Algorithm | Problem Type | Negative Weights | Time Complexity | Best Use Case |
|-----------|--------------|------------------|-----------------|---------------|
| Floyd-Warshall | All-pairs | Yes | O(n³) | Dense graphs, all pairs needed |
| Dijkstra | Single-source | No | O((V+E) log V) | Sparse graphs, non-negative weights |
| Bellman-Ford | Single-source | Yes | O(VE) | Negative weights, cycle detection |
| Johnson | All-pairs | Yes | O(V² log V + VE) | Sparse graphs, all pairs needed |

## When to Use Floyd-Warshall

**Ideal scenarios:**
- You need shortest paths between all pairs of vertices
- The graph is dense (many edges relative to vertices)
- The graph contains negative edge weights
- The graph is relatively small (hundreds of vertices)
- Simplicity of implementation is valued

**Avoid when:**
- Only single-source shortest paths are needed
- The graph is very large (thousands of vertices)
- The graph is sparse (Johnson's algorithm may be faster)
- Real-time performance is critical

## Practical Applications

**Network Routing**
Computing routing tables where every node needs to know the best path to every other node.

**Transportation Planning**
Finding optimal routes between all pairs of locations in logistics and urban planning systems.

**Social Network Analysis**
Calculating closeness centrality and other metrics that depend on distances between all node pairs.

**Game Development**
Precomputing pathfinding data for non-playable characters navigating between predefined waypoints.

**Currency Arbitrage Detection**
Modeling exchange rates as edge weights (using logarithms) to detect profitable trading cycles, which manifest as negative cycles.

## Key Advantages

- **Completeness**: Solves the all-pairs problem in one execution
- **Simplicity**: Easy to implement and understand
- **Flexibility**: Handles negative edge weights
- **Cycle detection**: Can identify negative cycles as a byproduct

## Key Limitations

- **Scalability**: Cubic complexity limits use to smaller graphs
- **Memory**: Quadratic space requirement for the distance matrix
- **Negative cycles**: Cannot produce meaningful results when negative cycles exist in relevant paths

## Summary

The Floyd-Warshall algorithm provides an elegant dynamic programming solution for the all-pairs shortest path problem. Its O(n³) time complexity and ability to handle negative edge weights make it a practical choice for small to medium dense graphs where comprehensive shortest path information is required. For larger or sparser graphs, consider Johnson's algorithm or running Dijkstra from each vertex instead.
