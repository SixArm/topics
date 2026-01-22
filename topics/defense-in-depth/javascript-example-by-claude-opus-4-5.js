/**
 * Defense in Depth - Layered Security Strategy
 *
 * Defense in depth implements multiple layers of security measures to protect
 * against potential attacks. By creating multiple barriers, the system can
 * continue to function even if one or more layers are compromised.
 *
 * Key Layers:
 * - Perimeter Security: Firewalls and intrusion prevention
 * - Application Security: Input validation and error handling
 * - Access Control: Authentication and authorization policies
 * - Data Encryption: Protecting data at rest and in transit
 * - Monitoring: Detecting and responding to threats
 */

/**
 * SecurityLayer represents a single security control layer.
 * Each layer provides specific protection capabilities.
 */
class SecurityLayer {
    constructor(name, type, priority) {
        this.name = name;
        this.type = type;
        this.priority = priority;
        this.enabled = true;
        this.controls = [];
        this.alerts = [];
    }

    /**
     * Adds a security control to this layer
     * @param {Object} control - Security control configuration
     */
    addControl(control) {
        this.controls.push({
            id: `${this.name}-${this.controls.length + 1}`,
            name: control.name,
            type: control.type,
            action: control.action,
            enabled: true
        });
    }

    /**
     * Evaluates a request against this layer's controls
     * @param {Object} request - Request to evaluate
     * @returns {Object} Evaluation result
     */
    evaluate(request) {
        if (!this.enabled) {
            return { passed: true, skipped: true };
        }

        const results = [];

        for (const control of this.controls) {
            if (!control.enabled) continue;

            const result = control.action(request);
            results.push({
                control: control.name,
                passed: result.passed,
                message: result.message
            });

            if (!result.passed) {
                this.alerts.push({
                    timestamp: new Date().toISOString(),
                    control: control.name,
                    request: request.id,
                    message: result.message
                });
            }
        }

        return {
            layer: this.name,
            passed: results.every(r => r.passed),
            results
        };
    }

    /**
     * Gets layer status summary
     * @returns {Object} Layer status
     */
    getStatus() {
        return {
            name: this.name,
            type: this.type,
            enabled: this.enabled,
            controls: this.controls.length,
            activeControls: this.controls.filter(c => c.enabled).length,
            recentAlerts: this.alerts.slice(-10).length
        };
    }
}

/**
 * PerimeterSecurityLayer handles external-facing security controls.
 * First line of defense against unauthorized access.
 */
class PerimeterSecurityLayer extends SecurityLayer {
    constructor() {
        super('Perimeter', 'external', 1);
        this.blockedIPs = new Set();
        this.rateLimit = new Map();
        this.initializeControls();
    }

    /**
     * Initializes default perimeter security controls
     */
    initializeControls() {
        // IP blocking control
        this.addControl({
            name: 'IP Block List',
            type: 'block',
            action: (request) => {
                const blocked = this.blockedIPs.has(request.ip);
                return {
                    passed: !blocked,
                    message: blocked ? `Blocked IP: ${request.ip}` : 'IP allowed'
                };
            }
        });

        // Rate limiting control
        this.addControl({
            name: 'Rate Limiter',
            type: 'throttle',
            action: (request) => {
                const key = request.ip;
                const now = Date.now();
                const limit = 100; // requests per minute
                const window = 60000; // 1 minute

                const history = this.rateLimit.get(key) || [];
                const recent = history.filter(t => now - t < window);

                if (recent.length >= limit) {
                    return {
                        passed: false,
                        message: `Rate limit exceeded for ${key}`
                    };
                }

                recent.push(now);
                this.rateLimit.set(key, recent);

                return {
                    passed: true,
                    message: `Rate: ${recent.length}/${limit}`
                };
            }
        });
    }

    /**
     * Blocks an IP address
     * @param {string} ip - IP address to block
     */
    blockIP(ip) {
        this.blockedIPs.add(ip);
        console.log(`Blocked IP: ${ip}`);
    }

    /**
     * Unblocks an IP address
     * @param {string} ip - IP address to unblock
     */
    unblockIP(ip) {
        this.blockedIPs.delete(ip);
        console.log(`Unblocked IP: ${ip}`);
    }
}

/**
 * ApplicationSecurityLayer handles application-level security.
 * Protects against attacks targeting application logic.
 */
class ApplicationSecurityLayer extends SecurityLayer {
    constructor() {
        super('Application', 'application', 2);
        this.initializeControls();
    }

    /**
     * Initializes application security controls
     */
    initializeControls() {
        // Input validation control
        this.addControl({
            name: 'Input Validator',
            type: 'validate',
            action: (request) => {
                const issues = this.validateInput(request.body);
                return {
                    passed: issues.length === 0,
                    message: issues.length > 0
                        ? `Input validation failed: ${issues.join(', ')}`
                        : 'Input validated'
                };
            }
        });

        // SQL injection detection
        this.addControl({
            name: 'SQL Injection Filter',
            type: 'filter',
            action: (request) => {
                const suspicious = this.detectSQLInjection(request.body);
                return {
                    passed: !suspicious,
                    message: suspicious
                        ? 'Potential SQL injection detected'
                        : 'No SQL injection detected'
                };
            }
        });

        // XSS detection
        this.addControl({
            name: 'XSS Filter',
            type: 'filter',
            action: (request) => {
                const suspicious = this.detectXSS(request.body);
                return {
                    passed: !suspicious,
                    message: suspicious
                        ? 'Potential XSS attack detected'
                        : 'No XSS detected'
                };
            }
        });
    }

    /**
     * Validates input data
     * @param {Object} data - Input data to validate
     * @returns {Array} Validation issues
     */
    validateInput(data) {
        const issues = [];

        if (data && typeof data === 'object') {
            for (const [key, value] of Object.entries(data)) {
                if (value === null || value === undefined) {
                    issues.push(`Missing required field: ${key}`);
                }
                if (typeof value === 'string' && value.length > 10000) {
                    issues.push(`Field ${key} exceeds max length`);
                }
            }
        }

        return issues;
    }

    /**
     * Detects potential SQL injection patterns
     * @param {Object} data - Data to check
     * @returns {boolean} True if suspicious
     */
    detectSQLInjection(data) {
        const patterns = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b)/i,
            /(['";])/,
            /(--)/
        ];

        const jsonStr = JSON.stringify(data || {});
        return patterns.some(pattern => pattern.test(jsonStr));
    }

    /**
     * Detects potential XSS patterns
     * @param {Object} data - Data to check
     * @returns {boolean} True if suspicious
     */
    detectXSS(data) {
        const patterns = [
            /<script\b/i,
            /javascript:/i,
            /on\w+=/i,
            /<iframe/i
        ];

        const jsonStr = JSON.stringify(data || {});
        return patterns.some(pattern => pattern.test(jsonStr));
    }
}

/**
 * AccessControlLayer manages authentication and authorization.
 * Ensures only authorized users can access resources.
 */
class AccessControlLayer extends SecurityLayer {
    constructor() {
        super('Access Control', 'authorization', 3);
        this.sessions = new Map();
        this.permissions = new Map();
        this.initializeControls();
    }

    /**
     * Initializes access control mechanisms
     */
    initializeControls() {
        // Authentication check
        this.addControl({
            name: 'Authentication',
            type: 'auth',
            action: (request) => {
                const authenticated = this.validateSession(request.sessionId);
                return {
                    passed: authenticated,
                    message: authenticated
                        ? 'User authenticated'
                        : 'Authentication required'
                };
            }
        });

        // Authorization check
        this.addControl({
            name: 'Authorization',
            type: 'authz',
            action: (request) => {
                if (!request.userId || !request.resource) {
                    return { passed: true, message: 'No authorization required' };
                }

                const authorized = this.checkPermission(
                    request.userId,
                    request.resource,
                    request.action
                );

                return {
                    passed: authorized,
                    message: authorized
                        ? `Access granted to ${request.resource}`
                        : `Access denied to ${request.resource}`
                };
            }
        });
    }

    /**
     * Creates a session
     * @param {string} userId - User ID
     * @returns {string} Session ID
     */
    createSession(userId) {
        const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.sessions.set(sessionId, {
            userId,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 3600000).toISOString()
        });
        return sessionId;
    }

    /**
     * Validates a session
     * @param {string} sessionId - Session to validate
     * @returns {boolean} True if valid
     */
    validateSession(sessionId) {
        if (!sessionId) return false;

        const session = this.sessions.get(sessionId);
        if (!session) return false;

        return new Date(session.expiresAt) > new Date();
    }

    /**
     * Grants a permission
     * @param {string} userId - User ID
     * @param {string} resource - Resource identifier
     * @param {string} action - Action (read, write, delete)
     */
    grantPermission(userId, resource, action) {
        const key = `${userId}:${resource}:${action}`;
        this.permissions.set(key, true);
    }

    /**
     * Checks if user has permission
     * @param {string} userId - User ID
     * @param {string} resource - Resource
     * @param {string} action - Action
     * @returns {boolean} True if permitted
     */
    checkPermission(userId, resource, action) {
        const key = `${userId}:${resource}:${action}`;
        return this.permissions.has(key);
    }
}

/**
 * DataProtectionLayer handles encryption and data security.
 * Protects sensitive data at rest and in transit.
 */
class DataProtectionLayer extends SecurityLayer {
    constructor() {
        super('Data Protection', 'data', 4);
        this.initializeControls();
    }

    /**
     * Initializes data protection controls
     */
    initializeControls() {
        // Encryption check
        this.addControl({
            name: 'Transport Encryption',
            type: 'encryption',
            action: (request) => {
                const encrypted = request.protocol === 'https';
                return {
                    passed: encrypted,
                    message: encrypted
                        ? 'Connection encrypted'
                        : 'Unencrypted connection detected'
                };
            }
        });

        // Sensitive data detection
        this.addControl({
            name: 'Sensitive Data Scanner',
            type: 'scanner',
            action: (request) => {
                const sensitiveData = this.detectSensitiveData(request.body);
                return {
                    passed: !sensitiveData.found || sensitiveData.protected,
                    message: sensitiveData.found
                        ? `Sensitive data detected: ${sensitiveData.types.join(', ')}`
                        : 'No sensitive data detected'
                };
            }
        });
    }

    /**
     * Detects sensitive data patterns
     * @param {Object} data - Data to scan
     * @returns {Object} Detection result
     */
    detectSensitiveData(data) {
        const patterns = {
            creditCard: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
            ssn: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/,
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        };

        const jsonStr = JSON.stringify(data || {});
        const foundTypes = [];

        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(jsonStr)) {
                foundTypes.push(type);
            }
        }

        return {
            found: foundTypes.length > 0,
            types: foundTypes,
            protected: false
        };
    }
}

/**
 * DefenseInDepthManager orchestrates all security layers.
 * Coordinates security evaluation across the entire stack.
 */
class DefenseInDepthManager {
    constructor() {
        this.layers = [];
        this.auditLog = [];
    }

    /**
     * Adds a security layer
     * @param {SecurityLayer} layer - Layer to add
     */
    addLayer(layer) {
        this.layers.push(layer);
        this.layers.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Evaluates a request through all security layers
     * @param {Object} request - Request to evaluate
     * @returns {Object} Security evaluation result
     */
    evaluate(request) {
        console.log(`\nEvaluating request: ${request.id}`);

        const results = [];
        let blocked = false;

        for (const layer of this.layers) {
            const result = layer.evaluate(request);
            results.push(result);

            console.log(`  ${layer.name}: ${result.passed ? '✓' : '✗'}`);

            if (!result.passed) {
                blocked = true;
                break;
            }
        }

        const evaluation = {
            requestId: request.id,
            timestamp: new Date().toISOString(),
            allowed: !blocked,
            layersEvaluated: results.length,
            results
        };

        this.auditLog.push(evaluation);
        return evaluation;
    }

    /**
     * Gets security status overview
     * @returns {Object} System security status
     */
    getSecurityStatus() {
        return {
            layers: this.layers.map(l => l.getStatus()),
            totalControls: this.layers.reduce((sum, l) => sum + l.controls.length, 0),
            recentEvaluations: this.auditLog.length,
            blockedRequests: this.auditLog.filter(e => !e.allowed).length
        };
    }

    /**
     * Gets audit log
     * @param {number} limit - Number of entries to return
     * @returns {Array} Recent audit entries
     */
    getAuditLog(limit = 10) {
        return this.auditLog.slice(-limit);
    }
}

// Demonstration
console.log('=== Defense in Depth Demo ===');

// Create security manager
const security = new DefenseInDepthManager();

// Add security layers
security.addLayer(new PerimeterSecurityLayer());
security.addLayer(new ApplicationSecurityLayer());
security.addLayer(new AccessControlLayer());
security.addLayer(new DataProtectionLayer());

console.log('\nSecurity Layers Configured:');
security.layers.forEach(layer => {
    console.log(`  ${layer.priority}. ${layer.name} (${layer.controls.length} controls)`);
});

// Test legitimate request
const legitimateRequest = {
    id: 'req-001',
    ip: '192.168.1.100',
    protocol: 'https',
    body: { username: 'john', action: 'login' }
};

console.log('\n--- Testing Legitimate Request ---');
const result1 = security.evaluate(legitimateRequest);
console.log(`Result: ${result1.allowed ? 'ALLOWED' : 'BLOCKED'}`);

// Test malicious request
const maliciousRequest = {
    id: 'req-002',
    ip: '192.168.1.101',
    protocol: 'https',
    body: { search: "'; DROP TABLE users; --" }
};

console.log('\n--- Testing Malicious Request ---');
const result2 = security.evaluate(maliciousRequest);
console.log(`Result: ${result2.allowed ? 'ALLOWED' : 'BLOCKED'}`);

// Show security status
console.log('\n--- Security Status ---');
console.log(JSON.stringify(security.getSecurityStatus(), null, 2));

/**
 * Best Practices for Defense in Depth:
 *
 * 1. Implement multiple independent security layers
 * 2. Assume any single layer can be bypassed
 * 3. Use different security mechanisms at each layer
 * 4. Monitor and log all security events
 * 5. Regularly test each security layer independently
 * 6. Keep security controls updated with latest threat intelligence
 * 7. Implement fail-secure defaults
 * 8. Apply principle of least privilege at every layer
 * 9. Conduct regular security assessments and penetration testing
 * 10. Train development teams on secure coding practices
 */
