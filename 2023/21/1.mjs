import "utils/global.mjs";

const logger = new Logger([], true);

function count(lines, steps, s) {
  let set = new ObjectSet();
  set.add(s);
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let lastSeen = new ObjectSet();

  const needEven = steps % 2 == 0;

  let evenSum = 0;
  let oddSum = 0;
  let counts = [];
  for (let i = 0; i <= steps; i++) {
    if (set.size === 0) {
      break;
    }
    if (i % 2 === 0) {
      evenSum += set.size;
    } else {
      oddSum += set.size;
    }
    counts.push((counts.at(-2) || 0) + set.size);

    const newSet = new ObjectSet();
    for (const v of set.keys()) {
      for (const dir of dirs) {
        const newV = [v[0] + dir[0], v[1] + dir[1]];

        if (lines[newV[0]]?.[newV[1]] === ".") {
          if (!lastSeen.has(newV)) newSet.add(newV);
        }
      }
    }
    lastSeen = set;
    set = newSet;

    // debug
    // const newLines = lines.map((line) => [...line]);
    // for (const [i, j] of [...seen.keys()]) {
    //   newLines[i][j] = "O";
    // }
    // console.log(newLines.map((line) => line.join("")).join("\n"));
  }

  return needEven ? evenSum : oddSum;
}

function findS(lines) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (lines[i][j] === "S") {
        lines[i][j] = ".";
        return [lines, [i, j]];
      }
    }
  }
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input, steps) {
  let [lines, s] = findS(input.split("\n").map((l) => l.split("")));

  return count(lines, steps, s);
}
