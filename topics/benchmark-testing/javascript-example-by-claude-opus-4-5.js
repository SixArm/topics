/**
 * Benchmark Testing - Performance Comparison and Analysis
 *
 * Benchmark testing compares the performance of systems, applications, or
 * components against standards or reference points. It evaluates speed,
 * efficiency, and overall performance to identify areas for improvement
 * and validate that performance requirements are met.
 *
 * Key Concepts:
 * - Performance baselines
 * - Regression detection
 * - Load and stress testing
 * - Comparative analysis
 * - Statistical significance
 */

// Example 1: Benchmark Runner
class BenchmarkRunner {
  constructor(options = {}) {
    this.options = {
      warmupIterations: options.warmupIterations || 10,
      iterations: options.iterations || 100,
      timeout: options.timeout || 30000,
      ...options
    };
    this.results = [];
  }

  /**
   * Run a benchmark
   * @param {string} name - Benchmark name
   * @param {Function} fn - Function to benchmark
   * @returns {object} - Benchmark results
   */
  async run(name, fn) {
    console.log(`Running benchmark: ${name}`);

    // Warmup phase
    for (let i = 0; i < this.options.warmupIterations; i++) {
      await fn();
    }

    // Measurement phase
    const times = [];
    const startMemory = this.getMemoryUsage();

    for (let i = 0; i < this.options.iterations; i++) {
      const start = performance.now();
      await fn();
      const end = performance.now();
      times.push(end - start);
    }

    const endMemory = this.getMemoryUsage();

    const result = this.calculateStats(name, times, startMemory, endMemory);
    this.results.push(result);

    return result;
  }

  /**
   * Get current memory usage (simulated for browser/Node compatibility)
   * @returns {number} - Memory in bytes
   */
  getMemoryUsage() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed;
    }
    return 0;
  }

  /**
   * Calculate statistics from timing data
   * @param {string} name - Benchmark name
   * @param {Array} times - Array of timing measurements
   * @param {number} startMemory - Memory at start
   * @param {number} endMemory - Memory at end
   * @returns {object} - Statistics
   */
  calculateStats(name, times, startMemory, endMemory) {
    const sorted = [...times].sort((a, b) => a - b);
    const sum = times.reduce((a, b) => a + b, 0);
    const mean = sum / times.length;

    // Standard deviation
    const squaredDiffs = times.map(t => Math.pow(t - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / times.length;
    const stdDev = Math.sqrt(avgSquaredDiff);

    // Percentiles
    const percentile = (p) => {
      const index = Math.ceil((p / 100) * sorted.length) - 1;
      return sorted[Math.max(0, index)];
    };

    return {
      name,
      iterations: times.length,
      timing: {
        mean: mean.toFixed(4),
        min: Math.min(...times).toFixed(4),
        max: Math.max(...times).toFixed(4),
        median: percentile(50).toFixed(4),
        stdDev: stdDev.toFixed(4),
        p95: percentile(95).toFixed(4),
        p99: percentile(99).toFixed(4)
      },
      throughput: {
        opsPerSecond: (1000 / mean).toFixed(2),
        opsPerMinute: ((1000 / mean) * 60).toFixed(2)
      },
      memory: {
        delta: endMemory - startMemory,
        deltaFormatted: this.formatBytes(endMemory - startMemory)
      }
    };
  }

  /**
   * Format bytes to human readable
   * @param {number} bytes - Bytes to format
   * @returns {string}
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Compare two benchmark results
   * @param {object} baseline - Baseline result
   * @param {object} current - Current result
   * @returns {object} - Comparison
   */
  compare(baseline, current) {
    const baselineMean = parseFloat(baseline.timing.mean);
    const currentMean = parseFloat(current.timing.mean);
    const difference = currentMean - baselineMean;
    const percentChange = ((difference / baselineMean) * 100);

    return {
      baseline: baseline.name,
      current: current.name,
      baselineMean: baseline.timing.mean,
      currentMean: current.timing.mean,
      difference: difference.toFixed(4),
      percentChange: percentChange.toFixed(2) + '%',
      improved: percentChange < 0,
      significant: Math.abs(percentChange) > 5
    };
  }

  /**
   * Get all results as a report
   * @returns {object}
   */
  getReport() {
    return {
      timestamp: new Date().toISOString(),
      options: this.options,
      results: this.results,
      summary: {
        totalBenchmarks: this.results.length,
        fastest: this.results.reduce((min, r) =>
          parseFloat(r.timing.mean) < parseFloat(min.timing.mean) ? r : min
        ),
        slowest: this.results.reduce((max, r) =>
          parseFloat(r.timing.mean) > parseFloat(max.timing.mean) ? r : max
        )
      }
    };
  }
}

// Example 2: Performance Regression Detector
class PerformanceRegressionDetector {
  constructor(threshold = 0.1) {
    this.threshold = threshold; // 10% regression threshold
    this.baselines = new Map();
  }

  /**
   * Set baseline for a benchmark
   * @param {string} name - Benchmark name
   * @param {object} result - Baseline result
   */
  setBaseline(name, result) {
    this.baselines.set(name, {
      mean: parseFloat(result.timing.mean),
      stdDev: parseFloat(result.timing.stdDev),
      setAt: new Date()
    });
  }

  /**
   * Check if current result is a regression
   * @param {string} name - Benchmark name
   * @param {object} result - Current result
   * @returns {object} - Regression analysis
   */
  checkRegression(name, result) {
    const baseline = this.baselines.get(name);
    if (!baseline) {
      return {
        name,
        status: 'NO_BASELINE',
        message: 'No baseline set for this benchmark'
      };
    }

    const currentMean = parseFloat(result.timing.mean);
    const percentChange = (currentMean - baseline.mean) / baseline.mean;

    // Statistical significance using z-score
    const zScore = (currentMean - baseline.mean) / baseline.stdDev;
    const isStatisticallySignificant = Math.abs(zScore) > 2;

    const isRegression = percentChange > this.threshold && isStatisticallySignificant;
    const isImprovement = percentChange < -this.threshold && isStatisticallySignificant;

    return {
      name,
      baselineMean: baseline.mean.toFixed(4),
      currentMean: currentMean.toFixed(4),
      percentChange: (percentChange * 100).toFixed(2) + '%',
      zScore: zScore.toFixed(2),
      isStatisticallySignificant,
      status: isRegression ? 'REGRESSION' : isImprovement ? 'IMPROVEMENT' : 'STABLE',
      message: isRegression
        ? `Performance degraded by ${(percentChange * 100).toFixed(1)}%`
        : isImprovement
        ? `Performance improved by ${Math.abs(percentChange * 100).toFixed(1)}%`
        : 'Performance is within acceptable range'
    };
  }
}

// Example 3: Comparative Benchmark Suite
class ComparativeBenchmarkSuite {
  constructor(name) {
    this.name = name;
    this.implementations = new Map();
    this.runner = new BenchmarkRunner({ iterations: 50 });
  }

  /**
   * Add an implementation to compare
   * @param {string} name - Implementation name
   * @param {Function} fn - Implementation function
   */
  addImplementation(name, fn) {
    this.implementations.set(name, fn);
  }

  /**
   * Run all implementations and compare
   * @returns {object} - Comparison results
   */
  async runAll() {
    const results = [];

    for (const [name, fn] of this.implementations) {
      const result = await this.runner.run(name, fn);
      results.push(result);
    }

    // Sort by mean time
    results.sort((a, b) => parseFloat(a.timing.mean) - parseFloat(b.timing.mean));

    // Calculate relative performance
    const fastest = parseFloat(results[0].timing.mean);
    const rankings = results.map((r, index) => ({
      rank: index + 1,
      name: r.name,
      meanTime: r.timing.mean + 'ms',
      opsPerSecond: r.throughput.opsPerSecond,
      relativeTo: ((parseFloat(r.timing.mean) / fastest) * 100).toFixed(1) + '%',
      slowdownFactor: (parseFloat(r.timing.mean) / fastest).toFixed(2) + 'x'
    }));

    return {
      suite: this.name,
      implementations: this.implementations.size,
      winner: results[0].name,
      rankings,
      detailedResults: results
    };
  }
}

// Example 4: Load Test Benchmarker
class LoadTestBenchmarker {
  constructor(options = {}) {
    this.options = {
      rampUpTime: options.rampUpTime || 5000,
      sustainedTime: options.sustainedTime || 10000,
      rampDownTime: options.rampDownTime || 5000,
      ...options
    };
  }

  /**
   * Run load test with varying concurrency
   * @param {Function} operation - Operation to test
   * @param {Array} concurrencyLevels - Levels to test
   * @returns {object}
   */
  async runLoadTest(operation, concurrencyLevels = [1, 5, 10, 25, 50]) {
    const results = [];

    for (const concurrency of concurrencyLevels) {
      console.log(`Testing with concurrency: ${concurrency}`);
      const result = await this.testConcurrency(operation, concurrency);
      results.push(result);
    }

    return {
      testType: 'Load Test',
      levels: results,
      scalabilityAnalysis: this.analyzeScalability(results)
    };
  }

  /**
   * Test at a specific concurrency level
   * @param {Function} operation - Operation to test
   * @param {number} concurrency - Concurrency level
   * @returns {object}
   */
  async testConcurrency(operation, concurrency) {
    const iterations = 100;
    const times = [];
    const errors = [];

    const runBatch = async () => {
      const promises = [];
      for (let i = 0; i < concurrency; i++) {
        const start = performance.now();
        promises.push(
          operation()
            .then(() => {
              times.push(performance.now() - start);
            })
            .catch(err => {
              errors.push(err.message);
            })
        );
      }
      await Promise.all(promises);
    };

    const batches = Math.ceil(iterations / concurrency);
    for (let i = 0; i < batches; i++) {
      await runBatch();
    }

    const sortedTimes = [...times].sort((a, b) => a - b);
    const mean = times.reduce((a, b) => a + b, 0) / times.length;

    return {
      concurrency,
      totalRequests: times.length,
      errors: errors.length,
      errorRate: ((errors.length / times.length) * 100).toFixed(2) + '%',
      timing: {
        mean: mean.toFixed(4),
        min: Math.min(...times).toFixed(4),
        max: Math.max(...times).toFixed(4),
        p50: sortedTimes[Math.floor(times.length * 0.5)].toFixed(4),
        p95: sortedTimes[Math.floor(times.length * 0.95)].toFixed(4),
        p99: sortedTimes[Math.floor(times.length * 0.99)].toFixed(4)
      },
      throughput: ((times.length / (mean * times.length / 1000)) * concurrency).toFixed(2) + ' req/s'
    };
  }

  /**
   * Analyze scalability from results
   * @param {Array} results - Test results at different levels
   * @returns {object}
   */
  analyzeScalability(results) {
    if (results.length < 2) return { analysis: 'Insufficient data' };

    const baseline = results[0];
    const analysis = results.map(r => ({
      concurrency: r.concurrency,
      latencyIncrease: ((parseFloat(r.timing.mean) / parseFloat(baseline.timing.mean) - 1) * 100).toFixed(1) + '%',
      errorRateChange: r.errorRate
    }));

    // Determine scalability characteristic
    const lastResult = results[results.length - 1];
    const latencyMultiplier = parseFloat(lastResult.timing.mean) / parseFloat(baseline.timing.mean);
    const concurrencyMultiplier = lastResult.concurrency / baseline.concurrency;

    let scalabilityRating;
    if (latencyMultiplier < concurrencyMultiplier * 0.5) {
      scalabilityRating = 'EXCELLENT';
    } else if (latencyMultiplier < concurrencyMultiplier) {
      scalabilityRating = 'GOOD';
    } else if (latencyMultiplier < concurrencyMultiplier * 2) {
      scalabilityRating = 'MODERATE';
    } else {
      scalabilityRating = 'POOR';
    }

    return {
      scalabilityRating,
      analysis,
      recommendation: scalabilityRating === 'POOR'
        ? 'Consider optimizing for concurrent access'
        : 'System scales reasonably well'
    };
  }
}

// Example 5: Memory Benchmark
class MemoryBenchmark {
  /**
   * Measure memory usage of a function
   * @param {string} name - Benchmark name
   * @param {Function} fn - Function to measure
   * @param {number} iterations - Number of iterations
   * @returns {object}
   */
  static async measure(name, fn, iterations = 10) {
    const measurements = [];

    for (let i = 0; i < iterations; i++) {
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const beforeHeap = this.getHeapUsed();
      await fn();
      const afterHeap = this.getHeapUsed();

      measurements.push({
        iteration: i + 1,
        heapBefore: beforeHeap,
        heapAfter: afterHeap,
        heapDelta: afterHeap - beforeHeap
      });
    }

    const deltas = measurements.map(m => m.heapDelta);
    const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;

    return {
      name,
      iterations,
      memory: {
        averageAllocation: this.formatBytes(avgDelta),
        minAllocation: this.formatBytes(Math.min(...deltas)),
        maxAllocation: this.formatBytes(Math.max(...deltas)),
        totalAllocated: this.formatBytes(deltas.reduce((a, b) => a + b, 0))
      },
      measurements
    };
  }

  /**
   * Get current heap usage
   * @returns {number}
   */
  static getHeapUsed() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed;
    }
    return 0;
  }

  /**
   * Format bytes
   * @param {number} bytes - Bytes to format
   * @returns {string}
   */
  static formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Demonstration
console.log('=== Benchmark Testing Examples ===\n');

// Basic benchmark
console.log('--- Basic Benchmark ---\n');
const runner = new BenchmarkRunner({ iterations: 50, warmupIterations: 5 });

// Benchmark different array operations
(async () => {
  // Benchmark array operations
  const arraySize = 10000;
  const testArray = Array.from({ length: arraySize }, (_, i) => i);

  const forLoopResult = await runner.run('For Loop Sum', () => {
    let sum = 0;
    for (let i = 0; i < testArray.length; i++) {
      sum += testArray[i];
    }
    return sum;
  });

  const reduceResult = await runner.run('Array.reduce Sum', () => {
    return testArray.reduce((sum, n) => sum + n, 0);
  });

  const forOfResult = await runner.run('For...of Sum', () => {
    let sum = 0;
    for (const n of testArray) {
      sum += n;
    }
    return sum;
  });

  console.log('\nBenchmark Results:');
  console.log(`For Loop: ${forLoopResult.timing.mean}ms (${forLoopResult.throughput.opsPerSecond} ops/s)`);
  console.log(`Reduce: ${reduceResult.timing.mean}ms (${reduceResult.throughput.opsPerSecond} ops/s)`);
  console.log(`For...of: ${forOfResult.timing.mean}ms (${forOfResult.throughput.opsPerSecond} ops/s)`);

  // Regression detection
  console.log('\n--- Regression Detection ---\n');
  const detector = new PerformanceRegressionDetector(0.1);

  detector.setBaseline('Array Sum', forLoopResult);

  // Simulate a "new" result with slight regression
  const simulatedNewResult = {
    timing: {
      mean: (parseFloat(forLoopResult.timing.mean) * 1.15).toFixed(4),
      stdDev: forLoopResult.timing.stdDev
    }
  };

  const regressionCheck = detector.checkRegression('Array Sum', simulatedNewResult);
  console.log('Regression Check:');
  console.log(`  Status: ${regressionCheck.status}`);
  console.log(`  Message: ${regressionCheck.message}`);
  console.log(`  Change: ${regressionCheck.percentChange}`);

  // Comparative benchmark
  console.log('\n--- Comparative Benchmark ---\n');
  const suite = new ComparativeBenchmarkSuite('String Concatenation');

  suite.addImplementation('Plus Operator', () => {
    let str = '';
    for (let i = 0; i < 100; i++) {
      str = str + 'a';
    }
    return str;
  });

  suite.addImplementation('Array Join', () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push('a');
    }
    return arr.join('');
  });

  suite.addImplementation('Template Literal', () => {
    let str = '';
    for (let i = 0; i < 100; i++) {
      str = `${str}a`;
    }
    return str;
  });

  const comparison = await suite.runAll();
  console.log(`Suite: ${comparison.suite}`);
  console.log(`Winner: ${comparison.winner}`);
  console.log('\nRankings:');
  comparison.rankings.forEach(r => {
    console.log(`  ${r.rank}. ${r.name}: ${r.meanTime} (${r.slowdownFactor})`);
  });
})();

/**
 * Benchmark Testing Best Practices:
 *
 * 1. Warmup: Always include warmup iterations to eliminate JIT compilation effects
 *
 * 2. Sufficient Iterations: Run enough iterations for statistical significance
 *
 * 3. Consistent Environment: Control for system load, temperature, etc.
 *
 * 4. Measure the Right Thing: Isolate what you're actually testing
 *
 * 5. Use Percentiles: Mean can be misleading; look at p95, p99
 *
 * 6. Track Regressions: Integrate benchmarks into CI/CD
 *
 * 7. Compare Fairly: Ensure implementations do the same work
 *
 * 8. Document Context: Record system specs, versions, conditions
 *
 * 9. Avoid Micro-optimization: Focus on meaningful performance gains
 *
 * 10. Real-world Scenarios: Benchmark representative workloads
 */
