# RxNorm Concept Unique Identifier (RXCUI)

The RxNorm Concept Unique Identifier (RXCUI) is a unique, permanent, and unambiguous number assigned by the [National Library of Medicine (NLM)](https://www.nlm.nih.gov/research/umls/rxnorm/overview.html) to every drug concept in the RxNorm database.  

While drug names can vary between healthcare systems, the RXCUI remains constant, acting as a "universal serial number" to ensure different computers are talking about the exact same medication.  

## Core Functionality

* Unambiguous Mapping: It groups synonymous drug names and codes from different source vocabularies under one shared number. For example, "Naproxen 250 MG Oral Tablet" is assigned RXCUI 198013, regardless of how a specific hospital or pharmacy labels it.  
* Persistent & Stable: Once assigned to a "normalized" drug name, an RXCUI is never deleted or reused. If a concept is retired or merged, the [NLM provides data history](https://www.nlm.nih.gov/research/umls/rxnorm/docs/techdoc.html) to map the old identifier to its active successor.  
* Granular Specificity: A unique RXCUI is assigned for every variation in strength and dose form. For instance, a 250mg tablet and a 500mg tablet of the same drug will have different RXCUIs.  

## RXCUI Hierarchy & Types

RXCUIs are assigned at various levels of abstraction, known as Term Types (TTY), to support different clinical needs:  

* SCD (Semantic Clinical Drug): Represents the abstract generic drug (Ingredient + Strength + Dose Form).
* Example: Azithromycin 250 MG Oral Capsule.  
* SBD (Semantic Branded Drug): Includes the brand name.
* Example: Azithromycin 250 MG Oral Capsule [Zithromax].  
* IN (Ingredient): Represents just the active ingredient, often used for allergy checking.
* Example: Azithromycin.  
* Packs (GPCK/BPCK): Used for medications dispensed in specific sequences, like birth control or "Z-Paks".  

