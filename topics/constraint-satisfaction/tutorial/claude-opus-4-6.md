# Constraint satisfaction

Constraint satisfaction is a foundational technique in artificial intelligence and operations research for solving problems by identifying values that meet a defined set of requirements. A constraint satisfaction problem (CSP) is formulated by specifying a set of variables, each with a domain of possible values, and a set of constraints that restrict which combinations of values are permissible. The objective is to find an assignment of values to all variables such that every constraint is simultaneously satisfied. This paradigm is central to many real-world applications, from scheduling and resource allocation to configuration and design.

## Core Concepts

A constraint satisfaction problem consists of three essential components. **Variables** are the entities whose values must be determined. **Domains** specify the set of allowable values for each variable. **Constraints** define the rules or relationships that restrict which combinations of variable-value assignments are valid.

Constraints can be categorized in several ways:

| Constraint Type | Description | Example |
|---|---|---|
| Unary | Restricts the value of a single variable | A class must be scheduled before 5 PM |
| Binary | Relates two variables | Two exams cannot occur at the same time |
| Global | Involves an arbitrary number of variables | All values must be distinct (all-different) |
| Hard | Must be satisfied for a solution to be valid | A nurse cannot work two shifts simultaneously |
| Soft | Preferred but not required; used in optimization | Prefer morning shifts for senior staff |

A solution is **consistent** if it violates no constraints, and **complete** if every variable has been assigned a value. A valid solution is both consistent and complete.

## Solving Algorithms

Several algorithmic strategies exist for solving CSPs, each with different trade-offs in terms of completeness, efficiency, and applicability.

- **Backtracking search** is the most fundamental approach. It incrementally assigns values to variables and backtracks when a constraint violation is detected. While complete, naive backtracking can be prohibitively slow for large problems.
- **Forward checking** extends backtracking by immediately pruning the domains of unassigned variables after each assignment, catching failures earlier and reducing unnecessary exploration.
- **Constraint propagation** (also called arc consistency) iteratively removes values from variable domains that cannot participate in any valid solution. The AC-3 algorithm is the most widely known technique for enforcing arc consistency.
- **Local search** methods such as min-conflicts start with a complete but potentially inconsistent assignment and iteratively improve it by changing variable values to reduce the number of violated constraints. These methods are incomplete but often effective for very large problems.
- **Backjumping** improves upon basic backtracking by jumping back to the source of a conflict rather than simply undoing the most recent assignment, avoiding redundant work.

## Heuristics and Optimization

Heuristics dramatically improve solving performance by guiding the search toward promising parts of the solution space:

- **Minimum Remaining Values (MRV):** Select the variable with the fewest legal values remaining. This "fail-first" strategy detects dead ends early.
- **Degree heuristic:** Select the variable involved in the most constraints with other unassigned variables, maximizing the constraining effect of each assignment.
- **Least Constraining Value (LCV):** Choose the value that rules out the fewest options for neighboring variables, preserving flexibility for future assignments.

For optimization variants, where the goal is not just any valid solution but the best one according to an objective function, techniques such as branch and bound, constraint optimization, and integration with linear programming solvers are commonly employed.

## Real-World Applications

Constraint satisfaction is applied across a wide range of industries and problem domains:

- **Scheduling:** Timetabling for universities, shift scheduling for hospitals, and production scheduling in manufacturing all involve assigning resources to time slots while respecting availability, capacity, and preference constraints.
- **Configuration:** Product configurators (e.g., customizing a laptop or vehicle) use CSPs to ensure selected options are mutually compatible.
- **Planning and logistics:** Vehicle routing, warehouse layout, and supply chain optimization all require satisfying capacity, distance, and timing constraints.
- **Circuit design:** Component placement and routing on printed circuit boards must satisfy spatial, electrical, and thermal constraints.
- **Natural language processing:** Parsing and semantic analysis can be modeled as constraint satisfaction over linguistic structures.
- **Sudoku and puzzles:** Classic logic puzzles are directly expressible as CSPs, making them common benchmarks for solver evaluation.

## Constraint Programming Languages and Tools

Several mature tools and languages exist for modeling and solving CSPs:

| Tool / Language | Description |
|---|---|
| MiniZinc | High-level constraint modeling language with multiple solver backends |
| Google OR-Tools | Open-source optimization suite supporting CP, LP, and routing |
| Choco Solver | Java-based open-source constraint programming library |
| Gecode | High-performance C++ constraint programming toolkit |
| IBM CPLEX CP Optimizer | Commercial solver for constraint programming and optimization |
| ECLiPSe | Prolog-based constraint logic programming system |
| SICStus Prolog | Prolog environment with a mature constraint solving library |

These tools allow practitioners to declaratively state problems and rely on sophisticated solver engines to find solutions, significantly reducing development effort compared to hand-coded search algorithms.

## Constraint Satisfaction vs. Other Paradigms

Constraint satisfaction overlaps with and complements several other problem-solving paradigms:

- **SAT solving** encodes problems as Boolean satisfiability instances. CSPs generalize SAT to variables with larger domains and richer constraint types.
- **Linear programming (LP)** optimizes a linear objective subject to linear inequality constraints over continuous variables. CSPs handle discrete and combinatorial domains more naturally.
- **Answer set programming (ASP)** is a declarative paradigm rooted in logic programming, well-suited to knowledge representation problems that CSPs can also address.
- **Metaheuristics** such as genetic algorithms and simulated annealing are general-purpose optimization methods. They can solve CSP-like problems but typically lack the guarantees of completeness that systematic CSP solvers provide.

The choice of paradigm depends on the problem structure: CSPs excel when the problem is naturally expressed as discrete variables with relational constraints, and when exact solutions or proofs of infeasibility are required.

## Related

Topics to explore next include backtracking algorithms, arc consistency and the AC-3 algorithm, Boolean satisfiability (SAT) and SAT solvers, linear programming and integer programming, operations research optimization techniques, graph coloring problems, scheduling theory, and declarative programming paradigms such as constraint logic programming and answer set programming.

## Summary

Constraint satisfaction provides a powerful, general-purpose framework for modeling and solving combinatorial problems across artificial intelligence, operations research, and engineering. By expressing problems in terms of variables, domains, and constraints, practitioners can leverage decades of research into efficient solving algorithms, heuristics, and mature software tools. Whether the task is scheduling, configuration, planning, or design, constraint satisfaction transforms complex requirement-laden problems into structured representations that solvers can systematically and often efficiently resolve.

## References

- Russell, S., & Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson. Chapters on constraint satisfaction problems.
- Rossi, F., van Beek, P., & Walsh, T. (Eds.). (2006). *Handbook of Constraint Programming*. Elsevier.
- Dechter, R. (2003). *Constraint Processing*. Morgan Kaufmann.
- Apt, K. (2003). *Principles of Constraint Programming*. Cambridge University Press.
- MiniZinc: https://www.minizinc.org/
- Google OR-Tools: https://developers.google.com/optimization
- Gecode: https://www.gecode.org/
