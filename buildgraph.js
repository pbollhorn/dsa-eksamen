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

  // Lav links imellem grafens nodes
  graph.addLink("A", "B");
  graph.addLink("B", "C");
  graph.addLink("C", "D");
  graph.addLink("D", "G");
  graph.addLink("D", "E");
  graph.addLink("E", "D");
  graph.addLink("E", "F");
  graph.addLink("F", "G");
  graph.addLink("G", "H");
  graph.addLink("H", "I");
  graph.addLink("I", "B");
  graph.addLink("H", "A");

  // This code should not be here in finished project
  graph.bfs("A", "B");

  return graph;
}
