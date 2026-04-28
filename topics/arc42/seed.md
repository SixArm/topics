# Arc42

Arc42 is an open-source, field-tested [template for documenting software and system architectures](https://arc42.org/). Created by experts Gernot Starke and Peter Hruschka, it is designed to be painless, process-agnostic, and particularly well-suited for agile and lean development.

## Core Structure (The 12 Sections)

The template is divided into 12 distinct "compartments," each addressing a specific aspect of the architecture. Every section is optional—you only document what is necessary for your specific project.

1.  Introduction & Goals: Key requirements, driving forces, and top quality goals.
2.  Constraints: Technical or organisational limitations (e.g., budget, specific technologies).
3.  Context & Scope: How the system interacts with external users and other systems.
4.  Solution Strategy: Summary of fundamental decisions and patterns used.
5.  Building Block View: Static decomposition of the system (modules, components, or microservices).
6.  Runtime View: Dynamic behaviour and interactions between building blocks during execution.
7.  Deployment View: Physical or virtual infrastructure where the software runs.
8.  Cross-cutting Concepts: Overall rules and ideas relevant to multiple parts of the system.
9.  Architectural Decisions: Crucial, high-risk, or expensive decisions and their rationales.
10. Quality Requirements: Detailed quality scenarios (e.g., scalability, security).
11. Risks & Technical Debt: Known issues or potential future problems.
12. Glossary: Important technical and domain terms.

## Why Teams Use It

- Standardisation: Provides a common "cabinet" for information so stakeholders know exactly where to find answers.
- Flexibility: It is tool-agnostic; you can use it in Confluence, Word, Markdown, or even as [Documentation-as-Code](https://www.workingsoftware.dev/software-architecture-documentation-the-ultimate-guide/).
- Agile Integration: It pairs perfectly with visual models like the [C4 Model](https://www.linkedin.com/pulse/effective-architecture-documentation-arc42-c4-torsten-mosis) for mapping diagrams into specific arc42 sections (e.g., C4 Context maps to Section 3).
- Pragmatism: It discourages "fluff," focusing instead on what is absolutely necessary for communication and long-term maintainability.
