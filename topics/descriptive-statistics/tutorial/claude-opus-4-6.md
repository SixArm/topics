# Descriptive statistics

Descriptive statistics is a branch of statistics focused on summarizing, organizing, and presenting data in a meaningful way. Unlike inferential statistics, which draws conclusions about populations from samples, descriptive statistics confines itself to characterizing the data at hand. For technology professionals, descriptive statistics is foundational to data analysis, performance monitoring, quality assurance, machine learning feature engineering, and business intelligence. Whether you are profiling a dataset before building a model, reporting on system latency, or summarizing user engagement metrics, descriptive statistics provides the essential vocabulary and techniques for understanding what your data looks like before deciding what to do with it.

## Core Categories

Descriptive statistics divides broadly into two families of measures: central tendency and dispersion. Central tendency answers the question "what is a typical value?" while dispersion answers "how spread out are the values?" Together they give a compact yet informative snapshot of any dataset. A third important dimension, shape, captures how values are distributed across the range, including whether the distribution is symmetric, skewed, or heavy-tailed. Understanding all three dimensions prevents the common mistake of relying on a single number, such as the mean, to represent a complex dataset.

## Measures of Central Tendency

Central tendency measures identify the "center" of a dataset. The three primary measures each have distinct strengths and weaknesses depending on the nature of the data.

| Measure | Definition | Best Used When | Sensitive To |
|---------|-----------|----------------|--------------|
| Mean | Sum of all values divided by the count | Data is roughly symmetric with no extreme outliers | Outliers and skewed distributions |
| Median | Middle value when data is sorted | Data is skewed or contains outliers | Not sensitive to extreme values |
| Mode | Most frequently occurring value | Data is categorical or you need the most common outcome | Multiple modes or uniform distributions |

- **Mean** is the most widely used measure and works well for normally distributed continuous data, such as response times across a stable system.
- **Median** is more robust and is preferred when reporting values like household income or latency percentiles, where a few extreme values would distort the mean.
- **Mode** is essential for categorical data, such as identifying the most common error code in a log file or the most popular feature in user analytics.

In practice, comparing the mean and median reveals skewness: when the mean is substantially higher than the median, the data is right-skewed, indicating a tail of large values pulling the average upward.

## Measures of Dispersion

Dispersion measures quantify how much individual observations vary from the center. Two datasets can share the same mean yet behave very differently if one is tightly clustered and the other is widely spread.

| Measure | Definition | Key Characteristics |
|---------|-----------|---------------------|
| Range | Maximum value minus minimum value | Simple but extremely sensitive to outliers |
| Variance | Average of squared deviations from the mean | Expressed in squared units, which can be hard to interpret directly |
| Standard Deviation | Square root of the variance | Same units as the original data, making it more interpretable |
| Interquartile Range (IQR) | Difference between the 75th and 25th percentiles | Robust to outliers, used in box plots |

- **Range** gives a quick sense of spread but is unreliable in the presence of even a single outlier.
- **Variance** and **standard deviation** are the workhorses of dispersion measurement. Standard deviation is preferred for reporting because its units match the data. For example, if you measure API response time in milliseconds, the standard deviation is also in milliseconds.
- **Interquartile range** is the robust alternative. It ignores the most extreme 25% of values on each end, making it ideal for skewed data or data with anomalies, such as server request durations that occasionally spike.

## Measures of Shape

Shape statistics describe how a distribution deviates from a perfect bell curve.

- **Skewness** measures asymmetry. A positive skew means a long right tail (common in income data or latency distributions), while a negative skew means a long left tail. Skewness near zero suggests approximate symmetry.
- **Kurtosis** measures the heaviness of the tails relative to a normal distribution. High kurtosis ("leptokurtic") indicates more frequent extreme values than a normal distribution would predict, which matters significantly in risk analysis, anomaly detection, and financial modeling. Low kurtosis ("platykurtic") indicates lighter tails and fewer extreme events.

Understanding shape helps technology professionals choose appropriate statistical methods downstream. Many machine learning algorithms assume normally distributed features, so knowing that your data is heavily skewed or has fat tails signals a need for transformation or alternative methods.

## Percentiles and Quantiles

Percentiles divide a sorted dataset into 100 equal parts, and quantiles generalize this concept. In technology work, percentile-based reporting is often more informative than averages.

- **P50 (median)** represents the typical experience.
- **P90** captures the experience of the bottom 90% of observations, revealing the threshold below which most values fall.
- **P95 and P99** are standard in service-level objectives (SLOs) for latency monitoring. Reporting P99 latency ensures that you account for the tail of slow requests that the mean would obscure.

Percentiles are non-parametric, meaning they make no assumptions about the underlying distribution, which makes them broadly applicable across domains.

## Frequency Distributions and Data Visualization

Descriptive statistics often relies on visual representations to communicate patterns effectively:

- **Histograms** display the frequency of values across bins, revealing distribution shape at a glance.
- **Box plots** show the median, IQR, and outliers in a compact form, making them excellent for comparing distributions across groups.
- **Bar charts** summarize categorical frequency counts, such as the number of incidents per error category.
- **Cumulative distribution functions** show the proportion of data at or below each value, useful for understanding percentile thresholds.

Choosing the right visualization depends on the data type and the question being asked. Histograms suit continuous data exploration; box plots suit group comparisons; bar charts suit categorical summaries.

## Practical Applications in Technology

Descriptive statistics appears throughout the technology landscape:

- **Performance engineering**: Summarizing response times, throughput, and error rates using means, percentiles, and standard deviations to establish baselines and detect regressions.
- **Data science and machine learning**: Profiling features during exploratory data analysis to identify missing values, outliers, skewed distributions, and correlations before model training.
- **Business intelligence**: Aggregating user metrics such as daily active users, session duration, and conversion rates into dashboards that inform product decisions.
- **Quality assurance**: Tracking defect density, test pass rates, and code coverage statistics to monitor software quality over time.
- **Security and operations**: Analyzing log data to establish normal behavioral baselines and flag anomalous patterns using deviation-based thresholds.

## Common Pitfalls

- **Over-reliance on the mean**: The mean alone hides distribution shape. Always report dispersion and consider the median for skewed data.
- **Ignoring outliers**: Outliers can represent genuine anomalies worth investigating or data quality issues worth correcting. Blindly removing them loses information; blindly including them distorts summaries.
- **Confusing descriptive with inferential**: Descriptive statistics describes what is in the data. It does not prove causation, test hypotheses, or generalize to unseen populations without the formal machinery of inferential statistics.
- **Inappropriate aggregation**: Averaging averages across groups of different sizes produces misleading results. Always aggregate from raw data or use weighted approaches.

## Related

After building a strong foundation in descriptive statistics, the natural next step is inferential statistics, which provides the tools for hypothesis testing, confidence intervals, and generalizing from samples to populations. Probability theory underpins both branches and is worth studying in depth. For technology professionals working with data, exploratory data analysis formalizes the practice of using descriptive statistics alongside visualization. Machine learning performance metrics such as precision, recall, accuracy, and area under the curve extend descriptive summarization into model evaluation. Correlation analysis bridges descriptive and inferential work by quantifying relationships between variables.

## Summary

Descriptive statistics provides the essential toolkit for summarizing and understanding data before any further analysis takes place. Its measures of central tendency, dispersion, and shape offer a structured way to characterize datasets, whether you are monitoring system performance, profiling features for a machine learning pipeline, or reporting business metrics. By combining numerical summaries with appropriate visualizations and avoiding common pitfalls such as over-reliance on the mean, technology professionals can extract clear, honest, and actionable insights from raw data.

## References

- Walpole, R. E., Myers, R. H., Myers, S. L., & Ye, K. (2016). *Probability and Statistics for Engineers and Scientists* (9th ed.). Pearson.
- Tukey, J. W. (1977). *Exploratory Data Analysis*. Addison-Wesley.
- NIST/SEMATECH e-Handbook of Statistical Methods: [https://www.itl.nist.gov/div898/handbook/](https://www.itl.nist.gov/div898/handbook/)
- Khan Academy, Statistics and Probability: [https://www.khanacademy.org/math/statistics-probability](https://www.khanacademy.org/math/statistics-probability)
- Google Site Reliability Engineering, Chapter 4, Service Level Objectives: [https://sre.google/sre-book/service-level-objectives/](https://sre.google/sre-book/service-level-objectives/)
