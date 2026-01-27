# Disaster Recovery Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Disaster recovery (DR) testing validates that systems and data can be recovered after catastrophic failures. For test automation professionals, DR testing ensures that backup procedures, failover mechanisms, and recovery processes work as designed when critical incidents occur.

## What is Disaster Recovery Testing?

Disaster recovery testing verifies that an organization can restore its IT systems and data to operational status after disasters such as hardware failures, data center outages, cyberattacks, or natural disasters.

### Types of Disasters

```
┌─────────────────────────────────────────────────────────────┐
│                    Types of Disasters                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Technical Failures:                                        │
│  ├── Hardware failures                                      │
│  ├── Software bugs/crashes                                  │
│  ├── Network outages                                        │
│  ├── Database corruption                                    │
│  └── Cloud provider outages                                 │
│                                                             │
│  Human-Caused:                                              │
│  ├── Accidental data deletion                              │
│  ├── Configuration errors                                   │
│  ├── Cyberattacks (ransomware, DDoS)                       │
│  └── Insider threats                                        │
│                                                             │
│  Natural Disasters:                                         │
│  ├── Earthquakes                                           │
│  ├── Floods                                                │
│  ├── Fires                                                 │
│  ├── Power outages                                         │
│  └── Extreme weather                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key DR Metrics

```
┌─────────────────────────────────────────────────────────────┐
│                    DR Key Metrics                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RTO (Recovery Time Objective)                              │
│  └── Maximum acceptable downtime                            │
│      Example: System must be restored within 4 hours        │
│                                                             │
│  RPO (Recovery Point Objective)                             │
│  └── Maximum acceptable data loss                           │
│      Example: No more than 1 hour of data can be lost       │
│                                                             │
│  Timeline:                                                  │
│  ──────────────────────────────────────────────────────>    │
│       Last     Disaster    Recovery    Full                 │
│       Backup   Occurs      Starts      Recovery             │
│         │         │           │            │                │
│         │<──RPO──>│           │<───RTO────>│                │
│         │         │           │            │                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## DR Testing Framework

### Python Implementation

```python
import time
import subprocess
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from enum import Enum
import requests
import psycopg2

class DisasterType(Enum):
    DATABASE_FAILURE = "database_failure"
    APPLICATION_CRASH = "application_crash"
    NETWORK_OUTAGE = "network_outage"
    DATA_CORRUPTION = "data_corruption"
    COMPLETE_SITE_FAILURE = "complete_site_failure"

@dataclass
class DRTestResult:
    """Results of a DR test."""
    test_name: str
    disaster_type: DisasterType
    start_time: datetime
    recovery_time: datetime
    rto_target: timedelta
    rto_actual: timedelta
    rpo_target: timedelta
    rpo_actual: timedelta
    data_integrity_verified: bool
    service_availability_verified: bool
    passed: bool
    notes: List[str]

class DisasterRecoveryTestFramework:
    """Framework for testing disaster recovery procedures."""

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.results: List[DRTestResult] = []

    def simulate_disaster(self, disaster_type: DisasterType) -> datetime:
        """Simulate a disaster scenario."""
        print(f"Simulating disaster: {disaster_type.value}")

        if disaster_type == DisasterType.DATABASE_FAILURE:
            self._simulate_database_failure()
        elif disaster_type == DisasterType.APPLICATION_CRASH:
            self._simulate_application_crash()
        elif disaster_type == DisasterType.NETWORK_OUTAGE:
            self._simulate_network_outage()
        elif disaster_type == DisasterType.DATA_CORRUPTION:
            self._simulate_data_corruption()
        elif disaster_type == DisasterType.COMPLETE_SITE_FAILURE:
            self._simulate_site_failure()

        return datetime.now()

    def _simulate_database_failure(self):
        """Simulate database failure by stopping the database service."""
        subprocess.run([
            'docker', 'stop', self.config['database_container']
        ], check=True)

    def _simulate_application_crash(self):
        """Simulate application crash."""
        subprocess.run([
            'docker', 'stop', self.config['app_container']
        ], check=True)

    def _simulate_network_outage(self):
        """Simulate network outage using iptables."""
        subprocess.run([
            'docker', 'network', 'disconnect',
            self.config['network_name'],
            self.config['app_container']
        ], check=True)

    def _simulate_data_corruption(self):
        """Simulate data corruption by modifying data."""
        # In a real test, this would corrupt test data
        # Never run this on production!
        pass

    def _simulate_site_failure(self):
        """Simulate complete site/region failure."""
        subprocess.run([
            'docker-compose', '-f', self.config['compose_file'],
            'down'
        ], check=True)

    def execute_recovery(self, disaster_type: DisasterType) -> datetime:
        """Execute the recovery procedure."""
        print(f"Executing recovery for: {disaster_type.value}")

        if disaster_type == DisasterType.DATABASE_FAILURE:
            self._recover_database()
        elif disaster_type == DisasterType.APPLICATION_CRASH:
            self._recover_application()
        elif disaster_type == DisasterType.NETWORK_OUTAGE:
            self._recover_network()
        elif disaster_type == DisasterType.DATA_CORRUPTION:
            self._recover_from_corruption()
        elif disaster_type == DisasterType.COMPLETE_SITE_FAILURE:
            self._recover_site()

        # Wait for services to be ready
        self._wait_for_services()

        return datetime.now()

    def _recover_database(self):
        """Recover database from backup."""
        # Start database container
        subprocess.run([
            'docker', 'start', self.config['database_container']
        ], check=True)

        # Restore from backup if needed
        if self.config.get('restore_from_backup'):
            subprocess.run([
                'pg_restore',
                '-h', self.config['db_host'],
                '-U', self.config['db_user'],
                '-d', self.config['db_name'],
                self.config['backup_file']
            ], check=True)

    def _recover_application(self):
        """Recover application services."""
        subprocess.run([
            'docker', 'start', self.config['app_container']
        ], check=True)

    def _recover_network(self):
        """Recover network connectivity."""
        subprocess.run([
            'docker', 'network', 'connect',
            self.config['network_name'],
            self.config['app_container']
        ], check=True)

    def _recover_from_corruption(self):
        """Recover from data corruption using backup."""
        # Point-in-time recovery
        pass

    def _recover_site(self):
        """Recover entire site from DR site."""
        subprocess.run([
            'docker-compose', '-f', self.config['compose_file'],
            'up', '-d'
        ], check=True)

    def _wait_for_services(self, timeout: int = 300):
        """Wait for all services to be healthy."""
        start = time.time()

        while time.time() - start < timeout:
            try:
                response = requests.get(
                    f"{self.config['health_check_url']}",
                    timeout=5
                )
                if response.status_code == 200:
                    return
            except requests.RequestException:
                pass

            time.sleep(5)

        raise TimeoutError("Services did not recover within timeout")

    def verify_data_integrity(self) -> Dict[str, Any]:
        """Verify data integrity after recovery."""
        results = {
            'tables_verified': [],
            'row_counts_match': True,
            'checksums_match': True,
            'issues': []
        }

        # Compare row counts with expected values
        expected_counts = self.config.get('expected_row_counts', {})

        conn = psycopg2.connect(
            host=self.config['db_host'],
            database=self.config['db_name'],
            user=self.config['db_user'],
            password=self.config['db_password']
        )

        try:
            cursor = conn.cursor()

            for table, expected_count in expected_counts.items():
                cursor.execute(f"SELECT COUNT(*) FROM {table}")
                actual_count = cursor.fetchone()[0]

                if actual_count != expected_count:
                    results['row_counts_match'] = False
                    results['issues'].append(
                        f"{table}: expected {expected_count}, got {actual_count}"
                    )

                results['tables_verified'].append(table)

        finally:
            conn.close()

        return results

    def verify_service_availability(self) -> Dict[str, Any]:
        """Verify all services are available after recovery."""
        results = {
            'services_checked': [],
            'all_available': True,
            'issues': []
        }

        for service_name, url in self.config.get('service_urls', {}).items():
            try:
                response = requests.get(url, timeout=10)

                if response.status_code == 200:
                    results['services_checked'].append({
                        'name': service_name,
                        'status': 'available'
                    })
                else:
                    results['all_available'] = False
                    results['issues'].append(
                        f"{service_name}: status {response.status_code}"
                    )

            except requests.RequestException as e:
                results['all_available'] = False
                results['issues'].append(f"{service_name}: {str(e)}")

        return results

    def run_dr_test(
        self,
        test_name: str,
        disaster_type: DisasterType,
        rto_target: timedelta,
        rpo_target: timedelta
    ) -> DRTestResult:
        """Run a complete DR test."""
        notes = []

        # Record last backup time (for RPO calculation)
        last_backup_time = self._get_last_backup_time()
        notes.append(f"Last backup: {last_backup_time}")

        # Simulate disaster
        disaster_time = self.simulate_disaster(disaster_type)
        notes.append(f"Disaster simulated at: {disaster_time}")

        # Execute recovery
        recovery_complete_time = self.execute_recovery(disaster_type)
        notes.append(f"Recovery completed at: {recovery_complete_time}")

        # Calculate actual RTO and RPO
        rto_actual = recovery_complete_time - disaster_time
        rpo_actual = disaster_time - last_backup_time

        # Verify recovery
        data_integrity = self.verify_data_integrity()
        service_availability = self.verify_service_availability()

        # Determine if test passed
        passed = (
            rto_actual <= rto_target and
            rpo_actual <= rpo_target and
            data_integrity['row_counts_match'] and
            service_availability['all_available']
        )

        result = DRTestResult(
            test_name=test_name,
            disaster_type=disaster_type,
            start_time=disaster_time,
            recovery_time=recovery_complete_time,
            rto_target=rto_target,
            rto_actual=rto_actual,
            rpo_target=rpo_target,
            rpo_actual=rpo_actual,
            data_integrity_verified=data_integrity['row_counts_match'],
            service_availability_verified=service_availability['all_available'],
            passed=passed,
            notes=notes
        )

        self.results.append(result)
        return result

    def _get_last_backup_time(self) -> datetime:
        """Get the timestamp of the last backup."""
        # Implementation depends on backup system
        # This is a placeholder
        return datetime.now() - timedelta(hours=1)

    def generate_report(self) -> str:
        """Generate DR test report."""
        report = ["=" * 60]
        report.append("DISASTER RECOVERY TEST REPORT")
        report.append("=" * 60)
        report.append(f"Generated: {datetime.now().isoformat()}")
        report.append("")

        for result in self.results:
            report.append(f"Test: {result.test_name}")
            report.append(f"Disaster Type: {result.disaster_type.value}")
            report.append(f"Status: {'PASSED' if result.passed else 'FAILED'}")
            report.append(f"RTO Target: {result.rto_target}")
            report.append(f"RTO Actual: {result.rto_actual}")
            report.append(f"RPO Target: {result.rpo_target}")
            report.append(f"RPO Actual: {result.rpo_actual}")
            report.append(f"Data Integrity: {'OK' if result.data_integrity_verified else 'FAILED'}")
            report.append(f"Services: {'OK' if result.service_availability_verified else 'FAILED'}")
            report.append("-" * 40)

        return "\n".join(report)


# Example test suite
import pytest

class TestDisasterRecovery:
    """DR test suite."""

    @pytest.fixture
    def dr_framework(self):
        config = {
            'database_container': 'test-postgres',
            'app_container': 'test-app',
            'network_name': 'test-network',
            'compose_file': 'docker-compose.test.yml',
            'health_check_url': 'http://localhost:8080/health',
            'db_host': 'localhost',
            'db_name': 'testdb',
            'db_user': 'testuser',
            'db_password': 'testpass',
            'service_urls': {
                'api': 'http://localhost:8080/api/health',
                'web': 'http://localhost:3000/health'
            }
        }
        return DisasterRecoveryTestFramework(config)

    def test_database_failure_recovery(self, dr_framework):
        """Test recovery from database failure."""
        result = dr_framework.run_dr_test(
            test_name="Database Failure Recovery",
            disaster_type=DisasterType.DATABASE_FAILURE,
            rto_target=timedelta(minutes=30),
            rpo_target=timedelta(hours=1)
        )

        assert result.passed, f"DR test failed: {result.notes}"

    def test_application_crash_recovery(self, dr_framework):
        """Test recovery from application crash."""
        result = dr_framework.run_dr_test(
            test_name="Application Crash Recovery",
            disaster_type=DisasterType.APPLICATION_CRASH,
            rto_target=timedelta(minutes=15),
            rpo_target=timedelta(minutes=5)
        )

        assert result.passed, f"DR test failed: {result.notes}"
```

### Failover Testing

```python
class FailoverTestFramework:
    """Test automatic failover mechanisms."""

    def __init__(self, primary_url: str, secondary_url: str):
        self.primary_url = primary_url
        self.secondary_url = secondary_url

    def test_database_failover(
        self,
        primary_host: str,
        replica_host: str
    ) -> Dict[str, Any]:
        """Test database failover to replica."""
        results = {
            'failover_triggered': False,
            'failover_time': None,
            'data_consistent': False,
            'writes_restored': False
        }

        # Record current state
        primary_data_before = self._get_latest_data(primary_host)

        # Simulate primary failure
        start_time = datetime.now()
        self._stop_database(primary_host)

        # Wait for failover
        failover_complete = self._wait_for_failover(replica_host)
        if failover_complete:
            results['failover_triggered'] = True
            results['failover_time'] = (datetime.now() - start_time).total_seconds()

        # Verify data consistency
        replica_data = self._get_latest_data(replica_host)
        results['data_consistent'] = primary_data_before == replica_data

        # Test writes to new primary
        try:
            self._write_test_data(replica_host)
            results['writes_restored'] = True
        except Exception:
            pass

        return results

    def test_load_balancer_failover(self) -> Dict[str, Any]:
        """Test load balancer failover."""
        results = {
            'traffic_shifted': False,
            'response_time': None,
            'errors_during_failover': 0
        }

        # Make baseline requests
        self._verify_endpoint_health(self.primary_url)

        # Simulate primary failure
        start_time = datetime.now()
        self._stop_service('primary')

        # Test that traffic shifts to secondary
        errors = 0
        shifted = False

        for _ in range(30):
            try:
                response = requests.get(self.secondary_url, timeout=5)
                if response.status_code == 200:
                    shifted = True
                    break
            except requests.RequestException:
                errors += 1
            time.sleep(1)

        results['traffic_shifted'] = shifted
        results['response_time'] = (datetime.now() - start_time).total_seconds()
        results['errors_during_failover'] = errors

        return results

    def _stop_database(self, host: str):
        """Stop database on specified host."""
        pass  # Implementation depends on infrastructure

    def _wait_for_failover(self, replica_host: str, timeout: int = 60) -> bool:
        """Wait for failover to complete."""
        start = time.time()
        while time.time() - start < timeout:
            if self._is_database_primary(replica_host):
                return True
            time.sleep(1)
        return False

    def _is_database_primary(self, host: str) -> bool:
        """Check if database is accepting writes."""
        pass  # Implementation depends on database type

    def _get_latest_data(self, host: str):
        """Get latest data for consistency check."""
        pass

    def _write_test_data(self, host: str):
        """Write test data to verify write capability."""
        pass

    def _verify_endpoint_health(self, url: str) -> bool:
        """Verify endpoint is healthy."""
        response = requests.get(url, timeout=5)
        return response.status_code == 200

    def _stop_service(self, service_name: str):
        """Stop a service."""
        pass  # Implementation depends on infrastructure
```

## Best Practices

### DR Testing Checklist

```markdown
## Disaster Recovery Testing Checklist

### Pre-Test Preparation
- [ ] Define RTO and RPO objectives
- [ ] Document recovery procedures
- [ ] Identify critical systems
- [ ] Prepare test environment
- [ ] Notify stakeholders of test

### Backup Verification
- [ ] Backups are completing successfully
- [ ] Backup integrity is verified
- [ ] Backups can be restored
- [ ] Backup retention meets requirements
- [ ] Off-site backup is accessible

### Recovery Testing
- [ ] Database can be restored
- [ ] Application services can be restarted
- [ ] Configuration can be restored
- [ ] Data integrity is maintained
- [ ] Dependencies are handled correctly

### Failover Testing
- [ ] Automatic failover triggers correctly
- [ ] Manual failover procedure works
- [ ] Failback procedure works
- [ ] No data loss during failover
- [ ] Performance is acceptable after failover

### Documentation
- [ ] Recovery procedures are documented
- [ ] Runbooks are up to date
- [ ] Contact list is current
- [ ] Test results are recorded
- [ ] Lessons learned are captured
```

## Conclusion

Disaster recovery testing is essential for ensuring business continuity. By regularly testing backup procedures, failover mechanisms, and recovery processes, test automation professionals help organizations maintain resilience against catastrophic events.

## Key Takeaways

1. Define clear RTO and RPO objectives
2. Test different disaster scenarios
3. Automate DR testing where possible
4. Verify data integrity after recovery
5. Test failover mechanisms regularly
6. Document procedures and keep them updated
7. Conduct DR tests at least quarterly
