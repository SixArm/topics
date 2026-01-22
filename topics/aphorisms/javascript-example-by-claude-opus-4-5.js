/**
 * Aphorisms - Concise Expressions of Wisdom
 *
 * Aphorisms are brief, memorable statements that convey general truths or
 * principles. In software development and testing, aphorisms serve as
 * reminders of best practices, common pitfalls, and timeless wisdom.
 *
 * Key Concepts:
 * - Memorable principles for development teams
 * - Testing wisdom and guidelines
 * - Software engineering maxims
 * - Quality assurance insights
 */

// Example 1: Aphorism Collection Manager
class AphorismCollection {
  constructor(category) {
    this.category = category;
    this.aphorisms = [];
    this.tags = new Set();
  }

  /**
   * Add an aphorism to the collection
   * @param {object} aphorism - Aphorism details
   */
  add(aphorism) {
    this.aphorisms.push({
      id: `APH-${this.aphorisms.length + 1}`,
      text: aphorism.text,
      author: aphorism.author || 'Unknown',
      source: aphorism.source || null,
      tags: aphorism.tags || [],
      interpretation: aphorism.interpretation || '',
      addedAt: new Date()
    });

    aphorism.tags?.forEach(tag => this.tags.add(tag));
  }

  /**
   * Get random aphorism
   * @returns {object} - Random aphorism
   */
  getRandom() {
    const index = Math.floor(Math.random() * this.aphorisms.length);
    return this.aphorisms[index];
  }

  /**
   * Search aphorisms by keyword
   * @param {string} keyword - Search term
   * @returns {Array}
   */
  search(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return this.aphorisms.filter(a =>
      a.text.toLowerCase().includes(lowerKeyword) ||
      a.tags.some(t => t.toLowerCase().includes(lowerKeyword))
    );
  }

  /**
   * Get aphorisms by tag
   * @param {string} tag - Tag to filter
   * @returns {Array}
   */
  getByTag(tag) {
    return this.aphorisms.filter(a =>
      a.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Get aphorisms by author
   * @param {string} author - Author name
   * @returns {Array}
   */
  getByAuthor(author) {
    return this.aphorisms.filter(a =>
      a.author.toLowerCase().includes(author.toLowerCase())
    );
  }
}

// Example 2: Daily Wisdom Generator
class DailyWisdomGenerator {
  constructor() {
    this.collections = new Map();
    this.history = [];
  }

  /**
   * Add a collection to the generator
   * @param {string} name - Collection name
   * @param {AphorismCollection} collection - Collection instance
   */
  addCollection(name, collection) {
    this.collections.set(name, collection);
  }

  /**
   * Get daily aphorism (consistent for the day)
   * @param {Date} date - Date to get aphorism for
   * @returns {object}
   */
  getDailyAphorism(date = new Date()) {
    const allAphorisms = [];
    for (const collection of this.collections.values()) {
      allAphorisms.push(...collection.aphorisms);
    }

    if (allAphorisms.length === 0) return null;

    // Use date to generate consistent daily selection
    const dayOfYear = this.getDayOfYear(date);
    const index = dayOfYear % allAphorisms.length;

    const aphorism = allAphorisms[index];

    this.history.push({
      date: date.toDateString(),
      aphorismId: aphorism.id
    });

    return aphorism;
  }

  /**
   * Get day of year (1-365)
   * @param {Date} date - Date
   * @returns {number}
   */
  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  /**
   * Format aphorism for display
   * @param {object} aphorism - Aphorism to format
   * @returns {string}
   */
  formatForDisplay(aphorism) {
    let display = `"${aphorism.text}"`;
    if (aphorism.author !== 'Unknown') {
      display += `\n  — ${aphorism.author}`;
    }
    if (aphorism.source) {
      display += ` (${aphorism.source})`;
    }
    return display;
  }
}

// Example 3: Aphorism Validator (checks team adherence)
class AphorismValidator {
  constructor() {
    this.rules = [];
  }

  /**
   * Add a rule based on an aphorism
   * @param {object} rule - Rule configuration
   */
  addRule(rule) {
    this.rules.push({
      aphorism: rule.aphorism,
      checkFn: rule.checkFn,
      severity: rule.severity || 'warning',
      category: rule.category
    });
  }

  /**
   * Validate code/data against aphorism rules
   * @param {object} context - Validation context
   * @returns {Array} - Validation results
   */
  validate(context) {
    const results = [];

    for (const rule of this.rules) {
      try {
        const passed = rule.checkFn(context);
        results.push({
          aphorism: rule.aphorism,
          passed,
          severity: rule.severity,
          category: rule.category
        });
      } catch (error) {
        results.push({
          aphorism: rule.aphorism,
          passed: false,
          severity: rule.severity,
          category: rule.category,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Get summary of validation
   * @param {Array} results - Validation results
   * @returns {object}
   */
  getSummary(results) {
    return {
      total: results.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      byCategory: results.reduce((acc, r) => {
        acc[r.category] = acc[r.category] || { passed: 0, failed: 0 };
        r.passed ? acc[r.category].passed++ : acc[r.category].failed++;
        return acc;
      }, {})
    };
  }
}

// Testing Aphorisms Collection
const testingAphorisms = new AphorismCollection('Testing');

testingAphorisms.add({
  text: "Testing shows the presence, not the absence of bugs.",
  author: "Edsger W. Dijkstra",
  tags: ['testing', 'bugs', 'philosophy'],
  interpretation: "No amount of testing can prove software is bug-free; it can only find bugs that exist."
});

testingAphorisms.add({
  text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
  author: "Edsger W. Dijkstra",
  tags: ['debugging', 'programming', 'humor'],
  interpretation: "Bugs are an inherent part of the development process."
});

testingAphorisms.add({
  text: "Quality is not an act, it is a habit.",
  author: "Aristotle",
  tags: ['quality', 'practice', 'philosophy'],
  interpretation: "Quality must be built into daily practices, not added as an afterthought."
});

testingAphorisms.add({
  text: "The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  author: "Tom Cargill",
  tags: ['development', 'estimation', 'time'],
  interpretation: "The last parts of a project often take longer than expected."
});

testingAphorisms.add({
  text: "Simplicity is prerequisite for reliability.",
  author: "Edsger W. Dijkstra",
  tags: ['simplicity', 'reliability', 'design'],
  interpretation: "Complex systems are harder to test and more prone to failure."
});

testingAphorisms.add({
  text: "Make it work, make it right, make it fast.",
  author: "Kent Beck",
  tags: ['development', 'optimization', 'process'],
  interpretation: "First get it working, then refactor for quality, finally optimize for performance."
});

testingAphorisms.add({
  text: "A bug in the hand is worth two in the documentation.",
  author: "Unknown",
  tags: ['bugs', 'documentation', 'humor'],
  interpretation: "A known, reproducible bug is more valuable than vague reports."
});

testingAphorisms.add({
  text: "Test early, test often.",
  author: "Software Testing Wisdom",
  tags: ['testing', 'continuous', 'practice'],
  interpretation: "Frequent testing catches issues when they're easier to fix."
});

testingAphorisms.add({
  text: "If you don't like unit testing your product, most likely your customers won't like testing it either.",
  author: "Anonymous",
  tags: ['unit-testing', 'quality', 'customer'],
  interpretation: "Tedious testing suggests tedious user experience."
});

testingAphorisms.add({
  text: "The amateur software engineer is always in search of magic.",
  author: "Grady Booch",
  tags: ['engineering', 'experience', 'wisdom'],
  interpretation: "There are no shortcuts; good software requires discipline and skill."
});

// Demonstration
console.log('=== Aphorisms in Software Testing ===\n');

console.log('--- Testing Aphorisms Collection ---\n');
console.log(`Total aphorisms: ${testingAphorisms.aphorisms.length}`);
console.log(`Tags: ${Array.from(testingAphorisms.tags).join(', ')}\n`);

// Search functionality
console.log('Aphorisms about "bugs":');
testingAphorisms.search('bugs').forEach(a => {
  console.log(`  "${a.text.substring(0, 50)}..."`);
  console.log(`    — ${a.author}\n`);
});

// Daily wisdom
const wisdomGenerator = new DailyWisdomGenerator();
wisdomGenerator.addCollection('testing', testingAphorisms);

console.log('--- Daily Wisdom ---\n');
const dailyAphorism = wisdomGenerator.getDailyAphorism();
console.log(wisdomGenerator.formatForDisplay(dailyAphorism));

// Validation based on aphorisms
console.log('\n--- Aphorism-Based Code Validation ---\n');

const validator = new AphorismValidator();

validator.addRule({
  aphorism: "Simplicity is prerequisite for reliability",
  checkFn: (context) => context.cyclomaticComplexity < 10,
  severity: 'warning',
  category: 'complexity'
});

validator.addRule({
  aphorism: "Test early, test often",
  checkFn: (context) => context.testCoverage > 80,
  severity: 'error',
  category: 'testing'
});

validator.addRule({
  aphorism: "Make it work, make it right, make it fast",
  checkFn: (context) => context.hasTests && context.isPassing,
  severity: 'error',
  category: 'quality'
});

// Example validation context
const codeContext = {
  cyclomaticComplexity: 15,
  testCoverage: 75,
  hasTests: true,
  isPassing: true
};

const validationResults = validator.validate(codeContext);
const summary = validator.getSummary(validationResults);

console.log('Validation Results:');
validationResults.forEach(r => {
  const status = r.passed ? '✓' : '✗';
  console.log(`  ${status} "${r.aphorism.substring(0, 40)}..." - ${r.passed ? 'PASS' : 'FAIL'}`);
});

console.log('\nSummary:');
console.log(`  Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);

// Example 4: Aphorism Card Generator
class AphorismCardGenerator {
  /**
   * Generate a formatted card for an aphorism
   * @param {object} aphorism - Aphorism to format
   * @returns {string} - ASCII card
   */
  static generateCard(aphorism) {
    const maxWidth = 60;
    const border = '═'.repeat(maxWidth + 2);
    const spacer = ' '.repeat(maxWidth);

    // Word wrap the text
    const words = aphorism.text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length > maxWidth - 4) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });
    if (currentLine.trim()) lines.push(currentLine.trim());

    // Build card
    let card = `╔${border}╗\n`;
    card += `║ ${spacer} ║\n`;

    lines.forEach(line => {
      const padding = maxWidth - line.length;
      const leftPad = Math.floor(padding / 2);
      const rightPad = padding - leftPad;
      card += `║ ${' '.repeat(leftPad)}${line}${' '.repeat(rightPad)} ║\n`;
    });

    card += `║ ${spacer} ║\n`;

    // Author line
    const authorText = `— ${aphorism.author}`;
    const authorPadding = maxWidth - authorText.length;
    card += `║ ${' '.repeat(authorPadding)}${authorText} ║\n`;

    card += `║ ${spacer} ║\n`;
    card += `╚${border}╝`;

    return card;
  }
}

console.log('\n--- Aphorism Card ---\n');
console.log(AphorismCardGenerator.generateCard(dailyAphorism));

/**
 * How Aphorisms Help in Software Development:
 *
 * 1. Memorable Guidelines: Easy to remember and apply in daily work
 *
 * 2. Team Communication: Shared vocabulary for discussing practices
 *
 * 3. Decision Making: Quick reference for common dilemmas
 *
 * 4. Onboarding: Teach principles to new team members
 *
 * 5. Culture Building: Reinforce values and practices
 *
 * Popular Testing Aphorisms:
 * - "Testing shows presence, not absence of bugs" - Dijkstra
 * - "Test early, test often"
 * - "If it's worth building, it's worth testing"
 * - "The sooner you find a bug, the cheaper it is to fix"
 * - "Automate what should be automated"
 */
