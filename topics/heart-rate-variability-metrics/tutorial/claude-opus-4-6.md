# Heart rate variability metrics

Heart rate variability (HRV) metrics quantify the variation in time intervals between consecutive heartbeats, known as inter-beat intervals (IBI) or normal-to-normal (NN) intervals. These metrics are derived from electrocardiogram (ECG) or photoplethysmography (PPG) data and serve as indicators of autonomic nervous system function, stress levels, cardiovascular health, and recovery capacity. HRV analysis spans three primary domains — time-domain, frequency-domain, and non-linear methods — each offering a distinct lens on cardiac dynamics. For technology professionals building health-monitoring platforms, wearable firmware, or clinical decision-support systems, understanding these metrics is essential for correct implementation, validation, and interpretation.


## Why HRV matters in technology

The autonomic nervous system (ANS) governs involuntary physiological processes through two branches: the sympathetic nervous system (SNS), which drives the fight-or-flight response, and the parasympathetic nervous system (PNS), which promotes rest and recovery. The heart does not beat at a perfectly regular rate; instead, beat-to-beat intervals fluctuate in response to autonomic input, respiration, blood pressure regulation, and hormonal cycles.

Higher HRV generally indicates a healthy, adaptable cardiovascular system with strong parasympathetic tone, while reduced HRV is associated with stress, fatigue, aging, and cardiovascular disease risk. This makes HRV a compelling biomarker for consumer wellness apps, clinical telemetry, athletic performance tracking, and occupational health platforms.


## Time-domain metrics

Time-domain metrics are the most computationally straightforward HRV measures. They apply basic statistical operations to a series of NN intervals and require no spectral transformation.

| Metric | Full Name | Formula Basis | What It Captures |
|--------|-----------|---------------|------------------|
| SDNN | Standard deviation of NN intervals | Standard deviation of all NN intervals | Overall HRV; reflects all cyclic components |
| RMSSD | Root mean square of successive differences | Square root of the mean of squared successive differences | Short-term variability; parasympathetic activity |
| pNN50 | Percentage of NN50 | Count of successive intervals differing by >50 ms, divided by total | Parasympathetic modulation |
| SDSD | Standard deviation of successive differences | Standard deviation of differences between adjacent NN intervals | Beat-to-beat variability |
| SDANN | Standard deviation of 5-min NN interval averages | Standard deviation of the means of NN intervals in 5-min segments | Long-term variability across segments |
| NN50 | Number of NN50 counts | Count of successive NN intervals differing by >50 ms | Raw count underlying pNN50 |

Key considerations for implementation:

- **SDNN** is the gold-standard summary statistic but is highly dependent on recording duration. A 5-minute SDNN is not comparable to a 24-hour SDNN. Always report recording length alongside the value.
- **RMSSD** is the preferred metric for short-duration recordings (under 5 minutes) because it is relatively stable across shorter windows and directly reflects vagal tone.
- **pNN50** is intuitive but has lower statistical power than RMSSD for short recordings and is sensitive to noise.
- When computing any time-domain metric, only normal sinus beats should be included. Ectopic beats, missed detections, and motion artifacts must be identified and excluded or interpolated during preprocessing.


## Frequency-domain metrics

Frequency-domain metrics decompose the NN interval time series into spectral components using methods such as the fast Fourier transform (FFT), Welch's periodogram, or autoregressive (AR) modeling. These methods reveal the oscillatory patterns embedded in heart rate fluctuations.

| Band | Frequency Range | Primary Physiological Origin | Typical Use |
|------|----------------|------------------------------|-------------|
| ULF | Below 0.003 Hz | Circadian rhythms, core body temperature | 24-hour recordings only |
| VLF | 0.003–0.04 Hz | Thermoregulation, renin-angiotensin system, hormonal fluctuations | Long recordings (minimum 5 minutes) |
| LF | 0.04–0.15 Hz | Mix of sympathetic and parasympathetic activity; baroreflex modulation | Sympathovagal assessment |
| HF | 0.15–0.4 Hz | Parasympathetic (vagal) tone; respiratory sinus arrhythmia | Vagal activity marker |

Important implementation details:

- **LF/HF ratio** has historically been used as an index of sympathovagal balance, but contemporary research increasingly questions this simplistic interpretation. The LF band reflects both sympathetic and parasympathetic contributions, not purely sympathetic drive. Report the ratio if required by standards, but avoid presenting it as a definitive measure of sympathetic dominance.
- **Power values** can be expressed in absolute units (ms squared) or normalized units (nu), where each band's power is expressed as a percentage of total power minus VLF. Normalized units facilitate comparison across individuals and conditions.
- **Windowing and overlap** matter significantly. Welch's method with 50% overlapping Hann windows is a common default. Autoregressive models (typically order 16) can yield smoother spectra from shorter recordings but require model order selection.
- The minimum recording duration for reliable LF estimation is approximately 2 minutes; for VLF, at least 5 minutes is required. The European Society of Cardiology and the North American Society of Pacing and Electrophysiology (ESC/NASPE) 1996 guidelines recommend 5-minute short-term and 24-hour long-term recording standards.


## Non-linear and geometric methods

Non-linear methods capture the complexity, regularity, and fractal-like properties of heart rhythm patterns that linear statistical and spectral techniques cannot fully describe.

- **Poincare plot analysis** plots each NN interval against the subsequent interval, forming an elliptical scatter. Two standard descriptors are derived: SD1 (short-axis width, reflecting short-term variability and parasympathetic activity) and SD2 (long-axis width, reflecting long-term variability and overall HRV). The SD1/SD2 ratio provides a measure of the balance between short- and long-term variability.

- **Sample entropy (SampEn)** quantifies the regularity or predictability of the NN interval series. Lower entropy values indicate more repetitive, predictable patterns, which are associated with pathological states. Higher values indicate complex, healthy dynamics. SampEn requires choosing two parameters: embedding dimension (commonly m=2) and tolerance threshold (commonly r=0.2 times the standard deviation of the data).

- **Detrended fluctuation analysis (DFA)** evaluates fractal-like correlation properties of the NN series across different timescales. DFA produces two scaling exponents: alpha-1 (short-term, 4–16 beats) and alpha-2 (long-term, 16–64 beats). Healthy hearts typically exhibit alpha-1 values near 1.0, indicating fractal behavior. Deviations from this value are associated with cardiac pathology.

- **Lempel-Ziv complexity (LZC)** measures the rate at which new patterns appear in the binary-encoded NN interval series. Higher complexity correlates with healthier autonomic regulation.

- **Triangular Index (HRV TI)** and **TINN** (triangular interpolation of the NN interval histogram) are geometric methods derived from the shape of the NN interval distribution histogram. The triangular index divides the total number of NN intervals by the height of the histogram's mode. TINN measures the baseline width of the triangle fitted to the histogram. Both are robust against artifact because they rely on the overall distribution shape rather than individual values.


## Preprocessing and signal quality

Reliable HRV computation depends critically on preprocessing. Poor signal quality, missed beats, and motion artifacts can drastically distort metric values.

- **R-peak detection**: The Pan-Tompkins algorithm remains widely used for ECG-based R-peak detection. For PPG signals, systolic peak or pulse-onset detection algorithms adapted for wrist-worn sensors are common, though PPG-derived intervals (pulse rate variability) are an approximation of true RR intervals.
- **Artifact correction**: Ectopic beats, missed beats, and extra detections must be identified. Common approaches include threshold-based filtering (removing intervals outside a percentage-based or adaptive threshold), interpolation (cubic spline or linear), and manual review for clinical-grade analysis.
- **Resampling**: Frequency-domain analysis requires evenly sampled data. Since NN intervals are inherently unevenly spaced, resampling (typically at 4 Hz using cubic spline interpolation) is necessary before applying FFT or similar methods.
- **Stationarity**: Most HRV metrics assume signal stationarity. For long recordings, segment the data into shorter windows (2–5 minutes) and analyze each window separately rather than computing a single metric across a non-stationary dataset.


## Recording duration and metric selection

Not all metrics are valid for all recording lengths. Choosing the right metric for the available data window is critical.

| Recording Duration | Recommended Metrics | Avoid |
|-------------------|--------------------|----|
| Ultra-short (<1 min) | RMSSD, pNN50 (with caution) | SDNN, all frequency-domain metrics |
| Short-term (2–5 min) | RMSSD, SDNN, pNN50, LF, HF, LF/HF, SD1, SD2, SampEn | VLF, ULF, SDANN |
| Long-term (24 hours) | All metrics including SDNN, SDANN, VLF, ULF, Triangular Index, TINN, DFA | None, but ensure stationarity analysis per segment |

For wearable and real-time applications, RMSSD is the most practical single metric. It is robust in short windows, correlates strongly with parasympathetic activity, and is computationally inexpensive.


## Standards and compliance

The foundational reference for HRV measurement is the 1996 ESC/NASPE Task Force guidelines, which define standard metrics, recommended recording durations, and analysis procedures. More recent updates and extensions include:

- The 2015 Shaffer and Ginsberg review consolidating clinical and physiological interpretations.
- The 2017 Laborde, Mosley, and Thayer guidelines for practical HRV research.
- The 2019 Electrophysiology Section position papers updating frequency-band definitions and non-linear method recommendations.

When building clinical or regulatory-facing systems, adherence to these standards is essential for metric comparability, peer review, and regulatory approval.


## Related

To deepen understanding of this domain, explore the following related topics: heart rate variability fundamentals and autonomic nervous system physiology, electrocardiogram signal processing and photoplethysmography, wearable sensor design and embedded systems for health monitoring, Holter monitor systems for long-duration cardiac recording, and signal processing techniques including spectral analysis, entropy measures, and fractal analysis. Understanding these adjacent areas will provide the broader context needed to implement, validate, and interpret HRV metrics in production systems.


## Summary

Heart rate variability metrics provide a quantitative window into autonomic nervous system function through three complementary analytical domains. Time-domain metrics such as SDNN and RMSSD offer statistically grounded measures of overall and short-term variability. Frequency-domain metrics decompose heart rate oscillations into physiologically meaningful spectral bands reflecting sympathetic, parasympathetic, and mixed autonomic influences. Non-linear methods including sample entropy, detrended fluctuation analysis, and Poincare plot descriptors capture the complexity and fractal properties of cardiac dynamics that linear methods miss. For technology professionals, the critical implementation considerations are correct preprocessing, appropriate metric selection for the available recording duration, and adherence to established measurement standards — without these, even mathematically correct computations can yield clinically meaningless results.


## References

- Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology. "Heart Rate Variability: Standards of Measurement, Physiological Interpretation, and Clinical Use." *Circulation*, vol. 93, no. 5, 1996, pp. 1043–1065. https://doi.org/10.1161/01.CIR.93.5.1043

- Shaffer, F., and Ginsberg, J.P. "An Overview of Heart Rate Variability Metrics and Norms." *Frontiers in Public Health*, vol. 5, 2017, article 258. https://doi.org/10.3389/fpubh.2017.00258

- Laborde, S., Mosley, E., and Thayer, J.F. "Heart Rate Variability and Cardiac Vagal Tone in Psychophysiological Research — Recommendations for Experiment Planning, Data Analysis, and Data Reporting." *Frontiers in Psychology*, vol. 8, 2017, article 213. https://doi.org/10.3389/fpsyg.2017.00213

- Richman, J.S., and Moorman, J.R. "Physiological Time-Series Analysis Using Approximate Entropy and Sample Entropy." *American Journal of Physiology — Heart and Circulatory Physiology*, vol. 278, no. 6, 2000, pp. H2039–H2049. https://doi.org/10.1152/ajpheart.2000.278.6.H2039

- Pan, J., and Tompkins, W.J. "A Real-Time QRS Detection Algorithm." *IEEE Transactions on Biomedical Engineering*, vol. BME-32, no. 3, 1985, pp. 230–236. https://doi.org/10.1109/TBME.1985.325532

- Peng, C.K., Havlin, S., Stanley, H.E., and Goldberger, A.L. "Quantification of Scaling Exponents and Crossover Phenomena in Nonstationary Heartbeat Time Series." *Chaos*, vol. 5, no. 1, 1995, pp. 82–87. https://doi.org/10.1063/1.166141
