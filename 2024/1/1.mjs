import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");

  let a = [];
  let b = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [x, y] = line.split("  ").map((n) => parseInt(n));
    a.push(x);
    b.push(y);
  }
  a = a.sort((x, y) => x - y);
  b = b.sort((x, y) => x - y);

  return a.reduce((sum, currA, i) => {
    return sum + Math.abs(currA - b[i]);
  }, 0);
}
