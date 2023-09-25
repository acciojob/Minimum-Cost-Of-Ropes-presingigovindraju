function calculateMinCost() {
  // Get the input values as a comma-separated string and split it into an array of integers
  const input = document.getElementById('input').value;
  const ropeLengths = input.split(',').map(Number);

  // Create a min-heap (priority queue) to store rope lengths
  const minHeap = new MinHeap();

  // Insert all rope lengths into the min-heap
  ropeLengths.forEach((length) => {
    minHeap.insert(length);
  });

  let totalCost = 0;

  // Keep merging the two shortest ropes until there's only one rope left in the heap
  while (minHeap.size() > 1) {
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    const cost = rope1 + rope2;
    totalCost += cost;

    // Insert the merged rope back into the heap
    minHeap.insert(cost);
  }

  // Display the minimum cost in the result div
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = `Minimum Cost: ${totalCost}`;
}

// MinHeap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return minValue;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapify(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = rightChildIndex;
    }

    if (index !== smallestIndex) {
      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];
      this.heapify(smallestIndex);
    }
  }

  size() {
    return this.heap.length;
  }
}

// Attach the calculateMinCost function to a button or form submit event as needed
