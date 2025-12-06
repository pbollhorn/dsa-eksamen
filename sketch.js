const NODE_RADIUS = 15;
const CUSTOM_RED = "hsl(360, 100%, 60%)";
const CUSTOM_GREEN = "hsl(120, 100%, 35%)";
const CUSTOM_LIGHT_GREEN = "hsl(120, 100%, 75%)";

let graph;
let bgImg;
let PriorityQueue;
let current;
let start;
let goal;
let priorityQueue;
let neighbors;

async function loadModules() {
  // Dynamically import buildGraph from the module
  let module = await import("./buildgraph.js");
  buildGraph = module.default; // default export
  module = await import("./priorityqueue/priorityqueue.js");
  PriorityQueue = module.default; // default export
}

// setup() is called once when the sketch begins running
async function setup() {
  bgImg = await loadImage("city.png");
  await loadModules();
  graph = buildGraph();
  createCanvas(800, 550);

  for (const node of graph.nodes.values()) {
    let option = document.createElement("option");
    option.value = node.name;
    option.textContent = node.name;
    startNodeSelect.appendChild(option);
    option = document.createElement("option");
    option.value = node.name;
    option.textContent = node.name;
    goalNodeSelect.appendChild(option);
  }
}

// draw() is run repeatedly approx. 60 times per second
function draw() {
  // return immediately if setup() has not finished yet
  if (!graph) return;

  if (DISPLAY_BACKGROUND) {
    background(bgImg);
  } else {
    background("white");
  }

  // Draw links
  for (const node of graph.nodes.values()) {
    for (const otherNode of node.links) {
      drawLink(node, otherNode);
    }
  }

  // Draw the nodes
  for (const node of graph.nodes.values()) {
    drawNode(node);
  }

  // Draw start node and goal node
  if (start) {
    drawNode(start, CUSTOM_RED);
  }
  if (goal) {
    drawNode(goal, CUSTOM_RED);
  }

  // Draw queue (which is actually just HTML)
  if (priorityQueue) {
    document.getElementById("queueDisplay").textContent =
      priorityQueue.toString();
  }

  // Draw current node and path
  if (current) {
    drawNode(current, CUSTOM_GREEN);
    document.getElementById("currentNodeDisplay").textContent = current.name;

    // Draw path from start to current node
    const path = reconstruct_path(current);
    for (let i = 0; i <= path.length - 2; i++) {
      const thisnode = path[i];
      const nextnode = path[i + 1];
      drawLink(thisnode, nextnode, CUSTOM_RED);
    }
  }

  // Draw neighbors
  if (neighbors) {
    for (const neighbor of neighbors) {
      drawNode(neighbor, CUSTOM_LIGHT_GREEN);
    }
  }
}

function drawNode(node, fillColor = "white") {
  stroke("black");
  fill(fillColor);
  circle(node.x, node.y, 2 * NODE_RADIUS);
  fill("black");
  textSize(1.4 * NODE_RADIUS);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`${node.name}`, node.x, node.y);

  noStroke();
  fill("blue");
  textSize(1.0 * NODE_RADIUS);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  const f = node.fScore.toFixed(1);
  const g = node.gScore.toFixed(1);
  const prev = node.prev ? node.prev.name : null;
  text(
    `f: ${f}\ng: ${g}\nprev: ${prev}`,
    node.x + 0.8 * NODE_RADIUS,
    node.y + 0.8 * NODE_RADIUS
  );

  if (DISPLAY_COORDINATES) {
    fill("red");
    textSize(20);
    textStyle(BOLD);
    text(`(${node.x}, ${node.y})`, node.x, node.y);
  }
}

function drawLink(nodeA, nodeB, fillColor = "black") {
  // Angle from A to B
  const a = atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);

  // Start point at edge of nodeA's circle
  const startX = nodeA.x + NODE_RADIUS * cos(a);
  const startY = nodeA.y + NODE_RADIUS * sin(a);

  // End point at edge of nodeB's circle
  const endX = nodeB.x - NODE_RADIUS * cos(a);
  const endY = nodeB.y - NODE_RADIUS * sin(a);

  stroke(fillColor);
  fill(fillColor);

  // Draw the line
  strokeWeight(3);
  line(startX, startY, endX, endY);
  strokeWeight(1);

  // Draw the arrowhead at the end
  const arrowSize = 10; // size of the arrowhead
  triangle(
    endX,
    endY,
    endX - arrowSize * cos(a - PI / 6),
    endY - arrowSize * sin(a - PI / 6),
    endX - arrowSize * cos(a + PI / 6),
    endY - arrowSize * sin(a + PI / 6)
  );

  if (DISPLAY_WEIGHTS) {
    const weight = distance(nodeA, nodeB).toFixed(1);
    const x = (nodeA.x + nodeB.x) / 2;
    const y = (nodeA.y + nodeB.y) / 2;
    text(weight, x, y);
  }
}

// My implementation of A* Search
async function aStarSearch(startName, goalName) {
  start = graph.nodes.get(startName);
  goal = graph.nodes.get(goalName);

  // Heuristic function: Estimates the cost to reach goal from node
  function heuristic(node) {
    return distance(node, goal);
  }

  priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(start);

  start.gScore = 0;
  start.fScore = start.gScore + heuristic(start);
  start.prev = null; // Strictly not necesarry to do this

  await nextStepButtonClick();

  // while openSet is not empty
  while (priorityQueue.size() > 0) {
    current = priorityQueue.dequeue();

    if (current === goal) {
      const path = reconstruct_path(current);
      return path;
    }

    await nextStepButtonClick();

    // loop over outgoing neighbors
    neighbors = current.links;
    for (const neighbor of neighbors) {
      // tentative_gScore is the distance from start to the neighbor through current
      tentative_gScore = current.gScore + distance(current, neighbor);

      if (tentative_gScore < neighbor.gScore) {
        // This path to neighbor is better than any previous one. Record it!
        neighbor.prev = current;
        neighbor.gScore = tentative_gScore;
        neighbor.fScore = neighbor.gScore + heuristic(neighbor);
        if (priorityQueue.includes(neighbor) === false) {
          priorityQueue.enqueue(neighbor);
        }
      }
    }
    await nextStepButtonClick();
    neighbors = undefined;
  }
  // Open set is empty but goal was never reached
  return null;
}

function reconstruct_path(node) {
  const path = [node];
  while (node.prev !== null) {
    node = node.prev;
    path.unshift(node);
  }
  return path;
}

function distance(node1, node2) {
  return Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
}
