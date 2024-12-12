import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input
    .split("\n")
    .map((line) => line.split("").map((l) => (l === "." ? -1 : parseInt(l))));

  let sum = 0;
  const startPos = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 0) {
        startPos.push([i, j]);
      }
    }
  }

  const dirs = [
    // [-1, -1],
    [-1, 0],
    // [-1, 1],
    [0, -1],
    [0, 1],
    // [1, -1],
    [1, 0],
    // [1, 1],
  ];

  for (const start of startPos) {
    let [x, y] = start;
    const q = [[x, y]];

    // l("start", [x, y]);
    const goals = new ObjectSet(([x, y]) => `${x},${y}`);
    while (true) {
      const current = q.shift();
      if (!current) break;
      const [cx, cy] = current;
      if (lines[cx][cy] === 9) {
        // console.log("arrive", [cx, cy]);
        goals.add([cx, cy]);
        continue;
      }
      for (const [dx, dy] of dirs) {
        const nextX = cx + dx;
        const nextY = cy + dy;
        // out of bound
        if (
          !(
            nextX >= 0 &&
            nextX < lines.length &&
            nextY >= 0 &&
            nextY < lines[0].length
          )
        ) {
          continue;
        }
        // inbound
        if (lines[nextX][nextY] === lines[cx][cy] + 1) {
          if (start[0] === 5 && start[1] === 2) {
            console.log("walk from", [cx, cy], "to", [nextX, nextY]);
          }
          q.push([nextX, nextY]);
        }
      }
    }
    if (start[0] === 5 && start[1] === 2) {
      l("goals", start, goals.size, goals);
    }
    sum += goals.size;
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
