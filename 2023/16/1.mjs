import "utils/global.mjs";

const logger = new Logger([], true);
function count(cells, starting) {
  const dirs = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  let queue = [starting];

  const visited = new Set();
  const visited2 = new Set();

  const isInBound = (row, col) =>
    row >= 0 && row < cells.length && col >= 0 && col < cells[0].length;

  function visit(row, col, direction) {
    if (isInBound(row, col) === false) {
      return;
    }
    const hash = `${row},${col},${direction}`;
    if (visited.has(hash)) {
      return;
    }
    visited.add(hash);
    visited2.add(`${row},${col}`);
    const cell = cells[row][col];
    if (
      cell === "." ||
      (cell === "|" && ["up", "down"].includes(direction)) ||
      (cell === "-" && ["left", "right"].includes(direction))
    ) {
      const next = [
        row + dirs[direction][0],
        col + dirs[direction][1],
        direction,
      ];
      queue.push(next);
      return;
    }
    if (cell === "\\") {
      let next;
      switch (direction) {
        case "up":
          next = [row, col - 1, "left"];
          queue.push(next);
          break;
        case "down":
          next = [row, col + 1, "right"];
          queue.push(next);
          break;
        case "left":
          next = [row - 1, col, "up"];
          queue.push(next);
          break;
        case "right":
          next = [row + 1, col, "down"];
          queue.push(next);
          break;
      }

      queue.push(next);
      return;
    }
    if (cell === "/") {
      let next;
      switch (direction) {
        case "up":
          next = [row, col + 1, "right"];
          queue.push(next);
          break;
        case "down":
          next = [row, col - 1, "left"];
          queue.push(next);
          break;
        case "left":
          next = [row + 1, col, "down"];
          queue.push(next);
          break;
        case "right":
          next = [row - 1, col, "up"];
          queue.push(next);
          break;
      }

      queue.push(next);
      return;
    }
    if (cell === "|") {
      if (["left", "right"].includes(direction)) {
        queue.push([row - 1, col, "up"]);
        queue.push([row + 1, col, "down"]);
      }
      return;
    }
    if (cell === "-") {
      if (["up", "down"].includes(direction)) {
        queue.push([row, col - 1, "left"]);
        queue.push([row, col + 1, "right"]);
      }
      return;
    }
  }

  while (queue.length) {
    const [x, y, direction] = queue.shift();
    visit(x, y, direction);
  }

  return visited2.size;
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const cells = input.split("\n").map((line) => line.split(""));

  return count(cells, [0, 0, "right"]);
}
