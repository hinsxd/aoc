import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));
  let sum = 0;

  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === "A") {
        if (findInDir(i, j, lines)) {
          sum += 1;
        }
      }
    });
  });

  return sum;
}

/**
 *
 * @param {number} startX
 * @param {number} startY
 * @param {string[][]} arr
 * @returns {boolean}
 */
function findInDir(startX, startY, arr) {
  if (
    startX === 0 ||
    startX === arr.length - 1 ||
    startY === 0 ||
    startY === arr[0].length - 1
  ) {
    return false;
  }
  const chars1 = [arr[startX - 1]?.[startY - 1], arr[startX + 1]?.[startY + 1]];
  const chars2 = [arr[startX + 1]?.[startY - 1], arr[startX - 1]?.[startY + 1]];

  l(isMAS(chars1), isMAS(chars2));
  return isMAS(chars1) && isMAS(chars2);
}
/**
 *
 * @param {string[]} param0
 */
function isMAS([a, b]) {
  return (a === "M" && b === "S") || (b === "M" && a === "S");
}
