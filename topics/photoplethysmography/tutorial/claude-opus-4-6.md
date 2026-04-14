# Photoplethysmography (PPG)

Photoplethysmography (PPG) is a non-invasive optical measurement technique that detects volumetric changes in blood flow within microvascular tissue by using light. Originally developed in the 1930s and brought to clinical prominence through pulse oximetry in the 1970s, PPG has become one of the most widely deployed biosensing technologies in the world. It underpins heart rate monitors in smartwatches, finger-clip pulse oximeters in hospitals, and an expanding set of cardiovascular health features in consumer electronics. For technology professionals working in health tech, wearables, signal processing, or embedded systems, understanding PPG is essential because it sits at the intersection of optics, physiology, and real-time data processing.

## Operating Principles

PPG works by shining light from an LED into the skin and measuring how much light is absorbed or reflected by underlying tissue. Blood absorbs more light than surrounding tissue, and because blood volume in the capillary bed changes with each heartbeat, the amount of absorbed light fluctuates in a periodic pattern synchronized to the cardiac cycle.

There are two primary sensor configurations:

| Configuration | How It Works | Typical Use |
|---|---|---|
| **Transmissive** | Light passes through tissue (e.g., fingertip or earlobe) to a photodetector on the opposite side | Finger-clip pulse oximeters, clinical monitors |
| **Reflective** | Light is emitted and detected on the same side of the tissue, measuring backscattered light | Wrist-worn wearables, ring-form-factor devices, smartphones |

During systole, arterial blood volume increases, raising absorption and reducing the amount of light reaching the photodetector. During diastole, blood volume decreases and more light is detected. The photodetector converts these optical fluctuations into an electrical signal, producing the characteristic PPG waveform.

## Light Wavelengths and Sensor Design

The choice of LED wavelength directly affects measurement depth, signal quality, and what physiological parameters can be extracted. Different wavelengths penetrate tissue to different depths and interact differently with oxygenated and deoxygenated hemoglobin.

| Wavelength | Color | Penetration Depth | Primary Use |
|---|---|---|---|
| 525–535 nm | Green | Shallow (~1–2 mm) | Heart rate monitoring in wrist-worn devices |
| 630–660 nm | Red | Medium (~3–5 mm) | SpO2 measurement (oxygenated hemoglobin) |
| 850–940 nm | Infrared (IR) | Deep (~5–10 mm) | SpO2 measurement (deoxygenated hemoglobin) |

Green light is preferred for wrist-based heart rate sensing because it has a high absorption coefficient in blood and a short penetration depth, which reduces interference from deeper tissue layers. Red and infrared wavelengths are used in tandem for pulse oximetry because oxygenated and deoxygenated hemoglobin absorb these wavelengths differently, enabling calculation of arterial oxygen saturation (SpO2) via the ratio of ratios method.

Modern PPG sensor modules integrate multiple LEDs, a photodetector (typically a photodiode or phototransistor), an analog front end with programmable gain and ambient light rejection, and an ADC. Common chipsets include the Maxim Integrated MAX30102 and the Texas Instruments AFE4404.

## The PPG Waveform

The raw PPG signal consists of two superimposed components:

- **AC component (pulsatile):** This is the time-varying portion caused by arterial blood volume changes with each cardiac cycle. It carries information about heart rate, heart rate variability, pulse transit time, and vascular compliance. The AC component is typically only 1–2% of the total signal amplitude.

- **DC component (non-pulsatile):** This represents the baseline absorption from venous blood, non-pulsatile arterial blood, tissue, bone, and skin pigmentation. It changes slowly with respiration, vasomotor activity, and thermoregulation.

Key morphological features of the AC waveform include:

- **Systolic peak:** The maximum point corresponding to peak arterial blood volume during ventricular ejection.
- **Dicrotic notch:** A small secondary dip caused by aortic valve closure and reflected pressure waves. Its presence and position carry information about arterial stiffness and vascular tone.
- **Diastolic peak:** A secondary peak following the dicrotic notch, more prominent in younger individuals with compliant vasculature.

The shape, amplitude, and timing of these features change with age, cardiovascular health, and autonomic nervous system activity, making the PPG waveform a rich source of physiological information beyond simple heart rate.

## Signal Processing Pipeline

Extracting reliable physiological metrics from raw PPG data requires a multi-stage signal processing pipeline. Each stage addresses specific challenges inherent to the optical measurement.

- **Preprocessing:** Raw ADC samples are filtered to remove DC offset and high-frequency noise. A bandpass filter (typically 0.5–5 Hz for heart rate applications) isolates the cardiac-frequency band. Ambient light subtraction removes environmental interference.

- **Motion artifact removal:** Accelerometer data from an inertial measurement unit (IMU) is used to identify and compensate for motion-induced signal corruption. Common techniques include adaptive filtering (e.g., LMS or RLS algorithms), independent component analysis (ICA), and signal decomposition methods such as empirical mode decomposition (EMD).

- **Beat detection:** Individual cardiac cycles are identified by detecting systolic peaks. Algorithms range from simple threshold-based approaches to more sophisticated methods using derivative analysis, wavelet transforms, or template matching.

- **Feature extraction:** Inter-beat intervals yield heart rate and heart rate variability metrics. Waveform morphology analysis extracts pulse transit time, augmentation index, and perfusion index. Multi-wavelength ratio calculations produce SpO2 estimates.

- **Machine learning layers:** Increasingly, deep learning models (CNNs, LSTMs, transformer architectures) are applied to raw or minimally processed PPG signals for tasks such as atrial fibrillation detection, blood pressure estimation, and sleep stage classification.

## Clinical and Consumer Applications

PPG technology supports a broad and growing range of health monitoring capabilities:

| Application | Method | Accuracy Considerations |
|---|---|---|
| **Heart rate monitoring** | Peak detection on AC waveform | High accuracy at rest; degrades with motion |
| **Pulse oximetry (SpO2)** | Red/IR ratio of ratios | FDA-cleared devices achieve ±2% accuracy in 70–100% SpO2 range |
| **Atrial fibrillation screening** | Irregularity analysis of inter-beat intervals | Sensitivity 90–98%, specificity 85–95% in validation studies |
| **Blood pressure estimation** | Pulse transit time or waveform morphology models | Still investigational; cuffless BP remains an active research frontier |
| **Respiratory rate** | Amplitude and frequency modulation of PPG signal | Reliable at rest; limited during movement |
| **Sleep staging** | Heart rate variability and movement patterns | Comparable to actigraphy; less accurate than polysomnography |
| **Stress and autonomic assessment** | HRV frequency domain analysis (LF/HF ratio) | Useful as a trend indicator; not a standalone diagnostic |

Regulatory classification matters. Clinical-grade pulse oximeters are FDA Class II medical devices requiring 510(k) clearance with standardized testing against arterial blood gas measurements. Consumer wearable features labeled as "wellness" tools face lower regulatory scrutiny but also carry no diagnostic claims.

## Limitations and Engineering Challenges

PPG measurements are subject to several well-documented sources of error and degradation:

- **Motion artifacts:** Physical movement causes sensor displacement, changes in contact pressure, and venous blood redistribution, all of which corrupt the optical signal. This is the single largest source of error in wrist-worn devices and remains a primary area of algorithmic research.

- **Skin pigmentation:** Higher melanin concentrations increase baseline light absorption, reducing the signal-to-noise ratio of the pulsatile component. Studies have documented reduced accuracy of SpO2 readings in individuals with darker skin tones, prompting regulatory and engineering attention.

- **Skin contact and fit:** Inconsistent sensor-skin coupling due to device fit, wrist anatomy, hair, or tattoos introduces variability. Tattoo ink, in particular, can significantly alter light absorption characteristics.

- **Ambient light interference:** Sunlight and artificial lighting at frequencies near the sampling rate can introduce aliasing and baseline wander. Ambient light rejection circuits and active cancellation algorithms mitigate but do not eliminate this problem.

- **Low perfusion states:** Hypothermia, hypovolemia, vasoconstriction, and peripheral vascular disease reduce pulsatile blood flow at the measurement site, decreasing signal amplitude and reliability.

- **Power consumption:** Continuous LED illumination and high-frequency ADC sampling draw meaningful current. Duty cycling, adaptive sampling rates, and algorithm-driven sensor activation are used to manage battery life in wearable form factors.

## Comparison with Electrocardiography

PPG and electrocardiography (ECG) are complementary cardiac monitoring modalities with distinct measurement principles and clinical roles.

| Dimension | PPG | ECG |
|---|---|---|
| What is measured | Blood volume changes (mechanical/vascular) | Electrical activity of the heart |
| Sensor type | Optical (LED + photodetector) | Electrical (skin electrodes) |
| Waveform | PPG waveform (systolic peak, dicrotic notch) | PQRST complex |
| Heart rate accuracy | High at rest, degraded by motion | Gold standard for heart rate and rhythm |
| Arrhythmia detection | Screening-grade (rhythm irregularity) | Diagnostic-grade (morphology analysis) |
| SpO2 capability | Yes (multi-wavelength PPG) | No |
| Vascular information | Yes (pulse wave analysis) | No |
| Ease of use | Single-point contact, continuous wear | Requires electrode placement, gel, leads |
| Clinical classification | Wellness or Class II (oximetry) | Class II medical device |

In practice, many modern wearables combine PPG and single-lead ECG to provide both continuous passive monitoring (PPG) and on-demand diagnostic-quality rhythm assessment (ECG).

## Emerging Directions

Several active research and development areas are extending PPG capabilities:

- **Camera-based remote PPG (rPPG):** Extracting PPG signals from video of the face or skin surface using standard RGB cameras, enabling contactless vital sign measurement for telehealth, driver monitoring, and neonatal care.

- **Cuffless continuous blood pressure:** Using PPG waveform features, pulse arrival time, and calibration models to estimate systolic and diastolic blood pressure without an inflatable cuff. Multiple companies are pursuing FDA clearance for this capability.

- **Multi-spectral PPG:** Adding wavelengths beyond the standard green/red/IR set to measure additional analytes such as glucose, lactate, and bilirubin. Results remain preliminary and no consumer device has achieved clinical-grade accuracy for non-invasive glucose monitoring via PPG.

- **On-device ML inference:** Running neural network models directly on the wearable's microcontroller for real-time arrhythmia detection, artifact rejection, and personalized baseline adaptation without cloud connectivity.

- **Integration with other modalities:** Combining PPG with bioimpedance, skin temperature, electrodermal activity, and inertial sensing to create multimodal health monitoring platforms capable of richer physiological characterization.

## Related

Professionals exploring PPG will benefit from studying several adjacent topics. Electrocardiography (ECG) provides the electrical counterpart to PPG's optical measurement and is essential for understanding cardiac monitoring in clinical contexts. Heart rate variability (HRV) analysis builds directly on PPG-derived inter-beat intervals and connects to autonomic nervous system assessment. Pulse oximetry is the most established clinical application of PPG and provides context for understanding regulatory requirements and accuracy standards. Digital signal processing and adaptive filtering are foundational to building robust PPG processing pipelines. Embedded systems design and low-power electronics are relevant for anyone implementing PPG in wearable hardware. Biomedical optics and tissue optics provide the physics foundation for understanding light-tissue interaction.

## Summary

Photoplethysmography is a deceptively simple technology — an LED and a photodetector — that yields a surprisingly rich set of cardiovascular and physiological measurements. Its low cost, small form factor, and compatibility with continuous passive monitoring have made it the dominant biosensing modality in consumer wearables and an increasingly capable tool in clinical settings. The core engineering challenges remain motion artifact rejection, accuracy across diverse skin types, and reliable extraction of advanced metrics like blood pressure from the optical signal. For technology professionals, PPG represents a compelling intersection of hardware design, signal processing, machine learning, and health science, with significant room for innovation as sensor capabilities, algorithms, and regulatory frameworks continue to evolve.

## References

- Allen, J. (2007). "Photoplethysmography and its application in clinical physiological measurement." *Physiological Measurement*, 28(3), R1–R39. https://doi.org/10.1088/0967-3334/28/3/R01

- Castaneda, D., Esparza, A., Ghamari, M., Soltanpur, C., & Nazeran, H. (2018). "A review on wearable photoplethysmography sensors and their potential future applications in health care." *International Journal of Biosensors & Bioelectronics*, 4(4), 195–202. https://doi.org/10.15406/ijbsbe.2018.04.00125

- Charlton, P. H., Marozas, V., et al. (2022). "Wearable Photoplethysmography for Cardiovascular Monitoring." *Proceedings of the IEEE*, 110(3), 355–381. https://doi.org/10.1109/JPROC.2022.3149785

- Tamura, T. (2019). "Current progress of photoplethysmography and SPO2 for health monitoring." *Biomedical Engineering Letters*, 9, 21–36. https://doi.org/10.1007/s13534-019-00097-w

- U.S. Food and Drug Administration. (2013). "Pulse Oximeters — Premarket Notification Submissions: Guidance for Industry and FDA Staff." https://www.fda.gov/regulatory-information/search-fda-guidance-documents/pulse-oximeters-premarket-notification-submissions

- Bent, B., Goldstein, B. A., Kibbe, W. A., & Dunn, J. P. (2020). "Investigating sources of inaccuracy in wearable optical heart rate sensors." *npj Digital Medicine*, 3, 18. https://doi.org/10.1038/s41746-020-0226-6
