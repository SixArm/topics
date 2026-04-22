# Fallacies of Distributed Systems

The Fallacies of Distributed Systems are eight false assumptions that developers commonly make when designing networked systems. Originally formulated by L. Peter Deutsch and colleagues at Sun Microsystems around 1994, they capture the ways engineers mistakenly treat distributed systems as if they were local ones.

The eight fallacies are: the network is reliable, latency is zero, bandwidth is infinite, the network is secure, topology doesn't change, there is one administrator, transport cost is zero, and the network is homogeneous. Each represents an assumption that holds true for local function calls but breaks down across network boundaries.

These false assumptions lead to real failures. Assuming reliability means unhandled errors when connections drop. Assuming zero latency produces chatty protocols that work in development but crawl in production. Assuming security means sensitive data travels unencrypted and inputs go unvalidated. Assuming stable topology means systems break when nodes are added or removed.

Taking the fallacies seriously drives defensive design. Reliability concerns lead to retries, circuit breakers, and idempotent operations. Latency awareness encourages batching, caching, and asynchronous communication. Security assumptions demand encryption, authentication, and input validation at every service boundary. Topology awareness requires service discovery and dynamic configuration rather than hardcoded addresses.

The fallacies function as a practical checklist. Before deploying any distributed system, teams should verify they have accounted for each one. The cost of ignoring them is subtle bugs that only surface under real network conditions, often in production, often under load. Systems that internalize these constraints from the start are far more resilient than those that bolt on fixes after failures occur.
