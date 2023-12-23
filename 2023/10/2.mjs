import "utils/global.mjs";

// Make a enum to prevent fat fingers
const DIR = {
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  UP: "UP",
  LEFT: "LEFT",
};

const dirMap = {
  [DIR.RIGHT]: [0, 1], // right
  [DIR.DOWN]: [1, 0], // down
  [DIR.UP]: [-1, 0], // up
  [DIR.LEFT]: [0, -1], // left
};
/**
 * corners:
 * 7 -> top right angle (┐)
 * F -> top left angle (┌)
 * L -> bottom left angle (└)
 * J -> bottom right angle (┘)
 */
/**
 * {
 *   [currentPipe]:{
 *     [currentDir]: nextDir
 *  }
 * }
 */
const turningMap = {
  7: {
    // e.g. travelling UP to 7, will turn to left
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

  const arr = lines.map((line) => line.split(""));

  /**
   *
   * @param {number[]} coord
   * @returns
   */
  const inBound = ([r, c]) => r >= 0 && r < h && c >= 0 && c < w;

  const sRow = arr.findIndex((line) => line.includes("S"));
  const sCol = arr[sRow].indexOf("S");

  const validStartDirs = Object.values(DIR).filter((dir) => {
    const [dr, dc] = dirMap[dir];
    const nextCoord = [sRow + dr, sCol + dc];
    if (!inBound(nextCoord)) return false;
    const next = arr[nextCoord[0]]?.[nextCoord[1]];
    return !!turningMap[next]?.[dir];
  });

  // determine the real pipe at the "S"
  let realPipeOfStart;
  if ([DIR.UP, DIR.DOWN].every((dir) => validStartDirs.includes(dir))) {
    realPipeOfStart = "|";
  }
  if ([DIR.LEFT, DIR.RIGHT].every((dir) => validStartDirs.includes(dir))) {
    realPipeOfStart = "-";
  }
  if ([DIR.LEFT, DIR.UP].every((dir) => validStartDirs.includes(dir))) {
    realPipeOfStart = "J";
  }
  if ([DIR.UP, DIR.RIGHT].every((dir) => validStartDirs.includes(dir))) {
    realPipeOfStart = "L";
  }
  if ([DIR.RIGHT, DIR.DOWN].every((dir) => validStartDirs.includes(dir))) {
    realPipeOfStart = "F";
  }
  if ([DIR.DOWN, DIR.LEFT].every((dir) => validStartDirs.includes(dir))) {
    realPipeOfStart = "7";
  }

  let curr = [sRow, sCol];

  // make a clean array to store the path
  const cleanArr = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ".")
  );

  function findLoopMaxDist(initCoord, dir) {
    let currDir = dir;
    let steps = 0;
    let curr = initCoord;
    //
    do {
      const [dr, dc] = dirMap[currDir];
      const [r, c] = curr;
      cleanArr[curr[0]][curr[1]] =
        arr[curr[0]][curr[1]] === "S" ? realPipeOfStart : arr[curr[0]][curr[1]];
      const nextCoord = [r + dr, c + dc];
      const next = arr[nextCoord[0]][nextCoord[1]];
      const nextDir = turningMap[next]?.[currDir];
      currDir = nextDir;
      curr = nextCoord;
      steps++;
    } while (arr[curr[0]][curr[1]] !== "S");

    return Math.ceil(steps / 2);
  }

  const part1 = findLoopMaxDist(curr, validStartDirs[0]);

  // walk from left to right, top to bottom
  let ans = 0;

  console.log(cleanArr.map((line) => line.join("")).join("\n"));
  console.log();
  for (let r = 0; r < h; r++) {
    ans +=
      cleanArr[r]
        // remove horizontal bars
        .filter((c) => c !== "-")
        // make it a string to use regex
        .join("")
        // trim the leading and trailing dots
        .replace(/^\.*|\.*$/, "")
        // F---7 or L---J does not make a full bar
        .replace(/F7|LJ/g, "")
        // F---J or L---7 makes a full vertical bar, so it changes the inside-ity of the position
        .replace(/FJ|L7/g, "|")
        // double vertical bar offset each other
        .replace(/\|\|/g, "")
        // match everything dots in between two vertical bars
        .match(/\|(\.+)\|/g)
        // convert the match back to a string
        ?.join("")
        // count the dots
        .replace(/\|/g, "").length ?? 0;
  }

  return ans;
}
