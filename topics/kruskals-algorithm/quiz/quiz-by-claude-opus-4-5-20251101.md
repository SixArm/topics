# Kruskal's algorithm

Question: What data structure is commonly used in Kruskal's algorithm to efficiently detect whether adding an edge would create a cycle?

- [ ] Priority queue
- [ ] Hash table
- [ ] Disjoint-set (union-find)
- [ ] Binary search tree

<details>
  <summary>Answer</summary>
  <p>Disjoint-set (union-find)</p>
  <p>Kruskal's algorithm uses a disjoint-set (also known as union-find) data structure to efficiently track which vertices belong to the same connected component. When considering adding an edge, the algorithm checks if both vertices are already in the same set—if so, adding the edge would create a cycle. The union-find structure supports near-constant time operations for these checks, making the algorithm efficient.</p>
</details>
