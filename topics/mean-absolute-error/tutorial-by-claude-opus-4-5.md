## Mean Absolute Error (MAE)

Mean Absolute Error (MAE) is a fundamental performance metric used in regression tasks to evaluate the accuracy of a model's predictions. It measures the average absolute difference between predicted values and actual (ground truth) values. MAE is also known as the L1 loss or L1 norm.

MAE quantifies how well a regression model's predictions match true values and the magnitude of error present. Lower MAE indicates predictions are closer to true values. Higher MAE indicates predictions are farther from true values.

## Why MAE Matters

MAE provides an intuitive, interpretable measure of prediction error expressed in the same units as the target variable. If you're predicting house prices in dollars, an MAE of 15,000 means your model is off by $15,000 on average. This direct interpretability makes MAE valuable for communicating model performance to stakeholders.

MAE treats all errors equally regardless of direction—underpredicting by 10 is penalized the same as overpredicting by 10. This symmetric treatment makes it straightforward to understand and explain.

## The MAE Formula

The formula for Mean Absolute Error is:

**MAE = (1/n) × Σ|Yᵢ - Ŷᵢ|**

Where:

- **n** is the number of data points (samples) in the dataset
- **Yᵢ** is the actual value of the target variable for the i-th data point
- **Ŷᵢ** is the predicted value of the target variable for the i-th data point

## Calculation Steps

1. Make predictions using the regression model
2. For each data point, compute the absolute difference between the actual value and predicted value
3. Sum all the absolute differences
4. Divide by the number of data points

## MAE vs MSE vs RMSE

| Metric | Formula Basis | Outlier Sensitivity | Interpretability | Gradient Behavior |
|--------|---------------|---------------------|------------------|-------------------|
| MAE | Absolute differences | Low | High (same units) | Constant gradient |
| MSE | Squared differences | High | Low (squared units) | Proportional gradient |
| RMSE | Square root of MSE | High | Medium (same units) | Proportional gradient |

**Key differences:**

- **Outlier handling**: MAE is robust to outliers because it does not square the differences. MSE and RMSE heavily penalize large errors, making them sensitive to extreme values.
- **Gradient behavior**: MAE has a constant gradient regardless of error magnitude, while MSE/RMSE gradients increase with error size. This affects optimization during model training.
- **Unit preservation**: MAE and RMSE are in the same units as the target variable. MSE is in squared units, making it harder to interpret directly.

## When to Use MAE

**Choose MAE when:**

- Outliers should not disproportionately influence model evaluation
- You need an easily interpretable error metric
- All errors should be weighted equally regardless of magnitude
- You want to communicate prediction accuracy to non-technical stakeholders
- The data contains noise or measurement errors that may produce occasional extreme values

**Avoid MAE when:**

- Large errors are significantly worse than small errors in your domain
- You need a differentiable loss function with non-constant gradient for optimization
- Your application requires penalizing large deviations more heavily

## Practical Applications

| Domain | Use Case | Why MAE Works |
|--------|----------|---------------|
| Demand forecasting | Predicting inventory needs | Overstocking and understocking have similar costs |
| Temperature prediction | Weather forecasting | Errors in either direction are equally problematic |
| Delivery time estimation | Logistics planning | Early and late deliveries both create customer friction |
| Energy consumption | Grid load prediction | Balanced treatment of over/under predictions |

## Limitations of MAE

- **Non-differentiable at zero**: The absolute value function has no derivative at zero, which can complicate gradient-based optimization
- **Equal weighting**: Treats all errors the same, which may not reflect real-world costs where large errors are disproportionately harmful
- **Scale dependence**: MAE values are not comparable across different datasets or target variables with different scales
- **No penalty escalation**: A prediction off by 100 is only penalized twice as much as one off by 50, which may not match business reality

## Best Practices

- **Normalize for comparison**: Use Mean Absolute Percentage Error (MAPE) or normalize MAE by the target variable's range when comparing across datasets
- **Report alongside other metrics**: Combine MAE with MSE or RMSE to understand both typical error and worst-case behavior
- **Consider domain context**: Evaluate whether equal treatment of over and under predictions matches your application requirements
- **Use for model selection**: MAE is excellent for comparing models when outlier robustness matters
- **Validate with holdout data**: Always compute MAE on unseen test data to assess generalization

## Summary

Mean Absolute Error is a robust, interpretable metric for evaluating regression models. Its resistance to outliers and direct interpretability in original units make it valuable for many practical applications. Choose MAE when you need a straightforward error measure that treats all deviations equally, and complement it with other metrics when large errors carry disproportionate consequences in your domain.
