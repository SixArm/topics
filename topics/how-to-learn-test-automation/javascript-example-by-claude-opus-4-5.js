/**
 * How to Learn Test Automation - A Learning Path Guide
 *
 * Learning test automation requires understanding programming fundamentals,
 * testing frameworks, and best practices. This guide provides a structured
 * approach to building test automation skills through progressive learning
 * and hands-on practice.
 *
 * Key Concepts:
 * - Start with programming fundamentals
 * - Learn testing frameworks progressively
 * - Practice on real applications
 * - Understand CI/CD integration
 */

/**
 * LearningPath represents a structured path to learn test automation.
 * Contains modules, milestones, and progress tracking.
 */
class LearningPath {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description;
        this.level = options.level || 'beginner';
        this.modules = [];
        this.prerequisites = options.prerequisites || [];
        this.estimatedHours = 0;
    }

    /**
     * Adds a learning module
     * @param {Object} module - Module definition
     */
    addModule(module) {
        const mod = {
            id: `mod-${this.modules.length + 1}`,
            name: module.name,
            description: module.description,
            topics: module.topics || [],
            exercises: module.exercises || [],
            estimatedHours: module.estimatedHours || 2,
            order: this.modules.length + 1
        };

        this.modules.push(mod);
        this.estimatedHours += mod.estimatedHours;
    }

    /**
     * Gets path overview
     * @returns {Object} Path overview
     */
    getOverview() {
        return {
            name: this.name,
            level: this.level,
            modules: this.modules.length,
            estimatedHours: this.estimatedHours,
            topics: this.modules.flatMap(m => m.topics)
        };
    }

    /**
     * Gets module by order
     * @param {number} order - Module order
     * @returns {Object|null} Module or null
     */
    getModule(order) {
        return this.modules.find(m => m.order === order);
    }
}

/**
 * ProgressTracker tracks learning progress.
 * Records completed modules, exercises, and milestones.
 */
class ProgressTracker {
    constructor(learnerName) {
        this.learnerName = learnerName;
        this.completedModules = new Set();
        this.completedExercises = new Set();
        this.notes = [];
        this.startedAt = new Date();
        this.streakDays = 0;
        this.lastActivity = null;
    }

    /**
     * Marks a module as complete
     * @param {string} moduleId - Module ID
     */
    completeModule(moduleId) {
        this.completedModules.add(moduleId);
        this.recordActivity();
        console.log(`Completed module: ${moduleId}`);
    }

    /**
     * Marks an exercise as complete
     * @param {string} exerciseId - Exercise ID
     */
    completeExercise(exerciseId) {
        this.completedExercises.add(exerciseId);
        this.recordActivity();
    }

    /**
     * Records learning activity
     */
    recordActivity() {
        const today = new Date().toDateString();
        const lastDay = this.lastActivity?.toDateString();

        if (today !== lastDay) {
            if (this.lastActivity) {
                const dayDiff = Math.floor(
                    (new Date() - this.lastActivity) / (1000 * 60 * 60 * 24)
                );
                this.streakDays = dayDiff === 1 ? this.streakDays + 1 : 1;
            } else {
                this.streakDays = 1;
            }
        }

        this.lastActivity = new Date();
    }

    /**
     * Adds a learning note
     * @param {string} note - Note content
     * @param {string} topic - Related topic
     */
    addNote(note, topic) {
        this.notes.push({
            content: note,
            topic,
            addedAt: new Date()
        });
    }

    /**
     * Gets progress for a learning path
     * @param {LearningPath} path - Learning path
     * @returns {Object} Progress summary
     */
    getProgress(path) {
        const totalModules = path.modules.length;
        const completedCount = path.modules.filter(m =>
            this.completedModules.has(m.id)
        ).length;

        return {
            learner: this.learnerName,
            path: path.name,
            modulesCompleted: completedCount,
            totalModules,
            percentage: Math.round((completedCount / totalModules) * 100),
            streakDays: this.streakDays,
            notesCount: this.notes.length
        };
    }
}

/**
 * Exercise represents a practical exercise.
 * Contains instructions, hints, and validation criteria.
 */
class Exercise {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.difficulty = options.difficulty || 'medium';
        this.instructions = options.instructions || [];
        this.hints = options.hints || [];
        this.validationCriteria = options.validationCriteria || [];
        this.solution = options.solution;
        this.estimatedTime = options.estimatedTime || 30;
    }

    /**
     * Gets exercise introduction
     * @returns {string} Introduction text
     */
    getIntroduction() {
        return `
Exercise: ${this.name}
Difficulty: ${this.difficulty}
Estimated Time: ${this.estimatedTime} minutes

${this.description}

Instructions:
${this.instructions.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}
        `.trim();
    }

    /**
     * Gets a hint
     * @param {number} index - Hint index
     * @returns {string} Hint text
     */
    getHint(index) {
        if (index >= this.hints.length) {
            return 'No more hints available';
        }
        return this.hints[index];
    }

    /**
     * Validates a submission
     * @param {Object} submission - Learner's submission
     * @returns {Object} Validation result
     */
    validate(submission) {
        const results = this.validationCriteria.map(criteria => ({
            criteria: criteria.name,
            passed: criteria.check(submission),
            feedback: criteria.feedback
        }));

        const allPassed = results.every(r => r.passed);

        return {
            passed: allPassed,
            score: Math.round((results.filter(r => r.passed).length / results.length) * 100),
            results
        };
    }
}

/**
 * SkillAssessment evaluates test automation skills.
 * Provides assessment questions and scoring.
 */
class SkillAssessment {
    constructor(level) {
        this.level = level;
        this.questions = this.generateQuestions(level);
        this.answers = new Map();
    }

    /**
     * Generates assessment questions for a level
     * @param {string} level - Skill level
     * @returns {Array} Questions
     */
    generateQuestions(level) {
        const questionBank = {
            beginner: [
                {
                    id: 'q1',
                    question: 'What is the purpose of a test assertion?',
                    options: [
                        'To verify expected outcomes',
                        'To run the test faster',
                        'To skip failing tests',
                        'To generate reports'
                    ],
                    correct: 0,
                    topic: 'Testing Basics'
                },
                {
                    id: 'q2',
                    question: 'What does a unit test typically test?',
                    options: [
                        'The entire application',
                        'A single function or method',
                        'User interface only',
                        'Database connections only'
                    ],
                    correct: 1,
                    topic: 'Unit Testing'
                },
                {
                    id: 'q3',
                    question: 'What is the purpose of test isolation?',
                    options: [
                        'To make tests run faster',
                        'To ensure tests don\'t affect each other',
                        'To hide test results',
                        'To reduce code coverage'
                    ],
                    correct: 1,
                    topic: 'Testing Principles'
                }
            ],
            intermediate: [
                {
                    id: 'q4',
                    question: 'What is a test double?',
                    options: [
                        'Running a test twice',
                        'A substitute for a dependency',
                        'A duplicate test file',
                        'A test that always passes'
                    ],
                    correct: 1,
                    topic: 'Test Doubles'
                },
                {
                    id: 'q5',
                    question: 'What is the difference between a mock and a stub?',
                    options: [
                        'Mocks verify behavior, stubs provide data',
                        'They are the same thing',
                        'Mocks are faster than stubs',
                        'Stubs are used for integration tests only'
                    ],
                    correct: 0,
                    topic: 'Test Doubles'
                }
            ],
            advanced: [
                {
                    id: 'q6',
                    question: 'What is mutation testing?',
                    options: [
                        'Testing code mutations in a database',
                        'Introducing bugs to test the tests',
                        'Testing genetic algorithms',
                        'Changing test names'
                    ],
                    correct: 1,
                    topic: 'Advanced Testing'
                }
            ]
        };

        return questionBank[level] || questionBank.beginner;
    }

    /**
     * Records an answer
     * @param {string} questionId - Question ID
     * @param {number} answer - Answer index
     */
    answer(questionId, answer) {
        this.answers.set(questionId, answer);
    }

    /**
     * Scores the assessment
     * @returns {Object} Score results
     */
    score() {
        let correct = 0;
        const details = [];

        for (const question of this.questions) {
            const userAnswer = this.answers.get(question.id);
            const isCorrect = userAnswer === question.correct;

            if (isCorrect) correct++;

            details.push({
                question: question.question,
                topic: question.topic,
                correct: isCorrect,
                userAnswer: question.options[userAnswer],
                correctAnswer: question.options[question.correct]
            });
        }

        const percentage = Math.round((correct / this.questions.length) * 100);

        return {
            level: this.level,
            correct,
            total: this.questions.length,
            percentage,
            passed: percentage >= 70,
            details,
            recommendations: this.getRecommendations(details)
        };
    }

    /**
     * Gets study recommendations based on results
     * @param {Array} details - Answer details
     * @returns {Array} Recommendations
     */
    getRecommendations(details) {
        const weakTopics = details
            .filter(d => !d.correct)
            .map(d => d.topic);

        const uniqueTopics = [...new Set(weakTopics)];

        return uniqueTopics.map(topic => ({
            topic,
            suggestion: `Review ${topic} concepts and practice more exercises`
        }));
    }
}

/**
 * LearningResourceLibrary provides curated learning resources.
 * Organizes resources by topic and skill level.
 */
class LearningResourceLibrary {
    constructor() {
        this.resources = [];
        this.categories = new Set();
    }

    /**
     * Adds a resource
     * @param {Object} resource - Resource definition
     */
    add(resource) {
        this.resources.push({
            id: `res-${this.resources.length + 1}`,
            title: resource.title,
            type: resource.type, // tutorial, documentation, video, book
            url: resource.url,
            level: resource.level || 'beginner',
            topics: resource.topics || [],
            estimatedTime: resource.estimatedTime,
            addedAt: new Date()
        });

        resource.topics.forEach(t => this.categories.add(t));
    }

    /**
     * Finds resources by topic
     * @param {string} topic - Topic to search
     * @param {string} level - Optional level filter
     * @returns {Array} Matching resources
     */
    findByTopic(topic, level = null) {
        return this.resources.filter(r => {
            const matchesTopic = r.topics.some(t =>
                t.toLowerCase().includes(topic.toLowerCase())
            );
            const matchesLevel = !level || r.level === level;
            return matchesTopic && matchesLevel;
        });
    }

    /**
     * Gets resources by type
     * @param {string} type - Resource type
     * @returns {Array} Matching resources
     */
    findByType(type) {
        return this.resources.filter(r => r.type === type);
    }

    /**
     * Gets learning path suggestions
     * @param {string} currentLevel - Current skill level
     * @returns {Array} Suggested resources in order
     */
    getSuggestedPath(currentLevel) {
        const levelOrder = ['beginner', 'intermediate', 'advanced'];
        const startIndex = levelOrder.indexOf(currentLevel);

        return this.resources
            .filter(r => levelOrder.indexOf(r.level) >= startIndex)
            .sort((a, b) => {
                const levelDiff = levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
                return levelDiff;
            });
    }

    /**
     * Gets library statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const byType = {};
        const byLevel = {};

        for (const resource of this.resources) {
            byType[resource.type] = (byType[resource.type] || 0) + 1;
            byLevel[resource.level] = (byLevel[resource.level] || 0) + 1;
        }

        return {
            total: this.resources.length,
            categories: this.categories.size,
            byType,
            byLevel
        };
    }
}

/**
 * PracticeProjectGenerator generates practice projects for learning.
 * Creates progressively challenging projects.
 */
class PracticeProjectGenerator {
    static projects = {
        beginner: [
            {
                name: 'Calculator Tests',
                description: 'Write unit tests for a simple calculator',
                skills: ['Unit testing', 'Assertions', 'Test organization'],
                setup: 'Create a Calculator class with add, subtract, multiply, divide methods'
            },
            {
                name: 'Login Form Validation',
                description: 'Test form validation logic',
                skills: ['Input validation', 'Edge cases', 'Error handling'],
                setup: 'Create a validation function for email and password'
            }
        ],
        intermediate: [
            {
                name: 'REST API Testing',
                description: 'Write integration tests for a REST API',
                skills: ['API testing', 'HTTP methods', 'Response validation'],
                setup: 'Use a mock API or create a simple Express server'
            },
            {
                name: 'Database Operations',
                description: 'Test CRUD operations with a database',
                skills: ['Database testing', 'Test fixtures', 'Cleanup'],
                setup: 'Set up an in-memory database for testing'
            }
        ],
        advanced: [
            {
                name: 'E2E Test Suite',
                description: 'Build a complete E2E test suite for a web app',
                skills: ['E2E testing', 'Page objects', 'CI integration'],
                setup: 'Use Playwright or Cypress with a demo application'
            },
            {
                name: 'Test Framework',
                description: 'Build a minimal test framework from scratch',
                skills: ['Framework design', 'Assertions', 'Reporting'],
                setup: 'Create test runner, assertion library, and reporter'
            }
        ]
    };

    /**
     * Gets projects for a level
     * @param {string} level - Skill level
     * @returns {Array} Projects
     */
    static getProjects(level) {
        return this.projects[level] || this.projects.beginner;
    }

    /**
     * Gets next challenge based on progress
     * @param {Array} completed - Completed project names
     * @returns {Object|null} Next project
     */
    static getNextChallenge(completed) {
        const completedSet = new Set(completed);
        const levels = ['beginner', 'intermediate', 'advanced'];

        for (const level of levels) {
            const projects = this.projects[level];
            const next = projects.find(p => !completedSet.has(p.name));
            if (next) {
                return { ...next, level };
            }
        }

        return null;
    }
}

// Demonstration
console.log('=== How to Learn Test Automation Demo ===\n');

// Create a learning path
const automationPath = new LearningPath('Test Automation Fundamentals', {
    description: 'Complete path from beginner to proficient in test automation',
    level: 'beginner'
});

automationPath.addModule({
    name: 'Programming Basics',
    description: 'JavaScript fundamentals for testing',
    topics: ['Variables', 'Functions', 'Loops', 'Conditionals'],
    estimatedHours: 10
});

automationPath.addModule({
    name: 'Testing Fundamentals',
    description: 'Core testing concepts and principles',
    topics: ['Test types', 'Assertions', 'Test isolation', 'Test organization'],
    estimatedHours: 8
});

automationPath.addModule({
    name: 'Unit Testing',
    description: 'Writing effective unit tests',
    topics: ['Jest/Mocha', 'Test structure', 'Mocking', 'Coverage'],
    estimatedHours: 12
});

automationPath.addModule({
    name: 'Integration Testing',
    description: 'Testing component interactions',
    topics: ['API testing', 'Database testing', 'Test doubles'],
    estimatedHours: 10
});

automationPath.addModule({
    name: 'E2E Testing',
    description: 'End-to-end testing with Playwright/Cypress',
    topics: ['Browser automation', 'Page objects', 'Selectors'],
    estimatedHours: 15
});

console.log('Learning Path Overview:', automationPath.getOverview());

// Track progress
console.log('\n--- Progress Tracking ---');
const tracker = new ProgressTracker('Alice');
tracker.completeModule('mod-1');
tracker.completeModule('mod-2');
tracker.addNote('Remember to use descriptive test names', 'Testing Fundamentals');

console.log('Progress:', tracker.getProgress(automationPath));

// Create an exercise
console.log('\n--- Practice Exercise ---');
const exercise = new Exercise({
    id: 'ex-1',
    name: 'Write Your First Unit Test',
    description: 'Create a unit test for a function that adds two numbers',
    difficulty: 'easy',
    instructions: [
        'Create an add(a, b) function that returns the sum',
        'Write a test that verifies add(2, 3) returns 5',
        'Write a test for edge cases (negative numbers, zero)'
    ],
    hints: [
        'Use expect() to make assertions',
        'Consider what happens with negative numbers'
    ],
    validationCriteria: [
        {
            name: 'Has test file',
            check: (sub) => sub.hasTestFile,
            feedback: 'Create a test file (*.test.js)'
        },
        {
            name: 'Tests pass',
            check: (sub) => sub.testsPassing,
            feedback: 'All tests should pass'
        }
    ],
    estimatedTime: 15
});

console.log(exercise.getIntroduction());

// Skill assessment
console.log('\n--- Skill Assessment ---');
const assessment = new SkillAssessment('beginner');
assessment.answer('q1', 0); // Correct
assessment.answer('q2', 1); // Correct
assessment.answer('q3', 0); // Wrong

const score = assessment.score();
console.log('Assessment Results:', {
    percentage: `${score.percentage}%`,
    passed: score.passed,
    recommendations: score.recommendations
});

// Resource library
console.log('\n--- Learning Resources ---');
const library = new LearningResourceLibrary();

library.add({
    title: 'Jest Getting Started',
    type: 'documentation',
    url: 'https://jestjs.io/docs/getting-started',
    level: 'beginner',
    topics: ['Jest', 'Unit Testing']
});

library.add({
    title: 'Testing JavaScript',
    type: 'tutorial',
    url: 'https://example.com/testing-js',
    level: 'beginner',
    topics: ['JavaScript', 'Testing Basics']
});

library.add({
    title: 'Playwright Tutorial',
    type: 'video',
    url: 'https://example.com/playwright',
    level: 'intermediate',
    topics: ['E2E Testing', 'Playwright']
});

console.log('Library Stats:', library.getStatistics());
console.log('Resources for Unit Testing:', library.findByTopic('Unit Testing'));

// Practice projects
console.log('\n--- Practice Projects ---');
console.log('Beginner Projects:', PracticeProjectGenerator.getProjects('beginner'));
console.log('Next Challenge:', PracticeProjectGenerator.getNextChallenge(['Calculator Tests']));

/**
 * Best Practices for Learning Test Automation:
 *
 * 1. Start with programming fundamentals
 * 2. Learn one testing framework deeply before branching out
 * 3. Practice on real applications, not just tutorials
 * 4. Write tests daily to build muscle memory
 * 5. Join testing communities for support
 * 6. Study existing test suites in open source projects
 * 7. Learn debugging skills alongside testing
 * 8. Understand CI/CD integration early
 * 9. Focus on test design, not just tooling
 * 10. Keep learning - testing evolves constantly
 */
