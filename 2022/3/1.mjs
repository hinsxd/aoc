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
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const len = line.length;
    const [first, second] = [line.slice(0, len / 2), line.slice(len / 2)];

    const set = new Set(first);

    for (const c of second) {
      if (set.has(c)) {
        console.log(c);
        const p = getPriority(c);
        sum += p;
        break
      }
    }
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
