# Tom's Opinionated Markup Language (TOML)

## Introduction

Tom's Opinionated Markup Language (TOML) is a configuration file format designed to be easy to read and write for both humans and machines. Created by Tom Preston-Werner, co-founder of GitHub, TOML emerged from frustration with existing configuration formats that were either too complex, too ambiguous, or too difficult to parse correctly.

TOML aims to be a minimal configuration format that maps unambiguously to a hash table. It prioritizes human readability while maintaining strict parsing rules that eliminate the edge cases and inconsistencies found in formats like YAML.

## Core Philosophy

TOML follows several design principles that distinguish it from other configuration formats:

- **Obvious semantics**: The format should be immediately understandable without consulting documentation
- **Minimal syntax**: Only necessary features are included, avoiding feature bloat
- **Unambiguous parsing**: Every valid TOML document has exactly one interpretation
- **Hash table mapping**: The entire document maps directly to a dictionary/hash structure

## Basic Syntax

TOML uses key-value pairs as its fundamental building blocks. Keys appear on the left side of an equals sign, values on the right. Whitespace around the equals sign is ignored.

Keys can be bare (alphanumeric plus underscores and dashes) or quoted. Bare keys are preferred for simplicity. Dotted keys allow you to express nested structures inline without creating explicit table sections.

Comments begin with a hash symbol and extend to the end of the line. They can appear on their own lines or at the end of lines containing data.

## Data Types

TOML supports a comprehensive set of data types that cover most configuration needs:

| Data Type | Description | Example Value |
|-----------|-------------|---------------|
| String | UTF-8 encoded text | "hello world" |
| Integer | Whole numbers, supports underscores for readability | 1_000_000 |
| Float | Floating-point numbers, supports scientific notation | 3.14159 |
| Boolean | True or false values | true, false |
| Offset Date-Time | Full timestamp with timezone | 1979-05-27T07:32:00Z |
| Local Date-Time | Timestamp without timezone | 1979-05-27T07:32:00 |
| Local Date | Date only | 1979-05-27 |
| Local Time | Time only | 07:32:00 |
| Array | Ordered list of values | [1, 2, 3] |
| Inline Table | Compact table syntax | {key = "value"} |

## Tables and Sections

Tables are collections of key-value pairs, defined by headers in square brackets. Tables continue until the next table header or end of file. This creates a natural hierarchical structure for organizing related configuration options.

Nested tables can be defined using dotted notation in headers. This allows deep nesting without excessive indentation or complex syntax. Super-tables (parent tables) are implicitly created when you define a sub-table.

Array of tables uses double square brackets. Each occurrence of the header creates a new element in the array. This is particularly useful for configuring multiple instances of similar items, such as server definitions or plugin configurations.

## Comparison with Other Formats

| Feature | TOML | YAML | JSON | INI |
|---------|------|------|------|-----|
| Human readability | Excellent | Good | Fair | Excellent |
| Comment support | Yes | Yes | No | Yes |
| Complex nesting | Good | Excellent | Excellent | Poor |
| Type safety | Strong | Weak | Strong | Weak |
| Parser complexity | Low | High | Low | Low |
| Ambiguity potential | None | High | None | Moderate |
| Date/time support | Native | Limited | None | None |

## Advantages of TOML

- **Clear structure**: The table-based organization makes configurations easy to navigate
- **Strong typing**: Values have explicit types, reducing runtime errors
- **No indentation sensitivity**: Unlike YAML, whitespace does not affect meaning
- **Predictable parsing**: Every parser produces identical results for valid documents
- **Native date/time support**: First-class support for temporal data types
- **Easy to diff**: Line-based format works well with version control systems
- **Broad language support**: Libraries exist for virtually every programming language

## Limitations and Considerations

- **Deep nesting verbosity**: Highly nested structures require verbose table headers
- **No schema validation**: Unlike JSON Schema, there is no standard schema format
- **Array type restrictions**: Arrays must contain homogeneous types
- **No multiline inline tables**: Inline tables must fit on a single line
- **Limited expression**: Cannot represent circular references or complex object graphs

## Common Use Cases

TOML excels in several application domains:

- **Application configuration**: Primary use case, storing settings and preferences
- **Build system configuration**: Cargo (Rust), Poetry (Python), and others use TOML
- **Project metadata**: Package manifests and project descriptors
- **Environment configuration**: Server and deployment settings
- **Static site generators**: Hugo, Zola, and others support TOML front matter

## Ecosystem and Adoption

TOML has gained significant adoption in the software development community:

| Platform/Tool | Usage |
|---------------|-------|
| Rust/Cargo | Primary configuration format for all Rust projects |
| Python/Poetry | Package management and project configuration |
| Python/pip | pyproject.toml for build system requirements |
| Hugo | Static site generator configuration |
| InfluxDB | Database configuration |
| Netlify | Deployment configuration |
| GitLab CI | Pipeline configuration option |

## Best Practices

When working with TOML files:

- **Group related settings**: Use tables to organize logically connected options
- **Use descriptive keys**: Choose clear, self-documenting key names
- **Add comments**: Document non-obvious settings and acceptable values
- **Prefer bare keys**: Use quoted keys only when necessary
- **Maintain consistency**: Follow consistent naming conventions throughout
- **Keep files focused**: Split large configurations into multiple files when possible
- **Validate early**: Use TOML validators during development and CI pipelines

## Version History

TOML reached version 1.0.0 in January 2021 after years of community feedback and refinement. The specification is now stable, with clear rules for forward compatibility. This stability makes TOML a reliable choice for long-term projects.

## Conclusion

TOML provides a balanced approach to configuration file formats, offering excellent human readability without sacrificing machine parseability. Its unambiguous specification eliminates the parsing edge cases that plague YAML, while its rich type system exceeds what INI or environment variables can express. For technology professionals building applications that require configuration files, TOML represents a modern, well-designed choice that reduces cognitive overhead and parsing bugs.
