/**
 * Bug Bounty - Crowdsourced Security Testing
 *
 * A bug bounty program is a crowdsourced security initiative that rewards
 * individuals for discovering and reporting security vulnerabilities. The goal
 * is to identify and fix issues before malicious actors exploit them, while
 * incentivizing ethical hackers to responsibly disclose findings.
 *
 * Key Concepts:
 * - Vulnerability classification (severity levels)
 * - Responsible disclosure
 * - Reward tiers based on impact
 * - Scope definition
 * - Triage and validation
 */

// Example 1: Bug Bounty Program Manager
class BugBountyProgram {
  constructor(config) {
    this.programName = config.name;
    this.organization = config.organization;
    this.scope = {
      inScope: config.inScope || [],
      outOfScope: config.outOfScope || [],
      excludedVulnerabilities: config.excludedVulnerabilities || []
    };
    this.rewardTiers = config.rewardTiers || this.getDefaultRewardTiers();
    this.submissions = [];
    this.researchers = new Map();
    this.status = 'active';
  }

  /**
   * Get default reward tiers
   * @returns {object}
   */
  getDefaultRewardTiers() {
    return {
      critical: { min: 5000, max: 25000, description: 'Remote code execution, data breach' },
      high: { min: 2000, max: 5000, description: 'Authentication bypass, SQL injection' },
      medium: { min: 500, max: 2000, description: 'XSS, CSRF, information disclosure' },
      low: { min: 100, max: 500, description: 'Minor issues, best practice violations' },
      informational: { min: 0, max: 100, description: 'Non-exploitable issues' }
    };
  }

  /**
   * Register a security researcher
   * @param {object} researcher - Researcher details
   * @returns {string} - Researcher ID
   */
  registerResearcher(researcher) {
    const id = `R-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.researchers.set(id, {
      id,
      name: researcher.name,
      email: researcher.email,
      handle: researcher.handle,
      registeredAt: new Date(),
      submissions: [],
      totalRewards: 0,
      reputation: 0
    });
    return id;
  }

  /**
   * Submit a vulnerability report
   * @param {string} researcherId - Researcher ID
   * @param {object} report - Vulnerability report
   * @returns {object} - Submission result
   */
  submitReport(researcherId, report) {
    const researcher = this.researchers.get(researcherId);
    if (!researcher) {
      return { success: false, error: 'Researcher not registered' };
    }

    // Validate scope
    if (!this.isInScope(report.target)) {
      return { success: false, error: 'Target is out of scope' };
    }

    // Check for excluded vulnerability types
    if (this.scope.excludedVulnerabilities.includes(report.vulnerabilityType)) {
      return { success: false, error: 'Vulnerability type is excluded from program' };
    }

    // Check for duplicates
    if (this.isDuplicate(report)) {
      return { success: false, error: 'Duplicate submission' };
    }

    const submission = {
      id: `SUB-${Date.now()}`,
      researcherId,
      title: report.title,
      description: report.description,
      target: report.target,
      vulnerabilityType: report.vulnerabilityType,
      severity: report.suggestedSeverity,
      stepsToReproduce: report.stepsToReproduce,
      proofOfConcept: report.proofOfConcept,
      impact: report.impact,
      submittedAt: new Date(),
      status: 'new',
      validatedSeverity: null,
      reward: null,
      timeline: [{
        status: 'new',
        timestamp: new Date(),
        note: 'Report submitted'
      }]
    };

    this.submissions.push(submission);
    researcher.submissions.push(submission.id);

    return {
      success: true,
      submissionId: submission.id,
      message: 'Report submitted successfully. You will be notified of triage results.'
    };
  }

  /**
   * Check if target is in scope
   * @param {string} target - Target to check
   * @returns {boolean}
   */
  isInScope(target) {
    // Check explicit out of scope first
    for (const pattern of this.scope.outOfScope) {
      if (this.matchesPattern(target, pattern)) {
        return false;
      }
    }

    // Check if in scope
    for (const pattern of this.scope.inScope) {
      if (this.matchesPattern(target, pattern)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Match target against pattern
   * @param {string} target - Target string
   * @param {string} pattern - Pattern (supports *)
   * @returns {boolean}
   */
  matchesPattern(target, pattern) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(target);
  }

  /**
   * Check for duplicate submissions
   * @param {object} report - New report
   * @returns {boolean}
   */
  isDuplicate(report) {
    return this.submissions.some(sub =>
      sub.target === report.target &&
      sub.vulnerabilityType === report.vulnerabilityType &&
      sub.status !== 'invalid' &&
      sub.status !== 'closed'
    );
  }

  /**
   * Triage a submission
   * @param {string} submissionId - Submission ID
   * @param {object} triageResult - Triage details
   * @returns {object}
   */
  triageSubmission(submissionId, triageResult) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (!submission) {
      return { success: false, error: 'Submission not found' };
    }

    submission.validatedSeverity = triageResult.severity;
    submission.status = triageResult.status; // 'triaged', 'invalid', 'duplicate', 'informational'

    submission.timeline.push({
      status: submission.status,
      timestamp: new Date(),
      note: triageResult.note || 'Triage completed'
    });

    // Calculate reward if valid
    if (triageResult.status === 'triaged') {
      const tier = this.rewardTiers[triageResult.severity];
      submission.reward = triageResult.reward || tier.min;
    }

    return {
      success: true,
      submission: {
        id: submission.id,
        status: submission.status,
        severity: submission.validatedSeverity,
        reward: submission.reward
      }
    };
  }

  /**
   * Resolve and pay out a submission
   * @param {string} submissionId - Submission ID
   * @param {object} resolution - Resolution details
   * @returns {object}
   */
  resolveSubmission(submissionId, resolution) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (!submission) {
      return { success: false, error: 'Submission not found' };
    }

    submission.status = 'resolved';
    submission.resolution = {
      fixedIn: resolution.fixedIn,
      fixVerified: resolution.fixVerified,
      publicDisclosure: resolution.publicDisclosure,
      disclosureDate: resolution.disclosureDate
    };

    submission.timeline.push({
      status: 'resolved',
      timestamp: new Date(),
      note: resolution.note || 'Vulnerability fixed and verified'
    });

    // Update researcher stats
    if (submission.reward > 0) {
      const researcher = this.researchers.get(submission.researcherId);
      if (researcher) {
        researcher.totalRewards += submission.reward;
        researcher.reputation += this.calculateReputationPoints(submission.validatedSeverity);
      }
    }

    return {
      success: true,
      message: `Submission resolved. Reward: $${submission.reward}`
    };
  }

  /**
   * Calculate reputation points for severity
   * @param {string} severity - Vulnerability severity
   * @returns {number}
   */
  calculateReputationPoints(severity) {
    const points = {
      critical: 100,
      high: 50,
      medium: 25,
      low: 10,
      informational: 5
    };
    return points[severity] || 0;
  }

  /**
   * Get program statistics
   * @returns {object}
   */
  getStatistics() {
    const byStatus = this.submissions.reduce((acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1;
      return acc;
    }, {});

    const bySeverity = this.submissions.reduce((acc, sub) => {
      if (sub.validatedSeverity) {
        acc[sub.validatedSeverity] = (acc[sub.validatedSeverity] || 0) + 1;
      }
      return acc;
    }, {});

    const totalPaid = this.submissions
      .filter(s => s.status === 'resolved')
      .reduce((sum, s) => sum + (s.reward || 0), 0);

    return {
      program: this.programName,
      status: this.status,
      researchers: this.researchers.size,
      submissions: {
        total: this.submissions.length,
        byStatus,
        bySeverity
      },
      rewards: {
        totalPaid,
        averageReward: this.submissions.length > 0
          ? (totalPaid / this.submissions.filter(s => s.reward).length).toFixed(2)
          : 0
      },
      topResearchers: this.getTopResearchers(5)
    };
  }

  /**
   * Get top researchers by reputation
   * @param {number} limit - Number of researchers
   * @returns {Array}
   */
  getTopResearchers(limit) {
    return Array.from(this.researchers.values())
      .sort((a, b) => b.reputation - a.reputation)
      .slice(0, limit)
      .map(r => ({
        handle: r.handle,
        reputation: r.reputation,
        submissions: r.submissions.length,
        totalRewards: r.totalRewards
      }));
  }
}

// Example 2: Vulnerability Classifier
class VulnerabilityClassifier {
  static classifications = {
    // Critical
    'remote_code_execution': { severity: 'critical', cvss: '9.0-10.0' },
    'sql_injection_rce': { severity: 'critical', cvss: '9.0-10.0' },
    'authentication_bypass_admin': { severity: 'critical', cvss: '9.0-10.0' },

    // High
    'sql_injection': { severity: 'high', cvss: '7.0-8.9' },
    'authentication_bypass': { severity: 'high', cvss: '7.0-8.9' },
    'ssrf': { severity: 'high', cvss: '7.0-8.9' },
    'xxe': { severity: 'high', cvss: '7.0-8.9' },
    'idor_sensitive_data': { severity: 'high', cvss: '7.0-8.9' },

    // Medium
    'xss_stored': { severity: 'medium', cvss: '4.0-6.9' },
    'xss_reflected': { severity: 'medium', cvss: '4.0-6.9' },
    'csrf': { severity: 'medium', cvss: '4.0-6.9' },
    'information_disclosure': { severity: 'medium', cvss: '4.0-6.9' },
    'idor': { severity: 'medium', cvss: '4.0-6.9' },

    // Low
    'xss_self': { severity: 'low', cvss: '1.0-3.9' },
    'missing_headers': { severity: 'low', cvss: '1.0-3.9' },
    'verbose_errors': { severity: 'low', cvss: '1.0-3.9' },
    'rate_limiting': { severity: 'low', cvss: '1.0-3.9' },

    // Informational
    'best_practice': { severity: 'informational', cvss: '0.0' },
    'theoretical': { severity: 'informational', cvss: '0.0' }
  };

  /**
   * Classify a vulnerability
   * @param {string} type - Vulnerability type
   * @param {object} context - Additional context
   * @returns {object}
   */
  static classify(type, context = {}) {
    const base = this.classifications[type];
    if (!base) {
      return { severity: 'informational', cvss: '0.0', note: 'Unknown vulnerability type' };
    }

    let severity = base.severity;

    // Adjust based on context
    if (context.requiresAuthentication && severity !== 'informational') {
      // Slightly lower severity if auth required
      const severityOrder = ['critical', 'high', 'medium', 'low', 'informational'];
      const currentIndex = severityOrder.indexOf(severity);
      if (currentIndex < severityOrder.length - 1) {
        severity = severityOrder[currentIndex + 1];
      }
    }

    if (context.affectsSensitiveData) {
      // Increase severity for sensitive data
      const severityOrder = ['critical', 'high', 'medium', 'low', 'informational'];
      const currentIndex = severityOrder.indexOf(severity);
      if (currentIndex > 0) {
        severity = severityOrder[currentIndex - 1];
      }
    }

    return {
      type,
      severity,
      cvss: base.cvss,
      context
    };
  }
}

// Example 3: Submission Report Generator
class SubmissionReportGenerator {
  /**
   * Generate a well-formatted submission report
   * @param {object} data - Report data
   * @returns {string}
   */
  static generate(data) {
    let report = `# Security Vulnerability Report\n\n`;

    report += `## Summary\n`;
    report += `- **Title:** ${data.title}\n`;
    report += `- **Type:** ${data.vulnerabilityType}\n`;
    report += `- **Severity:** ${data.severity}\n`;
    report += `- **Target:** ${data.target}\n\n`;

    report += `## Description\n`;
    report += `${data.description}\n\n`;

    report += `## Steps to Reproduce\n`;
    data.stepsToReproduce.forEach((step, i) => {
      report += `${i + 1}. ${step}\n`;
    });
    report += '\n';

    if (data.proofOfConcept) {
      report += `## Proof of Concept\n`;
      report += '```\n' + data.proofOfConcept + '\n```\n\n';
    }

    report += `## Impact\n`;
    report += `${data.impact}\n\n`;

    if (data.remediation) {
      report += `## Suggested Remediation\n`;
      report += `${data.remediation}\n\n`;
    }

    report += `## Supporting Materials\n`;
    if (data.screenshots?.length > 0) {
      data.screenshots.forEach((ss, i) => {
        report += `- Screenshot ${i + 1}: ${ss}\n`;
      });
    } else {
      report += `- No screenshots provided\n`;
    }

    return report;
  }
}

// Example 4: Responsible Disclosure Timeline
class ResponsibleDisclosureTimeline {
  constructor(submissionDate) {
    this.submissionDate = new Date(submissionDate);
    this.events = [{
      date: this.submissionDate,
      event: 'Initial Report Submitted',
      status: 'completed'
    }];
  }

  /**
   * Get standard disclosure timeline
   * @returns {Array}
   */
  getStandardTimeline() {
    const timeline = [
      { daysAfter: 0, event: 'Initial Report Submitted', description: 'Researcher submits report' },
      { daysAfter: 1, event: 'Acknowledgment', description: 'Vendor acknowledges receipt' },
      { daysAfter: 5, event: 'Initial Triage', description: 'Vendor validates and classifies' },
      { daysAfter: 30, event: 'Fix Development', description: 'Vendor develops fix' },
      { daysAfter: 60, event: 'Fix Deployed', description: 'Fix released to production' },
      { daysAfter: 90, event: 'Public Disclosure', description: 'Details can be publicly disclosed' }
    ];

    return timeline.map(t => ({
      ...t,
      targetDate: new Date(this.submissionDate.getTime() + t.daysAfter * 24 * 60 * 60 * 1000)
    }));
  }

  /**
   * Add event to timeline
   * @param {string} event - Event name
   * @param {Date} date - Event date
   */
  addEvent(event, date = new Date()) {
    this.events.push({
      date,
      event,
      status: 'completed'
    });
  }

  /**
   * Check if disclosure is appropriate
   * @param {number} standardDays - Standard disclosure period (default 90)
   * @returns {object}
   */
  canDisclose(standardDays = 90) {
    const disclosureDate = new Date(
      this.submissionDate.getTime() + standardDays * 24 * 60 * 60 * 1000
    );
    const now = new Date();
    const daysRemaining = Math.ceil((disclosureDate - now) / (24 * 60 * 60 * 1000));

    return {
      canDisclose: now >= disclosureDate,
      disclosureDate,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      message: now >= disclosureDate
        ? 'Public disclosure is appropriate under standard responsible disclosure'
        : `Wait ${daysRemaining} more days before public disclosure`
    };
  }
}

// Demonstration
console.log('=== Bug Bounty Program Examples ===\n');

// Create program
const program = new BugBountyProgram({
  name: 'Example Corp Bug Bounty',
  organization: 'Example Corp',
  inScope: [
    '*.example.com',
    'api.example.com/*',
    'example.com/app/*'
  ],
  outOfScope: [
    'blog.example.com',
    'status.example.com'
  ],
  excludedVulnerabilities: [
    'self_xss',
    'logout_csrf',
    'missing_rate_limiting_non_critical'
  ]
});

// Register researcher
const researcherId = program.registerResearcher({
  name: 'Alice Hacker',
  email: 'alice@security.example',
  handle: 'alice_sec'
});

console.log('--- Submitting Vulnerability Report ---\n');

// Submit a report
const submission = program.submitReport(researcherId, {
  title: 'SQL Injection in User Search',
  description: 'The user search functionality is vulnerable to SQL injection attacks.',
  target: 'api.example.com/users/search',
  vulnerabilityType: 'sql_injection',
  suggestedSeverity: 'high',
  stepsToReproduce: [
    'Navigate to api.example.com/users/search',
    "Enter payload: ' OR '1'='1",
    'Observe database error in response'
  ],
  proofOfConcept: "curl 'https://api.example.com/users/search?q=%27%20OR%20%271%27=%271'",
  impact: 'Attacker could extract sensitive user data from the database'
});

console.log('Submission Result:', submission);

// Triage the submission
if (submission.success) {
  const triage = program.triageSubmission(submission.submissionId, {
    severity: 'high',
    status: 'triaged',
    reward: 3000,
    note: 'Confirmed SQL injection vulnerability'
  });
  console.log('\nTriage Result:', triage);
}

// Classify vulnerability
console.log('\n--- Vulnerability Classification ---\n');
const classification = VulnerabilityClassifier.classify('sql_injection', {
  requiresAuthentication: false,
  affectsSensitiveData: true
});
console.log('Classification:', classification);

// Generate report
console.log('\n--- Generated Report Format ---\n');
const reportMarkdown = SubmissionReportGenerator.generate({
  title: 'SQL Injection in User Search',
  vulnerabilityType: 'SQL Injection',
  severity: 'High',
  target: 'api.example.com/users/search',
  description: 'The user search API endpoint is vulnerable to SQL injection.',
  stepsToReproduce: [
    'Navigate to the search endpoint',
    "Enter a malicious payload containing SQL syntax",
    'Observe the database error'
  ],
  proofOfConcept: "curl 'https://api.example.com/users/search?q=%27%20OR%20%271%27=%271'",
  impact: 'Full database access possible',
  remediation: 'Use parameterized queries',
  screenshots: []
});
console.log(reportMarkdown.substring(0, 500) + '...');

// Responsible disclosure timeline
console.log('\n--- Responsible Disclosure Timeline ---\n');
const disclosure = new ResponsibleDisclosureTimeline(new Date());
const timeline = disclosure.getStandardTimeline();
console.log('Standard 90-day timeline:');
timeline.forEach(t => {
  console.log(`  Day ${t.daysAfter}: ${t.event} (${t.targetDate.toLocaleDateString()})`);
});

// Program statistics
console.log('\n--- Program Statistics ---\n');
console.log(JSON.stringify(program.getStatistics(), null, 2));

/**
 * Bug Bounty Best Practices:
 *
 * For Organizations:
 * 1. Define clear scope and rules
 * 2. Respond to reports quickly (within 24-48 hours)
 * 3. Pay fair rewards based on impact
 * 4. Don't prosecute good-faith researchers
 * 5. Fix vulnerabilities promptly
 *
 * For Researchers:
 * 1. Stay within defined scope
 * 2. Don't access or modify user data
 * 3. Document findings thoroughly
 * 4. Report through official channels
 * 5. Follow responsible disclosure timelines
 */
