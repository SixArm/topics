# Clinical document architecture (CDA)

Clinical Document Architecture (CDA) is an XML-based markup standard developed by Health Level Seven International (HL7) for defining the structure, semantics, and encoding of clinical documents. It provides a standardized framework for exchanging patient-centered documents — such as discharge summaries, progress notes, and diagnostic reports — across disparate healthcare information systems. CDA is a foundational component of health information exchange (HIE) and plays a critical role in enabling interoperability among electronic health record (EHR) systems, hospitals, laboratories, pharmacies, and public health agencies.

## Purpose and motivation

Healthcare organizations generate vast quantities of clinical documentation during every patient encounter. Historically, these documents existed as unstructured text, scanned images, or proprietary file formats, making it extremely difficult to share information reliably between systems. CDA was created to solve this problem by defining a universal, machine-readable document format that preserves both human readability and structured data for automated processing.

A clinical document is any document providing information about a patient or a group of patients, such as diagnostic findings from an interaction, a discharge summary, or a quality measure report regarding a group of patients. The need to send and receive clinical documents in a structured format led HL7 to the creation of CDA.

Key motivations behind CDA include:

- **Interoperability**: Enabling systems from different vendors to exchange and interpret clinical documents without custom integration work.
- **Persistence**: Clinical documents must be stored and retrieved over long periods, sometimes decades, for legal and medical continuity.
- **Stewardship**: Every CDA document has a responsible organization that maintains and authenticates the document.
- **Context preservation**: The document retains its full clinical meaning regardless of where or when it is accessed.
- **Wholeness**: A CDA document is a complete unit of information, authenticated and attested as a whole rather than as individual fragments.

## Document structure

CDA documents are encoded in XML and follow a well-defined hierarchical structure. At the highest level, every CDA document consists of two primary components: the Header and the Body.

- **Header**: Contains metadata about the document, including the patient identity, the authoring clinician, the custodian organization, document type, creation date, confidentiality level, and intended recipients. The Header enables systems to route, index, and manage documents without necessarily parsing the clinical content within the Body.

- **Body**: Contains the actual clinical content. The Body can range from entirely unstructured (a wrapped PDF or plain text) to fully structured with coded entries using standardized medical terminologies such as SNOMED CT, LOINC, ICD-10, and RxNorm.

The simplest CDA structure contains only the Header and Body, and those two components provide the lowest level of interoperability. For example, the Body could contain an Adobe PDF or a Microsoft Word document, with the rendering and processing left up to the receiving party. The Header provides structured descriptive information about the document so that the receiver can identify and use it. As more structure is added into the Body with standardized nested sections, more functionality and interoperability can be achieved.

## CDA levels of interoperability

CDA defines three levels of increasing structure and machine processability. Each level builds upon the previous one and offers greater interoperability.

| Level | Name | Description | Interoperability |
|-------|------|-------------|------------------|
| Level 1 | Unstructured Body | The Body contains a non-XML object such as a PDF, image, or plain text. The Header is fully structured. | Low — human-readable only in the Body. |
| Level 2 | Structured Sections | The Body is divided into named XML sections (e.g., "History of Present Illness," "Medications," "Assessment and Plan") with human-readable narrative text. | Medium — sections are identifiable and navigable by machines. |
| Level 3 | Coded Entries | Sections include coded, machine-processable clinical entries using standard terminologies (SNOMED CT, LOINC, RxNorm). | High — fully computable data alongside human-readable narrative. |

Level 3 provides the greatest value for clinical decision support, population health analytics, and automated quality reporting, because the data can be ingested and processed by software without human interpretation.

## Key design principles

CDA was designed around a set of principles that distinguish it from ad hoc document formats:

- **Persistence**: A CDA document is a persistent record. Once created and authenticated, it is intended to exist unchanged for the life of the document.
- **Stewardship**: Each document is maintained by a custodian organization responsible for its integrity and availability.
- **Authentication**: Clinical documents carry legal weight. CDA supports digital signatures and attestation by one or more clinicians.
- **Wholeness**: The document is authenticated as a complete unit. Individual sections or entries cannot be extracted and authenticated independently.
- **Human readability**: Every CDA document must be renderable into a human-readable form. The narrative block within each section guarantees that a clinician can always read the document, even if coded entries are not understood by the receiving system.

## Common CDA document types

CDA is used for a wide variety of clinical documents. The following are among the most commonly implemented:

- **Continuity of Care Document (CCD)**: A summary of a patient's medical status including problems, medications, allergies, and care plans. The CCD is one of the most widely adopted CDA-based documents in the United States.
- **Discharge Summary**: Documents the course of a hospital stay, diagnoses, procedures performed, and follow-up instructions.
- **Consultation Note**: A clinician's findings and recommendations following a referral consultation.
- **History and Physical (H&P)**: A comprehensive document created at the start of a hospital admission documenting the patient's medical history and physical examination.
- **Progress Note**: An ongoing record of a patient's condition and treatment during a course of care, such as a SOAP (Subjective, Objective, Assessment, Plan) note.
- **Operative Note**: Details of a surgical procedure including pre-operative diagnosis, procedure performed, findings, and post-operative instructions.
- **Diagnostic Imaging Report**: Structured report of imaging studies such as X-rays, CT scans, and MRIs.

## CDA and the Consolidated CDA (C-CDA)

Consolidated CDA (C-CDA) is a set of implementation guides published by HL7 that standardize the most common CDA document types and templates used in the United States. C-CDA was developed to reduce the variability that had emerged from multiple competing CDA implementation guides, creating a single authoritative reference.

| Aspect | CDA | C-CDA |
|--------|-----|-------|
| Scope | General-purpose document architecture | U.S.-focused implementation guide for common document types |
| Specificity | Defines overall structure and rules | Provides specific templates, value sets, and constraints |
| Regulatory role | Underlying standard | Required by the U.S. Office of the National Coordinator (ONC) for EHR certification |
| Document types | Any clinical document | Standardized set including CCD, Discharge Summary, Referral Note, and others |

C-CDA is mandated under the ONC Health IT Certification Program and is a core component of Meaningful Use (now Promoting Interoperability) requirements for certified EHR systems.

## CDA and FHIR

Fast Healthcare Interoperability Resources (FHIR) is HL7's newer standard for health data exchange, built on modern web technologies such as RESTful APIs and JSON. While CDA and FHIR serve overlapping purposes, they are complementary rather than mutually exclusive.

- **CDA** excels at representing complete, attested clinical documents that must persist over time and carry legal authenticity.
- **FHIR** excels at granular, real-time data exchange — querying a single medication list, retrieving lab results, or triggering clinical decision support alerts.

FHIR includes a DocumentReference resource that can wrap and reference CDA documents, and HL7 has published guidance for mapping between CDA templates and FHIR resources. Many healthcare organizations use both standards: CDA for document exchange and FHIR for API-driven data access. The industry trend is toward broader FHIR adoption, but the large installed base of CDA implementations ensures its continued relevance for years to come.

## Advantages and limitations

**Advantages:**

- Mature, widely adopted standard with extensive tooling and implementation experience.
- Supports the full spectrum from unstructured to fully coded documents.
- Preserves human readability alongside machine processability.
- Backed by regulatory mandates in the United States and other jurisdictions.
- Strong support for document authentication, legal attestation, and long-term persistence.

**Limitations:**

- XML-based format is verbose and can be complex to implement correctly.
- Template and constraint layering (CDA R2 plus implementation guides plus local extensions) creates a steep learning curve.
- Validation tooling varies in quality across vendors.
- Document-centric model is less suited to real-time, granular data queries compared to FHIR.
- Variability in implementation quality across organizations can undermine interoperability in practice despite the standard's intent.

## Related

Professionals working with CDA should also explore **HL7 FHIR** for modern API-based health data exchange, **HL7 Version 2 (V2)** messaging for understanding legacy integration patterns, **SNOMED CT** and **LOINC** for clinical terminology standards used within CDA coded entries, **ICD-10** for diagnosis coding, **Consolidated CDA (C-CDA)** implementation guides for U.S.-specific templates, the **Continuity of Care Document (CCD)** as the most widely deployed CDA profile, and **health information exchange (HIE)** architectures that rely on CDA for document transport and sharing.

## Summary

Clinical Document Architecture is HL7's XML-based standard for structuring, encoding, and exchanging clinical documents across healthcare systems. It provides a layered approach to interoperability — from simple document wrapping at Level 1 through fully coded, machine-processable entries at Level 3 — while guaranteeing that every document remains human-readable. CDA's design principles of persistence, stewardship, authentication, and wholeness make it well suited for documents that carry legal and clinical significance. Although FHIR is increasingly used for granular, real-time data exchange, CDA remains deeply embedded in healthcare infrastructure through regulatory mandates like the ONC certification program and Meaningful Use, and through its large installed base of Consolidated CDA implementations. For technology professionals working in healthcare IT, understanding CDA is essential for building, integrating, and maintaining systems that exchange clinical documentation.

## References

- Health Level Seven International. "HL7 CDA Release 2." HL7 Standards Product Brief. https://www.hl7.org/implement/standards/product_brief.cfm?product_id=7
- Health Level Seven International. "HL7 Implementation Guide for CDA Release 2: Consolidated CDA Templates for Clinical Notes (C-CDA)." https://www.hl7.org/ccdasearch/
- Office of the National Coordinator for Health Information Technology (ONC). "2015 Edition Health IT Certification Criteria." https://www.healthit.gov/topic/certification-ehrs/2015-edition
- Dolin, R.H., Alschuler, L., Boyer, S., et al. "HL7 Clinical Document Architecture, Release 2." Journal of the American Medical Informatics Association, 13(1), 2006, pp. 30–39.
- Benson, T., and Grieve, G. "Principles of Health Interoperability: HL7 and FHIR." Springer, 4th Edition.
- HL7 International. "FHIR R4 DocumentReference Resource." https://www.hl7.org/fhir/documentreference.html
