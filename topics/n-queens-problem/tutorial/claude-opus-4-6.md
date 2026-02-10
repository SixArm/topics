# N-queens problem

The N-queens problem is one of the most widely studied combinatorial puzzles in computer science. The challenge is to place N chess queens on an N×N chessboard so that no two queens threaten each other, meaning no two queens share the same row, column, or diagonal. First proposed by chess composer Max Bezzel in 1848 and later generalized by Franz Nauck, the problem has grown from a recreational mathematics curiosity into a foundational benchmark for algorithm design, constraint satisfaction, and optimization research. It elegantly demonstrates how a simple set of rules can produce exponentially complex search spaces, making it an ideal vehicle for understanding backtracking, heuristics, and computational complexity.

## Problem Definition

The N-queens problem is a constraint satisfaction problem (CSP). Given an N×N grid, the task is to assign one queen to each row such that three mutual exclusion constraints are satisfied simultaneously:

- **Row constraint**: Each row contains exactly one queen.
- **Column constraint**: No two queens occupy the same column.
- **Diagonal constraint**: No two queens lie on the same diagonal, whether ascending or descending.

Because there must be exactly one queen per row and one per column, a valid placement is effectively a permutation of column indices. The search space is therefore N! arrangements, which is considerably smaller than the naive N² choose N possibilities but still grows super-exponentially.

## Historical Background

The problem originated in 1848 when Max Bezzel published the eight-queens puzzle in a German chess journal, asking readers to place eight non-attacking queens on a standard 8×8 board. In 1850, Franz Nauck published the first solution set and generalized the puzzle to N queens on an N×N board. The mathematician Carl Friedrich Gauss also investigated the problem, corresponding about it with his colleague Heinrich Schumacher. Throughout the twentieth century, the N-queens problem became a staple exercise in combinatorics, and by the 1960s and 1970s it was adopted as a teaching and benchmarking problem in computer science.

## Solution Counts by Board Size

The number of distinct solutions grows rapidly with N. The table below illustrates this growth for small board sizes.

| Board Size (N) | Distinct Solutions | Unique Solutions (modulo symmetry) |
|:-:|:-:|:-:|
| 1 | 1 | 1 |
| 2 | 0 | 0 |
| 3 | 0 | 0 |
| 4 | 2 | 1 |
| 5 | 10 | 2 |
| 6 | 4 | 1 |
| 7 | 40 | 6 |
| 8 | 92 | 12 |
| 9 | 352 | 46 |
| 10 | 724 | 92 |
| 11 | 2,680 | 341 |
| 12 | 14,200 | 1,787 |
| 13 | 73,712 | 9,233 |
| 14 | 365,596 | 45,752 |
| 15 | 2,279,184 | 285,053 |

There is no known closed-form formula for the number of solutions. The unique solutions column accounts for rotational and reflective symmetry of the board, reducing each equivalence class of eight symmetric placements to a single representative.

## Algorithmic Approaches

Multiple algorithmic strategies have been developed to solve the N-queens problem, each with different trade-offs in completeness, speed, and scalability.

### Backtracking

The most classical approach places queens one row at a time, checking constraints at each step. When a conflict is detected, the algorithm backtracks to the previous row and tries the next available column. Backtracking guarantees finding all solutions and is easy to implement, but its worst-case time complexity is exponential.

### Constraint Propagation

Pairing backtracking with constraint propagation techniques such as forward checking or arc consistency dramatically prunes the search tree. After placing each queen, the algorithm removes threatened positions from the domains of unassigned rows, detecting dead ends earlier and reducing unnecessary exploration.

### Local Search and Min-Conflicts

For very large N, constructive search becomes impractical. Local search methods start from a random or heuristic initial placement and iteratively move queens to reduce the total number of conflicts. The min-conflicts heuristic, which moves a queen in a conflicted column to the row with the fewest conflicts, can solve instances with millions of queens in near-linear time on average.

### Genetic and Evolutionary Algorithms

Evolutionary approaches encode board configurations as permutations and evolve populations using crossover, mutation, and selection operators. These methods are well-suited for exploring diverse regions of the solution space and can be parallelized effectively.

### Bitwise and Parallel Techniques

Efficient implementations exploit bitwise operations to represent column and diagonal attacks as bitmasks, allowing constraint checks in constant time per row. Combined with modern parallel hardware, these techniques push exact enumeration to N values in the mid-twenties and beyond.

## Comparison of Approaches

| Approach | Completeness | Typical Use Case | Scalability |
|---|---|---|---|
| Backtracking | Complete (finds all solutions) | Small to moderate N | Exponential worst case |
| Constraint Propagation | Complete | Moderate N with pruning | Better than plain backtracking |
| Min-Conflicts / Local Search | Incomplete (finds one solution) | Very large N (millions) | Near-linear average case |
| Genetic Algorithms | Incomplete | Large N, parallel environments | Good with tuning |
| Bitwise Enumeration | Complete | Exact counting for moderate N | Highly optimized constant factors |

## Computational Complexity

The N-queens completion problem, which asks whether a partially filled board can be extended to a full solution, is NP-complete. This was proven by Gent, Jefferson, and Nightingale in 2017. However, the standard N-queens problem of placing queens on an empty board always has at least one solution for N greater than or equal to 4, and constructive polynomial-time algorithms exist for placing a single valid configuration. The counting variant, determining the exact number of solutions, is believed to be in the #P complexity class, making it computationally much harder than simply finding one solution.

## Practical Applications

While the N-queens problem is primarily an academic benchmark, its principles and solution techniques extend to real-world domains:

- **VLSI circuit design**: Placing non-interfering components on a chip layout mirrors the mutual exclusion constraints of queen placement.
- **Parallel memory storage**: Assigning data to memory banks to avoid access conflicts uses similar constraint models.
- **Robotics and path planning**: Non-conflicting path assignments for multiple robots on a grid rely on constraint satisfaction approaches refined through N-queens research.
- **Scheduling and resource allocation**: Assigning tasks to time slots or workers to shifts so that no two assignments conflict is structurally analogous to the N-queens formulation.
- **Intrusion detection systems**: Variations of the problem have been used to test pattern-matching and anomaly-detection algorithms in computer security.
- **Algorithm education**: The problem remains one of the most common teaching tools for recursion, backtracking, and constraint satisfaction in computer science curricula.

## Key Concepts and Terminology

- **Constraint satisfaction problem (CSP)**: A problem defined by variables, domains, and constraints, where the goal is to assign values to all variables without violating any constraint.
- **Backtracking**: A depth-first search strategy that abandons partial candidates as soon as it determines they cannot lead to a valid solution.
- **Forward checking**: A look-ahead technique that removes values from future variable domains after each assignment.
- **Min-conflicts heuristic**: A local search strategy that selects the value causing the fewest constraint violations.
- **Permutation representation**: Encoding a board state as a sequence of column indices, one per row, which inherently satisfies the row constraint.
- **Symmetry breaking**: Techniques that eliminate equivalent solutions under rotation and reflection, reducing the effective search space.

## Related

Related topics to explore next include backtracking algorithms and their role in depth-first search, constraint satisfaction problems and arc consistency, the broader class of combinatorial optimization problems, genetic algorithms and evolutionary computation, NP-completeness and computational complexity theory, the traveling salesman problem as another classic NP-hard benchmark, and heuristic search methods such as simulated annealing and tabu search.

## Summary

The N-queens problem asks how to place N non-attacking queens on an N×N chessboard, a deceptively simple formulation that leads to exponentially complex search spaces. Originating as a nineteenth-century chess puzzle, it has become a cornerstone benchmark in computer science for evaluating backtracking, constraint propagation, local search, and parallel computation techniques. Its constraint structure maps naturally onto real-world problems in scheduling, circuit design, robotics, and resource allocation. Whether used as a teaching exercise for recursion or as a stress test for state-of-the-art solvers, the N-queens problem remains an enduring and instructive challenge at the intersection of combinatorics, algorithm design, and computational complexity.

## References

- Bezzel, M. (1848). "Schachfreund." *Berliner Schachzeitung*, 3, 363.
- Nauck, F. (1850). "Schach." *Illustrirte Zeitung*, Leipzig, 361.
- Gent, I. P., Jefferson, C., & Nightingale, P. (2017). "Complexity of n-Queens Completion." *Journal of Artificial Intelligence Research*, 59, 815–848. https://doi.org/10.1613/jair.5512
- Sosic, R., & Gu, J. (1994). "Efficient Local Search with Conflict Minimization: A Case Study of the N-Queens Problem." *IEEE Transactions on Knowledge and Data Engineering*, 6(5), 661–668.
- Russell, S., & Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson. Chapter on constraint satisfaction problems.
- Knuth, D. E. (2019). *The Art of Computer Programming, Volume 4B: Combinatorial Algorithms, Part 2*. Addison-Wesley.
- Bell, J., & Stevens, B. (2009). "A survey of known results and research areas for n-queens." *Discrete Mathematics*, 309(1), 1–31. https://doi.org/10.1016/j.disc.2007.12.043
- OEIS Foundation. "A000170: Number of ways of placing n nonattacking queens on an n×n board." *The On-Line Encyclopedia of Integer Sequences*. https://oeis.org/A000170
