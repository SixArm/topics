# Bellman-Ford algorithm 

The Bellman-Ford algorithm is used to find the shortest paths from a single source vertex to all other vertices in a weighted directed graph, even when the graph contains negative weight edges. This algorithm is a dynamic programming approach that iteratively refines the distance estimates until they converge to the correct values.

The Bellman-Ford algorithm has a time complexity of O(V * E), where V is the number of vertices and E is the number of edges in the graph. It's a versatile algorithm for finding shortest paths in graphs with negative weights, but it may not be as efficient as Dijkstra's algorithm for graphs with non-negative weights.

Key aspects…

Negative Weight Edges: Unlike Dijkstra's algorithm, which cannot handle negative weight edges, the Bellman-Ford algorithm can. However, it cannot handle graphs with negative weight cycles (cycles where the sum of the weights is negative) as it would lead to infinite loops.

Initialization: The algorithm initializes the distance to the source vertex as 0 and the distance to all other vertices as infinity. It maintains a list of distances and updates them iteratively.

Iteration: The algorithm performs a series of iterations, where each iteration relaxes the distances for all edges. Relaxing an edge means improving the estimate of the distance from the source to the destination vertex if a shorter path is found.

Relaxation: For each edge `(u, v)` in the graph, if the distance estimate to vertex `v` through vertex `u` (`distance[u] + weight(u, v)`) is shorter than the current estimate for `v` (`distance[v]`), then `distance[v]` is updated to the new, shorter value.

Convergence: The algorithm repeats the relaxation step for all edges for a total of `V-1` iterations, where `V` is the number of vertices in the graph. After `V-1` iterations, the distances have converged to their correct values if there are no negative weight cycles.

Negative Weight Cycles: If there is a negative weight cycle in the graph, the Bellman-Ford algorithm can detect it. In the presence of a negative weight cycle reachable from the source vertex, the algorithm reports that no shortest path exists, as the shortest path can have an infinite negative weight.
