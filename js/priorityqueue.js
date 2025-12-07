class PriorityQueue {
  #array;

  constructor() {
    this.#array = [];
  }

  enqueue(node) {
    this.#array.push(node);
  }

  dequeue() {
    this.#array.sort((a, b) => a.fScore - b.fScore);
    return this.#array.shift();
  }

  size() {
    return this.#array.length;
  }

  includes(node) {
    return this.#array.includes(node);
  }

  print() {
    console.log(this.#array);
  }

  toString() {
    let string = "";
    for (const node of this.#array) {
      string += `${node.name}`;
    }
    return string;
  }
}
