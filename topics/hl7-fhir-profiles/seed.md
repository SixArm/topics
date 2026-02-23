# FHIR Profiles

Fast Healthcare Interoperability Resources (FHIR) profiles are a formal way to
customize and constrain the base FHIR standard for specific use cases. While
base FHIR resources (like Patient or Observation) are designed to cover roughly
80% of common data elements globally, profiles handle the remaining 20% by
defining local requirements. 

Without profiles, two systems might both claim to be "FHIR compliant" but fail
to communicate because one expects a birth date in a format the other doesn't
provide. Profiles bridge this gap, ensuring that a "Patient" in one system is
exactly what another system expects to receive. 

Core Functions of a Profile
- **Constraint:** Restricts the base resource by making optional fields mandatory or removing unused fields.
- **Extension:** Adds new data elements that are not part of the core specification but are necessary for a specific context.
- **Terminology Binding:** Links specific fields to controlled vocabularies or ValueSet registries (e.g., SNOMED CT or LOINC).
- **Validation:** Acts as a machine-readable "rulebook" (using a StructureDefinition resource) that servers use to ensure incoming data is high-quality and consistent. 

Common Types & Examples:
- **National Profiles:** Large-scale adaptations like the US Core Implementation Guide, which sets the minimum data requirements for US healthcare interoperability.
- **Regional/Domain Profiles:** UK-specific Care Connect Profiles curated by INTEROPen for the NHS.
- **Technical Tools:** Organizations often use the Simplifier.net platform or Forge to create and publish these profiles. 
