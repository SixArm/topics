## Network Protocols

Network protocols are standardized rules and procedures that govern communication between devices on a network. They define how data is formatted, transmitted, received, and acknowledged across interconnected systems. Without these protocols, devices from different manufacturers and running different software would be unable to communicate reliably.

## The OSI Model Foundation

Understanding network protocols requires familiarity with the OSI (Open Systems Interconnection) model, which organizes protocols into seven layers:

| Layer | Name | Function | Example Protocols |
|-------|------|----------|-------------------|
| 7 | Application | User-facing services | HTTP, SMTP, FTP, DNS |
| 6 | Presentation | Data formatting and encryption | SSL/TLS, JPEG, ASCII |
| 5 | Session | Connection management | NetBIOS, RPC |
| 4 | Transport | End-to-end delivery | TCP, UDP |
| 3 | Network | Routing and addressing | IP, ICMP, OSPF |
| 2 | Data Link | Frame transmission | Ethernet, Wi-Fi, PPP |
| 1 | Physical | Bit transmission | USB, Bluetooth, DSL |

## TCP/IP Protocol Suite

The TCP/IP suite is the foundation of modern internet communication. It predates the OSI model and uses a simplified four-layer architecture.

### Internet Protocol (IP)

IP handles addressing and routing of packets across networks. Two versions are in active use:

| Feature | IPv4 | IPv6 |
|---------|------|------|
| Address Size | 32 bits | 128 bits |
| Address Format | 192.168.1.1 | 2001:0db8:85a3::8a2e:0370:7334 |
| Address Space | ~4.3 billion | ~340 undecillion |
| Header Size | 20-60 bytes | 40 bytes (fixed) |
| NAT Requirement | Common | Rarely needed |

### Transmission Control Protocol (TCP)

TCP provides reliable, ordered, and error-checked delivery of data between applications. Key characteristics include:

- **Connection-oriented**: Establishes a three-way handshake before data transfer
- **Reliable delivery**: Guarantees packets arrive and are reassembled correctly
- **Flow control**: Prevents sender from overwhelming receiver
- **Congestion control**: Adapts to network conditions to prevent overload
- **Ordered delivery**: Ensures data arrives in the sequence it was sent

### User Datagram Protocol (UDP)

UDP offers a lightweight alternative to TCP with minimal overhead:

- **Connectionless**: No handshake required before sending
- **No guaranteed delivery**: Packets may be lost without notification
- **No ordering**: Packets may arrive out of sequence
- **Low latency**: Ideal for time-sensitive applications

| Use Case | TCP | UDP |
|----------|-----|-----|
| Web browsing | Preferred | Not used |
| Email | Preferred | Not used |
| Video streaming | Sometimes | Preferred |
| Online gaming | Sometimes | Preferred |
| VoIP | Not used | Preferred |
| DNS queries | Fallback | Primary |
| File transfer | Preferred | Not used |

## Application Layer Protocols

### HTTP and HTTPS

HyperText Transfer Protocol is the foundation of web communication. It operates on a request-response model where clients send requests and servers return responses.

**HTTP Methods:**

- **GET**: Retrieve a resource
- **POST**: Submit data to be processed
- **PUT**: Update or create a resource
- **DELETE**: Remove a resource
- **PATCH**: Partially modify a resource
- **HEAD**: Retrieve headers only
- **OPTIONS**: Query supported methods

HTTPS adds TLS encryption to HTTP, protecting data in transit. Modern best practice mandates HTTPS for all web traffic.

| HTTP Version | Key Features |
|--------------|--------------|
| HTTP/1.0 | Single request per connection |
| HTTP/1.1 | Persistent connections, pipelining |
| HTTP/2 | Binary framing, multiplexing, header compression |
| HTTP/3 | QUIC transport, improved performance over lossy networks |

### Email Protocols

Email relies on multiple protocols working together:

**SMTP (Simple Mail Transfer Protocol)**
- Purpose: Sending and relaying email between servers
- Port: 25 (relay), 587 (submission), 465 (implicit TLS)
- Direction: Outbound only

**POP3 (Post Office Protocol v3)**
- Purpose: Retrieving email from server
- Port: 110 (unencrypted), 995 (TLS)
- Behavior: Downloads and typically deletes from server

**IMAP (Internet Message Access Protocol)**
- Purpose: Accessing and managing email on server
- Port: 143 (unencrypted), 993 (TLS)
- Behavior: Synchronizes state between client and server

| Feature | POP3 | IMAP |
|---------|------|------|
| Server storage | Temporary | Permanent |
| Multi-device access | Poor | Excellent |
| Offline access | Full | Configurable |
| Bandwidth usage | High initial | Lower |
| Folder management | None | Full |

### File Transfer Protocol (FTP)

FTP enables file transfer between systems using separate control and data connections:

- **Control connection**: Port 21, handles commands and responses
- **Data connection**: Port 20 (active) or ephemeral (passive)

**FTP Modes:**
- **Active mode**: Server initiates data connection to client
- **Passive mode**: Client initiates both connections (firewall-friendly)

**Secure Alternatives:**
- **FTPS**: FTP with TLS encryption
- **SFTP**: SSH File Transfer Protocol (different from FTP)
- **SCP**: Secure Copy Protocol

### DNS (Domain Name System)

DNS translates human-readable domain names to IP addresses. It uses a hierarchical, distributed database.

**Record Types:**

| Type | Purpose | Example |
|------|---------|---------|
| A | IPv4 address | example.com → 93.184.216.34 |
| AAAA | IPv6 address | example.com → 2606:2800:220:1:... |
| CNAME | Canonical name (alias) | www → example.com |
| MX | Mail exchanger | Priority and mail server |
| TXT | Text records | SPF, DKIM, verification |
| NS | Nameserver | Authoritative DNS servers |
| SOA | Start of authority | Zone administration info |
| PTR | Reverse lookup | IP → domain name |

## Security Protocols

### TLS (Transport Layer Security)

TLS provides encryption, authentication, and integrity for network communications. It replaced the deprecated SSL protocol.

**TLS Handshake Components:**
- Server authentication via certificates
- Key exchange for session encryption
- Cipher suite negotiation
- Optional client authentication

| Version | Status | Notes |
|---------|--------|-------|
| SSL 2.0 | Deprecated | Severe vulnerabilities |
| SSL 3.0 | Deprecated | POODLE vulnerability |
| TLS 1.0 | Deprecated | Legacy support only |
| TLS 1.1 | Deprecated | Legacy support only |
| TLS 1.2 | Supported | Widely deployed |
| TLS 1.3 | Recommended | Faster, more secure |

### IPsec

IPsec provides security at the network layer, protecting all traffic between endpoints regardless of application:

- **Authentication Header (AH)**: Integrity and authentication
- **Encapsulating Security Payload (ESP)**: Encryption plus integrity
- **Transport mode**: Protects payload only
- **Tunnel mode**: Protects entire IP packet (VPN use)

### SSH (Secure Shell)

SSH provides encrypted remote access and secure tunneling:

- Remote command-line access
- Secure file transfer (SFTP, SCP)
- Port forwarding and tunneling
- Key-based authentication

## Routing Protocols

Routing protocols determine how packets traverse networks:

| Protocol | Type | Use Case |
|----------|------|----------|
| OSPF | Link-state | Large enterprise networks |
| BGP | Path-vector | Internet backbone routing |
| RIP | Distance-vector | Small networks (legacy) |
| EIGRP | Hybrid | Cisco environments |
| IS-IS | Link-state | Service provider networks |

**Interior vs. Exterior:**
- **IGP (Interior Gateway Protocol)**: Routes within an autonomous system (OSPF, EIGRP)
- **EGP (Exterior Gateway Protocol)**: Routes between autonomous systems (BGP)

## Real-Time Communication Protocols

### WebSocket

WebSocket provides full-duplex communication over a single TCP connection:

- Persistent connection after initial HTTP handshake
- Low overhead for bidirectional messaging
- Ideal for chat, live updates, and collaborative applications

### WebRTC

Web Real-Time Communication enables peer-to-peer audio, video, and data sharing:

- Browser-based video conferencing
- No plugin requirements
- NAT traversal via ICE, STUN, and TURN

### MQTT

Message Queuing Telemetry Transport is lightweight publish-subscribe messaging:

- Minimal bandwidth and battery usage
- Ideal for IoT and mobile applications
- Quality of Service levels for delivery guarantees

## Protocol Selection Guidelines

When choosing protocols for your architecture, consider:

**Reliability Requirements**
- Mission-critical data: TCP-based protocols
- Loss-tolerant real-time: UDP-based protocols

**Security Requirements**
- Public networks: Always use encrypted variants (HTTPS, SFTP, TLS)
- Internal networks: Evaluate threat model before deciding

**Performance Requirements**
- High throughput: HTTP/2, HTTP/3, or custom protocols
- Low latency: UDP-based or WebSocket

**Compatibility Requirements**
- Universal access: HTTP/HTTPS
- Legacy systems: May require older protocol versions

## Summary

Network protocols form the invisible infrastructure enabling modern digital communication. A technology professional should understand:

- The layered architecture of network communication
- TCP versus UDP tradeoffs for different use cases
- Security implications of protocol choices
- How application-layer protocols build on transport-layer foundations

Mastery of these protocols enables effective system design, efficient troubleshooting, and informed security decisions.
