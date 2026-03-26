# Buy, Configure, Build: Decision-Making Matrix

## Introduction

Every AI initiative forces a fundamental strategic question: should we buy an existing solution, configure a platform to fit our needs, or build a custom system from the ground up? This question is not new — it has been central to enterprise technology strategy for decades — but AI introduces unique dimensions that complicate the traditional calculus. The pace of model improvement means today's custom-built advantage may be tomorrow's commodity feature. The complexity of AI systems means "buying" often requires significant configuration and integration work. And the strategic importance of AI means the wrong decision can lock an organization into a dependency that constrains its competitive position for years.

The traditional "build vs. buy" binary is insufficient. In the AI era, the decision is better understood as a spectrum with three primary positions — buy, configure, and build — each with distinct cost profiles, risk characteristics, time-to-value dynamics, and strategic implications.

This chapter provides the frameworks, scorecards, decision trees, and real-world examples you need to navigate this spectrum with confidence.

---

## The Buy-Configure-Build Spectrum

### Defining the Positions

**Buy: Off-the-Shelf SaaS AI Products**

Purchasing a complete AI-powered product that is ready to use with minimal setup. The vendor owns the model, the infrastructure, the application logic, and the user interface. Your organization is a consumer of the product.

Examples:
- Grammarly for writing assistance
- Jasper for marketing content generation
- Harvey for legal AI assistance
- Gong for sales conversation intelligence
- GitHub Copilot for developer productivity
- Microsoft Copilot for M365 integration
- Salesforce Einstein for CRM intelligence

**Characteristics:**
- Fastest time to value (days to weeks)
- Lowest upfront cost
- Least customization
- Highest vendor dependency
- No competitive differentiation (your competitors can buy the same product)
- Vendor manages all updates, improvements, and maintenance

**Configure: Platform + Customization**

Adopting an AI platform that provides foundational capabilities (model access, orchestration, tooling) and configuring it with your organization's data, prompts, workflows, and business rules. You do not build the core AI engine, but you shape how it operates within your context.

Examples:
- Azure AI Studio with custom prompts and RAG on your data
- Amazon Bedrock with knowledge bases and custom agents
- Google Vertex AI with grounding on enterprise data
- Salesforce Agentforce with custom agent configuration
- ServiceNow AI with workflow-specific customization
- Databricks with fine-tuned models on your data

**Characteristics:**
- Moderate time to value (weeks to months)
- Moderate upfront cost
- Significant customization within platform constraints
- Platform dependency (but model portability may be possible)
- Some differentiation (your data and configuration are unique)
- Shared responsibility: platform vendor manages infrastructure, you manage configuration and data

**Build: Custom AI Systems**

Developing a bespoke AI system from foundational components: selecting or training models, building the inference pipeline, developing the application layer, integrating with enterprise systems, and managing the full operational lifecycle.

Examples:
- Bloomberg's BloombergGPT (domain-specific financial LLM)
- JP Morgan's DocLLM (document understanding)
- Netflix's recommendation engine (custom ML + deep learning)
- Tesla's Autopilot perception system
- Custom agentic workflow for proprietary business processes

**Characteristics:**
- Longest time to value (months to years)
- Highest upfront cost
- Maximum customization and differentiation
- Full control (no vendor dependency for core capabilities)
- Highest talent requirements
- Organization owns all improvement and maintenance

---

## Decision Criteria Framework

The buy-configure-build decision should be evaluated across ten dimensions. Each dimension is scored on a scale that indicates which position on the spectrum it favors.

### Dimension 1: Strategic Differentiation

**The core question:** Does this AI capability create competitive advantage that differentiates us in the market?

| Score | Indicator | Favors |
|---|---|---|
| Low differentiation | The capability is table-stakes (e.g., email spam filtering, basic chatbot) | **Buy** |
| Moderate differentiation | The capability enhances but does not define our competitive position (e.g., improved customer service) | **Configure** |
| High differentiation | The capability is central to our value proposition or creates proprietary advantage (e.g., unique risk model, novel product feature) | **Build** |

**Guidance:** Most AI use cases are not differentiating. Internal process automation, employee productivity tools, and commodity analytics should be bought or configured. Reserve custom building for capabilities that directly impact your competitive position.

### Dimension 2: Time to Value

**The core question:** How quickly do we need this capability in production?

| Timeline | Favors |
|---|---|
| Immediate (< 1 month) | **Buy** |
| Near-term (1-3 months) | **Buy** or **Configure** |
| Medium-term (3-9 months) | **Configure** or **Build** |
| Long-term (9+ months acceptable) | **Build** (if other factors justify it) |

**Guidance:** If the market opportunity or business problem demands immediate action, buy first and migrate later if needed. Speed often matters more than perfection. However, do not conflate urgency with importance — a truly differentiating capability is worth waiting for.

### Dimension 3: Customization Requirements

**The core question:** How much does the solution need to be tailored to our specific domain, data, processes, and requirements?

| Level | Description | Favors |
|---|---|---|
| Minimal | Generic capability works well (writing, translation, summarization) | **Buy** |
| Moderate | Needs our data and some domain adaptation (RAG on our knowledge base, custom prompts) | **Configure** |
| Extensive | Requires deep domain expertise, proprietary data, unique workflows, specific output formats | **Build** |

**Guidance:** Be honest about how "custom" your needs really are. Many organizations overestimate their uniqueness. A law firm may believe their contract review needs are unique, but a well-configured legal AI platform with their clause library and risk framework may outperform a custom build.

### Dimension 4: Data Sensitivity and Sovereignty

**The core question:** How sensitive is the data this AI system will process, and what are the regulatory constraints on data handling?

| Level | Constraints | Favors |
|---|---|---|
| Low sensitivity | Public or non-confidential data, minimal regulatory constraints | **Buy** (SaaS is fine) |
| Moderate sensitivity | Confidential business data, standard compliance requirements (SOC 2, ISO 27001) | **Configure** (private cloud or on-prem deployment options) |
| High sensitivity | PII, PHI, financial data, classified data, strict data sovereignty requirements | **Configure** (on-prem) or **Build** (full control) |

**Guidance:** Many enterprise SaaS AI products now offer private deployment options (dedicated instances, virtual private cloud, on-premises). Do not automatically eliminate "buy" for sensitive data — but rigorously validate the vendor's data handling, processing, and retention policies.

### Dimension 5: Total Cost of Ownership (3-Year Horizon)

**The core question:** What is the full cost over three years, including development, operations, and opportunity cost?

| Profile | 3-Year TCO | Favors |
|---|---|---|
| Low budget | < $500K | **Buy** |
| Medium budget | $500K - $2M | **Configure** |
| High budget | > $2M (justified by value) | **Build** (if differentiation warrants it) |

**Guidance:** Cost alone should not drive the decision. A $2M custom build that creates a $20M competitive advantage has a better ROI than a $200K SaaS product that delivers commodity capability. But a $2M custom build that replicates what a $200K SaaS product does is a waste of resources.

### Dimension 6: Organizational Capability

**The core question:** Do we have the talent and organizational maturity to build and operate a custom AI system?

| Capability Level | Team Profile | Favors |
|---|---|---|
| Low | No ML engineers; limited data science; no MLOps | **Buy** |
| Moderate | Some data scientists; emerging ML engineering; basic cloud infrastructure | **Configure** |
| High | Dedicated ML engineering team; mature MLOps; production AI experience | **Build** (if other factors align) |

**Guidance:** The most common failure mode in "build" decisions is overestimating organizational capability. Building an AI system requires not just data scientists who can train models, but ML engineers who can productionize them, DevOps/MLOps engineers who can operate them, and product managers who can iterate on them. If you do not have all four functions, configure or buy.

### Dimension 7: Vendor Ecosystem Maturity

**The core question:** How mature and competitive is the vendor landscape for this capability?

| Maturity | Indicator | Favors |
|---|---|---|
| Mature | Multiple vendors, competitive pricing, well-defined features, enterprise-ready | **Buy** |
| Emerging | Few vendors, products improving rapidly, features still being defined | **Configure** (build on platforms, avoid locking into immature products) |
| Nascent | No established vendors, research-stage capabilities | **Build** (no viable buy option) |

**Guidance:** In mature markets, buying gives you the benefit of vendor competition and continuous improvement. In nascent markets, you may have no choice but to build. The most dangerous position is buying in an emerging market where vendors may pivot, be acquired, or fail.

### Dimension 8: Integration Complexity

**The core question:** How deeply must this AI capability integrate with existing enterprise systems?

| Complexity | Description | Favors |
|---|---|---|
| Low | Standalone tool, minimal integration (e.g., writing assistant) | **Buy** |
| Moderate | Needs to read from and write to 2-3 enterprise systems (e.g., CRM, knowledge base) | **Configure** (platforms often have pre-built connectors) |
| High | Deep integration with core business systems, real-time data flows, complex orchestration | **Build** (or **Configure** with extensive customization) |

### Dimension 9: Regulatory and Compliance Requirements

**The core question:** What regulatory frameworks apply to this AI use case, and how do they constrain our options?

| Requirement Level | Examples | Favors |
|---|---|---|
| Standard | General data protection, basic audit logging | **Buy** (most vendors comply) |
| Elevated | Industry-specific (HIPAA, FINRA, PCI-DSS), model explainability required | **Configure** (need control over model and data handling) |
| Stringent | EU AI Act high-risk classification, AI-specific regulations, litigation risk | **Build** or **Configure** with auditable, documented, and controllable architecture |

### Dimension 10: Evolution and Maintainability

**The core question:** How rapidly will this capability need to evolve, and who should drive that evolution?

| Evolution Pace | Driver | Favors |
|---|---|---|
| Slow | Requirements are stable, industry standards apply | **Buy** (vendor handles updates) |
| Moderate | Periodic updates based on business changes | **Configure** (you control configuration; platform handles infrastructure) |
| Rapid | Continuous iteration based on user feedback, competitive dynamics, or regulatory changes | **Build** (full control over iteration speed) |

---

## The Decision Scorecard

### How to Use

Score each dimension on a 1-5 scale, where 1 strongly favors "buy" and 5 strongly favors "build." Weight each dimension based on its importance to your specific context. The weighted average provides a directional recommendation.

| Dimension | Weight (1-3) | Score (1-5) | Weighted Score |
|---|---|---|---|
| Strategic differentiation | __ | __ | __ |
| Time to value | __ | __ | __ |
| Customization requirements | __ | __ | __ |
| Data sensitivity | __ | __ | __ |
| Total cost of ownership | __ | __ | __ |
| Organizational capability | __ | __ | __ |
| Vendor ecosystem maturity | __ | __ | __ |
| Integration complexity | __ | __ | __ |
| Regulatory requirements | __ | __ | __ |
| Evolution and maintainability | __ | __ | __ |

**Interpretation:**

| Weighted Average | Recommendation |
|---|---|
| 1.0 - 2.0 | **Buy** — Off-the-shelf solution is the right choice |
| 2.1 - 3.0 | **Buy** with customization or **Configure** on a platform |
| 3.1 - 4.0 | **Configure** extensively or **Build** key components |
| 4.1 - 5.0 | **Build** — Custom development is justified |

**Important caveats:**
- The scorecard is a decision support tool, not a decision-making tool. It structures the conversation and surfaces trade-offs, but the final decision requires judgment.
- If any single dimension scores a 5 (e.g., extreme data sensitivity or regulatory stringency), it may override the aggregate score.
- Revisit the scorecard every 6-12 months as vendor landscape, organizational capability, and strategic priorities evolve.

---

## Vendor Assessment Framework

When the decision leans toward "buy" or "configure," a rigorous vendor assessment process is essential.

### Phase 1: Market Scan (2-4 Weeks)

1. **Identify candidates.** Use analyst reports (Gartner, Forrester, IDC), peer recommendations, industry forums, and direct research to build a long list of 8-15 vendors.
2. **Apply initial filters.** Eliminate vendors that do not meet must-have criteria:
   - Enterprise security posture (SOC 2 Type II minimum)
   - Data processing location (geographic compliance)
   - Minimum viable functionality
   - Financial stability (will they exist in 3 years?)
3. **Create a short list.** Narrow to 3-5 vendors for detailed evaluation.

### Phase 2: Detailed Evaluation (4-8 Weeks)

**Evaluate each short-listed vendor across these categories:**

**Functional Fit (40% of evaluation weight)**

| Criterion | Questions to Ask |
|---|---|
| Core capability match | Does the product solve our primary use case out of the box? |
| Quality of AI outputs | What is the accuracy, consistency, and relevance of outputs on our data? |
| Customization options | Can we configure prompts, fine-tune, integrate our data? |
| Multi-model flexibility | Does the platform support multiple AI models, or is it locked to one? |
| Output formats | Does it produce outputs in formats our systems can consume? |
| Language support | Does it support all languages we operate in? |
| Scalability | Can it handle our projected volume at acceptable latency? |

**Technical Architecture (25% of evaluation weight)**

| Criterion | Questions to Ask |
|---|---|
| Deployment options | SaaS only? Private cloud? On-premises? Hybrid? |
| API quality | Is the API well-documented, versioned, and stable? |
| Integration capabilities | Pre-built connectors to our systems? Webhook support? |
| Data handling | Where is data processed? Stored? For how long? Is it used for training? |
| Authentication | SSO, SAML, OAuth support? |
| Monitoring and observability | Built-in dashboards? API for custom monitoring? Audit logs? |
| Disaster recovery | SLA for uptime? RPO/RTO guarantees? |

**Vendor Viability (20% of evaluation weight)**

| Criterion | Questions to Ask |
|---|---|
| Financial stability | Revenue trajectory? Funding runway? Profitability path? |
| Customer base | How many enterprise customers? In our industry? |
| Reference customers | Can we speak with 2-3 customers with similar use cases? |
| Product roadmap | What is the 12-month roadmap? Is it aligned with our needs? |
| Team quality | Who are the technical leaders? What is their AI expertise? |
| Partnership ecosystem | Cloud provider partnerships? System integrator partnerships? |

**Commercial Terms (15% of evaluation weight)**

| Criterion | Questions to Ask |
|---|---|
| Pricing model | Per-user? Per-token? Per-transaction? Flat fee? |
| Pricing predictability | Can we model costs at 2x and 10x current volume? |
| Contract flexibility | Annual? Multi-year? What is the exit clause? |
| Data portability | Can we export our data and configurations if we leave? |
| IP ownership | Do we own the fine-tuned models or custom configurations? |
| SLA commitments | Uptime, latency, support response time guarantees? |
| Liability and indemnification | Vendor liability for AI-generated errors? IP indemnification? |

### Phase 3: Proof of Concept (4-8 Weeks)

Never commit to a vendor based solely on demos and documentation. Run a structured PoC:

1. **Define success criteria** before the PoC begins. Measurable, agreed-upon metrics.
2. **Use your own data.** Not the vendor's demo data. Your messy, real-world data.
3. **Test edge cases.** Adversarial inputs, unusual formats, boundary conditions.
4. **Measure at realistic volume.** If production will handle 10,000 requests/day, test at that scale.
5. **Evaluate integration effort.** How much engineering work is required to connect the vendor's product to your systems?
6. **Assess support quality.** How responsive and knowledgeable is the vendor's technical support during the PoC?
7. **Document findings** with quantitative results, not qualitative impressions.

### Phase 4: Negotiation and Contracting (2-4 Weeks)

Key negotiation points for AI vendor contracts:

- **Data usage rights.** Ensure the vendor cannot use your data to train models that benefit competitors. This should be an explicit, non-negotiable contractual commitment.
- **Model change notification.** Require advance notice before the vendor changes the underlying model (model updates can change output quality and behavior).
- **Exit provisions.** Define data export format, configuration export, transition support, and timeline.
- **Price protection.** Cap annual price increases. Include most-favored-customer clauses if possible.
- **Performance SLAs.** Define acceptable latency, throughput, uptime, and accuracy metrics with financial remedies for failure.
- **Liability allocation.** Clarify who is responsible when AI outputs cause harm. This is an evolving legal area — involve your legal team.
- **Audit rights.** Right to audit the vendor's data handling, security practices, and AI model governance.

---

## Managing Vendor Lock-in

Vendor lock-in is the single most significant long-term risk in AI procurement. It occurs when switching costs become so high that the organization is effectively trapped with a vendor, regardless of whether that vendor's product remains the best option.

### Sources of AI-Specific Lock-in

| Lock-in Source | Description | Severity |
|---|---|---|
| **Data gravity** | Large volumes of data stored in the vendor's system, expensive to migrate | High |
| **Fine-tuned models** | Custom models trained on the vendor's platform may not be portable | High |
| **Prompt engineering** | Prompts optimized for one model may not work well with others | Medium |
| **Integration depth** | Deep integrations with vendor-specific APIs and features | High |
| **Workflow dependency** | Business processes redesigned around vendor-specific capabilities | Very High |
| **Institutional knowledge** | Team expertise concentrated in one vendor's tools and APIs | Medium |
| **Contract terms** | Long-term commitments with high early termination costs | Medium |

### Lock-in Mitigation Strategies

**Strategy 1: Abstraction layers.** Build an internal API layer between your applications and the AI vendor. Your applications call your API; your API calls the vendor. If you switch vendors, you update the abstraction layer, not every application.

```
Application A ─┐
Application B ──┤── Internal AI API ── Vendor API (swappable)
Application C ──┘
```

**Strategy 2: Multi-vendor capability.** Maintain the ability to use at least two AI providers for critical capabilities. This does not mean running both simultaneously (although that is an option for routing and redundancy) — it means periodically validating that your workloads can run on an alternative.

**Strategy 3: Data portability by design.** Store all training data, fine-tuning datasets, evaluation datasets, and knowledge bases in formats and locations you control. Never allow the vendor's system to be the only copy of your AI-related data.

**Strategy 4: Open standards and formats.** Where possible, use standard model formats (ONNX, SafeTensors), standard APIs (OpenAI-compatible API format, which many providers support), and standard infrastructure (Kubernetes, standard observability tools).

**Strategy 5: Contractual protections.** Negotiate data export rights, model export rights (for fine-tuned models), reasonable termination clauses, and transition support commitments.

**Strategy 6: Regular market assessment.** Every 12 months, formally evaluate whether your current vendor remains the best option. This discipline prevents inertia-driven lock-in even when switching costs are low.

---

## The Microsoft Copilot Case Study: Anatomy of a Buy Decision

Microsoft Copilot is one of the most widely deployed enterprise AI products and provides a rich case study for analyzing the buy-configure-build decision.

### What Microsoft Copilot Is

Microsoft 365 Copilot embeds GPT-4-class AI capabilities directly into the Microsoft productivity suite: Word, Excel, PowerPoint, Outlook, Teams, and the broader M365 ecosystem. It can draft documents, summarize emails, generate presentations, analyze spreadsheets, transcribe and summarize meetings, and automate routine tasks across the productivity suite.

### Why Organizations Buy Copilot

**Factor 1: Ubiquity of M365.** If your organization already uses Microsoft 365 (and most large enterprises do), Copilot integrates natively — no new systems to deploy, no new interfaces to learn, no new security perimeter to manage.

**Factor 2: Broad, shallow value.** Copilot improves productivity across many tasks by a modest amount (Microsoft claims 30-50% time savings on specific tasks). This "broad, shallow" value pattern — small improvements across millions of interactions — is precisely the pattern where buying beats building. No organization would build a custom AI assistant for email summarization.

**Factor 3: Continuous improvement.** Microsoft invests billions in improving Copilot. Every user benefits from improvements without additional cost or effort.

**Factor 4: Compliance and security.** Copilot operates within the M365 compliance boundary, inheriting existing data governance, access controls, and compliance certifications.

### Why Organizations Hesitate or Supplement Copilot

**Factor 1: Cost.** At $30/user/month, a 10,000-person deployment costs $3.6M/year. The ROI depends on actual usage and productivity gain, which varies significantly by role and function.

**Factor 2: Limited customization.** Copilot is a general-purpose productivity tool. It does not know your industry's terminology, your company's processes, or your customers' context beyond what is in your M365 data.

**Factor 3: Depth of capability.** For specific, high-value use cases (legal contract analysis, medical record review, financial modeling), Copilot's general-purpose capabilities may be insufficient. These use cases often require specialized AI solutions — configure or build.

**Factor 4: Data boundaries.** Copilot works with data in M365. If critical data lives in other systems (Salesforce, SAP, custom databases), Copilot cannot access it without additional integration (Microsoft Graph connectors, Copilot Studio).

### The Hybrid Approach: Copilot + Domain-Specific AI

Most enterprises are converging on a hybrid strategy:

- **Buy Copilot** for general productivity enhancement across the organization
- **Configure** domain-specific AI platforms (e.g., Azure AI Studio with custom agents, or industry-specific AI products) for departmental needs
- **Build** custom AI capabilities only for truly differentiating use cases that no product or platform addresses

This hybrid approach captures the broad, shallow value of Copilot while investing selectively in deeper capabilities where they create competitive advantage.

### Copilot Cost-Benefit Analysis Framework

| Factor | Measurement Approach |
|---|---|
| License cost | $30/user/month × number of licensed users |
| Adoption rate | % of licensed users who use Copilot at least weekly |
| Time savings per user | Measured via surveys and workflow analysis |
| Value of time savings | Time saved × fully-loaded hourly cost of employee |
| Quality improvements | Reduction in errors, improved document quality (harder to quantify) |
| Opportunity cost | What else could the $30/user/month budget fund? |
| **Net value** | **(Time savings value + quality improvements) − (license cost + training cost + change management cost)** |

**Typical findings from enterprise deployments:**
- Adoption rates: 40-70% after 6 months (varies by change management quality)
- Time savings: 15-45 minutes per user per week for active users
- Roles with highest ROI: executives (meeting summarization), sales (email and proposal drafting), managers (report creation)
- Roles with lowest ROI: highly specialized technical roles, roles with minimal document/email workload

---

## Decision Trees for Common Use Cases

### Use Case: Customer Service AI

```
Is customer service a core differentiator for your brand?
├── No → Is your service volume > 100K tickets/month?
│        ├── No → BUY (Zendesk AI, Intercom, Freshdesk AI)
│        └── Yes → CONFIGURE (platform with your knowledge base and workflows)
└── Yes → Do you have ML engineering capability?
         ├── No → CONFIGURE (platform + customization + partner)
         └── Yes → Is your domain highly specialized?
                  ├── No → CONFIGURE (deep customization on platform)
                  └── Yes → BUILD (custom models + custom orchestration)
```

### Use Case: Document Processing and Extraction

```
Is the document type standardized (invoices, contracts, forms)?
├── Yes → Does an off-the-shelf product handle your format?
│         ├── Yes → BUY (Azure Document Intelligence, AWS Textract, Google Document AI)
│         └── No → CONFIGURE (platform + custom extraction rules)
└── No → Do you process > 50K documents/month?
         ├── No → CONFIGURE (LLM platform + custom prompts + human review)
         └── Yes → Is accuracy > 99% required?
                  ├── No → CONFIGURE (LLM platform + optimization)
                  └── Yes → BUILD (custom models fine-tuned on your documents + validation pipeline)
```

### Use Case: Internal Knowledge Assistant

```
Is the knowledge base primarily in M365 (SharePoint, Teams, email)?
├── Yes → BUY (Microsoft Copilot) + evaluate if sufficient
│         ├── Sufficient → Done
│         └── Insufficient → CONFIGURE (Copilot Studio or Azure AI with custom RAG)
└── No → Is the knowledge base in a single system (e.g., Confluence, Notion)?
         ├── Yes → BUY (vendor's native AI or Glean/Guru/Moveworks)
         └── No → CONFIGURE (RAG pipeline across multiple sources on a platform)
```

### Use Case: Code Generation and Developer Productivity

```
Are your developers using standard languages and frameworks?
├── Yes → BUY (GitHub Copilot, Cursor, Cody)
└── No → Do you have proprietary languages, frameworks, or codebases?
         ├── Limited proprietary code → CONFIGURE (commercial tool + custom context)
         └── Extensive proprietary code → CONFIGURE (fine-tuned model on your codebase)
             Note: Full BUILD is almost never justified for code generation.
             The frontier models are too strong and improving too fast.
```

### Use Case: Agentic Workflow Automation

```
Is the workflow well-defined with clear steps and tools?
├── Yes → Does a vendor product cover this workflow?
│         ├── Yes → BUY (or CONFIGURE if domain adaptation needed)
│         └── No → CONFIGURE (agentic framework on AI platform + custom tools)
└── No → Is the workflow critical and high-value?
         ├── No → Wait for vendor solutions to mature
         └── Yes → BUILD (custom agent with custom tools, extensive testing, human-in-the-loop)
             Note: Agentic AI is the paradigm where BUILD is most
             often justified, because workflows are inherently
             organization-specific and require deep integration.
```

---

## Open Source Considerations in the Buy-Configure-Build Spectrum

Open source changes the economics and dynamics of the build decision. You are not truly "building from scratch" when you can start with LLaMA 3 405B, Mistral Large, or Qwen 72B.

### What Open Source Gives You

- **No per-token cost.** Once you have the infrastructure, inference is "free" (excluding infrastructure costs, which are not free).
- **Full customization.** Fine-tune on your data, modify the architecture, quantize to your specifications.
- **Data sovereignty.** Your data never leaves your environment.
- **Model portability.** No vendor can revoke your access to a model you have already downloaded.
- **Community innovation.** Thousands of fine-tuned variants, optimization techniques, and deployment tools.

### What Open Source Demands

- **Infrastructure management.** You manage GPU procurement (or cloud allocation), inference serving, scaling, and reliability.
- **ML engineering talent.** Fine-tuning, optimization, and production deployment require specialized skills.
- **Safety and alignment.** Open-weight models may not have the same safety training as commercial models. You may need to add safety layers.
- **Support.** No SLA, no vendor support team. Community forums and your own team are the only support.
- **Compliance burden.** You are responsible for demonstrating compliance with all regulations — you cannot point to a vendor's certifications.

### The Open Source Decision Matrix

| Factor | Favors Open Source | Favors Commercial |
|---|---|---|
| Volume | > 50M tokens/day | < 50M tokens/day |
| Data sensitivity | High (data cannot leave environment) | Low-moderate |
| Customization depth | Fine-tuning + architecture changes | Prompting + light configuration |
| ML engineering team | >= 3 dedicated ML engineers | < 3 ML engineers |
| Time to production | Months acceptable | Weeks required |
| Quality requirements | Slightly below frontier is acceptable | Frontier quality required |
| Regulatory burden | Heavy (need full audit control) | Light-moderate |

---

## Hybrid Approaches: The Pragmatic Middle Ground

In practice, most enterprises do not make a single buy-configure-build decision. They adopt a hybrid approach that uses different strategies for different capabilities within the same initiative.

### The Layer Cake Architecture

```
┌─────────────────────────────────────────────────────┐
│  LAYER 4: Application UX                            │
│  BUY (Copilot, vendor UI) or BUILD (custom UI)     │
├─────────────────────────────────────────────────────┤
│  LAYER 3: Orchestration & Business Logic             │
│  Usually CONFIGURE or BUILD (most org-specific)     │
├─────────────────────────────────────────────────────┤
│  LAYER 2: AI Models                                  │
│  BUY (API) or CONFIGURE (fine-tune) or BUILD (rare) │
├─────────────────────────────────────────────────────┤
│  LAYER 1: Infrastructure                             │
│  BUY (cloud) or BUILD (on-prem) or HYBRID           │
└─────────────────────────────────────────────────────┘
```

**Example: A Financial Services Company's AI Strategy**

| Layer | Decision | Rationale |
|---|---|---|
| Infrastructure | **Buy** (Azure cloud) | Existing enterprise agreement; security certifications met |
| AI Models | **Configure** (Azure OpenAI for general tasks; fine-tuned LLaMA for proprietary analysis) | General tasks do not need custom models; proprietary analysis does |
| Orchestration | **Build** (custom agentic workflows for risk analysis) | Workflow is unique to the firm; no vendor product matches |
| Application UX | **Buy** (Copilot for general productivity); **Build** (custom UI for risk analysts) | General productivity is commodity; analyst workflow is differentiated |

This hybrid approach is becoming the dominant pattern in sophisticated enterprise AI strategies. It applies the buy-configure-build decision at each architectural layer, matching the strategy to the specific requirements of that layer.

---

## Real-World Examples from Enterprises

### Example 1: Global Retailer — Customer Experience AI

**Context:** A retailer with 500 stores and a major e-commerce presence wanted to deploy AI across customer experience: in-store assistance, online chat, product recommendations, and post-purchase support.

**Decision process:** Applied the scorecard to each sub-capability:

| Capability | Differentiation | Customization Need | Time Pressure | Decision |
|---|---|---|---|---|
| General online chat | Low | Low | High | **Buy** (Zendesk AI) |
| Product recommendations | High | High | Medium | **Build** (custom models on proprietary purchase data) |
| In-store virtual assistant | Medium | Medium | Medium | **Configure** (Azure AI + custom knowledge base) |
| Post-purchase support | Low | Medium | Medium | **Configure** (Zendesk AI + custom workflows) |

**Result:** Four different decisions for four sub-capabilities within the same strategic initiative. Total investment: $2.1M over 18 months. The custom recommendation engine (build) generates $15M in incremental annual revenue. The bought and configured components handle 80% of service interactions at lower cost than the previous system.

**Key lesson:** Do not force a single buy/configure/build decision across an entire initiative. Decompose the initiative into capabilities and make the optimal decision for each one.

### Example 2: Healthcare System — Clinical Documentation AI

**Context:** A healthcare system with 12 hospitals wanted to deploy AI for clinical documentation: ambient listening during patient encounters, automated note generation, and coding/billing assistance.

**Decision process:**

| Factor | Assessment | Implication |
|---|---|---|
| Regulatory | HIPAA, high-risk under emerging AI regulation | Eliminates many SaaS vendors; need on-prem or BAA-covered options |
| Differentiation | Low (documentation is necessary but not differentiating) | Favors buy or configure over build |
| Data sensitivity | Very high (PHI) | Need strict data controls |
| Vendor maturity | Several emerging vendors (Abridge, Nuance DAX, Suki) | Viable buy options exist |
| Integration | Must integrate with Epic EHR | Need vendor with Epic integration |

**Decision:** **Buy** (Nuance DAX Copilot via Microsoft) with careful configuration of specialty-specific templates and integration with Epic.

**Rationale:** Despite the high data sensitivity, a buy decision was justified because: (1) clinical documentation is not a differentiator, (2) Nuance/Microsoft provides HIPAA-compliant deployment with BAA, (3) Epic integration is pre-built, and (4) building a custom ambient listening + transcription + clinical note generation system would take 2-3 years and $10M+ with no guarantee of better performance.

**Result:** Deployed in 6 months. Clinician adoption reached 65% within a year. Average documentation time reduced by 50%. Physician satisfaction scores improved by 30 points.

### Example 3: Manufacturing Company — Predictive Maintenance AI

**Context:** A global manufacturer with 40 production facilities wanted to deploy AI for predictive maintenance across 5,000+ pieces of equipment.

**Decision process:**

| Factor | Assessment | Implication |
|---|---|---|
| Differentiation | High (equipment-specific failure prediction is core operational advantage) | Favors build |
| Data | Unique sensor data from proprietary equipment | No generic model will work |
| Vendor maturity | Several vendors exist but none cover the specific equipment types | No viable buy option |
| Integration | Must integrate with existing SCADA/IoT infrastructure | Deep custom integration required |
| Capability | Strong data science and ML engineering team (25 people) | Organizational capability to build |

**Decision:** **Build** a custom predictive maintenance platform, using open-source ML libraries (scikit-learn, PyTorch) on existing cloud infrastructure (AWS).

**Rationale:** The data is unique (proprietary sensor configurations), the equipment is unique (custom manufacturing lines), and no vendor had a viable product. The ML team had the capability, and the use case was strategically differentiating.

**Result:** Developed over 18 months. Unplanned downtime reduced by 35%. Annual savings from avoided failures and optimized maintenance scheduling: $28M. The platform is now considered a core competency and competitive differentiator.

---

## Governance of Buy-Configure-Build Decisions

### Establishing a Decision Authority

Every organization should have a clear governance process for buy-configure-build decisions:

1. **Small-scale decisions (< $100K, non-strategic):** Delegated to department heads with CAIO advisory input.
2. **Medium-scale decisions ($100K-$1M, moderate strategic impact):** Joint decision by CAIO and business unit leader, reviewed by CTO/CIO.
3. **Large-scale decisions (> $1M, high strategic impact):** CAIO recommendation, CTO/CIO review, executive committee approval.

### Periodic Review

Technology decisions are not permanent. Establish a review cadence:

- **Annual review:** Reassess all major vendor relationships against market alternatives. Has a better option emerged? Has our volume changed the economics?
- **Trigger-based review:** Reassess when a vendor raises prices significantly, fails to deliver on roadmap commitments, has a major security incident, or is acquired.
- **Sunset planning:** For build decisions, periodically ask: has a vendor product matured to the point where it would be better to buy than to maintain our custom system?

---

## Total Cost Comparison Methodology

When comparing buy, configure, and build options for the same use case, use this standardized methodology to ensure apples-to-apples comparison:

### Step 1: Define the Comparison Scope

- What capability is being delivered? (Same scope across all options)
- What is the time horizon? (Use 3 years as the standard)
- What is the projected usage volume? (Include growth projections)

### Step 2: Model Costs for Each Option

| Cost Category | Buy | Configure | Build |
|---|---|---|---|
| Licensing/subscription | Vendor pricing | Platform pricing | $0 (open-source) or model API costs |
| Development/integration | Vendor-led implementation + internal team | Platform customization + integration | Full development cost |
| Infrastructure | Included (SaaS) or vendor-managed | Platform infrastructure + custom components | Full infrastructure cost |
| Data preparation | Minimal | Moderate (RAG data, configuration data) | Full (training data, evaluation data) |
| Talent | Admin + business users | Admin + data engineers + prompt engineers | ML engineers + data engineers + DevOps |
| Operations | Vendor-managed (included in subscription) | Shared (platform manages infrastructure, you manage configuration) | Fully your responsibility |
| Training/change management | End-user training | End-user + administrator training | End-user + operator + developer training |
| Risk mitigation | Vendor dependency | Platform dependency + customization risk | Technical risk + operational risk |
| Exit cost | Data migration + process reversion | Platform migration + configuration porting | Sunk cost of custom development |

### Step 3: Model Value for Each Option

| Value Category | Buy | Configure | Build |
|---|---|---|---|
| Speed to value | Fastest | Moderate | Slowest |
| Quality of output | Good (generic) | Good-Excellent (adapted to your context) | Excellent (fully tailored, if executed well) |
| Competitive differentiation | None | Moderate | High |
| Flexibility/control | Low | Moderate | High |
| Long-term strategic optionality | Low (vendor-dependent) | Moderate (platform-dependent) | High (full ownership) |

### Step 4: Calculate Risk-Adjusted NPV

For each option, calculate the net present value of (value delivered - costs incurred) over the 3-year horizon, adjusted for:
- Probability of successful deployment (lower for build, higher for buy)
- Probability of vendor failure or acquisition (affects buy and configure)
- Sensitivity to volume changes (how does cost change if volume is 2x or 0.5x projected?)

---

## Key Takeaways for the CAIO

1. **The decision is a spectrum, not a binary.** Buy, configure, and build are positions on a continuum, and different layers of the same initiative may warrant different positions.

2. **Default to buy, justify building.** In most cases, buying or configuring is faster, cheaper, and lower-risk. The burden of proof should be on the "build" decision — it must demonstrate clear strategic differentiation that justifies the additional cost, time, and risk.

3. **Decompose before deciding.** Break the initiative into capabilities and make the optimal decision for each capability independently. This prevents over-building commodity features and under-investing in differentiating ones.

4. **Vendor lock-in is a first-class risk.** Every buy and configure decision should include explicit lock-in mitigation strategies: abstraction layers, data portability, contractual protections, and regular market reassessment.

5. **Organizational capability is a binding constraint.** A "build" decision is only viable if you have the talent to execute it. Overestimating organizational capability is the most common failure mode.

6. **The right answer changes over time.** As the vendor landscape matures, as your organization's capabilities grow, and as AI technology evolves, the optimal position on the spectrum shifts. Review decisions annually.

7. **Use the scorecard as a conversation tool.** The decision scorecard is designed to surface disagreements and clarify trade-offs among stakeholders. The value is in the conversation it structures, not just the number it produces.

8. **Negotiate as if you will leave.** Even when you are confident in a vendor, negotiate contract terms as if you might switch. This protects your future flexibility and signals to the vendor that you are a sophisticated buyer.

9. **Hybrid is the pragmatic answer.** The most successful enterprise AI strategies combine all three approaches: buying commodity capabilities, configuring platforms for departmental needs, and building custom solutions only where they create genuine competitive advantage.

10. **The cost of building wrong is higher than the cost of buying wrong.** A failed buy decision wastes the subscription cost and some integration effort. A failed build decision wastes months to years of engineering time, plus the opportunity cost of what that team could have built instead. When in doubt, err toward the lower-risk option.
