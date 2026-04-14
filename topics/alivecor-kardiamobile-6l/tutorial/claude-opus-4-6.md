# AliveCor KardiaMobile 6L

The AliveCor KardiaMobile 6L is a portable, medical-grade electrocardiogram (ECG) monitor that captures a six-lead heart rhythm analysis in 30 seconds. It is the first FDA-cleared and CE-marked six-lead personal ECG device, bridging the gap between consumer wearables and clinical-grade diagnostics. For technology professionals working in digital health, connected devices, or telehealth platforms, the KardiaMobile 6L serves as a reference architecture for edge-based medical sensing paired with cloud-connected data sharing.


## How It Works

The KardiaMobile 6L is a credit-card-sized device with two metal electrodes on its top surface and one on the bottom. The user places their fingers from each hand on the top electrodes and touches the bottom electrode to a bare knee or ankle. This three-point contact allows the device to derive six of the standard twelve ECG leads: I, II, III, aVR, aVL, and aVF. These are the six limb leads defined by Einthoven's triangle and Goldberger's augmented leads.

A recording session lasts 30 seconds. The device transmits the captured ECG signal via ultrasonic audio or Bluetooth Low Energy (BLE) to the Kardia smartphone app, which runs on-device AI algorithms to classify the rhythm. The result is displayed immediately on the phone screen, and the recording is stored locally and optionally synced to AliveCor's cloud platform.


## Six-Lead vs. Single-Lead ECG

Unlike smartwatch-based ECG features that record only a single lead (typically Lead I), the KardiaMobile 6L records leads I, II, III, aVR, aVL, and aVF. This expanded lead set gives clinicians a more comprehensive electrical picture of the heart, improving the ability to identify conditions that a single-lead recording would miss.

| Feature | Single-Lead (e.g., Apple Watch, KardiaMobile 1L) | Six-Lead (KardiaMobile 6L) | Clinical 12-Lead |
|---|---|---|---|
| Leads captured | Lead I only | I, II, III, aVR, aVL, aVF | All 12 standard leads |
| Plane of view | Lateral only | Full frontal plane | Frontal and horizontal planes |
| AFib detection | Yes | Yes | Yes |
| Axis deviation detection | No | Yes | Yes |
| ST-elevation screening | Limited | Partial (limb leads) | Full capability |
| Heart block identification | Limited | Yes | Yes |
| Precordial lead data (V1-V6) | No | No | Yes |
| Typical use case | Consumer wellness screening | Ambulatory clinical monitoring | In-clinic diagnostic workup |

The six-lead configuration captures the full frontal electrical plane of the heart, enabling detection of atrial flutter, atrioventricular block, bundle branch patterns visible in limb leads, and electrical axis deviation. This makes it significantly more useful for clinical decision-making than a single-lead device, while remaining far more portable than a full 12-lead system.


## On-Device Detections and AI Analysis

The device provides instant on-device detection of several cardiac conditions:

- **Normal sinus rhythm** -- confirms a regular, healthy heart rhythm.
- **Atrial fibrillation (AFib)** -- the most common clinically significant arrhythmia, associated with elevated stroke risk.
- **Bradycardia** -- heart rate below 50 beats per minute.
- **Tachycardia** -- heart rate above 100 beats per minute.
- **Unclassified** -- the algorithm detects an abnormality but cannot categorize it, prompting physician review.

An optional KardiaCare membership unlocks additional determinations, including sinus rhythm with premature ventricular contractions (PVCs), sinus rhythm with wide QRS detection, and sinus rhythm with supraventricular ectopy (SVE). KardiaCare also provides monthly heart health reports, medication and weight tracking, and physician-reviewed ECG summaries.


## Device Specifications

| Specification | Detail |
|---|---|
| Dimensions | 82 mm x 38 mm x 12.7 mm |
| Weight | Approximately 28 grams |
| Leads | I, II, III, aVR, aVL, aVF (six limb leads) |
| Recording duration | 30 seconds per capture |
| Battery | Coin cell (CR2016), lasts approximately one year |
| Connectivity | Bluetooth Low Energy (BLE) to iOS and Android |
| Regulatory clearance | FDA 510(k) cleared, CE marked |
| Storage | Unlimited recordings via Kardia app and cloud sync |
| Compatibility | iOS 14.1+ and Android 8.0+ |


## Clinical Adoption and Regulatory Standing

From a clinical adoption standpoint, the KardiaMobile 6L has secured endorsements and recommendations from several health authorities:

- **FDA 510(k) clearance** in the United States classifies it as a Class II medical device, the same regulatory tier as hospital bedside monitors.
- **CE marking** permits distribution and clinical use across the European Economic Area.
- **NICE recommendation** -- the UK's National Institute for Health and Care Excellence recommends the device for detecting atrial fibrillation in symptomatic patients, a notable distinction for a consumer-facing device.
- **TGA approval** in Australia permits its use as a registered medical device.

Cardiologists and electrophysiologists worldwide use the KardiaMobile 6L for remote patient monitoring. Patients capture ECGs at home and transmit them for clinical interpretation without an office visit, making it a core component of telehealth cardiology workflows. It is also used in clinical trials as an ambulatory ECG endpoint device.


## Integration and Data Architecture

For technology professionals evaluating connected health platforms, the KardiaMobile 6L ecosystem illustrates several design patterns relevant to medical IoT:

- **Edge inference** -- the initial rhythm classification runs on the smartphone, reducing latency and enabling offline detection.
- **Cloud sync** -- recordings are uploaded to AliveCor's HIPAA-compliant cloud infrastructure, where they are accessible to both patients and authorized clinicians.
- **PDF export** -- each recording can be exported as a clinical-grade PDF with waveform traces, annotations, and rhythm determination, suitable for inclusion in an electronic health record (EHR).
- **API and EHR integration** -- AliveCor's enterprise platform supports integration with major EHR systems, enabling direct ingestion of patient-generated ECG data into clinical workflows.
- **Apple Health and Google Fit** -- heart rate data syncs to platform health aggregators, though raw ECG waveforms remain within the Kardia ecosystem.

The data pipeline follows a familiar pattern: sensor capture at the edge, local AI inference, encrypted transport, cloud storage, and downstream integration with clinical systems. This architecture must satisfy both HIPAA (in the US) and GDPR (in the EU) requirements for protected health information.


## Limitations

While the KardiaMobile 6L is a significant advancement over single-lead personal ECGs, it has clear boundaries:

- It captures only the six limb leads and does not include the six precordial leads (V1-V6). This means it cannot reliably detect conditions that primarily manifest in the horizontal plane, such as posterior myocardial infarction or right ventricular hypertrophy.
- It is not a continuous monitoring device. Each recording is a 30-second snapshot, so intermittent arrhythmias that occur outside recording windows may be missed. For continuous monitoring, a Holter monitor or patch-based device is more appropriate.
- The AI detections are screening-level, not diagnostic. All findings require confirmation by a qualified clinician.
- Recording quality depends on proper electrode contact and a still patient. Motion artifact and dry skin can degrade signal quality.


## Related

Technology professionals exploring this space should also investigate the AliveCor KardiaMobile Card (a single-lead card-form-factor ECG), the AliveCor Kardia 12L (a forthcoming twelve-lead personal ECG system), Holter monitors for continuous ambulatory ECG recording, Apple Watch ECG and Samsung Galaxy Watch ECG as single-lead consumer comparisons, remote patient monitoring (RPM) platform architectures, and FDA regulatory pathways for software as a medical device (SaMD). Understanding NICE technology appraisal processes and HIPAA-compliant cloud architectures for health data will also provide valuable context.


## Summary

The AliveCor KardiaMobile 6L occupies a distinctive position in the personal cardiac monitoring landscape. It delivers six-lead ECG capability in a device small enough to carry in a pocket, backed by FDA clearance, NICE recommendation, and a mature cloud platform with EHR integration. For technology professionals, it represents a well-validated reference point for edge medical sensing, on-device AI classification, and cloud-connected clinical data sharing. Its limitations -- no precordial leads, snapshot-only recording, and screening-level rather than diagnostic-level AI -- define clear boundaries that inform where it fits within a broader cardiac monitoring strategy.


## References

- AliveCor official product page: https://www.alivecor.com/kardiamobile6l
- FDA 510(k) clearance database (search "AliveCor"): https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- NICE Medtech Innovation Briefing on KardiaMobile: https://www.nice.org.uk/advice/mib232
- Bumgarner JM, Lambert CT, Hussein AA, et al. "Smartwatch Algorithm for Automated Detection of Atrial Fibrillation." *Journal of the American College of Cardiology*. 2018;71(21):2381-2388.
- Seshadri DR, Bittel B, Engstrom N, et al. "Wearable Sensors for Monitoring the Physiological and Biochemical Profile of the Athlete." *npj Digital Medicine*. 2019;2:72.
- AliveCor KardiaCare membership details: https://www.alivecor.com/kardiacare
