# Clinical document architecture (CDA) 

A clinical document is any document providing information about a patient or a
group of patients, such as diagnostic findings from an interaction, a discharge
summary, or a quality measure report regarding a group of patients.

The need to send and receive clinical documents in a structured format led HL7
to the creation of the Clinical Document Architecture (CDA).

CDA is a document markup standard using XML that specifies the structure of
clinical documents. The structure "wraps" information about the document and the
document itself inside plain text XML tags. 

The structure includes:
- **Metadata** to describe the document and specify how it can be managed
- **The content:** of the document (e.g., discharge summary, report, visit summary)

The simplest CDA structure contains only the Header and Body, and those two
components provide the lowest level of interoperability. For example, the Body
could contain an Adobe PDF or a Microsoft Word document with the rendering and
processing of which is left up to the receiving party. The Header provides
structured descriptive information about the document contained in the Body so
that the receiver can identify and use it.

As more structure is added into the Body with standardized nested body sections,
more functionality and interoperability can be achieved. For example, a nursing
SOAP (Subjective, Objective, Assessment, Plan) Note could be embedded in the
body.
