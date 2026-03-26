# Creating Scalable Deployment Blueprints

## Introduction

A proof of concept that runs on a data scientist's laptop is not an AI solution. It is a hypothesis that has been partially validated. The leap from a working notebook to a production system that serves thousands of users, processes millions of transactions, maintains accuracy over time, and complies with regulatory requirements is where most AI initiatives falter. According to Gartner, more than 80% of AI projects never reach production. The cause is rarely a bad model — it is the absence of a scalable deployment blueprint.

A deployment blueprint is a parameterised architectural template that defines how an AI capability will be built, deployed, operated, monitored, and governed in production. It is the bridge between "the model works" and "the model works, reliably, at scale, every day, for years." This chapter provides the Chief AI Officer with the architectural patterns, design principles, and operational practices needed to create deployment blueprints that scale.

---

## Why Blueprints Matter

### The Cost of Ad Hoc Deployment

Without a blueprint, each AI project team invents its own deployment approach. This creates:

- **Inconsistent infrastructure** — different cloud services, container runtimes, networking configurations, and security postures across projects.
- **Duplicated effort** — every team builds its own CI/CD pipeline, monitoring dashboard, and logging infrastructure.
- **Operational blind spots** — no standardised way to detect model drift, data quality issues, or system failures.
- **Governance gaps** — no consistent audit trail, access control model, or explainability framework.
- **Knowledge silos** — when a team member leaves, no one else understands how the system works.

### The Blueprint Advantage

A well-designed blueprint delivers:

- **Faster deployment** — new use cases deploy in weeks instead of months because the infrastructure template is already proven.
- **Consistent operations** — every AI system is monitored, governed, and supported in the same way.
- **Lower total cost** — shared infrastructure reduces per-use-case cost.
- **Reduced risk** — standardised security, governance, and rollback procedures minimise operational and compliance risk.
- **Knowledge transfer** — new team members can understand any deployment because they all follow the same pattern.

---

## Deployment Architecture Patterns

The following patterns cover the vast majority of enterprise AI deployment scenarios. Each pattern is defined by its data flow, latency requirements, and operational characteristics.

### Pattern 1: Real-Time Inference

**Description:** A model served behind an API endpoint that processes individual requests and returns predictions with sub-second latency.

**Use cases:** Fraud detection, recommendation engines, chatbots, content personalisation, dynamic pricing, real-time risk scoring.

**Architecture:**

```
Client Request
    |
    v
API Gateway (auth, rate limiting, routing)
    |
    v
Load Balancer
    |
    v
Model Server (containerised) -- horizontal scaling
    |
    v
Feature Store (online) -- low-latency feature retrieval
    |
    v
Response (prediction + confidence score)
    |
    v
Logging Service -- prediction logging for monitoring
```

**Key design decisions:**

| Decision | Considerations |
|---|---|
| **Hosting** | Cloud-managed (SageMaker, Vertex AI, Azure ML) vs. self-managed (Kubernetes + Seldon/BentoML/TorchServe) |
| **Scaling** | Horizontal pod autoscaling based on request rate and latency |
| **Latency budget** | Total latency = feature retrieval + model inference + network. Allocate budget to each component. |
| **Batching** | Micro-batching incoming requests can improve GPU utilisation and throughput at the cost of slightly higher latency |
| **Model format** | ONNX, TensorRT, or framework-native (PyTorch, TensorFlow) depending on latency and compatibility requirements |
| **Caching** | Cache predictions for identical inputs to reduce compute cost |

**SLA targets (typical):**

| Metric | Target |
|---|---|
| Latency (p99) | < 200ms |
| Availability | 99.9% |
| Throughput | 1,000-100,000 requests/second |
| Error rate | < 0.1% |

### Pattern 2: Batch Scoring

**Description:** A model that processes a large dataset on a schedule, writing predictions to a database, data warehouse, or downstream system.

**Use cases:** Churn prediction, lead scoring, demand forecasting, credit risk assessment, marketing segmentation, inventory optimisation.

**Architecture:**

```
Scheduler (Airflow, Prefect, Step Functions)
    |
    v
Data Extraction (query source systems)
    |
    v
Feature Engineering (transform raw data to features)
    |
    v
Model Inference (batch prediction)
    |
    v
Post-processing (thresholding, formatting, business rules)
    |
    v
Output Write (database, warehouse, CRM, ERP)
    |
    v
Monitoring (data quality, model metrics, pipeline health)
```

**Key design decisions:**

| Decision | Considerations |
|---|---|
| **Scheduling** | Time-based (daily at 2 AM) vs. event-based (triggered when new data arrives) |
| **Compute** | Serverless (Lambda, Cloud Functions) for small jobs; managed Spark or GPU instances for large jobs |
| **Idempotency** | Ensure the pipeline can be re-run safely without creating duplicate predictions |
| **Partitioning** | Process data in partitions (by date, region, product) to enable incremental runs and parallelism |
| **Error handling** | Dead-letter queues for failed records; alerts for pipeline failures; automatic retry with backoff |

**SLA targets (typical):**

| Metric | Target |
|---|---|
| Completion time | Within SLA window (e.g., predictions ready by 6 AM for business day) |
| Data freshness | Predictions based on data no older than [threshold] |
| Coverage | > 99% of eligible records scored |
| Availability | Pipeline succeeds > 99% of scheduled runs |

### Pattern 3: Retrieval-Augmented Generation (RAG)

**Description:** A large language model augmented with a retrieval system that fetches relevant documents from a knowledge base before generating a response.

**Use cases:** Enterprise search, customer support, policy Q&A, research assistance, document summarisation, knowledge management.

**Architecture:**

```
User Query
    |
    v
Query Processing (intent classification, query reformulation)
    |
    v
Retrieval Engine
    |-- Vector Search (embedding similarity in vector DB)
    |-- Keyword Search (BM25 or hybrid)
    |-- Metadata Filtering (date, source, permission)
    |
    v
Context Assembly (rank, deduplicate, truncate to context window)
    |
    v
LLM Inference (prompt = system instructions + retrieved context + user query)
    |
    v
Post-processing (citation extraction, safety filtering, formatting)
    |
    v
Response (answer + source citations)
    |
    v
Feedback Capture (thumbs up/down, corrections)
```

**Key design decisions:**

| Decision | Considerations |
|---|---|
| **Vector database** | Pinecone, Weaviate, Qdrant, pgvector, or cloud-native (Vertex AI Vector Search, Azure AI Search) |
| **Embedding model** | OpenAI embeddings, Cohere, or open-source (sentence-transformers). Trade off between quality, cost, and latency. |
| **Chunking strategy** | Fixed-size, semantic, or hierarchical chunking. Chunk size affects retrieval precision and LLM context utilisation. |
| **LLM selection** | Cloud API (GPT-4, Claude, Gemini) vs. self-hosted (Llama, Mistral). Trade off between quality, cost, latency, and data residency. |
| **Grounding verification** | Implement automated checks that the generated answer is supported by the retrieved documents. |
| **Access control** | Ensure the retrieval system respects document-level permissions — users should only see answers derived from documents they are authorised to access. |

**SLA targets (typical):**

| Metric | Target |
|---|---|
| Latency (p90) | < 5 seconds (including retrieval + generation) |
| Relevance (retrieval) | > 80% of top-5 retrieved documents are relevant |
| Faithfulness | > 95% of generated claims are supported by retrieved context |
| Availability | 99.5% |

### Pattern 4: Event-Driven Inference

**Description:** A model triggered by a real-time event (transaction, sensor reading, user action) that processes the event and triggers a downstream action.

**Use cases:** Fraud detection, anomaly detection, IoT monitoring, real-time alerting, dynamic pricing, personalisation triggers.

**Architecture:**

```
Event Source (transaction system, IoT device, application event)
    |
    v
Event Stream (Kafka, Kinesis, Pub/Sub, EventBridge)
    |
    v
Stream Processor (Flink, Spark Streaming, custom consumer)
    |-- Feature enrichment (join with reference data)
    |-- Model inference (embedded model or API call)
    |-- Business rules (threshold, routing logic)
    |
    v
Action Dispatcher
    |-- Alert (notification, dashboard update)
    |-- Block (reject transaction, quarantine item)
    |-- Enrich (update CRM, tag record)
    |-- Log (write to audit trail)
```

**Key design decisions:**

| Decision | Considerations |
|---|---|
| **Latency** | End-to-end latency budget from event generation to action. Fraud detection may require < 100ms; alerting may tolerate seconds. |
| **Ordering** | Some use cases require events to be processed in order (time-series); others can tolerate out-of-order processing. |
| **Exactly-once semantics** | Financial and compliance applications may require exactly-once processing guarantees, which are more complex and expensive than at-least-once. |
| **Backpressure** | Design for traffic spikes (Black Friday, batch uploads, sensor bursts) with appropriate buffering and scaling. |

### Pattern 5: Edge Deployment

**Description:** A model deployed on edge devices (factory floor, retail store, vehicle, mobile device) rather than in the cloud.

**Use cases:** Visual quality inspection, autonomous vehicles, on-device personalisation, offline-capable applications, latency-sensitive IoT.

**Architecture:**

```
Edge Device (camera, sensor, mobile, embedded system)
    |
    v
On-device Model (optimised: ONNX Runtime, TensorRT, TFLite, CoreML)
    |
    v
Local Decision (inference result applied immediately)
    |
    v
Telemetry Upload (batch upload of inputs, predictions, and outcomes to cloud)
    |
    v
Cloud Training Pipeline (aggregate edge data, retrain model, push updates)
    |
    v
Model Update (OTA model deployment to edge fleet)
```

**Key design decisions:**

| Decision | Considerations |
|---|---|
| **Model optimisation** | Quantisation, pruning, distillation, and architecture search to fit models within edge device constraints (memory, compute, power). |
| **Connectivity** | Design for intermittent or no connectivity. The model must function autonomously. |
| **Update mechanism** | Over-the-air (OTA) model updates with versioning, rollback, and staged rollout. |
| **Data privacy** | Edge processing can avoid sending sensitive data (images, health data) to the cloud, supporting privacy-by-design. |
| **Fleet management** | Monitoring and managing hundreds or thousands of edge devices requires dedicated tooling. |

---

## Scalability Design Principles

Regardless of the deployment pattern, the following principles guide scalable AI system design.

### Principle 1: Separate Concerns

Decouple the model from the infrastructure. The model should be a pluggable component that can be updated, tested, and rolled back independently of the serving infrastructure. This is achieved through containerisation, model registries, and standardised serving interfaces.

### Principle 2: Design for Horizontal Scaling

Vertical scaling (bigger machines) has hard limits. Design for horizontal scaling (more machines) from the start:

- Stateless model servers that can be replicated across nodes.
- Partitioned data pipelines that distribute work across workers.
- Load balancers that distribute traffic evenly.
- Auto-scaling policies tied to meaningful metrics (request rate, latency, queue depth).

### Principle 3: Embrace Eventual Consistency

Not every AI decision needs to be based on the freshest possible data. Design the system to tolerate appropriate staleness:

- Feature stores can serve features that are minutes or hours old for many use cases.
- Batch-scored predictions can be refreshed daily rather than in real time.
- Recommendations can be pre-computed and cached.

Accepting appropriate staleness dramatically simplifies architecture and reduces cost.

### Principle 4: Design for Failure

Production AI systems will fail. Design to limit the blast radius:

- **Circuit breakers** — stop sending requests to a failing model server and return a fallback response.
- **Graceful degradation** — if the AI model is unavailable, fall back to a rules-based system or manual process.
- **Bulkheads** — isolate failures so that a problem with one model does not cascade to other services.
- **Retry with backoff** — automatically retry transient failures with exponential backoff.

### Principle 5: Instrument Everything

You cannot manage what you cannot measure. Instrument every component:

- **Model metrics** — accuracy, precision, recall, F1, AUC on production data.
- **System metrics** — latency, throughput, error rate, CPU/GPU utilisation, memory.
- **Data metrics** — input data distribution, feature completeness, missing values, schema compliance.
- **Business metrics** — the downstream business KPI that the AI system is designed to improve.

### Principle 6: Automate Relentlessly

Manual processes are the enemy of scale. Automate:

- **Testing** — unit tests, integration tests, model validation tests, data quality tests.
- **Deployment** — CI/CD pipelines that build, test, and deploy models and infrastructure.
- **Monitoring** — automated alerting on metric thresholds and anomaly detection on metrics themselves.
- **Retraining** — triggered retraining when data drift or performance degradation is detected.

---

## Blueprint Templates

A blueprint template is a parameterised document that can be instantiated for each new deployment. The following template covers the essential sections.

### Blueprint Template Structure

```
DEPLOYMENT BLUEPRINT: [Use Case Name]
Version: [X.Y]
Last Updated: [Date]
Owner: [Team/Individual]

1. OVERVIEW
   - Use case description
   - Business owner and stakeholders
   - AI capability used
   - Deployment pattern (real-time, batch, RAG, event-driven, edge)
   - Target SLA

2. ARCHITECTURE
   - Architecture diagram
   - Component inventory (with versions)
   - Data flow diagram
   - Integration points
   - Security boundaries

3. DATA
   - Input data sources and schemas
   - Feature engineering pipeline
   - Data quality requirements and checks
   - Data retention and lifecycle

4. MODEL
   - Model type and framework
   - Model registry location and version
   - Training pipeline reference
   - Performance benchmarks (accuracy, latency, throughput)
   - Retraining schedule and triggers

5. INFRASTRUCTURE
   - Compute requirements (CPU/GPU, memory, storage)
   - Networking (VPC, subnets, load balancers, firewalls)
   - Cloud services and accounts
   - Cost estimate (monthly / annual)

6. CI/CD
   - Repository and branching strategy
   - Build pipeline (steps, tools, duration)
   - Testing stages (unit, integration, model validation, smoke)
   - Deployment stages (dev, staging, production)
   - Rollback procedure
   - Approval gates

7. MONITORING AND OBSERVABILITY
   - Metrics collected (model, system, data, business)
   - Dashboards (links)
   - Alerting rules and escalation paths
   - On-call rotation
   - Incident response runbook

8. GOVERNANCE
   - Model lineage and audit trail
   - Access control matrix
   - Bias and fairness testing schedule
   - Explainability approach
   - Regulatory compliance checklist

9. SECURITY
   - Data encryption (at rest, in transit)
   - Authentication and authorisation
   - Vulnerability scanning schedule
   - Penetration testing history
   - Data classification

10. OPERATIONAL PROCEDURES
    - Startup and shutdown
    - Scaling procedures (manual and automatic)
    - Maintenance windows
    - Disaster recovery and business continuity
    - Support contacts and escalation path

11. CHANGE LOG
    - Date, author, description of changes
```

---

## Infrastructure Planning

### Compute Sizing

AI workloads have distinctive compute profiles:

| Workload | Characteristics | Sizing Approach |
|---|---|---|
| **Model training** | GPU-intensive, bursty, long-running | On-demand or spot GPU instances; scale to zero when idle |
| **Real-time inference** | CPU or GPU, steady or spiky, latency-sensitive | Right-size based on load testing; auto-scale with headroom |
| **Batch inference** | CPU or GPU, scheduled, throughput-oriented | Elastic compute that scales to meet SLA window |
| **Feature engineering** | CPU-intensive, data-heavy, scheduled | Managed Spark or serverless SQL |
| **Vector search** | Memory-intensive, latency-sensitive | Right-size based on index size and query rate |

### Cost Management

AI infrastructure costs can escalate rapidly. Control mechanisms include:

- **Right-sizing** — regularly review instance types and sizes against actual utilisation.
- **Spot/preemptible instances** — use for training and batch workloads that can tolerate interruption.
- **Reserved capacity** — commit to reserved instances for steady-state production workloads.
- **Auto-scaling** — scale down during off-peak hours.
- **Model optimisation** — smaller, distilled models reduce inference cost.
- **Caching** — cache frequent predictions to avoid redundant computation.
- **FinOps integration** — tag all AI resources, allocate costs to business units, and review monthly.

### Multi-Cloud and Hybrid Considerations

Some organisations operate across multiple clouds or in hybrid (cloud + on-premise) environments. Blueprint considerations include:

- **Data residency** — certain data must remain in specific geographies or on-premise due to regulation.
- **Portability** — use containerised, framework-agnostic model formats (ONNX) to avoid cloud lock-in.
- **Networking** — secure connectivity between cloud and on-premise environments (VPN, private link, direct connect).
- **Consistency** — use infrastructure-as-code (Terraform, Pulumi) to maintain consistent environments across clouds.

---

## CI/CD for AI

### Why AI CI/CD is Different

Traditional CI/CD pipelines build, test, and deploy code. AI CI/CD must additionally handle:

- **Data** — validating that training and serving data meets quality standards.
- **Models** — training, evaluating, versioning, and promoting models through environments.
- **Infrastructure** — provisioning and configuring model-serving infrastructure.
- **Monitoring setup** — deploying monitoring dashboards and alerting rules alongside the model.

### The AI CI/CD Pipeline

```
Code Change or Data Trigger
    |
    v
1. Data Validation
   - Schema check
   - Distribution check (drift detection)
   - Completeness check
   - Quality score
    |
    v
2. Feature Engineering
   - Compute features
   - Validate feature distributions
   - Update feature store
    |
    v
3. Model Training
   - Train model(s)
   - Log hyperparameters and metrics to experiment tracker
   - Register model in model registry
    |
    v
4. Model Validation
   - Evaluate on holdout test set
   - Compare to production model (champion-challenger)
   - Run bias and fairness tests
   - Validate explainability outputs
   - Check inference latency and throughput
    |
    v
5. Integration Testing
   - Deploy to staging environment
   - Run end-to-end integration tests
   - Validate API contracts
   - Load testing
    |
    v
6. Approval Gate
   - Automated checks passed
   - Human review (model review board, if required)
    |
    v
7. Production Deployment
   - Canary or blue-green deployment
   - Traffic ramp (1% -> 10% -> 50% -> 100%)
   - Monitoring activation
    |
    v
8. Post-Deployment Validation
   - Compare production metrics to staging
   - Monitor for data drift and performance degradation
   - Alert if rollback criteria triggered
```

### Testing Strategies for AI

| Test Type | What It Validates | Automation Level |
|---|---|---|
| **Unit tests** | Individual functions and transformations | Fully automated |
| **Data tests** | Data quality, schema, distribution | Fully automated |
| **Model tests** | Accuracy, bias, robustness, latency | Fully automated |
| **Integration tests** | End-to-end pipeline, API contracts | Fully automated |
| **Shadow tests** | Model runs in parallel with production; outputs compared but not served | Semi-automated |
| **A/B tests** | Model performance compared to control in live traffic | Semi-automated with statistical analysis |
| **Adversarial tests** | Model robustness to adversarial inputs | Semi-automated |

---

## Monitoring and Observability

### The Four Pillars of AI Monitoring

#### 1. Model Performance Monitoring

Track how well the model is performing its core prediction task:

- **Classification metrics** — accuracy, precision, recall, F1, AUC, confusion matrix.
- **Regression metrics** — MAE, RMSE, MAPE, R-squared.
- **Ranking metrics** — NDCG, MAP, MRR.
- **Generation metrics** — BLEU, ROUGE, human evaluation scores, faithfulness.

**Challenge:** Ground truth (actual outcomes) is often delayed. For churn prediction, you only know whether the customer churned weeks or months later. Design delayed-feedback loops that update performance metrics as ground truth becomes available.

#### 2. Data Monitoring

Track the quality and distribution of input data:

- **Schema compliance** — are all expected fields present with correct types?
- **Missing values** — are missing value rates within acceptable bounds?
- **Distribution drift** — has the statistical distribution of input features shifted since training?
- **Volume** — are we receiving the expected number of requests or records?

**Tools:** Evidently, Great Expectations, WhyLabs, custom dashboards on metrics infrastructure.

#### 3. System Monitoring

Track the health of the underlying infrastructure:

- **Latency** — p50, p90, p99 response times.
- **Throughput** — requests per second.
- **Error rate** — 4xx and 5xx responses.
- **Resource utilisation** — CPU, GPU, memory, disk, network.
- **Queue depth** — for batch and streaming systems, the size of the processing backlog.

**Tools:** Prometheus, Grafana, Datadog, CloudWatch, Azure Monitor, Google Cloud Monitoring.

#### 4. Business Monitoring

Track the business outcomes the AI system is designed to influence:

- **Revenue impact** — lift in conversion, average order value, or retention.
- **Cost impact** — reduction in processing time, error rate, or manual effort.
- **User engagement** — adoption rate, feature usage, user satisfaction.
- **Operational impact** — throughput improvement, cycle time reduction.

**Best practice:** Co-locate business metrics with model and system metrics on the same dashboard. This enables rapid diagnosis: if a business metric degrades, check whether the model metrics or system metrics explain it.

### Alerting Design

Design alerts with care to avoid alert fatigue:

| Alert Severity | Criteria | Response |
|---|---|---|
| **Critical** | System down, model accuracy dropped below minimum viable threshold, data pipeline failed | Page on-call engineer; initiate incident response |
| **Warning** | Latency elevated, data drift detected, accuracy declining but above threshold | Notify team; investigate within business hours |
| **Info** | Scheduled retraining completed, model promoted, configuration change applied | Log and review in weekly operations meeting |

---

## Rollback Strategies

### Why Rollback Matters

AI models can degrade subtly. Unlike a code bug that produces an error message, a degraded model produces plausible but incorrect predictions that may not be noticed for days. Rollback must be fast and reliable.

### Rollback Approaches

#### 1. Blue-Green Deployment

Maintain two identical production environments. Traffic is routed to the "blue" environment. Deploy the new model to the "green" environment. Switch traffic. If problems are detected, switch back to "blue."

**Advantage:** Instant rollback. Zero downtime.
**Disadvantage:** Requires double the infrastructure cost during deployment.

#### 2. Canary Deployment

Route a small percentage of traffic (1-5%) to the new model while the rest continues to the existing model. Monitor the canary for a defined period. If metrics are healthy, gradually increase traffic. If not, route all traffic back to the existing model.

**Advantage:** Limits blast radius. Enables real-world testing with minimal risk.
**Disadvantage:** Requires traffic-splitting infrastructure. Metrics may be noisy at low traffic percentages.

#### 3. Shadow Deployment

Run the new model in parallel with the existing model. Both receive the same inputs, but only the existing model's output is served to users. Compare outputs offline.

**Advantage:** Zero risk to users. Comprehensive comparison.
**Disadvantage:** No feedback on user-facing behaviour. Double compute cost.

#### 4. Model Version Rollback

Maintain a version history in the model registry. If the new model underperforms, redeploy the previous version.

**Advantage:** Simple and reliable.
**Disadvantage:** Requires that the model-serving infrastructure supports rapid version switching.

### Automated Rollback Triggers

Define conditions that automatically trigger rollback without human intervention:

- Model accuracy drops below a threshold for more than N consecutive minutes.
- Error rate exceeds a threshold.
- Latency exceeds SLA for more than N minutes.
- Data drift exceeds a defined statistical threshold.

---

## Multi-Region Deployment

### When Multi-Region Is Necessary

- **Latency requirements** — users in Asia should not be served by models in Europe.
- **Data residency** — regulations require data to be processed within specific geographies.
- **Availability** — regional outages should not bring down the global service.
- **Disaster recovery** — a secondary region can take over if the primary region fails.

### Multi-Region Architecture

```
Global Load Balancer (latency-based or geo-based routing)
    |
    |--> Region A: Model Server + Feature Store + Data Pipeline
    |--> Region B: Model Server + Feature Store + Data Pipeline
    |--> Region C: Model Server + Feature Store + Data Pipeline
```

### Multi-Region Challenges

| Challenge | Mitigation |
|---|---|
| **Model consistency** | Deploy the same model version to all regions simultaneously. Use a centralised model registry with region-aware deployment automation. |
| **Feature consistency** | Replicate feature store data across regions with defined consistency guarantees (eventual consistency is usually acceptable). |
| **Training data aggregation** | Training typically happens centrally. Aggregate data from all regions (respecting data residency rules) for training. Deploy the trained model back to all regions. |
| **Monitoring aggregation** | Aggregate monitoring data centrally for global visibility, while maintaining regional dashboards for local operations. |

---

## Containerisation and Orchestration

### Why Containers for AI

Containers (Docker) solve critical AI deployment challenges:

- **Environment consistency** — the same Python version, library versions, and system dependencies in development, testing, and production.
- **Portability** — deploy the same container to any cloud, on-premise server, or edge device that supports containers.
- **Isolation** — models with conflicting dependencies can run side by side.
- **Scalability** — container orchestrators (Kubernetes) enable horizontal scaling.

### Container Best Practices for AI

| Practice | Rationale |
|---|---|
| **Separate model from application** | Package the model as a data artefact, not baked into the container image. This allows model updates without rebuilding the container. |
| **Multi-stage builds** | Use multi-stage Docker builds to keep production images small (exclude training code, dev dependencies). |
| **Health checks** | Implement readiness and liveness probes so orchestrators can restart unhealthy containers. |
| **Resource limits** | Set CPU, memory, and GPU limits to prevent a single model from consuming all resources on a node. |
| **Immutable images** | Never modify running containers. All changes go through the CI/CD pipeline. |
| **Vulnerability scanning** | Scan container images for vulnerabilities in base images and dependencies. |

### Kubernetes for AI Workloads

Kubernetes is the dominant orchestration platform for production AI. Key components:

| Component | Purpose |
|---|---|
| **Deployments** | Manage model-server pods with rolling updates and rollback |
| **Horizontal Pod Autoscaler (HPA)** | Scale pods based on CPU, memory, or custom metrics (e.g., request queue depth) |
| **GPU scheduling** | Kubernetes supports GPU resource requests, ensuring GPU workloads land on GPU-enabled nodes |
| **Istio/Linkerd (service mesh)** | Provide traffic management, canary deployments, mutual TLS, and observability |
| **Knative** | Serverless model serving with scale-to-zero for intermittent workloads |
| **Kueue / Volcano** | Batch job scheduling for training workloads |

---

## Deployment Automation

### Infrastructure as Code (IaC)

All infrastructure should be defined in code, versioned, and deployed through automation:

- **Terraform** — cloud-agnostic infrastructure provisioning.
- **Pulumi** — infrastructure as code using general-purpose programming languages.
- **CloudFormation / Bicep / Deployment Manager** — cloud-native IaC for AWS, Azure, and GCP respectively.
- **Helm charts** — package Kubernetes deployments as reusable, parameterised charts.

### GitOps for AI

GitOps extends infrastructure as code by using Git as the single source of truth for both application code and infrastructure configuration:

1. All changes (code, model versions, configuration, infrastructure) are committed to Git.
2. An automated operator (ArgoCD, Flux) reconciles the desired state in Git with the actual state in the cluster.
3. Any drift between desired and actual state is detected and corrected.

**Benefit:** Complete audit trail, easy rollback (revert a Git commit), and consistent environments.

### Deployment Runbook

Every blueprint should include a deployment runbook — a step-by-step guide for deploying, updating, and rolling back the system:

```
DEPLOYMENT RUNBOOK: [Use Case Name]

PRE-DEPLOYMENT CHECKLIST
[ ] Model validated in staging (metrics above threshold)
[ ] Integration tests passed
[ ] Rollback procedure verified
[ ] On-call engineer identified
[ ] Stakeholders notified

DEPLOYMENT STEPS
1. Promote model version [X] from staging to production model registry
2. Update deployment configuration in Git (model version, scaling parameters)
3. ArgoCD detects change and begins rolling update
4. Monitor canary metrics for 30 minutes
5. If healthy: proceed to full rollout
6. If unhealthy: revert Git commit; ArgoCD rolls back automatically

POST-DEPLOYMENT CHECKS
[ ] Production metrics within expected range
[ ] Latency SLA met
[ ] Error rate below threshold
[ ] Business metrics stable
[ ] Monitoring dashboards updated

ROLLBACK PROCEDURE
1. Revert the deployment commit in Git
2. ArgoCD automatically redeploys previous version
3. Verify rollback successful (metrics return to baseline)
4. Notify stakeholders
5. Open incident report for investigation
```

---

## SLA Design

### Defining SLAs for AI Systems

AI systems require SLAs that go beyond traditional IT SLAs:

| SLA Component | Description | Example |
|---|---|---|
| **Availability** | Percentage of time the system is operational | 99.9% (8.76 hours downtime/year) |
| **Latency** | Response time at specified percentiles | p50 < 100ms, p99 < 500ms |
| **Throughput** | Volume of requests or records processed per unit time | 10,000 predictions/second |
| **Accuracy** | Model performance on production data | F1 > 0.85 on weekly evaluation |
| **Freshness** | Maximum age of the data used for predictions | Features no older than 1 hour |
| **Recovery time** | Time to restore service after a failure | RTO < 15 minutes |
| **Recovery point** | Maximum data loss in case of failure | RPO < 1 hour |

### SLA Tiers

Not every AI system needs a 99.99% SLA. Define tiers based on business criticality:

| Tier | Availability | Use Cases | Example |
|---|---|---|---|
| **Platinum** | 99.99% | Revenue-critical, customer-facing, real-time | Fraud detection, personalisation engine |
| **Gold** | 99.9% | Important but tolerant of brief outages | Lead scoring, demand forecasting |
| **Silver** | 99.5% | Internal tools, batch processing | Report generation, analytics |
| **Bronze** | 99.0% | Experimental, non-critical | Internal chatbots, prototype services |

### SLA Monitoring and Reporting

- **Real-time dashboards** — display current SLA compliance for each AI system.
- **Monthly SLA reports** — summarise uptime, latency, accuracy, and incidents for each system.
- **SLA breach post-mortems** — conduct a post-mortem for every SLA breach, identify root causes, and implement preventive measures.

---

## Real-World Deployment Blueprints

### Blueprint Example 1: E-Commerce Recommendation Engine

**Pattern:** Real-time inference with batch pre-computation.

**Architecture:**

- Hourly batch job computes candidate recommendations for each user segment and writes to a Redis cache.
- Real-time API re-ranks cached candidates based on current session context (device, time, recent clicks).
- A/B testing framework routes 10% of traffic to challenger model.

**Key decisions:**

- Hybrid batch + real-time approach balances latency (cached candidates, fast re-ranking) with freshness (session context).
- Redis cache provides sub-10ms retrieval for pre-computed candidates.
- Canary deployment for model updates; automated rollback if click-through rate drops below 95% of baseline for 2 hours.

**SLA:** 99.95% availability, p99 latency < 150ms, CTR within 5% of baseline or better.

### Blueprint Example 2: Manufacturing Quality Inspection

**Pattern:** Edge deployment with cloud training.

**Architecture:**

- 200 inspection cameras capture images on the production line.
- Edge inference devices (NVIDIA Jetson) run a YOLO-based defect detection model locally.
- Defects trigger immediate production-line alerts (< 50ms latency).
- All images and predictions are batched and uploaded to cloud storage every 15 minutes.
- Weekly cloud-based retraining incorporates new defect types and operator corrections.
- Model updates deployed OTA to edge fleet via staged rollout (10% -> 50% -> 100%).

**Key decisions:**

- Edge deployment eliminates cloud latency for time-critical quality decisions.
- Operator feedback loop enables continuous model improvement.
- Staged OTA deployment limits risk of deploying a degraded model to the entire fleet.

**SLA:** 99.9% per-camera availability, inference latency < 50ms, defect detection recall > 95%.

### Blueprint Example 3: Enterprise Knowledge Q&A

**Pattern:** Retrieval-augmented generation.

**Architecture:**

- Document ingestion pipeline processes internal wikis, policy documents, and Confluence pages nightly.
- Documents chunked, embedded, and indexed in a vector database (Qdrant).
- User queries processed through a FastAPI service that retrieves top-10 relevant chunks, assembles a prompt, and calls Claude API.
- Responses include source citations with links to original documents.
- Feedback (thumbs up/down, corrections) captured and reviewed weekly for retrieval quality improvement.

**Key decisions:**

- Nightly indexing acceptable because policy documents change infrequently.
- Access control enforced at retrieval time — user's permissions determine which document chunks are retrievable.
- Content safety filter applied to generated responses before delivery.
- Fallback to "I don't have enough information to answer this" when retrieval confidence is low, preventing hallucination.

**SLA:** 99.5% availability, p90 latency < 4 seconds, faithfulness score > 90% (weekly human evaluation).

---

## Key Takeaways

- **Choose the right deployment pattern.** Real-time, batch, RAG, event-driven, and edge patterns each suit different use case requirements. Select based on latency, throughput, and operational needs.
- **Design for scalability from the start.** Horizontal scaling, stateless services, and auto-scaling are not optimisations — they are foundational design choices.
- **Automate everything.** CI/CD pipelines, infrastructure as code, and automated monitoring remove human error and enable speed.
- **Monitor across four pillars.** Model performance, data quality, system health, and business outcomes must all be tracked and alerted.
- **Plan for rollback.** Blue-green, canary, and shadow deployments provide safety nets. Automated rollback triggers provide speed.
- **Use blueprint templates.** Parameterised templates make new deployments faster, more consistent, and easier to govern.
- **Tier your SLAs.** Not every system needs platinum-level availability. Match SLA investment to business criticality.
- **Containerise and orchestrate.** Docker and Kubernetes provide the consistency, portability, and scalability that production AI demands.
- **Instrument for business outcomes.** The ultimate measure of a deployment is whether it moves the business metric it was designed to improve.
