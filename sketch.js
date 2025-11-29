let Graph;
let Node;
let graph;

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

  // Now you can use Node
  const node0 = new Node(300, 50);
  const node1 = new Node(200, 200);
  const node2 = new Node(400, 500);

  graph.addNode(node0);
  graph.addNode(node1);
  graph.addNode(node2);


  return graph;
}

// setup() is called once when the sketch begins running
async function setup() {
  await loadModules();
  createCanvas(1400, 600);

  graph = buildGraph();

}

// draw() is run repeatedly approx. 60 times per second
// draw() begins running after setup() has finished
function draw() {
  background("aqua");
  //circle in the center with a width of 50
  // circle(200, 200, 50);



  for (const node of graph.nodes) {
    circle(node.x, node.y, 50);
  }

  line(300, 50, 200, 200);
}
