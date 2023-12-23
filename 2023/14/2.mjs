import "utils/global.mjs";

const cache = {};

function slide(arr, dir, i) {
  const _arr = arr.map((row) => [...row]);
  switch (dir) {
    case "east":
      for (let i = 0; i < _arr.length; i++) {
        const row = _arr[i];
        let current = 0;
        while (current < row.length) {
          if (row[current] === "#") {
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
          row.splice(current, cells.length, ...cells);
          current = poundIndex === -1 ? row.length : poundIndex;
        }
      }
      break;
    case "west":
      for (let i = 0; i < _arr.length; i++) {
        const row = _arr[i];
        let current = row.length - 1;
        while (current >= 0) {
          if (row[current] === "#") {
            current--;
            continue;
          }
          const poundIndex = row.lastIndexOf("#", current);
          const cells = row.slice(
            poundIndex === -1 ? 0 : poundIndex + 1,
            current + 1
          );
          cells.sort((a, b) => {
            return a === b ? 0 : a === "." ? 1 : -1;
          });
          row.splice(
            poundIndex === -1 ? 0 : poundIndex + 1,
            cells.length,
            ...cells
          );
          current = poundIndex === -1 ? -1 : poundIndex;
        }
      }
      break;
    case "north":
      for (let i = 0; i < _arr[0].length; i++) {
        const col = _arr.map((row) => row[i]);
        let current = col.length - 1;
        while (current >= 0) {
          if (col[current] === "#") {
            current--;
            continue;
          }
          const poundIndex = col.lastIndexOf("#", current);
          const cells = col.slice(
            poundIndex === -1 ? 0 : poundIndex + 1,
            current + 1
          );
          cells.sort((a, b) => {
            return a === b ? 0 : a === "." ? 1 : -1;
          });
          col.splice(
            poundIndex === -1 ? 0 : poundIndex + 1,
            cells.length,
            ...cells
          );

          // insert back into arr
          for (let j = 0; j < col.length; j++) {
            _arr[j][i] = col[j];
          }
          current = poundIndex === -1 ? -1 : poundIndex;
        }
      }
      break;
    case "south":
      for (let i = 0; i < _arr[0].length; i++) {
        const col = _arr.map((row) => row[i]);
        let current = 0;
        while (current < col.length) {
          if (col[current] === "#") {
            current++;
            continue;
          }
          const poundIndex = col.indexOf("#", current);
          const cells = col.slice(
            current,
            poundIndex === -1 ? col.length : poundIndex
          );
          cells.sort((a, b) => {
            return a === b ? 0 : a === "." ? -1 : 1;
          });
          col.splice(current, cells.length, ...cells);

          // insert back into arr
          for (let j = 0; j < col.length; j++) {
            _arr[j][i] = col[j];
          }
          current = poundIndex === -1 ? col.length : poundIndex;
        }
      }
      break;
  }

  return [_arr];
}

function count(arr) {
  return arr.reduce((acc, row, index) => {
    const c = row.reduce((acc2, cell) => {
      return acc2 + (cell === "O" ? 1 : 0);
    }, 0);
    const idx = arr.length - index;
    return acc + c * idx;
  }, 0);
}

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  let arr = input.split("\n").map((line) => line.split(""));

  const dirs = ["north", "west", "south", "east"];

  const cache = {};

  for (let i = 0; i < 200; i++) {
    let hash1 = arr.map((row) => row.join("")).join("\n");

    if (cache[hash1]) {
      let hash2 = hash1;
      let length = 1;
      while (cache[hash2] !== hash1) {
        hash2 = cache[hash2];
        length++;
      }

      const remaining = (1000000000 - i) % length;
      for (let j = 0; j < remaining; j++) {
        for (const dir of dirs) {
          const [_arr] = slide(arr, dir, i);
          arr = _arr;
        }
      }
      break;
    }

    for (const dir of dirs) {
      const [_arr] = slide(arr, dir, i);
      arr = _arr.map((row) => [...row]);
    }
    const hash2 = arr.map((row) => row.join("")).join("\n");

    cache[hash1] = hash2;
  }

  return count(arr);
  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  // }
}
