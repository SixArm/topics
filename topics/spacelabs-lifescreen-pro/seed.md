# Spacelabs LifeScreen Pro

The LifeScreen Pro is a clinical software tool by Spacelabs Healthcare designed to rapidly triage and analyze long-term ambulatory ECG data. It is particularly effective for screening up to 30 days of continuous recording from devices like the Eclipse Mini and Eclipse Pro.

Core Capabilities:

- Rapid Triage: Analyzes millions of heartbeats in minutes rather than hours, allowing clinicians to quickly identify major arrhythmias soon after a device is returned.
- Automated Detection: Automatically detects and quantifies events such as Atrial Fibrillation (AFib), pauses, tachycardia (VT/SVT), and bradycardia.
- Symptom Correlation: Correlates patient-reported symptoms—documented via smartphone app or the device’s event button—with the underlying ECG rhythm.
- Visual Analysis Tools: Includes an interactive dashboard with scroll and zoom functions, heart rate range graphs, and 30-day event trends to verify automated findings.

## Workflow Integration

The system is built on Spacelabs' Runway architecture, enabling seamless data management:

- Data Capture: Data is downloaded via the Sentinel Cardiology Information Management System.
- Triage: LifeScreen Pro provides a high-level summary and single-page report.
- Deep Dive: If complex morphologies or more detailed analysis are required, specific ECG segments can be exported directly to the Pathfinder SL Holter Analysis System.
