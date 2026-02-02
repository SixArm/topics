# SQL injection

Question: What is the most effective defense against SQL injection attacks?

- [ ] Using complex passwords for database accounts
- [ ] Encrypting all data stored in the database
- [ ] Using parameterized queries and input validation
- [ ] Hiding database error messages from users

<details>
  <summary>Answer</summary>
  <p>Using parameterized queries and input validation</p>
  <p>Parameterized queries (also called prepared statements) separate SQL code from user input, ensuring that user-supplied data is treated strictly as data and never as executable code. Combined with input validation, this approach prevents attackers from injecting malicious SQL commands through web input fields. While the other options provide some security benefits, they do not directly address the root cause of SQL injection vulnerabilities.</p>
</details>
