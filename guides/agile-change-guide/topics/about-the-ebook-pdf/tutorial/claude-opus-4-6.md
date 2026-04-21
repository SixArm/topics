# About the ebook PDF

The process of generating a professional ebook in PDF format from a repository of markdown files involves a deliberate pipeline of tools, fonts, and conversion steps. This tutorial explains the end-to-end workflow used to produce a polished, typographically sound PDF from structured markdown content. Understanding this process is valuable for any technology professional who maintains technical documentation, publishes guides, or wants to automate document generation from version-controlled source files.

## Why Generate PDFs from Markdown

Markdown is the de facto standard for writing technical documentation. It is lightweight, readable in plain text, and compatible with version control systems like Git. However, markdown alone does not produce a distributable, print-ready document. Converting markdown to PDF bridges the gap between authoring convenience and publication quality.

| Concern | Markdown | PDF |
|---|---|---|
| Authoring ease | Excellent; plain text with minimal syntax | Poor; requires specialized editors |
| Version control | Native Git compatibility | Binary format; difficult to diff |
| Visual presentation | Depends on renderer | Consistent across all devices and printers |
| Distribution | Requires a viewer or renderer | Universally readable |
| Typography control | Minimal | Full control over fonts, spacing, and layout |
| Table of contents | Manual or tool-generated | Auto-generated with page numbers |

The PDF generation pipeline solves the core tension: authors write in markdown for speed and collaboration, then produce a PDF for readers who need a stable, portable, professional document.

## Book Build Tools

The book build tools reside in the repository under the `book/build` directory. These tools automate the entire pipeline from source markdown to finished PDF. The workflow proceeds in three stages:

- **Link extraction.** The tools parse the top-level `README.md` file to discover all documentation links. This establishes the canonical ordering of content.
- **File merging.** Individual guidepost markdown files are concatenated into a single, unified markdown document. This ensures consistent heading hierarchy and eliminates broken cross-references.
- **PDF conversion.** The merged markdown file is processed through `pandoc` with custom settings to produce the final PDF output.

This approach keeps the source of truth in small, independently editable markdown files while producing a cohesive single-document output. The build is repeatable and deterministic: given the same inputs, it always produces the same PDF.

## The markdown-text-to-link-urls Tool

The `markdown-text-to-link-urls` tool is a command-line parser maintained as an open source project. Its purpose is to read a markdown file and extract all markdown link URLs from the text. In the ebook pipeline, this tool is applied to the repository's `README.md` to obtain an ordered list of links pointing to individual topic files.

The extracted links are then filtered to isolate guidepost markdown files, which are the substantive content pages. These filtered files are merged in order into a single markdown document that represents the full book content. This separation of concerns means the `README.md` serves as both a human-readable index and the machine-readable manifest for the build system.

## The pandoc-from-markdown-to-pdf Tool

The `pandoc-from-markdown-to-pdf` tool wraps `pandoc` with a curated set of conversion options. Pandoc is the industry-standard document converter, capable of transforming markdown into dozens of output formats including PDF via LaTeX. The wrapper tool applies project-specific settings:

- Automatic table of contents generation with page numbers
- Custom font selection and embedding
- Syntax highlighting for code blocks
- Page sizing, margins, and spacing appropriate for ebook reading
- Metadata injection for title, author, and other PDF properties

Using a wrapper script rather than invoking pandoc directly ensures that every build uses identical settings, eliminating drift between builds and making the process accessible to contributors who are not pandoc experts.

## Fonts and Typography

The ebook uses three font families from Adobe's open source type library:

| Font | Style | Usage |
|---|---|---|
| Source Serif Pro | Serif | Body text and headings |
| Source Sans Pro | Sans-serif | Captions, labels, and secondary text |
| Source Code Pro | Monospace | Code blocks and inline code |

These fonts are freely available under the SIL Open Font License, which permits redistribution and embedding in PDF documents without licensing concerns. The font family was designed by Adobe specifically for readability on screen and in print, making it well-suited for technical ebooks.

Alternative font sets are also supported. The build system can substitute Bitstream Vera fonts or Liberation fonts, both of which are open source and metrically compatible with widely used proprietary fonts. This flexibility allows the pipeline to run on systems where Adobe fonts are not installed.

## The End-to-End Pipeline

The complete generation process follows a linear pipeline:

- The `README.md` file is parsed to extract ordered content links.
- Links are filtered to select only guidepost topic files.
- Selected markdown files are merged into a single document.
- The merged document is passed to pandoc with custom PDF settings.
- Pandoc renders the document through LaTeX, embedding fonts and generating the table of contents.
- The final PDF is written to the output directory.

Each step is automated and can be triggered with a single command from the `book/build` directory. The entire pipeline runs locally and requires no external services, making it suitable for offline use, CI/CD integration, or air-gapped environments.

## Practical Considerations

- **Reproducibility.** Because all inputs are version-controlled markdown files and the build tools are deterministic, any contributor can reproduce the exact same PDF from the same commit.
- **Extensibility.** Adding a new topic to the ebook requires only creating a new markdown file and adding its link to `README.md`. The build system picks it up automatically.
- **Portability.** The toolchain depends on pandoc, LaTeX, and standard Unix command-line utilities. It runs on Linux, macOS, and Windows Subsystem for Linux without modification.
- **Quality control.** Since the source files are plain text, they can be linted, spell-checked, and reviewed through standard pull request workflows before generating the PDF.

## Related

To deepen your understanding of this workflow, explore related topics including pandoc configuration and LaTeX customization, markdown linting and style enforcement, continuous integration pipelines for document generation, open source font licensing and typography best practices, and version control strategies for documentation repositories.

## Summary

Generating an ebook PDF from markdown is a disciplined pipeline that combines link extraction, file merging, and pandoc conversion with carefully chosen open source fonts. The process keeps authoring simple and collaborative while producing a typographically polished, distributable PDF. By automating every step through repository-hosted build tools, the workflow is reproducible, extensible, and accessible to any technology professional who can run a command line.

## References

- Pandoc official documentation: <https://pandoc.org/>
- Adobe Source Serif Pro, Source Sans Pro, Source Code Pro: <https://github.com/adobe-fonts>
- SixArm fonts collection: <https://github.com/sixarm/sixarm-fonts>
- SixArm markdown-text-to-link-urls: <https://github.com/sixarm/markdown-text-to-link-urls>
- SixArm pandoc-from-markdown-to-pdf: <https://github.com/sixarm/pandoc-from-markdown-to-pdf>
- SIL Open Font License: <https://scripts.sil.org/OFL>
- LaTeX Project: <https://www.latex-project.org/>
