# Chaos Monkey 

Chaos Monkey is an open-source tool created by Netflix in 2011 to test IT infrastructure resilience by intentionally and randomly disabling production instances (servers or containers). By causing unexpected failures during business hours, it forces engineers to build more robust, fault-tolerant, and self-healing systems. It is a cornerstone of chaos engineering. 

Reliability Engineering

Key Aspects of Chaos Monkey:

- Purpose: To validate that production systems can handle instance failures without downtime or user impact.

- Methodology: It randomly terminates virtual machines or containers in a production environment, acting like a "monkey" in a data center ripping out cables.

- Origin: Developed by Netflix to ensure their service remained seamless even when AWS components failed.

- The Simian Army: Chaos Monkey is part of a larger suite of tools designed to test system resilience.

- Integration: It is integrated with Spinnaker and supports cloud platforms like AWS, Google Compute Engine, and Kubernetes. 

By creating controlled chaos, teams can identify weaknesses and implement automation to handle failures gracefully before they affect users.
