# Campbell's Law

## Introduction

Campbell's Law is a principle articulated by social scientist Donald T. Campbell in 1979. It states that the more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor.

For technology professionals, Campbell's Law is essential knowledge because software development, IT operations, and product management are heavily metric-driven disciplines. Understanding this law helps you design better measurement systems and avoid the pitfalls of metric gaming.

## The Core Principle

Campbell's original formulation:

> "The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor."

In simpler terms: when a measure becomes a target, it ceases to be a good measure.

## Why Campbell's Law Matters in Technology

Technology organizations rely heavily on metrics for:

- Performance evaluations
- Sprint planning and velocity tracking
- Service level agreements (SLAs)
- Product success measurement
- Engineering efficiency assessment

When these metrics carry high stakes (promotions, bonuses, project funding), individuals and teams naturally optimize for the metric rather than the underlying goal the metric was meant to represent.

## Common Examples in Technology

| Domain | Metric | Gaming Behavior | Actual Goal Undermined |
|--------|--------|-----------------|------------------------|
| Software Development | Lines of code written | Writing verbose, unnecessary code | Code quality and maintainability |
| QA/Testing | Number of bugs found | Logging trivial issues as bugs | Shipping reliable software |
| DevOps | Deployment frequency | Splitting deployments artificially | Delivering value to users |
| Support | Ticket closure time | Closing tickets prematurely | Customer satisfaction |
| Agile Teams | Story points completed | Point inflation over time | Predictable delivery |
| Engineering | Code coverage percentage | Writing meaningless tests | Actual code reliability |

## Real-World Technology Scenarios

### Scenario 1: Velocity as a Performance Metric

When management uses sprint velocity to compare teams or evaluate performance:

- Teams inflate story point estimates
- Easy work gets overestimated
- Velocity numbers rise while actual output stays flat
- Cross-team comparisons become meaningless

### Scenario 2: SLA Compliance Targets

When bonuses depend on meeting 99.9% uptime:

- Incidents get reclassified as "planned maintenance"
- Monitoring becomes selective
- Root cause analysis suffers because admitting problems hurts the metric
- Actual reliability may decline while reported uptime improves

### Scenario 3: Code Review Turnaround Time

When engineers are measured on review speed:

- Reviews become superficial
- Rubber-stamping increases
- Code quality degrades
- Technical debt accumulates

## Relationship to Goodhart's Law

Campbell's Law is closely related to Goodhart's Law, which states: "When a measure becomes a target, it ceases to be a good measure."

| Aspect | Campbell's Law | Goodhart's Law |
|--------|----------------|----------------|
| Origin | Social science (1979) | Economics (1975) |
| Focus | Corruption of social indicators | Statistical relationships breaking down |
| Emphasis | Institutional and behavioral corruption | Optimization pressure |
| Application | Policy and organizational metrics | Economic and statistical models |

Both laws describe the same fundamental phenomenon from different disciplinary perspectives. Technology professionals should treat them as complementary warnings about metric-driven management.

## Mitigating Campbell's Law

### Use Multiple Metrics Together

No single metric should carry all the weight. Combine metrics that create natural tension:

- Velocity paired with defect rate
- Deployment frequency paired with change failure rate
- Ticket closure time paired with customer satisfaction scores
- Code coverage paired with mutation testing results

### Separate Measurement from Incentives

- Use metrics for learning and improvement, not punishment
- Make metrics transparent to teams for self-assessment
- Avoid tying individual compensation directly to easily gamed metrics

### Rotate and Refresh Metrics

- Periodically change which metrics receive attention
- Audit metrics for signs of gaming
- Sunset metrics that have become corrupted

### Emphasize Qualitative Assessment

- Combine quantitative metrics with peer reviews
- Include subjective assessments from stakeholders
- Value outcomes over outputs

### Design Metrics That Are Hard to Game

Characteristics of robust metrics:

- Measure outcomes rather than activities
- Capture end-user impact
- Require multiple data sources to calculate
- Include lagging indicators that reveal gaming

## Warning Signs of Metric Corruption

Watch for these indicators that Campbell's Law is affecting your organization:

- Metrics improve while user complaints increase
- Teams optimize for measurement timing rather than actual work
- Gaming strategies become common knowledge
- Metric definitions get increasingly specific to close loopholes
- High performers on metrics are not high performers in reality
- Teams resist metric transparency

## Best Practices for Technology Leaders

- **Communicate intent**: Explain what behavior you want, not just what number you want
- **Measure what matters**: Start with desired outcomes and work backward to metrics
- **Expect gaming**: Assume any high-stakes metric will be gamed and plan accordingly
- **Stay curious**: Investigate unexpected metric improvements
- **Empower teams**: Let teams choose their own improvement metrics
- **Accept imperfection**: No measurement system is perfect; optimize for "good enough"

## Key Takeaways

- Campbell's Law predicts that high-stakes metrics will be corrupted
- Technology organizations are especially vulnerable due to heavy reliance on quantitative measures
- The solution is not abandoning metrics but using them wisely
- Multiple complementary metrics, qualitative assessment, and separating measurement from incentives all help
- Leaders must design measurement systems with gaming in mind from the start

## Conclusion

Campbell's Law is not an argument against measurement—it is an argument for thoughtful measurement. Technology professionals who understand this principle can build more effective teams, more honest reporting systems, and more sustainable organizations. The goal is to create an environment where optimizing for the metric and optimizing for the actual goal are as closely aligned as possible.
