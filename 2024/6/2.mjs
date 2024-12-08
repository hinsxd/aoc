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
  let count = 0;
  let [r, c] = [0, 0];

  for (let i = 0; i < lines.length; i++)
    for (let j = 0; j < lines[0].length; j++)
      if (lines[i][j] !== "." && lines[i][j] !== "#") {
        [r, c] = [i, j];
      }
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] !== ".") continue;
      const copy = JSON.parse(JSON.stringify(lines));
      copy[i][j] = "#";
      if (simulate(copy, r, c)) {
        count++;
      }
    }
  }
  return count;
}

function simulate(map, r, c) {
  const seen = new ObjectSet(([r, c, dir]) => `r:${r},c:${c},dir:${dir}`);

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

  function checkRepeat(r, c, dir) {
    let [rn, cn] = [r, c];
    while (rn >= 0 && rn < map.length && cn >= 0 && cn < map[0].length) {
      if (seen.has([rn, cn, dir.name])) {
        return true;
      }
      rn += dir.r;
      cn += dir.c;
    }
    return false;
  }

  // initial
  seen.add([r, c, dir.name]);
  while (true) {
    const nextPos = { r: r + dir.r, c: c + dir.c };
    if (seen.has([nextPos.r, nextPos.c, dir.name])) {
      return true;
    }
    if (!map[nextPos.r]?.[nextPos.c]) break;
    if (map[nextPos.r]?.[nextPos.c] === "#") {
      rotate();
    } else {
      walk();
    }
    seen.add([r, c, dir.name]);
  }

  return false;
}
