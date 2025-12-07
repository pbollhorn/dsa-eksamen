class Graph {
  constructor() {
    this.nodes = new Map(); // key: name, value: Node object
  }

  addNode(name, x, y) {
    const node = new Node(name, x, y);
    this.nodes.set(name, node);
  }

  // add link from node to another node
  addLink(from, to) {
    const nodeA = this.nodes.get(from);
    const nodeB = this.nodes.get(to);
    nodeA.addLink(nodeB);
  }
}

class Node {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.links = new Set();
    this.prev = null;
    this.f = Infinity;
    this.g = Infinity;
  }

  addLink(node) {
    this.links.add(node);
  }
}
