# Sieve of Eratosthenes

Question: What is the core mechanism by which the Sieve of Eratosthenes identifies prime numbers?

- [ ] It divides each number by all smaller numbers to check for remainders
- [ ] It uses recursive factorization to decompose numbers into prime factors
- [ ] It marks multiples of each prime as composite, leaving unmarked numbers as primes
- [ ] It generates prime numbers by adding previous primes together

<details>
  <summary>Answer</summary>
  <p>It marks multiples of each prime as composite, leaving unmarked numbers as primes</p>
  <p>The Sieve of Eratosthenes works by iteratively marking the multiples of each prime number starting with 2. Numbers that remain unmarked after processing all primes up to the square root of the limit are prime. This elimination approach is more efficient than testing each number individually for divisibility.</p>
</details>
