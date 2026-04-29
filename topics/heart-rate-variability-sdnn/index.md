# Heart rate variability SDNN

SDNN (Standard Deviation of Normal-to-Normal intervals) is a heart rate variability metric that measures the standard deviation of time intervals between successive heartbeats, expressed in milliseconds. It captures the overall activity of the autonomic nervous system, reflecting both sympathetic and parasympathetic branches, and is widely regarded as a gold standard indicator for cardiac risk assessment.

SDNN quantifies how much beat-to-beat timing varies from the average over a defined recording period. In clinical settings, the standard measurement window is 24 hours, though shorter periods such as 5-minute recordings are common in consumer wearable technology. The recording duration matters significantly: a 35 ms reading over 24 hours carries different clinical meaning than a 35 ms reading from a 5-minute morning check.

Higher SDNN values indicate a well-adapted autonomic nervous system, better cardiovascular health, and lower chronic stress. Values above 100 ms are generally considered healthy. Values below 50 ms signal compromised autonomic function and elevated cardiovascular risk. Average readings typically fall between 40 and 70 ms, trending higher in younger individuals, though individual variation is substantial.

SDNN differs from RMSSD (Root Mean Square of Successive Differences), another common HRV metric. SDNN reflects total variability across both autonomic branches, making it suited for long-term trend analysis. RMSSD isolates short-term, parasympathetic-driven changes and is preferred by consumer wearables for recovery tracking.

For technology professionals building or evaluating health platforms, SDNN is most valuable as a longitudinal metric for tracking overall autonomic health and the body's response to chronic stress over time, rather than as a snapshot measurement.
