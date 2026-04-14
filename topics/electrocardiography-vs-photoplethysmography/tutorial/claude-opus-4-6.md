# Electrocardiogram vs photoplethysmogram

An electrocardiogram (ECG) and a photoplethysmogram (PPG) both measure cardiac activity, but they rely on fundamentally different sensing mechanisms and serve different clinical roles. Understanding how these two modalities compare is essential for technology professionals working in digital health, wearable devices, clinical informatics, and biomedical signal processing. This tutorial provides a detailed breakdown of each technology, their relative strengths and limitations, and when to use one over the other.

## How ECG Works

An electrocardiogram measures the electrical activity of the heart using electrodes placed on the skin. These electrodes detect voltage changes generated as the heart's chambers depolarize and repolarize during each cardiac cycle. A standard clinical ECG uses 12 leads to provide a comprehensive spatial view of the heart's electrical vectors, while consumer and ambulatory devices may use as few as one or two leads.

The resulting waveform consists of well-defined components: the P wave (atrial depolarization), the QRS complex (ventricular depolarization), and the T wave (ventricular repolarization). These features enable clinicians to diagnose arrhythmias, conduction abnormalities, myocardial ischemia, and structural heart conditions. ECG is the gold standard for cardiac rhythm assessment and is directly diagnostic.

Hardware for ECG ranges from full clinical 12-lead systems and Holter monitors for continuous ambulatory recording to single-lead handheld devices such as the AliveCor KardiaMobile. All ECG hardware requires at least two electrodes to form a closed electrical circuit.

## How PPG Works

A photoplethysmogram measures changes in blood volume in the microvasculature by emitting light into the skin and detecting how much is absorbed or reflected. As the heart pumps blood, arterioles expand and contract, modulating the amount of light that reaches the photodetector. The resulting signal reflects the mechanical pulsatile activity of the cardiovascular system rather than the electrical activity.

PPG requires only a single contact point with a light source (typically green or infrared LED) and a photodetector. This simplicity means PPG sensors are inexpensive to manufacture and easy to embed into consumer devices including smartwatches, fitness bands, pulse oximeters, and smartphones.

PPG captures only ventricular activity; it cannot directly detect atrial depolarization because the P wave has no corresponding volumetric pulse in the peripheral vasculature. The PPG waveform is also delayed relative to the ECG signal due to pulse arrival time, the interval required for the pressure wave from ventricular contraction to travel through the arterial system to the peripheral sensor location.

## Key Differences at a Glance

| Feature | ECG | PPG |
|---|---|---|
| Signal origin | Electrical activity of the heart | Optical measurement of blood volume changes |
| Sensing mechanism | Skin electrodes detecting voltage | LED and photodetector detecting light absorption |
| Cardiac activity captured | Atrial and ventricular | Ventricular only |
| Key waveform components | P wave, QRS complex, T wave | Systolic peak, dicrotic notch |
| Minimum hardware | Two electrodes (closed circuit) | One LED and one photodetector |
| Typical devices | 12-lead systems, Holter monitors, handheld ECG | Smartwatches, pulse oximeters, smartphones |
| Diagnostic authority | Gold standard; directly diagnostic | Screening tool; requires ECG confirmation |
| Timing | Real-time electrical event | Delayed by pulse arrival time |
| Cost and accessibility | Moderate to high; clinical or dedicated device | Low; embedded in consumer electronics |

## Signal Correlation and Heart Rate Accuracy

Despite their different physical origins, both ECG and PPG signals are directly linked to the cardiac cycle. Studies comparing peak-to-peak intervals from PPG (pulse-to-pulse intervals) with RR intervals from simultaneously recorded ECG data have reported correlations as high as 99.3%. This demonstrates that PPG can accurately determine heart rate and pulse rhythm regularity under controlled conditions.

This high correlation makes PPG effective for continuous heart rate monitoring and for detecting irregularities such as atrial fibrillation (AF) through rhythm irregularity analysis, even though the PPG waveform lacks the P-wave morphology visible on ECG. Several large-scale studies, including the Apple Heart Study, have validated PPG-based AF screening in consumer devices with clinically meaningful positive predictive values.

## Heart Rate Variability Analysis

Both ECG and PPG can be used to derive heart rate variability (HRV) metrics, which quantify beat-to-beat timing variations and serve as indicators of autonomic nervous system function.

- **ECG-derived HRV** uses RR intervals (the time between successive R peaks in the QRS complex). This is the reference standard for HRV analysis because R peaks are sharp, well-defined, and resistant to motion artifact.
- **PPG-derived HRV** uses pulse-to-pulse intervals (PPI), measured between successive systolic peaks or between points on the rising edge of the PPG waveform. PPI-based HRV is generally reliable at rest but is more susceptible to motion artifact, vasoconstriction, and waveform morphology changes.

For time-domain metrics (SDNN, RMSSD) and frequency-domain metrics (LF, HF), PPG-derived values correlate well with ECG-derived values during stationary conditions. During physical activity or under conditions causing peripheral vasoconstriction, PPG accuracy degrades, and ECG remains the more reliable source.

## Clinical and Regulatory Considerations

ECG remains the authoritative modality for cardiac rhythm diagnosis. Regulatory bodies such as the FDA and CE marking authorities have cleared certain consumer ECG devices (e.g., Apple Watch ECG, AliveCor KardiaMobile) for specific indications such as AF detection. PPG-based AF detection features on smartwatches are generally cleared as screening tools that flag irregular rhythms for further evaluation, not as standalone diagnostic instruments.

Currently, PPG-based detection of atrial fibrillation in patients without a prior AF diagnosis requires a confirmatory ECG before treatment decisions are made. This two-stage workflow, where PPG screens and ECG confirms, is the dominant paradigm in digital health cardiology. Clinical oversight is required in both cases.

## Strengths and Limitations

**ECG strengths:**

- Full electrical characterization of the cardiac cycle, including atrial activity
- High temporal precision with sharp, artifact-resistant R peaks
- Directly diagnostic for arrhythmias, conduction disorders, ischemia, and more
- Established clinical evidence base and regulatory pathway

**ECG limitations:**

- Requires dedicated hardware and electrode placement
- Typically requires user-initiated recording (not always continuous)
- Less accessible for population-scale screening
- Skin preparation and electrode adhesion can affect signal quality

**PPG strengths:**

- Extremely low cost and easily embedded in consumer wearables
- Enables continuous, passive, long-term monitoring without user action
- Highly accessible for population-scale screening
- Can also measure SpO2, respiratory rate, and blood pressure estimates

**PPG limitations:**

- Cannot detect atrial electrical activity (no P wave equivalent)
- Susceptible to motion artifact, ambient light interference, and skin pigmentation effects
- Signal delayed relative to actual cardiac events
- Not independently diagnostic; requires ECG confirmation for clinical decisions

## Choosing Between ECG and PPG

The choice depends on the use case:

- **Clinical diagnosis and arrhythmia classification:** Use ECG. Only ECG provides the waveform detail needed for definitive rhythm interpretation.
- **Continuous passive screening at scale:** Use PPG. Its integration into everyday wearables enables long-term monitoring that would be impractical with ECG.
- **Post-screening confirmation:** Use ECG to confirm any irregularity flagged by PPG.
- **Heart rate monitoring during daily activity:** PPG is sufficient for most fitness and wellness applications.
- **Research requiring precise HRV analysis:** Prefer ECG for gold-standard timing accuracy, especially during movement.

In many modern digital health systems, ECG and PPG are complementary rather than competing. PPG casts a wide net through continuous passive monitoring, and ECG provides the diagnostic depth when an irregularity is detected.

## Related

Related topics to explore include heart rate variability metrics and their clinical interpretation, atrial fibrillation detection algorithms in wearable devices, photoplethysmography signal processing techniques, Holter monitors for continuous ambulatory ECG recording, pulse oximetry and SpO2 measurement, the AliveCor KardiaMobile device family, regulatory frameworks for software as a medical device (SaMD), and the emerging field of remote patient monitoring and digital biomarkers.

## Summary

ECG and PPG are complementary cardiac measurement modalities grounded in different physical principles: ECG captures the heart's electrical activity through skin electrodes, while PPG captures volumetric blood flow changes through optical sensors. ECG provides the richer, directly diagnostic signal with full atrial and ventricular characterization, making it the clinical gold standard. PPG offers unmatched accessibility and continuous monitoring capability through low-cost consumer hardware. Their combined use, where PPG screens passively and ECG confirms diagnostically, represents the current best practice in digital health cardiology and is the architectural pattern most technology professionals will encounter when building cardiac monitoring systems.

## References

- Tamura, T. "Current progress of photoplethysmography and SPO2 for health monitoring." Biomedical Engineering Letters, 2019.
- Castaneda, D. et al. "A review on wearable photoplethysmography sensors and their potential future applications in health care." International Journal of Biosensors & Bioelectronics, 2018.
- Perez, M.V. et al. "Large-scale assessment of a smartwatch to identify atrial fibrillation." New England Journal of Medicine, 2019 (Apple Heart Study).
- Georgiou, K. et al. "Can wearable devices accurately measure heart rate variability? A systematic review." Folia Medica, 2018.
- Goldberger, A.L. et al. "PhysioBank, PhysioToolkit, and PhysioNet: Components of a new research resource for complex physiologic signals." Circulation, 2000.
- U.S. Food and Drug Administration. "De Novo Classification Request for ECG App." FDA Decision Summary, 2018.
- Shaffer, F. and Ginsberg, J.P. "An overview of heart rate variability metrics and norms." Frontiers in Public Health, 2017.
