function isDigit(c) {
  return c >= "0" && c <= "9";
}
function isSymbol(c) {
  return c !== "." && !isDigit(c);
}

const dirs = [
  [-1, -1], // top left
  [-1, 0], // top
  [-1, 1], // top right
  [0, -1], // left
  [0, 1], // right
  [1, -1], // bottom left
  [1, 0], // bottom
  [1, 1], // bottom right
];

function extractAndFlood(arr, i, j) {
  const c = arr[i][j];
  const digits = [c];
  arr[i][j] = ".";
  let left = j - 1;
  let right = j + 1;
  while (left >= 0 && isDigit(arr[i][left])) {
    digits.unshift(arr[i][left]);
    arr[i][left] = ".";
    left--;
  }
  while (right < arr[i].length && isDigit(arr[i][right])) {
    digits.push(arr[i][right]);
    arr[i][right] = ".";
    right++;
  }
  return parseInt(digits.join(""));
}

export function part1(input) {
  const arr = input.split("\n").map((x) => x.split(""));

  let sum = 0;

  // go through each row and column
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    for (let j = 0; j < row.length; j++) {
      const c = row[j];
      if (isSymbol(c)) {
        for (const dir of dirs) {
          const [dx, dy] = dir;
          const x = i + dx;
          const y = j + dy;
          if (x >= 0 && x < arr.length && y >= 0 && y < row.length) {
            const c2 = arr[x][y];
            if (isDigit(c2)) {
              sum += extractAndFlood(arr, x, y);
            }
          }
        }
      }
    }
  }

  return sum;
}
