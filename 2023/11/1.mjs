import "utils/global.mjs";

let expandTimes = 2;

function findEmptyRows(lines) {
  const emptyRows = [];
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];
    if (row.every((c) => c === ".")) {
      emptyRows.push(i);
    }
  }
  return emptyRows;
}
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));
  const transpose = lines[0].map((_, colIndex) =>
    lines.map((row) => row[colIndex])
  );

  const emptyRows = findEmptyRows(lines);
  const emptyCols = findEmptyRows(transpose);

  const stars = [];

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];
    for (let j = 0; j < row.length; j++) {
      const c = row[j];

      if (c === "#") {
        // final[i][j] = stars.length.toString();
        stars.push([i, j]);
      }
    }
  }

  function distance(coord1, coord2, emptyRows, emptyCols) {
    const minRow = Math.min(coord1[0], coord2[0]);
    const maxRow = Math.max(coord1[0], coord2[0]);
    const minCol = Math.min(coord1[1], coord2[1]);
    const maxCol = Math.max(coord1[1], coord2[1]);
    const numOfEmptyRowsBetween =
      emptyRows.filter((row) => row > minRow && row < maxRow)?.length || 0;
    const numOfEmptyColsBetween =
      emptyCols.filter((col) => col > minCol && col < maxCol)?.length || 0;

    const rowDist = maxRow - minRow + numOfEmptyRowsBetween * (expandTimes - 1);
    const colDist = maxCol - minCol + numOfEmptyColsBetween * (expandTimes - 1);

    return rowDist + colDist;
  }

  let sum = 0;
  // for each pair of stars
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dist = distance(stars[i], stars[j], emptyRows, emptyCols);
      sum += dist;
    }
  }

  return sum;
}
