let nodes = [];

async function loadModules() {
  // Dynamically import Node from the module
  const module = await import("./graph/node_.js");
  const Node = module.default; // default export

  // Now you can use Node
  const n1 = new Node(300, 50);
  const n2 = new Node(200, 200);

  n1.addNeighbor(n2);

  console.log(n1);

  nodes.push(n1);
  nodes.push(n2);
}

// setup() is called once when the sketch begins running
async function setup() {
  await loadModules();

  createCanvas(1400, 600);
}

// draw() is run repeatedly approx. 60 times per second
// draw() begins running after setup() has finished
function draw() {
  background("aqua");
  //circle in the center with a width of 50
  // circle(200, 200, 50);

  for (n of nodes) {
    circle(n.x, n.y, 50);
  }

  line(300, 50, 200, 200);
}
