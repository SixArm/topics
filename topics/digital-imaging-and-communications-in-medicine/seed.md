# Digital Imaging and Communications in Medicine (DICOM)

Digital Imaging and Communications in Medicine (DICOM) is a technical standard
for the digital storage and transmission of medical images and related
information.[1] It includes information object definitions (i.e. message
formats), service definitions, a file format definition, which specifies the
structure of a DICOM file, as well as a network communication protocol that uses
either TCP/IP or HTTPS to communicate between systems. The primary purpose of
the standard is to facilitate communication between the software and hardware
entities involved in medical imaging, especially those that are created by
different manufacturers. Entities that utilize DICOM files include components of
picture archiving and communication systems (PACS), such as imaging machines
(modalities), radiological information systems (RIS), scanners, printers,
computing servers, and networking hardware.

The DICOM standard has been widely adopted by hospitals, large clinics, and the
medical software industry, and is sometimes used in smaller-scale applications,
such as dentists' and doctors' offices. DICOM is also used in veterinary
medicine and in research.

Key Aspects of the DICOM File Format

- Structure: DICOM files consist of a 128-byte file preamble, a 4-byte prefix (DICM), followed by file meta information and the actual data set (image attributes and pixel data).

- Metadata (Header): Contains patient demographics, study parameters, and imaging settings (e.g., equipment settings, scanner parameters).

- Data Elements: Data is stored in elements defined by tags (Group, Element), Value Representation (VR), and Value Length.

- Encapsulation: Every DICOM file encapsulates a single Service Object Pair (SOP) instance, usually a 2D image or a frame.

- Pixel Data: DICOM retains the full, high-quality, uncompressed, or losslessly compressed image data directly from the scanner.

- Standardization: Managed by NEMA, it allows for interoperability between different medical devices. 

DICOM Structure Components

- Header (Meta Information): Identifies the patient, study, and file content.

- Data Set: Represents the actual image pixels and related technical information. 

DICOM ensures high-quality images and holds critical metadata for medical diagnosis, distinguishing it from standard image formats like JPEG.