# Dijkstra's algorithm

Dijkstra's algorithm is one of the most foundational algorithms in computer science, developed by Edsger W. Dijkstra in 1956 and published in 1959. It solves the single-source shortest path problem for a weighted, directed graph with non-negative edge weights. Given a starting node, the algorithm computes the shortest path to every other reachable node in the graph. It is widely used in network routing protocols, geographic information systems, transportation logistics, and any domain where optimal pathfinding through a weighted network is required.

## How It Works

The algorithm operates by maintaining two conceptual sets of nodes: those for which the shortest path from the source is already known (the "settled" set), and those for which the shortest path is still being refined (the "unsettled" set). It proceeds greedily, always selecting the unsettled node with the smallest tentative distance, locking in that distance as final, and then relaxing the edges to that node's neighbors. This relaxation step checks whether routing through the newly settled node offers a shorter path to any neighbor than previously recorded, and updates the tentative distance if so. The process repeats until all reachable nodes have been settled or the priority queue is exhausted.

## Algorithm Steps

1. **Initialization.** Set the distance to the source node as zero and the distance to all other nodes as infinity. Place all nodes in an unsettled set. Insert the source node into a priority queue (min-heap) keyed by distance.

2. **Selection.** Extract the node with the smallest tentative distance from the priority queue. This node becomes the current node. Mark it as settled (visited).

3. **Relaxation.** For each unsettled neighbor of the current node, compute the distance through the current node. If this distance is less than the neighbor's current tentative distance, update the neighbor's distance and insert or update it in the priority queue.

4. **Repetition.** Repeat steps 2 and 3 until the priority queue is empty. At termination, the recorded distances represent the shortest path from the source to every reachable node.

To reconstruct the actual shortest path (not just its length), maintain a predecessor map that records, for each node, which node led to its shortest distance update. After the algorithm completes, trace backward from the destination through the predecessor map to the source.

## Time Complexity

The time complexity of Dijkstra's algorithm depends on the data structure used for the priority queue and the representation of the graph.

| Implementation | Time Complexity | Best For |
|---|---|---|
| Array-based (linear scan) | O(V²) | Dense graphs where E approaches V² |
| Binary heap with adjacency list | O((V + E) log V) | Sparse to moderately dense graphs |
| Fibonacci heap with adjacency list | O(V log V + E) | Theoretically optimal for sparse graphs |

Here, V is the number of vertices and E is the number of edges. For most practical applications, the binary heap implementation strikes the best balance between simplicity and performance. The Fibonacci heap achieves the best theoretical bound but has significant constant-factor overhead that limits its practical advantage.

## Key Properties and Constraints

- **Non-negative weights required.** Dijkstra's algorithm assumes all edge weights are non-negative. If a graph contains negative-weight edges, the algorithm may produce incorrect results because it cannot revisit settled nodes.

- **Greedy strategy.** The algorithm makes locally optimal choices at each step, always settling the node with the smallest tentative distance. The non-negative weight constraint guarantees that this greedy choice is globally optimal.

- **Single-source, all-destinations.** The algorithm naturally computes shortest paths from one source to all other nodes. It can be terminated early if only the shortest path to a specific target is needed.

- **Optimal substructure.** The algorithm relies on the property that any subpath of a shortest path is itself a shortest path, which is a hallmark of problems solvable by dynamic programming and greedy methods.

## Comparison with Other Shortest Path Algorithms

| Algorithm | Negative Weights | Graph Type | Typical Use Case |
|---|---|---|---|
| Dijkstra's | No | Weighted, directed or undirected | Single-source shortest paths in non-negative graphs |
| Bellman-Ford | Yes | Weighted, directed | Graphs with negative weights; detects negative cycles |
| Floyd-Warshall | Yes | Weighted, directed | All-pairs shortest paths in dense graphs |
| A* Search | No | Weighted, directed or undirected | Single-pair shortest path with a heuristic |
| BFS (unweighted) | N/A | Unweighted | Shortest path in unweighted graphs |

Dijkstra's algorithm is faster than Bellman-Ford for graphs without negative weights. A* extends Dijkstra's approach with an admissible heuristic to focus the search toward a specific destination, often exploring fewer nodes. Floyd-Warshall is preferable when shortest paths between all pairs of nodes are needed simultaneously.

## Practical Applications

- **Network routing.** Protocols such as OSPF (Open Shortest Path First) and IS-IS use Dijkstra's algorithm to compute optimal routing tables across network topologies.

- **Navigation and mapping.** GPS systems and mapping services use variants of Dijkstra's algorithm to calculate shortest or fastest routes between locations.

- **Telecommunications.** The algorithm helps determine optimal paths for signal routing in telephone and data networks.

- **Operations research.** Supply chain optimization, logistics planning, and transportation scheduling rely on shortest path computations.

- **Game development.** Pathfinding for non-player characters in games frequently uses Dijkstra's algorithm or its heuristic extension, A*.

## Common Pitfalls

- **Applying the algorithm to graphs with negative edge weights.** This is the most frequent misuse. Use Bellman-Ford instead when negative weights are present.

- **Not using a proper priority queue.** A naive implementation without a min-heap degrades to O(V²) performance, which is unacceptable for large sparse graphs.

- **Confusing shortest path distance with shortest path reconstruction.** The basic algorithm produces distances only. Path reconstruction requires maintaining and tracing a predecessor map.

- **Forgetting to skip already-settled nodes.** When using a lazy deletion strategy with a binary heap, the same node may appear multiple times in the queue. Settled nodes must be skipped when extracted to avoid redundant processing.

## Related

Topics to explore next include the Bellman-Ford algorithm for graphs with negative edge weights, the Floyd-Warshall algorithm for all-pairs shortest paths, the A* search algorithm for heuristic-guided single-pair pathfinding, breadth-first search for unweighted shortest paths, graph algorithms more broadly including minimum spanning trees (Prim's and Kruskal's algorithms), priority queue and min-heap data structures, and greedy algorithm design patterns.

## Summary

Dijkstra's algorithm is a greedy, single-source shortest path algorithm that efficiently computes optimal distances from a starting node to all other nodes in a graph with non-negative edge weights. It operates by iteratively settling the closest unsettled node and relaxing its outgoing edges, using a priority queue to maintain efficient access to the minimum-distance candidate. With a binary heap implementation, it runs in O((V + E) log V) time, making it well-suited for sparse graphs common in real-world networks. Its correctness depends on the non-negative weight assumption, and practitioners must choose alternative algorithms such as Bellman-Ford when negative weights are present. Decades after its invention, Dijkstra's algorithm remains one of the most widely implemented and practically important algorithms in computer science.

## References

- Dijkstra, E. W. (1959). "A note on two problems in connexion with graphs." *Numerische Mathematik*, 1(1), 269–271. The original paper introducing the algorithm.

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 22 covers single-source shortest paths including Dijkstra's algorithm in depth.

- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Provides practical implementations and analysis of shortest path algorithms.

- Fredman, M. L., & Tarjan, R. E. (1987). "Fibonacci heaps and their uses in improved network optimization algorithms." *Journal of the ACM*, 34(3), 596–615. Describes the Fibonacci heap optimization for Dijkstra's algorithm.

- Wikipedia: Dijkstra's algorithm — [https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
