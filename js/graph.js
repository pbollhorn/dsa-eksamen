class Graph {
  constructor() {
    this.nodes = new Map(); // key: name, value: Node object
  }

  addNode(name, x, y) {
    const node = new Node(name, x, y);
    this.nodes.set(name, node);
  }

  // Add link from node1 to node2
  addLink(node1name, node2name) {
    const node1 = this.nodes.get(node1name);
    const node2 = this.nodes.get(node2name);
    node1.addLink(node2);
  }
}

class Node {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.links = new Set();
    this.f = Infinity;
    this.g = Infinity;
    this.prev = null;
  }

  addLink(node) {
    this.links.add(node);
  }
}
