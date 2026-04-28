# Arc42

Arc42 is an open-source template for documenting software and system architectures. Created by Gernot Starke and Peter Hruschka, it provides a proven, field-tested structure for capturing architectural knowledge in a consistent, repeatable format. Arc42 is process-agnostic, tool-agnostic, and technology-neutral, making it suitable for teams of any size working in any methodology. Its core philosophy is pragmatism over ceremony: document what matters, skip what does not, and make architectural knowledge accessible to every stakeholder who needs it.

## Origins and Purpose

Arc42 emerged from decades of consulting experience in software architecture. Gernot Starke and Peter Hruschka observed that teams repeatedly struggled with the same documentation challenges: inconsistent formats, missing context, undocumented decisions, and documentation that nobody maintained because it was too burdensome to create. Arc42 addresses these problems by providing a lightweight, standardized skeleton that teams can adopt incrementally. The name "arc42" is a nod to "architecture" and the number 42, the fictional answer to the ultimate question from Douglas Adams' novel. The template has been refined through real-world use across hundreds of organizations in industries ranging from finance and insurance to automotive and telecommunications.

## The Twelve Sections

Arc42 organizes architecture documentation into twelve distinct sections, each addressing a specific concern. Every section is optional, so teams document only what their project requires.

| Section | Name | Purpose |
|---------|------|---------|
| 1 | Introduction and Goals | States the driving requirements, quality goals, and key stakeholders |
| 2 | Constraints | Lists organizational, technical, and regulatory constraints |
| 3 | Context and Scope | Defines system boundaries and external interfaces |
| 4 | Solution Strategy | Describes the fundamental approach and key technology decisions |
| 5 | Building Block View | Shows the static decomposition into modules, components, or services |
| 6 | Runtime View | Illustrates dynamic behavior, interactions, and workflows |
| 7 | Deployment View | Maps software artifacts onto infrastructure |
| 8 | Cross-Cutting Concepts | Covers patterns, rules, and principles that span multiple building blocks |
| 9 | Architectural Decisions | Records high-stakes choices and their rationales |
| 10 | Quality Requirements | Details quality scenarios and acceptance criteria |
| 11 | Risks and Technical Debt | Identifies known risks and areas of accumulated debt |
| 12 | Glossary | Defines domain and technical terminology |

## Key Views Explained

Three of the twelve sections form the architectural backbone of any arc42 document: the building block view, the runtime view, and the deployment view. Understanding these views is essential for effective use of the template.

The **building block view** captures the static decomposition of a system. It shows how the system is divided into modules, components, packages, or microservices, and how those pieces relate to each other. This view can be refined across multiple levels of detail, from a top-level white-box decomposition down to individual class or function responsibilities. It answers the question: what are the parts of the system and how are they organized?

The **runtime view** complements the static picture by describing dynamic behavior. It shows how building blocks interact during execution, capturing sequences of calls, message flows, state transitions, and concurrency patterns. This view is particularly valuable for explaining complex business processes, asynchronous workflows, or integration scenarios that cannot be understood from static structure alone.

The **deployment view** maps software artifacts onto physical or virtual infrastructure. It shows which components run on which servers, containers, or cloud services, and how they communicate over networks. This view is critical for operations teams, capacity planning, and understanding the physical topology of a distributed system.

## Cross-Cutting Concepts

Cross-cutting concepts address concerns that span multiple building blocks and cannot be localized to a single module. Arc42 dedicates an entire section to these because they often represent the most important architectural decisions a team makes, yet they are the most frequently undocumented.

- **Security and authorization**: Authentication mechanisms, role-based access control, encryption policies
- **Error handling and logging**: Consistent exception strategies, structured logging formats, monitoring integration
- **Persistence and data management**: Database access patterns, caching strategies, data migration approaches
- **Communication and integration**: API design conventions, message formats, protocol choices
- **User interface conventions**: Layout patterns, accessibility standards, internationalization rules
- **Testability**: Testing strategies, dependency injection patterns, test environment setup
- **Operational concerns**: Health checks, deployment automation, configuration management

Documenting cross-cutting concepts in one place prevents duplication and inconsistency across building block descriptions.

## Architectural Decisions

Arc42 treats architectural decisions as first-class documentation artifacts. Section 9 provides a structured location for recording decisions that have significant impact on the system's structure, quality attributes, or development process. Each decision typically captures the context, the options considered, the chosen approach, and the rationale behind the choice.

This practice aligns with the Architecture Decision Record (ADR) pattern popularized by Michael Nygard. Teams that adopt arc42 often store their ADRs within section 9, creating a searchable history of why the system looks the way it does. This history proves invaluable during onboarding, audits, and retrospectives, and it prevents teams from revisiting settled debates without new information.

## Tool and Process Compatibility

Arc42 is deliberately tool-agnostic and process-agnostic. It works equally well across a wide range of documentation environments and development methodologies.

| Dimension | Options |
|-----------|---------|
| Documentation format | Markdown, AsciiDoc, Confluence, Word, LaTeX, HTML |
| Storage | Git repositories, wikis, document management systems |
| Development process | Scrum, Kanban, SAFe, Waterfall, ad hoc |
| Modeling notation | UML, C4 model, informal boxes-and-arrows, no diagrams at all |
| Team size | Solo developers through large enterprise programs |

This flexibility is a deliberate design choice. Arc42 prescribes structure but not tooling, so teams adopt it without disrupting their existing workflows. Documentation-as-code teams store arc42 templates in Git alongside source code. Enterprise teams use Confluence or SharePoint. Both approaches are valid.

## Integration with the C4 Model

Arc42 and the C4 model by Simon Brown are complementary approaches that combine naturally. The C4 model provides four levels of abstraction for visualizing architecture (context, container, component, and code), while arc42 provides the organizational structure for the surrounding documentation.

- A C4 **context diagram** maps directly into arc42 section 3 (Context and Scope)
- A C4 **container diagram** maps into arc42 section 5 (Building Block View, level 1)
- A C4 **component diagram** maps into arc42 section 5 (Building Block View, level 2)
- C4 **dynamic diagrams** map into arc42 section 6 (Runtime View)
- C4 **deployment diagrams** map into arc42 section 7 (Deployment View)

Teams that use both approaches gain a consistent visual language layered over a consistent documentation structure, making architectural knowledge both visually intuitive and textually searchable.

## Adoption Strategies

Teams new to arc42 benefit from a gradual adoption approach rather than attempting to fill all twelve sections at once. A practical starting sequence is:

1. **Start with sections 1 and 3**: Establish the system's goals and boundaries. These sections force the team to articulate what the system does and what it does not do.
2. **Add section 5**: Decompose the system into its major building blocks. This is the structural core of the documentation.
3. **Add section 9**: Begin recording architectural decisions as they are made. This section becomes more valuable over time.
4. **Add sections as needed**: Let project complexity and stakeholder needs drive which remaining sections to populate.

Teams should resist the urge to document exhaustively. Arc42 explicitly encourages documenting only what is necessary for communication, understanding, and long-term maintenance. An incomplete but accurate document is far more useful than a comprehensive but outdated one.

## Benefits and Limitations

Arc42 offers significant advantages but is not without trade-offs.

**Benefits:**

- Provides a standardized structure that reduces the cognitive load of deciding what to document and where
- Makes architectural knowledge discoverable by giving stakeholders a predictable location for every concern
- Supports incremental adoption with no mandatory sections
- Works with any tool, format, or development process
- Encourages documentation of decisions and rationale, not just structures
- Is freely available under a Creative Commons license

**Limitations:**

- The template alone does not ensure quality; teams must still write clearly and maintain documents over time
- Twelve sections can feel overwhelming to small teams or simple projects, even though all sections are optional
- Arc42 provides structure but not guidance on notation or diagram quality
- Adoption requires team discipline to keep documentation current as the system evolves

## Related

Teams working with arc42 should explore the C4 model for visual architecture communication, Architecture Decision Records (ADRs) for structured decision documentation, and the ISO 42010 standard for a formal treatment of architecture description. The arc42 Architecture Communication Canvas and arc42 Architecture Inception Canvas provide lightweight, single-page formats for early-stage architecture work. For broader context, studying software architecture patterns, quality attribute workshops, and documentation-as-code practices will strengthen the foundation that arc42 documentation is built upon.

## Summary

Arc42 is a pragmatic, battle-tested template that brings order to software architecture documentation without imposing heavyweight process. Its twelve optional sections cover the full spectrum of architectural concerns, from goals and constraints through static and dynamic views to decisions, risks, and quality requirements. By standardizing where architectural knowledge lives while remaining agnostic about tools and processes, arc42 makes it straightforward for teams to create documentation that is useful, maintainable, and accessible to all stakeholders.

## References

- Starke, G. & Hruschka, P. "arc42 Template." https://arc42.org
- Starke, G. "arc42 by Example." Leanpub. https://leanpub.com/arc42byexample
- Starke, G. & Hruschka, P. "arc42 in Practice." Leanpub. https://leanpub.com/arc42inpractice
- Brown, S. "The C4 Model for Visualising Software Architecture." https://c4model.com
- Nygard, M. "Documenting Architecture Decisions." https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- ISO/IEC/IEEE 42010:2011. "Systems and Software Engineering — Architecture Description."
