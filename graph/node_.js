// This file is named "node_.js",
// because naming it "node.js" causes problem with "npx mocha" command
export default class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }

  getNodesAsSet() {
    const mySet = new Set();
    const queue = [];

    queue.push(this);
    console.log("Get ready for this!");
    console.log(this);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log(currentNode.neighbors);
      mySet.add(currentNode); // using a Set avoids duplicates

      for (const node of currentNode.neighbors) {
        if (mySet.has(node) == false) queue.push(node);
      }
    }

    return mySet;
  }
}
