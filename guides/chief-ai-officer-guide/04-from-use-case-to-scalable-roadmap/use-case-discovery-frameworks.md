# Use Case Discovery Frameworks

## Introduction

The quality of your AI roadmap is determined before a single line of code is written. It is determined by the quality of the use cases you choose to pursue. Discovery — the systematic process of identifying, qualifying, and framing AI opportunities — is the most underinvested stage in most enterprise AI programmes. Teams rush to build models before confirming that the underlying problem is worth solving, that the data exists, or that the organisation is ready to act on the model's output.

This chapter provides a comprehensive toolkit for AI use case discovery. Whether you are launching your organisation's first AI initiative or refreshing a mature portfolio, these frameworks will help you surface high-value opportunities, qualify them rigorously, and frame them in a way that accelerates everything downstream — from PoC design to production deployment.

---

## The Discovery Mindset

Before reaching for any framework, the CAIO must establish the right organisational mindset for discovery.

### Curiosity Over Certainty

Discovery is an exploration, not a requirements-gathering exercise. The best use cases often emerge from unexpected intersections: a supply-chain analyst mentions a manual spreadsheet reconciliation that happens every Monday, a customer-service manager describes a pattern in escalation calls, a quality engineer shows you a folder of photos used for visual inspection. These are the raw signals that structured frameworks help you capture and evaluate.

### Inclusive, Not Exclusive

AI ideas should not come only from the data science team. The richest seam of opportunities lies with the people who do the work every day — the operational staff, the middle managers, the customer-facing teams. Your discovery process must create accessible channels for these voices.

### Strategic Alignment First

Not every valid AI opportunity is a strategic one. Discovery must be anchored to the organisation's strategic priorities. If the CEO has declared that customer retention is the top priority for the year, a brilliant computer-vision application for warehouse automation — however technically impressive — may not belong in the current roadmap.

### Hypothesis-Driven

Every use case that survives initial screening should be expressed as a testable hypothesis. This forces clarity and makes it possible to design a PoC that will either validate or invalidate the opportunity quickly.

---

## Framework 1: Design Thinking for AI

Design thinking, originally popularised for product and service innovation, adapts powerfully to AI use case discovery. The core stages — Empathise, Define, Ideate, Prototype, Test — map onto the AI discovery lifecycle with a few important modifications.

### Stage 1: Empathise — Understand the Human Context

Before considering what AI can do, understand what people actually do. Conduct:

- **Shadowing sessions** — spend time with frontline workers observing their workflows. Note where they wait, where they switch between systems, where they apply judgment, and where they make errors.
- **Journey mapping** — map the end-to-end journey of a customer, patient, claim, order, or other business entity. Identify pain points, delays, and decision nodes.
- **Frustration interviews** — ask stakeholders: "What is the most tedious, repetitive, or error-prone part of your week?" These frustrations often conceal high-value automation or augmentation opportunities.

**Example:** At a European insurance company, a design-thinking workshop with claims handlers revealed that 40% of their time was spent reading medical reports to extract diagnosis codes — a task perfectly suited to NLP-based entity extraction. The use case was not on any technology team's radar until the empathy stage surfaced it.

### Stage 2: Define — Frame the Problem

Synthesise observations into problem statements using the format:

> "[Persona] needs [outcome] because [reason], but currently faces [obstacle]."

For AI discovery, add a data dimension:

> "... and the data that could address this obstacle includes [data sources]."

**Example:** "Claims handlers need to extract diagnosis codes from medical reports in under two minutes because processing speed drives customer satisfaction, but currently face an average of 12 minutes per report due to unstructured document formats. The data that could address this includes 500,000 historical claims with manually coded diagnoses."

### Stage 3: Ideate — Generate AI Solution Hypotheses

With problem statements defined, brainstorm potential AI approaches. Use structured prompts:

- "What if a model could predict [outcome] based on [inputs]?"
- "What if we could automate [task] using [AI capability]?"
- "What if we could augment [role] with [AI-generated insight]?"
- "What if we could detect [anomaly/pattern] in [data stream]?"

Encourage wild ideas first, then cluster and filter. A single problem statement may yield multiple AI approaches — a classification model, a generative summary, a recommendation engine — each with different feasibility and value profiles.

### Stage 4: Prototype — Build Lightweight Validations

In the AI context, prototyping at the discovery stage does not mean building a model. It means:

- **Data feasibility checks** — can you access the data? Is it labelled? Is it representative?
- **Wireframes and mockups** — what would the user interface look like? How would the AI output integrate into the existing workflow?
- **Expert validation** — would a domain expert trust this output? What error rate is acceptable?
- **Back-of-envelope economics** — if the model achieved 80% accuracy, what would the financial impact be?

### Stage 5: Test — Validate with Stakeholders

Present prototypes (wireframes, data feasibility reports, economic models) to stakeholders and end users. Gather feedback on:

- Willingness to adopt the AI-assisted workflow.
- Concerns about trust, accuracy, and job impact.
- Suggestions for refinement.
- Priority relative to other initiatives.

This stage often kills weak use cases early — a significant benefit, since every use case that proceeds to PoC consumes real resources.

---

## Framework 2: Opportunity Mapping

Opportunity mapping is a portfolio-level technique that plots the entire landscape of potential AI use cases along two or more strategic dimensions.

### The Classic 2x2

The simplest opportunity map uses two axes:

- **X-axis: Business Impact** (low to high) — measured by revenue potential, cost reduction, risk mitigation, or strategic importance.
- **Y-axis: Feasibility** (low to high) — measured by data availability, technical complexity, organisational readiness, and integration difficulty.

Plot every candidate use case on the map. The resulting quadrants guide prioritisation:

| Quadrant | Characteristics | Action |
|---|---|---|
| **High Impact, High Feasibility** | "Quick wins" — pursue immediately | Fast-track to PoC |
| **High Impact, Low Feasibility** | "Strategic bets" — high reward but significant barriers | Invest in enablers (data, infrastructure) |
| **Low Impact, High Feasibility** | "Easy but marginal" — tempting to build but limited value | Deprioritise or bundle with larger initiatives |
| **Low Impact, Low Feasibility** | "Distractions" — avoid | Remove from backlog |

### Multi-Dimensional Mapping

For mature organisations, extend the map to additional dimensions:

- **Time to value** — how quickly can the use case deliver measurable results?
- **Reusability** — does the underlying capability serve other use cases?
- **Regulatory exposure** — does the use case involve sensitive data or high-risk decisions?
- **Competitive differentiation** — does success create a defensible advantage?

Visualise using radar charts, bubble charts (bubble size = estimated ROI), or weighted scoring matrices.

### Conducting the Mapping Exercise

1. **Assemble a cross-functional group** — business leaders, technologists, data scientists, risk officers.
2. **Present candidate use cases** — each on a standardised one-page brief.
3. **Score independently first** — have each participant score before group discussion to avoid anchoring bias.
4. **Discuss and calibrate** — review outliers (cases where scores diverge significantly) and reach consensus.
5. **Plot and prioritise** — place calibrated scores on the map and identify the portfolio mix.

---

## Framework 3: Stakeholder Interviews

Structured stakeholder interviews are the backbone of bottom-up discovery. They surface opportunities that top-down analysis misses — because the people closest to the work understand its inefficiencies best.

### Interview Design

**Target interviewees:**

- Functional leaders (VP/Director level) who own business outcomes.
- Operational managers who own processes and teams.
- Subject-matter experts who hold deep domain knowledge.
- Frontline staff who execute the work daily.
- IT and data leaders who understand data availability and system architecture.

**Interview structure (60 minutes):**

| Time | Topic | Purpose |
|---|---|---|
| 0-10 min | Context setting | Explain the purpose of the interview, define AI in accessible terms, set expectations. |
| 10-25 min | Process walkthrough | Ask the interviewee to describe their key processes step by step. Probe for volume, frequency, decision points, pain points. |
| 25-40 min | Data and systems | Explore what data is generated, where it lives, how it flows, what is captured vs. lost. |
| 40-50 min | Wish list | "If you had a magic assistant that could read, analyse, predict, or generate anything, what would you ask it to do?" |
| 50-60 min | Prioritisation | "Of the ideas we've discussed, which would have the biggest impact on your team's goals this year?" |

### Interview Best Practices

- **Use plain language.** Avoid jargon like "NLP" or "gradient boosting." Instead, say "a tool that reads documents and extracts key information."
- **Listen for verbs, not nouns.** The valuable signals are actions: classifying, predicting, summarising, matching, detecting, recommending.
- **Capture the "why."** Understanding why a process exists in its current form reveals whether AI is the right intervention or whether a simpler process redesign would suffice.
- **Record with permission.** Transcribe interviews to mine for additional insights later.
- **Follow up with observation.** Validate interview claims by observing the actual process.

### Synthesising Interview Data

After completing a round of interviews (typically 15-30 across the organisation), synthesise findings into:

- A **use case longlist** — every distinct opportunity mentioned.
- An **affinity map** — clustering use cases by business function, AI capability required, and data domain.
- A **heat map** — showing which functions have the highest density of opportunities and the strongest stakeholder appetite.

---

## Framework 4: Process Mining for AI Opportunities

Process mining uses event-log data from enterprise systems (ERP, CRM, BPM, workflow tools) to reconstruct and analyse actual business processes. It is an objective, data-driven complement to the subjective insights from interviews and workshops.

### How It Works

1. **Extract event logs** from source systems. Each log entry contains a case ID (e.g., order number), an activity name (e.g., "Approve invoice"), a timestamp, and optionally a resource (e.g., the person or system that performed the activity).
2. **Discover the process model** — algorithms reconstruct the actual process flow, including all variants, loops, and exceptions.
3. **Analyse for AI opportunities** by looking for:
   - **Bottlenecks** — stages where cases queue for extended periods, suggesting a need for prediction or automation.
   - **Rework loops** — cases that cycle back to earlier stages, suggesting a quality or classification problem.
   - **High-variability paths** — processes with many variants, suggesting a need for standardisation or intelligent routing.
   - **Manual handoffs** — points where data moves between systems or people, suggesting integration or extraction opportunities.
   - **Decision points** — forks in the process where a human makes a judgment call, suggesting classification or recommendation opportunities.

### Tools and Platforms

Commercial process mining platforms such as Celonis, UiPath Process Mining, and IBM Process Mining provide turnkey capabilities. Open-source alternatives like PM4Py enable custom analysis.

### Example: Procure-to-Pay

A global manufacturer applied process mining to its procure-to-pay process and discovered:

- 23% of invoices were manually rerouted due to incorrect GL coding — an NLP classification opportunity.
- Approval times varied from 2 hours to 14 days, with the longest delays correlated to specific cost centres — a predictive routing opportunity.
- 8% of invoices were duplicate submissions — an anomaly detection opportunity.

These three AI use cases, surfaced entirely through data rather than interviews, represented $4.2 million in annual savings.

### Integrating Process Mining with Other Discovery Methods

Process mining is most powerful when combined with stakeholder interviews. Interviews reveal the "why" behind process inefficiencies; process mining reveals the "what" and "how much." Together, they produce use cases that are both well-understood and quantified.

---

## Framework 5: The AI Use Case Canvas

The AI Use Case Canvas is a structured one-page template for documenting and evaluating a candidate use case. It ensures that every use case is described consistently and completely, making comparison and prioritisation straightforward.

### Canvas Fields

| Field | Description | Example |
|---|---|---|
| **Use Case Name** | A concise, descriptive title. | "Automated Invoice GL Coding" |
| **Business Owner** | The executive or manager who owns the business outcome. | VP of Finance |
| **Problem Statement** | What problem does this use case solve? For whom? Why does it matter? | "Finance analysts spend 4,000 hours/year manually coding invoices to the correct GL account, with a 7% error rate." |
| **AI Hypothesis** | What AI capability could address the problem, and what outcome do we expect? | "An NLP classification model trained on historical invoice-GL pairs will achieve 90%+ accuracy, reducing manual effort by 70% and errors by 50%." |
| **Target Users** | Who will interact with the AI system? How will it change their workflow? | "Accounts payable analysts will review AI-suggested GL codes and override when necessary." |
| **Data Requirements** | What data is needed? Where does it reside? What is its quality? | "3 years of invoice line items with GL codes from SAP. Data quality is moderate — requires cleaning of free-text descriptions." |
| **AI Capability** | What type of AI is required? (Classification, NLP, vision, generation, etc.) | "Multi-class text classification" |
| **Integration Points** | What systems must the AI connect to? | "SAP S/4HANA invoice processing module, document management system" |
| **Success Metrics** | How will we measure success? What is the target? | "Classification accuracy > 90%, analyst time reduction > 60%, error rate < 3%" |
| **Estimated Value** | What is the expected annual financial impact? | "$1.2M in labour savings + $0.3M in error-reduction benefits" |
| **Risk Assessment** | What are the key risks? (Technical, operational, ethical, regulatory) | "Medium technical risk (free-text variability). Low ethical risk (no personal data in GL coding). Low regulatory risk." |
| **Dependencies** | What must be true for this use case to succeed? | "SAP data extraction pipeline must be operational. Finance team must agree to new workflow." |
| **Time to PoC** | How long to validate feasibility? | "6 weeks" |
| **Reusability** | Does the underlying capability serve other use cases? | "Yes — the same NLP classification engine can be applied to expense categorisation, contract clause tagging, and support ticket routing." |

### Using the Canvas

- **During discovery** — complete a canvas for every use case that passes initial screening. The act of filling in each field often reveals gaps in understanding that must be addressed before proceeding.
- **During prioritisation** — use canvases side by side to compare use cases on a common basis.
- **During PoC planning** — the canvas becomes the input document for the PoC project charter.
- **During stakeholder communication** — canvases provide a standardised, jargon-light format for presenting use cases to executive sponsors.

---

## Framework 6: Industry-Specific Use Case Libraries

While every organisation's context is unique, there are well-established patterns of AI application within each industry. Maintaining an industry-specific use case library accelerates discovery by providing a starting checklist of proven opportunities.

### Building Your Library

1. **Start with published references** — consulting firms (McKinsey, BCG, Deloitte), technology vendors (Google, Microsoft, AWS), and industry associations regularly publish AI use case compendiums.
2. **Add peer benchmarks** — gather intelligence from industry conferences, peer networks, and analyst briefings about what competitors and leaders are deploying.
3. **Incorporate your own experience** — as you complete PoCs and production deployments, add them to the library with actual performance data.
4. **Tag for reuse** — classify each use case by AI capability, data domain, integration pattern, and business function to enable cross-referencing.

### Sample Library Entries by Industry

**Financial Services:**

| Use Case | AI Capability | Typical ROI Range |
|---|---|---|
| Transaction fraud detection | Anomaly detection, classification | $5-50M annual loss reduction |
| Credit scoring enhancement | Ensemble classification | 10-20% reduction in default rate |
| Customer churn prediction | Survival analysis, classification | 5-15% retention improvement |
| Regulatory document analysis | NLP, entity extraction | 30-50% analyst time savings |
| Algorithmic trade execution | Reinforcement learning, time-series | 2-8 bps execution improvement |

**Healthcare:**

| Use Case | AI Capability | Typical ROI Range |
|---|---|---|
| Medical image analysis | Computer vision, classification | 15-30% improvement in detection sensitivity |
| Clinical trial matching | NLP, knowledge graphs | 30-50% reduction in recruitment time |
| Hospital readmission prediction | Classification, time-series | 10-20% reduction in 30-day readmissions |
| Drug interaction detection | Knowledge graphs, NLP | Reduction in adverse events |
| Revenue cycle optimisation | Classification, NLP | 5-15% improvement in clean claim rate |

**Manufacturing:**

| Use Case | AI Capability | Typical ROI Range |
|---|---|---|
| Predictive maintenance | Time-series, anomaly detection | 20-40% reduction in unplanned downtime |
| Visual quality inspection | Computer vision | 50-80% reduction in defect escape rate |
| Demand forecasting | Time-series, ensemble methods | 15-30% reduction in forecast error |
| Supply chain optimisation | Optimisation, simulation | 5-15% cost reduction |
| Energy consumption optimisation | Reinforcement learning, time-series | 10-20% energy savings |

**Retail:**

| Use Case | AI Capability | Typical ROI Range |
|---|---|---|
| Product recommendation | Collaborative filtering, deep learning | 10-30% increase in average order value |
| Dynamic pricing | Reinforcement learning, time-series | 2-8% margin improvement |
| Inventory optimisation | Forecasting, optimisation | 15-25% reduction in stockouts |
| Customer sentiment analysis | NLP, classification | Faster response to brand issues |
| Store layout optimisation | Computer vision, simulation | 3-7% increase in conversion rate |

---

## Framework 7: Prioritisation Criteria

Once you have a longlist of candidate use cases, you need a consistent scoring system to rank them. The following multi-criteria framework provides a balanced evaluation.

### Scoring Dimensions

| Dimension | Weight (Example) | Scoring Guide |
|---|---|---|
| **Strategic alignment** | 25% | 5 = Directly supports a top-3 corporate priority. 1 = Tangentially related. |
| **Business impact** | 25% | 5 = >$5M annual value. 3 = $1-5M. 1 = <$500K. (Adjust thresholds to your scale.) |
| **Data readiness** | 15% | 5 = Clean, labelled, accessible data exists. 1 = Data must be created from scratch. |
| **Technical feasibility** | 15% | 5 = Proven approach, available tools. 1 = Research-grade problem, no established methods. |
| **Organisational readiness** | 10% | 5 = Engaged sponsor, willing users, clear process. 1 = Resistance, unclear ownership. |
| **Reusability** | 10% | 5 = Capability serves 5+ future use cases. 1 = Single-purpose. |

### Calibration Tips

- **Anchor on real examples.** Before scoring, calibrate the group by scoring two or three well-understood use cases together.
- **Score independently first.** Use blind scoring to prevent the highest-ranking person in the room from anchoring the group.
- **Discuss divergence.** When scores for a use case vary by more than 2 points on any dimension, discuss the reasons before averaging.
- **Revisit weights.** The example weights above are starting points. Adjust them to reflect your organisation's current strategic emphasis.

---

## Framework 8: Innovation Workshops

Innovation workshops bring together diverse participants to generate and qualify AI use cases in an intensive, time-boxed format.

### Workshop Design

**Participants (15-30 people):**

- Business unit leaders and subject-matter experts (60% of the room).
- Data scientists and engineers (25%).
- Risk, legal, and compliance representatives (15%).

**Duration:** Full day (8 hours) or two half-days.

**Pre-work:**

- Distribute a primer on AI capabilities (what AI can and cannot do today) — written in plain language.
- Ask participants to bring one "problem brief" describing a pain point or opportunity in their function.

**Agenda:**

| Time | Activity | Purpose |
|---|---|---|
| 09:00-09:30 | Opening & context | Set strategic context, share discovery objectives. |
| 09:30-10:00 | AI capability briefing | Demonstrate current AI capabilities with live demos. |
| 10:00-11:00 | Problem pitches | Each participant pitches their problem brief (2 min each). |
| 11:00-11:15 | Break | |
| 11:15-12:30 | Small-group ideation | Groups of 5 brainstorm AI solutions for selected problems. Use AI Use Case Canvas. |
| 12:30-13:30 | Lunch | |
| 13:30-14:30 | Data feasibility check | Data and engineering experts assess data availability for top ideas. |
| 14:30-15:30 | Scoring and prioritisation | Groups score use cases using the multi-criteria framework. |
| 15:30-15:45 | Break | |
| 15:45-16:30 | Pitch-back | Each group pitches their top-ranked use case to the full room. |
| 16:30-17:00 | Synthesis and next steps | Identify top 5-10 use cases for further investigation. Assign owners. |

### Workshop Facilitation Tips

- **Use physical artefacts.** Print large-format AI Use Case Canvases and provide sticky notes, markers, and dot-voting stickers. Physical engagement produces better ideation than purely digital formats.
- **Rotate data experts.** Have data scientists and engineers rotate between groups during the ideation phase to provide immediate feasibility feedback.
- **Capture everything.** Photograph all artefacts. Appoint a scribe for each group. The ideas that are not selected today may become priorities tomorrow.
- **Follow up within one week.** Momentum from workshops decays rapidly. Within five business days, distribute the prioritised use case list and assign investigation owners.

---

## Bottom-Up vs. Top-Down Discovery

Most organisations benefit from a blended approach, but understanding the strengths and limitations of each orientation is critical.

### Top-Down Discovery

**Approach:** Start with strategic objectives and work downward to identify use cases that support them.

**Strengths:**

- Ensures alignment with corporate strategy.
- Engages senior sponsors early.
- Focuses resources on the highest-value areas.

**Limitations:**

- May miss operational opportunities invisible to senior leaders.
- Can produce abstract use cases ("use AI to improve customer experience") that lack specificity.
- Risks becoming a top-down mandate that encounters bottom-up resistance.

**When to use:** At the start of an AI programme, during annual strategic planning, or when the organisation needs to refocus after a period of unfocused experimentation.

### Bottom-Up Discovery

**Approach:** Gather ideas from frontline teams, operational managers, and domain experts, then filter upward for strategic relevance.

**Strengths:**

- Surfaces practical, high-specificity use cases grounded in real workflows.
- Builds grassroots engagement and ownership.
- Often identifies "low-hanging fruit" that delivers quick wins and builds momentum.

**Limitations:**

- May produce a fragmented portfolio of small, disconnected use cases.
- Can lack strategic coherence.
- Risks overwhelming the pipeline with more ideas than the organisation can evaluate.

**When to use:** To refresh the pipeline, to build AI literacy and engagement across the organisation, or when top-down mandates have stalled due to lack of concrete implementation ideas.

### The Blended Model

The most effective CAIO organisations run both processes in parallel:

1. **Top-down strategic themes** define the "hunting grounds" — the business functions and strategic objectives where AI investment is prioritised.
2. **Bottom-up discovery** within those hunting grounds surfaces specific, actionable use cases.
3. **Cross-functional review** ensures the portfolio is balanced, reusable capabilities are identified, and nothing critical is missed.

---

## Rapid Prototyping Approaches for Discovery

At the discovery stage, "prototyping" does not mean building a production model. It means creating just enough evidence to make a go/no-go decision on proceeding to a formal PoC.

### Types of Discovery Prototypes

| Prototype Type | Effort | Purpose |
|---|---|---|
| **Data audit** | 1-3 days | Assess whether the required data exists, is accessible, and is of sufficient quality. |
| **Benchmark model** | 3-5 days | Train a simple baseline model (logistic regression, pre-trained LLM prompt) on available data to test whether the signal exists. |
| **Workflow mockup** | 2-3 days | Create a clickable prototype showing how AI output would integrate into the user's workflow. Test with end users. |
| **Economic model** | 1-2 days | Build a spreadsheet model projecting the financial impact under optimistic, base, and pessimistic accuracy scenarios. |
| **Competitor scan** | 1-2 days | Research whether competitors or peers have deployed similar capabilities. Assess vendor solutions. |

### Decision Gates

After rapid prototyping, each use case passes through a decision gate:

- **Green light** — proceed to formal PoC. The data exists, the signal appears viable, the economics are compelling, and a business owner is engaged.
- **Amber light** — invest in an enabler first. Typically, the use case is promising but blocked by a data gap, infrastructure gap, or organisational readiness gap.
- **Red light** — archive the use case. The data does not support it, the economics are marginal, or the risk profile is unacceptable.

---

## Real-World Discovery Examples

### Example 1: Global Bank — Regulatory Compliance

**Context:** A global bank with operations in 40 countries spent $200 million annually on regulatory compliance staff who manually reviewed regulatory updates, assessed applicability, and updated internal policies.

**Discovery approach:** Blended. Top-down strategic priority was "reduce compliance cost by 30% while improving coverage." Bottom-up interviews with compliance officers across five regions surfaced the specific pain points.

**Key findings:**

- Compliance officers spent 60% of their time reading and summarising regulatory documents.
- Each jurisdiction published updates in different formats, languages, and frequencies.
- The bank's existing regulatory change management system was rule-based and missed 15% of relevant changes.

**Use cases identified:**

1. **Regulatory change detection** — NLP model to monitor regulatory publications across jurisdictions, classify relevance, and generate summaries.
2. **Policy gap analysis** — semantic comparison of new regulations against existing internal policies to identify gaps.
3. **Compliance report generation** — generative AI to draft compliance impact assessments for analyst review.

**Outcome:** The three use cases shared a common NLP/GenAI capability stack. The bank pursued them as a platform investment rather than three separate projects, achieving $45 million in annual savings within two years.

### Example 2: Logistics Company — Warehouse Operations

**Context:** A logistics company operating 200 warehouses globally wanted to apply AI but had no prior AI experience.

**Discovery approach:** Bottom-up. The company ran innovation workshops at five representative warehouses, supplemented by process mining of warehouse management system (WMS) event logs.

**Key findings from workshops:**

- Warehouse managers identified manual quality inspection of incoming goods as the biggest time sink.
- Shift supervisors described difficulty predicting daily labour requirements.
- Forklift operators mentioned frequent congestion in certain aisles at predictable times.

**Key findings from process mining:**

- 18% of pick paths were suboptimal, adding an average of 23 seconds per pick.
- Order batching algorithms were static and did not account for real-time warehouse state.
- Dock scheduling had a 35% variance from planned arrival times.

**Use cases identified:**

1. **Visual quality inspection** — computer vision for incoming goods inspection.
2. **Labour demand forecasting** — time-series model predicting daily labour requirements by warehouse.
3. **Dynamic pick-path optimisation** — reinforcement learning for real-time path routing.
4. **Dock scheduling prediction** — time-series model predicting actual arrival times for dock allocation.

**Outcome:** The company prioritised labour demand forecasting (highest ROI, lowest technical risk, reusable across all 200 warehouses) as its first PoC, delivering a 12% improvement in labour utilisation and building organisational confidence to tackle more complex use cases.

### Example 3: Healthcare System — Patient Flow

**Context:** A regional healthcare system with 12 hospitals sought to reduce emergency department (ED) wait times, which averaged 4.2 hours and were driving patient complaints and regulatory scrutiny.

**Discovery approach:** Design thinking. A cross-functional team of ED physicians, nurses, hospital administrators, data analysts, and IT staff participated in a two-day design-thinking workshop.

**Key insights from empathy stage:**

- Nurses spent significant time on triage documentation that could be partially automated.
- Bed management relied on phone calls and whiteboards, with no real-time visibility.
- Discharge predictions were based on physician intuition, varying widely in accuracy.

**Use cases identified:**

1. **AI-assisted triage documentation** — NLP model to draft triage notes from structured input, reducing nurse documentation time.
2. **Real-time bed management** — predictive model for bed availability based on discharge likelihood, admission patterns, and surgical schedules.
3. **Discharge prediction** — classification model predicting next-day discharges to enable proactive bed planning.
4. **ED demand forecasting** — time-series model predicting hourly ED arrivals for staffing optimisation.

**Outcome:** The healthcare system began with ED demand forecasting and discharge prediction, which together reduced average ED wait times by 38 minutes within six months.

---

## Building a Sustainable Discovery Engine

Discovery is not a one-time event. The most effective organisations build a continuous discovery engine:

### Standing Mechanisms

- **AI idea portal** — a simple web form where any employee can submit an AI idea at any time, with a commitment to respond within two weeks.
- **Quarterly discovery sprints** — two-week sprints dedicated to refreshing the use case pipeline, including interviews, workshops, and process mining.
- **AI office hours** — weekly drop-in sessions where business teams can discuss potential AI applications with data scientists.
- **Embedded AI translators** — team members who sit within business functions and continuously identify opportunities, translating business problems into AI hypotheses.

### Governance

- **Monthly pipeline review** — the AI leadership team reviews the use case pipeline, assessing new candidates, updating scores for existing ones, and retiring stale ideas.
- **Annual portfolio rebalance** — a comprehensive review of the entire AI portfolio to ensure alignment with updated strategic priorities.
- **Feedback loops** — insights from PoCs and production deployments feed back into the discovery process, refining scoring criteria and improving future estimates.

---

## Common Discovery Pitfalls

| Pitfall | Description | Mitigation |
|---|---|---|
| **Solution-first thinking** | "We have GPT-4, what can we do with it?" | Always start with the business problem, then identify the right technology. |
| **HiPPO effect** | The Highest Paid Person's Opinion dominates use case selection. | Use blind scoring and structured criteria. |
| **Data optimism** | Assuming data exists and is clean without checking. | Require a data feasibility check before any use case passes screening. |
| **Scope creep** | A focused use case balloons into a programme-sized initiative. | Insist on hypothesis-level specificity: one process, one metric, one model. |
| **Discovery fatigue** | Too many workshops and interviews with no visible follow-through. | Commit to fast decisions and communicate outcomes of every discovery cycle. |
| **Ignoring change management** | Identifying technically feasible use cases without assessing whether users will adopt the solution. | Include organisational readiness as a scoring dimension. |

---

## Key Takeaways

- **Use multiple discovery methods.** No single framework captures the full landscape. Combine design thinking, opportunity mapping, stakeholder interviews, and process mining.
- **Frame every use case as a hypothesis.** Specificity accelerates evaluation and PoC design.
- **Score consistently.** A multi-criteria framework with calibrated weights enables fair comparison across use cases from different functions.
- **Prototype before committing.** Lightweight validation (data audit, benchmark model, workflow mockup) prevents wasted PoC investment.
- **Build a continuous engine.** Discovery is not a one-off event; it is a standing organisational capability.
- **Balance top-down and bottom-up.** Strategic alignment and operational specificity are both essential.
- **Document with the AI Use Case Canvas.** Standardised documentation makes communication, comparison, and governance possible.
