let Graph;
let Node;
let graph;

// let DISPLAY_COORDINATES = true;

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
  graph.addLink(node3, node2);

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

  // Draw the nodes
  for (const node of graph.nodes) {
    drawNode(node);
  }

  // Draw the link
  for (const node of graph.nodes) {
    for (const otherNode of node.links) {
      drawLink(node, otherNode);
    }
  }
}

const NODE_RADIUS = 10;

function drawNode(node) {
  fill("white");
  circle(node.x, node.y, 2 * NODE_RADIUS);
  if (DISPLAY_COORDINATES) {
    fill("blue");
    text(`${node.x}, ${node.y}`, node.x, node.y);
  }
}

function drawLink(nodeA, nodeB) {
  // Angle from A to B
  const a = atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);

  // Start point at edge of nodeA's circle
  const startX = nodeA.x + NODE_RADIUS * cos(a);
  const startY = nodeA.y + NODE_RADIUS * sin(a);

  // End point at edge of nodeB's circle
  const endX = nodeB.x - NODE_RADIUS * cos(a);
  const endY = nodeB.y - NODE_RADIUS * sin(a);

  // Draw the line
  line(startX, startY, endX, endY);

  // Draw the arrowhead at the end
  fill("black");
  const arrowSize = 10; // size of the arrowhead
  triangle(
    endX,
    endY,
    endX - arrowSize * cos(a - PI / 6),
    endY - arrowSize * sin(a - PI / 6),
    endX - arrowSize * cos(a + PI / 6),
    endY - arrowSize * sin(a + PI / 6)
  );
}
