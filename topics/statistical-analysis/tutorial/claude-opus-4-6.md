# Statistical analysis

Statistical analysis is a method of collecting, organizing, and interpreting data to uncover patterns, trends, and relationships. It provides the foundation for evidence-based decision-making across technology, engineering, science, medicine, and business. For technology professionals, statistical analysis is essential for tasks ranging from performance benchmarking and A/B testing to machine learning model evaluation and capacity planning. Mastering statistical analysis enables you to move beyond intuition and make rigorous, defensible conclusions from data.

## Core Concepts

Statistical analysis rests on several foundational ideas. A **population** is the entire group of interest, while a **sample** is a subset drawn from that population for practical measurement. **Variables** are the measurable properties under study; they may be independent (predictors) or dependent (outcomes). A **distribution** describes how values of a variable are spread, and understanding distributions is critical for choosing the right analytical technique. **Statistical significance** quantifies whether an observed result is likely due to chance or reflects a real effect, typically measured by a p-value threshold (commonly 0.05).

## Descriptive Statistics vs. Inferential Statistics

There are two primary branches of statistical analysis. Descriptive statistics summarize what the data shows. Inferential statistics draw conclusions about a larger population based on a sample.

| Aspect | Descriptive Statistics | Inferential Statistics |
|---|---|---|
| Purpose | Summarize and describe data | Draw conclusions about populations from samples |
| Output | Means, medians, standard deviations, charts | Confidence intervals, hypothesis test results, p-values |
| Scope | Describes only the collected data | Generalizes beyond the collected data |
| Example | Average response time across 1,000 API calls | Whether a new caching layer significantly reduces response time for all users |
| Risk of error | Minimal (direct measurement) | Present (sampling error, Type I/II errors) |

Both branches are necessary. Descriptive statistics give you the lay of the land; inferential statistics let you act on it.

## Steps in Statistical Analysis

A rigorous statistical analysis follows a structured process:

- **Define the research question.** Clarify the purpose of the study and identify which variables will be measured. A vague question produces vague results. For example, instead of "Is our app fast?", ask "Does deploying on infrastructure X reduce p95 latency compared to infrastructure Y?"

- **Collect data.** Gather data through experiments, surveys, instrumentation, logging, or secondary sources. The method of collection must align with the research question. Randomized controlled experiments yield the strongest causal evidence; observational data is easier to collect but harder to interpret.

- **Clean and organize data.** Remove errors, handle missing values, identify outliers, and structure the dataset for analysis. In technology contexts, this often involves deduplication, timestamp normalization, and filtering out bot traffic or test accounts.

- **Analyze data.** Apply appropriate statistical techniques to identify patterns, relationships, and trends. The choice of technique depends on the data type, distribution, and research question.

- **Interpret and present results.** Translate findings into clear, actionable conclusions. Effective presentation includes visualizations, confidence intervals, and plain-language summaries tailored to the intended audience.

## Key Descriptive Measures

Descriptive statistics condense raw data into understandable summaries. The most commonly used measures fall into two categories:

**Measures of central tendency** describe the typical value:

- **Mean** — the arithmetic average. Sensitive to outliers, which makes it less reliable for skewed distributions such as response times or income data.
- **Median** — the middle value when data is sorted. Robust to outliers and often preferred for skewed data.
- **Mode** — the most frequently occurring value. Useful for categorical data or identifying peaks in a distribution.

**Measures of dispersion** describe how spread out the data is:

- **Range** — the difference between the maximum and minimum values. Simple but sensitive to extreme values.
- **Variance** — the average of squared deviations from the mean. Gives a sense of overall spread.
- **Standard deviation** — the square root of variance. Expressed in the same units as the data, making it more interpretable than variance.
- **Interquartile range (IQR)** — the range between the 25th and 75th percentiles. Robust to outliers and commonly used in box plots.

## Common Inferential Techniques

Inferential statistics encompass a broad set of methods. The following are among the most relevant for technology professionals:

| Technique | Use Case | When to Apply |
|---|---|---|
| t-test | Compare means of two groups | A/B tests with one metric and two variants |
| ANOVA | Compare means across three or more groups | Comparing performance across multiple configurations |
| Chi-square test | Test association between categorical variables | Analyzing whether error types differ across releases |
| Linear regression | Model the relationship between a continuous outcome and one or more predictors | Predicting infrastructure cost from usage metrics |
| Logistic regression | Model a binary outcome | Predicting churn (yes/no) from user behavior features |
| Correlation analysis | Measure the strength and direction of a linear relationship between two variables | Assessing whether CPU usage and response time move together |
| Mann-Whitney U test | Non-parametric comparison of two groups | Comparing latency distributions that are not normally distributed |

Choosing the right technique depends on the data type (continuous, categorical, ordinal), the number of groups, the distribution shape, and whether assumptions like normality and equal variance hold.

## Hypothesis Testing

Hypothesis testing is the backbone of inferential statistics. It follows a disciplined procedure:

- **State the null hypothesis (H0).** This is the default assumption, typically that there is no effect or no difference.
- **State the alternative hypothesis (H1).** This is the claim you are testing, typically that an effect or difference exists.
- **Choose a significance level (alpha).** The most common threshold is 0.05, meaning you accept a 5% chance of incorrectly rejecting the null hypothesis.
- **Compute the test statistic and p-value.** The test statistic quantifies how far the observed data departs from what the null hypothesis predicts. The p-value is the probability of observing data at least as extreme, assuming the null hypothesis is true.
- **Make a decision.** If the p-value is less than alpha, reject the null hypothesis. Otherwise, fail to reject it.

Two types of errors are possible:

- **Type I error (false positive)** — rejecting the null hypothesis when it is actually true.
- **Type II error (false negative)** — failing to reject the null hypothesis when it is actually false.

Technology professionals encounter hypothesis testing most directly in A/B testing, performance benchmarking, and quality assurance.

## Practical Applications in Technology

Statistical analysis is embedded throughout the technology industry:

- **A/B testing and experimentation.** Product teams use hypothesis tests to determine whether a new feature, design, or algorithm improves key metrics like conversion rate, engagement, or revenue.
- **Performance engineering.** Percentile analysis (p50, p95, p99), regression analysis, and trend detection help identify bottlenecks and capacity limits.
- **Machine learning model evaluation.** Metrics like accuracy, precision, recall, F1 score, and AUC-ROC are statistical summaries of model performance. Cross-validation provides inferential rigor.
- **Anomaly detection.** Statistical process control charts and z-score methods flag unusual behavior in monitoring and observability systems.
- **Reliability engineering.** Survival analysis and failure rate estimation inform SLA commitments and redundancy planning.
- **Data quality assessment.** Descriptive statistics and distribution analysis reveal data drift, missing value patterns, and collection errors.

## Common Pitfalls

Statistical analysis can mislead when misapplied. Be aware of these frequent mistakes:

- **Confusing correlation with causation.** A strong correlation between two variables does not prove that one causes the other. Confounding variables, reverse causation, or coincidence can all produce spurious correlations.
- **P-hacking.** Running many tests and selectively reporting significant results inflates the false positive rate. Pre-register hypotheses and apply corrections for multiple comparisons (e.g., Bonferroni correction).
- **Ignoring sample size.** Small samples produce unreliable estimates with wide confidence intervals. Power analysis should be performed before data collection to determine the minimum sample size needed.
- **Violating assumptions.** Many statistical tests assume normality, independence, or homoscedasticity. Applying a t-test to heavily skewed data or correlated observations yields invalid results.
- **Survivorship bias.** Analyzing only the data that remains (e.g., active users) while ignoring what was lost (e.g., churned users) distorts conclusions.
- **Overfitting.** Building a model that fits the training data perfectly but fails to generalize is a statistical failure, not a success.

## Related

Topics to explore next include **descriptive statistics** for deeper coverage of summary measures, **inferential statistics** for advanced hypothesis testing and estimation, **predictive analytics** for forecasting and modeling, **machine learning performance metrics** for evaluating classification and regression models, **anomaly detection** for identifying outliers in production systems, **correlation** and **causation** for understanding relationships between variables, and **Bayes' theorem** for probabilistic reasoning and Bayesian approaches to inference.

## Summary

Statistical analysis is the disciplined process of collecting, cleaning, analyzing, and interpreting data to extract meaningful insights. It divides into descriptive statistics, which summarize data, and inferential statistics, which generalize from samples to populations. Technology professionals rely on statistical analysis for A/B testing, performance benchmarking, model evaluation, anomaly detection, and data quality assessment. Mastering its core techniques, understanding its assumptions, and avoiding its common pitfalls are essential competencies for anyone making data-driven decisions in a technical environment.

## References

- Moore, D. S., McCabe, G. P., & Craig, B. A. (2021). *Introduction to the Practice of Statistics* (10th ed.). W. H. Freeman.
- Wackerly, D. D., Mendenhall, W., & Scheaffer, R. L. (2014). *Mathematical Statistics with Applications* (7th ed.). Cengage Learning.
- Downey, A. B. (2014). *Think Stats: Exploratory Data Analysis in Python* (2nd ed.). O'Reilly Media.
- Kohavi, R., Tang, D., & Xu, Y. (2020). *Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing*. Cambridge University Press.
- NIST/SEMATECH e-Handbook of Statistical Methods: [https://www.itl.nist.gov/div898/handbook/](https://www.itl.nist.gov/div898/handbook/)
- Penn State STAT 500 — Applied Statistics: [https://online.stat.psu.edu/stat500/](https://online.stat.psu.edu/stat500/)
