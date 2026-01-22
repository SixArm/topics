/**
 * A/B Testing - Comparing Two Versions to Determine Which Performs Better
 *
 * A/B testing (also known as split testing) is an experimental methodology where
 * two versions of a variable (webpage, app feature, etc.) are shown to different
 * segments of users simultaneously. Statistical analysis determines which version
 * performs better for a given conversion goal.
 *
 * Key Concepts:
 * - Control Group (A): The original/baseline version
 * - Variant Group (B): The modified version being tested
 * - Random Assignment: Users are randomly assigned to groups
 * - Statistical Significance: Results must be statistically valid
 * - Sample Size: Adequate number of users needed for reliable results
 *
 * Common Use Cases:
 * - UI/UX design changes
 * - Call-to-action button variations
 * - Pricing strategies
 * - Feature rollouts
 * - Email marketing campaigns
 */

// Example 1: Simple A/B Test Implementation
class ABTest {
  constructor(testName, controlVersion, variantVersion) {
    this.testName = testName;
    this.controlVersion = controlVersion;
    this.variantVersion = variantVersion;
    this.results = {
      control: { impressions: 0, conversions: 0 },
      variant: { impressions: 0, conversions: 0 }
    };
  }

  /**
   * Randomly assign a user to either control or variant group
   * Uses a 50/50 split by default
   * @param {string} userId - Unique identifier for the user
   * @returns {string} - 'control' or 'variant'
   */
  assignUserToGroup(userId) {
    // Use hash of userId for consistent assignment
    const hash = this._hashCode(userId);
    return hash % 2 === 0 ? 'control' : 'variant';
  }

  /**
   * Simple hash function for consistent user assignment
   */
  _hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Record an impression (user saw the version)
   * @param {string} group - 'control' or 'variant'
   */
  recordImpression(group) {
    if (this.results[group]) {
      this.results[group].impressions++;
    }
  }

  /**
   * Record a conversion (user completed desired action)
   * @param {string} group - 'control' or 'variant'
   */
  recordConversion(group) {
    if (this.results[group]) {
      this.results[group].conversions++;
    }
  }

  /**
   * Calculate conversion rate for a group
   * @param {string} group - 'control' or 'variant'
   * @returns {number} - Conversion rate as percentage
   */
  getConversionRate(group) {
    const data = this.results[group];
    if (data.impressions === 0) return 0;
    return (data.conversions / data.impressions) * 100;
  }

  /**
   * Calculate the relative improvement of variant over control
   * @returns {number} - Percentage improvement (positive or negative)
   */
  getRelativeImprovement() {
    const controlRate = this.getConversionRate('control');
    const variantRate = this.getConversionRate('variant');

    if (controlRate === 0) return 0;
    return ((variantRate - controlRate) / controlRate) * 100;
  }

  /**
   * Perform basic statistical significance test (Chi-Square)
   * @returns {object} - Test results including p-value and significance
   */
  calculateStatisticalSignificance() {
    const control = this.results.control;
    const variant = this.results.variant;

    const controlRate = control.conversions / control.impressions;
    const variantRate = variant.conversions / variant.impressions;
    const pooledRate = (control.conversions + variant.conversions) /
                       (control.impressions + variant.impressions);

    // Standard error calculation
    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) *
      (1 / control.impressions + 1 / variant.impressions)
    );

    // Z-score calculation
    const zScore = (variantRate - controlRate) / standardError;

    // Simplified p-value approximation (two-tailed test)
    const pValue = 2 * (1 - this._normalCDF(Math.abs(zScore)));

    return {
      zScore: zScore.toFixed(4),
      pValue: pValue.toFixed(4),
      isSignificant: pValue < 0.05,
      confidenceLevel: ((1 - pValue) * 100).toFixed(2) + '%'
    };
  }

  /**
   * Cumulative Distribution Function for standard normal distribution
   * Approximation using error function
   */
  _normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const probability = d * t * (0.3193815 + t * (-0.3565638 + t *
                        (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - probability : probability;
  }

  /**
   * Generate a comprehensive test report
   * @returns {object} - Full test results and analysis
   */
  getReport() {
    const stats = this.calculateStatisticalSignificance();

    return {
      testName: this.testName,
      control: {
        version: this.controlVersion,
        impressions: this.results.control.impressions,
        conversions: this.results.control.conversions,
        conversionRate: this.getConversionRate('control').toFixed(2) + '%'
      },
      variant: {
        version: this.variantVersion,
        impressions: this.results.variant.impressions,
        conversions: this.results.variant.conversions,
        conversionRate: this.getConversionRate('variant').toFixed(2) + '%'
      },
      analysis: {
        relativeImprovement: this.getRelativeImprovement().toFixed(2) + '%',
        zScore: stats.zScore,
        pValue: stats.pValue,
        isStatisticallySignificant: stats.isSignificant,
        confidenceLevel: stats.confidenceLevel,
        recommendation: this._getRecommendation(stats)
      }
    };
  }

  /**
   * Provide a recommendation based on test results
   */
  _getRecommendation(stats) {
    if (!stats.isSignificant) {
      return 'Results are not statistically significant. Continue testing or maintain control.';
    }

    const improvement = this.getRelativeImprovement();
    if (improvement > 0) {
      return `Variant shows ${improvement.toFixed(2)}% improvement. Recommend implementing variant.`;
    } else {
      return `Variant shows ${Math.abs(improvement).toFixed(2)}% decrease. Recommend keeping control.`;
    }
  }
}

// Example 2: Practical Usage Simulation
console.log('=== A/B Testing Example: Button Color Test ===\n');

// Create an A/B test for button color
const buttonTest = new ABTest(
  'Homepage CTA Button Color',
  'Blue Button (Control)',
  'Green Button (Variant)'
);

// Simulate user interactions
const users = Array.from({ length: 1000 }, (_, i) => `user_${i}`);

users.forEach(userId => {
  // Assign user to a group
  const group = buttonTest.assignUserToGroup(userId);

  // Record impression
  buttonTest.recordImpression(group);

  // Simulate conversion with different rates
  // Control: 10% conversion rate
  // Variant: 12% conversion rate (20% improvement)
  const conversionProbability = group === 'control' ? 0.10 : 0.12;

  if (Math.random() < conversionProbability) {
    buttonTest.recordConversion(group);
  }
});

// Display results
const report = buttonTest.getReport();
console.log('Test Name:', report.testName);
console.log('\nControl Group:');
console.log('  Version:', report.control.version);
console.log('  Impressions:', report.control.impressions);
console.log('  Conversions:', report.control.conversions);
console.log('  Conversion Rate:', report.control.conversionRate);

console.log('\nVariant Group:');
console.log('  Version:', report.variant.version);
console.log('  Impressions:', report.variant.impressions);
console.log('  Conversions:', report.variant.conversions);
console.log('  Conversion Rate:', report.variant.conversionRate);

console.log('\nStatistical Analysis:');
console.log('  Relative Improvement:', report.analysis.relativeImprovement);
console.log('  Z-Score:', report.analysis.zScore);
console.log('  P-Value:', report.analysis.pValue);
console.log('  Statistically Significant:', report.analysis.isStatisticallySignificant);
console.log('  Confidence Level:', report.analysis.confidenceLevel);

console.log('\nRecommendation:');
console.log(' ', report.analysis.recommendation);

// Example 3: Multi-Variant Testing (A/B/C Testing)
class MultiVariantTest extends ABTest {
  constructor(testName, variants) {
    super(testName, variants[0], variants[1]);
    this.variants = variants;
    this.results = {};

    // Initialize results for all variants
    variants.forEach(variant => {
      this.results[variant] = { impressions: 0, conversions: 0 };
    });
  }

  /**
   * Assign user to one of multiple variants
   * @param {string} userId - Unique identifier for the user
   * @returns {string} - Variant name
   */
  assignUserToGroup(userId) {
    const hash = this._hashCode(userId);
    const variantIndex = hash % this.variants.length;
    return this.variants[variantIndex];
  }

  /**
   * Get conversion rate for any variant
   * @param {string} variant - Variant name
   * @returns {number} - Conversion rate as percentage
   */
  getConversionRate(variant) {
    const data = this.results[variant];
    if (!data || data.impressions === 0) return 0;
    return (data.conversions / data.impressions) * 100;
  }

  /**
   * Find the best performing variant
   * @returns {object} - Best variant details
   */
  getBestVariant() {
    let bestVariant = null;
    let bestRate = -1;

    this.variants.forEach(variant => {
      const rate = this.getConversionRate(variant);
      if (rate > bestRate) {
        bestRate = rate;
        bestVariant = variant;
      }
    });

    return {
      variant: bestVariant,
      conversionRate: bestRate.toFixed(2) + '%',
      impressions: this.results[bestVariant].impressions,
      conversions: this.results[bestVariant].conversions
    };
  }
}

console.log('\n\n=== Multi-Variant Testing Example: CTA Text ===\n');

const ctaTest = new MultiVariantTest(
  'CTA Button Text',
  ['Buy Now', 'Get Started', 'Try Free', 'Learn More']
);

// Simulate 2000 users
const multiTestUsers = Array.from({ length: 2000 }, (_, i) => `user_${i}`);

multiTestUsers.forEach(userId => {
  const variant = ctaTest.assignUserToGroup(userId);
  ctaTest.recordImpression(variant);

  // Simulate different conversion rates for each variant
  const rates = {
    'Buy Now': 0.08,
    'Get Started': 0.11,
    'Try Free': 0.13,
    'Learn More': 0.06
  };

  if (Math.random() < rates[variant]) {
    ctaTest.recordConversion(variant);
  }
});

console.log('Test Results for All Variants:');
ctaTest.variants.forEach(variant => {
  const rate = ctaTest.getConversionRate(variant);
  const data = ctaTest.results[variant];
  console.log(`  ${variant}: ${data.conversions}/${data.impressions} (${rate.toFixed(2)}%)`);
});

const bestVariant = ctaTest.getBestVariant();
console.log('\nBest Performing Variant:');
console.log('  Text:', bestVariant.variant);
console.log('  Conversion Rate:', bestVariant.conversionRate);
console.log('  Sample:', `${bestVariant.conversions}/${bestVariant.impressions}`);

/**
 * Best Practices for A/B Testing:
 *
 * 1. Test One Variable at a Time: Isolate changes to understand causation
 * 2. Adequate Sample Size: Use sample size calculators to ensure validity
 * 3. Run Tests Long Enough: Account for weekly/seasonal variations
 * 4. Random Assignment: Ensure unbiased group allocation
 * 5. Define Success Metrics: Clear KPIs before starting
 * 6. Avoid Peeking: Don't stop tests early based on intermediate results
 * 7. Document Everything: Record hypotheses, setup, and learnings
 * 8. Consider External Factors: Holidays, marketing campaigns, etc.
 * 9. Retest Winners: Validate significant findings
 * 10. Ethical Considerations: Ensure user consent and data privacy
 */
