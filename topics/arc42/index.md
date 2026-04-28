# Arc42

Arc42 is an open-source template for documenting software and system architectures, created by Gernot Starke and Peter Hruschka. It provides a proven, field-tested structure that is process-agnostic and well-suited for agile and lean development teams.

The template organizes documentation into twelve distinct sections, each addressing a specific architectural concern. These sections cover introduction and goals, constraints, context and scope, solution strategy, building block view, runtime view, deployment view, cross-cutting concepts, architectural decisions, quality requirements, risks and technical debt, and a glossary. Every section is optional, so teams document only what their project actually needs.

The building block view captures the static decomposition of a system into modules, components, or microservices. The runtime view complements this by describing dynamic behavior and interactions during execution. The deployment view maps software onto physical or virtual infrastructure. Cross-cutting concepts address rules and patterns that span multiple parts of the system, while the architectural decisions section records high-stakes choices and their rationales.

Teams adopt arc42 because it standardizes where architectural information lives, giving stakeholders a predictable structure for finding answers. It is tool-agnostic and works equally well in Confluence, Word, Markdown, or documentation-as-code pipelines. It integrates cleanly with visual modeling approaches such as the C4 model, where context diagrams map directly into specific arc42 sections.

Arc42 emphasizes pragmatism over ceremony. It discourages unnecessary documentation and focuses on what matters for communication and long-term maintainability. This makes it a practical choice for organizations that want structured architecture documentation without heavyweight process overhead.
