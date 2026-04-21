# Three-Point Estimating

Three-Point Estimating is a project management technique used to improve the accuracy of time or cost forecasts by accounting for uncertainty. Instead of relying on a single "best guess," you define three distinct scenarios for each task. 

## The Three Estimates

- Optimistic: The "best-case" scenario where everything goes perfectly with no delays or obstacles.
- Most Likely: The "realistic" scenario based on typical conditions and your past experience.
- Pessimistic: The "worst-case" scenario where significant (but not catastrophic) setbacks occur. 

## How to Calculate the Final Estimate

There are two primary formulas used to combine these values into a single "Expected Value" (EV): 

- Triangular: EV = (O + M + P) / 3. Use for quick estimates or when you have limited data and want to treat all three scenarios equally.

- PERT: EV = (O + 4M + P) / 6. Use when you have historical data or expert judgment. It gives more weight to the Most Likely outcome.

## Measuring Risk (Standard Deviation)

The "spread" between your optimistic and pessimistic estimates tells you how much risk a task carries. 

Formula: Standard Deviation = (P - O) / 6. 

Interpretation: A large spread indicates high uncertainty, while a small spread suggests a highly predictable task. 

## Step-by-Step Implementation

Break Down the Work: List individual tasks from your project.

Gather Estimates: Ask experts or team members for values for each task.

Calculate Expected Duration: Apply your chosen formula (usually PERT) to get a single number.

Analyze and Plan: Use these values to build your project schedule and identify the Critical Path. 
