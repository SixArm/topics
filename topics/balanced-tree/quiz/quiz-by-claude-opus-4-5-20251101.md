# Balanced tree (b-tree)

Question: What is the primary mechanism a balanced tree uses to maintain balance when a node exceeds its maximum allowed number of keys during an insertion?

- [ ] The tree performs a complete rebalancing of all nodes from the root
- [ ] The node is split into two nodes and the median key is promoted to the parent node
- [ ] The excess keys are moved to the nearest leaf node
- [ ] The tree increases its order parameter to accommodate more keys

<details>
  <summary>Answer</summary>
  <p>The node is split into two nodes and the median key is promoted to the parent node</p>
  <p>When a node in a b-tree exceeds its maximum allowed number of keys (2t-1), the split operation divides the node into two nodes and promotes the median key to the parent node. This mechanism ensures the tree remains balanced and maintains logarithmic time complexity for operations like insert, delete, and search—which is why b-trees are commonly used in databases and file systems for handling large datasets efficiently.</p>
</details>
