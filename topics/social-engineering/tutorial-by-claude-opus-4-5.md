# Social Engineering: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Social engineering exploits human psychology rather than technical vulnerabilities to gain unauthorized access to systems and data. For test automation professionals, understanding social engineering is critical for designing automated phishing simulations, measuring security awareness, and testing the human layer of an organization's defenses. This tutorial covers social engineering techniques, automated simulation frameworks, and metrics for tracking organizational resilience.

## What is Social Engineering?

Social engineering is a class of attack techniques that manipulate people into divulging confidential information, clicking malicious links, or performing actions that compromise security. Unlike technical exploits that target software vulnerabilities, social engineering targets the human element: trust, authority, urgency, and curiosity. Common forms include phishing emails, pretexting phone calls, baiting with infected USB drives, and tailgating through physical access points. For test automation, social engineering testing involves creating controlled simulations that measure how employees respond to these attacks, providing data-driven insights into an organization's security culture.

### Social Engineering in Context

```
+----------------------------------------------------------+
|               Social Engineering Attack Lifecycle        |
|                                                          |
|  +----------+    +----------+    +-----------+           |
|  | Research  |--->| Engage   |--->| Exploit   |           |
|  | Target    |    | Target   |    | Trust     |           |
|  +----------+    +----------+    +-----------+           |
|       |               |               |                  |
|       v               v               v                  |
|  OSINT, social    Pretexting,     Credential theft,      |
|  media, org       building        data exfiltration,     |
|  charts           rapport         malware delivery       |
|                                                          |
|  +--------------------------------------------------+   |
|  |          Automated Testing & Metrics              |   |
|  |                                                    |   |
|  |  Phishing    Click-Through   Report    Awareness   |   |
|  |  Simulation  Rate            Rate      Score       |   |
|  +--------------------------------------------------+   |
+----------------------------------------------------------+
```

## Social Engineering Testing with Python

The following Python module provides a framework for designing phishing simulations, tracking employee responses, and computing awareness metrics.

```python
"""Social engineering testing framework for test automation."""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Optional
import re


class AttackVector(Enum):
    PHISHING_EMAIL = "Phishing Email"
    SPEAR_PHISHING = "Spear Phishing"
    VISHING = "Vishing (Voice Phishing)"
    SMISHING = "Smishing (SMS Phishing)"
    BAITING = "Baiting"
    PRETEXTING = "Pretexting"
    TAILGATING = "Tailgating"


class DifficultyLevel(Enum):
    EASY = 1      # Obvious red flags present
    MEDIUM = 2    # Some red flags, requires attention
    HARD = 3      # Highly convincing, minimal red flags


@dataclass
class PhishingTemplate:
    name: str
    vector: AttackVector
    difficulty: DifficultyLevel
    subject: str
    sender_display: str
    body: str
    red_flags: list[str] = field(default_factory=list)

    def get_red_flag_count(self) -> int:
        return len(self.red_flags)


@dataclass
class EmployeeResponse:
    employee_id: str
    department: str
    template_name: str
    opened: bool = False
    clicked_link: bool = False
    submitted_credentials: bool = False
    reported_phishing: bool = False
    response_time_seconds: Optional[int] = None

    def get_risk_score(self) -> int:
        score = 0
        if self.opened:
            score += 10
        if self.clicked_link:
            score += 30
        if self.submitted_credentials:
            score += 50
        if self.reported_phishing:
            score -= 20
        return max(0, score)


@dataclass
class CampaignMetrics:
    total_sent: int
    total_opened: int
    total_clicked: int
    total_submitted: int
    total_reported: int

    @property
    def open_rate(self) -> float:
        return self.total_opened / self.total_sent if self.total_sent > 0 else 0.0

    @property
    def click_rate(self) -> float:
        return self.total_clicked / self.total_sent if self.total_sent > 0 else 0.0

    @property
    def submission_rate(self) -> float:
        return self.total_submitted / self.total_sent if self.total_sent > 0 else 0.0

    @property
    def report_rate(self) -> float:
        return self.total_reported / self.total_sent if self.total_sent > 0 else 0.0

    @property
    def awareness_score(self) -> float:
        """0-100 score where higher is better awareness."""
        penalty = (self.click_rate * 40) + (self.submission_rate * 40)
        bonus = self.report_rate * 20
        return max(0.0, min(100.0, 100.0 - penalty * 100 + bonus * 100))


class PhishingCampaign:
    def __init__(self, name: str):
        self.name = name
        self.templates: list[PhishingTemplate] = []
        self.responses: list[EmployeeResponse] = []

    def add_template(self, template: PhishingTemplate) -> None:
        self.templates.append(template)

    def record_response(self, response: EmployeeResponse) -> None:
        self.responses.append(response)

    def get_metrics(self) -> CampaignMetrics:
        total = len(self.responses)
        return CampaignMetrics(
            total_sent=total,
            total_opened=sum(1 for r in self.responses if r.opened),
            total_clicked=sum(1 for r in self.responses if r.clicked_link),
            total_submitted=sum(1 for r in self.responses if r.submitted_credentials),
            total_reported=sum(1 for r in self.responses if r.reported_phishing),
        )

    def get_department_breakdown(self) -> dict[str, CampaignMetrics]:
        departments: dict[str, list[EmployeeResponse]] = {}
        for r in self.responses:
            departments.setdefault(r.department, []).append(r)
        result = {}
        for dept, responses in departments.items():
            result[dept] = CampaignMetrics(
                total_sent=len(responses),
                total_opened=sum(1 for r in responses if r.opened),
                total_clicked=sum(1 for r in responses if r.clicked_link),
                total_submitted=sum(1 for r in responses if r.submitted_credentials),
                total_reported=sum(1 for r in responses if r.reported_phishing),
            )
        return result

    def get_high_risk_employees(self, threshold: int = 50) -> list[str]:
        return [r.employee_id for r in self.responses if r.get_risk_score() >= threshold]


def analyze_email_for_red_flags(subject: str, sender: str, body: str) -> list[str]:
    """Detect red flags in a suspicious email."""
    flags = []
    if re.search(r"urgent|immediate|act now|expires today", subject, re.IGNORECASE):
        flags.append("Urgency language in subject line")
    if re.search(r"@(?!company\.com$)\S+", sender):
        flags.append("Sender domain does not match company")
    if re.search(r"http://", body):
        flags.append("Non-HTTPS link in body")
    if re.search(r"password|credential|ssn|social security", body, re.IGNORECASE):
        flags.append("Requests sensitive information")
    if re.search(r"click here|verify your account", body, re.IGNORECASE):
        flags.append("Generic call-to-action phrase")
    return flags
```

### Pytest Tests for Social Engineering Framework

```python
"""Tests for social engineering testing framework."""

import pytest
from social_engineering import (
    PhishingTemplate, EmployeeResponse, PhishingCampaign,
    CampaignMetrics, AttackVector, DifficultyLevel,
    analyze_email_for_red_flags,
)


class TestEmployeeResponse:
    def test_no_action_gives_zero_risk(self):
        r = EmployeeResponse(employee_id="E001", department="Engineering",
                             template_name="test")
        assert r.get_risk_score() == 0

    def test_clicked_link_gives_risk(self):
        r = EmployeeResponse(employee_id="E002", department="Sales",
                             template_name="test", opened=True, clicked_link=True)
        assert r.get_risk_score() == 40

    def test_submitted_credentials_gives_high_risk(self):
        r = EmployeeResponse(employee_id="E003", department="HR",
                             template_name="test", opened=True,
                             clicked_link=True, submitted_credentials=True)
        assert r.get_risk_score() == 90

    def test_reporting_reduces_risk(self):
        r = EmployeeResponse(employee_id="E004", department="IT",
                             template_name="test", opened=True,
                             reported_phishing=True)
        assert r.get_risk_score() == 0  # 10 - 20 = -10, clamped to 0


class TestCampaignMetrics:
    def test_rates_calculated_correctly(self):
        m = CampaignMetrics(total_sent=100, total_opened=50,
                            total_clicked=20, total_submitted=5, total_reported=30)
        assert m.open_rate == 0.5
        assert m.click_rate == 0.2
        assert m.submission_rate == 0.05

    def test_zero_sent_handles_division(self):
        m = CampaignMetrics(total_sent=0, total_opened=0,
                            total_clicked=0, total_submitted=0, total_reported=0)
        assert m.open_rate == 0.0

    def test_awareness_score_range(self):
        m = CampaignMetrics(total_sent=100, total_opened=80,
                            total_clicked=10, total_submitted=5, total_reported=40)
        assert 0 <= m.awareness_score <= 100


class TestPhishingCampaign:
    def test_campaign_tracks_responses(self):
        campaign = PhishingCampaign("Q1 Test")
        campaign.record_response(EmployeeResponse("E001", "IT", "t1", opened=True))
        campaign.record_response(EmployeeResponse("E002", "IT", "t1"))
        metrics = campaign.get_metrics()
        assert metrics.total_sent == 2
        assert metrics.total_opened == 1

    def test_department_breakdown(self):
        campaign = PhishingCampaign("Q2 Test")
        campaign.record_response(EmployeeResponse("E001", "IT", "t1", clicked_link=True))
        campaign.record_response(EmployeeResponse("E002", "Sales", "t1"))
        breakdown = campaign.get_department_breakdown()
        assert "IT" in breakdown
        assert "Sales" in breakdown
        assert breakdown["IT"].total_clicked == 1

    def test_high_risk_employees(self):
        campaign = PhishingCampaign("Q3 Test")
        campaign.record_response(EmployeeResponse("E001", "IT", "t1",
                                                   opened=True, clicked_link=True,
                                                   submitted_credentials=True))
        campaign.record_response(EmployeeResponse("E002", "IT", "t1", opened=True))
        high_risk = campaign.get_high_risk_employees(threshold=50)
        assert "E001" in high_risk
        assert "E002" not in high_risk


class TestRedFlagAnalysis:
    def test_detects_urgency_language(self):
        flags = analyze_email_for_red_flags("URGENT: Act Now", "hr@company.com", "Hello")
        assert any("Urgency" in f for f in flags)

    def test_detects_http_links(self):
        flags = analyze_email_for_red_flags("Update", "a@b.com", "Visit http://evil.com")
        assert any("HTTPS" in f for f in flags)

    def test_detects_credential_request(self):
        flags = analyze_email_for_red_flags("Verify", "a@b.com", "Enter your password here")
        assert any("sensitive" in f.lower() for f in flags)

    def test_clean_email_has_no_flags(self):
        flags = analyze_email_for_red_flags("Meeting Tomorrow", "boss@company.com",
                                            "Let us meet at 2pm.")
        urgency_flags = [f for f in flags if "Urgency" in f]
        assert len(urgency_flags) == 0
```

## JavaScript Implementation with Jest Tests

```javascript
// social-engineering.js

class EmployeeResponse {
  constructor(employeeId, department, templateName) {
    this.employeeId = employeeId;
    this.department = department;
    this.templateName = templateName;
    this.opened = false;
    this.clickedLink = false;
    this.submittedCredentials = false;
    this.reportedPhishing = false;
  }

  getRiskScore() {
    let score = 0;
    if (this.opened) score += 10;
    if (this.clickedLink) score += 30;
    if (this.submittedCredentials) score += 50;
    if (this.reportedPhishing) score -= 20;
    return Math.max(0, score);
  }
}

class PhishingCampaign {
  constructor(name) {
    this.name = name;
    this.responses = [];
  }

  recordResponse(response) {
    this.responses.push(response);
  }

  getMetrics() {
    const total = this.responses.length;
    return {
      totalSent: total,
      totalOpened: this.responses.filter(r => r.opened).length,
      totalClicked: this.responses.filter(r => r.clickedLink).length,
      totalSubmitted: this.responses.filter(r => r.submittedCredentials).length,
      totalReported: this.responses.filter(r => r.reportedPhishing).length,
      clickRate: total > 0 ? this.responses.filter(r => r.clickedLink).length / total : 0,
    };
  }

  getHighRiskEmployees(threshold = 50) {
    return this.responses
      .filter(r => r.getRiskScore() >= threshold)
      .map(r => r.employeeId);
  }
}

// social-engineering.test.js

describe("EmployeeResponse", () => {
  test("no action gives zero risk score", () => {
    const r = new EmployeeResponse("E001", "IT", "test");
    expect(r.getRiskScore()).toBe(0);
  });

  test("clicking link increases risk", () => {
    const r = new EmployeeResponse("E002", "Sales", "test");
    r.opened = true;
    r.clickedLink = true;
    expect(r.getRiskScore()).toBe(40);
  });

  test("reporting phishing reduces risk", () => {
    const r = new EmployeeResponse("E003", "HR", "test");
    r.opened = true;
    r.reportedPhishing = true;
    expect(r.getRiskScore()).toBe(0);
  });

  test("full compromise gives maximum risk", () => {
    const r = new EmployeeResponse("E004", "Finance", "test");
    r.opened = true;
    r.clickedLink = true;
    r.submittedCredentials = true;
    expect(r.getRiskScore()).toBe(90);
  });
});

describe("PhishingCampaign", () => {
  test("tracks metrics across responses", () => {
    const campaign = new PhishingCampaign("Q1");
    const r1 = new EmployeeResponse("E001", "IT", "t1");
    r1.opened = true;
    r1.clickedLink = true;
    const r2 = new EmployeeResponse("E002", "IT", "t1");
    r2.opened = true;
    campaign.recordResponse(r1);
    campaign.recordResponse(r2);
    const metrics = campaign.getMetrics();
    expect(metrics.totalSent).toBe(2);
    expect(metrics.totalClicked).toBe(1);
    expect(metrics.clickRate).toBe(0.5);
  });

  test("identifies high risk employees", () => {
    const campaign = new PhishingCampaign("Q2");
    const r1 = new EmployeeResponse("E001", "IT", "t1");
    r1.opened = true;
    r1.clickedLink = true;
    r1.submittedCredentials = true;
    const r2 = new EmployeeResponse("E002", "IT", "t1");
    campaign.recordResponse(r1);
    campaign.recordResponse(r2);
    expect(campaign.getHighRiskEmployees()).toContain("E001");
    expect(campaign.getHighRiskEmployees()).not.toContain("E002");
  });
});
```

## Best Practices

```
- [ ] Run phishing simulations quarterly with increasing difficulty
- [ ] Rotate attack vectors: email, phone, SMS, physical
- [ ] Track metrics per department to target training where needed
- [ ] Provide immediate educational feedback after simulation engagement
- [ ] Never use simulation results for punishment; use them for training
- [ ] Include C-level executives in simulations; they are high-value targets
- [ ] Test with both easy and hard templates to measure baseline and ceiling
- [ ] Automate metric collection and trend reporting over time
- [ ] Coordinate with HR and Legal before running simulations
- [ ] Measure report rate as the primary success metric, not just click rate
```

## Conclusion

Social engineering testing bridges the gap between technical security controls and human behavior. By automating phishing simulations, tracking employee responses, and computing awareness metrics, test automation professionals provide organizations with data-driven insights into their most unpredictable attack surface: people. The goal is not to catch employees failing but to measure and improve the organization's collective security awareness over time, making the human layer as robust as the technical one.

## Key Takeaways

1. Social engineering attacks target human psychology, not technical vulnerabilities, making them the most common initial attack vector in breaches.
2. Phishing simulations should vary in difficulty level to measure both baseline awareness and resilience against sophisticated attacks.
3. The report rate (employees flagging suspicious messages) is a more valuable metric than click rate for measuring security culture.
4. Department-level breakdowns reveal which teams need targeted security awareness training.
5. Risk scoring per employee enables personalized training without punitive measures.
6. Automated campaign frameworks allow consistent, repeatable testing across the organization on a regular schedule.
7. Social engineering testing must be coordinated with HR, Legal, and executive leadership to ensure ethical and compliant execution.
