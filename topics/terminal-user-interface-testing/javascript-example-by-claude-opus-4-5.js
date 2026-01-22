/**
 * Terminal User Interface (TUI) Testing - Validating Terminal Applications
 *
 * Terminal User Interface (TUI) testing focuses on validating applications that
 * run in terminal environments. Unlike GUIs, TUIs operate within terminal windows
 * using text-based interactions, keyboard navigation, and character-based displays.
 * Unlike CLIs, TUIs typically have layouts like grids, rows, or columns.
 *
 * Key Concepts:
 * - Screen scraping and validation
 * - Keyboard input simulation
 * - Terminal state management
 * - Escape sequence handling
 */

/**
 * TerminalScreen represents a terminal screen buffer.
 */
class TerminalScreen {
    constructor(width = 80, height = 24) {
        this.width = width;
        this.height = height;
        this.buffer = this.createBuffer();
        this.cursorX = 0;
        this.cursorY = 0;
    }

    /**
     * Creates an empty screen buffer
     * @returns {Array} Buffer
     */
    createBuffer() {
        return Array.from({ length: this.height }, () =>
            Array(this.width).fill(' ')
        );
    }

    /**
     * Writes text at position
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} text - Text to write
     */
    writeAt(x, y, text) {
        if (y >= 0 && y < this.height) {
            for (let i = 0; i < text.length && x + i < this.width; i++) {
                if (x + i >= 0) {
                    this.buffer[y][x + i] = text[i];
                }
            }
        }
    }

    /**
     * Gets text at region
     * @param {number} x - Start X
     * @param {number} y - Start Y
     * @param {number} width - Width
     * @returns {string} Text content
     */
    getTextAt(x, y, width) {
        if (y >= 0 && y < this.height) {
            return this.buffer[y].slice(x, x + width).join('');
        }
        return '';
    }

    /**
     * Gets entire row
     * @param {number} y - Row number
     * @returns {string} Row content
     */
    getRow(y) {
        if (y >= 0 && y < this.height) {
            return this.buffer[y].join('');
        }
        return '';
    }

    /**
     * Clears the screen
     */
    clear() {
        this.buffer = this.createBuffer();
        this.cursorX = 0;
        this.cursorY = 0;
    }

    /**
     * Renders screen to string
     * @returns {string} Screen content
     */
    render() {
        return this.buffer.map(row => row.join('')).join('\n');
    }

    /**
     * Finds text on screen
     * @param {string} text - Text to find
     * @returns {Object|null} Position or null
     */
    findText(text) {
        for (let y = 0; y < this.height; y++) {
            const row = this.getRow(y);
            const x = row.indexOf(text);
            if (x !== -1) {
                return { x, y, text };
            }
        }
        return null;
    }
}

/**
 * KeyboardInput simulates keyboard interactions.
 */
class KeyboardInput {
    static keys = {
        ENTER: '\r',
        TAB: '\t',
        ESCAPE: '\x1b',
        BACKSPACE: '\x7f',
        UP: '\x1b[A',
        DOWN: '\x1b[B',
        RIGHT: '\x1b[C',
        LEFT: '\x1b[D',
        HOME: '\x1b[H',
        END: '\x1b[F',
        PAGE_UP: '\x1b[5~',
        PAGE_DOWN: '\x1b[6~',
        F1: '\x1bOP',
        F2: '\x1bOQ',
        F3: '\x1bOR',
        F4: '\x1bOS'
    };

    constructor() {
        this.inputQueue = [];
        this.history = [];
    }

    /**
     * Queues a key press
     * @param {string} key - Key to press
     */
    press(key) {
        const keyCode = KeyboardInput.keys[key] || key;
        this.inputQueue.push(keyCode);
        this.history.push({ key, code: keyCode, timestamp: new Date() });
    }

    /**
     * Types a string
     * @param {string} text - Text to type
     */
    type(text) {
        for (const char of text) {
            this.inputQueue.push(char);
            this.history.push({ key: char, code: char, timestamp: new Date() });
        }
    }

    /**
     * Gets next input
     * @returns {string|null} Next key or null
     */
    getNext() {
        return this.inputQueue.shift() || null;
    }

    /**
     * Gets input history
     * @returns {Array} History
     */
    getHistory() {
        return this.history;
    }

    /**
     * Clears queue
     */
    clear() {
        this.inputQueue = [];
    }
}

/**
 * TUIElement represents a UI element on screen.
 */
class TUIElement {
    constructor(options) {
        this.type = options.type;
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height || 1;
        this.label = options.label;
        this.value = options.value || '';
        this.focused = false;
    }

    /**
     * Checks if point is within element
     * @param {number} x - X position
     * @param {number} y - Y position
     * @returns {boolean} Whether point is inside
     */
    contains(x, y) {
        return x >= this.x && x < this.x + this.width &&
               y >= this.y && y < this.y + this.height;
    }

    /**
     * Gets element state
     * @returns {Object} State
     */
    getState() {
        return {
            type: this.type,
            label: this.label,
            value: this.value,
            focused: this.focused,
            position: { x: this.x, y: this.y }
        };
    }
}

/**
 * TUITestDriver provides testing capabilities for TUI applications.
 */
class TUITestDriver {
    constructor(screen) {
        this.screen = screen;
        this.keyboard = new KeyboardInput();
        this.elements = [];
        this.focusIndex = -1;
        this.assertions = [];
    }

    /**
     * Registers a UI element
     * @param {TUIElement} element - Element to register
     */
    registerElement(element) {
        this.elements.push(element);
    }

    /**
     * Finds element by label
     * @param {string} label - Element label
     * @returns {TUIElement|null} Element or null
     */
    findElementByLabel(label) {
        return this.elements.find(e => e.label === label) || null;
    }

    /**
     * Simulates keyboard navigation
     * @param {string} direction - Navigation direction
     */
    navigate(direction) {
        if (this.elements.length === 0) return;

        if (this.focusIndex >= 0) {
            this.elements[this.focusIndex].focused = false;
        }

        if (direction === 'next' || direction === 'DOWN' || direction === 'TAB') {
            this.focusIndex = (this.focusIndex + 1) % this.elements.length;
        } else if (direction === 'prev' || direction === 'UP') {
            this.focusIndex = this.focusIndex <= 0
                ? this.elements.length - 1
                : this.focusIndex - 1;
        }

        this.elements[this.focusIndex].focused = true;
        this.keyboard.press(direction);
    }

    /**
     * Types into focused element
     * @param {string} text - Text to type
     */
    typeText(text) {
        if (this.focusIndex >= 0) {
            this.elements[this.focusIndex].value += text;
        }
        this.keyboard.type(text);
    }

    /**
     * Submits current input
     */
    submit() {
        this.keyboard.press('ENTER');
    }

    /**
     * Asserts text is on screen
     * @param {string} text - Expected text
     * @returns {Object} Assertion result
     */
    assertTextOnScreen(text) {
        const found = this.screen.findText(text);
        const result = {
            assertion: 'textOnScreen',
            expected: text,
            found: found !== null,
            position: found,
            passed: found !== null
        };
        this.assertions.push(result);
        return result;
    }

    /**
     * Asserts element has value
     * @param {string} label - Element label
     * @param {string} expectedValue - Expected value
     * @returns {Object} Assertion result
     */
    assertElementValue(label, expectedValue) {
        const element = this.findElementByLabel(label);
        const actualValue = element ? element.value : null;
        const result = {
            assertion: 'elementValue',
            element: label,
            expected: expectedValue,
            actual: actualValue,
            passed: actualValue === expectedValue
        };
        this.assertions.push(result);
        return result;
    }

    /**
     * Asserts element is focused
     * @param {string} label - Element label
     * @returns {Object} Assertion result
     */
    assertFocused(label) {
        const element = this.findElementByLabel(label);
        const result = {
            assertion: 'focused',
            element: label,
            focused: element ? element.focused : false,
            passed: element ? element.focused : false
        };
        this.assertions.push(result);
        return result;
    }

    /**
     * Gets test results
     * @returns {Object} Results
     */
    getResults() {
        const passed = this.assertions.filter(a => a.passed).length;
        return {
            totalAssertions: this.assertions.length,
            passed,
            failed: this.assertions.length - passed,
            passRate: ((passed / this.assertions.length) * 100).toFixed(1) + '%',
            details: this.assertions
        };
    }
}

/**
 * TUITestScenario represents a test scenario.
 */
class TUITestScenario {
    constructor(name) {
        this.name = name;
        this.steps = [];
        this.status = 'pending';
    }

    /**
     * Adds a step
     * @param {string} action - Action description
     * @param {Function} executor - Step executor
     */
    addStep(action, executor) {
        this.steps.push({
            action,
            executor,
            status: 'pending',
            result: null
        });
    }

    /**
     * Executes the scenario
     * @param {TUITestDriver} driver - Test driver
     * @returns {Object} Execution result
     */
    execute(driver) {
        const results = [];

        for (const step of this.steps) {
            try {
                step.result = step.executor(driver);
                step.status = 'passed';
            } catch (error) {
                step.status = 'failed';
                step.result = { error: error.message };
            }
            results.push({
                action: step.action,
                status: step.status,
                result: step.result
            });
        }

        const passedSteps = this.steps.filter(s => s.status === 'passed').length;
        this.status = passedSteps === this.steps.length ? 'passed' : 'failed';

        return {
            scenario: this.name,
            status: this.status,
            steps: results,
            summary: `${passedSteps}/${this.steps.length} steps passed`
        };
    }
}

/**
 * EscapeSequenceParser handles terminal escape sequences.
 */
class EscapeSequenceParser {
    static sequences = {
        '\x1b[H': { type: 'cursor', action: 'home' },
        '\x1b[2J': { type: 'screen', action: 'clear' },
        '\x1b[K': { type: 'line', action: 'clearToEnd' },
        '\x1b[1m': { type: 'style', action: 'bold' },
        '\x1b[0m': { type: 'style', action: 'reset' },
        '\x1b[31m': { type: 'color', action: 'red' },
        '\x1b[32m': { type: 'color', action: 'green' },
        '\x1b[33m': { type: 'color', action: 'yellow' }
    };

    /**
     * Parses escape sequence
     * @param {string} sequence - Sequence to parse
     * @returns {Object|null} Parsed result or null
     */
    static parse(sequence) {
        return this.sequences[sequence] || this.parseCustom(sequence);
    }

    /**
     * Parses custom cursor movement
     * @param {string} sequence - Sequence to parse
     * @returns {Object|null} Parsed result or null
     */
    static parseCustom(sequence) {
        // Match cursor position: ESC[row;colH
        const posMatch = sequence.match(/\x1b\[(\d+);(\d+)H/);
        if (posMatch) {
            return {
                type: 'cursor',
                action: 'move',
                row: parseInt(posMatch[1]),
                col: parseInt(posMatch[2])
            };
        }
        return null;
    }

    /**
     * Strips escape sequences from text
     * @param {string} text - Text with sequences
     * @returns {string} Clean text
     */
    static strip(text) {
        return text.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '');
    }
}

// Demonstration
console.log('=== Terminal User Interface Testing Demo ===\n');

// Create screen
console.log('--- Terminal Screen ---');
const screen = new TerminalScreen(80, 24);
screen.writeAt(30, 1, '=== Login Form ===');
screen.writeAt(10, 5, 'Username: [____________]');
screen.writeAt(10, 7, 'Password: [____________]');
screen.writeAt(30, 10, '[ Login ]  [ Cancel ]');

console.log('Screen content (partial):');
console.log(screen.getRow(1));
console.log(screen.getRow(5));
console.log(screen.getRow(7));
console.log(screen.getRow(10));

// Find text
console.log('\nFind "Username":', screen.findText('Username'));

// Create test driver
console.log('\n--- TUI Test Driver ---');
const driver = new TUITestDriver(screen);

driver.registerElement(new TUIElement({
    type: 'input',
    x: 21,
    y: 5,
    width: 12,
    label: 'username'
}));

driver.registerElement(new TUIElement({
    type: 'input',
    x: 21,
    y: 7,
    width: 12,
    label: 'password'
}));

driver.registerElement(new TUIElement({
    type: 'button',
    x: 30,
    y: 10,
    width: 9,
    label: 'login'
}));

// Navigate and interact
driver.navigate('next'); // Focus username
driver.typeText('testuser');
driver.navigate('next'); // Focus password
driver.typeText('secret123');
driver.navigate('next'); // Focus login button

// Assertions
console.log('\n--- Test Assertions ---');
console.log(driver.assertTextOnScreen('Login Form'));
console.log(driver.assertElementValue('username', 'testuser'));
console.log(driver.assertFocused('login'));

// Test results
console.log('\n--- Test Results ---');
console.log(driver.getResults());

// Keyboard input
console.log('\n--- Keyboard Input History ---');
console.log('Keys pressed:', driver.keyboard.getHistory().slice(0, 5).map(k => k.key));

// Escape sequences
console.log('\n--- Escape Sequence Parsing ---');
console.log('Clear screen:', EscapeSequenceParser.parse('\x1b[2J'));
console.log('Move cursor:', EscapeSequenceParser.parse('\x1b[5;10H'));
console.log('Strip sequences:', EscapeSequenceParser.strip('\x1b[32mGreen\x1b[0m text'));

// Test scenario
console.log('\n--- Test Scenario Execution ---');
const scenario = new TUITestScenario('Login Form Test');
scenario.addStep('Find login form', (d) => d.assertTextOnScreen('Login'));
scenario.addStep('Navigate to username', (d) => { d.navigate('next'); return true; });
scenario.addStep('Verify username focused', (d) => d.assertFocused('username'));

console.log(scenario.execute(driver));

/**
 * Best Practices for TUI Testing:
 *
 * 1. Use screen scraping for content validation
 * 2. Handle asynchronous terminal operations
 * 3. Test keyboard navigation thoroughly
 * 4. Validate escape sequence handling
 * 5. Test across different terminal emulators
 * 6. Account for different terminal sizes
 * 7. Use mock terminal environments
 * 8. Test accessibility features
 * 9. Handle timing issues carefully
 * 10. Test in headless environments
 */
