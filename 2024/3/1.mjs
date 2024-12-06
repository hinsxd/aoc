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
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matches = [...line.matchAll(/mul\((\d+),(\d+)\)/g)];
    matches.forEach((match) => {
      sum += parseInt(match[1]) * parseInt(match[2]);
    });
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
