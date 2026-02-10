# Traveling salesman problem

The traveling salesman problem (TSP) is one of the most extensively studied problems in computer science, operations research, and combinatorial optimization. It asks a deceptively simple question: given a set of cities and the distances between each pair, what is the shortest possible route that visits every city exactly once and returns to the starting city? Despite the simplicity of its statement, the TSP is classified as NP-hard, meaning no known algorithm can solve all instances efficiently as the number of cities grows. The problem derives its name from the practical scenario of a salesman who must plan an optimal tour through a list of client cities while minimizing total travel distance. Since its formal articulation in the 1930s, the TSP has become a benchmark for algorithmic research and a gateway into the deeper landscape of computational complexity.

## Problem Definition

The TSP can be stated formally as follows: given a complete weighted graph where vertices represent cities and edge weights represent distances or costs, find a Hamiltonian cycle (a cycle that visits every vertex exactly once) of minimum total weight. The input consists of n cities and a distance function d(i, j) for each pair of cities i and j. The objective is to find a permutation of cities that minimizes the total tour length.

The number of possible tours grows factorially with the number of cities. For n cities, there are (n-1)!/2 distinct tours in the symmetric case. This explosive growth is what makes the problem computationally intractable for large instances. Even for a modest 20 cities, the number of possible tours exceeds 60 billion.

## Variants of the TSP

The traveling salesman problem comes in several important variants, each with distinct properties and applications.

| Variant | Description | Distance Property |
|---|---|---|
| Symmetric TSP | Distance from city A to B equals distance from B to A | d(i,j) = d(j,i) |
| Asymmetric TSP | Distance from A to B may differ from B to A | d(i,j) may not equal d(j,i) |
| Euclidean TSP | Cities are points in Euclidean space; distances follow the triangle inequality | Geometric distances |
| Metric TSP | Distances satisfy the triangle inequality but need not be Euclidean | d(i,k) <= d(i,j) + d(j,k) |
| Multiple TSP | Multiple salesmen share the set of cities | Partitioned tours |
| Time-window TSP | Each city must be visited within a specified time window | Constrained scheduling |

The symmetric TSP is the most commonly studied form. The asymmetric variant arises in real-world situations such as one-way streets or differing shipping costs by direction. The Euclidean TSP has special structural properties that allow for polynomial-time approximation schemes.

## Computational Complexity

The TSP holds a central place in the theory of computational complexity. It was among the first problems shown to be NP-hard, and the decision version (does a tour of length at most L exist?) is NP-complete. This means that unless P = NP, no polynomial-time algorithm exists that can solve all instances of the TSP optimally.

Key complexity facts include:

- **Brute-force enumeration** requires O(n!) time, which is infeasible for even moderate n.
- **Dynamic programming** (the Held-Karp algorithm) reduces the time complexity to O(n^2 * 2^n), which is better but still exponential.
- **Branch and bound** methods can solve instances with hundreds of cities by intelligently pruning the search space.
- **No polynomial-time exact algorithm** is known for the general TSP.
- **Approximation** is possible for metric TSP but not for the general case unless P = NP.

The TSP is also significant because it demonstrates the gap between problems that are easy to verify (given a tour, it is trivial to compute its length) and problems that are hard to solve (finding the optimal tour).

## Exact Algorithms

Exact algorithms guarantee finding the optimal solution but require exponential time in the worst case. They are practical only for small to moderate problem sizes.

- **Brute-force search**: Enumerates all possible permutations and selects the shortest tour. Feasible only for very small instances (roughly up to 12-15 cities).
- **Held-Karp algorithm**: Uses dynamic programming and bitmask representation of subsets to solve TSP in O(n^2 * 2^n) time and O(n * 2^n) space. This is the best-known exact algorithm in terms of time complexity.
- **Branch and bound**: Systematically explores the solution space while using lower bounds to prune branches that cannot lead to an optimal solution. Effective implementations have solved instances with thousands of cities.
- **Integer linear programming (ILP)**: Formulates the TSP as a linear program with integer constraints. The Dantzig-Fulkerson-Johnson formulation, combined with cutting-plane methods, has been used to solve large-scale instances optimally. The Concorde solver, based on this approach, has solved instances with tens of thousands of cities.

## Heuristic and Approximation Algorithms

Because exact methods become impractical for large instances, heuristic and approximation algorithms are widely used to find good solutions in reasonable time.

| Algorithm | Type | Approximation Ratio | Description |
|---|---|---|---|
| Nearest Neighbor | Constructive heuristic | Can be arbitrarily bad | Greedily visits the closest unvisited city |
| Christofides' Algorithm | Approximation | 3/2 for metric TSP | Combines minimum spanning tree with minimum-weight perfect matching |
| 2-opt | Local search | No guarantee | Iteratively removes two edges and reconnects the tour if it improves |
| 3-opt | Local search | No guarantee | Extends 2-opt by considering three-edge swaps |
| Lin-Kernighan | Local search | No guarantee | Variable-depth search that generalizes k-opt moves |
| Genetic algorithms | Metaheuristic | No guarantee | Evolves a population of tours using crossover and mutation |
| Simulated annealing | Metaheuristic | No guarantee | Probabilistically accepts worse solutions to escape local optima |
| Ant colony optimization | Metaheuristic | No guarantee | Simulates pheromone-guided ant behavior to construct tours |

Christofides' algorithm is notable for providing a proven worst-case guarantee: it always produces a tour within 1.5 times the optimal length for metric TSP instances. For decades this was the best-known approximation ratio; in 2020, a slight improvement was achieved by Karlin, Klein, and Oveis Gharan.

## Real-World Applications

The TSP and its generalizations appear across a wide range of industries and disciplines:

- **Logistics and delivery**: Route planning for package delivery, postal services, and ride-sharing platforms. Companies like UPS and FedEx solve TSP variants daily to minimize fuel costs and delivery times.
- **Manufacturing**: Optimization of tool paths in CNC machining, circuit board drilling, and robotic assembly. The order in which a drill visits holes on a circuit board is a direct TSP instance.
- **Genomics**: DNA fragment assembly and gene sequencing involve finding optimal orderings that are modeled as TSP instances.
- **Telecommunications**: Design of efficient network topologies and data routing paths.
- **Astronomy**: Planning observation sequences for telescopes to minimize slew time between targets.
- **Urban planning**: School bus routing, garbage collection scheduling, and emergency response routing.

In practice, real-world problems often include additional constraints such as time windows, vehicle capacities, and multiple vehicles, leading to richer formulations like the Vehicle Routing Problem (VRP).

## Historical Milestones

The TSP has a rich history that has driven advances in optimization and computer science.

- **1930s**: The problem was formalized by Karl Menger and studied by mathematicians in Vienna.
- **1954**: Dantzig, Fulkerson, and Johnson solved a 49-city instance using cutting-plane methods, establishing the foundation for modern integer programming approaches.
- **1972**: Richard Karp included the TSP in his landmark list of 21 NP-complete problems.
- **1976**: Christofides published his 3/2-approximation algorithm for metric TSP.
- **1992**: The Concorde TSP solver was developed, eventually solving instances with over 85,000 cities to proven optimality.
- **2006**: A tour of 85,900 cities (a VLSI circuit design instance) was solved optimally using Concorde.
- **2020**: Karlin, Klein, and Oveis Gharan broke the Christofides bound with a slightly improved approximation ratio.

## Related

Related topics to explore include graph theory and Hamiltonian cycles for the mathematical foundations, computational complexity theory and NP-completeness for understanding why the TSP is hard, the vehicle routing problem as a practical generalization, dynamic programming and greedy algorithms as fundamental algorithm design paradigms, approximation algorithms for tackling intractable problems with provable guarantees, linear programming and integer programming for optimization formulations, and metaheuristic approaches such as genetic algorithms, simulated annealing, and ant colony optimization for large-scale combinatorial optimization.

## Summary

The traveling salesman problem is a cornerstone of combinatorial optimization that asks for the shortest route visiting a set of cities and returning to the origin. Despite its simple formulation, the TSP is NP-hard, and no efficient exact algorithm is known for the general case. Exact methods such as branch and bound and integer linear programming can solve instances with thousands of cities, while heuristics and approximation algorithms provide practical solutions for larger problems. The TSP has driven foundational advances in computational complexity, algorithm design, and operations research, and its variants arise naturally in logistics, manufacturing, genomics, and many other fields. It remains one of the most actively studied problems in all of mathematics and computer science.

## References

- Applegate, D. L., Bixby, R. E., Chvatal, V., & Cook, W. J. (2006). *The Traveling Salesman Problem: A Computational Study*. Princeton University Press.
- Gutin, G., & Punnen, A. P. (Eds.). (2007). *The Traveling Salesman Problem and Its Variations*. Springer.
- Christofides, N. (1976). "Worst-case analysis of a new heuristic for the travelling salesman problem." Technical Report 388, Graduate School of Industrial Administration, Carnegie Mellon University.
- Karlin, A. R., Klein, N., & Oveis Gharan, S. (2021). "A (slightly) improved approximation algorithm for metric TSP." *Proceedings of the 53rd Annual ACM STOC*, pp. 32-45.
- Dantzig, G., Fulkerson, R., & Johnson, S. (1954). "Solution of a large-scale traveling-salesman problem." *Journal of the Operations Research Society of America*, 2(4), 393-410.
- Concorde TSP Solver: [https://www.math.uwaterloo.ca/tsp/concorde.html](https://www.math.uwaterloo.ca/tsp/concorde.html)
- Karp, R. M. (1972). "Reducibility among combinatorial problems." In *Complexity of Computer Computations*, pp. 85-103. Plenum Press.
