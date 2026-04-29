# RxNorm

RxNorm is a standardized nomenclature for clinical drugs and a semantic interoperability tool produced by the U.S. National Library of Medicine (NLM). Its primary purpose is to allow computer systems to communicate drug-related information unambiguously by grouping different names for the same medication into a single normalized concept.

RxNorm creates a standard name for every drug based on its active ingredients, strength, and dose form. For example, a drug might be normalized to "Naproxen 250 MG Oral Tablet" regardless of brand name or proprietary label. Every normalized concept receives a unique RxNorm Concept Unique Identifier (RXCUI), which serves as the canonical key for that drug across systems.

A critical function of RxNorm is mapping and linking. It connects its standard names to various proprietary drug vocabularies, such as Micromedex and First Databank, as well as to the FDA's National Drug Codes (NDCs). This makes RxNorm a bridge between otherwise incompatible terminology systems. Its scope covers most prescription and over-the-counter drugs available in the United States.

In healthcare, different systems such as pharmacies, hospitals, and insurance providers often use different naming conventions for the same medication. RxNorm acts as a universal translator, ensuring that when one system records a prescription, another system understands exactly what drug is intended. This is critical for patient safety, reducing medication errors, and enabling reliable clinical decision support.

RxNorm is part of the broader Unified Medical Language System (UMLS) and is freely available through the NLM. It provides a REST API for programmatic access, making it straightforward to integrate into electronic health record systems, pharmacy platforms, and health data pipelines.
