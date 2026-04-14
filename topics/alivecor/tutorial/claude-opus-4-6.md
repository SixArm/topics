# AliveCor

AliveCor is a medical device company specializing in personal electrocardiography (ECG) technology. Founded in 2010 and headquartered in Mountain View, California, the company develops FDA-cleared portable ECG devices that enable individuals and clinicians to capture medical-grade heart rhythm data outside traditional clinical settings. AliveCor occupies a distinctive position at the intersection of consumer electronics, clinical cardiology, and regulated artificial intelligence, making it a significant case study for technology professionals interested in digital health, edge computing, and software as a medical device (SaMD).

## Company Background

AliveCor was founded by Dr. David Albert, a cardiologist and electrical engineer who recognized that smartphone hardware had become powerful enough to serve as a platform for clinical-grade biosignal acquisition. The company's initial product attached directly to an iPhone and used ultrasonic data transmission to relay ECG signals to the phone's microphone. This approach sidestepped the need for Bluetooth pairing and allowed the device to work with unmodified consumer phones.

Over the following years, AliveCor transitioned to Bluetooth Low Energy (BLE) for data transmission, expanded its product line from single-lead to six-lead and twelve-lead form factors, and built a cloud-based AI interpretation platform. The company has received multiple FDA clearances under the De Novo and 510(k) regulatory pathways, and its devices are now used in over 100 countries.

## Product Line

AliveCor's hardware portfolio centers on three devices, each targeting a different use case and level of clinical detail.

| Product | Leads | Form Factor | Primary Use Case | Regulatory Status |
|---|---|---|---|---|
| KardiaMobile | 1-lead | Credit-card-sized pad, finger electrodes | Personal AFib screening, wellness monitoring | FDA 510(k) cleared |
| KardiaMobile 6L | 6-lead | Slim rectangular sensor, finger and leg electrodes | Enhanced arrhythmia detection, QT interval monitoring | FDA 510(k) cleared |
| Kardia 12L | 12-lead | Multi-electrode device with limb and chest placement | Full diagnostic ECG comparable to hospital equipment | FDA cleared |

All three devices pair with the Kardia smartphone app, which handles signal display, local processing, and upload to AliveCor's cloud infrastructure.

## Technology Architecture

From a systems perspective, AliveCor's platform spans several engineering domains:

- **Analog front-end (AFE):** The device contains precision analog circuitry that amplifies microvolt-level cardiac signals while rejecting common-mode noise, powerline interference, and motion artifacts. The AFE must meet IEC 60601-2-47 standards for ambulatory ECG equipment.
- **Wireless communication:** Current devices use Bluetooth Low Energy to transmit digitized ECG samples to the paired smartphone. Earlier generations used ultrasonic encoding through the phone's audio jack, a novel approach that eliminated Bluetooth pairing friction.
- **Mobile application:** The Kardia app runs on iOS and Android, performing real-time waveform rendering, local inference using on-device machine learning models, and secure data upload. The app also provides guided recording workflows to reduce user error.
- **Cloud AI platform:** AliveCor's server-side infrastructure stores ECG recordings, runs additional classification models, and generates reports for clinicians. The deterministic neural network models deployed here are FDA-cleared as SaMD, subjecting them to rigorous validation requirements.
- **Data pipeline:** Longitudinal ECG data feeds population health analytics and supports ongoing model retraining under regulatory constraints that require change control and clinical validation for each model update.

## AI and Regulatory Classification

AliveCor's machine learning algorithms detect several cardiac conditions automatically:

- **Atrial fibrillation (AFib):** Irregular rhythm detection with high sensitivity and specificity, validated in peer-reviewed clinical trials.
- **Bradycardia:** Heart rate below 50 beats per minute.
- **Tachycardia:** Heart rate above 100 beats per minute.
- **Normal sinus rhythm:** Confirmation of healthy rhythm pattern.
- **QT prolongation:** Available on the 6L device, this measurement monitors the QT interval, which is important for patients on certain medications.

These algorithms are classified as Software as a Medical Device (SaMD) under FDA and international regulatory frameworks. This classification imposes specific requirements:

- Clinical validation through prospective studies with predefined endpoints
- Quality management systems compliant with ISO 13485
- Post-market surveillance and adverse event reporting
- Change control processes for any model updates, meaning that retraining a neural network triggers a regulatory review cycle

For technology professionals, this regulatory dimension is critical because it constrains the software development lifecycle in ways that differ fundamentally from typical consumer software. Continuous deployment, A/B testing, and rapid iteration must all be reconciled with regulatory obligations.

## KardiaCare Subscription Service

AliveCor operates a subscription model called KardiaCare that layers recurring revenue on top of hardware sales. The service includes:

- Unlimited cloud storage of ECG recordings
- Monthly heart health reports with trend analysis
- Medication and symptom tracking
- Physician sharing and telehealth integration
- Priority access to new detection algorithms as they receive FDA clearance

This model generates a longitudinal dataset that grows with each subscriber, creating a data asset valuable for clinical research partnerships and model improvement. The subscription also increases customer lifetime value and reduces dependence on one-time hardware margins.

## Intellectual Property and Litigation

AliveCor holds a significant patent portfolio covering smartphone-based ECG acquisition, signal processing methods, and AI-driven cardiac analysis. This portfolio has been central to high-profile litigation with Apple, which introduced an ECG feature in the Apple Watch Series 4 in 2018. AliveCor filed complaints with the International Trade Commission (ITC) and in federal court, alleging that Apple's implementation infringed on AliveCor's patents. Apple countered with antitrust claims. The dispute highlights the tension between platform owners and third-party medical device companies that build on those platforms, a dynamic increasingly relevant as wearable health technology matures.

## Clinical Adoption and Telehealth Integration

AliveCor devices are used across multiple clinical contexts:

- **Primary care:** Physicians use KardiaMobile as a point-of-care screening tool during office visits.
- **Cardiology practices:** The 6L and 12L models provide diagnostic-grade data for remote patient monitoring programs.
- **Clinical trials:** Pharmaceutical companies use AliveCor devices for cardiac safety monitoring in drug trials, particularly for QT interval assessment.
- **Telehealth workflows:** ECG recordings are transmitted to cardiologists for asynchronous review, enabling remote cardiac consultations without in-person visits.
- **Direct-to-consumer:** Individuals use KardiaMobile for personal wellness tracking and early detection of arrhythmias.

The company's devices have been cited in over 200 peer-reviewed publications, establishing a strong evidence base that supports clinical adoption.

## Related

Technology professionals exploring AliveCor should also study electrocardiography fundamentals and the differences between ECG and photoplethysmography (PPG), the competing sensor modality used in smartwatches. Related topics include Holter monitors and continuous ambulatory monitoring, heart rate variability (HRV) metrics and their clinical significance, the FDA regulatory framework for SaMD, Bluetooth Low Energy protocol design for medical devices, and the broader landscape of remote patient monitoring platforms.

## Summary

AliveCor demonstrates how a focused medical device company can build a vertically integrated platform spanning hardware signal acquisition, mobile computing, cloud AI, and subscription services, all within the constraints of FDA regulation. For technology professionals, the company illustrates the engineering challenges of clinical-grade biosignal processing, the product management implications of regulated AI, and the competitive dynamics that arise when platform incumbents enter the digital health space. AliveCor's trajectory from a single-lead smartphone accessory to a multi-product cardiac monitoring ecosystem reflects the broader maturation of digital health technology from novelty to clinical standard of care.

## References

- AliveCor official website: https://www.alivecor.com
- FDA 510(k) clearance database, searchable at https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Bumgarner JM, Lambert CT, Hussein AA, et al. "Smartwatch Algorithm for Automated Detection of Atrial Fibrillation." Journal of the American College of Cardiology, 2018.
- Halcox JPJ, Sherwood K, Sherwood K, et al. "Assessment of Remote Heart Rhythm Sampling Using the AliveCor Heart Monitor to Screen for Atrial Fibrillation." Circulation, 2017.
- International Electrotechnical Commission. IEC 60601-2-47: Medical electrical equipment, particular requirements for ambulatory electrocardiographic systems.
- FDA guidance document: "Software as a Medical Device (SaMD): Clinical Evaluation." https://www.fda.gov/medical-devices/software-medical-device-samd
- International Trade Commission investigation no. 337-TA-1266 (AliveCor v. Apple).
