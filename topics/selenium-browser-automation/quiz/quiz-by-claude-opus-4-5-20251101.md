Now I have the content. Here's the quiz:

# Selenium browser automation

Question: What is the recommended design pattern for organizing Selenium tests to improve maintainability and reduce the impact of UI changes?

- [ ] Model-View-Controller pattern
- [ ] Singleton pattern
- [ ] Page Object Model
- [ ] Factory pattern

<details>
  <summary>Answer</summary>
  <p>Page Object Model</p>
  <p>The Page Object Model (POM) is the dominant design pattern for Selenium test organization. It encapsulates element locators, user action methods, and page state retrieval within classes representing each web page or component. This centralizes element locators so that when the UI changes, updates are needed in only one place. It also creates a domain-specific language for tests, separates test logic from page interaction code, and enables reuse across multiple test cases.</p>
</details>
