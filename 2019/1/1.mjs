import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let ans = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = parseInt(lines[i]);
    ans += Math.floor(line / 3) - 2;
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return ans;
}
