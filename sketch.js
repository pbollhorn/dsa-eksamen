let Graph;
let Node;
let graph;
let bgImg;

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

  // Put unconnected nodes ind i grafren
  graph.addNode("A", 130, 80);
  graph.addNode("B", 130, 270);
  graph.addNode("C", 130, 420);
  graph.addNode("D", 675, 420);
  graph.addNode("E", 1280, 420);
  graph.addNode("F", 1280, 80);
  graph.addNode("G", 675, 80);
  graph.addNode("H", 570, 80);
  graph.addNode("I", 420, 270);

  // Lav links imellem grafens nodes
  graph.addLink("A", "B");
  graph.addLink("B", "C");
  graph.addLink("C", "D");
  graph.addLink("D", "E");
  graph.addLink("E", "D");
  graph.addLink("E", "F");
  graph.addLink("F", "G");
  graph.addLink("G", "H");
  graph.addLink("H", "I");
  graph.addLink("I", "B");

  // This code should not be here in finished project
  graph.bfs("A", "B");

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
  for (const node of graph.nodes.values()) {
    for (const otherNode of node.links) {
      drawLink(node, otherNode);
    }
  }

  // Draw the nodes
  for (const node of graph.nodes.values()) {
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
  if (DISPLAY_NAMES) {
    fill("red");
    textSize(20);
    textStyle(BOLD);
    text(`name`, node.x, node.y);
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
