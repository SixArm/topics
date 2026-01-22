/**
 * Test Automation Quotations - Wisdom on Automated Testing
 *
 * Test automation quotations capture the collective wisdom of software testing
 * professionals about automation strategies, best practices, and pitfalls.
 * These insights guide teams in building effective automation that amplifies
 * human intelligence rather than replacing skilled testers.
 *
 * Key Concepts:
 * - Automation as a tool, not a strategy
 * - Balance between automation and manual testing
 * - Maintainability and reliability
 * - Return on investment
 */

/**
 * Quotation represents a test automation quotation.
 */
class Quotation {
    constructor(options) {
        this.text = options.text;
        this.author = options.author || 'Unknown';
        this.context = options.context || 'general';
        this.theme = options.theme || 'general';
        this.year = options.year;
    }

    /**
     * Formats quotation for display
     * @returns {string} Formatted quote
     */
    format() {
        const yearStr = this.year ? ` (${this.year})` : '';
        return `"${this.text}" — ${this.author}${yearStr}`;
    }

    /**
     * Gets quotation summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            author: this.author,
            theme: this.theme,
            context: this.context,
            preview: this.text.substring(0, 50) + (this.text.length > 50 ? '...' : '')
        };
    }
}

/**
 * QuotationCollection manages test automation quotations.
 */
class QuotationCollection {
    constructor() {
        this.quotations = [];
        this.initializeCollection();
    }

    /**
     * Initializes with common test automation quotations
     */
    initializeCollection() {
        this.quotations = [
            new Quotation({
                text: 'The goal of automation is not to replace human intelligence, but to amplify it.',
                author: 'Test Automation Wisdom',
                theme: 'purpose',
                context: 'strategy'
            }),
            new Quotation({
                text: 'Automation is a tool, not a strategy. Without proper planning, automated tests can become expensive maintenance burdens.',
                author: 'Test Automation Wisdom',
                theme: 'planning',
                context: 'strategy'
            }),
            new Quotation({
                text: 'Good automation doesn\'t just catch bugs—it provides confidence.',
                author: 'Test Automation Wisdom',
                theme: 'value',
                context: 'benefits'
            }),
            new Quotation({
                text: 'Testing shows the presence, not the absence of bugs.',
                author: 'Edsger W. Dijkstra',
                theme: 'limitations',
                context: 'fundamentals',
                year: 1969
            }),
            new Quotation({
                text: 'The first rule of test automation: don\'t automate chaos.',
                author: 'Test Automation Wisdom',
                theme: 'prerequisites',
                context: 'best-practices'
            }),
            new Quotation({
                text: 'If you don\'t like testing your product, most likely your customers won\'t like to test it either.',
                author: 'Test Automation Wisdom',
                theme: 'quality',
                context: 'philosophy'
            }),
            new Quotation({
                text: 'Automated testing is not a silver bullet. It\'s a force multiplier that requires skilled testers to wield effectively.',
                author: 'Test Automation Wisdom',
                theme: 'skills',
                context: 'team'
            }),
            new Quotation({
                text: 'The cost of a bug is lowest when caught in development and highest when caught by customers.',
                author: 'Test Automation Wisdom',
                theme: 'cost',
                context: 'economics'
            }),
            new Quotation({
                text: 'Don\'t automate everything—automate the right things.',
                author: 'Test Automation Wisdom',
                theme: 'selection',
                context: 'strategy'
            }),
            new Quotation({
                text: 'Flaky tests are worse than no tests—they erode trust in the entire test suite.',
                author: 'Test Automation Wisdom',
                theme: 'reliability',
                context: 'maintenance'
            }),
            new Quotation({
                text: 'Test code is code. Treat it with the same care as production code.',
                author: 'Test Automation Wisdom',
                theme: 'quality',
                context: 'best-practices'
            }),
            new Quotation({
                text: 'Regression testing is insurance against breaking what already works.',
                author: 'Test Automation Wisdom',
                theme: 'regression',
                context: 'types'
            })
        ];
    }

    /**
     * Gets quotation by theme
     * @param {string} theme - Theme to filter by
     * @returns {Array} Matching quotations
     */
    getByTheme(theme) {
        return this.quotations.filter(q => q.theme === theme);
    }

    /**
     * Gets quotation by author
     * @param {string} author - Author to filter by
     * @returns {Array} Matching quotations
     */
    getByAuthor(author) {
        return this.quotations.filter(q =>
            q.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    /**
     * Gets random quotation
     * @returns {Quotation} Random quote
     */
    getRandom() {
        const index = Math.floor(Math.random() * this.quotations.length);
        return this.quotations[index];
    }

    /**
     * Gets all themes
     * @returns {Array} Unique themes
     */
    getThemes() {
        return [...new Set(this.quotations.map(q => q.theme))];
    }

    /**
     * Adds a quotation
     * @param {Quotation} quote - Quotation to add
     */
    add(quote) {
        this.quotations.push(quote);
    }

    /**
     * Gets statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const byTheme = {};
        const byContext = {};

        for (const quote of this.quotations) {
            byTheme[quote.theme] = (byTheme[quote.theme] || 0) + 1;
            byContext[quote.context] = (byContext[quote.context] || 0) + 1;
        }

        return {
            totalQuotes: this.quotations.length,
            themes: Object.keys(byTheme).length,
            byTheme,
            byContext
        };
    }
}

/**
 * AutomationWisdom extracts lessons from quotations.
 */
class AutomationWisdom {
    static lessons = {
        strategy: {
            title: 'Strategic Automation',
            principles: [
                'Automation amplifies human intelligence, not replaces it',
                'Plan before automating—avoid automating chaos',
                'Focus on high-value, stable test cases',
                'Balance automation with manual exploratory testing'
            ],
            antipatterns: [
                'Automating everything without prioritization',
                'Starting automation without stable requirements',
                'Ignoring maintenance costs in ROI calculations'
            ]
        },
        maintenance: {
            title: 'Sustainable Automation',
            principles: [
                'Treat test code with same care as production code',
                'Fix or remove flaky tests immediately',
                'Design for maintainability from the start',
                'Refactor tests regularly'
            ],
            antipatterns: [
                'Accepting flaky tests as normal',
                'Copy-paste test duplication',
                'Ignoring test code reviews'
            ]
        },
        value: {
            title: 'Delivering Value',
            principles: [
                'Automation provides confidence for refactoring',
                'Fast feedback enables rapid development',
                'Catch bugs early to reduce costs',
                'Free testers for high-value activities'
            ],
            antipatterns: [
                'Measuring success by test count alone',
                'Running tests that never fail',
                'Automating tests that rarely catch bugs'
            ]
        },
        skills: {
            title: 'Team and Skills',
            principles: [
                'Skilled testers are still essential',
                'Automation requires programming skills',
                'Cross-functional collaboration improves coverage',
                'Continuous learning is necessary'
            ],
            antipatterns: [
                'Expecting automation to replace testers',
                'Siloing automation work from development',
                'Not investing in training'
            ]
        }
    };

    /**
     * Gets lesson by category
     * @param {string} category - Category name
     * @returns {Object} Lesson details
     */
    static getLesson(category) {
        return this.lessons[category];
    }

    /**
     * Gets all lessons
     * @returns {Array} All lessons
     */
    static getAllLessons() {
        return Object.entries(this.lessons).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * QuoteOfTheDay provides daily inspiration.
 */
class QuoteOfTheDay {
    constructor(collection) {
        this.collection = collection;
        this.history = [];
    }

    /**
     * Gets today's quote (deterministic based on date)
     * @returns {Quotation} Today's quote
     */
    getToday() {
        const today = new Date();
        const dayOfYear = Math.floor(
            (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
        );
        const index = dayOfYear % this.collection.quotations.length;
        const quote = this.collection.quotations[index];

        this.history.push({
            date: today.toISOString().split('T')[0],
            quote: quote.getSummary()
        });

        return quote;
    }

    /**
     * Gets quote for specific theme
     * @param {string} theme - Theme
     * @returns {Quotation} Theme quote
     */
    getForTheme(theme) {
        const themed = this.collection.getByTheme(theme);
        if (themed.length === 0) return this.collection.getRandom();
        return themed[Math.floor(Math.random() * themed.length)];
    }

    /**
     * Gets history
     * @returns {Array} History of shown quotes
     */
    getHistory() {
        return this.history;
    }
}

/**
 * AutomationMaturityAssessment uses wisdom to assess maturity.
 */
class AutomationMaturityAssessment {
    static maturityLevels = {
        initial: {
            level: 1,
            name: 'Initial',
            description: 'Ad-hoc automation, no strategy',
            characteristics: ['Scattered automation efforts', 'No standards', 'High maintenance']
        },
        managed: {
            level: 2,
            name: 'Managed',
            description: 'Basic automation with some planning',
            characteristics: ['Some test selection criteria', 'Basic frameworks', 'Growing coverage']
        },
        defined: {
            level: 3,
            name: 'Defined',
            description: 'Established automation practices',
            characteristics: ['Clear strategy', 'Standards followed', 'Regular execution']
        },
        measured: {
            level: 4,
            name: 'Measured',
            description: 'Metrics-driven automation',
            characteristics: ['KPIs tracked', 'ROI measured', 'Continuous improvement']
        },
        optimizing: {
            level: 5,
            name: 'Optimizing',
            description: 'Continuously improving automation',
            characteristics: ['Self-healing tests', 'AI-assisted', 'Maximum value delivery']
        }
    };

    /**
     * Assesses maturity based on practices
     * @param {Object} practices - Current practices
     * @returns {Object} Assessment result
     */
    static assess(practices) {
        let score = 0;

        if (practices.hasStrategy) score++;
        if (practices.hasStandards) score++;
        if (practices.trackMetrics) score++;
        if (practices.regularExecution) score++;
        if (practices.continuousImprovement) score++;

        let level;
        if (score <= 1) level = 'initial';
        else if (score <= 2) level = 'managed';
        else if (score <= 3) level = 'defined';
        else if (score <= 4) level = 'measured';
        else level = 'optimizing';

        return {
            currentLevel: this.maturityLevels[level],
            score,
            maxScore: 5,
            recommendations: this.getRecommendations(level)
        };
    }

    /**
     * Gets recommendations for improvement
     * @param {string} level - Current level
     * @returns {Array} Recommendations
     */
    static getRecommendations(level) {
        const recs = {
            initial: ['Develop an automation strategy', 'Establish coding standards', 'Train the team'],
            managed: ['Define test selection criteria', 'Implement CI/CD integration', 'Start tracking metrics'],
            defined: ['Measure ROI systematically', 'Implement maintenance processes', 'Expand coverage'],
            measured: ['Explore AI-assisted testing', 'Implement self-healing tests', 'Optimize execution time'],
            optimizing: ['Share knowledge externally', 'Mentor other teams', 'Lead industry best practices']
        };
        return recs[level] || [];
    }
}

// Demonstration
console.log('=== Test Automation Quotations Demo ===\n');

// Quotation collection
console.log('--- Quotation Collection ---');
const collection = new QuotationCollection();
console.log('Statistics:', collection.getStatistics());

// Random quote
console.log('\n--- Random Quote ---');
console.log(collection.getRandom().format());

// Quotes by theme
console.log('\n--- Quotes by Theme: strategy ---');
collection.getByTheme('strategy').slice(0, 2).forEach(q => {
    console.log(q.format());
    console.log();
});

// Quote of the day
console.log('--- Quote of the Day ---');
const qotd = new QuoteOfTheDay(collection);
console.log(qotd.getToday().format());

// Theme-specific quote
console.log('\n--- Quote for Theme: reliability ---');
console.log(qotd.getForTheme('reliability').format());

// Automation wisdom
console.log('\n--- Automation Wisdom: Strategy ---');
const strategyLesson = AutomationWisdom.getLesson('strategy');
console.log(`${strategyLesson.title}:`);
console.log('Principles:', strategyLesson.principles.slice(0, 2));
console.log('Anti-patterns:', strategyLesson.antipatterns.slice(0, 2));

// All themes
console.log('\n--- Available Themes ---');
console.log(collection.getThemes());

// Maturity assessment
console.log('\n--- Maturity Assessment ---');
const assessment = AutomationMaturityAssessment.assess({
    hasStrategy: true,
    hasStandards: true,
    trackMetrics: false,
    regularExecution: true,
    continuousImprovement: false
});
console.log('Current Level:', assessment.currentLevel.name);
console.log('Score:', `${assessment.score}/${assessment.maxScore}`);
console.log('Recommendations:', assessment.recommendations);

// Add custom quote
console.log('\n--- Adding Custom Quote ---');
collection.add(new Quotation({
    text: 'A test that finds no bugs is not necessarily a good test.',
    author: 'Custom Wisdom',
    theme: 'value',
    context: 'philosophy'
}));
console.log('New total:', collection.quotations.length);

/**
 * Key Insights from Test Automation Quotations:
 *
 * 1. Automation amplifies human testers, not replaces them
 * 2. Strategy and planning are essential before automation
 * 3. Not everything should be automated
 * 4. Flaky tests destroy trust in the test suite
 * 5. Test code deserves the same care as production code
 * 6. Automation provides confidence for refactoring
 * 7. Early bug detection reduces costs significantly
 * 8. Skilled testers are still essential
 * 9. Maintenance is a significant part of automation cost
 * 10. Continuous improvement is key to long-term success
 */
