import "utils/global.mjs";

const hands1 = ["A", "B", "C"];
const hands2 = ["X", "Y", "Z"];
const scoreMap = { A: 1, B: 2, C: 3 };
function play(a, b) {
  const realB = hands1[hands2.indexOf(b)];
  const isWon =
    (realB === "B" && a === "A") ||
    (realB === "C" && a === "B") ||
    (realB === "A" && a === "C");
  const isDraw = a === realB;


  return scoreMap[realB] + (isWon ? 6 : isDraw ? 3 : 0);
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [a, b] = line.split(" ");
    console.log(play(a, b));
    sum += play(a, b);
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
