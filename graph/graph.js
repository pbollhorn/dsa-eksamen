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
    console.log("BFS stated");

    const queue = []; // JavaScript array used as a queue
    const visited = new Set();

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
