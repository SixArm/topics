# Chi-square analysis

Chi-square analysis is a statistical method used to determine whether there is a significant association between two categorical variables. It is one of the most widely used hypothesis tests in applied statistics, valued for its simplicity and broad applicability. Technology professionals encounter chi-square analysis in areas ranging from A/B testing and user research to quality assurance and machine learning feature selection. The test works by comparing observed frequencies of events against the frequencies that would be expected if no relationship existed between the variables, then quantifying whether the discrepancy is large enough to be statistically meaningful.

## Core Concept

The foundation of chi-square analysis is the contingency table, a matrix that displays the frequency counts of observations across categories of two or more variables. Each cell in the table holds the count of observations that fall into a specific combination of categories. The chi-square test evaluates whether the pattern of frequencies in the table differs significantly from what would arise by chance alone. The null hypothesis states that the two variables are independent, meaning no association exists. The alternative hypothesis states that an association does exist. If the computed test statistic exceeds a critical threshold at a chosen significance level (commonly alpha = 0.05), the null hypothesis is rejected, providing evidence of a relationship.

## How the Test Statistic Is Calculated

The chi-square test statistic is computed by comparing observed frequencies to expected frequencies across every cell of the contingency table. Expected frequencies are derived under the assumption of independence: for each cell, the expected count equals the product of its row total and column total, divided by the grand total of all observations. The test statistic is the sum, across all cells, of the squared difference between observed and expected frequency divided by the expected frequency. A larger test statistic indicates a greater divergence from what independence would predict, making it more likely that the variables are genuinely associated.

## Types of Chi-Square Tests

There are several variants of the chi-square test, each suited to a different analytical question.

| Test Type | Purpose | Typical Use Case |
|---|---|---|
| Chi-square test of independence | Determines whether two categorical variables are associated | Testing whether user device type is related to conversion rate |
| Chi-square goodness-of-fit test | Assesses whether observed data matches an expected distribution | Verifying whether server errors are uniformly distributed across weekdays |
| Chi-square test of homogeneity | Compares distributions of a categorical variable across different populations | Comparing feature adoption rates across geographic regions |

The test of independence and the test of homogeneity use the same formula but differ in study design: independence tests draw a single sample and classify on two variables, while homogeneity tests draw separate samples from distinct populations and compare one variable's distribution.

## Assumptions and Requirements

Chi-square analysis relies on several assumptions that must be satisfied for results to be valid:

- **Independence of observations.** Each observation must be independent of every other observation. Repeated measures or clustered data violate this assumption.
- **Sufficient expected frequencies.** A common guideline is that no more than 20% of cells should have an expected frequency below 5, and no cell should have an expected frequency below 1. When this condition is not met, Fisher's exact test is a preferred alternative.
- **Categorical data.** The variables under analysis must be categorical (nominal or ordinal). Continuous variables must be binned into categories before applying the test.
- **Random sampling.** The data should come from a random or representative sample of the population of interest.

## Practical Applications in Technology

Chi-square analysis appears frequently in technology work across multiple domains:

- **A/B testing.** When comparing click-through rates, signup rates, or other categorical outcomes between a control group and one or more treatment groups, the chi-square test of independence determines whether differences in proportions are statistically significant.
- **Quality assurance.** Manufacturing and software QA teams use chi-square goodness-of-fit tests to check whether defect distributions match expected patterns or whether failure types are evenly distributed.
- **Feature selection in machine learning.** Chi-square scores measure the dependence between each feature and the target variable, helping practitioners select the most informative categorical features for classification models.
- **User research and survey analysis.** When survey responses involve categorical questions, chi-square tests reveal whether preferences, behaviors, or attitudes differ significantly across demographic groups.
- **Log and event analysis.** Operations teams apply chi-square tests to determine whether the distribution of error codes, response statuses, or incident types has changed between time periods.

## Interpreting Results

After computing the chi-square statistic, the result is compared against the chi-square distribution with the appropriate degrees of freedom. Degrees of freedom for a contingency table equal (number of rows minus 1) multiplied by (number of columns minus 1). Key outputs to examine include:

- **p-value.** The probability of observing a test statistic as extreme as the computed value, assuming the null hypothesis is true. A p-value below the chosen significance level (e.g., 0.05) leads to rejection of the null hypothesis.
- **Effect size.** The chi-square statistic alone does not convey the strength of association. Cramér's V is the most common effect size measure for contingency tables, ranging from 0 (no association) to 1 (perfect association). For 2x2 tables, the phi coefficient serves the same purpose.
- **Residuals.** Standardized residuals for each cell identify which specific category combinations contribute most to the overall chi-square statistic, providing insight beyond the aggregate result.

## Limitations

Chi-square analysis has notable limitations that practitioners should keep in mind:

- It detects association but does not establish causation.
- It does not indicate the direction or magnitude of a relationship without supplementary measures such as effect sizes or post-hoc residual analysis.
- It is sensitive to sample size: very large samples can produce statistically significant results for trivially small effects, while very small samples may lack power to detect real associations.
- It is not appropriate for continuous data unless the data is first discretized, which introduces information loss and arbitrary boundary decisions.

## Related

Related topics to explore next include hypothesis testing fundamentals, Fisher's exact test for small-sample categorical analysis, Cramér's V and phi coefficient for measuring association strength, contingency table design, A/B testing methodology, logistic regression as a more flexible alternative for modeling categorical outcomes, and the Bonferroni correction for controlling error rates when performing multiple chi-square tests simultaneously.

## Summary

Chi-square analysis is a foundational statistical technique for assessing whether two categorical variables are associated. It compares observed frequencies against expected frequencies derived under an assumption of independence, producing a test statistic that is evaluated against the chi-square distribution. Technology professionals use it extensively in A/B testing, quality assurance, feature selection, and user research. While straightforward to apply and interpret, the test requires that assumptions about independence, sample size, and expected cell counts are met, and it should be complemented by effect size measures and residual analysis to fully characterize the nature and practical significance of any detected association.

## References

- Pearson, K. (1900). "On the criterion that a given system of deviations from the probable in the case of a correlated system of variables is such that it can be reasonably supposed to have arisen from random sampling." *Philosophical Magazine*, 50(302), 157–175.
- Agresti, A. (2007). *An Introduction to Categorical Data Analysis* (2nd ed.). Wiley-Interscience.
- McDonald, J.H. (2014). *Handbook of Biological Statistics* (3rd ed.). Sparky House Publishing. Available at: https://www.biostathandbook.com/chiind.html
- NIST/SEMATECH e-Handbook of Statistical Methods. "Chi-Square Goodness-of-Fit Test." https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm
- Cramér, H. (1946). *Mathematical Methods of Statistics*. Princeton University Press.
