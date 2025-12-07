let current;
let start;
let goal;
let priorityQueue;

async function aStarSearch(startName, goalName) {
  start = graph.nodes.get(startName);
  goal = graph.nodes.get(goalName);

  priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(start);

  start.g = 0;
  start.f = start.g + h(start);
  start.prev = null; // Strictly not necesarry to do this

  await nextStepButtonClick();

  // while openSet is not empty
  while (priorityQueue.size() > 0) {
    current = priorityQueue.dequeue();

    if (current === goal) {
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
  // Open set is empty but goal was never reached
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

// Heuristic function: Estimates the cost to reach goal from node
function h(node) {
  return d(node, goal);
}

function d(node1, node2) {
  return Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
}
