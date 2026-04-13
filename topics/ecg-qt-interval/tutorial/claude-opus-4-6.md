# ECG QT interval

The ECG QT interval is one of the most clinically important measurements derived from an electrocardiogram (ECG). It represents the total duration of ventricular electrical activity — from the moment the ventricles begin to depolarize (contract) to the moment they finish repolarizing (recovering). For technology professionals working on cardiac monitoring platforms, wearable health devices, or clinical decision-support systems, understanding the QT interval is essential for building accurate, safe, and compliant ECG analysis pipelines.

## What the QT Interval Represents

The QT interval spans from the start of the QRS complex to the end of the T wave on an ECG tracing. The QRS complex captures ventricular depolarization — the electrical signal that causes the heart's ventricles to contract and pump blood. The T wave represents ventricular repolarization — the electrical recovery phase that resets the ventricles for the next heartbeat. Together, these components define the full electrical cycle of ventricular activity.

In a healthy adult at a resting heart rate, the QT interval typically falls between 350 and 440 milliseconds. It is not a fixed value; it shortens naturally as heart rate increases and lengthens as heart rate decreases. This rate dependence is one of the key challenges in automated ECG interpretation.

## QT Correction (QTc)

Because the raw QT interval varies with heart rate, clinicians rely on a corrected value called QTc to enable meaningful comparisons across patients and across different heart rates. Several correction formulas exist, each with trade-offs in accuracy and computational simplicity.

| Formula | Equation | Notes |
|---|---|---|
| Bazett | QTc = QT / sqrt(RR) | Most widely used; tends to overcorrect at high heart rates and undercorrect at low heart rates |
| Fridericia | QTc = QT / RR^(1/3) | More accurate than Bazett at extreme heart rates; increasingly preferred in clinical trials |
| Framingham | QTc = QT + 0.154 × (1 − RR) | Linear correction; performs well across a broad range of heart rates |
| Hodges | QTc = QT + 1.75 × (HR − 60) | Uses heart rate directly rather than RR interval |

Normal QTc thresholds differ by sex:

- **Men**: QTc below 450 ms is generally considered normal; above 450 ms warrants clinical attention.
- **Women**: QTc below 460–470 ms is generally considered normal; women have a slightly longer baseline QTc.
- **Both sexes**: QTc above 500 ms is considered high-risk for arrhythmia regardless of sex.

The choice of correction formula matters in automated systems. Bazett's formula remains dominant in clinical practice due to legacy adoption, but Fridericia is increasingly recommended by regulatory bodies such as the FDA for drug safety studies.

## Clinical Significance of QT Prolongation

Abnormal prolongation of the QT interval is clinically significant because it increases the risk of dangerous arrhythmias. The most notable is Torsades de Pointes (TdP), a polymorphic ventricular tachycardia characterized by a twisting pattern on the ECG. TdP can degenerate into ventricular fibrillation and sudden cardiac death.

Long QT syndrome (LQTS) has two broad categories:

- **Congenital LQTS**: Caused by inherited mutations in genes encoding cardiac ion channels (potassium, sodium, or calcium channels). Over 15 genetic subtypes have been identified, with LQT1, LQT2, and LQT3 being the most common.
- **Acquired LQTS**: Caused by external factors, most commonly medications, electrolyte imbalances, or structural heart disease.

Common triggers of acquired QT prolongation include:

- **Medications**: Certain antibiotics (fluoroquinolones, macrolides), antiarrhythmics (sotalol, amiodarone, dofetilide), antipsychotics (haloperidol, ziprasidone), antiemetics (ondansetron), and some antidepressants.
- **Electrolyte imbalances**: Hypokalemia (low potassium), hypomagnesemia (low magnesium), and hypocalcemia (low calcium).
- **Bradycardia**: Very slow heart rates can unmask or exacerbate QT prolongation.

## Short QT Syndrome

Short QT syndrome (SQTS) is a rarer but equally serious condition where the QT interval is abnormally brief, typically below 330 ms. It carries an elevated risk of sudden cardiac death due to increased susceptibility to both atrial and ventricular fibrillation. SQTS is usually congenital and linked to gain-of-function mutations in potassium channel genes. Because of its rarity, automated detection algorithms should flag unusually short QT intervals but avoid over-alerting, since short intervals can also be a normal physiological variant at high heart rates.

## Technical Challenges in Automated QT Measurement

For technology professionals building ECG analysis systems, accurate QT interval measurement depends on solving several signal-processing challenges:

- **QRS onset detection**: The beginning of the QRS complex must be precisely identified. Noise, baseline wander, and morphological variability across leads complicate this step. Common approaches include wavelet-based detectors, adaptive thresholding, and machine-learning classifiers.
- **T wave offset detection**: The end of the T wave is the most difficult fiducial point to determine reliably. The T wave often merges gradually into the baseline, and in some patients the T wave is flat, biphasic, or followed by a U wave. Tangent-line methods, threshold-based approaches, and template-matching algorithms are commonly used.
- **Lead selection**: The QT interval can vary across ECG leads. Clinical practice typically uses lead II or the lead with the longest measurable QT. Multi-lead algorithms that compute a global QT from all available leads can improve robustness.
- **Noise and artifact handling**: Motion artifacts (especially in ambulatory and wearable devices), muscle noise, and electrode contact issues can corrupt the T wave region. Bandpass filtering, adaptive filtering, and signal quality indices are critical preprocessing steps.
- **Real-time versus retrospective analysis**: Ambulatory and bedside monitors need near-real-time QTc estimation, which requires efficient algorithms that balance latency and accuracy. Research and clinical trial applications may use retrospective analysis with manual adjudication.

## Regulatory and Standards Considerations

Automated QT measurement in medical devices is subject to regulatory oversight. Key standards and guidelines include:

- **IEC 62304**: Software lifecycle standard for medical device software, applicable to ECG analysis algorithms.
- **IEC 60601-2-25**: Particular requirements for the safety and essential performance of electrocardiographic equipment, including measurement accuracy requirements.
- **ICH E14 / S7B**: Regulatory guidelines for evaluating the QT/QTc prolongation potential of pharmaceutical compounds, which define how QTc should be measured and reported in clinical trials.
- **ANSI/AAMI EC57**: Standard for testing and reporting performance of cardiac rhythm and ST segment measurement algorithms using annotated databases such as MIT-BIH and AHA.

Technology teams developing QT measurement features should validate their algorithms against annotated reference databases and conduct clinical testing to demonstrate measurement accuracy within regulatory tolerances.

## Related

Professionals working with QT interval analysis should explore the broader electrocardiogram signal chain, including waveform delineation algorithms for P waves and ST segments. Understanding cardiac electrophysiology and ion channel behavior provides context for why QT abnormalities arise. The Marquette 12SL algorithm is a widely deployed example of automated ECG interpretation that includes QT measurement. Familiarity with patient monitoring platforms such as GE Healthcare and Spacelabs systems is valuable for integration work. Drug-interaction databases and clinical decision-support systems that screen for QT-prolonging medications are important downstream applications.

## Summary

The ECG QT interval measures the total duration of ventricular depolarization and repolarization, making it a critical biomarker for cardiac safety. Corrected QTc values normalize this measurement across heart rates, with Bazett's and Fridericia's formulas being the most common approaches. Prolongation beyond 500 ms signals elevated risk of Torsades de Pointes and sudden cardiac death, whether from congenital ion channel mutations, QT-prolonging medications, or electrolyte imbalances. For technology professionals, the QT interval presents demanding signal-processing challenges — particularly in T wave offset detection — and carries significant regulatory requirements that must be addressed in any cardiac monitoring or clinical trial analysis platform.

## References

- Goldberger, A. L., Goldberger, Z. D., & Shvilkin, A. (2017). *Goldberger's Clinical Electrocardiography: A Simplified Approach* (9th ed.). Elsevier.
- Postema, P. G., & Wilde, A. A. M. (2014). "The measurement of the QT interval." *Current Cardiology Reviews*, 10(3), 287–294. https://doi.org/10.2174/1573403X10666140514103612
- Schwartz, P. J., & Ackerman, M. J. (2013). "The long QT syndrome: a transatlantic clinical approach to diagnosis and therapy." *European Heart Journal*, 34(40), 3109–3116. https://doi.org/10.1093/eurheartj/eht089
- Drew, B. J., et al. (2010). "Prevention of Torsade de Pointes in Hospital Settings." *Circulation*, 121(8), 1047–1060. American Heart Association Scientific Statement. https://doi.org/10.1161/CIRCULATIONAHA.109.192704
- ICH E14 Guideline: "The Clinical Evaluation of QT/QTc Interval Prolongation and Proarrhythmic Potential for Non-Antiarrhythmic Drugs." International Council for Harmonisation. https://www.ich.org/page/efficacy-guidelines
- Rautaharju, P. M., et al. (2009). "AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the Electrocardiogram." *Journal of the American College of Cardiology*, 53(11), 982–991. https://doi.org/10.1016/j.jacc.2008.12.014
