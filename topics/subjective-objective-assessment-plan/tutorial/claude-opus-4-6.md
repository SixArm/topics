# Subjective, Objective, Assessment, Plan (SOAP)

The Subjective, Objective, Assessment, Plan (SOAP) framework is a structured method for documenting encounters and reasoning through problems in a clear, repeatable format. Originally developed by Dr. Lawrence Weed in the 1960s for clinical documentation in healthcare, SOAP has since been adopted and adapted across many disciplines, including technology. For technology professionals, SOAP provides a disciplined approach to incident reports, troubleshooting logs, postmortems, user support tickets, and system assessments. By separating what was reported from what was observed, what was concluded, and what will be done, SOAP reduces ambiguity and improves communication across teams.

## Origin and Purpose

Dr. Lawrence Weed introduced the SOAP note as part of the Problem-Oriented Medical Record (POMR) system. His insight was that documentation should follow the same logical structure as the reasoning process itself: gather information, analyze it, and decide on action. This principle applies well beyond medicine. Any professional who must diagnose problems, assess situations, and plan responses benefits from a framework that enforces separation of concerns between raw data, interpretation, and action.

In technology contexts, SOAP-structured documentation helps engineers distinguish between a user's reported experience and the measurable system state, preventing assumptions from creeping into root cause analysis. It also creates an auditable trail that supports knowledge transfer, onboarding, and organizational learning.

## The Four Components

Each section of a SOAP note serves a distinct purpose. The power of the framework lies in keeping these sections separate and well-defined.

| Component | Purpose | Key Question | Technology Example |
|---|---|---|---|
| **Subjective** | Captures reported experiences, complaints, and context from the affected party | "What is the person telling us?" | User reports: "The dashboard loads slowly after 9 AM" |
| **Objective** | Records measurable, verifiable facts and data | "What can we observe and measure?" | Server response time is 4.2s; CPU utilization is 93%; error rate is 0.3% |
| **Assessment** | Provides professional analysis and interpretation of subjective and objective data | "What do we think is happening and why?" | Database connection pool is saturated during peak hours, causing queuing |
| **Plan** | Defines concrete next steps, actions, and follow-up | "What are we going to do about it?" | Increase connection pool size, add caching layer, schedule follow-up load test |

## Subjective

The Subjective section documents information as reported by the person experiencing the problem. This includes their description of symptoms, the context in which they occurred, and any relevant history. The key discipline here is to record what was said without editorializing or interpreting.

In a technology setting, subjective information typically comes from:

- **User reports and support tickets:** The user's own words describing what they experienced, such as "the page froze" or "I got a weird error."
- **Stakeholder context:** Business context like "this started happening after we onboarded 200 new users last week."
- **Timeline and triggers:** The user's account of when the problem started, what they were doing, and whether anything changed recently.
- **Impact statements:** How the issue affects the user's workflow, such as "I can't complete my daily report."

Best practices for the Subjective section include quoting the reporter directly when possible, noting the reporter's role and technical proficiency, and avoiding the temptation to rewrite their account in technical terms. The distinction between what the user said and what you later determine to be true is critical for accurate diagnosis.

## Objective

The Objective section captures measurable, verifiable data gathered through direct observation, instrumentation, or testing. This is the evidence base that grounds the assessment in fact rather than assumption.

For technology professionals, objective data includes:

- **System metrics:** CPU, memory, disk I/O, network throughput, response times, error rates, and queue depths.
- **Log entries:** Specific log lines with timestamps, error codes, and stack traces.
- **Test results:** Output from diagnostic commands, health checks, automated tests, or manual reproduction steps.
- **Configuration state:** Current settings, version numbers, deployment timestamps, and infrastructure topology.
- **Environmental factors:** Cloud region, load balancer state, DNS resolution times, and certificate expiration dates.

The standard for inclusion in the Objective section is reproducibility and verifiability. If another engineer cannot independently confirm the data point, it belongs in the Subjective section instead.

## Assessment

The Assessment section is where professional judgment enters the picture. Here, the author synthesizes the subjective reports and objective data into a coherent interpretation. This is the diagnosis: what is likely happening, why, and how confident we are.

A strong Assessment section in technology documentation includes:

- **Root cause hypothesis:** The most likely explanation for the observed behavior, stated clearly.
- **Differential diagnosis:** Alternative explanations ranked by likelihood, especially when the root cause is not yet confirmed. For example, slow page loads could stem from database contention, network latency, inefficient queries, or client-side rendering issues.
- **Severity and scope:** An evaluation of how widespread the issue is and how severely it affects users or systems.
- **Correlation analysis:** Connections drawn between subjective reports and objective data, such as "the user's report of slowness after 9 AM correlates with the CPU spike observed in monitoring at 9:05 AM."

The Assessment should be honest about uncertainty. Stating "we believe the root cause is X based on evidence Y, but we have not yet ruled out Z" is far more useful than false confidence.

## Plan

The Plan section specifies concrete actions to be taken, by whom, and by when. It transforms analysis into execution. A good plan is specific, assignable, and time-bound.

Effective Plan sections typically address:

- **Immediate actions:** Steps to mitigate or resolve the issue now, such as restarting a service, rolling back a deployment, or scaling up infrastructure.
- **Investigation tasks:** Further diagnostic work needed to confirm or refute the assessment, such as enabling detailed logging or running a load test.
- **Long-term fixes:** Architectural or process changes to prevent recurrence, such as adding circuit breakers, improving monitoring, or revising deployment procedures.
- **Follow-up schedule:** When and how progress will be reviewed, including owners and deadlines.
- **Communication:** Who needs to be informed, what they need to know, and through which channels.

## Applying SOAP in Technology Workflows

SOAP is not limited to incident response. Technology teams can apply it across several common workflows.

| Workflow | Subjective | Objective | Assessment | Plan |
|---|---|---|---|---|
| **Incident response** | User and stakeholder reports | Monitoring data, logs, alerts | Root cause analysis | Remediation and prevention steps |
| **Bug triage** | Reporter's description and reproduction steps | Test results, code analysis | Bug classification and severity | Fix, workaround, or deferral decision |
| **System review** | Team concerns and technical debt observations | Performance benchmarks, audit findings | Risk evaluation and prioritization | Improvement roadmap |
| **User research** | Interview notes and survey responses | Analytics data, A/B test results | Usability assessment | Design and feature changes |
| **Postmortem** | Timeline of human actions and decisions | System telemetry and event logs | Contributing factors analysis | Action items and process improvements |

## SOAP Compared to Other Frameworks

Technology teams use several structured documentation and reasoning frameworks. SOAP overlaps with some but offers a distinct emphasis on separating observation from interpretation.

| Framework | Primary Use | Key Difference from SOAP |
|---|---|---|
| **SOAP** | Structured problem documentation | Separates subjective reports from objective data before analysis |
| **5 Whys** | Root cause analysis | Focuses on iterative causal questioning; lacks structured data gathering |
| **Fishbone (Ishikawa)** | Cause categorization | Categorizes potential causes but does not structure the full documentation cycle |
| **OODA Loop** | Decision-making under pressure | Emphasizes speed and iteration; less structured for documentation |
| **Postmortem template** | After-the-fact analysis | Typically includes timeline and action items but varies widely in structure |

SOAP's strength is that it enforces a complete cycle from data collection through planning, making it well suited for documentation that must be revisited, shared, or audited.

## The APSO Variant

Some practitioners reorder the SOAP sections as APSO: Assessment, Plan, Subjective, Objective. This variant places the most actionable information at the top, which is useful in fast-paced environments where the reader needs to know the conclusion and next steps immediately, with supporting detail available below. Technology teams handling high-volume incident queues or executive briefings may find the APSO order more effective for their audience.

## Best Practices

- **Keep sections distinct.** Do not mix subjective reports with objective data. The entire value of the framework depends on this separation.
- **Be specific and concise.** Use precise language, exact metrics, and direct quotes. Avoid vague statements like "the system seemed slow."
- **Attribute information.** Note who reported what, which monitoring tool produced which metric, and who performed the assessment.
- **Avoid judgment in the Subjective section.** Record what was reported without characterizing it as valid or invalid. Analysis belongs in the Assessment.
- **Update over time.** SOAP notes are living documents during an active incident or investigation. Append new findings rather than overwriting previous entries.
- **Use templates.** Standardized templates reduce cognitive overhead and ensure completeness, especially during high-stress incidents.

## Related

Technology professionals working with SOAP documentation should also explore root cause analysis techniques such as the 5 Whys and Fishbone diagrams, postmortem and blameless retrospective practices, incident management frameworks like ITIL and PagerDuty's incident response methodology, the OODA Loop for rapid decision-making, structured problem-solving methods like A3 thinking from lean manufacturing, and clinical document architecture concepts for teams working in health technology or regulated industries.

## Summary

The Subjective, Objective, Assessment, Plan (SOAP) framework provides technology professionals with a proven, structured method for documenting problems, reasoning through causes, and planning actions. By enforcing a clear separation between reported experiences, measured data, professional analysis, and concrete next steps, SOAP reduces miscommunication, supports knowledge sharing across teams, and creates reliable documentation for audits and organizational learning. Whether applied to incident response, bug triage, system reviews, or postmortems, the framework's disciplined structure helps teams move from confusion to clarity and from analysis to action.

## References

- Weed, L.L. "Medical Records That Guide and Teach." *New England Journal of Medicine*, 278(11), 1968.
- Podder, V., Lew, V., and Ghassemzadeh, S. "SOAP Notes." *StatPearls*, National Library of Medicine, 2024. https://www.ncbi.nlm.nih.gov/books/NBK482263/
- Cameron, S. and Turtle-Song, I. "Learning to Write Case Notes Using the SOAP Format." *Journal of Counseling & Development*, 80(3), 2002.
- Pearce, P.F., Ferguson, L.A., George, G.S., and Langford, C.A. "The Essential SOAP Note in an EHR Age." *The Nurse Practitioner*, 41(2), 2016.
- Kettenbach, G. and Schlomer, S.L. *Writing Patient/Client Notes: Ensuring Accuracy in Documentation*. F.A. Davis Company, 5th edition, 2016.
