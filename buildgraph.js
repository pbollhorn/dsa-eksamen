import Graph from "./graph/graph.js";

export default function buildGraph() {
  const graph = new Graph();

  // Put unconnected nodes ind i grafren
  graph.addNode("a", 43, 43);
  graph.addNode("b", 43, 140);
  graph.addNode("c", 43, 235);
  graph.addNode("d", 43, 390);
  graph.addNode("e", 43, 480);
  graph.addNode("f", 140, 43);
  graph.addNode("g", 140, 140);
  graph.addNode("h", 140, 235);
  graph.addNode("i", 190, 390);
  graph.addNode("j", 190, 480);
  graph.addNode("k", 235, 43);
  graph.addNode("l", 235, 140);
  graph.addNode("m", 235, 235);
  graph.addNode("n", 335, 43);
  graph.addNode("o", 335, 140);
  graph.addNode("p", 335, 235);
  graph.addNode("q", 335, 390);
  graph.addNode("r", 335, 480);
  graph.addNode("s", 430, 43);
  graph.addNode("t", 430, 235);
  graph.addNode("u", 430, 390);
  graph.addNode("v", 430, 480);
  graph.addNode("w", 525, 43);
  graph.addNode("x", 525, 235);
  graph.addNode("y", 525, 390);
  graph.addNode("z", 625, 43);
  graph.addNode("æ", 625, 140);
  graph.addNode("ø", 625, 235);
  graph.addNode("å", 625, 390);
  graph.addNode("α", 625, 480);
  graph.addNode("β", 720, 43);
  graph.addNode("γ", 720, 140);
  graph.addNode("δ", 720, 235);
  graph.addNode("ε", 720, 390);
  graph.addNode("ζ", 720, 480);

  // Lav links imellem grafens nodes
  graph.addLink("a", "b");
  graph.addLink("a", "f");
  graph.addLink("b", "a");
  graph.addLink("b", "c");
  graph.addLink("b", "g");
  graph.addLink("c", "b");
  graph.addLink("c", "d");
  graph.addLink("c", "h");
  graph.addLink("d", "c");
  graph.addLink("d", "e");
  graph.addLink("d", "i");
  graph.addLink("e", "d");
  graph.addLink("e", "j");
  graph.addLink("f", "a");
  graph.addLink("f", "g");
  graph.addLink("f", "k");
  graph.addLink("g", "b");
  graph.addLink("g", "f");
  graph.addLink("g", "h");
  graph.addLink("g", "l");
  graph.addLink("h", "c");
  graph.addLink("h", "g");
  graph.addLink("h", "i");
  graph.addLink("h", "m");
  

  return graph;
}
