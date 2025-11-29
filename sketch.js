async function loadModules() {
  // Dynamically import Node from the module
  const module = await import("./graph/node_.js");
  const Node = module.default; // default export

  // Now you can use Node
  const n1 = new Node(100, 100);
  const n2 = new Node(200, 200);

  n1.addNeighbor(n2);

  console.log(n1);
}

function setup() {
  loadModules();
  createCanvas(400, 400);
}

function draw() {
  background("aqua");
  //circle in the center with a width of 50
  circle(200, 200, 50);
}
