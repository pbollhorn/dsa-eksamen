export default class PriorityQueue {
  // array sorted by fscore from smallest to largest

  constructor() {
    this.array = [];
  }

  enqueue(node) {
    this.array.push(node);
    this.array.sort((a, b) => b.fScore - a.fScore);
  }

  dequeue() {
    return this.array.pop();
  }

  size() {
    return this.array.length;
  }

  includes(node) {
    return this.array.includes(node);
  }

  print() {
    console.log(this.array);
  }

  // Iterator that yields each element in the queue
  *[Symbol.iterator]() {
    // for (element of this.#array) {
    //   yield element;
    // }
    for (let i = 0; i < this.array.length; i++) {
      yield this.array[i];
    }
  }
}
