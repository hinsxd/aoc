import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));
  let sum = 0;

  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === "X") {
        dirs.forEach((d) => {
          if (findInDir(i, j, d[0], d[1], "XMAS", lines)) {
            sum += 1;
          }
        });
      }
    });
  });

  return sum;
}

/**
 *
 * @param {number} startX
 * @param {number} startY
 * @param {number} dx
 * @param {number} dy
 * @param {string} str
 * @param {string[][]} arr
 * @returns {boolean}
 */
function findInDir(startX, startY, dx, dy, str, arr) {
  let curr = [startX, startY];
  let index = 0;

  while (
    curr[0] >= 0 &&
    curr[1] >= 0 &&
    curr[0] < arr.length &&
    curr[1] < arr[0].length &&
    index < str.length
  ) {
    let currChar = str[index];
    if (currChar !== arr[curr[0]][curr[1]]) {
      return false;
    }

    curr[0] += dx;
    curr[1] += dy;
    index++;
  }
  return index === str.length;
}
