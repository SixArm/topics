# Logic programming

Logic programming is a programming paradigm rooted in formal logic, specifically first-order predicate logic, that treats computation as the process of proving theorems within a logical system. Rather than specifying step-by-step instructions for how to compute a result, the programmer declares what is true about a problem domain through facts and rules, and the runtime system determines how to derive answers. This paradigm stands apart from imperative and object-oriented approaches by shifting the programmer's focus from control flow to knowledge representation, making it a foundational tool in artificial intelligence, database theory, and formal verification.

## Core Concepts

Logic programming is built on a small number of powerful ideas drawn from mathematical logic. A **fact** is an unconditional assertion about the world, such as stating that a particular entity has a particular property. A **rule** defines a conditional relationship: a conclusion that holds when certain premises are satisfied. Together, facts and rules form the **knowledge base**, which serves as the program itself. A **query** is a question posed against the knowledge base, and the system attempts to prove or disprove it using logical inference.

The execution model relies on **unification**, a process that matches terms by finding variable substitutions that make two expressions identical, and **resolution**, a proof procedure that chains rules together to derive new conclusions. Backtracking allows the system to explore alternative proof paths when one fails, systematically searching for all valid solutions.

## First-Order Logic Foundations

Logic programming is grounded in first-order logic (also called predicate logic), which extends propositional logic with variables, quantifiers, and predicates. The key elements include:

- **Predicates**: Symbols that express relationships or properties, such as "parent(X, Y)" meaning X is a parent of Y.
- **Terms**: Constants (specific entities), variables (placeholders for entities), and compound terms (structured data).
- **Clauses**: Logical statements in the form of Horn clauses, which restrict full first-order logic to a computationally tractable subset.
- **Universal quantification**: Variables in rules are implicitly universally quantified, meaning they apply to all possible values.
- **Existential quantification**: Variables in queries are implicitly existentially quantified, meaning the system searches for at least one satisfying assignment.

Horn clauses are the specific restriction that makes logic programming practical. A Horn clause has at most one positive literal, which means each rule has exactly one conclusion derived from zero or more conditions.

## How Execution Works

The execution model of a logic program differs fundamentally from imperative execution. The system receives a query and attempts to prove it by searching the knowledge base:

1. The query is matched against facts and rule heads using unification.
2. When a rule head matches, the system recursively attempts to prove each condition in the rule body.
3. If a proof path fails, the system backtracks to the most recent choice point and tries alternative matches.
4. The search continues until a proof is found, all possibilities are exhausted, or resources are depleted.

This search strategy is typically depth-first with chronological backtracking, though variations exist. The programmer controls efficiency partly through the ordering of clauses and conditions, which influences the search path without changing the logical meaning.

## Major Logic Programming Languages

| Language | Origin | Key Characteristics | Primary Use Cases |
|----------|--------|--------------------|--------------------|
| Prolog | 1972, Alain Colmerauer | Depth-first search, cut operator, definite clause grammars | AI, NLP, expert systems, symbolic computation |
| Datalog | 1986, derived from Prolog | No function symbols, guaranteed termination, set-oriented | Database queries, program analysis, security policies |
| Mercury | 1995, University of Melbourne | Strong typing, mode system, determinism declarations | Large-scale reliable applications |
| Answer Set Programming (ASP) | Late 1990s | Stable model semantics, non-monotonic reasoning | Planning, configuration, combinatorial optimization |
| Constraint Logic Programming (CLP) | 1987, Jaffar and Lassez | Integrates constraint solving with logic programming | Scheduling, resource allocation, optimization |

Prolog remains the most widely used logic programming language. It provides a practical balance between expressiveness and efficiency, with mature implementations such as SWI-Prolog, SICStus Prolog, and GNU Prolog offering robust standard libraries and foreign-language interfaces.

## Logic Programming vs. Other Paradigms

| Aspect | Logic Programming | Imperative Programming | Functional Programming |
|--------|-------------------|----------------------|----------------------|
| Primary abstraction | Logical relations and rules | Sequences of commands | Function application and composition |
| Control flow | Implicit (search and backtracking) | Explicit (loops, conditionals) | Implicit (recursion, higher-order functions) |
| State management | Stateless; variables are logical | Mutable state is central | Immutable values preferred |
| What vs. how | Declares what is true | Specifies how to compute | Specifies what to compute via transformations |
| Strengths | Knowledge representation, search problems | Systems programming, performance-critical code | Data transformation, concurrency |
| Weaknesses | Efficiency for general computation, I/O handling | Complexity management at scale | Learning curve, debugging |

## Applications

Logic programming has proven particularly effective in domains where symbolic reasoning, search, and knowledge representation are central:

- **Expert systems**: Encoding domain knowledge as rules and using inference to provide recommendations or diagnoses.
- **Natural language processing**: Definite clause grammars in Prolog provide a natural way to parse and generate human language.
- **Database query languages**: Datalog serves as a theoretical foundation for recursive query languages and has influenced SQL extensions.
- **Program analysis and verification**: Static analyzers use logic programming to specify and check properties of software.
- **Planning and scheduling**: Answer set programming and constraint logic programming excel at combinatorial search problems.
- **Ontology and semantic web**: Description logics used in OWL and RDF reasoning share roots with logic programming.
- **Compiler construction**: Type inference, overload resolution, and optimization passes often use unification-based techniques derived from logic programming.

## Strengths and Limitations

**Strengths:**

- Declarative style leads to concise, readable specifications of complex relationships.
- Built-in search and backtracking eliminate the need for manual traversal code.
- Strong theoretical foundations in mathematical logic provide formal guarantees about program behavior.
- Pattern matching via unification is a powerful mechanism for data decomposition.
- Well-suited to rapid prototyping of AI and knowledge-intensive applications.

**Limitations:**

- Depth-first search with backtracking can be inefficient or non-terminating without careful clause ordering.
- The gap between logical semantics and operational behavior (the order in which Prolog evaluates goals) requires procedural thinking despite the declarative surface.
- I/O and side effects fit awkwardly into a purely logical framework.
- Performance for general-purpose computation typically lags behind imperative and compiled functional languages.
- Smaller ecosystem and community compared to mainstream paradigms, leading to fewer libraries and tools.

## Negation and Non-Monotonic Reasoning

Standard logic programming uses **negation as failure**: a goal is considered false if the system cannot prove it true. This is a practical approximation of classical negation but introduces subtleties. Under the closed-world assumption, anything not stated or derivable is assumed false, which works well for database-like applications but can produce unexpected results in open-ended domains.

Non-monotonic reasoning extends this idea. In monotonic logic, adding new information never invalidates existing conclusions. Non-monotonic systems, such as answer set programming, allow conclusions to be retracted when new facts arrive. This is essential for modeling real-world scenarios where knowledge is incomplete and revisable.

## Constraint Logic Programming

Constraint logic programming (CLP) extends the paradigm by replacing unification over terms with constraint solving over specific domains such as integers, real numbers, or finite sets. Instead of asking whether two terms can be made identical, CLP asks whether a set of constraints over variables can be simultaneously satisfied.

This extension is particularly powerful for:

- **Scheduling problems**: Assigning tasks to time slots subject to resource and precedence constraints.
- **Configuration**: Finding valid combinations of components that satisfy compatibility requirements.
- **Optimization**: Minimizing or maximizing an objective function subject to logical and arithmetic constraints.

CLP systems such as ECLiPSe, SICStus CLP(FD), and B-Prolog provide efficient constraint solvers integrated directly into the logic programming search mechanism.

## Related

Topics to explore next include declarative programming as the broader paradigm family, Prolog as the primary implementation language, artificial intelligence and expert systems as key application areas, first-order logic and formal methods as theoretical foundations, constraint satisfaction problems for optimization applications, functional programming as a contrasting declarative paradigm, knowledge representation and ontology engineering for semantic applications, and database theory where Datalog connects logic programming to relational query processing.

## Summary

Logic programming is a paradigm that transforms computation into logical deduction, allowing programmers to express problems as sets of facts and rules rather than procedural instructions. Built on first-order logic and powered by unification and resolution, it provides a rigorous foundation for knowledge representation, symbolic reasoning, and search-intensive applications. While it has well-known limitations in efficiency and ecosystem breadth compared to mainstream paradigms, its influence extends far beyond its direct use: type inference systems, query languages, static analyzers, and AI planners all draw on techniques pioneered in logic programming. For technology professionals working in AI, formal verification, or knowledge-intensive domains, understanding logic programming provides both practical tools and a fundamentally different way of thinking about computation.

## References

- Sterling, L. & Shapiro, E. (1994). *The Art of Prolog: Advanced Programming Techniques*, 2nd Edition. MIT Press.
- Clocksin, W. F. & Mellish, C. S. (2003). *Programming in Prolog: Using the ISO Standard*, 5th Edition. Springer.
- Bratko, I. (2011). *Prolog Programming for Artificial Intelligence*, 4th Edition. Addison-Wesley.
- Lloyd, J. W. (1987). *Foundations of Logic Programming*, 2nd Edition. Springer.
- Apt, K. R. & Wallace, M. (2007). *Constraint Logic Programming Using ECLiPSe*. Cambridge University Press.
- Ceri, S., Gottlob, G., & Tanca, L. (1990). *Logic Programming and Databases*. Springer.
- SWI-Prolog official documentation: [https://www.swi-prolog.org/](https://www.swi-prolog.org/)
- Datalog educational resources, University of Oxford: [https://www.cs.ox.ac.uk/activities/datalog/](https://www.cs.ox.ac.uk/activities/datalog/)
