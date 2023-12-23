import "utils/global.mjs";

function turnArray(arr, dir) {
  switch (dir) {
    case "right":
      return arr.map((row, i) => arr.map((col) => col[i]).reverse());
    case "left":
      return arr.map((row, i) => arr.map((col) => col[i])).reverse();
    default:
      return arr;
  }
}

function slide(arr, dir) {
  switch (dir) {
    case "right":
      return arr.map((row) => {
        const newRow = [];
        let current = 0;
        while (current < row.length) {
          if (row[current] === "#") {
            newRow.push("#");
            current++;
            continue;
          }
          const poundIndex = row.indexOf("#", current);
          const cells = row.slice(
            current,
            poundIndex === -1 ? row.length : poundIndex
          );
          cells.sort((a, b) => {
            return a === b ? 0 : a === "." ? -1 : 1;
          });
          newRow.push(...cells);
          current = poundIndex === -1 ? row.length : poundIndex;
        }
        return newRow;
        // # will not move. O will slide to end
      });
    default:
      return arr;
  }
}

function count(arr, dir) {
  switch (dir) {
    case "n":
      const newArr = turnArray(arr, "right");
      const newArr2 = turnArray(slide(newArr, "right"), "left");
      return newArr2.reduce((acc, row, index) => {
        const c = row.reduce((acc2, cell) => {
          return acc2 + (cell === "O" ? 1 : 0);
        }, 0);
        const idx = newArr2.length - index;
        return acc + c * idx;
      }, 0);

    case "e":
      return count(turnArray(arr, "right"), "n");
      
    default:
      break;
  }
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  console.log(input);
  console.log();
  const arr = input.split("\n").map((line) => line.split(""));
  return count(arr, "n");

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }
}
