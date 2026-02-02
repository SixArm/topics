# Memory management

Question: What is the primary difference between memory management in languages like C/C++ versus languages with garbage collection?

- [ ] Languages with garbage collection use only static memory allocation
- [ ] C/C++ programs cannot use dynamic memory allocation
- [ ] In C/C++, developers must explicitly deallocate memory, while garbage-collected languages reclaim memory automatically
- [ ] Garbage-collected languages do not support memory deallocation

<details>
  <summary>Answer</summary>
  <p>In C/C++, developers must explicitly deallocate memory, while garbage-collected languages reclaim memory automatically</p>
  <p>This distinction is fundamental to memory management practices. In C and C++, developers are responsible for calling functions like free() or delete to release memory when it is no longer needed. Failure to do so results in memory leaks. In contrast, languages with garbage collection (such as Java, Python, or C#) automatically detect when memory is no longer being used and reclaim it without explicit developer intervention, reducing the risk of memory leaks but introducing some runtime overhead.</p>
</details>
