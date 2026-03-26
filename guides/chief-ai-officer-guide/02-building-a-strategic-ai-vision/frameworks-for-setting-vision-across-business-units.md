# Frameworks for Setting Vision Across Business Units

## Introduction

The preceding chapters have equipped you with the analytical foundations for AI strategy: you understand how AI creates value (Chapter 1), how to measure that value (Chapter 2), and where your organisation stands on the readiness spectrum (Chapter 3). This chapter addresses the final—and in many ways most challenging—element of building a strategic AI vision: getting the entire enterprise aligned behind it.

Enterprise AI strategy is inherently a multi-stakeholder challenge. A global company with five business units, each operating in different markets with different customers, different competitive dynamics, and different operational realities, cannot simply impose a monolithic AI vision from the centre. Nor can it allow each business unit to pursue AI independently, creating a fragmented landscape of incompatible tools, duplicated efforts, and ungoverned deployments.

The CAIO's job is to navigate between these extremes: creating a vision that is coherent enough to capture enterprise-wide synergies and maintain governance standards, yet flexible enough to accommodate the legitimate diversity of business-unit needs. This chapter provides the frameworks, tools, and leadership approaches to do exactly that.

---

## The Enterprise AI Vision: What It Is and What It Is Not

### What an Enterprise AI Vision Is

An enterprise AI vision is a clear, compelling statement of how AI will transform the organisation's competitive position, operating model, and value creation over a defined time horizon—typically three to five years. It answers four questions:

1. **Why AI?** What are the strategic imperatives that make AI essential for this organisation?
2. **Where will AI create the most value?** Which business functions, customer segments, and competitive dimensions will be the primary targets?
3. **How will we build AI capabilities?** What operating model, talent approach, technology platform, and governance structure will we use?
4. **What does success look like?** What measurable outcomes will indicate that the vision is being realised?

### What an Enterprise AI Vision Is Not

- **Not a technology roadmap.** The vision describes business outcomes and strategic direction, not specific tools, platforms, or algorithms. Technology choices follow from strategy, not the other way around.
- **Not a project list.** The vision sets direction; the project portfolio is derived from it. A vision that reads like a list of AI projects is too tactical and too rigid.
- **Not a guarantee.** The vision describes an aspiration grounded in analysis. It will be refined as the organisation learns. Treating it as an immutable plan, rather than a living strategic compass, is a mistake.
- **Not a one-time exercise.** The vision should be reviewed and refreshed annually, with major revisions as the competitive landscape, technology capabilities, and organisational readiness evolve.

---

## Federated vs. Centralised AI Strategy

The most consequential structural decision in enterprise AI strategy is the degree of centralisation. This is not a binary choice—it is a spectrum with tradeoffs at every point.

### The Centralised Model

**Structure:** A single enterprise AI organisation (centre of excellence, AI lab, or AI division) owns the AI strategy, talent, platform, and project portfolio. Business units request AI services from the centre.

**Advantages:**
- **Efficiency.** Shared infrastructure, talent, and tools avoid duplication.
- **Consistency.** Common standards for data, governance, and responsible AI.
- **Strategic alignment.** The centre can prioritise projects based on enterprise value, not business-unit politics.
- **Talent development.** Concentrated AI talent creates deeper expertise and more attractive career paths.

**Disadvantages:**
- **Bottleneck.** The centre becomes a demand bottleneck when AI requests exceed capacity.
- **Disconnection.** Centralised teams may not understand business-unit contexts deeply enough.
- **Slow responsiveness.** Centralised approval and prioritisation processes add time.
- **Resentment.** Business-unit leaders who lack control over their AI resources become frustrated and disengaged.

**Best suited for:** Organisations early in their AI maturity (Levels 1–2), organisations with highly integrated business models, and organisations where governance and risk management are paramount (e.g., financial services, healthcare).

### The Federated Model

**Structure:** Each business unit has its own AI team and makes its own AI investment decisions. A small central team provides shared infrastructure, governance standards, and best-practice guidance—but does not control BU-level AI activities.

**Advantages:**
- **Speed.** Business units can move at their own pace without waiting for central approval.
- **Context.** AI teams embedded in business units understand local needs deeply.
- **Accountability.** Business-unit leaders own AI outcomes and are accountable for ROI.
- **Innovation.** Diverse approaches across business units create more opportunities for breakthrough.

**Disadvantages:**
- **Duplication.** Multiple teams solving similar problems independently, wasting resources.
- **Inconsistency.** Different data standards, tools, and governance practices across business units.
- **Fragmentation.** No enterprise-wide view of AI investments, risks, or opportunities.
- **Talent dilution.** AI talent spread thinly across business units lacks the critical mass for deep expertise.

**Best suited for:** Organisations with diverse, loosely coupled business units; organisations at higher AI maturity levels (3–4) where governance standards are already established; and organisations in fast-moving industries where speed is paramount.

### The Hub-and-Spoke Model (Recommended)

**Structure:** A central AI hub provides shared platform, governance, talent development, and strategic direction. Embedded AI spokes in each business unit execute AI projects using the shared platform and governance framework, with significant autonomy in project selection and execution.

**How it works:**

```
                    ┌─────────────────────────────┐
                    │     Enterprise AI Hub        │
                    │                             │
                    │  • AI platform & tools      │
                    │  • Data governance           │
                    │  • Responsible AI standards  │
                    │  • Talent development        │
                    │  • Strategic coordination    │
                    │  • Best-practice sharing     │
                    └─────────┬───────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
     ┌────────▼──────┐  ┌────▼───────┐  ┌────▼───────┐
     │  BU A Spoke   │  │  BU B Spoke│  │  BU C Spoke│
     │               │  │            │  │            │
     │ • Local AI    │  │ • Local AI │  │ • Local AI │
     │   projects    │  │   projects │  │   projects │
     │ • BU-specific │  │ • BU-spec. │  │ • BU-spec. │
     │   data        │  │   data     │  │   data     │
     │ • BU AI lead  │  │ • BU AI    │  │ • BU AI    │
     │               │  │   lead     │  │   lead     │
     └───────────────┘  └────────────┘  └────────────┘
```

**What the hub owns:**
- Enterprise AI platform (shared infrastructure, MLOps, tools)
- Data-governance standards and shared data assets
- Responsible-AI framework and audit processes
- Enterprise AI talent strategy (recruiting, development, rotation)
- Strategic portfolio management (cross-BU prioritisation, synergy identification)
- Best-practice repository and community of practice

**What the spokes own:**
- Business-unit AI strategy (aligned with enterprise vision)
- Project identification, prioritisation, and execution
- Business-unit-specific data and domain expertise
- Business-unit AI budget (within enterprise guidelines)
- Business-outcome accountability

**What is shared:**
- Platform resources (compute, storage, tools)
- Cross-trained talent (rotation programmes between hub and spokes)
- Governance standards (applied locally, audited centrally)
- Learnings and best practices (shared through community of practice)

### The Decision Framework

Use this framework to determine where your organisation should sit on the centralisation spectrum:

| Factor | Centralise | Federate |
|--------|-----------|----------|
| AI maturity | Low (Levels 1–2) | High (Levels 3–4) |
| Business-unit diversity | Low (similar BUs) | High (diverse BUs) |
| Data integration | High (shared data) | Low (separate data) |
| Regulatory requirements | High (need consistency) | Low (BU-specific regulation) |
| Talent availability | Scarce (must concentrate) | Abundant (can distribute) |
| Speed imperative | Moderate (can queue) | High (must move fast) |
| Governance priority | High (need control) | Moderate (trust BU judgment) |

Most organisations will find themselves in the middle—which is why the hub-and-spoke model is the most commonly recommended approach.

---

## The AI Vision Canvas

The AI Vision Canvas is a practical tool for translating abstract strategic ambition into a structured, actionable vision. It is designed to be completed collaboratively by the CAIO and business-unit leaders in a facilitated workshop setting.

### Canvas Structure

The canvas comprises nine elements, arranged to flow from strategic context (left) to execution plan (right):

```
┌─────────────────┬─────────────────┬─────────────────┐
│                 │                 │                 │
│  1. STRATEGIC   │  4. TARGET      │  7. OPERATING   │
│     CONTEXT     │     STATE       │     MODEL       │
│                 │                 │                 │
│  Why is AI      │  What does      │  How will we    │
│  essential for  │  success look   │  organise for   │
│  this org?      │  like in 3–5    │  AI? (Hub-spoke │
│                 │  years?         │  structure,     │
│                 │                 │  roles, etc.)   │
├─────────────────┼─────────────────┼─────────────────┤
│                 │                 │                 │
│  2. VALUE       │  5. CAPABILITY  │  8. GOVERNANCE  │
│     DRIVERS     │     GAPS        │     & RISK      │
│                 │                 │                 │
│  Which AI       │  What must we   │  How will we    │
│  value drivers  │  build, buy,    │  govern AI      │
│  matter most?   │  or partner     │  responsibly    │
│  (from Ch.1)    │  to get?        │  and manage     │
│                 │                 │  risk?          │
├─────────────────┼─────────────────┼─────────────────┤
│                 │                 │                 │
│  3. CURRENT     │  6. PRIORITY    │  9. SUCCESS     │
│     STATE       │     INITIATIVES │     METRICS     │
│                 │                 │                 │
│  Where are we   │  What are the   │  How will we    │
│  today?         │  top 5–10 AI    │  measure        │
│  (maturity      │  initiatives    │  success?       │
│  from Ch.3)     │  for Year 1?    │  (from Ch.2)    │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

### How to Complete the Canvas

**Element 1: Strategic Context**

Document the external and internal forces that make AI essential. This should include competitive threats, market opportunities, customer expectations, regulatory changes, and technology shifts. Draw from your industry analysis and competitive intelligence.

*Prompt questions:*
- What are the top 3 competitive threats that AI could help us address?
- What customer expectations are we failing to meet that AI could address?
- What market opportunities are opening up that require AI capabilities?
- What regulatory or compliance pressures make AI essential?

**Element 2: Value Drivers**

Identify the top 3–5 AI value drivers for your organisation, drawn from the taxonomy in Chapter 1. Rank them by strategic importance and estimated magnitude.

*Prompt questions:*
- Which value driver (efficiency, revenue, innovation, experience, risk) has the largest potential impact?
- Where do we have the strongest data foundation to pursue AI value?
- Which value drivers align most closely with our corporate strategic priorities?

**Element 3: Current State**

Summarise your maturity assessment from Chapter 3. Be honest—the canvas is useless if it is built on an inflated self-assessment.

*Prompt questions:*
- What is our overall maturity score? What are the dimension scores?
- Where are our biggest gaps relative to what we need?
- What existing AI capabilities can we build on?

**Element 4: Target State**

Describe the desired state in 3–5 years. This should be specific enough to guide decisions but flexible enough to accommodate learning and adaptation.

*Prompt questions:*
- What maturity level do we want to reach in each dimension?
- What should AI look like from a customer's perspective in 5 years?
- What should AI look like from an employee's perspective?
- What competitive advantage should AI provide?

**Element 5: Capability Gaps**

Identify the specific gaps between current state and target state across data, talent, infrastructure, culture, and governance. For each gap, indicate whether the plan is to build internally, buy/license, or partner.

**Element 6: Priority Initiatives**

List the top 5–10 AI initiatives for Year 1, with clear ownership, resource requirements, and expected outcomes. These should be drawn from the AI Value Matrix (Chapter 1): start with Quick Wins and Strategic Imperatives.

**Element 7: Operating Model**

Define the organisational structure for AI. Where on the centralised-to-federated spectrum will you operate? What roles and responsibilities exist at the hub and spoke levels?

**Element 8: Governance and Risk**

Outline the governance framework: model-review processes, responsible-AI standards, risk-management approach, regulatory-compliance strategy.

**Element 9: Success Metrics**

Define the top-level metrics from Chapter 2 that will be used to evaluate vision realisation. Include both near-term (Year 1) and long-term (Year 3–5) metrics.

---

## Stakeholder Alignment Workshops

The AI Vision Canvas should not be completed by the CAIO alone. It is most effective when developed through a structured workshop process that engages key stakeholders from across the enterprise.

### Workshop Design: The Three-Session Model

#### Session 1: Discovery and Diagnosis (Half Day)

**Objective:** Build shared understanding of the current state and the opportunity.

**Participants:** CAIO, business-unit leaders, CTO, CDO, CFO, CHRO

**Agenda:**

| Time | Activity | Output |
|------|----------|--------|
| 30 min | AI landscape briefing: trends, competitor moves, technology evolution | Shared context |
| 45 min | Maturity assessment presentation and discussion | Validated current-state assessment (Canvas Elements 1 & 3) |
| 45 min | Business-unit roundtable: each BU leader presents their top 3 AI opportunities and biggest barriers | Inventory of opportunities and barriers |
| 30 min | Value-driver prioritisation exercise (dot voting on value drivers) | Ranked value drivers (Canvas Element 2) |
| 30 min | Wrap-up and preparation for Session 2 | Homework: each BU develops 3 specific AI initiative proposals |

**Facilitation notes:**
- The maturity assessment often provokes debate. This is healthy—but the facilitator must keep the conversation constructive, focused on evidence rather than opinion.
- The BU roundtable is the most important part of Session 1. It surfaces the real needs and constraints that the vision must address. Give each BU leader uninterrupted time to present.
- Use anonymous dot voting for value-driver prioritisation to avoid the highest-ranking person's opinion dominating.

#### Session 2: Vision Crafting (Full Day)

**Objective:** Develop the AI vision and strategic direction collaboratively.

**Participants:** Same as Session 1, plus AI technical leads and selected BU AI champions

**Agenda:**

| Time | Activity | Output |
|------|----------|--------|
| 60 min | Target-state visioning exercise: "It is 2030—what does AI look like in our organisation?" | Draft target state (Canvas Element 4) |
| 60 min | Capability-gap analysis: map current state to target state across 5 dimensions | Gap inventory (Canvas Element 5) |
| 90 min | Initiative development: working groups develop the top AI initiatives for Year 1 | Initiative proposals with business cases (Canvas Element 6) |
| 60 min | Operating-model design: debate centralised vs. federated, define hub-and-spoke structure | Operating model (Canvas Element 7) |
| 60 min | Governance framework: define principles, processes, and accountability | Governance approach (Canvas Element 8) |
| 30 min | Success-metrics definition: select the top 10 enterprise AI metrics | Success metrics (Canvas Element 9) |
| 30 min | Synthesis: complete the AI Vision Canvas | Completed canvas |

**Facilitation notes:**
- The target-state visioning exercise works best when framed in concrete, human terms: "Tell me about a customer's experience with our company in 2030. Tell me about an employee's typical workday. Tell me about how we make pricing decisions." Abstract statements like "we will be an AI-first company" are not useful.
- The initiative-development working groups should be cross-functional (mix business and technical participants) and each group should develop a one-page business case including problem statement, AI approach, expected impact, data requirements, and resource needs.
- The operating-model discussion will be contentious. Use the decision framework from the federated-vs-centralised section to ground the debate in structured analysis rather than politics.

#### Session 3: Alignment and Commitment (Half Day)

**Objective:** Validate the vision, secure commitment, and launch execution.

**Participants:** All participants from Sessions 1 and 2, plus the CEO (for vision endorsement)

**Agenda:**

| Time | Activity | Output |
|------|----------|--------|
| 30 min | Vision presentation: CAIO presents the completed AI Vision Canvas | Shared understanding |
| 45 min | Challenge and refinement: structured critique from all participants | Refined vision |
| 30 min | CEO endorsement and remarks | Executive mandate |
| 45 min | Commitment ceremony: each BU leader commits to specific actions and metrics for Q1 | Signed commitment document |
| 30 min | Next steps: governance cadence, communication plan, immediate actions | Launch plan |

**Facilitation notes:**
- The CEO's participation in Session 3 is essential. It signals that AI vision is not a technology initiative—it is a business-transformation initiative with the highest level of executive support.
- The commitment ceremony is more than symbolic. Each BU leader should sign (physically or digitally) a document committing to specific AI initiatives, resource allocations, and outcome metrics for the first quarter. This creates accountability from day one.
- The communication plan (developed in the final segment) should include plans for cascading the vision to all employees within 30 days.

---

## Communicating Vision Across Functions

A vision that exists only in a strategy document is not a vision—it is a file. For the AI vision to drive behaviour, it must be communicated relentlessly, consistently, and in language that resonates with diverse audiences.

### Audience-Specific Communication

Different stakeholders need different framings of the same vision:

| Audience | Key Message | Language | Channel |
|----------|-------------|----------|---------|
| Board of directors | AI as competitive advantage and fiduciary responsibility | Financial, risk, governance | Quarterly board presentation |
| CEO and executive committee | AI as transformation lever for strategic priorities | Strategic, outcome-focused | Monthly executive review |
| Business-unit leaders | AI as a tool for hitting their specific targets | BU-specific metrics, use cases | Quarterly BU planning sessions |
| Middle management | AI as a way to make their teams more effective | Productivity, decision quality | Town halls, management meetings |
| Front-line employees | AI as a tool that helps them do their jobs better (not replaces them) | Practical, empathetic, specific | Team meetings, training sessions |
| IT and data teams | AI as the next evolution of their critical role | Technical, platform, architecture | Technical forums, architecture reviews |
| Customers | AI as a way the company is investing in better service | Experience, convenience, trust | Customer communications, product releases |
| Investors and analysts | AI as a driver of long-term value creation | Financial, competitive, forward-looking | Earnings calls, investor days |

### The Vision Narrative Arc

Effective AI vision communication follows a narrative arc that moves from context to aspiration to action:

**1. The Burning Platform (Why change?)**
- Competitive threats and market shifts
- Customer expectations that are not being met
- Cost structures that are unsustainable
- Opportunities being captured by competitors

**2. The Promised Land (What does success look like?)**
- Vivid description of the future state
- Concrete examples of how AI will change customer experiences, employee work, and business performance
- Quantified impact expectations

**3. The Path Forward (How will we get there?)**
- Strategic priorities (top 3–5)
- Operating model and governance
- Key milestones and timelines

**4. The Call to Action (What do you need to do?)**
- Specific asks for each audience
- How to get involved, learn more, contribute ideas
- Where to find resources and support

### Communication Cadence

| Activity | Frequency | Owner | Audience |
|----------|-----------|-------|----------|
| AI vision townhall | Annual (with quarterly updates) | CAIO + CEO | All employees |
| AI progress newsletter | Monthly | AI communications lead | All employees |
| BU AI review | Quarterly | CAIO + BU leaders | Business-unit teams |
| AI showcase (demo day) | Quarterly | AI teams | Open to all employees |
| Board AI update | Quarterly | CAIO | Board of directors |
| External AI report | Annual | Corporate communications | Investors, analysts, customers |

---

## Balancing Local Autonomy with Enterprise Standards

One of the most persistent tensions in enterprise AI strategy is balancing business-unit autonomy with enterprise-wide standards. Too much autonomy creates fragmentation; too many standards create bureaucracy. The solution is to be deliberate about what is standardised and what is not.

### The Standards Spectrum

| Category | Mandate (No Autonomy) | Guideline (Recommended) | Discretion (Full Autonomy) |
|----------|-----------------------|-------------------------|---------------------------|
| **Data governance** | Data-quality standards, privacy compliance, data-classification policies | Data-architecture patterns, cataloguing tools | BU-specific data-collection methods, domain-specific data models |
| **AI platform** | Core infrastructure (cloud provider, MLOps platform, model registry) | Development tools, experiment-tracking tools | BU-specific analytical tools, visualisation preferences |
| **Responsible AI** | Bias testing, explainability requirements, ethics review for high-risk use cases | Fairness metrics, transparency standards | Communication approach for AI features, customer-facing AI language |
| **Talent** | Role definitions, compensation bands, performance-evaluation criteria | Recruiting sources, interview processes | Team structure, work arrangements, project assignments |
| **Governance** | Model-review process, AI-system inventory, incident-reporting process | Review-frequency guidelines, documentation standards | BU-specific risk-assessment approaches for low-risk use cases |
| **Use-case selection** | Enterprise-level strategic priorities, minimum-ROI thresholds | Use-case evaluation framework, prioritisation criteria | BU-specific project selection, pilot design, execution approach |

### The Golden Rules

These are non-negotiable standards that apply across all business units:

1. **Every AI system in production must be in the enterprise AI inventory.** No exceptions. This is essential for governance, risk management, and regulatory compliance.

2. **All AI models must pass the enterprise responsible-AI review before production deployment.** The depth of review is proportional to risk, but the process is mandatory.

3. **All AI development must use the enterprise AI platform.** This ensures consistency, security, and cost management. BUs may request platform extensions, but shadow AI infrastructure is not permitted.

4. **All AI projects must have a named business sponsor and defined business-outcome metrics.** This prevents technology-driven projects that lack business accountability.

5. **All AI data must comply with enterprise data-governance standards.** Data quality, privacy, security, and lineage requirements are non-negotiable.

### The Autonomy Zones

Within the golden rules, business units have significant freedom:

- **Which problems to solve.** BUs choose which AI use cases to pursue, based on their strategic priorities and opportunities, using the enterprise prioritisation framework.
- **How to execute.** BUs determine project timelines, team composition, development methodology, and stakeholder-engagement approach.
- **How to measure local success.** BUs define BU-specific metrics alongside the enterprise metrics.
- **How to communicate locally.** BUs adapt the enterprise AI vision into messages that resonate with their specific teams and customers.
- **How to innovate.** BUs are encouraged to experiment with novel applications of AI, as long as they comply with governance standards.

---

## Vision-to-Execution Translation

A vision without execution is a hallucination. The CAIO must ensure that the vision translates into concrete action at every level of the organisation.

### The Vision-Execution Bridge

```
AI VISION (3–5 year aspiration)
        │
        ▼
STRATEGIC THEMES (3–5 multi-year priorities)
        │
        ▼
ANNUAL AI PLAN (this year's objectives and resource allocation)
        │
        ▼
QUARTERLY OKRs (90-day goals and key results)
        │
        ▼
SPRINT/PROJECT PLANS (2–4 week execution cycles)
        │
        ▼
DAILY WORK (individual and team tasks)
```

### Example: From Vision to Daily Work

**Vision:** "By 2030, AI will be embedded in every customer interaction, operational process, and strategic decision, enabling us to deliver personalised experiences at scale, operate with industry-leading efficiency, and innovate faster than any competitor."

**Strategic Theme (Year 1–3):** "AI-Powered Customer Personalisation"

**Annual Plan (Year 1):** "Deploy AI-powered personalisation across all digital customer touchpoints, targeting a 20% increase in recommendation-driven revenue."

**Q1 OKR:**
> Objective: Launch AI recommendation engine on the primary e-commerce platform.
> KR1: Model trained and validated with precision@10 > 0.40
> KR2: A/B test shows >10% revenue lift vs. control
> KR3: System handles >5,000 requests/second with <100ms latency

**Sprint Plan (Week 1–2):** "Complete feature engineering for recommendation model using last 24 months of transaction data."

**Daily Work:** "Today I am building the collaborative-filtering feature pipeline using the enterprise feature store."

At every level, the individual can trace their work back to the enterprise AI vision. This line of sight is what transforms a strategy document into organisational momentum.

---

## Change Management for AI Vision

### Why Change Management Matters for AI

AI adoption is fundamentally a change-management challenge, not a technology challenge. Research consistently shows that the primary barriers to AI adoption are organisational—resistance to change, lack of skills, unclear leadership, misaligned incentives—not technical.

### The ADKAR Framework Applied to AI

The ADKAR model (Awareness, Desire, Knowledge, Ability, Reinforcement) provides a structured approach to managing the human side of AI transformation:

**Awareness:** Employees understand why AI is being adopted and what it means for the organisation.
- Executive communications explaining the AI vision and its rationale
- Industry context: what competitors are doing, what customers expect
- Honest conversation about what AI will and will not change about people's jobs

**Desire:** Employees want to participate in the AI transformation.
- Clear articulation of "what is in it for me" (career development, more interesting work, less drudgery)
- AI champions and ambassadors who model enthusiasm and engagement
- Recognition and rewards for AI adoption and experimentation
- Addressing fears directly: job-displacement concerns, skill-obsolescence anxiety

**Knowledge:** Employees know how to work with AI tools and processes.
- AI literacy training for all employees (what AI is, how it works, what it can and cannot do)
- Role-specific training on AI tools and workflows
- Hands-on workshops and sandbox environments for experimentation
- Peer learning through AI community of practice

**Ability:** Employees can apply their knowledge in practice.
- Dedicated time for learning and experimentation (not just "on top of your day job")
- Help-desk and support resources for AI tool users
- Manager coaching on how to integrate AI into team workflows
- Gradual rollout with feedback loops and iteration

**Reinforcement:** New AI-augmented behaviours become the norm.
- Recognition of AI adoption in performance reviews
- Success stories shared widely (AI showcase events, newsletters)
- Metrics that track adoption and impact (from Chapter 2)
- Continuous improvement of AI tools based on user feedback
- Leaders modelling AI-augmented behaviour

### The Resistance Map

Not all resistance is the same. Understanding the sources of resistance enables targeted interventions:

| Resistance Type | Source | Intervention |
|----------------|--------|-------------|
| Fear of job loss | Employees worried AI will replace them | Reskilling programmes, redeployment commitments, honest conversation about which roles will change |
| Skill anxiety | Employees worried they cannot learn new tools | Low-pressure training, peer support, incremental exposure |
| Scepticism | Leaders who have seen failed technology initiatives before | Early wins that demonstrate tangible value, transparent reporting |
| Autonomy threat | Business-unit leaders who resent centralised AI mandates | Hub-and-spoke model, meaningful BU autonomy within enterprise standards |
| Data territorialism | Departments that view their data as "theirs" | Clear data-governance policies, demonstration of mutual benefit |
| Not-invented-here | Technical teams that prefer their own tools and approaches | Involvement in platform selection, contribution opportunities |
| Ethical concern | Employees with genuine concerns about AI fairness, privacy, or societal impact | Robust responsible-AI framework, ethics committee with employee representation |

---

## Governance of Cross-BU AI Initiatives

### The AI Strategy Council

The primary governance body for cross-BU AI initiatives should be an AI Strategy Council that operates with the authority of the executive committee.

**Composition:**
- CAIO (chair)
- Business-unit AI sponsors (one per BU)
- CTO or VP Engineering
- CDO or VP Data
- CFO representative
- CHRO representative
- General Counsel or Chief Ethics Officer
- External advisor (optional, for independent perspective)

**Responsibilities:**
- Approve enterprise AI vision and strategy (annually)
- Review and approve the enterprise AI portfolio (quarterly)
- Allocate cross-BU AI resources and resolve prioritisation conflicts
- Monitor enterprise AI KPIs and OKRs
- Approve high-risk or high-investment AI initiatives
- Oversee AI governance and responsible-AI compliance
- Commission AI audits and respond to audit findings

**Meeting cadence:**
- Monthly meetings (2 hours) for portfolio review and operational decisions
- Quarterly deep dives (half day) aligned with the AI QBR
- Annual strategy session (full day) for vision refresh and strategic-plan approval

### Cross-BU Initiative Governance

Some AI initiatives span multiple business units—shared platforms, enterprise-wide deployments, cross-BU data initiatives. These require specific governance mechanisms:

**1. Joint steering committee.** For each major cross-BU initiative, establish a steering committee with representatives from all affected BUs, plus the hub team. The committee meets bi-weekly during active execution.

**2. Shared funding model.** Cross-BU initiatives should be funded from the enterprise AI budget, not from any single BU's budget. This avoids the "who pays?" debate that kills cross-BU collaboration.

**3. Benefit-sharing agreement.** Before launching a cross-BU initiative, agree on how the benefits will be allocated and measured. This prevents disputes later and ensures that all BUs have incentives to participate.

**4. Integration architecture.** Cross-BU initiatives require agreement on data-sharing protocols, API standards, and integration patterns. The hub team should own the integration architecture, with input from all spokes.

---

## Real-World Examples of Multi-BU AI Strategies

### Example 1: A Diversified Industrial Conglomerate

**Context:** A $70 billion conglomerate with four major business units: aviation, healthcare, energy, and transportation. Each BU operates in a distinct market with different customers, competitors, and regulatory environments.

**AI vision:** "AI will be the connective tissue that turns our diversified portfolio from a collection of independent businesses into an integrated system that learns, adapts, and innovates faster than any single-industry competitor."

**Operating model:** Hub-and-spoke with strong hub

| Hub Responsibilities | Spoke Responsibilities |
|---------------------|----------------------|
| Enterprise AI platform (cloud, MLOps, tools) | BU-specific AI projects and deployments |
| Shared AI research lab (focused on cross-cutting capabilities: computer vision, NLP, time-series analysis) | Domain-specific model development |
| Enterprise data governance and shared data assets | BU-specific data collection and management |
| Responsible AI framework and audit | BU-specific risk assessment (within framework) |
| AI talent strategy and rotation programme | BU-specific hiring and team management |

**Cross-BU synergies identified:**
- **Predictive maintenance:** All four BUs have heavy equipment with sensor data. A shared predictive-maintenance platform (models, data pipelines, monitoring) serves all four BUs, with BU-specific tuning.
- **Computer vision:** Quality inspection (aviation, healthcare), safety monitoring (energy), and traffic analysis (transportation) all require computer-vision capabilities. A shared CV platform reduces development time for each BU.
- **Customer analytics:** Shared approaches to customer segmentation, churn prediction, and lifetime-value modelling, adapted to each BU's customer base.

**Results after 2 years:**
- $180M in annual AI value across all four BUs
- 30% reduction in AI development time through shared platform and reusable components
- Cross-BU AI talent rotation programme producing "T-shaped" professionals with broad AI knowledge and deep domain expertise
- Three cross-BU AI products launched (predictive-maintenance-as-a-service, AI-powered environmental monitoring, fleet-optimisation platform)

### Example 2: A Global Retail Bank

**Context:** A $30 billion-revenue global retail bank with operations in 15 countries, organised by geography (Americas, EMEA, Asia-Pacific) and product line (consumer banking, wealth management, commercial banking).

**AI vision:** "Every customer interaction will be intelligent, every risk decision will be data-driven, and every operational process will be optimised by AI—delivered consistently across all geographies while respecting local market and regulatory differences."

**Operating model:** Hub-and-spoke with medium hub, strong spokes

The bank's AI strategy recognised that regulatory and cultural differences across geographies required significant local autonomy. The hub focused on platform, governance, and shared models; the spokes had substantial independence in execution.

**Key design decisions:**
1. **Shared models with local fine-tuning.** Fraud-detection models were trained on global data (capturing broad patterns) and fine-tuned on local data (capturing geography-specific patterns). This produced better-performing models than either global-only or local-only approaches.
2. **Regulatory-compliance framework with local implementation.** The hub established the overall responsible-AI framework (bias testing, explainability, privacy); each geography implemented it according to local regulatory requirements (GDPR in EMEA, CCPA in Americas, PDPA in Asia-Pacific).
3. **Talent rotation across geographies.** AI professionals rotated across geographies on 12–18 month assignments, building both technical capability and cross-cultural understanding.

**Results after 3 years:**
- $250M in annual AI value (fraud prevention: $80M; personalisation: $90M; efficiency: $50M; risk management: $30M)
- AI deployed in all 15 countries, with consistent governance and locally adapted execution
- Customer NPS improved by 12 points in segments served by AI-personalised experiences
- Regulatory zero findings related to AI across all geographies

### Example 3: A Multi-Brand Consumer Products Company

**Context:** A consumer-products company with 12 major brands across food, beverages, personal care, and household products. Each brand has its own marketing team, supply chain, and P&L.

**AI vision:** "AI will enable each brand to deliver personalised consumer experiences while the enterprise captures scale advantages in supply-chain optimisation, consumer insight, and innovation."

**Operating model:** Light hub, strong spokes

Given the high autonomy of individual brands, the company adopted a light-hub model that focused on shared infrastructure and standards rather than centralised project execution.

**Hub provided:**
- Enterprise AI platform (cloud, tools, MLOps)
- Consumer-data platform (shared first-party data across brands, with strict privacy controls)
- AI playbooks (reusable patterns for common use cases: demand forecasting, content optimisation, consumer segmentation)
- Responsible AI standards
- AI talent community of practice (monthly meetups, annual conference, shared Slack channel)

**Brands executed:**
- Brand-specific AI projects (personalisation, creative optimisation, social-media analytics)
- Brand-specific consumer insights and segmentation
- Brand-specific marketing and media optimisation

**Cross-brand synergies:**
- Demand-forecasting models shared a common architecture but were trained on brand-specific data
- Consumer-data platform enabled cross-brand insights (e.g., understanding consumer baskets across brands)
- Shared AI playbooks reduced time-to-deploy for common use cases by 40%

**Results after 2 years:**
- $120M in annual AI value across all brands
- Marketing-efficiency improvement of 18% through AI-optimised media spend
- Demand-forecasting accuracy improved by 22%, reducing inventory waste across all supply chains
- 8 of 12 brands actively using AI in production (up from 2 at the start)

---

## Key Takeaways

1. **Enterprise AI vision is a multi-stakeholder alignment challenge, not a technology challenge.** The CAIO must be as skilled in facilitation, communication, and change management as in AI technology.

2. **The hub-and-spoke operating model** is the most effective structure for most enterprises—providing shared platform and governance from the hub with execution autonomy at the spokes.

3. **The AI Vision Canvas** provides a structured, collaborative tool for translating abstract ambition into actionable strategy. Complete it through facilitated workshops, not in isolation.

4. **Communicate the vision relentlessly** and in audience-specific language. The board needs financial language. Employees need practical, empathetic language. Customers need experience-focused language.

5. **Balance standards and autonomy deliberately.** Mandate what must be consistent (governance, platform, data standards). Free what should be flexible (project selection, execution approach, local communication).

6. **Change management is the critical success factor.** Use frameworks like ADKAR to systematically address the human side of AI transformation. Map resistance and address each source specifically.

7. **Govern cross-BU initiatives with shared funding, benefit-sharing agreements, and joint steering committees.** Without these mechanisms, cross-BU collaboration collapses under the weight of competing priorities and unclear accountability.

8. **Translate vision to execution through the cascade:** vision to strategic themes to annual plans to quarterly OKRs to sprint plans to daily work. Every individual should be able to trace their work back to the enterprise AI vision.

9. **The AI Strategy Council** is the primary governance body for enterprise AI. It must have real authority, cross-functional representation, and a disciplined meeting cadence.

10. **Learn from real-world examples.** No two enterprises are identical, but the patterns—hub-and-spoke models, shared platforms with local execution, cross-BU synergies, talent rotation—are remarkably consistent across successful multi-BU AI strategies.

---

## Conclusion: The Complete Strategic Architecture

With this chapter, the strategic architecture for building an enterprise AI vision is complete:

1. **Drivers of AI Value** (Chapter 1) established *why* AI matters and *where* value comes from.
2. **Mapping AI to KPIs and OKRs** (Chapter 2) established *how* to measure whether value is being realised.
3. **Enterprise AI Readiness: Maturity Roadmap** (Chapter 3) established *where you are starting from* and *how to build capability over time*.
4. **Frameworks for Setting Vision Across Business Units** (this chapter) established *how to align the enterprise* and *translate vision into action*.

Together, these four chapters form a complete, integrated approach to building a strategic AI vision. The next section of this book—Evaluating Emerging AI Technologies—shifts from strategy to technology, helping you understand the capabilities, trade-offs, and build-vs-buy decisions that turn strategic vision into technical reality.
