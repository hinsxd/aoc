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
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));

  const sr = 0;
  const sc = lines[0].findIndex((c) => c === ".");

  const isInBound = (r, c) =>
    r >= 0 && r < lines.length && c >= 0 && c < lines[0].length;

  const q = new Heap((a, b) => -a[2] + b[2]);
  q.push([sr, sc, 0, []]);
  let max = 0;
  while (q.size()) {
    const [r, c, dist, seen] = q.pop();
    if (seen.find(([seenr, seenc]) => seenr === r && seenc === c)) {
      continue;
    }
    if (r === lines.length - 1) {
      max = Math.max(dist, max);
      continue;
    }
    const char = lines[r][c];
    if (char === ">") {
      const nr = r + 0;
      const nc = c + 1;
      if (isInBound(nr, nc) && lines[nr][nc] !== "#") {
        q.push([nr, nc, dist + 1, [...seen, [r, c]]]);
      }
    } else if (char === "v") {
      const nr = r + 1;
      const nc = c + 0;
      if (isInBound(nr, nc) && lines[nr][nc] !== "#") {
        q.push([nr, nc, dist + 1, [...seen, [r, c]]]);
      }
    } else {
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (isInBound(nr, nc) && lines[nr][nc] !== "#") {
          q.push([nr, nc, dist + 1, [...seen, [r, c]]]);
        }
      }
    }
  }


  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return max;
}
