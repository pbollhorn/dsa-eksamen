class PriorityQueue {
  #array;

  constructor() {
    this.#array = [];
  }

  // enqueue node at the end
  enqueue(node) {
    this.#array.push(node);
  }

  // dequeue node with lowest fScore
  dequeue() {
    if (this.#array.length === 0) return undefined;

    let lowestIndex = 0;
    for (let i = 1; i < this.#array.length; i++) {
      if (this.#array[i].fScore < this.#array[lowestIndex].fScore) {
        lowestIndex = i;
      }
    }
    return this.#array.splice(lowestIndex, 1)[0];
  }

  size() {
    return this.#array.length;
  }

  includes(node) {
    return this.#array.includes(node);
  }

  toString() {
    return this.#array.map((node) => node.name).join(", ");
  }
}
