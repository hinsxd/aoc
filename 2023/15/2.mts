import "utils/global.mjs";

function hash(str) {
  let curr = 0;
  for (const char of str) {
    const code = char.charCodeAt(0);
    curr += code;
    curr *= 17;
    curr %= 256;
  }
  return curr;
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const boxes = Array(256)
    .fill(0)
    .map(() => []);

  const line = input;
  const seqs = line.split(",");

  for (const seq of seqs) {
    const isAssign = seq.includes("=");
    if (isAssign) {
      const [label, v] = seq.split("=");
      const focalLength = parseInt(v);

      const box = hash(label);
      const found = boxes[box].find((b) => b.label === label);
      if (found) {
        found.focalLength = focalLength;
      } else {
        boxes[box].push({ label, focalLength });
      }
    } else {
      // is minus
      const label = seq.slice(0, -1);
      const box = hash(label);
      const index = boxes[box].findIndex((b) => b.label === label);
      if (index !== -1) boxes[box].splice(index, 1);
    }
  }

  let sum = 0;
  for (let i = 0; i < boxes.length; i++) {
    const n = i + 1;
    for (let j = 0; j < boxes[i].length; j++) {
      const { label, focalLength } = boxes[i][j];

      sum += n * (j + 1) * focalLength;
    }
  }
  console.log(boxes);
  // return 0;

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
