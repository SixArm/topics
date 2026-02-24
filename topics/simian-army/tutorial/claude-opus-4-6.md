# Simian Army

The Simian Army is a suite of open-source tools originally developed by Netflix to test the resilience, reliability, and operational hygiene of its Amazon Web Services (AWS) cloud infrastructure. First introduced around 2011, the Simian Army works by intentionally injecting faults, including random instance terminations, artificial latency, and simulated region failures, into production environments. The philosophy behind the Simian Army is that the best way to validate a system's ability to withstand real-world failures is to cause those failures deliberately, under controlled conditions, and observe how the system responds. The Simian Army became one of the earliest and most influential implementations of what is now broadly known as chaos engineering, and its principles have shaped how organizations worldwide approach distributed systems reliability.

## Origins at Netflix

Netflix migrated its infrastructure from traditional data centers to AWS beginning in 2008. This shift to cloud computing introduced new categories of failure. Virtual instances could disappear without warning, network connectivity between services could degrade unpredictably, and entire availability zones could experience outages. Rather than hoping these failures would not occur, Netflix engineering leadership, guided by a culture of "freedom and responsibility," decided to embrace failure as inevitable and build systems that could tolerate it automatically. The Simian Army emerged from this mindset. By running tools that continuously introduced faults into production, Netflix engineers were forced to design services that could self-heal, degrade gracefully, and maintain availability even when individual components failed.

## Core Monkeys and Their Roles

The Simian Army comprises several specialized tools, each targeting a different aspect of infrastructure reliability, security, or operational discipline. Each tool is informally named as a type of "monkey."

| Monkey | Purpose | What It Does |
|--------|---------|-------------|
| Chaos Monkey | Instance resilience | Randomly terminates production virtual machine instances to verify that services can survive the loss of individual nodes |
| Latency Monkey | Network tolerance | Injects artificial delays into RESTful client-server communications to test how services behave when dependencies respond slowly or not at all |
| Chaos Kong | Regional failover | Simulates the loss of an entire AWS region to validate that the system can redirect traffic and continue operating from other regions |
| Conformity Monkey | Best-practice compliance | Identifies instances that do not conform to predefined best practices, such as missing tags, incorrect instance types, or non-standard configurations, and flags or terminates them |
| Janitor Monkey | Resource cleanup | Scans the environment for unused or orphaned resources such as detached volumes, old snapshots, and idle instances, then cleans them up to reduce cost and clutter |
| Security Monkey | Security monitoring | Monitors AWS configurations for security violations such as overly permissive security groups, unencrypted storage, or publicly accessible resources |
| Doctor Monkey | Health checking | Performs instance-level health checks, detects unhealthy instances, and removes them from service to prevent degraded performance |
| 10-18 Monkey | Internationalization | Detects issues related to localization and internationalization by testing systems with different language and locale configurations |

## How Chaos Monkey Works

Chaos Monkey is the most well-known component of the Simian Army and the one most directly associated with the chaos engineering movement. It operates on a simple but powerful principle: during business hours, it randomly selects running production instances and terminates them. The reasoning is that if engineers know their instances can be killed at any time, they will design services to be stateless, redundant, and capable of automatic recovery.

- **Scheduling:** Chaos Monkey runs during normal business hours so that engineers are available to observe and respond to any unexpected behavior.
- **Scope control:** Teams can configure which applications or clusters are included or excluded, allowing gradual adoption.
- **Randomized selection:** Instances are chosen at random within the configured scope, preventing engineers from predicting or gaming which services will be tested.
- **Automated recovery validation:** The expectation is that auto-scaling groups, load balancers, and health checks will automatically replace terminated instances without user-facing impact.

## Chaos Kong and Regional Resilience

While Chaos Monkey tests resilience at the individual instance level, Chaos Kong raises the stakes to an entire AWS region. This tool simulates a catastrophic failure in which all resources within a region become unavailable. Organizations running multi-region architectures must be able to detect the regional failure, reroute DNS and traffic to surviving regions, and continue serving users with minimal disruption.

Chaos Kong exercises validate several critical capabilities:

- DNS failover and traffic rerouting
- Cross-region data replication and consistency
- Capacity planning to absorb traffic from a failed region
- Monitoring and alerting for large-scale outages
- Runbook accuracy and team readiness for disaster recovery

## Conformity Monkey and Operational Discipline

Conformity Monkey addresses a different kind of risk: configuration drift and non-compliance with organizational standards. In large cloud environments with hundreds of teams deploying thousands of instances, it is common for resources to deviate from established best practices over time. Conformity Monkey continuously scans the environment and identifies instances that violate rules such as:

- Missing or incorrect resource tags needed for cost allocation and ownership tracking
- Use of deprecated AMIs (Amazon Machine Images) or instance types
- Instances running without proper auto-scaling group membership
- Resources deployed outside of approved regions or availability zones

By automatically flagging or shutting down non-conforming resources, Conformity Monkey enforces operational hygiene at scale and prevents the accumulation of technical debt in cloud infrastructure.

## Security Monkey and Cloud Security Posture

Security Monkey focuses on monitoring AWS account configurations for security vulnerabilities and policy violations. It tracks changes to security groups, IAM policies, S3 bucket permissions, and other AWS resource configurations, alerting teams when potentially dangerous configurations are detected.

Key capabilities include:

- Tracking changes to AWS security groups and identifying overly permissive rules
- Monitoring S3 bucket policies for public access
- Auditing IAM roles and policies for excessive privileges
- Detecting unencrypted EBS volumes or RDS instances
- Providing a historical audit trail of configuration changes

Security Monkey was eventually succeeded by open-source tools and AWS-native services such as AWS Config, AWS Security Hub, and third-party cloud security posture management (CSPM) platforms, but it pioneered the concept of continuous cloud security monitoring.

## Janitor Monkey and Cost Optimization

Cloud environments accumulate unused resources over time: detached EBS volumes, old AMI snapshots, idle load balancers, and instances left running after experiments conclude. Janitor Monkey identifies these orphaned resources and either marks them for deletion after a grace period or removes them automatically.

| Resource Type | Detection Criteria | Action |
|--------------|-------------------|--------|
| Detached EBS volumes | No instance attachment for a configurable period | Mark for deletion, then delete after grace period |
| Old AMI snapshots | Age exceeds retention policy | Flag for review and cleanup |
| Idle instances | Low CPU and network utilization over extended period | Notify owner, then terminate if no response |
| Unused Elastic IPs | Allocated but not associated with a running instance | Release after grace period |
| Orphaned security groups | Not attached to any resource | Flag for review and removal |

## Evolution and Legacy

Netflix eventually retired or replaced several Simian Army components as the cloud ecosystem matured and better alternatives emerged. Chaos Monkey was rewritten and open-sourced as a standalone tool integrated with Spinnaker, Netflix's continuous delivery platform. Security Monkey was deprecated in favor of more comprehensive cloud security tools. Janitor Monkey's resource cleanup functionality was absorbed into broader cloud governance platforms.

However, the Simian Army's legacy is substantial. It established several principles that are now foundational to modern site reliability engineering and cloud operations:

- **Failure should be expected, not feared.** Systems should be designed from the start to tolerate component failures.
- **Test in production.** Staging environments cannot fully replicate production complexity, so controlled production testing is necessary to build genuine confidence.
- **Automate discipline.** Compliance, security, and cost optimization should be continuously enforced by automated tools rather than periodic manual audits.
- **Culture matters.** The Simian Army succeeded at Netflix because leadership supported a culture where teams were accountable for the resilience of their own services.

## Chaos Engineering Today

The Simian Army catalyzed the broader chaos engineering movement. Today, numerous tools and platforms build on the principles Netflix pioneered.

| Tool/Platform | Scope | Key Differentiator |
|--------------|-------|--------------------|
| Chaos Monkey (Spinnaker) | Instance termination on AWS | Netflix's original tool, now integrated with Spinnaker CD |
| Gremlin | Multi-cloud fault injection | Commercial platform offering a wide range of attack vectors with safety controls |
| Litmus | Kubernetes-native chaos | Open-source chaos engineering framework designed specifically for Kubernetes environments |
| AWS Fault Injection Simulator | AWS services | Fully managed AWS service for running fault injection experiments against AWS resources |
| Chaos Mesh | Kubernetes-native chaos | CNCF project providing comprehensive fault injection for Kubernetes clusters |
| Steadybit | Multi-environment reliability | Commercial platform emphasizing reliability validation across development and production |

These tools extend the Simian Army's original vision beyond random instance termination to include network fault injection, DNS failures, CPU and memory stress, disk I/O saturation, and application-level faults. Modern chaos engineering also emphasizes the use of formal experiment design with hypotheses, steady-state definitions, blast radius controls, and automated rollback.

## Related

Technology professionals studying the Simian Army should explore chaos engineering as a broader discipline, including the foundational text "Chaos Engineering: System Resiliency in Practice" by Casey Rosenthal and Nora Jones. Site reliability engineering (SRE) practices, as documented in Google's SRE books, provide complementary approaches to building reliable distributed systems. Fault injection testing, game days, and disaster recovery planning are related operational practices. Cloud infrastructure automation using tools like Terraform and Spinnaker provides context for how chaos experiments integrate into continuous delivery pipelines. Resilience patterns such as circuit breakers, bulkheads, retries with backoff, and graceful degradation are the engineering techniques that make systems survive what the Simian Army throws at them.

## Summary

The Simian Army, created by Netflix, pioneered the practice of intentionally injecting faults into production cloud infrastructure to validate system resilience, security posture, operational compliance, and cost efficiency. Its individual tools, from Chaos Monkey's random instance termination to Security Monkey's configuration auditing, each targeted a specific dimension of cloud operational risk. While many of the original tools have been retired or superseded, the Simian Army's core philosophy, that the best way to build reliable systems is to continuously test them by breaking things on purpose, has become a foundational principle of modern cloud engineering and gave rise to the chaos engineering discipline practiced worldwide today.

## References

- Tseitlin, Ariel. "The Netflix Simian Army." Netflix Technology Blog, 2011. The original announcement describing the full suite of Simian Army tools. Available at: https://netflixtechblog.com/the-netflix-simian-army-16e57fbab116
- Basiri, Ali, et al. "Chaos Engineering." IEEE Software, 2016. A paper by Netflix engineers formalizing the principles of chaos engineering as practiced with the Simian Army.
- Rosenthal, Casey and Nora Jones. *Chaos Engineering: System Resiliency in Practice.* O'Reilly Media, 2020. A comprehensive guide to chaos engineering principles, practices, and organizational adoption.
- Israel, Josh, et al. "Chaos Monkey Released into the Wild." Netflix Technology Blog, 2012. Announcement of Chaos Monkey's open-source release. Available at: https://netflixtechblog.com/chaos-monkey-released-into-the-wild-16e57fbab116
- Netflix. "Chaos Monkey GitHub Repository." Open-source code and documentation for Chaos Monkey. Available at: https://github.com/Netflix/chaosmonkey
- Netflix. "Security Monkey GitHub Repository." Open-source code for Security Monkey (now deprecated). Available at: https://github.com/Netflix/security_monkey
- Beyer, Betsy, et al. *Site Reliability Engineering: How Google Runs Production Systems.* O'Reilly Media, 2016. Provides complementary approaches to reliability that pair well with chaos engineering practices.
