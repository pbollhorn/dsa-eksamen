export default class Queue {
  #head;
  #tail;
  #size;

  constructor() {
    this.clear();
  }

  clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  // Iterator that yields each data element in the queue
  *[Symbol.iterator]() {
    let node = this.#head;
    while (node !== null) {
      yield node.data;
      node = node.next;
    }
  }

  size() {
    return this.#size;
  }

  peek() {
    if (this.#head === null) return undefined;
    return this.#head.data;
  }

  peekTail() {
    if (this.#tail === null) return undefined;
    return this.#tail.data;
  }

  get(index) {
    let i = 0;
    for (const data of this) {
      if (i === index) return data;
      i++;
    }
  }

  enqueue(data) {
    const newNode = { next: null, data: data };
    const lastNode = this.#tail;
    if (lastNode === null) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      lastNode.next = newNode;
      this.#tail = newNode;
    }
    this.#size++;
  }

  dequeue() {
    const firstNode = this.#head;
    if (firstNode === null) return undefined;
    this.#head = firstNode.next;
    this.#size--;
    return firstNode.data;
  }

  printQueue() {
    let i = 0;
    for (const data of this) {
      console.log(`Position ${i}: ${data}`);
      i++;
    }
    console.log(`size=${i}\n`);
  }
}
