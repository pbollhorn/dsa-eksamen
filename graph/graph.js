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

  // My implementation of BFS
  bfs(startNode, goalNode) {
    console.log("Hello from BFS!!!");
    console.log(startNode);
    console.log(goalNode);

    const queue = []; // JavaScript array used as a queue
    const visited = new Set();

    queue.push(startNode);
  }
}
