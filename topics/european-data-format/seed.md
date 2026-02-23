# European Data Format (EDF)

The European Data Format (EDF) and its updated version, EDF+, are widely
accepted, open-standard file formats used for storing medical time series data,
including electrocardiogram (ECG), electroencephalogram (EEG), and sleep
recordings. In the UK and Europe, these formats are standard for data exchange
between different equipment, labs, and in multi-center research. 

Key Aspects of EDF/EDF+ for ECG in the UK

Definition: EDF stores multichannel data, allowing different sample rates for each signal, while EDF+ (introduced in 2003) adds support for annotations, interrupted recordings, and standard electrode names.

Structure: An EDF file consists of a header (containing patient info and technical specs) followed by data records (containing 16-bit integers).

Compatibility: Most EDF applications have migrated to EDF+, but EDF+ files are largely compatible with original EDF viewers.

Usage in Cardiology: EDF+ is used for storing ECG data, as well as automatic and manual analysis results (e.g., QRS parameters).

File Extension: Files are saved with the .edf extension.

UK Context: European medical engineers developed the format, and it is a standard in European research and commercial equipment. 

Other ECG Formats:
- While EDF/EDF+ is common for raw, long-term recordings, other formats exist for different purposes: 
- SCP-ECG (Standard Communications Protocol): A standard supported by the European Committee for Standardization (CEN) for short-term diagnostic ECGs.
- DICOM-ECG: A standard used in medical imaging, often applied to waveforms.
PDF-ECG: A hybrid format used to store both a human-readable graphical report and the underlying digital ECG waveform, enabling easier storage in Electronic Health Records (EHR). 

Software for Viewing/Editing EDF Files
EDFbrowser: A popular, free, open-source tool for viewing and editing EDF/EDF+ files.
MATLAB/FieldTrip: Used for reading, analyzing, and plotting EDF data.
Python: Libraries like mne and pyedflib are available for parsing and working with EDF/EDF+ files. 
Hackage
Hackage
