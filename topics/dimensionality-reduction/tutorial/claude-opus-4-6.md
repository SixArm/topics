# Dimensionality reduction

Dimensionality reduction is a fundamental technique in machine learning and data analysis that reduces the number of features or variables in a dataset while preserving the most important information. In real-world applications, datasets frequently contain hundreds or thousands of features, many of which are redundant, noisy, or irrelevant. This high dimensionality introduces challenges collectively known as the "curse of dimensionality," including increased computational cost, overfitting, multicollinearity, and the breakdown of distance-based methods. Dimensionality reduction addresses these problems by transforming the data into a lower-dimensional representation that retains its essential structure and patterns, enabling more effective modeling, faster training, and clearer visualization.

## Why dimensionality reduction matters

High-dimensional datasets pose several practical and theoretical problems for machine learning practitioners. As the number of features grows, the volume of the feature space increases exponentially, meaning that data points become increasingly sparse. Models trained on sparse data tend to generalize poorly because they overfit to noise rather than learning meaningful patterns. Additionally, many algorithms—particularly those relying on distance computations such as k-nearest neighbors or clustering methods—degrade in performance as dimensionality increases, because distances between points become less discriminative.

Beyond modeling concerns, high-dimensional data is difficult to visualize, interpret, and communicate. Stakeholders and domain experts benefit from compact representations that highlight the most salient variation in the data. Dimensionality reduction also reduces storage requirements and accelerates both training and inference, which matters when deploying models at scale or working with resource-constrained environments.

## Two main approaches

Dimensionality reduction techniques fall into two broad categories: feature selection and feature extraction. These approaches differ in whether they operate on the original features directly or construct new derived features.

- **Feature selection** identifies a subset of the original features to retain, discarding the rest. The selected features are unchanged, which preserves interpretability. Methods include filter approaches (e.g., correlation analysis, mutual information), wrapper approaches (e.g., recursive feature elimination), and embedded approaches (e.g., L1 regularization in Lasso regression).

- **Feature extraction** creates entirely new features by combining or transforming the originals. The resulting features are typically not directly interpretable in terms of the original variables, but they can capture complex relationships and compress information more efficiently. Principal Component Analysis, autoencoders, and t-SNE are all feature extraction methods.

| Aspect | Feature Selection | Feature Extraction |
|---|---|---|
| Output features | Subset of original features | New derived features |
| Interpretability | High—features retain original meaning | Low—features are mathematical constructs |
| Information loss | May discard useful interactions | May lose fine-grained detail |
| Computational cost | Varies by method; wrappers can be expensive | Depends on transformation complexity |
| Common methods | Mutual information, RFE, Lasso | PCA, t-SNE, UMAP, autoencoders |
| Best suited for | Explainable models, regulatory contexts | Visualization, compression, deep learning |

## Principal Component Analysis

Principal Component Analysis (PCA) is the most widely used linear dimensionality reduction technique. PCA finds orthogonal directions—called principal components—along which the data exhibits maximum variance. The first principal component captures the most variance, the second captures the next most while being orthogonal to the first, and so on. By projecting the data onto a subset of the top principal components, you obtain a lower-dimensional representation that retains as much variance as possible.

PCA works by computing the eigendecomposition of the data's covariance matrix or, equivalently, the singular value decomposition (SVD) of the centered data matrix. The eigenvalues indicate how much variance each principal component explains, providing a principled way to choose how many components to retain. A common heuristic is to keep enough components to explain 90–95% of the total variance.

PCA assumes that the data's important structure lies along directions of high variance and that the relationships between features are linear. When these assumptions hold, PCA is computationally efficient, deterministic, and effective. However, it struggles with data that has inherently nonlinear structure, where the most meaningful patterns are not aligned with directions of maximum variance.

## t-Distributed Stochastic Neighbor Embedding

t-Distributed Stochastic Neighbor Embedding (t-SNE) is a nonlinear dimensionality reduction technique designed specifically for visualization. It maps high-dimensional data points into a two- or three-dimensional space while preserving local structure—points that are similar in high-dimensional space remain close together in the embedding.

t-SNE works by modeling pairwise similarities between data points in the original space using Gaussian distributions and in the low-dimensional space using heavier-tailed Student's t-distributions. It then minimizes the Kullback-Leibler divergence between these two similarity distributions using gradient descent. The use of the t-distribution in the low-dimensional space helps alleviate the "crowding problem," where moderately distant points are forced too close together.

While t-SNE produces visually compelling embeddings, it has important limitations. The algorithm is non-convex, meaning different runs with different random seeds can produce different results. It does not preserve global structure well—distances between well-separated clusters in a t-SNE plot are not meaningful. The perplexity hyperparameter significantly affects the output. Additionally, t-SNE is computationally expensive on large datasets and does not provide a parametric mapping that can be applied to new data points without rerunning the algorithm.

## UMAP and other modern methods

Uniform Manifold Approximation and Projection (UMAP) has emerged as a popular alternative to t-SNE. UMAP is grounded in topological data analysis and Riemannian geometry. It constructs a weighted graph representation of the high-dimensional data, then optimizes a low-dimensional layout that preserves the topological structure of this graph. UMAP tends to better preserve both local and global structure compared to t-SNE, runs significantly faster, and scales more gracefully to large datasets. It also supports supervised and semi-supervised variants.

Other notable methods include:

- **Kernel PCA** extends PCA to nonlinear relationships by applying the kernel trick, projecting data into a higher-dimensional feature space where linear PCA can capture nonlinear structure.
- **Independent Component Analysis (ICA)** finds components that are statistically independent rather than merely uncorrelated, which is useful in signal separation tasks such as blind source separation.
- **Linear Discriminant Analysis (LDA)** is a supervised method that finds projections maximizing class separability, making it well-suited for classification preprocessing.
- **Autoencoders** are neural networks trained to compress data into a lower-dimensional bottleneck layer and then reconstruct the original input. They can learn highly nonlinear transformations and are flexible enough to handle images, text, and other complex data types.
- **Random projections** use the Johnson-Lindenstrauss lemma to project data onto a random lower-dimensional subspace while approximately preserving pairwise distances, offering a fast and simple baseline.

## Choosing the right technique

Selecting a dimensionality reduction method depends on the task, the data, and the downstream application. The following considerations guide the decision.

| Consideration | Guidance |
|---|---|
| **Goal is visualization** | Use t-SNE or UMAP for 2D/3D plots |
| **Goal is preprocessing for a model** | Use PCA, LDA, or autoencoders |
| **Interpretability is required** | Use feature selection or PCA with explained variance |
| **Data has linear structure** | PCA is efficient and effective |
| **Data has nonlinear structure** | Use Kernel PCA, UMAP, or autoencoders |
| **Dataset is very large** | Prefer UMAP, random projections, or incremental PCA |
| **Labels are available** | Consider LDA or supervised UMAP |
| **Reconstruction is needed** | Use PCA or autoencoders |

In practice, it is common to combine approaches. For example, PCA can be applied first to reduce a 10,000-feature dataset to 50 components, followed by t-SNE or UMAP for final visualization in two dimensions. This two-stage approach is faster and often produces better results than applying nonlinear methods directly to the full feature space.

## Common pitfalls

- **Applying dimensionality reduction before understanding the data.** Exploratory analysis should precede any transformation to understand feature distributions, correlations, and domain relevance.
- **Using t-SNE for quantitative analysis.** t-SNE embeddings are useful for visual exploration but should not be used to draw conclusions about cluster sizes, distances, or densities.
- **Ignoring scaling.** PCA and many other methods are sensitive to feature scales. Standardizing features to zero mean and unit variance is typically necessary before applying these techniques.
- **Retaining too few or too many components.** Keeping too few components loses important signal; keeping too many retains noise and defeats the purpose of reduction. Scree plots, cumulative explained variance, and cross-validation help determine the right number.
- **Treating dimensionality reduction as a substitute for feature engineering.** Reduction techniques complement domain-driven feature engineering but do not replace it. Expert knowledge about which features matter remains valuable.

## Related

Related topics to explore include principal component analysis for deeper understanding of variance-based decomposition, autoencoders for learning nonlinear representations with neural networks, clustering algorithms that often operate on reduced representations, feature engineering as a complementary discipline, the curse of dimensionality as the theoretical motivation, manifold learning for the geometric perspective on nonlinear reduction, and machine learning performance metrics for evaluating whether dimensionality reduction improves downstream model quality.

## Summary

Dimensionality reduction is an essential tool in the data science and machine learning workflow, enabling practitioners to tame high-dimensional data by projecting it into more manageable representations. The two fundamental strategies—feature selection and feature extraction—serve complementary purposes, with selection preserving interpretability and extraction capturing complex structure. PCA remains the workhorse for linear reduction, while t-SNE and UMAP dominate nonlinear visualization. Modern approaches like autoencoders extend these capabilities into deep learning. Choosing the right method requires balancing the goals of the analysis, the structure of the data, computational constraints, and the needs of downstream tasks. When applied thoughtfully, dimensionality reduction accelerates computation, mitigates overfitting, improves visualization, and ultimately leads to more robust and interpretable models.

## References

- Jolliffe, I.T. & Cadima, J. (2016). "Principal component analysis: a review and recent developments." *Philosophical Transactions of the Royal Society A*, 374(2065). https://doi.org/10.1098/rsta.2015.0202
- van der Maaten, L. & Hinton, G. (2008). "Visualizing Data using t-SNE." *Journal of Machine Learning Research*, 9, 2579–2605. https://jmlr.org/papers/v9/vandermaaten08a.html
- McInnes, L., Healy, J., & Melville, J. (2018). "UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction." *arXiv:1802.03426*. https://arxiv.org/abs/1802.03426
- Guyon, I. & Elisseeff, A. (2003). "An Introduction to Variable and Feature Selection." *Journal of Machine Learning Research*, 3, 1157–1182. https://jmlr.org/papers/v3/guyon03a.html
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*, Chapter 14: Autoencoders. MIT Press. https://www.deeplearningbook.org/
