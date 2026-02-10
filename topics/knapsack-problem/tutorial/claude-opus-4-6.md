# Knapsack problem

The knapsack problem is one of the most fundamental optimization problems in computer science and operations research. Given a set of items, each with a weight and a value, the objective is to determine which items to include in a knapsack so that the total weight does not exceed a given capacity while the total value is maximized. The problem appears deceptively simple, yet it belongs to the class of NP-hard problems, meaning no known algorithm can solve all instances optimally in polynomial time. It serves as a cornerstone for teaching dynamic programming, computational complexity theory, and algorithm design, and it has direct applications in resource allocation, financial portfolio selection, cargo loading, cutting stock problems, and cryptographic systems.

## Problem Definition

The knapsack problem takes as input a set of *n* items, each described by a weight *w_i* and a value *v_i*, along with a maximum weight capacity *W*. The goal is to select a subset of items that maximizes the total value without exceeding the weight capacity. The decision version of the problem asks whether a value of at least *V* can be achieved within the weight constraint. Despite its NP-hardness, the problem has a pseudo-polynomial time solution via dynamic programming when the weights are integers, making it tractable for many practical instances.

## Variants of the Knapsack Problem

The knapsack problem comes in several important variants, each modeling different real-world constraints.

| Variant | Description | Key Constraint |
|---|---|---|
| 0/1 Knapsack | Each item is either taken or left behind | At most one of each item |
| Bounded Knapsack | Each item has a limited number of copies available | Up to *c_i* copies of item *i* |
| Unbounded Knapsack | Unlimited copies of each item are available | No upper bound on item count |
| Fractional Knapsack | Items can be divided into fractions | Continuous quantities allowed |
| Multi-dimensional Knapsack | Multiple resource constraints apply simultaneously | Weight, volume, etc. |
| Multiple Knapsack | Several knapsacks with different capacities | Items assigned to one knapsack |

The 0/1 knapsack is the most studied variant and is NP-hard. The fractional knapsack, by contrast, is solvable in polynomial time using a greedy algorithm that selects items by their value-to-weight ratio.

## Dynamic Programming Approach

Dynamic programming is the most widely taught method for solving the 0/1 knapsack problem exactly. The technique works by decomposing the problem into overlapping subproblems and storing their solutions in a table to avoid redundant computation.

The subproblem is defined as: what is the maximum value achievable using the first *i* items with a remaining capacity of *w*? The recurrence relation proceeds as follows:

- **Base case**: If no items remain or the capacity is zero, the maximum value is zero.
- **Item too heavy**: If the weight of item *i* exceeds the remaining capacity *w*, the item is excluded and the solution equals the best value from the first *i-1* items with capacity *w*.
- **General case**: The maximum value is the greater of two choices — excluding item *i* (taking the solution for *i-1* items at capacity *w*) or including item *i* (adding its value to the solution for *i-1* items at capacity *w - w_i*).

This bottom-up computation fills an *n × W* table and runs in O(nW) time, which is pseudo-polynomial because it depends on the numeric value of the capacity rather than the number of bits needed to represent it. Space-optimized variants reduce memory usage to O(W) by maintaining only two rows of the table at a time.

## Alternative Algorithmic Approaches

Beyond dynamic programming, several other strategies address the knapsack problem with different trade-offs between solution quality, running time, and applicability.

- **Greedy algorithms**: Sort items by value-to-weight ratio and select greedily. This solves the fractional variant optimally but only approximates the 0/1 variant. It runs in O(n log n) time and is useful when a quick estimate suffices.
- **Branch and bound**: Explores the solution space as a tree, pruning branches that cannot improve on the best known solution. Uses an upper bound (often from the fractional relaxation) to guide the search. Effective for moderate-size instances and often finds optimal solutions faster than exhaustive search.
- **Approximation algorithms**: A fully polynomial-time approximation scheme (FPTAS) exists for the knapsack problem. By rounding and scaling item values, the algorithm produces a solution within a factor of (1 - epsilon) of optimal in time polynomial in both *n* and *1/epsilon*.
- **Meet in the middle**: Splits items into two halves, enumerates all subsets of each half, and combines results. Runs in O(2^(n/2)) time, which is significantly better than the O(2^n) brute-force approach for moderate *n*.
- **Metaheuristics**: Genetic algorithms, simulated annealing, and ant colony optimization provide heuristic solutions for very large instances where exact methods are impractical.

## Comparison of Solution Strategies

| Approach | Time Complexity | Optimality | Best Used When |
|---|---|---|---|
| Dynamic Programming | O(nW) | Optimal | Weights are integers and *W* is manageable |
| Greedy | O(n log n) | Optimal for fractional; approximate for 0/1 | Speed is prioritized over exactness |
| Branch and Bound | Exponential worst case | Optimal | Pruning reduces the search space effectively |
| FPTAS | Polynomial in *n* and *1/epsilon* | (1 - epsilon)-approximate | Near-optimal suffices and *W* is large |
| Meet in the Middle | O(2^(n/2)) | Optimal | *n* is moderate (around 30-40 items) |
| Metaheuristics | Varies | Heuristic | Instances are very large or highly constrained |

## Computational Complexity

The knapsack problem occupies a significant position in complexity theory. The decision version is NP-complete, established by reduction from the subset sum problem. The optimization version is NP-hard. However, it is considered one of the "easier" NP-hard problems because it admits a pseudo-polynomial time algorithm and a fully polynomial-time approximation scheme.

The problem is also weakly NP-hard, meaning its difficulty depends on the magnitude of the numeric inputs (weights and capacity) rather than purely on the number of items. This distinguishes it from strongly NP-hard problems like the traveling salesman problem, for which no pseudo-polynomial algorithm is known unless P = NP.

## Practical Applications

The knapsack problem models a wide range of real-world optimization scenarios:

- **Resource allocation**: Distributing a limited budget across projects to maximize return on investment.
- **Cargo loading**: Selecting items for a shipping container or aircraft to maximize cargo value within weight and volume limits.
- **Portfolio optimization**: Choosing financial assets to maximize expected return under capital constraints.
- **Cutting stock**: Minimizing waste when cutting raw materials into pieces of specified sizes.
- **Cryptography**: The Merkle-Hellman knapsack cryptosystem was an early public-key encryption scheme based on the subset sum variant.
- **Task scheduling**: Selecting tasks to execute within a time window to maximize throughput or profit.
- **Cloud computing**: Allocating virtual machines to physical servers to maximize utilization under capacity constraints.

## Related

Topics to explore next include **dynamic programming algorithms** for a broader view of the technique underlying the knapsack solution, **greedy algorithms** for understanding when simpler strategies suffice, **NP-hard problems** and **computational complexity** for the theoretical context, **subset sum problem** as a closely related decision problem, **bin packing** and **cutting stock problems** as sibling optimization challenges, **branch and bound** for exact combinatorial optimization, and **approximation algorithms** for strategies that trade exactness for tractability.

## Summary

The knapsack problem is a foundational optimization problem that asks how to select items with given weights and values to maximize total value without exceeding a weight capacity. Though NP-hard in general, it is tractable for many practical instances through dynamic programming, which solves it in pseudo-polynomial time, and through approximation schemes that guarantee near-optimal solutions in polynomial time. Its variants — 0/1, bounded, unbounded, fractional, and multi-dimensional — model diverse real-world allocation and selection challenges. Understanding the knapsack problem provides essential insight into algorithm design trade-offs, computational complexity boundaries, and the practical art of solving hard optimization problems efficiently.

## References

- Martello, S. and Toth, P. *Knapsack Problems: Algorithms and Computer Implementations*. John Wiley & Sons, 1990.
- Kellerer, H., Pferschy, U., and Pisinger, D. *Knapsack Problems*. Springer, 2004.
- Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. *Introduction to Algorithms*, 4th Edition. MIT Press, 2022. Chapter 15 (Dynamic Programming).
- Vazirani, V.V. *Approximation Algorithms*. Springer, 2003. Chapter 8 (Knapsack).
- Garey, M.R. and Johnson, D.S. *Computers and Intractability: A Guide to the Theory of NP-Completeness*. W.H. Freeman, 1979.
- Wikipedia. "Knapsack problem." [https://en.wikipedia.org/wiki/Knapsack_problem](https://en.wikipedia.org/wiki/Knapsack_problem)
