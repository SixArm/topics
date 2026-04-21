# Devaux's Index of Project Performance (DIPP)

## Introduction

Devaux's Index of Project Performance (DIPP) is a comprehensive metric developed by Stephen Devaux to evaluate project success by measuring how efficiently a project converts resources into business value. Unlike traditional project metrics that focus narrowly on schedule, scope, and budget (the "iron triangle"), DIPP incorporates the business value delivered by the project relative to its cost, providing a more holistic and economically grounded view of project performance. This makes it particularly relevant for technology professionals working in agile and software engineering environments, where iterative delivery, changing requirements, and the opportunity cost of delayed value delivery are constant concerns.

## The Core Formula

DIPP is calculated as a ratio that compares the expected monetary value (EMV) of a project to the cost invested and the cost remaining. The standard formulation is:

**DIPP = EMV of the Project / (Cost Accrued + Cost Remaining + Opportunity Cost)**

A DIPP value greater than 1.0 indicates that the project is generating more value than it consumes in resources. A value less than 1.0 signals that the project is consuming more resources than the value it is expected to return. A value of exactly 1.0 means the project is breaking even.

| DIPP Value | Interpretation | Recommended Action |
|---|---|---|
| Greater than 1.0 | Project is delivering positive value relative to cost | Continue investment; consider accelerating |
| Equal to 1.0 | Project is at break-even | Review scope and priorities carefully |
| Less than 1.0 | Project is consuming more than it delivers | Reassess, restructure, or consider cancellation |

The power of this formula lies in its dynamic nature. DIPP is not calculated once at project inception. It is recalculated at regular intervals, giving stakeholders a real-time view of whether the project remains a worthwhile investment.

## Key Components

DIPP relies on several inputs, each of which must be estimated or measured throughout the project lifecycle:

- **Expected Monetary Value (EMV):** The total anticipated business value the project will deliver upon completion. This includes revenue generation, cost savings, risk reduction, and strategic positioning. EMV can and should be revised as scope evolves.
- **Cost Accrued:** The total expenditure already invested in the project, including labor, infrastructure, tooling, and any other direct costs. This is a sunk cost that factors into the denominator.
- **Cost Remaining:** The estimated cost to complete the remaining work. This number shifts as requirements change, scope is added or removed, and productivity rates fluctuate.
- **Opportunity Cost:** The value lost by not deploying the same resources on alternative projects or by delaying the delivery of business value. This is the component most often overlooked in traditional metrics, and it is central to the economic reasoning behind DIPP.

## Why Traditional Metrics Fall Short

Traditional project management metrics, such as Earned Value Management (EVM), focus on comparing planned versus actual performance in terms of schedule and budget. While useful, these metrics have significant blind spots:

| Metric | What It Measures | What It Misses |
|---|---|---|
| Schedule Variance (SV) | Whether the project is ahead or behind schedule | Whether the schedule matters relative to business value |
| Cost Variance (CV) | Whether the project is over or under budget | Whether the spending is generating proportional value |
| Schedule Performance Index (SPI) | Rate of progress against planned schedule | Whether the planned schedule was optimal in the first place |
| Cost Performance Index (CPI) | Cost efficiency of work performed | Opportunity cost of capital deployed |
| DIPP | Value efficiency of the entire investment | Requires robust estimation of EMV and opportunity cost |

The critical insight behind DIPP is that a project can be on time and under budget yet still be a poor investment if the business value it delivers does not justify the resources consumed. Conversely, a project that runs over budget may still be an excellent investment if the value it produces far exceeds the additional cost.

## DIPP in Agile and Software Engineering

DIPP is especially well-suited to agile and software engineering environments for several reasons:

- **Iterative value delivery:** Agile teams deliver working software in increments. DIPP can be recalculated at the end of each sprint or release, giving a rolling picture of investment performance.
- **Scope flexibility:** In agile projects, scope is expected to change. DIPP accommodates this by recalculating EMV as new features are added, deferred, or removed from the backlog.
- **Technical debt visibility:** When a team invests time in refactoring, architectural improvements, or reducing technical debt, traditional metrics may show a slowdown. DIPP can reflect the long-term value these investments provide by adjusting the EMV accordingly.
- **Prioritization support:** Product owners and stakeholders can use DIPP to compare the value-to-cost ratios of different features or epics, helping guide backlog prioritization.
- **Resource allocation decisions:** When multiple projects compete for the same engineering resources, DIPP provides a common economic language for comparing their relative worth.

## Calculating DIPP: A Practical Walkthrough

Consider a software project with the following parameters at a mid-project checkpoint:

| Parameter | Value |
|---|---|
| Expected Monetary Value (EMV) | $500,000 |
| Cost Accrued to Date | $150,000 |
| Estimated Cost to Complete | $100,000 |
| Estimated Opportunity Cost | $50,000 |

**DIPP = $500,000 / ($150,000 + $100,000 + $50,000) = $500,000 / $300,000 = 1.67**

A DIPP of 1.67 indicates a healthy project: for every dollar invested (including opportunity cost), the project is expected to return $1.67 in business value. The team and stakeholders can proceed with confidence.

Now suppose that at a later checkpoint, scope creep has increased the estimated cost to complete by $200,000, and delays have raised the opportunity cost:

| Parameter | Revised Value |
|---|---|
| Expected Monetary Value (EMV) | $500,000 |
| Cost Accrued to Date | $250,000 |
| Estimated Cost to Complete | $300,000 |
| Estimated Opportunity Cost | $100,000 |

**DIPP = $500,000 / ($250,000 + $300,000 + $100,000) = $500,000 / $650,000 = 0.77**

The DIPP has dropped below 1.0. The project is now projected to consume more resources than the value it returns. This is the signal for stakeholders to intervene: reduce scope, increase EMV through additional features, reallocate resources, or cancel the project.

## Benefits and Limitations

**Benefits:**

- Provides a single, economically meaningful number that communicates project health to both technical and business stakeholders.
- Accounts for opportunity cost, which is critical in environments where engineering teams are a constrained resource.
- Supports dynamic re-evaluation as project conditions change, aligning well with agile principles of inspect-and-adapt.
- Encourages value-driven prioritization rather than plan-driven compliance.
- Enables apples-to-apples comparison across projects competing for the same resources.

**Limitations:**

- Requires reliable estimation of Expected Monetary Value, which can be difficult for innovative or exploratory projects where outcomes are uncertain.
- Opportunity cost estimation is inherently subjective and requires discipline to calculate consistently.
- May oversimplify projects with non-monetary value drivers such as regulatory compliance, brand reputation, or employee morale.
- Depends on organizational maturity in value estimation; teams without a culture of business-value thinking may struggle to adopt DIPP effectively.

## Related

To deepen your understanding of project performance measurement, explore related topics including Earned Value Management (EVM) and its core metrics such as Schedule Performance Index (SPI) and Cost Performance Index (CPI), the concept of total cost of ownership (TCO), return on investment (ROI) analysis, agile metrics such as velocity and lead time, DORA metrics for software delivery performance, the MoSCoW prioritization method, net present value (NPV), and the broader discipline of project portfolio management. Understanding how DIPP fits within this ecosystem of metrics gives technology professionals a richer toolkit for making investment decisions about software projects.

## Summary

Devaux's Index of Project Performance (DIPP) offers technology professionals a powerful lens through which to evaluate project health by measuring the ratio of expected business value to total investment cost, including the often-ignored dimension of opportunity cost. By recalculating DIPP at regular intervals throughout a project, teams and stakeholders gain a dynamic, economically grounded signal of whether continued investment is justified, enabling better decisions about scope, prioritization, resource allocation, and project continuation or cancellation. In agile and software engineering contexts, where scope is fluid and value delivery is incremental, DIPP provides a unifying metric that bridges the gap between technical execution and business outcomes.

## References

- Devaux, Stephen A. *Total Project Control: A Practitioner's Guide to Managing Projects as Investments*. 2nd ed. CRC Press, 2015.
- Devaux, Stephen A. "The DIPP: Tracking Project Profitability." *PM Network*, Project Management Institute.
- Project Management Institute. *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*. 7th ed. PMI, 2021.
- Devaux, Stephen A. "When the DIPP Dips: Knowing When to Pull the Plug." *ProjectManagement.com*, PMI Community.
- Fleming, Quentin W., and Joel M. Koppelman. *Earned Value Project Management*. 4th ed. PMI, 2010.
