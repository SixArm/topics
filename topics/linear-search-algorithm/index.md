# Linear search algorithm

A linear search algorithm, also known as a sequential search algorithm, is a straightforward method for finding a specific element within a list or array. It works by iterating through the elements one by one until the target element is found or until the entire list has been searched. Here's a step-by-step explanation of how the linear search algorithm works:

1. Start at the beginning of the list (or array) of elements.

2. Compare the target element you are searching for with the current element in the list.

3. If the current element matches the target element, the search is successful, and you can return the index of the current element (or any other relevant information).

4. If the current element does not match the target element, move to the next element in the list.

5. Repeat steps 2-4 until you either find the target element or reach the end of the list without finding a match.

6. If you reach the end of the list without finding the target element, the search is unsuccessful, and you can return a specified value (e.g., -1) to indicate that the element was not found.

Linear search is a simple and straightforward algorithm but not the most efficient for large lists or arrays. Its time complexity is O(n), where n is the number of elements in the list, which means the time it takes to complete the search increases linearly with the size of the list. For large datasets, more efficient search algorithms like binary search (for sorted data) or hash tables are typically used to achieve faster results.
