# Value Set Authority Center (VSAC)

The Value Set Authority Center (VSAC) is a centralized repository and authoring platform maintained by the United States National Library of Medicine (NLM) for managing public value sets used in healthcare information technology. A value set is a curated list of codes and their corresponding terms, drawn from standardized clinical vocabularies such as SNOMED CT, RxNorm, LOINC, ICD-10, and CPT. These value sets define clinical concepts that enable consistent, computable, and interoperable health data exchange across electronic health record (EHR) systems, quality reporting platforms, and clinical decision support tools. For technology professionals working in health IT, the VSAC is a critical infrastructure component that underpins electronic clinical quality measures (eCQMs), clinical data interoperability, and regulatory compliance.

## Purpose and Role

The VSAC serves as the authoritative distribution point for value sets referenced by federal health programs. It does not create value set content itself; instead, it hosts, versions, and distributes value sets authored by external steward organizations such as the Centers for Disease Control and Prevention (CDC), the National Committee for Quality Assurance (NCQA), and the American Medical Association (AMA). The VSAC is operated by the NLM in collaboration with the Office of the National Coordinator for Health Information Technology (ONC, now part of ASTP) and the Centers for Medicare and Medicaid Services (CMS). Its primary role is to provide a single, reliable access point where implementers can retrieve the exact value sets specified by eCQMs and other health IT standards, ensuring that every system interpreting a clinical quality measure uses the same set of codes.

## Core Terminology Systems

The VSAC draws codes from multiple NLM-hosted standard clinical vocabularies. Understanding these terminology systems is essential for any technology professional integrating with the VSAC.

| Terminology | Full Name | Primary Use |
|---|---|---|
| SNOMED CT | Systematized Nomenclature of Medicine - Clinical Terms | Clinical findings, procedures, body structures, organisms |
| RxNorm | RxNorm | Normalized names for medications and drug components |
| LOINC | Logical Observation Identifiers Names and Codes | Laboratory tests, clinical observations, survey instruments |
| ICD-10-CM | International Classification of Diseases, 10th Revision, Clinical Modification | Diagnosis coding for billing and epidemiology |
| ICD-10-PCS | International Classification of Diseases, 10th Revision, Procedure Coding System | Inpatient procedure coding |
| CPT | Current Procedural Terminology | Outpatient procedures and professional services |
| CVX | Vaccines Administered | Vaccine product identification |
| HCPCS | Healthcare Common Procedure Coding System | Medical supplies, equipment, and services |

Each value set in the VSAC references one or more of these vocabularies. A single value set may combine codes from multiple systems to fully represent a clinical concept, such as "diabetes" spanning diagnosis codes from ICD-10-CM and medication codes from RxNorm.

## Key Features and Capabilities

The VSAC provides several capabilities that are relevant to technology professionals building or maintaining health IT systems:

- **Value Set Search and Browse**: A web-based interface that allows users to search for value sets by name, OID (Object Identifier), steward, or keyword. Each value set listing includes metadata such as the authoring organization, purpose, definition type, and revision history.
- **SVS API (Sharing Value Sets)**: A RESTful API conforming to the IHE Sharing Value Sets profile that enables programmatic retrieval of value sets in XML format. This is the primary integration path for automated systems.
- **FHIR Terminology Service API**: A FHIR-conformant API that supports value set retrieval and code validation using FHIR ValueSet and CodeSystem resources. This is increasingly the preferred integration method for modern health IT systems.
- **Downloadable Value Set Packages**: Bulk download capability for all value sets associated with a specific eCQM reporting period, typically published in Excel and XML formats.
- **Versioning and History**: Every value set revision is tracked with a version date, allowing implementers to retrieve the exact version of a value set in effect during a specific reporting period.
- **UMLS Licensing**: Access to the VSAC requires a free Unified Medical Language System (UMLS) license from the NLM, due to the inclusion of proprietary terminologies such as SNOMED CT and CPT.

## Value Set Structure

Each value set in the VSAC is defined by a consistent structure that implementers must understand:

- **OID**: A globally unique object identifier (e.g., 2.16.840.1.113883.3.464.1003.103.12.1001) that serves as the canonical reference for the value set across all systems.
- **Name**: A human-readable name describing the clinical concept the value set represents.
- **Steward**: The organization responsible for authoring and maintaining the value set content.
- **Definition Type**: Either "Extensional" (an explicit list of codes) or "Intensional" (a rule-based definition that generates the code list from a query against a terminology).
- **Code System(s)**: The terminology or terminologies from which codes are drawn.
- **Codes and Descriptors**: The individual code entries, each with the code value, display name, and code system version.
- **Version**: A date-stamped version identifier enabling precise reproducibility.

## Relationship to eCQMs and Quality Reporting

The most prominent use case for the VSAC is supporting CMS electronic Clinical Quality Measures. eCQMs are standardized measures of healthcare quality that are computed from data in EHR systems. Each eCQM references specific value sets to define the patient populations, clinical interventions, diagnoses, and outcomes relevant to the measure. When CMS publishes an annual update to its quality reporting programs, the corresponding value sets are updated in the VSAC. Health IT vendors, hospitals, and quality reporting organizations must retrieve the correct value set versions to accurately calculate and report measure results.

The VSAC is tightly coupled to the eCQI Resource Center, which publishes the specifications for eCQMs. Measure logic is expressed in Clinical Quality Language (CQL), and value set references within CQL expressions point to VSAC OIDs. This chain of dependencies means that any system computing eCQMs must integrate with the VSAC to resolve value set references at runtime or during measure packaging.

## Integration Approaches

Technology professionals integrating with the VSAC typically follow one of these approaches:

| Approach | Protocol | Best For |
|---|---|---|
| SVS API | REST/XML (IHE SVS profile) | Legacy systems, batch retrieval, XML-based pipelines |
| FHIR Terminology Service | REST/JSON or XML (FHIR R4) | Modern FHIR-based applications, real-time code validation |
| Bulk Download | HTTP/Excel/XML | Offline environments, data warehouses, annual measure updates |
| Manual Lookup | Web browser | Ad hoc research, value set review, stewardship workflows |

For FHIR-based integration, the VSAC FHIR Terminology Service supports operations such as `$expand` (to retrieve all codes in a value set), `$validate-code` (to check if a code belongs to a value set), and `$lookup` (to retrieve details about a specific code). These operations align with the FHIR R4 specification and are increasingly expected by certification programs and interoperability frameworks.

## Authentication and Access

Accessing the VSAC programmatically requires a UMLS API key, which is obtained by creating a free UMLS account through the NLM. This requirement exists because several of the underlying terminologies (SNOMED CT, CPT, LOINC) are subject to licensing restrictions. The UMLS license grants users the right to use these terminologies for legitimate health IT purposes. API authentication is performed by including the API key as a parameter in REST requests. For FHIR-based access, the API key is passed as a bearer token or query parameter depending on the endpoint.

## Related

Technology professionals working with the VSAC should also explore Fast Healthcare Interoperability Resources (FHIR) for understanding the broader interoperability framework, HL7 FHIR profiles and extensions for how value sets are used within FHIR implementation guides, the United States National Library of Medicine (NLM) for context on the parent organization, Clinical Document Architecture (CDA) for the legacy document standard that also references VSAC value sets, FHIR government regulations for the regulatory landscape driving value set adoption, and the Health Insurance Portability and Accountability Act (HIPAA) for the compliance context in which clinical terminology standards operate.

## Summary

The Value Set Authority Center is the definitive source for standardized clinical value sets used across the United States healthcare IT ecosystem. It provides versioned, machine-retrievable collections of coded clinical concepts drawn from nationally recognized terminologies, enabling consistent interpretation of electronic clinical quality measures and interoperable health data exchange. For technology professionals, the VSAC is an essential integration point accessed via SVS or FHIR APIs, requiring a free UMLS license, and serving as the bridge between clinical quality measure specifications and the coded vocabularies that give those measures computational meaning.

## References

- National Library of Medicine, "Value Set Authority Center (VSAC)," U.S. National Library of Medicine. Available at: https://vsac.nlm.nih.gov/
- Centers for Medicare & Medicaid Services, "eCQI Resource Center," CMS. Available at: https://ecqi.healthit.gov/
- National Library of Medicine, "UMLS Terminology Services," NLM. Available at: https://uts.nlm.nih.gov/
- HL7 International, "FHIR R4 Terminology Module," HL7 FHIR Specification. Available at: https://www.hl7.org/fhir/terminology-module.html
- Integrating the Healthcare Enterprise (IHE), "Sharing Value Sets (SVS) Profile," IHE IT Infrastructure Technical Framework. Available at: https://www.ihe.net/
- Office of the National Coordinator for Health Information Technology, "Interoperability Standards Advisory," ASTP/ONC. Available at: https://www.healthit.gov/isa/
