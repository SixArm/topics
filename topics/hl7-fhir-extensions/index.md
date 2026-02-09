# HL7 FHIR extensions 

HL7 FHIR extensions are a standard mechanism used to include data elements that are not part of the core FHIR specification, allowing the standard to remain simple while addressing diverse, specific healthcare workflows. They enable implementers to add custom information to any resource or data type when needed. 

The philosophy behind FHIR extensions is to provide an 80/20 solution: the core standard covers about 80% of common needs, and extensions handle the remaining unique or regionally specific data requirements. 

Purpose:
- **Custom Data Fields:** Extensions provide a way to add new, application-specific data fields to existing resources. For example, while the core Patient resource doesn't include religion globally, a specific region like the US can create an extension for it.
- **Flexibility and Interoperability:** They prevent the core specification from becoming overly complex with rare elements. By using a standard mechanism (a canonical URL that identifies the extension's definition), interoperability is maintained, as the recipient system can access the extension's definition to understand its meaning.
- **Profiling:** Extensions are a key part of FHIR profiling, which is the process of customizing and constraining base FHIR resources for specific use cases or regional requirements. 

Technical Structure:
- **URL:** Every extension must have a unique, publicly available canonical URL that points to its formal definition (a StructureDefinition resource). This URL ensures global uniqueness and allows systems to discover what the extension means.
- **Value:** The extension carries the actual data, which can be of any valid FHIR data type (e.g., string, dateTime, CodeableConcept).
- **Placement:** Extensions can be applied at any level of a resource or data type. They can also be applied to primitive data types, in which case the JSON representation uses an additional property prepended with an underscore (_).
- **Complex Extensions:** Extensions can be simple (a single value) or complex (containing other nested extensions or multiple child elements). 
