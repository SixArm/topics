# Tower of Hanoi problem

Question: What is the minimum number of moves required to solve the Tower of Hanoi puzzle with n disks?

- [ ] n squared
- [ ] 2 to the power of n, minus 1
- [ ] n factorial
- [ ] 2 times n

<details>
  <summary>Answer</summary>
  <p>2 to the power of n, minus 1</p>
  <p>The Tower of Hanoi problem has an exponential time complexity. The minimum number of moves required to solve the puzzle with n disks is 2^n - 1. This is because the recursive solution requires moving n-1 disks twice (to and from the auxiliary peg) plus one move for the largest disk, leading to the recurrence relation T(n) = 2T(n-1) + 1, which resolves to 2^n - 1 moves.</p>
</details>
