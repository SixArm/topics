# Phishing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Phishing is a social engineering attack that uses deceptive communications to trick users into revealing sensitive information or installing malware. For test automation professionals, understanding phishing enables testing email security filters, URL validation, and user awareness training effectiveness.

## What is Phishing?

Phishing attacks impersonate trusted entities through email, SMS, or fake websites to steal credentials, financial information, or deploy malware. Testing phishing defenses validates that technical controls and user training effectively prevent these attacks.

### Phishing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                       Phishing                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phishing Types:                                            │
│  ├── Email phishing: Mass deceptive emails                 │
│  ├── Spear phishing: Targeted at specific individuals      │
│  ├── Whaling: Targeting executives                         │
│  ├── Smishing: SMS-based phishing                          │
│  ├── Vishing: Voice/phone phishing                         │
│  └── Clone phishing: Cloned legitimate emails              │
│                                                             │
│  Attack Flow:                                               │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│  │ Attacker │──►│ Deceptive│──►│ Victim   │               │
│  │ crafts   │   │ message  │   │ clicks/  │               │
│  │ message  │   │ arrives  │   │ reveals  │               │
│  └──────────┘   └──────────┘   └──────────┘               │
│                                                             │
│  Defense Layers:                                            │
│  ├── Email filters (SPF, DKIM, DMARC)                     │
│  ├── URL scanning and reputation checking                  │
│  ├── User awareness training                               │
│  ├── Multi-factor authentication                           │
│  └── Incident response procedures                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing Phishing Defenses

```python
# phishing.py

"""
Testing phishing defense mechanisms.
"""

import pytest
import re
from typing import List, Dict
from dataclasses import dataclass
from urllib.parse import urlparse


@dataclass
class PhishingIndicator:
    indicator_type: str
    value: str
    confidence: float  # 0-1
    description: str


class PhishingDetector:
    """Detect phishing indicators in emails and URLs."""

    SUSPICIOUS_TLDs = {'.xyz', '.top', '.club', '.buzz', '.tk', '.ml'}
    BRAND_KEYWORDS = {'paypal', 'amazon', 'microsoft', 'apple', 'google', 'bank'}

    def analyze_url(self, url: str) -> List[PhishingIndicator]:
        indicators = []
        parsed = urlparse(url)
        domain = parsed.netloc.lower()

        # Check for IP address instead of domain
        if re.match(r'\d+\.\d+\.\d+\.\d+', domain):
            indicators.append(PhishingIndicator(
                "ip_address_url", domain, 0.8, "URL uses IP address instead of domain"
            ))

        # Check for suspicious TLD
        for tld in self.SUSPICIOUS_TLDs:
            if domain.endswith(tld):
                indicators.append(PhishingIndicator(
                    "suspicious_tld", tld, 0.6, f"Suspicious TLD: {tld}"
                ))

        # Check for brand impersonation in subdomain
        for brand in self.BRAND_KEYWORDS:
            if brand in domain and brand not in domain.split('.')[-2]:
                indicators.append(PhishingIndicator(
                    "brand_impersonation", brand, 0.9,
                    f"Brand '{brand}' in subdomain suggests impersonation"
                ))

        # Check for excessive subdomains
        if domain.count('.') > 3:
            indicators.append(PhishingIndicator(
                "excessive_subdomains", domain, 0.5, "Unusually many subdomains"
            ))

        # Check for homograph attacks (mixed scripts)
        if any(ord(c) > 127 for c in domain):
            indicators.append(PhishingIndicator(
                "homograph", domain, 0.95, "Non-ASCII characters in domain (IDN homograph)"
            ))

        return indicators

    def analyze_email(self, subject: str, body: str, sender: str) -> List[PhishingIndicator]:
        indicators = []

        urgency_phrases = [
            "act now", "immediate action", "account suspended",
            "verify your", "click here immediately", "expires today",
            "unauthorized access", "confirm your identity"
        ]

        for phrase in urgency_phrases:
            if phrase.lower() in body.lower():
                indicators.append(PhishingIndicator(
                    "urgency", phrase, 0.7, f"Urgency phrase: '{phrase}'"
                ))

        # Check sender domain mismatch
        if "@" in sender:
            sender_domain = sender.split("@")[1].lower()
            for brand in self.BRAND_KEYWORDS:
                if brand in body.lower() and brand not in sender_domain:
                    indicators.append(PhishingIndicator(
                        "sender_mismatch", sender_domain, 0.8,
                        f"Email mentions '{brand}' but sent from '{sender_domain}'"
                    ))

        return indicators

    def risk_score(self, indicators: List[PhishingIndicator]) -> float:
        if not indicators:
            return 0.0
        return min(1.0, sum(i.confidence for i in indicators) / 2)


# Tests
class TestPhishingDetection:
    """Test phishing detection capabilities."""

    @pytest.fixture
    def detector(self):
        return PhishingDetector()

    def test_detects_ip_address_url(self, detector):
        indicators = detector.analyze_url("http://192.168.1.100/login")
        assert any(i.indicator_type == "ip_address_url" for i in indicators)

    def test_detects_brand_impersonation(self, detector):
        indicators = detector.analyze_url("https://paypal.security-update.xyz/login")
        types = [i.indicator_type for i in indicators]
        assert "brand_impersonation" in types or "suspicious_tld" in types

    def test_detects_urgency_phrases(self, detector):
        indicators = detector.analyze_email(
            subject="Your account has been suspended",
            body="Act now or your account will be permanently deleted. Click here immediately.",
            sender="security@totally-legit.xyz"
        )
        assert any(i.indicator_type == "urgency" for i in indicators)

    def test_detects_sender_mismatch(self, detector):
        indicators = detector.analyze_email(
            subject="PayPal Security Alert",
            body="Your PayPal account needs verification",
            sender="alert@phishing-domain.com"
        )
        assert any(i.indicator_type == "sender_mismatch" for i in indicators)

    def test_clean_url_no_indicators(self, detector):
        indicators = detector.analyze_url("https://www.google.com/search?q=test")
        assert len(indicators) == 0

    def test_risk_scoring(self, detector):
        indicators = detector.analyze_url("http://192.168.1.1/paypal-login.xyz")
        score = detector.risk_score(indicators)
        assert 0 <= score <= 1
```

### JavaScript Implementation

```javascript
// phishing.test.js

class PhishingDetector {
  static SUSPICIOUS_TLDS = ['.xyz', '.top', '.tk', '.ml', '.buzz'];

  analyzeUrl(url) {
    const indicators = [];
    try {
      const parsed = new URL(url);
      const domain = parsed.hostname;

      if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
        indicators.push({ type: 'ip_url', confidence: 0.8 });
      }

      for (const tld of PhishingDetector.SUSPICIOUS_TLDS) {
        if (domain.endsWith(tld)) {
          indicators.push({ type: 'suspicious_tld', confidence: 0.6 });
        }
      }
    } catch (e) {
      indicators.push({ type: 'invalid_url', confidence: 0.5 });
    }
    return indicators;
  }
}

describe('Phishing Detection', () => {
  const detector = new PhishingDetector();

  test('detects IP address URLs', () => {
    const indicators = detector.analyzeUrl('http://192.168.1.100/login');
    expect(indicators.some((i) => i.type === 'ip_url')).toBe(true);
  });

  test('detects suspicious TLDs', () => {
    const indicators = detector.analyzeUrl('https://login.example.xyz');
    expect(indicators.some((i) => i.type === 'suspicious_tld')).toBe(true);
  });

  test('clean URLs produce no indicators', () => {
    const indicators = detector.analyzeUrl('https://www.google.com');
    expect(indicators).toHaveLength(0);
  });
});
```

## Best Practices

```markdown
## Phishing Defense Testing Checklist

### Email Security
- [ ] Test SPF, DKIM, DMARC configuration
- [ ] Verify email filters catch known phishing patterns
- [ ] Test with various phishing payload types
- [ ] Validate attachment scanning

### URL Analysis
- [ ] Test URL reputation checking
- [ ] Detect brand impersonation in URLs
- [ ] Identify homograph attacks
- [ ] Validate link scanning in emails

### User Awareness
- [ ] Conduct simulated phishing campaigns
- [ ] Measure click-through rates over time
- [ ] Test reporting mechanisms work
- [ ] Validate training effectiveness
```

## Conclusion

Phishing remains one of the most effective attack vectors. Test automation professionals should validate email security filters, URL scanning, and user awareness training through automated testing of phishing indicators and simulated campaigns.

## Key Takeaways

1. Phishing uses deceptive communications to steal credentials or deploy malware
2. Test email security controls (SPF, DKIM, DMARC) automatically
3. Analyze URLs for IP addresses, suspicious TLDs, and brand impersonation
4. Detect urgency phrases and sender mismatches in email content
5. Calculate risk scores combining multiple phishing indicators
6. Conduct regular simulated phishing campaigns
7. Validate that MFA limits the impact of successful phishing
