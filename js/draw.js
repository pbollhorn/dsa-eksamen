const NODE_RADIUS = 15;
const CUSTOM_RED = "hsl(360, 100%, 60%)";
const CUSTOM_GREEN = "hsl(120, 100%, 35%)";
const CUSTOM_LIGHT_GREEN = "hsl(120, 100%, 75%)";

function drawNode(node, fillColor = "white") {
  stroke("black");
  fill(fillColor);
  circle(node.x, node.y, 2 * NODE_RADIUS);
  fill("black");
  textSize(1.4 * NODE_RADIUS);
  textAlign(CENTER, CENTER);
  text(`${node.name}`, node.x, node.y);

  noStroke();
  textSize(1.0 * NODE_RADIUS);
  textAlign(LEFT, TOP);

  if (DISPLAY_F_G_PREV) {
    const f = node.f.toFixed(1);
    const g = node.g.toFixed(1);
    const prev = node.prev ? node.prev.name : null;
    fill("blue");
    text(
      `f: ${f}\ng: ${g}\nprev: ${prev}`,
      node.x + 0.8 * NODE_RADIUS,
      node.y + 0.8 * NODE_RADIUS
    );
  }

  if (DISPLAY_COORDINATES) {
    fill("purple");
    text(
      `(${node.x}, ${node.y})`,
      node.x + 0.8 * NODE_RADIUS,
      node.y + 0.8 * NODE_RADIUS
    );
  }
}

function drawLink(nodeA, nodeB, fillColor = "black") {
  const a = atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);

  const startX = nodeA.x + NODE_RADIUS * cos(a);
  const startY = nodeA.y + NODE_RADIUS * sin(a);

  const endX = nodeB.x - NODE_RADIUS * cos(a);
  const endY = nodeB.y - NODE_RADIUS * sin(a);

  stroke(fillColor);
  fill(fillColor);

  // Draw the line
  strokeWeight(3);
  line(startX, startY, endX, endY);
  strokeWeight(1);

  // Draw arrow
  const arrowSize = 10;
  triangle(
    endX,
    endY,
    endX - arrowSize * cos(a - PI / 6),
    endY - arrowSize * sin(a - PI / 6),
    endX - arrowSize * cos(a + PI / 6),
    endY - arrowSize * sin(a + PI / 6)
  );

  if (DISPLAY_WEIGHTS) {
    const weight = d(nodeA, nodeB).toFixed(1);
    const x = (nodeA.x + nodeB.x) / 2;
    const y = (nodeA.y + nodeB.y) / 2;
    noStroke();
    fill("red");
    textAlign(CENTER, BOTTOM);
    text(weight, x, y);
  }
}
