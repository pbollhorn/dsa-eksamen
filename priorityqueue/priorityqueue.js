export default class PriorityQueue {
  // array sorted by fscore from smallets to largest
  #array;

  constructor() {
    this.#array = [];
  }

  enqueue(node) {
    for (let i = 0; i < this.#array.length; i++) {
      if (node.fscore < this.#array[i].fscore) {
        this.#array.splice(i, 0, node);
      }
    }
  }

  size() {
    return this.#array.length;
  }

  dequeue() {
    return this.#array.pop();
  }

  print() {
    console.log(this.#array);
  }
}
