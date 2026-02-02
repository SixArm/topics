## Agile Definitions

Agile methodologies rely on shared understanding across teams. Five key definitions help teams prioritize work, establish quality standards, and measure outcomes. These definitions create alignment between developers, product owners, and stakeholders by making expectations explicit and measurable.

## Definition of Ready (DoR)

The Definition of Ready establishes criteria that a user story or work item must meet before a team commits to working on it during a sprint. A story that meets the DoR has been sufficiently refined, analyzed, and prepared for implementation.

**Common DoR criteria include:**

- User story follows the INVEST principles (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- Acceptance criteria are clearly written and agreed upon
- Dependencies have been identified and resolved or scheduled
- The team has estimated the effort required
- UX/UI designs are complete if applicable
- Technical approach has been discussed
- The Product Owner is available to answer questions

**Benefits of a Definition of Ready:**

| Benefit | Description |
|---------|-------------|
| Reduces mid-sprint surprises | Teams avoid discovering missing requirements during implementation |
| Improves estimation accuracy | Well-defined stories are easier to size correctly |
| Increases team confidence | Developers know what "done" looks like before starting |
| Prevents scope creep | Agreed criteria limit ad-hoc additions |

**Caution:** An overly strict DoR can slow delivery. Balance thoroughness with pragmatism.

## Definition of Done (DoD)

The Definition of Done specifies when a work item is truly complete. It represents the quality standard that all completed work must meet before it can be considered shippable.

**Typical DoD criteria:**

- Code is written and peer-reviewed
- Unit tests are written and passing
- Integration tests pass
- Code meets coding standards and passes static analysis
- Documentation is updated
- Feature is deployed to a staging environment
- Product Owner has accepted the implementation
- No known defects remain
- Performance meets established benchmarks

**DoD at different levels:**

| Level | Scope | Example Criteria |
|-------|-------|------------------|
| Story | Individual user story | Code reviewed, tests passing, PO accepted |
| Sprint | All work in a sprint | All stories meet DoD, sprint goal achieved |
| Release | Shippable increment | Production-ready, security reviewed, release notes complete |

A strong DoD prevents technical debt from accumulating. When teams skip steps to meet deadlines, they create hidden liabilities that compound over time.

## Definition of Value (DoV)

The Definition of Value articulates what makes work valuable to the organization. It shifts focus from output (features delivered) to outcomes (business impact achieved).

**Key questions a DoV answers:**

- What problem does this solve?
- Who benefits from this work?
- How will we measure success?
- What business metrics will improve?

**Value dimensions to consider:**

- Revenue generation or cost reduction
- User satisfaction and engagement
- Competitive advantage
- Risk mitigation
- Operational efficiency
- Learning and validated assumptions

The Definition of Value helps teams prioritize the product backlog by making value explicit rather than assumed. It prevents teams from building features that are technically impressive but deliver minimal business impact.

## Definition of Customer Value (DoCV)

The Definition of Customer Value focuses specifically on the value delivered to end users and customers. It ensures that product decisions center on customer needs rather than internal assumptions.

**Components of customer value:**

- **Functional value:** Does the product solve the customer's problem?
- **Emotional value:** How does the product make customers feel?
- **Economic value:** Does the product save customers time or money?
- **Social value:** Does the product help customers achieve status or connection?

**Methods to validate customer value:**

| Method | When to Use | Output |
|--------|-------------|--------|
| Customer interviews | Discovery phase | Qualitative insights, quotes |
| Surveys | Validation at scale | Quantitative sentiment data |
| Usage analytics | Post-release | Behavioral patterns |
| Net Promoter Score | Ongoing | Customer loyalty indicator |
| A/B testing | Feature decisions | Comparative performance data |

A strong DoCV prevents the "build it and they will come" fallacy. Teams explicitly state hypotheses about customer value and establish how they will validate those hypotheses.

## Definition of Technical Value (DoTV)

The Definition of Technical Value captures the value of work that improves the technical foundation without directly delivering user-facing features. This includes refactoring, infrastructure improvements, performance optimization, and technical debt reduction.

**Categories of technical value:**

- **Maintainability:** Code is easier to understand, modify, and extend
- **Reliability:** System uptime and error rates improve
- **Performance:** Response times and throughput improve
- **Scalability:** System handles increased load gracefully
- **Security:** Vulnerabilities are reduced or eliminated
- **Developer experience:** Engineers are more productive and satisfied

**Balancing technical and customer value:**

Technical work enables sustained delivery of customer value. Neglecting technical value leads to:

- Slower feature delivery over time
- Increased defect rates
- Higher operational costs
- Developer burnout and turnover

**Making technical value visible:**

| Approach | Description |
|----------|-------------|
| Dedicated allocation | Reserve a percentage of each sprint for technical work |
| Technical debt backlog | Track and prioritize technical improvements explicitly |
| Engineering metrics | Measure deployment frequency, lead time, change failure rate |
| Capacity planning | Show how technical investments increase future velocity |

## Comparing the Definitions

| Definition | Primary Question | Key Stakeholder | Measurement Focus |
|------------|------------------|-----------------|-------------------|
| Definition of Ready | Is this work prepared? | Development Team | Process quality |
| Definition of Done | Is this work complete? | Development Team | Deliverable quality |
| Definition of Value | Is this work worthwhile? | Product Owner | Business outcomes |
| Definition of Customer Value | Does this help users? | Customers | User outcomes |
| Definition of Technical Value | Does this improve our foundation? | Engineering | System health |

## Implementing Definitions Effectively

**Start simple:** Begin with minimal criteria and add more as the team matures. Overly complex definitions create bureaucracy without adding value.

**Make them visible:** Post definitions where the team can reference them during planning and review sessions.

**Review regularly:** Definitions should evolve as the team and product mature. Retrospectives are a natural time to discuss refinements.

**Ensure shared ownership:** The entire team should participate in creating and updating definitions. Imposed definitions generate resistance.

**Use for conversations, not compliance:** Definitions should spark discussion about quality and value, not become checkbox exercises.

## Common Pitfalls

- **Definition of Ready becomes a gate:** Stories languish in refinement indefinitely. Solution: Time-box refinement and accept uncertainty.

- **Definition of Done is ignored under pressure:** Teams skip steps to hit deadlines. Solution: Leadership must protect quality standards.

- **Value is assumed, not measured:** Teams deliver features without validating impact. Solution: Build measurement into the DoV from the start.

- **Technical value is invisible:** Engineering work competes unfairly with features. Solution: Quantify technical debt and its impact on velocity.

These five definitions work together to create a coherent system for planning, executing, and evaluating agile work. When properly implemented, they align teams around shared standards and keep focus on delivering meaningful outcomes.
