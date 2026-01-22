/**
 * Architecture Astronaut - Over-Engineering in Software Development
 *
 * An "architecture astronaut" is a term describing developers who overcomplicate
 * software projects by focusing excessively on architectural design, patterns,
 * and abstractions without real need for such complexity. The term emphasizes
 * the importance of balancing appropriate architectural planning with practical,
 * value-delivering development.
 *
 * Key Concepts:
 * - Over-engineering warning signs
 * - Premature abstraction pitfalls
 * - YAGNI (You Aren't Gonna Need It)
 * - KISS (Keep It Simple, Stupid)
 * - Pragmatic vs. perfectionist approaches
 */

// Example 1: Over-Engineering Detector
class OverEngineeringDetector {
  constructor() {
    this.indicators = [];
    this.thresholds = {
      maxAbstractionLayers: 3,
      maxInterfacesPerClass: 2,
      maxDesignPatternsPerModule: 3,
      maxConfigOptions: 20,
      minCodeToBoilerplateRatio: 0.5
    };
  }

  /**
   * Analyze a codebase for over-engineering signs
   * @param {object} codebaseMetrics - Metrics from the codebase
   * @returns {object} - Analysis results
   */
  analyze(codebaseMetrics) {
    this.indicators = [];

    this.checkAbstractionLayers(codebaseMetrics);
    this.checkInterfaceProliferation(codebaseMetrics);
    this.checkPatternOveruse(codebaseMetrics);
    this.checkConfigurationComplexity(codebaseMetrics);
    this.checkBoilerplateRatio(codebaseMetrics);
    this.checkFrameworkDependencies(codebaseMetrics);
    this.checkFutureProofing(codebaseMetrics);

    return this.generateReport();
  }

  /**
   * Check for excessive abstraction layers
   * @param {object} metrics - Codebase metrics
   */
  checkAbstractionLayers(metrics) {
    if (metrics.abstractionLayers > this.thresholds.maxAbstractionLayers) {
      this.indicators.push({
        type: 'excessive-abstraction',
        severity: 'high',
        message: `Found ${metrics.abstractionLayers} abstraction layers (max recommended: ${this.thresholds.maxAbstractionLayers})`,
        recommendation: 'Consider flattening the architecture and removing unnecessary layers'
      });
    }
  }

  /**
   * Check for interface proliferation
   * @param {object} metrics - Codebase metrics
   */
  checkInterfaceProliferation(metrics) {
    if (metrics.avgInterfacesPerClass > this.thresholds.maxInterfacesPerClass) {
      this.indicators.push({
        type: 'interface-proliferation',
        severity: 'medium',
        message: `Average ${metrics.avgInterfacesPerClass.toFixed(1)} interfaces per class`,
        recommendation: 'Consolidate interfaces; each should serve a clear purpose'
      });
    }
  }

  /**
   * Check for design pattern overuse
   * @param {object} metrics - Codebase metrics
   */
  checkPatternOveruse(metrics) {
    if (metrics.designPatternsPerModule > this.thresholds.maxDesignPatternsPerModule) {
      this.indicators.push({
        type: 'pattern-overuse',
        severity: 'medium',
        message: `Using ${metrics.designPatternsPerModule} design patterns per module`,
        recommendation: 'Use patterns to solve specific problems, not to demonstrate knowledge'
      });
    }
  }

  /**
   * Check configuration complexity
   * @param {object} metrics - Codebase metrics
   */
  checkConfigurationComplexity(metrics) {
    if (metrics.configOptions > this.thresholds.maxConfigOptions) {
      this.indicators.push({
        type: 'config-complexity',
        severity: 'medium',
        message: `${metrics.configOptions} configuration options found`,
        recommendation: 'Reduce configuration options; use sensible defaults'
      });
    }
  }

  /**
   * Check boilerplate to actual code ratio
   * @param {object} metrics - Codebase metrics
   */
  checkBoilerplateRatio(metrics) {
    const ratio = metrics.businessLogicLines / metrics.totalLines;
    if (ratio < this.thresholds.minCodeToBoilerplateRatio) {
      this.indicators.push({
        type: 'boilerplate-heavy',
        severity: 'high',
        message: `Only ${(ratio * 100).toFixed(1)}% of code is business logic`,
        recommendation: 'Reduce boilerplate; framework setup should be minimal'
      });
    }
  }

  /**
   * Check framework dependencies
   * @param {object} metrics - Codebase metrics
   */
  checkFrameworkDependencies(metrics) {
    if (metrics.dependencies > 50) {
      this.indicators.push({
        type: 'dependency-overload',
        severity: 'medium',
        message: `${metrics.dependencies} external dependencies`,
        recommendation: 'Audit dependencies; remove unused or redundant packages'
      });
    }
  }

  /**
   * Check for excessive future-proofing
   * @param {object} metrics - Codebase metrics
   */
  checkFutureProofing(metrics) {
    if (metrics.unusedAbstractions > 0) {
      this.indicators.push({
        type: 'premature-abstraction',
        severity: 'high',
        message: `${metrics.unusedAbstractions} abstractions with only one implementation`,
        recommendation: 'Remove abstractions until needed; follow YAGNI principle'
      });
    }
  }

  /**
   * Generate analysis report
   * @returns {object}
   */
  generateReport() {
    const highSeverity = this.indicators.filter(i => i.severity === 'high').length;
    const mediumSeverity = this.indicators.filter(i => i.severity === 'medium').length;

    let riskLevel = 'low';
    if (highSeverity >= 2) riskLevel = 'high';
    else if (highSeverity >= 1 || mediumSeverity >= 3) riskLevel = 'medium';

    return {
      riskLevel,
      totalIndicators: this.indicators.length,
      summary: {
        high: highSeverity,
        medium: mediumSeverity,
        low: this.indicators.filter(i => i.severity === 'low').length
      },
      indicators: this.indicators,
      recommendations: this.indicators.map(i => i.recommendation)
    };
  }
}

// Example 2: Complexity Analyzer
class ComplexityAnalyzer {
  /**
   * Analyze code complexity
   * @param {object} code - Code representation
   * @returns {object}
   */
  static analyze(code) {
    return {
      cyclomaticComplexity: this.calculateCyclomaticComplexity(code),
      inheritanceDepth: this.calculateInheritanceDepth(code),
      couplingScore: this.calculateCoupling(code),
      cohesionScore: this.calculateCohesion(code),
      linesOfCode: code.lines || 0
    };
  }

  /**
   * Calculate cyclomatic complexity
   * @param {object} code - Code representation
   * @returns {number}
   */
  static calculateCyclomaticComplexity(code) {
    // Simplified: count decision points
    const decisions = code.conditionals || 0;
    const loops = code.loops || 0;
    const cases = code.switchCases || 0;
    return 1 + decisions + loops + cases;
  }

  /**
   * Calculate inheritance depth
   * @param {object} code - Code representation
   * @returns {number}
   */
  static calculateInheritanceDepth(code) {
    return code.maxInheritanceDepth || 1;
  }

  /**
   * Calculate coupling between modules
   * @param {object} code - Code representation
   * @returns {number}
   */
  static calculateCoupling(code) {
    // Higher is worse (more dependencies)
    return code.externalDependencies || 0;
  }

  /**
   * Calculate cohesion score
   * @param {object} code - Code representation
   * @returns {number}
   */
  static calculateCohesion(code) {
    // Higher is better (0-1 scale)
    return code.cohesion || 0.5;
  }

  /**
   * Get complexity rating
   * @param {object} metrics - Complexity metrics
   * @returns {string}
   */
  static getComplexityRating(metrics) {
    let score = 0;

    if (metrics.cyclomaticComplexity > 20) score += 3;
    else if (metrics.cyclomaticComplexity > 10) score += 1;

    if (metrics.inheritanceDepth > 5) score += 2;
    else if (metrics.inheritanceDepth > 3) score += 1;

    if (metrics.couplingScore > 10) score += 2;
    else if (metrics.couplingScore > 5) score += 1;

    if (metrics.cohesionScore < 0.3) score += 2;
    else if (metrics.cohesionScore < 0.5) score += 1;

    if (score >= 6) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  }
}

// Example 3: Simple vs Complex Implementation Comparison
class ImplementationComparison {
  /**
   * Compare simple and complex approaches
   * @param {string} taskDescription - What the code should do
   * @returns {object}
   */
  static compare(taskDescription) {
    return {
      task: taskDescription,
      simpleApproach: this.getSimpleApproach(taskDescription),
      complexApproach: this.getComplexApproach(taskDescription),
      recommendation: 'Start with the simple approach; refactor only when needed'
    };
  }

  /**
   * Get simple approach example
   * @param {string} task - Task description
   * @returns {object}
   */
  static getSimpleApproach(task) {
    return {
      description: 'Direct implementation with minimal abstraction',
      codeExample: `
// Simple: Direct implementation
function getUser(id) {
  return database.query('SELECT * FROM users WHERE id = ?', [id]);
}`,
      pros: [
        'Easy to understand',
        'Quick to implement',
        'Easy to debug',
        'Less code to maintain'
      ],
      cons: [
        'May need refactoring later',
        'Less flexible for future changes'
      ],
      linesOfCode: 3,
      timeToImplement: '30 minutes'
    };
  }

  /**
   * Get complex approach example
   * @param {string} task - Task description
   * @returns {object}
   */
  static getComplexApproach(task) {
    return {
      description: 'Over-engineered with multiple abstractions',
      codeExample: `
// Complex: Over-engineered
interface IUserRepository extends IRepository<User, UserId> {}
interface IUserService extends IService<User> {}
class UserRepositoryImpl implements IUserRepository {}
class UserServiceImpl implements IUserService {}
class UserFacade implements IUserFacade {}
class UserFactory implements IFactory<User> {}
class UserMapper implements IMapper<UserDTO, User> {}
class GetUserByIdQuery implements IQuery<UserId, User> {}
class GetUserByIdQueryHandler implements IQueryHandler {}`,
      pros: [
        'Very flexible',
        'Follows all design patterns',
        'Ready for any future requirement'
      ],
      cons: [
        'Hard to understand',
        'Takes longer to implement',
        'More code to maintain',
        'May never need the flexibility',
        'Harder to debug',
        'Cognitive overhead for team'
      ],
      linesOfCode: 150,
      timeToImplement: '2 days'
    };
  }
}

// Example 4: YAGNI Principle Enforcer
class YAGNIEnforcer {
  constructor() {
    this.violations = [];
    this.patterns = [
      { name: 'Unused interface', regex: /interface.*\{[\s\S]*?\}/, check: 'singleImplementation' },
      { name: 'Empty method', regex: /function.*\(\).*\{\s*\}/, check: 'emptyBody' },
      { name: 'TODO for future', regex: /\/\/\s*TODO:\s*future/, check: 'futureTodo' },
      { name: 'Commented code', regex: /\/\/.*function|\/\*[\s\S]*?function/, check: 'commentedCode' }
    ];
  }

  /**
   * Check code for YAGNI violations
   * @param {string} code - Source code
   * @returns {Array}
   */
  check(code) {
    this.violations = [];

    // Check for common YAGNI violations
    this.checkUnusedAbstractions(code);
    this.checkPrematureOptimization(code);
    this.checkFutureFeatures(code);
    this.checkOverConfiguration(code);

    return this.violations;
  }

  /**
   * Check for unused abstractions
   * @param {string} code - Source code
   */
  checkUnusedAbstractions(code) {
    // Check for interfaces with only one implementation
    if (code.includes('interface') && code.match(/implements/g)?.length <= 1) {
      this.violations.push({
        type: 'unused-abstraction',
        message: 'Interface has only one implementation',
        principle: 'YAGNI',
        fix: 'Remove interface until you have multiple implementations'
      });
    }
  }

  /**
   * Check for premature optimization
   * @param {string} code - Source code
   */
  checkPrematureOptimization(code) {
    const optimizationPatterns = ['cache', 'memoize', 'lazy', 'pool'];
    for (const pattern of optimizationPatterns) {
      if (code.toLowerCase().includes(pattern)) {
        this.violations.push({
          type: 'premature-optimization',
          message: `Found "${pattern}" - ensure this optimization is needed`,
          principle: 'Premature optimization is the root of all evil',
          fix: 'Profile first, optimize only proven bottlenecks'
        });
      }
    }
  }

  /**
   * Check for future feature code
   * @param {string} code - Source code
   */
  checkFutureFeatures(code) {
    const futurePatterns = [
      /\/\/\s*TODO:\s*add\s*later/i,
      /\/\/\s*for\s*future\s*use/i,
      /\/\/\s*might\s*need\s*this/i
    ];

    for (const pattern of futurePatterns) {
      if (pattern.test(code)) {
        this.violations.push({
          type: 'future-feature',
          message: 'Code for unconfirmed future requirements',
          principle: 'YAGNI',
          fix: 'Remove code for features not currently needed'
        });
      }
    }
  }

  /**
   * Check for over-configuration
   * @param {string} code - Source code
   */
  checkOverConfiguration(code) {
    const configMatches = code.match(/config\./g);
    if (configMatches && configMatches.length > 20) {
      this.violations.push({
        type: 'over-configuration',
        message: 'Excessive configuration options detected',
        principle: 'Convention over configuration',
        fix: 'Use sensible defaults, make only necessary things configurable'
      });
    }
  }

  /**
   * Get report
   * @returns {object}
   */
  getReport() {
    return {
      violationCount: this.violations.length,
      violations: this.violations,
      score: Math.max(0, 100 - this.violations.length * 15),
      status: this.violations.length === 0 ? 'PASS' : 'NEEDS REVIEW'
    };
  }
}

// Example 5: Pragmatic Decision Framework
class PragmaticDecisionFramework {
  /**
   * Evaluate an architectural decision
   * @param {object} decision - Decision details
   * @returns {object}
   */
  static evaluate(decision) {
    const questions = [
      { q: 'Is this solving a current problem?', weight: 3 },
      { q: 'Will this be used by more than one consumer?', weight: 2 },
      { q: 'Is there a simpler solution that works?', weight: 3 },
      { q: 'Can we iterate on this later?', weight: 2 },
      { q: 'Does the team understand this approach?', weight: 2 }
    ];

    let score = 0;
    const analysis = [];

    questions.forEach((question, index) => {
      const answer = decision.answers?.[index] || false;
      const impact = answer ? question.weight : -question.weight;
      score += impact;
      analysis.push({
        question: question.q,
        answer: answer ? 'Yes' : 'No',
        impact: impact > 0 ? 'positive' : 'negative'
      });
    });

    return {
      decision: decision.description,
      score,
      maxScore: questions.reduce((sum, q) => sum + q.weight, 0),
      recommendation: score > 0 ? 'Proceed' : 'Reconsider',
      analysis,
      alternatives: score <= 0 ? this.suggestAlternatives(decision) : []
    };
  }

  /**
   * Suggest simpler alternatives
   * @param {object} decision - Decision details
   * @returns {Array}
   */
  static suggestAlternatives(decision) {
    return [
      'Start with the simplest implementation that could work',
      'Use existing libraries instead of building from scratch',
      'Consider if the feature is actually needed',
      'Implement a quick prototype to validate the approach',
      'Ask: "What if we did nothing?"'
    ];
  }
}

// Demonstration
console.log('=== Architecture Astronaut Detection ===\n');

// Analyze a potentially over-engineered codebase
const detector = new OverEngineeringDetector();
const metrics = {
  abstractionLayers: 5,
  avgInterfacesPerClass: 3.2,
  designPatternsPerModule: 5,
  configOptions: 45,
  businessLogicLines: 2000,
  totalLines: 8000,
  dependencies: 75,
  unusedAbstractions: 8
};

const report = detector.analyze(metrics);
console.log('Over-Engineering Analysis:');
console.log(`  Risk Level: ${report.riskLevel.toUpperCase()}`);
console.log(`  Issues Found: ${report.totalIndicators}`);
console.log('\n  Indicators:');
report.indicators.forEach(i => {
  console.log(`    [${i.severity.toUpperCase()}] ${i.type}: ${i.message}`);
});

// Compare approaches
console.log('\n=== Simple vs Complex Comparison ===\n');
const comparison = ImplementationComparison.compare('Fetch user by ID');
console.log(`Task: ${comparison.task}`);
console.log('\nSimple Approach:');
console.log(`  Lines of Code: ${comparison.simpleApproach.linesOfCode}`);
console.log(`  Time: ${comparison.simpleApproach.timeToImplement}`);
console.log('\nComplex Approach:');
console.log(`  Lines of Code: ${comparison.complexApproach.linesOfCode}`);
console.log(`  Time: ${comparison.complexApproach.timeToImplement}`);
console.log(`\nRecommendation: ${comparison.recommendation}`);

// YAGNI check
console.log('\n=== YAGNI Principle Check ===\n');
const yagni = new YAGNIEnforcer();
const sampleCode = `
interface IUserService {}
class UserService implements IUserService {
  // TODO: add caching for future performance
  // TODO: might need this validation later
  constructor(config) {
    this.cache = new CacheManager(); // premature optimization
  }
}
`;

yagni.check(sampleCode);
const yagniReport = yagni.getReport();
console.log(`YAGNI Score: ${yagniReport.score}/100`);
console.log(`Status: ${yagniReport.status}`);
if (yagniReport.violations.length > 0) {
  console.log('\nViolations:');
  yagniReport.violations.forEach(v => {
    console.log(`  - ${v.type}: ${v.message}`);
    console.log(`    Fix: ${v.fix}`);
  });
}

/**
 * Signs You Might Be an Architecture Astronaut:
 *
 * 1. Designing for requirements that don't exist yet
 * 2. Adding abstractions "just in case"
 * 3. Using design patterns everywhere
 * 4. Preferring flexibility over simplicity
 * 5. Building frameworks instead of solving problems
 * 6. Discussing architecture more than shipping features
 * 7. Every solution requires a new layer
 * 8. Configuration files bigger than actual code
 *
 * The Cure:
 * - Ask "Do we need this NOW?"
 * - Start simple, refactor when needed
 * - Value working software over perfect architecture
 * - Remember: Code is a liability, not an asset
 * - The best code is no code at all
 */
