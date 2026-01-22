/**
 * About the eBook PDF - Build Tools and Document Generation
 *
 * This module demonstrates concepts related to building documentation
 * from source files, similar to how an ebook PDF is generated from
 * markdown files. It shows patterns for file processing, merging
 * content, and generating output documents.
 *
 * Key Concepts:
 * - File system operations for reading source files
 * - Content merging and transformation
 * - Document generation pipelines
 * - Font and styling configuration
 * - Build tool automation
 */

// Example 1: Document Builder Class
class DocumentBuilder {
  constructor(config) {
    // Configuration for the document build process
    this.config = {
      sourceDir: config.sourceDir || './docs',
      outputDir: config.outputDir || './build',
      outputFormat: config.outputFormat || 'pdf',
      fonts: config.fonts || {
        serif: 'Source Serif Pro',
        sans: 'Source Sans Pro',
        mono: 'Source Code Pro'
      },
      tableOfContents: config.tableOfContents !== false,
      ...config
    };

    // Track build state
    this.sourceFiles = [];
    this.mergedContent = '';
    this.buildLog = [];
  }

  /**
   * Log a build event with timestamp
   * @param {string} message - The log message
   * @param {string} level - Log level (info, warn, error)
   */
  log(message, level = 'info') {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message
    };
    this.buildLog.push(entry);
    console.log(`[${entry.level.toUpperCase()}] ${entry.timestamp}: ${message}`);
  }

  /**
   * Discover all markdown files in source directory
   * Simulates file system traversal
   * @returns {Array} - List of discovered file paths
   */
  discoverSourceFiles() {
    this.log('Discovering source files...');

    // Simulated file discovery - in real implementation would use fs.readdir
    this.sourceFiles = [
      { path: 'README.md', order: 0 },
      { path: 'introduction/index.md', order: 1 },
      { path: 'chapter-01/index.md', order: 2 },
      { path: 'chapter-02/index.md', order: 3 },
      { path: 'conclusion/index.md', order: 4 }
    ];

    this.log(`Discovered ${this.sourceFiles.length} source files`);
    return this.sourceFiles;
  }

  /**
   * Extract links from markdown content
   * Similar to markdown-text-to-link-urls tool
   * @param {string} content - Markdown content
   * @returns {Array} - Extracted link URLs
   */
  extractMarkdownLinks(content) {
    // Regex pattern to match markdown links [text](url)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      links.push({
        text: match[1],
        url: match[2]
      });
    }

    this.log(`Extracted ${links.length} links from content`);
    return links;
  }

  /**
   * Filter links to find documentation file references
   * @param {Array} links - Array of link objects
   * @returns {Array} - Filtered documentation links
   */
  filterDocumentationLinks(links) {
    return links.filter(link => {
      // Match internal markdown file links
      return link.url.endsWith('.md') ||
             link.url.endsWith('/index.md') ||
             link.url.match(/^\.?\/?[a-z-]+\/?$/);
    });
  }

  /**
   * Merge multiple markdown files into single content
   * @param {Array} files - Array of file objects with content
   * @returns {string} - Merged markdown content
   */
  mergeContent(files) {
    this.log('Merging content from source files...');

    // Sort files by order
    const sortedFiles = [...files].sort((a, b) => a.order - b.order);

    // Merge with page breaks between sections
    this.mergedContent = sortedFiles
      .map(file => file.content)
      .join('\n\n---\n\n');

    this.log(`Merged ${files.length} files into single document`);
    return this.mergedContent;
  }

  /**
   * Generate table of contents from headings
   * @param {string} content - Markdown content
   * @returns {string} - Table of contents markdown
   */
  generateTableOfContents(content) {
    this.log('Generating table of contents...');

    // Extract headings using regex
    const headingPattern = /^(#{1,3})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingPattern.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const anchor = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

      headings.push({ level, text, anchor });
    }

    // Build TOC markdown
    let toc = '# Table of Contents\n\n';
    headings.forEach(heading => {
      const indent = '  '.repeat(heading.level - 1);
      toc += `${indent}- [${heading.text}](#${heading.anchor})\n`;
    });

    this.log(`Generated TOC with ${headings.length} entries`);
    return toc;
  }

  /**
   * Apply styling configuration for PDF output
   * @returns {object} - Style configuration
   */
  getStyleConfig() {
    return {
      fonts: this.config.fonts,
      fontSize: {
        body: 11,
        heading1: 24,
        heading2: 18,
        heading3: 14,
        code: 10
      },
      margins: {
        top: '1in',
        bottom: '1in',
        left: '1in',
        right: '1in'
      },
      pageSize: 'letter',
      lineHeight: 1.5,
      codeHighlighting: true
    };
  }

  /**
   * Build the final document
   * Orchestrates the complete build process
   * @returns {object} - Build result
   */
  async build() {
    const startTime = Date.now();
    this.log('Starting document build...');

    try {
      // Step 1: Discover source files
      this.discoverSourceFiles();

      // Step 2: Simulate reading and processing files
      const processedFiles = this.sourceFiles.map(file => ({
        ...file,
        content: `# ${file.path}\n\nContent from ${file.path}`
      }));

      // Step 3: Merge content
      this.mergeContent(processedFiles);

      // Step 4: Generate table of contents
      let finalContent = '';
      if (this.config.tableOfContents) {
        const toc = this.generateTableOfContents(this.mergedContent);
        finalContent = toc + '\n\n---\n\n' + this.mergedContent;
      } else {
        finalContent = this.mergedContent;
      }

      // Step 5: Apply styling
      const styles = this.getStyleConfig();

      const buildTime = Date.now() - startTime;
      this.log(`Build completed in ${buildTime}ms`);

      return {
        success: true,
        outputPath: `${this.config.outputDir}/output.${this.config.outputFormat}`,
        contentLength: finalContent.length,
        fileCount: this.sourceFiles.length,
        buildTime,
        styles
      };

    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error');
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Example 2: Markdown Link Extractor
class MarkdownLinkExtractor {
  /**
   * Extract all URLs from markdown text
   * @param {string} markdown - Input markdown text
   * @returns {Array} - Array of extracted URLs
   */
  static extractUrls(markdown) {
    const urls = [];

    // Match standard markdown links
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(markdown)) !== null) {
      urls.push({
        type: 'link',
        text: match[1],
        url: match[2]
      });
    }

    // Match reference-style links
    const refRegex = /^\[([^\]]+)\]:\s*(.+)$/gm;
    while ((match = refRegex.exec(markdown)) !== null) {
      urls.push({
        type: 'reference',
        id: match[1],
        url: match[2].trim()
      });
    }

    // Match bare URLs
    const bareUrlRegex = /<(https?:\/\/[^>]+)>/g;
    while ((match = bareUrlRegex.exec(markdown)) !== null) {
      urls.push({
        type: 'bare',
        url: match[1]
      });
    }

    return urls;
  }

  /**
   * Filter URLs by domain
   * @param {Array} urls - Array of URL objects
   * @param {string} domain - Domain to filter by
   * @returns {Array} - Filtered URLs
   */
  static filterByDomain(urls, domain) {
    return urls.filter(item => {
      try {
        const url = new URL(item.url);
        return url.hostname.includes(domain);
      } catch {
        return false;
      }
    });
  }
}

// Example 3: Pandoc Command Builder
class PandocCommandBuilder {
  constructor() {
    this.inputFile = '';
    this.outputFile = '';
    this.options = new Map();
  }

  /**
   * Set input file path
   * @param {string} path - Input file path
   * @returns {PandocCommandBuilder} - Returns this for chaining
   */
  input(path) {
    this.inputFile = path;
    return this;
  }

  /**
   * Set output file path
   * @param {string} path - Output file path
   * @returns {PandocCommandBuilder} - Returns this for chaining
   */
  output(path) {
    this.outputFile = path;
    return this;
  }

  /**
   * Add table of contents
   * @returns {PandocCommandBuilder}
   */
  withTableOfContents() {
    this.options.set('toc', true);
    return this;
  }

  /**
   * Set font family
   * @param {string} font - Font name
   * @returns {PandocCommandBuilder}
   */
  withFont(font) {
    this.options.set('mainfont', font);
    return this;
  }

  /**
   * Enable syntax highlighting
   * @param {string} style - Highlighting style (e.g., 'tango', 'pygments')
   * @returns {PandocCommandBuilder}
   */
  withHighlighting(style = 'tango') {
    this.options.set('highlight-style', style);
    return this;
  }

  /**
   * Set page margins
   * @param {string} margin - Margin size (e.g., '1in')
   * @returns {PandocCommandBuilder}
   */
  withMargins(margin) {
    this.options.set('margin-top', margin);
    this.options.set('margin-bottom', margin);
    this.options.set('margin-left', margin);
    this.options.set('margin-right', margin);
    return this;
  }

  /**
   * Build the pandoc command string
   * @returns {string} - Complete pandoc command
   */
  build() {
    let command = 'pandoc';

    // Add input file
    if (this.inputFile) {
      command += ` "${this.inputFile}"`;
    }

    // Add output file
    if (this.outputFile) {
      command += ` -o "${this.outputFile}"`;
    }

    // Add options
    for (const [key, value] of this.options) {
      if (value === true) {
        command += ` --${key}`;
      } else {
        command += ` --${key}="${value}"`;
      }
    }

    return command;
  }
}

// Demonstration
console.log('=== Document Build Tools Example ===\n');

// Build a document
const builder = new DocumentBuilder({
  sourceDir: './topics',
  outputDir: './build',
  outputFormat: 'pdf',
  tableOfContents: true
});

builder.build().then(result => {
  console.log('\nBuild Result:');
  console.log(JSON.stringify(result, null, 2));
});

// Extract links from markdown
console.log('\n=== Link Extraction Example ===\n');

const sampleMarkdown = `
# Sample Document

Check out [GitHub](https://github.com/sixarm) for more projects.
See the [font repository](https://github.com/sixarm/sixarm-fonts) for fonts.

Reference links:
[pandoc]: https://pandoc.org

Bare URL: <https://example.com>
`;

const extractedLinks = MarkdownLinkExtractor.extractUrls(sampleMarkdown);
console.log('Extracted Links:');
extractedLinks.forEach(link => {
  console.log(`  Type: ${link.type}, URL: ${link.url}`);
});

// Build pandoc command
console.log('\n=== Pandoc Command Builder Example ===\n');

const pandocCommand = new PandocCommandBuilder()
  .input('merged.md')
  .output('output.pdf')
  .withTableOfContents()
  .withFont('Source Serif Pro')
  .withHighlighting('tango')
  .withMargins('1in')
  .build();

console.log('Generated Pandoc Command:');
console.log(pandocCommand);

/**
 * Key Takeaways for Document Generation:
 *
 * 1. Pipeline Architecture: Document builds follow a pipeline pattern
 *    - Discovery -> Processing -> Merging -> Transformation -> Output
 *
 * 2. Configuration Management: Externalize settings for flexibility
 *    - Fonts, margins, output format, TOC options
 *
 * 3. Content Processing: Handle markdown parsing and transformation
 *    - Link extraction, heading detection, content merging
 *
 * 4. Tool Integration: Wrap external tools with clean APIs
 *    - Pandoc command building, font configuration
 *
 * 5. Logging and Monitoring: Track build progress and issues
 *    - Timestamps, log levels, build metrics
 */
