# Base milestones on objective evaluation of working systems

## Introduction

"Base milestones on objective evaluation of working systems" is Principle 5 of the Scaled Agile Framework (SAFe). It addresses a fundamental challenge in large-scale product development: how do organizations know whether their investments are actually delivering value? Traditional phase-gate models attempt to answer this question through document reviews and stage approvals, but these methods often fail to reveal the true state of a system. SAFe Principle 5 asserts that the most reliable milestones are those grounded in the objective evaluation of working, integrated systems rather than in subjective assessments of plans, documents, or specifications.

Business owners, developers, and customers share a responsibility to ensure that investment in new solutions will deliver economic benefits. In Lean-Agile development, integration points provide objective milestones at which to evaluate the solution throughout the development life cycle. This regular evaluation provides the financial, technical, and fitness-for-purpose governance needed to ensure that a continuing investment will produce a commensurate return.

## The Problem with Phase-Gate Milestones

Traditional sequential development models use phase gates as control points. A project moves through phases such as requirements, design, implementation, testing, and deployment. At each gate, a review board decides whether the project may proceed. While this approach appears rigorous, it introduces several systemic problems.

- **Paper-based validation**: Phase-gate reviews evaluate documents, not working systems. Requirements specifications, architecture diagrams, and status reports can all look favorable while the underlying solution is deeply troubled.
- **Late discovery of risk**: Integration and testing happen near the end of the cycle, meaning that critical defects and misunderstandings surface only when the cost of correction is highest.
- **Sunk cost momentum**: Once significant investment has passed through multiple gates, organizational pressure to continue grows regardless of emerging evidence. Canceling a project after three approved gates feels like admitting failure at every gate.
- **False sense of control**: Gate approvals create a perception of governance without providing genuine insight into whether the solution works, performs, or meets user needs.

## Objective Milestones Through Integration Points

SAFe Principle 5 replaces subjective document reviews with objective demonstrations of working systems. Integration points are moments in the development cycle where components are assembled, tested, and evaluated as a whole. These points serve as fact-based milestones.

| Characteristic | Phase-Gate Milestone | Integration-Point Milestone |
|---|---|---|
| What is evaluated | Documents and plans | Working, integrated systems |
| Basis of decision | Subjective judgment | Objective evidence |
| When risks surface | Late in the cycle | Early and continuously |
| Feedback loop | Long, often months | Short, typically weeks |
| Cost of correction | High | Low |
| Stakeholder confidence | Based on reports | Based on demonstrated capability |

Integration points provide three categories of governance that organizations need:

- **Financial governance**: Does the investment trajectory justify continued funding? Working increments reveal actual velocity and remaining scope, enabling realistic cost projections.
- **Technical governance**: Is the architecture sound? Do components integrate cleanly? Working systems expose technical debt, performance bottlenecks, and integration failures that documents cannot reveal.
- **Fitness-for-purpose governance**: Does the solution address real user needs? Demonstrations and user testing of working systems provide direct evidence of value delivery.

## How SAFe Implements This Principle

SAFe provides several mechanisms that put Principle 5 into practice across the framework.

- **System Demos**: At the end of every iteration, teams demonstrate working, tested software to stakeholders. These demos are the most frequent integration-point milestones and provide immediate feedback on progress and direction.
- **Program Increment (PI) boundaries**: Each PI culminates in a Solution Demo where the full integrated increment is evaluated. This serves as a major objective milestone for portfolio-level governance.
- **Inspect and Adapt workshops**: These events follow PI system demos and provide a structured opportunity to assess results, identify improvement areas, and adjust plans based on objective evidence.
- **Lean-Agile budgeting**: Rather than funding projects through gate approvals, SAFe encourages funding value streams with guardrails. Continued investment decisions are based on demonstrated outcomes, not projected plans.

## Reducing Risk Through Frequent Evaluation

The core insight behind Principle 5 is that risk reduction is proportional to the frequency of objective evaluation. Longer intervals between integration points allow more risk to accumulate undetected.

| Evaluation Frequency | Risk Profile | Typical Corrective Cost |
|---|---|---|
| Monthly or less | High accumulation of hidden risk | Major rework or project failure |
| Every two weeks (iteration) | Moderate, regularly surfaced | Targeted adjustments within a sprint |
| Continuous integration | Low, detected almost immediately | Minor fixes applied in real time |

Frequent integration points also counteract several well-documented cognitive biases that plague traditional milestone reviews:

- **Optimism bias**: Teams and managers tend to overestimate progress and underestimate remaining effort. Working systems provide an undeniable reality check.
- **Confirmation bias**: Reviewers at phase gates tend to look for evidence that the project is on track. A working system demo forces confrontation with actual capability.
- **Planning fallacy**: Document-based milestones reinforce the original plan. Objective evaluation of working systems reveals whether the plan itself needs to change.

## Applying the Principle in Practice

Organizations adopting this principle should focus on several practical shifts in how they govern and evaluate development work.

- **Redefine "done"**: A milestone is achieved only when a working, tested, integrated system demonstrates the intended capability. No amount of documentation substitutes for this.
- **Invest in integration infrastructure**: Continuous integration, automated testing, and deployment pipelines are not optional conveniences. They are the infrastructure that makes frequent objective evaluation possible.
- **Empower stakeholders to evaluate directly**: Business owners and customers should observe system demos firsthand rather than relying on intermediary reports. Direct observation produces better decisions.
- **Separate learning from judgment**: Early integration-point evaluations should emphasize learning and course correction, not blame. Teams that fear punishment for honest demos will find ways to game the milestones.
- **Align funding decisions with demonstrated progress**: Portfolio management should use evidence from integration points to make investment continuation or pivot decisions, replacing the phase-gate approval ritual.

## Related

To deepen understanding of this principle, explore related SAFe principles, particularly Principle 1 (Take an economic view), which provides the financial reasoning that objective milestones support, and Principle 4 (Build incrementally with fast, integrated learning cycles), which describes the cadence that makes frequent evaluation possible. Study Lean-Agile budgeting to understand how funding models align with objective milestones. Review continuous integration and continuous delivery practices as the technical foundation for working-system evaluation. Examine the concepts of system demos and inspect-and-adapt workshops as the primary ceremonies where this principle is enacted. The DORA metrics framework also offers complementary approaches to measuring software delivery performance objectively.

## Summary

SAFe Principle 5 challenges organizations to abandon the false security of document-based phase gates and instead anchor their milestones in the objective evaluation of working, integrated systems. By doing so, organizations gain genuine visibility into financial viability, technical health, and fitness for purpose. Frequent integration points reduce risk, counteract cognitive biases, and provide stakeholders with the honest evidence they need to make sound investment decisions. The principle demands infrastructure investment in continuous integration and testing, cultural commitment to transparency, and a governance model that values demonstrated results over approved plans. When milestones are based on what a system actually does rather than what documents say it will do, organizations make better decisions and deliver better outcomes.

## References

- Scaled Agile, Inc. "SAFe Principle #5 – Base Milestones on Objective Evaluation of Working Systems." *Scaled Agile Framework*. https://scaledagileframework.com/base-milestones-on-objective-evaluation-of-working-systems/
- Leffingwell, Dean. *SAFe 6.0 Distilled: Achieving Business Agility with the Scaled Agile Framework*. Addison-Wesley, 2023.
- Reinertsen, Donald G. *The Principles of Product Development Flow: Second Generation Lean Product Development*. Celeritas Publishing, 2009.
- Poppendieck, Mary, and Tom Poppendieck. *Lean Software Development: An Agile Toolkit*. Addison-Wesley, 2003.
- Cooper, Robert G. "What's Next? After Stage-Gate." *Research-Technology Management*, vol. 57, no. 1, 2014, pp. 20–31.
