# FHIR government regulations

Fast Healthcare Interoperability Resources (FHIR) is a modern healthcare data standard developed by HL7 International that defines how clinical and administrative data should be structured, queried, and exchanged between systems. While FHIR has gained widespread industry support, voluntary adoption has been uneven across healthcare organizations. Governments have responded by enacting regulations that mandate or incentivize FHIR-based interoperability, aiming to break down data silos, empower patients, and modernize healthcare IT infrastructure. Understanding these regulations is essential for technology professionals building, integrating, or maintaining health information systems.

## Why governments regulate healthcare interoperability

Healthcare data has historically been fragmented across proprietary systems that do not communicate with one another. This fragmentation leads to duplicated tests, delayed diagnoses, medication errors, and increased costs. Patients frequently cannot access their own records in a usable digital format. Government intervention addresses these failures through mandates that require standardized data exchange, with FHIR emerging as the preferred technical standard due to its RESTful API architecture, modern web conventions, and broad vendor support.

Regulatory goals typically include:

- Ensuring patients can electronically access and share their health records
- Preventing information blocking by healthcare providers and vendors
- Establishing common data formats and vocabularies across systems
- Promoting competition by reducing vendor lock-in
- Supporting public health reporting and population-level analytics

## Key United States regulations

The United States has enacted the most comprehensive FHIR-related regulatory framework, driven primarily by the Office of the National Coordinator for Health Information Technology (ONC) and the Centers for Medicare and Medicaid Services (CMS).

### The 21st Century Cures Act

Signed into law in 2016, the 21st Century Cures Act is the foundational regulation driving FHIR adoption in the United States. It mandates that healthcare organizations provide API-based access to patient data and prohibits information blocking, which is defined as practices that unreasonably interfere with the access, exchange, or use of electronic health information. The ONC Cures Act Final Rule, published in 2020, specifies that certified health IT must support FHIR Release 4 APIs for patient-facing data access. Organizations that engage in information blocking face civil monetary penalties and reputational consequences.

### Trusted Exchange Framework and Common Agreement (TEFCA)

TEFCA establishes a nationwide infrastructure for secure health information exchange. It defines a common set of principles and technical requirements that Qualified Health Information Networks (QHINs) must follow to participate in cross-network data sharing. TEFCA leverages FHIR as a key standard for exchange and aims to create a "network of networks" so that any provider, payer, or patient can access health information regardless of which system originally stored it.

### Health Insurance Portability and Accountability Act (HIPAA)

HIPAA, enacted in 1996 and amended multiple times since, establishes the privacy and security rules governing protected health information (PHI). While HIPAA predates FHIR, it directly shapes how FHIR implementations must handle authentication, authorization, encryption, audit logging, and consent management. Any FHIR-based system that transmits or stores PHI must comply with HIPAA's Administrative, Physical, and Technical Safeguards.

### United States Core Data for Interoperability (USCDI)

USCDI defines a standardized set of health data classes and data elements that must be supported for interoperable exchange. It establishes what patient information must be available, while FHIR defines how that information is technically exchanged. ONC updates USCDI periodically, expanding the required data classes. USCDI version 1 included clinical notes, allergies, medications, lab results, and demographics. Subsequent versions have added social determinants of health, clinical tests, and other categories.

### CMS Interoperability and Patient Access Rule

CMS requires that Medicare Advantage organizations, Medicaid and CHIP managed care plans, and qualified health plan issuers on federally facilitated exchanges implement Patient Access APIs using FHIR Release 4. This rule also mandates Provider Directory APIs and Payer-to-Payer Data Exchange, all built on FHIR standards.

## International regulatory landscape

Several other jurisdictions have established or are developing FHIR-related regulatory frameworks.

| Jurisdiction | Regulation or Initiative | FHIR Role |
|---|---|---|
| United Kingdom | NHS Digital Standards | FHIR UK Core profiles mandated for NHS systems integration and GP Connect |
| European Union | European Health Data Space (EHDS) | FHIR adopted as a primary standard for cross-border health data exchange |
| Australia | My Health Record / AU Core | National digital health infrastructure built on FHIR AU Base and AU Core profiles |
| Canada | pan-Canadian FHIR profiles | Provincial and federal initiatives converging on FHIR CA Core for interoperability |
| India | Ayushman Bharat Digital Mission (ABDM) | FHIR-based Health Information Exchange and health records framework |
| Singapore | HCSA amendments / Synapxe | National health IT systems adopting FHIR for clinical data exchange |

## Compliance requirements for technology professionals

Technology professionals working on FHIR-compliant systems must address multiple regulatory requirements simultaneously. The following table summarizes key compliance areas.

| Compliance Area | Regulatory Source | Technical Requirement |
|---|---|---|
| Patient API access | 21st Century Cures Act, CMS rules | FHIR R4 RESTful APIs for patient-facing applications |
| Information blocking prevention | 21st Century Cures Act | No unreasonable barriers to data access, exchange, or use |
| Privacy and security | HIPAA, state laws | Encryption, access controls, audit trails, breach notification |
| Standardized data content | USCDI | Support for required data classes and elements in FHIR resources |
| Network participation | TEFCA | Conformance with QHIN technical requirements and trust policies |
| Certification | ONC Health IT Certification Program | Certified EHR Technology must meet FHIR-based API criteria |

## Enforcement and penalties

Regulatory enforcement varies by jurisdiction and specific regulation:

- **Information blocking violations** under the Cures Act can result in civil monetary penalties up to $1 million per violation for health IT developers and health information networks, with referral to the OIG for healthcare providers
- **HIPAA violations** carry tiered penalties ranging from $100 to $50,000 per violation, with annual maximums up to $1.5 million per violation category, plus potential criminal prosecution
- **CMS noncompliance** can result in loss of certification, exclusion from federal programs, and financial penalties for payers and providers
- **ONC decertification** of health IT products effectively removes them from the market for organizations participating in federal programs

## Emerging regulatory trends

Several regulatory trends are shaping the future of FHIR-based interoperability:

- **Prior authorization reform**: CMS is mandating FHIR-based electronic prior authorization APIs to reduce administrative burden and processing delays
- **Payer-to-payer exchange**: New rules require health insurers to share member clinical data using FHIR when members change plans
- **Public health modernization**: Post-pandemic regulations are driving FHIR adoption for electronic case reporting, immunization registries, and syndromic surveillance
- **SMART on FHIR and security frameworks**: Regulatory bodies are increasingly referencing SMART App Launch and OAuth 2.0 as required authorization patterns
- **Expanded USCDI scope**: Each USCDI version adds new data classes, requiring systems to support broader clinical and social data in FHIR format
- **AI and clinical decision support**: Emerging regulations address how FHIR-sourced data feeds algorithmic tools, with requirements for transparency and bias mitigation

## Related

Technology professionals working with FHIR government regulations should also study HL7 FHIR core specifications and profiling, the SMART on FHIR authorization framework, healthcare data privacy and security architecture, Trusted Exchange Framework and Common Agreement (TEFCA) technical requirements, United States Core Data for Interoperability (USCDI) data classes, Health Insurance Portability and Accountability Act (HIPAA) compliance, the 21st Century Cures Act implementation details, healthcare API design patterns, clinical terminology systems such as SNOMED CT and LOINC, and electronic health record integration strategies.

## Summary

FHIR government regulations represent a global shift toward mandated healthcare data interoperability, with the United States leading through the 21st Century Cures Act, TEFCA, HIPAA, USCDI, and CMS interoperability rules. These regulations require technology professionals to build systems that provide standardized API access to patient data, prevent information blocking, protect privacy and security, and conform to certified data exchange standards. International jurisdictions including the UK, EU, Australia, Canada, and India are following similar paths with their own FHIR-based regulatory frameworks. Compliance is not optional: enforcement mechanisms include substantial financial penalties, decertification, and exclusion from government programs. As regulations continue to expand in scope, covering prior authorization, payer-to-payer exchange, public health reporting, and AI governance, technology professionals must treat regulatory awareness as a core competency alongside their technical FHIR implementation skills.

## References

- HL7 International, "FHIR Release 4 Specification," https://hl7.org/fhir/R4/
- Office of the National Coordinator for Health IT, "21st Century Cures Act: Interoperability, Information Blocking, and the ONC Health IT Certification Program Final Rule," https://www.healthit.gov/curesrule/
- Centers for Medicare and Medicaid Services, "CMS Interoperability and Patient Access Final Rule," https://www.cms.gov/regulations-and-guidance/guidance/interoperability/index
- Office of the National Coordinator for Health IT, "Trusted Exchange Framework and Common Agreement (TEFCA)," https://www.healthit.gov/topic/interoperability/policy/trusted-exchange-framework-and-common-agreement-tefca
- Office of the National Coordinator for Health IT, "United States Core Data for Interoperability (USCDI)," https://www.healthit.gov/isa/united-states-core-data-interoperability-uscdi
- U.S. Department of Health and Human Services, "HIPAA for Professionals," https://www.hhs.gov/hipaa/for-professionals/index.html
- NHS Digital, "NHS FHIR UK Core Implementation Guide," https://digital.nhs.uk/services/fhir-uk-core
- European Commission, "European Health Data Space," https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space_en
- Australian Digital Health Agency, "FHIR Implementation Guides," https://www.digitalhealth.gov.au/
- National Health Authority of India, "Ayushman Bharat Digital Mission," https://abdm.gov.in/
