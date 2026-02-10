# The 21st Century Cures Act

The 21st Century Cures Act is a landmark piece of United States legislation signed into law on December 13, 2016. It represents one of the most significant healthcare technology reforms of the past decade, aiming to accelerate medical innovation, modernize clinical trials, strengthen health data interoperability, and give patients greater control over their electronic health information. For technology professionals working in healthcare IT, health data platforms, EHR systems, or regulatory compliance, this law fundamentally shapes the landscape of what must be built, how data must flow, and what practices are prohibited.

## Background and Legislative Context

The Cures Act emerged from growing frustration with the pace of medical innovation and the fragmented state of health information technology in the United States. Despite billions of dollars invested through the HITECH Act of 2009 to promote electronic health record adoption, health data remained siloed across incompatible systems. Patients struggled to access their own records. Researchers faced unnecessary administrative burdens. The FDA approval process was seen as too slow for breakthrough therapies.

The legislation passed with overwhelming bipartisan support in Congress, reflecting broad consensus that the healthcare system needed structural modernization. It authorized over $6.3 billion in funding, spanning NIH research initiatives, FDA modernization, state opioid response grants, and mental health programs.

## Core Objectives

The Cures Act pursues several interconnected goals that span research, regulation, and health IT infrastructure:

- **Accelerate biomedical research** by providing the NIH with greater funding flexibility, reducing administrative overhead for clinical trials, and encouraging diverse patient participation in research programs.
- **Promote health data interoperability** by mandating standardized APIs for electronic health records, enabling patients and providers to exchange data across systems without friction.
- **Combat information blocking** by defining and penalizing practices where healthcare actors unreasonably prevent access to, exchange of, or use of electronic health information.
- **Streamline FDA approval pathways** by creating expedited review tracks for regenerative medicine, breakthrough devices, and therapies supported by real-world evidence.
- **Center patient perspectives** by incorporating patient experience data into regulatory decision-making and supporting large-scale precision medicine initiatives such as the All of Us Research Program.

## Key Provisions for Technology Professionals

Several provisions of the Cures Act have direct implications for anyone designing, building, or maintaining healthcare technology systems.

### Interoperability and Open APIs

The Act directs the Office of the National Coordinator for Health Information Technology (ONC) to establish standards and certification criteria requiring EHR systems to support open, standardized APIs. This mandate led directly to the adoption of HL7 FHIR (Fast Healthcare Interoperability Resources) as the dominant standard for patient data access. Certified health IT developers must provide API access to electronic health information without special effort from the user.

### Information Blocking Rule

The information blocking provisions define specific practices that are considered violations and identify three categories of regulated actors:

| Actor Category | Examples | Obligations |
|---|---|---|
| Health IT developers of certified technology | EHR vendors, health IT companies | Must not restrict access to or exchange of electronic health information through technical or contractual means |
| Health information networks and exchanges | HIEs, regional networks, national frameworks | Must not engage in practices that prevent or materially discourage data exchange |
| Healthcare providers | Hospitals, clinics, physician practices | Must not unreasonably limit patient or authorized third-party access to electronic health information |

Eight regulatory exceptions exist that describe circumstances under which restricting access is permissible, including preventing harm, protecting privacy, addressing infeasibility, and managing system performance.

### USCDI and Standardized Data Classes

The Cures Act led to the creation of the United States Core Data for Interoperability (USCDI), which defines a standardized set of health data classes and elements that must be exchangeable across systems. Technology teams must ensure their platforms can produce and consume data conforming to USCDI specifications. The standard is versioned and expanded over time, requiring ongoing compliance attention.

### Trusted Exchange Framework and Common Agreement (TEFCA)

TEFCA establishes a national framework for health information exchange, creating a common set of rules that Qualified Health Information Networks (QHINs) must follow. For technology professionals, TEFCA defines how nationwide data exchange operates at scale, including requirements for identity verification, security, and data use agreements.

## FDA Modernization Pathways

The Cures Act introduced several expedited regulatory pathways relevant to technology companies building medical devices and digital health tools:

| Pathway | Purpose | Key Feature |
|---|---|---|
| Breakthrough Devices Program | Accelerates review for devices treating serious conditions | Prioritized review, interactive communication with FDA |
| Regenerative Medicine Advanced Therapy (RMAT) | Fast-tracks regenerative medicine products | Expedited development and review based on preliminary evidence |
| Real-World Evidence (RWE) | Supplements or replaces traditional clinical trial data | Allows FDA to consider data from EHRs, claims, registries |
| Software Precertification (pilot) | Streamlines approval for software-as-a-medical-device | Evaluates the organization rather than each individual product |

The inclusion of real-world evidence is particularly significant for health IT, as it elevates the importance of data quality, provenance, and integrity in production EHR systems.

## Impact by Stakeholder

The Cures Act affects different stakeholders in distinct ways:

- **Patients** gain the right to access their electronic health information through standardized APIs, typically via mobile applications, without being charged fees or facing unnecessary delays.
- **Healthcare providers** must ensure their systems participate in interoperable data exchange and must avoid practices that could be classified as information blocking.
- **EHR vendors and health IT developers** face certification requirements mandating FHIR-based API support, USCDI compliance, and transparent business practices that do not impede data flow.
- **Researchers** benefit from streamlined clinical trial processes, broader access to de-identified health data, and programs like All of Us that generate large-scale datasets for precision medicine.
- **Payers and health plans** are increasingly expected to provide claims and clinical data through standardized APIs, aligned with complementary CMS interoperability rules.

## Enforcement and Penalties

The ONC and the Office of the Inspector General (OIG) share enforcement responsibilities for information blocking. Penalties vary by actor type:

- **Health IT developers, networks, and exchanges** face civil monetary penalties of up to $1 million per violation.
- **Healthcare providers** may be referred to appropriate federal agencies, though direct monetary penalties are handled differently and are subject to evolving regulatory guidance.

Enforcement actions require demonstrating that the actor knew or should have known that a practice was likely to interfere with access to, exchange of, or use of electronic health information.

## Compliance Considerations for Technology Teams

Technology professionals should focus on several operational areas to maintain compliance:

- **API implementation**: Ensure FHIR R4 APIs are available for patient-facing and provider-facing data access, conforming to ONC certification criteria.
- **USCDI conformance**: Map internal data models to current USCDI versions and plan for annual updates as new data classes are added.
- **Audit logging**: Maintain records of data access requests, fulfillments, and any denials to demonstrate good-faith compliance and support exception claims.
- **Contractual review**: Eliminate license terms, pricing structures, or technical restrictions that could be interpreted as information blocking.
- **Security and privacy**: Balance open data access requirements with HIPAA obligations, implementing role-based access controls and consent management where applicable.

## Related

Technology professionals studying the 21st Century Cures Act should also explore HIPAA and its Privacy and Security Rules for the foundational regulatory framework governing health data protection; HL7 FHIR as the technical standard underpinning the Act's interoperability mandates; the HITECH Act as the predecessor legislation that drove initial EHR adoption; the ONC Health IT Certification Program for understanding certification requirements; CMS Interoperability and Patient Access rules that complement and extend the Cures Act provisions; the All of Us Research Program as a practical application of the Act's precision medicine goals; TEFCA for the national health information exchange architecture; and USCDI for the evolving standard data set that defines minimum interoperability requirements.

## Summary

The 21st Century Cures Act is a transformative law that reshapes how health data is shared, accessed, and used across the United States healthcare system. For technology professionals, its most consequential provisions mandate open API access to electronic health information, prohibit information blocking by health IT developers and healthcare providers, establish standardized data exchange frameworks through USCDI and TEFCA, and create expedited FDA pathways that elevate the role of real-world data from production systems. Compliance requires sustained engineering investment in FHIR-based interoperability, transparent data practices, and ongoing alignment with evolving ONC and CMS regulations.

## References

- 21st Century Cures Act, Public Law 114-255, 114th Congress (2016). https://www.congress.gov/bill/114th-congress/house-bill/34
- Office of the National Coordinator for Health Information Technology (ONC), "21st Century Cures Act: Interoperability, Information Blocking, and the ONC Health IT Certification Program Final Rule." https://www.healthit.gov/curesrule/
- ONC, "United States Core Data for Interoperability (USCDI)." https://www.healthit.gov/isa/united-states-core-data-interoperability-uscdi
- ONC, "Trusted Exchange Framework and Common Agreement (TEFCA)." https://www.healthit.gov/topic/interoperability/policy/trusted-exchange-framework-and-common-agreement-tefca
- Office of the Inspector General (OIG), "Information Blocking." https://oig.hhs.gov/information-blocking/
- HL7 International, "FHIR (Fast Healthcare Interoperability Resources)." https://www.hl7.org/fhir/
- U.S. Food and Drug Administration, "21st Century Cures Act." https://www.fda.gov/regulatory-information/selected-amendments-fdc-act/21st-century-cures-act
