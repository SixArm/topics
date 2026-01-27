# One Person's Constant Is Another Person's Variable: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

The aphorism "One person's constant is another person's variable" captures a fundamental truth in software engineering and test automation: what one developer treats as a fixed, immutable value may be dynamic, configurable, or environment-dependent to another. This principle has profound implications for test automation professionals. Hardcoded URLs, database credentials, timeout values, feature flags, locale settings, and file paths that work perfectly in one environment can cause cascading test failures in another. Understanding this concept helps testers build resilient, portable, and maintainable test suites that work across development, staging, and production environments without brittle assumptions.

## What is "One Person's Constant Is Another Person's Variable"?

This principle originated in the programming language community and is often attributed to Alan Perlis. It highlights perspective-dependent assumptions in software: a value that one team member considers fixed and unchanging may need to be flexible for another team member, another environment, or another deployment context.

In test automation, this manifests when tests contain hardcoded values that assume a specific environment, dataset, or configuration. These hidden assumptions create fragile tests that break when run outside their original context.

### The Spectrum of Variability

```
┌─────────────────────────────────────────────────────────────┐
│          One Person's Constant, Another's Variable          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Developer A's View          Developer B's View             │
│  (Constant)                  (Variable)                     │
│                                                             │
│  BASE_URL = "localhost"  --> Differs per environment         │
│  TIMEOUT = 5000          --> Differs per network speed       │
│  DB_NAME = "testdb"      --> Differs per team/branch        │
│  LOCALE = "en-US"        --> Differs per market              │
│  API_VERSION = "v2"      --> Differs per deployment          │
│  RETRY_COUNT = 3         --> Differs per SLA                 │
│                                                             │
│  The Variability Spectrum:                                  │
│                                                             │
│  Truly Fixed    Context-    Environment-    Fully            │
│  Constants      Dependent   Dependent       Dynamic          │
│       │              │            │             │            │
│       ▼              ▼            ▼             ▼            │
│    Math.PI      Date format   API endpoint  User input      │
│    HTTP 200     Currency      DB connection Feature flags    │
│    true/false   Timezone      Credentials   A/B variants    │
│                                                             │
│  ◄─── Safer to hardcode          Must externalize ───►      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Common Problem Areas in Test Automation

```
┌─────────────────────────────────────────────────────────────┐
│           Where Constants Become Variables                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test Environment:                                          │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│  │   Dev    │   │ Staging  │   │   Prod   │               │
│  │localhost │   │stage.app │   │ prod.app │               │
│  │port 3000 │   │port 443  │   │port 443  │               │
│  │ testdb   │   │stagedb   │   │ proddb   │               │
│  │ no auth  │   │basic auth│   │OAuth 2.0 │               │
│  └──────────┘   └──────────┘   └──────────┘               │
│       │              │              │                       │
│       └──────────────┼──────────────┘                       │
│                      ▼                                      │
│            Same tests must work                             │
│            across all three                                 │
│                                                             │
│  Cross-Cutting Concerns:                                    │
│  ├── Timeouts (network speed varies)                        │
│  ├── Data (test data differs per env)                       │
│  ├── Feature flags (enabled/disabled)                       │
│  ├── Third-party services (sandbox vs live)                 │
│  └── Locale/region (date, currency, language)               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementation: Python with pytest

### Anti-Pattern: Hardcoded Constants

```python
# test_hardcoded_bad.py

"""
ANTI-PATTERN: Tests with hardcoded assumptions.
These tests work on the original developer's machine but fail elsewhere.
"""

import requests
import pytest


class TestHardcodedAntiPattern:
    """These tests embed environment-specific assumptions."""

    def test_api_returns_user(self):
        # BAD: Hardcoded URL assumes local development server
        response = requests.get("http://localhost:3000/api/users/1")
        assert response.status_code == 200

        user = response.json()
        # BAD: Hardcoded expected value assumes specific test data
        assert user["email"] == "admin@testcompany.com"

    def test_database_connection(self):
        import psycopg2

        # BAD: Hardcoded credentials and host
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            dbname="myapp_test",
            user="postgres",
            password="postgres"
        )
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users")
        count = cursor.fetchone()[0]

        # BAD: Assumes specific seed data count
        assert count == 42

    def test_file_upload(self):
        # BAD: Hardcoded file path that only exists on one machine
        with open("/Users/developer/testdata/sample.pdf", "rb") as f:
            response = requests.post(
                "http://localhost:3000/api/upload",
                files={"file": f}
            )
        assert response.status_code == 201

    def test_date_formatting(self):
        from datetime import datetime

        now = datetime.now()
        # BAD: Assumes US date format; fails for European locales
        formatted = now.strftime("%m/%d/%Y")
        assert "/" in formatted
        # BAD: Assumes specific timezone
        assert now.hour >= 0
```

### Best Practice: Externalized Configuration

```python
# conftest.py

"""
Externalized configuration for test automation.
Values that vary across environments are loaded from config files,
environment variables, or command-line options.
"""

import os
import json
import pytest
from pathlib import Path
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class TestConfig:
    """Centralized test configuration with sensible defaults."""

    # Environment-dependent values with defaults
    base_url: str = "http://localhost:3000"
    api_version: str = "v2"
    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "myapp_test"
    db_user: str = "postgres"
    db_password: str = "postgres"

    # Timing values that vary by network/environment
    default_timeout: int = 5000
    page_load_timeout: int = 10000
    api_timeout: int = 3000

    # Locale settings
    locale: str = "en-US"
    timezone: str = "UTC"
    currency: str = "USD"

    # Feature flags
    features: dict = field(default_factory=dict)

    @classmethod
    def from_environment(cls) -> "TestConfig":
        """Load configuration from environment variables."""
        config = cls()
        config.base_url = os.getenv("TEST_BASE_URL", config.base_url)
        config.api_version = os.getenv("TEST_API_VERSION", config.api_version)
        config.db_host = os.getenv("TEST_DB_HOST", config.db_host)
        config.db_port = int(os.getenv("TEST_DB_PORT", str(config.db_port)))
        config.db_name = os.getenv("TEST_DB_NAME", config.db_name)
        config.db_user = os.getenv("TEST_DB_USER", config.db_user)
        config.db_password = os.getenv("TEST_DB_PASSWORD", config.db_password)
        config.default_timeout = int(
            os.getenv("TEST_TIMEOUT", str(config.default_timeout))
        )
        config.locale = os.getenv("TEST_LOCALE", config.locale)
        config.timezone = os.getenv("TEST_TIMEZONE", config.timezone)

        # Load feature flags
        flags_json = os.getenv("TEST_FEATURE_FLAGS", "{}")
        config.features = json.loads(flags_json)

        return config

    @classmethod
    def from_file(cls, path: str) -> "TestConfig":
        """Load configuration from a JSON file."""
        with open(path) as f:
            data = json.load(f)
        return cls(**data)

    @property
    def api_base(self) -> str:
        return f"{self.base_url}/api/{self.api_version}"


@pytest.fixture(scope="session")
def config() -> TestConfig:
    """Provide test configuration based on environment."""
    config_file = os.getenv("TEST_CONFIG_FILE")
    if config_file and Path(config_file).exists():
        return TestConfig.from_file(config_file)
    return TestConfig.from_environment()


@pytest.fixture(scope="session")
def api_client(config):
    """Provide a configured API client."""
    import requests

    session = requests.Session()
    session.headers.update({
        "Accept": "application/json",
        "Content-Type": "application/json",
    })

    # Set base URL on the session for convenience
    session._base_url = config.api_base
    original_request = session.request

    def patched_request(method, url, **kwargs):
        if not url.startswith("http"):
            url = f"{config.api_base}{url}"
        kwargs.setdefault("timeout", config.api_timeout / 1000)
        return original_request(method, url, **kwargs)

    session.request = patched_request
    return session


@pytest.fixture
def test_data_dir():
    """Provide path to test data directory relative to project root."""
    return Path(__file__).parent / "testdata"
```

### Resilient Tests Using Configuration

```python
# test_with_config.py

"""
Tests that properly externalize variable values.
These tests work across environments by reading configuration
rather than hardcoding assumptions.
"""

import pytest
import requests
from pathlib import Path


class TestUserAPI:
    """User API tests that work across environments."""

    def test_api_returns_user(self, api_client, config):
        """Test user retrieval without hardcoded URLs or data."""
        response = api_client.get("/users/1")
        assert response.status_code == 200

        user = response.json()
        # Assert structure, not specific values
        assert "email" in user
        assert "@" in user["email"]
        assert "id" in user

    def test_api_timeout_is_respected(self, config):
        """Test that API timeout is configurable, not hardcoded."""
        timeout_seconds = config.api_timeout / 1000

        try:
            response = requests.get(
                f"{config.api_base}/users/1",
                timeout=timeout_seconds
            )
            assert response.status_code == 200
        except requests.Timeout:
            pytest.fail(
                f"API did not respond within {timeout_seconds}s timeout "
                f"(configured via TEST_TIMEOUT)"
            )

    def test_api_respects_locale(self, api_client, config):
        """Test locale-dependent behavior with configurable locale."""
        response = api_client.get(
            "/users/1/profile",
            headers={"Accept-Language": config.locale}
        )
        assert response.status_code == 200
        profile = response.json()

        # Verify locale-specific formatting without hardcoding format
        assert "formatted_date" in profile
        assert "currency_symbol" in profile


class TestFeatureFlags:
    """Tests that handle feature flag variability."""

    def test_feature_gated_endpoint(self, api_client, config):
        """Test behavior depends on feature flag state."""
        response = api_client.get("/dashboard")
        assert response.status_code == 200

        data = response.json()

        if config.features.get("new_dashboard", False):
            assert "widgets" in data
            assert "layout" in data
        else:
            assert "panels" in data

    def test_skip_if_feature_disabled(self, api_client, config):
        """Skip test when required feature is not enabled."""
        if not config.features.get("beta_search", False):
            pytest.skip("beta_search feature not enabled in this environment")

        response = api_client.get("/search/beta?q=test")
        assert response.status_code == 200


class TestFileOperations:
    """Tests that use relative paths, not absolute hardcoded paths."""

    def test_file_upload(self, api_client, test_data_dir):
        """Use project-relative test data, not absolute paths."""
        sample_file = test_data_dir / "sample.pdf"

        if not sample_file.exists():
            pytest.skip(f"Test data file not found: {sample_file}")

        with open(sample_file, "rb") as f:
            response = api_client.post(
                "/upload",
                files={"file": f}
            )
        assert response.status_code == 201

    def test_config_file_parsing(self, test_data_dir):
        """Test config parsing with portable test data."""
        import json

        config_file = test_data_dir / "sample_config.json"
        if not config_file.exists():
            pytest.skip(f"Test config not found: {config_file}")

        with open(config_file) as f:
            data = json.load(f)

        assert isinstance(data, dict)
        assert "version" in data


class TestDatabaseAssumptions:
    """Tests that avoid hardcoded database assumptions."""

    @pytest.fixture
    def db_connection(self, config):
        """Create database connection from configuration."""
        import psycopg2

        conn = psycopg2.connect(
            host=config.db_host,
            port=config.db_port,
            dbname=config.db_name,
            user=config.db_user,
            password=config.db_password,
        )
        yield conn
        conn.close()

    def test_users_table_exists(self, db_connection):
        """Verify table structure, not specific data counts."""
        cursor = db_connection.cursor()
        cursor.execute(
            "SELECT column_name FROM information_schema.columns "
            "WHERE table_name = 'users'"
        )
        columns = [row[0] for row in cursor.fetchall()]

        # Assert structure, not data
        assert "id" in columns
        assert "email" in columns
        assert "created_at" in columns

    def test_users_table_not_empty(self, db_connection):
        """Verify data exists without assuming exact count."""
        cursor = db_connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM users")
        count = cursor.fetchone()[0]

        # Assert minimum, not exact value
        assert count > 0, "Users table should have at least one record"
```

### Environment-Specific Configuration Files

```python
# config/test_config_dev.json
"""
{
    "base_url": "http://localhost:3000",
    "api_version": "v2",
    "db_host": "localhost",
    "db_port": 5432,
    "db_name": "myapp_test",
    "default_timeout": 5000,
    "locale": "en-US",
    "timezone": "America/New_York",
    "features": {
        "new_dashboard": true,
        "beta_search": true
    }
}
"""

# config/test_config_staging.json
"""
{
    "base_url": "https://staging.myapp.com",
    "api_version": "v2",
    "db_host": "staging-db.internal",
    "db_port": 5432,
    "db_name": "myapp_staging",
    "default_timeout": 10000,
    "locale": "en-US",
    "timezone": "UTC",
    "features": {
        "new_dashboard": true,
        "beta_search": false
    }
}
"""

# Running tests with different configs:
# TEST_CONFIG_FILE=config/test_config_dev.json pytest
# TEST_CONFIG_FILE=config/test_config_staging.json pytest
# TEST_BASE_URL=https://staging.myapp.com pytest
```

## Implementation: JavaScript/TypeScript with Jest and Playwright

### Anti-Pattern: Hardcoded Values in JavaScript Tests

```typescript
// tests/hardcoded-bad.test.ts

/**
 * ANTI-PATTERN: Hardcoded assumptions in tests.
 */

describe('User API - Hardcoded Anti-Pattern', () => {
  // BAD: Hardcoded URL
  const API_URL = 'http://localhost:3000/api/v2';

  test('should fetch user', async () => {
    const response = await fetch(`${API_URL}/users/1`);
    const user = await response.json();

    // BAD: Hardcoded expected email
    expect(user.email).toBe('admin@testcompany.com');

    // BAD: Hardcoded date format assumption
    expect(user.created_at).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  test('should timeout appropriately', async () => {
    // BAD: Hardcoded timeout
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_URL}/slow-endpoint`, {
      signal: controller.signal,
    });
    expect(response.ok).toBe(true);
  });
});
```

### Best Practice: Configurable Test Setup

```typescript
// config/test-config.ts

/**
 * Centralized test configuration that externalizes variable values.
 */

export interface TestConfig {
  baseUrl: string;
  apiVersion: string;
  timeouts: {
    default: number;
    pageLoad: number;
    apiCall: number;
  };
  locale: string;
  timezone: string;
  features: Record<string, boolean>;
  auth: {
    username: string;
    password: string;
  };
}

function loadConfig(): TestConfig {
  // Default configuration
  const defaults: TestConfig = {
    baseUrl: 'http://localhost:3000',
    apiVersion: 'v2',
    timeouts: {
      default: 5000,
      pageLoad: 10000,
      apiCall: 3000,
    },
    locale: 'en-US',
    timezone: 'UTC',
    features: {},
    auth: {
      username: 'testuser',
      password: 'testpassword',
    },
  };

  // Override from environment variables
  return {
    ...defaults,
    baseUrl: process.env.TEST_BASE_URL || defaults.baseUrl,
    apiVersion: process.env.TEST_API_VERSION || defaults.apiVersion,
    timeouts: {
      default: parseInt(process.env.TEST_TIMEOUT || String(defaults.timeouts.default)),
      pageLoad: parseInt(
        process.env.TEST_PAGE_LOAD_TIMEOUT || String(defaults.timeouts.pageLoad)
      ),
      apiCall: parseInt(
        process.env.TEST_API_TIMEOUT || String(defaults.timeouts.apiCall)
      ),
    },
    locale: process.env.TEST_LOCALE || defaults.locale,
    timezone: process.env.TEST_TIMEZONE || defaults.timezone,
    features: process.env.TEST_FEATURE_FLAGS
      ? JSON.parse(process.env.TEST_FEATURE_FLAGS)
      : defaults.features,
    auth: {
      username: process.env.TEST_AUTH_USER || defaults.auth.username,
      password: process.env.TEST_AUTH_PASSWORD || defaults.auth.password,
    },
  };
}

export const config = loadConfig();

export function apiUrl(path: string): string {
  return `${config.baseUrl}/api/${config.apiVersion}${path}`;
}
```

### Jest Tests with Externalized Configuration

```typescript
// tests/user-api.test.ts

/**
 * Tests that use externalized configuration.
 * Same tests work across dev, staging, and production environments.
 */

import { config, apiUrl } from '../config/test-config';

describe('User API - Configurable', () => {
  test('should fetch user with correct structure', async () => {
    const response = await fetch(apiUrl('/users/1'), {
      signal: AbortSignal.timeout(config.timeouts.apiCall),
    });
    expect(response.status).toBe(200);

    const user = await response.json();

    // Assert structure, not specific values
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user.email).toMatch(/.+@.+\..+/);
    expect(user).toHaveProperty('created_at');
  });

  test('should respect configured timeout', async () => {
    const start = Date.now();

    try {
      await fetch(apiUrl('/users/1'), {
        signal: AbortSignal.timeout(config.timeouts.apiCall),
      });
    } catch (error) {
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThanOrEqual(config.timeouts.apiCall + 500);
    }
  });

  test('should handle locale-specific responses', async () => {
    const response = await fetch(apiUrl('/users/1/profile'), {
      headers: { 'Accept-Language': config.locale },
      signal: AbortSignal.timeout(config.timeouts.apiCall),
    });
    expect(response.status).toBe(200);

    const profile = await response.json();
    expect(profile).toHaveProperty('formatted_date');
    expect(profile).toHaveProperty('currency_symbol');
  });

  describe('Feature-flagged functionality', () => {
    const shouldRunBetaTests = config.features['beta_search'] === true;

    (shouldRunBetaTests ? test : test.skip)(
      'should support beta search when feature is enabled',
      async () => {
        const response = await fetch(apiUrl('/search/beta?q=test'), {
          signal: AbortSignal.timeout(config.timeouts.apiCall),
        });
        expect(response.status).toBe(200);
      }
    );
  });
});
```

### Playwright Tests with Environment Awareness

```typescript
// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

const config = {
  baseUrl: process.env.TEST_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
  locale: process.env.TEST_LOCALE || 'en-US',
  timezone: process.env.TEST_TIMEZONE || 'America/New_York',
};

export default defineConfig({
  testDir: './e2e',
  timeout: config.timeout,
  use: {
    baseURL: config.baseUrl,
    locale: config.locale,
    timezoneId: config.timezone,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

```typescript
// e2e/dashboard.spec.ts

import { test, expect } from '@playwright/test';

/**
 * Environment-aware Playwright tests that avoid hardcoded assumptions.
 */

// Load feature flags from environment
const features = process.env.TEST_FEATURE_FLAGS
  ? JSON.parse(process.env.TEST_FEATURE_FLAGS)
  : {};

test.describe('Dashboard', () => {
  test('should load dashboard appropriate for environment', async ({ page }) => {
    await page.goto('/dashboard');

    // Assert on structure, not hardcoded content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="main-content"]')).toBeVisible();

    // Feature-flag aware assertions
    if (features['new_dashboard']) {
      await expect(page.locator('[data-testid="widget-grid"]')).toBeVisible();
    } else {
      await expect(page.locator('[data-testid="panel-list"]')).toBeVisible();
    }
  });

  test('should display dates in configured locale format', async ({ page }) => {
    await page.goto('/dashboard');

    const dateElement = page.locator('[data-testid="last-updated"]');
    await expect(dateElement).toBeVisible();

    const dateText = await dateElement.textContent();
    // Assert date is present and non-empty, not a specific format
    expect(dateText).toBeTruthy();
    expect(dateText!.length).toBeGreaterThan(0);
  });

  test('should handle different viewport sizes', async ({ page }) => {
    // Viewport is configured per project, not hardcoded
    await page.goto('/dashboard');

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      // Mobile layout assertions
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    } else {
      // Desktop layout assertions
      await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
    }
  });

  test('should adapt to authentication method', async ({ page, baseURL }) => {
    const authMethod = process.env.TEST_AUTH_METHOD || 'basic';

    if (authMethod === 'oauth') {
      // OAuth flow
      await page.goto('/auth/login');
      await page.click('[data-testid="oauth-login"]');
      // Handle OAuth redirect
    } else {
      // Basic auth flow
      await page.goto('/login');
      await page.fill('[data-testid="username"]',
        process.env.TEST_AUTH_USER || 'testuser');
      await page.fill('[data-testid="password"]',
        process.env.TEST_AUTH_PASSWORD || 'testpassword');
      await page.click('[data-testid="login-button"]');
    }

    await expect(page).toHaveURL(/.*dashboard/);
  });
});
```

## Best Practices

### Configuration Management Checklist

```markdown
## One Person's Constant Is Another Person's Variable - Best Practices

### Identifying Hidden Constants
- [ ] Audit tests for hardcoded URLs, ports, and hostnames
- [ ] Search for hardcoded credentials and API keys
- [ ] Find hardcoded file paths (especially absolute paths)
- [ ] Identify hardcoded timeout and wait values
- [ ] Check for locale-specific date/time/currency formats
- [ ] Look for hardcoded test data (emails, IDs, counts)
- [ ] Review feature-flag assumptions

### Externalizing Configuration
- [ ] Use environment variables with sensible defaults
- [ ] Support configuration files per environment
- [ ] Use a centralized configuration module/fixture
- [ ] Document all configurable values and their defaults
- [ ] Provide example configuration for each environment

### Writing Resilient Assertions
- [ ] Assert structure and type, not specific values
- [ ] Use range checks instead of exact comparisons
- [ ] Assert minimum counts rather than exact counts
- [ ] Use pattern matching for format validation
- [ ] Make tests self-contained with setup/teardown

### Environment Portability
- [ ] Use relative paths from project root for test data
- [ ] Support multiple authentication methods
- [ ] Handle feature flags gracefully (skip or adapt)
- [ ] Use dynamic waits instead of fixed sleeps
- [ ] Test locally, in CI/CD, and against staging

### Team Practices
- [ ] Document what is configurable and why
- [ ] Review tests for hidden assumptions in code reviews
- [ ] Maintain per-environment configuration files in version control
- [ ] Use CI/CD variables for environment-specific values
- [ ] Run tests against multiple environments regularly
```

## Conclusion

The principle "One person's constant is another person's variable" is a crucial lens for test automation professionals. By recognizing that values which seem fixed in one context may be dynamic in another, testers can build suites that are portable, resilient, and maintainable. The key is to externalize environment-dependent values into configuration, assert on structure rather than specific data, and design tests that adapt to their execution context. When teams adopt this mindset, test failures from environment mismatches disappear, CI/CD pipelines become more reliable, and tests provide genuine confidence regardless of where they run.

## Key Takeaways

1. Hardcoded values are the leading cause of environment-specific test failures; audit your test suite for hidden assumptions about URLs, credentials, timeouts, and data
2. Use a centralized configuration module that loads values from environment variables with sensible defaults, so the same tests run unchanged across dev, staging, and production
3. Assert on structure, types, and patterns rather than exact values; check that an email field contains an "@" sign rather than comparing to a specific address
4. Feature flags create branching behavior that tests must handle gracefully, either by adapting assertions or skipping tests that require unavailable features
5. File paths in tests should always be relative to the project root, never absolute paths tied to a specific developer's machine
6. Timeouts and wait values should be configurable because network speed, server performance, and CI runner capabilities differ dramatically across environments
7. Treat test configuration as a first-class concern with dedicated modules, documentation, and per-environment files checked into version control
