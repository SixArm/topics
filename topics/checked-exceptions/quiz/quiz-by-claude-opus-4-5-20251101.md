# Checked exceptions

Question: What is the defining characteristic of checked exceptions that distinguishes them from unchecked exceptions?

- [ ] They are only used for runtime errors that cannot be predicted
- [ ] They must be either handled or declared by a method or function
- [ ] They automatically terminate the program when thrown
- [ ] They do not require any special syntax to use

<details>
  <summary>Answer</summary>
  <p>They must be either handled or declared by a method or function</p>
  <p>Checked exceptions are specifically designed to enforce explicit error handling at compile time. When a method can throw a checked exception, the calling code must either catch and handle that exception using a try-catch block, or declare that it also throws the exception (propagating it up the call stack). This requirement helps ensure that programs handle potential problems consistently, making them more robust and reliable, though it can also make code more verbose.</p>
</details>
