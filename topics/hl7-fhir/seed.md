# HL7 FHIR

HL7 FHIR (Fast Healthcare Interoperability Resources) is the global standard for
exchanging electronic health records (EHR). It is designed to be
developer-friendly, using modern web technologies like RESTful APIs and data
formats such as JSON and XML.

Key Features:

- **Resource-Based Structure:** Data is organised into modular "Resources" (e.g., Patient, Medication, Encounter) that can be used independently or linked together.
- **Modern API Approach:** Built on RESTful principles, allowing mobile apps and cloud systems to query healthcare data as easily as any other web service.
- **Implementation Focus:** FHIR includes built-in tools for validation and testing, making it significantly faster to implement than older HL7 standards like v2 or CDA.
- **Extensions:** A robust mechanism to add custom data fields (as discussed previously) without breaking the core standard.

Regulatory & Industry Drivers

- **United States CMS Mandates:** The CMS-0057-F Interoperability Rule has entered its first phase in January 2026, forcing payers and providers to use FHIR APIs for prior authorisation and patient data exchange.
- **European Health Data Space (EHDS):** The European Commission is currently establishing FHIR-based exchange formats (EHRxF) for cross-border care, with full specifications expected by March 2027.
- **United Kingdom Implementation:** NHS England is actively migrating regional systems (like the Interweave shared care record) from older versions to FHIR R4 to unify data across integrated care systems.
