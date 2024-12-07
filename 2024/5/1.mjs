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

  const ok = new DefaultDict(() => []);
  const notOk = new DefaultDict(() => []);

  const [a, b] = input.split("\n\n").map((l) => l.split("\n"));
  for (const line of a) {
    const [x, y] = line.split("|").map((i) => parseInt(i));
    ok.set(x, [...ok.get(x), y]);
    notOk.set(y, [...notOk.get(y), x]);
  }
  l(notOk);
  let sum = 0;

  /**
   *
   * @param {number[]} nums
   * @returns {boolean}
   */
  function checkLine(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
      const first = nums[i];
      const remain = nums.slice(i + 1);
      // check ok first
      if (remain.some((n) => notOk.get(first).includes(n))) {
        return false;
      }
    }
    return true;
  }

  outer: for (const line of b) {
    const nums = line.split(",").map(i => parseInt(i));
    if (checkLine(nums)) {
      sum += arrMid(nums);
    }
  }

  return sum;
}

/**
 *
 * @param {any[]} arr
 * @returns
 */
function arrMid(arr) {
  return arr[Math.floor(arr.length / 2)];
}
