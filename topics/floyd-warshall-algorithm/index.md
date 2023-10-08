# Floyd-Warshall algorithm

The Floyd-Warshall algorithm is a dynamic programming algorithm used for finding the shortest paths between all pairs of nodes in a weighted, directed graph, including both positive and negative edge weights. It is a versatile algorithm that works even when the graph contains negative cycles, as long as there is no path from any node to itself with a negative total weight.

The key idea behind the Floyd-Warshall algorithm is to build a matrix, often called the "distance matrix" or "shortest path matrix," that represents the shortest distances between all pairs of nodes. Initially, the matrix is filled with the direct edge weights between nodes (if an edge exists) and infinity (if there is no direct edge). Then, the algorithm updates the matrix iteratively by considering all possible paths through intermediate nodes and selecting the shorter paths.

Steps…

1. Initialize a square matrix (2D array) called `dist` with dimensions `n` x `n`, where `n` is the number of nodes in the graph. Set `dist[i][j]` to the weight of the edge from node i to node j if such an edge exists, or set it to infinity if there is no direct edge. Set `dist[i][i]`` to 0 for all nodes, as the shortest path from a node to itself is zero.

2. Perform the following procedure for each node `k` in the graph (considering it as an intermediate node): For each pair of nodes `i` and `j`, check if the path from `i` to `j` through node `k` is shorter than the current best-known path from `i` to `j` (i.e., `dist[i][j] > dist[i][k] + dist[k][j]`). If the path through node k is shorter, update `dist[i][j]` to `dist[i][k] + dist[k][j]`.

After all iterations are complete, the dist matrix will contain the shortest distances between all pairs of nodes.

The Floyd-Warshall algorithm has a time complexity of O(n^3), making it less efficient than Dijkstra's algorithm for most practical cases. However, it is a valuable tool when you need to find the shortest paths between all pairs of nodes in a graph, especially when the graph contains negative edge weights or negative cycles.
