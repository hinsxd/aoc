import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  // const lines = input.split("\n");
  // for (let i = 0; i < lines.length; i++) {
  //   const line = lines[i];
  //   l(line);
  // }

  let nums = input.split(" ").map((s) => parseInt(s));
  for (let i = 0; i < 25; i++) {
    const newNums = [];
    console.log(nums);
    for (const n of nums) {
      if (n === 0) {
        newNums.push(1);
        continue;
      }
      if (n.toString().length % 2 === 0) {
        const len = n.toString().length;
        const a = parseInt(n.toString().slice(0, len / 2));
        const b = parseInt(n.toString().slice(len / 2));
        console.log(n, a, b);
        newNums.push(a, b);
        continue;
      }
      newNums.push(n * 2024);
    }
    nums = newNums;
  }

  return nums.length;
}
