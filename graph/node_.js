// This file is named "node_.js",
// because naming it "node.js" causes problem with "npx mocha" command
export default class Node {
  constructor(x, y, neighbors = []) {
    this.x = x;
    this.y = y;
    this.neighbors = neighbors;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }
}
