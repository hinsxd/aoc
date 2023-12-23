import "utils/global.mjs";

const logger = new Logger([], true);
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
function count(lines, steps, s) {
  let set = new ObjectSet();
  set.add(s);

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

  return {
    total: needEven ? evenSum : oddSum,
    counts,
    maxSteps: counts.length,
  };
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

function generate(lines, s) {
  return {
    even: count(lines, 999990, s),
    odd: count(lines, 999991, s),
  };
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input, steps) {
  let [lines, s] = findS(input.split("\n").map((l) => l.split("")));

  if (s[0] * 2 + 1 !== lines.length) {
    throw 1;
  }
  if (s[1] * 2 + 1 !== lines[0].length) {
    throw 1;
  }
  const h = lines.length;
  const w = lines[0].length;

  const diagSteps = lines.length + lines[0].length;

  const result = {
    "-1": {
      "-1": generate(lines, [0, 0]),
      0: generate(lines, [0, s[1]]),
      1: generate(lines, [0, lines[0].length - 1]),
    },
    0: {
      "-1": generate(lines, [s[0], 0]),
      0: generate(lines, s),
      1: generate(lines, [s[0], lines[0].length - 1]),
    },
    1: {
      "-1": generate(lines, [lines.length - 1, 0]),
      0: generate(lines, [lines.length - 1, s[1]]),
      1: generate(lines, [lines.length - 1, lines[0].length - 1]),
    },
  };

  let sum = 0;

  // 26501365 = 131 * 202300 + 65
  const extBlocksRange = Math.floor(steps / w);
  const fullBlocksRange = extBlocksRange - 1;
  const fullOddBlocks = (Math.floor(fullBlocksRange / 2) * 2 + 1) ** 2;
  const fullEvenBlocks = (Math.floor((fullBlocksRange + 1) / 2) * 2) ** 2;

  sum += fullOddBlocks * count(lines, w * 2 + 1, s).total;
  sum += fullEvenBlocks * count(lines, w * 2, s).total;

  sum += count(lines, w - 1, [s[0], 0]).total;
  sum += count(lines, w - 1, [0, s[1]]).total;
  sum += count(lines, w - 1, [lines.length - 1, s[1]]).total;
  sum += count(lines, w - 1, [s[0], lines[0].length - 1]).total;

  const smallRemainingSteps = Math.floor(w / 2) - 1;

  sum +=
    (fullBlocksRange + 1) *
    (count(lines, smallRemainingSteps, [0, 0]).total +
      count(lines, smallRemainingSteps, [lines.length - 1, lines[0].length - 1])
        .total +
      count(lines, smallRemainingSteps, [lines.length - 1, 0]).total +
      count(lines, smallRemainingSteps, [0, lines[0].length - 1]).total);

  const bigRemainingSteps = Math.floor((w * 3) / 2) - 1;
  sum +=
    fullBlocksRange *
    (count(lines, bigRemainingSteps, [0, 0]).total +
      count(lines, bigRemainingSteps, [lines.length - 1, lines[0].length - 1])
        .total +
      count(lines, bigRemainingSteps, [lines.length - 1, 0]).total +
      count(lines, bigRemainingSteps, [0, lines[0].length - 1]).total);
  return sum;
}
