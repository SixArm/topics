# RxNorm Concept Unique Identifier (RXCUI)

The RxNorm Concept Unique Identifier (RXCUI) is a unique, permanent number assigned by the National Library of Medicine (NLM) to every drug concept in the RxNorm database. It serves as a universal reference that ensures different healthcare systems, pharmacies, and electronic health records are referring to the exact same medication, regardless of how each system labels it internally.

Drug naming varies widely across institutions. A hospital, a pharmacy benefits manager, and an EHR vendor may each use different vocabularies and proprietary codes for the same medication. The RXCUI solves this by grouping synonymous drug names and codes from different source vocabularies under a single shared number. For example, "Naproxen 250 MG Oral Tablet" maps to RXCUI 198013 no matter which system references it.

Once assigned, an RXCUI is never deleted or reused. If a concept is retired or merged, NLM provides data history that maps the old identifier to its active successor. This persistence makes RXCUIs reliable anchors for long-term clinical data, medication histories, and regulatory reporting.

RXCUIs are granular. Each variation in strength and dose form receives its own identifier, so a 250 mg tablet and a 500 mg tablet of the same drug carry different RXCUIs. The system also supports multiple levels of abstraction through Term Types: Semantic Clinical Drug (SCD) for generic formulations, Semantic Branded Drug (SBD) for brand-name versions, Ingredient (IN) for active compounds used in allergy checking, and Pack types for sequenced dispensing like birth control or Z-Paks.

For technology teams building clinical software, the RXCUI is the standard interoperability key for medication data across US healthcare systems.
