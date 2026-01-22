/**
 * Idioms - Common Expressions and Phrases
 *
 * Idioms are phrases or expressions that have a meaning different from
 * the literal meaning of the words. They are commonly used in everyday
 * language to add color or emphasis. Understanding idioms is important
 * for clear communication in software development teams.
 *
 * Key Concepts:
 * - Meaning differs from literal interpretation
 * - Context-dependent understanding
 * - Cultural and domain-specific usage
 * - Important for team communication
 */

/**
 * Idiom represents a single idiomatic expression.
 * Contains the phrase, meaning, and usage examples.
 */
class Idiom {
    constructor(options) {
        this.phrase = options.phrase;
        this.meaning = options.meaning;
        this.literalMeaning = options.literalMeaning;
        this.category = options.category || 'general';
        this.examples = options.examples || [];
        this.origin = options.origin;
        this.relatedIdioms = options.relatedIdioms || [];
    }

    /**
     * Adds a usage example
     * @param {string} example - Example sentence
     */
    addExample(example) {
        this.examples.push(example);
    }

    /**
     * Gets idiom description
     * @returns {Object} Description
     */
    describe() {
        return {
            phrase: this.phrase,
            meaning: this.meaning,
            category: this.category,
            exampleCount: this.examples.length
        };
    }

    /**
     * Formats idiom for display
     * @returns {string} Formatted string
     */
    format() {
        let output = `"${this.phrase}"\n`;
        output += `Meaning: ${this.meaning}\n`;

        if (this.literalMeaning) {
            output += `Literal: ${this.literalMeaning}\n`;
        }

        if (this.examples.length > 0) {
            output += `Example: ${this.examples[0]}\n`;
        }

        return output;
    }
}

/**
 * IdiomDictionary manages a collection of idioms.
 * Provides search and categorization functionality.
 */
class IdiomDictionary {
    constructor() {
        this.idioms = new Map();
        this.categories = new Set();
        this.loadProgrammingIdioms();
    }

    /**
     * Loads common programming-related idioms
     */
    loadProgrammingIdioms() {
        const programmingIdioms = [
            {
                phrase: 'The ball is in your court',
                meaning: "It's your turn to take action or make a decision",
                category: 'responsibility',
                examples: [
                    "I've submitted the PR, the ball is in your court now for review.",
                    "The ball is in your court to decide the architecture approach."
                ]
            },
            {
                phrase: 'Barking up the wrong tree',
                meaning: 'Pursuing a mistaken or misguided course of action',
                category: 'problem-solving',
                examples: [
                    "If you think the bug is in the frontend, you're barking up the wrong tree.",
                    "We were barking up the wrong tree looking at network issues when it was a code bug."
                ]
            },
            {
                phrase: 'Reinventing the wheel',
                meaning: 'Duplicating effort by creating something that already exists',
                category: 'efficiency',
                examples: [
                    "Don't reinvent the wheel - use the existing authentication library.",
                    "We spent weeks reinventing the wheel before finding the npm package."
                ]
            },
            {
                phrase: 'Hitting a wall',
                meaning: 'Reaching a point where progress stops',
                category: 'problem-solving',
                examples: [
                    "I've hit a wall with this debugging session.",
                    "The team hit a wall trying to optimize the algorithm further."
                ]
            },
            {
                phrase: 'Down the rabbit hole',
                meaning: 'Getting deeply involved in a complex investigation or task',
                category: 'investigation',
                examples: [
                    "I went down the rabbit hole debugging that memory leak.",
                    "Don't go down the rabbit hole - focus on the MVP first."
                ]
            },
            {
                phrase: 'Moving the goalposts',
                meaning: 'Changing the requirements or targets after work has begun',
                category: 'requirements',
                examples: [
                    "Every sprint they move the goalposts on what 'done' means.",
                    "Stop moving the goalposts - we agreed on these acceptance criteria."
                ]
            },
            {
                phrase: 'Low-hanging fruit',
                meaning: 'Easy tasks or quick wins that can be accomplished with minimal effort',
                category: 'prioritization',
                examples: [
                    "Let's tackle the low-hanging fruit first to build momentum.",
                    "The typos and formatting issues are low-hanging fruit for the intern."
                ]
            },
            {
                phrase: 'Silver bullet',
                meaning: 'A simple solution to a complex problem (often used skeptically)',
                category: 'solutions',
                examples: [
                    "There's no silver bullet for scaling - it requires multiple strategies.",
                    "Microservices aren't a silver bullet for all architecture problems."
                ]
            },
            {
                phrase: 'Yak shaving',
                meaning: 'A series of small tasks that lead away from the original goal',
                category: 'productivity',
                examples: [
                    "I spent all day yak shaving - updating npm to fix a build to run a test.",
                    "Recognize when you're yak shaving and step back."
                ]
            },
            {
                phrase: 'Technical debt',
                meaning: 'The implied cost of future rework caused by choosing an easy solution now',
                category: 'quality',
                examples: [
                    "We're accumulating technical debt with these quick fixes.",
                    "Let's pay down some technical debt this sprint."
                ]
            },
            {
                phrase: 'Bike-shedding',
                meaning: 'Spending disproportionate time on trivial matters',
                category: 'meetings',
                examples: [
                    "Let's not bike-shed on the variable naming - ship it.",
                    "The meeting devolved into bike-shedding about code formatting."
                ]
            },
            {
                phrase: 'Rubber duck debugging',
                meaning: 'Explaining code line-by-line to find bugs',
                category: 'debugging',
                examples: [
                    "Try rubber duck debugging - explain the code to your duck.",
                    "Rubber duck debugging helped me find the off-by-one error."
                ]
            }
        ];

        for (const idiomData of programmingIdioms) {
            this.add(new Idiom(idiomData));
        }
    }

    /**
     * Adds an idiom to the dictionary
     * @param {Idiom} idiom - Idiom to add
     */
    add(idiom) {
        this.idioms.set(idiom.phrase.toLowerCase(), idiom);
        this.categories.add(idiom.category);
    }

    /**
     * Looks up an idiom by phrase
     * @param {string} phrase - Phrase to look up
     * @returns {Idiom|null} Found idiom or null
     */
    lookup(phrase) {
        return this.idioms.get(phrase.toLowerCase());
    }

    /**
     * Searches idioms by keyword
     * @param {string} keyword - Keyword to search
     * @returns {Array} Matching idioms
     */
    search(keyword) {
        const lower = keyword.toLowerCase();
        const results = [];

        for (const idiom of this.idioms.values()) {
            if (idiom.phrase.toLowerCase().includes(lower) ||
                idiom.meaning.toLowerCase().includes(lower)) {
                results.push(idiom);
            }
        }

        return results;
    }

    /**
     * Gets idioms by category
     * @param {string} category - Category to filter by
     * @returns {Array} Matching idioms
     */
    getByCategory(category) {
        return Array.from(this.idioms.values())
            .filter(i => i.category === category);
    }

    /**
     * Gets all categories
     * @returns {Array} Categories
     */
    getCategories() {
        return Array.from(this.categories);
    }

    /**
     * Gets random idiom
     * @returns {Idiom} Random idiom
     */
    getRandom() {
        const idioms = Array.from(this.idioms.values());
        return idioms[Math.floor(Math.random() * idioms.length)];
    }

    /**
     * Gets dictionary statistics
     * @returns {Object} Statistics
     */
    getStats() {
        return {
            totalIdioms: this.idioms.size,
            categories: this.categories.size,
            byCategory: this.getCategories().map(c => ({
                category: c,
                count: this.getByCategory(c).length
            }))
        };
    }
}

/**
 * IdiomDetector finds idioms in text.
 * Useful for documentation and communication analysis.
 */
class IdiomDetector {
    constructor(dictionary) {
        this.dictionary = dictionary;
    }

    /**
     * Detects idioms in text
     * @param {string} text - Text to analyze
     * @returns {Array} Detected idioms
     */
    detect(text) {
        const detected = [];
        const lowerText = text.toLowerCase();

        for (const idiom of this.dictionary.idioms.values()) {
            // Check for exact or partial match
            const idiomWords = idiom.phrase.toLowerCase().split(' ');
            let found = true;

            for (const word of idiomWords) {
                if (!lowerText.includes(word)) {
                    found = false;
                    break;
                }
            }

            if (found && lowerText.includes(idiomWords.join(' ').substring(0, 10))) {
                detected.push({
                    phrase: idiom.phrase,
                    meaning: idiom.meaning,
                    category: idiom.category
                });
            }
        }

        return detected;
    }

    /**
     * Analyzes text for idiom density
     * @param {string} text - Text to analyze
     * @returns {Object} Analysis result
     */
    analyze(text) {
        const detected = this.detect(text);
        const wordCount = text.split(/\s+/).length;

        return {
            text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
            wordCount,
            idiomsFound: detected.length,
            idiomDensity: (detected.length / wordCount * 100).toFixed(2) + '%',
            idioms: detected
        };
    }
}

/**
 * IdiomQuiz tests understanding of idioms.
 * Useful for onboarding new team members.
 */
class IdiomQuiz {
    constructor(dictionary) {
        this.dictionary = dictionary;
        this.questions = [];
        this.score = 0;
    }

    /**
     * Generates quiz questions
     * @param {number} count - Number of questions
     */
    generate(count = 5) {
        const idioms = Array.from(this.dictionary.idioms.values());
        const shuffled = idioms.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        this.questions = selected.map((idiom, index) => {
            // Generate wrong answers
            const wrongAnswers = idioms
                .filter(i => i.phrase !== idiom.phrase)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(i => i.meaning);

            const options = [idiom.meaning, ...wrongAnswers]
                .sort(() => Math.random() - 0.5);

            return {
                number: index + 1,
                phrase: idiom.phrase,
                correctAnswer: idiom.meaning,
                options,
                answered: false,
                correct: null
            };
        });
    }

    /**
     * Answers a question
     * @param {number} questionNumber - Question number
     * @param {string} answer - Selected answer
     * @returns {Object} Result
     */
    answer(questionNumber, answer) {
        const question = this.questions.find(q => q.number === questionNumber);
        if (!question || question.answered) {
            return { valid: false };
        }

        question.answered = true;
        question.correct = answer === question.correctAnswer;

        if (question.correct) {
            this.score++;
        }

        return {
            valid: true,
            correct: question.correct,
            correctAnswer: question.correctAnswer
        };
    }

    /**
     * Gets quiz results
     * @returns {Object} Results
     */
    getResults() {
        const answered = this.questions.filter(q => q.answered).length;

        return {
            totalQuestions: this.questions.length,
            answered,
            correct: this.score,
            percentage: `${((this.score / this.questions.length) * 100).toFixed(1)}%`,
            complete: answered === this.questions.length
        };
    }
}

/**
 * IdiomTranslator helps with cross-cultural understanding.
 * Maps idioms across different contexts.
 */
class IdiomTranslator {
    static equivalents = {
        'The ball is in your court': {
            formal: 'It is now your responsibility to take action',
            technical: 'The task is assigned to you for completion',
            emoji: '🏀➡️👤'
        },
        'Barking up the wrong tree': {
            formal: 'Investigating an incorrect hypothesis',
            technical: 'Debugging the wrong component',
            emoji: '🐕🌳❌'
        },
        'Low-hanging fruit': {
            formal: 'Tasks with minimal effort and high likelihood of success',
            technical: 'Quick wins with low complexity',
            emoji: '🍎⬇️'
        },
        'Silver bullet': {
            formal: 'A simple, universal solution (often mythical)',
            technical: 'A single solution that solves all cases',
            emoji: '🔫✨'
        },
        'Technical debt': {
            formal: 'Accumulated cost of expedient decisions',
            technical: 'Suboptimal code requiring future refactoring',
            emoji: '💳💻'
        }
    };

    /**
     * Translates idiom to different contexts
     * @param {string} phrase - Idiom phrase
     * @returns {Object} Translations
     */
    static translate(phrase) {
        return this.equivalents[phrase] || {
            formal: 'No translation available',
            technical: 'No translation available'
        };
    }

    /**
     * Gets all translations
     * @returns {Object} All equivalents
     */
    static getAll() {
        return this.equivalents;
    }
}

// Demonstration
console.log('=== Programming Idioms Demo ===\n');

// Create dictionary
const dictionary = new IdiomDictionary();

console.log('--- Dictionary Statistics ---');
console.log(dictionary.getStats());

// Look up specific idiom
console.log('\n--- Idiom Lookup ---');
const ballInCourt = dictionary.lookup("The ball is in your court");
if (ballInCourt) {
    console.log(ballInCourt.format());
}

// Search idioms
console.log('--- Search for "wrong" ---');
const searchResults = dictionary.search('wrong');
searchResults.forEach(idiom => {
    console.log(`  ${idiom.phrase}: ${idiom.meaning}`);
});

// Get by category
console.log('\n--- Problem-solving Idioms ---');
const problemSolving = dictionary.getByCategory('problem-solving');
problemSolving.forEach(idiom => {
    console.log(`  "${idiom.phrase}"`);
});

// Detect idioms in text
console.log('\n--- Idiom Detection ---');
const detector = new IdiomDetector(dictionary);
const sampleText = "I think we're barking up the wrong tree with this approach. " +
                   "The ball is in your court to decide. Let's focus on the low-hanging fruit.";

console.log('Text:', sampleText);
console.log('Analysis:', detector.analyze(sampleText));

// Quiz
console.log('\n--- Idiom Quiz ---');
const quiz = new IdiomQuiz(dictionary);
quiz.generate(3);
console.log('Questions:');
quiz.questions.forEach(q => {
    console.log(`  ${q.number}. "${q.phrase}"`);
    console.log(`     Options: ${q.options.slice(0, 2).join(' | ')}`);
});

// Translations
console.log('\n--- Idiom Translations ---');
console.log('Technical debt:', IdiomTranslator.translate('Technical debt'));

/**
 * Best Practices for Using Idioms in Teams:
 *
 * 1. Be aware that non-native speakers may not understand idioms
 * 2. Use idioms sparingly in documentation
 * 3. Prefer clear language in technical specifications
 * 4. Create a team glossary for common idioms
 * 5. Explain idioms when onboarding new team members
 * 6. Consider cultural differences in global teams
 * 7. Use idioms to build team culture and rapport
 * 8. Avoid idioms in user-facing content
 * 9. Know when formality requires plain language
 * 10. Have fun with idioms in casual communication
 */
