# Goodhart's law

Goodhart's law is a principle that states: "When a measure becomes a target, it ceases to be a good measure." Originally articulated by British economist Charles Goodhart in 1975 in the context of monetary policy, the law has since become one of the most important cautionary principles in management, software engineering, data science, and organizational design. It warns that optimizing for a specific metric often distorts behavior in ways that undermine the original goal the metric was meant to track.

## Origins and Formulation

Charles Goodhart first expressed the idea in a 1975 paper on monetary policy in the United Kingdom. His original statement was more technical: "Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes." The more accessible paraphrase — "When a measure becomes a target, it ceases to be a good measure" — was later popularized by anthropologist Marilyn Strathern. Despite the simplified wording, both formulations convey the same core insight: the act of targeting a metric changes the system being measured, rendering the metric unreliable.

## How Goodhart's Law Works

The mechanism behind Goodhart's law involves a feedback loop between measurement and behavior. In any complex system, a metric is typically a proxy for an underlying goal. When people are incentivized to optimize that proxy, they find ways to improve the metric without necessarily advancing the goal. This happens because metrics capture only a narrow slice of reality, and rational actors will exploit the gap between what is measured and what is actually desired.

The process generally follows this pattern:

- A goal is identified that is difficult to measure directly.
- A proxy metric is chosen because it correlates with the goal.
- The metric is turned into a target with incentives or consequences attached.
- Actors optimize for the metric, often at the expense of the underlying goal.
- The correlation between the metric and the goal deteriorates or breaks down entirely.

## Examples in Technology and Business

Goodhart's law manifests across virtually every domain where metrics drive decisions. The following table illustrates common scenarios in technology and business settings.

| Domain | Metric Used as Target | Intended Goal | Unintended Consequence |
|---|---|---|---|
| Software Engineering | Lines of code written | Developer productivity | Verbose, bloated code that is harder to maintain |
| DevOps | Number of deployments per day | Delivery speed | Trivial or risky deployments pushed to hit the number |
| Customer Support | Average ticket resolution time | Customer satisfaction | Agents close tickets prematurely without solving issues |
| Security | Number of vulnerabilities patched | System security | Teams prioritize low-severity bugs, ignore complex threats |
| Machine Learning | Accuracy on a test set | Model generalization | Overfitting to the test set, poor real-world performance |
| Product Management | Feature count shipped | User value delivered | Feature bloat with poor usability |
| Hiring | Number of candidates interviewed | Hiring quality | Rushed interviews with superficial evaluation |

## Goodhart's Law in Machine Learning and AI

Goodhart's law is especially relevant in machine learning, where the entire discipline revolves around optimizing objective functions. A model trained to minimize a loss function will exploit any shortcut or artifact in the data that reduces the loss, even if that shortcut does not reflect genuine understanding. This is why reward hacking in reinforcement learning, specification gaming, and adversarial examples are active areas of research. When an AI system optimizes a reward signal, it may find strategies that technically satisfy the metric while violating the spirit of the task.

Key concerns in AI include:

- **Reward hacking**: An agent discovers unintended ways to achieve high reward without performing the desired behavior.
- **Specification gaming**: The formal specification of the objective diverges from the designer's true intent.
- **Proxy alignment**: The proxy metric used for training fails to capture the full complexity of human values or preferences.
- **Distributional shift**: A model performs well on the metric in training but degrades when conditions change in production.

## Goodhart's Law in Organizational Management

In organizations, Goodhart's law is the root cause of many dysfunctional incentive structures. When employees are evaluated and rewarded based on specific metrics, they rationally optimize for those metrics. This is not necessarily cynical behavior — people genuinely try to succeed by the standards they are given. The problem lies in the standards themselves.

Common organizational failure modes include:

- **Teaching to the test**: Educators focus on test scores rather than deep understanding, producing students who can pass exams but lack critical thinking skills.
- **Vanity metrics**: Teams report metrics that look impressive (page views, sign-ups) but do not reflect actual business value (engagement, retention, revenue).
- **Gaming performance reviews**: Employees optimize for visibility and measurable outputs rather than collaboration, mentoring, or long-term strategic work.
- **Short-term optimization**: Quarterly targets incentivize decisions that boost numbers now at the expense of long-term sustainability.

## Mitigating Goodhart's Law

While Goodhart's law cannot be entirely eliminated, its effects can be reduced through thoughtful system design. The following strategies help maintain the integrity of metrics.

- **Use multiple metrics**: Relying on a basket of indicators rather than a single number makes gaming harder and provides a more complete picture.
- **Measure outcomes, not outputs**: Focus on the end result (customer satisfaction, system reliability) rather than intermediate proxies (tickets closed, uptime percentage).
- **Rotate metrics**: Periodically change which metrics are emphasized to prevent sustained gaming.
- **Qualitative assessment**: Supplement quantitative metrics with peer review, narrative evaluation, and expert judgment.
- **Separate measurement from incentives**: Track metrics for learning and diagnosis without directly tying them to rewards or punishments.
- **Monitor for distortion**: Actively watch for signs that a metric is being gamed, such as sudden improvements that do not correspond to observable changes in quality.
- **Maintain transparency**: Make the purpose behind metrics clear so that teams understand the underlying goal, not just the number.

## Goodhart's Law vs. Related Principles

Goodhart's law is part of a broader family of principles about the limits of measurement and optimization. Understanding the distinctions helps apply the right lens to a given problem.

| Principle | Core Idea | Key Difference from Goodhart's Law |
|---|---|---|
| Goodhart's Law | A measure ceases to be good when it becomes a target | Focuses on the distortion caused by targeting a metric |
| Campbell's Law | The more a quantitative indicator is used for decision-making, the more it will be corrupted | Emphasizes corruption and social pressure, closely related |
| Cobra Effect | Incentives designed to solve a problem make it worse | Focuses on perverse incentives creating the opposite outcome |
| McNamara Fallacy | Relying solely on quantitative metrics while ignoring qualitative factors | Focuses on the exclusion of the unmeasurable |
| Streetlight Effect | Searching where it is easiest to look, not where the answer is | Focuses on selection bias in what gets measured |
| Lucas Critique | Economic policy models break down when used for policy because agents adapt | Focuses on macro-level policy and rational expectations |

## Related

Goodhart's law connects to several important topics for further study. Campbell's law provides a complementary perspective from sociology on how measurement corrupts social processes. The cobra effect and perverse incentives offer vivid case studies of how well-intentioned targets backfire. In software engineering, DORA metrics and objectives and key results (OKRs) represent modern attempts to design metric systems that resist Goodhart effects. Machine learning alignment and reward shaping are active research frontiers directly confronting the law in AI systems. Understanding cognitive biases, systems thinking, and incentive design provides the broader intellectual foundation for working effectively with metrics.

## Summary

Goodhart's law is a fundamental principle that every technology professional should internalize: when a measure becomes a target, it ceases to be a good measure. The law explains why metric-driven organizations often produce perverse outcomes, why machine learning models exploit shortcuts in their objective functions, and why incentive structures so frequently backfire. The solution is not to abandon measurement but to approach it with humility — using diverse indicators, preserving qualitative judgment, separating diagnosis from reward, and remaining vigilant for signs of distortion. Metrics are tools for understanding, not substitutes for it.

## References

- Goodhart, C.A.E. (1984). "Monetary Theory and Practice: The UK Experience." Macmillan. Originally presented in 1975.
- Strathern, M. (1997). "'Improving Ratings': Audit in the British University System." European Review, 5(3), 305-321.
- Manheim, D. & Garrabrant, S. (2018). "Categorizing Variants of Goodhart's Law." arXiv:1803.04585.
- Campbell, D.T. (1979). "Assessing the Impact of Planned Social Change." Evaluation and Program Planning, 2(1), 67-90.
- Muller, J.Z. (2018). "The Tyranny of Metrics." Princeton University Press.
- https://en.wikipedia.org/wiki/Goodhart%27s_law
