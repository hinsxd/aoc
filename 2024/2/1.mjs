import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
/**
 *
 * @param {number[]} level
 */
function isSafe(level) {
  let up = null;
  for (let i = 0; i < level.length - 1; i++) {
    const diff = level[i + 1] - level[i];
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
      return false;
    }
    if (diff !== 0) {
      if (up === null) {
        up = diff > 0;
      } else if (diff > 0 !== up) {
        return false;
      }
    }
  }
  return true;
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(" ").map((x) => parseInt(x));
    if (isSafe(line)) sum += 1;
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
