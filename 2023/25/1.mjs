import "utils/global.mjs";

class Comp {
  name;
  /**
   * @type{Map<string, Edge>}
   */
  edges = new Map();
  /**
   * @type{Map<string,Comp>}
   */
  static comps = new Map();
  constructor(name) {
    this.name = name;
    Comp.comps.set(name, this);
  }

  static init(name) {
    new this(name);
  }

  connect(comp) {
    Edge.add(this, comp);
  }

  disconnect(comp) {
    Edge.remove(this, comp);
  }

  static reset() {
    Comp.comps = new Map();
  }
}

class Edge {
  /**
   * @type{Map<string, Edge>}
   */
  static map = new Map();

  a;
  b;
  name;
  constructor() {}
  static add(a, b) {
    const pair = [a.name, b.name].sort().join(",");
    if (Edge.map.has(pair)) {
      const edge = Edge.map.get(pair);
      return edge;
    }

    const edge = new Edge();
    a.edges.set(b.name, edge);
    b.edges.set(a.name, edge);
    edge.a = a;
    edge.b = b;
    edge.name = pair;
    Edge.map.set(pair, edge);
    return edge;
  }
  static remove(a, b) {
    const pair = [a.name, b.name].sort().join(",");
    if (Edge.map.has(pair)) {
      a.edges.delete(b.name);
      b.edges.delete(a.name);
      Edge.map.delete(pair);
      return;
    }
  }
  static reset() {
    Edge.map = new Map();
  }
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  Comp.reset();
  Edge.reset();
  const lines = input
    .replaceAll(": ", " ")
    .split("\n")
    .map((line) => line.split(" "));

  // init all comps first
  for (const name of lines.flat()) {
    Comp.init(name);
  }

  // then connect the comps
  for (const [name, ...targets] of lines) {
    const thisComp = Comp.comps.get(name);
    for (const target of targets) {
      const neighbour = Comp.comps.get(target);
      // this will create an edge
      thisComp.connect(neighbour);
    }
  }

  /**
   * @type{Record<string,number>}
   */
  const edgeUsage = {};

  const allComps = [...Comp.comps.values()];

  // Do BFS to see how any pair of components are connected
  for (let i = 0; i < 10000; i++) {
    const a = allComps[Math.floor(Math.random() * allComps.length)];
    const b = allComps[Math.floor(Math.random() * allComps.length)];
    for (const e of bfs(a, b)) {
      edgeUsage[e] ??= 0;
      edgeUsage[e]++;
    }
  }

  Object.entries(edgeUsage)
    // sort
    .sort((a, b) => b[1] - a[1])
    // get the 3 most frequently used edges name,
    .slice(0, 3)
    // then convert them into component pairs
    .map(([name]) => name.split(",").map((name) => Comp.comps.get(name)))
    .forEach(([a, b]) => {
      // then disconnect them
      a.disconnect(b);
    });

  // just pick any comp and count the comps that it's connected to
  const coverage = countCoverage(allComps[0]);
  return coverage * (allComps.length - coverage);
}

/**
 * A BFS to flood fill using the starting comp
 * and find all the comps that it's connected to
 *
 * @param {Comp} start
 * @returns {number}
 */
function countCoverage(start) {
  const queue = [start];
  const seen = new Set();
  while (queue.length) {
    const current = queue.shift();
    if (!current) return 0;
    if (seen.has(current)) continue;
    seen.add(current);
    for (const [comp2] of current.edges) {
      queue.push(Comp.comps.get(comp2));
    }
  }
  return seen.size;
}

/**
 * A generator function BFS shortest-path walk to yield only the used edges
 * 
 * @param {Comp} start
 * @param {Comp} end
 */
function* bfs(start, end) {
  /**
   * @type{[Edge,Comp][]}
   */
  const q = [[null, start]];

  /**
   * @type{Set<Comp>}
   */
  const seen = new Set();

  while (q.length) {
    const [edge, comp] = q.shift();
    if (seen.has(comp)) continue;
    seen.add(comp);
    if (edge) {
      yield edge.name;
    }
    if (comp === end) {
      break;
    }
    for (const e of comp.edges.values()) {
      const target = e.a === comp ? e.b : e.a;
      if (!seen.has(target)) q.push([e, target]);
    }
  }
}
