/**
 * Security Mitigations - Reducing Security Risks and Vulnerabilities
 *
 * Security mitigations refer to measures or actions taken to reduce or
 * eliminate security risks and vulnerabilities in software. These can be
 * both proactive (preventing threats before they happen) and reactive
 * (responding to detected threats).
 *
 * Key Concepts:
 * - Input validation and sanitization
 * - Encryption and access control
 * - Auditing and monitoring
 * - Patching and updates
 */

/**
 * MitigationCategory organizes mitigations by type.
 */
class MitigationCategory {
    static categories = {
        inputValidation: {
            name: 'Input Validation',
            description: 'Verify and sanitize all input data',
            techniques: [
                'Whitelist validation',
                'Type checking',
                'Length limits',
                'Format validation',
                'Encoding/escaping'
            ],
            prevents: ['SQL Injection', 'XSS', 'Command Injection', 'Buffer Overflow']
        },
        encryption: {
            name: 'Encryption',
            description: 'Protect data confidentiality using cryptography',
            techniques: [
                'Data at rest encryption',
                'Data in transit encryption (TLS)',
                'End-to-end encryption',
                'Hashing for passwords'
            ],
            prevents: ['Data theft', 'Eavesdropping', 'Man-in-the-middle']
        },
        accessControl: {
            name: 'Access Control',
            description: 'Restrict access to authorized users',
            techniques: [
                'Authentication (who you are)',
                'Authorization (what you can do)',
                'Role-based access control',
                'Least privilege principle'
            ],
            prevents: ['Unauthorized access', 'Privilege escalation', 'Data breach']
        },
        auditing: {
            name: 'Auditing and Monitoring',
            description: 'Track and alert on security events',
            techniques: [
                'Security logging',
                'Real-time monitoring',
                'Anomaly detection',
                'Incident alerting'
            ],
            prevents: ['Undetected breaches', 'Compliance violations', 'Insider threats']
        },
        patching: {
            name: 'Patching and Updates',
            description: 'Keep software current with security fixes',
            techniques: [
                'Regular update schedule',
                'Vulnerability scanning',
                'Dependency management',
                'Emergency patching process'
            ],
            prevents: ['Known vulnerabilities', 'Zero-day exploitation window']
        },
        attackSurface: {
            name: 'Attack Surface Reduction',
            description: 'Minimize potential attack vectors',
            techniques: [
                'Disable unused features',
                'Remove unnecessary services',
                'Network segmentation',
                'Minimize exposed endpoints'
            ],
            prevents: ['Unknown vulnerabilities', 'Lateral movement', 'Service exploitation']
        }
    };

    /**
     * Gets category by name
     * @param {string} name - Category name
     * @returns {Object} Category details
     */
    static getCategory(name) {
        return this.categories[name];
    }

    /**
     * Gets all categories
     * @returns {Array} All categories
     */
    static getAllCategories() {
        return Object.entries(this.categories).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Gets mitigations for a specific threat
     * @param {string} threat - Threat to mitigate
     * @returns {Array} Applicable mitigations
     */
    static getForThreat(threat) {
        return this.getAllCategories().filter(cat =>
            cat.prevents.some(p => p.toLowerCase().includes(threat.toLowerCase()))
        );
    }
}

/**
 * InputValidator provides input validation utilities.
 */
class InputValidator {
    /**
     * Validates string input
     * @param {string} input - Input to validate
     * @param {Object} rules - Validation rules
     * @returns {Object} Validation result
     */
    static validateString(input, rules) {
        const errors = [];

        if (rules.required && (!input || input.trim() === '')) {
            errors.push('Input is required');
        }

        if (rules.minLength && input.length < rules.minLength) {
            errors.push(`Minimum length is ${rules.minLength}`);
        }

        if (rules.maxLength && input.length > rules.maxLength) {
            errors.push(`Maximum length is ${rules.maxLength}`);
        }

        if (rules.pattern && !rules.pattern.test(input)) {
            errors.push('Input does not match required pattern');
        }

        if (rules.whitelist && !rules.whitelist.includes(input)) {
            errors.push('Input is not in allowed values');
        }

        return {
            valid: errors.length === 0,
            errors,
            sanitized: rules.sanitize ? this.sanitize(input) : input
        };
    }

    /**
     * Validates email
     * @param {string} email - Email to validate
     * @returns {Object} Validation result
     */
    static validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return this.validateString(email, {
            required: true,
            maxLength: 254,
            pattern
        });
    }

    /**
     * Sanitizes string input
     * @param {string} input - Input to sanitize
     * @returns {string} Sanitized input
     */
    static sanitize(input) {
        return input
            .replace(/[<>]/g, '') // Remove angle brackets
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .trim();
    }

    /**
     * Escapes HTML
     * @param {string} input - Input to escape
     * @returns {string} Escaped input
     */
    static escapeHtml(input) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return input.replace(/[&<>"']/g, char => map[char]);
    }
}

/**
 * AccessControlManager manages access control.
 */
class AccessControlManager {
    constructor() {
        this.roles = new Map();
        this.permissions = new Map();
        this.userRoles = new Map();
    }

    /**
     * Defines a role
     * @param {string} role - Role name
     * @param {Array} permissions - Role permissions
     */
    defineRole(role, permissions) {
        this.roles.set(role, { name: role, permissions });
    }

    /**
     * Assigns role to user
     * @param {string} userId - User ID
     * @param {string} role - Role to assign
     */
    assignRole(userId, role) {
        if (!this.roles.has(role)) {
            throw new Error(`Role ${role} does not exist`);
        }

        if (!this.userRoles.has(userId)) {
            this.userRoles.set(userId, []);
        }
        this.userRoles.get(userId).push(role);
    }

    /**
     * Checks if user has permission
     * @param {string} userId - User ID
     * @param {string} permission - Required permission
     * @returns {Object} Authorization result
     */
    checkPermission(userId, permission) {
        const userRoles = this.userRoles.get(userId) || [];

        for (const roleName of userRoles) {
            const role = this.roles.get(roleName);
            if (role && role.permissions.includes(permission)) {
                return {
                    authorized: true,
                    role: roleName,
                    permission
                };
            }
        }

        return {
            authorized: false,
            reason: 'User does not have required permission',
            requiredPermission: permission,
            userRoles
        };
    }

    /**
     * Gets user permissions
     * @param {string} userId - User ID
     * @returns {Array} All user permissions
     */
    getUserPermissions(userId) {
        const userRoles = this.userRoles.get(userId) || [];
        const permissions = new Set();

        for (const roleName of userRoles) {
            const role = this.roles.get(roleName);
            if (role) {
                role.permissions.forEach(p => permissions.add(p));
            }
        }

        return Array.from(permissions);
    }
}

/**
 * SecurityAuditLogger logs security events.
 */
class SecurityAuditLogger {
    constructor() {
        this.logs = [];
    }

    /**
     * Logs a security event
     * @param {Object} event - Event to log
     */
    log(event) {
        this.logs.push({
            id: `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            timestamp: new Date(),
            type: event.type,
            severity: event.severity || 'info',
            user: event.user,
            action: event.action,
            resource: event.resource,
            outcome: event.outcome,
            details: event.details,
            ipAddress: event.ipAddress
        });
    }

    /**
     * Logs authentication event
     * @param {string} user - Username
     * @param {boolean} success - Success/failure
     * @param {Object} details - Additional details
     */
    logAuth(user, success, details = {}) {
        this.log({
            type: 'authentication',
            severity: success ? 'info' : 'warning',
            user,
            action: success ? 'login_success' : 'login_failure',
            outcome: success ? 'success' : 'failure',
            details
        });
    }

    /**
     * Logs authorization event
     * @param {string} user - Username
     * @param {string} resource - Resource accessed
     * @param {boolean} allowed - Allowed/denied
     */
    logAuthz(user, resource, allowed) {
        this.log({
            type: 'authorization',
            severity: allowed ? 'info' : 'warning',
            user,
            action: 'access_attempt',
            resource,
            outcome: allowed ? 'allowed' : 'denied'
        });
    }

    /**
     * Gets audit logs
     * @param {Object} filters - Filter criteria
     * @returns {Array} Filtered logs
     */
    getLogs(filters = {}) {
        return this.logs.filter(log => {
            if (filters.type && log.type !== filters.type) return false;
            if (filters.severity && log.severity !== filters.severity) return false;
            if (filters.user && log.user !== filters.user) return false;
            if (filters.since && new Date(log.timestamp) < new Date(filters.since)) return false;
            return true;
        });
    }

    /**
     * Gets security summary
     * @returns {Object} Summary
     */
    getSummary() {
        const byType = {};
        const bySeverity = {};
        const failedAuths = this.logs.filter(l =>
            l.type === 'authentication' && l.outcome === 'failure'
        );

        for (const log of this.logs) {
            byType[log.type] = (byType[log.type] || 0) + 1;
            bySeverity[log.severity] = (bySeverity[log.severity] || 0) + 1;
        }

        return {
            totalEvents: this.logs.length,
            byType,
            bySeverity,
            failedAuthAttempts: failedAuths.length,
            alertWorthy: bySeverity['warning'] || 0 + bySeverity['critical'] || 0
        };
    }
}

/**
 * PatchManager manages security patches.
 */
class PatchManager {
    constructor() {
        this.components = [];
        this.patches = [];
    }

    /**
     * Registers a component
     * @param {Object} component - Component details
     */
    registerComponent(component) {
        this.components.push({
            name: component.name,
            version: component.version,
            type: component.type,
            lastChecked: null,
            lastPatched: null
        });
    }

    /**
     * Checks for updates
     * @returns {Array} Available updates
     */
    checkForUpdates() {
        // Simulated update check
        return this.components.map(component => {
            const hasUpdate = Math.random() > 0.6;
            component.lastChecked = new Date();

            return {
                component: component.name,
                currentVersion: component.version,
                hasUpdate,
                latestVersion: hasUpdate ? this.incrementVersion(component.version) : component.version,
                severity: hasUpdate ? this.randomSeverity() : null
            };
        }).filter(u => u.hasUpdate);
    }

    /**
     * Applies a patch
     * @param {string} componentName - Component to patch
     * @param {string} newVersion - New version
     * @returns {Object} Patch result
     */
    applyPatch(componentName, newVersion) {
        const component = this.components.find(c => c.name === componentName);

        if (!component) {
            return { success: false, error: 'Component not found' };
        }

        const patch = {
            component: componentName,
            fromVersion: component.version,
            toVersion: newVersion,
            appliedAt: new Date(),
            success: true
        };

        component.version = newVersion;
        component.lastPatched = new Date();
        this.patches.push(patch);

        return patch;
    }

    /**
     * Gets patch status
     * @returns {Object} Status
     */
    getStatus() {
        const pendingUpdates = this.checkForUpdates();
        const criticalPending = pendingUpdates.filter(u => u.severity === 'critical');

        return {
            totalComponents: this.components.length,
            pendingUpdates: pendingUpdates.length,
            criticalPending: criticalPending.length,
            lastPatchDate: this.patches.length > 0
                ? this.patches[this.patches.length - 1].appliedAt
                : null,
            health: criticalPending.length > 0 ? 'at-risk' :
                pendingUpdates.length > 3 ? 'needs-attention' : 'healthy'
        };
    }

    /**
     * Increments version number
     * @param {string} version - Current version
     * @returns {string} New version
     */
    incrementVersion(version) {
        const parts = version.split('.').map(Number);
        parts[parts.length - 1]++;
        return parts.join('.');
    }

    /**
     * Gets random severity
     * @returns {string} Severity
     */
    randomSeverity() {
        const severities = ['low', 'medium', 'high', 'critical'];
        return severities[Math.floor(Math.random() * severities.length)];
    }
}

/**
 * MitigationAssessment evaluates security posture.
 */
class MitigationAssessment {
    /**
     * Assesses mitigation coverage
     * @param {Object} implemented - Implemented mitigations
     * @returns {Object} Assessment
     */
    static assess(implemented) {
        const categories = MitigationCategory.getAllCategories();
        const coverage = [];

        for (const category of categories) {
            const categoryKey = category.id;
            const isImplemented = implemented[categoryKey] === true;

            coverage.push({
                category: category.name,
                implemented: isImplemented,
                techniques: category.techniques,
                threats: category.prevents
            });
        }

        const implementedCount = coverage.filter(c => c.implemented).length;
        const score = (implementedCount / categories.length * 100).toFixed(0);

        return {
            coverage,
            score: score + '%',
            implementedCategories: implementedCount,
            totalCategories: categories.length,
            gaps: coverage.filter(c => !c.implemented).map(c => c.category),
            recommendation: implementedCount < categories.length
                ? `Implement missing categories: ${coverage.filter(c => !c.implemented).map(c => c.category).join(', ')}`
                : 'All mitigation categories implemented'
        };
    }
}

// Demonstration
console.log('=== Security Mitigations Demo ===\n');

// Mitigation categories
console.log('--- Mitigation Categories ---');
MitigationCategory.getAllCategories().slice(0, 3).forEach(cat => {
    console.log(`\n${cat.name}:`);
    console.log(`  ${cat.description}`);
    console.log(`  Techniques: ${cat.techniques.slice(0, 2).join(', ')}`);
    console.log(`  Prevents: ${cat.prevents.slice(0, 2).join(', ')}`);
});

// Input validation
console.log('\n--- Input Validation ---');
console.log('Email validation:', InputValidator.validateEmail('user@example.com'));
console.log('Invalid email:', InputValidator.validateEmail('invalid'));
console.log('HTML escaping:', InputValidator.escapeHtml('<script>alert(1)</script>'));

// Access control
console.log('\n--- Access Control ---');
const acm = new AccessControlManager();

acm.defineRole('admin', ['read', 'write', 'delete', 'admin']);
acm.defineRole('editor', ['read', 'write']);
acm.defineRole('viewer', ['read']);

acm.assignRole('user1', 'admin');
acm.assignRole('user2', 'editor');

console.log('Admin permissions:', acm.checkPermission('user1', 'delete'));
console.log('Editor permissions:', acm.checkPermission('user2', 'delete'));
console.log('User permissions:', acm.getUserPermissions('user1'));

// Security audit logging
console.log('\n--- Security Audit Logging ---');
const logger = new SecurityAuditLogger();

logger.logAuth('alice', true, { method: 'password' });
logger.logAuth('bob', false, { reason: 'invalid_password' });
logger.logAuthz('alice', '/admin/users', true);
logger.logAuthz('bob', '/admin/users', false);

console.log('Audit Summary:', logger.getSummary());

// Patch management
console.log('\n--- Patch Management ---');
const patchManager = new PatchManager();

patchManager.registerComponent({ name: 'nodejs', version: '18.0.0', type: 'runtime' });
patchManager.registerComponent({ name: 'express', version: '4.18.0', type: 'framework' });
patchManager.registerComponent({ name: 'openssl', version: '3.0.0', type: 'library' });

console.log('Patch Status:', patchManager.getStatus());

// Mitigation assessment
console.log('\n--- Mitigation Assessment ---');
const assessment = MitigationAssessment.assess({
    inputValidation: true,
    encryption: true,
    accessControl: true,
    auditing: false,
    patching: true,
    attackSurface: false
});

console.log('Assessment:', assessment);

/**
 * Best Practices for Security Mitigations:
 *
 * 1. Validate all input at trust boundaries
 * 2. Use parameterized queries for databases
 * 3. Encrypt sensitive data at rest and in transit
 * 4. Implement strong authentication and authorization
 * 5. Apply principle of least privilege
 * 6. Log security-relevant events
 * 7. Keep systems patched and updated
 * 8. Minimize attack surface
 * 9. Implement defense in depth
 * 10. Regularly assess and test mitigations
 */
