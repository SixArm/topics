/**
 * Blameless Retrospective - Continuous Improvement Without Blame
 *
 * A blameless retrospective is an agile meeting focused on identifying issues
 * and improvements without placing blame on individuals. It creates a safe
 * environment for honest discussion, promoting a culture of learning and
 * continuous improvement rather than finger-pointing.
 *
 * Key Concepts:
 * - Psychological safety
 * - Systems thinking
 * - Actionable improvements
 * - Learning from failures
 * - Team ownership
 */

// Example 1: Blameless Retrospective Facilitator
class BlamelessRetrospective {
  constructor(sprintName) {
    this.sprintName = sprintName;
    this.date = new Date();
    this.participants = [];
    this.items = {
      wentWell: [],
      needsImprovement: [],
      actionItems: [],
      learnings: []
    };
    this.votes = new Map();
    this.groundRules = [
      'Focus on systems and processes, not individuals',
      'Assume everyone did their best with the information they had',
      'Treat every incident as a learning opportunity',
      'Be specific about observations, not judgments',
      'Maintain confidentiality - what happens in retro stays in retro'
    ];
  }

  /**
   * Add a participant
   * @param {string} name - Participant name
   * @param {string} role - Participant role
   */
  addParticipant(name, role) {
    this.participants.push({
      name,
      role,
      joinedAt: new Date()
    });
  }

  /**
   * Add an item that went well
   * @param {object} item - Item details
   */
  addWentWell(item) {
    this.items.wentWell.push({
      id: `WW-${this.items.wentWell.length + 1}`,
      description: item.description,
      addedBy: item.addedBy,
      category: item.category || 'general',
      timestamp: new Date()
    });
  }

  /**
   * Add an item that needs improvement
   * @param {object} item - Item details
   */
  addNeedsImprovement(item) {
    // Reframe blame-oriented language
    const reframedDescription = this.reframeToBlameless(item.description);

    this.items.needsImprovement.push({
      id: `NI-${this.items.needsImprovement.length + 1}`,
      originalDescription: item.description,
      description: reframedDescription,
      addedBy: item.addedBy,
      category: item.category || 'general',
      systemFactors: item.systemFactors || [],
      timestamp: new Date()
    });
  }

  /**
   * Reframe potentially blame-oriented language to blameless
   * @param {string} description - Original description
   * @returns {string} - Reframed description
   */
  reframeToBlameless(description) {
    const blamePatterns = [
      { pattern: /(\w+) failed to/gi, replacement: 'The process for $1 needs improvement regarding' },
      { pattern: /(\w+) didn't/gi, replacement: 'Our system didn\'t support $1 in' },
      { pattern: /(\w+) forgot to/gi, replacement: 'We need better reminders/automation for' },
      { pattern: /(\w+) broke/gi, replacement: 'The system experienced issues with' },
      { pattern: /(\w+)'s fault/gi, replacement: 'Contributing factors included' },
      { pattern: /because of (\w+)/gi, replacement: 'due to process gaps in' }
    ];

    let reframed = description;
    blamePatterns.forEach(({ pattern, replacement }) => {
      reframed = reframed.replace(pattern, replacement);
    });

    return reframed;
  }

  /**
   * Add a learning from the sprint
   * @param {object} learning - Learning details
   */
  addLearning(learning) {
    this.items.learnings.push({
      id: `L-${this.items.learnings.length + 1}`,
      description: learning.description,
      source: learning.source, // What triggered this learning
      applicableTo: learning.applicableTo || 'team',
      timestamp: new Date()
    });
  }

  /**
   * Add an action item
   * @param {object} action - Action item details
   */
  addActionItem(action) {
    this.items.actionItems.push({
      id: `AI-${this.items.actionItems.length + 1}`,
      description: action.description,
      owner: action.owner || 'Team',
      dueDate: action.dueDate,
      priority: action.priority || 'medium',
      relatedItems: action.relatedItems || [],
      status: 'pending',
      timestamp: new Date()
    });
  }

  /**
   * Vote on an item
   * @param {string} participantName - Who is voting
   * @param {string} itemId - Item to vote for
   */
  vote(participantName, itemId) {
    if (!this.votes.has(itemId)) {
      this.votes.set(itemId, new Set());
    }
    this.votes.get(itemId).add(participantName);
  }

  /**
   * Get vote count for an item
   * @param {string} itemId - Item ID
   * @returns {number}
   */
  getVoteCount(itemId) {
    return this.votes.has(itemId) ? this.votes.get(itemId).size : 0;
  }

  /**
   * Get prioritized items by votes
   * @param {string} category - 'wentWell' or 'needsImprovement'
   * @returns {Array}
   */
  getPrioritizedItems(category) {
    return [...this.items[category]]
      .map(item => ({
        ...item,
        votes: this.getVoteCount(item.id)
      }))
      .sort((a, b) => b.votes - a.votes);
  }

  /**
   * Generate retrospective summary
   * @returns {object}
   */
  generateSummary() {
    return {
      sprint: this.sprintName,
      date: this.date.toISOString(),
      participants: this.participants.length,
      summary: {
        wentWell: this.items.wentWell.length,
        needsImprovement: this.items.needsImprovement.length,
        actionItems: this.items.actionItems.length,
        learnings: this.items.learnings.length
      },
      topWentWell: this.getPrioritizedItems('wentWell').slice(0, 3),
      topImprovements: this.getPrioritizedItems('needsImprovement').slice(0, 3),
      actionItems: this.items.actionItems,
      groundRules: this.groundRules
    };
  }
}

// Example 2: Five Whys Analysis (Blameless Root Cause)
class FiveWhysAnalysis {
  constructor(problem) {
    this.problem = problem;
    this.whys = [];
    this.rootCause = null;
    this.systemFactors = [];
  }

  /**
   * Add a "why" in the chain
   * @param {string} answer - Answer to "Why?"
   * @param {object} options - Additional context
   */
  addWhy(answer, options = {}) {
    const whyNumber = this.whys.length + 1;

    // Reframe personal blame to system factors
    const reframed = this.reframeToSystem(answer);

    this.whys.push({
      level: whyNumber,
      question: whyNumber === 1
        ? `Why did "${this.problem}" happen?`
        : `Why did that happen?`,
      originalAnswer: answer,
      answer: reframed.answer,
      systemFactor: reframed.systemFactor,
      evidence: options.evidence || null
    });

    if (reframed.systemFactor) {
      this.systemFactors.push(reframed.systemFactor);
    }
  }

  /**
   * Reframe answer to focus on system factors
   * @param {string} answer - Original answer
   * @returns {object}
   */
  reframeToSystem(answer) {
    const systemFactors = {
      'forgot': { factor: 'Process Gap', reframe: 'No reminder/checklist system' },
      'didn\'t know': { factor: 'Knowledge Gap', reframe: 'Documentation/training insufficient' },
      'too busy': { factor: 'Resource Constraint', reframe: 'Workload exceeded capacity' },
      'miscommunication': { factor: 'Communication Gap', reframe: 'Communication channels inadequate' },
      'mistake': { factor: 'Human Error', reframe: 'System lacks error prevention' },
      'oversight': { factor: 'Process Gap', reframe: 'Review process incomplete' },
      'rushed': { factor: 'Time Pressure', reframe: 'Schedule didn\'t allow for quality' }
    };

    let reframedAnswer = answer;
    let identifiedFactor = null;

    for (const [trigger, { factor, reframe }] of Object.entries(systemFactors)) {
      if (answer.toLowerCase().includes(trigger)) {
        reframedAnswer = answer.replace(new RegExp(trigger, 'gi'), reframe);
        identifiedFactor = factor;
        break;
      }
    }

    return {
      answer: reframedAnswer,
      systemFactor: identifiedFactor
    };
  }

  /**
   * Set the root cause
   * @param {string} rootCause - Identified root cause
   */
  setRootCause(rootCause) {
    this.rootCause = rootCause;
  }

  /**
   * Get analysis summary
   * @returns {object}
   */
  getSummary() {
    return {
      problem: this.problem,
      whyChain: this.whys,
      rootCause: this.rootCause,
      systemFactors: [...new Set(this.systemFactors)],
      depth: this.whys.length
    };
  }

  /**
   * Generate action recommendations
   * @returns {Array}
   */
  generateRecommendations() {
    const recommendations = [];

    const factorRecommendations = {
      'Process Gap': 'Create/update checklists and standard operating procedures',
      'Knowledge Gap': 'Improve documentation and conduct training sessions',
      'Resource Constraint': 'Review workload distribution and capacity planning',
      'Communication Gap': 'Establish clear communication protocols and channels',
      'Human Error': 'Implement automation and error prevention mechanisms',
      'Time Pressure': 'Review scheduling and allow buffer time for quality'
    };

    this.systemFactors.forEach(factor => {
      if (factorRecommendations[factor]) {
        recommendations.push({
          factor,
          recommendation: factorRecommendations[factor]
        });
      }
    });

    return recommendations;
  }
}

// Example 3: Retrospective Format Templates
class RetrospectiveFormats {
  /**
   * Start-Stop-Continue format
   * @returns {object}
   */
  static startStopContinue() {
    return {
      name: 'Start-Stop-Continue',
      categories: [
        { id: 'start', name: 'Start', prompt: 'What should we start doing?' },
        { id: 'stop', name: 'Stop', prompt: 'What should we stop doing?' },
        { id: 'continue', name: 'Continue', prompt: 'What should we continue doing?' }
      ],
      timeBox: { discuss: 30, vote: 5, actionItems: 15 }
    };
  }

  /**
   * 4Ls format (Liked, Learned, Lacked, Longed For)
   * @returns {object}
   */
  static fourLs() {
    return {
      name: '4Ls',
      categories: [
        { id: 'liked', name: 'Liked', prompt: 'What did you like about this sprint?' },
        { id: 'learned', name: 'Learned', prompt: 'What did you learn?' },
        { id: 'lacked', name: 'Lacked', prompt: 'What was lacking?' },
        { id: 'longedFor', name: 'Longed For', prompt: 'What did you wish for?' }
      ],
      timeBox: { discuss: 30, vote: 5, actionItems: 15 }
    };
  }

  /**
   * Sailboat format
   * @returns {object}
   */
  static sailboat() {
    return {
      name: 'Sailboat',
      categories: [
        { id: 'wind', name: 'Wind (Helping)', prompt: 'What pushed us forward?' },
        { id: 'anchor', name: 'Anchor (Hindering)', prompt: 'What held us back?' },
        { id: 'rocks', name: 'Rocks (Risks)', prompt: 'What risks do we see ahead?' },
        { id: 'island', name: 'Island (Goal)', prompt: 'What are we working towards?' }
      ],
      timeBox: { discuss: 35, vote: 5, actionItems: 20 }
    };
  }

  /**
   * Mad-Sad-Glad format
   * @returns {object}
   */
  static madSadGlad() {
    return {
      name: 'Mad-Sad-Glad',
      categories: [
        { id: 'mad', name: 'Mad', prompt: 'What frustrated you?' },
        { id: 'sad', name: 'Sad', prompt: 'What disappointed you?' },
        { id: 'glad', name: 'Glad', prompt: 'What made you happy?' }
      ],
      timeBox: { discuss: 25, vote: 5, actionItems: 15 }
    };
  }
}

// Example 4: Action Item Tracker
class ActionItemTracker {
  constructor() {
    this.actionItems = [];
    this.completedItems = [];
  }

  /**
   * Add action item from retrospective
   * @param {object} item - Action item
   * @param {string} retroId - Retrospective ID
   */
  addItem(item, retroId) {
    this.actionItems.push({
      ...item,
      id: `AI-${Date.now()}`,
      retroId,
      createdAt: new Date(),
      status: 'pending',
      updates: []
    });
  }

  /**
   * Update item status
   * @param {string} itemId - Item ID
   * @param {string} status - New status
   * @param {string} note - Optional note
   */
  updateStatus(itemId, status, note = '') {
    const item = this.actionItems.find(i => i.id === itemId);
    if (item) {
      item.status = status;
      item.updates.push({
        status,
        note,
        timestamp: new Date()
      });

      if (status === 'completed') {
        item.completedAt = new Date();
        this.completedItems.push(item);
        this.actionItems = this.actionItems.filter(i => i.id !== itemId);
      }
    }
  }

  /**
   * Get items due soon
   * @param {number} days - Days threshold
   * @returns {Array}
   */
  getItemsDueSoon(days = 7) {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() + days);

    return this.actionItems.filter(item =>
      item.dueDate && new Date(item.dueDate) <= threshold
    );
  }

  /**
   * Get completion rate
   * @returns {object}
   */
  getCompletionRate() {
    const total = this.actionItems.length + this.completedItems.length;
    return {
      total,
      completed: this.completedItems.length,
      pending: this.actionItems.length,
      rate: total > 0 ? ((this.completedItems.length / total) * 100).toFixed(1) + '%' : '0%'
    };
  }

  /**
   * Get overdue items
   * @returns {Array}
   */
  getOverdueItems() {
    const now = new Date();
    return this.actionItems.filter(item =>
      item.dueDate && new Date(item.dueDate) < now
    );
  }
}

// Example 5: Retrospective Metrics
class RetrospectiveMetrics {
  constructor() {
    this.retrospectives = [];
  }

  /**
   * Record a retrospective
   * @param {object} retro - Retrospective summary
   */
  recordRetrospective(retro) {
    this.retrospectives.push({
      ...retro,
      recordedAt: new Date()
    });
  }

  /**
   * Calculate team health trends
   * @returns {object}
   */
  calculateTrends() {
    if (this.retrospectives.length < 2) {
      return { message: 'Need at least 2 retrospectives for trends' };
    }

    const recent = this.retrospectives.slice(-5);
    const wentWellTrend = recent.map(r => r.summary.wentWell);
    const improvementTrend = recent.map(r => r.summary.needsImprovement);

    const avgWentWell = wentWellTrend.reduce((a, b) => a + b, 0) / wentWellTrend.length;
    const avgImprovements = improvementTrend.reduce((a, b) => a + b, 0) / improvementTrend.length;

    const ratio = avgWentWell / (avgImprovements || 1);

    return {
      averageWentWell: avgWentWell.toFixed(1),
      averageImprovements: avgImprovements.toFixed(1),
      positivityRatio: ratio.toFixed(2),
      trend: ratio > 1.5 ? 'positive' : ratio < 0.8 ? 'concerning' : 'balanced',
      recommendation: ratio < 0.8
        ? 'Team may need support - consider team building'
        : 'Team health appears good'
    };
  }

  /**
   * Get recurring themes
   * @returns {object}
   */
  getRecurringThemes() {
    const themes = {};

    this.retrospectives.forEach(retro => {
      retro.topImprovements?.forEach(item => {
        const category = item.category || 'general';
        themes[category] = (themes[category] || 0) + 1;
      });
    });

    const sorted = Object.entries(themes)
      .sort((a, b) => b[1] - a[1])
      .map(([theme, count]) => ({ theme, occurrences: count }));

    return {
      themes: sorted,
      topRecurring: sorted[0]?.theme || 'none',
      recommendation: sorted[0]?.occurrences > 2
        ? `"${sorted[0].theme}" appears frequently - consider focused improvement`
        : 'No strong recurring themes'
    };
  }
}

// Demonstration
console.log('=== Blameless Retrospective Examples ===\n');

// Create retrospective
const retro = new BlamelessRetrospective('Sprint 23');

retro.addParticipant('Alice', 'Developer');
retro.addParticipant('Bob', 'QA');
retro.addParticipant('Carol', 'Product Owner');

// Add items
retro.addWentWell({
  description: 'Great collaboration on the payment feature',
  addedBy: 'Alice',
  category: 'teamwork'
});

retro.addWentWell({
  description: 'Test automation coverage improved significantly',
  addedBy: 'Bob',
  category: 'quality'
});

// Note how blame-oriented language gets reframed
retro.addNeedsImprovement({
  description: 'Bob forgot to update the test documentation',
  addedBy: 'Alice',
  category: 'documentation'
});

retro.addNeedsImprovement({
  description: 'Team didn\'t communicate well about API changes',
  addedBy: 'Carol',
  category: 'communication'
});

retro.addLearning({
  description: 'Pair programming significantly reduced bugs',
  source: 'payment feature success'
});

retro.addActionItem({
  description: 'Create automated reminder for documentation updates',
  owner: 'Team',
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  priority: 'high'
});

// Vote on items
retro.vote('Alice', 'NI-1');
retro.vote('Bob', 'NI-1');
retro.vote('Carol', 'NI-2');

console.log('--- Retrospective Summary ---\n');
const summary = retro.generateSummary();
console.log(`Sprint: ${summary.sprint}`);
console.log(`Participants: ${summary.participants}`);
console.log('\nGround Rules:');
summary.groundRules.forEach(rule => console.log(`  - ${rule}`));

console.log('\nTop Improvements (with blameless reframing):');
summary.topImprovements.forEach(item => {
  console.log(`  Original: "${item.originalDescription}"`);
  console.log(`  Reframed: "${item.description}"`);
  console.log(`  Votes: ${item.votes}\n`);
});

// Five Whys Analysis
console.log('--- Five Whys Analysis ---\n');
const fiveWhys = new FiveWhysAnalysis('Production outage lasted 2 hours');

fiveWhys.addWhy('The deployment broke the database connection', { evidence: 'Error logs' });
fiveWhys.addWhy('The config file had wrong credentials', { evidence: 'Config diff' });
fiveWhys.addWhy('Developer forgot to update credentials for production', { evidence: 'Interview' });
fiveWhys.addWhy('No checklist exists for deployment preparation', { evidence: 'Process review' });
fiveWhys.addWhy('Process documentation was never prioritized', { evidence: 'Backlog' });

fiveWhys.setRootCause('Lack of standardized deployment checklist and process documentation');

const analysis = fiveWhys.getSummary();
console.log(`Problem: ${analysis.problem}`);
console.log(`Root Cause: ${analysis.rootCause}`);
console.log(`System Factors: ${analysis.systemFactors.join(', ')}`);
console.log('\nRecommendations:');
fiveWhys.generateRecommendations().forEach(r => {
  console.log(`  - ${r.factor}: ${r.recommendation}`);
});

/**
 * Blameless Retrospective Best Practices:
 *
 * 1. Establish psychological safety before starting
 *
 * 2. Focus on systems and processes, not individuals
 *
 * 3. Use "we" language instead of "you/they"
 *
 * 4. Assume everyone did their best with available information
 *
 * 5. Look for patterns across multiple sprints
 *
 * 6. Create specific, actionable improvements
 *
 * 7. Follow up on action items from previous retros
 *
 * 8. Vary formats to keep engagement high
 *
 * 9. Time-box discussions to stay focused
 *
 * 10. Celebrate wins as much as analyzing problems
 */
