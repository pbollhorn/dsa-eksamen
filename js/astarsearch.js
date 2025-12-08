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

    // loop over outgoing neighbors
    for (const neighbor of current.links) {
      // gTentative is the distance from start to the neighbor through current
      const gTentative = current.g + d(current, neighbor);

      if (gTentative < neighbor.g) {
        // This path to neighbor is better than any previous one. Record it!
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
  const path = [node];
  while (node.prev !== null) {
    node = node.prev;
    path.unshift(node);
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
