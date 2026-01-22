/**
 * Digital Certificate - Identity Verification in Secure Communications
 *
 * A digital certificate (public key certificate or identity certificate)
 * verifies the identity of a person, organization, or device in a secure
 * network. It confirms ownership of a public key with a digital signature
 * from a trusted Certificate Authority (CA).
 *
 * Key Concepts:
 * - Public Key Cryptography: Two keys for encryption/decryption
 * - Certificate Authority: Trusted third party that issues certificates
 * - Certificate Validation: Verifying certificate authenticity
 * - Certificate Types: DV, OV, EV (varying validation levels)
 */

/**
 * DigitalCertificate represents an X.509 digital certificate.
 * Contains identity information, public key, and CA signature.
 */
class DigitalCertificate {
    constructor(options) {
        this.version = options.version || 3;
        this.serialNumber = options.serialNumber || this.generateSerialNumber();
        this.subject = options.subject; // Distinguished Name
        this.issuer = options.issuer;   // CA Distinguished Name
        this.publicKey = options.publicKey;
        this.validFrom = options.validFrom || new Date();
        this.validTo = options.validTo || this.calculateDefaultExpiry();
        this.signature = null;
        this.signatureAlgorithm = options.signatureAlgorithm || 'SHA256withRSA';
        this.extensions = options.extensions || {};
        this.type = options.type || 'DV'; // DV, OV, or EV
    }

    /**
     * Generates a unique serial number
     * @returns {string} Hexadecimal serial number
     */
    generateSerialNumber() {
        const bytes = Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 256)
        );
        return bytes.map(b => b.toString(16).padStart(2, '0')).join(':');
    }

    /**
     * Calculates default expiry (1 year from now)
     * @returns {Date} Expiry date
     */
    calculateDefaultExpiry() {
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        return expiry;
    }

    /**
     * Checks if certificate is currently valid (time-wise)
     * @returns {boolean} True if within validity period
     */
    isWithinValidityPeriod() {
        const now = new Date();
        return now >= this.validFrom && now <= this.validTo;
    }

    /**
     * Gets days until expiration
     * @returns {number} Days remaining
     */
    getDaysUntilExpiry() {
        const now = new Date();
        const diff = this.validTo - now;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    /**
     * Gets certificate type description
     * @returns {string} Certificate type description
     */
    getTypeDescription() {
        const types = {
            DV: 'Domain Validation - Verifies domain ownership only',
            OV: 'Organization Validation - Verifies organization identity',
            EV: 'Extended Validation - Highest level of validation'
        };
        return types[this.type] || 'Unknown type';
    }

    /**
     * Converts to PEM format (simulated)
     * @returns {string} PEM-encoded certificate
     */
    toPEM() {
        const certData = JSON.stringify({
            version: this.version,
            serialNumber: this.serialNumber,
            subject: this.subject,
            issuer: this.issuer,
            validFrom: this.validFrom.toISOString(),
            validTo: this.validTo.toISOString()
        });

        const base64 = Buffer.from(certData).toString('base64');
        const wrapped = base64.match(/.{1,64}/g).join('\n');

        return `-----BEGIN CERTIFICATE-----\n${wrapped}\n-----END CERTIFICATE-----`;
    }

    /**
     * Gets certificate summary
     * @returns {Object} Certificate summary
     */
    getSummary() {
        return {
            serialNumber: this.serialNumber,
            subject: this.subject,
            issuer: this.issuer,
            type: this.type,
            validFrom: this.validFrom.toISOString(),
            validTo: this.validTo.toISOString(),
            daysUntilExpiry: this.getDaysUntilExpiry(),
            isValid: this.isWithinValidityPeriod(),
            signatureAlgorithm: this.signatureAlgorithm
        };
    }
}

/**
 * CertificateSigningRequest (CSR) for requesting a certificate from a CA.
 * Contains the public key and identity information.
 */
class CertificateSigningRequest {
    constructor(options) {
        this.subject = options.subject;
        this.publicKey = options.publicKey;
        this.attributes = options.attributes || {};
        this.signature = null;
    }

    /**
     * Creates a CSR for a domain
     * @param {string} domain - Domain name
     * @param {string} organization - Organization name
     * @param {Object} keyPair - Key pair for signing
     * @returns {CertificateSigningRequest} New CSR
     */
    static forDomain(domain, organization, keyPair) {
        return new CertificateSigningRequest({
            subject: {
                commonName: domain,
                organization: organization,
                country: 'US'
            },
            publicKey: keyPair.publicKey,
            attributes: {
                subjectAltNames: [domain, `www.${domain}`]
            }
        });
    }

    /**
     * Converts to PEM format (simulated)
     * @returns {string} PEM-encoded CSR
     */
    toPEM() {
        const csrData = JSON.stringify({
            subject: this.subject,
            attributes: this.attributes
        });

        const base64 = Buffer.from(csrData).toString('base64');
        return `-----BEGIN CERTIFICATE REQUEST-----\n${base64}\n-----END CERTIFICATE REQUEST-----`;
    }
}

/**
 * CertificateChainValidator validates certificate trust chains.
 * Verifies certificates against trusted root CAs.
 */
class CertificateChainValidator {
    constructor() {
        this.trustedRoots = new Map();
        this.revocationLists = new Map();
    }

    /**
     * Adds a trusted root certificate
     * @param {DigitalCertificate} cert - Root certificate
     */
    addTrustedRoot(cert) {
        const key = `${cert.subject.organization}:${cert.subject.commonName}`;
        this.trustedRoots.set(key, cert);
    }

    /**
     * Adds a Certificate Revocation List
     * @param {string} issuer - Issuer identifier
     * @param {Array<string>} revokedSerials - Revoked serial numbers
     */
    addCRL(issuer, revokedSerials) {
        this.revocationLists.set(issuer, new Set(revokedSerials));
    }

    /**
     * Validates a certificate chain
     * @param {Array<DigitalCertificate>} chain - Certificate chain (leaf to root)
     * @returns {Object} Validation result
     */
    validate(chain) {
        console.log('\nValidating certificate chain...');

        const errors = [];
        const warnings = [];

        if (chain.length === 0) {
            return { valid: false, errors: ['Empty certificate chain'] };
        }

        // Validate each certificate in chain
        for (let i = 0; i < chain.length; i++) {
            const cert = chain[i];
            const issuerCert = chain[i + 1] || this.findTrustedRoot(cert.issuer);

            // Check validity period
            if (!cert.isWithinValidityPeriod()) {
                errors.push(`Certificate ${cert.serialNumber} is outside validity period`);
            }

            // Check expiry warning
            if (cert.getDaysUntilExpiry() < 30) {
                warnings.push(`Certificate ${cert.serialNumber} expires in ${cert.getDaysUntilExpiry()} days`);
            }

            // Check revocation status
            if (this.isRevoked(cert)) {
                errors.push(`Certificate ${cert.serialNumber} has been revoked`);
            }

            // Verify issuer exists (except for self-signed root)
            if (!issuerCert && i < chain.length - 1) {
                errors.push(`Cannot find issuer for certificate ${cert.serialNumber}`);
            }

            // Verify signature (simulated)
            if (issuerCert && !this.verifySignature(cert, issuerCert)) {
                errors.push(`Signature verification failed for ${cert.serialNumber}`);
            }
        }

        // Check root is trusted
        const rootCert = chain[chain.length - 1];
        if (!this.isTrustedRoot(rootCert)) {
            errors.push('Root certificate is not trusted');
        }

        const valid = errors.length === 0;
        console.log(`  Chain validation: ${valid ? 'PASSED' : 'FAILED'}`);

        return {
            valid,
            errors,
            warnings,
            chainLength: chain.length
        };
    }

    /**
     * Finds a trusted root certificate by issuer
     * @param {Object} issuer - Issuer distinguished name
     * @returns {DigitalCertificate|null} Trusted root or null
     */
    findTrustedRoot(issuer) {
        const key = `${issuer.organization}:${issuer.commonName}`;
        return this.trustedRoots.get(key) || null;
    }

    /**
     * Checks if certificate is a trusted root
     * @param {DigitalCertificate} cert - Certificate to check
     * @returns {boolean} True if trusted root
     */
    isTrustedRoot(cert) {
        const key = `${cert.subject.organization}:${cert.subject.commonName}`;
        return this.trustedRoots.has(key);
    }

    /**
     * Checks if certificate is revoked
     * @param {DigitalCertificate} cert - Certificate to check
     * @returns {boolean} True if revoked
     */
    isRevoked(cert) {
        const issuerKey = `${cert.issuer.organization}:${cert.issuer.commonName}`;
        const crl = this.revocationLists.get(issuerKey);
        return crl ? crl.has(cert.serialNumber) : false;
    }

    /**
     * Verifies certificate signature (simulated)
     * @param {DigitalCertificate} cert - Certificate to verify
     * @param {DigitalCertificate} issuer - Issuer certificate
     * @returns {boolean} True if signature valid
     */
    verifySignature(cert, issuer) {
        // Simulated signature verification
        return cert.signature !== null && issuer.publicKey !== null;
    }
}

/**
 * CertificateStore manages certificate storage and retrieval.
 * Provides secure certificate storage with expiry monitoring.
 */
class CertificateStore {
    constructor() {
        this.certificates = new Map();
        this.privateKeys = new Map();
    }

    /**
     * Stores a certificate
     * @param {string} alias - Certificate alias
     * @param {DigitalCertificate} cert - Certificate to store
     * @param {string} privateKey - Associated private key (optional)
     */
    store(alias, cert, privateKey = null) {
        this.certificates.set(alias, cert);
        if (privateKey) {
            this.privateKeys.set(alias, privateKey);
        }
        console.log(`Stored certificate: ${alias}`);
    }

    /**
     * Retrieves a certificate by alias
     * @param {string} alias - Certificate alias
     * @returns {DigitalCertificate|null} Certificate or null
     */
    get(alias) {
        return this.certificates.get(alias) || null;
    }

    /**
     * Lists all certificates
     * @returns {Array} Certificate summaries
     */
    list() {
        const certs = [];
        for (const [alias, cert] of this.certificates) {
            certs.push({
                alias,
                ...cert.getSummary()
            });
        }
        return certs;
    }

    /**
     * Finds certificates expiring soon
     * @param {number} days - Days threshold
     * @returns {Array} Expiring certificates
     */
    findExpiringSoon(days = 30) {
        const expiring = [];
        for (const [alias, cert] of this.certificates) {
            if (cert.getDaysUntilExpiry() <= days) {
                expiring.push({
                    alias,
                    subject: cert.subject,
                    daysUntilExpiry: cert.getDaysUntilExpiry()
                });
            }
        }
        return expiring.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
    }

    /**
     * Removes a certificate
     * @param {string} alias - Certificate alias
     * @returns {boolean} True if removed
     */
    remove(alias) {
        this.privateKeys.delete(alias);
        return this.certificates.delete(alias);
    }
}

/**
 * CertificateTestSuite provides tests for certificate operations.
 * Validates certificate handling in applications.
 */
class CertificateTestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    /**
     * Adds a test case
     * @param {string} name - Test name
     * @param {Function} testFn - Test function
     */
    addTest(name, testFn) {
        this.tests.push({ name, testFn });
    }

    /**
     * Runs all tests
     * @returns {Object} Test results
     */
    async run() {
        console.log('\nRunning certificate tests...');

        for (const test of this.tests) {
            try {
                await test.testFn();
                this.results.push({ name: test.name, passed: true });
                console.log(`  ✓ ${test.name}`);
            } catch (error) {
                this.results.push({ name: test.name, passed: false, error: error.message });
                console.log(`  ✗ ${test.name}: ${error.message}`);
            }
        }

        const passed = this.results.filter(r => r.passed).length;
        return {
            total: this.results.length,
            passed,
            failed: this.results.length - passed,
            results: this.results
        };
    }
}

// Demonstration
console.log('=== Digital Certificate Demo ===');

// Create a root CA certificate
const rootCA = new DigitalCertificate({
    subject: { commonName: 'Test Root CA', organization: 'Test CA Org' },
    issuer: { commonName: 'Test Root CA', organization: 'Test CA Org' },
    publicKey: 'ROOT_PUBLIC_KEY_xxxxx',
    type: 'EV',
    extensions: {
        basicConstraints: { isCA: true },
        keyUsage: ['keyCertSign', 'cRLSign']
    }
});
rootCA.signature = 'ROOT_SIGNATURE_xxxxx';

console.log('\nRoot CA Certificate:');
console.log(JSON.stringify(rootCA.getSummary(), null, 2));

// Create an end-entity certificate
const serverCert = new DigitalCertificate({
    subject: { commonName: 'www.example.com', organization: 'Example Inc' },
    issuer: { commonName: 'Test Root CA', organization: 'Test CA Org' },
    publicKey: 'SERVER_PUBLIC_KEY_xxxxx',
    type: 'DV',
    extensions: {
        subjectAltName: ['www.example.com', 'example.com']
    }
});
serverCert.signature = 'SERVER_SIGNATURE_xxxxx';

console.log('\nServer Certificate:');
console.log(`  Type: ${serverCert.getTypeDescription()}`);
console.log(`  Days until expiry: ${serverCert.getDaysUntilExpiry()}`);

// Certificate chain validation
console.log('\n--- Certificate Chain Validation ---');
const validator = new CertificateChainValidator();
validator.addTrustedRoot(rootCA);

const validationResult = validator.validate([serverCert, rootCA]);
console.log(`Validation result: ${validationResult.valid ? 'VALID' : 'INVALID'}`);
if (validationResult.warnings.length > 0) {
    console.log('Warnings:', validationResult.warnings);
}

// Certificate store
console.log('\n--- Certificate Store ---');
const store = new CertificateStore();
store.store('root-ca', rootCA);
store.store('server', serverCert);

console.log('Stored certificates:');
store.list().forEach(c => {
    console.log(`  ${c.alias}: ${c.subject.commonName} (expires: ${c.daysUntilExpiry} days)`);
});

// Create CSR
console.log('\n--- Certificate Signing Request ---');
const csr = CertificateSigningRequest.forDomain(
    'newsite.example.com',
    'Example Inc',
    { publicKey: 'NEW_PUBLIC_KEY_xxxxx' }
);
console.log('CSR Subject:', csr.subject);

/**
 * Best Practices for Digital Certificates:
 *
 * 1. Use strong key sizes (RSA 2048+ or ECC 256+)
 * 2. Implement certificate expiry monitoring and alerts
 * 3. Keep private keys secure and encrypted
 * 4. Use certificate pinning for mobile apps
 * 5. Regularly rotate certificates before expiration
 * 6. Validate entire certificate chain, not just leaf
 * 7. Check Certificate Revocation Lists (CRL) or OCSP
 * 8. Use appropriate certificate types (DV, OV, EV)
 * 9. Automate certificate renewal with tools like certbot
 * 10. Test certificate handling in your applications
 */
