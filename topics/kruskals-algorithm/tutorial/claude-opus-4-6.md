# Kruskal's algorithm

Kruskal's algorithm is a foundational greedy algorithm in graph theory, designed to find the minimum spanning tree (MST) of a connected, undirected, weighted graph. Developed by Joseph Kruskal in 1956, the algorithm constructs the MST by repeatedly selecting the lowest-weight edge that does not form a cycle, continuing until all vertices are connected. Its elegance lies in its simplicity: sort edges by weight, then greedily add them while avoiding cycles. Kruskal's algorithm is widely used in network design, clustering, and infrastructure planning wherever the goal is to connect a set of nodes at minimum total cost.

## How It Works

Kruskal's algorithm operates by treating each vertex as its own isolated component and progressively merging components through the cheapest available edges. The process unfolds in a clear sequence of steps:

1. **Initialize a forest.** Begin with each vertex as its own separate tree (a forest of isolated nodes). Create an empty edge set that will become the MST.
2. **Sort all edges.** Arrange every edge in the graph in non-decreasing order of weight.
3. **Iterate through sorted edges.** Examine each edge in order, starting from the lightest.
4. **Check for cycles.** For each candidate edge, determine whether its two endpoints belong to the same connected component. If they do, adding the edge would create a cycle, so skip it.
5. **Add safe edges.** If the endpoints are in different components, add the edge to the MST and merge the two components.
6. **Terminate.** Stop once the MST contains exactly V - 1 edges, where V is the number of vertices. The collected edges form the minimum spanning tree.

If the graph is disconnected, the algorithm naturally produces a minimum spanning forest, one MST per connected component.

## The Role of the Union-Find Data Structure

The efficiency of Kruskal's algorithm depends heavily on how quickly cycle detection is performed. The disjoint-set (union-find) data structure is the standard choice for this purpose. It supports two key operations:

- **Find:** Determine which component a vertex belongs to. With path compression, this operation runs in nearly constant amortized time.
- **Union:** Merge two components into one. With union by rank (or union by size), the tree structure remains balanced, keeping operations fast.

| Operation | Naive Approach | With Path Compression and Union by Rank |
|-----------|---------------|------------------------------------------|
| Find | O(n) | O(alpha(n)), nearly O(1) |
| Union | O(n) | O(alpha(n)), nearly O(1) |
| Overall MST | O(E * V) | O(E log E) |

Here, alpha(n) is the inverse Ackermann function, which grows so slowly that it is effectively constant for all practical input sizes.

## Time and Space Complexity

The dominant cost in Kruskal's algorithm is sorting the edge list. Once edges are sorted, the union-find operations contribute negligible overhead.

| Aspect | Complexity |
|--------|------------|
| Sorting edges | O(E log E) |
| Union-Find operations (total) | O(E * alpha(V)) |
| Overall time complexity | O(E log E), equivalent to O(E log V) |
| Space complexity | O(V + E) |

Since log E is at most 2 log V (because E is at most V squared), the time complexities O(E log E) and O(E log V) are equivalent. The space requirement accounts for storing the edge list and the union-find structure.

## When to Use Kruskal's Algorithm

Kruskal's algorithm is particularly well-suited for sparse graphs, where the number of edges is relatively small compared to the number of vertices. Because it processes edges globally rather than growing a tree from a single source, it naturally handles disconnected graphs. Key scenarios include:

- **Network infrastructure design:** Laying cable, fiber, or pipeline connections between locations at minimum total cost.
- **Clustering:** By stopping before all components are merged, the algorithm produces a natural clustering of data points (single-linkage clustering).
- **Approximation algorithms:** Kruskal's MST serves as a building block in approximation algorithms for problems like the Traveling Salesman Problem.
- **Circuit design:** Minimizing wiring in electronic circuit layouts.

## Kruskal's vs. Prim's Algorithm

Both Kruskal's and Prim's algorithms solve the same problem, finding the minimum spanning tree, but they differ in strategy and performance characteristics.

| Criterion | Kruskal's Algorithm | Prim's Algorithm |
|-----------|---------------------|------------------|
| Strategy | Edge-based: sorts all edges globally | Vertex-based: grows tree from a starting vertex |
| Best for | Sparse graphs (E is much less than V squared) | Dense graphs (E is close to V squared) |
| Data structure | Union-Find (disjoint set) | Priority queue (binary or Fibonacci heap) |
| Time complexity | O(E log E) | O(E + V log V) with Fibonacci heap |
| Handles disconnected graphs | Yes, produces a minimum spanning forest | Requires modification for disconnected graphs |
| Parallelizability | More amenable to parallelization | Less naturally parallelizable |

For sparse graphs, Kruskal's algorithm tends to outperform Prim's because sorting a small edge list is cheap. For dense graphs, Prim's algorithm with an efficient priority queue is generally faster.

## Correctness and the Cut Property

Kruskal's algorithm is provably correct due to the cut property of minimum spanning trees. The cut property states that for any cut of the graph (a partition of vertices into two non-empty sets), the minimum-weight edge crossing the cut must belong to some MST. Each time Kruskal's algorithm adds an edge connecting two different components, that edge is the lightest edge crossing the cut between those components, guaranteeing it belongs to an MST. This greedy choice at every step ensures the final result is globally optimal.

## Practical Considerations

- **Tie-breaking:** When multiple edges share the same weight, the MST may not be unique. Kruskal's algorithm will produce a valid MST regardless of how ties are broken, but different tie-breaking strategies yield different trees.
- **Negative edge weights:** The algorithm handles negative edge weights correctly, since it only compares relative weights during sorting.
- **Pre-sorted edges:** If edges arrive pre-sorted (or nearly sorted), the sorting step can be accelerated, making Kruskal's algorithm even more efficient.
- **Edge filtering:** In practice, edges that obviously cannot be part of the MST (such as self-loops) can be discarded before sorting to reduce overhead.

## Related

After understanding Kruskal's algorithm, valuable next topics include Prim's algorithm for an alternative MST approach, Dijkstra's algorithm for shortest-path problems, the Bellman-Ford algorithm for graphs with negative weights, the union-find data structure in depth, graph algorithms more broadly, minimum spanning tree applications in clustering and network design, and the broader family of greedy algorithms and when they guarantee optimal solutions.

## Summary

Kruskal's algorithm is a greedy, edge-centric method for constructing the minimum spanning tree of a weighted, undirected graph. It sorts all edges by weight, then iteratively adds the cheapest edge that does not create a cycle, using the union-find data structure for efficient cycle detection. With a time complexity of O(E log E), it excels on sparse graphs and naturally extends to disconnected graphs by producing a minimum spanning forest. Its correctness is guaranteed by the cut property, and its simplicity makes it a standard tool in network optimization, clustering, and algorithm design.

## References

- Kruskal, J. B. (1956). "On the Shortest Spanning Subtree of a Graph and the Traveling Salesman Problem." *Proceedings of the American Mathematical Society*, 7(1), 48-50.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapter 23: Minimum Spanning Trees.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 4.3: Minimum Spanning Trees.
- Tarjan, R. E. (1975). "Efficiency of a Good But Not Linear Set Union Algorithm." *Journal of the ACM*, 22(2), 215-225.
- Wikipedia contributors. "Kruskal's algorithm." Wikipedia, The Free Encyclopedia. [https://en.wikipedia.org/wiki/Kruskal%27s_algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
