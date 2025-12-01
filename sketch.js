let Graph;
let Node;
let graph;
let bgImg;

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
  const node0 = new Node(130, 80);
  const node1 = new Node(130, 270);
  const node2 = new Node(130, 420);
  const node3 = new Node(675, 420);
  const node4 = new Node(1280, 420);
  const node5 = new Node(1280, 80);
  const node6 = new Node(675, 80);
  const node7 = new Node(570, 80);
  const node8 = new Node(420, 270);

  // Sæt nodes ind i grafen
  graph.addNode(node0);
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addNode(node3);
  graph.addNode(node4);
  graph.addNode(node5);
  graph.addNode(node6);
  graph.addNode(node7);
  graph.addNode(node8);

  // Lav links imellem grafens nodes
  graph.addLink(node0, node1);
  graph.addLink(node1, node2);
  graph.addLink(node2, node3);
  graph.addLink(node3, node4);
  graph.addLink(node4, node3);
  graph.addLink(node4, node3);
  graph.addLink(node4, node5);
  graph.addLink(node5, node6);
  graph.addLink(node3, node6);
  graph.addLink(node6, node7);
  graph.addLink(node7, node8);
  graph.addLink(node8, node1);
  graph.addLink(node7, node0);

  return graph;
}

// setup() is called once when the sketch begins running
async function setup() {
  bgImg = await loadImage("city.png");
  await loadModules();
  graph = buildGraph();
  createCanvas(1400, 600);
}

// draw() is run repeatedly approx. 60 times per second
function draw() {
  // in case setup() has not finished yet
  if (!graph) return;

  if (DISPLAY_BACKGROUND) {
    background(bgImg);
  } else {
    background("white");
  }

  // Draw the link
  for (const node of graph.nodes) {
    for (const otherNode of node.links) {
      drawLink(node, otherNode);
    }
  }

  // Draw the nodes
  for (const node of graph.nodes) {
    drawNode(node);
  }
}

const NODE_RADIUS = 10;

function drawNode(node) {
  fill("white");
  circle(node.x, node.y, 2 * NODE_RADIUS);
  if (DISPLAY_COORDINATES) {
    fill("red");
    textSize(20);
    textStyle(BOLD);
    text(`(${node.x}, ${node.y})`, node.x, node.y);
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
