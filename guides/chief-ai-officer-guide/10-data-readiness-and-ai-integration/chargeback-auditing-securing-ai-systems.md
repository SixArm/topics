# Charge-back, Auditing, Securing AI Systems

As AI moves from experimental projects to mission-critical enterprise capabilities, three interrelated operational imperatives emerge: the organization must understand what AI costs and who should pay for it (chargeback), the organization must verify that AI systems are operating correctly, fairly, and in compliance with regulations (auditing), and the organization must protect AI systems from threats that could compromise their integrity, availability, or confidentiality (security). These three imperatives are deeply interconnected — financial governance without auditing is unaccountable, auditing without security is incomplete, and security without financial governance is unsustainable.

This chapter provides the CAIO with comprehensive guidance on each of these imperatives, including practical frameworks, implementation strategies, and real-world examples drawn from organizations that have grappled with these challenges at scale.

---

## Part 1: AI Cost Allocation and Chargeback

### Why Chargeback Matters for AI

AI infrastructure is expensive. The costs span compute (cloud instances, GPUs, TPUs), storage (data lakes, feature stores, model registries, vector databases), data acquisition (third-party datasets, API calls to external services), software licenses (ML platforms, monitoring tools, data management solutions), and human capital (data scientists, ML engineers, data engineers, MLOps specialists). For a large enterprise, annual AI spending can range from tens of millions to hundreds of millions of dollars.

Without a clear model for allocating these costs to the business units and use cases that drive them, several problems emerge:

**1. Uncontrolled spending.** When AI costs are absorbed by a central budget, business units have no incentive to optimize their consumption. They request resources freely, overprovision infrastructure, and fail to decommission models and datasets they no longer use.

**2. Resentment and political conflict.** Business units that consume few AI resources subsidize heavy consumers. This creates resentment and erodes support for AI investment.

**3. Inability to calculate ROI.** If the cost of AI for a specific use case or department cannot be isolated, it is impossible to calculate whether the investment is delivering adequate returns.

**4. Budget vulnerability.** When economic conditions tighten, central AI budgets are easy targets for cuts because the value they deliver to specific business units is not clearly attributed.

**5. Poor resource utilization.** Without visibility into who is consuming what, the AI infrastructure team cannot optimize resource allocation, identify waste, or plan capacity effectively.

### Chargeback Models for AI

There are several approaches to allocating AI costs across the organization, each with distinct advantages and tradeoffs.

#### Model 1: Full Chargeback

**Description**: Every AI cost is allocated to the business unit or use case that incurs it. Business units receive detailed invoices for their AI consumption, which are charged to their operating budgets.

**Advantages**:
- Maximum cost visibility and accountability
- Business units optimize their consumption
- Clear ROI calculation for each use case
- AI spending is sustainable because it is funded by business value

**Disadvantages**:
- Complex to implement accurately — shared resources (platform team, infrastructure, shared models) are difficult to allocate
- Can discourage experimentation and early-stage exploration, which have uncertain ROI
- Administrative overhead of metering, invoicing, and dispute resolution
- May create perverse incentives (e.g., departments avoiding AI to minimize costs even when AI would be valuable)

**Best suited for**: Mature AI organizations with established use cases and predictable consumption patterns.

#### Model 2: Showback (Transparency Without Billing)

**Description**: AI costs are tracked and reported to business units, but are not charged to their budgets. Business units see what they would be charged if full chargeback were implemented, but the costs remain in the central AI budget.

**Advantages**:
- Provides cost visibility without the administrative complexity of actual billing
- Does not discourage experimentation
- Builds organizational awareness of AI costs
- Can serve as a transitional step toward full chargeback

**Disadvantages**:
- No financial accountability — visibility alone may not change behavior
- Central AI budget remains vulnerable to cuts
- ROI calculations are possible but not enforced

**Best suited for**: Organizations in the early stages of AI adoption that want to build cost awareness before implementing full chargeback.

#### Model 3: Tiered Chargeback

**Description**: A hybrid approach where different types of AI consumption are charged differently. Production workloads with established ROI are fully charged back. Experimental and exploratory workloads are subsidized by a central innovation budget. Shared platform costs are allocated using a fixed formula.

**Advantages**:
- Balances accountability with encouragement of innovation
- Production workloads are sustainable; experimental workloads are not stifled
- Shared costs are allocated transparently

**Disadvantages**:
- More complex to implement than either pure chargeback or showback
- Requires clear definitions of what constitutes "production" versus "experimental"
- The innovation budget must be sized and governed

**Best suited for**: Organizations that want to encourage AI experimentation while maintaining financial discipline for production workloads.

#### Model 4: Subscription-Based Allocation

**Description**: Business units subscribe to AI service tiers (e.g., basic, standard, premium) at fixed monthly or annual prices. Each tier includes defined resources (compute hours, storage, model serving capacity, support level). Consumption above the tier allocation is charged at overage rates.

**Advantages**:
- Predictable costs for business units (no surprise invoices)
- Simpler to administer than usage-based chargeback
- Encourages right-sizing (business units choose the tier that matches their needs)

**Disadvantages**:
- Less precise cost allocation than usage-based models
- May not reflect actual consumption accurately (some units overpay, others underpay)
- Overage pricing must be carefully designed to avoid bill shock

**Best suited for**: Organizations with a centralized AI platform serving multiple business units with relatively predictable consumption patterns.

### Implementing AI Cost Metering

Regardless of the chargeback model chosen, accurate cost metering is essential. The following cost categories should be tracked:

**Compute costs**:
- GPU and CPU hours for model training
- GPU and CPU hours for model inference (serving)
- Compute hours for data processing and feature engineering
- Compute hours for experimentation (notebook servers, development environments)

**Storage costs**:
- Raw data storage (data lake, data warehouse)
- Processed data storage (feature store, vector database)
- Model storage (model registry, model artifacts)
- Log and monitoring data storage

**Third-party service costs**:
- Cloud provider AI service API calls (e.g., Azure OpenAI, AWS Bedrock, Google Vertex AI)
- Third-party data provider fees
- SaaS AI platform licensing (e.g., Databricks, Snowflake AI features, Datadog)
- Third-party model API calls (e.g., OpenAI, Anthropic, Cohere)

**Network costs**:
- Data transfer between regions, zones, or cloud providers
- API gateway throughput
- Data ingestion from external sources

**Human capital costs** (optional but valuable):
- Data scientist time allocated to specific projects
- ML engineer time for model deployment and maintenance
- Data engineer time for pipeline development and maintenance
- Support and operations time

### Cost Metering Tools and Practices

**Cloud cost management**: AWS Cost Explorer, Azure Cost Management, Google Cloud Billing, or third-party tools like CloudHealth (VMware), Apptio Cloudability, or Spot.io provide detailed cloud resource cost tracking with tagging-based allocation.

**Resource tagging**: Implement a consistent tagging strategy that associates every cloud resource with the business unit, project, environment (dev/staging/production), and cost center that owns it. Enforce tagging through policy (e.g., AWS Service Control Policies, Azure Policy).

**ML platform metering**: Most enterprise ML platforms (Databricks, SageMaker, Vertex AI, Azure ML) provide usage metering and cost reporting at the project, user, and resource level.

**Custom metering**: For fine-grained cost allocation (e.g., per-model inference costs), implement custom metering that tracks inference requests by model, consumer, and business unit.

**Cost dashboards**: Create dashboards (Grafana, Tableau, Power BI) that show AI costs by business unit, use case, and cost category. Update these dashboards at least weekly. Make them accessible to business unit leaders.

### Financial Governance Framework

Beyond chargeback mechanics, the CAIO should establish a financial governance framework for AI that includes:

**1. Annual AI budget planning**: Work with the CFO and business unit leaders to establish an annual AI budget that reflects strategic priorities. Allocate the budget across investment categories (production operations, new development, experimentation, platform and infrastructure).

**2. Investment review process**: Require business cases for new AI initiatives that include estimated costs, expected benefits, and ROI timeline. Review and approve initiatives through an AI investment committee that includes finance, business unit, and technology leaders.

**3. Monthly cost reviews**: Conduct monthly reviews of AI spending versus budget. Identify variances, investigate unexpected costs, and adjust resource allocation.

**4. Optimization program**: Establish a continuous optimization program that identifies and eliminates waste — unused resources, over-provisioned infrastructure, underperforming models that should be decommissioned, and opportunities to reduce costs through architectural improvements (e.g., model compression, spot instances, reserved instances).

**5. Unit economics tracking**: For each production AI use case, track the unit economics — the cost per prediction, the cost per business outcome (e.g., cost per fraud prevented, cost per customer retained), and the value delivered per dollar spent.

---

## Part 2: Auditing AI Systems

### The Imperative for AI Auditing

AI systems make or influence decisions that affect customers, employees, business partners, and the public. A loan approval algorithm determines who receives credit. A hiring algorithm screens job applicants. A pricing algorithm sets prices for consumers. A clinical decision support system influences medical treatment. The consequences of errors, biases, or malfunctions in these systems can be severe — financial loss, legal liability, reputational damage, regulatory penalties, and harm to individuals.

Auditing AI systems is the discipline of systematically examining these systems to verify that they operate as intended, comply with applicable regulations and policies, treat affected parties fairly, and produce reliable results. The CAIO must establish auditing as a core operational practice, not an occasional exercise.

### Types of AI Audits

#### Technical Audits

Technical audits examine the AI system's design, implementation, and performance to verify that it meets technical specifications and quality standards.

**Scope**:
- Model architecture and training methodology
- Training data quality, representativeness, and provenance
- Feature engineering and data preprocessing
- Model validation and testing methodology
- Performance metrics and their appropriateness for the use case
- Reproducibility (can the model be retrained with the same results?)
- Code quality and documentation
- Infrastructure configuration and security

**Conducted by**: Internal AI/ML team members not involved in the development of the system being audited, or external technical auditors.

**Frequency**: Before initial deployment and after significant model updates. At least annually for high-risk systems.

#### Fairness and Bias Audits

Fairness audits examine whether the AI system produces equitable outcomes across demographic groups and other protected characteristics.

**Scope**:
- Model performance across demographic groups (accuracy, error rates, false positive/negative rates)
- Training data representation (are all relevant groups adequately represented?)
- Feature analysis (does the model use proxies for protected characteristics?)
- Outcome analysis (do decisions produced by the model show statistical disparities?)
- Intersectional analysis (do disparities exist at the intersection of multiple characteristics?)

**Conducted by**: Fairness specialists, ethics teams, or external fairness auditors. Increasingly, regulatory requirements mandate independent auditing.

**Frequency**: Before initial deployment and on an ongoing basis (at least quarterly for high-impact systems). Re-audit whenever the model is retrained or the population it serves changes significantly.

#### Compliance Audits

Compliance audits verify that the AI system meets applicable legal and regulatory requirements.

**Scope**:
- EU AI Act requirements (for systems operating in or affecting EU residents): risk categorization, conformity assessment, documentation, human oversight, transparency
- Sector-specific regulations: financial services (Fair Lending, Anti-Money Laundering), healthcare (HIPAA, FDA oversight of clinical AI), insurance (actuarial fairness), employment (EEOC guidance)
- Privacy regulations (GDPR, CCPA, state privacy laws): data minimization, consent management, data subject rights, cross-border data transfer
- Organization-specific policies: responsible AI policies, data governance policies, model risk management policies

**Conducted by**: Compliance teams, internal audit, legal counsel, or external compliance auditors. For regulated industries, regulators may conduct their own audits.

**Frequency**: At least annually, and whenever regulations change or new AI systems are deployed in regulated domains.

#### Operational Audits

Operational audits examine the processes and controls that govern AI system operations.

**Scope**:
- Model deployment processes (are models reviewed before deployment? by whom?)
- Access controls (who can train, deploy, and modify models?)
- Change management (are model changes documented, reviewed, and approved?)
- Monitoring and alerting (are appropriate monitoring and alerting in place?)
- Incident management (are AI incidents tracked and reviewed?)
- Data lineage (can the data used to train and serve the model be traced to its source?)
- Model lineage (can the model's training process be reproduced?)
- Documentation completeness (is the system documented adequately?)

**Conducted by**: Internal audit, operations team leads, or external auditors.

**Frequency**: At least annually, more frequently for high-risk systems.

### Implementing an AI Audit Program

**Step 1: Inventory AI systems.** Create and maintain a comprehensive inventory of all AI systems in production, including their purpose, data sources, business owners, technical owners, risk classification, and regulatory applicability. This inventory is the foundation of the audit program.

**Step 2: Classify risk.** Assign a risk classification to each AI system based on factors including: the impact of incorrect decisions (financial, health, safety, legal), the number of people affected, the degree of autonomy (fully automated versus human-in-the-loop), and the regulatory environment. Common classifications: high risk, medium risk, low risk.

**Step 3: Define audit scope and frequency.** Higher-risk systems receive more comprehensive and more frequent audits. Lower-risk systems receive lighter audits at longer intervals.

**Step 4: Establish audit teams.** Determine who will conduct each type of audit — internal teams, external auditors, or a combination. Ensure auditors have appropriate expertise and independence (the team that built the system should not audit it).

**Step 5: Define audit criteria and procedures.** For each type of audit, define specific criteria (what will be evaluated) and procedures (how it will be evaluated). Use established frameworks where available (NIST AI RMF, ISO/IEC 42001, IEEE standards).

**Step 6: Conduct audits.** Execute audits according to the defined schedule. Document findings, including both issues and positive observations.

**Step 7: Remediate findings.** Assign responsibility for addressing audit findings, set deadlines, and track remediation to completion. Critical findings should be escalated to the CAIO and, for high-risk systems, to the board.

**Step 8: Continuous improvement.** Use audit findings to improve AI development and operations practices. Update audit criteria and procedures as standards and regulations evolve.

### Audit Documentation and Model Cards

Every audited AI system should maintain comprehensive documentation that serves as the foundation for audit activities. The industry-standard format for this documentation is the model card, introduced by Google researchers in 2019 and now widely adopted.

A comprehensive model card includes:

- **Model details**: Name, version, type, owner, purpose, training date
- **Intended use**: Primary use cases, intended users, out-of-scope uses
- **Training data**: Description, size, source, time period, preprocessing, known limitations
- **Evaluation data**: Description, size, source, relationship to training data
- **Performance metrics**: Metrics appropriate for the use case, measured on evaluation data, disaggregated by relevant groups
- **Fairness analysis**: Metrics disaggregated by demographic groups, known biases, mitigation measures
- **Ethical considerations**: Known risks, potential misuse, human oversight mechanisms
- **Caveats and recommendations**: Known limitations, conditions under which the model should not be used

---

## Part 3: Securing AI Systems

### The AI Security Threat Landscape

AI systems introduce security risks that do not exist in traditional software systems. These risks span the entire AI lifecycle — from training data to model development to production serving — and they require security measures that extend beyond traditional application security.

#### Adversarial Attacks

Adversarial attacks manipulate AI model inputs to cause the model to produce incorrect outputs. These attacks exploit the fundamental nature of machine learning — the model's learned patterns can be deceived by carefully crafted inputs.

**Evasion attacks**: Modifying input data to evade model detection. Example: Adding subtle perturbations to an image to cause a computer vision model to misclassify it. In a security context, modifying malware to evade AI-based detection.

**Poisoning attacks**: Introducing malicious data into the training dataset to corrupt the model's learned behavior. Example: Injecting biased examples into a training dataset to cause the model to discriminate against a particular group, or inserting backdoor triggers that cause specific misclassifications when activated.

**Model extraction attacks**: Querying a model repeatedly to reconstruct its behavior, effectively stealing the model's intellectual property. Example: A competitor systematically queries a proprietary pricing model to reverse-engineer its logic.

**Prompt injection**: For large language models, manipulating inputs (prompts) to cause the model to ignore its instructions, reveal confidential information, or produce harmful outputs. Example: A customer service chatbot manipulated to disclose internal policies or generate offensive content.

#### Data Security Risks

**Training data theft**: Training datasets often contain sensitive business information, customer data, or proprietary knowledge. Unauthorized access to training data can expose this information.

**Model inversion attacks**: Using a model's outputs to infer information about its training data. Example: Inferring that a specific individual was in the training dataset of a health prediction model by querying the model with that individual's characteristics.

**Data leakage through models**: Models can memorize and regurgitate training data, particularly large language models. If training data includes sensitive information (PII, trade secrets, confidential communications), the model may inadvertently expose it.

#### Infrastructure Security Risks

**Compute infrastructure compromise**: AI training and inference run on expensive compute infrastructure (GPU clusters, cloud instances) that is attractive to attackers for cryptomining and other malicious purposes.

**Supply chain attacks**: AI systems depend on a complex supply chain of open-source libraries, pre-trained models, datasets, and cloud services. Compromising any element of this supply chain can compromise the AI system.

**API exploitation**: AI model APIs can be exploited through excessive usage (driving up costs), injection of malicious inputs, or unauthorized access.

### Security Architecture for AI Systems

A comprehensive security architecture for AI systems operates at multiple layers, following the defense-in-depth principle.

#### Layer 1: Identity and Access Management

**Principle of least privilege**: Every user, service, and system should have the minimum access necessary to perform their function. A data scientist training a model needs access to training data and compute resources — not to production model serving infrastructure. A model serving service needs access to the model artifact and input data — not to training infrastructure.

**Role-based access control (RBAC)**: Define roles that reflect the AI lifecycle:
- **Data Engineer**: Access to raw data, data pipelines, feature store (write)
- **Data Scientist**: Access to training data (read), experiment tracking, model development environments
- **ML Engineer**: Access to model registry, deployment pipelines, model serving infrastructure
- **ML Operations**: Access to monitoring, alerting, incident management systems
- **Business User**: Access to model outputs (predictions, recommendations) through application interfaces
- **AI Auditor**: Read-only access to model documentation, performance metrics, audit logs

**Multi-factor authentication**: Require MFA for all access to AI infrastructure, particularly for administrative functions and access to sensitive data.

**Service-to-service authentication**: AI systems consist of multiple services (data pipelines, model servers, feature stores, monitoring) that communicate with each other. Use mutual TLS, service meshes (Istio, Linkerd), or API tokens to authenticate service-to-service communication.

**Secrets management**: Store credentials, API keys, database passwords, and encryption keys in a secrets management system (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) — never in code, configuration files, or environment variables.

#### Layer 2: Data Security

**Data classification**: Classify all data used in AI systems according to sensitivity:
- **Public**: Data that is publicly available (open datasets, published information)
- **Internal**: Data that is not sensitive but should not be public (general business data)
- **Confidential**: Data that could cause harm if disclosed (customer data, financial data, intellectual property)
- **Restricted**: Data subject to specific regulatory requirements (PII, PHI, PCI data, classified information)

**Encryption at rest**: All data stored in AI infrastructure (data lakes, feature stores, model registries, databases) should be encrypted at rest using strong encryption (AES-256 or equivalent). Use customer-managed encryption keys for sensitive data.

**Encryption in transit**: All data transmitted between AI system components should be encrypted in transit using TLS 1.2 or higher. This includes data flowing through APIs, message queues, and data pipelines.

**Data masking and anonymization**: When full data fidelity is not required (e.g., for development and testing), use data masking, anonymization, or synthetic data generation to protect sensitive information.

**Data access logging**: Log all access to sensitive data, including who accessed it, when, from where, and what they did with it. Retain logs for the period required by applicable regulations (often 1 to 7 years).

**Data retention and disposal**: Define retention policies for all data categories. When data is no longer needed, dispose of it securely (cryptographic erasure, physical destruction of media).

#### Layer 3: Model Security

**Model access control**: Restrict access to model artifacts (trained model files, model weights) to authorized personnel. Pre-trained models and model weights are valuable intellectual property.

**Model signing and verification**: Digitally sign model artifacts when they are created and verify the signature before deployment. This prevents unauthorized model modifications and ensures that only approved models are deployed to production.

**Input validation**: Validate all inputs to model serving APIs. Reject inputs that are outside the expected range, format, or distribution. This is the first line of defense against adversarial attacks and malformed inputs.

**Output filtering**: Filter model outputs to prevent the model from returning sensitive, harmful, or inappropriate content. For large language models, implement content safety classifiers and output guardrails.

**Rate limiting**: Limit the rate at which any single client can query a model API. This protects against model extraction attacks (which require many queries) and denial-of-service attacks.

**Model monitoring for adversarial inputs**: Monitor model inputs for patterns that suggest adversarial manipulation — inputs that are close to decision boundaries, inputs with unusual statistical properties, or sudden changes in input patterns.

#### Layer 4: Network Security

**Network segmentation**: Segment the network so that AI infrastructure is isolated from general corporate networks and from the internet. Use virtual private clouds (VPCs), subnets, and security groups to control network traffic.

**Private endpoints**: Access cloud AI services (model registries, training jobs, inference endpoints) through private endpoints rather than public internet. This keeps sensitive data and model traffic off the public internet.

**Web Application Firewall (WAF)**: Protect model serving APIs with a WAF that blocks common web attacks (SQL injection, cross-site scripting, request smuggling).

**DDoS protection**: Protect model serving infrastructure from distributed denial-of-service attacks using cloud-native DDoS protection services (AWS Shield, Azure DDoS Protection, Google Cloud Armor).

#### Layer 5: Supply Chain Security

**Dependency scanning**: Scan all open-source libraries and dependencies used in AI systems for known vulnerabilities. Use tools like Snyk, Dependabot, or Trivy. Update vulnerable dependencies promptly.

**Pre-trained model provenance**: When using pre-trained models (from Hugging Face, model zoos, or other sources), verify the provenance and integrity of the model. Scan for known vulnerabilities and backdoors.

**Container security**: AI systems are typically deployed in containers. Scan container images for vulnerabilities, use minimal base images, and enforce image signing and verification.

**Third-party AI service evaluation**: When using third-party AI services (OpenAI, Anthropic, Google), evaluate their security practices, data handling policies, and compliance certifications. Ensure that data sent to third-party services is appropriately classified and that contractual protections are in place.

### Security Frameworks and Standards

The CAIO should align AI security practices with established security frameworks:

**NIST AI Risk Management Framework (AI RMF)**: Provides a comprehensive framework for managing AI risks, including security risks. The AI RMF is organized around four functions: Govern, Map, Measure, and Manage. It is the most widely adopted AI risk management framework in the United States.

**NIST Cybersecurity Framework (CSF)**: The foundational cybersecurity framework, now in version 2.0. The CSF's five functions (Identify, Protect, Detect, Respond, Recover) apply directly to AI infrastructure security.

**ISO/IEC 27001**: The international standard for information security management systems (ISMS). ISO 27001 certification demonstrates that the organization has implemented a comprehensive security management system. AI infrastructure should be within the scope of the ISMS.

**ISO/IEC 42001**: The newly published international standard specifically for AI management systems. ISO 42001 addresses AI-specific risks including bias, transparency, and security, and provides a management system framework for AI governance.

**OWASP Machine Learning Security Top 10**: A practical list of the most critical security risks for machine learning systems, modeled on the OWASP Top 10 for web applications. Includes adversarial attacks, model theft, data poisoning, and other ML-specific risks.

**MITRE ATLAS (Adversarial Threat Landscape for AI Systems)**: A knowledge base of adversarial tactics and techniques against AI systems, modeled on the MITRE ATT&CK framework. Provides a structured vocabulary for discussing AI security threats and a basis for threat modeling.

### Vulnerability Management for AI Systems

AI vulnerability management extends traditional vulnerability management to address AI-specific risks:

**1. Threat modeling**: Conduct threat modeling for each AI system using MITRE ATLAS or a similar framework. Identify potential attack vectors, assess their likelihood and impact, and prioritize mitigation.

**2. Penetration testing**: Include AI-specific attacks in penetration testing programs. Test for adversarial evasion, prompt injection, model extraction, and other AI-specific vulnerabilities.

**3. Red teaming**: Establish or engage red teams that specialize in attacking AI systems. Red teaming is particularly important for large language models and other generative AI systems, where prompt injection and output safety are critical concerns.

**4. Bug bounty programs**: Consider extending bug bounty programs to include AI-specific vulnerabilities. Several organizations have launched AI-specific bug bounties.

**5. Incident response for AI security events**: Develop incident response procedures specific to AI security events (model compromise, data poisoning, adversarial attacks, prompt injection). These procedures should be integrated with the organization's broader incident response program.

---

## Bringing It Together: An Integrated Framework

The chargeback, auditing, and security disciplines described in this chapter are most effective when implemented as an integrated framework rather than separate initiatives.

### The AI Governance Operating Model

| Function | Chargeback | Auditing | Security |
|----------|------------|----------|----------|
| **Planning** | Annual AI budget, cost allocation model | Audit program, risk classification, audit calendar | Security architecture, threat model, security roadmap |
| **Execution** | Cost metering, invoicing, optimization | Audit execution, finding documentation, remediation tracking | Security controls implementation, vulnerability management, incident response |
| **Monitoring** | Cost dashboards, variance analysis, unit economics | Audit finding status, compliance status, model card completeness | Security monitoring, threat detection, access logging |
| **Reporting** | Monthly cost reports to business unit leaders, quarterly reports to CFO | Audit reports to CAIO, compliance reports to regulators, board reporting | Security posture reports to CISO, incident reports, risk reports |
| **Improvement** | Cost optimization program, vendor negotiations, architecture improvements | Audit program updates, standards alignment, process improvements | Security control enhancements, penetration test findings, red team insights |

### Organizational Responsibilities

**CAIO**: Sets the overall governance framework, ensures adequate investment in all three areas, reports to the board on AI governance maturity, and makes escalation decisions.

**CFO and Finance**: Partners on chargeback model design, budget planning, and cost reporting. Ensures AI financial governance aligns with broader corporate financial governance.

**CISO and Security**: Partners on AI security architecture, threat modeling, and incident response. Ensures AI security aligns with the broader information security program.

**Internal Audit**: Conducts or oversees AI audits, particularly compliance and operational audits. Ensures AI auditing aligns with the broader internal audit program.

**Legal and Compliance**: Advises on regulatory requirements, reviews audit findings, and supports compliance reporting.

**Business Unit Leaders**: Participate in cost allocation model design, receive chargeback invoices, support audit activities for their AI systems, and enforce security policies.

---

## Real-World Implementations

### Case Study 1: Global Bank — Integrated AI Financial Governance

**Context**: A top-20 global bank with $15 million in annual AI cloud spend was facing questions from the CFO about AI ROI and from regulators about model risk management.

**Implementation**:

*Chargeback*: The bank implemented a tiered chargeback model. Production AI workloads were fully charged to the business unit. Exploratory workloads up to $50,000 per quarter were funded by a central innovation budget. Shared platform costs were allocated 40 percent to the three largest consuming business units (weighted by usage) and 60 percent to a central technology budget.

*Auditing*: All AI models were classified into risk tiers aligned with the bank's existing model risk management (MRM) framework, consistent with regulatory guidance from the OCC and Federal Reserve. Tier 1 (high-risk) models — including credit decisioning, fraud detection, and anti-money laundering — received full technical, fairness, and compliance audits annually. Tier 2 models received technical and compliance audits every 18 months. Tier 3 (low-risk) models received self-assessment with spot-check audits.

*Security*: AI infrastructure was integrated into the bank's existing security architecture with additional controls for adversarial attack detection and model access management. A dedicated AI red team conducted quarterly exercises.

**Results**: The CFO gained complete visibility into AI spending by business unit and use case. Two underperforming AI projects (combined spend of $1.8 million annually) were identified and decommissioned. Regulatory examiners praised the bank's model risk management practices during their next examination. The AI red team identified three vulnerabilities in the fraud detection system that were remediated before exploitation.

### Case Study 2: Healthcare System — HIPAA-Aligned AI Auditing

**Context**: A large healthcare system deploying clinical AI across 20 hospitals needed to ensure HIPAA compliance, clinical safety, and operational accountability for its AI systems.

**Implementation**:

*Auditing*: The healthcare system created an AI Clinical Governance Committee — a cross-functional body including clinicians, data scientists, ethicists, compliance officers, and patient advocates. Every clinical AI system was required to undergo a governance review before deployment that included clinical validation, fairness assessment (across patient demographics), HIPAA compliance verification, and clinical workflow impact assessment. Post-deployment, systems were audited quarterly using a combination of automated monitoring (model performance, fairness metrics) and manual review (clinical outcome tracking, clinician feedback).

*Security*: All clinical AI systems were deployed within the healthcare system's HIPAA-compliant cloud environment with end-to-end encryption, strict access controls, and comprehensive audit logging. Patient data used for model training was de-identified using Safe Harbor and Expert Determination methods. Third-party AI services were evaluated for BAA (Business Associate Agreement) compliance.

**Results**: The healthcare system deployed 12 clinical AI systems over three years with zero HIPAA violations. Two systems were identified through post-deployment auditing as underperforming for specific patient populations — both were retrained with more representative data and re-validated before continuing in production.

### Case Study 3: Manufacturing Company — AI Cost Optimization

**Context**: A large manufacturing company had invested $8 million in AI infrastructure (cloud compute, ML platforms, data engineering tools) over two years but had no visibility into which facilities, use cases, or teams were consuming the resources.

**Implementation**:

*Cost metering*: The company implemented comprehensive resource tagging across its AWS environment, tagging every resource with facility, use case, team, and environment (dev/staging/production). AWS Cost Explorer and a custom Grafana dashboard provided real-time cost visibility.

*Showback (Phase 1)*: For the first six months, the company implemented showback — reporting costs to facility managers without charging them. This built awareness and identified obvious waste.

*Chargeback (Phase 2)*: After six months, the company transitioned to full chargeback for production workloads. Experimental workloads were funded by a $500,000 annual innovation budget managed by the CAIO.

*Optimization program*: The AI platform team conducted a cost optimization review that identified:
- $1.2 million in idle or underutilized GPU instances (terminated)
- $600,000 in savings from switching training workloads to spot instances
- $400,000 in savings from right-sizing model serving infrastructure
- $200,000 in savings from implementing inference caching

**Results**: Annual AI infrastructure costs decreased from $8 million to $5.5 million while supporting the same (and eventually more) workloads. Facility managers became active participants in AI cost management, proposing optimizations and decommissioning underperforming use cases.

### Case Study 4: Technology Company — AI Security Program

**Context**: A mid-size technology company offering an AI-powered SaaS product to enterprise customers was facing increasing security scrutiny from customers, particularly those in regulated industries (financial services, healthcare).

**Implementation**:

*Security architecture*: The company redesigned its AI infrastructure security with defense in depth:
- Network: VPC isolation, private endpoints, WAF protection
- Identity: RBAC with MFA, service mesh for inter-service authentication
- Data: AES-256 encryption at rest, TLS 1.3 in transit, customer-managed encryption keys for enterprise customers
- Model: Input validation, output filtering, rate limiting, model signing
- Supply chain: Automated dependency scanning, container image scanning, pre-trained model verification

*Compliance certifications*: The company obtained SOC 2 Type II certification with AI-specific controls. It aligned its AI practices with NIST AI RMF and ISO/IEC 42001.

*Customer transparency*: The company published an AI security whitepaper, created a trust portal with real-time compliance status, and offered customer-specific security reviews.

**Results**: Enterprise customer acquisition increased by 35 percent year-over-year as security concerns — previously the top objection in sales cycles — were addressed proactively. The company won three Fortune 500 contracts that had been blocked by security reviews. Zero AI security incidents in the 18 months following implementation.

---

## Best Practices Summary

### Chargeback Best Practices

1. Start with showback before implementing full chargeback to build cost awareness without disrupting adoption.
2. Use tiered models that balance accountability for production workloads with freedom for experimentation.
3. Implement comprehensive resource tagging and enforce it through policy automation.
4. Track unit economics for every production AI use case.
5. Conduct monthly cost reviews and maintain a continuous optimization program.

### Auditing Best Practices

1. Maintain a comprehensive inventory of all AI systems in production.
2. Classify AI systems by risk and align audit scope and frequency to risk level.
3. Audit fairness and bias alongside technical performance, especially for systems that affect individuals.
4. Require model cards for all production AI systems.
5. Track audit findings to remediation and report status to the CAIO and board.

### Security Best Practices

1. Apply defense in depth — no single security control should be the only protection.
2. Address AI-specific threats (adversarial attacks, data poisoning, prompt injection) alongside traditional security threats.
3. Include AI systems in vulnerability management, penetration testing, and red teaming programs.
4. Align with established frameworks (NIST AI RMF, ISO 42001, OWASP ML Top 10).
5. Conduct supply chain security assessments for all open-source and third-party AI components.

---

## Chapter Summary

Chargeback, auditing, and security are the governance disciplines that make AI sustainable, trustworthy, and resilient. The CAIO who invests in these disciplines builds an AI program that can withstand financial scrutiny, regulatory examination, and security threats — and that earns the trust of business leaders, customers, regulators, and the public. Organizations that neglect these disciplines build AI programs that are financially opaque, compliance-vulnerable, and security-fragile — programs that are one incident away from losing organizational support. The frameworks and practices described in this chapter provide the foundation for governance that enables, rather than inhibits, AI innovation at scale.
