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
      console.log("current node: ", node.name);
      console.log("queue: ", queue);
      console.log("visited: ", visited);

      if (visited.has(node)) {
        continue;
      }

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

export class Node {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.links = new Set();
  }

  addLink(node) {
    this.links.add(node);
  }
}
