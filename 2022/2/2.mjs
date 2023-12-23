import "utils/global.mjs";

const hands1 = ["A", "B", "C"];
const hands2 = ["X", "Y", "Z"];
const scoreMap = { A: 1, B: 2, C: 3 };
function play(a, result) {
  const diff = [-1, 0, 1][hands2.indexOf(result)];

  const realB = hands1[(hands1.indexOf(a) + diff + 3) % 3];
  console.log(
    "log",
    a,
    result,
    diff,
    (hands1.indexOf(a) + diff + 3) % 3,
    realB
  );
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

    sum += play(a, b);
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}
