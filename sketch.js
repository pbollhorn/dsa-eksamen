let Graph;
let Node;
let graph;

async function loadModules() {
  // Dynamically import Graph from the module
  let module = await import("./graph/graph.js");
  Graph = module.default; // default export

  // Dynamically import Node from the module
  module = await import("./graph/node_.js");
  Node = module.default; // default export
}

function buildGraph() {
  const graph = new Graph();

  // Nogle løse Nodes
  const node0 = new Node(300, 50);
  const node1 = new Node(200, 200);
  const node2 = new Node(400, 500);
  const node3 = new Node(1000, 500);

  // Sæt nodes ind i grafen
  graph.addNode(node0);
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addNode(node3);

  // Lav links imellem grafens nodes
  graph.addLink(node0, node1);
  graph.addLink(node1, node2);
  graph.addLink(node2, node3);
  graph.addLink(node3, node0);
  graph.addLink(node3, node1);

  return graph;
}

// setup() is called once when the sketch begins running
async function setup() {
  await loadModules();
  graph = buildGraph();
  createCanvas(1400, 600);
}

// draw() is run repeatedly approx. 60 times per second
function draw() {
  // in case setup() has not finished yet
  if (!graph) return;

  background("aqua");

  for (const node of graph.nodes) {
    drawNode(node);
    for (const otherNode of node.links) {
      drawLink(node, otherNode);
    }
  }
}

const NODE_RADIUS = 20;

function drawNode(node) {
  circle(node.x, node.y, 2 * NODE_RADIUS);
}

function drawLink(nodeA, nodeB) {
  line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
}
