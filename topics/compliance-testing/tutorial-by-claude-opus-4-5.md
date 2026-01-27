# Compliance Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Compliance testing verifies that software adheres to specified standards, regulations, guidelines, or specifications. For test automation professionals, compliance testing ensures systems meet legal, industry, and organizational requirements—protecting both users and organizations from regulatory risk.

## What is Compliance Testing?

Compliance testing validates that software conforms to external requirements such as laws, regulations, standards, and contractual obligations. Unlike functional testing that verifies "does it work?", compliance testing verifies "does it meet required standards?"

### Types of Compliance

```
┌─────────────────────────────────────────────────────────────┐
│                    Compliance Categories                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Regulatory Compliance                                      │
│  └── GDPR, HIPAA, SOX, PCI-DSS, CCPA                       │
│                                                             │
│  Industry Standards                                         │
│  └── ISO 27001, SOC 2, NIST, OWASP                         │
│                                                             │
│  Accessibility Standards                                    │
│  └── WCAG, Section 508, ADA                                │
│                                                             │
│  Technical Standards                                        │
│  └── W3C, RFC, IEEE, API specifications                    │
│                                                             │
│  Internal Policies                                          │
│  └── Company security policies, coding standards           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Common Compliance Requirements

### GDPR (General Data Protection Regulation)

```python
class GDPRComplianceTests:
    """Test GDPR compliance requirements."""

    def test_data_access_request(self, api_client, test_user):
        """Users can request their personal data (Article 15)."""
        response = api_client.post('/api/gdpr/data-request', {
            'user_id': test_user.id,
            'type': 'access'
        })

        assert response.status_code == 200
        data = response.json()

        # Verify all personal data categories are included
        required_categories = [
            'personal_info', 'contact_info', 'usage_data',
            'preferences', 'communications'
        ]
        for category in required_categories:
            assert category in data, f"Missing data category: {category}"

    def test_right_to_erasure(self, api_client, test_user):
        """Users can request deletion of their data (Article 17)."""
        # Request deletion
        response = api_client.post('/api/gdpr/delete-request', {
            'user_id': test_user.id
        })
        assert response.status_code == 200

        # Verify data is deleted
        user_data = api_client.get(f'/api/users/{test_user.id}')
        assert user_data.status_code == 404

        # Verify data is anonymized in logs
        logs = get_user_logs(test_user.id)
        for log in logs:
            assert test_user.email not in str(log)

    def test_data_portability(self, api_client, test_user):
        """Users can export their data (Article 20)."""
        response = api_client.get('/api/gdpr/export', {
            'user_id': test_user.id,
            'format': 'json'
        })

        assert response.status_code == 200
        assert response.headers['Content-Type'] == 'application/json'

        data = response.json()
        assert 'personal_data' in data
        assert 'machine_readable' in data

    def test_consent_tracking(self, api_client, test_user):
        """Consent is properly tracked and can be withdrawn."""
        # Give consent
        response = api_client.post('/api/consent', {
            'user_id': test_user.id,
            'purpose': 'marketing',
            'granted': True
        })
        assert response.status_code == 200

        # Verify consent is recorded
        consent = api_client.get(f'/api/consent/{test_user.id}')
        assert consent.json()['marketing'] == True
        assert consent.json()['marketing_timestamp'] is not None

        # Withdraw consent
        response = api_client.post('/api/consent', {
            'user_id': test_user.id,
            'purpose': 'marketing',
            'granted': False
        })
        assert response.status_code == 200

        # Verify withdrawal
        consent = api_client.get(f'/api/consent/{test_user.id}')
        assert consent.json()['marketing'] == False

    def test_privacy_by_default(self, api_client):
        """New accounts have privacy-preserving defaults."""
        new_user = api_client.post('/api/users', {
            'email': 'new@example.com',
            'password': 'SecurePass123!'
        })

        settings = api_client.get(f'/api/users/{new_user.json()["id"]}/privacy')

        # Verify privacy defaults
        assert settings.json()['marketing_consent'] == False
        assert settings.json()['data_sharing'] == False
        assert settings.json()['public_profile'] == False
```

### HIPAA (Health Insurance Portability and Accountability Act)

```python
class HIPAAComplianceTests:
    """Test HIPAA compliance for healthcare data."""

    def test_phi_encryption_at_rest(self, database):
        """PHI is encrypted in database."""
        # Query raw database
        raw_data = database.execute_raw(
            "SELECT * FROM patient_records LIMIT 1"
        )

        # PHI fields should be encrypted
        phi_fields = ['ssn', 'medical_record', 'diagnosis']
        for field in phi_fields:
            assert is_encrypted(raw_data[field]), \
                f"PHI field '{field}' is not encrypted"

    def test_phi_encryption_in_transit(self, api_client):
        """API enforces TLS for PHI transmission."""
        # HTTP should be rejected
        http_response = requests.get(
            'http://api.example.com/patients',
            verify=False
        )
        assert http_response.status_code in [301, 302, 403]

        # HTTPS should work
        https_response = requests.get(
            'https://api.example.com/patients',
            headers={'Authorization': 'Bearer valid-token'}
        )
        assert https_response.status_code == 200

    def test_access_audit_logging(self, api_client, test_patient):
        """All PHI access is logged."""
        # Access patient record
        api_client.get(f'/api/patients/{test_patient.id}')

        # Verify audit log entry
        audit_logs = get_audit_logs(
            resource_type='patient',
            resource_id=test_patient.id
        )

        assert len(audit_logs) > 0
        latest_log = audit_logs[-1]
        assert latest_log['action'] == 'READ'
        assert latest_log['user_id'] is not None
        assert latest_log['timestamp'] is not None
        assert latest_log['ip_address'] is not None

    def test_minimum_necessary_access(self, api_client_nurse, test_patient):
        """Users only see PHI necessary for their role."""
        # Nurse should see limited patient data
        response = api_client_nurse.get(f'/api/patients/{test_patient.id}')
        data = response.json()

        # Should have access to care-related data
        assert 'current_medications' in data
        assert 'allergies' in data

        # Should NOT have access to billing/administrative
        assert 'ssn' not in data
        assert 'insurance_details' not in data
        assert 'billing_history' not in data

    def test_breach_notification_capability(self, api_client):
        """System can identify affected users in breach scenario."""
        # Simulate breach detection
        breach_report = api_client.post('/api/admin/breach-simulation', {
            'affected_records': ['patient_records'],
            'date_range': {'start': '2024-01-01', 'end': '2024-01-31'}
        })

        assert breach_report.status_code == 200
        data = breach_report.json()

        # Should identify affected individuals
        assert 'affected_users' in data
        assert 'notification_list' in data
        assert 'breach_scope' in data
```

### PCI-DSS (Payment Card Industry Data Security Standard)

```python
class PCIDSSComplianceTests:
    """Test PCI-DSS compliance for payment processing."""

    def test_card_data_not_stored(self, database):
        """Full card numbers are never stored."""
        # Search for card number patterns
        tables = database.get_all_tables()

        for table in tables:
            data = database.execute_raw(f"SELECT * FROM {table}")
            for row in data:
                for value in row.values():
                    if isinstance(value, str):
                        # Should not match full card number pattern
                        assert not re.match(r'\d{15,16}', value), \
                            f"Potential card number found in {table}"

    def test_cvv_never_stored(self, database):
        """CVV/CVC is never stored."""
        # CVV should not appear in any field
        schema = database.get_schema()

        cvv_patterns = ['cvv', 'cvc', 'security_code', 'card_code']
        for table, columns in schema.items():
            for column in columns:
                assert not any(p in column.lower() for p in cvv_patterns), \
                    f"Potential CVV storage field: {table}.{column}"

    def test_card_masking(self, api_client, test_user):
        """Stored cards show only last 4 digits."""
        # Add card
        api_client.post('/api/payment-methods', {
            'user_id': test_user.id,
            'card_number': '4111111111111111',
            'expiry': '12/25',
            'cvv': '123'
        })

        # Retrieve cards
        response = api_client.get(f'/api/payment-methods/{test_user.id}')
        card = response.json()['cards'][0]

        # Should only show last 4
        assert card['display_number'] == '****1111'
        assert 'card_number' not in card
        assert 'cvv' not in card

    def test_encryption_key_management(self, config):
        """Encryption keys are properly managed."""
        # Keys should not be in code or config files
        assert 'encryption_key' not in config
        assert 'private_key' not in config

        # Should use key management service
        key_info = get_encryption_key_info()
        assert key_info['source'] == 'HSM' or key_info['source'] == 'KMS'
        assert key_info['rotation_enabled'] == True

    def test_secure_transmission(self, api_client):
        """Payment data transmitted securely."""
        # Intercept outgoing payment request
        with capture_network_traffic() as traffic:
            api_client.post('/api/payments', {
                'amount': 100,
                'card_token': 'tok_test123'
            })

        # Verify TLS 1.2+
        for request in traffic:
            if 'payment' in request['url']:
                assert request['tls_version'] >= 'TLSv1.2'
```

## Accessibility Compliance Testing

### WCAG Compliance

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG 2.1 AA Compliance', () => {
  test('home page meets WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('form has accessible labels', async ({ page }) => {
    await page.goto('/contact');

    // All form inputs should have associated labels
    const inputs = await page.locator('input, select, textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Must have label association
      const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
      const hasAriaLabel = ariaLabel !== null;
      const hasAriaLabelledBy = ariaLabelledBy !== null;

      expect(hasLabel || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
    }
  });

  test('color contrast meets requirements', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    const interactiveElements = await page.locator(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).all();

    for (let i = 0; i < Math.min(interactiveElements.length, 20); i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).not.toBe('BODY');
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // Must have alt or be decorative (role="presentation")
      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });
});
```

## Automating Compliance Checks

### Compliance Test Suite Structure

```python
# tests/compliance/conftest.py
import pytest

@pytest.fixture(scope='session')
def compliance_requirements():
    """Load compliance requirements from specification."""
    return {
        'gdpr': load_requirements('gdpr.yaml'),
        'hipaa': load_requirements('hipaa.yaml'),
        'pci': load_requirements('pci_dss.yaml'),
        'wcag': load_requirements('wcag.yaml')
    }

@pytest.fixture
def compliance_reporter():
    """Reporter for compliance test results."""
    return ComplianceReporter()


# tests/compliance/test_suite.py
@pytest.mark.compliance
@pytest.mark.gdpr
class TestGDPRCompliance:
    """GDPR compliance test suite."""

    @pytest.mark.requirement('GDPR-Art15')
    def test_right_of_access(self):
        """Test Article 15: Right of access."""
        pass

    @pytest.mark.requirement('GDPR-Art17')
    def test_right_to_erasure(self):
        """Test Article 17: Right to erasure."""
        pass


# Run specific compliance tests
# pytest -m "compliance and gdpr"
# pytest -m "compliance and pci"
```

### Compliance Reporting

```python
class ComplianceReporter:
    """Generate compliance test reports."""

    def generate_report(self, results: dict, standard: str) -> dict:
        requirements = load_requirements(standard)

        report = {
            'standard': standard,
            'date': datetime.now().isoformat(),
            'summary': {
                'total_requirements': len(requirements),
                'tested': 0,
                'passed': 0,
                'failed': 0,
                'not_tested': 0
            },
            'requirements': []
        }

        for req_id, req in requirements.items():
            test_result = results.get(req_id)

            if test_result is None:
                status = 'not_tested'
            elif test_result['passed']:
                status = 'passed'
            else:
                status = 'failed'

            report['requirements'].append({
                'id': req_id,
                'description': req['description'],
                'status': status,
                'evidence': test_result.get('evidence') if test_result else None
            })

            report['summary'][status] += 1
            if test_result:
                report['summary']['tested'] += 1

        return report
```

## Best Practices

### Compliance Testing Checklist

```markdown
## Compliance Testing Best Practices

### Planning
- [ ] Identify applicable regulations/standards
- [ ] Map requirements to test cases
- [ ] Document compliance scope
- [ ] Plan for regular audits

### Implementation
- [ ] Automate repeatable compliance checks
- [ ] Maintain traceability to requirements
- [ ] Include evidence collection in tests
- [ ] Version control compliance tests

### Reporting
- [ ] Generate audit-ready reports
- [ ] Track compliance over time
- [ ] Document exceptions and remediation
- [ ] Maintain test evidence

### Maintenance
- [ ] Update tests when regulations change
- [ ] Review compliance regularly
- [ ] Train team on compliance requirements
- [ ] Include compliance in CI/CD
```

## Conclusion

Compliance testing protects organizations from regulatory penalties and ensures user trust. By automating compliance checks, test automation professionals can provide continuous assurance that systems meet required standards.

## Key Takeaways

1. Map regulatory requirements to specific test cases
2. Automate compliance checks in CI/CD pipeline
3. Generate audit-ready evidence and reports
4. Cover data protection, security, and accessibility
5. Keep tests updated with changing regulations
6. Maintain traceability between requirements and tests
7. Include compliance testing in regular test cycles
