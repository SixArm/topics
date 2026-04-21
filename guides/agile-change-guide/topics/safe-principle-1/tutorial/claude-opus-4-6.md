# Take an economic view

"Take an economic view" is Principle #1 of the Scaled Agile Framework (SAFe). It establishes that every decision in a Lean-Agile enterprise must be grounded in sound economics. Delivering the best value and quality for people and society in the shortest sustainable lead time requires more than good engineering practices; it demands a fundamental understanding of the economics of building systems. This principle insists that trade-offs between speed, cost, risk, and value are made explicitly and continuously, not left to intuition or organizational inertia.

## Why economics must drive decision-making

Traditional project management often separates economic decisions from technical and scheduling decisions. Budgets are set annually, requirements are locked in advance, and teams are measured on adherence to plan rather than delivery of value. This creates a disconnect: the people closest to the work lack the economic context to make good decisions, while the people who control the budget lack the technical context to set proper constraints.

SAFe Principle #1 corrects this by pushing economic awareness into every level of the organization. When a developer decides whether to refactor a module or ship a workaround, that decision has an economic dimension. When a product manager sequences features on a backlog, that sequencing carries real financial consequences. Taking an economic view means equipping every person and every team with the information and authority to weigh those consequences.

## Core concepts

The principle rests on several interlocking economic concepts that teams must understand and apply daily.

- **Cost of Delay (CoD)**: The financial impact of not delivering a feature or capability on time. CoD quantifies urgency and is the single most important metric for prioritization.
- **Sequencing jobs for maximum benefit**: Using Weighted Shortest Job First (WSJF) to order work so that the highest-value, shortest-duration items are delivered first.
- **Operating within budgets and guardrails**: Value streams operate within approved Lean budgets that provide spending guidance without requiring item-level approval, enabling decentralized decision-making.
- **Understanding trade-offs**: Every decision involves trade-offs among development cost, production cost, operational cost, risk, and time-to-market. Making these trade-offs visible prevents local optimization at the expense of the whole system.

## Cost of Delay

Cost of Delay is the cornerstone concept of this principle. It answers the question: "What is it worth to deliver this sooner rather than later?" Without CoD, prioritization devolves into political negotiation or arbitrary ranking.

| Delay Profile | Description | Example |
|---|---|---|
| Standard | Value decays gradually over time | A general feature improvement that competitors will eventually replicate |
| Urgent | Value drops sharply if not delivered quickly | A regulatory compliance deadline or security vulnerability fix |
| Fixed date | Value exists only if delivered by a specific date | A seasonal promotion, a conference launch, or a contractual obligation |
| Intangible | Value is difficult to quantify but real | Technical debt reduction, architecture modernization, team capability building |

Organizations that do not measure Cost of Delay tend to prioritize based on the loudest stakeholder or the most recent escalation. Those that do measure it gain a shared, objective language for making sequencing decisions.

## Weighted Shortest Job First

WSJF operationalizes Cost of Delay by combining it with job duration to produce a prioritization score. The formula is straightforward:

**WSJF = Cost of Delay / Job Duration**

This ensures that small, high-value items are delivered before large, lower-value items. WSJF prevents the common failure mode where teams spend months on large initiatives while quick wins with significant economic impact sit idle in the backlog.

| Factor | What it captures |
|---|---|
| User-business value | How much do users or the business benefit? |
| Time criticality | Is there a deadline or decaying opportunity? |
| Risk reduction / Opportunity enablement | Does this reduce risk or unlock future value? |
| Job size (duration) | How long will this take to deliver? |

The numerator (CoD) is the sum of user-business value, time criticality, and risk reduction. Dividing by job size produces a normalized score that can be compared across very different types of work.

## Lean budgets and guardrails

Traditional funding models allocate money to projects. Lean budgets allocate money to value streams. This distinction matters because project-based funding creates perverse incentives: teams pad estimates, resist scope changes, and optimize for plan adherence rather than value delivery.

Under Lean budgets:

- **Value streams receive funding allocations** rather than individual projects, giving teams flexibility to pursue the highest-value work as conditions change.
- **Guardrails define spending boundaries** such as capacity allocation guidelines, investment horizons, and portfolio-level constraints that keep spending aligned with strategy without requiring centralized approval for every item.
- **Participatory budgeting** engages stakeholders in setting budget boundaries collaboratively rather than through top-down command.
- **Dynamic adjustment** allows budget reallocations at regular intervals based on actual performance and changing market conditions, not annual budget cycles.

## Economic trade-offs in practice

Taking an economic view requires teams to reason about trade-offs explicitly rather than defaulting to habitual patterns. Common trade-offs include:

- **Speed versus quality**: Shipping faster may reduce CoD but increase operational costs from defects. The economic view demands quantifying both sides rather than treating quality as an absolute or an afterthought.
- **Centralized versus decentralized decisions**: Some decisions benefit from local speed; others require broader coordination. The economic framework helps determine which category a decision falls into based on the cost of being wrong and the cost of waiting.
- **Building versus buying**: The total cost of ownership, including maintenance, integration, and opportunity cost of engineering time, must be weighed against the strategic value of owning a capability.
- **Investing in enablers versus features**: Architectural runways, infrastructure improvements, and technical debt reduction do not deliver direct user value but enable future value delivery. The economic view treats these as investments with measurable returns, not overhead.

## Applying the principle across SAFe levels

| Level | How the economic view applies |
|---|---|
| Portfolio | Strategic themes guide investment allocation; Lean budgets fund value streams; WSJF prioritizes epics |
| Large Solution | Solution-level economics govern supplier decisions, compliance costs, and integration trade-offs |
| Program (ART) | PI Planning uses WSJF to sequence features; teams understand the economic impact of their commitments |
| Team | Daily decisions about design, testing, and debt remediation are informed by economic context |

The principle is not effective if it lives only at the portfolio level. Its power comes from propagating economic thinking to every team and every individual contributor.

## Related

After understanding this principle, explore **SAFe Principle #2: Apply systems thinking** to learn how economic decisions interact across complex value streams. Study **Weighted Shortest Job First (WSJF)** in depth for practical prioritization techniques. Investigate **Cost of Delay** as a standalone discipline, including the work of Donald Reinertsen on product development flow. Review **Lean portfolio management** for how organizations structure budgets around value streams rather than projects. Explore **decentralized decision-making** (SAFe Principle #9) to understand how economic guardrails enable autonomy without chaos.

## Summary

SAFe Principle #1, "Take an economic view," asserts that sustainable value delivery depends on making economic trade-offs explicit at every level of the organization. By understanding and applying Cost of Delay, using WSJF to sequence work for maximum benefit, operating within Lean budgets with appropriate guardrails, and equipping teams to reason about trade-offs between speed, cost, quality, and risk, organizations move from plan-driven bureaucracy to value-driven agility. The principle is foundational because without economic clarity, all other agile practices risk optimizing for activity rather than outcomes.

## References

- Leffingwell, Dean. *SAFe 6.0 Reference Guide: Scaled Agile Framework for Lean Enterprises*. Addison-Wesley, 2023.
- Reinertsen, Donald G. *The Principles of Product Development Flow: Second Generation Lean Product Development*. Celeritas Publishing, 2009.
- Scaled Agile, Inc. "SAFe Lean-Agile Principles." Scaled Agile Framework. https://scaledagileframework.com/safe-lean-agile-principles/
- Scaled Agile, Inc. "Lean Budgets." Scaled Agile Framework. https://scaledagileframework.com/lean-budgets/
- Scaled Agile, Inc. "WSJF." Scaled Agile Framework. https://scaledagileframework.com/wsjf/
- Black Swan Farming. "Cost of Delay." https://blackswanfarming.com/cost-of-delay/
