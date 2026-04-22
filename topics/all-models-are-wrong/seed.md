# All Models Are Wrong (George Box's Law)

George Box said, “All models are wrong, but some are useful.” Every abstraction you build, whether a class hierarchy, an API contract, or a data model, is a lie. It’s basically a simplified version of reality that ignores inconvenient details. The question isn’t whether your model is wrong. It’s whether it’s wrong in ways that matter.

Your database schema assumes users have one email address, until they don’t. Your payment model treats refunds like reversed payments, until chargebacks arrive. Accept that every model will leak, and design for the leak, not against it.