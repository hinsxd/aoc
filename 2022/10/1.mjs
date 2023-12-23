/**
 *
 * @param {string} input
 * @returns
 */
export function part1(input) {
  const nums = input
    .replace(/addx/g, "addx 0\naddx")
    .replace(/noop/g, "addx 0")
    .split("\n")
    .map((line) => parseInt(line.replace("addx ", "")));

  let current = 1;
  let result = null;
  const targets = [20, 60, 100, 140, 180, 220];
  for (let i = 0; i < nums.length; i++) {
    if (targets.includes(i + 1)) {
      result += current * (i + 1);
    }
    current += nums[i];
  }

  return result;
}
