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
   */
  function checkLine(nums) {
    let updated = nums;
    function isOk() {
      for (let i = 0; i < updated.length - 1; i++) {
        const first = updated[i];
        // check ok first
        for (let j = i + 1; j < updated.length; j++) {
          const second = updated[j];
          if (notOk.get(first).includes(second)) {
            return false;
          }
        }
      }
      return true;
    }
    if (isOk()) return [false, []];

    while (!isOk())
      for (let i = 0; i < updated.length - 1; i++) {
        const first = updated[i];
        // check ok first
        for (let j = i + 1; j < updated.length; j++) {
          const second = updated[j];
          if (notOk.get(first).includes(second)) {
            l("swapping", updated);
            updated.splice(j, 1);
            updated = updated
              .slice(0, i)
              .concat(second)
              .concat(...updated.slice(i));
            l("to", updated);
          }
        }
      }
    return [true, updated];
  }

  for (const line of b) {
    const nums = line.split(",").map((i) => parseInt(i));
    const [hasUpdate, updated] = checkLine(nums);
    if (hasUpdate) {
      l(updated);
      sum += arrMid(updated);
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
