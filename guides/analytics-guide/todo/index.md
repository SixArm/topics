
### Key terms

Dashboards are tools used to display live data. Dashboards are typically
connected to data sources, and typically feature visualizations that
automatically update to reflect the most current data in the database.

Visualization is the representation of data and information in the form of
charts, diagrams, pictures, or tables to communicate information in a way
consistent with how the human brain interprets information and identifies
outliers quickly, accurately, and precisely.

Validation involves checking the accuracy and quality of source data before
using, importing, or processing data. While moving or merging data, it is
essential that data from different sources is not corrupted and is accurate,
complete, and consistent.

Information radiator

Metadata is data about data. It describes various characteristics of your data, such as how it was collected, where it’s stored, its file type, or creation date. Metadata can be particularly useful for verification and tracking purposes.

### Telemetry

* Metrics
* Logs
* Traces
* Spans

### Misc

Profiling: Determining its characteristics, relationships, and patterns within the data in order to produce a clearer view of its content and quality. So, It involves collecting descriptive statistics, data types, length, and recurring patterns, tagging data with keywords, descriptions, or categories, data quality assessment, risk of performing joins on the data, discovering meta-data, and assessing its accuracy, identifying distributions, key candidates, foreign-key candidates, functional dependencies, embedded value dependencies, and performing inter-table analysis.


### Data quality dimensions

Completeness is a data quality dimension and measures the existence of require data attributes in the source in data analytics terms, checks that the data includes what is expected and nothing is missing. For example, the unique record identifier key is not null, or other mandatory fields are not null.

Conformity is a data quality dimension, and so it measures how well the data aligns to internal, external, or industry-wide standards. For example, invalid identification card numbers, inconsistent date formats, or violation of allowable values.

Consistency is a data quality dimension and tells us how reliable the data is in data analytics terms. So, It confirms that data values, formats, and definitions are similar in all the data sources. For example, telephone numbers with commas in one source and hyphens in another, US and European date formats, and dot and comma decimal separators.

Timeliness is a data quality dimension that tells us whether data is fresh and current and whether data is functionally available when needed.For example, data files are delivered late, updates of scores are not completed on time.

Uniqueness is a data quality dimension that refers to the singularity of records or attributes. For example, identifying any duplicates in the data sets.

### Statistics

Statistical Tools
A
ANOVA
A statistical analysis method, also known as variance analysis, compares two or more means of samples with a single test and is used in data analytics terms. The independent variables are usually nominal, and the dependent variable is usually interval. The test determines whether the mean differences between these groups are statistically significant.

For example, “What is the difference in average pain level (dependent, interval) among post-surgical patients given three different painkillers (independent & nominal)?” You can determine whether the differences between pain level means for three painkillers are statistically significant.

Null hypothesis: All pairs of samples are the same, i.e., all sample means are equal. Alternate hypothesis: At least one pair of samples is significantly different. The statistics used to measure the significance, in this case, are called F-statistics. Also, see Hypothesis Testing, Nominal Variable, Interval Variable, Sample.

C
Causation
Causation means that one event causes another event to occur. A Causation can only be determined from an appropriately designed experiment. In such experiments, similar groups receive different treatments, and the outcomes of each group are studied. We can only conclude that treatment causes an effect if the groups have noticeably different outcomes. It is also referred to as cause and effect. Also, see Correlation.

Chi-square test
The Chi-square test is used to see if there is a relationship between two categorical variables without assuming cause-and-effect relationships. E.g., How is sports membership related to drama membership in high school students?

Null Hypothesis: Variable A and Variable B are independent.

Alternate Hypothesis: Variable A and Variable B are not independent.

The statistic used to measure significance, in this case, is called the chi-square statistic. It is mainly used to test the significance of statistical independence or association between two or more nominal or ordinal variables.

Confidence Interval and Level
We usually do not have access to the entire population’s values. We can use the sample data to construct a confidence interval to estimate the population parameter with a certain level of confidence. This is a type of statistical inference.

A confidence interval is a range of values derived from sample statistics in data analytics terms, which is likely to contain the value of an unknown population parameter (mean, standard deviation, regression coefficients). If a random sample is drawn multiple times, a certain percentage of the confidence intervals will contain the unknown population parameter. This percentage is the confidence level. Thus, confidence intervals contain a range of reasonable estimates of the population parameter.

For example, to estimate the average happiness score of people between ages 30 to 50, we will have to select a sample as we cannot include the entire population. If we construct a 95% confidence interval for the mean happiness score in the sample. If the 95% confidence interval for the mean is 48 to 52, then it can be said that we are 95% confident that the mean happiness score of all people aged between 30 and 50 is between 48 and 52.

Also, see Population, Sample.

Confounding Variable
A confounding variable is an extra independent variable in analytics that has a hidden effect on the dependent variables. They are closely related to the independent and dependent variables.

For example, the sales for chocolates and cookies increased in parallel with a retail store’s operational costs in July and August. Does this mean that an increase in cookies and chocolates causes an increase in operational costs? That is not the case. The holiday season is the confounding variable bringing both the factors (increase in sales and operational costs) together.

Also, see Causation and Correlation.

Continuous Variables
Continuous variables have an infinite range of possible values. Contrast to discrete variables.

For example, time, or temperature, can take on a value between any other two values like 15.4°C or 15.46°C or 15.467°C.

Correlation
Correlation shows if there is a relationship or pattern between the values of two variables. It measures both the direction (positive or negative or none) and the strength of the linear relationship between two variables (coefficient of correlation with a value between -1: high negative correlation and +1: high positive correlation).

When X is higher, Y also tends to be higher, showing a positive correlation, and when X is higher, Y tends to be lower shows a negative correlation.

Correlation
Correlation
For example, Ice-cream sales and temperature will show a moderate negative correlation.

Correlation does not necessarily imply causation. Correlation indicates that the values vary together. It does not necessarily suggest that changes in one variable cause changes in the other variable.

Also, see Causation.

Covariance
Covariance evaluates the extent to which one variable changes in relation to the other variable. We can only get an idea about the direction of the relationship, but it does not indicate the relationship’s strength.  A positive covariance denotes a direct relationship, whereas a negative covariance denotes an inverse relationship. The value of covariance lies in the range of -∞ and +∞.

D
Descriptive Statistics
Descriptive statistics are non-parametric statistics that provide simple, quantitative summaries of datasets, usually combined with explanatory graphics. They provide easy-to-understand information that helps answer basic questions based on the average, spread, deviation of values, and so on. They give a rough idea about what the data is indicating so that later they can perform more formal and targeted analyses.

For example, measures of central tendency give a one-number summary of the central point of the dataset, and measures of dispersion describe the spread of the data around the central value.

Discrete Variable
A discrete variable is measured only in whole units like the number of players, the number of participants, or the count of model products.

Distribution
Distribution is the arrangement of data by the values of one variable, from low to high. This arrangement, and its characteristics, such as shape and spread, provide information about the underlying sample.

E
Error
Error is the difference between the actual and the predicted value. (Actual value – Predicted value).

Error Rate
The inaccuracy of predicted output values is termed the error of the model. The error rate is used to assess the model performance of how often the model predicts incorrectly. It can be calculated as (FP+FN)/(TP+FP+TN+FN).

H
Hypothesis Tests
Hypothesis tests are also called significance tests in data analytics terms. A hypothesis test starts with some idea of what the population is like and then tests to see if the sample supports this idea. They are used mainly in problem analysis to transform intuitive assessments into verifiable and measurable evaluations or a research problem. It provides a scientific way to verify hunches, intuition, and experience-based decisions.

It is advantageous when data captured is limited to only a subset or sample of the whole population. Every hypothesis test contains two hypotheses – the null and the alternative hypotheses. Typically, the null hypothesis says that nothing new is happening and is denoted as H0. In general, we assume the claim to be valid until proven otherwise. The alternate hypothesis is the negation of the default position. It is denoted as H1.

For example,

Null hypothesis = “no difference between the means of group A and group B”;

Alternative hypothesis = “A is different from B” (could be bigger or smaller)

I
Inferential Statistics
Inferential Statistics helps draw inferences and generalizations for the population by assessing the sample subset.

For example, the population can comprise all customers using the mobile network of a company ABC across geographies. It is not possible many times to survey the entire population given the large number; hence, we select a smaller group from the population. It is representative of the population. Inferential statistics include hypothesis testing, regression analysis, and Bayesian inference.

Also, see Hypothesis Testing, Regression Analysis.

Interquartile range (IQR)
The interquartile range is the difference between the upper (Q3) and lower (Q1) quartiles. It is less sensitive to extreme outliers than the range as a measure of the spread of data.

Interquartile range (IQR)
Interquartile range (IQR)
Also, see Outliers, Range.

Interval Variable
An interval variable is a variable in which both order of data points and the distance between them can be determine, but it has no real zero-point like temperature, pH, and SAT score. In this case, no zero point means that 100°F is not “5 times as hot as” 20°F.

K
Kurtosis
Kurtosis describes whether the data is light-tailed – indicating lack of outliers or heavy-tailed – indicating the presence of outliers compared to a normal distribution. Low kurtosis in a data set is an indicator that data has light tails or lack of outliers. Histogram works well to show kurtosis.

Also, see Outliers, Range.

M
Mean
Mean is the average score within a distribution. It is the ratio of the sum of all values in the data to the total number of values.

Mean Absolute Error
Mean absolute error is one of the many metrics to summarize and assess the machine learning model’s quality. It is the average of the absolute errors in a set of predictions.

Mean Absolute Error
Mean Absolute Error
Also, see Error.

Mean Squared Error
Mean squared error is the sum of the square of the difference between the predicted and actual value divided by the total number of data points. It measures the variance of the residuals.

Mean Squared Error
Mean Squared Error

Median
Median is the center score in a distribution.

For example, median of 25, 40, 75, 80, 65, 69, 60, 57, 75, 54, 50 is 60.

Mode
Mode is the most frequent/popular score in a distribution.

For example, mode of 25, 40, 75, 80, 65, 69, 60, 57, 75, 54, 50 is 75.

Useful Links – Data Analytics Certification Training | Data Analytics Fundamentals Course | CBDA certification training | Power BI Certification Course

Monte Carlo Simulation
Monte Carlo Simulation is a mathematical problem-solving and risk-assessment technique used in data analytics terms that approximates the probability and risk of specific outcomes using computerized simulations of random variables. It is helpful to understand better the implications of a particular course of action or decision.

For example, telecom companies use this simulation to assess network performance in different scenarios, optimizing the network. 

Also, see Probability.

N
Nominal Variable
A nominal variable is a variable determined by categories that cannot be ordered, like gender and color.

Normal Distribution
Normal Distribution is the most common distribution. Here, the mean, median, and mode of the Distribution are equal, and the curve of the Distribution is bell-shaped, unimodal, and symmetrical about the mean. The curve’s spread is determined by its standard deviation (σ), showing that more data is near the mean (μ). The total area under the curve is one as it represents the probability of all outcomes.

Normal Distribution
Normal Distribution
Also, see Mean, Standard Deviation.

O
Ordinal Variable
An ordinal variable is a variable in which the order of data points can determine but not the distance between them.

For example, socioeconomic status (“low,” “medium,” “high”), income level (“less than 50K”, “50K-100K, “over 100K”), question type (very hard/somewhat hard/okay/easy/very easy).

Outliers
Outliers are values that are distant from most other values.

P
P-Value
P-value tells us that if the p-value(probability) is less, then the null hypothesis does not hold in real life. If the p-value is lower than a predetermine significance level(alpha), usually 0.05, then the null hypothesis is rejected.

For example, if the pizza delivery time is 30 minutes or less (null hypothesis is true), how true is it in real life? This is answered by p-value probability. If we find that the mean delivery time is longer by 10 mins and we get the p-value as 0.03, there is a 3% chance that the mean delivery time is at least 10 minutes longer due to noise. As this p-value is less than alpha (0.05), the null hypothesis of a mean delivery time of fewer than 30 minutes is rejected.

Also, see Hypothesis Testing.

Percentile
Percentiles split the sample data into hundredths. Percentiles indicate the values below which a certain percentage of the data in a data set is found. They help understand where a value falls within a distribution of values, divide the dataset into portions, identify the central tendency, and measure a distribution’s dispersion.

The 25th percentile is equivalent to the lower quartile, and the 50th percentile is the same as the median.

For example, the score of a batch of students is as follows: 25, 40, 50, 54, 57, 60, 64, 65, 69, 75, 75, 76, 80, 80, 84. The 3rd value is 50, which marks the 20th percentile of the students in the class. This indicates that 20% of students earned a score of 50 or lower.

Population
The population is the target group under investigation, like all working people earning a daily salary. The population is the entire set under consideration. Samples are drawn from populations.

Also, see Sample.

Probability
Probability is the chance that a phenomenon has of occurring randomly.

R
Range
The range is the difference between the highest and lowest scores in a distribution. For example, range of 25, 40, 75, 80, 65, 69, 60, 57, 75, 54, 50 is 80 – 25 = 55

It describes only the data’s width but not how it is dispersed between the range. It is sensitive to outliers and may give misleading results in that case.

Ratio Variable
A ratio variable is a variable in which both order of data points and distance between them can be determine, and for which there is a real zero point, such as weight or distance.

Residual
A residual is a measure of how well a line fits an individual data point.

It is the vertical distance between a data point and the regression line. If the data point is above the regression line, it is positive; if the data point is below the regression line, it is negative, and if the regression line passes through the point, it is zero.

Ratio Variable
Ratio Variable
Root Mean Squared Error
Root mean squared error is the square root of the average of squared differences between prediction and actual observation. (The square root of mean squared error.)

Also, see Mean Squared Error.

S
Sample
It is not possible many times to survey the entire population given the large number; hence, a smaller group is selected. This sample is representative of the population. By studying the sample, the researcher tries to draw valid conclusions about the population.

Also, see Population.

Skew
Skew is the measurement of symmetry in a probability distribution. The positions of median, mode and mean for different skewness in data. A histogram is effective in showing skewness.

Skewness gives us an idea about the direction of the outliers and is also used in data analytics terms.

For example, this histogram shows the maximum wind speed of all the hurricanes. We can observe that most of the distribution is saturated on the left side between 30 – 40 Kt. This tells us that the maximum wind speeds are concentrated on the lower side, indicating that not many storms are severe.

Also, see Mean, Median, Mode.

Skew
Skew
Standard Deviation
Standard Deviation
Standard deviation is the variance that gives the spread in terms of squared distance from the mean, and the unit of measurement is not the same as the original data.

For example, if the data is in meters, the variance will be in squared meters is not intuitive. It is the square root of variance.

Also, see Variance, Mean.

Standardization (Z-Score normalization)
The independent features will be rescaled to have the properties of a standard normal distribution with a mean of 0 and a standard deviation of 1. They can be calculated using the formula for z scores:

Standardization 
Standardization
It is useful for comparing measurements that have different units. Also, see Normal Distribution, Mean, Standard Deviation.

Statistics
Statistics is a form of mathematical analysis of data leading to reasonable conclusions from data. It is helpful while evaluating claims, drawing key insights, or making predictions and decisions using data.

T
Test Statistic
A test statistic is a random variable calculated from the sampled data under the assumption that the null hypothesis is correct. The test statistics magnitude becomes too large or too small when the data shows strong evidence against the null hypothesis premises. Different hypothesis or statistical tests like Z-test, t-test, ANOVA, Chi-square test use various test statistics like Z-statistic, t-statistic, f-statistic, and Chi-square statistic respectively.

Also, see Hypothesis Tests.

Useful Links – Data Analytics Certification Training | Data Analytics Fundamentals Course | CBDA certification training | Power BI Certification Course

T-test
The T-test is used to compare the mean of precisely two given samples. (Paired t-test: Samples from the same population, Independent t-tests: Samples from different populations.) Like a z-test, a t-test also assumes a normal distribution of the sample. A t-test uses when the population parameters (mean and standard deviation) are not known. The statistic for this hypothesis testing is called t-statistic. Also, see z-test.

Also, see Mean, Population, Hypothesis Tests.

V
Variance
Variance is the variability of model prediction for a given data point. A model with high variance pays a lot of attention to training data and does not generalize on unknown data. Hence, such data analytics terms perform very well on training data but have high error rates on test data. Also, see bias.

Variance is also a statistic of measuring spread, and it is the average of the distance of values from the mean squared.

Variance 
Variance
Z
Z-Test
The sample is assumed to be normally distributed. A z-score is calculate with population parameters such as “population mean” and “population standard deviation” and is use to validate a hypothesis that the sample drawn belongs to the same population.

Null hypothesis: Sample mean is the same as the population means.

Alternate hypothesis: Sample mean is not the same as the population mean.

The statistics used for this hypothesis testing are called z-statistic. Also, see Mean, Population, Hypothesis Tests.


### Tools

* Granfana
* OpenTelemetry
* Embrace
* Datadog, Dynatrace, New Relic, Splunk

### Data

Analytics lifecycle: the plan and design for the entire analytics lifecycle for an organization, starting with experimental hypotheses and going all the way to when value is generated from data through analytics.

Data catalog is the pathway — or a bridge — between a business glossary and a data dictionary. It is an organized inventory of an organization’s data assets that informs users — both business and technical — on available datasets about a topic and helps them to locate it quickly.

Data democratization is the process of providing all business users within an organization — technical and non-technical — access to data and enabling them to use it, when they need it, to gain insights and expedite decision-making.

Data dictionary is the technical and thorough documentation of data and its metadata within a database or repository. It consists of the names of fields and entities, their location within the database or repository, detailed definitions, examples of content, descriptions for business interpretation, technical information like type, width, constraints, and indexes, and business rules and logic applied to derived or semantic assets.

Analytics engineering is the process and practices needed to transform raw data into meaningful and actionable information. Common analytics engineering tasks involve data collection, extraction, curation, ingestion, storage, movement, transformation, and integration.

Analytics ingestion is the process by which data is loaded from various sources to a storage medium — such as a data warehouse or a data lake — where it can be accessed, used, and analyzed.

Analytics integration is the process of connecting disparate analytics tooling together for operational uses.

Analytics governance is the way an organization ensures that its analytics policies, practices, and processes are followed. When executed properly, a governance program should also clearly define who ultimately owns the analytics, who stewards it when something needs to be corrected or maintained, and who uses it to ensure that downstream impacts of change are monitored. An analytics governance framework defines how you will implement a analytics governance program. It creates a single set of rules and processes around analytics management, and in turn makes it easier to execute your data governance program.

Analytics lake is a central data repository that accepts relational, structured, semi-structured, and non-structured data types in a low-to-no modeling framework, used for tasks such as reporting, visualization, statistics, and machine learning. An analytics lake can be established on premises (within an organization’s data centers) or in the cloud.

### AI Learning

Supervised learning uses labeled data — data that comes with a target or identifier such as a name, type, or number — and guided learning to train models to classify data or to make accurate predictions. It is the simplest of the two types of machine learning, the most used, and the most accurate because the learning is guided using known historical targets that you can plug in to get the outcome.

Unsupervised learning uses unlabeled data — data that does not come with a target or identifier — to make predictions. It uses artificial intelligence algorithms to identify patterns in datasets and doesn’t have a defined target variable. Unsupervised learning can perform more complex tasks than supervised learning, but has the potential to be less accurate in its predictions, and possibly have reduced interpretability with additional analysis.

