import "utils/global.mjs";

function getPriority(char) {
  if (char >= "a" && char <= "z") {
    return char.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (char >= "A" && char <= "Z") {
    return char.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  let sum = 0;
  const lines = input.split("\n");

  console.log(zip([1, 2, 3], "1242"));
  return 0
  for (let i = 0; i < lines.length; i += 3) {
    const grouped = lines.slice(i, i + 3);
    console.log(grouped);
    const sets = [];
    for (const line of grouped) {
      const len = line.length;

      const set = new Set(line);
      sets.push(set);
    }
    // find intersection of all sets
    const intersection = sets.reduce((acc, set) => acc.intersect(set), sets[0]);
    sum += getPriority(intersection.values().next().value);
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
