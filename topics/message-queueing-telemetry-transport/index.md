# Message Queuing Telemetry Transport (MQTT)

Message Queuing Telemetry Transport (MQTT) is a lightweight messaging protocol that has become the industry standard for the Internet of Things (IoT). Originally developed by IBM in 1999 to monitor oil pipelines via satellite, MQTT was purpose-built for constrained environments with high latency, low bandwidth, and unreliable network connections. Its minimal overhead makes it ideal for resource-limited devices such as sensors, microcontrollers, and embedded systems.

MQTT operates on a publish/subscribe model managed by a central broker. Publishers send messages to named topics organized in a hierarchy, such as "home/living-room/temperature." Subscribers express interest in specific topics, and the broker handles all routing. Publishers and subscribers are fully decoupled: they never communicate directly and do not need to be online simultaneously. Popular broker implementations include Mosquitto and HiveMQ.

The protocol provides three Quality of Service (QoS) levels to balance reliability against performance. QoS 0 delivers messages at most once with no acknowledgment. QoS 1 guarantees at least once delivery but may produce duplicates. QoS 2 ensures exactly once delivery through a four-step handshake, offering the highest reliability at the cost of additional overhead.

MQTT includes features tailored to unstable networks. The Last Will and Testament mechanism allows a client to register a message that the broker publishes automatically if the client disconnects unexpectedly, alerting other subscribers to the device's departure. Retained messages let the broker store the most recent value on a topic so that newly connecting subscribers receive current state immediately.

Common use cases include smart home automation, connected vehicle telematics, industrial monitoring, and agricultural sensor networks operating over low-power wide-area connections.
