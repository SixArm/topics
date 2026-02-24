# Fast Healthcare Interoperability Resources (FHIR)

Fast Healthcare Interoperability Resources (FHIR), pronounced "fire," is a modern standard developed by Health Level Seven International (HL7) for exchanging electronic health information between disparate healthcare systems. FHIR combines the strengths of earlier HL7 standards with contemporary web technologies, using RESTful APIs, HTTP-based protocols, and widely adopted data formats such as JSON and XML. For technology professionals working in healthcare, health IT, or any domain that touches clinical or administrative health data, FHIR has become the foundational interoperability standard that governs how systems communicate patient records, clinical observations, medications, and administrative data across organizational boundaries.

## Why FHIR Exists

Before FHIR, healthcare data exchange relied on older HL7 standards such as HL7 Version 2 (V2) and HL7 Version 3 (V3), as well as the Clinical Document Architecture (CDA). These predecessors served the industry for decades but carried significant limitations. V2 uses a pipe-delimited message format that is flexible to the point of ambiguity, resulting in wide variation between implementations. V3 attempted to impose a rigorous reference information model but proved so complex that adoption was slow and implementation costs were high. CDA provided structured clinical documents but was tightly coupled to XML and difficult to use in modern web and mobile contexts. FHIR was created to solve these problems by offering a standard that is easy to implement, built on ubiquitous web technologies, and modular enough to support use cases ranging from simple mobile apps to enterprise-scale data exchange platforms.

## Core Concepts

FHIR is organized around a small number of foundational concepts that technology professionals must understand to work with the standard effectively.

- **Resources**: The fundamental unit of interoperability in FHIR. Each resource represents a discrete, clinically or administratively meaningful concept such as a Patient, Observation, Condition, Medication, or Encounter. Resources are self-contained data objects with a defined structure, and each resource type has its own specification describing its fields, data types, and constraints.
- **RESTful API**: FHIR defines a standard RESTful interface for creating, reading, updating, deleting, and searching resources. Standard HTTP verbs (GET, POST, PUT, DELETE) map directly to FHIR operations, making the API immediately familiar to any developer experienced with web services.
- **Data formats**: FHIR supports JSON, XML, and RDF as serialization formats. JSON is the most commonly used in modern implementations due to its lightweight nature and broad tooling support.
- **References**: Resources link to one another through references, allowing complex clinical scenarios to be represented as a graph of interconnected resources rather than a single monolithic document.
- **Bundles**: A Bundle resource groups multiple resources into a single container for batch operations, transaction processing, search result sets, or document exchange.
- **Extensions**: FHIR provides a built-in extension mechanism that allows implementers to add data elements beyond the base specification without breaking conformance, ensuring the standard can accommodate local, regional, or domain-specific requirements.

## Key FHIR Resources

FHIR defines over 150 resource types organized into categories. The following table highlights the most commonly encountered resources across clinical and administrative workflows.

| Resource | Category | Description |
|---|---|---|
| **Patient** | Identification | Demographics and identifying information for an individual receiving care |
| **Practitioner** | Identification | A person who is directly or indirectly involved in the provisioning of healthcare |
| **Observation** | Clinical | Measurements, assessments, and findings such as lab results, vital signs, or social history |
| **Condition** | Clinical | A clinical condition, problem, diagnosis, or other event that is relevant to patient care |
| **Medication** | Medication | The definition of a medication, including its ingredients, form, and strength |
| **MedicationRequest** | Medication | An order or request for a medication to be supplied and administered to a patient |
| **Encounter** | Administrative | An interaction between a patient and healthcare provider for the purpose of providing care |
| **AllergyIntolerance** | Clinical | Risk of harmful or undesirable physiological response to a substance |
| **DiagnosticReport** | Clinical | Findings and interpretation of diagnostic tests such as laboratory or imaging results |
| **Immunization** | Clinical | A record of a vaccination event including the vaccine administered and timing |

## FHIR Versions

FHIR has evolved through several releases, each expanding the scope of normative (stable, non-breaking) content.

| Version | Release Year | Key Characteristics |
|---|---|---|
| **DSTU 1** | 2014 | First Draft Standard for Trial Use; initial resource definitions and RESTful API |
| **DSTU 2** | 2015 | Expanded resource catalog; improved search and conformance mechanisms |
| **STU 3** | 2017 | Major growth in resource types; enhanced operations and subscription model |
| **R4** | 2019 | First version with normative content; widely mandated by regulations including US Core and ONC rules |
| **R4B** | 2022 | Incremental update to R4 with select new resources and corrections |
| **R5** | 2023 | Expanded subscriptions framework, enhanced terminology support, new resources for genomics and evidence-based medicine |

Release 4 (R4) remains the most widely adopted version in production systems worldwide and is the baseline required by many national regulations.

## Profiling and Implementation Guides

FHIR is intentionally broad, and the base specification permits wide variation in how resources are populated. To constrain the standard for specific use cases, regions, or organizations, FHIR uses a mechanism called profiling.

- **Profiles** restrict and extend base resource definitions by specifying which elements are required, which are forbidden, which value sets must be used for coded fields, and what extensions are expected. A profile narrows the optionality of the base standard to ensure consistent data exchange between systems within a given context.
- **Implementation Guides (IGs)** are comprehensive packages that combine profiles, value sets, capability statements, search parameter definitions, and narrative documentation into a cohesive specification for a particular use case or jurisdiction.
- **US Core** is the foundational implementation guide for the United States, mandated under the 21st Century Cures Act and ONC regulations. It defines a minimum set of data elements that health IT systems must support for interoperability.
- **International Patient Summary (IPS)** is a cross-border implementation guide designed to support clinical care when patients travel between countries.
- **UK Core** and **AU Core** provide national-level profiling for the United Kingdom and Australia, respectively.

## FHIR and Regulatory Mandates

Government regulations have been a major driver of FHIR adoption worldwide. Understanding the regulatory landscape is essential for technology professionals implementing FHIR-based systems.

- **United States**: The 21st Century Cures Act and the ONC Health IT Certification Program require certified health IT systems to support FHIR R4 APIs for patient access and data exchange. The CMS Interoperability and Patient Access Rule mandates that health plans expose claims and clinical data through FHIR APIs.
- **European Union**: The European Health Data Space (EHDS) initiative references FHIR as a key standard for cross-border health data exchange.
- **United Kingdom**: NHS Digital has adopted FHIR as the primary standard for interoperability across the National Health Service, with UK Core profiles governing implementation.
- **Australia**: The Australian Digital Health Agency promotes FHIR through AU Core profiles and the My Health Record system.
- **Canada**: Ontario Health and other provincial bodies have adopted FHIR-based specifications for digital health interoperability.

## FHIR Compared to Other Healthcare Standards

| Standard | Era | Transport | Format | Complexity | FHIR Relationship |
|---|---|---|---|---|---|
| **HL7 V2** | 1987-present | MLLP, TCP/IP | Pipe-delimited | Moderate but highly variable | FHIR replaces V2 for new implementations; many systems still run V2 |
| **HL7 V3** | 2005-present | SOAP, XML | XML (RIM-based) | Very high | FHIR simplifies V3 concepts into modular resources |
| **CDA (Clinical Document Architecture)** | 2005-present | Document exchange | XML | High | FHIR Documents can replace CDA; CDA-on-FHIR provides a bridge |
| **DICOM** | 1993-present | DICOM protocol | Binary, XML | Moderate (domain-specific) | FHIR references DICOM for imaging; ImagingStudy resource links to DICOM objects |
| **X12/EDIFACT** | 1979-present | Batch file transfer | Fixed-format EDI | Moderate | FHIR is expanding into administrative and claims domains historically served by X12 |

## SMART on FHIR

SMART on FHIR (Substitutable Medical Applications, Reusable Technologies) is a standards-based framework that enables third-party applications to run within electronic health record (EHR) systems securely. SMART on FHIR uses OAuth 2.0 for authorization and OpenID Connect for authentication, allowing applications to launch in context from within an EHR, access FHIR APIs with scoped permissions, and operate across different EHR platforms without vendor-specific customization.

For technology professionals, SMART on FHIR is significant because it creates an app ecosystem for healthcare analogous to app stores in consumer technology. Clinical decision support tools, patient-facing applications, research data collection instruments, and population health dashboards can all be built once and deployed across any SMART-enabled EHR system.

## FHIR Terminology and Value Sets

Clinical data is heavily coded, and FHIR relies on standardized terminologies to ensure semantic interoperability. Key terminology systems used within FHIR include:

- **SNOMED CT**: A comprehensive clinical terminology covering diseases, procedures, findings, and clinical concepts.
- **LOINC (Logical Observation Identifiers Names and Codes)**: The standard for identifying laboratory and clinical observations.
- **ICD-10/ICD-11**: The World Health Organization classification systems for diseases and health conditions.
- **RxNorm**: A normalized naming system for clinical drugs in the United States.
- **CPT (Current Procedural Terminology)**: Codes for medical procedures and services used in billing and administration.
- **FHIR Value Sets**: Curated sets of codes drawn from one or more terminology systems, bound to specific resource elements through profiles to constrain the allowed values.

## Implementation Considerations

Technology professionals implementing FHIR-based systems should account for several practical concerns.

- **Conformance and testing**: The FHIR specification includes CapabilityStatement resources that describe what a server supports. Tools such as the HL7 FHIR Validator, Touchstone, and Inferno test suites help verify that implementations conform to profiles and implementation guides.
- **Security**: FHIR APIs must be secured using HTTPS, OAuth 2.0, and SMART on FHIR scopes. Consent management, audit logging, and data segmentation for privacy are critical in healthcare contexts.
- **Bulk Data Access**: The FHIR Bulk Data Access specification enables large-scale export of population-level data using asynchronous NDJSON (Newline Delimited JSON) downloads, which is essential for analytics, research, and public health reporting.
- **Subscriptions**: FHIR R5 introduced an enhanced Subscriptions framework that allows clients to receive notifications when resources matching specified criteria are created or updated, supporting event-driven integration patterns.
- **Mapping and transformation**: Organizations migrating from V2, CDA, or proprietary formats must build mapping layers to transform legacy data into conformant FHIR resources. The FHIR Mapping Language and StructureMap resource provide standardized approaches to this transformation.

## Related

Technology professionals working with FHIR should also explore HL7 Version 2 messaging for understanding legacy healthcare integration, electronic health records and their architecture, RESTful API design principles and OAuth 2.0 security, clinical terminologies such as SNOMED CT and LOINC, healthcare data privacy regulations including HIPAA and GDPR, interoperability frameworks and health information exchange networks, cloud computing platforms that offer managed FHIR services such as Google Cloud Healthcare API and Azure Health Data Services, and the broader domain of health informatics and clinical data modeling.

## Summary

Fast Healthcare Interoperability Resources (FHIR) is the modern standard for healthcare data exchange, built on RESTful APIs, JSON/XML serialization, and a modular resource-based architecture that breaks clinical and administrative information into discrete, reusable components. Developed by HL7 International and now mandated by regulations in the United States, the United Kingdom, Australia, and other jurisdictions, FHIR replaces the complexity and variability of earlier standards with an approach that is accessible to any developer familiar with web technologies. Its profiling mechanism, terminology bindings, SMART on FHIR app framework, and bulk data capabilities make it suitable for use cases ranging from patient-facing mobile applications to enterprise-scale population health analytics. For technology professionals entering the healthcare domain, FHIR proficiency is increasingly a baseline requirement for building, integrating, and maintaining health IT systems.

## References

- Health Level Seven International (HL7). "FHIR Overview." https://www.hl7.org/fhir/overview.html
- Health Level Seven International (HL7). "FHIR R4 Specification." https://hl7.org/fhir/R4/
- Health Level Seven International (HL7). "FHIR R5 Specification." https://hl7.org/fhir/R5/
- Office of the National Coordinator for Health IT (ONC). "21st Century Cures Act: Interoperability, Information Blocking, and the ONC Health IT Certification Program." https://www.healthit.gov/curesrule/
- Centers for Medicare and Medicaid Services (CMS). "Interoperability and Patient Access Final Rule." https://www.cms.gov/regulations-and-guidance/guidance/interoperability/index
- SMART Health IT. "SMART on FHIR." https://smarthealthit.org/
- Mandel, J.C., Kreda, D.A., Mandl, K.D., Kohane, I.S., and Ramoni, R.B. "SMART on FHIR: A Standards-Based, Interoperable Apps Platform for Electronic Health Records." *Journal of the American Medical Informatics Association*, vol. 23, no. 5, 2016.
- Bender, D. and Sartipi, K. "HL7 FHIR: An Agile and RESTful Approach to Healthcare Information Exchange." *Proceedings of the 26th IEEE International Symposium on Computer-Based Medical Systems*, 2013.
- NHS Digital. "UK Core FHIR Implementation Guide." https://digital.nhs.uk/services/fhir-uk-core
- HL7 International. "US Core Implementation Guide." https://www.hl7.org/fhir/us/core/
