import PriorityQueue from "./priorityqueue.js";

const priorityQueue = new PriorityQueue();

console.log(priorityQueue.size());
priorityQueue.print();

priorityQueue.enqueue({ fscore: 7 });
console.log(priorityQueue.size());
priorityQueue.print();

priorityQueue.enqueue({ fscore: 17 });
console.log(priorityQueue.size());
priorityQueue.print();

priorityQueue.enqueue({ fscore: 3 });
console.log(priorityQueue.size());
priorityQueue.print();

const node = priorityQueue.dequeue();
console.log(node);
