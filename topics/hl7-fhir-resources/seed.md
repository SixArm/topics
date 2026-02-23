# HL7 FHIR Resources

In the HL7 FHIR (Fast Healthcare Interoperability Resources) standard, resources are the fundamental building blocks used to represent and exchange clinical, administrative, and financial healthcare data. Each resource is a modular, discrete data structure designed to capture a specific healthcare concept. 

The HL7 FHIR Resource List contains over 150 types, broadly categorised to manage different aspects of healthcare: 
- **Clinical:** Represents core medical data, such as AllergyIntolerance, Condition (diagnoses), Procedure, and CarePlan.
- **Administrative:** Focuses on the "who" and "where," including Patient, Practitioner, Organization, and Location.
- **Diagnostics:** Covers data related to testing, such as Observation (vitals, lab results), DiagnosticReport, and Specimen.
- **Financial:** Manages billing and insurance, including Claim, Coverage, and ExplanationOfBenefit.
- **Infrastructure:** Provides technical support for data exchange, such as Bundle (a container for multiple resources) and OperationOutcome (error/success reports). 

Key Characteristics
- **Format Flexibility:** Resources can be represented in JSON, XML, or Turtle.
- **Profiling:** Base resources cover ~80% of common use cases; FHIR Profiles allow developers to constrain or extend these resources to meet specific regional or clinical needs.
- **Interconnectivity:** Resources use References to link to one another, forming a web of related health information (e.g., an Encounter references a Patient and a Practitioner).
- **API-First:** They are primarily designed for exchange via a RESTful API, making them highly compatible with modern mobile and web applications. 
