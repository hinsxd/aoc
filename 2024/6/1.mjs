import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));

  let [r, c] = [0, 0];

  for (let i = 0; i < lines.length; i++)
    for (let j = 0; j < lines[0].length; j++)
      if (lines[i][j] !== "." && lines[i][j] !== "#") {
        [r, c] = [i, j];
      }

  return simulate(lines, r, c);
}

function simulate(lines, r, c) {
  const mapSet = new ObjectSet(([r, c]) => `r:${r}c:${c}`);

  const dirs = {
    right: { r: 0, c: 1, next: "down", name: "right" },
    left: { r: 0, c: -1, next: "up", name: "left" },
    up: { r: -1, c: 0, next: "right", name: "up" },
    down: { r: 1, c: 0, next: "left", name: "down" },
  };

  let dir = dirs.up;

  function rotate() {
    dir = dirs[dir.next];
  }

  function walk() {
    const nextPos = { r: r + dir.r, c: c + dir.c };
    [r, c] = [nextPos.r, nextPos.c];
  }

  while (true) {
    mapSet.add([r, c]);
    const nextPos = { r: r + dir.r, c: c + dir.c };
    if (!lines[nextPos.r]?.[nextPos.c]) break;
    if (lines[nextPos.r]?.[nextPos.c] === "#") {
      rotate();
      continue;
    }
    walk();
  }
  return mapSet.size;
}
