# Constraint satisfaction algorithms

Constraint satisfaction algorithms are a fundamental class of algorithms in computer science and artificial intelligence, designed to solve constraint satisfaction problems (CSPs). A CSP consists of a finite set of variables, each with a finite domain of possible values, and a set of constraints that restrict which combinations of values the variables can simultaneously take. These algorithms systematically explore and prune the search space to find assignments of values to all variables that satisfy every constraint. They are foundational to fields such as scheduling, configuration, planning, resource allocation, and combinatorial optimization.

## Problem Formulation

A constraint satisfaction problem is formally defined by three components: variables, domains, and constraints. Variables represent the unknowns to be determined. Domains specify the set of allowable values for each variable. Constraints define the relationships and restrictions between variables that any valid solution must respect. The goal is to find an assignment of values to all variables such that no constraint is violated, or to determine that no such assignment exists.

| Component   | Description                                                        | Example (Map Coloring)           |
|-------------|--------------------------------------------------------------------|----------------------------------|
| Variables   | The unknowns to be solved                                          | Regions of a map                 |
| Domains     | Possible values each variable can take                             | {Red, Green, Blue}               |
| Constraints | Rules restricting which value combinations are valid               | Adjacent regions must differ     |

## Core Algorithms

### Backtracking

Backtracking is the foundational search strategy for CSPs. It works by recursively selecting an unassigned variable, assigning it a value from its domain, and then proceeding to the next variable. If an assignment leads to a constraint violation, the algorithm undoes the most recent assignment and tries the next candidate value. If all values for a variable are exhausted, it backtracks further up the search tree. Backtracking is complete (it will find a solution if one exists) but can be slow on large problems without enhancements.

### Forward Checking

Forward checking augments basic backtracking by looking ahead after each variable assignment. When a value is assigned to a variable, forward checking immediately removes inconsistent values from the domains of all unassigned variables that share a constraint with the assigned variable. If any unassigned variable's domain becomes empty, the algorithm backtracks immediately without exploring further. This early detection of dead ends significantly reduces the number of nodes explored compared to plain backtracking.

### Constraint Propagation

Constraint propagation is a family of inference techniques that reduce variable domains by repeatedly enforcing local consistency conditions. Rather than waiting for a conflict to occur during search, constraint propagation proactively eliminates values that cannot participate in any valid solution. It operates by applying inference rules derived from constraints, propagating reductions from one variable to its neighbors, and iterating until no further reductions are possible. Constraint propagation is often used as a preprocessing step or interleaved with search.

### Arc Consistency

Arc consistency is the most widely used form of constraint propagation. A CSP is arc consistent if, for every pair of variables connected by a constraint, every value in one variable's domain has at least one compatible value in the other variable's domain. The AC-3 algorithm is a standard method for enforcing arc consistency: it maintains a queue of arcs (variable pairs) and iteratively removes unsupported values. When a domain changes, affected arcs are re-enqueued for further checking. Arc consistency can solve some problems outright and dramatically reduces the search space for others.

## Comparison of Algorithms

| Algorithm                | Strategy              | Strengths                                      | Weaknesses                                      |
|--------------------------|-----------------------|------------------------------------------------|--------------------------------------------------|
| Backtracking             | Depth-first search    | Simple, complete, easy to implement            | Can explore many dead-end paths                  |
| Forward Checking         | Search + lookahead    | Detects failures early, prunes search space    | Overhead per assignment; limited lookahead depth |
| Constraint Propagation   | Inference-based       | Reduces domains proactively, powerful pruning  | Can be expensive on large or dense constraint graphs |
| Arc Consistency (AC-3)   | Pairwise consistency  | Strong pruning, well-understood complexity     | May not detect all inconsistencies alone         |

## Heuristics and Enhancements

Practical CSP solvers combine these core algorithms with heuristics to improve performance:

- **Minimum Remaining Values (MRV)**: Select the variable with the fewest legal values remaining in its domain, focusing search on the most constrained variables first.
- **Degree Heuristic**: Among tied variables, prefer the one involved in the most constraints with unassigned variables, to maximize constraint propagation.
- **Least Constraining Value (LCV)**: When choosing a value for a variable, prefer the value that rules out the fewest choices for neighboring variables, preserving flexibility.
- **Conflict-Directed Backjumping**: Instead of backtracking to the immediately previous variable, jump back to the variable that caused the conflict, avoiding redundant exploration.
- **Nogood Learning**: Record combinations of assignments that lead to failure, preventing the solver from revisiting equivalent dead ends.

## Applications

Constraint satisfaction algorithms are applied across a wide range of domains:

- **Scheduling**: Assigning tasks to time slots and resources while respecting precedence, capacity, and availability constraints.
- **Configuration**: Selecting compatible components for complex products such as vehicles, computers, or telecommunications systems.
- **Planning and logistics**: Routing, warehouse allocation, and supply chain coordination under operational constraints.
- **Puzzle solving**: Sudoku, crossword generation, and other combinatorial puzzles are naturally modeled as CSPs.
- **Resource allocation**: Distributing limited resources among competing demands while meeting fairness and efficiency criteria.
- **Compiler optimization**: Register allocation and instruction scheduling can be formulated as constraint satisfaction problems.

## Related

Topics to explore next include backtracking algorithms in general, graph coloring problems as a canonical CSP, Boolean satisfiability (SAT) solvers and their relationship to CSPs, integer linear programming as an alternative optimization framework, heuristic search algorithms such as A* and local search methods like simulated annealing, and planning algorithms in artificial intelligence that build on constraint reasoning.

## Summary

Constraint satisfaction algorithms provide a principled and versatile framework for solving problems defined by variables, domains, and constraints. From basic backtracking through forward checking, constraint propagation, and arc consistency, each technique adds increasing sophistication in pruning the search space and detecting infeasible assignments early. Combined with heuristics for variable and value ordering, these algorithms efficiently tackle real-world problems in scheduling, configuration, planning, and optimization. Understanding CSP techniques is essential for any technology professional working with combinatorial problems, automated reasoning, or artificial intelligence systems.

## References

- Russell, S. and Norvig, P. *Artificial Intelligence: A Modern Approach*. Pearson. Chapters on constraint satisfaction problems.
- Mackworth, A. K. "Consistency in Networks of Relations." *Artificial Intelligence*, 8(1), 1977, pp. 99-118.
- Dechter, R. *Constraint Processing*. Morgan Kaufmann, 2003.
- Kumar, V. "Algorithms for Constraint Satisfaction Problems: A Survey." *AI Magazine*, 13(1), 1992, pp. 32-44.
- Rossi, F., van Beek, P., and Walsh, T. *Handbook of Constraint Programming*. Elsevier, 2006.
- Bessiere, C. "Arc Consistency and Arc Consistency Again." *Artificial Intelligence*, 65(1), 1994, pp. 179-190.
