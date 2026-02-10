# Quality of Service (QoS) algorithms

Quality of Service (QoS) algorithms are a foundational pillar of modern telecommunications and network engineering. They provide the mechanisms by which network devices prioritize, manage, and control the flow of traffic across shared infrastructure. In environments where latency-sensitive applications such as voice over IP, video conferencing, and real-time telemetry compete for bandwidth alongside bulk data transfers and web browsing, QoS algorithms ensure that each class of traffic receives the treatment it requires. Understanding these algorithms is essential for any technology professional involved in network design, cloud architecture, or service delivery.


## Why QoS Matters

Networks carry traffic with vastly different performance requirements. A voice call demands consistent low latency and minimal jitter, while a file download can tolerate variable delays. Without QoS mechanisms, a best-effort network treats all packets equally, which inevitably leads to degraded performance for time-sensitive applications during periods of congestion. QoS algorithms solve this by introducing differentiated treatment: they classify traffic, allocate resources, enforce policies, and manage queues so that service-level agreements (SLAs) are met even under heavy load.

Key performance metrics that QoS algorithms target include:

- **Latency**: The end-to-end delay experienced by a packet traversing the network.
- **Jitter**: The variation in latency over time, critical for streaming and real-time media.
- **Packet loss**: The percentage of packets dropped due to congestion or buffer overflow.
- **Throughput**: The effective data rate delivered to an application or flow.
- **Availability**: The proportion of time the network meets its performance targets.


## Traffic Classification and Marking

Before any QoS policy can take effect, the network must identify what type of traffic each packet belongs to. Traffic classification inspects incoming packets based on criteria such as source and destination IP addresses, port numbers, protocol type, or Differentiated Services Code Point (DSCP) values in the IP header. Once classified, packets are marked with appropriate priority indicators so that downstream devices can apply consistent treatment without re-inspecting the payload.

Common marking schemes include:

| Marking Scheme | Layer | Granularity | Typical Use |
|---|---|---|---|
| IEEE 802.1p (CoS) | Layer 2 | 3-bit field (8 classes) | LAN switching and VLAN tagging |
| DSCP | Layer 3 | 6-bit field (64 classes) | End-to-end IP network differentiation |
| MPLS EXP | Label header | 3-bit field (8 classes) | Service provider MPLS networks |
| IP Precedence | Layer 3 | 3-bit field (8 classes) | Legacy IP networks |

Classification and marking should happen as close to the network edge as possible, at the trust boundary, so that core devices can make fast forwarding decisions based on pre-applied markings.


## Queue Management Algorithms

Queue management determines how packets are buffered and which packets are dropped when congestion occurs. These algorithms are critical for maintaining fairness and preventing a single aggressive flow from monopolizing buffer space.

- **Tail Drop**: The simplest approach. When a queue reaches its maximum length, all subsequent arriving packets are dropped. This is easy to implement but can lead to TCP global synchronization, where many flows simultaneously back off and then ramp up together, causing oscillating congestion.
- **Random Early Detection (RED)**: Proactively drops packets with increasing probability as the average queue length grows, before the queue is completely full. This encourages TCP senders to reduce their rate gradually, avoiding synchronization effects.
- **Weighted Random Early Detection (WRED)**: Extends RED by applying different drop probabilities to packets based on their DSCP or IP Precedence markings. Higher-priority traffic has a lower drop probability, providing differentiated treatment even within a single queue.
- **Explicit Congestion Notification (ECN)**: Rather than dropping packets, ECN marks them to signal congestion to the sender. This allows endpoints to reduce their transmission rate without the overhead of retransmission.

| Algorithm | Drop Strategy | Congestion Signal | Fairness | Complexity |
|---|---|---|---|---|
| Tail Drop | Drop all after threshold | Implicit (loss) | Poor | Very low |
| RED | Probabilistic early drop | Implicit (loss) | Moderate | Low |
| WRED | Class-aware probabilistic drop | Implicit (loss) | Good | Moderate |
| ECN | Mark instead of drop | Explicit (header bit) | Good | Moderate |


## Scheduling Algorithms

Scheduling algorithms determine the order in which packets are dequeued and transmitted from output interfaces. The choice of scheduler directly affects how bandwidth and latency are distributed among competing traffic classes.

- **First In, First Out (FIFO)**: Packets are transmitted in arrival order. No differentiation is applied. Suitable only for links with minimal congestion.
- **Priority Queuing (PQ)**: Traffic is placed into strict priority queues. The highest-priority queue is always serviced first. This guarantees low latency for critical traffic but risks starvation of lower-priority queues under sustained load.
- **Weighted Round Robin (WRR)**: Each queue is assigned a weight that determines how many packets (or bytes) it can transmit per scheduling cycle. This provides proportional bandwidth allocation without starvation.
- **Weighted Fair Queuing (WFQ)**: Emulates bit-by-bit round-robin by computing a virtual finish time for each packet. Flows with smaller packets or lower weights are interleaved fairly. WFQ provides excellent fairness but is computationally more expensive.
- **Deficit Round Robin (DRR)**: A practical variant of WFQ that tracks a deficit counter per queue, allowing variable-length packets to be scheduled fairly with O(1) complexity per packet.
- **Class-Based Weighted Fair Queuing (CBWFQ)**: Combines user-defined traffic classes with WFQ scheduling. Each class receives a guaranteed minimum bandwidth, and excess bandwidth is shared proportionally.
- **Low Latency Queuing (LLQ)**: Adds a strict priority queue on top of CBWFQ. Real-time traffic such as voice is placed in the priority queue with a policed rate to prevent starvation of other classes.

| Scheduler | Bandwidth Guarantee | Latency Guarantee | Starvation Risk | Computational Cost |
|---|---|---|---|---|
| FIFO | None | None | N/A | Minimal |
| Priority Queuing | None | Yes (highest class) | High | Low |
| WRR | Proportional | Bounded | None | Low |
| WFQ | Proportional | Bounded | None | High |
| DRR | Proportional | Bounded | None | Low |
| CBWFQ | Per-class minimum | Bounded | None | Moderate |
| LLQ | Per-class + priority | Yes (priority class) | Low (policed) | Moderate |


## Traffic Shaping and Policing

Traffic shaping and policing are rate-control mechanisms that enforce bandwidth limits on traffic flows. Though related, they differ in how they handle excess traffic.

- **Traffic Shaping** (also called traffic smoothing) buffers excess packets and transmits them at a regulated rate. It smooths bursty traffic into a more predictable stream. Shaping is typically applied at egress interfaces and introduces additional latency due to buffering. The Token Bucket and Leaky Bucket are two classical shaping models.
- **Traffic Policing** measures traffic against a defined rate and immediately drops or re-marks packets that exceed the threshold. Policing does not buffer packets, so it introduces no additional latency, but it can cause packet loss for non-conforming flows.

| Mechanism | Action on Excess | Latency Impact | Buffer Required | Typical Application |
|---|---|---|---|---|
| Shaping | Buffer and delay | Increased | Yes | WAN edge, service provider handoff |
| Policing | Drop or re-mark | None | No | Trust boundary, ingress enforcement |

The Token Bucket algorithm is the most widely deployed rate-control mechanism. It maintains a bucket that fills with tokens at a configured rate. Each transmitted packet consumes tokens. If tokens are available, the packet is sent immediately; if not, it is either queued (shaping) or dropped (policing). A burst parameter controls the maximum bucket depth, allowing short-term traffic bursts up to the configured limit.


## Admission Control

Admission control algorithms decide whether a new traffic flow can be accepted into the network without degrading the quality of existing flows. This is a proactive approach to congestion management: rather than reacting to congestion after it occurs, admission control prevents it by reserving resources in advance.

- **Resource Reservation Protocol (RSVP)**: A signaling protocol that allows applications to request and reserve bandwidth along a network path. Routers along the path either accept or reject the reservation based on available capacity.
- **Measurement-Based Admission Control (MBAC)**: Uses real-time measurements of current network utilization to make admission decisions, rather than relying on worst-case reservations. This approach achieves higher utilization but provides weaker guarantees.
- **Parameter-Based Admission Control**: Relies on declared traffic parameters (peak rate, average rate, burst size) from the flow descriptor. The network sums the declared parameters of all admitted flows and rejects new flows when capacity would be exceeded.

Admission control is particularly important in voice and video networks, where admitting too many calls on a link would degrade quality for all participants.


## Congestion Avoidance

Congestion avoidance algorithms operate at the transport layer to detect early signs of network congestion and reduce transmission rates before packet loss becomes severe. These algorithms are primarily implemented in TCP.

- **TCP Reno**: Uses additive increase/multiplicative decrease (AIMD). It increases the congestion window linearly and halves it upon detecting packet loss via duplicate acknowledgments.
- **TCP Vegas**: Monitors round-trip time (RTT) variations to detect congestion before packet loss occurs. It adjusts the sending rate based on the difference between expected and actual throughput.
- **TCP Cubic**: The default congestion control algorithm in Linux. It uses a cubic function for window growth, enabling faster recovery after congestion events, particularly on high-bandwidth, high-latency links.
- **TCP BBR (Bottleneck Bandwidth and Round-trip propagation time)**: Developed by Google, BBR estimates the available bottleneck bandwidth and minimum RTT to pace traffic optimally, rather than relying on packet loss as a congestion signal.

These transport-layer algorithms interact with network-layer QoS mechanisms. For example, WRED's early drops trigger TCP congestion avoidance behavior, allowing the network to signal congestion without waiting for queue overflow.


## Bandwidth Reservation

Bandwidth reservation ensures that critical applications receive a guaranteed share of link capacity regardless of competing traffic. This is distinct from scheduling, which determines the order of packet transmission; reservation determines how much capacity is allocated.

- **IntServ (Integrated Services)**: Provides per-flow guarantees using RSVP signaling. Offers two service classes: Guaranteed Service (hard latency and bandwidth bounds) and Controlled Load (approximates an unloaded network). IntServ is precise but scales poorly because routers must maintain per-flow state.
- **DiffServ (Differentiated Services)**: Provides per-class guarantees by marking packets with DSCP values and applying per-hop behaviors (PHBs) at each router. DiffServ scales well because it operates on aggregate traffic classes rather than individual flows. The two standard PHBs are Expedited Forwarding (EF) for low-latency traffic and Assured Forwarding (AF) for tiered drop precedence.

| Architecture | Granularity | Scalability | State Maintained | Guarantee Strength |
|---|---|---|---|---|
| IntServ | Per-flow | Low | Per-flow at every router | Hard guarantees |
| DiffServ | Per-class | High | Per-class at each hop | Relative/soft guarantees |

Most modern enterprise and service provider networks use DiffServ for scalability, reserving IntServ-style reservations for specialized use cases such as circuit emulation services.


## Designing a QoS Policy

Implementing QoS effectively requires a systematic approach:

1. **Identify application requirements**: Catalog the applications on the network and determine their latency, jitter, loss, and throughput requirements.
2. **Define traffic classes**: Group applications into a manageable number of classes (typically 4 to 8). Common classes include real-time voice, interactive video, business-critical data, best effort, and scavenger.
3. **Classify and mark at the edge**: Apply DSCP markings at ingress points based on access control lists, deep packet inspection, or application-layer gateways.
4. **Configure queuing and scheduling**: Apply LLQ or CBWFQ on congested links, with WRED for congestion avoidance within each queue.
5. **Apply shaping and policing**: Shape traffic at WAN edges to match contracted rates. Police at trust boundaries to prevent unauthorized markings.
6. **Monitor and adjust**: Use SNMP, NetFlow, or streaming telemetry to monitor queue depths, drop rates, and per-class throughput. Adjust policies as traffic patterns evolve.


## Related

Professionals working with QoS algorithms should also explore network protocols such as TCP/IP and MPLS, load balancing algorithms, congestion control theory, software-defined networking (SDN) and its programmable QoS capabilities, network function virtualization (NFV), service-level agreement design, traffic engineering with RSVP-TE, and real-time protocol (RTP) and its companion RTCP for media quality monitoring. Understanding these adjacent topics provides the broader context necessary for designing end-to-end quality-aware networks.


## Summary

Quality of Service algorithms form a layered system of mechanisms that collectively ensure network resources are allocated according to application requirements. Traffic classification and marking identify and tag packets at the network edge. Queue management algorithms like WRED prevent congestion-induced synchronization. Scheduling algorithms such as LLQ and CBWFQ distribute bandwidth and latency guarantees across traffic classes. Shaping and policing enforce rate limits. Admission control prevents oversubscription. Congestion avoidance at the transport layer works in concert with network-layer signaling to regulate end-to-end throughput. Together, these algorithms enable networks to deliver predictable, differentiated service even under heavy and variable load conditions.


## References

- Braden, R., Clark, D., & Shenker, S. (1994). *Integrated Services in the Internet Architecture: an Overview*. RFC 1633. Internet Engineering Task Force. https://datatracker.ietf.org/doc/html/rfc1633
- Blake, S., Black, D., Carlson, M., Davies, E., Wang, Z., & Weiss, W. (1998). *An Architecture for Differentiated Services*. RFC 2475. Internet Engineering Task Force. https://datatracker.ietf.org/doc/html/rfc2475
- Floyd, S. & Jacobson, V. (1993). *Random Early Detection Gateways for Congestion Avoidance*. IEEE/ACM Transactions on Networking, 1(4), 397-413.
- Shreedhar, M. & Varghese, G. (1996). *Efficient Fair Queuing Using Deficit Round-Robin*. IEEE/ACM Transactions on Networking, 4(3), 375-385.
- Cardwell, N., Cheng, Y., Gunn, C. S., Yeganeh, S. H., & Jacobson, V. (2017). *BBR: Congestion-Based Congestion Control*. Communications of the ACM, 60(2), 58-66.
- Cisco Systems. *Quality of Service Overview*. Cisco Documentation. https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos/configuration/xe-16/qos-xe-16-book.html
- Davie, B. & Rekhter, Y. (2000). *MPLS: Technology and Applications*. Morgan Kaufmann Publishers.
- Tanenbaum, A. S. & Wetherall, D. J. (2011). *Computer Networks* (5th ed.). Pearson Education.
