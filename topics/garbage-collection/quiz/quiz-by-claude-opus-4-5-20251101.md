# Garbage collection

Question: What technique do garbage collectors typically use to determine which objects in memory can be reclaimed?

- [ ] Memory pressure analysis
- [ ] Reference counting only
- [ ] Manual deallocation tracking
- [ ] Reachability analysis

<details>
  <summary>Answer</summary>
  <p>Reachability analysis</p>
  <p>Garbage collectors typically use reachability analysis to determine which objects are still accessible by the program. Objects that are not reachable from any root references (such as global variables, stack variables, or CPU registers) are considered garbage and can be safely reclaimed. While reference counting is one specific algorithm used in some garbage collectors, reachability analysis is the fundamental technique that underlies most modern garbage collection approaches, including mark-and-sweep and generational collectors.</p>
</details>
