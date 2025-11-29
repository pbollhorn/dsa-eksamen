// This file is named "node_.js",
// because naming it "node.js" causes problem with "npx mocha" command
export default class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.links = [];
  }

  addLink(node) {
    this.links.push(node);
  }
}
