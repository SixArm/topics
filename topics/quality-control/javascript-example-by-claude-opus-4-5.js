/**
 * Quality Control - Ensuring Product and Process Excellence
 *
 * Quality control (QC) involves processes and activities to ensure products
 * meet specified quality standards. It focuses on preventing defects,
 * identifying issues, and taking corrective measures. QC includes inspection,
 * testing, and continuous improvement practices.
 *
 * Key Concepts:
 * - Defect prevention vs detection
 * - Inspection and testing
 * - Corrective and preventive actions
 * - Continuous improvement
 */

/**
 * QualityStandard defines quality criteria for products.
 */
class QualityStandard {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.criteria = options.criteria || [];
        this.thresholds = options.thresholds || {};
        this.version = options.version || '1.0';
        this.effectiveDate = options.effectiveDate || new Date();
    }

    /**
     * Adds a quality criterion
     * @param {Object} criterion - Criterion to add
     */
    addCriterion(criterion) {
        this.criteria.push({
            id: criterion.id,
            name: criterion.name,
            description: criterion.description,
            measurementMethod: criterion.measurementMethod,
            acceptableRange: criterion.acceptableRange,
            weight: criterion.weight || 1
        });
    }

    /**
     * Evaluates a product against this standard
     * @param {Object} measurements - Measured values
     * @returns {Object} Evaluation result
     */
    evaluate(measurements) {
        const results = [];
        let totalScore = 0;
        let totalWeight = 0;

        for (const criterion of this.criteria) {
            const measured = measurements[criterion.id];
            const passed = this.checkCriterion(criterion, measured);

            results.push({
                criterion: criterion.name,
                measured,
                acceptableRange: criterion.acceptableRange,
                passed,
                weight: criterion.weight
            });

            totalWeight += criterion.weight;
            if (passed) totalScore += criterion.weight;
        }

        const overallScore = (totalScore / totalWeight) * 100;

        return {
            standard: this.name,
            criteria: results,
            passed: results.filter(r => r.passed).length,
            failed: results.filter(r => !r.passed).length,
            overallScore: overallScore.toFixed(2) + '%',
            meetsStandard: overallScore >= (this.thresholds.minScore || 100)
        };
    }

    /**
     * Checks if measurement meets criterion
     * @param {Object} criterion - Criterion to check
     * @param {*} measured - Measured value
     * @returns {boolean} Pass/fail
     */
    checkCriterion(criterion, measured) {
        const range = criterion.acceptableRange;

        if (typeof range.min !== 'undefined' && measured < range.min) return false;
        if (typeof range.max !== 'undefined' && measured > range.max) return false;
        if (range.exact !== undefined && measured !== range.exact) return false;
        if (range.values && !range.values.includes(measured)) return false;

        return true;
    }
}

/**
 * Inspection represents a quality inspection process.
 */
class Inspection {
    constructor(options) {
        this.id = options.id || `INS-${Date.now()}`;
        this.type = options.type; // incoming, in-process, final
        this.inspector = options.inspector;
        this.standard = options.standard;
        this.timestamp = new Date();
        this.items = [];
        this.status = 'pending';
    }

    /**
     * Inspects an item
     * @param {Object} item - Item to inspect
     * @param {Object} measurements - Measured values
     * @returns {Object} Inspection result
     */
    inspectItem(item, measurements) {
        const evaluation = this.standard.evaluate(measurements);

        const result = {
            itemId: item.id,
            itemName: item.name,
            evaluation,
            disposition: evaluation.meetsStandard ? 'accepted' : 'rejected',
            inspectedAt: new Date()
        };

        this.items.push(result);
        return result;
    }

    /**
     * Completes the inspection
     * @returns {Object} Inspection summary
     */
    complete() {
        this.status = 'completed';
        this.completedAt = new Date();

        const accepted = this.items.filter(i => i.disposition === 'accepted').length;
        const rejected = this.items.filter(i => i.disposition === 'rejected').length;

        return {
            inspectionId: this.id,
            type: this.type,
            inspector: this.inspector,
            totalItems: this.items.length,
            accepted,
            rejected,
            acceptanceRate: ((accepted / this.items.length) * 100).toFixed(2) + '%',
            duration: this.completedAt - this.timestamp
        };
    }
}

/**
 * DefectTracker tracks and analyzes defects.
 */
class DefectTracker {
    constructor() {
        this.defects = [];
    }

    /**
     * Records a defect
     * @param {Object} defect - Defect details
     * @returns {Object} Recorded defect
     */
    recordDefect(defect) {
        const record = {
            id: `DEF-${this.defects.length + 1}`,
            timestamp: new Date(),
            category: defect.category,
            severity: defect.severity, // critical, major, minor
            description: defect.description,
            location: defect.location,
            detectedPhase: defect.detectedPhase,
            rootCause: defect.rootCause || null,
            status: 'open',
            correctiveAction: null
        };

        this.defects.push(record);
        return record;
    }

    /**
     * Updates defect with corrective action
     * @param {string} defectId - Defect ID
     * @param {Object} action - Corrective action
     */
    addCorrectiveAction(defectId, action) {
        const defect = this.defects.find(d => d.id === defectId);
        if (defect) {
            defect.correctiveAction = {
                description: action.description,
                implementedAt: new Date(),
                implementedBy: action.implementedBy,
                verified: false
            };
            defect.status = 'corrected';
        }
    }

    /**
     * Closes a defect after verification
     * @param {string} defectId - Defect ID
     */
    closeDefect(defectId) {
        const defect = this.defects.find(d => d.id === defectId);
        if (defect && defect.correctiveAction) {
            defect.correctiveAction.verified = true;
            defect.status = 'closed';
            defect.closedAt = new Date();
        }
    }

    /**
     * Gets defect analysis
     * @returns {Object} Analysis
     */
    analyze() {
        const byCategory = {};
        const bySeverity = {};
        const byPhase = {};

        for (const defect of this.defects) {
            byCategory[defect.category] = (byCategory[defect.category] || 0) + 1;
            bySeverity[defect.severity] = (bySeverity[defect.severity] || 0) + 1;
            byPhase[defect.detectedPhase] = (byPhase[defect.detectedPhase] || 0) + 1;
        }

        return {
            total: this.defects.length,
            open: this.defects.filter(d => d.status === 'open').length,
            corrected: this.defects.filter(d => d.status === 'corrected').length,
            closed: this.defects.filter(d => d.status === 'closed').length,
            byCategory,
            bySeverity,
            byPhase,
            topCategories: Object.entries(byCategory)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
        };
    }

    /**
     * Gets Pareto analysis (80/20 rule)
     * @returns {Object} Pareto analysis
     */
    paretoAnalysis() {
        const analysis = this.analyze();
        const sorted = Object.entries(analysis.byCategory)
            .sort((a, b) => b[1] - a[1]);

        const total = this.defects.length;
        let cumulative = 0;
        const pareto = [];

        for (const [category, count] of sorted) {
            cumulative += count;
            pareto.push({
                category,
                count,
                percentage: ((count / total) * 100).toFixed(1) + '%',
                cumulative: ((cumulative / total) * 100).toFixed(1) + '%'
            });
        }

        return {
            items: pareto,
            insight: 'Focus on top categories to address majority of defects'
        };
    }
}

/**
 * QualityMetrics calculates quality-related metrics.
 */
class QualityMetrics {
    /**
     * Calculates defect density
     * @param {number} defects - Number of defects
     * @param {number} size - Size measure (LOC, function points, etc.)
     * @returns {Object} Defect density
     */
    static defectDensity(defects, size) {
        const density = defects / size * 1000; // Per 1000 units

        return {
            defects,
            size,
            density: density.toFixed(2),
            unit: 'per 1000 units',
            assessment: density < 1 ? 'Excellent' :
                density < 5 ? 'Good' :
                    density < 10 ? 'Average' : 'Needs Improvement'
        };
    }

    /**
     * Calculates first pass yield
     * @param {number} good - Good units on first pass
     * @param {number} total - Total units processed
     * @returns {Object} First pass yield
     */
    static firstPassYield(good, total) {
        const fpy = (good / total) * 100;

        return {
            good,
            total,
            yield: fpy.toFixed(2) + '%',
            defectRate: (100 - fpy).toFixed(2) + '%'
        };
    }

    /**
     * Calculates cost of quality
     * @param {Object} costs - Quality cost components
     * @returns {Object} Cost analysis
     */
    static costOfQuality(costs) {
        const {
            prevention,  // Training, planning, quality systems
            appraisal,   // Testing, inspection, audits
            internalFailure, // Rework, scrap, retesting
            externalFailure  // Warranty, returns, reputation
        } = costs;

        const totalCOQ = prevention + appraisal + internalFailure + externalFailure;
        const conformanceCost = prevention + appraisal;
        const nonConformanceCost = internalFailure + externalFailure;

        return {
            prevention: { cost: prevention, percentage: ((prevention / totalCOQ) * 100).toFixed(1) + '%' },
            appraisal: { cost: appraisal, percentage: ((appraisal / totalCOQ) * 100).toFixed(1) + '%' },
            internalFailure: { cost: internalFailure, percentage: ((internalFailure / totalCOQ) * 100).toFixed(1) + '%' },
            externalFailure: { cost: externalFailure, percentage: ((externalFailure / totalCOQ) * 100).toFixed(1) + '%' },
            totalCOQ,
            conformanceCost,
            nonConformanceCost,
            ratio: (conformanceCost / nonConformanceCost).toFixed(2),
            recommendation: conformanceCost < nonConformanceCost
                ? 'Consider increasing prevention investment'
                : 'Good balance of quality costs'
        };
    }

    /**
     * Calculates process capability (Cp)
     * @param {Object} params - Process parameters
     * @returns {Object} Capability analysis
     */
    static processCapability(params) {
        const { upperLimit, lowerLimit, mean, stdDev } = params;
        const cp = (upperLimit - lowerLimit) / (6 * stdDev);
        const cpk = Math.min(
            (upperLimit - mean) / (3 * stdDev),
            (mean - lowerLimit) / (3 * stdDev)
        );

        return {
            cp: cp.toFixed(2),
            cpk: cpk.toFixed(2),
            interpretation: cp >= 1.33 ? 'Capable process' :
                cp >= 1.0 ? 'Marginally capable' : 'Not capable',
            centered: Math.abs(cp - cpk) < 0.1 ? 'Yes' : 'No'
        };
    }
}

/**
 * ContinuousImprovement implements improvement methodologies.
 */
class ContinuousImprovement {
    /**
     * Creates a PDCA cycle action
     * @param {Object} improvement - Improvement details
     * @returns {Object} PDCA plan
     */
    static pdcaCycle(improvement) {
        return {
            plan: {
                objective: improvement.objective,
                currentState: improvement.currentState,
                targetState: improvement.targetState,
                actions: improvement.plannedActions,
                metrics: improvement.metrics,
                timeline: improvement.timeline
            },
            do: {
                status: 'pending',
                implementation: null,
                actualResults: null
            },
            check: {
                status: 'pending',
                comparison: null,
                gapAnalysis: null
            },
            act: {
                status: 'pending',
                decision: null, // standardize, adjust, or abandon
                nextSteps: null
            }
        };
    }

    /**
     * Conducts root cause analysis (5 Whys)
     * @param {string} problem - Problem statement
     * @param {Array} whys - Array of why answers
     * @returns {Object} Root cause analysis
     */
    static fiveWhys(problem, whys) {
        const analysis = {
            problem,
            whys: whys.map((why, i) => ({
                level: i + 1,
                question: `Why? (Level ${i + 1})`,
                answer: why
            })),
            rootCause: whys[whys.length - 1],
            recommendation: 'Address the root cause to prevent recurrence'
        };

        return analysis;
    }
}

// Demonstration
console.log('=== Quality Control Demo ===\n');

// Define quality standard
console.log('--- Quality Standard ---');
const softwareStandard = new QualityStandard({
    id: 'QS-001',
    name: 'Software Release Quality Standard',
    description: 'Quality criteria for software releases',
    thresholds: { minScore: 80 }
});

softwareStandard.addCriterion({
    id: 'test_coverage',
    name: 'Test Coverage',
    measurementMethod: 'Code coverage tool',
    acceptableRange: { min: 80 },
    weight: 2
});

softwareStandard.addCriterion({
    id: 'defect_density',
    name: 'Defect Density',
    measurementMethod: 'Defects per KLOC',
    acceptableRange: { max: 5 },
    weight: 2
});

softwareStandard.addCriterion({
    id: 'performance',
    name: 'Response Time',
    measurementMethod: 'Load test P95',
    acceptableRange: { max: 2000 },
    weight: 1
});

// Evaluate product
console.log('Evaluation:', softwareStandard.evaluate({
    test_coverage: 85,
    defect_density: 3,
    performance: 1500
}));

// Defect tracking
console.log('\n--- Defect Tracking ---');
const tracker = new DefectTracker();

tracker.recordDefect({ category: 'UI', severity: 'minor', description: 'Button alignment', detectedPhase: 'testing' });
tracker.recordDefect({ category: 'Logic', severity: 'major', description: 'Calculation error', detectedPhase: 'testing' });
tracker.recordDefect({ category: 'Logic', severity: 'critical', description: 'Data loss', detectedPhase: 'production' });
tracker.recordDefect({ category: 'UI', severity: 'minor', description: 'Color mismatch', detectedPhase: 'testing' });
tracker.recordDefect({ category: 'Performance', severity: 'major', description: 'Slow query', detectedPhase: 'testing' });

console.log('Defect Analysis:', tracker.analyze());
console.log('Pareto Analysis:', tracker.paretoAnalysis());

// Quality metrics
console.log('\n--- Quality Metrics ---');
console.log('Defect Density:', QualityMetrics.defectDensity(15, 5000));
console.log('First Pass Yield:', QualityMetrics.firstPassYield(95, 100));
console.log('Cost of Quality:', QualityMetrics.costOfQuality({
    prevention: 10000,
    appraisal: 15000,
    internalFailure: 8000,
    externalFailure: 12000
}));

// Continuous improvement
console.log('\n--- Continuous Improvement ---');
console.log('5 Whys:', ContinuousImprovement.fiveWhys(
    'Production deployment failed',
    [
        'Tests did not catch the bug',
        'Test coverage was insufficient',
        'Time pressure reduced testing',
        'Deadline was too aggressive',
        'Estimation did not account for testing time'
    ]
));

/**
 * Best Practices for Quality Control:
 *
 * 1. Define clear, measurable quality standards
 * 2. Inspect at multiple stages (prevention > detection)
 * 3. Track and analyze defects systematically
 * 4. Use root cause analysis for recurring issues
 * 5. Implement corrective and preventive actions
 * 6. Calculate and optimize cost of quality
 * 7. Apply Pareto principle to focus efforts
 * 8. Use statistical process control where applicable
 * 9. Foster continuous improvement culture
 * 10. Measure and report quality metrics regularly
 */
