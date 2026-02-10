# Information Technology Infrastructure Library (ITIL) 4 Practices

## Introduction

Information Technology Infrastructure Library (ITIL) 4 represents a significant evolution in IT service management, shifting from rigid process-driven frameworks to a flexible, holistic approach centered on value co-creation. Released by AXELOS in 2019, ITIL 4 reorganizes the familiar ITIL processes into 34 management practices, grouped into three categories: General Management, Service Management, and Technical Management. These practices serve as organizational resources encompassing processes, people, and technology to deliver, support, and improve IT services. ITIL 4 is built on the premise that IT does not operate in isolation; it must align with business outcomes, respond to evolving user needs, and integrate with modern ways of working such as Agile, DevOps, and Lean. For technology professionals, understanding these practices is essential for designing service management strategies that are both effective and adaptable.

## The Service Value System

The Service Value System (SVS) is the overarching architecture of ITIL 4. It describes how all components and activities of an organization work together to facilitate value creation. The SVS takes in demand and opportunity as inputs and produces value as its output. The key components of the SVS include:

- **Guiding Principles**: Recommendations that guide an organization in all circumstances, such as "Focus on Value," "Start Where You Are," and "Optimize and Automate."
- **Governance**: The system by which an organization is directed and controlled.
- **Service Value Chain**: A flexible operating model with six activities (Plan, Improve, Engage, Design and Transition, Obtain/Build, Deliver and Support) that can be combined in various sequences to create value streams.
- **Practices**: The 34 management practices that provide the resources and capabilities needed to perform work.
- **Continual Improvement**: An ongoing organizational activity performed at all levels to ensure performance meets stakeholder expectations.

The SVS is designed to discourage siloed working. Rather than treating practices as isolated processes, ITIL 4 encourages organizations to think in terms of value streams that cut across multiple practices and teams.

## ITIL 4 Guiding Principles

ITIL 4 defines seven guiding principles that shape how practices are adopted and applied. These principles are universal and can be applied regardless of the specific practices in use.

| Principle | Description |
|---|---|
| Focus on Value | Everything the organization does should map to value for stakeholders, whether customers, users, or the business itself. |
| Start Where You Are | Do not discard what already works. Assess current capabilities before building new ones. |
| Progress Iteratively with Feedback | Break work into manageable increments and use feedback loops to course-correct. |
| Collaborate and Promote Visibility | Work across boundaries and make information accessible to support better decisions. |
| Think and Work Holistically | No service, practice, or component stands alone. Consider end-to-end impacts. |
| Keep It Simple and Practical | Eliminate waste. Use the minimum number of steps necessary to achieve an objective. |
| Optimize and Automate | Use technology and techniques to maximize the efficiency and consistency of human and technical resources. |

These principles are not prescriptive rules but rather lenses through which decisions about practice adoption, process design, and organizational change should be evaluated.

## General Management Practices

The 14 General Management Practices are adapted from general business management and applied to IT service management. They address organizational governance, strategy, and operational foundations.

- **Continual Improvement**: Aligns the organization's practices and services with changing business needs through ongoing identification and implementation of improvements across all levels.
- **Architecture Management**: Provides an understanding of the different elements that make up an organization and how they interrelate, enabling effective design, planning, and execution of change.
- **Information Security Management**: Protects the information the organization needs to conduct its business, managing risks related to confidentiality, integrity, and availability.
- **Knowledge Management**: Ensures that stakeholders get the right information in the proper format at the correct level and time, supporting informed decision-making.
- **Measurement and Reporting**: Supports good decision-making and continual improvement by defining, collecting, and processing data into actionable metrics.
- **Organizational Change Management**: Ensures that changes in an organization are implemented smoothly and successfully by managing the human side of change.
- **Portfolio Management**: Ensures that the organization has the right mix of programs, projects, products, and services to meet strategic objectives within funding and resource constraints.
- **Project Management**: Ensures that all projects are delivered successfully using appropriate planning, delegation, monitoring, and control methods.
- **Relationship Management**: Establishes and nurtures links between the organization and its stakeholders at strategic and tactical levels.
- **Risk Management**: Ensures the organization understands and effectively handles risks by identifying potential threats and opportunities and assessing their likelihood and impact.
- **Service Financial Management**: Supports the organization's strategies and plans for service management by ensuring budgeting, accounting, and charging requirements are met.
- **Strategy Management**: Formulates the goals of the organization and adopts courses of action and resource allocation to achieve those goals.
- **Supplier Management**: Ensures the organization's suppliers and their performance are managed appropriately to support seamless provision of quality products and services.
- **Workforce and Talent Management**: Ensures the organization has the right people with the appropriate skills and knowledge in the correct roles to support its business objectives.

## Service Management Practices

The 17 Service Management Practices form the core of ITIL 4's approach to managing the IT service lifecycle. These practices have been developed specifically within the IT service management discipline.

- **Availability Management**: Ensures services deliver agreed levels of availability to meet the needs of customers and users.
- **Business Analysis**: Analyzes a business or element of a business to recommend solutions that create value for stakeholders.
- **Capacity and Performance Management**: Ensures services achieve agreed and expected performance levels, satisfying current and future demand cost-effectively.
- **Change Enablement**: Maximizes the number of successful IT changes by ensuring risks are properly assessed, authorizing changes to proceed, and managing the change schedule. This practice replaces the older "Change Management" terminology to emphasize enablement over control.
- **Incident Management**: Minimizes the negative impact of incidents by restoring normal service operation as quickly as possible.
- **IT Asset Management**: Plans and manages the full lifecycle of all IT assets, helping the organization maximize value, control costs, and manage risks.
- **Monitoring and Event Management**: Systematically observes services and service components, and records and reports selected changes of state identified as events.
- **Problem Management**: Reduces the likelihood and impact of incidents by identifying actual and potential causes of incidents and managing workarounds and known errors.
- **Release Management**: Makes new and changed services and features available for use.
- **Service Catalog Management**: Provides a single source of consistent information on all services and service offerings, and ensures it is available to the relevant audience.
- **Service Configuration Management**: Ensures accurate and reliable information about the configuration of services and supporting configuration items is available when and where needed.
- **Service Continuity Management**: Ensures the availability and performance of a service is maintained at sufficient levels in the event of a disaster.
- **Service Design**: Designs products and services that are fit for purpose, fit for use, and deliverable by the organization and its ecosystem.
- **Service Desk**: Captures demand for incident resolution and service requests, serving as the single point of contact between the service provider and its users.
- **Service Level Management**: Sets clear business-based targets for service levels and ensures delivery of services is properly assessed, monitored, and managed against these targets.
- **Service Request Management**: Supports the agreed quality of a service by handling all predefined, user-initiated service requests in an effective and user-friendly manner.
- **Service Validation and Testing**: Ensures new or changed products and services meet defined requirements before deployment.

## Technical Management Practices

The three Technical Management Practices focus on technology-specific capabilities that support service delivery and evolution.

| Practice | Purpose |
|---|---|
| Deployment Management | Moves new or changed hardware, software, documentation, processes, or any other component to live environments. It may also deploy components to other environments for testing or staging. |
| Infrastructure and Platform Management | Oversees the infrastructure and platforms used by an organization, enabling the monitoring of technology solutions, including cloud-based platforms. |
| Software Development and Management | Ensures applications meet internal and external stakeholder needs in terms of functionality, reliability, maintainability, compliance, and auditability. |

These technical practices interface directly with DevOps pipelines, cloud infrastructure teams, and software engineering functions. In organizations that have adopted CI/CD and infrastructure-as-code, Deployment Management and Infrastructure and Platform Management become tightly integrated with automation tooling.

## How ITIL 4 Differs from ITIL v3

Technology professionals who previously worked with ITIL v3/2011 will notice several structural and philosophical shifts in ITIL 4.

| Aspect | ITIL v3/2011 | ITIL 4 |
|---|---|---|
| Core Structure | 5 lifecycle stages (Strategy, Design, Transition, Operation, Continual Improvement) | Service Value System with a flexible Service Value Chain |
| Processes vs. Practices | 26 processes organized by lifecycle stage | 34 practices organized by management domain |
| Approach | Prescriptive and linear | Flexible, holistic, and adaptable |
| Integration | Limited acknowledgment of Agile/DevOps | Explicit integration with Agile, Lean, and DevOps |
| Change Management | Change Management (control-oriented) | Change Enablement (enablement-oriented) |
| Value Focus | Implied | Central organizing principle |

The shift from "processes" to "practices" is more than semantic. Practices encompass people, technology, and information alongside process definitions, acknowledging that effective service management depends on organizational culture and tooling as much as documented workflows.

## Adopting ITIL 4 Practices

Adopting ITIL 4 practices is not an all-or-nothing proposition. Organizations should apply the guiding principle of "Start Where You Are" by assessing current maturity and selecting practices that address the most pressing gaps. Key considerations for adoption include:

- **Prioritize by pain points**: If incident volumes are high and resolution times are long, focus on Incident Management, Problem Management, and Knowledge Management first.
- **Align with business strategy**: Practices like Strategy Management, Portfolio Management, and Relationship Management ensure IT investment aligns with organizational goals.
- **Integrate with existing frameworks**: ITIL 4 is designed to coexist with Agile, Scrum, DevOps, Lean, and COBIT. It does not demand replacing these approaches but rather complements them.
- **Invest in people and culture**: Organizational Change Management and Workforce and Talent Management are frequently underestimated. Technical practices fail without cultural readiness.
- **Measure and iterate**: Use Measurement and Reporting alongside Continual Improvement to evaluate practice effectiveness and evolve the approach over time.

## Related

Technology professionals studying ITIL 4 practices should also explore related topics including the ITIL 4 certification path (Foundation, Managing Professional, Strategic Leader, Master), the Service Value Chain in depth, DevOps and its relationship to ITIL, Agile service management approaches, COBIT as a complementary governance framework, ISO/IEC 20000 as the international standard for IT service management, Lean IT principles, Site Reliability Engineering (SRE) and its overlap with ITIL practices, and organizational change management methodologies for driving adoption.

## Summary

ITIL 4 practices provide a structured yet flexible framework for managing IT services in modern organizations. By organizing 34 practices into General Management, Service Management, and Technical Management categories, and embedding them within the Service Value System, ITIL 4 moves beyond rigid lifecycle stages toward a holistic, value-driven approach. The guiding principles ensure that practice adoption remains pragmatic, iterative, and aligned with business outcomes. For technology professionals, ITIL 4 offers a common language and toolkit for designing service management strategies that integrate with Agile, DevOps, and cloud-native ways of working, while maintaining the governance and discipline needed to deliver reliable, high-quality IT services at scale.

## References

- AXELOS. *ITIL Foundation: ITIL 4 Edition*. TSO (The Stationery Office), 2019.
- AXELOS. *ITIL 4: Create, Deliver and Support*. TSO, 2020.
- AXELOS. *ITIL 4: Drive Stakeholder Value*. TSO, 2020.
- AXELOS. *ITIL 4: High-Velocity IT*. TSO, 2020.
- AXELOS. *ITIL 4: Direct, Plan and Improve*. TSO, 2020.
- AXELOS. *ITIL 4: Digital and IT Strategy*. TSO, 2020.
- ITIL 4 Official Site: https://www.axelos.com/certifications/itil-service-management
- BMC Software. "ITIL 4 Practices: The Complete Guide." https://www.bmc.com/blogs/itil-v4-practices/
- IT Governance. "What is ITIL 4?" https://www.itgovernance.co.uk/itil
