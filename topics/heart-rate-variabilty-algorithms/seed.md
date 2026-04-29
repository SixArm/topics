# Heart rate variability algorithms

Heart rate variability (HRV) can be analyzed in various ways.

| Metric Full Name                                                          | Primary Focus                       | Physiological Driver              | Best Use Case                                   |
| ------------------------------------------------------------------------- | ----------------------------------- | --------------------------------- | ----------------------------------------------- |
| Standard Deviation of Normal-to-Normal intervals (SDNN)                   | Overall Variability (Long-term)     | Sympathetic & Parasympathetic     | 24-hour stress load, health risk assessment     |
| Root Mean Square of Successive Differences (RMSSD)                        | Short-term Variation (Beat-to-beat) | Primarily Parasympathetic (Vagal) | Daily recovery, training readiness              |
| Natural Logarithm of Root Mean Square of Successive Differences (lnRMSSD) | Normalized Short-term Variation     | Primarily Parasympathetic (Vagal) | Personal baseline tracking, morning spot-checks |

## What to use

If you are analyzing medical data for cardiology, then use SDNN.

If you are checking your morning readiness, use RMSSD.

If you are checking your morning readiness comparing to your baseline over the long-term, use lnRMSSD.

## Detailed Contrast

SDNN:

- What it measures: The standard deviation of all normal-to-normal heartbeats in a recording window.
- Scope: Captures both short-term variability and long-term, slow shifts (e.g., circadian rhythms).
- Sensitivity: Highly sensitive to the duration of the recording. A 24-hour SDNN will be higher than a 5-minute SDNN.
- Best for: Looking at broad cardiovascular health trends over long periods (e.g., in a clinical setting).

RMSSD:

- What it measures: The difference between each successive pair of heartbeats, squared, averaged, then square-rooted.
- Scope: Focuses only on fast, consecutive beat-to-beat changes.
- Sensitivity: Less sensitive to slow, long-term trends and is robust to variations in recording duration (ideal for short 1-5 minute checks).
- Best for: Daily monitoring of training load, fatigue, and recovery in athletes, as it directly mirrors vagal tone.

lnRMSSD:

- What it measures: The raw RMSSD value transformed using a natural logarithm.
- Purpose: Because RMSSD data can be skewed, taking the logarithm makes the data follow a "normal" statistical distribution.
- Best for: Making daily tracking more interpretable. It reduces the impact of extreme outliers and allows for better comparison of trends over time.

## Age

Both RMSSD and SDNN generally decrease with age, but RMSSD tends to stabilize in the later decades, sometimes increasing after age 70.
