# electrocardiogram

An electrocardiogram (ECG or EKG) is a diagnostic test that records the heart's electrical signals through electrodes placed on the skin. The output is a time-series waveform graph showing voltage changes per cardiac cycle. It measures heart rate, rhythm regularity, and conduction pathway integrity, making it a foundational tool for detecting arrhythmias, ischemia, and structural damage. The procedure is noninvasive, safe, and takes only a few minutes for a resting test. For technology professionals, the ECG represents one of the most well-structured biomedical signals available for digital processing, algorithmic analysis, and machine learning applications.

## How It Works

The heart generates electrical impulses that coordinate muscular contraction in a precise sequence. Each heartbeat begins with the sinoatrial (SA) node firing in the right atrium, spreading through both atria, passing through the atrioventricular (AV) node, and then propagating through the ventricles via the bundle of His and Purkinje fibers. An ECG captures the voltage differences produced by this electrical activity as it travels through body tissue to electrodes on the skin surface. The result is a repeating waveform pattern that reflects each phase of the cardiac cycle.

## The Standard 12-Lead ECG

The standard 12-lead ECG uses 10 physical electrodes placed on the chest, arms, and legs to capture electrical activity from 12 different vectors. Each lead provides a distinct perspective on the heart's depolarization and repolarization cycle.

| Lead Group | Leads | Placement | Cardiac View |
|---|---|---|---|
| Limb leads | I, II, III | Right arm, left arm, left leg | Frontal plane (coronal view) |
| Augmented limb leads | aVR, aVL, aVF | Derived from limb electrodes | Frontal plane (augmented angles) |
| Precordial leads | V1 through V6 | Across the chest wall | Horizontal plane (transverse view) |

The combination of these 12 views enables clinicians and algorithms to localize abnormalities to specific cardiac regions. For example, ST elevation in leads II, III, and aVF suggests inferior myocardial infarction, while changes in V1 through V4 point to anterior wall involvement.

## Waveform Components

The key waveform components of a single cardiac cycle are as follows:

- **P-wave**: Represents atrial depolarization. A normal P-wave is small, upright in lead II, and lasts less than 120 milliseconds. Abnormalities suggest atrial enlargement or ectopic atrial rhythms.
- **PR interval**: The time from the onset of the P-wave to the start of the QRS complex, normally 120 to 200 milliseconds. A prolonged PR interval indicates first-degree heart block; a shortened interval may indicate pre-excitation syndromes such as Wolff-Parkinson-White.
- **QRS complex**: Represents ventricular depolarization. Normal duration is 80 to 120 milliseconds. A widened QRS suggests bundle branch block or ventricular origin of the impulse.
- **ST segment**: The interval between ventricular depolarization and repolarization. Elevation or depression of this segment relative to the baseline is a critical marker for ischemia and infarction.
- **T-wave**: Represents ventricular repolarization. Inverted or peaked T-waves can indicate ischemia, electrolyte imbalances, or other pathology.
- **QT interval**: Measured from the start of the QRS to the end of the T-wave, this reflects the total duration of ventricular electrical activity. A prolonged QT interval increases risk of dangerous arrhythmias.

## ECG Variants and Extended Monitoring

Beyond the standard resting ECG, several variants exist to capture cardiac events that may not appear during a brief recording:

| Variant | Duration | Use Case |
|---|---|---|
| Resting 12-lead ECG | Seconds to minutes | Baseline assessment, acute symptoms |
| Exercise stress test | 10 to 15 minutes under exertion | Detecting ischemia provoked by physical load |
| Holter monitor | 24 to 48 hours continuous | Capturing intermittent arrhythmias |
| Event monitor | Days to weeks, patient-activated | Infrequent symptomatic episodes |
| Implantable loop recorder | Up to 3 years | Cryptogenic stroke, rare syncope |
| Wearable single-lead ECG | Continuous or on-demand | Consumer-grade continuous monitoring |

These variants are particularly useful for diagnosing conditions that manifest only under specific circumstances, such as paroxysmal atrial fibrillation or exercise-induced ischemia.

## Digital Signal Processing and Data Characteristics

From a technology perspective, ECG data is a well-structured, high-frequency signal that lends itself to digital processing. Key technical characteristics include:

- **Sampling rate**: Clinical-grade systems typically sample at 250 to 1000 Hz per channel. Consumer wearables often operate at 250 to 512 Hz on a single lead.
- **Resolution**: 12- to 16-bit analog-to-digital conversion captures the millivolt-range signal with sufficient precision.
- **Data format**: Standard interchange formats include HL7 aECG (XML-based), SCP-ECG (ISO 11073), and DICOM Waveform. Proprietary vendor formats remain common and often require conversion.
- **Signal conditioning**: Raw ECG signals require baseline wander removal (high-pass filtering), powerline interference rejection (notch filter at 50 or 60 Hz), and muscle artifact suppression (low-pass filtering).

Once digitized, automated algorithms measure intervals (PR, QRS, QT), detect peaks (R-peak detection for heart rate calculation), classify morphology, and flag abnormalities. The Minnesota Code and Marquette 12SL algorithm are well-established interpretive systems used in clinical devices.

## Machine Learning and ECG Analysis

Machine learning models trained on large ECG datasets can flag abnormalities with high sensitivity, enabling faster triage in clinical workflows. Key application areas include:

- **Arrhythmia classification**: Convolutional neural networks and recurrent neural networks trained on annotated rhythm databases (such as MIT-BIH and PhysioNet) achieve cardiologist-level accuracy for common rhythm disorders.
- **Myocardial infarction detection**: Deep learning models can identify subtle ST-T changes that may be missed on visual inspection, particularly in non-ST-elevation events.
- **Age and sex prediction**: ECG-based models can estimate biological age and detect sex-discordant patterns, serving as potential biomarkers for cardiovascular risk.
- **Screening for non-cardiac conditions**: Research models have demonstrated the ability to detect conditions such as hypokalemia, left ventricular dysfunction, and even some forms of anemia from ECG waveform features alone.

For technology professionals building or integrating ECG analysis systems, access to curated, labeled datasets is essential. PhysioNet provides several open-access databases, and regulatory pathways (FDA 510(k) or De Novo) apply to any software that provides clinical interpretation.

## Clinical Conditions Detected by ECG

The following table summarizes major conditions identifiable through ECG interpretation:

| Condition | Key ECG Findings |
|---|---|
| Atrial fibrillation | Irregularly irregular rhythm, absent P-waves, fibrillatory baseline |
| Atrial flutter | Sawtooth flutter waves, typically at 300 bpm atrial rate |
| First-degree heart block | Prolonged PR interval greater than 200 ms |
| Bundle branch block | Widened QRS with characteristic morphology (RSR' pattern in RBBB) |
| Myocardial infarction (acute) | ST elevation, reciprocal ST depression, pathological Q-waves |
| Myocardial ischemia | ST depression, T-wave inversion |
| Long QT syndrome | Corrected QT interval exceeding 460 to 480 ms |
| Ventricular tachycardia | Wide-complex tachycardia with regular rate |
| Hyperkalemia | Peaked T-waves, widened QRS, sine wave pattern in severe cases |

## Related

Related topics to explore next include cardiac electrophysiology for deeper understanding of the electrical conduction system, the Marquette 12SL algorithm and other automated interpretation systems, Holter monitoring and ambulatory ECG analysis, wearable health technology platforms such as Apple Watch and AliveCor that provide consumer-grade ECG capabilities, PhysioNet and its open-access biomedical signal databases, time-series signal processing techniques applicable to biomedical data, and regulatory frameworks (FDA SaMD guidance) governing software that performs clinical ECG interpretation.

## Summary

The electrocardiogram is a noninvasive, rapid diagnostic test that captures the heart's electrical activity as a structured time-series signal. The standard 12-lead configuration provides multi-angle views of cardiac depolarization and repolarization, enabling detection of arrhythmias, ischemia, conduction abnormalities, and structural changes. For technology professionals, the ECG is a well-characterized signal with established data formats, proven algorithmic analysis pipelines, and growing machine learning applications. Its expansion into wearable consumer devices has created new opportunities in continuous monitoring, real-time alerting, and large-scale population health analytics, while also introducing challenges in data quality, regulatory compliance, and clinical validation.

## References

- Goldberger, A.L., et al. "PhysioBank, PhysioToolkit, and PhysioNet: Components of a New Research Resource for Complex Physiologic Signals." Circulation, 2000. https://physionet.org/
- Kligfield, P., et al. "Recommendations for the Standardization and Interpretation of the Electrocardiogram." Circulation, 2007.
- Hannun, A.Y., et al. "Cardiologist-level arrhythmia detection and classification in ambulatory electrocardiograms using a deep neural network." Nature Medicine, 2019.
- U.S. Food and Drug Administration. "Software as a Medical Device (SaMD): Clinical Evaluation Guidance." FDA, 2017.
- Macfarlane, P.W., et al. "Comprehensive Electrocardiology." Springer, 2010.
- IEC 60601-2-25: Medical electrical equipment — Particular requirements for the basic safety and essential performance of electrocardiographic equipment.
