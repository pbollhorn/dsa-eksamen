export default class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(name, x, y) {
    this.nodes.set(name, new Node(name, x, y));
  }

  // add link from node to another node
  addLink(from, to) {
    const nodeA = this.nodes.get(from);
    const nodeB = this.nodes.get(to);
    nodeA.addLink(nodeB);
  }

  // My implementation of BFS
  bfs(startName, goalName) {
    console.log("BFS stated");

    const startNode = this.nodes.get(startName);
    const goalNode = this.nodes.get(goalName);

    const visited = new Set();
    const queue = []; // JavaScript array used as a queue
    queue.push(startNode);

    while (queue.length > 0) {
      const node = queue.shift();
      console.log(node);
      if (!visited.has(node)) {
        if (node === goalNode) {
          console.log("Goal Node Found!");
          return;
        } else {
          queue.push(...node.links);
          visited.add(node);
        }
      }
    }
  }
}
