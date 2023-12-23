import Heap from "heap";
import "utils/global.mjs";

const logger = new Logger([], true);
logger.label("test")("test");

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

class Point {
  /**
   * @type{Record<string,Point>}
   */
  static nodeMap = {};
  /**
   *
   * @param {number} r
   * @param {number} c
   * @returns {Point | null}
   */
  static getNode(r, c) {
    return Point.nodeMap[`${r},${c}`] || null;
  }
  /**
   * @type{{to: Point, dist: number}[]}
   */
  edges = [];

  constructor(r, c) {
    this.r = r;
    this.c = c;
    Point.nodeMap[`${r},${c}`] = this;
  }
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));

  const sr = 0;
  const sc = lines[0].findIndex((c) => c === ".");
  const er = lines.length - 1;
  const ec = lines[lines.length - 1].findIndex((c) => c === ".");

  new Point(sr, sc);
  new Point(er, ec);

  const isInBound = (r, c) =>
    r >= 0 && r < lines.length && c >= 0 && c < lines[0].length;

  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[0].length; c++) {
      const avails = dirs.filter(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (!isInBound(nr, nc)) return false;
        return lines[nr][nc] !== "#";
      });
      if (avails.length > 2) {
        new Point(r, c);
      }
    }
  }

  for (const point of Ov(Point.nodeMap)) {
    // flood fill until next point
    const q = [[point.r, point.c, 0]];

    const seen = new ObjectSet();
    while (q.length) {
      const [r, c, d] = q.shift();
      if (seen.has([r, c])) continue;
      seen.add([r, c]);
      const pp = Point.getNode(r, c);
      if (pp && pp !== point) {
        point.edges.push({ to: pp, dist: d });
        continue;
      }
      const avails = dirs.filter(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (!isInBound(nr, nc)) return false;
        return lines[nr][nc] !== "#";
      });
      for (const [dr, dc] of avails) {
        const [nr, nc] = [r + dr, c + dc];
        if (!isInBound(nr, nc)) continue;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  console.log(Point.nodeMap);

  // return;

  const seen = new Set();
  let max = 0;
  /**
   *
   * @param {Point} point
   * @returns
   */
  function dfs(point, d) {
    const { r, c } = point;
    if (seen.has(point)) {
      return;
    }
    seen.add(point);
    if (r === er) {
      max = Math.max(max, d);
    }
    for (const { to, dist } of point.edges) {
      // nei.dist = point.dist + dist;
      dfs(to, d + dist);
    }
    seen.delete(point);
  }

  dfs(Point.getNode(sr, sc), 0);
  return max;
}
