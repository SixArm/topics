# Load balancing algorithms

Question: Which load balancing algorithm is most suitable when you need to maintain session persistence, ensuring that requests from the same user consistently reach the same server?

- [ ] Round Robin
- [ ] Least Connections
- [ ] Client IP Hash
- [ ] Least Response Time

<details>
  <summary>Answer</summary>
  <p>Client IP Hash</p>
  <p>Client IP Hash uses the client's IP address to determine which server handles the request, ensuring requests from the same client consistently go to the same server. This is essential for session persistence (sticky sessions) where user session data is stored on a specific server and must be accessed consistently throughout the user's interaction.</p>
</details>
