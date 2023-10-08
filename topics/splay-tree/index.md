# Splay tree

A splay tree is a type of self-adjusting binary search tree (BST) that optimizes its structure for frequently accessed elements. It achieves this by bringing recently accessed nodes closer to the root through a process called "splaying." Splaying involves a series of tree rotations and other operations to move the accessed node to the root position.

The primary motivation behind splay trees is to improve the access time for frequently accessed elements by reducing their depth in the tree, which in turn reduces the average time complexity for search, insertions, and deletions. While splay trees do not guarantee a balanced tree structure in the traditional sense (such as AVL trees or Red-Black trees), they exhibit excellent amortized performance.

Key operations:

* Splaying: Splaying is the core operation in a splay tree. When you access a node (e.g., by searching for a value), the tree is restructured so that the accessed node becomes the root. Splaying involves a series of rotations, zig-zag and zig-zig operations, and other transformations to move the accessed node closer to the root.

* Searching: To search for a value in a splay tree, you perform a standard binary search operation. While doing this, you splay the accessed node to the root to optimize future accesses to that node.

* Insertion: When you insert a new element into a splay tree, you first perform a standard binary search to find the insertion point. After inserting the node, you splay it to the root to bring it closer to the root.

* Deletion: Deletion in a splay tree follows the standard BST deletion process. After deletion, you splay the parent of the deleted node to the root.

Splay trees provide amortized O(log n) time complexity for search, insertion, and deletion operations. While they don't guarantee a strict balance, they adapt to the access pattern of the elements, making them efficient for certain use cases, such as when some elements are frequently accessed.
