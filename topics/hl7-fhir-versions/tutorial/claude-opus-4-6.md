# HL7 FHIR versions

HL7 FHIR (Fast Healthcare Interoperability Resources) has evolved through several major releases since its inception, each advancing the goal of making healthcare data exchange more modern, web-friendly, and interoperable. Understanding the version landscape is critical for technology professionals working in health IT, because the version you adopt determines your regulatory compliance posture, the stability guarantees you receive, and the features available to your implementation. As of 2026, the industry operates in a multi-version environment where Release 4 (R4) remains the dominant production standard, Release 5 (R5) introduced significant innovations at the cost of stability, and Release 6 (R6) is emerging as the next long-term normative target.


## Evolution of FHIR versions

FHIR was created by HL7 International as a successor to earlier standards like HL7 v2 and HL7 v3/CDA, which were widely criticized for their complexity and difficulty of implementation. The first Draft Standard for Trial Use (DSTU) appeared in 2014, and the standard has followed an iterative release cycle since then, with each version incorporating feedback from real-world implementations.

The versioning model distinguishes between two maturity levels that are essential to understand:

- **Normative:** Resources and specifications at this level carry a guarantee of backward compatibility. Implementers can build against them with confidence that future versions will not introduce breaking changes to those specific elements.
- **Trial Use (STU):** Resources at this level are considered stable enough for implementation but may undergo breaking changes in subsequent releases. Implementers accept the risk of future migration work when adopting Trial Use content.

This dual-track maturity model allows FHIR to innovate rapidly in some areas while providing rock-solid stability in others.


## FHIR Release 4 (R4)

Released in January 2019, R4 is the cornerstone of the modern FHIR ecosystem. It was the first release to achieve Normative status for its core resources, which was a watershed moment for healthcare interoperability. The Normative designation means that foundational resources such as Patient, Observation, and Bundle are locked against breaking changes indefinitely.

R4 is the version mandated by major regulatory programs worldwide. In the United States, the ONC Cures Act Final Rule and the CMS Interoperability and Patient Access Rule both reference R4 as the required standard. The US Core Implementation Guide, which defines how FHIR is used across American healthcare systems, is built on R4. This regulatory anchoring has made R4 the default choice for production deployments.

Key characteristics of R4 include:

- First Normative release, providing long-term stability guarantees for core resources
- Foundation for the US Core Implementation Guide and other national implementation guides
- Broad vendor and tooling support across EHR platforms, middleware, and cloud services
- RESTful API patterns with support for JSON and XML serialization
- Mature search parameter framework and capability statement mechanism
- Comprehensive security model based on SMART on FHIR and OAuth 2.0


## FHIR Release 5 (R5)

Released in March 2023, R5 represents a significant leap in functionality. It introduced over 100 new resources and made substantial changes to existing ones, reflecting lessons learned from years of R4 production use. However, R5 carries Trial Use status for most of its new content, meaning that breaking changes are possible in R6.

The most consequential change in R5 is the completely rewritten Subscription framework. R4 used a channel-based subscription model that was functional but limited. R5 replaced it with a Topic-based Subscription framework that is more scalable, more flexible, and better suited to event-driven architectures. This framework allows subscribers to register interest in specific clinical or administrative events and receive notifications through multiple channels including REST hooks, WebSockets, and email.

Other notable additions in R5 include:

- New resources for patient engagement, such as Citation and EvidenceReport
- Enhanced support for clinical decision support and quality measurement
- Improved provenance and audit capabilities
- Refined terminology services and value set expansion
- New SubscriptionTopic and SubscriptionStatus resources for event-driven workflows
- Better support for genomics and precision medicine use cases

Despite its technical merits, R5 adoption has been cautious. Many organizations have chosen to remain on R4 and wait for R6, because adopting a Trial Use release means accepting the risk of migration costs when the next Normative version arrives.


## FHIR Release 6 (R6)

R6 is currently under active development, with its first Normative Ballot held in early 2026. It is intended to be the "Universal Normative" version, a release where the majority of clinical and administrative resources achieve Normative status. This would dramatically reduce version-to-version variability and give the entire ecosystem a stable foundation for the next decade or more.

R6 incorporates the best innovations from R5, including the Topic-based Subscription framework, while locking them into Normative status. It also addresses feedback from R5 implementers regarding resource structure, naming consistency, and workflow patterns. The goal is to provide a release that organizations can adopt with confidence, knowing that the migration investment will be protected by long-term backward compatibility guarantees.

Key expectations for R6 include:

- Normative status for the majority of clinical and administrative resources
- Stabilized Topic-based Subscription framework from R5
- Improved consistency across resource naming and structure
- Enhanced support for bulk data operations and population health
- Stronger alignment with international implementation guides beyond the US market


## Version comparison

The following table summarizes the key differences across the three most relevant FHIR releases:

| Aspect | R4 (2019) | R5 (2023) | R6 (In Development) |
|---|---|---|---|
| **Maturity level** | Normative (core resources) | Trial Use (most new content) | Universal Normative (target) |
| **Regulatory status** | Mandated by ONC, CMS | Not yet mandated | Expected future mandate |
| **Core resource stability** | Guaranteed backward compatibility | Breaking changes possible | Guaranteed backward compatibility |
| **Subscription model** | Channel-based | Topic-based (new framework) | Topic-based (Normative) |
| **New resource count** | Baseline | 100+ new resources | Consolidation of R5 additions |
| **Tooling and vendor support** | Extensive, mature ecosystem | Growing but limited | Early stage |
| **Recommended for production** | Yes | Selective adoption | Upon release |
| **Migration complexity from R4** | N/A | Moderate to high | Moderate to high |


## The 80% Rule and extensions

All FHIR versions follow the 80% Rule, a design philosophy that shapes the entire standard. The core specification focuses on the data elements used by 80% of healthcare systems worldwide. The remaining 20% of specialized or domain-specific needs are handled through the Extension mechanism.

Extensions allow implementers to add custom data elements to any FHIR resource without modifying the base specification. This approach keeps the core standard lean and universally applicable while providing a structured, interoperable way to handle edge cases. Extensions are defined in Implementation Guides and can be standardized at the national or organizational level.

This philosophy has practical implications for version selection:

- **Core clinical data** (patient demographics, observations, conditions, medications) is well-covered by R4 and remains stable across all versions.
- **Specialized domains** (genomics, public health reporting, clinical trials) may benefit from R5 or R6 resources that provide richer out-of-the-box support.
- **Extensions created for one version** can often be adapted for use in another, though migration requires careful validation.


## Migration and version strategy

Upgrading between FHIR versions is not a trivial undertaking. It involves more than updating API endpoints or library dependencies. Changes in resource structures, such as mandatory fields becoming optional, renamed status codes, or restructured references, require careful analysis and testing.

Organizations should consider the following when planning their version strategy:

- **Stay on R4 for stability.** If your systems are in production and meet current regulatory requirements, R4 remains the safest choice. Its Normative status protects your investment.
- **Adopt R5 selectively.** If you need specific R5 features, such as the Topic-based Subscription framework, consider adopting those components while keeping your core on R4. Proxy layers and FHIR facades can bridge version differences.
- **Plan for R6.** Begin monitoring R6 ballot results and draft specifications. When R6 achieves Normative status, it will likely become the next regulatory baseline, making migration inevitable.
- **Use version-aware middleware.** FHIR servers and integration engines increasingly support multi-version operation, allowing you to serve R4 to partners who require it while using newer versions internally.


## Related

Related topics to explore next include HL7 FHIR fundamentals and resource types, HL7 FHIR extensions and profiling, the US Core Implementation Guide, SMART on FHIR for authorization and authentication, the FHIR Bulk Data Access specification for population health, Topic-based Subscriptions for event-driven architectures, HL7 v2 and CDA for legacy integration context, FHIR Implementation Guides and conformance testing, healthcare interoperability regulations such as the ONC Cures Act and CMS rules, and general healthcare data standards including SNOMED CT, LOINC, and ICD coding systems.


## Summary

HL7 FHIR has matured from an experimental web-based healthcare data standard into the dominant interoperability framework in health IT, with its version landscape reflecting the tension between innovation and stability. Release 4 remains the production workhorse, backed by regulatory mandates and a mature tooling ecosystem, while Release 5 pushed the boundaries with over 100 new resources and a modern subscription framework at the cost of stability guarantees. Release 6, currently progressing through its Normative Ballot, aims to unify the best of both worlds by bringing the majority of resources to Normative status, giving the industry a stable foundation for the next generation of healthcare data exchange. For technology professionals, the practical guidance is clear: build on R4 today, adopt R5 innovations selectively where needed, and prepare your architecture for the eventual transition to R6.


## References

- HL7 International, "FHIR Overview," https://www.hl7.org/fhir/overview.html
- HL7 International, "FHIR Release 4 (v4.0.1)," https://hl7.org/fhir/R4/
- HL7 International, "FHIR Release 5 (v5.0.0)," https://hl7.org/fhir/R5/
- HL7 International, "FHIR R6 Ballot," https://hl7.org/fhir/6.0.0-ballot1/
- HL7 International, "FHIR Versioning Policy," https://www.hl7.org/fhir/versions.html
- ONC, "21st Century Cures Act Final Rule," https://www.healthit.gov/curesrule/
- CMS, "Interoperability and Patient Access Final Rule," https://www.cms.gov/Regulations-and-Guidance/Guidance/Interoperability/index
- HL7 International, "US Core Implementation Guide," https://www.hl7.org/fhir/us/core/
- SMART Health IT, "SMART on FHIR," https://smarthealthit.org/
- HL7 International, "FHIR Extensions and Profiling," https://www.hl7.org/fhir/extensibility.html
