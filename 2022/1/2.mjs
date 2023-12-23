import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  // const lines = input.split("\n");
  // for (let i = 0; i < lines.length; i++) {
  //   const line = lines[i];
  //   console.log(line);
  // }

  const blocks = input.split("\n\n");

  const cals = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const sum = block.split("\n").reduce((acc, line) => {
      return acc + parseInt(line);
    }, 0);
    cals.push(sum);
  }

  cals.sort((a, b) => a - b);
  console.log(cals);
  return cals.at(-1) + cals.at(-2) + cals.at(-3);
}
