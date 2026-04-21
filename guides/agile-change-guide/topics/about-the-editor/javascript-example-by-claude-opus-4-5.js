/**
 * About the Editor - Profile and Portfolio Management
 *
 * This module demonstrates patterns for managing professional profiles,
 * portfolios, and personal information in software applications. It covers
 * concepts like data modeling for profiles, link management, and
 * categorization of professional and personal information.
 *
 * Key Concepts:
 * - Profile data modeling
 * - Link and resource management
 * - Portfolio organization
 * - Professional/personal categorization
 * - Social media integration
 */

// Example 1: Professional Profile Class
class ProfessionalProfile {
  constructor(data) {
    this.name = data.name;
    this.title = data.title || '';
    this.bio = data.bio || '';
    this.links = new Map();
    this.skills = new Set();
    this.projects = [];
    this.contributions = [];

    // Initialize with provided data
    if (data.links) {
      Object.entries(data.links).forEach(([platform, url]) => {
        this.addLink(platform, url);
      });
    }

    if (data.skills) {
      data.skills.forEach(skill => this.addSkill(skill));
    }
  }

  /**
   * Add a social or professional link
   * @param {string} platform - Platform name (e.g., 'github', 'linkedin')
   * @param {string} url - Full URL to profile
   */
  addLink(platform, url) {
    // Validate URL format
    try {
      new URL(url);
      this.links.set(platform.toLowerCase(), {
        platform,
        url,
        addedAt: new Date()
      });
    } catch (error) {
      console.warn(`Invalid URL for ${platform}: ${url}`);
    }
  }

  /**
   * Get link by platform
   * @param {string} platform - Platform name
   * @returns {object|null} - Link object or null
   */
  getLink(platform) {
    return this.links.get(platform.toLowerCase()) || null;
  }

  /**
   * Add a skill to the profile
   * @param {string} skill - Skill name
   */
  addSkill(skill) {
    this.skills.add(skill.toLowerCase());
  }

  /**
   * Check if profile has a specific skill
   * @param {string} skill - Skill to check
   * @returns {boolean}
   */
  hasSkill(skill) {
    return this.skills.has(skill.toLowerCase());
  }

  /**
   * Add a project to the portfolio
   * @param {object} project - Project details
   */
  addProject(project) {
    this.projects.push({
      ...project,
      addedAt: new Date(),
      id: this.projects.length + 1
    });
  }

  /**
   * Add an open source contribution
   * @param {object} contribution - Contribution details
   */
  addContribution(contribution) {
    this.contributions.push({
      ...contribution,
      date: contribution.date || new Date()
    });
  }

  /**
   * Generate a summary of the profile
   * @returns {object} - Profile summary
   */
  getSummary() {
    return {
      name: this.name,
      title: this.title,
      linkCount: this.links.size,
      skillCount: this.skills.size,
      projectCount: this.projects.length,
      contributionCount: this.contributions.length
    };
  }

  /**
   * Export profile to JSON format
   * @returns {string} - JSON string
   */
  toJSON() {
    return JSON.stringify({
      name: this.name,
      title: this.title,
      bio: this.bio,
      links: Object.fromEntries(this.links),
      skills: Array.from(this.skills),
      projects: this.projects,
      contributions: this.contributions
    }, null, 2);
  }
}

// Example 2: Repository Manager for Open Source Projects
class RepositoryManager {
  constructor(owner) {
    this.owner = owner;
    this.repositories = [];
  }

  /**
   * Add a repository to the collection
   * @param {object} repo - Repository details
   */
  addRepository(repo) {
    this.repositories.push({
      name: repo.name,
      description: repo.description,
      url: repo.url || `https://github.com/${this.owner}/${repo.name}`,
      category: repo.category || 'general',
      tags: repo.tags || [],
      stars: repo.stars || 0,
      isPublic: repo.isPublic !== false,
      createdAt: repo.createdAt || new Date()
    });
  }

  /**
   * Filter repositories by category
   * @param {string} category - Category to filter by
   * @returns {Array} - Filtered repositories
   */
  filterByCategory(category) {
    return this.repositories.filter(repo =>
      repo.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Search repositories by name or description
   * @param {string} query - Search query
   * @returns {Array} - Matching repositories
   */
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.repositories.filter(repo =>
      repo.name.toLowerCase().includes(lowerQuery) ||
      repo.description.toLowerCase().includes(lowerQuery) ||
      repo.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Get repositories sorted by stars
   * @param {number} limit - Maximum number to return
   * @returns {Array} - Top repositories
   */
  getTopByStars(limit = 10) {
    return [...this.repositories]
      .sort((a, b) => b.stars - a.stars)
      .slice(0, limit);
  }

  /**
   * Group repositories by category
   * @returns {object} - Repositories grouped by category
   */
  groupByCategory() {
    return this.repositories.reduce((groups, repo) => {
      const category = repo.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(repo);
      return groups;
    }, {});
  }
}

// Example 3: Charity and Advocacy Tracker
class CharityTracker {
  constructor() {
    this.charities = [];
    this.donations = [];
  }

  /**
   * Add a charity to track
   * @param {object} charity - Charity details
   */
  addCharity(charity) {
    this.charities.push({
      name: charity.name,
      abbreviation: charity.abbreviation,
      category: charity.category,
      website: charity.website,
      description: charity.description,
      addedAt: new Date()
    });
  }

  /**
   * Record a donation
   * @param {string} charityName - Name of the charity
   * @param {number} amount - Donation amount
   * @param {Date} date - Date of donation
   */
  recordDonation(charityName, amount, date = new Date()) {
    const charity = this.charities.find(c =>
      c.name === charityName || c.abbreviation === charityName
    );

    if (charity) {
      this.donations.push({
        charityName: charity.name,
        amount,
        date,
        category: charity.category
      });
    }
  }

  /**
   * Get donation summary by category
   * @returns {object} - Summary by category
   */
  getSummaryByCategory() {
    return this.donations.reduce((summary, donation) => {
      const category = donation.category;
      if (!summary[category]) {
        summary[category] = { total: 0, count: 0 };
      }
      summary[category].total += donation.amount;
      summary[category].count += 1;
      return summary;
    }, {});
  }

  /**
   * Get all charities in a category
   * @param {string} category - Category to filter
   * @returns {Array} - Charities in category
   */
  getCharitiesByCategory(category) {
    return this.charities.filter(c =>
      c.category.toLowerCase() === category.toLowerCase()
    );
  }
}

// Example 4: Link Tree Generator
class LinkTreeGenerator {
  constructor(profileName) {
    this.profileName = profileName;
    this.links = [];
    this.theme = {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      linkColor: '#0066cc'
    };
  }

  /**
   * Add a link to the tree
   * @param {string} title - Display title
   * @param {string} url - Link URL
   * @param {string} icon - Optional icon identifier
   */
  addLink(title, url, icon = null) {
    this.links.push({
      title,
      url,
      icon,
      order: this.links.length,
      clicks: 0,
      active: true
    });
  }

  /**
   * Reorder links
   * @param {number} fromIndex - Current index
   * @param {number} toIndex - New index
   */
  reorderLink(fromIndex, toIndex) {
    const [link] = this.links.splice(fromIndex, 1);
    this.links.splice(toIndex, 0, link);
    // Update order values
    this.links.forEach((link, index) => {
      link.order = index;
    });
  }

  /**
   * Toggle link visibility
   * @param {number} index - Link index
   */
  toggleLink(index) {
    if (this.links[index]) {
      this.links[index].active = !this.links[index].active;
    }
  }

  /**
   * Set theme colors
   * @param {object} theme - Theme configuration
   */
  setTheme(theme) {
    this.theme = { ...this.theme, ...theme };
  }

  /**
   * Generate HTML for the link tree
   * @returns {string} - HTML string
   */
  generateHTML() {
    const activeLinks = this.links.filter(link => link.active);

    let html = `<!DOCTYPE html>
<html>
<head>
  <title>${this.profileName} - Links</title>
  <style>
    body {
      background-color: ${this.theme.backgroundColor};
      color: ${this.theme.textColor};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    h1 { margin-bottom: 30px; }
    .link {
      display: block;
      width: 100%;
      max-width: 400px;
      padding: 15px 20px;
      margin: 10px 0;
      background-color: ${this.theme.linkColor};
      color: white;
      text-decoration: none;
      text-align: center;
      border-radius: 8px;
      transition: transform 0.2s;
    }
    .link:hover { transform: scale(1.02); }
  </style>
</head>
<body>
  <h1>${this.profileName}</h1>
`;

    activeLinks.forEach(link => {
      html += `  <a href="${link.url}" class="link">${link.icon ? link.icon + ' ' : ''}${link.title}</a>\n`;
    });

    html += `</body>
</html>`;

    return html;
  }

  /**
   * Track a click on a link
   * @param {number} index - Link index
   */
  trackClick(index) {
    if (this.links[index]) {
      this.links[index].clicks += 1;
    }
  }

  /**
   * Get click analytics
   * @returns {Array} - Links sorted by clicks
   */
  getAnalytics() {
    return [...this.links]
      .sort((a, b) => b.clicks - a.clicks)
      .map(link => ({
        title: link.title,
        clicks: link.clicks,
        active: link.active
      }));
  }
}

// Demonstration
console.log('=== Professional Profile Example ===\n');

const profile = new ProfessionalProfile({
  name: 'Joel Parker Henderson',
  title: 'Software Developer and Writer',
  bio: 'Consulting for companies seeking technology and business capabilities.',
  links: {
    linkedin: 'https://linkedin.com/in/joelparkerhenderson',
    github: 'https://github.com/joelparkerhenderson',
    linktree: 'https://linktr.ee/joelparkerhenderson'
  },
  skills: ['JavaScript', 'Python', 'Architecture', 'Technical Writing']
});

profile.addProject({
  name: 'Architecture Decision Records',
  description: 'Templates and examples for documenting architecture decisions',
  category: 'documentation'
});

profile.addProject({
  name: 'OKR Examples',
  description: 'Objectives and Key Results templates for teams',
  category: 'business'
});

console.log('Profile Summary:', profile.getSummary());

// Repository management example
console.log('\n=== Repository Manager Example ===\n');

const repoManager = new RepositoryManager('joelparkerhenderson');

repoManager.addRepository({
  name: 'architecture-decision-record',
  description: 'Architecture decision record (ADR) templates and examples',
  category: 'documentation',
  tags: ['adr', 'architecture', 'documentation'],
  stars: 1500
});

repoManager.addRepository({
  name: 'objectives-and-key-results',
  description: 'OKR templates for teams and organizations',
  category: 'business',
  tags: ['okr', 'management', 'goals'],
  stars: 800
});

repoManager.addRepository({
  name: 'git-commit-message',
  description: 'Git commit message best practices',
  category: 'development',
  tags: ['git', 'workflow', 'best-practices'],
  stars: 500
});

console.log('Repositories by Category:');
const grouped = repoManager.groupByCategory();
Object.entries(grouped).forEach(([category, repos]) => {
  console.log(`  ${category}: ${repos.length} repositories`);
});

console.log('\nTop Repositories:');
repoManager.getTopByStars(3).forEach(repo => {
  console.log(`  ${repo.name}: ${repo.stars} stars`);
});

// Charity tracker example
console.log('\n=== Charity Tracker Example ===\n');

const charityTracker = new CharityTracker();

charityTracker.addCharity({
  name: 'Apache Software Foundation',
  abbreviation: 'ASF',
  category: 'technology',
  description: 'Supports open source software projects'
});

charityTracker.addCharity({
  name: 'Electronic Frontier Foundation',
  abbreviation: 'EFF',
  category: 'digital-rights',
  description: 'Defends civil liberties in the digital world'
});

charityTracker.addCharity({
  name: 'Médecins Sans Frontières',
  abbreviation: 'MSF',
  category: 'humanitarian',
  description: 'International medical humanitarian organization'
});

console.log('Charities by Category:');
['technology', 'digital-rights', 'humanitarian'].forEach(category => {
  const charities = charityTracker.getCharitiesByCategory(category);
  console.log(`  ${category}: ${charities.map(c => c.abbreviation).join(', ')}`);
});

// Link tree example
console.log('\n=== Link Tree Generator Example ===\n');

const linkTree = new LinkTreeGenerator('Joel Parker Henderson');

linkTree.addLink('LinkedIn', 'https://linkedin.com/in/joelparkerhenderson', '💼');
linkTree.addLink('GitHub', 'https://github.com/joelparkerhenderson', '💻');
linkTree.addLink('Portfolio', 'https://linktr.ee/joelparkerhenderson', '🔗');

linkTree.setTheme({
  backgroundColor: '#1a1a2e',
  textColor: '#eaeaea',
  linkColor: '#0f3460'
});

console.log('Link Tree Links:');
linkTree.links.forEach(link => {
  console.log(`  ${link.icon || '•'} ${link.title}: ${link.url}`);
});

/**
 * Key Takeaways for Profile and Portfolio Management:
 *
 * 1. Data Modeling: Structure profile data with clear entities
 *    - Separate concerns (links, skills, projects, contributions)
 *
 * 2. Validation: Validate URLs and data before storing
 *    - Use try/catch for URL parsing
 *
 * 3. Categorization: Group and filter data by meaningful categories
 *    - Skills by type, projects by category, charities by cause
 *
 * 4. Analytics: Track engagement and usage metrics
 *    - Click tracking, popularity rankings
 *
 * 5. Export/Import: Support standard formats for portability
 *    - JSON export, HTML generation
 */
