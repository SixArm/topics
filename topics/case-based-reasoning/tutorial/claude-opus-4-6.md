# Case-based reasoning (CBR)

Case-based reasoning (CBR) is a problem-solving methodology in artificial intelligence that mirrors how humans naturally approach unfamiliar challenges: by drawing on past experience. Rather than relying on general rules or models, CBR solves new problems by retrieving similar previously solved problems from a knowledge repository, adapting those prior solutions to fit the current situation, and storing successful outcomes for future reuse. This experience-driven approach makes CBR particularly valuable in domains where explicit rules are difficult to formulate, where expert knowledge is largely anecdotal, or where the problem space evolves over time.

## Core Concept

CBR is grounded in the cognitive science observation that people frequently reason from specific experiences rather than from abstract principles. When a physician encounters an unusual set of symptoms, they often recall a prior patient with a similar presentation and adapt that earlier diagnosis. When an engineer troubleshoots a system failure, they recall analogous failures they have resolved before. CBR formalizes this pattern into a computational framework.

The central data structure in CBR is the **case base**, a structured repository of previously solved problems. Each case typically contains three elements: a description of the problem, the solution that was applied, and the outcome or context of that solution. The case base grows over time as the system encounters and resolves new problems, making CBR a form of incremental, experience-based learning.

## The CBR Cycle

CBR operates through a well-defined four-stage cycle, commonly known as the "4 Rs" model introduced by Aamodt and Plaza (1994).

| Stage | Purpose | Key Activity |
|-------|---------|--------------|
| **Retrieve** | Find relevant past cases | Match the new problem's features against the case base to identify the most similar prior cases |
| **Reuse** | Apply a prior solution | Adapt or transfer the solution from the retrieved case to address the current problem |
| **Revise** | Evaluate and correct | Test the proposed solution, identify failures or gaps, and refine the solution accordingly |
| **Retain** | Learn from experience | Store the new problem-solution pair in the case base for future retrieval |

### Retrieve

The retrieve stage identifies one or more cases from the case base that are most similar to the new problem. Similarity is computed using distance metrics or feature-matching algorithms over the problem description. Common techniques include nearest-neighbor retrieval, index-based retrieval using decision trees or discrimination networks, and knowledge-guided retrieval that leverages domain ontologies. The quality of retrieval directly determines the quality of the eventual solution.

### Reuse

Once a relevant case is retrieved, the system adapts its solution to the new context. Adaptation can range from trivial (copying the solution directly when the match is very close) to complex (applying transformation rules, substituting parameters, or combining elements from multiple retrieved cases). Adaptation strategies include:

- **Copy**: Use the retrieved solution as-is when the new problem closely matches the prior case
- **Parameter adjustment**: Modify specific values in the solution to account for differences between the old and new problem
- **Structural adaptation**: Alter the structure of the solution using domain-specific transformation rules
- **Compositional adaptation**: Combine partial solutions from multiple retrieved cases

### Revise

The proposed solution is evaluated, either by simulation, expert review, or real-world application. If the solution fails or produces suboptimal results, the system diagnoses the failure and repairs the solution. This stage is critical for ensuring that adaptations from the reuse stage actually work in practice.

### Retain

After a successful solution is confirmed, the system stores the new case in the case base. This stage also involves decisions about case base maintenance: whether to generalize existing cases, merge similar cases, or delete outdated ones to prevent the repository from becoming unwieldy.

## Similarity and Retrieval Methods

Effective retrieval depends on how similarity is measured between a new problem and stored cases. Several approaches are commonly used.

| Method | Description | Best Suited For |
|--------|-------------|-----------------|
| **Nearest neighbor** | Weighted sum of feature-level similarities | Structured, attribute-value cases |
| **Index-based** | Decision trees or discrimination networks guide retrieval | Large case bases requiring fast lookup |
| **Knowledge-guided** | Domain ontologies and semantic relationships inform matching | Complex domains with rich domain models |
| **Prototype-based** | Cases are grouped into clusters; retrieval matches against cluster prototypes | Very large case bases with natural groupings |

Feature weighting is a key consideration: not all problem attributes contribute equally to determining relevance. Weights can be assigned manually by domain experts or learned automatically through machine learning techniques.

## Advantages and Limitations

### Advantages

- **Handles poorly formalized domains**: CBR works well in areas where deriving explicit rules is impractical, such as legal reasoning, design, and medical diagnosis
- **Incremental learning**: The system improves naturally as more cases are added, without requiring retraining of a model
- **Transparency**: Solutions can be explained by reference to the specific prior case that motivated them, supporting interpretability and trust
- **Reduced knowledge engineering**: Building a case base from historical records is often easier than eliciting and encoding expert rules
- **Adaptability**: The system evolves with the domain as new cases reflect changing conditions

### Limitations

- **Case base maintenance**: As the case base grows, retrieval can slow and irrelevant or outdated cases can degrade performance
- **Adaptation complexity**: Automated adaptation is difficult in domains with complex, interrelated solution structures
- **Feature engineering**: The choice of problem features and similarity metrics heavily influences system quality and requires careful design
- **Cold start**: A new system with few cases performs poorly until a sufficient body of experience has been accumulated
- **Scalability**: Very large case bases require efficient indexing strategies to maintain acceptable retrieval times

## Applications

CBR has been applied across a wide range of industries and problem types.

- **Medical diagnosis**: Matching patient symptoms to prior cases to suggest diagnoses and treatment plans
- **Engineering fault diagnosis**: Identifying the cause of equipment failures by comparing current symptoms to historical failure records
- **Legal reasoning**: Retrieving prior court decisions with similar facts to support legal argumentation
- **Software engineering**: Reusing prior design patterns, bug fixes, or architectural decisions based on project similarity
- **Financial decision-making**: Assessing loan applications or investment opportunities by comparing them to historical outcomes
- **Customer support**: Resolving service tickets by retrieving solutions to similar past issues
- **Product configuration**: Recommending product configurations based on prior customer requirements and solutions
- **Help desk systems**: Automating first-line support by matching user-reported issues to known resolutions

## CBR Compared to Other Approaches

| Criterion | Case-Based Reasoning | Rule-Based Systems | Machine Learning (e.g., Neural Networks) |
|-----------|---------------------|-------------------|------------------------------------------|
| Knowledge representation | Specific past cases | Explicit if-then rules | Learned model parameters |
| Knowledge acquisition | Collect solved examples | Elicit rules from experts | Train on labeled datasets |
| Transparency | High (cite prior cases) | High (trace rule chains) | Low (opaque models) |
| Handling novel situations | Adapts nearest case | Fails if no rule matches | Generalizes from training data |
| Learning | Incremental (add cases) | Manual rule updates | Requires retraining |
| Domain formalization required | Low | High | Moderate |

## Related

Professionals interested in case-based reasoning should also explore related topics including rule-based systems and expert systems for alternative knowledge representation approaches, machine learning algorithms such as k-nearest neighbors which shares conceptual similarities with CBR retrieval, knowledge management and knowledge graphs for organizing domain expertise, decision support systems for broader frameworks that incorporate CBR as a component, natural language processing for text-based case retrieval, anomaly detection for identifying when new problems fall outside the range of known cases, and reinforcement learning for alternative experience-driven learning paradigms.

## Summary

Case-based reasoning is a practical, experience-driven approach to problem solving that leverages a repository of previously solved cases to address new challenges. Its four-stage cycle of retrieve, reuse, revise, and retain provides a structured methodology for matching new problems to historical solutions, adapting those solutions, and continuously learning from outcomes. CBR is particularly effective in domains where explicit rules are hard to define, where transparency and explainability matter, and where the problem space evolves over time. While it requires careful attention to case base maintenance, similarity engineering, and adaptation strategies, CBR remains a proven and widely deployed technique across medicine, engineering, law, finance, and software development.

## References

- Aamodt, A., & Plaza, E. (1994). "Case-Based Reasoning: Foundational Issues, Methodological Variations, and System Approaches." AI Communications, 7(1), 39-59.
- Kolodner, J. L. (1993). *Case-Based Reasoning*. Morgan Kaufmann Publishers.
- Leake, D. B. (1996). *Case-Based Reasoning: Experiences, Lessons, and Future Directions*. AAAI Press/MIT Press.
- De Mantaras, R. L., et al. (2005). "Retrieval, Reuse, Revision, and Retention in Case-Based Reasoning." The Knowledge Engineering Review, 20(3), 215-240.
- Richter, M. M., & Weber, R. O. (2013). *Case-Based Reasoning: A Textbook*. Springer.
- Watson, I. (1999). "Case-based reasoning is a methodology not a technology." Knowledge-Based Systems, 12(5-6), 303-308.
- https://en.wikipedia.org/wiki/Case-based_reasoning
