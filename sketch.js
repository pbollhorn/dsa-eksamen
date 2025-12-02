let graph;
let bgImg;

async function loadModules() {
  // Dynamically import buildGraph from the module
  const module = await import("./buildgraph.js");
  buildGraph = module.default; // default export
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
    text(`${node.name}`, node.x, node.y);
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

// My implementation of BFS
async function bfs(startName, goalName) {
  console.log("BFS stated");

  const startNode = graph.nodes.get(startName);
  const goalNode = graph.nodes.get(goalName);

  const visited = new Set();
  const queue = []; // JavaScript array used as a queue
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    updateDisplay(currentNode, queue, visited);

    if (visited.has(currentNode)) {
      continue;
    }

    if (currentNode === goalNode) {
      console.log("Goal Node Found!");
      return;
    } else {
      queue.push(...currentNode.links);
      visited.add(currentNode);
    }

    await nextStepButtonClick();
  }
}

function updateDisplay(currentNode, queue, visited) {
  const currentNodeDisplay = document.getElementById("currentNodeDisplay");
  const queueDisplay = document.getElementById("queueDisplay");
  const visitedDisplay = document.getElementById("visitedDisplay");

  currentNodeDisplay.textContent = currentNode.name;
}
