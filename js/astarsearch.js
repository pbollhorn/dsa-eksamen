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

    // loop over outgoing neighbors
    for (const neighbor of current.links) {
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
