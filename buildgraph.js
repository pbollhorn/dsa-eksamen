import Graph from "./graph/graph.js";

export default function buildGraph() {
  const graph = new Graph();

  // Put unconnected nodes ind i grafren
  graph.addNode("A", 130, 80);
  graph.addNode("B", 130, 270);
  graph.addNode("C", 130, 420);
  graph.addNode("D", 675, 420);
  graph.addNode("E", 1280, 420);
  graph.addNode("F", 1280, 80);
  graph.addNode("G", 675, 80);
  graph.addNode("H", 570, 80);
  graph.addNode("I", 420, 270);
  graph.addNode("J", 420, 420);
  graph.addNode("K", 675, 270);

  // Lav links imellem grafens nodes
  graph.addLink("A", "B");
  graph.addLink("B", "C");
  graph.addLink("C", "J");
  graph.addLink("J", "D");
  graph.addLink("D", "E");
  graph.addLink("D", "K");
  graph.addLink("K", "G");
  graph.addLink("E", "D");
  graph.addLink("E", "F");
  graph.addLink("F", "G");
  graph.addLink("G", "H");
  graph.addLink("H", "I");
  graph.addLink("H", "A");
  graph.addLink("I", "B");
  graph.addLink("I", "J");

  return graph;
}
