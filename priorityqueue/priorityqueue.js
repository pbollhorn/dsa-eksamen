export default class PriorityQueue {
  // array sorted by fscore from smallets to largest
  #array;

  constructor() {
    this.#array = [];
  }

  enqueue(node) {
    this.#array.push(node);
    this.#array.sort((a, b) => b.fscore - a.fscore);
  }

  dequeue() {
    return this.#array.pop();
  }

  size() {
    return this.#array.length;
  }

  print() {
    console.log(this.#array);
  }
}
