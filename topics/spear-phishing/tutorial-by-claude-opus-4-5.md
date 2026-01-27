# Spear Phishing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Spear phishing is a targeted form of phishing where attackers craft personalized messages aimed at specific individuals or organizations. For test automation professionals, testing spear phishing defenses requires validating that systems detect sophisticated, context-aware attacks — not just generic spam patterns.

## What is Spear Phishing?

Unlike broad phishing campaigns, spear phishing uses information gathered about the target (name, role, colleagues, projects) to create convincing messages. These attacks bypass generic filters because they appear legitimate and contextually relevant.

### Spear Phishing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Spear Phishing                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Generic Phishing vs Spear Phishing:                       │
│                                                             │
│  Generic:                                                   │
│  ├── Mass emails to thousands                              │
│  ├── Generic greetings ("Dear Customer")                   │
│  ├── Obvious red flags                                     │
│  └── Low success rate, high volume                         │
│                                                             │
│  Spear Phishing:                                            │
│  ├── Targeted at specific individuals                      │
│  ├── Uses personal details (name, role, projects)          │
│  ├── Mimics known contacts or internal comms               │
│  ├── Few obvious red flags                                 │
│  └── High success rate, low volume                         │
│                                                             │
│  Attack Research Sources:                                   │
│  ├── LinkedIn profiles and org charts                      │
│  ├── Social media posts                                    │
│  ├── Company website and press releases                    │
│  ├── Conference speaker lists                              │
│  └── Previous data breaches                                │
│                                                             │
│  Detection Challenges:                                      │
│  ├── Content appears legitimate and relevant               │
│  ├── Sender may use spoofed internal addresses             │
│  ├── Links go to convincing lookalike domains              │
│  └── Attachments match expected file types                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing Spear Phishing Defenses

```python
# spear_phishing.py

"""
Testing defenses against targeted spear phishing attacks.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from enum import Enum
import re


class ThreatLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


@dataclass
class EmailMessage:
    sender: str
    recipient: str
    subject: str
    body: str
    links: List[str] = field(default_factory=list)
    attachments: List[str] = field(default_factory=list)
    headers: Dict[str, str] = field(default_factory=dict)


@dataclass
class SpearPhishingIndicator:
    indicator: str
    description: str
    weight: float  # 0.0-1.0


class SpearPhishingDetector:
    """Detect spear phishing through contextual analysis."""

    def __init__(self, known_domains: List[str], employee_names: List[str]):
        self.known_domains = known_domains
        self.employee_names = employee_names

    def analyze(self, email: EmailMessage) -> Dict:
        indicators = []

        indicators.extend(self._check_sender_spoofing(email))
        indicators.extend(self._check_lookalike_domains(email))
        indicators.extend(self._check_urgency_language(email))
        indicators.extend(self._check_personalization_mismatch(email))
        indicators.extend(self._check_link_mismatch(email))

        total_weight = sum(i.weight for i in indicators)
        threat = self._assess_threat(total_weight)

        return {
            "threat_level": threat.value,
            "indicators": [{"indicator": i.indicator, "description": i.description} for i in indicators],
            "score": round(total_weight, 2),
            "is_spear_phishing": threat in (ThreatLevel.HIGH, ThreatLevel.CRITICAL),
        }

    def _check_sender_spoofing(self, email: EmailMessage) -> List[SpearPhishingIndicator]:
        indicators = []
        sender_domain = email.sender.split("@")[-1] if "@" in email.sender else ""

        # Check for display name matching employee but external domain
        for name in self.employee_names:
            if name.lower() in email.sender.lower() and sender_domain not in self.known_domains:
                indicators.append(SpearPhishingIndicator(
                    "sender_spoofing",
                    f"Sender uses employee name '{name}' but external domain '{sender_domain}'",
                    0.8
                ))
        return indicators

    def _check_lookalike_domains(self, email: EmailMessage) -> List[SpearPhishingIndicator]:
        indicators = []
        for link in email.links:
            domain = self._extract_domain(link)
            for known in self.known_domains:
                similarity = self._domain_similarity(domain, known)
                if 0.7 < similarity < 1.0:
                    indicators.append(SpearPhishingIndicator(
                        "lookalike_domain",
                        f"Link domain '{domain}' similar to known '{known}'",
                        0.7
                    ))
        return indicators

    def _check_urgency_language(self, email: EmailMessage) -> List[SpearPhishingIndicator]:
        urgency_phrases = [
            "urgent", "immediately", "right away", "asap",
            "within 24 hours", "account suspended", "verify now",
            "action required", "do not share", "confidential"
        ]
        body_lower = email.body.lower()
        found = [p for p in urgency_phrases if p in body_lower]
        if found:
            return [SpearPhishingIndicator(
                "urgency_language",
                f"Contains urgency phrases: {', '.join(found)}",
                min(0.3 * len(found), 0.6)
            )]
        return []

    def _check_personalization_mismatch(self, email: EmailMessage) -> List[SpearPhishingIndicator]:
        indicators = []
        # Check if email uses recipient's name but has inconsistencies
        recipient_name = email.recipient.split("@")[0].replace(".", " ").title()
        if recipient_name in email.body:
            # Personalized — check for mismatched formality
            if email.body.startswith("Dear ") and "click here" in email.body.lower():
                indicators.append(SpearPhishingIndicator(
                    "formality_mismatch",
                    "Formal greeting combined with informal 'click here' request",
                    0.4
                ))
        return indicators

    def _check_link_mismatch(self, email: EmailMessage) -> List[SpearPhishingIndicator]:
        indicators = []
        for link in email.links:
            domain = self._extract_domain(link)
            sender_domain = email.sender.split("@")[-1] if "@" in email.sender else ""
            if domain and sender_domain and domain != sender_domain:
                if domain not in self.known_domains:
                    indicators.append(SpearPhishingIndicator(
                        "link_domain_mismatch",
                        f"Link goes to '{domain}' but sender is from '{sender_domain}'",
                        0.5
                    ))
        return indicators

    def _extract_domain(self, url: str) -> str:
        match = re.search(r'https?://([^/]+)', url)
        return match.group(1) if match else ""

    def _domain_similarity(self, d1: str, d2: str) -> float:
        if not d1 or not d2:
            return 0.0
        common = sum(1 for a, b in zip(d1, d2) if a == b)
        return common / max(len(d1), len(d2))

    def _assess_threat(self, score: float) -> ThreatLevel:
        if score >= 1.5:
            return ThreatLevel.CRITICAL
        elif score >= 1.0:
            return ThreatLevel.HIGH
        elif score >= 0.5:
            return ThreatLevel.MEDIUM
        return ThreatLevel.LOW


# Tests
class TestSpearPhishingDetector:

    @pytest.fixture
    def detector(self):
        return SpearPhishingDetector(
            known_domains=["company.com", "company-internal.com"],
            employee_names=["Alice Johnson", "Bob Smith"]
        )

    def test_detects_sender_spoofing(self, detector):
        email = EmailMessage(
            sender="Alice Johnson <alice.johnson@c0mpany.com>",
            recipient="bob.smith@company.com",
            subject="Urgent: Q4 Budget Review",
            body="Hi Bob, please review the attached budget.",
            links=[]
        )
        result = detector.analyze(email)
        assert any(i["indicator"] == "sender_spoofing" for i in result["indicators"])

    def test_detects_lookalike_domain(self, detector):
        email = EmailMessage(
            sender="noreply@external.com",
            recipient="bob.smith@company.com",
            subject="Document shared",
            body="Click to view",
            links=["https://company.co/doc"]
        )
        result = detector.analyze(email)
        assert any(i["indicator"] == "lookalike_domain" for i in result["indicators"])

    def test_detects_urgency_language(self, detector):
        email = EmailMessage(
            sender="support@vendor.com",
            recipient="bob.smith@company.com",
            subject="Action Required",
            body="URGENT: Verify your account immediately or it will be suspended within 24 hours.",
            links=[]
        )
        result = detector.analyze(email)
        assert any(i["indicator"] == "urgency_language" for i in result["indicators"])

    def test_legitimate_email_low_threat(self, detector):
        email = EmailMessage(
            sender="hr@company.com",
            recipient="bob.smith@company.com",
            subject="Team lunch Friday",
            body="Hi team, lunch at noon Friday.",
            links=["https://company.com/calendar"]
        )
        result = detector.analyze(email)
        assert result["threat_level"] == "low"
        assert not result["is_spear_phishing"]

    def test_combined_indicators_raise_threat(self, detector):
        email = EmailMessage(
            sender="Alice Johnson <alice@c0mpany.com>",
            recipient="bob.smith@company.com",
            subject="Urgent: Wire Transfer Needed",
            body="Bob, I need you to process a wire transfer immediately. Click here to approve. Do not share this with anyone.",
            links=["https://c0mpany.com/approve"]
        )
        result = detector.analyze(email)
        assert result["is_spear_phishing"]
        assert result["score"] > 1.0
```

## Best Practices

```markdown
## Testing Spear Phishing Defenses

### Detection Testing
- [ ] Test sender spoofing with employee name impersonation
- [ ] Test lookalike domain detection (typosquatting, homoglyphs)
- [ ] Test urgency and pressure language detection
- [ ] Test link-to-sender domain mismatch identification

### Simulation
- [ ] Conduct authorized spear phishing simulations
- [ ] Use realistic but safe test payloads
- [ ] Test with varying sophistication levels
- [ ] Measure detection rates across departments

### Defense Validation
- [ ] Verify SPF/DKIM/DMARC enforcement
- [ ] Test email gateway filtering rules
- [ ] Validate user reporting mechanisms work
- [ ] Check that quarantined emails are reviewable
```

## Conclusion

Spear phishing poses a greater threat than generic phishing because attacks are personalized and contextually relevant. Test automation professionals must validate that detection systems analyze sender authenticity, domain similarity, urgency patterns, and contextual mismatches to catch targeted attacks.

## Key Takeaways

1. Spear phishing targets specific individuals with personalized content
2. Generic spam filters often miss spear phishing attacks
3. Test for sender spoofing using employee names with external domains
4. Detect lookalike domains through similarity analysis
5. Urgency language and authority impersonation are key indicators
6. Multiple weak indicators combined signal high threat levels
7. Regular authorized simulations validate defense effectiveness
