import "utils/global.mjs";

const l = new Logger([], true).label("Question 2");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    l(line);
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return 0;
}
