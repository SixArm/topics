# Load Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Load testing evaluates how a system performs under expected and peak user loads. For test automation professionals, load testing ensures applications can handle real-world traffic patterns, identifies bottlenecks before they affect users, and validates that performance meets service level agreements (SLAs).

## What is Load Testing?

Load testing simulates concurrent users and transactions to measure system behavior under load. It answers questions like "Can our system handle 10,000 concurrent users?" and "What happens to response times as load increases?"

### Load Testing Types

```
┌─────────────────────────────────────────────────────────────┐
│                 Performance Testing Types                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Load Testing:                                              │
│  └── Test under expected normal and peak loads              │
│      • Verify SLAs are met                                  │
│      • Identify performance baselines                       │
│                                                             │
│  Stress Testing:                                            │
│  └── Test beyond expected maximum load                      │
│      • Find breaking points                                 │
│      • Verify graceful degradation                          │
│                                                             │
│  Spike Testing:                                             │
│  └── Test sudden bursts of traffic                          │
│      • Simulate flash sales, viral events                   │
│      • Verify auto-scaling behavior                         │
│                                                             │
│  Soak/Endurance Testing:                                    │
│  └── Test sustained load over extended periods              │
│      • Detect memory leaks                                  │
│      • Identify resource exhaustion                         │
│                                                             │
│  Load Profile:                                              │
│         ▲                                                   │
│  Users  │    ╱──╲      Spike                                │
│         │   ╱    ╲                                          │
│         │  ╱  ╱───╲────────  Soak                          │
│         │ ╱  ╱                                              │
│         │╱──╱─────────────── Load                          │
│         └──────────────────► Time                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Load Testing with Python (Locust)

### Basic Load Test

```python
# locustfile.py

"""
Load testing with Locust - a Python load testing framework.
"""

from locust import HttpUser, task, between, events, tag
from locust.runners import MasterRunner
import json
import random
import time

class WebsiteUser(HttpUser):
    """Simulates a typical website user."""

    # Wait between 1-5 seconds between tasks
    wait_time = between(1, 5)

    # Base URL is set via command line or config
    # host = "http://localhost:8000"

    def on_start(self):
        """Called when a simulated user starts."""
        self.login()

    def login(self):
        """Authenticate the user."""
        response = self.client.post("/api/auth/login", json={
            "email": f"user{random.randint(1, 1000)}@example.com",
            "password": "testpassword"
        })
        if response.status_code == 200:
            self.token = response.json()["token"]
            self.client.headers.update({
                "Authorization": f"Bearer {self.token}"
            })

    @task(3)
    @tag('browse')
    def view_homepage(self):
        """Most common action: view homepage."""
        self.client.get("/")

    @task(2)
    @tag('browse')
    def view_products(self):
        """Browse product listing."""
        self.client.get("/api/products", params={
            "page": random.randint(1, 10),
            "limit": 20
        })

    @task(2)
    @tag('browse')
    def view_product_detail(self):
        """View a specific product."""
        product_id = random.randint(1, 100)
        self.client.get(f"/api/products/{product_id}")

    @task(1)
    @tag('browse')
    def search_products(self):
        """Search for products."""
        queries = ["laptop", "phone", "tablet", "headphones", "camera"]
        self.client.get("/api/search", params={
            "q": random.choice(queries),
            "limit": 10
        })

    @task(1)
    @tag('cart')
    def add_to_cart(self):
        """Add item to shopping cart."""
        self.client.post("/api/cart/items", json={
            "product_id": random.randint(1, 100),
            "quantity": random.randint(1, 3)
        })

    @task(1)
    @tag('cart')
    def view_cart(self):
        """View shopping cart."""
        self.client.get("/api/cart")


class CheckoutUser(HttpUser):
    """User that focuses on checkout flow."""

    wait_time = between(2, 8)
    weight = 1  # Lower weight = fewer of these users

    def on_start(self):
        """Setup: Login and add items to cart."""
        # Login
        response = self.client.post("/api/auth/login", json={
            "email": "checkout@example.com",
            "password": "testpassword"
        })
        if response.status_code == 200:
            self.token = response.json()["token"]
            self.client.headers.update({
                "Authorization": f"Bearer {self.token}"
            })

        # Add items to cart
        for _ in range(random.randint(1, 5)):
            self.client.post("/api/cart/items", json={
                "product_id": random.randint(1, 100),
                "quantity": 1
            })

    @task
    def complete_checkout(self):
        """Complete the full checkout flow."""
        # View cart
        self.client.get("/api/cart")

        # Apply discount (sometimes)
        if random.random() > 0.7:
            self.client.post("/api/cart/discount", json={
                "code": "SAVE10"
            })

        # Set shipping address
        self.client.post("/api/checkout/shipping", json={
            "address": "123 Test St",
            "city": "Test City",
            "state": "TS",
            "zip": "12345"
        })

        # Submit order
        with self.client.post("/api/checkout/submit",
                              catch_response=True) as response:
            if response.status_code == 201:
                response.success()
            elif response.status_code == 402:
                response.failure("Payment failed")
            else:
                response.failure(f"Unexpected status: {response.status_code}")
```

### Advanced Load Test Patterns

```python
# advanced_locustfile.py

"""
Advanced load testing patterns with Locust.
"""

from locust import HttpUser, task, between, events, LoadTestShape
from locust.runners import MasterRunner
import math
import time

# Custom load shape: ramp up, sustain, ramp down
class StagesShape(LoadTestShape):
    """Custom load shape with multiple stages."""

    stages = [
        {"duration": 60,  "users": 10,  "spawn_rate": 2},   # Warm up
        {"duration": 120, "users": 50,  "spawn_rate": 5},   # Ramp up
        {"duration": 300, "users": 100, "spawn_rate": 10},  # Peak load
        {"duration": 60,  "users": 50,  "spawn_rate": 5},   # Cool down
        {"duration": 60,  "users": 0,   "spawn_rate": 10},  # Ramp down
    ]

    def tick(self):
        run_time = self.get_run_time()

        for stage in self.stages:
            if run_time < stage["duration"]:
                tick_data = (stage["users"], stage["spawn_rate"])
                return tick_data
            run_time -= stage["duration"]

        return None  # Stop the test


# Spike test shape
class SpikeShape(LoadTestShape):
    """Simulate a traffic spike."""

    def tick(self):
        run_time = self.get_run_time()

        if run_time < 60:
            # Normal load
            return (20, 5)
        elif run_time < 90:
            # Spike!
            return (200, 50)
        elif run_time < 150:
            # Return to normal
            return (20, 10)
        elif run_time < 300:
            # Sustained normal
            return (20, 5)
        else:
            return None


# Custom event listeners for reporting
@events.request.add_listener
def on_request(request_type, name, response_time, response_length,
               exception, context, **kwargs):
    """Custom request listener for detailed logging."""
    if response_time > 2000:  # Log slow requests
        print(f"SLOW: {request_type} {name} took {response_time}ms")

    if exception:
        print(f"ERROR: {request_type} {name} - {exception}")


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    """Called when load test starts."""
    print("Load test starting...")

    if isinstance(environment.runner, MasterRunner):
        print(f"Running distributed with {environment.runner.worker_count} workers")


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    """Called when load test stops."""
    stats = environment.runner.stats
    print("\n" + "=" * 60)
    print("Load Test Results Summary")
    print("=" * 60)

    for entry in stats.entries.values():
        print(f"\n{entry.method} {entry.name}")
        print(f"  Requests: {entry.num_requests}")
        print(f"  Failures: {entry.num_failures}")
        print(f"  Median:   {entry.median_response_time}ms")
        print(f"  95th %:   {entry.get_response_time_percentile(0.95)}ms")
        print(f"  99th %:   {entry.get_response_time_percentile(0.99)}ms")
        print(f"  Avg:      {entry.avg_response_time:.0f}ms")


# Performance assertions in tests
import pytest

class TestLoadResults:
    """Verify load test results meet SLAs."""

    def test_response_time_under_sla(self, load_test_results):
        """Verify response times are within SLA."""
        for endpoint, metrics in load_test_results.items():
            assert metrics['p95'] < 2000, \
                f"{endpoint} p95 ({metrics['p95']}ms) exceeds 2000ms SLA"

    def test_error_rate_acceptable(self, load_test_results):
        """Verify error rate is below threshold."""
        for endpoint, metrics in load_test_results.items():
            error_rate = metrics['failures'] / metrics['total'] * 100
            assert error_rate < 1.0, \
                f"{endpoint} error rate ({error_rate:.2f}%) exceeds 1% threshold"

    def test_throughput_meets_target(self, load_test_results):
        """Verify throughput meets minimum requirements."""
        total_rps = sum(m['rps'] for m in load_test_results.values())
        assert total_rps >= 100, \
            f"Total throughput ({total_rps:.1f} RPS) below 100 RPS target"
```

## JavaScript Load Testing (k6)

```javascript
// load-test.js (k6)

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const loginDuration = new Trend('login_duration');
const orderCounter = new Counter('orders_created');

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp up
    { duration: '3m', target: 50 },   // Ramp to peak
    { duration: '5m', target: 50 },   // Stay at peak
    { duration: '1m', target: 0 },    // Ramp down
  ],

  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.01'],
    errors: ['rate<0.05'],
    login_duration: ['p(95)<1000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

export default function () {
  group('User Flow', () => {
    // Login
    group('Login', () => {
      const loginStart = Date.now();
      const loginRes = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
        email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        password: 'testpassword',
      }), {
        headers: { 'Content-Type': 'application/json' },
      });

      loginDuration.add(Date.now() - loginStart);

      check(loginRes, {
        'login successful': (r) => r.status === 200,
        'has token': (r) => r.json('token') !== undefined,
      }) || errorRate.add(1);

      if (loginRes.status !== 200) return;

      const token = loginRes.json('token');
      const authHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      sleep(1);

      // Browse products
      group('Browse Products', () => {
        const productsRes = http.get(`${BASE_URL}/api/products?page=1&limit=20`, {
          headers: authHeaders,
        });

        check(productsRes, {
          'products loaded': (r) => r.status === 200,
          'has products': (r) => r.json('data').length > 0,
        }) || errorRate.add(1);
      });

      sleep(2);

      // View product detail
      group('Product Detail', () => {
        const productId = Math.floor(Math.random() * 100) + 1;
        const detailRes = http.get(`${BASE_URL}/api/products/${productId}`, {
          headers: authHeaders,
        });

        check(detailRes, {
          'product detail loaded': (r) => r.status === 200,
        }) || errorRate.add(1);
      });

      sleep(1);

      // Add to cart
      group('Add to Cart', () => {
        const cartRes = http.post(`${BASE_URL}/api/cart/items`, JSON.stringify({
          product_id: Math.floor(Math.random() * 100) + 1,
          quantity: 1,
        }), {
          headers: authHeaders,
        });

        check(cartRes, {
          'item added to cart': (r) => r.status === 200 || r.status === 201,
        }) || errorRate.add(1);
      });
    });
  });

  sleep(Math.random() * 3 + 1);
}

// Handle test summary
export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: '  ', enableColors: true }),
  };
}

function textSummary(data, options) {
  const metrics = data.metrics;
  let output = '\n=== Load Test Summary ===\n';

  if (metrics.http_req_duration) {
    output += `\nResponse Time:\n`;
    output += `  Median: ${metrics.http_req_duration.values.med.toFixed(0)}ms\n`;
    output += `  P95:    ${metrics.http_req_duration.values['p(95)'].toFixed(0)}ms\n`;
    output += `  P99:    ${metrics.http_req_duration.values['p(99)'].toFixed(0)}ms\n`;
  }

  if (metrics.http_req_failed) {
    output += `\nError Rate: ${(metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n`;
  }

  if (metrics.http_reqs) {
    output += `\nThroughput: ${metrics.http_reqs.values.rate.toFixed(1)} req/s\n`;
  }

  return output;
}
```

## Best Practices

### Load Testing Checklist

```markdown
## Load Testing Best Practices

### Planning
- [ ] Define clear performance SLAs
- [ ] Identify realistic load profiles
- [ ] Determine test duration and ramp-up
- [ ] Plan for different load patterns (normal, peak, spike)
- [ ] Use production-like test environments

### Execution
- [ ] Warm up systems before measuring
- [ ] Run tests from multiple geographic locations
- [ ] Monitor system resources during tests
- [ ] Test with realistic data volumes
- [ ] Include think time between actions

### Analysis
- [ ] Analyze percentile response times (p50, p95, p99)
- [ ] Check error rates under load
- [ ] Identify bottlenecks (CPU, memory, DB, network)
- [ ] Compare results against baselines
- [ ] Document findings and recommendations

### CI/CD Integration
- [ ] Run load tests in CI/CD pipeline
- [ ] Set automated pass/fail thresholds
- [ ] Track performance trends over time
- [ ] Alert on performance regressions
- [ ] Store results for historical comparison
```

## Conclusion

Load testing is essential for ensuring applications perform well under real-world conditions. By simulating realistic user behavior, identifying performance bottlenecks, and validating SLAs, test automation professionals help deliver systems that meet performance expectations.

## Key Takeaways

1. Load testing validates system performance under expected loads
2. Use realistic user behavior patterns and think times
3. Measure percentile response times, not just averages
4. Set clear SLAs and automated pass/fail thresholds
5. Monitor system resources during load tests
6. Run different load patterns (normal, peak, spike, soak)
7. Integrate load tests into CI/CD pipelines
