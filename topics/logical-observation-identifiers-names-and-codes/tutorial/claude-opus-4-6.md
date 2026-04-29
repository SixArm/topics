# Logical Observation Identifiers Names and Codes (LOINC)

Logical Observation Identifiers Names and Codes (LOINC) is a universal standard for identifying laboratory tests, clinical observations, and diagnostic reports in healthcare information systems. Developed and maintained by the Regenstrief Institute since 1994, LOINC provides a common language that enables interoperability between electronic health records (EHRs), laboratory information systems, public health registries, and clinical research databases. By assigning a unique, permanent code to each distinct observation, LOINC eliminates the ambiguity that arises when different institutions use proprietary names for the same clinical test, making it possible to aggregate, compare, and exchange health data across organizational and national boundaries.

## Why LOINC Exists

Before LOINC, every hospital, laboratory, and health system maintained its own catalog of test names and internal codes. A hemoglobin A1c test might appear as "HbA1c," "Glycated Hgb," or "GHB" depending on the institution. This inconsistency created serious problems: clinical decision support systems could not reliably trigger alerts, population health analyses produced unreliable results, and data migrations between systems required expensive manual mapping. LOINC solves this by providing a single, freely available code set that acts as a universal translator. When two systems both use LOINC code 4548-4 for "Hemoglobin A1c/Hemoglobin.total in Blood," they can exchange that result without ambiguity, regardless of what internal name either system uses locally.

## The Six-Axis Structure

Each LOINC code is a unique numeric identifier built on a six-part naming convention. This multi-axis structure ensures that every code precisely and unambiguously describes a single clinical observation.

| Axis | Description | Example |
|------|-------------|---------|
| **Component (Analyte)** | The substance or entity being measured or observed | Glucose, Hemoglobin, Sodium |
| **Property** | The characteristic being measured | Mass concentration, catalytic activity, number |
| **Time Aspect** | Whether the measurement is a point-in-time snapshot or collected over a duration | Pt (point), 24H (24-hour collection) |
| **System (Specimen)** | The specimen type or body system from which the observation was obtained | Blood, Urine, Serum, Cerebrospinal fluid |
| **Scale** | The type of result value | Qn (quantitative), Ord (ordinal), Nom (nominal), Nar (narrative) |
| **Method** | The measurement technique, included only when it affects clinical interpretation | Automated count, immunoassay, calculation |

A fully specified LOINC name reads as a concatenation of these axes. For example, LOINC code 2345-7 is formally named "Glucose:MCnc:Pt:Ser/Plas:Qn" meaning glucose measured as a mass concentration at a point in time in serum or plasma on a quantitative scale. The method axis is omitted when the technique does not materially affect the result's clinical meaning.

## Scope and Coverage

LOINC is far broader than laboratory chemistry. The standard encompasses two major divisions and numerous subdomains.

- **Laboratory LOINC** covers chemistry, hematology, microbiology, serology, toxicology, urinalysis, molecular pathology, and blood bank testing. These codes represent the bulk of the LOINC database and are the most widely adopted internationally.
- **Clinical LOINC** extends the standard beyond the laboratory to include vital signs (blood pressure, heart rate, respiratory rate), clinical measurements (ECG interpretations, pulmonary function tests), radiology report headers, nursing assessments, patient-reported outcome instruments, and standardized survey tools such as PHQ-9 for depression screening and the Glasgow Coma Scale.
- **Document ontology codes** identify the type and context of clinical documents, such as discharge summaries, consultation notes, and pathology reports. These codes support structured document exchange in standards like HL7 CDA and FHIR.

As of recent releases, LOINC contains over 100,000 codes and is used in more than 170 countries.

## LOINC and Related Standards

LOINC operates within a broader ecosystem of healthcare terminology and interoperability standards. Understanding how these standards relate to each other clarifies where LOINC fits.

| Standard | Primary Purpose | Relationship to LOINC |
|----------|----------------|----------------------|
| **SNOMED CT** | Encodes clinical findings, diagnoses, and result values | LOINC identifies the "question" (what was tested); SNOMED CT identifies the "answer" (what was found) |
| **CPT/HCPCS** | Procedure codes for billing and reimbursement | Administrative and financial, not designed for clinical data exchange; does not substitute for LOINC |
| **ICD-10** | Diagnosis classification for epidemiology and billing | Captures diagnoses, not observations or test identities |
| **HL7 FHIR** | Interoperability framework for health data exchange | FHIR Observation resources reference LOINC codes to identify what was observed |
| **HL7 v2 / CDA** | Messaging and document standards for clinical data | OBX segments in HL7 v2 and CDA documents use LOINC as the preferred observation identifier |

The pairing of LOINC and SNOMED CT is particularly important. LOINC code 2345-7 identifies the test "Glucose in Serum/Plasma," while a SNOMED CT code would encode the clinical interpretation, such as "Hyperglycemia." Together, they create a complete, computable representation of a clinical observation and its result.

## Adoption and Regulatory Requirements

LOINC adoption is driven by both practical benefits and regulatory mandates:

- **United States**: The Office of the National Coordinator for Health Information Technology (ONC) requires LOINC for laboratory result reporting under the Meaningful Use and Promoting Interoperability programs. LOINC is also required for electronic laboratory reporting to public health agencies and for data submission to clinical quality measure programs.
- **International use**: Countries including Canada, Germany, Australia, and many others have adopted LOINC as part of their national health data standards. The International Health Terminology Standards Development Organisation (IHTSDO) and Regenstrief Institute maintain a cooperative agreement linking LOINC and SNOMED CT.
- **Public health**: During disease outbreaks and pandemics, LOINC codes enable standardized reporting of diagnostic test results to public health surveillance systems, supporting rapid aggregation of data across jurisdictions.

## Mapping and Implementation Tools

Implementing LOINC requires mapping an organization's local test catalog to the appropriate LOINC codes. The Regenstrief Institute provides several resources to support this process:

- **RELMA (Regenstrief LOINC Mapping Assistant)**: A desktop application that helps laboratory professionals search the LOINC database and map local test codes to LOINC identifiers. RELMA includes intelligent search, suggested mappings, and a local mapping database.
- **LOINC FHIR Terminology Service**: A web-based API that allows programmatic lookup, validation, and translation of LOINC codes, supporting integration into EHR systems and middleware.
- **LOINC Table and Supporting Files**: The complete LOINC database is available as downloadable files in multiple formats, including CSV and the LOINC/RELMA database format. These files include code definitions, hierarchies, and panel groupings.
- **LOINC Groups**: A higher-level grouping mechanism that clusters related LOINC codes together, useful for clinical decision support rules and quality measure logic where multiple codes may represent the same clinical concept measured by different methods.

All LOINC content is available at no cost, though users must accept a straightforward license agreement. This open-access model has been a significant factor in LOINC's global adoption.

## Common Challenges

Organizations implementing LOINC typically encounter several recurring challenges:

- **Granularity mismatches**: A local test may not map cleanly to a single LOINC code because the local system combines what LOINC treats as separate observations, or vice versa. Resolving these mismatches requires clinical and informatics expertise.
- **Orderable vs. observable**: LOINC codes identify observations (results), not the orders that produce them. A single physician order may generate multiple LOINC-coded results, requiring careful modeling of the order-to-result relationship.
- **Version management**: LOINC releases updates twice per year, adding new codes and deprecating outdated ones. Organizations must establish governance processes for reviewing updates and maintaining their mappings.
- **Method-level specificity**: Deciding when to use a method-specific LOINC code versus a method-independent one requires understanding whether the method affects clinical interpretation in the local context.

## Related

To build a deeper understanding of health data interoperability and clinical terminology, explore related topics including SNOMED CT for clinical terminology encoding, ICD-10 and ICD-11 for diagnosis classification, HL7 FHIR for modern health data exchange, clinical coding practices and standards, electronic health record interoperability, and health information exchange architectures. Understanding how these standards complement each other is essential for designing robust healthcare IT systems.

## Summary

LOINC is the global standard for identifying clinical observations, laboratory tests, and diagnostic reports. Its six-axis naming convention ensures precise, unambiguous identification of what was measured, in what specimen, using what scale and method. Paired with SNOMED CT for encoding results and integrated through HL7 FHIR and other messaging standards, LOINC forms a critical layer in the healthcare interoperability stack. Freely available, widely adopted across more than 170 countries, and mandated by US federal health IT programs, LOINC transforms fragmented local test catalogs into a universal language that supports clinical care, research, public health surveillance, and quality measurement.

## References

- Regenstrief Institute. "LOINC - The freely available standard for identifying health measurements, observations, and documents." https://loinc.org
- McDonald, C.J., Huff, S.M., Suico, J.G., et al. "LOINC, a Universal Standard for Identifying Laboratory Observations: A 5-Year Update." Clinical Chemistry, 49(4), 2003.
- Regenstrief Institute. "RELMA - Regenstrief LOINC Mapping Assistant." https://loinc.org/relma
- Health Level Seven International. "HL7 FHIR Observation Resource." https://hl7.org/fhir/observation.html
- Office of the National Coordinator for Health Information Technology (ONC). "Interoperability Standards Advisory." https://www.healthit.gov/isa
- SNOMED International and Regenstrief Institute. "SNOMED CT and LOINC Cooperative Agreement." https://loinc.org/collaboration/snomed-international
