# About the Ebook PDF: Tutorial

## Overview

The Agile Change Guide is available as an ebook PDF, generated from the repository's markdown files through a custom build pipeline. Understanding how this pipeline works is valuable for agile change technology professionals who want to create their own documentation, guides, or books using similar open-source tools. This tutorial explains the build process, the tools involved, and how you can leverage this approach for your own projects.

## Key Concepts

### The Build Pipeline

The ebook PDF is produced by a pipeline that:

1. Selects all documentation links from the repository's top-level `README.md` file.
2. Merges all the referenced markdown files into a single consolidated markdown file.
3. Processes the consolidated markdown into a PDF file using `pandoc`.

This pipeline is automated using custom build tools stored in the repository's `book/build` directory. The approach transforms a collection of individual markdown topic files into a cohesive, formatted book.

### Markdown as a Source Format

Markdown is a lightweight markup language that is widely used in software development for documentation, README files, and technical writing. Using markdown as the source format for the guide provides several advantages:

- **Simplicity.** Markdown is easy to read and write, even without rendering.
- **Version control.** Markdown files work seamlessly with Git, enabling change tracking, branching, and collaboration.
- **Portability.** Markdown can be converted to HTML, PDF, EPUB, and other formats using tools like pandoc.
- **Collaboration.** Markdown files can be edited by anyone with a text editor, lowering the barrier to contribution.

### Fonts

The guide uses Adobe's Source Serif Pro, Source Sans Pro, and Source Code Pro fonts. These fonts are free and open source, which aligns with the project's commitment to open access. The guide can also be built with Bitstream Vera or Liberation fonts as alternatives.

Choosing appropriate fonts matters for readability, professionalism, and accessibility. Serif fonts (like Source Serif Pro) are commonly used for body text in print and PDF formats, while sans-serif fonts (like Source Sans Pro) are used for headings and interface text.

### markdown-text-to-link-urls

This is a custom command-line tool maintained by the project. It reads markdown text and outputs all markdown link URLs. The build process uses it to parse the `README.md` file, extract links to individual topic files, and then merge those files into a single document.

This tool demonstrates a useful pattern: building small, focused utilities that automate specific steps in your workflow. In agile development, this is sometimes called a "build tool" or "script utility."

### pandoc-from-markdown-to-pdf

This is another custom command-line tool that uses pandoc with preferred settings to convert markdown to PDF. It handles table of contents generation, font embedding, syntax highlighting, sizing, and other formatting details.

Pandoc is a powerful, open-source document conversion tool that supports dozens of input and output formats. It is widely used in technical writing, academic publishing, and documentation pipelines.

## Practical Steps for Implementation

1. **Set up a markdown-based documentation project.** Start by organizing your documentation into individual markdown files, one per topic. Create a top-level README that links to each topic file. This structure makes content easy to navigate, maintain, and contribute to.

2. **Install pandoc.** Pandoc is available on all major operating systems. Install it and experiment with converting markdown files to PDF, HTML, and other formats.

3. **Choose appropriate fonts.** Select fonts that are readable, professional, and freely licensed. Adobe's Source family (Source Serif Pro, Source Sans Pro, Source Code Pro) is an excellent choice for technical documentation.

4. **Build a simple automation pipeline.** Write a script that collects your markdown files in the correct order, merges them into a single file, and runs pandoc to produce a PDF. Start simple and add features (table of contents, cover page, headers/footers) as needed.

5. **Use version control.** Store your markdown files in a Git repository. This gives you full change history, the ability to branch and merge, and easy collaboration with others.

6. **Automate with CI/CD.** Consider adding a continuous integration step that automatically rebuilds your PDF whenever content changes are pushed to the repository. This ensures the published version is always up to date.

7. **Explore pandoc's capabilities.** Pandoc supports custom templates, filters, and metadata. Invest time in learning these features to customize the appearance and structure of your output.

8. **Contribute to open-source documentation tools.** If you build useful tools or improvements during this process, consider sharing them with the community as open-source projects.

## Key Takeaway

The Agile Change Guide's ebook PDF pipeline demonstrates how open-source tools and simple automation can transform a collection of markdown files into a professional, polished publication. For agile change technology professionals, this approach offers a practical, version-controlled, and collaborative workflow for creating documentation, guides, and books. By adopting markdown as your source format, leveraging pandoc for conversion, and automating your build pipeline, you can produce high-quality publications efficiently -- and share the tools and knowledge with others along the way.
