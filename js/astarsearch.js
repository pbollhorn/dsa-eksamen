let current;
let start;
let goal;
let priorityQueue = new PriorityQueue();

async function aStarSearch(startName, goalName) {
  start = graph.nodes.get(startName);
  goal = graph.nodes.get(goalName);

  start.g = 0;
  start.f = start.g + h(start);

  priorityQueue.enqueue(start);
  await nextStepButtonClick();

  while (priorityQueue.size() > 0) {
    current = priorityQueue.dequeue();

    if (current === goal) {
      // Path found
      const path = reconstructPath(current);
      return path;
    }

    // Loop over outgoing neighbors
    for (const neighbor of current.links) {
      // Length of path from start to current to neighbor
      const gTentative = current.g + d(current, neighbor);

      // Check if this path is shorter than existing path to neighbor
      if (gTentative < neighbor.g) {
        // Path is shorter. Record it!
        neighbor.prev = current;
        neighbor.g = gTentative;
        neighbor.f = neighbor.g + h(neighbor);
        if (priorityQueue.includes(neighbor) === false) {
          priorityQueue.enqueue(neighbor);
        }
      }
    }
    await nextStepButtonClick();
  }

  // No path found
  return null;
}

function reconstructPath(node) {
  const path = [];
  while (node !== null) {
    path.unshift(node);
    node = node.prev;
  }
  return path;
}

// Heuristic function: Straight-line distance from node to goal
function h(node) {
  return d(node, goal);
}

// Function for straight-line distance between two nodes
function d(node1, node2) {
  return Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
}
