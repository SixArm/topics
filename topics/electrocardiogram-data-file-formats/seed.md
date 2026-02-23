# Electrocardiogram (ECG) data file formats

Electrocardiogram (ECG) data file formats vary widely, depending on machinery, region, purpose.

Interoperability: While many formats exist, a lack of universal standards can cause issues when transferring data between different manufacturers' devices.

Content: ECG data file formats often contain the raw signal, and also may contain patient metadata, timestamps, automated analysis results, summaries, and more.

Formats:

- EDF/EDF+ (European Data Format): Widely used in research, supporting multichannel data, and common for raw recordings.

- SCP-ECG (Standard Communications Protocol for Computer-Assisted Electrocardiography): A European standard designed for efficient communication and storage of ECG data, using a binary format.

- DICOM-ECG (Digital Imaging and Communication in Medicine): The standard for integrating electrocardiograms into PACS and medical imaging systems, commonly used for 12-lead and stress tests.

- HL7 aECG (Health Level Seven Annotated ECG): An XML-based format commonly used for clinical trials and for submission to the FDA.

- PDF-ECG: A hybrid format used to store both a human-readable graphical report and the underlying digital ECG waveform, enabling easier storage in Electronic Health Records (EHR).

- MFER (Medical Waveform Format Encoding Rules)

- ISHNE (International Society for Holter and Noninvasive Electrocardiography)

- Norav RDT (raw data)

XML-based Vendor Formats: Many vendors use proprietary or semi-standardized XML, such as:

- Philips XML
- GE MUSE XML
- Schiller XML
- Mortara XML

Key standards include DICOM (imaging/waveform), SCP-ECG (standardized communication), and HL7 aECG (annotated, FDA-approved).
