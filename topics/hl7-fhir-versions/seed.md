# HL7 FHIR versions

HL7 FHIR (Fast Healthcare Interoperability Resources) has evolved through
several versions, each designed to make healthcare data exchange more modern and
web-friendly. As of 2026, the industry is in a multi-version landscape where
Release 4 (R4) remains the production standard, while Release 6 (R6) is the
upcoming long-term stable target.

**FHIR Release 4 (R4):** Released in 2019, this is the first Normative version.
It is the global standard for production systems and the foundation for major
regulatory requirements, such as the US Core Implementation Guide. Its
"Normative" status ensures that core resources like Patient and Observation will
not have breaking changes in future versions.

**FHIR Release 5 (R5):** Released in 2023, R5 introduced over 100 new resources
and a completely rewritten Topic-based Subscription framework. While it offers
advanced features for patient engagement and analytics, it is a "Trial Use"
release with breaking changes, leading some implementers to skip it in favour of
waiting for R6.

**FHIR Release 6 (R6):** Currently in development, with its first Normative
Ballot held in early 2026. R6 aims to be the "Universal Normative" version by
locking in the majority of clinical and administrative resources to provide
long-term stability and reduce version-to-version variability.

Key Points:

- **Stability vs. Innovation:** Organizations often stay on R4 for its broad tool support and regulatory compliance but may use Proxy Layers or FHIR Facades to translate data for partners using newer versions.
- **The 80% Rule:** All FHIR versions follow the 80% Rule, focusing on the data elements used by 80% of systems while allowing for "Extensions" to handle the remaining 20% of specialized needs.
- **Migration Path:** Upgrading between versions (e.g., R4 to R6) involves more than code updates; it requires handling changes in resource structures, such as mandatory fields becoming optional or renamed status codes.
