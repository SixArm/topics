# Ransomware: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Ransomware is malicious software that encrypts a victim's files and demands payment for decryption. For test automation professionals, understanding ransomware is essential for testing backup and recovery systems, validating data protection controls, and ensuring incident response procedures work effectively.

## What is Ransomware?

Ransomware is malware that restricts access to systems or data, typically through encryption, and demands a ransom for restoration. Modern ransomware often combines data encryption with data exfiltration ("double extortion"), threatening to publish stolen data if payment is not made.

### Ransomware in Context

```
┌─────────────────────────────────────────────────────────────┐
│                       Ransomware                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Attack Chain:                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Initial  │─►│ Lateral  │─►│ Data     │─►│ Encrypt  │   │
│  │ Access   │  │ Movement │  │ Exfil    │  │ & Ransom │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  Types:                                                     │
│  ├── Crypto ransomware: Encrypts files                     │
│  ├── Locker ransomware: Locks system access                │
│  ├── Double extortion: Encrypt + threaten data leak        │
│  └── RaaS: Ransomware-as-a-Service                         │
│                                                             │
│  Defense Testing:                                           │
│  ├── Backup integrity and restoration                      │
│  ├── File system monitoring and alerting                   │
│  ├── Network segmentation effectiveness                    │
│  ├── Endpoint protection validation                        │
│  └── Incident response procedures                          │
│                                                             │
│  Recovery Testing:                                          │
│  ├── RTO: Recovery Time Objective                          │
│  ├── RPO: Recovery Point Objective                         │
│  ├── Backup restoration speed                              │
│  └── Data integrity after recovery                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing Ransomware Defenses

```python
# ransomware.py

"""
Testing ransomware defense and recovery capabilities.
Note: These tests validate DEFENSES, not create ransomware.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from enum import Enum
import hashlib


class BackupStatus(Enum):
    VALID = "valid"
    CORRUPTED = "corrupted"
    MISSING = "missing"
    OUTDATED = "outdated"


@dataclass
class BackupRecord:
    name: str
    created_at: datetime
    size_bytes: int
    checksum: str
    location: str
    is_offsite: bool = False


class BackupValidator:
    """Validate backup integrity for ransomware recovery readiness."""

    def __init__(self, max_age_hours: int = 24):
        self.max_age_hours = max_age_hours

    def validate_backup(self, backup: BackupRecord) -> Dict:
        issues = []

        # Check age
        age = datetime.now() - backup.created_at
        if age > timedelta(hours=self.max_age_hours):
            issues.append(f"Backup is {age.total_seconds()/3600:.0f}h old (max: {self.max_age_hours}h)")

        # Check size
        if backup.size_bytes == 0:
            issues.append("Backup is empty")

        # Check offsite copy
        if not backup.is_offsite:
            issues.append("No offsite copy (vulnerable to local ransomware)")

        return {
            "name": backup.name,
            "status": BackupStatus.VALID.value if not issues else BackupStatus.CORRUPTED.value,
            "issues": issues,
            "age_hours": age.total_seconds() / 3600,
        }

    def validate_all(self, backups: List[BackupRecord]) -> Dict:
        results = [self.validate_backup(b) for b in backups]
        valid = sum(1 for r in results if r["status"] == BackupStatus.VALID.value)
        return {
            "total": len(backups),
            "valid": valid,
            "invalid": len(backups) - valid,
            "all_valid": valid == len(backups),
            "details": results,
        }


class FileIntegrityMonitor:
    """Monitor file system for ransomware-like behavior."""

    def __init__(self):
        self.baseline: Dict[str, str] = {}
        self.alerts: List[Dict] = []

    def set_baseline(self, files: Dict[str, bytes]):
        self.baseline = {
            path: hashlib.sha256(content).hexdigest()
            for path, content in files.items()
        }

    def check_integrity(self, current_files: Dict[str, bytes]) -> List[Dict]:
        changes = []
        for path, content in current_files.items():
            current_hash = hashlib.sha256(content).hexdigest()
            original_hash = self.baseline.get(path)

            if original_hash and current_hash != original_hash:
                changes.append({
                    "path": path,
                    "type": "modified",
                    "original_hash": original_hash,
                    "current_hash": current_hash,
                })

        # Detect mass modification (ransomware indicator)
        if len(changes) > len(self.baseline) * 0.5:
            self.alerts.append({
                "type": "mass_modification",
                "severity": "critical",
                "files_affected": len(changes),
                "message": "Possible ransomware: mass file modification detected"
            })

        return changes


# Tests
class TestRansomwareDefenses:
    """Test ransomware defense mechanisms."""

    def test_backup_validation_passes(self):
        validator = BackupValidator(max_age_hours=24)
        backup = BackupRecord(
            name="daily-backup",
            created_at=datetime.now() - timedelta(hours=2),
            size_bytes=1024 * 1024 * 500,
            checksum="abc123",
            location="/backups/daily",
            is_offsite=True
        )
        result = validator.validate_backup(backup)
        assert result["status"] == BackupStatus.VALID.value

    def test_outdated_backup_flagged(self):
        validator = BackupValidator(max_age_hours=24)
        backup = BackupRecord(
            name="old-backup",
            created_at=datetime.now() - timedelta(hours=48),
            size_bytes=1024 * 1024,
            checksum="abc123",
            location="/backups/old",
            is_offsite=True
        )
        result = validator.validate_backup(backup)
        assert len(result["issues"]) > 0

    def test_no_offsite_backup_flagged(self):
        validator = BackupValidator()
        backup = BackupRecord(
            name="local-only",
            created_at=datetime.now(),
            size_bytes=1024,
            checksum="abc",
            location="/local/backup",
            is_offsite=False
        )
        result = validator.validate_backup(backup)
        assert any("offsite" in i for i in result["issues"])

    def test_file_integrity_detects_mass_modification(self):
        monitor = FileIntegrityMonitor()
        original = {f"file{i}.txt": f"content{i}".encode() for i in range(10)}
        monitor.set_baseline(original)

        modified = {f"file{i}.txt": b"encrypted_content" for i in range(10)}
        monitor.check_integrity(modified)

        assert len(monitor.alerts) > 0
        assert monitor.alerts[0]["type"] == "mass_modification"

    def test_file_integrity_normal_changes(self):
        monitor = FileIntegrityMonitor()
        original = {f"file{i}.txt": f"content{i}".encode() for i in range(10)}
        monitor.set_baseline(original)

        modified = dict(original)
        modified["file0.txt"] = b"updated_content"
        monitor.check_integrity(modified)

        assert len(monitor.alerts) == 0
```

## Best Practices

```markdown
## Ransomware Defense Testing Checklist

### Backup Validation
- [ ] Test backup creation completes successfully
- [ ] Verify backup integrity with checksums
- [ ] Test restoration from backups regularly
- [ ] Maintain offsite/air-gapped backup copies
- [ ] Verify RPO and RTO are met

### Detection
- [ ] Test file integrity monitoring alerts
- [ ] Validate mass-modification detection
- [ ] Test endpoint protection against known samples
- [ ] Verify network anomaly detection

### Recovery
- [ ] Test full system restoration procedures
- [ ] Measure actual recovery time
- [ ] Verify data integrity after restoration
- [ ] Test incident response runbooks
```

## Conclusion

Ransomware is a critical threat that requires proactive defense testing. Test automation professionals should validate backup integrity, file monitoring, and recovery procedures to ensure organizations can withstand and recover from ransomware attacks without paying ransom.

## Key Takeaways

1. Ransomware encrypts data and demands payment for restoration
2. Test backup integrity, age, and offsite availability regularly
3. Monitor for mass file modifications as a ransomware indicator
4. Validate actual recovery time meets RTO objectives
5. Maintain offsite or air-gapped backups immune to local encryption
6. Test incident response procedures through tabletop exercises
7. Automate backup validation and integrity checks in CI/CD
