/**
 * Fake (Test Double) - Simplified Working Implementations
 *
 * A fake is a test double that provides a working implementation of a
 * dependency, but with simplified behavior compared to production.
 * Fakes are useful for testing components that depend on external systems
 * without the overhead of real infrastructure.
 *
 * Key Characteristics:
 * - Provides functional implementation, not just placeholder
 * - Simpler/lighter than production version
 * - Deterministic and fast
 * - Examples: in-memory database, fake HTTP server
 */

/**
 * FakeDatabase provides an in-memory database implementation.
 * Simulates database operations without external dependencies.
 */
class FakeDatabase {
    constructor() {
        this.tables = new Map();
        this.autoIncrement = new Map();
        this.connected = false;
    }

    /**
     * Connects to the fake database
     * @returns {Promise<void>}
     */
    async connect() {
        this.connected = true;
        console.log('FakeDatabase: Connected');
    }

    /**
     * Disconnects from the fake database
     * @returns {Promise<void>}
     */
    async disconnect() {
        this.connected = false;
        console.log('FakeDatabase: Disconnected');
    }

    /**
     * Creates a table
     * @param {string} name - Table name
     * @param {Object} schema - Table schema
     */
    createTable(name, schema) {
        this.tables.set(name, {
            schema,
            rows: []
        });
        this.autoIncrement.set(name, 1);
        console.log(`FakeDatabase: Created table "${name}"`);
    }

    /**
     * Inserts a row into a table
     * @param {string} table - Table name
     * @param {Object} data - Row data
     * @returns {Promise<Object>} Inserted row with ID
     */
    async insert(table, data) {
        this.checkConnection();
        const tableData = this.tables.get(table);
        if (!tableData) throw new Error(`Table "${table}" does not exist`);

        const id = this.autoIncrement.get(table);
        this.autoIncrement.set(table, id + 1);

        const row = { id, ...data, createdAt: new Date().toISOString() };
        tableData.rows.push(row);

        return row;
    }

    /**
     * Finds rows matching criteria
     * @param {string} table - Table name
     * @param {Object} criteria - Search criteria
     * @returns {Promise<Array>} Matching rows
     */
    async find(table, criteria = {}) {
        this.checkConnection();
        const tableData = this.tables.get(table);
        if (!tableData) throw new Error(`Table "${table}" does not exist`);

        return tableData.rows.filter(row => {
            return Object.entries(criteria).every(([key, value]) => row[key] === value);
        });
    }

    /**
     * Finds a single row by ID
     * @param {string} table - Table name
     * @param {number} id - Row ID
     * @returns {Promise<Object|null>} Found row or null
     */
    async findById(table, id) {
        const rows = await this.find(table, { id });
        return rows[0] || null;
    }

    /**
     * Updates rows matching criteria
     * @param {string} table - Table name
     * @param {Object} criteria - Search criteria
     * @param {Object} updates - Updates to apply
     * @returns {Promise<number>} Number of updated rows
     */
    async update(table, criteria, updates) {
        this.checkConnection();
        const tableData = this.tables.get(table);
        if (!tableData) throw new Error(`Table "${table}" does not exist`);

        let count = 0;
        tableData.rows.forEach(row => {
            const matches = Object.entries(criteria).every(([key, value]) => row[key] === value);
            if (matches) {
                Object.assign(row, updates, { updatedAt: new Date().toISOString() });
                count++;
            }
        });

        return count;
    }

    /**
     * Deletes rows matching criteria
     * @param {string} table - Table name
     * @param {Object} criteria - Search criteria
     * @returns {Promise<number>} Number of deleted rows
     */
    async delete(table, criteria) {
        this.checkConnection();
        const tableData = this.tables.get(table);
        if (!tableData) throw new Error(`Table "${table}" does not exist`);

        const before = tableData.rows.length;
        tableData.rows = tableData.rows.filter(row => {
            return !Object.entries(criteria).every(([key, value]) => row[key] === value);
        });

        return before - tableData.rows.length;
    }

    /**
     * Executes a raw query (simplified)
     * @param {string} query - SQL query
     * @param {Array} params - Query parameters
     * @returns {Promise<Array>} Query results
     */
    async query(query, params = []) {
        this.checkConnection();
        // Simplified query parsing - in real fake, would parse SQL
        console.log(`FakeDatabase: Executing query: ${query}`);
        return [];
    }

    /**
     * Clears all data from a table
     * @param {string} table - Table name
     */
    async truncate(table) {
        const tableData = this.tables.get(table);
        if (tableData) {
            tableData.rows = [];
            this.autoIncrement.set(table, 1);
        }
    }

    /**
     * Checks if connected
     */
    checkConnection() {
        if (!this.connected) {
            throw new Error('Database not connected');
        }
    }

    /**
     * Gets table statistics
     * @returns {Object} Statistics
     */
    getStats() {
        const stats = {};
        for (const [name, data] of this.tables) {
            stats[name] = data.rows.length;
        }
        return stats;
    }
}

/**
 * FakeHttpClient simulates HTTP requests.
 * Returns predefined responses without network calls.
 */
class FakeHttpClient {
    constructor() {
        this.routes = new Map();
        this.requests = [];
        this.defaultResponse = { status: 404, body: 'Not Found' };
    }

    /**
     * Registers a fake route
     * @param {string} method - HTTP method
     * @param {string} url - URL pattern
     * @param {Object} response - Response to return
     */
    register(method, url, response) {
        const key = `${method.toUpperCase()}:${url}`;
        this.routes.set(key, response);
    }

    /**
     * Makes a fake HTTP request
     * @param {Object} config - Request configuration
     * @returns {Promise<Object>} Response
     */
    async request(config) {
        const { method = 'GET', url, data, headers = {} } = config;
        const key = `${method.toUpperCase()}:${url}`;

        // Record the request
        this.requests.push({
            method,
            url,
            data,
            headers,
            timestamp: new Date().toISOString()
        });

        // Find matching route
        let response = this.routes.get(key);

        // Try pattern matching
        if (!response) {
            for (const [pattern, res] of this.routes) {
                if (this.matchPattern(pattern, key)) {
                    response = res;
                    break;
                }
            }
        }

        if (!response) {
            response = this.defaultResponse;
        }

        // Support function responses for dynamic behavior
        if (typeof response === 'function') {
            response = response(config);
        }

        // Simulate network delay
        await this.delay(response.delay || 10);

        if (response.error) {
            throw new Error(response.error);
        }

        return {
            status: response.status || 200,
            data: response.body || response.data,
            headers: response.headers || {}
        };
    }

    /**
     * GET request shorthand
     * @param {string} url - URL
     * @param {Object} config - Additional config
     * @returns {Promise<Object>} Response
     */
    async get(url, config = {}) {
        return this.request({ ...config, method: 'GET', url });
    }

    /**
     * POST request shorthand
     * @param {string} url - URL
     * @param {Object} data - Request body
     * @param {Object} config - Additional config
     * @returns {Promise<Object>} Response
     */
    async post(url, data, config = {}) {
        return this.request({ ...config, method: 'POST', url, data });
    }

    /**
     * Checks if pattern matches key
     * @param {string} pattern - Route pattern
     * @param {string} key - Request key
     * @returns {boolean} True if matches
     */
    matchPattern(pattern, key) {
        // Simple wildcard matching
        const regexPattern = pattern.replace(/\*/g, '.*');
        return new RegExp(`^${regexPattern}$`).test(key);
    }

    /**
     * Delays for specified time
     * @param {number} ms - Milliseconds
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Gets recorded requests
     * @param {string} url - Optional URL filter
     * @returns {Array} Recorded requests
     */
    getRequests(url = null) {
        if (url) {
            return this.requests.filter(r => r.url === url);
        }
        return this.requests;
    }

    /**
     * Clears recorded requests
     */
    clearRequests() {
        this.requests = [];
    }
}

/**
 * FakeFileSystem simulates file system operations.
 * Stores files in memory for testing.
 */
class FakeFileSystem {
    constructor() {
        this.files = new Map();
        this.directories = new Set(['/']);
    }

    /**
     * Writes a file
     * @param {string} path - File path
     * @param {string|Buffer} content - File content
     */
    async writeFile(path, content) {
        this.ensureDirectory(this.dirname(path));
        this.files.set(path, {
            content,
            createdAt: new Date(),
            modifiedAt: new Date()
        });
    }

    /**
     * Reads a file
     * @param {string} path - File path
     * @returns {string|Buffer} File content
     */
    async readFile(path) {
        const file = this.files.get(path);
        if (!file) {
            throw new Error(`ENOENT: no such file or directory, open '${path}'`);
        }
        return file.content;
    }

    /**
     * Checks if file exists
     * @param {string} path - File path
     * @returns {boolean} True if exists
     */
    async exists(path) {
        return this.files.has(path) || this.directories.has(path);
    }

    /**
     * Deletes a file
     * @param {string} path - File path
     */
    async unlink(path) {
        if (!this.files.has(path)) {
            throw new Error(`ENOENT: no such file or directory, unlink '${path}'`);
        }
        this.files.delete(path);
    }

    /**
     * Creates a directory
     * @param {string} path - Directory path
     */
    async mkdir(path) {
        this.directories.add(path);
    }

    /**
     * Lists directory contents
     * @param {string} path - Directory path
     * @returns {Array} Directory entries
     */
    async readdir(path) {
        const entries = [];
        const prefix = path.endsWith('/') ? path : `${path}/`;

        for (const filePath of this.files.keys()) {
            if (filePath.startsWith(prefix)) {
                const relativePath = filePath.slice(prefix.length);
                const firstSegment = relativePath.split('/')[0];
                if (!entries.includes(firstSegment)) {
                    entries.push(firstSegment);
                }
            }
        }

        return entries;
    }

    /**
     * Gets directory name from path
     * @param {string} path - File path
     * @returns {string} Directory name
     */
    dirname(path) {
        const parts = path.split('/');
        parts.pop();
        return parts.join('/') || '/';
    }

    /**
     * Ensures directory exists
     * @param {string} path - Directory path
     */
    ensureDirectory(path) {
        const parts = path.split('/').filter(Boolean);
        let current = '';

        for (const part of parts) {
            current += `/${part}`;
            this.directories.add(current);
        }
    }

    /**
     * Clears all files and directories
     */
    clear() {
        this.files.clear();
        this.directories.clear();
        this.directories.add('/');
    }
}

/**
 * FakeEmailService simulates sending emails.
 * Stores sent emails for verification.
 */
class FakeEmailService {
    constructor() {
        this.sentEmails = [];
        this.failOnAddresses = new Set();
    }

    /**
     * Sends an email (stores it)
     * @param {Object} email - Email details
     * @returns {Promise<Object>} Send result
     */
    async send(email) {
        if (this.failOnAddresses.has(email.to)) {
            throw new Error(`Failed to send email to ${email.to}`);
        }

        const sent = {
            id: `email-${Date.now()}`,
            from: email.from,
            to: email.to,
            subject: email.subject,
            body: email.body,
            html: email.html,
            sentAt: new Date().toISOString()
        };

        this.sentEmails.push(sent);
        console.log(`FakeEmail: Sent to ${email.to}`);

        return { success: true, messageId: sent.id };
    }

    /**
     * Gets sent emails
     * @param {Object} filter - Optional filter criteria
     * @returns {Array} Matching emails
     */
    getSentEmails(filter = {}) {
        return this.sentEmails.filter(email => {
            return Object.entries(filter).every(([key, value]) => email[key] === value);
        });
    }

    /**
     * Gets last sent email
     * @returns {Object|null} Last email or null
     */
    getLastSent() {
        return this.sentEmails[this.sentEmails.length - 1] || null;
    }

    /**
     * Configures an address to fail
     * @param {string} address - Email address
     */
    setFailure(address) {
        this.failOnAddresses.add(address);
    }

    /**
     * Clears sent emails
     */
    clear() {
        this.sentEmails = [];
        this.failOnAddresses.clear();
    }
}

// Demonstration
console.log('=== Fake Test Double Demo ===\n');

// Fake Database demo
console.log('--- Fake Database ---');
const fakeDb = new FakeDatabase();
fakeDb.createTable('users', { id: 'number', name: 'string', email: 'string' });

(async () => {
    await fakeDb.connect();

    const user = await fakeDb.insert('users', { name: 'John', email: 'john@example.com' });
    console.log('Inserted:', user);

    const found = await fakeDb.find('users', { name: 'John' });
    console.log('Found:', found);

    await fakeDb.update('users', { id: 1 }, { name: 'John Doe' });
    const updated = await fakeDb.findById('users', 1);
    console.log('Updated:', updated);

    console.log('Stats:', fakeDb.getStats());
})();

// Fake HTTP Client demo
console.log('\n--- Fake HTTP Client ---');
const fakeHttp = new FakeHttpClient();

fakeHttp.register('GET', '/api/users', {
    status: 200,
    body: [{ id: 1, name: 'John' }]
});

fakeHttp.register('POST', '/api/users', (config) => ({
    status: 201,
    body: { id: 2, ...config.data }
}));

(async () => {
    const getResponse = await fakeHttp.get('/api/users');
    console.log('GET response:', getResponse.data);

    const postResponse = await fakeHttp.post('/api/users', { name: 'Jane' });
    console.log('POST response:', postResponse.data);

    console.log('Recorded requests:', fakeHttp.requests.length);
})();

// Fake Email demo
console.log('\n--- Fake Email Service ---');
const fakeEmail = new FakeEmailService();

(async () => {
    await fakeEmail.send({
        from: 'app@example.com',
        to: 'user@example.com',
        subject: 'Welcome!',
        body: 'Welcome to our app'
    });

    console.log('Sent emails:', fakeEmail.getSentEmails().length);
    console.log('Last sent:', fakeEmail.getLastSent()?.subject);
})();

/**
 * Best Practices for Fake Test Doubles:
 *
 * 1. Keep fakes simpler than production implementations
 * 2. Maintain behavior parity with real implementations
 * 3. Document any differences from real implementations
 * 4. Update fakes when real implementation changes
 * 5. Include methods to inspect fake state (getSentEmails, etc.)
 * 6. Make fakes deterministic for reliable tests
 * 7. Provide methods to simulate error conditions
 * 8. Use fakes for external dependencies (DB, HTTP, email)
 * 9. Consider shared fakes for team consistency
 * 10. Periodically validate fakes against real systems
 */
