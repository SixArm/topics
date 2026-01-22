/**
 * Secure Sockets Layer (SSL) - Cryptographic Protocol for Secure Communication
 *
 * Secure Sockets Layer (SSL) is a cryptographic protocol designed to provide
 * secure communication over the Internet. SSL provides a secure channel between
 * two communicating endpoints, typically a client and server. SSL has been
 * superseded by TLS (Transport Layer Security), though "SSL" is still commonly
 * used to refer to both protocols.
 *
 * Key Concepts:
 * - Encryption of data in transit
 * - Authentication via certificates
 * - Handshake protocol for key exchange
 * - Protection against interception and tampering
 */

/**
 * SSLHandshake demonstrates the SSL/TLS handshake process.
 */
class SSLHandshake {
    constructor() {
        this.steps = [];
        this.state = 'initial';
        this.clientRandom = null;
        this.serverRandom = null;
        this.sessionKey = null;
    }

    /**
     * Simulates client hello
     * @param {Object} params - Client parameters
     * @returns {Object} Client hello message
     */
    clientHello(params) {
        this.clientRandom = this.generateRandom();
        this.state = 'client_hello_sent';

        const hello = {
            type: 'ClientHello',
            version: params.version || 'TLS 1.3',
            random: this.clientRandom,
            cipherSuites: params.cipherSuites || [
                'TLS_AES_256_GCM_SHA384',
                'TLS_AES_128_GCM_SHA256',
                'TLS_CHACHA20_POLY1305_SHA256'
            ],
            extensions: params.extensions || ['server_name', 'signature_algorithms']
        };

        this.steps.push({ direction: 'client->server', message: hello });
        return hello;
    }

    /**
     * Simulates server hello
     * @param {Object} params - Server parameters
     * @returns {Object} Server hello message
     */
    serverHello(params) {
        this.serverRandom = this.generateRandom();
        this.state = 'server_hello_sent';

        const hello = {
            type: 'ServerHello',
            version: 'TLS 1.3',
            random: this.serverRandom,
            selectedCipher: params.selectedCipher || 'TLS_AES_256_GCM_SHA384',
            sessionId: this.generateSessionId()
        };

        this.steps.push({ direction: 'server->client', message: hello });
        return hello;
    }

    /**
     * Simulates certificate exchange
     * @param {Object} cert - Certificate details
     * @returns {Object} Certificate message
     */
    sendCertificate(cert) {
        const certMessage = {
            type: 'Certificate',
            subject: cert.subject,
            issuer: cert.issuer,
            validFrom: cert.validFrom,
            validTo: cert.validTo,
            publicKey: cert.publicKey || this.generatePublicKey(),
            signatureAlgorithm: 'SHA256withRSA'
        };

        this.steps.push({ direction: 'server->client', message: certMessage });
        return certMessage;
    }

    /**
     * Simulates key exchange
     * @returns {Object} Key exchange result
     */
    keyExchange() {
        this.sessionKey = this.generateSessionKey();
        this.state = 'keys_exchanged';

        const exchange = {
            type: 'KeyExchange',
            method: 'ECDHE',
            curve: 'X25519',
            publicKey: this.generatePublicKey(),
            derivedKeyLength: 256
        };

        this.steps.push({ direction: 'bidirectional', message: exchange });
        return exchange;
    }

    /**
     * Completes the handshake
     * @returns {Object} Handshake summary
     */
    finish() {
        this.state = 'established';

        return {
            status: 'completed',
            sessionEstablished: true,
            cipher: 'TLS_AES_256_GCM_SHA384',
            protocol: 'TLS 1.3',
            steps: this.steps,
            totalRoundTrips: 1, // TLS 1.3 uses 1-RTT
            sessionKeyDerived: !!this.sessionKey
        };
    }

    /**
     * Generates random bytes (simulated)
     * @returns {string} Random hex string
     */
    generateRandom() {
        return Array.from({ length: 32 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }

    /**
     * Generates session ID
     * @returns {string} Session ID
     */
    generateSessionId() {
        return 'SID-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Generates public key (simulated)
     * @returns {string} Public key
     */
    generatePublicKey() {
        return 'PK-' + this.generateRandom().substr(0, 20);
    }

    /**
     * Generates session key (simulated)
     * @returns {string} Session key
     */
    generateSessionKey() {
        return 'SK-' + this.generateRandom();
    }
}

/**
 * Certificate represents an SSL/TLS certificate.
 */
class Certificate {
    constructor(options) {
        this.subject = options.subject;
        this.issuer = options.issuer;
        this.serialNumber = options.serialNumber || this.generateSerial();
        this.validFrom = options.validFrom || new Date();
        this.validTo = options.validTo || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        this.publicKey = options.publicKey;
        this.signatureAlgorithm = options.signatureAlgorithm || 'SHA256withRSA';
        this.keyUsage = options.keyUsage || ['digitalSignature', 'keyEncipherment'];
        this.subjectAltNames = options.subjectAltNames || [];
    }

    /**
     * Validates the certificate
     * @returns {Object} Validation result
     */
    validate() {
        const now = new Date();
        const issues = [];

        // Check validity period
        if (now < this.validFrom) {
            issues.push('Certificate not yet valid');
        }
        if (now > this.validTo) {
            issues.push('Certificate has expired');
        }

        // Check for weak algorithms
        if (this.signatureAlgorithm.includes('SHA1') || this.signatureAlgorithm.includes('MD5')) {
            issues.push('Uses weak signature algorithm');
        }

        // Check key usage
        if (!this.keyUsage.includes('digitalSignature')) {
            issues.push('Missing digitalSignature key usage');
        }

        const daysUntilExpiry = Math.floor((this.validTo - now) / (24 * 60 * 60 * 1000));

        return {
            valid: issues.length === 0,
            issues,
            expiresIn: daysUntilExpiry + ' days',
            needsRenewal: daysUntilExpiry < 30,
            subject: this.subject,
            issuer: this.issuer
        };
    }

    /**
     * Gets certificate chain info
     * @returns {Object} Chain info
     */
    getChainInfo() {
        return {
            endEntity: this.subject,
            issuer: this.issuer,
            isSelfSigned: this.subject === this.issuer,
            recommendation: this.subject === this.issuer
                ? 'Self-signed certificate - not trusted by browsers'
                : 'Certificate issued by CA - verify CA is trusted'
        };
    }

    /**
     * Generates serial number
     * @returns {string} Serial number
     */
    generateSerial() {
        return Array.from({ length: 20 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join(':').toUpperCase();
    }
}

/**
 * CipherSuite represents encryption cipher configurations.
 */
class CipherSuite {
    static suites = {
        'TLS_AES_256_GCM_SHA384': {
            name: 'TLS_AES_256_GCM_SHA384',
            keyExchange: 'N/A (TLS 1.3)',
            authentication: 'Certificate',
            encryption: 'AES-256-GCM',
            mac: 'AEAD',
            strength: 'strong',
            tlsVersion: '1.3'
        },
        'TLS_AES_128_GCM_SHA256': {
            name: 'TLS_AES_128_GCM_SHA256',
            keyExchange: 'N/A (TLS 1.3)',
            authentication: 'Certificate',
            encryption: 'AES-128-GCM',
            mac: 'AEAD',
            strength: 'strong',
            tlsVersion: '1.3'
        },
        'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384': {
            name: 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
            keyExchange: 'ECDHE',
            authentication: 'RSA',
            encryption: 'AES-256-GCM',
            mac: 'AEAD',
            strength: 'strong',
            tlsVersion: '1.2'
        },
        'TLS_RSA_WITH_AES_128_CBC_SHA': {
            name: 'TLS_RSA_WITH_AES_128_CBC_SHA',
            keyExchange: 'RSA',
            authentication: 'RSA',
            encryption: 'AES-128-CBC',
            mac: 'SHA',
            strength: 'weak',
            tlsVersion: '1.2',
            warnings: ['No forward secrecy', 'CBC mode vulnerable to attacks']
        }
    };

    /**
     * Gets suite by name
     * @param {string} name - Suite name
     * @returns {Object} Suite details
     */
    static getSuite(name) {
        return this.suites[name];
    }

    /**
     * Gets recommended suites
     * @returns {Array} Recommended suites
     */
    static getRecommended() {
        return Object.values(this.suites)
            .filter(s => s.strength === 'strong')
            .map(s => s.name);
    }

    /**
     * Evaluates a suite list
     * @param {Array} suites - List of cipher suites
     * @returns {Object} Evaluation
     */
    static evaluate(suites) {
        const analysis = suites.map(name => {
            const suite = this.suites[name];
            return {
                name,
                known: !!suite,
                strength: suite?.strength || 'unknown',
                warnings: suite?.warnings || []
            };
        });

        const weak = analysis.filter(s => s.strength === 'weak');
        const hasForwardSecrecy = analysis.some(s =>
            this.suites[s.name]?.keyExchange?.includes('DHE')
        );

        return {
            suites: analysis,
            weakCount: weak.length,
            hasForwardSecrecy,
            recommendation: weak.length > 0
                ? 'Remove weak cipher suites'
                : 'Cipher configuration looks good'
        };
    }
}

/**
 * SSLTester provides SSL/TLS testing utilities.
 */
class SSLTester {
    /**
     * Tests SSL configuration
     * @param {Object} config - SSL configuration
     * @returns {Object} Test results
     */
    static testConfiguration(config) {
        const results = {
            tests: [],
            score: 0,
            maxScore: 0
        };

        // Test 1: Protocol versions
        results.maxScore += 20;
        const protocolTest = {
            name: 'Protocol Versions',
            passed: true,
            issues: []
        };

        if (config.protocols?.includes('SSLv3')) {
            protocolTest.passed = false;
            protocolTest.issues.push('SSLv3 is vulnerable (POODLE)');
        }
        if (config.protocols?.includes('TLSv1.0')) {
            protocolTest.issues.push('TLS 1.0 is deprecated');
        }
        if (config.protocols?.includes('TLSv1.3')) {
            results.score += 20;
        } else if (config.protocols?.includes('TLSv1.2')) {
            results.score += 15;
        }

        results.tests.push(protocolTest);

        // Test 2: Cipher suites
        results.maxScore += 20;
        const cipherEval = CipherSuite.evaluate(config.cipherSuites || []);
        const cipherTest = {
            name: 'Cipher Suites',
            passed: cipherEval.weakCount === 0,
            issues: cipherEval.weakCount > 0 ? [`${cipherEval.weakCount} weak cipher(s)`] : []
        };

        if (cipherTest.passed) results.score += 20;
        results.tests.push(cipherTest);

        // Test 3: Certificate
        results.maxScore += 30;
        const certTest = {
            name: 'Certificate',
            passed: true,
            issues: []
        };

        if (config.certificate) {
            const cert = new Certificate(config.certificate);
            const validation = cert.validate();
            certTest.passed = validation.valid;
            certTest.issues = validation.issues;
            if (validation.valid) results.score += 30;
        } else {
            certTest.passed = false;
            certTest.issues.push('No certificate configured');
        }

        results.tests.push(certTest);

        // Test 4: Forward secrecy
        results.maxScore += 15;
        const fsTest = {
            name: 'Forward Secrecy',
            passed: cipherEval.hasForwardSecrecy,
            issues: cipherEval.hasForwardSecrecy ? [] : ['No forward secrecy support']
        };

        if (fsTest.passed) results.score += 15;
        results.tests.push(fsTest);

        // Test 5: HSTS
        results.maxScore += 15;
        const hstsTest = {
            name: 'HSTS',
            passed: config.hstsEnabled === true,
            issues: config.hstsEnabled ? [] : ['HSTS not enabled']
        };

        if (hstsTest.passed) results.score += 15;
        results.tests.push(hstsTest);

        // Calculate grade
        const percentage = (results.score / results.maxScore) * 100;
        results.grade = percentage >= 90 ? 'A' :
            percentage >= 80 ? 'B' :
                percentage >= 70 ? 'C' :
                    percentage >= 60 ? 'D' : 'F';

        return results;
    }

    /**
     * Gets security recommendations
     * @returns {Array} Recommendations
     */
    static getRecommendations() {
        return [
            {
                priority: 'critical',
                recommendation: 'Disable SSLv3 and TLS 1.0/1.1',
                reason: 'Vulnerable to known attacks'
            },
            {
                priority: 'high',
                recommendation: 'Enable TLS 1.3',
                reason: 'Best security and performance'
            },
            {
                priority: 'high',
                recommendation: 'Use only strong cipher suites',
                reason: 'Prevent cryptographic attacks'
            },
            {
                priority: 'medium',
                recommendation: 'Enable HSTS',
                reason: 'Prevent protocol downgrade attacks'
            },
            {
                priority: 'medium',
                recommendation: 'Use certificates with 2048+ bit keys',
                reason: 'Ensure sufficient key strength'
            },
            {
                priority: 'low',
                recommendation: 'Configure OCSP stapling',
                reason: 'Faster certificate validation'
            }
        ];
    }
}

// Demonstration
console.log('=== Secure Sockets Layer Demo ===\n');

// SSL Handshake
console.log('--- SSL/TLS Handshake ---');
const handshake = new SSLHandshake();

handshake.clientHello({
    version: 'TLS 1.3',
    cipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_AES_128_GCM_SHA256']
});

handshake.serverHello({
    selectedCipher: 'TLS_AES_256_GCM_SHA384'
});

handshake.sendCertificate({
    subject: 'CN=example.com',
    issuer: 'CN=Example CA',
    validFrom: new Date(),
    validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
});

handshake.keyExchange();
console.log('Handshake Result:', handshake.finish());

// Certificate validation
console.log('\n--- Certificate Validation ---');
const cert = new Certificate({
    subject: 'CN=example.com, O=Example Inc',
    issuer: 'CN=DigiCert SHA2 Extended Validation Server CA',
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-01-01'),
    subjectAltNames: ['example.com', 'www.example.com']
});

console.log('Certificate Validation:', cert.validate());
console.log('Chain Info:', cert.getChainInfo());

// Cipher suite analysis
console.log('\n--- Cipher Suite Analysis ---');
console.log('Recommended suites:', CipherSuite.getRecommended());
console.log('Suite evaluation:', CipherSuite.evaluate([
    'TLS_AES_256_GCM_SHA384',
    'TLS_RSA_WITH_AES_128_CBC_SHA'
]));

// SSL Configuration testing
console.log('\n--- SSL Configuration Test ---');
const testResults = SSLTester.testConfiguration({
    protocols: ['TLSv1.2', 'TLSv1.3'],
    cipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384'],
    certificate: {
        subject: 'CN=example.com',
        issuer: 'CN=Example CA',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    hstsEnabled: true
});

console.log('Test Results:', testResults);

// Recommendations
console.log('\n--- Security Recommendations ---');
SSLTester.getRecommendations().slice(0, 4).forEach(rec => {
    console.log(`[${rec.priority}] ${rec.recommendation}`);
});

/**
 * Best Practices for SSL/TLS:
 *
 * 1. Use TLS 1.2 or preferably TLS 1.3
 * 2. Disable SSLv3 and TLS 1.0/1.1
 * 3. Use only strong cipher suites with AEAD
 * 4. Ensure forward secrecy (ECDHE key exchange)
 * 5. Use certificates from trusted CAs
 * 6. Monitor certificate expiration dates
 * 7. Enable HTTP Strict Transport Security (HSTS)
 * 8. Configure OCSP stapling for performance
 * 9. Regularly test SSL configuration
 * 10. Keep SSL/TLS libraries updated
 */
