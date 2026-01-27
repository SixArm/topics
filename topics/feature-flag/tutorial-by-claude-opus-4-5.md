# Feature Flag: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Feature flags (also called feature toggles or feature switches) are a technique that allows teams to enable or disable features without deploying new code. For test automation professionals, feature flags present unique testing challenges and opportunities for controlling test scenarios.

## What is a Feature Flag?

A feature flag is a configuration mechanism that controls whether a feature is active in the application. Feature flags enable continuous deployment, A/B testing, gradual rollouts, and quick rollbacks.

### Feature Flag Categories

```
┌─────────────────────────────────────────────────────────────┐
│                    Feature Flag Types                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Release Flags:                                             │
│  └── Enable incomplete features in production               │
│      • Short-lived                                          │
│      • Binary on/off                                        │
│                                                             │
│  Experiment Flags:                                          │
│  └── A/B testing and experimentation                        │
│      • Compare variants                                     │
│      • Measure metrics                                      │
│                                                             │
│  Ops Flags:                                                 │
│  └── Control operational aspects                            │
│      • Circuit breakers                                     │
│      • Performance tuning                                   │
│                                                             │
│  Permission Flags:                                          │
│  └── Control access to features                             │
│      • Beta access                                          │
│      • Premium features                                     │
│                                                             │
│  Targeting Strategies:                                      │
│  ├── All users                                              │
│  ├── Percentage rollout                                     │
│  ├── User segment targeting                                 │
│  ├── Individual user targeting                              │
│  └── Environment-based                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Feature Flag Implementation

### Python Feature Flag System

```python
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
from enum import Enum
import hashlib

class FlagState(Enum):
    ON = "on"
    OFF = "off"

@dataclass
class User:
    id: str
    email: str
    attributes: Dict[str, Any]

@dataclass
class FeatureFlag:
    key: str
    name: str
    description: str
    default_state: FlagState
    enabled_percentage: int = 100
    enabled_user_ids: List[str] = None
    enabled_segments: List[str] = None

    def __post_init__(self):
        if self.enabled_user_ids is None:
            self.enabled_user_ids = []
        if self.enabled_segments is None:
            self.enabled_segments = []

class FeatureFlagService:
    """Service for managing feature flags."""

    def __init__(self):
        self._flags: Dict[str, FeatureFlag] = {}
        self._overrides: Dict[str, Dict[str, FlagState]] = {}  # flag_key -> user_id -> state

    def register_flag(self, flag: FeatureFlag):
        """Register a feature flag."""
        self._flags[flag.key] = flag

    def is_enabled(self, flag_key: str, user: Optional[User] = None) -> bool:
        """Check if a feature flag is enabled for a user."""
        flag = self._flags.get(flag_key)
        if not flag:
            return False

        # Check for user-specific override
        if user and flag_key in self._overrides:
            override = self._overrides[flag_key].get(user.id)
            if override:
                return override == FlagState.ON

        # Check default state
        if flag.default_state == FlagState.OFF:
            return False

        # No user context, use default
        if not user:
            return flag.default_state == FlagState.ON

        # Check if user is specifically enabled
        if user.id in flag.enabled_user_ids:
            return True

        # Check segment targeting
        user_segments = user.attributes.get('segments', [])
        if any(seg in flag.enabled_segments for seg in user_segments):
            return True

        # Check percentage rollout
        if flag.enabled_percentage < 100:
            return self._is_in_percentage(flag_key, user.id, flag.enabled_percentage)

        return True

    def _is_in_percentage(self, flag_key: str, user_id: str, percentage: int) -> bool:
        """Determine if user falls within percentage rollout."""
        hash_input = f"{flag_key}:{user_id}"
        hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
        bucket = hash_value % 100
        return bucket < percentage

    def set_override(self, flag_key: str, user_id: str, state: FlagState):
        """Set an override for a specific user."""
        if flag_key not in self._overrides:
            self._overrides[flag_key] = {}
        self._overrides[flag_key][user_id] = state

    def clear_overrides(self, flag_key: str = None):
        """Clear overrides for a flag or all flags."""
        if flag_key:
            self._overrides.pop(flag_key, None)
        else:
            self._overrides.clear()

    def get_all_flags(self, user: Optional[User] = None) -> Dict[str, bool]:
        """Get all flag states for a user."""
        return {
            key: self.is_enabled(key, user)
            for key in self._flags
        }


# Application code using feature flags
class CheckoutService:
    """Checkout service with feature flag integration."""

    def __init__(self, feature_flags: FeatureFlagService):
        self.flags = feature_flags

    def process_checkout(self, user: User, cart: Dict) -> Dict:
        """Process checkout with feature-flagged behavior."""
        result = {
            'items': cart['items'],
            'subtotal': cart['total']
        }

        # Feature: New payment processing
        if self.flags.is_enabled('new_payment_processor', user):
            result['processor'] = 'stripe_v2'
            result['fees'] = self._calculate_new_fees(cart['total'])
        else:
            result['processor'] = 'stripe_v1'
            result['fees'] = self._calculate_old_fees(cart['total'])

        # Feature: Express checkout
        if self.flags.is_enabled('express_checkout', user):
            result['express_available'] = True

        # Feature: Discount code engine
        if self.flags.is_enabled('new_discount_engine', user):
            result['discounts'] = self._apply_new_discounts(cart)
        else:
            result['discounts'] = self._apply_old_discounts(cart)

        return result

    def _calculate_new_fees(self, total: float) -> float:
        return total * 0.025  # 2.5%

    def _calculate_old_fees(self, total: float) -> float:
        return total * 0.03  # 3%

    def _apply_new_discounts(self, cart: Dict) -> float:
        return 0  # New logic

    def _apply_old_discounts(self, cart: Dict) -> float:
        return 0  # Old logic


# Testing with feature flags
import pytest

class TestCheckoutWithFeatureFlags:
    """Test checkout behavior under different feature flag configurations."""

    @pytest.fixture
    def feature_flags(self):
        service = FeatureFlagService()

        # Register flags
        service.register_flag(FeatureFlag(
            key='new_payment_processor',
            name='New Payment Processor',
            description='Use Stripe v2 API',
            default_state=FlagState.OFF
        ))

        service.register_flag(FeatureFlag(
            key='express_checkout',
            name='Express Checkout',
            description='Enable one-click checkout',
            default_state=FlagState.ON,
            enabled_percentage=50
        ))

        service.register_flag(FeatureFlag(
            key='new_discount_engine',
            name='New Discount Engine',
            description='Updated discount calculation',
            default_state=FlagState.ON,
            enabled_segments=['premium', 'beta_testers']
        ))

        return service

    @pytest.fixture
    def checkout_service(self, feature_flags):
        return CheckoutService(feature_flags)

    @pytest.fixture
    def regular_user(self):
        return User(
            id='user-123',
            email='regular@example.com',
            attributes={'segments': []}
        )

    @pytest.fixture
    def beta_user(self):
        return User(
            id='user-456',
            email='beta@example.com',
            attributes={'segments': ['beta_testers']}
        )

    @pytest.fixture
    def sample_cart(self):
        return {
            'items': [{'name': 'Widget', 'price': 100}],
            'total': 100.0
        }

    # Test flag OFF behavior
    def test_old_payment_processor_when_flag_off(
        self, checkout_service, regular_user, sample_cart
    ):
        """Test that old processor is used when flag is OFF."""
        result = checkout_service.process_checkout(regular_user, sample_cart)

        assert result['processor'] == 'stripe_v1'
        assert result['fees'] == 3.0  # 3% of 100

    # Test flag ON behavior
    def test_new_payment_processor_when_flag_on(
        self, checkout_service, feature_flags, regular_user, sample_cart
    ):
        """Test that new processor is used when flag is ON."""
        # Override flag for this test
        feature_flags.set_override(
            'new_payment_processor',
            regular_user.id,
            FlagState.ON
        )

        result = checkout_service.process_checkout(regular_user, sample_cart)

        assert result['processor'] == 'stripe_v2'
        assert result['fees'] == 2.5  # 2.5% of 100

    # Test segment targeting
    def test_beta_user_gets_new_discount_engine(
        self, checkout_service, beta_user, sample_cart
    ):
        """Test that beta users get new discount engine."""
        result = checkout_service.process_checkout(beta_user, sample_cart)

        # Beta users should have new discount engine
        # (implementation detail would show difference)
        assert 'discounts' in result

    # Test percentage rollout
    def test_express_checkout_percentage_rollout(
        self, feature_flags
    ):
        """Test that ~50% of users get express checkout."""
        enabled_count = 0
        total_users = 1000

        for i in range(total_users):
            user = User(
                id=f'user-{i}',
                email=f'user{i}@example.com',
                attributes={'segments': []}
            )
            if feature_flags.is_enabled('express_checkout', user):
                enabled_count += 1

        # Should be approximately 50% (with some variance)
        percentage = enabled_count / total_users * 100
        assert 40 < percentage < 60, f"Expected ~50%, got {percentage}%"

    # Test both states
    @pytest.mark.parametrize('flag_state,expected_processor', [
        (FlagState.ON, 'stripe_v2'),
        (FlagState.OFF, 'stripe_v1')
    ])
    def test_payment_processor_flag_states(
        self,
        checkout_service,
        feature_flags,
        regular_user,
        sample_cart,
        flag_state,
        expected_processor
    ):
        """Test both flag states for payment processor."""
        feature_flags.set_override(
            'new_payment_processor',
            regular_user.id,
            flag_state
        )

        result = checkout_service.process_checkout(regular_user, sample_cart)

        assert result['processor'] == expected_processor


class TestFeatureFlagService:
    """Unit tests for the feature flag service itself."""

    def test_flag_defaults_to_off_when_not_registered(self):
        """Test that unknown flags return False."""
        service = FeatureFlagService()
        assert service.is_enabled('unknown_flag') is False

    def test_override_takes_precedence(self):
        """Test that overrides take precedence over default."""
        service = FeatureFlagService()
        service.register_flag(FeatureFlag(
            key='test_flag',
            name='Test',
            description='Test flag',
            default_state=FlagState.OFF
        ))

        user = User(id='user-1', email='test@example.com', attributes={})

        # Default is OFF
        assert service.is_enabled('test_flag', user) is False

        # Override to ON
        service.set_override('test_flag', 'user-1', FlagState.ON)
        assert service.is_enabled('test_flag', user) is True

        # Clear override
        service.clear_overrides('test_flag')
        assert service.is_enabled('test_flag', user) is False

    def test_percentage_rollout_is_deterministic(self):
        """Test that same user always gets same result."""
        service = FeatureFlagService()
        service.register_flag(FeatureFlag(
            key='test_flag',
            name='Test',
            description='Test flag',
            default_state=FlagState.ON,
            enabled_percentage=50
        ))

        user = User(id='consistent-user', email='test@example.com', attributes={})

        results = [service.is_enabled('test_flag', user) for _ in range(100)]

        # All results should be the same
        assert len(set(results)) == 1
```

### TypeScript Feature Flag Testing

```typescript
// feature-flag.test.ts
describe('Feature Flag Testing', () => {
  let flagService: FeatureFlagService;

  beforeEach(() => {
    flagService = new FeatureFlagService();
  });

  afterEach(() => {
    flagService.clearOverrides();
  });

  describe('Testing with flags ON', () => {
    beforeEach(() => {
      flagService.setOverride('new_feature', FlagState.ON);
    });

    test('shows new feature UI', async () => {
      const result = renderComponent({ flagService });
      expect(result.getByTestId('new-feature')).toBeInTheDocument();
    });
  });

  describe('Testing with flags OFF', () => {
    beforeEach(() => {
      flagService.setOverride('new_feature', FlagState.OFF);
    });

    test('shows old feature UI', async () => {
      const result = renderComponent({ flagService });
      expect(result.queryByTestId('new-feature')).not.toBeInTheDocument();
      expect(result.getByTestId('old-feature')).toBeInTheDocument();
    });
  });

  describe('E2E tests with feature flags', () => {
    test('tests both flag variants', async ({ page }) => {
      // Test with flag OFF
      await page.goto('/?feature_flag=new_checkout:off');
      await expect(page.locator('.old-checkout')).toBeVisible();

      // Test with flag ON
      await page.goto('/?feature_flag=new_checkout:on');
      await expect(page.locator('.new-checkout')).toBeVisible();
    });
  });
});
```

## Best Practices

### Feature Flag Testing Checklist

```markdown
## Feature Flag Testing Best Practices

### Test Coverage
- [ ] Test behavior with flag ON
- [ ] Test behavior with flag OFF
- [ ] Test default state behavior
- [ ] Test segment targeting
- [ ] Test percentage rollout distribution
- [ ] Test override functionality

### Test Environment
- [ ] Have test utilities for flag manipulation
- [ ] Reset flags between tests
- [ ] Document flag dependencies
- [ ] Support flag overrides in CI/CD

### Maintenance
- [ ] Remove tests when flags are removed
- [ ] Track flag lifecycle (creation to removal)
- [ ] Audit stale flags regularly
- [ ] Document flag purposes

### Avoid
- [ ] Testing random percentage assignments (use deterministic seeds)
- [ ] Leaving flags in inconsistent states between tests
- [ ] Hardcoding flag states in tests
- [ ] Ignoring flag combinations
```

## Conclusion

Feature flags add flexibility to software delivery but require thoughtful testing strategies. Test automation professionals must test all flag states, understand targeting rules, and maintain tests as flags evolve through their lifecycle.

## Key Takeaways

1. Test both ON and OFF states for each flag
2. Use overrides in tests for deterministic behavior
3. Test segment and percentage targeting logic
4. Maintain tests as flags are added/removed
5. Document flag dependencies in tests
6. Clear flag state between tests
7. Consider flag combinations for complex features
