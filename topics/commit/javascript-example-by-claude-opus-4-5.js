/**
 * Commit - Version Control Snapshots
 *
 * In Git, a commit is a snapshot of changes to a project saved to the
 * repository. Each commit represents a specific version of the codebase
 * and includes a message describing the changes. Commits create a complete
 * record of changes over time, enabling tracking, collaboration, and rollback.
 *
 * Key Concepts:
 * - Commit messages
 * - Commit history
 * - Atomic commits
 * - Conventional commits
 * - Commit hooks
 */

// Example 1: Commit Message Analyzer
class CommitMessageAnalyzer {
  constructor() {
    this.conventionalTypes = [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ];
    this.maxSubjectLength = 72;
    this.maxBodyLineLength = 100;
  }

  /**
   * Analyze a commit message
   * @param {string} message - Commit message
   * @returns {object} - Analysis result
   */
  analyze(message) {
    const lines = message.split('\n');
    const subject = lines[0] || '';
    const body = lines.slice(2).join('\n').trim();

    const issues = [];
    const suggestions = [];

    // Check subject line
    this.analyzeSubject(subject, issues, suggestions);

    // Check body if present
    if (body) {
      this.analyzeBody(body, issues, suggestions);
    }

    // Parse conventional commit format
    const conventional = this.parseConventional(subject);

    return {
      subject,
      body: body || null,
      conventional,
      quality: this.calculateQuality(issues),
      issues,
      suggestions,
      stats: {
        subjectLength: subject.length,
        bodyLength: body.length,
        lineCount: lines.filter(l => l.trim()).length
      }
    };
  }

  /**
   * Analyze subject line
   * @param {string} subject - Subject line
   * @param {Array} issues - Issues array
   * @param {Array} suggestions - Suggestions array
   */
  analyzeSubject(subject, issues, suggestions) {
    // Check length
    if (subject.length > this.maxSubjectLength) {
      issues.push({
        severity: 'warning',
        message: `Subject exceeds ${this.maxSubjectLength} characters (${subject.length})`
      });
    }

    if (subject.length < 10) {
      issues.push({
        severity: 'warning',
        message: 'Subject is too short - be more descriptive'
      });
    }

    // Check capitalization
    const firstWord = subject.split(/[:\s]/)[0];
    if (firstWord && firstWord[0] === firstWord[0].toUpperCase() &&
        !this.conventionalTypes.includes(firstWord.toLowerCase())) {
      suggestions.push('Consider starting with lowercase (conventional style)');
    }

    // Check for period at end
    if (subject.endsWith('.')) {
      issues.push({
        severity: 'info',
        message: 'Subject should not end with a period'
      });
    }

    // Check for imperative mood (simple heuristic)
    const pastTenseIndicators = ['added', 'fixed', 'changed', 'updated', 'removed'];
    const firstSubjectWord = subject.split(/[\s(:]/)[0].toLowerCase();
    if (pastTenseIndicators.includes(firstSubjectWord)) {
      suggestions.push('Use imperative mood: "Add" not "Added"');
    }
  }

  /**
   * Analyze commit body
   * @param {string} body - Commit body
   * @param {Array} issues - Issues array
   * @param {Array} suggestions - Suggestions array
   */
  analyzeBody(body, issues, suggestions) {
    const lines = body.split('\n');

    // Check line lengths
    const longLines = lines.filter(l => l.length > this.maxBodyLineLength);
    if (longLines.length > 0) {
      issues.push({
        severity: 'info',
        message: `${longLines.length} line(s) exceed ${this.maxBodyLineLength} characters`
      });
    }

    // Check for references
    const hasReference = /(?:#\d+|[A-Z]+-\d+|https?:\/\/)/.test(body);
    if (!hasReference) {
      suggestions.push('Consider adding issue/ticket reference');
    }
  }

  /**
   * Parse conventional commit format
   * @param {string} subject - Subject line
   * @returns {object|null}
   */
  parseConventional(subject) {
    const regex = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;
    const match = subject.match(regex);

    if (!match) {
      return { valid: false, reason: 'Does not follow conventional format' };
    }

    const [, type, scope, breaking, description] = match;

    if (!this.conventionalTypes.includes(type)) {
      return {
        valid: false,
        reason: `Unknown type: ${type}`,
        suggestedTypes: this.conventionalTypes
      };
    }

    return {
      valid: true,
      type,
      scope: scope || null,
      breaking: !!breaking,
      description
    };
  }

  /**
   * Calculate quality score
   * @param {Array} issues - Issues found
   * @returns {object}
   */
  calculateQuality(issues) {
    const errorCount = issues.filter(i => i.severity === 'error').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;
    const infoCount = issues.filter(i => i.severity === 'info').length;

    const score = Math.max(0, 100 - errorCount * 30 - warningCount * 10 - infoCount * 5);

    return {
      score,
      rating: score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'fair' : 'poor'
    };
  }
}

// Example 2: Commit History Analyzer
class CommitHistoryAnalyzer {
  constructor() {
    this.commits = [];
  }

  /**
   * Add a commit to the history
   * @param {object} commit - Commit data
   */
  addCommit(commit) {
    this.commits.push({
      hash: commit.hash,
      message: commit.message,
      author: commit.author,
      date: new Date(commit.date),
      files: commit.files || [],
      additions: commit.additions || 0,
      deletions: commit.deletions || 0
    });
  }

  /**
   * Analyze commit patterns
   * @returns {object}
   */
  analyzePatterns() {
    if (this.commits.length === 0) {
      return { error: 'No commits to analyze' };
    }

    const analyzer = new CommitMessageAnalyzer();

    // Analyze all messages
    const analyses = this.commits.map(c => ({
      hash: c.hash,
      analysis: analyzer.analyze(c.message)
    }));

    // Count commit types
    const typeDistribution = {};
    analyses.forEach(a => {
      if (a.analysis.conventional?.valid) {
        const type = a.analysis.conventional.type;
        typeDistribution[type] = (typeDistribution[type] || 0) + 1;
      }
    });

    // Analyze commit frequency
    const commitsByDay = this.groupByDay();
    const commitsByAuthor = this.groupByAuthor();

    // Code churn analysis
    const totalAdditions = this.commits.reduce((sum, c) => sum + c.additions, 0);
    const totalDeletions = this.commits.reduce((sum, c) => sum + c.deletions, 0);

    return {
      totalCommits: this.commits.length,
      dateRange: {
        first: this.commits[this.commits.length - 1]?.date,
        last: this.commits[0]?.date
      },
      typeDistribution,
      authorDistribution: Object.entries(commitsByAuthor)
        .map(([author, commits]) => ({ author, commits }))
        .sort((a, b) => b.commits - a.commits),
      averageQuality: this.calculateAverageQuality(analyses),
      conventionalCompliance: this.calculateConventionalCompliance(analyses),
      codeChurn: {
        totalAdditions,
        totalDeletions,
        netChange: totalAdditions - totalDeletions,
        churnRatio: totalDeletions > 0 ? (totalAdditions / totalDeletions).toFixed(2) : 'N/A'
      },
      commitsPerDay: (this.commits.length / Object.keys(commitsByDay).length).toFixed(2)
    };
  }

  /**
   * Group commits by day
   * @returns {object}
   */
  groupByDay() {
    return this.commits.reduce((acc, commit) => {
      const day = commit.date.toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Group commits by author
   * @returns {object}
   */
  groupByAuthor() {
    return this.commits.reduce((acc, commit) => {
      acc[commit.author] = (acc[commit.author] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Calculate average quality score
   * @param {Array} analyses - Commit analyses
   * @returns {number}
   */
  calculateAverageQuality(analyses) {
    const scores = analyses.map(a => a.analysis.quality.score);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  }

  /**
   * Calculate conventional commit compliance
   * @param {Array} analyses - Commit analyses
   * @returns {string}
   */
  calculateConventionalCompliance(analyses) {
    const compliant = analyses.filter(a => a.analysis.conventional?.valid).length;
    return ((compliant / analyses.length) * 100).toFixed(1) + '%';
  }
}

// Example 3: Commit Hook Validator
class CommitHookValidator {
  constructor(rules = {}) {
    this.rules = {
      requireConventional: rules.requireConventional || false,
      maxSubjectLength: rules.maxSubjectLength || 72,
      requireBody: rules.requireBody || false,
      requireIssueReference: rules.requireIssueReference || false,
      issuePattern: rules.issuePattern || /#\d+|[A-Z]+-\d+/,
      forbiddenPatterns: rules.forbiddenPatterns || [],
      ...rules
    };
  }

  /**
   * Validate a commit message
   * @param {string} message - Commit message
   * @returns {object}
   */
  validate(message) {
    const errors = [];
    const warnings = [];
    const lines = message.split('\n');
    const subject = lines[0] || '';
    const body = lines.slice(2).join('\n').trim();

    // Subject length
    if (subject.length > this.rules.maxSubjectLength) {
      errors.push(`Subject exceeds ${this.rules.maxSubjectLength} characters`);
    }

    // Conventional commit format
    if (this.rules.requireConventional) {
      const analyzer = new CommitMessageAnalyzer();
      const conventional = analyzer.parseConventional(subject);
      if (!conventional.valid) {
        errors.push(`Not a valid conventional commit: ${conventional.reason}`);
      }
    }

    // Require body
    if (this.rules.requireBody && !body) {
      errors.push('Commit body is required');
    }

    // Issue reference
    if (this.rules.requireIssueReference) {
      const fullMessage = message;
      if (!this.rules.issuePattern.test(fullMessage)) {
        errors.push('Commit must reference an issue (e.g., #123 or JIRA-456)');
      }
    }

    // Forbidden patterns
    for (const pattern of this.rules.forbiddenPatterns) {
      if (pattern.regex.test(message)) {
        errors.push(pattern.message || `Forbidden pattern found: ${pattern.regex}`);
      }
    }

    // Check for WIP commits
    if (/^(WIP|wip|fixup|squash)[:\s!]/i.test(subject)) {
      warnings.push('WIP/fixup/squash commits should be cleaned up before merge');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      canProceed: errors.length === 0
    };
  }

  /**
   * Format validation result for CLI output
   * @param {object} result - Validation result
   * @returns {string}
   */
  formatOutput(result) {
    let output = '';

    if (result.errors.length > 0) {
      output += '\n❌ Commit message validation failed:\n';
      result.errors.forEach(e => output += `   • ${e}\n`);
    }

    if (result.warnings.length > 0) {
      output += '\n⚠️  Warnings:\n';
      result.warnings.forEach(w => output += `   • ${w}\n`);
    }

    if (result.valid) {
      output += '\n✅ Commit message is valid\n';
    }

    return output;
  }
}

// Example 4: Commit Message Generator
class CommitMessageGenerator {
  /**
   * Generate a conventional commit message
   * @param {object} options - Message options
   * @returns {string}
   */
  static generate(options) {
    const {
      type,
      scope,
      breaking,
      description,
      body,
      footer,
      issueRef
    } = options;

    let message = type;

    if (scope) {
      message += `(${scope})`;
    }

    if (breaking) {
      message += '!';
    }

    message += `: ${description}`;

    if (body) {
      message += `\n\n${body}`;
    }

    if (breaking && options.breakingDescription) {
      message += `\n\nBREAKING CHANGE: ${options.breakingDescription}`;
    }

    if (issueRef) {
      message += `\n\nRefs: ${issueRef}`;
    }

    if (footer) {
      message += `\n\n${footer}`;
    }

    return message;
  }

  /**
   * Generate message from diff analysis
   * @param {object} diff - Diff information
   * @returns {object}
   */
  static suggestFromDiff(diff) {
    const suggestions = [];

    // Analyze file types
    const fileTypes = {
      test: diff.files?.filter(f => /\.(test|spec)\.(js|ts)$/.test(f)).length || 0,
      docs: diff.files?.filter(f => /\.(md|txt|rst)$/.test(f)).length || 0,
      config: diff.files?.filter(f => /\.(json|yml|yaml|toml)$/.test(f)).length || 0,
      source: diff.files?.filter(f => /\.(js|ts|py|java|go)$/.test(f)).length || 0
    };

    // Suggest type based on files changed
    if (fileTypes.test > 0 && fileTypes.source === 0) {
      suggestions.push({ type: 'test', reason: 'Only test files modified' });
    } else if (fileTypes.docs > 0 && fileTypes.source === 0) {
      suggestions.push({ type: 'docs', reason: 'Only documentation files modified' });
    } else if (fileTypes.config > 0 && fileTypes.source === 0) {
      suggestions.push({ type: 'chore', reason: 'Only configuration files modified' });
    }

    // Analyze additions vs deletions
    if (diff.additions > 0 && diff.deletions === 0) {
      suggestions.push({ type: 'feat', reason: 'Pure additions suggest new feature' });
    } else if (diff.deletions > diff.additions * 2) {
      suggestions.push({ type: 'refactor', reason: 'Significant deletions suggest cleanup' });
    }

    return {
      suggestions,
      recommendedType: suggestions[0]?.type || 'feat',
      files: diff.files
    };
  }
}

// Demonstration
console.log('=== Commit Message Examples ===\n');

// Analyze commit messages
const analyzer = new CommitMessageAnalyzer();

const messages = [
  'feat(auth): add OAuth2 support for Google login',
  'Fixed the bug',
  'WIP: working on feature',
  'refactor!: rename User to Account across codebase\n\nBREAKING CHANGE: User class no longer exists\n\nRefs: #123'
];

console.log('--- Message Analysis ---\n');
messages.forEach(msg => {
  const result = analyzer.analyze(msg);
  console.log(`Message: "${msg.split('\n')[0]}"`);
  console.log(`  Quality: ${result.quality.rating} (${result.quality.score}/100)`);
  console.log(`  Conventional: ${result.conventional.valid ? 'Yes' : 'No'}`);
  if (result.conventional.valid) {
    console.log(`    Type: ${result.conventional.type}`);
    console.log(`    Breaking: ${result.conventional.breaking}`);
  }
  if (result.issues.length > 0) {
    console.log(`  Issues: ${result.issues.map(i => i.message).join('; ')}`);
  }
  console.log('');
});

// Commit hook validation
console.log('--- Commit Hook Validation ---\n');

const hookValidator = new CommitHookValidator({
  requireConventional: true,
  requireIssueReference: true,
  maxSubjectLength: 72
});

const validationResult = hookValidator.validate('feat(api): add new endpoint for user preferences\n\nImplements the new endpoint.\n\nRefs: #456');
console.log(hookValidator.formatOutput(validationResult));

// Generate commit message
console.log('--- Generated Commit Message ---\n');

const generatedMessage = CommitMessageGenerator.generate({
  type: 'feat',
  scope: 'auth',
  description: 'implement two-factor authentication',
  body: 'Added TOTP-based 2FA with QR code setup.\nUsers can enable/disable 2FA in settings.',
  issueRef: '#789'
});

console.log(generatedMessage);

// History analysis
console.log('\n--- Commit History Analysis ---\n');

const historyAnalyzer = new CommitHistoryAnalyzer();

// Simulate commit history
[
  { hash: 'abc123', message: 'feat(ui): add dark mode toggle', author: 'alice', date: '2024-01-15', additions: 150, deletions: 20 },
  { hash: 'def456', message: 'fix: resolve memory leak in worker', author: 'bob', date: '2024-01-15', additions: 10, deletions: 25 },
  { hash: 'ghi789', message: 'docs: update API documentation', author: 'alice', date: '2024-01-14', additions: 200, deletions: 50 },
  { hash: 'jkl012', message: 'test: add unit tests for auth module', author: 'carol', date: '2024-01-14', additions: 300, deletions: 0 },
  { hash: 'mno345', message: 'refactor(db): optimize query performance', author: 'bob', date: '2024-01-13', additions: 80, deletions: 120 }
].forEach(c => historyAnalyzer.addCommit(c));

const historyAnalysis = historyAnalyzer.analyzePatterns();
console.log(`Total commits: ${historyAnalysis.totalCommits}`);
console.log(`Conventional compliance: ${historyAnalysis.conventionalCompliance}`);
console.log(`Average quality: ${historyAnalysis.averageQuality}`);
console.log(`Type distribution:`, historyAnalysis.typeDistribution);
console.log(`Code churn: +${historyAnalysis.codeChurn.totalAdditions} -${historyAnalysis.codeChurn.totalDeletions}`);

/**
 * Commit Best Practices:
 *
 * 1. Write atomic commits - one logical change per commit
 *
 * 2. Use conventional commit format for consistency
 *
 * 3. Write meaningful messages explaining WHY, not just WHAT
 *
 * 4. Keep subject line under 72 characters
 *
 * 5. Use imperative mood: "Add feature" not "Added feature"
 *
 * 6. Reference issues/tickets when applicable
 *
 * 7. Don't commit broken code
 *
 * 8. Review your diff before committing
 *
 * 9. Separate formatting changes from logic changes
 *
 * 10. Use commit hooks to enforce standards
 */
