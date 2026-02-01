## Quality of Service (QoS) Algorithms

Quality of Service (QoS) algorithms are fundamental mechanisms in telecommunications and networking that prioritize, manage, and control network traffic. These algorithms ensure reliable service delivery in environments where multiple applications with different requirements compete for shared network resources. Understanding QoS is essential for technology professionals designing, implementing, or troubleshooting modern networks.

## Why QoS Matters

Networks carry diverse traffic types—voice calls, video streams, file transfers, web browsing, and real-time gaming—each with distinct requirements for latency, bandwidth, and reliability. Without QoS mechanisms, all traffic receives equal treatment, leading to degraded performance for latency-sensitive applications when the network becomes congested. QoS algorithms solve this by intelligently managing how traffic flows through network infrastructure.

## Traffic Shaping

Traffic shaping regulates the rate at which packets are transmitted onto the network. Rather than allowing bursty traffic that can overwhelm network links, shapers smooth out transmission rates to match available bandwidth or contracted service levels.

| Technique | Description | Use Case |
|-----------|-------------|----------|
| Token Bucket | Allows bursts up to a defined limit while enforcing average rate | ISP bandwidth enforcement |
| Leaky Bucket | Enforces strict constant output rate regardless of input | Voice traffic smoothing |
| Generic Traffic Shaping (GTS) | Cisco implementation that delays excess traffic | WAN edge devices |
| Class-Based Shaping | Applies different shaping policies per traffic class | Enterprise networks |

Traffic shaping is typically applied at network edges where traffic enters a constrained link, such as the boundary between an enterprise network and a WAN connection.

## Prioritization

Prioritization mechanisms give preferential treatment to specific traffic types, ensuring that time-sensitive applications like voice and video receive resources before less critical traffic like email or file backups.

Key prioritization approaches include:

- **Strict Priority Queuing**: Highest-priority traffic is always serviced first; lower priorities only transmit when higher queues are empty
- **Class-Based Prioritization**: Traffic is grouped into classes, each receiving guaranteed minimum bandwidth
- **Expedited Forwarding (EF)**: A DiffServ behavior providing low-loss, low-latency, low-jitter service
- **Assured Forwarding (AF)**: Provides tiered drop precedence within traffic classes

Prioritization requires careful design to prevent starvation of lower-priority traffic while ensuring critical applications meet their service requirements.

## Queue Management Algorithms

Queue management algorithms determine how packets are stored, prioritized, and potentially dropped when network buffers fill. The choice of algorithm significantly impacts fairness, latency, and throughput.

| Algorithm | Full Name | Behavior |
|-----------|-----------|----------|
| FIFO | First In, First Out | Simple sequential processing; no differentiation |
| WFQ | Weighted Fair Queuing | Allocates bandwidth proportionally based on weights |
| SFQ | Stochastic Fairness Queuing | Uses hashing to distribute flows across queues fairly |
| RED | Random Early Detection | Proactively drops packets before queue fills to signal congestion |
| WRED | Weighted RED | RED with different drop thresholds per traffic class |
| CQ | Custom Queuing | Round-robin with configurable byte counts per queue |
| PQ | Priority Queuing | Strict priority with multiple queue levels |

Weighted Fair Queuing provides excellent fairness by ensuring each flow receives bandwidth proportional to its assigned weight. Random Early Detection prevents tail-drop scenarios by randomly dropping packets as queue depth increases, encouraging TCP flows to reduce their transmission rates before complete congestion occurs.

## Admission Control

Admission control mechanisms assess whether the network can accommodate new traffic flows without degrading existing service commitments. Before admitting a new connection, the network evaluates available resources against the requirements of the proposed flow.

Key admission control concepts:

- **Resource Reservation Protocol (RSVP)**: Signals resource requirements along a path and reserves capacity
- **Call Admission Control (CAC)**: Used in VoIP systems to reject new calls when capacity is exhausted
- **Bandwidth Broker**: Centralized entity that manages and allocates bandwidth across a domain
- **Measurement-Based Admission Control**: Uses real-time traffic measurements to make admission decisions

Admission control is particularly important in converged networks carrying voice and video, where accepting too many flows would degrade all sessions rather than just the newest one.

## Packet Classification and Marking

Classification identifies packets belonging to specific traffic flows, while marking stamps packets with indicators that downstream devices use for QoS treatment.

| Classification Criteria | Description |
|------------------------|-------------|
| Source/Destination IP | Identifies traffic by endpoint addresses |
| Port Numbers | Distinguishes applications (port 80 for HTTP, 5060 for SIP) |
| DSCP Values | 6-bit field in IP header indicating requested treatment |
| MPLS EXP Bits | 3-bit field in MPLS headers for QoS marking |
| 802.1p CoS | 3-bit field in Ethernet VLAN tags |
| Protocol Type | TCP, UDP, ICMP, or other IP protocols |
| Deep Packet Inspection | Examines application-layer content for classification |

Classification and marking should occur as close to the traffic source as possible—ideally at the network edge—so that all subsequent network devices can apply appropriate QoS treatment without re-analyzing each packet.

## Congestion Avoidance

Congestion avoidance mechanisms monitor network conditions and adjust traffic behavior proactively to prevent congestion before it causes packet loss and performance degradation.

TCP congestion control algorithms are central to congestion avoidance:

| Algorithm | Characteristics |
|-----------|-----------------|
| TCP Reno | Standard algorithm using additive increase, multiplicative decrease |
| TCP Vegas | Detects congestion via RTT changes before packet loss occurs |
| TCP Cubic | Default in Linux; optimized for high-bandwidth, high-latency networks |
| TCP BBR | Model-based algorithm measuring actual bandwidth and RTT |
| ECN | Explicit Congestion Notification; routers mark packets instead of dropping |

Network devices contribute to congestion avoidance through mechanisms like WRED, which drops packets probabilistically as queues fill, and Explicit Congestion Notification (ECN), which marks packets to signal congestion without dropping them.

## Bandwidth Reservation

Bandwidth reservation allocates specific network capacity to critical applications or services, guaranteeing they receive required resources regardless of other traffic demands.

Common reservation approaches:

- **RSVP**: End-to-end signaling protocol that reserves bandwidth along a path
- **RSVP-TE**: RSVP with Traffic Engineering extensions for MPLS networks
- **IntServ**: Integrated Services architecture providing per-flow guarantees
- **DiffServ**: Differentiated Services providing class-based rather than per-flow guarantees
- **Minimum Bandwidth Guarantees**: Configuring queues with guaranteed minimum bandwidth percentages

IntServ with RSVP provides strong per-flow guarantees but scales poorly due to per-flow state requirements in every router. DiffServ scales better by aggregating traffic into classes but provides weaker guarantees. Modern networks typically use DiffServ at the core with admission control at the edge.

## Scheduling Algorithms

Scheduling algorithms determine the order in which packets are transmitted from queues, directly impacting latency, jitter, and bandwidth allocation among competing traffic flows.

| Algorithm | Description | Advantages | Disadvantages |
|-----------|-------------|------------|---------------|
| Priority Queuing | Strict priority; higher queues always first | Guarantees low latency for priority traffic | Can starve lower priorities |
| Weighted Round Robin | Cycles through queues, transmitting proportional to weights | Simple, predictable, fair | Variable packet sizes affect fairness |
| Deficit Weighted Round Robin | WRR with deficit counter to handle variable packet sizes | Fairer than WRR | Slightly more complex |
| Class-Based WFQ | Combines classification with weighted fair queuing | Flexible, supports hierarchical policies | Higher computational overhead |
| Low Latency Queuing | Priority queue plus CBWFQ for remaining traffic | Best for voice/video with other traffic | Requires careful configuration |

Low Latency Queuing (LLQ) is widely deployed in enterprise networks because it combines strict priority treatment for voice and video with fair bandwidth allocation for other traffic classes.

## Implementation Considerations

When implementing QoS, technology professionals should consider:

- **Trust Boundaries**: Define where packet markings are trusted versus where they must be re-classified
- **Consistent Policies**: Ensure QoS policies are consistent across all network devices in a path
- **Capacity Planning**: QoS cannot create bandwidth; it only manages existing capacity
- **Monitoring**: Continuously monitor queue depths, drop rates, and latency to verify QoS effectiveness
- **Testing**: Validate QoS behavior under realistic traffic loads before production deployment

## Summary

Quality of Service algorithms provide the mechanisms necessary to deliver predictable, reliable network performance for diverse applications sharing common infrastructure. Traffic shaping smooths transmission rates, prioritization ensures critical traffic receives preferential treatment, queue management fairly allocates buffer resources, and scheduling algorithms control packet transmission order. Together with admission control, classification, marking, and congestion avoidance, these mechanisms enable networks to meet the distinct requirements of voice, video, data, and emerging applications. Mastering QoS is essential for any technology professional responsible for network design, implementation, or operations.
