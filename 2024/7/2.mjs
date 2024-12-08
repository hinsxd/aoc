import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");

function check(result, args) {
  const [first, ...remain] = args;
  const choices = 3;
  const max = choices ** remain.length;
  l("checking", result, args);
  // permutate each possibilities
  for (let i = 0; i < max; i++) {
    // each i encode a unique state
    const ops = remain.map((n, j) => {
      // num, is multiply
      return [Math.floor(i / choices ** j) % choices, n];
    });

    const cal = ops.reduce((acc, [op, n]) => {
      return {
        0: acc * n,
        1: acc + n,
        2: parseInt(`${acc}${n}`),
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
  // const num = 3
  // const max = 3 ** num; // 000 -> 222
  // for (let i = 0; i < max; i++) {
  //   console.log();
  //   Array(num)
  //     .fill(0)
  //     .forEach((_, j) => {
  //       console.log(Math.floor(i / 3 ** j) % 3, i.toString(3));
  //     });
  // }
  // return 0;
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
