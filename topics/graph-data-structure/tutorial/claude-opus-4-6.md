# Graph data structure

A graph data structure is a collection of nodes (also called vertices) and the edges that connect them. It is a non-linear data structure used to model pairwise relationships between entities. Graphs are among the most versatile and widely used structures in computer science, underpinning applications from social networks and routing systems to dependency resolution and recommendation engines. Understanding graphs is essential for any technology professional working with interconnected data.

## Core Concepts

A graph **G** is formally defined as an ordered pair **G = (V, E)**, where **V** is a set of vertices and **E** is a set of edges. Each vertex represents an entity such as a person, city, web page, or device. Each edge represents a relationship or connection between two vertices, such as a friendship, a road, a hyperlink, or a network cable.

Graphs differ from trees in that they have no required root node, may contain cycles, and allow arbitrary connections between any pair of vertices. A tree is, in fact, a special case of a graph: a connected, acyclic, undirected graph.

## Types of Graphs

Graphs are classified along several dimensions depending on the nature of their edges and structure.

| Type | Description | Example |
|------|-------------|---------|
| **Undirected graph** | Edges have no direction; the relationship is symmetric. | A road connecting two cities bidirectionally. |
| **Directed graph (digraph)** | Each edge has a direction from a source vertex to a target vertex. | A "follows" relationship on a social platform. |
| **Weighted graph** | Each edge carries a numerical weight representing cost, distance, or capacity. | A flight route map with distances between airports. |
| **Unweighted graph** | All edges are treated equally with no associated weight. | A friendship network where only the existence of a connection matters. |
| **Cyclic graph** | Contains at least one cycle, a path that starts and ends at the same vertex. | A circular dependency among software packages. |
| **Acyclic graph** | Contains no cycles. A directed acyclic graph (DAG) is especially important in scheduling and compilation. | A build dependency graph or a version control commit history. |
| **Connected graph** | Every vertex is reachable from every other vertex (in undirected graphs). | A fully functioning local area network. |
| **Bipartite graph** | Vertices can be divided into two disjoint sets such that every edge connects a vertex in one set to one in the other. | A job-assignment problem matching workers to tasks. |

## Graph Representations

There are two primary ways to represent a graph in memory, each with distinct trade-offs in space and time complexity.

**Adjacency matrix.** A two-dimensional array of size V x V, where the entry at row *i* and column *j* indicates whether an edge exists between vertex *i* and vertex *j* (and its weight, if applicable). This representation provides O(1) edge lookup but requires O(V^2) space regardless of edge count, making it best suited for dense graphs.

**Adjacency list.** An array or hash map of lists, where each vertex stores a list of its neighboring vertices. This representation uses O(V + E) space and is more efficient for sparse graphs, which are the majority of real-world graphs. However, checking whether a specific edge exists takes O(degree) time rather than O(1).

| Criterion | Adjacency Matrix | Adjacency List |
|-----------|-------------------|----------------|
| Space complexity | O(V^2) | O(V + E) |
| Edge lookup | O(1) | O(degree of vertex) |
| Iterate neighbors | O(V) | O(degree of vertex) |
| Best for | Dense graphs | Sparse graphs |
| Add vertex | O(V^2) amortized | O(1) |
| Add edge | O(1) | O(1) |

A third representation, the **edge list**, simply stores all edges as a list of pairs (or triples, if weighted). It is compact and straightforward but inefficient for neighbor queries. It is commonly used in algorithms like Kruskal's minimum spanning tree, which process edges in sorted order.

## Key Graph Properties

Several properties characterize the structure and behavior of a graph:

- **Degree** of a vertex is the number of edges incident to it. In directed graphs, this splits into in-degree (incoming edges) and out-degree (outgoing edges).
- **Path** is a sequence of vertices connected by edges. A simple path visits no vertex more than once.
- **Cycle** is a path that starts and ends at the same vertex with no repeated edges.
- **Connectivity** indicates whether there is a path between every pair of vertices. In directed graphs, strong connectivity means every vertex is reachable from every other vertex.
- **Density** is the ratio of actual edges to the maximum possible number of edges. A complete graph, in which every pair of vertices is connected, has maximum density.
- **Diameter** is the length of the longest shortest path between any two vertices, measuring how "spread out" the graph is.

## Common Graph Algorithms

Graph algorithms solve problems related to traversal, shortest paths, connectivity, and optimization. The following are among the most important.

**Traversal algorithms** systematically visit all vertices in a graph. Breadth-first search (BFS) explores neighbors level by level using a queue, making it ideal for finding shortest paths in unweighted graphs. Depth-first search (DFS) explores as deeply as possible along each branch before backtracking, making it useful for topological sorting, cycle detection, and connected component identification.

**Shortest path algorithms** find the minimum-cost path between vertices. Dijkstra's algorithm handles graphs with non-negative edge weights using a priority queue. The Bellman-Ford algorithm handles negative weights at the cost of higher time complexity. The Floyd-Warshall algorithm computes shortest paths between all pairs of vertices.

**Minimum spanning tree algorithms** find a subset of edges that connects all vertices with minimum total weight. Kruskal's algorithm processes edges in order of weight. Prim's algorithm grows the tree from a starting vertex.

**Topological sorting** linearly orders the vertices of a directed acyclic graph such that for every directed edge from vertex *u* to vertex *v*, *u* appears before *v*. This is essential for task scheduling, build systems, and dependency resolution.

**Strongly connected component algorithms** such as Tarjan's and Kosaraju's identify maximal subsets of vertices in a directed graph where every vertex is reachable from every other vertex within the subset.

| Algorithm | Problem | Time Complexity | Key Constraint |
|-----------|---------|-----------------|----------------|
| BFS | Shortest path (unweighted) | O(V + E) | Unweighted graphs only |
| DFS | Traversal, cycle detection | O(V + E) | None |
| Dijkstra | Shortest path (weighted) | O((V + E) log V) | No negative weights |
| Bellman-Ford | Shortest path (weighted) | O(V * E) | Handles negative weights |
| Floyd-Warshall | All-pairs shortest path | O(V^3) | Dense graph use cases |
| Kruskal | Minimum spanning tree | O(E log E) | Undirected, weighted |
| Prim | Minimum spanning tree | O((V + E) log V) | Undirected, weighted |
| Topological sort | Linear ordering of DAG | O(V + E) | Must be a DAG |

## Real-World Applications

Graphs appear across virtually every domain in technology:

- **Social networks** model users as vertices and relationships (friendships, follows, messages) as edges. Algorithms identify communities, recommend connections, and measure influence.
- **Navigation and routing** systems represent intersections as vertices and roads as weighted edges. Shortest path algorithms power turn-by-turn directions and logistics optimization.
- **Web search** engines model the web as a directed graph of pages and hyperlinks. PageRank and similar algorithms exploit this graph structure to rank search results.
- **Dependency management** in build tools, package managers, and task schedulers relies on directed acyclic graphs and topological sorting to determine execution order.
- **Network infrastructure** uses graphs to model routers, switches, and links. Spanning tree protocols prevent loops, and routing protocols find optimal paths.
- **Knowledge graphs** represent entities and their relationships in structured form, powering question answering, recommendation systems, and semantic search.
- **Fraud detection** in financial systems identifies suspicious patterns by analyzing transaction graphs for anomalous cycles or clusters.

## Trade-Offs and Considerations

Choosing the right graph representation and algorithm depends on the problem characteristics:

- **Sparse vs. dense**: Most real-world graphs are sparse. Use adjacency lists unless the graph is dense or you need constant-time edge queries.
- **Static vs. dynamic**: If the graph changes frequently (vertices and edges added or removed), adjacency lists adapt more easily than matrices.
- **Directed vs. undirected**: The choice affects which algorithms apply. Many algorithms have variants for both, but some (topological sort) require directed graphs.
- **Weighted vs. unweighted**: Unweighted problems can use simpler BFS-based solutions. Weighted problems require Dijkstra, Bellman-Ford, or similar algorithms.
- **Scale**: For very large graphs (billions of vertices), distributed graph processing frameworks such as Apache Giraph or GraphX become necessary, as single-machine representations exceed memory limits.

## Related

Related topics to explore next include depth-first search and breadth-first search for mastering graph traversal, Dijkstra's algorithm and Bellman-Ford algorithm for shortest path problems, minimum spanning tree for network design, topological sorting for dependency resolution, and graph databases for persistent storage and querying of graph-structured data. Broader foundational topics include data structures such as trees, hash tables, and linked lists, as well as algorithm design paradigms like dynamic programming and greedy algorithms.

## Summary

A graph data structure models pairwise relationships between entities using vertices and edges, making it one of the most powerful and flexible abstractions in computer science. Graphs come in many varieties including directed and undirected, weighted and unweighted, cyclic and acyclic, each suited to different problem domains. The two primary representations, adjacency matrices and adjacency lists, offer complementary trade-offs in space and time efficiency. A rich ecosystem of algorithms including BFS, DFS, Dijkstra's, and topological sort enable traversal, shortest path computation, connectivity analysis, and scheduling. Mastery of graph concepts and algorithms is indispensable for technology professionals tackling problems in networking, search, social platforms, logistics, and beyond.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapters 20-24 cover graph algorithms comprehensively.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Part 4 provides extensive coverage of graph processing.
- Skiena, S. S. (2020). *The Algorithm Design Manual* (3rd ed.). Springer. Chapters 7-8 address graph traversal and weighted graph algorithms.
- Kleinberg, J., & Tardos, E. (2005). *Algorithm Design*. Addison-Wesley. Covers graph algorithms with emphasis on network flow and applications.
- Wikipedia contributors. "Graph (abstract data type)." *Wikipedia, The Free Encyclopedia*. https://en.wikipedia.org/wiki/Graph_(abstract_data_type)
- GeeksforGeeks. "Graph Data Structure and Algorithms." https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/
