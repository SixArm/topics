/**
 * About Related Projects - Documentation and Context
 *
 * This file provides examples of how to document and reference related projects
 * in test automation contexts. When working on test automation, it's important
 * to understand the ecosystem of related tools, libraries, and projects.
 *
 * Key Concepts:
 * - Project Dependencies: Libraries and tools your tests rely on
 * - Complementary Tools: Projects that work alongside your test suite
 * - Alternative Solutions: Other approaches to solving similar problems
 * - Community Resources: Open source projects and learning materials
 *
 * Why Document Related Projects?
 * - Knowledge sharing across teams
 * - Easier onboarding for new team members
 * - Decision-making transparency
 * - Migration and upgrade planning
 * - Recognition of open source contributions
 */

// Example 1: Project Registry Class
class ProjectRegistry {
  constructor() {
    this.projects = [];
  }

  /**
   * Add a related project to the registry
   * @param {object} project - Project details
   */
  addProject(project) {
    const projectEntry = {
      name: project.name,
      description: project.description,
      type: project.type, // 'dependency', 'tool', 'alternative', 'resource'
      url: project.url,
      version: project.version || 'latest',
      license: project.license || 'Unknown',
      purpose: project.purpose,
      addedDate: new Date().toISOString(),
      tags: project.tags || []
    };

    this.projects.push(projectEntry);
  }

  /**
   * Find projects by type
   * @param {string} type - Project type to filter by
   * @returns {array} - Matching projects
   */
  getProjectsByType(type) {
    return this.projects.filter(p => p.type === type);
  }

  /**
   * Search projects by tag
   * @param {string} tag - Tag to search for
   * @returns {array} - Projects with the tag
   */
  getProjectsByTag(tag) {
    return this.projects.filter(p => p.tags.includes(tag));
  }

  /**
   * Generate a markdown documentation of all projects
   * @returns {string} - Markdown formatted documentation
   */
  generateDocumentation() {
    let doc = '# Related Projects\n\n';
    doc += 'This document catalogs projects related to our test automation framework.\n\n';

    const types = ['dependency', 'tool', 'alternative', 'resource'];

    types.forEach(type => {
      const projects = this.getProjectsByType(type);
      if (projects.length === 0) return;

      doc += `## ${this._capitalizeType(type)}\n\n`;

      projects.forEach(project => {
        doc += `### ${project.name}\n\n`;
        doc += `- **Description**: ${project.description}\n`;
        doc += `- **Purpose**: ${project.purpose}\n`;
        doc += `- **Version**: ${project.version}\n`;
        doc += `- **License**: ${project.license}\n`;
        doc += `- **URL**: [${project.url}](${project.url})\n`;
        if (project.tags.length > 0) {
          doc += `- **Tags**: ${project.tags.join(', ')}\n`;
        }
        doc += '\n';
      });
    });

    return doc;
  }

  /**
   * Helper to capitalize type names
   */
  _capitalizeType(type) {
    const typeNames = {
      'dependency': 'Dependencies',
      'tool': 'Tools',
      'alternative': 'Alternative Solutions',
      'resource': 'Learning Resources'
    };
    return typeNames[type] || type;
  }

  /**
   * Export registry as JSON
   * @returns {string} - JSON representation
   */
  exportAsJSON() {
    return JSON.stringify(this.projects, null, 2);
  }

  /**
   * Generate dependency graph information
   * @returns {object} - Graph structure
   */
  getDependencyGraph() {
    const dependencies = this.getProjectsByType('dependency');
    return {
      nodes: dependencies.map(d => ({
        id: d.name,
        label: d.name,
        version: d.version
      })),
      edges: [] // In real scenarios, you'd track inter-dependencies
    };
  }
}

// Example 2: Creating a Project Registry for Test Automation
console.log('=== Test Automation Related Projects Registry ===\n');

const registry = new ProjectRegistry();

// Add testing frameworks
registry.addProject({
  name: 'Jest',
  description: 'Delightful JavaScript Testing Framework with a focus on simplicity',
  type: 'dependency',
  url: 'https://jestjs.io',
  version: '29.7.0',
  license: 'MIT',
  purpose: 'Primary unit testing framework for JavaScript code',
  tags: ['testing', 'unit-tests', 'javascript', 'framework']
});

registry.addProject({
  name: 'Playwright',
  description: 'Fast and reliable end-to-end testing for modern web apps',
  type: 'dependency',
  url: 'https://playwright.dev',
  version: '1.40.0',
  license: 'Apache-2.0',
  purpose: 'Browser automation for E2E testing across Chrome, Firefox, and Safari',
  tags: ['e2e', 'browser-automation', 'testing', 'cross-browser']
});

registry.addProject({
  name: 'Selenium WebDriver',
  description: 'Browser automation framework and ecosystem',
  type: 'alternative',
  url: 'https://www.selenium.dev',
  version: '4.15.0',
  license: 'Apache-2.0',
  purpose: 'Alternative browser automation solution with wider language support',
  tags: ['e2e', 'browser-automation', 'cross-platform']
});

// Add assertion libraries
registry.addProject({
  name: 'Chai',
  description: 'BDD / TDD assertion library for node and the browser',
  type: 'dependency',
  url: 'https://www.chaijs.com',
  version: '4.3.10',
  license: 'MIT',
  purpose: 'Flexible assertion library with multiple assertion styles',
  tags: ['assertions', 'testing', 'bdd', 'tdd']
});

// Add test data tools
registry.addProject({
  name: 'Faker.js',
  description: 'Generate massive amounts of fake data in Node.js and the browser',
  type: 'tool',
  url: 'https://fakerjs.dev',
  version: '8.3.1',
  license: 'MIT',
  purpose: 'Generate realistic test data for various scenarios',
  tags: ['test-data', 'mocking', 'fixtures']
});

// Add API testing tools
registry.addProject({
  name: 'Supertest',
  description: 'Super-agent driven library for testing HTTP servers',
  type: 'dependency',
  url: 'https://github.com/ladjs/supertest',
  version: '6.3.3',
  license: 'MIT',
  purpose: 'HTTP assertion library for API testing',
  tags: ['api-testing', 'http', 'integration-tests']
});

// Add CI/CD tools
registry.addProject({
  name: 'GitHub Actions',
  description: 'Automate, customize, and execute software development workflows',
  type: 'tool',
  url: 'https://github.com/features/actions',
  version: 'N/A',
  license: 'N/A',
  purpose: 'CI/CD pipeline for running automated tests on code changes',
  tags: ['ci-cd', 'automation', 'github']
});

// Add learning resources
registry.addProject({
  name: 'Testing JavaScript',
  description: 'Comprehensive course on JavaScript testing best practices',
  type: 'resource',
  url: 'https://testingjavascript.com',
  license: 'N/A',
  purpose: 'Educational resource for learning testing methodologies',
  tags: ['learning', 'best-practices', 'course']
});

registry.addProject({
  name: 'Martin Fowler - Testing Strategies',
  description: 'Articles on software testing patterns and practices',
  type: 'resource',
  url: 'https://martinfowler.com/testing/',
  license: 'N/A',
  purpose: 'Reference for testing architecture and strategy',
  tags: ['learning', 'architecture', 'patterns']
});

// Display registry contents
console.log('Total Projects Registered:', registry.projects.length);

console.log('\n--- Dependencies ---');
registry.getProjectsByType('dependency').forEach(p => {
  console.log(`  ${p.name} (${p.version}): ${p.description}`);
});

console.log('\n--- Tools ---');
registry.getProjectsByType('tool').forEach(p => {
  console.log(`  ${p.name}: ${p.purpose}`);
});

console.log('\n--- Alternatives ---');
registry.getProjectsByType('alternative').forEach(p => {
  console.log(`  ${p.name}: ${p.purpose}`);
});

console.log('\n--- Learning Resources ---');
registry.getProjectsByType('resource').forEach(p => {
  console.log(`  ${p.name}: ${p.purpose}`);
});

// Example 3: Generating Documentation
console.log('\n\n=== Generated Markdown Documentation ===\n');
const markdown = registry.generateDocumentation();
console.log(markdown);

// Example 4: Project Comparison Utility
class ProjectComparison {
  /**
   * Compare two projects across key dimensions
   * @param {object} project1 - First project
   * @param {object} project2 - Second project
   * @returns {object} - Comparison results
   */
  static compare(project1, project2) {
    return {
      names: [project1.name, project2.name],
      comparison: {
        license: {
          project1: project1.license,
          project2: project2.license,
          same: project1.license === project2.license
        },
        tags: {
          project1: project1.tags,
          project2: project2.tags,
          commonTags: project1.tags.filter(t => project2.tags.includes(t)),
          uniqueToProject1: project1.tags.filter(t => !project2.tags.includes(t)),
          uniqueToProject2: project2.tags.filter(t => !project1.tags.includes(t))
        }
      },
      similarity: this._calculateSimilarity(project1, project2)
    };
  }

  /**
   * Calculate similarity score between two projects based on tags
   * @returns {number} - Similarity score (0-100)
   */
  static _calculateSimilarity(project1, project2) {
    const allTags = new Set([...project1.tags, ...project2.tags]);
    const commonTags = project1.tags.filter(t => project2.tags.includes(t));

    if (allTags.size === 0) return 0;
    return (commonTags.length / allTags.size) * 100;
  }

  /**
   * Recommend alternatives based on tag similarity
   * @param {object} project - Current project
   * @param {array} alternatives - List of alternative projects
   * @returns {array} - Ranked alternatives
   */
  static findSimilarProjects(project, alternatives) {
    return alternatives
      .map(alt => ({
        project: alt,
        similarity: this._calculateSimilarity(project, alt)
      }))
      .sort((a, b) => b.similarity - a.similarity);
  }
}

// Example comparison
const jest = registry.projects.find(p => p.name === 'Jest');
const playwright = registry.projects.find(p => p.name === 'Playwright');
const selenium = registry.projects.find(p => p.name === 'Selenium WebDriver');

console.log('=== Project Comparison: Playwright vs Selenium ===\n');
const comparison = ProjectComparison.compare(playwright, selenium);
console.log('Comparing:', comparison.names.join(' vs '));
console.log('Common Tags:', comparison.comparison.tags.commonTags.join(', '));
console.log('Similarity Score:', comparison.similarity.toFixed(1) + '%');
console.log('Unique to Playwright:', comparison.comparison.tags.uniqueToProject1.join(', '));
console.log('Unique to Selenium:', comparison.comparison.tags.uniqueToProject2.join(', '));

/**
 * Best Practices for Documenting Related Projects:
 *
 * 1. Keep Information Updated: Regularly review and update project versions
 * 2. Document Decisions: Explain why each project was chosen
 * 3. Track Dependencies: Maintain awareness of security vulnerabilities
 * 4. License Compliance: Ensure all licenses are compatible with your project
 * 5. Evaluate Alternatives: Periodically review if better options exist
 * 6. Community Health: Consider maintenance status and community activity
 * 7. Integration Guides: Document how projects work together
 * 8. Migration Paths: Plan for potential tool changes
 * 9. Cost Analysis: Track both monetary and technical debt costs
 * 10. Share Knowledge: Make documentation accessible to all team members
 */
