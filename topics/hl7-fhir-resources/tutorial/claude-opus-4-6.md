# HL7 FHIR Resources

In the HL7 FHIR (Fast Healthcare Interoperability Resources) standard, resources are the fundamental building blocks used to represent and exchange clinical, administrative, and financial healthcare data. Each resource is a modular, discrete data structure designed to capture a specific healthcare concept, such as a patient record, a medication order, or a diagnostic observation. With over 150 defined resource types, FHIR provides a comprehensive, standardized vocabulary for digital health information that enables interoperability across disparate healthcare systems, electronic health records (EHRs), mobile applications, and cloud platforms.

## What Is a FHIR Resource

A FHIR resource is a self-contained unit of healthcare information with a defined structure, a unique identity, and a well-known URL. Every resource instance has a resource type (e.g., "Patient"), a logical ID, metadata (such as version and last-updated timestamp), and a set of data elements organized into a predictable schema. Resources are designed to be granular enough to represent a single healthcare concept yet composable enough to model complex clinical workflows when linked together through references.

FHIR resources are format-agnostic: they can be serialized as JSON, XML, or RDF (Turtle), giving implementers flexibility to choose the format that best suits their technology stack. JSON is the most widely adopted in modern web and mobile applications, while XML remains prevalent in legacy healthcare integration engines.

## Resource Categories

The HL7 FHIR specification organizes its 150+ resource types into several broad categories. Each category addresses a different domain of healthcare operations.

| Category | Purpose | Example Resources |
|---|---|---|
| Clinical | Core medical and care data | AllergyIntolerance, Condition, Procedure, CarePlan, MedicationRequest, Immunization |
| Administrative | People, organizations, and locations | Patient, Practitioner, Organization, Location, Encounter, HealthcareService |
| Diagnostics | Testing, observations, and reports | Observation, DiagnosticReport, Specimen, ImagingStudy, MolecularSequence |
| Financial | Billing, claims, and insurance | Claim, Coverage, ExplanationOfBenefit, Account, Invoice, ChargeItem |
| Infrastructure | Technical plumbing for data exchange | Bundle, OperationOutcome, CapabilityStatement, StructureDefinition, SearchParameter |
| Conformance | Defining rules and constraints | ImplementationGuide, CodeSystem, ValueSet, ConceptMap, NamingSystem |

This categorization helps developers and architects quickly locate the resources relevant to their use case, whether building a clinical decision support tool, a patient portal, or a claims processing pipeline.

## Key Clinical Resources

Several clinical resources appear in virtually every FHIR implementation:

- **Patient** represents the individual receiving care. It includes demographics, identifiers (such as medical record numbers), contact information, and links to related persons.
- **Condition** captures diagnoses, problems, and health concerns. Each Condition references the Patient it applies to and may include clinical status, severity, onset, and coding (typically ICD-10 or SNOMED CT).
- **Observation** is one of the most versatile resources, used for vital signs, laboratory results, social history, and assessment scores. Observations carry a code, a value, a reference range, and links to the patient and encounter.
- **MedicationRequest** (formerly MedicationOrder) records prescriptions and medication orders, including dosage instructions, dispense quantities, and the prescribing practitioner.
- **Encounter** models a patient's interaction with a healthcare provider, whether an outpatient visit, an emergency department stay, or an inpatient admission.
- **Procedure** documents clinical interventions that have been performed, including surgical operations, counseling sessions, and diagnostic procedures.

## Key Characteristics

FHIR resources share a set of design principles that distinguish them from earlier HL7 standards:

- **Format Flexibility:** Resources can be represented in JSON, XML, or Turtle (RDF), allowing implementers to select the serialization format that fits their architecture.
- **Profiling:** Base resources are designed to cover approximately 80% of common use cases out of the box. FHIR Profiles allow developers to constrain or extend these base definitions to meet specific regional, jurisdictional, or clinical requirements without breaking interoperability.
- **Interconnectivity:** Resources use References to link to one another, forming a web of related health information. For example, an Encounter references a Patient, a Practitioner, and a Location, while an Observation references the Encounter during which it was recorded.
- **API-First Design:** Resources are primarily designed for exchange via RESTful APIs using standard HTTP methods (GET, POST, PUT, DELETE), making them highly compatible with modern web and mobile application architectures.
- **Extensibility:** When the base specification does not include a needed data element, FHIR provides a formal extension mechanism that allows additional data to be attached to any resource without modifying the core specification.
- **Human Readability:** Every resource includes a narrative element (XHTML) that provides a human-readable summary, ensuring that even if a system cannot process the structured data, a clinician can read and understand the content.

## How Resources Interact

FHIR resources do not exist in isolation. They form an interconnected graph of healthcare data through several mechanisms:

- **References** are the primary linking mechanism. A reference contains the resource type and logical ID of the target resource (e.g., "Patient/12345"). References can be absolute URLs, relative URLs, or logical identifiers.
- **Bundles** are container resources that group multiple resources together for transport. A search result returns a Bundle of matching resources. A clinical document is a Bundle of type "document." A transaction submits multiple resource operations atomically.
- **Contained Resources** allow one resource to embed another inline when the contained resource has no independent identity or lifecycle outside the parent.
- **Compartments** define logical groupings of resources around a subject. The Patient compartment, for example, includes all resources that are directly relevant to a specific patient, enabling efficient queries.

## Profiling and Customization

The base FHIR specification intentionally keeps resources general to maximize global applicability. Profiling is the mechanism by which implementers adapt resources to specific contexts:

| Concept | Description |
|---|---|
| Profile | A set of constraints applied to a base resource, such as making certain optional fields required or restricting allowed value sets |
| Extension | A formally defined additional data element added to a resource when the base specification lacks a needed field |
| ValueSet | A curated set of codes from one or more code systems (e.g., SNOMED CT, LOINC, ICD-10) that constrain the allowed values for coded elements |
| Implementation Guide | A package of profiles, extensions, value sets, and documentation that defines how FHIR should be used for a particular use case or jurisdiction |

National programs such as US Core (United States), AU Base (Australia), and UK Core (United Kingdom) publish implementation guides that define country-specific profiles, ensuring that FHIR implementations within a jurisdiction are mutually interoperable.

## FHIR Resource Versioning

FHIR supports versioning at multiple levels. Each resource instance carries a version ID that increments with every update, enabling optimistic concurrency control and audit trails. The FHIR specification itself is versioned (R4, R4B, R5), with R4 being the most widely adopted normative release. Resource definitions may change between specification versions, but the FHIR community maintains backward compatibility commitments for normative content, giving implementers confidence that their investments in R4 will remain viable as the standard evolves.

## Common Implementation Patterns

Technology professionals working with FHIR resources typically encounter several recurring patterns:

- **CRUD Operations:** Creating, reading, updating, and deleting individual resources via RESTful endpoints (e.g., GET /Patient/12345).
- **Search:** Querying for resources using standardized search parameters (e.g., GET /Observation?patient=12345&code=8867-4 to find heart rate observations for a patient).
- **Batch and Transaction:** Submitting multiple operations in a single HTTP request using a Bundle resource, with transactional semantics for atomicity.
- **Subscriptions:** Registering for real-time notifications when resources matching specified criteria are created or updated.
- **Document and Messaging:** Packaging resources into clinical documents or asynchronous messages for scenarios where RESTful exchange is not practical.

## Related

To deepen your understanding of FHIR resources, explore related topics including HL7 FHIR itself for the broader standard and its history, FHIR Profiles for how base resources are constrained and extended, FHIR Extensions for adding custom data elements, Fast Healthcare Interoperability Resources for the overall architecture and design philosophy, Clinical Document Architecture for comparison with the older HL7 document standard, Health Level Seven for the standards organization behind FHIR, and healthcare interoperability standards more broadly to understand how FHIR fits alongside standards like DICOM, X12, and NCPDP.

## Summary

HL7 FHIR resources are the atomic building blocks of modern healthcare data exchange. With over 150 defined types spanning clinical, administrative, diagnostic, financial, and infrastructure domains, they provide a standardized, format-flexible, and API-first approach to representing healthcare information. Their design emphasizes modularity, extensibility through profiles and extensions, and interconnectivity through references and bundles. For technology professionals building healthcare applications, FHIR resources offer a well-defined, globally adopted foundation that balances out-of-the-box usability with the flexibility to meet jurisdiction-specific and use-case-specific requirements.

## References

- HL7 FHIR Official Specification, Resource Index: [https://hl7.org/fhir/resourcelist.html](https://hl7.org/fhir/resourcelist.html)
- HL7 FHIR R4 Documentation: [https://hl7.org/fhir/R4/](https://hl7.org/fhir/R4/)
- HL7 FHIR Profiling Guide: [https://hl7.org/fhir/profiling.html](https://hl7.org/fhir/profiling.html)
- US Core Implementation Guide: [https://hl7.org/fhir/us/core/](https://hl7.org/fhir/us/core/)
- SMART on FHIR: [https://smarthealthit.org/](https://smarthealthit.org/)
- HL7 International: [https://www.hl7.org/](https://www.hl7.org/)
