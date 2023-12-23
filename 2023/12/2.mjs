import "utils/global.mjs";

const repeat = 5;

const map = {};

function poss(str, combins) {
  const hash = str + combins.join(",");
  if (map[hash] !== undefined) {
    return map[hash];
  }

  if (str.length === 0) {
    return combins.length === 0 ? 1 : 0;
  }

  if (combins.length === 0) {
    return str.indexOf("#") === -1 ? 1 : 0;
  }

  const [needed, ...rest] = combins;

  let sum = 0;

  if (".?".includes(str[0])) {
    sum += poss(str.slice(1), combins);
  }

  if ("?#".includes(str[0])) {
    if (
      needed <= str.length &&
      str.slice(0, needed).indexOf(".") === -1 &&
      (needed === str.length || str[needed] !== "#")
    ) {
      sum += poss(str.slice(needed + 1), rest);
    }
  }

  map[hash] = sum;
  return sum;
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let sum = 0;

  // return;
  for (const line of lines) {
    const [str, numsStr] = line.split(" ");
    const nums = numsStr.split(",").map((n) => parseInt(n));
    const repeatedStr = Array(repeat).fill(str).join("?");
    const repeatedNums = Array(repeat)
      .fill(0)
      .map(() => nums)
      .flat();

    const result = poss(repeatedStr, repeatedNums);
    sum += result;
  }


  return sum;
}
