# Minimum spanning tree (MST)

A minimum spanning tree (MST) is a subset of edges in a connected, undirected, weighted graph that connects all vertices together with the minimum possible total edge weight. In a graph with V vertices, an MST always contains exactly V-1 edges and forms a tree structure with no cycles. MSTs are foundational in computer science and operations research, providing optimal solutions for problems where connecting all nodes at minimal cost is the objective. If all edge weights are distinct, the MST is unique; otherwise, multiple valid MSTs may exist.

## Why MSTs matter

Minimum spanning trees solve a fundamental optimization problem: given a network of nodes with weighted connections, find the cheapest way to keep every node connected. This arises constantly in practice. Telecommunications companies use MSTs to plan cable layouts that reach every customer at minimum cost. Chip designers use MSTs to estimate wiring length on integrated circuits. In logistics, MSTs help determine the most efficient distribution networks. MSTs also serve as building blocks inside more complex algorithms for problems like the Traveling Salesman Problem and network clustering.

## Core properties

MSTs possess several important structural properties that algorithms exploit:

- **Cut property**: For any cut of the graph (a partition of vertices into two non-empty sets), the minimum weight edge crossing the cut must belong to the MST. This property underpins Prim's algorithm.
- **Cycle property**: For any cycle in the graph, the maximum weight edge in that cycle does not belong to the MST. This property underpins Kruskal's algorithm.
- **Uniqueness**: If all edge weights are distinct, the graph has exactly one MST. When weights are not unique, different algorithms may produce different MSTs, but all will have the same total weight.
- **Edge count**: An MST of a graph with V vertices always contains exactly V-1 edges.
- **Substructure**: Removing any edge from an MST partitions it into two subtrees, each of which is itself an MST of its respective induced subgraph.

## Classical algorithms

Three well-known algorithms dominate MST computation. Each uses a different greedy strategy but all produce correct MSTs.

### Kruskal's algorithm

Kruskal's algorithm works by sorting all edges by weight and then iteratively adding the smallest edge that does not form a cycle.

1. Sort all edges in non-decreasing order of weight.
2. Initialize an empty edge set for the MST.
3. For each edge in sorted order, check whether adding it would create a cycle using a Union-Find (disjoint set) data structure.
4. If no cycle is formed, add the edge to the MST.
5. Stop when the MST contains V-1 edges.

Kruskal's algorithm is particularly effective on sparse graphs where the number of edges is close to the number of vertices.

### Prim's algorithm

Prim's algorithm grows the MST from a single starting vertex by repeatedly adding the cheapest edge that connects a vertex inside the tree to a vertex outside it.

1. Start from any vertex and add it to the MST set.
2. Among all edges connecting a vertex in the MST set to a vertex outside it, select the one with minimum weight.
3. Add the selected edge and its endpoint to the MST set.
4. Repeat until all vertices are included.

Prim's algorithm is well suited for dense graphs, especially when implemented with a priority queue.

### Boruvka's algorithm

Boruvka's algorithm works in parallel-friendly rounds. In each round, every connected component selects its minimum weight outgoing edge, and all selected edges are added simultaneously. Rounds continue until a single component remains. This algorithm is historically significant as the earliest known MST algorithm and is the basis for many parallel and distributed MST implementations.

## Algorithm comparison

| Property | Kruskal's | Prim's (binary heap) | Prim's (Fibonacci heap) | Boruvka's |
|---|---|---|---|---|
| Time complexity | O(E log E) | O(E log V) | O(E + V log V) | O(E log V) |
| Best suited for | Sparse graphs | Dense graphs | Dense graphs | Parallel/distributed |
| Data structure | Union-Find | Priority queue | Fibonacci heap | Component tracking |
| Edge sorting required | Yes | No | No | No |
| Incremental growth | No (global) | Yes (single source) | Yes (single source) | Yes (all components) |

Where E is the number of edges and V is the number of vertices.

## Key data structures

Efficient MST computation depends on supporting data structures:

- **Union-Find (Disjoint Set Union)**: Used by Kruskal's algorithm to track connected components and detect cycles in near-constant amortized time using path compression and union by rank.
- **Binary heap / priority queue**: Used by Prim's algorithm to efficiently extract the minimum weight edge connecting the MST frontier to an unvisited vertex.
- **Fibonacci heap**: An advanced priority queue that provides O(1) amortized decrease-key operations, improving Prim's algorithm to O(E + V log V) time on dense graphs.

## Practical applications

- **Network design**: Laying fiber optic cable, electrical wiring, or water pipelines to connect all locations at minimum cost.
- **Cluster analysis**: Removing the heaviest edges from an MST produces a hierarchical clustering of data points, used in single-linkage clustering.
- **Approximation algorithms**: The MST provides a 2-approximation for the metric Traveling Salesman Problem and is used in Steiner tree approximations.
- **Image segmentation**: MST-based methods partition image pixels into regions by treating pixel similarity as edge weight.
- **Circuit design**: Estimating and minimizing wire length in VLSI chip layout.
- **Taxonomy and phylogenetics**: Constructing evolutionary trees that connect species with minimum total genetic distance.

## Variants and extensions

| Variant | Description |
|---|---|
| Maximum spanning tree | Find the spanning tree with maximum total edge weight; solved by negating weights and running any MST algorithm. |
| Minimum bottleneck spanning tree | Minimize the maximum edge weight rather than the total; every MST is also a minimum bottleneck spanning tree. |
| Steiner tree | Connect a subset of vertices at minimum cost, allowing intermediate (Steiner) vertices; NP-hard in general. |
| Euclidean MST | MST of points in Euclidean space; can be computed in O(E log V) time via the Delaunay triangulation. |
| Dynamic MST | Maintain an MST as edges are inserted or deleted from the graph over time. |
| Distributed MST | Compute an MST when the graph is distributed across multiple machines or processors; Boruvka's approach naturally extends to this setting. |

## Related

Topics to explore next include graph theory fundamentals for the underlying mathematical framework, Dijkstra's algorithm and shortest path problems which share structural similarities with MST algorithms, Union-Find data structures for understanding the cycle detection mechanism in Kruskal's algorithm, greedy algorithms as the paradigm that MST algorithms exemplify, network flow and max-flow min-cut theorems for deeper network optimization, and the Traveling Salesman Problem where MSTs serve as approximation building blocks.

## Summary

The minimum spanning tree is one of the most well-studied and practically useful structures in graph theory and algorithm design. It solves the fundamental problem of connecting all nodes in a weighted graph at minimum total cost. The three classical algorithms, Kruskal's, Prim's, and Boruvka's, each exploit different greedy strategies and are suited to different graph densities and computing environments. Understanding MSTs is essential for any technology professional working with networks, optimization, data clustering, or algorithm design, as MSTs appear both as direct solutions and as subroutines within more complex systems.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapters 21 (Data Structures for Disjoint Sets) and 23 (Minimum Spanning Trees).
- Kleinberg, J., & Tardos, E. (2005). *Algorithm Design*. Pearson. Chapter 4 (Greedy Algorithms), covering MST algorithms and the cut/cycle properties.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Part 5 covers MSTs with practical implementations.
- Kruskal, J. B. (1956). "On the shortest spanning subtree of a graph and the traveling salesman problem." *Proceedings of the American Mathematical Society*, 7(1), 48-50.
- Prim, R. C. (1957). "Shortest connection networks and some generalizations." *Bell System Technical Journal*, 36(6), 1389-1401.
- Boruvka, O. (1926). "O jistem problemu minimalnim." *Prace Moravske Prirodovedecke Spolecnosti*, 3, 37-58.
- Wikipedia: Minimum spanning tree — [https://en.wikipedia.org/wiki/Minimum_spanning_tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree)
