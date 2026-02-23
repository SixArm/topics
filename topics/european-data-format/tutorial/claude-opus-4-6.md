Here is the comprehensive tutorial:

# European Data Format (EDF)

The European Data Format (EDF) is an open, non-proprietary file format designed for the exchange and storage of multichannel biological and physiological time series data. Originally published in 1992 by a group of European medical engineers and researchers, EDF has become the de facto standard for recording, archiving, and sharing signals such as electroencephalograms (EEG), electrocardiograms (ECG), electromyograms (EMG), polysomnography (sleep studies), and other continuous physiological measurements. Its successor, EDF+, was introduced in 2003 to address limitations in the original specification. Together, EDF and EDF+ form the backbone of biosignal data interchange across clinical, research, and commercial settings worldwide.

## History and Motivation

The European Data Format emerged from the need to solve a persistent interoperability problem in medical signal recording. Before EDF, each equipment manufacturer used proprietary binary formats, making it difficult or impossible to share recordings between laboratories, hospitals, or research centers. In 1987, a consortium of sleep researchers and biomedical engineers across several European countries began collaborating on a common format. The result, published in 1992 by Bob Kemp, Alpo Varri, Agostinho C. Rosa, Kim D. Nielsen, and John Gade, was EDF. The specification was intentionally kept simple and self-describing so that any developer could write a parser without specialized libraries. This simplicity was a key factor in EDF's rapid adoption.

By the early 2000s, several limitations of the original format became apparent: it could not represent discontinuous recordings, it lacked a standardized annotation mechanism, and it had no formal way to encode events or stimuli. EDF+ was published in 2003 by Bob Kemp and Jesus Olivan to address these gaps while maintaining backward compatibility with existing EDF readers.

## File Structure Overview

An EDF file is a flat binary file consisting of two main sections: a fixed-format ASCII header followed by a sequence of data records containing the digitized signal samples. The format is entirely self-describing; all metadata needed to interpret the data is embedded in the header.

- **Header record**: Contains global information (patient identification, recording identification, start date and time, number of data records, duration of each data record, and number of signals) followed by per-signal metadata (label, transducer type, physical dimension, physical minimum and maximum, digital minimum and maximum, prefiltering, and number of samples per data record).
- **Data records**: Each data record stores a fixed duration of multichannel signal data. Within a data record, samples for each signal are stored consecutively as 16-bit two's complement integers (little-endian byte order). Different signals can have different sample rates, accommodated by varying the number of samples per data record for each signal.

## Header Fields

The header is encoded entirely in ASCII characters, making it human-readable with a simple hex editor or text viewer. The following table describes the fields in the fixed portion of the header.

| Field | Bytes | Description |
|---|---|---|
| Version | 8 | Format version, typically "0" padded with spaces |
| Patient ID | 80 | Local patient identification |
| Recording ID | 80 | Local recording identification |
| Start date | 8 | Recording start date in dd.mm.yy format |
| Start time | 8 | Recording start time in hh.mm.ss format |
| Header size | 8 | Total number of bytes in the header |
| Reserved | 44 | Reserved field (EDF+ uses this for format subtype) |
| Number of data records | 8 | Total count of data records in the file |
| Duration of data record | 8 | Duration of each data record in seconds |
| Number of signals | 4 | Number of signals (channels) in the file |

Following these 256 bytes, the header contains arrays of per-signal fields, each sized as the number of signals multiplied by a fixed byte count per field (e.g., 16 bytes per signal for the label, 80 bytes per signal for the transducer type, and so on).

## Signal Encoding and Calibration

All signal samples in EDF are stored as 16-bit signed integers, giving a digital range of -32768 to +32767. To convert these digital values to meaningful physical units (such as microvolts for EEG or millivolts for ECG), the header provides four calibration parameters per signal:

- **Digital minimum and maximum**: The integer range used in the data records for that signal.
- **Physical minimum and maximum**: The corresponding physical measurement range in the declared units.

The linear conversion formula is:

Physical value = (Digital value - Digital minimum) / (Digital maximum - Digital minimum) * (Physical maximum - Physical minimum) + Physical minimum

This approach allows each channel to use its own scale and units independently, which is essential when a single file contains signals of different types (for example, EEG in microvolts alongside respiratory effort in arbitrary units).

## EDF+ Enhancements

EDF+ was designed as a backward-compatible extension that enriches the original EDF specification without breaking existing readers. The key enhancements include:

- **Annotations**: EDF+ introduces a dedicated "EDF Annotations" signal that stores timestamped text annotations within the data records. Annotations can mark events such as seizure onset, stimulus delivery, movement artifacts, or technician notes. Each annotation consists of a timestamp (onset), an optional duration, and free-text content.
- **Discontinuous recordings**: The original EDF assumed continuous, uninterrupted recording. EDF+ defines two subtypes indicated in the reserved header field: "EDF+C" for continuous recordings and "EDF+D" for discontinuous recordings. In discontinuous mode, each data record carries its own timestamp via an annotation, allowing gaps in the recording timeline.
- **Structured patient and recording identification**: EDF+ specifies subfields within the patient ID and recording ID fields, enforcing a structure of patient code, sex, birthdate, and name for the patient field, and startdate, hospital administration code, technician, and equipment for the recording field.
- **Standard signal labels**: EDF+ defines standardized channel naming conventions based on the international 10-20 electrode placement system and other conventions, improving interoperability for automated processing pipelines.

## Comparison: EDF vs. EDF+

| Feature | EDF | EDF+ |
|---|---|---|
| Year introduced | 1992 | 2003 |
| Annotations support | No | Yes, via EDF Annotations signal |
| Discontinuous recordings | No (continuous only) | Yes (EDF+D subtype) |
| Structured patient ID | Free text | Structured subfields |
| Backward compatibility | Baseline | Compatible with EDF readers |
| Reserved header field | Unused | Stores "EDF+C" or "EDF+D" |
| Event/stimulus marking | Not supported | Supported via annotations |
| Standard channel naming | Not specified | Standardized conventions |

## Comparison: EDF+ vs. Other Biosignal Formats

Several other file formats compete with or complement EDF+ in the biosignal domain. The following table summarizes key alternatives.

| Format | Primary Use | Bit Depth | Annotations | Open Standard |
|---|---|---|---|---|
| EDF+ | General biosignals | 16-bit | Yes | Yes |
| BDF+ | High-resolution biosignals | 24-bit | Yes | Yes |
| SCP-ECG | Short-term diagnostic ECG | Variable | Limited | Yes (CEN standard) |
| DICOM Waveform | Medical imaging ecosystems | Variable | Via DICOM metadata | Yes |
| GDF | General biosignals | Up to 64-bit | Yes | Yes |
| WFDB (PhysioNet) | Research databases | Variable | Yes | Yes |
| HL7 aECG | Annotated ECG | XML-based | Yes | Yes |
| MFER | Medical waveforms (Japan) | Variable | Yes | Yes (ISO standard) |

## Common Use Cases

EDF and EDF+ serve a broad range of clinical and research applications:

- **Sleep medicine and polysomnography**: EDF is the dominant format for sleep recordings, storing multiple concurrent channels including EEG, EOG (electrooculography), EMG, ECG, respiratory signals, oxygen saturation, and body position. Sleep staging annotations in EDF+ allow researchers and clinicians to mark sleep stages directly in the file.
- **Epilepsy monitoring**: Long-term EEG monitoring for epilepsy diagnosis generates large multichannel recordings that are routinely stored in EDF+ format. Annotations mark seizure events, interictal discharges, and clinical observations.
- **Cardiology**: Holter monitor recordings and long-term ECG data are commonly stored in EDF+. The format accommodates the relatively low channel count but high time resolution required for cardiac analysis.
- **Brain-computer interfaces (BCI)**: Research in BCI systems frequently uses EDF+ as an interchange format for EEG data, benefiting from its simplicity and wide tool support.
- **Clinical trials and multi-center research**: The open, vendor-neutral nature of EDF+ makes it a natural choice for multi-site studies where different centers may use different recording equipment.

## Limitations and Considerations

Despite its wide adoption, EDF and EDF+ have notable limitations that technology professionals should understand:

- **16-bit resolution**: The original EDF specification limits signal samples to 16-bit integers, providing a dynamic range of approximately 96 dB. For high-resolution applications, this may be insufficient. The BDF+ variant (BioSemi Data Format) extends sample storage to 24 bits to address this limitation.
- **Two-digit year**: The start date field uses a two-digit year (dd.mm.yy), creating a Y2K-style ambiguity. EDF+ mitigates this by encoding the full date in the recording identification field.
- **No compression**: EDF files store raw integer samples without any compression, resulting in large file sizes for long recordings with many channels. A 24-hour, 32-channel EEG recording at 256 Hz produces approximately 1.3 GB of data.
- **No encryption or access control**: The format has no built-in mechanisms for data protection, which is a concern for patient data under regulations such as GDPR and HIPAA. Encryption and access control must be applied at the file system or application level.
- **Limited metadata extensibility**: While EDF+ improved metadata handling, the fixed-size ASCII header fields impose constraints on the amount and structure of metadata that can be stored compared to more modern formats like HDF5 or NWB (Neurodata Without Borders).

## Software Ecosystem

A robust ecosystem of open-source and commercial tools supports EDF and EDF+ files:

- **EDFbrowser**: A free, open-source, cross-platform viewer and editor for EDF, EDF+, BDF, and BDF+ files. It supports annotations, filtering, signal resampling, and export to other formats.
- **Python libraries**: The `pyedflib` library provides low-level read/write access to EDF+ files. The `mne-python` library offers higher-level analysis pipelines for EEG and MEG data, including EDF+ import. The `edfio` package is a newer pure-Python option.
- **MATLAB and FieldTrip**: MATLAB's `edfread` function (introduced in R2020b) provides native EDF support. The FieldTrip toolbox offers comprehensive EDF/EDF+ import for neuroscience workflows.
- **R**: The `edfReader` package enables reading EDF and EDF+ files into R data frames for statistical analysis.
- **Commercial systems**: Most clinical EEG, PSG, and Holter systems from vendors such as Natus, Compumedics, Nihon Kohden, and Philips support EDF+ export and import.

## Related

Technology professionals working with the European Data Format should also explore related topics including electrocardiogram data file formats for understanding the broader landscape of cardiac data standards, SCP-ECG and DICOM Waveform for complementary clinical data exchange protocols, HL7 FHIR for integrating biosignal data into modern health information systems, polysomnography and sleep staging for the primary clinical domain driving EDF adoption, signal processing fundamentals for interpreting and manipulating the data stored in EDF files, and data privacy regulations such as GDPR and HIPAA that govern the handling of patient recordings.

## Summary

The European Data Format is a deliberately simple, open, and vendor-neutral binary format that has served the biomedical signal recording community for over three decades. Its ASCII header makes files self-describing and easy to parse, while its support for multichannel, multi-rate signal storage covers the needs of most physiological recording scenarios. The EDF+ extension addressed critical gaps by adding annotations, discontinuous recording support, and structured metadata, all while maintaining backward compatibility. Although the format's 16-bit resolution, lack of compression, and limited metadata extensibility show its age compared to more modern alternatives, EDF and EDF+ remain the most widely supported interchange formats in sleep medicine, epilepsy monitoring, cardiology, and neuroscience research. For technology professionals building systems that process biosignal data, fluency in EDF+ is essential.

## References

- Kemp B, Varri A, Rosa AC, Nielsen KD, Gade J. "A simple format for exchange of digitized polygraphic recordings." Electroencephalography and Clinical Neurophysiology, 82(5):391-393, 1992.
- Kemp B, Olivan J. "European data format 'plus' (EDF+), an EDF alike standard format for the exchange of physiological data." Clinical Neurophysiology, 114(9):1755-1761, 2003.
- EDF/EDF+ specification and resources: https://www.edfplus.info/
- PhysioNet EDF resources and sample files: https://physionet.org/
- EDFbrowser open-source viewer: https://www.teuniz.net/edfbrowser/
- pyedflib Python library: https://github.com/holgern/pyedflib
- MNE-Python for EEG/MEG analysis: https://mne.tools/
- BDF+ specification (BioSemi 24-bit variant): https://www.biosemi.com/faq/file_format.htm
