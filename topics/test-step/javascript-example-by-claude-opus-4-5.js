/**
 * Test Step - Smallest Executable Unit in Test Automation
 *
 * A test step represents the smallest executable unit within an automated
 * software testing framework, serving as the fundamental building block for
 * comprehensive test scenarios. Each test step encapsulates a specific action
 * or verification performed against the application under test.
 *
 * Key Concepts:
 * - Atomic actions and verifications
 * - Keywords, test data, and targets
 * - Reusable components
 * - Granularity and maintainability
 */

/**
 * TestStepType defines different types of test steps.
 */
class TestStepType {
    static types = {
        action: {
            name: 'Action Step',
            description: 'Performs an action on the application',
            examples: ['Click button', 'Enter text', 'Navigate to URL'],
            hasAssertion: false
        },
        assertion: {
            name: 'Assertion Step',
            description: 'Verifies expected condition',
            examples: ['Verify text displayed', 'Check element visible', 'Assert value equals'],
            hasAssertion: true
        },
        wait: {
            name: 'Wait Step',
            description: 'Waits for condition or time',
            examples: ['Wait for element', 'Wait for page load', 'Sleep for duration'],
            hasAssertion: false
        },
        data: {
            name: 'Data Step',
            description: 'Manages test data',
            examples: ['Set variable', 'Read from file', 'Generate data'],
            hasAssertion: false
        },
        control: {
            name: 'Control Step',
            description: 'Controls test flow',
            examples: ['If condition', 'Loop', 'Call subroutine'],
            hasAssertion: false
        }
    };

    /**
     * Gets type by name
     * @param {string} name - Type name
     * @returns {Object} Type details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all types
     * @returns {Array} All types
     */
    static getAllTypes() {
        return Object.entries(this.types).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestStep represents a single test step.
 */
class TestStep {
    constructor(options) {
        this.id = options.id || `STEP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.type = options.type || 'action';
        this.keyword = options.keyword;
        this.target = options.target;
        this.value = options.value;
        this.description = options.description;
        this.timeout = options.timeout || 30000;
        this.continueOnFailure = options.continueOnFailure || false;
        this.screenshot = options.screenshot || false;
        this.status = 'pending';
        this.result = null;
        this.startTime = null;
        this.endTime = null;
    }

    /**
     * Executes the test step
     * @param {Object} context - Execution context
     * @returns {Object} Step result
     */
    async execute(context = {}) {
        this.startTime = Date.now();
        this.status = 'running';

        try {
            // Simulated execution based on type
            const result = await this.performAction(context);
            this.result = result;
            this.status = 'passed';
        } catch (error) {
            this.result = { error: error.message };
            this.status = 'failed';

            if (!this.continueOnFailure) {
                throw error;
            }
        } finally {
            this.endTime = Date.now();
        }

        return this.getResult();
    }

    /**
     * Performs the step action
     * @param {Object} context - Execution context
     * @returns {Object} Action result
     */
    async performAction(context) {
        // Simulated action execution
        switch (this.type) {
            case 'action':
                return { action: this.keyword, target: this.target, value: this.value };
            case 'assertion':
                return { verified: true, condition: this.keyword };
            case 'wait':
                return { waited: true, duration: this.timeout };
            case 'data':
                return { data: this.value };
            case 'control':
                return { control: this.keyword };
            default:
                return { executed: true };
        }
    }

    /**
     * Gets step result
     * @returns {Object} Result details
     */
    getResult() {
        return {
            id: this.id,
            type: this.type,
            keyword: this.keyword,
            target: this.target,
            status: this.status,
            duration: this.endTime - this.startTime,
            result: this.result
        };
    }

    /**
     * Gets step summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            description: this.description || `${this.keyword} on ${this.target}`,
            type: this.type,
            status: this.status
        };
    }
}

/**
 * TestStepBuilder provides fluent API for creating steps.
 */
class TestStepBuilder {
    constructor() {
        this.options = {};
    }

    /**
     * Sets step type
     * @param {string} type - Step type
     * @returns {TestStepBuilder} Builder for chaining
     */
    ofType(type) {
        this.options.type = type;
        return this;
    }

    /**
     * Sets keyword/action
     * @param {string} keyword - Keyword
     * @returns {TestStepBuilder} Builder for chaining
     */
    withKeyword(keyword) {
        this.options.keyword = keyword;
        return this;
    }

    /**
     * Sets target element
     * @param {string} target - Target selector
     * @returns {TestStepBuilder} Builder for chaining
     */
    onTarget(target) {
        this.options.target = target;
        return this;
    }

    /**
     * Sets value
     * @param {*} value - Step value
     * @returns {TestStepBuilder} Builder for chaining
     */
    withValue(value) {
        this.options.value = value;
        return this;
    }

    /**
     * Sets description
     * @param {string} description - Description
     * @returns {TestStepBuilder} Builder for chaining
     */
    describedAs(description) {
        this.options.description = description;
        return this;
    }

    /**
     * Sets timeout
     * @param {number} ms - Timeout in milliseconds
     * @returns {TestStepBuilder} Builder for chaining
     */
    withTimeout(ms) {
        this.options.timeout = ms;
        return this;
    }

    /**
     * Sets continue on failure flag
     * @returns {TestStepBuilder} Builder for chaining
     */
    continueOnFailure() {
        this.options.continueOnFailure = true;
        return this;
    }

    /**
     * Enables screenshot on step
     * @returns {TestStepBuilder} Builder for chaining
     */
    takeScreenshot() {
        this.options.screenshot = true;
        return this;
    }

    /**
     * Builds the test step
     * @returns {TestStep} Built step
     */
    build() {
        return new TestStep(this.options);
    }
}

/**
 * KeywordLibrary provides reusable keywords for steps.
 */
class KeywordLibrary {
    static keywords = {
        // Browser actions
        open: { category: 'browser', description: 'Opens a URL' },
        close: { category: 'browser', description: 'Closes browser' },
        refresh: { category: 'browser', description: 'Refreshes page' },
        back: { category: 'browser', description: 'Navigates back' },
        forward: { category: 'browser', description: 'Navigates forward' },

        // Element actions
        click: { category: 'element', description: 'Clicks an element' },
        doubleClick: { category: 'element', description: 'Double-clicks element' },
        rightClick: { category: 'element', description: 'Right-clicks element' },
        type: { category: 'element', description: 'Types text into element' },
        clear: { category: 'element', description: 'Clears element content' },
        select: { category: 'element', description: 'Selects dropdown option' },
        check: { category: 'element', description: 'Checks checkbox' },
        uncheck: { category: 'element', description: 'Unchecks checkbox' },
        hover: { category: 'element', description: 'Hovers over element' },
        dragDrop: { category: 'element', description: 'Drags element to target' },

        // Assertions
        verifyText: { category: 'assertion', description: 'Verifies text content' },
        verifyVisible: { category: 'assertion', description: 'Verifies element visible' },
        verifyEnabled: { category: 'assertion', description: 'Verifies element enabled' },
        verifyValue: { category: 'assertion', description: 'Verifies element value' },
        verifyTitle: { category: 'assertion', description: 'Verifies page title' },
        verifyUrl: { category: 'assertion', description: 'Verifies current URL' },

        // Waits
        waitForElement: { category: 'wait', description: 'Waits for element' },
        waitForText: { category: 'wait', description: 'Waits for text' },
        waitForVisible: { category: 'wait', description: 'Waits for visible' },
        sleep: { category: 'wait', description: 'Pauses execution' }
    };

    /**
     * Gets keyword by name
     * @param {string} name - Keyword name
     * @returns {Object} Keyword details
     */
    static getKeyword(name) {
        return this.keywords[name];
    }

    /**
     * Gets keywords by category
     * @param {string} category - Category name
     * @returns {Array} Matching keywords
     */
    static getByCategory(category) {
        return Object.entries(this.keywords)
            .filter(([_, k]) => k.category === category)
            .map(([name, details]) => ({ name, ...details }));
    }

    /**
     * Gets all categories
     * @returns {Array} Unique categories
     */
    static getCategories() {
        return [...new Set(Object.values(this.keywords).map(k => k.category))];
    }
}

/**
 * StepSequence manages a sequence of test steps.
 */
class StepSequence {
    constructor(name) {
        this.name = name;
        this.steps = [];
        this.variables = new Map();
    }

    /**
     * Adds a step
     * @param {TestStep} step - Step to add
     */
    addStep(step) {
        this.steps.push(step);
    }

    /**
     * Inserts step at index
     * @param {number} index - Insert position
     * @param {TestStep} step - Step to insert
     */
    insertStep(index, step) {
        this.steps.splice(index, 0, step);
    }

    /**
     * Removes step at index
     * @param {number} index - Step index
     * @returns {TestStep} Removed step
     */
    removeStep(index) {
        return this.steps.splice(index, 1)[0];
    }

    /**
     * Sets a variable
     * @param {string} name - Variable name
     * @param {*} value - Variable value
     */
    setVariable(name, value) {
        this.variables.set(name, value);
    }

    /**
     * Gets a variable
     * @param {string} name - Variable name
     * @returns {*} Variable value
     */
    getVariable(name) {
        return this.variables.get(name);
    }

    /**
     * Executes all steps
     * @returns {Object} Execution result
     */
    async execute() {
        const results = [];
        const startTime = Date.now();
        let passed = 0;
        let failed = 0;

        const context = {
            variables: this.variables,
            results
        };

        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];

            try {
                const result = await step.execute(context);
                results.push(result);

                if (result.status === 'passed') passed++;
                else failed++;

            } catch (error) {
                results.push({
                    id: step.id,
                    status: 'failed',
                    error: error.message
                });
                failed++;

                // Stop execution unless step allows continuation
                if (!step.continueOnFailure) break;
            }
        }

        return {
            sequence: this.name,
            totalSteps: this.steps.length,
            executed: results.length,
            passed,
            failed,
            duration: Date.now() - startTime,
            results
        };
    }

    /**
     * Gets sequence summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            stepCount: this.steps.length,
            steps: this.steps.map(s => s.getSummary())
        };
    }
}

/**
 * ReusableStepLibrary stores reusable step sequences.
 */
class ReusableStepLibrary {
    constructor() {
        this.library = new Map();
    }

    /**
     * Stores a reusable sequence
     * @param {string} name - Sequence name
     * @param {StepSequence} sequence - Sequence to store
     */
    store(name, sequence) {
        this.library.set(name, sequence);
    }

    /**
     * Gets a reusable sequence
     * @param {string} name - Sequence name
     * @returns {StepSequence|null} Sequence or null
     */
    get(name) {
        return this.library.get(name) || null;
    }

    /**
     * Creates a copy of stored sequence
     * @param {string} name - Sequence name
     * @returns {StepSequence|null} Cloned sequence or null
     */
    instantiate(name) {
        const original = this.library.get(name);
        if (!original) return null;

        const copy = new StepSequence(name + '_instance');
        for (const step of original.steps) {
            copy.addStep(new TestStep({
                type: step.type,
                keyword: step.keyword,
                target: step.target,
                value: step.value,
                description: step.description,
                timeout: step.timeout
            }));
        }
        return copy;
    }

    /**
     * Gets all stored sequences
     * @returns {Array} Sequence names
     */
    listAll() {
        return Array.from(this.library.keys());
    }
}

/**
 * CommonSteps provides factory methods for common steps.
 */
class CommonSteps {
    /**
     * Creates a click step
     * @param {string} target - Target selector
     * @param {string} description - Step description
     * @returns {TestStep} Click step
     */
    static click(target, description) {
        return new TestStepBuilder()
            .ofType('action')
            .withKeyword('click')
            .onTarget(target)
            .describedAs(description || `Click on ${target}`)
            .build();
    }

    /**
     * Creates a type step
     * @param {string} target - Target selector
     * @param {string} value - Text to type
     * @param {string} description - Step description
     * @returns {TestStep} Type step
     */
    static type(target, value, description) {
        return new TestStepBuilder()
            .ofType('action')
            .withKeyword('type')
            .onTarget(target)
            .withValue(value)
            .describedAs(description || `Type "${value}" into ${target}`)
            .build();
    }

    /**
     * Creates a verify text step
     * @param {string} target - Target selector
     * @param {string} expected - Expected text
     * @returns {TestStep} Verify step
     */
    static verifyText(target, expected) {
        return new TestStepBuilder()
            .ofType('assertion')
            .withKeyword('verifyText')
            .onTarget(target)
            .withValue(expected)
            .describedAs(`Verify "${expected}" appears in ${target}`)
            .build();
    }

    /**
     * Creates a wait step
     * @param {string} target - Target selector
     * @param {number} timeout - Timeout in ms
     * @returns {TestStep} Wait step
     */
    static waitFor(target, timeout = 30000) {
        return new TestStepBuilder()
            .ofType('wait')
            .withKeyword('waitForElement')
            .onTarget(target)
            .withTimeout(timeout)
            .describedAs(`Wait for ${target} to appear`)
            .build();
    }

    /**
     * Creates a navigate step
     * @param {string} url - URL to navigate to
     * @returns {TestStep} Navigate step
     */
    static navigate(url) {
        return new TestStepBuilder()
            .ofType('action')
            .withKeyword('open')
            .withValue(url)
            .describedAs(`Navigate to ${url}`)
            .build();
    }
}

// Demonstration
console.log('=== Test Step Demo ===\n');

// Test step types
console.log('--- Test Step Types ---');
TestStepType.getAllTypes().forEach(type => {
    console.log(`${type.name}: ${type.description}`);
});

// Create steps using builder
console.log('\n--- Create Test Steps ---');
const step1 = new TestStepBuilder()
    .ofType('action')
    .withKeyword('click')
    .onTarget('#login-button')
    .describedAs('Click the login button')
    .withTimeout(5000)
    .takeScreenshot()
    .build();

console.log('Step 1:', step1.getSummary());

// Create steps using common steps factory
console.log('\n--- Common Steps Factory ---');
const typeStep = CommonSteps.type('#username', 'testuser', 'Enter username');
const clickStep = CommonSteps.click('#submit', 'Click submit');
const verifyStep = CommonSteps.verifyText('.welcome', 'Welcome');

console.log('Type step:', typeStep.getSummary());
console.log('Click step:', clickStep.getSummary());
console.log('Verify step:', verifyStep.getSummary());

// Step sequence
console.log('\n--- Step Sequence ---');
const loginSequence = new StepSequence('Login Flow');
loginSequence.addStep(CommonSteps.navigate('https://example.com/login'));
loginSequence.addStep(CommonSteps.type('#username', 'testuser'));
loginSequence.addStep(CommonSteps.type('#password', 'password123'));
loginSequence.addStep(CommonSteps.click('#login-btn'));
loginSequence.addStep(CommonSteps.waitFor('.dashboard'));
loginSequence.addStep(CommonSteps.verifyText('.welcome', 'Welcome'));

console.log('Sequence Summary:', loginSequence.getSummary());

// Execute sequence
console.log('\n--- Execute Sequence ---');
loginSequence.execute().then(result => {
    console.log('Execution Result:', {
        total: result.totalSteps,
        passed: result.passed,
        failed: result.failed,
        duration: result.duration + 'ms'
    });
});

// Keyword library
console.log('\n--- Keyword Library ---');
console.log('Categories:', KeywordLibrary.getCategories());
console.log('Element keywords:', KeywordLibrary.getByCategory('element').slice(0, 5).map(k => k.name));

// Reusable step library
console.log('\n--- Reusable Step Library ---');
const library = new ReusableStepLibrary();
library.store('login', loginSequence);
console.log('Stored sequences:', library.listAll());

const loginInstance = library.instantiate('login');
console.log('Instantiated:', loginInstance.getSummary().name);

/**
 * Best Practices for Test Steps:
 *
 * 1. Keep steps atomic and focused
 * 2. Use descriptive step names
 * 3. Implement proper error handling
 * 4. Set appropriate timeouts
 * 5. Create reusable step libraries
 * 6. Use page object patterns
 * 7. Document step preconditions
 * 8. Enable screenshots for debugging
 * 9. Support data parameterization
 * 10. Maintain step independence
 */
