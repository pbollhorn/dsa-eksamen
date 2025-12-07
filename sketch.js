let backgroundImage;
let graph;

// setup() is called by p5.js once when the sketch begins running
async function setup() {
  backgroundImage = await loadImage("city.png");
  graph = buildGraph();

  // Populate both select elements with all nodes
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

  createCanvas(800, 550);
}

// draw() is run repeatedly by p5.js approx. 60 times per second
function draw() {
  // return immediately if setup() has not finished yet
  if (!graph) return;

  if (DISPLAY_BACKGROUND) {
    background(backgroundImage);
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

    // Draw neighbors
    for (const neighbor of current.links) {
      drawNode(neighbor, CUSTOM_LIGHT_GREEN);
    }
  }
}
