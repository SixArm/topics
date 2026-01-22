/**
 * Localization Testing - Verifying Regional Adaptations
 *
 * Localization testing ensures software can be adapted to different
 * languages, cultures, and regions without losing functionality or
 * usability. It validates UI/UX, content, functionality, cultural
 * appropriateness, and legal compliance for target markets.
 *
 * Key Concepts:
 * - Language and translation accuracy
 * - Cultural appropriateness
 * - Date, time, currency formats
 * - UI layout for different text lengths
 */

/**
 * Locale represents a target region/language for testing.
 * Contains regional settings and requirements.
 */
class Locale {
    constructor(options) {
        this.code = options.code; // e.g., 'en-US', 'ja-JP'
        this.language = options.language;
        this.region = options.region;
        this.script = options.script; // e.g., 'Latin', 'Kanji'
        this.direction = options.direction || 'ltr'; // ltr or rtl
        this.settings = {
            dateFormat: options.dateFormat || 'MM/DD/YYYY',
            timeFormat: options.timeFormat || '12h',
            numberFormat: options.numberFormat || { decimal: '.', thousands: ',' },
            currency: options.currency || 'USD',
            currencySymbol: options.currencySymbol || '$',
            firstDayOfWeek: options.firstDayOfWeek || 0 // 0 = Sunday
        };
    }

    /**
     * Formats a date according to locale
     * @param {Date} date - Date to format
     * @returns {string} Formatted date
     */
    formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return this.settings.dateFormat
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
    }

    /**
     * Formats a number according to locale
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(
            /\B(?=(\d{3})+(?!\d))/g,
            this.settings.numberFormat.thousands
        );
        return parts.join(this.settings.numberFormat.decimal);
    }

    /**
     * Formats currency according to locale
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency
     */
    formatCurrency(amount) {
        return `${this.settings.currencySymbol}${this.formatNumber(amount.toFixed(2))}`;
    }

    /**
     * Gets locale summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            code: this.code,
            language: this.language,
            region: this.region,
            direction: this.direction,
            dateFormat: this.settings.dateFormat,
            currency: this.settings.currency
        };
    }
}

/**
 * TranslationValidator validates translations for a locale.
 * Checks for common translation issues.
 */
class TranslationValidator {
    constructor() {
        this.issues = [];
    }

    /**
     * Validates a translation
     * @param {string} key - Translation key
     * @param {string} source - Source text
     * @param {string} translation - Translated text
     * @param {Locale} locale - Target locale
     * @returns {Object} Validation result
     */
    validate(key, source, translation, locale) {
        const issues = [];

        // Check for empty translation
        if (!translation || translation.trim() === '') {
            issues.push({ type: 'empty', message: 'Translation is empty' });
        }

        // Check for untranslated text (same as source)
        if (translation === source && locale.language !== 'en') {
            issues.push({ type: 'untranslated', message: 'Text appears untranslated' });
        }

        // Check for placeholder consistency
        const sourcePlaceholders = this.extractPlaceholders(source);
        const translationPlaceholders = this.extractPlaceholders(translation);
        if (!this.arraysEqual(sourcePlaceholders, translationPlaceholders)) {
            issues.push({
                type: 'placeholders',
                message: 'Placeholder mismatch',
                source: sourcePlaceholders,
                translation: translationPlaceholders
            });
        }

        // Check for excessive length difference
        const lengthRatio = translation.length / source.length;
        if (lengthRatio > 2 || lengthRatio < 0.5) {
            issues.push({
                type: 'length',
                message: `Translation length differs significantly (${Math.round(lengthRatio * 100)}%)`,
                ratio: lengthRatio
            });
        }

        // Check for leading/trailing whitespace issues
        if (translation !== translation.trim()) {
            issues.push({
                type: 'whitespace',
                message: 'Translation has leading or trailing whitespace'
            });
        }

        this.issues.push(...issues.map(i => ({ ...i, key })));

        return {
            key,
            valid: issues.length === 0,
            issues
        };
    }

    /**
     * Extracts placeholders from text
     * @param {string} text - Text to analyze
     * @returns {Array} Found placeholders
     */
    extractPlaceholders(text) {
        const patterns = [
            /\{[^}]+\}/g,      // {placeholder}
            /%[sd@]/g,         // %s, %d, %@
            /\$\{[^}]+\}/g,    // ${placeholder}
            /{{[^}]+}}/g       // {{placeholder}}
        ];

        const placeholders = [];
        for (const pattern of patterns) {
            const matches = text.match(pattern);
            if (matches) {
                placeholders.push(...matches);
            }
        }

        return placeholders.sort();
    }

    /**
     * Compares two arrays for equality
     * @param {Array} a - First array
     * @param {Array} b - Second array
     * @returns {boolean} True if equal
     */
    arraysEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    /**
     * Gets validation summary
     * @returns {Object} Summary
     */
    getSummary() {
        const byType = {};
        for (const issue of this.issues) {
            byType[issue.type] = (byType[issue.type] || 0) + 1;
        }

        return {
            totalIssues: this.issues.length,
            byType,
            issues: this.issues
        };
    }
}

/**
 * UILayoutTester tests UI layout for different locales.
 * Detects text overflow, truncation, and layout issues.
 */
class UILayoutTester {
    constructor() {
        this.results = [];
    }

    /**
     * Tests a UI element for layout issues
     * @param {Object} element - UI element to test
     * @param {string} text - Localized text
     * @param {Locale} locale - Target locale
     * @returns {Object} Test result
     */
    testElement(element, text, locale) {
        const issues = [];

        // Estimate text width (simplified)
        const estimatedWidth = this.estimateTextWidth(text, element.fontSize);

        // Check for overflow
        if (estimatedWidth > element.maxWidth) {
            issues.push({
                type: 'overflow',
                message: 'Text may overflow container',
                estimatedWidth,
                maxWidth: element.maxWidth
            });
        }

        // Check for RTL issues
        if (locale.direction === 'rtl' && !element.supportsRTL) {
            issues.push({
                type: 'rtl',
                message: 'Element does not support RTL layout'
            });
        }

        // Check for character support
        if (locale.script !== 'Latin' && !element.supportsUnicode) {
            issues.push({
                type: 'unicode',
                message: `Element may not support ${locale.script} characters`
            });
        }

        const result = {
            element: element.name,
            locale: locale.code,
            text: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
            passed: issues.length === 0,
            issues
        };

        this.results.push(result);
        return result;
    }

    /**
     * Estimates text width
     * @param {string} text - Text to measure
     * @param {number} fontSize - Font size in pixels
     * @returns {number} Estimated width
     */
    estimateTextWidth(text, fontSize) {
        // Simplified estimation (actual would use canvas or DOM measurement)
        const avgCharWidth = fontSize * 0.6;
        return text.length * avgCharWidth;
    }

    /**
     * Gets test summary
     * @returns {Object} Summary
     */
    getSummary() {
        const passed = this.results.filter(r => r.passed).length;
        return {
            total: this.results.length,
            passed,
            failed: this.results.length - passed,
            passRate: `${((passed / this.results.length) * 100).toFixed(1)}%`
        };
    }
}

/**
 * CulturalContentChecker validates cultural appropriateness.
 * Flags potentially problematic content for review.
 */
class CulturalContentChecker {
    constructor() {
        this.flags = [];
        this.sensitivePatterns = this.definePatterns();
    }

    /**
     * Defines patterns to check
     * @returns {Array} Pattern definitions
     */
    definePatterns() {
        return [
            {
                category: 'colors',
                description: 'Colors may have different meanings',
                patterns: ['white', 'red', 'black', 'green'],
                regions: ['CN', 'JP', 'IN']
            },
            {
                category: 'numbers',
                description: 'Numbers may be considered lucky/unlucky',
                patterns: ['4', '13', '7', '8'],
                regions: ['CN', 'JP', 'US']
            },
            {
                category: 'gestures',
                description: 'Hand gestures may be offensive',
                patterns: ['thumbs up', 'ok sign', 'pointing'],
                regions: ['global']
            },
            {
                category: 'animals',
                description: 'Animals may have cultural significance',
                patterns: ['pig', 'cow', 'dog', 'owl'],
                regions: ['global']
            }
        ];
    }

    /**
     * Checks content for cultural issues
     * @param {string} content - Content to check
     * @param {Locale} locale - Target locale
     * @returns {Object} Check result
     */
    check(content, locale) {
        const flags = [];
        const lowerContent = content.toLowerCase();

        for (const pattern of this.sensitivePatterns) {
            if (pattern.regions.includes(locale.region) || pattern.regions.includes('global')) {
                for (const term of pattern.patterns) {
                    if (lowerContent.includes(term)) {
                        flags.push({
                            category: pattern.category,
                            term,
                            description: pattern.description,
                            recommendation: 'Review for cultural appropriateness'
                        });
                    }
                }
            }
        }

        this.flags.push(...flags.map(f => ({ ...f, locale: locale.code })));

        return {
            content: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
            locale: locale.code,
            flagCount: flags.length,
            flags,
            requiresReview: flags.length > 0
        };
    }

    /**
     * Gets check summary
     * @returns {Object} Summary
     */
    getSummary() {
        const byCategory = {};
        for (const flag of this.flags) {
            byCategory[flag.category] = (byCategory[flag.category] || 0) + 1;
        }

        return {
            totalFlags: this.flags.length,
            byCategory
        };
    }
}

/**
 * LocalizationTestSuite coordinates localization testing.
 * Runs all localization checks for a set of locales.
 */
class LocalizationTestSuite {
    constructor(name) {
        this.name = name;
        this.locales = [];
        this.translations = new Map();
        this.results = [];
    }

    /**
     * Adds a locale to test
     * @param {Locale} locale - Locale to add
     */
    addLocale(locale) {
        this.locales.push(locale);
    }

    /**
     * Adds translations for a locale
     * @param {string} localeCode - Locale code
     * @param {Object} translations - Translation key-value pairs
     */
    addTranslations(localeCode, translations) {
        this.translations.set(localeCode, translations);
    }

    /**
     * Runs full localization test
     * @param {Object} sourceStrings - Source language strings
     * @returns {Object} Test results
     */
    run(sourceStrings) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Localization Test Suite: ${this.name}`);
        console.log(`${'='.repeat(50)}`);

        const results = {
            suite: this.name,
            locales: [],
            summary: { passed: 0, failed: 0, warnings: 0 }
        };

        for (const locale of this.locales) {
            console.log(`\nTesting locale: ${locale.code}`);
            const localeResult = this.testLocale(locale, sourceStrings);
            results.locales.push(localeResult);

            if (localeResult.status === 'passed') results.summary.passed++;
            else if (localeResult.status === 'failed') results.summary.failed++;
            else results.summary.warnings++;
        }

        this.results = results;
        return results;
    }

    /**
     * Tests a single locale
     * @param {Locale} locale - Locale to test
     * @param {Object} sourceStrings - Source strings
     * @returns {Object} Locale test result
     */
    testLocale(locale, sourceStrings) {
        const translations = this.translations.get(locale.code) || {};
        const translationValidator = new TranslationValidator();
        const culturalChecker = new CulturalContentChecker();

        // Validate translations
        for (const [key, source] of Object.entries(sourceStrings)) {
            const translation = translations[key] || '';
            translationValidator.validate(key, source, translation, locale);
            if (translation) {
                culturalChecker.check(translation, locale);
            }
        }

        const translationSummary = translationValidator.getSummary();
        const culturalSummary = culturalChecker.getSummary();

        const status = translationSummary.totalIssues === 0 && culturalSummary.totalFlags === 0
            ? 'passed'
            : translationSummary.totalIssues > 5 ? 'failed' : 'warning';

        console.log(`  Translation issues: ${translationSummary.totalIssues}`);
        console.log(`  Cultural flags: ${culturalSummary.totalFlags}`);
        console.log(`  Status: ${status.toUpperCase()}`);

        return {
            locale: locale.code,
            status,
            translationIssues: translationSummary,
            culturalFlags: culturalSummary
        };
    }

    /**
     * Generates test report
     * @returns {Object} Test report
     */
    generateReport() {
        return {
            suite: this.name,
            timestamp: new Date().toISOString(),
            results: this.results,
            coverage: {
                localesTested: this.locales.length,
                stringsChecked: this.translations.size
            }
        };
    }
}

// Demonstration
console.log('=== Localization Testing Demo ===\n');

// Create locales
const enUS = new Locale({
    code: 'en-US',
    language: 'English',
    region: 'US',
    script: 'Latin',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    currencySymbol: '$'
});

const jaJP = new Locale({
    code: 'ja-JP',
    language: 'Japanese',
    region: 'JP',
    script: 'Kanji',
    dateFormat: 'YYYY/MM/DD',
    currency: 'JPY',
    currencySymbol: '¥'
});

const arSA = new Locale({
    code: 'ar-SA',
    language: 'Arabic',
    region: 'SA',
    script: 'Arabic',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    currency: 'SAR',
    currencySymbol: 'ر.س'
});

console.log('--- Locale Formatting ---');
const testDate = new Date(2024, 0, 15);
console.log(`en-US date: ${enUS.formatDate(testDate)}`);
console.log(`ja-JP date: ${jaJP.formatDate(testDate)}`);
console.log(`ar-SA date: ${arSA.formatDate(testDate)}`);

console.log(`\nen-US currency: ${enUS.formatCurrency(1234.56)}`);
console.log(`ja-JP currency: ${jaJP.formatCurrency(1234.56)}`);

// Create test suite
const suite = new LocalizationTestSuite('E-commerce App');
suite.addLocale(enUS);
suite.addLocale(jaJP);
suite.addLocale(arSA);

// Add translations
suite.addTranslations('ja-JP', {
    'welcome': 'ようこそ',
    'add_to_cart': 'カートに追加',
    'checkout': 'チェックアウト'
});

suite.addTranslations('ar-SA', {
    'welcome': 'أهلاً بك',
    'add_to_cart': 'أضف إلى السلة',
    'checkout': ''  // Missing translation
});

// Source strings
const sourceStrings = {
    'welcome': 'Welcome',
    'add_to_cart': 'Add to Cart',
    'checkout': 'Checkout'
};

// Run tests
const results = suite.run(sourceStrings);
console.log('\n--- Final Summary ---');
console.log('Results:', results.summary);

// UI Layout testing
console.log('\n--- UI Layout Testing ---');
const layoutTester = new UILayoutTester();

const buttonElement = {
    name: 'Submit Button',
    maxWidth: 120,
    fontSize: 14,
    supportsRTL: false,
    supportsUnicode: true
};

console.log('Testing button with Japanese text:');
console.log(layoutTester.testElement(buttonElement, 'カートに追加する', jaJP));

console.log('\nTesting button with Arabic text:');
console.log(layoutTester.testElement(buttonElement, 'أضف إلى سلة التسوق', arSA));

/**
 * Best Practices for Localization Testing:
 *
 * 1. Test early and continuously throughout development
 * 2. Use native speakers or professional translators
 * 3. Test on actual devices in target markets
 * 4. Verify date, time, number, and currency formats
 * 5. Check text expansion/contraction in UI
 * 6. Test RTL languages specifically
 * 7. Validate cultural appropriateness
 * 8. Ensure legal compliance for each region
 * 9. Test with pseudo-localization first
 * 10. Maintain translation memory and glossaries
 */
