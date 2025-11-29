export default class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addLink(node1, node2) {
    node1.neighbors.add(node2);
  }
}
