import "utils/global.mjs";

const logger = new Logger([], true);

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");

  const dirs = {
    R: [0, 1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0],
  };

  let current = [0, 0];
  let sum = 0;
  let b = 0;



  for (let i = 0; i < lines.length; i++) {
    let [dir, _num, _color] = lines[i].split(" ");
    const color = _color.replace(/[()#]/g, "");
    const num = parseInt(_num);
    b += num;
    const [di, dj] = dirs[dir].map((d) => d * num);
    const next = [current[0] + di, current[1] + dj];
    sum += current[0] * next[1] - current[1] * next[0];
    current = next;
  }

  sum = Math.abs(sum) / 2 + b / 2 + 1;
  // const aarr = Object.entries(arr).reduce((acc, [_row, _cols]) => {
  //   const row = parseInt(_row);
  //   const cols = Object.keys(_cols).map((c) => parseInt(c));
  //   acc[row - minRow] ??= Array.from({ length: maxCol - minCol + 1 }).fill(".");

  //   for (const col of cols) {
  //     acc[row - minRow][col - minCol] = "#";
  //   }
  //   return acc;
  // }, []);

  // const h = aarr.length;
  // const w = aarr[0].length;

  // const clone = aarr.map((l) => [...l]);

  // const aaarr = aarr.map((l) => [".", ...l, "."]);
  // aaarr.unshift(Array.from({ length: aaarr[0].length }, () => "."));
  // aaarr.push(Array.from({ length: aaarr[0].length }, () => "."));
  // console.log(aaarr.map((line) => line.join("")).join("\n"));
  // const isInbound = (i, j) =>
  //   i >= 0 && i < aaarr.length && j >= 0 && j < aaarr[0].length;

  // function flood(x, y) {
  //   console.log(aaarr.map((l) => l.join("")).join("\n"));

  //   let seen = new Set();
  //   const q = [[x, y]];
  //   while (q.length) {
  //     const [i, j] = q.shift();
  //     if (!isInbound(i, j)) continue;
  //     if (seen.has(`${i},${j}`)) continue;
  //     seen.add(`${i},${j}`);
  //     if (aaarr[i][j] === "w") continue;
  //     if (aaarr[i][j] === "#") continue;
  //     if (aaarr[i][j] === ".") aaarr[i][j] = "w";
  //     for (const [dx, dy] of Object.values(dirs)) {
  //       q.push([i + dx, j + dy]);
  //     }
  //   }
  // }
  // flood(0, 0);
  // console.log(aaarr.length * aaarr[0].length);
  // console.log(aaarr.map((l) => l.join("")).join("\n"));

  return sum;
}
