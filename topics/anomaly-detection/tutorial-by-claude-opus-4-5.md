# Anomaly Detection: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Anomaly detection identifies patterns in data that deviate significantly from expected behavior. For test automation professionals, anomaly detection enables intelligent test monitoring, automated issue identification, and proactive quality assurance by flagging unusual patterns in test results, performance metrics, and system behavior.

## What is Anomaly Detection?

Anomaly detection, also called outlier detection, finds data points that differ markedly from the norm. In test automation, this means automatically identifying:

- Unexpected test failures
- Performance degradations
- Unusual error patterns
- Abnormal system resource usage
- Irregular user behavior patterns

### Types of Anomalies

```
┌─────────────────────────────────────────────────────────────┐
│                    Anomaly Types                            │
├─────────────────────────────────────────────────────────────┤
│  Point Anomalies                                            │
│  └── Single data point deviates (e.g., sudden test failure) │
│                                                             │
│  Contextual Anomalies                                       │
│  └── Normal value in wrong context (e.g., slow at peak)     │
│                                                             │
│  Collective Anomalies                                       │
│  └── Group of points anomalous together (e.g., pattern)     │
└─────────────────────────────────────────────────────────────┘
```

## Statistical Methods

### Z-Score Method

Identifies anomalies based on standard deviations from the mean:

```python
import numpy as np
from scipy import stats

def detect_zscore_anomalies(data: list, threshold: float = 3.0) -> list:
    """
    Detect anomalies using Z-score method.

    Args:
        data: List of numeric values
        threshold: Number of standard deviations for anomaly

    Returns:
        List of (index, value, z_score) tuples for anomalies
    """
    z_scores = np.abs(stats.zscore(data))
    anomalies = []

    for i, (value, z) in enumerate(zip(data, z_scores)):
        if z > threshold:
            anomalies.append({
                'index': i,
                'value': value,
                'z_score': z,
                'severity': 'high' if z > 4 else 'medium'
            })

    return anomalies

# Example: Detect anomalies in test execution times
execution_times = [120, 125, 118, 122, 450, 121, 119, 123, 124, 120]
anomalies = detect_zscore_anomalies(execution_times)
print(f"Found {len(anomalies)} anomalies")  # Test run 5 (450ms) flagged
```

### Interquartile Range (IQR) Method

Robust against outliers in the data itself:

```python
def detect_iqr_anomalies(data: list, multiplier: float = 1.5) -> list:
    """
    Detect anomalies using IQR method.

    Args:
        data: List of numeric values
        multiplier: IQR multiplier for bounds (1.5 = outliers, 3 = extreme)

    Returns:
        List of anomalous values with details
    """
    q1 = np.percentile(data, 25)
    q3 = np.percentile(data, 75)
    iqr = q3 - q1

    lower_bound = q1 - (multiplier * iqr)
    upper_bound = q3 + (multiplier * iqr)

    anomalies = []
    for i, value in enumerate(data):
        if value < lower_bound or value > upper_bound:
            anomalies.append({
                'index': i,
                'value': value,
                'lower_bound': lower_bound,
                'upper_bound': upper_bound,
                'direction': 'below' if value < lower_bound else 'above'
            })

    return anomalies
```

### Moving Average for Time Series

```python
def detect_moving_average_anomalies(
    data: list,
    window_size: int = 10,
    threshold_std: float = 2.0
) -> list:
    """
    Detect anomalies using moving average method.
    """
    anomalies = []

    for i in range(window_size, len(data)):
        window = data[i - window_size:i]
        mean = np.mean(window)
        std = np.std(window)

        if abs(data[i] - mean) > threshold_std * std:
            anomalies.append({
                'index': i,
                'value': data[i],
                'expected': mean,
                'deviation': abs(data[i] - mean) / std
            })

    return anomalies
```

## Machine Learning Approaches

### Isolation Forest

Effective for high-dimensional data:

```python
from sklearn.ensemble import IsolationForest
import pandas as pd

def detect_isolation_forest_anomalies(df: pd.DataFrame, contamination: float = 0.1):
    """
    Detect anomalies using Isolation Forest.

    Args:
        df: DataFrame with feature columns
        contamination: Expected proportion of anomalies

    Returns:
        DataFrame with anomaly predictions
    """
    model = IsolationForest(
        contamination=contamination,
        random_state=42,
        n_estimators=100
    )

    df['anomaly'] = model.fit_predict(df)
    df['anomaly_score'] = model.decision_function(df)

    # -1 indicates anomaly, 1 indicates normal
    df['is_anomaly'] = df['anomaly'] == -1

    return df

# Example: Detect anomalies in test metrics
test_metrics = pd.DataFrame({
    'execution_time': [120, 125, 450, 118, 122],
    'memory_usage': [512, 520, 515, 1200, 510],
    'assertions': [50, 52, 48, 51, 49]
})

results = detect_isolation_forest_anomalies(test_metrics)
```

### One-Class SVM

For novelty detection when you have "normal" training data:

```python
from sklearn.svm import OneClassSVM
from sklearn.preprocessing import StandardScaler

class AnomalyDetector:
    def __init__(self, nu: float = 0.1, kernel: str = 'rbf'):
        self.scaler = StandardScaler()
        self.model = OneClassSVM(nu=nu, kernel=kernel, gamma='auto')

    def fit(self, normal_data: pd.DataFrame):
        """Train on normal data only."""
        scaled_data = self.scaler.fit_transform(normal_data)
        self.model.fit(scaled_data)
        return self

    def predict(self, data: pd.DataFrame) -> pd.DataFrame:
        """Predict anomalies in new data."""
        scaled_data = self.scaler.transform(data)
        predictions = self.model.predict(scaled_data)

        data = data.copy()
        data['is_anomaly'] = predictions == -1
        return data

# Usage
detector = AnomalyDetector()
detector.fit(historical_normal_test_runs)
current_results = detector.predict(current_test_run)
```

### Autoencoders for Complex Patterns

```python
import tensorflow as tf
from tensorflow import keras

def build_autoencoder(input_dim: int, encoding_dim: int = 8):
    """Build an autoencoder for anomaly detection."""
    # Encoder
    encoder_input = keras.Input(shape=(input_dim,))
    x = keras.layers.Dense(32, activation='relu')(encoder_input)
    x = keras.layers.Dense(16, activation='relu')(x)
    encoded = keras.layers.Dense(encoding_dim, activation='relu')(x)

    # Decoder
    x = keras.layers.Dense(16, activation='relu')(encoded)
    x = keras.layers.Dense(32, activation='relu')(x)
    decoded = keras.layers.Dense(input_dim, activation='sigmoid')(x)

    autoencoder = keras.Model(encoder_input, decoded)
    autoencoder.compile(optimizer='adam', loss='mse')

    return autoencoder

def detect_autoencoder_anomalies(
    model: keras.Model,
    data: np.ndarray,
    threshold_percentile: float = 95
) -> list:
    """Detect anomalies based on reconstruction error."""
    reconstructed = model.predict(data)
    mse = np.mean(np.power(data - reconstructed, 2), axis=1)

    threshold = np.percentile(mse, threshold_percentile)

    anomalies = []
    for i, error in enumerate(mse):
        if error > threshold:
            anomalies.append({
                'index': i,
                'reconstruction_error': error,
                'threshold': threshold
            })

    return anomalies
```

## Application in Test Automation

### Test Execution Monitoring

```python
class TestExecutionMonitor:
    def __init__(self, history_window: int = 100):
        self.history_window = history_window
        self.execution_history = []

    def record_execution(self, test_name: str, metrics: dict):
        """Record test execution metrics."""
        self.execution_history.append({
            'test_name': test_name,
            'timestamp': datetime.now(),
            **metrics
        })

        # Keep only recent history
        if len(self.execution_history) > self.history_window:
            self.execution_history = self.execution_history[-self.history_window:]

    def check_for_anomalies(self, test_name: str, current_metrics: dict) -> list:
        """Check if current execution shows anomalies."""
        # Get history for this specific test
        test_history = [
            e for e in self.execution_history
            if e['test_name'] == test_name
        ]

        if len(test_history) < 10:
            return []  # Not enough history

        anomalies = []

        # Check execution time
        historical_times = [e['execution_time'] for e in test_history]
        time_anomalies = detect_zscore_anomalies(
            historical_times + [current_metrics['execution_time']]
        )

        if time_anomalies and time_anomalies[-1]['index'] == len(historical_times):
            anomalies.append({
                'type': 'execution_time',
                'message': f"Execution time {current_metrics['execution_time']}ms is anomalous",
                'z_score': time_anomalies[-1]['z_score']
            })

        return anomalies

# Usage in test framework
monitor = TestExecutionMonitor()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when == 'call':
        metrics = {
            'execution_time': report.duration * 1000,
            'passed': report.passed
        }

        anomalies = monitor.check_for_anomalies(item.name, metrics)
        if anomalies:
            for anomaly in anomalies:
                print(f"⚠️ Anomaly detected: {anomaly['message']}")

        monitor.record_execution(item.name, metrics)
```

### Flaky Test Detection

```python
class FlakyTestDetector:
    def __init__(self):
        self.test_results = defaultdict(list)

    def record_result(self, test_name: str, passed: bool, execution_id: str):
        """Record test result."""
        self.test_results[test_name].append({
            'passed': passed,
            'execution_id': execution_id,
            'timestamp': datetime.now()
        })

    def detect_flaky_tests(self, window: int = 20) -> list:
        """Identify tests with anomalous pass/fail patterns."""
        flaky_tests = []

        for test_name, results in self.test_results.items():
            recent = results[-window:]

            if len(recent) < window:
                continue

            pass_count = sum(1 for r in recent if r['passed'])
            pass_rate = pass_count / len(recent)

            # Tests that sometimes pass and sometimes fail
            if 0.1 < pass_rate < 0.9:
                # Check for patterns
                consecutive_changes = 0
                for i in range(1, len(recent)):
                    if recent[i]['passed'] != recent[i-1]['passed']:
                        consecutive_changes += 1

                flakiness_score = consecutive_changes / (len(recent) - 1)

                if flakiness_score > 0.3:  # More than 30% of runs flip
                    flaky_tests.append({
                        'test_name': test_name,
                        'pass_rate': pass_rate,
                        'flakiness_score': flakiness_score,
                        'recent_results': [r['passed'] for r in recent]
                    })

        return sorted(flaky_tests, key=lambda x: x['flakiness_score'], reverse=True)
```

### Performance Regression Detection

```python
class PerformanceAnomalyDetector:
    def __init__(self, baseline_runs: int = 50):
        self.baseline_runs = baseline_runs
        self.performance_data = defaultdict(list)

    def record_performance(self, endpoint: str, response_time: float, timestamp: datetime):
        """Record performance measurement."""
        self.performance_data[endpoint].append({
            'response_time': response_time,
            'timestamp': timestamp
        })

    def detect_regression(self, endpoint: str, current_time: float) -> dict:
        """Detect if current response time indicates regression."""
        history = self.performance_data[endpoint]

        if len(history) < self.baseline_runs:
            return {'is_regression': False, 'reason': 'Insufficient history'}

        # Get baseline (oldest runs)
        baseline = [h['response_time'] for h in history[:self.baseline_runs]]
        baseline_mean = np.mean(baseline)
        baseline_std = np.std(baseline)

        # Get recent performance
        recent = [h['response_time'] for h in history[-20:]]
        recent_mean = np.mean(recent)

        # Z-score of current against baseline
        z_score = (current_time - baseline_mean) / baseline_std

        # Trend detection
        is_trending_up = recent_mean > baseline_mean * 1.1

        return {
            'is_regression': z_score > 3 or is_trending_up,
            'current_time': current_time,
            'baseline_mean': baseline_mean,
            'baseline_std': baseline_std,
            'z_score': z_score,
            'recent_mean': recent_mean,
            'trend': 'degrading' if is_trending_up else 'stable'
        }
```

## Real-Time Anomaly Detection Pipeline

```python
from dataclasses import dataclass
from typing import Callable
import asyncio

@dataclass
class AnomalyAlert:
    source: str
    metric: str
    value: float
    expected_range: tuple
    severity: str
    timestamp: datetime

class RealTimeAnomalyPipeline:
    def __init__(self):
        self.detectors = {}
        self.alert_handlers = []
        self.running = False

    def register_detector(self, name: str, detector: Callable):
        """Register an anomaly detector."""
        self.detectors[name] = detector

    def register_alert_handler(self, handler: Callable):
        """Register handler for anomaly alerts."""
        self.alert_handlers.append(handler)

    async def process_metric(self, source: str, metric: str, value: float):
        """Process incoming metric through all detectors."""
        for detector_name, detector in self.detectors.items():
            try:
                result = detector(source, metric, value)

                if result and result.get('is_anomaly'):
                    alert = AnomalyAlert(
                        source=source,
                        metric=metric,
                        value=value,
                        expected_range=result.get('expected_range'),
                        severity=result.get('severity', 'medium'),
                        timestamp=datetime.now()
                    )

                    for handler in self.alert_handlers:
                        await handler(alert)

            except Exception as e:
                print(f"Detector {detector_name} error: {e}")

    async def start(self, metric_stream):
        """Start processing metric stream."""
        self.running = True

        async for metric in metric_stream:
            if not self.running:
                break

            await self.process_metric(
                metric['source'],
                metric['name'],
                metric['value']
            )

    def stop(self):
        """Stop the pipeline."""
        self.running = False

# Usage
pipeline = RealTimeAnomalyPipeline()

# Register detectors
pipeline.register_detector('zscore', zscore_detector)
pipeline.register_detector('isolation_forest', if_detector)

# Register alert handlers
pipeline.register_alert_handler(send_slack_alert)
pipeline.register_alert_handler(log_to_dashboard)

# Start processing
asyncio.run(pipeline.start(test_metrics_stream))
```

## Visualization and Reporting

```python
import matplotlib.pyplot as plt

def visualize_anomalies(data: list, anomalies: list, title: str):
    """Visualize data with anomalies highlighted."""
    fig, ax = plt.subplots(figsize=(12, 6))

    # Plot all data
    ax.plot(range(len(data)), data, 'b-', label='Data')

    # Highlight anomalies
    anomaly_indices = [a['index'] for a in anomalies]
    anomaly_values = [a['value'] for a in anomalies]

    ax.scatter(anomaly_indices, anomaly_values, c='red', s=100,
               label='Anomalies', zorder=5)

    # Add threshold lines
    mean = np.mean(data)
    std = np.std(data)
    ax.axhline(y=mean, color='g', linestyle='--', label='Mean')
    ax.axhline(y=mean + 3*std, color='r', linestyle=':', label='3σ threshold')
    ax.axhline(y=mean - 3*std, color='r', linestyle=':')

    ax.set_title(title)
    ax.set_xlabel('Test Run')
    ax.set_ylabel('Value')
    ax.legend()

    return fig
```

## Best Practices

### Tuning Detection Sensitivity

1. **Start Conservative**: Begin with higher thresholds to reduce false positives
2. **Monitor False Positive Rate**: Track alerts that don't represent real issues
3. **Seasonal Adjustment**: Account for expected variations (e.g., higher load during business hours)
4. **Context Awareness**: Consider environment, deployment status, and other factors

### Integration Recommendations

1. **Gradual Rollout**: Start with monitoring mode before alerting
2. **Combine Methods**: Use multiple detection techniques for robustness
3. **Human Feedback Loop**: Allow marking false positives to improve models
4. **Document Baselines**: Keep records of what "normal" looks like

## Conclusion

Anomaly detection transforms test automation from reactive to proactive. By automatically identifying unusual patterns in test results, performance metrics, and system behavior, teams can catch issues earlier and with less manual effort. Start with simple statistical methods and evolve to machine learning approaches as your needs grow.

## Key Takeaways

1. Choose detection methods appropriate to your data characteristics
2. Statistical methods (Z-score, IQR) work well for simple univariate data
3. Machine learning (Isolation Forest, Autoencoders) handles complex patterns
4. Monitor test execution times, flaky tests, and performance regressions
5. Build real-time pipelines for immediate anomaly alerting
6. Continuously tune detection sensitivity based on false positive rates
