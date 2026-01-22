/**
 * After-Action Report (AAR) - Structured Review and Analysis
 *
 * An After-Action Report (AAR) is a structured review conducted after an event
 * or project to identify what worked well, what didn't, and recommendations
 * for improvement. AARs are used across military, emergency services, and
 * business contexts to evaluate effectiveness and capture lessons learned.
 *
 * Key Concepts:
 * - SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
 * - Root cause analysis
 * - Stakeholder feedback collection
 * - Actionable recommendations
 * - Implementation planning
 */

// Example 1: After-Action Report Generator
class AfterActionReport {
  constructor(eventDetails) {
    this.event = {
      name: eventDetails.name,
      date: eventDetails.date || new Date(),
      type: eventDetails.type,
      duration: eventDetails.duration,
      description: eventDetails.description
    };

    this.objectives = [];
    this.participants = [];
    this.observations = [];
    this.analysis = null;
    this.recommendations = [];
    this.implementationPlan = [];
  }

  /**
   * Add an objective that was set for the event
   * @param {object} objective - Objective details
   */
  addObjective(objective) {
    this.objectives.push({
      id: `OBJ-${this.objectives.length + 1}`,
      description: objective.description,
      measurable: objective.measurable,
      achieved: objective.achieved || null,
      achievementLevel: objective.achievementLevel || null, // percentage
      notes: objective.notes || ''
    });
  }

  /**
   * Add a participant to the report
   * @param {object} participant - Participant details
   */
  addParticipant(participant) {
    this.participants.push({
      name: participant.name,
      role: participant.role,
      department: participant.department,
      feedbackProvided: false,
      feedback: null
    });
  }

  /**
   * Add an observation from the event
   * @param {object} observation - Observation details
   */
  addObservation(observation) {
    this.observations.push({
      id: `OBS-${this.observations.length + 1}`,
      category: observation.category, // 'success', 'challenge', 'issue', 'neutral'
      description: observation.description,
      impact: observation.impact || 'medium', // 'low', 'medium', 'high', 'critical'
      phase: observation.phase,
      reportedBy: observation.reportedBy,
      timestamp: observation.timestamp || new Date()
    });
  }

  /**
   * Collect feedback from a participant
   * @param {string} participantName - Name of participant
   * @param {object} feedback - Feedback content
   */
  collectFeedback(participantName, feedback) {
    const participant = this.participants.find(p => p.name === participantName);
    if (participant) {
      participant.feedbackProvided = true;
      participant.feedback = {
        whatWorkedWell: feedback.whatWorkedWell || [],
        whatNeedsImprovement: feedback.whatNeedsImprovement || [],
        suggestions: feedback.suggestions || [],
        overallRating: feedback.overallRating, // 1-5
        comments: feedback.comments || '',
        submittedAt: new Date()
      };
    }
  }

  /**
   * Perform SWOT analysis on the event
   * @param {object} swotData - SWOT analysis data
   */
  performSWOTAnalysis(swotData) {
    this.analysis = {
      type: 'SWOT',
      strengths: swotData.strengths || [],
      weaknesses: swotData.weaknesses || [],
      opportunities: swotData.opportunities || [],
      threats: swotData.threats || [],
      conductedAt: new Date()
    };
  }

  /**
   * Add a recommendation based on findings
   * @param {object} recommendation - Recommendation details
   */
  addRecommendation(recommendation) {
    this.recommendations.push({
      id: `REC-${this.recommendations.length + 1}`,
      title: recommendation.title,
      description: recommendation.description,
      priority: recommendation.priority || 'medium', // 'low', 'medium', 'high', 'critical'
      category: recommendation.category,
      relatedObservations: recommendation.relatedObservations || [],
      estimatedEffort: recommendation.estimatedEffort,
      expectedImpact: recommendation.expectedImpact
    });
  }

  /**
   * Create implementation plan for recommendations
   * @param {string} recommendationId - ID of recommendation
   * @param {object} planDetails - Implementation plan details
   */
  createImplementationPlan(recommendationId, planDetails) {
    const recommendation = this.recommendations.find(r => r.id === recommendationId);
    if (recommendation) {
      this.implementationPlan.push({
        recommendationId,
        recommendationTitle: recommendation.title,
        owner: planDetails.owner,
        deadline: planDetails.deadline,
        milestones: planDetails.milestones || [],
        resources: planDetails.resources || [],
        dependencies: planDetails.dependencies || [],
        status: 'planned',
        progress: 0
      });
    }
  }

  /**
   * Calculate overall event success metrics
   * @returns {object} - Success metrics
   */
  calculateMetrics() {
    // Objective achievement rate
    const achievedObjectives = this.objectives.filter(o => o.achieved === true).length;
    const objectiveAchievementRate = this.objectives.length > 0
      ? (achievedObjectives / this.objectives.length * 100).toFixed(1)
      : 0;

    // Observation breakdown
    const observationsByCategory = this.observations.reduce((acc, obs) => {
      acc[obs.category] = (acc[obs.category] || 0) + 1;
      return acc;
    }, {});

    // Feedback metrics
    const feedbackProviders = this.participants.filter(p => p.feedbackProvided);
    const feedbackRate = this.participants.length > 0
      ? (feedbackProviders.length / this.participants.length * 100).toFixed(1)
      : 0;

    const avgRating = feedbackProviders.length > 0
      ? (feedbackProviders.reduce((sum, p) => sum + (p.feedback?.overallRating || 0), 0)
         / feedbackProviders.length).toFixed(2)
      : 0;

    return {
      objectiveAchievementRate: `${objectiveAchievementRate}%`,
      totalObjectives: this.objectives.length,
      achievedObjectives,
      observationsByCategory,
      participantCount: this.participants.length,
      feedbackResponseRate: `${feedbackRate}%`,
      averageRating: `${avgRating}/5`,
      recommendationCount: this.recommendations.length,
      criticalRecommendations: this.recommendations.filter(r => r.priority === 'critical').length
    };
  }

  /**
   * Generate the complete AAR document
   * @returns {object} - Complete report
   */
  generateReport() {
    return {
      title: `After-Action Report: ${this.event.name}`,
      generatedAt: new Date().toISOString(),
      event: this.event,
      objectives: this.objectives,
      participants: this.participants.map(p => ({
        name: p.name,
        role: p.role,
        feedbackProvided: p.feedbackProvided
      })),
      observations: this.observations,
      analysis: this.analysis,
      recommendations: this.recommendations,
      implementationPlan: this.implementationPlan,
      metrics: this.calculateMetrics()
    };
  }

  /**
   * Export report to markdown format
   * @returns {string} - Markdown formatted report
   */
  toMarkdown() {
    const metrics = this.calculateMetrics();
    let md = `# After-Action Report: ${this.event.name}\n\n`;
    md += `**Date:** ${this.event.date.toLocaleDateString()}\n`;
    md += `**Type:** ${this.event.type}\n`;
    md += `**Duration:** ${this.event.duration}\n\n`;

    md += `## Executive Summary\n\n`;
    md += `${this.event.description}\n\n`;

    md += `## Objectives\n\n`;
    this.objectives.forEach(obj => {
      const status = obj.achieved ? '✓' : '✗';
      md += `- [${status}] ${obj.description}\n`;
      if (obj.achievementLevel) {
        md += `  - Achievement Level: ${obj.achievementLevel}%\n`;
      }
    });
    md += '\n';

    md += `## Key Metrics\n\n`;
    md += `| Metric | Value |\n`;
    md += `|--------|-------|\n`;
    md += `| Objective Achievement | ${metrics.objectiveAchievementRate} |\n`;
    md += `| Feedback Response Rate | ${metrics.feedbackResponseRate} |\n`;
    md += `| Average Rating | ${metrics.averageRating} |\n`;
    md += `| Recommendations | ${metrics.recommendationCount} |\n\n`;

    if (this.analysis) {
      md += `## SWOT Analysis\n\n`;
      md += `### Strengths\n`;
      this.analysis.strengths.forEach(s => md += `- ${s}\n`);
      md += `\n### Weaknesses\n`;
      this.analysis.weaknesses.forEach(w => md += `- ${w}\n`);
      md += `\n### Opportunities\n`;
      this.analysis.opportunities.forEach(o => md += `- ${o}\n`);
      md += `\n### Threats\n`;
      this.analysis.threats.forEach(t => md += `- ${t}\n`);
      md += '\n';
    }

    md += `## Recommendations\n\n`;
    this.recommendations.forEach(rec => {
      md += `### ${rec.id}: ${rec.title}\n`;
      md += `**Priority:** ${rec.priority}\n\n`;
      md += `${rec.description}\n\n`;
    });

    return md;
  }
}

// Example 2: Root Cause Analysis Tool
class RootCauseAnalysis {
  constructor(issue) {
    this.issue = issue;
    this.whyChain = [];
    this.contributingFactors = [];
    this.rootCauses = [];
  }

  /**
   * Perform 5 Whys analysis
   * @param {Array} whys - Array of why questions and answers
   */
  performFiveWhys(whys) {
    this.whyChain = whys.map((item, index) => ({
      level: index + 1,
      question: `Why ${index === 0 ? 'did this happen' : 'was that'}?`,
      answer: item.answer,
      evidence: item.evidence || null
    }));

    // The last answer is typically the root cause
    if (this.whyChain.length > 0) {
      this.rootCauses.push({
        description: this.whyChain[this.whyChain.length - 1].answer,
        identifiedVia: '5 Whys Analysis',
        confidence: 'high'
      });
    }
  }

  /**
   * Add a contributing factor
   * @param {object} factor - Factor details
   */
  addContributingFactor(factor) {
    this.contributingFactors.push({
      category: factor.category, // 'people', 'process', 'technology', 'environment'
      description: factor.description,
      impact: factor.impact,
      controllable: factor.controllable
    });
  }

  /**
   * Generate Fishbone (Ishikawa) diagram data
   * @returns {object} - Fishbone diagram structure
   */
  generateFishbone() {
    const categories = {
      people: [],
      process: [],
      technology: [],
      environment: [],
      materials: [],
      measurement: []
    };

    this.contributingFactors.forEach(factor => {
      if (categories[factor.category]) {
        categories[factor.category].push(factor.description);
      }
    });

    return {
      effect: this.issue,
      causes: categories
    };
  }

  /**
   * Get analysis summary
   * @returns {object}
   */
  getSummary() {
    return {
      issue: this.issue,
      fiveWhysDepth: this.whyChain.length,
      rootCauses: this.rootCauses,
      contributingFactorCount: this.contributingFactors.length,
      factorsByCategory: this.contributingFactors.reduce((acc, f) => {
        acc[f.category] = (acc[f.category] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

// Example 3: Lessons Learned Database
class LessonsLearnedDatabase {
  constructor() {
    this.lessons = [];
    this.tags = new Set();
  }

  /**
   * Add a lesson learned
   * @param {object} lesson - Lesson details
   */
  addLesson(lesson) {
    const newLesson = {
      id: `LL-${Date.now()}-${this.lessons.length}`,
      title: lesson.title,
      description: lesson.description,
      context: lesson.context,
      outcome: lesson.outcome, // 'positive' or 'negative'
      recommendation: lesson.recommendation,
      tags: lesson.tags || [],
      project: lesson.project,
      addedAt: new Date(),
      applicableTo: lesson.applicableTo || [],
      timesReferenced: 0
    };

    this.lessons.push(newLesson);
    lesson.tags?.forEach(tag => this.tags.add(tag));

    return newLesson.id;
  }

  /**
   * Search lessons by keyword
   * @param {string} keyword - Search term
   * @returns {Array} - Matching lessons
   */
  search(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return this.lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(lowerKeyword) ||
      lesson.description.toLowerCase().includes(lowerKeyword) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
    );
  }

  /**
   * Get lessons by tag
   * @param {string} tag - Tag to filter by
   * @returns {Array}
   */
  getByTag(tag) {
    return this.lessons.filter(lesson =>
      lesson.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Get lessons applicable to a project type
   * @param {string} projectType - Type of project
   * @returns {Array}
   */
  getApplicableLessons(projectType) {
    return this.lessons.filter(lesson =>
      lesson.applicableTo.includes(projectType) ||
      lesson.applicableTo.length === 0
    );
  }

  /**
   * Mark a lesson as referenced
   * @param {string} lessonId - Lesson ID
   */
  markReferenced(lessonId) {
    const lesson = this.lessons.find(l => l.id === lessonId);
    if (lesson) {
      lesson.timesReferenced++;
    }
  }

  /**
   * Get most referenced lessons
   * @param {number} limit - Number of lessons to return
   * @returns {Array}
   */
  getMostReferenced(limit = 10) {
    return [...this.lessons]
      .sort((a, b) => b.timesReferenced - a.timesReferenced)
      .slice(0, limit);
  }

  /**
   * Get statistics
   * @returns {object}
   */
  getStatistics() {
    const positiveCount = this.lessons.filter(l => l.outcome === 'positive').length;
    const negativeCount = this.lessons.filter(l => l.outcome === 'negative').length;

    return {
      totalLessons: this.lessons.length,
      positiveLessons: positiveCount,
      negativeLessons: negativeCount,
      uniqueTags: this.tags.size,
      totalReferences: this.lessons.reduce((sum, l) => sum + l.timesReferenced, 0)
    };
  }
}

// Demonstration
console.log('=== After-Action Report Example ===\n');

// Create an AAR for a software deployment
const aar = new AfterActionReport({
  name: 'Production Deployment v2.5.0',
  date: new Date('2024-01-15'),
  type: 'Software Release',
  duration: '4 hours',
  description: 'Major release including new authentication system and performance improvements.'
});

// Add objectives
aar.addObjective({
  description: 'Complete deployment with zero downtime',
  measurable: true,
  achieved: true,
  achievementLevel: 100
});

aar.addObjective({
  description: 'All automated tests pass in production',
  measurable: true,
  achieved: false,
  achievementLevel: 95,
  notes: '2 non-critical tests failed due to timing issues'
});

// Add participants
aar.addParticipant({ name: 'Alice Chen', role: 'Tech Lead', department: 'Engineering' });
aar.addParticipant({ name: 'Bob Smith', role: 'DevOps Engineer', department: 'Operations' });
aar.addParticipant({ name: 'Carol Johnson', role: 'QA Lead', department: 'Quality' });

// Add observations
aar.addObservation({
  category: 'success',
  description: 'Blue-green deployment worked flawlessly',
  impact: 'high',
  phase: 'deployment',
  reportedBy: 'Bob Smith'
});

aar.addObservation({
  category: 'challenge',
  description: 'Database migration took longer than expected',
  impact: 'medium',
  phase: 'preparation',
  reportedBy: 'Alice Chen'
});

aar.addObservation({
  category: 'issue',
  description: 'Monitoring alerts were too noisy during deployment',
  impact: 'low',
  phase: 'monitoring',
  reportedBy: 'Bob Smith'
});

// Collect feedback
aar.collectFeedback('Alice Chen', {
  whatWorkedWell: ['Team communication', 'Rollback plan was solid'],
  whatNeedsImprovement: ['Migration testing', 'Alert thresholds'],
  suggestions: ['Add migration dry-run to staging'],
  overallRating: 4,
  comments: 'Good deployment overall, minor improvements needed.'
});

// Perform SWOT analysis
aar.performSWOTAnalysis({
  strengths: [
    'Strong team communication',
    'Effective use of blue-green deployment',
    'Comprehensive rollback plan'
  ],
  weaknesses: [
    'Database migration estimation',
    'Alert threshold configuration',
    'Test timing in production environment'
  ],
  opportunities: [
    'Implement canary deployments',
    'Add migration performance testing',
    'Improve alert intelligence'
  ],
  threats: [
    'Growing database size may impact future migrations',
    'Team capacity during peak deployment periods'
  ]
});

// Add recommendations
aar.addRecommendation({
  title: 'Implement Migration Dry-Run',
  description: 'Add automated dry-run of database migrations in staging environment before production deployment.',
  priority: 'high',
  category: 'process',
  relatedObservations: ['OBS-2'],
  estimatedEffort: 'Medium',
  expectedImpact: 'Reduce migration time uncertainty by 80%'
});

aar.addRecommendation({
  title: 'Tune Deployment Alerts',
  description: 'Create deployment-specific alert profiles with adjusted thresholds.',
  priority: 'medium',
  category: 'tooling',
  relatedObservations: ['OBS-3'],
  estimatedEffort: 'Low',
  expectedImpact: 'Reduce alert noise by 70%'
});

// Create implementation plan
aar.createImplementationPlan('REC-1', {
  owner: 'Bob Smith',
  deadline: new Date('2024-02-15'),
  milestones: [
    { name: 'Design dry-run process', target: new Date('2024-01-25') },
    { name: 'Implement automation', target: new Date('2024-02-05') },
    { name: 'Test and document', target: new Date('2024-02-15') }
  ],
  resources: ['DevOps team', 'Staging environment access'],
  dependencies: ['Updated staging environment']
});

// Generate and display report
const report = aar.generateReport();
console.log('Report Metrics:');
console.log(JSON.stringify(report.metrics, null, 2));

console.log('\n=== Root Cause Analysis Example ===\n');

// Perform root cause analysis on an issue
const rca = new RootCauseAnalysis('Two automated tests failed in production');

rca.performFiveWhys([
  { answer: 'Tests timed out waiting for API responses' },
  { answer: 'API response times were slower than expected' },
  { answer: 'Database connections were being established slowly' },
  { answer: 'Connection pool was exhausted during deployment' },
  { answer: 'Connection pool size was not adjusted for new traffic patterns' }
]);

rca.addContributingFactor({
  category: 'process',
  description: 'No performance testing for new traffic patterns',
  impact: 'high',
  controllable: true
});

rca.addContributingFactor({
  category: 'technology',
  description: 'Connection pool settings were default values',
  impact: 'medium',
  controllable: true
});

console.log('Root Cause Analysis Summary:');
console.log(JSON.stringify(rca.getSummary(), null, 2));

console.log('\n=== Lessons Learned Database Example ===\n');

const lessonsDb = new LessonsLearnedDatabase();

lessonsDb.addLesson({
  title: 'Database migration timing',
  description: 'Large table migrations take significantly longer in production due to table locking.',
  context: 'v2.5.0 deployment',
  outcome: 'negative',
  recommendation: 'Always run migration dry-runs with production-like data volumes.',
  tags: ['deployment', 'database', 'migration'],
  project: 'Main Platform',
  applicableTo: ['backend', 'infrastructure']
});

lessonsDb.addLesson({
  title: 'Blue-green deployment success',
  description: 'Blue-green deployment strategy enabled zero-downtime release.',
  context: 'v2.5.0 deployment',
  outcome: 'positive',
  recommendation: 'Continue using blue-green for all major releases.',
  tags: ['deployment', 'devops', 'best-practice'],
  project: 'Main Platform',
  applicableTo: ['backend', 'frontend', 'infrastructure']
});

console.log('Lessons Database Statistics:');
console.log(JSON.stringify(lessonsDb.getStatistics(), null, 2));

console.log('\nLessons tagged "deployment":');
lessonsDb.getByTag('deployment').forEach(lesson => {
  console.log(`  - ${lesson.title} (${lesson.outcome})`);
});

/**
 * AAR Best Practices:
 *
 * 1. Conduct Soon After Event: Memories fade, conduct AARs within 1-2 weeks
 *
 * 2. Include All Stakeholders: Get perspectives from everyone involved
 *
 * 3. Create Safe Environment: Focus on improvement, not blame
 *
 * 4. Be Specific: Use concrete examples, data, and metrics
 *
 * 5. Focus on Actions: Every finding should have an actionable recommendation
 *
 * 6. Track Implementation: Assign owners and deadlines for recommendations
 *
 * 7. Share Lessons: Distribute findings to relevant teams and projects
 *
 * 8. Reference Past AARs: Build on previous lessons learned
 *
 * 9. Measure Impact: Track whether recommendations improve future events
 *
 * 10. Iterate Process: Continuously improve the AAR process itself
 */
