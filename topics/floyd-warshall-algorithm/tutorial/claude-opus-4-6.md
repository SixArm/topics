# Floyd-Warshall algorithm

The Floyd-Warshall algorithm is a classic dynamic programming technique for computing the shortest paths between every pair of vertices in a weighted, directed graph. Originally published independently by Robert Floyd and Stephen Warshall in 1962, it remains one of the most widely taught and practically useful all-pairs shortest path algorithms. Unlike single-source algorithms such as Dijkstra's or Bellman-Ford, Floyd-Warshall solves the problem globally in a single execution, making it especially valuable for dense graphs and scenarios requiring complete pairwise distance information. It handles both positive and negative edge weights, provided no negative-weight cycles exist.

## Core Concept

The algorithm operates on a distance matrix of size n x n, where n is the number of vertices. The fundamental insight is that any shortest path from vertex i to vertex j either goes through some intermediate vertex k or it does not. By systematically considering every vertex as a potential intermediate stop, the algorithm relaxes all pairwise distances until every entry in the matrix reflects the true shortest path.

At each iteration k, the algorithm asks: "Is the path from i to j cheaper if we route through vertex k?" If so, it updates the distance. After considering all n vertices as intermediates, the matrix holds the globally optimal shortest distances.

## How the Algorithm Works

The algorithm proceeds in three main phases:

- **Initialization**: Construct an n x n matrix. Set each entry dist[i][j] to the weight of the direct edge from i to j if one exists, to infinity if no direct edge exists, and to zero when i equals j. This matrix represents the best-known distances using zero intermediate vertices.

- **Relaxation**: For each vertex k from 1 to n, iterate over every pair (i, j). If dist[i][k] + dist[k][j] is less than dist[i][j], update dist[i][j] to the smaller value. This step incorporates vertex k as a possible waypoint on the shortest path from i to j.

- **Result extraction**: After all n iterations complete, the matrix contains the shortest distance between every pair of vertices. If path reconstruction is needed, a separate predecessor matrix can be maintained in parallel, recording which intermediate vertex led to each update.

## Time and Space Complexity

| Metric | Complexity |
|---|---|
| Time complexity | O(n^3) |
| Space complexity | O(n^2) |
| Best case time | O(n^3) — no early termination is possible |
| Initialization cost | O(n^2) |

The cubic time complexity arises from three nested loops, each iterating over n vertices. The space requirement comes from storing the n x n distance matrix. Unlike Dijkstra's algorithm, which can be run n times with a priority queue for O(n^2 log n) on sparse graphs, Floyd-Warshall's cubic cost is fixed regardless of graph density. This makes it most competitive on dense graphs where the number of edges approaches n^2.

## Comparison with Other Shortest Path Algorithms

| Feature | Floyd-Warshall | Dijkstra (repeated) | Bellman-Ford (repeated) | Johnson's Algorithm |
|---|---|---|---|---|
| Problem solved | All-pairs | All-pairs (via n runs) | All-pairs (via n runs) | All-pairs |
| Time complexity | O(n^3) | O(n^2 log n + n*m) | O(n^2 * m) | O(n*m + n^2 log n) |
| Negative weights | Yes | No | Yes | Yes |
| Negative cycle detection | Yes | No | Yes | Yes |
| Best for graph type | Dense | Sparse, non-negative | Sparse, negative weights | Sparse, negative weights |
| Implementation complexity | Low | Moderate | Low | High |

Floyd-Warshall is the simplest to implement among all-pairs algorithms. For sparse graphs with non-negative weights, running Dijkstra from each vertex is typically faster. Johnson's algorithm, which reweights edges using Bellman-Ford and then applies Dijkstra, is preferred for sparse graphs that contain negative weights.

## Handling Negative Weights and Cycles

One of Floyd-Warshall's strengths is its natural ability to handle negative edge weights. The relaxation step correctly propagates shorter paths even when edges carry negative costs. To detect negative-weight cycles, inspect the diagonal of the final distance matrix: if any dist[i][i] is negative, a negative-weight cycle is reachable from vertex i. This property makes the algorithm useful for identifying arbitrage opportunities in currency exchange graphs and detecting inconsistencies in constraint systems.

When a negative cycle exists, shortest paths passing through that cycle are undefined because the path cost can be reduced infinitely. The algorithm flags this condition but does not attempt to resolve it.

## Practical Applications

Floyd-Warshall is used across a wide range of domains:

- **Network routing**: Computing routing tables in network protocols where complete pairwise reachability and cost information is needed.
- **Geographic information systems**: Precomputing travel distances between all locations in a bounded region for logistics and fleet management.
- **Transitive closure**: Determining whether a path exists between every pair of vertices in a directed graph, which is useful in dependency analysis and reachability queries.
- **Currency arbitrage detection**: Modeling exchange rates as edge weights and detecting negative cycles that represent profitable round-trip trades.
- **Graph diameter and centrality**: Computing the diameter of a graph (the longest shortest path) and closeness centrality metrics that require all-pairs distances.
- **Constraint satisfaction**: In systems of difference constraints, the algorithm determines feasibility and computes tightest bounds.

## When to Use Floyd-Warshall

The algorithm is the right choice when several conditions align:

- You need shortest paths between all pairs of vertices, not just from a single source.
- The graph is dense or moderately sized (typically under a few thousand vertices).
- The graph may contain negative edge weights.
- Implementation simplicity is valued over raw performance on sparse graphs.
- You want built-in negative cycle detection without running a separate algorithm.

For single-source problems, Dijkstra's algorithm or Bellman-Ford are more appropriate. For very large sparse graphs requiring all-pairs distances, Johnson's algorithm offers better asymptotic performance.

## Limitations

- The O(n^3) time complexity becomes prohibitive for graphs with tens of thousands of vertices or more, regardless of edge density.
- The O(n^2) space requirement for the distance matrix can be a constraint for very large vertex sets.
- The algorithm does not lend itself to incremental updates; adding or removing an edge generally requires a full recomputation.
- It provides no advantage over simpler algorithms when only single-source shortest paths are needed.

## Related

Topics to explore next include Dijkstra's algorithm for efficient single-source shortest paths on non-negative graphs, Bellman-Ford algorithm for single-source shortest paths with negative weights, Johnson's algorithm for sparse all-pairs shortest paths, dynamic programming as the foundational technique behind Floyd-Warshall, graph algorithms more broadly including minimum spanning trees and network flow, and the transitive closure problem which Floyd-Warshall solves as a special case.

## Summary

The Floyd-Warshall algorithm is a concise and powerful dynamic programming solution for computing shortest paths between all pairs of vertices in a weighted directed graph. Its O(n^3) time complexity and straightforward triple-nested-loop structure make it easy to implement and reason about, while its ability to handle negative edge weights and detect negative cycles gives it versatility that single-source algorithms lack. It is best suited for dense graphs of moderate size where complete pairwise distance information is required, and it remains a foundational tool in network analysis, operations research, and computer science education.

## References

- Floyd, R. W. (1962). "Algorithm 97: Shortest Path." Communications of the ACM, 5(6), 345.
- Warshall, S. (1962). "A Theorem on Boolean Matrices." Journal of the ACM, 9(1), 11-12.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). Introduction to Algorithms (3rd ed.). MIT Press. Chapter 25: All-Pairs Shortest Paths.
- Sedgewick, R., & Wayne, K. (2011). Algorithms (4th ed.). Addison-Wesley. Section 4.4: Shortest Paths.
- Kleinberg, J., & Tardos, E. (2005). Algorithm Design. Pearson. Chapter 6: Dynamic Programming.
- https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
