# United States Core Data for Interoperability (USCDI)

The United States Core Data for Interoperability (USCDI) is a standardized, evolving set of health data classes and constituent data elements developed and maintained by the Office of the National Coordinator for Health Information Technology (ONC). USCDI establishes a common baseline for nationwide health information exchange, ensuring that certified Electronic Health Record (EHR) systems and other health IT products can share critical patient data in a consistent, interoperable manner. By defining what data must be exchanged rather than how it must be exchanged, USCDI provides a technology-neutral foundation that supports a wide variety of standards, including HL7 FHIR, C-CDA, and others. For technology professionals working in healthcare IT, understanding USCDI is essential because it directly shapes system certification requirements, API design, data modeling, and compliance obligations.

## Purpose and Goals

USCDI exists to solve a persistent problem in American healthcare: fragmented, inconsistent health data that cannot move reliably between systems. Before USCDI, different EHR vendors, hospitals, and clinics often stored and transmitted patient information using incompatible formats, making care coordination difficult and error-prone.

USCDI addresses this by defining a minimum required set of data that all certified health IT systems must be able to send, receive, and interpret. The core goals include:

- **Interoperability**: Enable seamless data exchange across EHR platforms, health information exchanges (HIEs), payers, public health agencies, and patients.
- **Patient access**: Empower individuals to access their own health data through standardized APIs, supporting patient-facing applications.
- **Care coordination**: Ensure that clinicians have access to a consistent, baseline set of patient information regardless of which system generated it.
- **Innovation**: Provide a stable data foundation upon which developers can build applications, analytics tools, and population health platforms.
- **Regulatory alignment**: Serve as the compliance benchmark for ONC Health IT Certification and the CMS Interoperability and Patient Access rules.

## Structure: Data Classes and Data Elements

USCDI is organized into a two-level hierarchy of data classes and data elements. A data class is a broad category of clinical or administrative information, while data elements are the specific, granular items within each class.

| Data Class | Example Data Elements |
|---|---|
| Patient Demographics | First name, last name, date of birth, sex, race, ethnicity, preferred language, address |
| Allergies and Intolerances | Substance, reaction, severity, status |
| Medications | Medication name, dose, frequency, route, status |
| Problems (Conditions) | Condition name, date of onset, date of resolution, status |
| Laboratory | Test name, result value, units, reference range, date |
| Vital Signs | Blood pressure, heart rate, body temperature, BMI, oxygen saturation |
| Procedures | Procedure name, date performed, status |
| Immunizations | Vaccine name, date administered, lot number, status |
| Clinical Notes | Discharge summary, history and physical, progress notes, consultation notes |
| Provenance | Author, timestamp, organization, role |
| Health Concerns | Health concern description, status |
| Goals | Goal description, target date, status |
| Assessment and Plan of Treatment | Narrative assessment, planned interventions |
| Social Determinants of Health (SDOH) | Food insecurity, housing status, transportation access, education level |

Each successive version of USCDI expands the number of data classes and elements. For example, SDOH data elements were introduced in USCDI V2 and further expanded in subsequent versions, reflecting a growing recognition that non-clinical factors profoundly affect patient outcomes.

## Version History and Evolution

USCDI is designed to evolve through a transparent, public process. ONC publishes new versions on a regular cadence, soliciting stakeholder feedback through the USCDI+ initiative and the ONC Technical Expert Panels (TEPs). Each new version adds data classes and elements while retaining backward compatibility with earlier versions.

| Version | Key Additions | Certification Mandate Date |
|---|---|---|
| USCDI V1 | Established baseline with core classes such as Patient Demographics, Medications, Allergies, Problems, Lab Results, Vital Signs, Procedures, Immunizations, Clinical Notes, Provenance | Effective with 2015 Edition Cures Update |
| USCDI V2 | Added Health Insurance Information, SDOH Assessment, Clinical Tests, Diagnostic Imaging | Adopted in HTI-1 Final Rule |
| USCDI V3 | Expanded SDOH elements, added Health Status Assessments, Specimen, expanded Clinical Notes | Mandated for certified health IT by January 1, 2026 |
| USCDI V4 | Further expansion including Encounter Diagnosis, Facility Information, additional SDOH granularity | In development and public comment |
| USCDI V5 | Anticipated additions based on stakeholder feedback and emerging interoperability needs | In early planning stages |

The USCDI+ initiative allows specific programs, such as public health reporting or quality measurement, to define domain-specific data element sets that go beyond the USCDI baseline. This layered approach lets USCDI remain broadly applicable while accommodating specialized requirements.

## Regulatory and Compliance Context

USCDI is not merely a recommendation. It carries regulatory weight through several interconnected federal rules and programs:

- **ONC Health IT Certification Program**: Certified EHR technology must support the USCDI version specified in the applicable certification criteria. Vendors that fail to meet these requirements cannot achieve or maintain certification.
- **21st Century Cures Act**: The Cures Act established information blocking provisions that prohibit healthcare providers, health IT developers, and health information exchanges from unreasonably restricting the access, exchange, or use of electronic health information. USCDI defines a significant portion of the data subject to these provisions.
- **CMS Interoperability Rules**: The Centers for Medicare and Medicaid Services (CMS) require payers and providers participating in federal programs to support standardized APIs that expose USCDI data to patients and authorized third parties.
- **Information Blocking Penalties**: Non-compliance with information blocking rules, including failure to exchange USCDI-defined data, can result in civil monetary penalties of up to $1 million per violation for health IT developers and health information networks.

For technology teams, this means that USCDI compliance is a non-negotiable requirement for any system that participates in the certified health IT ecosystem.

## Technical Implementation Considerations

While USCDI defines what data must be exchanged, the technical how is addressed by companion standards and implementation guides. Technology professionals should be aware of several key implementation dimensions:

- **HL7 FHIR**: The primary standard for USCDI data exchange via APIs. The US Core Implementation Guide maps USCDI data elements to specific FHIR resources and profiles. For example, the Patient Demographics data class maps to the FHIR Patient resource, and Laboratory results map to the Observation resource.
- **C-CDA (Consolidated Clinical Document Architecture)**: An older but still widely used document-based standard for exchanging clinical summaries. Many USCDI data classes have corresponding C-CDA sections and templates.
- **Terminology standards**: USCDI requires the use of specific code systems for data elements, including SNOMED CT for clinical terms, LOINC for laboratory and clinical observations, RxNorm for medications, ICD-10-CM for diagnoses, and CPT/HCPCS for procedures.
- **Provenance**: USCDI mandates provenance tracking so that recipients of health data can determine who authored the data, when it was created, and which organization generated it. This is critical for clinical decision-making and audit trails.
- **SMART on FHIR**: The authorization framework commonly used alongside FHIR APIs to manage patient consent and application-level access to USCDI data.

Technology teams building health IT systems should design their data models, API contracts, and validation logic around the USCDI data classes and the corresponding FHIR profiles defined in the US Core Implementation Guide.

## USCDI and USCDI+

USCDI establishes a universal floor, but certain use cases demand additional data beyond the baseline. The USCDI+ initiative addresses this need by defining domain-specific extensions:

- **USCDI+ for Public Health**: Adds data elements required for case reporting, syndromic surveillance, and electronic lab reporting.
- **USCDI+ for Quality Measurement**: Includes additional clinical data needed to calculate electronic clinical quality measures (eCQMs).
- **USCDI+ for Drug Formulary**: Supports payer-to-provider communication about covered medications.

USCDI+ sets are not mandatory for general certification but may be required by specific federal programs. They are designed to be additive, building on the USCDI baseline without contradicting it.

## Challenges and Considerations

Adopting USCDI is not without challenges for technology teams:

- **Data quality**: USCDI defines the structure and semantics of data elements, but the quality of the underlying clinical data varies widely across healthcare organizations. Systems must handle incomplete, inconsistent, or incorrectly coded data gracefully.
- **Terminology mapping**: Organizations that use proprietary or legacy code systems must map their internal codes to the USCDI-required terminologies, which can be complex and error-prone.
- **Version migration**: As USCDI versions evolve, certified systems must update their data models, APIs, and validation rules. This creates ongoing maintenance and testing burdens.
- **Scope limitations**: USCDI is intentionally a minimum set. Many clinical workflows require data elements not yet included in USCDI, which means organizations often need to support both USCDI-mandated and supplementary data exchange.
- **Privacy and consent**: Certain USCDI data elements, particularly SDOH information, raise heightened privacy concerns. Systems must implement appropriate consent management and access controls.

## Related

Professionals working with USCDI should also explore HL7 FHIR and the US Core Implementation Guide, which provide the technical standard for exchanging USCDI data via APIs. Understanding the 21st Century Cures Act and the ONC Health IT Certification Program provides essential regulatory context. Related topics include health information exchange (HIE), the Trusted Exchange Framework and Common Agreement (TEFCA), SMART on FHIR authorization, clinical terminology standards such as SNOMED CT and LOINC, social determinants of health data modeling, information blocking regulations, and the Fast Healthcare Interoperability Resources specification.

## Summary

The United States Core Data for Interoperability (USCDI) is the federally mandated baseline that defines which health data elements must be exchangeable across certified health IT systems in the United States. Maintained by ONC and updated annually, USCDI organizes critical patient information into data classes and elements spanning demographics, clinical observations, medications, social determinants of health, and more. It is enforced through the ONC certification program and the 21st Century Cures Act information blocking provisions, with significant financial penalties for non-compliance. For technology professionals, USCDI shapes data architecture, API design, terminology choices, and compliance strategy across the healthcare IT landscape, making it an indispensable reference for anyone building, integrating, or maintaining health information systems.

## References

- Office of the National Coordinator for Health IT (ONC), "United States Core Data for Interoperability (USCDI)," https://www.healthit.gov/isa/united-states-core-data-interoperability-uscdi
- ONC, "USCDI+ Initiative," https://www.healthit.gov/topic/interoperability/uscdi-plus
- ONC, "Health IT Certification Program," https://www.healthit.gov/topic/certification-ehrs/certification-health-it
- 21st Century Cures Act, Public Law 114-255, https://www.congress.gov/bill/114th-congress/house-bill/34
- ONC, "HTI-1 Final Rule," https://www.healthit.gov/topic/laws-regulation-and-policy/health-data-technology-and-interoperability-certification-program
- HL7 International, "US Core Implementation Guide," https://www.hl7.org/fhir/us/core/
- Centers for Medicare and Medicaid Services, "Interoperability and Patient Access Final Rule," https://www.cms.gov/regulations-and-guidance/guidance/interoperability/index
