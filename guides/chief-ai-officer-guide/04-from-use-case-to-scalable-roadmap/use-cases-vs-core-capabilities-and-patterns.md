# Use Cases vs. Core Capabilities & Patterns

## Introduction

One of the most consequential decisions a Chief AI Officer makes is whether to invest in individual use cases or in the reusable capabilities that underpin them. Get this wrong and you build a portfolio of bespoke, siloed AI projects — each with its own data pipeline, model-serving infrastructure, monitoring stack, and support team. Get it right and you build a platform that makes every subsequent use case faster, cheaper, and more reliable to deliver.

This chapter draws a clear line between use cases, capabilities, and patterns. It explains why platform thinking is essential for scaling AI, catalogues the most common AI capability patterns, and provides practical guidance for building an AI capability catalog that serves as the foundation of your roadmap.

---

## The Three Layers of AI Investment

### Use Cases

A use case is a specific application of AI to a defined business problem. It has a named business owner, a target user, a measurable outcome, and a clear scope.

**Examples:**

- Predicting customer churn in the retail banking division.
- Classifying support tickets by product category and urgency.
- Generating first-draft marketing copy for seasonal campaigns.
- Detecting defects in automotive paint finishes using production-line cameras.

Use cases are where business value is realised. They are what the board cares about and what end users experience. But they are the top layer of a deeper stack.

### Capabilities

A capability is a reusable AI function that can serve multiple use cases. It is defined by what it does (classify text, extract entities, generate images, forecast time series), not by the specific business context in which it is applied.

**Examples:**

- **Text classification** — the ability to assign one or more labels to a piece of text. This capability serves support-ticket routing, email triage, document categorisation, sentiment analysis, and dozens of other use cases.
- **Entity extraction** — the ability to identify and extract structured data (names, dates, amounts, codes) from unstructured text. This serves contract analysis, medical record processing, invoice parsing, and regulatory document review.
- **Demand forecasting** — the ability to predict future values of a time series based on historical patterns. This serves inventory planning, staffing optimisation, revenue projection, and capacity planning.

Capabilities are where leverage lives. A single well-built capability can serve five, ten, or fifty use cases over its lifetime.

### Patterns

A pattern is an architectural template that describes how a class of capabilities is built, deployed, and operated. Patterns define the technical blueprint — the infrastructure, data flow, serving mechanism, and operational processes — independent of the specific model or business context.

**Examples:**

- **Real-time inference pattern** — a model served behind an API endpoint, processing individual requests with sub-second latency. Used for fraud detection, recommendation engines, and chatbots.
- **Batch scoring pattern** — a model that processes large datasets on a schedule (daily, weekly), writing results to a database or data warehouse. Used for churn prediction, lead scoring, and credit risk assessment.
- **Retrieval-augmented generation (RAG) pattern** — a large language model augmented with a retrieval system that fetches relevant documents from a knowledge base before generating a response. Used for enterprise search, customer support, and policy Q&A.
- **Event-driven pattern** — a model triggered by a real-time event (a transaction, a sensor reading, a user action) that processes the event and triggers a downstream action. Used for anomaly detection, alerting, and dynamic pricing.

Patterns are where operational excellence lives. A well-established pattern can be parameterised and reused, dramatically reducing the time and risk of deploying new capabilities.

---

## Why the Distinction Matters

### The Point-Solution Trap

Organisations that fail to distinguish use cases from capabilities inevitably fall into the point-solution trap. Each project team builds its own end-to-end stack:

- Team A builds a text classification pipeline for support tickets using Python, scikit-learn, and a custom Flask API deployed on a dedicated VM.
- Team B builds a text classification pipeline for document categorisation using Java, TensorFlow, and a Kubernetes deployment with a different CI/CD pipeline.
- Team C builds a text classification pipeline for sentiment analysis using a fine-tuned LLM served through a vendor API with yet another monitoring approach.

All three teams are solving fundamentally the same problem — classifying text — but none can reuse the other's work. The organisation pays three times for development, three times for infrastructure, three times for monitoring, and three times for maintenance. Worse, knowledge does not transfer between teams, and there is no shared playbook for how to build, deploy, and operate a text classification system.

### The Platform Advantage

Contrast this with an organisation that recognises text classification as a core capability and invests in a shared platform:

- A **feature store** that houses text embeddings and pre-processed features usable by any text classification model.
- A **model training pipeline** that supports multiple frameworks and automates hyperparameter tuning, evaluation, and versioning.
- A **model serving layer** that provides a standardised API for deploying any classification model with built-in monitoring, logging, and rollback.
- A **capability registry** that catalogues available models, their performance characteristics, and the use cases they serve.

In this world, Team A, Team B, and Team C each build a model (the use-case-specific part) but share everything else. Deployment takes days instead of months. Monitoring is consistent. Governance is centralised. And when a new use case for text classification arrives — say, compliance alert categorisation — the fourth team has a paved road to follow.

---

## Common AI Capability Patterns

The following is a reference catalog of the most widely applicable AI capability patterns. Understanding these patterns allows the CAIO to map use cases to capabilities and identify platform investment opportunities.

### 1. Classification

**What it does:** Assigns one or more labels to an input (text, image, tabular data, audio).

**Sub-types:**

- Binary classification (yes/no, fraud/not-fraud)
- Multi-class classification (assign one label from many)
- Multi-label classification (assign one or more labels from many)
- Hierarchical classification (assign labels within a taxonomy)

**Common use cases:** Spam detection, sentiment analysis, support-ticket routing, medical diagnosis, credit approval, document categorisation, defect detection.

**Key design considerations:**

- Class imbalance — many real-world classification problems have rare positive classes (fraud, defects). Techniques like oversampling, undersampling, and cost-sensitive learning are essential.
- Explainability — in regulated domains, stakeholders need to understand why a classification was made. Use interpretable models or post-hoc explanation techniques (SHAP, LIME).
- Confidence thresholds — not all predictions are equally confident. Design workflows that route low-confidence predictions to human reviewers.

### 2. Natural Language Processing (NLP)

**What it does:** Processes, understands, and generates human language.

**Sub-capabilities:**

- **Entity extraction** — identifying names, dates, amounts, locations, and domain-specific entities in text.
- **Text summarisation** — condensing long documents into shorter summaries.
- **Semantic search** — finding documents or passages based on meaning rather than keyword match.
- **Question answering** — providing direct answers to natural-language questions from a knowledge base.
- **Translation** — converting text between languages.
- **Text generation** — producing human-quality text for specified purposes (emails, reports, marketing copy).

**Common use cases:** Contract analysis, regulatory monitoring, customer support automation, knowledge management, content creation, medical record processing, patent analysis.

**Key design considerations:**

- **Domain adaptation** — general-purpose language models often underperform on specialised domains (legal, medical, financial). Fine-tuning or retrieval augmentation with domain-specific corpora is typically required.
- **Hallucination management** — generative language models can produce plausible but incorrect text. Design workflows with verification steps, source attribution, and human review for high-stakes applications.
- **Multilingual support** — global organisations need NLP capabilities that work across languages, including low-resource languages.

### 3. Computer Vision

**What it does:** Extracts information from images and video.

**Sub-capabilities:**

- **Image classification** — assigning labels to images (e.g., product category, defect type).
- **Object detection** — locating and identifying objects within an image (e.g., vehicles in satellite imagery, tumours in medical scans).
- **Semantic segmentation** — classifying each pixel in an image (e.g., road surface, lane markings, pedestrians in autonomous driving).
- **Optical character recognition (OCR)** — extracting text from images and documents.
- **Video analytics** — analysing video streams for events, objects, or patterns (e.g., security monitoring, manufacturing process analysis).

**Common use cases:** Quality inspection, medical imaging, document processing, autonomous vehicles, retail analytics, agricultural monitoring, security and surveillance.

**Key design considerations:**

- **Edge deployment** — many computer vision applications require inference at the point of image capture (factory floor, retail store, vehicle) rather than in the cloud. This demands optimised models and edge-computing infrastructure.
- **Labelling cost** — computer vision models typically require large volumes of labelled training data. Invest in labelling infrastructure and explore techniques like transfer learning, few-shot learning, and synthetic data generation.
- **Lighting and environment variability** — models must be robust to changes in lighting, camera angle, background, and other environmental factors. Data augmentation and domain randomisation help.

### 4. Recommendation Systems

**What it does:** Suggests items, actions, or content that a user is likely to find relevant or valuable.

**Sub-types:**

- **Collaborative filtering** — recommending based on the behaviour of similar users.
- **Content-based filtering** — recommending based on the attributes of items the user has interacted with.
- **Hybrid approaches** — combining collaborative and content-based signals.
- **Contextual recommendations** — incorporating real-time context (time, location, device, session behaviour).
- **Knowledge-graph-based recommendations** — leveraging entity relationships for more nuanced suggestions.

**Common use cases:** Product recommendation (e-commerce), content recommendation (media), next-best-action (sales), treatment recommendation (healthcare), job matching (HR), learning path recommendation (education).

**Key design considerations:**

- **Cold start** — new users and new items have no interaction history. Use content-based fallbacks, onboarding questionnaires, or popularity-based defaults.
- **Diversity and serendipity** — pure relevance optimisation can create filter bubbles. Intentionally inject diversity to expose users to a broader range of options.
- **Feedback loops** — recommendations influence user behaviour, which in turn influences future recommendations. Monitor for reinforcement of biases or narrowing of choices.
- **Real-time vs. batch** — some recommendations must be computed in real time (e.g., during a browsing session); others can be pre-computed in batch (e.g., daily email recommendations).

### 5. Forecasting

**What it does:** Predicts future values of a numeric variable based on historical patterns.

**Sub-types:**

- **Univariate forecasting** — predicting a single time series (e.g., daily sales of a product).
- **Multivariate forecasting** — predicting a time series using multiple related series as inputs (e.g., sales as a function of price, promotions, weather, and competitor activity).
- **Hierarchical forecasting** — producing consistent forecasts at multiple levels of aggregation (e.g., SKU, category, region, national).
- **Probabilistic forecasting** — generating a distribution of possible outcomes rather than a single point estimate, enabling risk-aware decision-making.

**Common use cases:** Demand planning, revenue projection, staffing optimisation, capacity planning, inventory management, energy load forecasting, financial budgeting.

**Key design considerations:**

- **Seasonality and trend** — most business time series exhibit seasonal patterns and long-term trends. Models must capture these explicitly.
- **External regressors** — many forecasts improve dramatically when external signals (weather, economic indicators, marketing spend, competitor actions) are incorporated.
- **Forecast horizon** — accuracy degrades with longer horizons. Match the forecast horizon to the decision cycle (daily for staffing, weekly for replenishment, quarterly for budgeting).
- **Intermittent demand** — many products have sporadic demand patterns (zero sales on most days). Standard methods break down; use specialised techniques like Croston's method or temporal aggregation.

### 6. Generation (Generative AI)

**What it does:** Produces new content — text, images, code, audio, video, or structured data — based on learned patterns.

**Sub-types:**

- **Text generation** — producing human-quality prose, dialogue, summaries, translations, or code.
- **Image generation** — creating images from text prompts or modifying existing images.
- **Code generation** — writing, completing, or transforming software code.
- **Data synthesis** — generating realistic synthetic data for testing, training, or privacy-preserving analytics.
- **Audio and video generation** — producing speech, music, or video content.

**Common use cases:** Content marketing, customer support automation, software development acceleration, synthetic data for model training, personalised communication, design prototyping, report generation.

**Key design considerations:**

- **Grounding** — generative models must be grounded in factual sources to avoid hallucination. Retrieval-augmented generation (RAG) is the primary architectural pattern for grounding.
- **Brand and tone control** — generated content must conform to organisational style guidelines. Fine-tuning, prompt engineering, and post-generation quality checks are essential.
- **Intellectual property** — generated content may inadvertently reproduce copyrighted material. Implement content-similarity checks and maintain provenance records.
- **Cost management** — large language model inference is expensive. Optimise through model selection (smaller models for simpler tasks), caching, and batching.

### 7. Anomaly Detection

**What it does:** Identifies data points, events, or patterns that deviate significantly from expected behaviour.

**Common use cases:** Fraud detection, cybersecurity threat detection, equipment failure prediction, quality control, network intrusion detection, financial transaction monitoring.

**Key design considerations:**

- **Unsupervised vs. supervised** — if labelled examples of anomalies exist, supervised methods are preferred. In most cases, anomalies are rare and unlabelled, requiring unsupervised or semi-supervised approaches.
- **False positive rate** — anomaly detection systems that generate too many false positives lose user trust. Tune thresholds carefully and design escalation workflows.
- **Concept drift** — what constitutes "normal" changes over time. Models must be retrained or adapted continuously.

### 8. Optimisation

**What it does:** Finds the best solution from a set of feasible solutions, subject to constraints.

**Common use cases:** Supply chain optimisation, workforce scheduling, route planning, portfolio optimisation, pricing strategy, resource allocation, network design.

**Key design considerations:**

- **Constraint modelling** — real-world optimisation problems have complex constraints (labour laws, vehicle capacities, delivery windows). Accurate constraint modelling is as important as the objective function.
- **Scalability** — many optimisation problems are computationally intensive. Heuristic methods, decomposition techniques, or AI-assisted metaheuristics may be needed for large-scale problems.
- **Human override** — optimisation outputs are suggestions. Design interfaces that allow human operators to understand, adjust, and override recommendations.

---

## Capability Mapping

Capability mapping is the process of linking your organisation's use case portfolio to the underlying AI capabilities required to deliver them. It reveals where capability investments create the most leverage.

### The Mapping Process

1. **List all candidate and active use cases** from your discovery pipeline and current portfolio.
2. **Identify the primary AI capability** each use case requires (classification, NLP, vision, recommendation, forecasting, generation, anomaly detection, optimisation).
3. **Identify the architectural pattern** each use case requires (real-time inference, batch scoring, RAG, event-driven, etc.).
4. **Create a matrix** with use cases as rows and capabilities/patterns as columns. Mark each intersection.

### Example Capability Map

| Use Case | Classification | NLP | Vision | Recommendation | Forecasting | Generation | Anomaly Detection | Pattern |
|---|---|---|---|---|---|---|---|---|
| Support ticket routing | X | X | | | | | | Real-time |
| Churn prediction | X | | | | | | | Batch |
| Product recommendation | | | | X | | | | Real-time |
| Demand forecasting | | | | | X | | | Batch |
| Quality inspection | | | X | | | | X | Edge real-time |
| Contract analysis | | X | | | | X | | Batch / RAG |
| Fraud detection | X | | | | | | X | Event-driven |
| Marketing copy generation | | X | | | | X | | RAG |
| Invoice processing | X | X | X (OCR) | | | | | Batch |
| Regulatory monitoring | | X | | | | X | | Event-driven / RAG |

### Insights from the Map

Looking across the columns reveals where capability investments create the most value:

- **NLP** is required by 5 of 10 use cases — a strong case for a shared NLP platform.
- **Classification** is required by 4 of 10 — shared training pipelines and serving infrastructure for classification models would benefit multiple teams.
- **Generation** is required by 3 of 10 — a centrally managed LLM gateway with prompt management, cost tracking, and content safety guardrails would serve multiple use cases.

Looking across the rows for the "Pattern" column reveals infrastructure investment priorities:

- **Real-time inference** is needed by 3 use cases — invest in a shared model-serving platform with low-latency capability.
- **Batch scoring** is needed by 3 use cases — invest in a shared batch orchestration pipeline.
- **RAG** is needed by 3 use cases — invest in a shared retrieval infrastructure (vector database, document ingestion pipeline, embedding models).

---

## Platform Thinking for AI

Platform thinking shifts the AI investment thesis from "build a model for each use case" to "build a platform that makes building models easy."

### The AI Platform Stack

A mature AI platform provides shared services across the following layers:

| Layer | Components | Value |
|---|---|---|
| **Data platform** | Data lake/warehouse, feature store, data cataloging, data quality monitoring | Ensures every team works with consistent, high-quality, governed data. |
| **Experimentation** | Notebook environments, experiment tracking, model registry, hyperparameter tuning | Accelerates model development and ensures reproducibility. |
| **Training** | Managed compute (GPU/TPU), distributed training, AutoML, pipeline orchestration | Reduces the time and expertise required to train models. |
| **Serving** | Model-serving infrastructure (real-time, batch, streaming), A/B testing, traffic management | Provides a standardised, reliable path from model to production. |
| **Monitoring** | Model performance monitoring, data drift detection, alerting, dashboard | Ensures production models remain accurate and reliable. |
| **Governance** | Model lineage, audit trails, access control, bias monitoring, explainability tools | Enables compliance and trust. |
| **LLM gateway** | Prompt management, token tracking, cost allocation, content safety filters, model routing | Centralises LLM usage for cost control, safety, and governance. |

### Build vs. Buy the Platform

Few organisations should build an AI platform from scratch. The decision matrix looks like this:

| Component | Build | Buy / Managed Service |
|---|---|---|
| **Feature store** | Only if you have unique requirements | Prefer managed (Tecton, Feast + cloud, Databricks Feature Store) |
| **Experiment tracking** | Rarely justified | MLflow, Weights & Biases, Neptune |
| **Model serving** | Only for extreme scale/latency | Seldon, BentoML, SageMaker Endpoints, Vertex AI |
| **Monitoring** | Custom dashboards on top of platform | Evidently, Arize, WhyLabs, Fiddler |
| **LLM gateway** | For custom routing/safety | LiteLLM, Portkey, cloud-native gateways |
| **Governance** | Often custom to comply with specific regulations | Combine vendor tools with custom policy enforcement |

The CAIO's role is to ensure that platform investment is proportional to the size and diversity of the use case portfolio. An organisation with three AI use cases does not need a full platform stack. An organisation with thirty does.

### The Platform Flywheel

Platform investment creates a flywheel:

1. **Reduced time to deployment** — new use cases ship faster because infrastructure is already in place.
2. **Lower cost per use case** — shared infrastructure amortises fixed costs across more use cases.
3. **Higher quality** — centralised monitoring and governance improve reliability and trust.
4. **More use cases** — faster, cheaper, higher-quality delivery encourages business units to propose more use cases.
5. **More platform investment** — a larger portfolio justifies deeper platform investment.

This flywheel is the mechanism through which organisations escape PoC purgatory and achieve AI at scale.

---

## Architectural Patterns for Reuse

Beyond individual capabilities, certain architectural patterns recur across use cases and can be standardised.

### Pattern 1: The Feature Pipeline

A reusable pipeline that ingests raw data, transforms it into features, and stores those features in a feature store for use by multiple models.

**Reuse opportunity:** Multiple models often need the same features (customer tenure, rolling transaction averages, text embeddings). Computing these once and storing them centrally eliminates redundant work and ensures consistency.

### Pattern 2: The Inference Gateway

A centralised API gateway that routes inference requests to the appropriate model, handles authentication, rate limiting, logging, and monitoring.

**Reuse opportunity:** Every real-time AI service needs an API, authentication, logging, and monitoring. Building these once as a shared gateway eliminates per-model overhead.

### Pattern 3: The RAG Pipeline

A standardised pipeline that ingests documents, chunks them, generates embeddings, stores them in a vector database, and provides a retrieval API that LLMs can call during generation.

**Reuse opportunity:** Every knowledge-grounded generative AI application (enterprise search, policy Q&A, customer support, research assistance) needs the same retrieval infrastructure. Building it once enables rapid deployment of new RAG-based use cases.

### Pattern 4: The Feedback Loop

A standardised mechanism for capturing user feedback (thumbs up/down, corrections, overrides), linking it to model predictions, and feeding it back into the training pipeline for model improvement.

**Reuse opportunity:** Every human-in-the-loop AI application benefits from continuous learning. A shared feedback pipeline makes this possible without custom engineering for each use case.

### Pattern 5: The Batch Scoring Pipeline

A standardised pipeline that runs models on a schedule (hourly, daily, weekly) against a dataset, writes predictions to a target system (database, data warehouse, CRM), and logs results for monitoring.

**Reuse opportunity:** Many AI applications (churn scoring, lead scoring, demand forecasting, risk assessment) follow the batch-scoring pattern. A parameterised batch pipeline that accepts a model, a dataset, and a target reduces deployment to configuration.

### Pattern 6: The Event-Driven Pipeline

A standardised pipeline that consumes events from a streaming platform (Kafka, Kinesis, Pub/Sub), applies a model, and triggers downstream actions (alerts, API calls, database writes).

**Reuse opportunity:** Fraud detection, anomaly detection, real-time personalisation, and IoT monitoring all follow the event-driven pattern. A shared streaming pipeline reduces per-use-case engineering.

---

## The Capability Maturity Model

Organisations progress through predictable stages as they build AI capabilities. Understanding where you are on this spectrum informs investment priorities.

### Stage 1: Ad Hoc (Individual Use Cases)

- Each use case is built as a standalone project.
- No shared infrastructure, tools, or processes.
- High per-use-case cost and time.
- Knowledge lives in individual teams.
- Common in organisations with 1-5 AI projects.

**CAIO priority:** Deliver initial use cases successfully while documenting the capabilities and patterns they require, building the case for shared investment.

### Stage 2: Managed (Shared Tools, Separate Teams)

- Common tools adopted (e.g., shared MLflow instance, common cloud account).
- Some process standardisation (model review, deployment checklist).
- Teams still work independently but share knowledge informally.
- Per-use-case cost begins to decrease.
- Common in organisations with 5-15 AI projects.

**CAIO priority:** Formalise capability definitions. Identify the two or three most reused capabilities and invest in shared infrastructure for them.

### Stage 3: Platform (Shared Infrastructure, Governed)

- A dedicated AI platform team provides shared services.
- Standardised feature pipelines, model-serving infrastructure, and monitoring.
- Capability catalog documents available models and services.
- Governance is centralised (model review board, bias testing, audit trails).
- Per-use-case cost is significantly lower; time-to-deployment measured in weeks.
- Common in organisations with 15-50 AI projects.

**CAIO priority:** Optimise the platform for developer experience. Invest in self-service capabilities that enable business units to deploy standard use cases without data science team involvement.

### Stage 4: Industrialised (AI as a Service)

- AI capabilities are exposed as internal services with SLAs, documentation, and support.
- Business units consume AI capabilities through APIs and no-code interfaces.
- Continuous improvement is automated (A/B testing, automated retraining, drift detection).
- The organisation produces AI capabilities faster than it can identify use cases for them.
- Common in organisations with 50+ AI projects.

**CAIO priority:** Focus on use case discovery and business adoption rather than technology delivery. The platform runs itself; the bottleneck is now demand generation and change management.

---

## Building an AI Capability Catalog

An AI capability catalog is a living inventory of the AI capabilities your organisation has built, is building, or intends to build. It serves as a matchmaking tool between business needs and available technology.

### Catalog Structure

Each entry in the catalog should contain:

| Field | Description |
|---|---|
| **Capability name** | Descriptive name (e.g., "Text Classification," "Demand Forecasting") |
| **Description** | What the capability does, in business language |
| **Capability type** | Classification, NLP, vision, recommendation, forecasting, generation, anomaly detection, optimisation |
| **Maturity** | Concept, PoC, Pilot, Production, Retired |
| **Active use cases** | List of use cases currently served by this capability |
| **Potential use cases** | List of candidate use cases that could be served |
| **Owner** | The team or individual responsible for the capability |
| **Technical stack** | Models, frameworks, infrastructure, and dependencies |
| **Performance metrics** | Current accuracy, latency, throughput, and other relevant metrics |
| **Data requirements** | What data the capability needs and where it comes from |
| **API/interface** | How other systems or users access the capability |
| **Governance status** | Bias testing, explainability, regulatory approval status |
| **Reuse score** | Number of use cases served, breadth of applicability |
| **Cost** | Infrastructure, licensing, and maintenance costs |

### Catalog Governance

- **New entry process** — every new AI project must check the catalog before building. If an existing capability can serve the need, the project must use it (or justify why it cannot).
- **Regular review** — review the catalog quarterly. Retire deprecated capabilities, update performance metrics, and identify gaps.
- **Searchability** — make the catalog easily searchable by capability type, use case, business function, and data domain. A simple internal wiki or service catalog tool works well.

---

## Real-World Examples: Platform vs. Point Approaches

### Example 1: A Global Retailer's NLP Platform

**Context:** A retailer with operations in 15 countries needed NLP capabilities for customer review analysis, support-ticket routing, product description generation, and regulatory compliance monitoring.

**Point approach (initial state):** Four separate teams built four separate NLP solutions, each with its own data pipeline, model, and serving infrastructure. Total investment: $4.8 million. Average time from request to deployment: 9 months.

**Platform approach (after transformation):** The CAIO consolidated NLP into a shared platform with a common text-processing pipeline, embedding infrastructure, fine-tuning toolkit, and serving layer. New NLP use cases could be deployed in 4-6 weeks. The platform served 12 use cases within 18 months. Total platform investment: $2.1 million. Per-use-case marginal cost dropped from $1.2 million to $180,000.

### Example 2: A Financial Institution's Fraud Detection Capability

**Context:** A bank needed fraud detection across credit cards, wire transfers, ACH payments, and mobile payments.

**Point approach considered:** Build four separate fraud models, each tuned to its payment type.

**Platform approach adopted:** Build a shared anomaly-detection capability with a common feature engineering pipeline (transaction velocity, amount deviation, geolocation signals, entity graph features), a shared model-training infrastructure, and a shared real-time inference gateway. Each payment type became a different "configuration" of the same capability — different features, thresholds, and rules, but the same infrastructure.

**Result:** Time to deploy fraud detection for a new payment type dropped from 8 months to 6 weeks. False positive rates improved by 15% due to shared feature engineering across payment types. Total cost of ownership dropped by 40% compared to the point-solution approach.

### Example 3: A Healthcare System's Computer Vision Investment

**Context:** A healthcare system needed computer vision for radiology image analysis, pathology slide review, and patient identification at check-in.

**Platform approach adopted:** Rather than build three separate computer vision systems, the organisation invested in a shared medical imaging platform with common DICOM/image ingestion, annotation tools, training pipelines, and a shared inference service with HIPAA-compliant security controls.

**Result:** The third use case (patient identification) was deployed in one-third the time of the first (radiology), because the platform was already in place. Regulatory compliance was consistent across all three applications, simplifying audit and approval processes.

---

## Making the Platform Investment Case

The CAIO often faces resistance to platform investment because it requires upfront spending before additional use cases materialise. Here is how to build the case:

### The Cost Avoidance Argument

Calculate the total cost of building, deploying, and maintaining each use case independently. Multiply by the expected number of use cases over three years. Compare to the cost of the platform plus marginal per-use-case cost. The breakeven typically occurs between use case three and use case five.

### The Speed Argument

Show the current average time from use-case approval to production deployment. Project how platform investment reduces this timeline. Faster deployment means earlier value capture — the time-value of money makes this a compelling financial argument.

### The Risk Argument

Fragmented, ungoverned AI deployments create compliance, security, and quality risks. A shared platform with centralised governance reduces these risks. For regulated industries, this argument alone can justify the investment.

### The Talent Argument

Data scientists and ML engineers want to work with modern, well-maintained infrastructure. A shared platform improves developer experience, which improves retention and recruitment — a significant advantage in a talent-scarce market.

---

## Key Takeaways

- **Distinguish use cases from capabilities from patterns.** Use cases deliver business value; capabilities provide reusable functions; patterns provide repeatable architectures.
- **Map your portfolio.** Create a capability map that links use cases to the capabilities and patterns they require. Identify where shared investment creates the most leverage.
- **Think in platforms, not projects.** Platform investment creates a flywheel: faster, cheaper, better, which drives more use cases, which justifies more platform investment.
- **Progress through maturity stages deliberately.** Understand where your organisation sits on the capability maturity model and invest accordingly.
- **Build and maintain a capability catalog.** A living inventory of AI capabilities serves as the matchmaking layer between business needs and technology availability.
- **Know the common patterns.** Classification, NLP, computer vision, recommendation, forecasting, generation, anomaly detection, and optimisation cover the vast majority of enterprise AI use cases. Build deep expertise in the patterns most relevant to your portfolio.
- **Make the business case for platforms.** Use cost avoidance, speed, risk reduction, and talent retention as the four pillars of the platform investment argument.
