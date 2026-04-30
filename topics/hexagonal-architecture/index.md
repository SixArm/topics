# Hexagonal Architecture

Hexagonal Architecture, also known as Ports and Adapters, is a software design pattern that isolates an application's core business logic from external concerns such as databases, user interfaces, and third-party APIs. Alistair Cockburn introduced the pattern in 2005 to promote loosely coupled components that can be tested in isolation and connected to different runtime environments.

The architecture uses a hexagonal shape to represent the application visually, emphasizing multiple interfaces without implying a fixed number. The inside of the hexagon contains the Application Core: pure domain logic, entities, and use cases with no knowledge of the outside world. This makes the core highly stable and framework-independent.

Ports are the interfaces defined by the core. Inbound ports define how external actors, such as users or API clients, trigger core behaviors. Outbound ports define what the core needs from the outside, such as persisting data or sending messages.

Adapters are the concrete implementations that plug into ports. Driving adapters (also called primary adapters) initiate actions on the core, for example a REST controller or a CLI. Driven adapters (also called secondary adapters) fulfill the core's outbound needs, such as a SQL database repository or a cloud messaging service.

The pattern delivers three key advantages. It is technology-agnostic: you can swap a database or UI framework without rewriting business rules. It enables high testability, since the core can be validated without a running database or server. It future-proofs the system by preventing technology lock-in, keeping domain logic independent of any specific infrastructure or framework choice.
