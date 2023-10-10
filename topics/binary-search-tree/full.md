# Binary search tree (BST)

A Binary Search Tree (BST) is a binary tree data structure where each node has at most two child nodes, referred to as the left child and the right child. The key property of a BST is that the values in the left subtree of a node are less than or equal to the value at the node, and the values in the right subtree are greater than the value at the node. This property ensures that a BST is ordered, making it efficient for searching, insertion, and deletion operations.

Key aspects…

Binary Tree Structure: Each node in a BST has at most two children, a left child, and a right child.

Ordering: For every node, all elements in its left subtree are less than or equal to the node's value, and all elements in its right subtree are greater than the node's value.

Balancing: A well-balanced BST ensures that the height of the tree is approximately logarithmic, leading to efficient operations. Various balanced BSTs, such as AVL trees and Red-Black trees, are designed to maintain this balance.

Searching: Searching for a value in a BST is efficient, with a time complexity of O(log n) on average, where "n" is the number of nodes in the tree. In the worst case, if the tree is skewed, the search may take O(n) time.

Insertion: Inserting a value into a BST is also efficient, with a time complexity of O(log n) on average. In the worst case, if the tree is skewed, it may take O(n) time.

Deletion: Deleting a value from a BST can be more complex, as it requires maintaining the tree's ordering property. The time complexity for deletion is also O(log n) on average.
