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

  let numMap = {};
  input.split(" ").forEach((n) => {
    numMap[n] = (numMap[n] ?? 0) + 1;
  });
  for (let i = 0; i < 75; i++) {
    const newNumMap = {};
    for (const [n, count] of Object.entries(numMap)) {
      if (n === "0") {
        newNumMap[1] = (newNumMap[1] ?? 0) + count;
        continue;
      }
      if (n.length % 2 === 0) {
        const len = n.length;
        const a = parseInt(n.toString().slice(0, len / 2));
        const b = parseInt(n.toString().slice(len / 2));
        newNumMap[a] = (newNumMap[a] ?? 0) + count;
        newNumMap[b] = (newNumMap[b] ?? 0) + count;
        continue;
      }
      const newNum = parseInt(n) * 2024;
      newNumMap[newNum] = (newNumMap[newNum] ?? 0) + count;
    }
    numMap = newNumMap;
  }

  console.log(numMap)
  return Object.values(numMap).reduce((acc, curr) => acc + curr, 0);
}
