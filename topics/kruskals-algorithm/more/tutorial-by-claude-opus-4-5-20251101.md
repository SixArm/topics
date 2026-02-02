## Kruskal's Algorithm

Kruskal's algorithm is a foundational greedy algorithm used to find the minimum spanning tree (MST) of a connected, undirected graph. The minimum spanning tree is a subset of edges that connects all vertices with the minimum possible total edge weight, forming a tree structure with no cycles. This algorithm is named after Joseph Kruskal, who published it in 1956.

## Core Concept

The algorithm operates on a simple principle: always select the smallest available edge that does not create a cycle. By repeatedly making this locally optimal choice, Kruskal's algorithm guarantees a globally optimal solution—the minimum spanning tree.

For disconnected graphs, the algorithm naturally produces a minimum spanning forest, where each connected component has its own minimum spanning tree.

## Algorithm Steps

Kruskal's algorithm follows a straightforward six-step process:

1. **Initialize**: Begin with an empty set of edges that will eventually form the MST. Each vertex starts as its own isolated component.

2. **Sort Edges**: Arrange all graph edges in ascending order by weight. This sorting step enables the greedy selection strategy.

3. **Iterate Through Edges**: Process edges starting from the smallest weight, moving toward larger weights.

4. **Add Valid Edges**: For each edge, determine whether adding it would create a cycle. If not, include it in the MST. If it would create a cycle, skip it entirely.

5. **Repeat**: Continue processing edges until the MST contains exactly (V - 1) edges, where V is the number of vertices.

6. **Return Result**: The collected edges form the minimum spanning tree.

## Cycle Detection with Union-Find

The critical operation in Kruskal's algorithm is detecting whether adding an edge creates a cycle. The disjoint-set data structure (also called union-find) provides an efficient solution.

| Operation | Purpose | Time Complexity |
|-----------|---------|-----------------|
| Find | Determine which component a vertex belongs to | O(α(n)) amortized |
| Union | Merge two components into one | O(α(n)) amortized |

The inverse Ackermann function α(n) grows extremely slowly—for all practical purposes, these operations are nearly constant time.

**How Union-Find Works:**

- Each vertex initially belongs to its own set
- When examining an edge (u, v), use Find to check if u and v are in the same set
- If they share a set, adding the edge would create a cycle—skip it
- If they are in different sets, add the edge and use Union to merge their sets

## Time Complexity Analysis

| Component | Complexity | Notes |
|-----------|------------|-------|
| Sorting edges | O(E log E) | Dominates overall complexity |
| Union-Find operations | O(E α(V)) | Nearly linear due to path compression |
| Overall | O(E log E) | Equivalent to O(E log V) since E ≤ V² |

Where E is the number of edges and V is the number of vertices.

## Space Complexity

The algorithm requires O(V + E) space:

- O(V) for the union-find data structure
- O(E) for storing the sorted edge list

## When to Use Kruskal's Algorithm

**Ideal scenarios:**

- Sparse graphs where E is close to V
- When edges are already sorted or nearly sorted
- When you need to process edges individually
- Distributed systems where edge information arrives incrementally

**Less suitable scenarios:**

- Dense graphs where E approaches V²
- When adjacency list/matrix representation is already available (Prim's may be faster)

## Comparison with Prim's Algorithm

| Aspect | Kruskal's Algorithm | Prim's Algorithm |
|--------|---------------------|------------------|
| Approach | Edge-centric | Vertex-centric |
| Data Structure | Union-Find | Priority Queue |
| Best for | Sparse graphs | Dense graphs |
| Time Complexity | O(E log E) | O(E log V) with binary heap |
| Starting Point | No specific start | Requires starting vertex |
| Parallelization | Easier to parallelize | More sequential |

## Correctness Guarantee

Kruskal's algorithm is guaranteed to produce a minimum spanning tree due to two properties:

- **Cut Property**: For any cut of the graph, the minimum weight edge crossing the cut must be in the MST
- **Greedy Choice**: Selecting the minimum weight edge that does not create a cycle always satisfies the cut property

## Practical Applications

- **Network Design**: Designing computer networks, telecommunications infrastructure, or electrical grids with minimum cable length
- **Clustering**: Creating hierarchical clustering by stopping the algorithm before completion
- **Approximation Algorithms**: Serving as a subroutine for approximating NP-hard problems like the traveling salesman problem
- **Image Segmentation**: Partitioning images based on pixel similarity
- **Circuit Design**: Minimizing wire length in VLSI chip layouts

## Key Considerations

- The algorithm handles graphs with negative edge weights correctly
- For graphs with equal-weight edges, multiple valid MSTs may exist
- The algorithm naturally handles disconnected graphs by producing a forest
- Edge weights must be defined for all edges in the graph

## Summary

Kruskal's algorithm provides an elegant, intuitive approach to finding minimum spanning trees. Its edge-centric strategy—sorting edges by weight and greedily adding the smallest non-cycle-forming edges—makes it particularly effective for sparse graphs and scenarios where edges can be processed independently. Combined with the union-find data structure for efficient cycle detection, Kruskal's algorithm achieves near-optimal time complexity and remains a fundamental tool in graph theory and network optimization.
