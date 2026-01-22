/**
 * Software Programming Quotations - Wisdom from Industry Experts
 *
 * Software programming quotations capture timeless wisdom and insights from
 * industry pioneers, thought leaders, and experienced practitioners. These
 * quotes reflect fundamental principles about code quality, software design,
 * team dynamics, and the craft of programming.
 *
 * Key Concepts:
 * - Code readability and maintainability
 * - Problem-solving approaches
 * - Quality and craftsmanship
 * - Team collaboration
 */

/**
 * Quotation represents a programming wisdom quote.
 */
class Quotation {
    constructor(options) {
        this.text = options.text;
        this.author = options.author;
        this.source = options.source || null;
        this.categories = options.categories || [];
        this.year = options.year || null;
    }

    /**
     * Formats the quotation
     * @returns {string} Formatted quote
     */
    format() {
        let formatted = `"${this.text}"`;
        formatted += ` - ${this.author}`;
        if (this.source) {
            formatted += `, ${this.source}`;
        }
        if (this.year) {
            formatted += ` (${this.year})`;
        }
        return formatted;
    }

    /**
     * Gets short version
     * @param {number} maxLength - Maximum length
     * @returns {string} Shortened quote
     */
    getShort(maxLength = 100) {
        if (this.text.length <= maxLength) {
            return this.text;
        }
        return this.text.substring(0, maxLength - 3) + '...';
    }
}

/**
 * QuotationCollection manages a collection of quotes.
 */
class QuotationCollection {
    constructor() {
        this.quotations = [];
    }

    /**
     * Adds a quotation
     * @param {Object} quoteData - Quote data
     */
    add(quoteData) {
        this.quotations.push(new Quotation(quoteData));
    }

    /**
     * Gets quotes by category
     * @param {string} category - Category name
     * @returns {Array} Matching quotes
     */
    getByCategory(category) {
        return this.quotations.filter(q =>
            q.categories.includes(category)
        );
    }

    /**
     * Gets quotes by author
     * @param {string} author - Author name
     * @returns {Array} Matching quotes
     */
    getByAuthor(author) {
        return this.quotations.filter(q =>
            q.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    /**
     * Gets a random quote
     * @param {string} category - Optional category filter
     * @returns {Quotation} Random quote
     */
    getRandom(category = null) {
        let pool = this.quotations;
        if (category) {
            pool = this.getByCategory(category);
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    /**
     * Searches quotes
     * @param {string} term - Search term
     * @returns {Array} Matching quotes
     */
    search(term) {
        const lowerTerm = term.toLowerCase();
        return this.quotations.filter(q =>
            q.text.toLowerCase().includes(lowerTerm) ||
            q.author.toLowerCase().includes(lowerTerm)
        );
    }
}

/**
 * ProgrammingWisdom provides categorized programming quotes.
 */
class ProgrammingWisdom {
    static quotes = {
        codeQuality: [
            {
                text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
                author: 'Harold Abelson',
                source: 'Structure and Interpretation of Computer Programs',
                categories: ['readability', 'code-quality']
            },
            {
                text: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
                author: 'John F. Woods',
                categories: ['maintainability', 'code-quality', 'humor']
            },
            {
                text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
                author: 'Martin Fowler',
                source: 'Refactoring',
                categories: ['readability', 'code-quality']
            },
            {
                text: 'The best code is no code at all.',
                author: 'Jeff Atwood',
                categories: ['simplicity', 'code-quality']
            }
        ],
        problemSolving: [
            {
                text: 'First, solve the problem. Then, write the code.',
                author: 'John Johnson',
                categories: ['problem-solving', 'planning']
            },
            {
                text: 'The best way to predict the future is to implement it.',
                author: 'David Heinemeier Hansson',
                categories: ['problem-solving', 'innovation']
            },
            {
                text: "It's not at all important to get it right the first time. It's vitally important to get it right the last time.",
                author: 'Andrew Hunt and David Thomas',
                source: 'The Pragmatic Programmer',
                categories: ['problem-solving', 'iteration']
            }
        ],
        measurement: [
            {
                text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
                author: 'Bill Gates',
                categories: ['metrics', 'measurement']
            },
            {
                text: 'If you cant measure it, you cant improve it.',
                author: 'Peter Drucker',
                categories: ['metrics', 'improvement']
            }
        ],
        debugging: [
            {
                text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
                author: 'Brian W. Kernighan',
                categories: ['debugging', 'simplicity']
            },
            {
                text: 'The most effective debugging tool is still careful thought, coupled with judiciously placed print statements.',
                author: 'Brian W. Kernighan',
                categories: ['debugging']
            }
        ],
        design: [
            {
                text: 'Simplicity is prerequisite for reliability.',
                author: 'Edsger W. Dijkstra',
                categories: ['simplicity', 'design']
            },
            {
                text: 'Make it work, make it right, make it fast.',
                author: 'Kent Beck',
                categories: ['design', 'optimization']
            },
            {
                text: 'Software is a great combination of artistry and engineering.',
                author: 'Bill Gates',
                categories: ['design', 'craftsmanship']
            }
        ],
        virtues: [
            {
                text: 'Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.',
                author: 'Larry Wall',
                categories: ['humor', 'philosophy']
            },
            {
                text: "Programming isn't about what you know; it's about what you can figure out.",
                author: 'Chris Pine',
                categories: ['learning', 'problem-solving']
            }
        ]
    };

    /**
     * Gets quotes by topic
     * @param {string} topic - Topic name
     * @returns {Array} Quotes
     */
    static getByTopic(topic) {
        return this.quotes[topic] || [];
    }

    /**
     * Gets all topics
     * @returns {Array} Topic names
     */
    static getTopics() {
        return Object.keys(this.quotes);
    }

    /**
     * Gets all quotes
     * @returns {Array} All quotes
     */
    static getAllQuotes() {
        return Object.values(this.quotes).flat();
    }
}

/**
 * QuoteOfTheDay provides daily inspiration.
 */
class QuoteOfTheDay {
    /**
     * Gets quote for a specific date
     * @param {Date} date - Date
     * @returns {Object} Quote
     */
    static getForDate(date = new Date()) {
        const allQuotes = ProgrammingWisdom.getAllQuotes();
        const dayOfYear = this.getDayOfYear(date);
        const index = dayOfYear % allQuotes.length;
        return allQuotes[index];
    }

    /**
     * Gets day of year
     * @param {Date} date - Date
     * @returns {number} Day of year
     */
    static getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    /**
     * Formats for display
     * @param {Object} quote - Quote to format
     * @returns {string} Formatted display
     */
    static formatForDisplay(quote) {
        return `
╔════════════════════════════════════════════════╗
║           Quote of the Day                      ║
╠════════════════════════════════════════════════╣
║                                                 ║
  "${quote.text}"
║                                                 ║
  - ${quote.author}
${quote.source ? `  (${quote.source})` : ''}
║                                                 ║
╚════════════════════════════════════════════════╝`;
    }
}

/**
 * WisdomApplicator helps apply quotes to real situations.
 */
class WisdomApplicator {
    /**
     * Gets applicable wisdom for a situation
     * @param {string} situation - Current situation
     * @returns {Object} Applicable wisdom
     */
    static getWisdom(situation) {
        const situations = {
            'code-review': {
                quotes: ProgrammingWisdom.getByTopic('codeQuality'),
                advice: 'Focus on readability and maintainability'
            },
            'debugging': {
                quotes: ProgrammingWisdom.getByTopic('debugging'),
                advice: 'Simplify and use systematic approaches'
            },
            'design': {
                quotes: ProgrammingWisdom.getByTopic('design'),
                advice: 'Start simple, refine iteratively'
            },
            'stuck': {
                quotes: ProgrammingWisdom.getByTopic('problemSolving'),
                advice: 'Step back and understand the problem first'
            },
            'metrics': {
                quotes: ProgrammingWisdom.getByTopic('measurement'),
                advice: 'Measure what matters, not what is easy'
            }
        };

        const applicable = situations[situation] || {
            quotes: ProgrammingWisdom.getAllQuotes().slice(0, 3),
            advice: 'General programming wisdom'
        };

        return {
            situation,
            ...applicable,
            recommendation: applicable.quotes[0]
        };
    }
}

// Demonstration
console.log('=== Software Programming Quotations Demo ===\n');

// Quote collection
console.log('--- Quotation Collection ---');
const collection = new QuotationCollection();

collection.add({
    text: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
    categories: ['action', 'code']
});

collection.add({
    text: 'Code is like humor. When you have to explain it, its bad.',
    author: 'Cory House',
    categories: ['readability', 'humor']
});

console.log('Random quote:', collection.getRandom()?.format());

// Programming wisdom by topic
console.log('\n--- Programming Wisdom by Topic ---');
ProgrammingWisdom.getTopics().slice(0, 4).forEach(topic => {
    const quotes = ProgrammingWisdom.getByTopic(topic);
    console.log(`\n${topic} (${quotes.length} quotes):`);
    if (quotes[0]) {
        console.log(`  "${quotes[0].text.substring(0, 60)}..."`);
        console.log(`  - ${quotes[0].author}`);
    }
});

// Quote of the day
console.log('\n--- Quote of the Day ---');
const qotd = QuoteOfTheDay.getForDate();
console.log(`"${qotd.text}"`);
console.log(`- ${qotd.author}`);

// Wisdom applicator
console.log('\n--- Applicable Wisdom ---');
const wisdom = WisdomApplicator.getWisdom('debugging');
console.log(`Situation: ${wisdom.situation}`);
console.log(`Advice: ${wisdom.advice}`);
if (wisdom.recommendation) {
    console.log(`Recommended quote: "${wisdom.recommendation.text.substring(0, 50)}..."`);
}

// All quotes count
console.log('\n--- Collection Statistics ---');
console.log('Total quotes:', ProgrammingWisdom.getAllQuotes().length);
console.log('Topics:', ProgrammingWisdom.getTopics());

/**
 * Best Practices for Learning from Quotations:
 *
 * 1. Reflect on quotes, dont just read them
 * 2. Apply wisdom to your current work
 * 3. Share relevant quotes with your team
 * 4. Understand the context behind famous quotes
 * 5. Question and validate advice against experience
 * 6. Use quotes to spark discussion
 * 7. Build your own collection of meaningful quotes
 * 8. Balance wisdom with practical experience
 * 9. Remember that context matters
 * 10. Let quotes inspire, not dictate
 */
