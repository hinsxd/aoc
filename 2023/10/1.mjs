import "utils/global.mjs";

//
const dirs = [
  [0, 1], // right
  [1, 0], // down
  [-1, 0], // up
  [0, -1], // left
];

const DIR = {
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  UP: "UP",
  LEFT: "LEFT",
};

const dirMap = {
  [DIR.RIGHT]: dirs[0],
  [DIR.DOWN]: dirs[1],
  [DIR.UP]: dirs[2],
  [DIR.LEFT]: dirs[3],
};
/**
 * corners:
 * 7 -> top right angle (┐)
 * F -> top left angle (┌)
 * L -> bottom left angle (└)
 * J -> bottom right angle (┘)
 */
const turningMap = {
  7: {
    [DIR.UP]: DIR.LEFT,
    [DIR.RIGHT]: DIR.DOWN,
  },
  F: {
    [DIR.LEFT]: DIR.DOWN,
    [DIR.UP]: DIR.RIGHT,
  },
  L: {
    [DIR.LEFT]: DIR.UP,
    [DIR.DOWN]: DIR.RIGHT,
  },
  J: {
    [DIR.RIGHT]: DIR.UP,
    [DIR.DOWN]: DIR.LEFT,
  },
  "|": {
    [DIR.UP]: DIR.UP,
    [DIR.DOWN]: DIR.DOWN,
  },
  "-": {
    [DIR.LEFT]: DIR.LEFT,
    [DIR.RIGHT]: DIR.RIGHT,
  },
};

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  const h = lines.length;
  const w = lines[0].length;

  /**
   *
   * @param {number[]} coord
   * @returns
   */
  const inBound = ([r, c]) => r >= 0 && r < h && c >= 0 && c < w;

  const sRow = lines.findIndex((line) => line.includes("S"));
  const sCol = lines[sRow].indexOf("S");

  const validStartDirs = Object.values(DIR).filter((dir) => {
    const [dr, dc] = dirMap[dir];
    const nextCoord = [sRow + dr, sCol + dc];
    if (!inBound(nextCoord)) return false;
    const next = lines[nextCoord[0]]?.[nextCoord[1]];
    return !!turningMap[next]?.[dir];
  });

  let curr = [sRow, sCol];

  const cleanArr = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ".")
  );

  function findLoop(initCoord, dir) {
    let currDir = dir;
    let steps = 0;
    let curr = initCoord;
    do {
      const [dr, dc] = dirMap[currDir];
      const [r, c] = curr;
      const nextCoord = [r + dr, c + dc];
      const next = lines[nextCoord[0]][nextCoord[1]];
      const nextDir = turningMap[next]?.[currDir];
      currDir = nextDir;
      curr = nextCoord;
      steps++;
    } while (lines[curr[0]][curr[1]] !== "S");

    return Math.ceil(steps / 2);
  }

  return findLoop(curr, validStartDirs[0]);
}
