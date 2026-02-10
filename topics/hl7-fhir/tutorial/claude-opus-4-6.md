# HL7 FHIR

HL7 FHIR (Fast Healthcare Interoperability Resources) is the predominant global standard for exchanging electronic health information. Developed by Health Level Seven International (HL7), FHIR combines the best features of earlier HL7 standards with modern web technologies -- RESTful APIs, JSON, XML, and OAuth 2.0 -- to make healthcare data exchange as straightforward as building any other web application. FHIR has become the regulatory and industry standard for health data interoperability in the United States, the European Union, the United Kingdom, Australia, and a growing number of other jurisdictions.

## Why FHIR Exists

Healthcare IT has long suffered from fragmentation. Hospitals, clinics, pharmacies, insurers, and government agencies all use different systems that historically could not communicate with each other. Earlier HL7 standards -- HL7 v2 (introduced in 1987) and HL7 v3/CDA (introduced in 2005) -- attempted to solve this but were difficult to implement, required deep domain expertise, and relied on older messaging paradigms. FHIR was introduced in 2014 as a clean break: a standard designed from the ground up for the modern web, with a dramatically lower barrier to entry for software developers.

## Core Architecture

FHIR is built on a resource-based model. All healthcare data is represented as discrete, modular units called Resources. Each Resource represents a clinically or administratively meaningful concept, and Resources can reference one another to form complex clinical documents, care records, or workflows.

### Key Architectural Principles

- **Resources as building blocks.** Every piece of healthcare data -- a patient demographic record, a lab result, a medication order -- is a Resource with a defined structure and a unique URL.
- **RESTful API.** FHIR servers expose Resources through standard HTTP operations: GET to read, POST to create, PUT to update, DELETE to remove. This is identical to how any modern web API works.
- **Multiple representations.** Resources can be serialized as JSON, XML, or RDF (Turtle), giving implementers flexibility to match their existing technology stacks.
- **Extensions.** FHIR has a built-in extension mechanism that allows organizations to add custom data elements without breaking the core specification. This avoids the rigidity that plagued earlier standards.
- **Profiles and Implementation Guides.** Communities and jurisdictions publish Profiles that constrain or extend base Resources for specific use cases, ensuring both flexibility and conformance.

## FHIR Resources

FHIR defines over 150 Resource types organized into categories. The following table shows representative Resources from each major category.

| Category | Example Resources | Purpose |
|---|---|---|
| Individuals | Patient, Practitioner, RelatedPerson | People involved in care delivery |
| Clinical | Condition, Observation, Procedure, AllergyIntolerance | Clinical facts about a patient |
| Medications | Medication, MedicationRequest, MedicationDispense | Prescribing, dispensing, and administration |
| Diagnostics | DiagnosticReport, ImagingStudy, Specimen | Lab results, imaging, and pathology |
| Financial | Claim, ExplanationOfBenefit, Coverage | Billing, insurance, and reimbursement |
| Workflow | Task, Appointment, Encounter, ServiceRequest | Scheduling, referrals, and care coordination |
| Conformance | CapabilityStatement, StructureDefinition, ValueSet | Describing what a server can do and how data is shaped |

Each Resource has a standard set of metadata (id, meta, language), a human-readable narrative, and structured data elements specific to its type.

## FHIR Versions

FHIR has evolved through several releases. The current normative edition is R4, with R5 published and adoption beginning.

| Version | Year | Status | Notes |
|---|---|---|---|
| DSTU 1 | 2014 | Superseded | Initial draft standard for trial use |
| DSTU 2 | 2015 | Superseded | Broader resource coverage, early adoption |
| STU 3 | 2017 | Superseded | Significant maturity, widely piloted |
| R4 | 2019 | Normative | First normative release; the current regulatory baseline worldwide |
| R4B | 2022 | Normative | Minor updates and corrections to R4 |
| R5 | 2023 | STU | New features including Subscriptions framework and topic-based notifications |

R4 remains the version mandated by most government regulations, including the United States ONC and CMS rules. R5 adoption is expected to accelerate as jurisdictions update their requirements.

## FHIR Data Types

FHIR defines a type system for the data elements within Resources. These fall into two categories:

- **Primitive types** represent simple values: string, boolean, integer, decimal, date, dateTime, instant, uri, code, and others. Each primitive has strict formatting rules (for example, dateTime must conform to a subset of ISO 8601).
- **Complex types** represent structured groupings: HumanName (with family, given, prefix, suffix), Address, ContactPoint, CodeableConcept (which binds a code from a terminology to a human-readable display), Quantity, Period, and Reference (a pointer to another Resource).

The type system ensures that data is consistently structured across all implementations, which is critical for safe clinical data exchange.

## FHIR Extensions

One of FHIR's most important design decisions is its extension mechanism. The base specification intentionally covers only the 80% of data elements that are common across most implementations. For the remaining 20% -- jurisdiction-specific fields, specialty clinical data, or organization-specific workflow flags -- FHIR provides a standardized way to add extensions.

- Extensions are defined using StructureDefinition Resources, which specify the extension's URL, data type, cardinality, and context (which Resources or elements it can appear on).
- Extensions are first-class citizens in the data model: they appear in the serialized representation and are subject to the same validation rules as core elements.
- Modifier extensions are a special category that change the meaning of the element they extend. Receivers that do not understand a modifier extension must not process the containing Resource, which prevents silent misinterpretation of clinical data.

## FHIR and Security

FHIR leverages standard web security mechanisms rather than inventing its own:

- **Transport security.** All FHIR transactions must use TLS (HTTPS). This is a baseline requirement, not optional.
- **Authentication and authorization.** FHIR servers typically use OAuth 2.0 and OpenID Connect. The SMART on FHIR specification (Substitutable Medical Applications, Reusable Technologies) defines a standardized OAuth 2.0 profile specifically for healthcare, enabling third-party apps to securely access patient data with granular scopes.
- **Audit logging.** FHIR defines an AuditEvent Resource for recording who accessed what data and when, supporting compliance with HIPAA, GDPR, and other privacy regulations.
- **Consent management.** The Consent Resource allows patients' data-sharing preferences to be represented and enforced programmatically.

## Regulatory and Industry Drivers

FHIR adoption is increasingly driven by government mandates rather than voluntary adoption alone.

- **United States CMS mandates.** The CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) entered its first compliance phase in January 2026, requiring payers and providers to implement FHIR-based APIs for prior authorization, patient access, and provider directory exchange.
- **United States ONC regulations.** The ONC 21st Century Cures Act Final Rule requires certified health IT to support FHIR R4 APIs for patient access and data exchange, and prohibits information blocking.
- **European Health Data Space (EHDS).** The European Commission is establishing FHIR-based exchange formats (EHRxF) for cross-border care within the EU. Full specifications are expected by March 2027.
- **United Kingdom.** NHS England is actively migrating regional systems (such as the Interweave shared care record) from older standards to FHIR R4 to unify data across integrated care systems.
- **Australia.** The Australian Digital Health Agency mandates FHIR for the My Health Record system and national prescribing infrastructure.

## Comparison with Earlier HL7 Standards

| Aspect | HL7 v2 | HL7 v3 / CDA | FHIR |
|---|---|---|---|
| Year introduced | 1987 | 2005 | 2014 |
| Data format | Pipe-delimited messages | XML | JSON, XML, RDF |
| API style | Message-based (MLLP) | Document / message | RESTful HTTP |
| Learning curve | Moderate | Steep | Low |
| Extensibility | Ad hoc (Z-segments) | Formal but rigid | Built-in extension mechanism |
| Implementation speed | Weeks to months | Months to years | Days to weeks |
| Adoption trajectory | Legacy; still widely deployed | Declining for new projects | Growing; regulatory mandate |

HL7 v2 remains deeply embedded in hospital infrastructure for ADT (admission, discharge, transfer) and lab messaging. FHIR does not replace v2 overnight but provides the interoperability layer for new applications, patient-facing APIs, and cross-organizational data exchange.

## Implementation Considerations

Technology professionals implementing FHIR should be aware of several practical concerns:

- **Terminology binding.** FHIR Resources use coded values drawn from standard terminologies such as SNOMED CT, LOINC, ICD-10, RxNorm, and CPT. Understanding how ValueSets and CodeSystems work is essential for correct implementation.
- **Profiling.** Most real-world FHIR implementations use jurisdiction-specific profiles. In the United States, the US Core Implementation Guide defines the minimum conformance expectations. In the UK, the UK Core profiles serve the same purpose.
- **Bulk Data.** For population-health analytics and data warehousing, the FHIR Bulk Data Access specification (also called Flat FHIR) enables efficient export of large datasets as NDJSON files.
- **Subscriptions.** FHIR R5 introduces a topic-based Subscriptions framework for event-driven notifications, replacing the older Subscription resource from R4.
- **Testing and validation.** FHIR provides official test servers, validation tools, and the Touchstone testing platform. Implementers should validate their conformance against published profiles before going live.

## Related

To deepen your understanding of FHIR and its ecosystem, explore these related topics: HL7 FHIR Resources for the detailed resource model, HL7 FHIR Extensions for the extension mechanism, HL7 FHIR Versions for release history and migration guidance, FHIR Data Types and FHIR Primitives for the type system, FHIR and Security for authentication and authorization patterns including SMART on FHIR, FHIR Government Regulations for jurisdiction-specific compliance requirements, United States Core Data for Interoperability (USCDI) for the US national data standard, Health Insurance Portability and Accountability Act (HIPAA) for privacy requirements, Value Set Authority Center (VSAC) for terminology management, and the broader domain of health care technology standards.

## Summary

HL7 FHIR is the modern standard for healthcare data interoperability, replacing older HL7 messaging paradigms with a resource-based, RESTful architecture that leverages the same web technologies used across every other industry. Its combination of a modular resource model, built-in extensibility, standard security frameworks, and growing regulatory mandates has made it the default choice for new healthcare IT projects worldwide. For technology professionals, FHIR represents both a technical specification to implement and a regulatory requirement to satisfy -- understanding its architecture, data model, and ecosystem is now a core competency for anyone building health information systems.

## References

- HL7 International. "FHIR R4 Specification." https://hl7.org/fhir/R4/
- HL7 International. "FHIR R5 Specification." https://hl7.org/fhir/R5/
- Office of the National Coordinator for Health IT (ONC). "21st Century Cures Act Final Rule." https://www.healthit.gov/curesrule/
- Centers for Medicare & Medicaid Services (CMS). "CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F)." https://www.cms.gov/regulations-and-guidance
- SMART Health IT. "SMART on FHIR." https://smarthealthit.org/
- HL7 International. "US Core Implementation Guide." https://hl7.org/fhir/us/core/
- European Commission. "European Health Data Space (EHDS)." https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space_en
- NHS England. "NHS Digital Interoperability Standards." https://digital.nhs.uk/services/fhir-apis
- HL7 International. "FHIR Bulk Data Access (Flat FHIR)." https://hl7.org/fhir/uv/bulkdata/
- Bender, Duane, and Kamran Sartipi. "HL7 FHIR: An Agile and RESTful Approach to Healthcare Information Exchange." IEEE Computer Society, 2013.
