## About the eBook PDF

This tutorial explains how technology professionals can generate professional-quality PDF ebooks from markdown documentation. The approach leverages open source tools, industry-standard fonts, and automated build pipelines to transform repository content into polished, distributable documents.

## Overview

PDF ebooks generated from markdown offer significant advantages for technical documentation, knowledge bases, and educational materials. The workflow described here uses a combination of custom build scripts, open source typography, and the powerful `pandoc` document converter to produce consistent, high-quality output.

| Component | Purpose |
|-----------|---------|
| Book build tools | Orchestrate the conversion pipeline |
| Adobe Source fonts | Provide professional typography |
| markdown-text-to-link-urls | Extract and process documentation links |
| pandoc-from-markdown-to-pdf | Convert merged markdown to PDF |

## Book Build Tools

The build tools reside in the repository under the `book/build` directory. These scripts automate the entire conversion process through three primary stages:

- **Link selection**: Parsing the repository structure to identify all documentation files
- **Markdown merging**: Combining individual topic files into a single coherent document
- **PDF generation**: Processing the merged content through pandoc with appropriate styling

This approach ensures consistency across builds and eliminates manual assembly errors that plague hand-crafted documents.

## Typography and Fonts

Professional typography significantly impacts document readability and perceived quality. The recommended font stack uses Adobe's open source font families:

| Font Family | Usage | Characteristics |
|-------------|-------|-----------------|
| Source Serif Pro | Body text | Optimized for extended reading |
| Source Sans Pro | Headings and UI elements | Clean, modern sans-serif |
| Source Code Pro | Code snippets and technical content | Monospaced with programming ligatures |

These fonts are freely available from the SixArm fonts repository and provide excellent screen and print rendering.

**Alternative font options:**
- Bitstream Vera fonts
- Liberation fonts

Both alternatives maintain similar metrics and can substitute when Adobe fonts are unavailable.

## Link Extraction with markdown-text-to-link-urls

The `markdown-text-to-link-urls` command-line tool handles the critical task of parsing markdown files to extract hyperlinks. This enables automated discovery of all documentation topics that should be included in the final PDF.

**Workflow:**
- Read the top-level `README.md` file
- Extract all markdown-formatted link URLs
- Filter results to identify guidepost markdown files
- Generate a manifest for the merge process

This parsing approach allows the table of contents and document structure to be defined in a single location while the build system automatically assembles the complete document.

## PDF Generation with pandoc

The `pandoc-from-markdown-to-pdf` tool wraps pandoc with optimized settings for technical documentation. Pandoc serves as the core conversion engine, transforming markdown syntax into properly formatted PDF output.

**Features enabled by the wrapper:**
- Automatic table of contents generation
- Custom font embedding
- Syntax highlighting for code blocks
- Appropriate page sizing and margins
- Header and footer formatting
- Cross-reference handling

## Build Pipeline Summary

The complete build pipeline follows this sequence:

1. Parse `README.md` to discover all topic links
2. Filter links to identify documentation files
3. Merge all markdown files in the correct order
4. Apply font and styling configuration
5. Generate PDF via pandoc with full formatting

## Benefits for Technology Professionals

| Benefit | Description |
|---------|-------------|
| Version control | Documentation lives alongside code in repositories |
| Automation | Builds are reproducible and scriptable |
| Consistency | Styling applies uniformly across all content |
| Accessibility | Markdown source remains human-readable |
| Distribution | PDF format works across all platforms |

## Practical Considerations

**Repository structure matters.** Organize topic files in a logical hierarchy that mirrors the desired table of contents. The build tools rely on consistent naming and linking conventions.

**Font installation is required.** Ensure the chosen fonts are installed on the build system before running the conversion. Missing fonts will cause pandoc to fall back to defaults, compromising the visual design.

**Pandoc version compatibility.** The wrapper tool may depend on specific pandoc features. Verify compatibility when upgrading pandoc or migrating to new build environments.

**Large documents require patience.** PDF generation for extensive documentation sets can be resource-intensive. Allocate sufficient time and memory for the build process, particularly when embedding fonts and generating a table of contents.
