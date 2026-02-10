I have enough knowledge to write a comprehensive tutorial on this topic. Here is the tutorial:

# Trusted Exchange Framework and Common Agreement (TEFCA)

The Trusted Exchange Framework and Common Agreement (TEFCA) is a United States federal initiative designed to establish a universal, nationwide infrastructure for the electronic exchange of health information. Created under the 21st Century Cures Act and managed by the Office of the National Coordinator for Health Information Technology (ONC), TEFCA provides a single on-ramp for organizations to connect and share electronic health information (EHI) across disparate health information networks. For technology professionals working in healthcare IT, interoperability platforms, or public health systems, TEFCA represents the most significant structural shift in health data exchange since the HITECH Act.

## Background and Legislative Origins

TEFCA traces its roots to the 21st Century Cures Act, signed into law in December 2016. Section 4003 of the Act directed the ONC to develop a trusted exchange framework, including a common agreement among health information networks. The goal was to address a longstanding problem in American healthcare: despite billions of dollars invested in electronic health records (EHRs), health data remained siloed within proprietary networks, regional health information exchanges (HIEs), and vendor-specific ecosystems.

Before TEFCA, organizations that wanted to exchange data across network boundaries had to negotiate point-to-point agreements, each with different legal terms, technical specifications, and trust requirements. This created a patchwork of connectivity that was expensive to maintain and left significant gaps in data availability, particularly for patients who received care across multiple states or health systems.

## Core Components

TEFCA is composed of two distinct but interlocking elements:

| Component | Description | Nature |
|---|---|---|
| **Trusted Exchange Framework (TEF)** | A set of non-binding principles for health information exchange, emphasizing standardization, transparency, cooperation, security, and patient access | Policy guidance |
| **Common Agreement (CA)** | A binding legal and technical agreement that Qualified Health Information Networks (QHINs) must sign and adhere to in order to participate in TEFCA | Enforceable contract |

The TEF establishes the "why" and "what" of nationwide exchange, while the Common Agreement establishes the "how." Together, they create a floor—not a ceiling—for interoperability, meaning participants can exceed the minimum requirements but must meet them.

## Qualified Health Information Networks (QHINs)

At the center of TEFCA's architecture is the concept of the Qualified Health Information Network. A QHIN is a network that has been designated by the Recognized Coordinating Entity (RCE) after demonstrating compliance with the Common Agreement's legal, technical, and security requirements. QHINs serve as the top-level nodes in the TEFCA network topology.

Key characteristics of QHINs:

- **Gateway function**: QHINs connect to each other, enabling data to flow between their respective participants and sub-participants without requiring individual agreements between every pair of organizations.
- **Onboarding responsibility**: Each QHIN is responsible for vetting and onboarding its own participants and ensuring they comply with applicable requirements.
- **Technical infrastructure**: QHINs must support the Standard Operating Procedures (SOPs) defined by the RCE and implement required technical standards for query, retrieval, and messaging.
- **Diversity of types**: QHINs include national health information networks, EHR vendors, public health networks, and payer organizations.

As of early 2025, designated QHINs include organizations such as CommonWell Health Alliance, eHealth Exchange, Epic Nexus, KONZA National Network, MedAllies, Health Gorilla, and others. The list continues to expand as additional organizations apply and are approved.

## Participant Hierarchy

TEFCA establishes a layered participation model:

| Level | Role | Example |
|---|---|---|
| **QHIN** | Top-level designated network; connects directly to other QHINs | eHealth Exchange, Epic Nexus |
| **Participant** | Organization that connects to a QHIN under its agreement | A large hospital system or health plan |
| **Sub-participant** | Organization that connects through a Participant | A small clinic connecting via its EHR vendor |
| **Individual user** | End user accessing data through the TEFCA infrastructure | A clinician querying a patient record |

This hierarchy means that a small rural clinic does not need to become a QHIN or even a direct Participant. It can connect through its EHR vendor or regional HIE, which in turn connects to a QHIN, gaining access to the entire TEFCA network.

## Exchange Purposes

TEFCA defines specific, permitted purposes for which data may be exchanged. These Exchange Purposes govern what types of queries and data flows are allowed and under what legal basis. The initial Exchange Purposes include:

- **Treatment**: Enables clinicians to query for and retrieve patient records for the purpose of providing care.
- **Payment**: Supports health plans and payers in obtaining information necessary for claims processing and payment activities.
- **Healthcare Operations**: Allows organizations to exchange data for quality assessment, care coordination, and operational improvement.
- **Public Health**: Facilitates reporting to public health authorities for surveillance, case reporting, and population health management.
- **Government Benefits Determination**: Supports government agencies in determining eligibility for health-related benefits.
- **Individual Access Services (IAS)**: Enables individuals to use third-party applications to gather and manage their own health records from across the network.

Individual Access Services is particularly significant for technology professionals building patient-facing applications, as it creates a standardized pathway for consumer health apps to retrieve data from any TEFCA-connected source.

## Technical Architecture

TEFCA's technical requirements are defined through Standard Operating Procedures (SOPs) published by the RCE. The architecture is designed to be standards-based and extensible:

- **Query-based exchange**: The primary exchange pattern is query/response, where a requesting organization sends a query through its QHIN, which routes it to other QHINs, which in turn query their participants.
- **Message delivery**: TEFCA also supports push-based message delivery for use cases like event notifications and public health reporting.
- **Standards alignment**: TEFCA leverages existing standards including HL7 FHIR, C-CDA (Consolidated Clinical Document Architecture), IHE profiles, and XCPD/XCA for cross-community queries.
- **Security requirements**: All participants must implement identity proofing, authentication, encryption in transit and at rest, audit logging, and breach notification procedures.
- **FHIR integration**: The framework is evolving to incorporate HL7 FHIR APIs more deeply, aligning with the ONC's broader FHIR-based interoperability rules under the Cures Act.

| Technical Standard | Role in TEFCA |
|---|---|
| HL7 FHIR | Emerging standard for API-based data access and Individual Access Services |
| C-CDA | Document format for clinical summaries exchanged via query/response |
| IHE XCA/XCPD | Cross-community access and patient discovery profiles |
| TLS 1.2+ | Minimum encryption standard for data in transit |
| NIST 800-53 | Security control framework referenced for QHIN compliance |

## The Recognized Coordinating Entity (RCE)

The ONC designated The Sequoia Project as the RCE responsible for developing, updating, and implementing the Common Agreement. The RCE's responsibilities include:

- Drafting and maintaining the Common Agreement and SOPs
- Evaluating and designating QHINs
- Monitoring QHIN compliance and resolving disputes
- Engaging stakeholders through public comment processes
- Coordinating with ONC on policy alignment

The Sequoia Project was selected for this role due to its long history of operating the eHealth Exchange, one of the largest health information networks in the United States. As RCE, it operates in a governance capacity distinct from its role as a network operator.

## Benefits for Technology Professionals

For professionals building, integrating, or maintaining health IT systems, TEFCA offers several concrete advantages:

- **Simplified connectivity**: Instead of negotiating dozens of individual data sharing agreements, an organization can connect to a single QHIN and reach the entire TEFCA network.
- **Reduced integration burden**: Standardized technical requirements mean fewer custom interfaces and more predictable integration patterns.
- **Nationwide patient matching**: TEFCA's patient discovery mechanisms help resolve patient identity across disparate systems, a persistent challenge in health IT.
- **New application opportunities**: Individual Access Services opens a market for consumer health applications that can aggregate data from any TEFCA-connected provider.
- **Regulatory alignment**: Participation in TEFCA helps organizations demonstrate compliance with the information blocking provisions of the Cures Act.

## Challenges and Considerations

Despite its promise, TEFCA presents real challenges that technology teams must plan for:

- **Voluntary participation**: TEFCA is not mandated by law. Adoption depends on organizations seeing sufficient value to justify the cost and effort of compliance.
- **Data quality variability**: The framework standardizes exchange mechanisms but does not fully standardize the quality, completeness, or coding consistency of the data being exchanged.
- **Privacy complexity**: TEFCA must accommodate varying state privacy laws, consent requirements, and sensitive data handling rules (such as 42 CFR Part 2 for substance use disorder records).
- **Identity management**: Patient matching across networks without a national patient identifier remains technically difficult, though TEFCA's SOPs attempt to mitigate this.
- **Evolving specifications**: The Common Agreement and SOPs are living documents. Technology teams must plan for ongoing updates and version management.

## Related

Technology professionals studying TEFCA should also explore related topics including HL7 FHIR and its role as the emerging standard for health data APIs, the 21st Century Cures Act and its information blocking rules, Health Information Exchanges (HIEs) and how they fit within the QHIN model, the ONC Health IT Certification Program, HIPAA privacy and security requirements as they intersect with TEFCA's trust framework, IHE integration profiles used for cross-community data exchange, and patient matching and identity resolution strategies in distributed health networks.

## Summary

TEFCA represents a foundational shift in how electronic health information is exchanged across the United States. By establishing a common legal and technical agreement through QHINs, it replaces the fragmented, point-to-point model of health data sharing with a scalable, network-of-networks architecture. For technology professionals, TEFCA defines the standards, exchange purposes, and trust requirements that will increasingly govern how healthcare applications connect, query, and share patient data at a national scale. While challenges around voluntary adoption, data quality, and privacy complexity remain, TEFCA is rapidly becoming the de facto infrastructure for nationwide health information interoperability.

## References

- United States Congress, "21st Century Cures Act," Public Law 114-255, Section 4003, December 2016. Available at: https://www.congress.gov/bill/114th-congress/house-bill/34
- Office of the National Coordinator for Health IT (ONC), "Trusted Exchange Framework and Common Agreement (TEFCA)." Available at: https://www.healthit.gov/topic/interoperability/policy/trusted-exchange-framework-and-common-agreement-tefca
- The Sequoia Project (Recognized Coordinating Entity), "TEFCA and the Common Agreement." Available at: https://rce.sequoiaproject.org/
- HL7 International, "HL7 FHIR (Fast Healthcare Interoperability Resources)." Available at: https://www.hl7.org/fhir/
- Office of the National Coordinator for Health IT, "Information Blocking." Available at: https://www.healthit.gov/topic/information-blocking
- National Institute of Standards and Technology, "NIST SP 800-53: Security and Privacy Controls for Information Systems and Organizations." Available at: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
