import Graph from "./graph/graph.js";

export default function buildGraph() {
  const graph = new Graph();

  // Put unconnected nodes ind i grafren
  graph.addNode("A", 43, 43);
  graph.addNode("B", 43, 140);
  graph.addNode("C", 43, 235);
  graph.addNode("D", 43, 390);
  graph.addNode("E", 43, 480);
  graph.addNode("F", 140, 43);
  graph.addNode("G", 140, 140);
  graph.addNode("H", 140, 235);
  graph.addNode("I", 190, 390);
  graph.addNode("J", 190, 480);
  graph.addNode("K", 235, 43);
  graph.addNode("L", 235, 140);
  graph.addNode("M", 235, 235);
  graph.addNode("N", 335, 43);
  graph.addNode("O", 335, 140);
  graph.addNode("P", 335, 235);
  graph.addNode("Q", 335, 390);
  graph.addNode("R", 335, 480);
  graph.addNode("S", 430, 43);
  graph.addNode("T", 430, 235);
  graph.addNode("U", 430, 390);
  graph.addNode("V", 430, 480);
  graph.addNode("X", 525, 43);
  graph.addNode("Y", 525, 235);
  graph.addNode("Z", 525, 390);
  graph.addNode("a", 625, 43);
  graph.addNode("a", 625, 43);
  graph.addNode("b", 625, 140);
  graph.addNode("c", 625, 235);
  graph.addNode("d", 625, 390);
  graph.addNode("e", 625, 480);
  graph.addNode("f", 720, 43);
  graph.addNode("g", 720, 140);
  graph.addNode("h", 720, 235);
  graph.addNode("i", 720, 390);
  graph.addNode("j", 720, 480);


  // graph.addNode("G", 720, 43);
  // graph.addNode("H", 140, 43);
  // graph.addNode("I", 140, 140);
  
  // graph.addNode("K", 675, 270);

  // Lav links imellem grafens nodes
  // graph.addLink("A", "B");
  // graph.addLink("B", "C");
  // graph.addLink("C", "J");
  // graph.addLink("J", "D");
  // graph.addLink("D", "E");
  // graph.addLink("D", "K");
  // graph.addLink("K", "G");
  // graph.addLink("E", "D");
  // graph.addLink("E", "F");
  // graph.addLink("F", "G");
  // graph.addLink("G", "H");
  // graph.addLink("H", "I");
  // graph.addLink("H", "A");
  // graph.addLink("I", "B");
  // graph.addLink("I", "J");

  return graph;
}
