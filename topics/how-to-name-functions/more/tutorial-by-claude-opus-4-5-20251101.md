## How to Name Functions

Naming functions effectively is one of the most important skills in software development. A well-named function communicates intent instantly, reduces the need for documentation, and makes code easier to read, maintain, and debug. Poor naming, conversely, creates confusion, increases cognitive load, and leads to bugs.

## Why Function Naming Matters

Function names are the primary interface between developers and code. When you read unfamiliar code, function names guide your understanding of program flow without requiring you to examine implementation details. A codebase with clear, consistent function names can be navigated quickly, while one with vague or misleading names becomes a maze of uncertainty.

Good function names:

- Reduce onboarding time for new team members
- Make code reviews faster and more effective
- Decrease the likelihood of misuse
- Serve as living documentation
- Enable IDE autocomplete to surface relevant options

## Core Principles

### Use Descriptive Names

Choose names that clearly communicate what the function does. The name should answer the question "What happens when I call this?" without requiring the reader to examine the implementation.

| Avoid | Prefer |
|-------|--------|
| process() | validateUserInput() |
| handle() | sendConfirmationEmail() |
| execute() | calculateMonthlyPayment() |
| doIt() | generateInvoicePdf() |
| run() | syncInventoryWithWarehouse() |

### Start with Action Verbs

Functions perform actions, and their names should reflect this. Begin with a verb that describes the operation.

| Verb | Use Case | Example |
|------|----------|---------|
| get | Retrieve a value | getUserById() |
| set | Assign a value | setDefaultCurrency() |
| create | Instantiate something new | createOrderFromCart() |
| delete | Remove something | deleteExpiredSessions() |
| validate | Check correctness | validateEmailFormat() |
| calculate | Perform computation | calculateShippingCost() |
| send | Transmit data | sendPasswordResetEmail() |
| fetch | Retrieve from external source | fetchWeatherData() |
| parse | Extract structured data | parseJsonResponse() |
| format | Transform for display | formatPhoneNumber() |
| convert | Change from one form to another | convertCelsiusToFahrenheit() |
| find | Search for something | findMatchingProducts() |
| check | Verify a condition | checkInventoryAvailability() |
| update | Modify existing data | updateCustomerProfile() |
| render | Generate visual output | renderDashboardChart() |

### Follow Consistent Naming Conventions

Consistency within a codebase is more important than any specific style. Choose a convention and apply it uniformly.

| Convention | Style | Example | Common In |
|------------|-------|---------|-----------|
| camelCase | lowerUpper | calculateTotalPrice | JavaScript, Java, C# |
| snake_case | lower_underscore | calculate_total_price | Python, Ruby, Rust |
| PascalCase | UpperUpper | CalculateTotalPrice | C# methods, Go exported functions |
| kebab-case | lower-hyphen | calculate-total-price | Lisp, Clojure |

### Be Specific, Not Generic

Generic names force readers to examine implementation. Specific names communicate purpose immediately.

| Generic | Specific |
|---------|----------|
| processData() | normalizeAddressFormat() |
| handleEvent() | logUserClickEvent() |
| transform() | convertMarkdownToHtml() |
| manage() | allocateServerResources() |

## Naming Patterns for Common Scenarios

### Boolean-Returning Functions

Functions that return true or false should read as questions or assertions. Common prefixes include "is," "has," "can," "should," and "will."

| Pattern | Example |
|---------|---------|
| is + adjective | isValid(), isEmpty(), isAuthenticated() |
| has + noun | hasPermission(), hasChildren(), hasErrors() |
| can + verb | canEdit(), canDelete(), canAccessResource() |
| should + verb | shouldRetry(), shouldCache(), shouldNotify() |
| will + verb | willExpireSoon(), willExceedQuota() |

### Getter and Setter Functions

For functions that retrieve or modify values, use the "get" and "set" prefixes consistently.

- getAccountBalance() — retrieves the current balance
- setAccountBalance() — assigns a new balance value
- getCurrentUser() — retrieves the logged-in user object
- setDefaultLanguage() — assigns the default language setting

### Callback and Handler Functions

Functions passed as callbacks or event handlers benefit from prefixes that indicate their role.

| Pattern | Example |
|---------|---------|
| on + event | onButtonClick(), onFormSubmit() |
| handle + event | handleKeyPress(), handleNetworkError() |
| after + action | afterSave(), afterValidation() |
| before + action | beforeDelete(), beforeNavigate() |

### Factory and Builder Functions

Functions that create objects should clearly indicate construction.

| Pattern | Example |
|---------|---------|
| create + noun | createUser(), createDatabaseConnection() |
| build + noun | buildQueryString(), buildConfigObject() |
| make + noun | makeHttpRequest(), makeTemporaryFile() |
| new + noun | newTransaction(), newSession() |

### Conversion Functions

When transforming data from one form to another, use explicit conversion naming.

| Pattern | Example |
|---------|---------|
| convert + X + To + Y | convertJsonToXml() |
| X + To + Y | celsiusToFahrenheit() |
| parse + source | parseUrlParameters() |
| format + target | formatAsPercentage() |
| serialize / deserialize | serializeToJson(), deserializeFromJson() |

## Common Mistakes to Avoid

### Abbreviations and Acronyms

Avoid abbreviations unless they are universally understood within your domain.

| Avoid | Prefer |
|-------|--------|
| calcTot() | calculateTotal() |
| usrAuth() | authenticateUser() |
| procReq() | processRequest() |
| genRpt() | generateReport() |

Acceptable abbreviations include widely recognized terms like URL, HTTP, JSON, XML, API, and ID.

### Misleading Names

A function name must accurately describe what the function does. A misleading name is worse than a vague one.

- A function named validateEmail() should not also send emails
- A function named getUser() should not modify the database
- A function named calculatePrice() should not have side effects

### Function Names That Require Comments

If you find yourself writing a comment to explain what a function does, the name is likely inadequate. Refactor the name to be self-documenting.

| Name + Comment | Self-Documenting Name |
|----------------|----------------------|
| process() // applies discount to cart | applyDiscountToCart() |
| check() // verifies SSL certificate validity | verifySslCertificateValidity() |
| update() // marks notifications as read | markNotificationsAsRead() |

### Overloading Names

Using the same name for fundamentally different behaviors creates confusion. Even when languages support function overloading, consider whether distinct names would be clearer.

## Length Guidelines

Function names should be long enough to be descriptive but short enough to be readable. Most well-named functions fall between 2 and 4 words.

| Too Short | Appropriate | Too Long |
|-----------|-------------|----------|
| auth() | authenticateUser() | authenticateUserWithCredentialsAgainstDatabase() |
| send() | sendNotification() | sendPushNotificationToAllRegisteredMobileDevices() |
| calc() | calculateTax() | calculateSalesTaxBasedOnStateAndLocalRates() |

When a function name becomes excessively long, it often indicates the function is doing too much and should be broken into smaller, focused functions.

## Context Awareness

Function names exist within context. A function inside a UserAuthentication class does not need to repeat "user" or "authentication" in every method name.

| Redundant | Contextual |
|-----------|------------|
| UserService.getUserById() | UserService.getById() |
| EmailValidator.validateEmail() | EmailValidator.validate() |
| PaymentProcessor.processPayment() | PaymentProcessor.process() |

However, if the function will be called outside its immediate context or imported into other modules, more explicit naming may be appropriate.

## Summary

Effective function naming follows these guidelines:

- **Be descriptive**: Names should communicate purpose without requiring examination of implementation
- **Use action verbs**: Start with verbs that indicate the operation being performed
- **Stay consistent**: Follow established conventions throughout the codebase
- **Be specific**: Avoid generic names that could apply to many different operations
- **Match boolean patterns**: Use is/has/can/should prefixes for functions returning true or false
- **Avoid abbreviations**: Write out full words unless abbreviations are domain-standard
- **Keep appropriate length**: 2-4 words typically provides the right balance
- **Consider context**: Leverage class and module context to avoid redundancy
- **Never mislead**: The name must accurately reflect what the function does

Good function names are an investment in code quality that pays dividends throughout the software lifecycle. They reduce bugs, accelerate development, and make collaboration more effective. Take the time to name functions thoughtfully.
