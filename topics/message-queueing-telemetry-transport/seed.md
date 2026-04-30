# Message Queuing Telemetry Transport (MQTT)

Message Queuing Telemetry Transport (MQTT) is the industry standard for the "Internet of Things" (IoT). It was originally developed by IBM to monitor oil pipelines via satellite, which explains why it is so efficient at handling high latency and fragile connections. [1, 2, 3, 4, 5]

## How it Works: Pub/Sub

MQTT uses a Publish/Subscribe model managed by a central Broker (like Mosquitto or HiveMQ). [6, 7, 8, 9, 10]

1.  The Broker: Acts as a post office. It receives all messages and routes them to the right destination.
2.  Topics: Data is organized into a hierarchy (e.g., home/living-room/temperature).
3.  Decoupling: The sender (Publisher) and the receiver (Subscriber) never talk directly to each other and don't even need to be online at the same time. [11, 12, 13, 14, 15]

## Key Features for "Unreliable" Networks

- Qualities of Service (QoS): You can choose how hard the protocol tries to deliver a message:
- QoS 0: At most once (fire and forget).
  - QoS 1: At least once (guaranteed delivery, but might see duplicates).
  - QoS 2: Exactly once (the highest reliability, but slowest). [16, 17, 18, 19, 20]
- Last Will and Testament (LWT): If a device suddenly loses its connection (e.g., a battery dies), the Broker can automatically notify other services of the "unexpected" departure. [21, 22]
- Retained Messages: The Broker can save the last "good" value of a topic, so new devices get the current status immediately upon connecting. [23, 24]

## Common 2026 Use Cases

- Smart Homes: Connecting lightbulbs, thermostats, and locks to a central hub.
- Connected Vehicles: Sending telematics and diagnostic data from cars to the cloud.
- Agriculture: Soil moisture sensors in remote fields reporting data over low-power WANs. [31, 32, 33]
