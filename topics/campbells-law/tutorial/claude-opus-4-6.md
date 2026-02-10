# Campbell's law

Campbell's law is a principle articulated by social scientist Donald T. Campbell in 1979. It states: "The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor." For technology professionals, this law is a critical warning about the unintended consequences of optimizing for metrics, especially in software engineering, product management, and organizational performance.

## Origin and Definition

Donald T. Campbell was an American social scientist known for his work on research methodology and evolutionary epistemology. He formulated the law in his 1979 paper "Assessing the Impact of Planned Social Change." Campbell observed that when societies or organizations place excessive weight on a single measurable indicator, people will inevitably find ways to game, manipulate, or inflate that indicator, often at the expense of the broader goal the indicator was designed to represent.

The law applies universally wherever measurement drives decisions. It does not claim that measurement is inherently bad. Rather, it warns that high-stakes attachment to any single metric creates perverse incentives that undermine the metric's validity and distort the behaviors of the people being measured.

## How Campbell's Law Manifests in Technology

Technology organizations are particularly susceptible to Campbell's law because they tend to be data-driven and metric-oriented. The following table illustrates common scenarios where the law takes effect:

| Metric | Intended Goal | Gaming Behavior | Actual Outcome |
|---|---|---|---|
| Lines of code written | Measure developer productivity | Developers write verbose, redundant code | Codebase bloat, reduced maintainability |
| Number of bugs closed | Track quality improvement | Engineers close tickets without fixing root causes, or split fixes into multiple tickets | False sense of quality, recurring defects |
| Code coverage percentage | Ensure thorough testing | Teams write superficial tests that touch code paths without meaningful assertions | High coverage numbers with poor defect detection |
| Story points completed | Gauge team velocity | Teams inflate estimates so more points are "completed" per sprint | Misleading velocity, erosion of estimation accuracy |
| Deployment frequency | Encourage continuous delivery | Teams push trivial or incomplete changes to inflate deployment counts | Instability, feature fragmentation |
| Customer satisfaction score (CSAT) | Understand user happiness | Support agents selectively solicit feedback from satisfied users | Inflated scores that mask real dissatisfaction |

## Why It Happens

Campbell's law is driven by several interconnected psychological and organizational dynamics:

- **Goodhart's convergence.** Campbell's law is closely related to Goodhart's law ("When a measure becomes a target, it ceases to be a good measure"). Both describe the same fundamental problem from different angles. Campbell focuses on corruption of social processes; Goodhart focuses on the metric's loss of informational value.
- **Incentive alignment.** When individuals are rewarded or punished based on a metric, rational self-interest drives them to optimize for the metric itself rather than the underlying objective. This is not necessarily malicious; it is a predictable response to incentive structures.
- **Reductionism.** Complex goals such as "software quality" or "team effectiveness" cannot be fully captured by a single number. Reducing a multidimensional objective to one metric inevitably leaves gaps that can be exploited.
- **Measurement fixation.** Organizations often confuse the metric with the goal. Leaders begin treating the number as the reality rather than as an imperfect proxy for reality, which amplifies the distortion.

## Real-World Examples Beyond Software

Campbell's law is not limited to technology. Understanding its broader manifestations helps technology professionals recognize the pattern:

- **Standardized testing in education.** When school funding and teacher evaluations are tied to student test scores, teachers "teach to the test," narrowing curricula and, in extreme cases, manipulating results. Students learn test-taking strategies rather than deep subject knowledge.
- **Crime statistics in policing.** When police departments are evaluated on crime rates, officers may downgrade offense classifications or discourage victims from filing reports, producing artificially low crime statistics without reducing actual crime.
- **Healthcare quality metrics.** When surgeons are ranked by patient mortality rates, some avoid operating on high-risk patients, improving their personal statistics while denying care to the patients who need it most.
- **Academic publishing.** When researchers are evaluated by number of publications or citation counts, the result is salami-slicing of research into minimal publishable units and citation rings, degrading the quality and integrity of scientific literature.

## Mitigating Campbell's Law

Technology leaders and teams can take concrete steps to reduce the distorting effects of Campbell's law:

- **Use multiple metrics together.** No single metric should serve as the sole basis for evaluation. Pair quantitative measures with qualitative assessments. For example, combine code coverage with mutation testing results and manual code review findings.
- **Separate measurement from incentives.** Metrics used for learning and improvement should not be directly tied to rewards or punishments. When a metric becomes a target, it loses diagnostic value.
- **Rotate and refresh metrics.** Periodically change which metrics receive attention. This prevents teams from building long-term gaming strategies around any single indicator.
- **Measure outcomes, not outputs.** Focus on customer outcomes (retention, task completion, satisfaction trends) rather than activity outputs (tickets closed, features shipped, deployments made). Outcomes are harder to game because they reflect real-world impact.
- **Encourage transparency and psychological safety.** When team members feel safe to surface problems without fear of metric-driven punishment, the incentive to manipulate numbers diminishes.
- **Apply the "newspaper test."** Ask whether the metric, if gamed, would lead to embarrassing or harmful outcomes. If an engineer could satisfy the metric while clearly undermining the goal, the metric needs redesign.

## Campbell's Law vs. Related Principles

| Principle | Core Idea | Emphasis |
|---|---|---|
| Campbell's law | High-stakes use of a metric corrupts the metric and the process it monitors | Corruption of social and organizational processes |
| Goodhart's law | When a measure becomes a target, it ceases to be a good measure | Loss of informational validity of the metric |
| Cobra effect | Well-intentioned incentives produce perverse outcomes | Unintended consequences of reward systems |
| McNamara fallacy | Relying solely on quantifiable metrics while ignoring what cannot be measured | Overreliance on quantitative data |
| Streetlight effect | Searching for answers only where measurement is easy, not where answers actually lie | Bias toward measurable over meaningful |

These principles are complementary. Together, they form a robust framework for critically evaluating any measurement-driven strategy.

## Practical Advice for Technology Teams

When designing metrics and KPIs for engineering teams, product organizations, or platform operations, keep these guidelines in mind:

- Define the goal first, then select metrics that serve as imperfect proxies. Never lose sight of the distinction between the proxy and the goal.
- Treat every metric as a hypothesis: "We believe this number correlates with the outcome we care about." Revisit that hypothesis regularly.
- Watch for signs of gaming: sudden improvements without corresponding changes in customer experience, teams optimizing narrowly for dashboards, or growing cynicism about measurement programs.
- Balance leading indicators (predictive metrics like test coverage or deployment frequency) with lagging indicators (outcome metrics like defect escape rate or customer churn) to create a more complete picture.
- Involve the people being measured in the design of the measurement system. People are less likely to game metrics they helped create and believe in.

## Related

Campbell's law connects to several important concepts in technology management and organizational design. Goodhart's law is the closest intellectual sibling and is worth studying in parallel. DORA metrics provide a well-researched framework for software delivery performance that attempts to balance multiple indicators. OKRs (Objectives and Key Results) offer a goal-setting methodology that, when used well, keeps focus on outcomes rather than outputs. The cobra effect and perverse incentives are essential concepts for understanding why well-meaning policies backfire. Psychological safety, as researched by Amy Edmondson, addresses the cultural conditions that reduce the pressure to game metrics.

## Summary

Campbell's law is a foundational principle for any technology professional who works with metrics, KPIs, or data-driven decision-making. It warns that attaching high stakes to any single quantitative indicator inevitably corrupts both the indicator and the behaviors it was designed to measure. The antidote is not to abandon measurement but to approach it with humility: use multiple complementary metrics, separate measurement from punishment, focus on outcomes over outputs, and maintain a culture where honest reporting is safer than gaming the numbers. In a field that prides itself on data-driven rigor, Campbell's law is a necessary reminder that the map is not the territory.

## References

- Campbell, D. T. (1979). "Assessing the Impact of Planned Social Change." Evaluation and Program Planning, 2(1), 67-90.
- Goodhart, C. A. E. (1984). "Problems of Monetary Management: The U.K. Experience." In Monetary Theory and Practice. Macmillan.
- Strathern, M. (1997). "'Improving ratings': audit in the British University system." European Review, 5(3), 305-321.
- Muller, J. Z. (2018). The Tyranny of Metrics. Princeton University Press.
- Forsgren, N., Humble, J., & Kim, G. (2018). Accelerate: The Science of Lean Software and DevOps. IT Revolution Press.
- Wikipedia: Campbell's law — https://en.wikipedia.org/wiki/Campbell%27s_law
