# Geography Markup Language (GML)

Geography Markup Language (GML) is an XML-based encoding standard for the representation, storage, and exchange of geographical features, their attributes, and their spatial relationships. Developed and maintained by the Open Geospatial Consortium (OGC), GML provides a vendor-neutral, open standard format that enables interoperability between diverse geospatial software systems. As the foundational grammar for geographic data interchange on the web, GML plays a critical role in spatial data infrastructures worldwide, underpinning everything from national mapping agencies to urban planning platforms and environmental monitoring systems.

## Core Concepts and Architecture

GML is built on a layered architecture rooted in XML Schema. At its foundation, GML defines a set of abstract and concrete schema components that describe geographic features, geometries, coordinate reference systems, topology, time, and units of measure. A GML document describes a collection of geographic features, where each feature is an abstraction of a real-world phenomenon such as a road, building, river, or parcel of land. Each feature carries geometry (its spatial footprint), properties (its descriptive attributes), and optionally relationships to other features.

The GML specification defines a profile system, allowing implementers to select subsets of GML functionality appropriate for their use case. A Simple Features profile, for instance, restricts geometry types to points, lines, and polygons, while a full GML profile supports complex curved geometries, 3D solids, and topological structures.

## Key Components

GML documents are composed of several interrelated element categories that work together to describe geographic data:

- **Features**: The primary objects of interest, representing real-world entities such as buildings, roads, rivers, or administrative boundaries. Each feature type is defined via an XML Schema application schema.
- **Geometry**: Spatial descriptions of features, including point, line string, polygon, multi-geometry collections, and 3D solid types. Geometries are expressed using coordinate tuples within a defined coordinate reference system.
- **Coordinate Reference Systems (CRS)**: Definitions that anchor coordinates to positions on the Earth. GML supports referencing well-known CRS identifiers such as EPSG codes.
- **Topology**: Optional structures that define the spatial relationships between features, such as adjacency and connectivity, independent of coordinate geometry.
- **Temporal Elements**: Representations of time instants and time periods, allowing features to carry temporal attributes for change tracking and historical analysis.
- **Coverage**: Structures for representing continuous phenomena like elevation models, temperature fields, or satellite imagery as spatially referenced grids or point sets.

## GML Versions and Evolution

GML has evolved significantly since its inception, with each major version expanding its capabilities and alignment with broader standards.

| Version | Year | Key Characteristics |
|---------|------|---------------------|
| GML 1.0 | 2000 | Initial specification; basic feature and geometry encoding using DTD |
| GML 2.0 | 2001 | Migrated to XML Schema; introduced standard geometry types |
| GML 3.0 | 2003 | Added topology, temporal elements, coordinate reference systems, and coverages |
| GML 3.1 | 2004 | Refined schema design; improved profile mechanism; widely adopted baseline |
| GML 3.2 | 2007 | Major revision adopted as ISO 19136; improved modularity and conformance classes |
| GML 3.3 | 2012 | Extensions for linear referencing, tin relief, and compact encoding |

GML 3.2, which became the international standard ISO 19136:2007, is the most widely deployed version and serves as the normative encoding for many national and international spatial data infrastructures, including the European INSPIRE directive.

## Relationship to Other Standards

GML does not exist in isolation. It is part of a broader ecosystem of OGC and ISO standards that collectively enable geospatial interoperability.

| Standard | Relationship to GML |
|----------|---------------------|
| WFS (Web Feature Service) | Uses GML as its default output format for serving vector feature data over the web |
| WMS (Web Map Service) | Renders map images from data that may be stored or described in GML |
| CityGML | An OGC application schema of GML specialized for 3D city models |
| KML (Keyhole Markup Language) | A simpler, visualization-oriented geographic XML format; less rigorous than GML for data exchange |
| GeoJSON | A lightweight JSON-based alternative for simple feature geometries; lacks GML's schema formalism and CRS flexibility |
| ISO 19109 | Defines the General Feature Model that GML implements |
| ISO 19107 | Defines the spatial schema (geometry and topology) that GML encodes |

## Advantages and Limitations

GML offers significant strengths for enterprise and government-scale geospatial data management, but it also carries trade-offs that practitioners should understand.

**Advantages:**

- Standardized and vendor-neutral, ensuring long-term data portability and interoperability across systems
- Rich schema expressiveness, supporting complex feature types, 3D geometry, topology, and temporal data
- Self-describing through XML Schema, enabling automated validation and data quality assurance
- Extensible via application schemas, allowing domain-specific customization without breaking standard compliance
- Backed by international standards (ISO 19136), providing legal and institutional credibility for government mandates

**Limitations:**

- Verbose XML encoding results in large file sizes compared to binary or JSON-based alternatives
- Parsing and processing overhead can be significant for high-volume or real-time applications
- Complexity of the full specification creates a steep learning curve for implementers
- Browser and mobile client support is limited compared to lighter formats like GeoJSON
- Schema design and maintenance for application-specific profiles requires specialized expertise

## Common Use Cases

GML serves a range of professional and institutional use cases across the geospatial industry:

- **National Spatial Data Infrastructures**: Countries such as those in the European Union use GML as the mandatory encoding for INSPIRE-compliant data themes covering transport networks, hydrography, land use, and protected sites.
- **Cadastral and Land Administration**: Land registries and cadastral agencies encode parcel boundaries, ownership records, and zoning information in GML for authoritative data exchange.
- **Urban Planning and 3D City Models**: CityGML, built on GML, enables the exchange of detailed 3D building models, terrain surfaces, and urban infrastructure for simulation and visualization.
- **Environmental Monitoring**: GML represents sensor observations, ecological boundaries, and environmental coverages for agencies managing natural resources and disaster response.
- **Transportation and Utility Networks**: Road networks, rail systems, and utility infrastructure are modeled as GML feature collections with topological connectivity for routing and analysis.

## GML Profiles

Because the full GML specification is extensive, the OGC defines profiles that constrain GML to manageable subsets for specific purposes:

- **Simple Features Profile (Level 0, 1, 2)**: Restricts geometry to basic 2D types (points, lines, polygons) and limits schema complexity. This is the most commonly implemented profile and aligns with the SQL/MM spatial standard.
- **GML Simple Streaming Profile**: Optimized for sequential processing of large GML datasets without requiring the entire document to be loaded into memory.
- **Point Profile**: A minimal profile for encoding point-only datasets, useful for sensor networks and geocoded records.

Choosing the appropriate profile is a critical design decision that balances expressiveness against implementation complexity and performance.

## Related

Professionals working with GML should explore related topics including Extensible Markup Language (XML) as the underlying syntax, Web Feature Service (WFS) and Web Map Service (WMS) as the primary OGC service interfaces that consume and produce GML, GeoJSON as a lightweight alternative for web mapping, CityGML for 3D urban modeling, the INSPIRE Directive for European spatial data policy, coordinate reference systems and EPSG codes for understanding spatial referencing, and geographic information systems (GIS) as the broader discipline within which GML operates.

## Summary

Geography Markup Language is the authoritative open standard for encoding and exchanging geographic feature data in XML. Governed by the OGC and formalized as ISO 19136, GML provides a rich, schema-driven framework capable of representing complex 2D and 3D geometries, topology, temporal data, and coverages. While its verbosity and complexity present challenges for lightweight applications, GML remains indispensable in enterprise geospatial systems, national data infrastructures, and any context where rigorous interoperability, validation, and long-term data stewardship are paramount.

## References

- Open Geospatial Consortium, "Geography Markup Language (GML) Encoding Standard," OGC 07-036r1, version 3.2.2. Available: https://www.ogc.org/standards/gml
- ISO 19136:2007, "Geographic information — Geography Markup Language (GML)." International Organization for Standardization.
- Open Geospatial Consortium, "OGC Standards and Resources." Available: https://www.ogc.org/standards
- European Commission, "INSPIRE Directive — Infrastructure for Spatial Information in Europe." Available: https://inspire.ec.europa.eu/
- Open Geospatial Consortium, "OGC CityGML Standard." Available: https://www.ogc.org/standards/citygml
- Lake, R., Burggraf, D., Trninić, M., and Rae, L., "Geography Mark-Up Language: Foundation for the Geo-Web," John Wiley & Sons, 2004.
