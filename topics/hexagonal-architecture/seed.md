# Hexagonal Architecture

Hexagonal Architecture, also known as Ports and Adapters, is a software design pattern that isolates an application's core business logic from external technical details like databases, user interfaces, and third-party APIs. Coined by Alistair Cockburn in 2005, it aims to create loosely coupled components that can be tested in isolation and easily connected to different environments. [1, 2, 3, 4] 

## Core Components

The architecture is visually represented as a hexagon to show multiple interfaces without suggesting a fixed number of ports. [3, 5] 

* The Application Core (Inside): Contains the pure domain logic, entities, and use cases. It should have no knowledge of the outside world, making it highly stable and framework-independent. [6, 7, 8, 9] 
* Ports (Interfaces): These are the entry and exit points defined by the core.
* Inbound Ports: Define how external actors (like a user or API) can trigger core behaviors.
   * Outbound Ports: Define what the core needs from the outside (like saving data or sending a message). [2, 5, 7, 10, 11] 
* Adapters (Outside): These are the concrete implementations that "plug into" the ports.
* Driving (Primary) Adapters: Initiate actions on the core, such as a [REST Controller](https://medium.com/@mortezatavakoli/practical-review-of-hexagonal-architecture-97ba21fd7957) or a CLI.
   * Driven (Secondary) Adapters: Fulfill the core's needs, such as a [SQL Database Repository](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/hexagonal-architecture.html) or a cloud-specific messaging service. [2, 10, 12, 13] 

## Key Benefits

* Technology Agnostic: You can swap your database (e.g., [DynamoDB to Postgres](https://medium.com/@sonal.sadafal/cloud-agnostic-by-design-hexagonal-architecture-that-outlives-your-stack-03698ad8fd44)) or UI framework without rewriting any business rules.
* High Testability: Since the core is isolated, you can test complex business logic without needing a running database or server.
* Future-Proofing: The architecture prevents "technology lock-in" by keeping the core logic independent of evolving tech stacks. [4, 5, 14, 15, 16, 17] 
