# Mean Absolute Error (MAE)

Question: Why is Mean Absolute Error (MAE) considered more robust than Mean Squared Error (MSE) when evaluating regression models?

- [ ] MAE uses logarithmic scaling to normalize prediction errors
- [ ] MAE squares the differences, giving more weight to larger errors
- [ ] MAE does not penalize outliers as heavily because it uses absolute differences rather than squared differences
- [ ] MAE automatically removes extreme values from the calculation

<details>
  <summary>Answer</summary>
  <p>MAE does not penalize outliers as heavily because it uses absolute differences rather than squared differences</p>
  <p>Unlike MSE which squares the error terms (causing large errors to have disproportionately large impact), MAE uses the absolute value of errors. This means a prediction that is off by 10 units contributes 10 to the MAE, while in MSE it would contribute 100. This makes MAE less sensitive to extreme values or outliers in the data, which is often desirable when outliers are present but not necessarily indicative of model failure.</p>
</details>
