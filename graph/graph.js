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
    const queue = []; // JavaScript array used as a queue
    const visited = Set();

    queue.push(startNode);

  }
}
