import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");

function check(result, args) {
  const [first, ...remain] = args;
  const max = 3 ** remain.length;
  l("checking", result, args);
  // permutate each possibilities
  for (let i = 0; i < max; i++) {
    // each i encode a unique state
    const stateStr = i.toString(3).padStart(remain.length, "0");
    const ops = remain.map((n, j) => {
      // num, is multiply
      return [stateStr[stateStr.length - 1 - j], n];
    });

    const cal = ops.reduce((acc, [op, n]) => {
      return {
        0: parseInt(`${acc}${n}`),
        1: acc * n,
        2: acc + n
      }[op];
    }, first);
    if (cal === result) {
      return true;
    }
  }
  return false;
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
    const line = lines[i];
    let [a, b] = line.split(": ");
    const result = parseInt(a);
    const args = b.split(" ").map((i) => parseInt(i));
    if (check(result, args)) sum += result;
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
