/**
 * Rubber Duck Debugging - Explaining Problems to Find Solutions
 *
 * The Rubber Duck Debugger is a playful and creative approach that many
 * programmers use to solve coding problems. The idea is simple: when stuck
 * on a coding issue, explain the problem to a rubber duck (or any object)
 * in detail. By vocalizing step-by-step, you often gain better understanding
 * and discover the root cause or solution.
 *
 * Key Concepts:
 * - Verbalizing forces clear thinking
 * - Step-by-step explanation reveals gaps
 * - "Teaching" helps understanding
 * - Silent listener, powerful technique
 */

/**
 * RubberDuck represents a debugging companion.
 */
class RubberDuck {
    constructor(name = 'Quackers') {
        this.name = name;
        this.sessionsHelped = 0;
        this.problemsSolved = 0;
        this.insights = [];
    }

    /**
     * Starts a debugging session
     * @param {string} problem - Problem description
     * @returns {DebuggingSession} New session
     */
    startSession(problem) {
        this.sessionsHelped++;
        return new DebuggingSession(this, problem);
    }

    /**
     * Records a solved problem
     * @param {string} insight - What was learned
     */
    recordSolution(insight) {
        this.problemsSolved++;
        this.insights.push({
            insight,
            timestamp: new Date()
        });
    }

    /**
     * Gets duck statistics
     * @returns {Object} Statistics
     */
    getStats() {
        return {
            name: this.name,
            sessionsHelped: this.sessionsHelped,
            problemsSolved: this.problemsSolved,
            successRate: this.sessionsHelped > 0
                ? (this.problemsSolved / this.sessionsHelped * 100).toFixed(1) + '%'
                : 'N/A',
            recentInsights: this.insights.slice(-3)
        };
    }

    /**
     * Quacks encouragement
     * @returns {string} Encouragement
     */
    quack() {
        const encouragements = [
            'Quack! Tell me more about that.',
            'Quack quack! What happens next?',
            'Quack! And why does that happen?',
            'Quack! Can you break that down further?',
            'Quack quack! What did you expect to happen?'
        ];
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }
}

/**
 * DebuggingSession represents a rubber duck debugging session.
 */
class DebuggingSession {
    constructor(duck, problem) {
        this.duck = duck;
        this.problem = problem;
        this.startedAt = new Date();
        this.explanations = [];
        this.assumptions = [];
        this.questions = [];
        this.insight = null;
        this.solved = false;
    }

    /**
     * Explains part of the problem
     * @param {string} explanation - Explanation text
     * @returns {string} Duck response
     */
    explain(explanation) {
        this.explanations.push({
            text: explanation,
            timestamp: new Date()
        });
        return this.duck.quack();
    }

    /**
     * Records an assumption
     * @param {string} assumption - Assumption text
     */
    noteAssumption(assumption) {
        this.assumptions.push({
            text: assumption,
            verified: false,
            timestamp: new Date()
        });
    }

    /**
     * Records a question that arose
     * @param {string} question - Question text
     */
    noteQuestion(question) {
        this.questions.push({
            text: question,
            answered: false,
            timestamp: new Date()
        });
    }

    /**
     * Verifies an assumption
     * @param {number} index - Assumption index
     * @param {boolean} result - Verification result
     */
    verifyAssumption(index, result) {
        if (this.assumptions[index]) {
            this.assumptions[index].verified = true;
            this.assumptions[index].wasCorrect = result;
        }
    }

    /**
     * Records the insight/solution
     * @param {string} insight - What was discovered
     */
    recordInsight(insight) {
        this.insight = insight;
        this.solved = true;
        this.endedAt = new Date();
        this.duck.recordSolution(insight);
    }

    /**
     * Gets session summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            problem: this.problem,
            duration: this.endedAt
                ? (this.endedAt - this.startedAt) / 1000 + ' seconds'
                : 'In progress',
            explanationsGiven: this.explanations.length,
            assumptionsMade: this.assumptions.length,
            assumptionsVerified: this.assumptions.filter(a => a.verified).length,
            questionsRaised: this.questions.length,
            questionsAnswered: this.questions.filter(q => q.answered).length,
            solved: this.solved,
            insight: this.insight
        };
    }
}

/**
 * DebuggingPrompts provides prompts to guide rubber duck sessions.
 */
class DebuggingPrompts {
    static prompts = {
        describe: [
            'What is the code supposed to do?',
            'What input does it receive?',
            'What output do you expect?',
            'What output are you actually getting?'
        ],
        walkthrough: [
            'Walk me through the code line by line.',
            'What happens at each step?',
            'Where does the execution flow go?',
            'What are the values of the variables at this point?'
        ],
        assumptions: [
            'What assumptions are you making?',
            'Have you verified those assumptions?',
            'What if that assumption is wrong?',
            'Are the types what you expect?'
        ],
        boundaries: [
            'What are the edge cases?',
            'What happens with empty input?',
            'What happens with null or undefined?',
            'What about very large or very small values?'
        ],
        simplify: [
            'Can you reproduce the problem with simpler input?',
            'What is the minimal code that shows the bug?',
            'Have you isolated the problem?',
            'Which component is actually failing?'
        ],
        recent: [
            'What changed recently?',
            'When did it last work correctly?',
            'What commits have been made since then?',
            'Are there any new dependencies?'
        ]
    };

    /**
     * Gets prompts by category
     * @param {string} category - Prompt category
     * @returns {Array} Prompts
     */
    static getByCategory(category) {
        return this.prompts[category] || [];
    }

    /**
     * Gets all categories
     * @returns {Array} Categories
     */
    static getCategories() {
        return Object.keys(this.prompts);
    }

    /**
     * Gets a random prompt
     * @returns {string} Random prompt
     */
    static getRandom() {
        const allPrompts = Object.values(this.prompts).flat();
        return allPrompts[Math.floor(Math.random() * allPrompts.length)];
    }
}

/**
 * CommonInsights represents patterns often discovered through rubber duck debugging.
 */
class CommonInsights {
    static insights = {
        offByOne: {
            pattern: 'Off-by-one error',
            description: 'Loop boundary is wrong (< vs <=, or starting at 0 vs 1)',
            signs: ['Works for some inputs but not edge cases', 'Array index out of bounds'],
            discovery: 'Walking through the loop iteration by iteration'
        },
        wrongVariable: {
            pattern: 'Wrong variable used',
            description: 'Using a similar named variable instead of the correct one',
            signs: ['Variable has unexpected value', 'Logic seems correct but fails'],
            discovery: 'Explaining what each variable represents'
        },
        mutationBug: {
            pattern: 'Unintended mutation',
            description: 'Modifying a shared object or array',
            signs: ['Value changes unexpectedly', 'Works first time but not second'],
            discovery: 'Tracing where values come from and go'
        },
        asyncTiming: {
            pattern: 'Async timing issue',
            description: 'Code runs before async operation completes',
            signs: ['Sometimes works, sometimes fails', 'Works with delays'],
            discovery: 'Explaining the order of operations'
        },
        typeCoercion: {
            pattern: 'Type coercion surprise',
            description: 'Implicit type conversion produces unexpected results',
            signs: ['Equality check fails unexpectedly', '"1" + 1 = "11"'],
            discovery: 'Checking actual types of values'
        },
        scopeConfusion: {
            pattern: 'Scope confusion',
            description: 'Variable shadows another or is in wrong scope',
            signs: ['Variable is undefined', 'Wrong value in closure'],
            discovery: 'Explaining where each variable is declared'
        },
        logicInversion: {
            pattern: 'Logic inversion',
            description: 'Condition is inverted (if vs if not)',
            signs: ['Does opposite of expected', 'Works when condition is flipped'],
            discovery: 'Reading the condition out loud'
        },
        missingReturn: {
            pattern: 'Missing return statement',
            description: 'Function doesnt return value when it should',
            signs: ['Result is undefined', 'Works but returns nothing'],
            discovery: 'Walking through function exit paths'
        }
    };

    /**
     * Gets insight by pattern name
     * @param {string} name - Pattern name
     * @returns {Object} Insight
     */
    static getInsight(name) {
        return this.insights[name];
    }

    /**
     * Gets all insights
     * @returns {Array} All insights
     */
    static getAllInsights() {
        return Object.entries(this.insights).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Matches symptoms to possible patterns
     * @param {Array} symptoms - Observed symptoms
     * @returns {Array} Possible patterns
     */
    static matchSymptoms(symptoms) {
        const matches = [];

        for (const [id, insight] of Object.entries(this.insights)) {
            const matchingSymptoms = insight.signs.filter(sign =>
                symptoms.some(symptom =>
                    sign.toLowerCase().includes(symptom.toLowerCase())
                )
            );

            if (matchingSymptoms.length > 0) {
                matches.push({
                    pattern: insight.pattern,
                    matchingSymptoms,
                    confidence: (matchingSymptoms.length / insight.signs.length * 100).toFixed(0) + '%'
                });
            }
        }

        return matches.sort((a, b) => parseInt(b.confidence) - parseInt(a.confidence));
    }
}

/**
 * DebuggingWorkflow provides a structured debugging approach.
 */
class DebuggingWorkflow {
    /**
     * Gets the rubber duck debugging workflow
     * @returns {Array} Workflow steps
     */
    static getWorkflow() {
        return [
            {
                step: 1,
                name: 'State the Problem',
                description: 'Clearly describe what is wrong',
                questions: [
                    'What is the expected behavior?',
                    'What is the actual behavior?',
                    'How do you reproduce it?'
                ]
            },
            {
                step: 2,
                name: 'Gather Context',
                description: 'Collect relevant information',
                questions: [
                    'When did it start?',
                    'What changed recently?',
                    'Who is affected?'
                ]
            },
            {
                step: 3,
                name: 'Explain the Code',
                description: 'Walk through the code out loud',
                questions: [
                    'What does each line do?',
                    'What are the variable values?',
                    'Where does control flow go?'
                ]
            },
            {
                step: 4,
                name: 'Question Assumptions',
                description: 'Identify and verify assumptions',
                questions: [
                    'What am I assuming?',
                    'Is that actually true?',
                    'How can I verify it?'
                ]
            },
            {
                step: 5,
                name: 'Find the Gap',
                description: 'Identify where expectation differs from reality',
                questions: [
                    'At what point does it go wrong?',
                    'What is the first incorrect state?',
                    'What caused that state?'
                ]
            },
            {
                step: 6,
                name: 'Form and Test Hypothesis',
                description: 'Create a theory and verify it',
                questions: [
                    'What might cause this?',
                    'How can I test this theory?',
                    'Does fixing it solve the problem?'
                ]
            }
        ];
    }

    /**
     * Gets tips for effective rubber ducking
     * @returns {Array} Tips
     */
    static getTips() {
        return [
            'Explain out loud, not just in your head',
            'Pretend the duck knows nothing about your code',
            'Start from the beginning, dont skip steps',
            'Say what you expect, then what actually happens',
            'Question every assumption, even obvious ones',
            'Dont just describe - ask yourself why at each step',
            'If you say "obviously" or "of course", stop and verify',
            'Write down insights as they occur'
        ];
    }
}

// Demonstration
console.log('=== Rubber Duck Debugging Demo ===\n');

// Create a duck
console.log('--- Meet Your Debugging Companion ---');
const duck = new RubberDuck('Quackers');

// Start a session
console.log('\n--- Debugging Session ---');
const session = duck.startSession('Function returns undefined when it should return user data');

console.log(session.explain('The function is called getUser'));
console.log(session.explain('It takes a userId as a parameter'));
console.log(session.explain('It queries the database for that user'));
console.log(session.explain('Wait... I see it now!'));

session.noteAssumption('The database query returns user data');
session.noteQuestion('Does the function have a return statement?');
session.verifyAssumption(0, true);

session.recordInsight('Missing return statement - function runs query but doesnt return result');

console.log('Session Summary:', session.getSummary());

// Duck statistics
console.log('\n--- Duck Statistics ---');
console.log(duck.getStats());

// Debugging prompts
console.log('\n--- Debugging Prompts by Category ---');
DebuggingPrompts.getCategories().forEach(category => {
    console.log(`${category}: ${DebuggingPrompts.getByCategory(category).slice(0, 2).join(', ')}`);
});

// Common insights
console.log('\n--- Common Bug Patterns ---');
CommonInsights.getAllInsights().slice(0, 4).forEach(insight => {
    console.log(`\n${insight.pattern}:`);
    console.log(`  ${insight.description}`);
    console.log(`  Discovery: ${insight.discovery}`);
});

// Symptom matching
console.log('\n--- Symptom Matching ---');
const symptoms = ['undefined', 'works first time'];
console.log('Symptoms:', symptoms);
console.log('Possible patterns:', CommonInsights.matchSymptoms(symptoms));

// Workflow
console.log('\n--- Debugging Workflow ---');
DebuggingWorkflow.getWorkflow().slice(0, 3).forEach(step => {
    console.log(`${step.step}. ${step.name}: ${step.description}`);
});

// Tips
console.log('\n--- Tips for Effective Rubber Ducking ---');
console.log(DebuggingWorkflow.getTips().slice(0, 4));

/**
 * Best Practices for Rubber Duck Debugging:
 *
 * 1. Explain the problem out loud, not just in your head
 * 2. Start from the very beginning of the code flow
 * 3. Dont skip steps, even if they seem obvious
 * 4. State what you expect at each step
 * 5. Compare expectations to actual behavior
 * 6. Question every assumption explicitly
 * 7. Write down insights as they occur
 * 8. If stuck, try explaining to a real person
 * 9. Keep your duck accessible at your desk
 * 10. Thank your duck when it helps (good practice!)
 */
