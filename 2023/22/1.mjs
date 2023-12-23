import "utils/global.mjs";
import Heap from "heap";
const logger = new Logger([], true);

class Tower {
  /**
   * @type{number[][][]}
   */
  arr = [];

  supportedBy = {};
  supporting = {};
  print() {
    for (const [i, levelArr] of this.arr.entries()) {
      logger.label(`Level ${i}`)(
        levelArr
          .map((level) =>
            level
              .map((c) => (c === null ? "-" : c).toString().padStart(4, " "))
              .join("")
          )
          .join("\n")
      );
    }
  }

  constructor(xmax, ymax) {
    this.xmax = xmax;
    this.ymax = ymax;
    this.newLevel = () =>
      Array.from({ length: xmax + 1 }, () =>
        Array.from({ length: ymax + 1 }, () => null)
      );
  }
  put([from, to], id) {
    // Put the smaller index on left, easier for doing loops
    const [x1, x2] = from[0] > to[0] ? [to[0], from[0]] : [from[0], to[0]];
    const [y1, y2] = from[1] > to[1] ? [to[1], from[1]] : [from[1], to[1]];

    const height = Math.abs(from[2] - to[2]);
    if (height > 0) {
      // assertion only
      if (x1 !== x2) {
        throw "fuck it";
      }
      if (y1 !== y2) {
        throw "fuck it";
      }
    }
    /**
     * The x/y coords that this brick will occupy
     */
    const xys = [];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        xys.push({ x, y });
      }
    }

    // start from the level above everything
    let z = this.arr.length;

    while (
      // if there are still levels below
      z > 0 &&
      // and every block below is not occupyied yet
      xys.every(({ x, y }) => typeof this.arr[z - 1]?.[x][y] !== "number")
    ) {
      // go down one level
      z--;
    }

    // get a set of bricks below that current brick is touching.
    // this brick is "supported by" all the bricks below
    const supportedBy = new Set(
      xys
        .map(({ x, y }) => this.arr[z - 1]?.[x][y])
        .filter((c) => typeof c === "number")
    );
    this.supportedBy[id] = supportedBy;

    // Inverse relation
    // each bricks below is "supporting" the current brick
    for (const d of supportedBy) {
      this.supporting[d] ??= new Set(); // need to initialize first
      this.supporting[d].add(id);
    }

    // Filling in the actual bricks into the array
    for (let dz = 0; dz <= height; dz++) {
      // initialize the level if needed
      this.arr[z + dz] ??= this.newLevel();
      for (const { x, y } of xys) {
        this.arr[z + dz][x][y] = id;
      }
    }
  }
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  debugger;
  const lines = input
    .split("\n")
    .map((line) =>
      line.split("~").map((n) => n.split(",").map((nn) => parseInt(nn)))
    );

  const zHeap = new Heap(
    (a, b) => Math.min(a[0][2], a[1][2]) - Math.min(b[0][2], b[1][2])
  );

  let xmax = 0;
  let ymax = 0;
  for (let i = 0; i < lines.length; i++) {
    const [from, to] = lines[i];

    zHeap.push([from, to, i + 1]);

    xmax = Math.max(from[0], to[0], xmax);
    ymax = Math.max(from[1], to[1], ymax);
  }

  const tower = new Tower(xmax, ymax);
  while (!zHeap.empty()) {
    const [from, to, i] = zHeap.pop();
    tower.put([from, to], i);
    // tower.print();
  }

  const singles = new Set(
    Object.values(tower.supportedBy)
      .filter((d) => d.size === 1)
      .map(([e]) => e)
  );

  return lines.length - singles.size;
}
