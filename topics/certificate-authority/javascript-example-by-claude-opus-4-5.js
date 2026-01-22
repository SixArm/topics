/**
 * Certificate Authority (CA) - Digital Certificate Management
 *
 * A Certificate Authority issues digital certificates to verify the identity
 * of individuals, devices, or services on a network. Digital certificates
 * provide authentication, encryption, and integrity of electronic communications.
 *
 * Key Concepts:
 * - Digital Certificates: Contain public key, identity info, and CA signature
 * - Certificate Signing: CA verifies identity and signs certificates
 * - Certificate Revocation: Invalidating compromised or expired certificates
 * - Trust Chain: Hierarchical trust from root CA to end-entity certificates
 */

/**
 * Certificate represents a digital certificate with its key properties.
 * Models the structure and validation of X.509 certificates.
 */
class Certificate {
    constructor(options) {
        this.serialNumber = options.serialNumber || this.generateSerialNumber();
        this.subject = options.subject;
        this.issuer = options.issuer;
        this.publicKey = options.publicKey;
        this.validFrom = options.validFrom || new Date();
        this.validTo = options.validTo || this.calculateExpiry();
        this.signature = options.signature || null;
        this.extensions = options.extensions || {};
    }

    /**
     * Generates a unique serial number for the certificate
     * @returns {string} Hexadecimal serial number
     */
    generateSerialNumber() {
        return Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        ).join(':');
    }

    /**
     * Calculates default expiry date (1 year from now)
     * @returns {Date} Expiry date
     */
    calculateExpiry() {
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        return expiry;
    }

    /**
     * Checks if the certificate is currently valid
     * @returns {boolean} True if certificate is within validity period
     */
    isValid() {
        const now = new Date();
        return now >= this.validFrom && now <= this.validTo;
    }

    /**
     * Returns certificate details in a readable format
     * @returns {Object} Certificate summary
     */
    getSummary() {
        return {
            serialNumber: this.serialNumber,
            subject: this.subject,
            issuer: this.issuer,
            validFrom: this.validFrom.toISOString(),
            validTo: this.validTo.toISOString(),
            isValid: this.isValid(),
            hasSignature: this.signature !== null
        };
    }
}

/**
 * CertificateAuthority manages certificate issuance, validation, and revocation.
 * Implements core CA functionality for testing and demonstration purposes.
 */
class CertificateAuthority {
    constructor(name) {
        this.name = name;
        this.issuedCertificates = new Map();
        this.revocationList = new Set();
        this.privateKey = this.generatePrivateKey();
        this.rootCertificate = this.createRootCertificate();
    }

    /**
     * Generates a simulated private key for signing
     * @returns {string} Simulated private key
     */
    generatePrivateKey() {
        return `PRIVATE_KEY_${this.generateRandomString(32)}`;
    }

    /**
     * Generates a random string for simulation
     * @param {number} length - Length of string
     * @returns {string} Random string
     */
    generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    /**
     * Creates the root certificate for this CA
     * @returns {Certificate} Root certificate
     */
    createRootCertificate() {
        const rootCert = new Certificate({
            subject: { CN: this.name, O: 'Certificate Authority' },
            issuer: { CN: this.name, O: 'Certificate Authority' },
            publicKey: `PUBLIC_KEY_${this.generateRandomString(32)}`,
            extensions: {
                basicConstraints: { isCA: true },
                keyUsage: ['keyCertSign', 'cRLSign']
            }
        });
        rootCert.signature = this.sign(rootCert);
        return rootCert;
    }

    /**
     * Signs data using the CA's private key (simulated)
     * @param {Object} data - Data to sign
     * @returns {string} Signature
     */
    sign(data) {
        // Simulated signing - in reality, this would use cryptographic signing
        const dataString = JSON.stringify(data);
        return `SIGNATURE_${this.generateRandomString(64)}`;
    }

    /**
     * Verifies an applicant's identity (simulated)
     * @param {Object} applicant - Applicant information
     * @returns {boolean} True if identity verified
     */
    verifyIdentity(applicant) {
        // Simulated identity verification
        console.log(`Verifying identity for: ${applicant.commonName}`);

        // Check required fields
        if (!applicant.commonName || !applicant.organization) {
            console.log('  ✗ Missing required identity information');
            return false;
        }

        // Simulated domain validation for SSL certificates
        if (applicant.domain) {
            console.log(`  Validating domain ownership: ${applicant.domain}`);
        }

        console.log('  ✓ Identity verified successfully');
        return true;
    }

    /**
     * Issues a new certificate after identity verification
     * @param {Object} request - Certificate signing request
     * @returns {Certificate|null} Issued certificate or null if verification fails
     */
    issueCertificate(request) {
        console.log(`\nProcessing certificate request for: ${request.commonName}`);

        // Verify identity
        if (!this.verifyIdentity(request)) {
            console.log('Certificate issuance denied: identity verification failed');
            return null;
        }

        // Create certificate
        const certificate = new Certificate({
            subject: {
                CN: request.commonName,
                O: request.organization,
                OU: request.organizationalUnit || '',
                C: request.country || ''
            },
            issuer: { CN: this.name },
            publicKey: request.publicKey,
            validTo: request.validTo,
            extensions: request.extensions || {}
        });

        // Sign certificate
        certificate.signature = this.sign(certificate);

        // Store issued certificate
        this.issuedCertificates.set(certificate.serialNumber, certificate);

        console.log(`✓ Certificate issued: ${certificate.serialNumber}`);
        return certificate;
    }

    /**
     * Revokes a certificate by adding it to the revocation list
     * @param {string} serialNumber - Serial number of certificate to revoke
     * @param {string} reason - Reason for revocation
     * @returns {boolean} True if revocation successful
     */
    revokeCertificate(serialNumber, reason) {
        console.log(`\nRevoking certificate: ${serialNumber}`);
        console.log(`Reason: ${reason}`);

        if (!this.issuedCertificates.has(serialNumber)) {
            console.log('✗ Certificate not found');
            return false;
        }

        this.revocationList.add(serialNumber);
        console.log('✓ Certificate added to revocation list');
        return true;
    }

    /**
     * Checks if a certificate is revoked
     * @param {string} serialNumber - Serial number to check
     * @returns {boolean} True if certificate is revoked
     */
    isRevoked(serialNumber) {
        return this.revocationList.has(serialNumber);
    }

    /**
     * Returns the Certificate Revocation List (CRL)
     * @returns {Array} List of revoked certificate serial numbers
     */
    getCRL() {
        return {
            issuer: this.name,
            issuedAt: new Date().toISOString(),
            revokedCertificates: Array.from(this.revocationList)
        };
    }
}

/**
 * CertificateValidator validates certificates against a CA and CRL.
 * Used by applications to verify certificate authenticity and validity.
 */
class CertificateValidator {
    constructor(trustedCAs) {
        this.trustedCAs = trustedCAs;
    }

    /**
     * Validates a certificate against trusted CAs
     * @param {Certificate} certificate - Certificate to validate
     * @returns {Object} Validation result
     */
    validate(certificate) {
        console.log(`\nValidating certificate: ${certificate.subject.CN}`);
        const result = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // Check validity period
        if (!certificate.isValid()) {
            result.isValid = false;
            result.errors.push('Certificate is expired or not yet valid');
        }

        // Check signature
        if (!certificate.signature) {
            result.isValid = false;
            result.errors.push('Certificate is not signed');
        }

        // Check if issuer is trusted
        const issuerCA = this.trustedCAs.find(ca =>
            ca.name === certificate.issuer.CN
        );
        if (!issuerCA) {
            result.isValid = false;
            result.errors.push('Issuer is not a trusted CA');
        } else {
            // Check revocation status
            if (issuerCA.isRevoked(certificate.serialNumber)) {
                result.isValid = false;
                result.errors.push('Certificate has been revoked');
            }
        }

        // Log results
        if (result.isValid) {
            console.log('✓ Certificate is valid');
        } else {
            console.log('✗ Certificate validation failed:');
            result.errors.forEach(err => console.log(`  - ${err}`));
        }

        return result;
    }
}

/**
 * CertificateTestSuite provides automated tests for certificate operations.
 * Useful for testing certificate-dependent applications.
 */
class CertificateTestSuite {
    constructor() {
        this.testResults = [];
    }

    /**
     * Runs a test case and records the result
     * @param {string} name - Test name
     * @param {Function} testFn - Test function
     */
    async runTest(name, testFn) {
        console.log(`\nRunning test: ${name}`);
        try {
            await testFn();
            this.testResults.push({ name, passed: true });
            console.log(`✓ PASSED: ${name}`);
        } catch (error) {
            this.testResults.push({ name, passed: false, error: error.message });
            console.log(`✗ FAILED: ${name} - ${error.message}`);
        }
    }

    /**
     * Gets summary of all test results
     * @returns {Object} Test summary
     */
    getSummary() {
        const passed = this.testResults.filter(t => t.passed).length;
        const failed = this.testResults.filter(t => !t.passed).length;
        return {
            total: this.testResults.length,
            passed,
            failed,
            passRate: `${((passed / this.testResults.length) * 100).toFixed(1)}%`
        };
    }
}

// Demonstration
console.log('=== Certificate Authority Demo ===\n');

// Create a Certificate Authority
const ca = new CertificateAuthority('Test Root CA');
console.log('Created Certificate Authority:', ca.name);
console.log('Root Certificate:', ca.rootCertificate.getSummary());

// Issue a certificate
const certRequest = {
    commonName: 'www.example.com',
    organization: 'Example Corp',
    organizationalUnit: 'IT Department',
    country: 'US',
    domain: 'example.com',
    publicKey: 'PUBLIC_KEY_abc123xyz789',
    extensions: {
        subjectAltName: ['www.example.com', 'example.com']
    }
};

const issuedCert = ca.issueCertificate(certRequest);
console.log('\nIssued Certificate:', issuedCert.getSummary());

// Validate the certificate
const validator = new CertificateValidator([ca]);
validator.validate(issuedCert);

// Revoke the certificate
ca.revokeCertificate(issuedCert.serialNumber, 'Key compromise suspected');

// Re-validate after revocation
console.log('\n--- Validating revoked certificate ---');
validator.validate(issuedCert);

// Show CRL
console.log('\nCertificate Revocation List:', ca.getCRL());

/**
 * Best Practices for Certificate Authority Testing:
 *
 * 1. Test certificate issuance with valid and invalid identity information
 * 2. Verify certificate validation catches expired certificates
 * 3. Test revocation list functionality and propagation
 * 4. Validate trust chain verification from root to end-entity
 * 5. Test certificate renewal processes
 * 6. Verify proper handling of certificate encoding formats (PEM, DER)
 * 7. Test cross-signed and intermediate certificate scenarios
 * 8. Validate Subject Alternative Name (SAN) handling
 * 9. Test certificate pinning implementations
 * 10. Verify secure storage of private keys
 */
