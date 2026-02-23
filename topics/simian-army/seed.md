# Simian Army

The Simian Army is a suite of open-source tools developed by Netflix to test the resilience, security, and reliability of its AWS cloud infrastructure. It operates by intentionally injecting faults—such as shutting down instances or creating network latency—into the production environment, training the system to automatically detect, recover, and remain available. 

Key "Monkeys" in the Simian Army
- Chaos Monkey: Randomly terminates production instances to ensure services can handle failures.
- Latency Monkey: Induces artificial delays in network communication to test system tolerance to slow dependencies.
- Chaos Kong: Simulates the loss of an entire AWS region, testing large-scale disaster recovery.
- Conformity Monkey: Identifies instances that do not adhere to best practices (e.g., untagged resources) and shuts them down.
- Janitor Monkey: Scans for and cleans up unused resources to optimize costs and efficiency.
- Security Monkey: Monitors for security violations like misconfigured security groups. 

Originally developed by Netflix to foster a "culture of freedom and responsibility", many of these tools have been superseded or integrated into newer Chaos Engineering platforms. 
