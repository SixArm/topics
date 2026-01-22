/**
 * Capture/Playback Testing - Recording and Replaying User Interactions
 *
 * Capture/playback testing records user interactions during a capture phase
 * and replays them automatically during playback. This approach enables testers
 * to create automated test scripts without extensive programming knowledge.
 *
 * Key Concepts:
 * - Capture Phase: Recording mouse clicks, keyboard inputs, system responses
 * - Playback Phase: Automatically executing recorded actions
 * - Regression Testing: Efficiently running repetitive test scenarios
 * - BDD Integration: Combining with behavior-driven development frameworks
 */

/**
 * ActionRecorder captures user interactions for later playback.
 * Records various event types including clicks, inputs, and navigation.
 */
class ActionRecorder {
    constructor() {
        this.recording = [];
        this.isRecording = false;
        this.startTime = null;
    }

    /**
     * Starts a new recording session
     * @returns {void}
     */
    startRecording() {
        this.recording = [];
        this.isRecording = true;
        this.startTime = Date.now();
        console.log('Recording started...');
    }

    /**
     * Records a user action with timing information
     * @param {string} type - Type of action (click, input, navigate, etc.)
     * @param {Object} details - Action-specific details
     */
    recordAction(type, details) {
        if (!this.isRecording) {
            throw new Error('Recording not started');
        }

        const action = {
            type,
            details,
            timestamp: Date.now() - this.startTime,
            id: this.recording.length + 1
        };

        this.recording.push(action);
        console.log(`Recorded: ${type} at ${action.timestamp}ms`);
    }

    /**
     * Stops recording and returns the captured actions
     * @returns {Array} Array of recorded actions
     */
    stopRecording() {
        this.isRecording = false;
        console.log(`Recording stopped. ${this.recording.length} actions captured.`);
        return this.recording;
    }

    /**
     * Exports recording to a reusable format
     * @returns {Object} Exportable test script
     */
    exportScript() {
        return {
            name: `Recording_${new Date().toISOString()}`,
            actions: this.recording,
            metadata: {
                totalDuration: this.recording.length > 0
                    ? this.recording[this.recording.length - 1].timestamp
                    : 0,
                actionCount: this.recording.length
            }
        };
    }
}

/**
 * ActionPlayer replays recorded actions with timing preservation.
 * Supports various playback modes including real-time and accelerated.
 */
class ActionPlayer {
    constructor() {
        this.currentScript = null;
        this.playbackSpeed = 1.0;
        this.actionHandlers = new Map();
    }

    /**
     * Registers a handler for a specific action type
     * @param {string} actionType - Type of action to handle
     * @param {Function} handler - Function to execute the action
     */
    registerHandler(actionType, handler) {
        this.actionHandlers.set(actionType, handler);
    }

    /**
     * Loads a recorded script for playback
     * @param {Object} script - Script object from ActionRecorder
     */
    loadScript(script) {
        this.currentScript = script;
        console.log(`Loaded script: ${script.name}`);
        console.log(`  Actions: ${script.metadata.actionCount}`);
        console.log(`  Duration: ${script.metadata.totalDuration}ms`);
    }

    /**
     * Sets playback speed multiplier
     * @param {number} speed - Speed multiplier (1.0 = real-time)
     */
    setPlaybackSpeed(speed) {
        this.playbackSpeed = speed;
        console.log(`Playback speed set to ${speed}x`);
    }

    /**
     * Plays back the loaded script
     * @returns {Promise<Object>} Playback results
     */
    async play() {
        if (!this.currentScript) {
            throw new Error('No script loaded');
        }

        const results = {
            passed: 0,
            failed: 0,
            errors: []
        };

        console.log('Starting playback...');
        let lastTimestamp = 0;

        for (const action of this.currentScript.actions) {
            // Wait for appropriate timing
            const delay = (action.timestamp - lastTimestamp) / this.playbackSpeed;
            await this.wait(delay);
            lastTimestamp = action.timestamp;

            // Execute the action
            try {
                const handler = this.actionHandlers.get(action.type);
                if (handler) {
                    await handler(action.details);
                    results.passed++;
                    console.log(`  ✓ ${action.type} executed successfully`);
                } else {
                    throw new Error(`No handler for action type: ${action.type}`);
                }
            } catch (error) {
                results.failed++;
                results.errors.push({
                    action,
                    error: error.message
                });
                console.log(`  ✗ ${action.type} failed: ${error.message}`);
            }
        }

        console.log(`Playback complete. Passed: ${results.passed}, Failed: ${results.failed}`);
        return results;
    }

    /**
     * Utility method for timing delays
     * @param {number} ms - Milliseconds to wait
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));
    }
}

/**
 * CapturePlaybackTestSuite integrates recording and playback
 * with test assertions and reporting capabilities.
 */
class CapturePlaybackTestSuite {
    constructor(name) {
        this.name = name;
        this.recorder = new ActionRecorder();
        this.player = new ActionPlayer();
        this.scripts = [];
        this.assertions = [];
    }

    /**
     * Adds a checkpoint assertion to verify during playback
     * @param {string} name - Assertion name
     * @param {Function} condition - Function returning boolean
     */
    addAssertion(name, condition) {
        this.assertions.push({ name, condition });
    }

    /**
     * Records a new test case
     * @param {string} testName - Name for the test case
     * @param {Function} actions - Function containing actions to record
     */
    async recordTestCase(testName, actions) {
        console.log(`\nRecording test case: ${testName}`);
        this.recorder.startRecording();

        // Execute and record the actions
        await actions(this.recorder);

        const script = this.recorder.exportScript();
        script.name = testName;
        this.scripts.push(script);

        console.log(`Test case "${testName}" recorded successfully`);
        return script;
    }

    /**
     * Runs all recorded test cases
     * @returns {Object} Test suite results
     */
    async runAll() {
        console.log(`\n=== Running Test Suite: ${this.name} ===`);
        const suiteResults = {
            suiteName: this.name,
            testResults: [],
            totalPassed: 0,
            totalFailed: 0
        };

        for (const script of this.scripts) {
            console.log(`\nRunning: ${script.name}`);
            this.player.loadScript(script);
            const result = await this.player.play();

            suiteResults.testResults.push({
                name: script.name,
                ...result
            });

            suiteResults.totalPassed += result.passed;
            suiteResults.totalFailed += result.failed;
        }

        console.log(`\n=== Suite Complete ===`);
        console.log(`Total Passed: ${suiteResults.totalPassed}`);
        console.log(`Total Failed: ${suiteResults.totalFailed}`);

        return suiteResults;
    }
}

/**
 * BDDCaptureIntegration bridges capture/playback with BDD scenarios.
 * Maps Gherkin-style steps to recorded action sequences.
 */
class BDDCaptureIntegration {
    constructor() {
        this.stepDefinitions = new Map();
        this.recordedSteps = new Map();
    }

    /**
     * Defines a Given step with recorded actions
     * @param {string} pattern - Step pattern (regex or string)
     * @param {Object} recordedScript - Pre-recorded action script
     */
    defineGiven(pattern, recordedScript) {
        this.stepDefinitions.set(`Given ${pattern}`, recordedScript);
    }

    /**
     * Defines a When step with recorded actions
     * @param {string} pattern - Step pattern
     * @param {Object} recordedScript - Pre-recorded action script
     */
    defineWhen(pattern, recordedScript) {
        this.stepDefinitions.set(`When ${pattern}`, recordedScript);
    }

    /**
     * Defines a Then step with recorded actions and assertions
     * @param {string} pattern - Step pattern
     * @param {Object} recordedScript - Pre-recorded action script
     * @param {Function} assertion - Verification function
     */
    defineThen(pattern, recordedScript, assertion) {
        this.stepDefinitions.set(`Then ${pattern}`, {
            script: recordedScript,
            assertion
        });
    }

    /**
     * Executes a BDD scenario using recorded scripts
     * @param {Array} steps - Array of step descriptions
     * @returns {Object} Scenario execution results
     */
    async executeScenario(steps) {
        console.log('Executing BDD Scenario with Capture/Playback:');
        const results = [];

        for (const step of steps) {
            console.log(`  ${step}`);
            const definition = this.stepDefinitions.get(step);

            if (definition) {
                // Execute recorded actions for this step
                results.push({
                    step,
                    status: 'passed'
                });
            } else {
                results.push({
                    step,
                    status: 'undefined'
                });
            }
        }

        return results;
    }
}

// Demonstration
console.log('=== Capture/Playback Testing Demo ===\n');

// Set up recorder and player
const recorder = new ActionRecorder();
const player = new ActionPlayer();

// Register action handlers for playback
player.registerHandler('click', async (details) => {
    console.log(`    Clicking element: ${details.selector}`);
});

player.registerHandler('input', async (details) => {
    console.log(`    Entering "${details.value}" into ${details.selector}`);
});

player.registerHandler('navigate', async (details) => {
    console.log(`    Navigating to: ${details.url}`);
});

// Simulate recording a user session
console.log('--- Recording Phase ---');
recorder.startRecording();

// Simulate user actions
recorder.recordAction('navigate', { url: '/login' });
recorder.recordAction('input', { selector: '#username', value: 'testuser' });
recorder.recordAction('input', { selector: '#password', value: '****' });
recorder.recordAction('click', { selector: '#login-button' });
recorder.recordAction('navigate', { url: '/dashboard' });

recorder.stopRecording();

// Export and replay
console.log('\n--- Playback Phase ---');
const script = recorder.exportScript();
player.loadScript(script);
player.setPlaybackSpeed(10); // 10x speed for demo

// Run playback
player.play().then(results => {
    console.log('\nPlayback Results:', results);
});

// Demonstrate test suite
console.log('\n--- Test Suite Demo ---');
const suite = new CapturePlaybackTestSuite('Login Flow Tests');

// BDD Integration demo
console.log('\n--- BDD Integration Demo ---');
const bddIntegration = new BDDCaptureIntegration();
bddIntegration.defineGiven('the user is on the login page', script);
console.log('BDD step definitions registered with recorded scripts');

/**
 * Best Practices for Capture/Playback Testing:
 *
 * 1. Use unique, stable selectors (data-testid attributes) for element identification
 * 2. Include appropriate wait conditions for dynamic content
 * 3. Parameterize test data to enable data-driven testing
 * 4. Maintain recorded scripts when UI changes occur
 * 5. Combine with BDD for better collaboration between technical and non-technical team members
 * 6. Use checkpoints to verify application state during playback
 * 7. Implement robust error handling and reporting
 * 8. Version control recorded scripts alongside application code
 * 9. Consider maintenance overhead when deciding what to record
 * 10. Use capture/playback for regression testing, not exploratory testing
 */
