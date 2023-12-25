import "utils/global.mjs";

const logger = new Logger([], true);
logger.label("test")("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input, minXY, maxXY) {
  const globalCond = (x, y) =>
    x >= minXY && x <= maxXY && y >= minXY && y <= maxXY;

  const lines = input
    .split("\n")
    .map((line) =>
      line
        .split(" @ ")
        .map((subline) => subline.split(", ").map((cs) => parseInt(cs)))
    );
  let sum = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    const [[x1, y1], v1] = lines[i];
    const m1 = v1[1] === 0 ? Infinity : v1[1] / v1[0];

    const x1Cond = (x) => (v1[0] > 0 ? x > x1 : x < x1);
    const y1Cond = (y) => (v1[1] > 0 ? y > y1 : y < y1);
    const cond1 = (x, y) => x1Cond(x) && y1Cond(y);

    const [a1, b1, c1] = [m1, -1, y1 - m1 * x1];

    for (let j = i + 1; j < lines.length; j++) {
      const [[x2, y2], v2] = lines[j];
      const m2 = v2[1] === 0 ? Infinity : v2[1] / v2[0];

      const x2Cond = (x) => (v2[0] > 0 ? x > x2 : x < x2);
      const y2Cond = (y) => (v2[1] > 0 ? y > y2 : y < y2);
      const cond2 = (x, y) => x2Cond(x) && y2Cond(y);
      // (y - y1) = m (x - x1)
      // y - y1 = mx - mx1
      // mx - y - mx1 + y1 = 0

      const [a2, b2, c2] = [m2, -1, y2 - m2 * x2];

      const det = a1 * b2 - a2 * b1;
      if (det === 0) {
        continue;
      }
      const x = (b1 * c2 - b2 * c1) / det;
      const y = (a2 * c1 - a1 * c2) / det;

      if (cond1(x, y) && cond2(x, y) && globalCond(x, y)) {
        sum++;
      }
    }
  }

  return sum;
}
