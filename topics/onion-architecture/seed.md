# Onion Architecture

Onion Architecture is a software design pattern introduced by Jeffrey Palermo in 2008 that organises an application into concentric layers. Like Hexagonal Architecture, its primary goal is to decouple the core business logic from external concerns like databases, UI frameworks, and third-party services. [1, 2, 3, 4] 

## The Layers of the "Onion"

The fundamental "golden rule" is that dependencies only flow inward—outer layers can know about inner layers, but inner layers must never know about anything outside of them. [3, 4] 

* Domain Model (Center): The absolute core. It contains enterprise business entities, value objects, and basic rules that remain true regardless of the technology stack. [3, 5, 6, 7] 
* Domain Services: Sits just outside the models. This layer holds complex business logic that doesn't naturally fit into a single entity, such as cross-entity calculations or domain-specific contracts (interfaces). [3, 8, 9] 
* Application Services (Use Cases): Orchestrates the flow of data. It defines the "what" the system does (e.g., "Place Order") by coordinating domain objects, but it does not perform actual I/O operations itself. [3, 5, 10] 
* Infrastructure & Presentation (Outermost): The external "skin." This contains the concrete implementations of I/O, such as [database adapters](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423), [REST APIs](https://codefinity.com/blog/Onion-Architecture-in-Software-Development), and user interfaces. [1, 11, 12, 13, 14] 

## Why Use Onion Architecture?

* Sustainability: Since the domain is at the center and independent, you can swap your [SQL database for NoSQL](https://medium.com/@zeynepkuri906/onion-architecture-core-principles-usage-and-benefits-6b5b30e76aca) or change your cloud provider without rewriting any business logic. [1, 15] 
* Pure Testability: You can unit test the core business rules without needing to mock complex infrastructure like databases or web servers. [3, 4] 
* Long-term Maintainability: It forces a clear [separation of concerns](https://www.linkedin.com/pulse/unpeeling-layers-mastering-onion-architecture-robust-software-goyal-jgs8c), preventing the code from becoming a "big ball of mud" where everything is tightly coupled. [1, 15] 
