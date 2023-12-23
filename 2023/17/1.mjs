import "utils/global.mjs";
import Heap from "heap";

const logger = new Logger([], true);

function getDist(
  arr,
  minCons,
  maxCons,
  end = [arr.length - 1, arr[0].length - 1]
) {
  const rows = arr.length;
  const cols = arr[0].length;

  const isInbound = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

  const seen = new ObjectSet();

  /**
   * @type{Heap<{ loss: number, r: number, c: number, dir: [number,number] }>}
   */
  const heap = new Heap((a, b) => {
    return a.loss - b.loss;
  });
  heap.push({ loss: 0, r: 0, c: 0, dir: [0, 1] });
  heap.push({ loss: 0, r: 0, c: 0, dir: [1, 0] });
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (!heap.empty()) {
    const { loss, r, c, dir } = heap.pop();
    if ([r, c].equals(end)) return loss;
    if (seen.has([r, c, dir])) continue;
    seen.add([r, c, dir]);

    const [dr, dc] = dir;
    const turningDir = dirs.filter(
      (d) => !d.equals([-dr, -dc]) && !d.equals([dr, dc])
    );
    // for each step that the lava can turn
    for (let i = minCons; i <= maxCons; i++) {
      // if it turns
      for (const [ddr, ddc] of turningDir) {
        const [nr, nc] = [r + i * ddr, c + i * ddc];
        if (!isInbound(nr, nc)) continue;

        let newLoss = loss;
        for (let j = 1; j <= i; j++) {
          newLoss += arr[r + j * ddr][c + j * ddc];
        }
        heap.push({
          loss: newLoss,
          r: nr,
          c: nc,
          dir: [ddr, ddc],
        });
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
  const arr = input
    .split("\n")
    .map((line) => line.split("").map((c) => parseInt(c)));

  return getDist(arr, 1, 3);
}
