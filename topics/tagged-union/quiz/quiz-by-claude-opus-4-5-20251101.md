# Tagged unions

Question: What is the primary purpose of the "tag" in a tagged union data structure?

- [ ] To compress the data stored in the union for memory efficiency
- [ ] To identify which type of data the union is currently holding
- [ ] To encrypt the union's contents for security purposes
- [ ] To specify the maximum size of values the union can contain

<details>
  <summary>Answer</summary>
  <p>To identify which type of data the union is currently holding</p>
  <p>The tag in a tagged union serves as an identifier that tells the program which type of value is currently stored in the union. This allows the program to safely access and manipulate the correct type of data at runtime, preventing type errors that could occur with untagged unions where the current type is unknown.</p>
</details>
