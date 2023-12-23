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
    const [z1, z2] = from[2] > to[2] ? [to[2], from[2]] : [from[2], to[2]];
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
    for (let dz = 0; dz <= z2 - z1; dz++) {
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
  const lines = input
    .split("\n")
    .map((line) =>
      line.split("~").map((n) => n.split(",").map((nn) => parseInt(nn)))
    );

  // Use a heap because we want to process the items with the lowest z-index first
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
    // each Heap pop will give the lowest z-indexed item
    const [from, to, i] = zHeap.pop();
    // and we start to build the tower
    tower.put([from, to], i);
    // tower.print();
  }

  // PART 1

  // A brick will fall when ALL of its supporting bricks drop / disappear
  // In other words, if a brick is a sole supporter of some other brick,
  // it will not be safe to disintegrate
  // With our data structure, all dangerous bricks can be found by 
  // finding all bricks that are supported by one solo brick,
  // and output THAT supporting brick

  // const singles = new Set(
  //   Object.values(tower.supportedBy)
  //     .filter((d) => d.size === 1)
  //     .map(([e]) => e) // getting the first (only) element only
  // );

  // Then bricks that are safe to disintegrate would be all other bricks

  // return lines.length - singles.size;

  // PART 2

  let drops = 0;

  // startingBrick should be a list of IDs defined when putting into the tower
  for (const startingBrick of Object.keys(tower.supporting).map((n) =>
    parseInt(n)
  )) {
    // Clone the supportedBy object set first because we will update it from start every time
    const clonedSupportedBy = Object.entries(tower.supportedBy).reduce(
      (acc, [key, supportedBy]) => {
        acc[key] = new Set(supportedBy);
        return acc;
      },
      {}
    );

    // we simulate to disintegrate each block and see if other blocks will fall too
    // q is a queue of bricks that will disintegrate / fall / not remain the previous z-position
    const q = [startingBrick];
    while (q.length) {
      const key = q.shift();

      // get the bricks that the current brick is supporting
      const supporting = tower.supporting[key];
      if (!supporting) continue;
      for (const s of supporting) {
        // s is no longer supported by this brick
        clonedSupportedBy[s].delete(key);

        // if s is not supported by any brick anymore,
        // s will fall too and cause CHAIN REACTION!
        if (clonedSupportedBy[s].size === 0) {
          // then this is counted as one brick "falling"
          drops++;

          // s now moves, adding it to the queue
          q.push(s);
        }
      }
    }
  }

  return drops;
}
