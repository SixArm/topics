## Universally Unique Identifier (UUID)

A Universally Unique Identifier (UUID) is a 128-bit identifier designed to uniquely identify information without requiring centralized coordination. The probability of generating duplicate UUIDs is astronomically low—even when created by different systems at different times across the globe. This property makes UUIDs fundamental infrastructure for modern distributed computing.

A UUID is represented as a 32-character hexadecimal string divided into five groups separated by hyphens: `123e4567-e89b-12d3-a456-426655440000`. The format follows the pattern `8-4-4-4-12`, totaling 36 characters including hyphens.

## UUID Versions and Their Characteristics

The UUID specification defines multiple versions, each using different generation strategies:

| Version | Name | Generation Method | Uniqueness Guarantee |
|---------|------|-------------------|---------------------|
| Version 1 | Time-based | Timestamp + MAC address | Guaranteed unique per machine |
| Version 2 | DCE Security | Timestamp + POSIX UID/GID | Domain-specific uniqueness |
| Version 3 | Name-based (MD5) | MD5 hash of namespace + name | Deterministic, reproducible |
| Version 4 | Random | Cryptographically random bits | Probabilistically unique |
| Version 5 | Name-based (SHA-1) | SHA-1 hash of namespace + name | Deterministic, reproducible |
| Version 6 | Reordered Time | Sortable timestamp + random | Time-ordered, lexicographically sortable |
| Version 7 | Unix Epoch Time | Unix timestamp + random | Time-ordered, database-friendly |
| Version 8 | Custom | Implementation-defined | Vendor-specific |

## Choosing the Right UUID Version

**Version 4 (Random)** is the most widely used. It generates 122 random bits, providing approximately 5.3 × 10³⁶ possible values. The collision probability is negligible for practical purposes—generating 1 billion UUIDs per second for 85 years yields roughly a 50% chance of a single collision.

**Version 1 (Time-based)** embeds the generating machine's MAC address and a timestamp. This guarantees uniqueness but exposes information about when and where the UUID was created, which may be a privacy concern.

**Version 5 (Name-based)** produces deterministic UUIDs from a namespace and name combination. The same inputs always produce the same UUID, making it useful for generating reproducible identifiers from existing data.

**Version 7 (Unix Epoch Time)** is the modern choice for database primary keys. It combines a millisecond-precision Unix timestamp with random bits, producing UUIDs that are both unique and naturally sortable by creation time.

## UUID Structure

The 128 bits of a UUID are organized into specific fields:

| Field | Bits | Description |
|-------|------|-------------|
| time_low | 32 | Low field of the timestamp (or random for v4) |
| time_mid | 16 | Middle field of the timestamp |
| time_hi_and_version | 16 | High field of timestamp with version number |
| clock_seq_hi_and_reserved | 8 | Clock sequence with variant |
| clock_seq_low | 8 | Low field of clock sequence |
| node | 48 | Node identifier (MAC address or random) |

The version number occupies the most significant 4 bits of the time_hi_and_version field. The variant field identifies the UUID layout and is encoded in the clock_seq_hi_and_reserved field.

## Common Use Cases

**Database Primary Keys**
- Enables distributed ID generation without coordination
- Eliminates single points of failure in ID assignment
- Supports database sharding and replication
- Prevents ID collision during data merges

**Distributed Systems**
- Each node generates IDs independently
- No network round-trips for ID allocation
- Scales horizontally without bottlenecks
- Works offline and synchronizes later

**Session and Token Management**
- Creates unpredictable session identifiers
- Generates secure access tokens
- Tracks user sessions across services
- Prevents session hijacking through guessability

**Message and Event Tracking**
- Uniquely identifies messages in queues
- Enables idempotent message processing
- Traces requests across microservices
- Correlates distributed logs

**File and Resource Naming**
- Creates collision-free filenames for uploads
- Names temporary files and cache entries
- Generates unique URLs for resources
- Avoids race conditions in file creation

## UUIDs vs Alternative Identifiers

| Aspect | UUID | Auto-increment Integer | ULID | Snowflake ID |
|--------|------|----------------------|------|--------------|
| Size | 128 bits | 32-64 bits | 128 bits | 64 bits |
| Sortable | Only v6, v7 | Yes | Yes | Yes |
| Distributed | Yes | No | Yes | Yes |
| Coordination | None | Required | None | Per-worker |
| Human-readable | Poor | Good | Better | Poor |
| Index performance | Lower | Higher | Higher | Higher |
| Collision risk | Negligible | Zero (centralized) | Negligible | Zero (coordinated) |

## Performance Considerations

**Storage overhead**: UUIDs require 16 bytes versus 4-8 bytes for integers. For tables with billions of rows and multiple UUID columns, this adds significant storage.

**Index fragmentation**: Random UUIDs (v4) cause scattered inserts in B-tree indexes, degrading write performance. Version 7 UUIDs mitigate this through time-ordered prefixes.

**String representation**: The 36-character string format consumes more space than binary storage. Store UUIDs in native binary format when possible.

**Comparison speed**: Comparing 128-bit values is slower than comparing 64-bit integers, though modern CPUs make this difference minimal.

## Best Practices

- Use Version 7 for new database primary keys requiring time ordering
- Use Version 4 when order is irrelevant and simplicity is preferred
- Use Version 5 when deterministic generation from known inputs is needed
- Store UUIDs in binary format in databases, not as strings
- Use database-native UUID types when available
- Consider the privacy implications of Version 1 UUIDs
- Generate UUIDs using cryptographically secure random sources for Version 4
- Validate UUID format when accepting external input
- Use lowercase hexadecimal for string representation (per RFC 4122)

## Security Implications

**Version 1 vulnerabilities**: Exposes the MAC address and creation time, potentially revealing system information and usage patterns.

**Version 4 requirements**: Must use cryptographically secure random number generators. Weak randomness makes UUIDs guessable.

**Not secrets**: UUIDs provide uniqueness, not secrecy. Never rely on UUID unpredictability for authentication without additional security measures.

**Enumeration resistance**: Random UUIDs prevent attackers from guessing valid identifiers, unlike sequential integers where guessing adjacent values is trivial.

## Standards and Specifications

- **RFC 4122**: The original UUID specification defining versions 1-5
- **RFC 9562**: The updated specification adding versions 6-8
- **ITU-T X.667**: International standard equivalent to RFC 4122
- **ISO/IEC 9834-8**: UUID standard for OSI registration
