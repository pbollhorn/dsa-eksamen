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

  // Iterator that yields each element in the queue
  *[Symbol.iterator]() {
    // for (element of this.#array) {
    //   yield element;
    // }
    for (let i = 0; i < this.#array.length; i++) {
      yield this.#array[i];
    }
  }

  toString() {
    let string = "";
    for (let i = this.#array.length - 1; i >= 0; i--) {
      string += ` ${this.#array[i].name} (${this.#array[i].fScore.toFixed(1)})`;
    }
    return string;
  }
}
