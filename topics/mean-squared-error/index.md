# Mean Squared Error (MSE)

Mean Squared Error (MSE) is a commonly used performance metric for regression problems in machine learning. It measures the average squared difference between the predicted values and the actual (ground truth) values. 

MSE is particularly useful for evaluating how well a regression model's predictions match the true values and how much error is present in the predictions. Lower MSE indicates predictions are closer to the true values. Higher MSE indicates predictions are farther from the true values.

The formula is: MSE = (1/n) * Σ(yᵢ - ȳ)²

* n is the number of data points (samples) in the dataset.

* yᵢ is the actual value of the target variable for the i-th data point.

* ȳ is the predicted value of the target variable for the i-th data point.

The steps to calculate MSE are as follows:

* Make predictions using the regression model.

* For each data point, compute the difference between the predicted value and the actual value, and square it.

* Sum the squared differences, then divide by the number of data points.
