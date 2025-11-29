export default class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  // add link from nodeA to nodeB
  addLink(nodeA, nodeB) {
    nodeA.addLink(nodeB);
  }
}
