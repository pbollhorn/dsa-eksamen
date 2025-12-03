const NODE_RADIUS = 15;

let graph;
let bgImg;
let PriorityQueue;

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

function drawNode(node) {
  if (node.visited === false) {
    fill("white");
  } else {
    fill("cyan");
  }

  circle(node.x, node.y, 2 * NODE_RADIUS);
  fill("black");
  textSize(1.4 * NODE_RADIUS);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`${node.name}`, node.x, node.y);

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

function updateDisplay(currentNode, queue, visited) {
  const currentNodeDisplay = document.getElementById("currentNodeDisplay");
  const queueDisplay = document.getElementById("queueDisplay");
  const visitedDisplay = document.getElementById("visitedDisplay");

  currentNodeDisplay.textContent = currentNode.name;

  const queueAsString = queue.map((node) => node.name).join(",");
  queueDisplay.textContent = queueAsString;

  const visitedAsString = [...visited].map((node) => node.name).join(",");
  visitedDisplay.textContent = visitedAsString;
}

// My implementation of BFS
async function bfs(startName, goalName) {
  const startNode = graph.nodes.get(startName);
  const goalNode = graph.nodes.get(goalName);

  const visited = new Set();
  const queue = []; // JavaScript array used as a queue
  queue.push(startNode);

  updateDisplay({ name: "" }, queue, visited);
  await nextStepButtonClick();

  while (queue.length > 0) {
    const currentNode = queue.shift();

    updateDisplay(currentNode, queue, visited);

    if (visited.has(currentNode)) {
      continue;
    }

    if (currentNode === goalNode) {
      document.getElementById("nextStepButton").disabled = true;
      alert("Goal Node Found!");
      return;
    } else {
      queue.push(...currentNode.links);
      visited.add(currentNode);
      currentNode.visited = true;
    }

    await nextStepButtonClick();
  }
}

// My implementation of A* Search
async function aStarSearch(startName, goalName) {
  const start = graph.nodes.get(startName);
  const goal = graph.nodes.get(goalName);

  // Heuristic function. Estimates the cost to reach goal from node.
  function h(node) {
    return distance(node, goal);
  }

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(start);

  const cameFrom = new Map();

  // gScore map
  const gScore = new Map();
  for (const name of graph.nodes.keys()) {
    gScore.set(name, Infinity);
  }
  gScore.set(startName, 0);
  console.log(gScore);

  // fScore map
  const fScore = new Map();
  for (const name of graph.nodes.keys()) {
    fScore.set(name, Infinity);
  }
  fScore.set(startName, h(start));
  console.log(fScore);

  // while openSet is not empty
  while (priorityQueue.size() > 0) {
    const current = priorityQueue.dequeue();
    // console.log(current.name);

    if (current === goal) {
      console.log("Goal is found!");
      const path = reconstruct_path(cameFrom, current);
      console.log(path);
      return path;
    }

    // loop over (out) neighbors
    for (const neighbor of current.links) {
      // d is the weight of the edge from current to neighbor
      const d = distance(current, neighbor);

      // tentative_gScore is the distance from start to the neighbor through current
      tentative_gScore = gScore.get(current.name) + d;

      if (tentative_gScore < gScore.get(neighbor.name)) {
        // This path to neighbor is better than any previous one. Record it!
        cameFrom.set(neighbor, current);
        gScore.set(neighbor.name, tentative_gScore);
        fScore.set(neighbor.name, tentative_gScore + h(neighbor));
        if (priorityQueue.includes(neighbor) === false) {
          priorityQueue.enqueue(neighbor);
        }
      }
    }
  }
}

function reconstruct_path(cameFrom, current) {
  const total_path = [current];

  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    total_path.unshift(current);
  }

  return total_path;
}

function distance(node1, node2) {
  return Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
}
