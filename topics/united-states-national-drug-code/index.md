# United States National Drug Code (US NDC)

The United States National Drug Code (NDC) is a unique, three-segment identifier assigned to human drugs in the United States by the Food and Drug Administration. It serves as a universal product identifier, appearing on the labels of all prescription and over-the-counter medications. For technology teams, the NDC is a critical data element in healthcare systems, pharmacy platforms, and insurance claims processing.

The code is divided into three segments. The labeler code is assigned by the FDA and identifies the manufacturer, repackager, or distributor. The product code is assigned by the company and identifies a specific strength, dosage form, and formulation. The package code is assigned by the company and identifies the specific package size and type.

The FDA currently assigns codes in a 10-digit format using configurations like 4-4-2, 5-3-2, or 5-4-1. For billing and claims under HIPAA, an 11-digit format (5-4-2) is used. This requires adding a leading zero to one of the segments to maintain consistency across software systems, which is a common source of data-matching bugs in healthcare integrations.

To prevent exhaustion of available labeler codes, the FDA has finalized a rule to move to a uniform 12-digit format with a fixed 6-4-2 configuration. The FDA will begin assigning only 12-digit NDCs on 7 March 2033, with existing 10-digit codes converted in official records. All product labels must display the 12-digit format by 7 March 2036. This transition will require schema changes, validation updates, and data migration across any system that stores or processes NDC values.

The FDA maintains the National Drug Code Directory, a searchable database updated daily that includes active finished and unfinished drugs.
