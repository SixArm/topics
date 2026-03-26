# Prioritising PoCs by ROI, Risk, and Repeatability

## Introduction

Every AI portfolio contains more promising ideas than the organisation can pursue simultaneously. The Chief AI Officer's most valuable skill is not generating ideas — it is selecting the right ones. Poor prioritisation is the single most common cause of AI programme failure: organisations either spread resources too thin across too many PoCs, bet everything on a single high-risk moonshot, or chase technically interesting projects that lack business value.

This chapter provides a rigorous, repeatable framework for prioritising AI proofs of concept. It centres on three dimensions — ROI, Risk, and Repeatability — that together capture the financial, operational, and strategic value of each candidate. You will learn how to estimate ROI when uncertainty is high, assess risk across multiple dimensions, score repeatability to identify platform-building opportunities, and manage the full pipeline from PoC to pilot to production.

---

## The PoC Prioritisation Framework

### The Three-R Model

The Three-R Model evaluates every candidate PoC across three dimensions:

**ROI (Return on Investment):** What is the expected financial and strategic value if this PoC succeeds and scales to production?

**Risk:** What is the probability that this PoC will fail, and what are the consequences of failure?

**Repeatability:** If this PoC succeeds, how many additional use cases can leverage the same capability, data, or infrastructure?

Each dimension is scored on a consistent scale, weighted according to organisational priorities, and combined into a composite score that drives portfolio-level decisions.

### Why Three Dimensions, Not One

ROI alone is insufficient because:

- A high-ROI use case with extreme technical risk may consume resources for months before failing.
- A high-ROI use case with zero repeatability builds a point solution that creates no platform value.
- A moderate-ROI use case with high repeatability may create more total value than a high-ROI singleton.

Risk alone leads to timidity — always choosing the safest projects, which are often the least valuable.

Repeatability alone leads to premature platform investment — building infrastructure for hypothetical future use cases that never materialise.

The Three-R Model forces a balanced evaluation.

---

## ROI Estimation for AI Projects

### The Challenge of AI ROI

AI projects present unique ROI estimation challenges:

1. **Model performance is unknown until training.** The accuracy, precision, recall, and other metrics that determine business impact cannot be known in advance.
2. **Value compounds over time.** Recommendation engines, forecasting models, and personalisation systems improve as they ingest more data.
3. **Indirect benefits are significant.** Improved customer experience, faster decision-making, and employee satisfaction gains are real but hard to quantify.
4. **Costs are front-loaded and ongoing.** Development costs are followed by perpetual monitoring, retraining, and infrastructure costs that traditional IT projects lack.

### A Structured Approach to ROI Estimation

Despite these challenges, the CAIO must produce defensible estimates. The following five-step approach balances rigour with practicality.

#### Step 1: Define the Value Driver

Every AI use case creates value through one or more of these drivers:

| Value Driver | Description | Example |
|---|---|---|
| **Cost reduction** | Automating manual tasks, reducing errors, improving efficiency | Automated invoice processing saves $1.2M/year in labour |
| **Revenue increase** | Enabling new offerings, improving conversion, reducing churn | Personalised recommendations lift average order value by 15% |
| **Risk mitigation** | Preventing fraud, improving compliance, reducing safety incidents | Fraud detection model prevents $8M in annual losses |
| **Speed improvement** | Accelerating decisions, reducing cycle times | Loan approval time drops from 5 days to 4 hours |
| **Quality improvement** | Improving accuracy, consistency, customer satisfaction | Defect detection reduces customer returns by 25% |

#### Step 2: Quantify the Baseline

Before estimating AI impact, establish the current state:

- What is the current cost of the process?
- What is the current revenue or margin?
- What is the current error rate, cycle time, or quality metric?
- How many transactions, decisions, or units does the process handle?

**Example:** "Our contact centre handles 2 million calls per year at an average cost of $12 per call. 35% of calls involve simple, repetitive queries that agents resolve in under 3 minutes."

#### Step 3: Model Scenarios

Estimate the impact under three scenarios based on model performance:

| Scenario | Model Performance | Business Impact | Annual Value |
|---|---|---|---|
| **Conservative** | 70% accuracy | Automates 25% of simple queries | $2.1M cost saving |
| **Base** | 85% accuracy | Automates 50% of simple queries | $4.2M cost saving |
| **Optimistic** | 95% accuracy | Automates 75% of simple queries | $6.3M cost saving |

The base case should be your primary planning number, with conservative and optimistic cases informing upside and downside bounds.

#### Step 4: Estimate Total Cost of Ownership

AI projects have costs across multiple phases:

| Phase | Cost Components | Typical Range |
|---|---|---|
| **PoC** | Data scientist time, compute, data preparation | $50K - $300K |
| **Pilot** | Engineering, integration, testing, change management | $200K - $1M |
| **Production** | Infrastructure, monitoring, support, retraining | $100K - $500K/year |
| **Ongoing improvement** | Model updates, feature engineering, performance tuning | $50K - $200K/year |

Include fully loaded labour costs, cloud compute, licensing, and any data acquisition costs.

#### Step 5: Calculate ROI Metrics

**Net Present Value (NPV):** Discount future cash flows at the organisation's cost of capital. A three-year horizon is typical for AI projects.

**Payback period:** How many months from production launch until cumulative benefits exceed cumulative costs?

**ROI ratio:** (Total benefits - Total costs) / Total costs, expressed as a percentage.

**Example calculation:**

| Metric | Value |
|---|---|
| PoC cost | $150K |
| Pilot cost | $400K |
| Production cost (annual) | $200K |
| Annual benefit (base case) | $4.2M |
| Year 1 net value | $4.2M - $750K = $3.45M |
| Year 2 net value | $4.2M - $200K = $4.0M |
| Year 3 net value | $4.2M - $200K = $4.0M |
| 3-year NPV (10% discount rate) | ~$9.5M |
| Payback period | ~2 months after production launch |
| ROI ratio | 720% over 3 years |

### ROI Scoring

Convert ROI estimates into a standardised score for portfolio comparison:

| Score | NPV (3-year) | Payback Period |
|---|---|---|
| 5 | > $10M | < 6 months |
| 4 | $5M - $10M | 6-12 months |
| 3 | $1M - $5M | 12-18 months |
| 2 | $250K - $1M | 18-24 months |
| 1 | < $250K | > 24 months |

Adjust thresholds to your organisation's scale. A startup may score a $500K NPV as a "5"; a Fortune 500 company may require $50M.

---

## Risk Assessment for AI PoCs

### Risk Dimensions

Evaluate each PoC across five risk dimensions:

#### 1. Technical Risk

- **Data availability:** Does the required data exist? Is it accessible? Is it of sufficient quality?
- **Model feasibility:** Has this type of problem been solved before? Is there published research or commercial precedent?
- **Integration complexity:** How difficult is it to connect the AI system to existing enterprise systems?
- **Performance requirements:** Does the use case demand extreme accuracy, speed, or scale that may be difficult to achieve?

| Score | Description |
|---|---|
| 1 (Low) | Proven approach, clean data, straightforward integration |
| 3 (Medium) | Some data gaps, moderate complexity, established but non-trivial methods |
| 5 (High) | Novel approach, significant data challenges, complex integration, cutting-edge research required |

#### 2. Operational Risk

- **Process change:** How much does the current workflow need to change?
- **User adoption:** Will end users trust and use the AI system?
- **Workforce impact:** Will the AI displace or significantly change roles?
- **Dependency risk:** Does the PoC depend on other projects, teams, or external partners delivering on time?

| Score | Description |
|---|---|
| 1 (Low) | Minimal process change, enthusiastic users, no workforce displacement |
| 3 (Medium) | Moderate process change, training required, some role adjustments |
| 5 (High) | Major process redesign, significant resistance expected, workforce restructuring required |

#### 3. Ethical and Reputational Risk

- **Bias potential:** Could the model produce unfair outcomes for protected groups?
- **Transparency:** Can the model's decisions be explained to affected individuals?
- **Privacy:** Does the use case involve sensitive personal data?
- **Public perception:** Could a failure or misuse generate negative media coverage?

| Score | Description |
|---|---|
| 1 (Low) | No personal data, no fairness concerns, low public visibility |
| 3 (Medium) | Some personal data, indirect impact on individuals, moderate visibility |
| 5 (High) | Sensitive personal data, direct impact on individuals, high public visibility, significant bias risk |

#### 4. Regulatory Risk

- **Applicable regulations:** Does the use case fall under AI-specific regulation (EU AI Act), data protection law (GDPR, CCPA), or sector-specific rules (healthcare, finance)?
- **Classification:** Under the EU AI Act, is this a prohibited, high-risk, limited-risk, or minimal-risk application?
- **Audit requirements:** Will the model need to be auditable, explainable, or approved by a regulator?

| Score | Description |
|---|---|
| 1 (Low) | No specific AI regulation applies; standard data protection compliance sufficient |
| 3 (Medium) | Sector-specific rules apply; additional compliance steps needed but manageable |
| 5 (High) | High-risk classification under AI Act; requires pre-market conformity assessment; significant compliance burden |

#### 5. Execution Risk

- **Team capability:** Does the team have the skills to deliver?
- **Vendor dependency:** Is the PoC dependent on an external vendor's timeline or product roadmap?
- **Timeline realism:** Can the PoC be completed within the allocated time?
- **Budget certainty:** Are cost estimates reliable, or is there significant potential for overruns?

| Score | Description |
|---|---|
| 1 (Low) | Experienced team, no vendor dependency, realistic timeline, predictable costs |
| 3 (Medium) | Some skill gaps, minor vendor dependency, ambitious but achievable timeline |
| 5 (High) | Significant skill gaps, critical vendor dependency, aggressive timeline, high cost uncertainty |

### The Risk Matrix

Combine risk scores into a composite risk rating:

| Composite Risk Score | Rating | Implication |
|---|---|---|
| 5-10 | Low risk | Proceed with standard governance |
| 11-17 | Medium risk | Proceed with enhanced oversight and risk mitigation plan |
| 18-25 | High risk | Proceed only if ROI is exceptional and risk mitigation plan is robust; consider phased approach |

### Risk Mitigation Planning

For every medium- or high-risk PoC that proceeds, create a risk mitigation plan:

| Risk | Mitigation Strategy | Owner | Status |
|---|---|---|---|
| Data quality issues | Invest 2 weeks in data profiling and cleaning before model training | Data Engineering Lead | Planned |
| User adoption resistance | Co-design workflow with end users; recruit pilot champions | Product Manager | In progress |
| Regulatory uncertainty | Engage legal counsel for pre-assessment under EU AI Act | Chief Compliance Officer | Complete |
| Vendor dependency on LLM API | Implement abstraction layer to enable model switching | ML Engineer Lead | Planned |

---

## Repeatability Scoring

Repeatability is the often-overlooked third dimension that distinguishes strategic investments from tactical ones.

### What Makes a PoC Repeatable?

A PoC is highly repeatable when:

1. **The underlying capability serves multiple use cases.** Text classification, entity extraction, demand forecasting, and other capabilities recur across business functions.
2. **The data infrastructure can be reused.** Feature pipelines, data connectors, and labelling workflows built for one use case can serve others.
3. **The deployment pattern is standard.** Real-time inference, batch scoring, or RAG pipelines can be parameterised for new models.
4. **The governance framework transfers.** Bias testing, explainability, and monitoring approaches work for similar use cases.
5. **Organisational learning transfers.** The skills, processes, and change management approaches developed for one use case accelerate the next.

### Repeatability Scoring Rubric

| Score | Description |
|---|---|
| 5 | Capability serves 5+ identified future use cases; establishes a new platform pattern; creates reusable data infrastructure |
| 4 | Capability serves 3-4 future use cases; extends an existing platform; reuses existing data infrastructure |
| 3 | Capability serves 1-2 future use cases; partially reusable infrastructure |
| 2 | Limited reuse potential; some transferable learnings but mostly bespoke |
| 1 | Entirely bespoke; no reuse potential; one-off solution |

### How to Assess Repeatability

1. **Consult the capability map.** How many other use cases in the pipeline require the same AI capability?
2. **Assess data adjacency.** How many other use cases could benefit from the same data pipelines and feature stores?
3. **Evaluate pattern applicability.** Is the deployment pattern (real-time, batch, RAG, edge) needed by other use cases?
4. **Consider organisational learning.** Will this PoC build skills, processes, and relationships that accelerate future initiatives?

---

## The Composite Prioritisation Score

### Calculating the Score

Combine the three dimensions using weighted scores:

**Composite Score = (ROI Score x ROI Weight) + (Inverse Risk Score x Risk Weight) + (Repeatability Score x Repeatability Weight)**

Note: Risk is inverted (6 - Risk Score) so that lower risk contributes positively.

### Example Weighting

| Dimension | Weight | Rationale |
|---|---|---|
| ROI | 40% | Financial value is the primary driver |
| Risk (inverted) | 30% | Execution confidence matters for resource-constrained organisations |
| Repeatability | 30% | Platform value compounds over the portfolio |

### Example Portfolio Scoring

| PoC Candidate | ROI (1-5) | Risk (1-5) | Repeatability (1-5) | Composite Score |
|---|---|---|---|---|
| Customer churn prediction | 4 | 2 | 4 | 4(0.4) + 4(0.3) + 4(0.3) = **4.0** |
| Automated invoice processing | 3 | 1 | 5 | 3(0.4) + 5(0.3) + 5(0.3) = **4.2** |
| Autonomous vehicle routing | 5 | 5 | 2 | 5(0.4) + 1(0.3) + 2(0.3) = **2.9** |
| Marketing copy generation | 2 | 1 | 3 | 2(0.4) + 5(0.3) + 3(0.3) = **3.2** |
| Fraud detection enhancement | 5 | 3 | 4 | 5(0.4) + 3(0.3) + 4(0.3) = **4.1** |
| Meeting summarisation | 2 | 1 | 2 | 2(0.4) + 5(0.3) + 2(0.3) = **2.9** |

In this example, automated invoice processing ranks highest despite moderate ROI, because its low risk and high repeatability (the NLP pipeline serves many future use cases) make it the best portfolio investment.

---

## The PoC-to-Production Pipeline

### Stage Gates

A well-designed pipeline moves initiatives through defined stages with clear gate criteria:

| Stage | Duration | Purpose | Gate Criteria |
|---|---|---|---|
| **Discovery** | 2-4 weeks | Validate problem, data, and hypothesis | Completed AI Use Case Canvas; data feasibility confirmed; sponsor identified |
| **PoC** | 4-8 weeks | Validate technical feasibility and potential value | Model meets minimum accuracy threshold; economic model confirmed; user feedback positive |
| **Pilot** | 8-16 weeks | Validate operational readiness in limited production | SLA met in controlled environment; users adopt workflow; no critical ethical/regulatory issues; refined business case |
| **Production** | Ongoing | Full-scale deployment with monitoring and governance | Full SLA compliance; monitoring and alerting operational; governance framework active; support model in place |

### Stage Gate Reviews

Each gate should be a formal review with a decision:

- **Advance** — proceed to the next stage with specified resources and timeline.
- **Iterate** — repeat the current stage with specific adjustments (more data, different approach, broader testing).
- **Pivot** — the current approach is not working, but the problem is still worth solving. Redirect to a different solution.
- **Archive** — the opportunity is not viable. Document learnings and close the initiative.

### The PoC Charter

Every PoC that passes the discovery gate should have a charter that defines:

| Element | Description |
|---|---|
| **Hypothesis** | What we are testing |
| **Success criteria** | Specific, measurable thresholds that constitute success |
| **Failure criteria** | Specific conditions that constitute failure (enabling fast-fail) |
| **Scope** | What is included and excluded |
| **Data** | What data will be used, how it will be accessed and prepared |
| **Team** | Roles and time commitments |
| **Timeline** | Week-by-week milestones |
| **Budget** | Estimated cost and approval |
| **Sponsor** | Executive responsible for business outcome |
| **Exit criteria** | Conditions for advancing, iterating, pivoting, or archiving |

---

## Fast-Fail Methodologies

### The Principle

Fast-fail is not about expecting failure. It is about structuring work so that if a PoC is going to fail, it fails as early and cheaply as possible, freeing resources for more promising initiatives.

### Techniques for Fast-Fail

#### 1. Start with the Hardest Assumption

Identify the single assumption that, if false, would invalidate the entire PoC. Test that assumption first.

**Example:** Before building a churn prediction model, first verify that historical churn labels exist and are reliable. If the CRM does not accurately distinguish voluntary churn from involuntary churn, no amount of modelling will produce useful predictions.

#### 2. Use Proxy Models

Before investing in custom model development, test whether a simple baseline (logistic regression, heuristic rules, or a prompted LLM) achieves meaningful results. If a simple approach fails entirely, a complex approach is unlikely to succeed either — or the problem may not be suited to AI.

#### 3. Paper Prototype the Workflow

Before building anything, walk end users through the proposed AI-augmented workflow on paper. If users cannot see how they would use the AI output, or if the workflow change is unacceptable, the PoC should not proceed.

#### 4. Time-Box Ruthlessly

Set hard deadlines for each PoC stage. If the team cannot demonstrate progress within the time box, the initiative should be reviewed at the stage gate rather than allowed to consume additional time.

#### 5. Define Kill Criteria in Advance

At the start of every PoC, define specific conditions that will trigger termination:

- "If accuracy does not exceed 75% after four weeks of iteration, we will archive this PoC."
- "If data extraction from the legacy system cannot be completed within two weeks, we will pivot to a different data source or archive."
- "If fewer than 50% of pilot users actively use the tool after four weeks, we will iterate on the workflow or archive."

---

## Success Criteria Definition

### Good Success Criteria

Good success criteria are:

- **Specific** — "Model accuracy > 85% on held-out test set" not "Model is accurate."
- **Measurable** — tied to a quantifiable metric.
- **Achievable** — realistic given the state of the art and available data.
- **Relevant** — connected to the business outcome, not just technical performance.
- **Time-bound** — associated with a deadline.

### Business vs. Technical Criteria

Both are essential:

| Type | Examples |
|---|---|
| **Technical** | Model accuracy > 85%; Inference latency < 200ms; System uptime > 99.5% |
| **Business** | Processing time reduced by 50%; Error rate reduced by 40%; User satisfaction score > 4.0/5.0 |
| **Adoption** | 80% of target users actively using the system within 4 weeks of pilot launch |
| **Economic** | Validated annual saving > $1M; Payback period < 12 months |

### Minimum Viable Model (MVM)

Borrow the concept of Minimum Viable Product from lean methodology. Define the minimum model performance that would make the AI system useful in the workflow. This is the threshold for advancing from PoC to pilot — not perfection, but "good enough to be better than the current process."

---

## Resource Allocation for PoCs

### The Portfolio Approach

Rather than funding PoCs individually, allocate a quarterly PoC budget and treat it as a portfolio:

| Portfolio Segment | Allocation | Characteristics |
|---|---|---|
| **Quick wins** | 40% | Low risk, moderate ROI, high repeatability. Expected to advance to pilot within one quarter. |
| **Strategic bets** | 40% | Higher risk, high ROI, moderate to high repeatability. May require two quarters of PoC work. |
| **Exploration** | 20% | Experimental. Testing emerging technologies or unconventional approaches. High failure rate expected. |

### Team Sizing

A typical PoC team:

| Role | Time Commitment | Purpose |
|---|---|---|
| **Data scientist / ML engineer** | 50-100% | Model development, evaluation, iteration |
| **Data engineer** | 25-50% | Data pipeline, feature engineering, data quality |
| **Product manager / AI translator** | 25-50% | Business requirements, user feedback, success criteria |
| **Domain expert** | 10-25% | Labelling, validation, workflow design |
| **Executive sponsor** | 5-10% | Decision-making, resource advocacy, stakeholder alignment |

### Avoiding Resource Fragmentation

A common mistake is spreading data science talent across too many concurrent PoCs. A team of four data scientists working on eight PoCs simultaneously will deliver none of them well. Constrain the number of active PoCs to match available capacity:

**Rule of thumb:** No more than two active PoCs per dedicated data scientist.

---

## Stakeholder Buy-In

### The Buy-In Framework

Stakeholder buy-in for PoCs must be secured at three levels:

#### 1. Executive Sponsor

- Must own the business outcome the PoC targets.
- Must commit to removing organisational blockers.
- Must agree to champion the initiative at executive forums.
- Must be willing to make a go/no-go decision at the stage gate.

#### 2. Functional Leader

- Must provide access to data, systems, and subject-matter experts.
- Must agree to workflow changes if the PoC succeeds.
- Must assign team members to participate in the PoC.

#### 3. End Users

- Must participate in workflow design and user testing.
- Must provide feedback during the pilot phase.
- Must be willing to adopt the AI-augmented workflow if it meets success criteria.

### Techniques for Building Buy-In

| Technique | Application |
|---|---|
| **Show, don't tell** | Demonstrate a working prototype (even a simple one) rather than presenting slides. |
| **Use their data** | Build the PoC demonstration using the stakeholder's actual data, not generic examples. |
| **Quantify the pain** | Start with the cost of the current process, not the promise of AI. |
| **Address fears directly** | Acknowledge concerns about job displacement, accuracy, and control. Explain the human-in-the-loop design. |
| **Create co-ownership** | Invite stakeholders to participate in defining success criteria and workflow design. |
| **Celebrate transparently** | Share both successes and failures. Credibility comes from honesty, not hype. |

---

## Measuring PoC Success

### The PoC Scorecard

At the conclusion of each PoC, complete a scorecard:

| Dimension | Metric | Target | Actual | Pass/Fail |
|---|---|---|---|---|
| **Technical performance** | Model accuracy | > 85% | 88% | Pass |
| **Business impact (projected)** | Annual cost saving | > $1M | $1.4M | Pass |
| **Data quality** | Feature completeness | > 90% | 78% | Fail |
| **User acceptance** | User satisfaction score | > 4.0/5.0 | 4.2/5.0 | Pass |
| **Time to deliver** | PoC duration | < 8 weeks | 7 weeks | Pass |
| **Budget adherence** | Actual vs. planned cost | < 120% of budget | 105% | Pass |

### Interpreting Results

Not every dimension needs to pass for the PoC to advance. The key question is: **Can the failing dimensions be remediated in the pilot phase at acceptable cost?**

In the example above, the data-quality failure (78% feature completeness vs. 90% target) is a concern, but if the gap can be closed through a targeted data-engineering investment during the pilot phase, the PoC can still advance with a data-remediation work stream included in the pilot plan.

---

## Scaling from PoC to Pilot to Production

### The Scaling Checklist

Before advancing from pilot to production, verify:

| Area | Checkpoint |
|---|---|
| **Performance** | Model meets production SLA under realistic load conditions |
| **Data pipeline** | Production data pipeline is automated, monitored, and fault-tolerant |
| **Integration** | AI system is integrated with target enterprise systems and tested end-to-end |
| **Monitoring** | Model performance, data drift, and system health monitoring are operational |
| **Governance** | Bias testing, explainability reporting, and audit logging are in place |
| **Security** | Access controls, data encryption, and vulnerability testing are complete |
| **Support** | Runbook, escalation path, and on-call rotation are defined |
| **Training** | End users are trained on the new workflow |
| **Rollback** | Rollback procedure is documented and tested |
| **Business process** | Updated business process documentation is published |
| **Change management** | Communication plan is executed; FAQs are published |

### Common Scaling Challenges

| Challenge | Description | Mitigation |
|---|---|---|
| **PoC-production gap** | The PoC was built with research-quality code and static data; productionising requires rewriting everything. | Set engineering standards from the PoC stage. Use production-grade tools even in PoCs. |
| **Data drift** | Production data differs from PoC training data, causing model degradation. | Implement data drift monitoring and automated retraining triggers. |
| **Integration brittleness** | The AI system breaks when upstream systems change. | Use robust API contracts and circuit-breaker patterns. |
| **User resistance** | Pilot users were enthusiastic volunteers; production users are reluctant adopters. | Invest in change management, training, and gradual rollout. |
| **Cost surprise** | Production infrastructure costs exceed PoC estimates because PoC ran on a single laptop. | Conduct capacity planning and cost modelling before production approval. |

---

## Common PoC Pitfalls

### Pitfall 1: PoC Purgatory

**Symptom:** The organisation has completed 15 PoCs and deployed zero production systems.

**Root cause:** No clear pipeline from PoC to production; no stage-gate process; no executive mandate to scale.

**Fix:** Implement the stage-gate process described above. Require every PoC to have a production plan before approval. Set a target ratio (e.g., at least 30% of PoCs should advance to production within 12 months).

### Pitfall 2: The Demo Trap

**Symptom:** The PoC produces an impressive demo that wows executives but falls apart when exposed to real data, real users, or real scale.

**Root cause:** The PoC was optimised for presentation rather than validation. Cherry-picked data, hand-tuned parameters, and scripted scenarios.

**Fix:** Define success criteria before the PoC begins, including hold-out test sets, blind evaluation by end users, and performance on edge cases. Never allow a demo to substitute for a rigorous evaluation.

### Pitfall 3: Scope Creep

**Symptom:** A focused PoC gradually expands to accommodate additional features, data sources, and stakeholders until it becomes a full project that takes six months instead of six weeks.

**Root cause:** Lack of a clear charter; inability to say "no" to stakeholders who add requirements.

**Fix:** Time-box the PoC ruthlessly. Document the scope in the charter and treat any addition as a separate initiative. Use the phrase: "That's a great idea for v2; let's validate v1 first."

### Pitfall 4: Technology-First Thinking

**Symptom:** The team selects a technology (a specific LLM, a vendor platform, a novel architecture) before understanding the problem.

**Root cause:** Technology enthusiasm overriding problem-solving discipline.

**Fix:** Require a completed AI Use Case Canvas — with problem statement, data requirements, and success criteria defined — before any technology selection.

### Pitfall 5: Ignoring Change Management

**Symptom:** The model works, the system is deployed, and nobody uses it.

**Root cause:** End users were not involved in design, were not trained, do not trust the output, or find the workflow change too disruptive.

**Fix:** Include user acceptance as a formal PoC success criterion. Co-design workflows with end users. Invest in training and communication during the pilot phase.

### Pitfall 6: No Executive Sponsor

**Symptom:** The PoC is driven by the data science team with no business owner. When the PoC succeeds, there is no one to champion production funding.

**Root cause:** Bottom-up enthusiasm without top-down commitment.

**Fix:** Require an executive sponsor for every PoC. The sponsor must commit to a business outcome, not just a technology experiment.

---

## Real-World Prioritisation Examples

### Example 1: Insurance Company — Claims Processing

**Context:** An insurance company identified eight AI use cases through a discovery process. Budget allowed for three concurrent PoCs.

**Scoring:**

| Use Case | ROI (1-5) | Risk (1-5) | Repeat (1-5) | Composite |
|---|---|---|---|---|
| Claims triage automation | 4 | 2 | 4 | **4.0** |
| Fraud ring detection | 5 | 4 | 2 | **3.2** |
| Policy document summarisation | 3 | 1 | 5 | **3.9** |
| Subrogation opportunity detection | 3 | 3 | 2 | **2.7** |
| Customer churn prediction | 3 | 2 | 3 | **3.2** |
| Claim reserve estimation | 4 | 3 | 3 | **3.5** |
| Agent performance coaching | 2 | 2 | 2 | **2.4** |
| Catastrophe event prediction | 5 | 5 | 1 | **2.6** |

**Decision:** The company selected claims triage automation, policy document summarisation, and claim reserve estimation — the top three by composite score. Notably, fraud ring detection was deferred despite the highest ROI because its high risk and low repeatability made it a poor portfolio choice for the initial wave.

**Outcome:** Claims triage and policy summarisation both advanced to production within six months. The NLP capabilities built for these two use cases later accelerated fraud ring detection (which used similar entity extraction and document analysis capabilities) when it was funded in the second wave.

### Example 2: Manufacturing Company — Quality and Operations

**Context:** A manufacturer running 12 factories globally had seven candidate PoCs and budget for two.

**Scoring:**

| Use Case | ROI (1-5) | Risk (1-5) | Repeat (1-5) | Composite |
|---|---|---|---|---|
| Visual defect detection | 4 | 3 | 4 | **3.7** |
| Predictive maintenance | 4 | 2 | 5 | **4.2** |
| Energy consumption optimisation | 3 | 3 | 3 | **2.9** |
| Supply chain demand sensing | 5 | 3 | 3 | **3.8** |
| Workforce scheduling | 2 | 1 | 3 | **3.0** |
| Raw material quality prediction | 3 | 4 | 2 | **2.4** |
| Safety incident prediction | 4 | 4 | 2 | **3.0** |

**Decision:** Selected predictive maintenance and supply chain demand sensing. Predictive maintenance ranked highest due to its combination of strong ROI, manageable risk, and exceptional repeatability (the same time-series anomaly detection capability would extend to all 12 factories and multiple equipment types).

### Example 3: Technology Company — Internal Productivity

**Context:** A technology company with 15,000 employees sought to improve internal productivity using generative AI. Six candidate use cases, budget for three.

| Use Case | ROI (1-5) | Risk (1-5) | Repeat (1-5) | Composite |
|---|---|---|---|---|
| Code review assistant | 4 | 2 | 3 | **3.7** |
| Meeting summarisation | 2 | 1 | 4 | **3.3** |
| Internal knowledge Q&A | 3 | 2 | 5 | **3.8** |
| Sales proposal generation | 3 | 2 | 3 | **3.1** |
| HR policy chatbot | 2 | 1 | 4 | **3.3** |
| Customer support draft replies | 4 | 2 | 3 | **3.7** |

**Decision:** Selected internal knowledge Q&A, code review assistant, and customer support draft replies. Internal knowledge Q&A ranked highest because the RAG infrastructure it required would serve meeting summarisation, HR policy chatbot, and multiple other future use cases — an excellent repeatability investment.

---

## Building a Prioritisation Cadence

### Quarterly Prioritisation Cycle

| Week | Activity |
|---|---|
| Week 1 | Discovery pipeline refresh — gather new use case candidates from intake portal, stakeholder interviews, and workshops. |
| Week 2 | Scoring — apply the Three-R framework to all new and updated candidates. |
| Week 3 | Portfolio review — the AI leadership team reviews the full portfolio, including active PoCs, candidates, and recently completed initiatives. |
| Week 4 | Decision and communication — select new PoCs, communicate decisions to stakeholders, assign teams, and publish updated roadmap. |

### Annual Rebalancing

Once per year, conduct a comprehensive rebalancing:

- Revisit the weighting of ROI, risk, and repeatability dimensions based on organisational strategy.
- Retire stale candidates that have not been selected for two or more cycles.
- Recalibrate scoring anchors based on accumulated experience.
- Update the capability map to reflect new platform capabilities that may change repeatability scores.

---

## Key Takeaways

- **Use the Three-R Model** (ROI, Risk, Repeatability) for balanced, defensible PoC prioritisation.
- **Estimate ROI under scenarios.** Conservative, base, and optimistic cases reflect the inherent uncertainty of AI projects.
- **Assess risk across five dimensions.** Technical, operational, ethical, regulatory, and execution risks each deserve explicit evaluation.
- **Score repeatability deliberately.** The PoC that builds a reusable platform capability may be worth more than the PoC with the highest standalone ROI.
- **Implement stage gates.** A clear pipeline from discovery to PoC to pilot to production prevents PoC purgatory and ensures disciplined investment.
- **Embrace fast-fail.** Test the hardest assumption first, time-box ruthlessly, and define kill criteria in advance.
- **Secure stakeholder buy-in at all levels.** Executive sponsors, functional leaders, and end users must each be engaged from the start.
- **Treat PoC investment as a portfolio.** Balance quick wins, strategic bets, and exploration to manage risk and maximise learning.
- **Build a regular cadence.** Quarterly prioritisation cycles and annual rebalancing keep the portfolio fresh and aligned with evolving business priorities.
