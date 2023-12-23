import "utils/global.mjs";

function hash(str) {
  let curr = 0;

  for (const char of str) {
    const code = char.charCodeAt(0);
    curr += code;
    curr *= 17;
    curr %= 256;
  }
  return curr;
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const line = input;
  const seqs = line.split(",");
  let sum = 0;
  for (const seq of seqs) {
    let curr = 0;

    sum += hash(seq);
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
