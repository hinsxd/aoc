/**
 *
 * @param {string} input
 * @returns
 */
export function part2(input) {
  const nums = input
    .replace(/addx/g, "addx 0\naddx")
    .replace(/noop/g, "addx 0")
    .split("\n")
    .map((line) => parseInt(line.replace("addx ", "")));

  let current = 1;
  let str = "";
  for (let i = 0; i < nums.length; i++) {
    if (i % 40 === 0) {
      str += "\n";
    }
    if (Math.abs((i % 40) - current) <= 1) {
      str += "##";
    } else {
      str += "  ";
    }

    current += nums[i];
  }
  return str;
}
