const NODE_RADIUS = 15;

let graph;
let bgImg;
let PriorityQueue;
let current;
let start;
let goal;
let cameFrom;
let priorityQueue;

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
  // return immediately in case setup() has not finished yet
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

  // Draw start node and goal node
  if (start) {
    drawNode(start, "#EE292A");
  }
  if (goal) {
    drawNode(goal, "#EE292A");
  }

  // Draw queue (which is actually just HTML)
  if (priorityQueue) {
    document.getElementById("queueDisplay").textContent =
      priorityQueue.toString();
  }

  // // Draw neighbor
  // if (neighbor) {
  //   drawNode(neighbor, "lightgray");
  // }

  // Draw current node and path
  if (current) {
    drawNode(current, "green");
    document.getElementById("currentNodeDisplay").textContent = current.name;
    // document.getElementById("neighborsDisplay").textContent = [...current.links]
    //   .map((node) => node.name)
    //   .join(", ");

    // Draw path from start to current node
    const path = reconstruct_path(current);
    for (let i = 0; i <= path.length - 2; i++) {
      const thisnode = path[i];
      const nextnode = path[i + 1];
      drawLink(thisnode, nextnode, "#EE292A");
    }

    // Draw neighbors
    for (const neighbor of current.links) {
      drawNode(neighbor, "lightgreen");
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
  text(
    `g: ${node.gScore.toFixed(1)}\nf: ${node.fScore.toFixed(1)}`,
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
  strokeWeight(3);

  // Draw the line
  line(startX, startY, endX, endY);

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

  strokeWeight(1);
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
  console.log(priorityQueue);

  cameFrom = new Map();

  start.gScore = 0;
  start.fScore = start.gScore + heuristic(start);

  // await nextStepButtonClick();

  // while openSet is not empty
  while (priorityQueue.size() > 0) {
    await nextStepButtonClick();

    current = priorityQueue.dequeue();

    // await nextStepButtonClick();

    if (current === goal) {
      console.log("Goal is found!");
      const path = reconstruct_path(current);
      console.log(path);
      return path;
    }

    // loop over (out) neighbors
    for (const neighbor of current.links) {
      // tentative_gScore is the distance from start to the neighbor through current
      tentative_gScore = current.gScore + distance(current, neighbor);

      if (tentative_gScore < neighbor.gScore) {
        // This path to neighbor is better than any previous one. Record it!
        cameFrom.set(neighbor, current);
        neighbor.gScore = tentative_gScore;
        neighbor.fScore = neighbor.gScore + heuristic(neighbor);
        if (priorityQueue.includes(neighbor) === false) {
          priorityQueue.enqueue(neighbor);
        }
      }
    }
    // await nextStepButtonClick();
  }
}

function reconstruct_path(current) {
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
