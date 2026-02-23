# Digital Imaging and Communications in Medicine (DICOM)

Digital Imaging and Communications in Medicine (DICOM) is the international standard for handling, storing, printing, and transmitting medical images and associated data. Developed under the stewardship of the National Electrical Manufacturers Association (NEMA), DICOM defines the formats and communication protocols that allow medical imaging devices from different manufacturers to interoperate seamlessly. For technology professionals working in healthcare IT, medical device integration, or health informatics, understanding DICOM is essential because it underpins nearly every modern radiology workflow, picture archiving and communication system (PACS), and clinical imaging pipeline.


## History and Governance

The DICOM standard originated in 1985 as ACR-NEMA 300, a joint effort between the American College of Radiology (ACR) and NEMA. Version 2.0 followed in 1988, but the landmark release was DICOM 3.0 in 1993, which introduced network communication protocols based on TCP/IP. Since then the standard has been maintained and extended through a continuous supplement process managed by NEMA's DICOM Standards Committee, with participation from vendors, healthcare institutions, and standards bodies worldwide. Today the standard comprises over twenty parts and hundreds of supplements covering everything from structured reporting to web services.


## Core Concepts

DICOM is built around a few foundational abstractions that technology professionals must grasp before diving into implementation.

- **Information Object Definition (IOD):** A formal description of a real-world entity relevant to medical imaging, such as a CT Image, MR Image, or Structured Report. Each IOD specifies which data attributes (called "modules") must or may be present.
- **Service-Object Pair (SOP) Class:** The combination of an IOD with a DICOM service (such as Store, Find, or Move). A SOP Class defines what you can do with a particular type of object. Every DICOM file encapsulates exactly one SOP Instance.
- **Data Element:** The atomic unit of DICOM data, identified by a tag consisting of a group number and element number (e.g., (0010,0010) for Patient Name). Each element has a Value Representation (VR) that defines its data type and a value length.
- **Transfer Syntax:** Specifies byte ordering, whether VR is explicit or implicit, and the compression codec (if any) applied to pixel data. Negotiating a mutually supported transfer syntax is a key part of DICOM network communication.
- **Unique Identifiers (UIDs):** Globally unique strings that identify SOP Classes, SOP Instances, Studies, Series, and Transfer Syntaxes. UIDs follow an OID-based dot-notation scheme and are critical for tracking and deduplication.


## DICOM File Format

A DICOM file has a well-defined binary structure that distinguishes it from general-purpose image formats.

| Component | Size / Location | Purpose |
|---|---|---|
| File Preamble | 128 bytes at offset 0 | Application-specific use; often all zeroes |
| DICOM Prefix | 4 bytes ("DICM") | Identifies the file as DICOM |
| File Meta Information | Variable length, Group 0002 elements | Transfer syntax, media storage SOP class/instance UIDs |
| Data Set | Remainder of file | Patient demographics, study/series metadata, pixel data |

The data set is an ordered sequence of data elements. Each element is encoded according to the transfer syntax declared in the file meta information. Pixel data is typically the last and largest element, stored under tag (7FE0,0010). DICOM preserves the full fidelity of the acquisition device: images are commonly 12-bit or 16-bit grayscale, multi-frame, or volumetric, far exceeding the 8-bit depth of consumer formats like JPEG or PNG.

Key metadata attributes embedded in every DICOM file include:

- Patient identification (name, ID, date of birth, sex)
- Study-level information (accession number, referring physician, study date/time)
- Series-level information (modality, body part, series description)
- Instance-level information (instance number, acquisition parameters, window center/width)


## Network Communication Protocol

DICOM networking operates over TCP/IP using an application-layer protocol defined in Part 8 of the standard. Communication between two DICOM entities follows a structured lifecycle.

- **Association Establishment:** The calling entity (SCU, Service Class User) proposes an association to the called entity (SCP, Service Class Provider), specifying which SOP Classes and Transfer Syntaxes it wants to use. The SCP accepts or rejects each proposal. This negotiation uses a well-known port, traditionally 104 or 11112.
- **DIMSE Operations:** Once an association is established, the peers exchange DICOM Message Service Element (DIMSE) commands. The primary operations are C-STORE (send an image), C-FIND (query for studies/series/images), C-MOVE (request that images be sent to a destination), C-GET (retrieve images directly), and C-ECHO (verify connectivity).
- **Association Release:** Either party may request a graceful release, or abort the connection in error conditions.

| DIMSE Service | Direction | Purpose |
|---|---|---|
| C-ECHO | SCU to SCP | Verify DICOM connectivity (ping equivalent) |
| C-STORE | SCU to SCP | Transmit an image or other composite object |
| C-FIND | SCU to SCP | Query for matching studies, series, or instances |
| C-MOVE | SCU to SCP | Instruct SCP to send matching objects to a third party |
| C-GET | SCU to SCP | Retrieve matching objects directly over the same association |

Modern deployments increasingly use DICOMweb, a set of RESTful services (WADO-RS, STOW-RS, QIDO-RS) that operate over HTTPS and return JSON or multipart MIME payloads. DICOMweb simplifies integration with web applications and cloud platforms while maintaining semantic compatibility with traditional DIMSE services.


## PACS and Clinical Workflow Integration

In a typical hospital, DICOM ties together multiple systems in the imaging workflow.

- **Modalities** (CT, MRI, X-ray, ultrasound, PET) acquire images and send them via C-STORE to the PACS.
- **PACS** stores images in a DICOM-compliant archive, indexes metadata in a database, and serves images to diagnostic workstations.
- **Radiology Information System (RIS)** manages orders and scheduling; it communicates with PACS via HL7 or DICOM Modality Worklist (MWL).
- **Diagnostic Workstations** query and retrieve images from PACS using C-FIND and C-MOVE, then render them with specialized viewing tools that support windowing, multiplanar reconstruction, and measurement.
- **Vendor Neutral Archives (VNA)** consolidate images from multiple PACS into a long-term, standards-based repository to reduce vendor lock-in.

DICOM Modality Worklist is a particularly important service: it pushes patient and order information from the RIS to the modality so that technologists do not have to manually re-enter demographics, reducing transcription errors and ensuring correct patient-study linkage.


## Security and Privacy Considerations

Medical images contain protected health information (PHI), making security a first-order concern for any DICOM deployment.

- **Transport Layer Security:** DICOM supports TLS for encrypting associations. DICOMweb inherits HTTPS encryption natively.
- **DICOM De-identification:** Part 15 of the standard defines profiles for removing or replacing PHI in DICOM headers. This is essential for research datasets, multi-site trials, and cloud-based AI pipelines.
- **Access Control:** Most PACS enforce role-based access, but DICOM itself does not define authorization semantics. Institutions typically layer LDAP, OAuth, or SAML-based identity management on top.
- **Audit Logging:** DICOM defines the Audit Trail Message Profile based on IHE ATNA, which logs access and transfer events for compliance with HIPAA, GDPR, and other regulations.

Technology professionals should be aware that DICOM files may contain "burned-in" PHI in the pixel data itself (e.g., patient name overlays on ultrasound images), which header-only de-identification will not remove. Pixel-level scrubbing requires additional image processing.


## DICOM and Modern Technologies

DICOM continues to evolve alongside broader technology trends.

- **Cloud and Object Storage:** Cloud PACS solutions store DICOM objects in blob storage (such as AWS S3 or Azure Blob) and expose DICOMweb APIs. Google Cloud Healthcare API and AWS HealthImaging provide managed DICOM services.
- **Artificial Intelligence and Machine Learning:** AI models for medical image analysis consume DICOM inputs and may produce DICOM-encoded outputs such as Segmentation objects (SEG), Parametric Maps, or Structured Reports with AI findings.
- **3D Printing and Visualization:** DICOM volumetric data is converted to surface meshes for 3D printing of anatomical models used in surgical planning.
- **Whole Slide Imaging:** DICOM Supplement 145 extended the standard to digital pathology, enabling storage and retrieval of gigapixel-scale whole slide images.
- **FHIR Integration:** The ImagingStudy resource in HL7 FHIR references DICOM studies, bridging clinical data and imaging data within modern interoperability frameworks.


## Comparison with Other Medical and Image Formats

| Format | Domain | Metadata Richness | Typical Use Case |
|---|---|---|---|
| DICOM | Medical imaging | Extremely rich (patient, study, series, acquisition parameters) | Radiology, cardiology, pathology, radiation therapy |
| NIfTI | Neuroimaging research | Minimal (affine transform, voxel dimensions) | Brain MRI analysis, fMRI studies |
| NRRD | Scientific visualization | Moderate (spatial metadata, encoding) | Research imaging, segmentation |
| JPEG/PNG | General purpose | Minimal (EXIF in JPEG) | Consumer photography, web graphics |
| HL7 v2 / FHIR | Clinical data exchange | Rich clinical context, no pixel data | Orders, results, patient records |

DICOM's distinguishing strength is its combination of high-fidelity pixel data with deeply structured clinical metadata in a single standardized container, which no general-purpose image format provides.


## Related

Professionals exploring DICOM should also study HL7 FHIR for clinical data interoperability, IHE (Integrating the Healthcare Enterprise) profiles that define real-world workflows on top of DICOM and HL7, picture archiving and communication systems (PACS) architecture and administration, the European Data Format (EDF) for physiological signal data, medical device cybersecurity frameworks, and cloud healthcare platforms such as Google Cloud Healthcare API and AWS HealthImaging.


## Summary

Digital Imaging and Communications in Medicine (DICOM) is the foundational standard that makes modern medical imaging possible. It defines a rich file format that pairs high-fidelity pixel data with comprehensive clinical metadata, a network protocol for querying and transferring images between heterogeneous devices, and increasingly a set of RESTful web services for cloud-native deployments. For technology professionals, fluency in DICOM is indispensable when building, integrating, or maintaining systems in radiology, pathology, cardiology, and any domain where medical images must be reliably captured, stored, communicated, and analyzed across organizational and vendor boundaries.


## References

- NEMA. "The DICOM Standard." Official specification and supplements. https://www.dicomstandard.org/
- Pianykh, Oleg S. *Digital Imaging and Communications in Medicine (DICOM): A Practical Introduction and Survival Guide.* Springer, 2nd edition, 2012.
- Bidgood, W. Dean, et al. "Understanding and Using DICOM, the Data Interchange Standard for Biomedical Imaging." *Journal of the American Medical Informatics Association*, vol. 4, no. 3, 1997, pp. 199-212.
- IHE International. "IHE Technical Frameworks." Integration profiles for radiology and other domains. https://www.ihe.net/resources/technical_frameworks/
- DICOMweb. RESTful services specification within the DICOM standard, Parts 18 and 19. https://www.dicomstandard.org/using/dicomweb
- Google Cloud. "Cloud Healthcare API: DICOM." https://cloud.google.com/healthcare-api/docs/concepts/dicom
- Clunie, David A. "DICOM Structured Reporting." PixelMed Publishing, 2000.
